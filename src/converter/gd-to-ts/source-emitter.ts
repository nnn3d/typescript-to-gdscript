/**
 * Top-level GD→TS source-file emitter.
 *
 * Produces:
 *   1. An optional `export namespace <ClassName> { ... }` block
 *      containing lifted file-scope decls (consts, named enums,
 *      inner classes). See `file-scope-emitter.ts` for the
 *      individual emitters.
 *   2. The `export class <ClassName> extends <Base> { ... }` that
 *      corresponds to the GD script class. Class members (vars,
 *      methods, signals, anonymous enums) stay inside this block.
 *
 * The two-block layout relies on TypeScript's native namespace+class
 * merging so `ClassName.X` resolves cross-file, and — for consts,
 * enums, and inner classes — forward TS→GD converts back into the
 * script class body cleanly.
 *
 * Per-class state (member index, static classification, inferred
 * types, class-level type names) is collected into a `ClassScope`
 * via `buildClassScope` and installed on `ctx` via `withClassScope`
 * — both from `class-scope.ts` — giving a single, exception-safe
 * point for scope management.
 */

import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import {
  gdFilenameToAnonymousClassName,
  escapeUnderscoreClassName,
} from '../common/index.ts';
import {
  type GdToTsContext,
  resolveAllInheritedMembers,
  resolveInheritedMemberTypes,
} from './context.ts';
import { buildClassScope, withClassScope } from './class-scope.ts';
import { emitFunction, emitConstructor } from './functions.ts';
import {
  emitClassVariable,
  emitSignal,
  emitEnum,
  emitComment,
  emitBlockComment,
  emitAnnotationAsDecorator,
} from './members.ts';
import {
  emitFileScopeConst,
  emitFileScopeEnum,
  emitFileScopeClass,
} from './file-scope-emitter.ts';

// ─── Source File ─────────────────────────────────────────────

export function emitSourceFile(root: SyntaxNode, ctx: GdToTsContext): string {
  // First — resolve the script class's identity (name, extends,
  // abstract-ness) from the file's header statements. These drive
  // both the `ClassScope` we're about to build AND the eventual
  // `export class ...` header line.
  const header = scanScriptClassHeader(root);
  const className =
    header.className || gdFilenameToAnonymousClassName(ctx.filePath);

  // Build the scope from the file's top-level statements. Non-member
  // children (extends / class_name / annotations / comments) are
  // ignored by the collector, so passing the full list is safe.
  const scope = buildClassScope(className, root.namedChildren, ctx);
  if (header.extendsClass) {
    const inherited = resolveAllInheritedMembers(
      header.extendsClass,
      ctx.userClasses,
      ctx.registry,
    );
    for (const name of inherited) scope.classMembers.add(name);
    resolveInheritedMemberTypes(
      header.extendsClass,
      ctx.userClasses,
      scope.classMemberTypes,
    );
  }

  // Everything that emits member / lifted-decl lines needs to see
  // THIS class's scope on `ctx`. The wrapper installs the scope on
  // entry and guarantees restore on exit via try/finally.
  const { memberLines, fileScopeLines } = withClassScope(ctx, scope, () =>
    emitScriptClassBody(root, ctx, header),
  );

  // Godot defaults to `RefCounted` when a class has no explicit
  // `extends` statement. Make it explicit on the TS side so the
  // generated `.d.ts` typings carry correct inherited-member info —
  // otherwise consumers would see `class Foo {}` and lose access to
  // `RefCounted`'s methods (`reference`, `unreference`, etc.).
  const resolvedExtends = header.extendsClass || 'RefCounted';
  const extendsClause = ` extends ${resolvedExtends}`;
  const abstractKeyword = header.isAbstractClass ? 'abstract ' : '';
  const classHeader = `export ${abstractKeyword}class ${className}${extendsClause} {`;

  // Assembly: lifted decls (consts, named enums, inner classes)
  // wrapped in `export namespace ${className} { ... }` paired with
  // the script class. The namespace block satisfies TS declaration
  // merging — `Foo.X` resolves cross-file, `this.X` resolves on the
  // instance — without any plugin help. The TS→GD converter pulls
  // the namespace members back into the script class body.
  //
  // The file-scope emitters (`emitFileScopeConst`, `emitFileScopeEnum`,
  // `emitFileScopeClass`) already return `export`-prefixed forms;
  // we just need to indent them by 2 inside the namespace block.
  const out: string[] = [];
  if (fileScopeLines.length > 0) {
    out.push(`export namespace ${className} {`);
    for (const line of fileScopeLines) {
      const indented = line
        .split('\n')
        .map((l) => (l.length > 0 ? '  ' + l : l))
        .join('\n');
      out.push(indented);
    }
    out.push('}');
    out.push('');
  }
  out.push(classHeader, ...memberLines, '}', '');
  return out.join('\n');
}

// ─── Header scan ──────────────────────────────────────────────

interface ScriptClassHeader {
  /** Raw TS-side class name (after `_Foo` → `G_Foo` escape). Empty when GD has no `class_name`. */
  className: string;
  /** Base class from `extends <X>`. Empty when no explicit extends. */
  extendsClass: string;
  /** True when `@abstract` sits above `extends` / `class_name`. */
  isAbstractClass: boolean;
  /** Indices of `@abstract` annotations at root that should be skipped during emission. */
  rootAbstractAnnotationIndices: Set<number>;
  /** Indices of functions that have a preceding `@abstract` — rendered as `abstract method() {}`. */
  abstractFunctionIndices: Set<number>;
  /** Indices of inner classes that have a preceding `@abstract` — rendered as `export abstract class ...`. */
  abstractClassIndices: Set<number>;
}

/**
 * Single pass over the file root collecting everything needed to
 * compose the eventual script class header: name, extends, abstract
 * flags. Pure — doesn't touch `ctx`.
 */
function scanScriptClassHeader(root: SyntaxNode): ScriptClassHeader {
  let className = '';
  let extendsClass = '';
  let isAbstractClass = false;
  const rootAbstractAnnotationIndices = new Set<number>();
  const abstractFunctionIndices = new Set<number>();
  const abstractClassIndices = new Set<number>();

  for (let i = 0; i < root.namedChildren.length; i++) {
    const child = root.namedChildren[i]!;
    if (child.type === SyntaxType.ExtendsStatement) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass =
          typeNode.type === SyntaxType.Type
            ? typeNode.namedChildren[0]?.text ?? typeNode.text
            : typeNode.text;
      }
    } else if (child.type === SyntaxType.ClassNameStatement) {
      // Apply the `_Foo` → `G_Foo` escape so a real GD `class_name _Foo`
      // doesn't collide with the anonymous-class convention on the TS
      // side (where `_`-prefixed names mean "no class_name in GD").
      const raw = child.childForFieldName('name')?.text ?? '';
      className = escapeUnderscoreClassName(raw);
    } else if (
      child.type === SyntaxType.Annotation &&
      child.text === '@abstract'
    ) {
      const next = root.namedChildren[i + 1];
      if (
        next &&
        (next.type === SyntaxType.ExtendsStatement ||
          next.type === SyntaxType.ClassNameStatement)
      ) {
        isAbstractClass = true;
        rootAbstractAnnotationIndices.add(i);
      } else if (next && next.type === SyntaxType.FunctionDefinition) {
        abstractFunctionIndices.add(i + 1);
        rootAbstractAnnotationIndices.add(i);
      } else if (next && next.type === SyntaxType.ClassDefinition) {
        abstractClassIndices.add(i + 1);
        rootAbstractAnnotationIndices.add(i);
      }
    }
  }

  return {
    className,
    extendsClass,
    isAbstractClass,
    rootAbstractAnnotationIndices,
    abstractFunctionIndices,
    abstractClassIndices,
  };
}

// ─── Script class body emission ───────────────────────────────
//
// MUST run inside `withClassScope(...)` so `ctx.classMembers`,
// `ctx.staticMembers`, etc. point at the script class's scope during
// emission.

function emitScriptClassBody(
  root: SyntaxNode,
  ctx: GdToTsContext,
  header: ScriptClassHeader,
): { memberLines: string[]; fileScopeLines: string[] } {
  const memberLines: string[] = [];
  const fileScopeLines: string[] = [];

  let lastWasFunction = false;
  let hasNonFunctionMembers = false;
  let pendingAnnotations: string[] = [];
  const flushPendingAnnotations = () => {
    for (const ann of pendingAnnotations) {
      memberLines.push(ann);
    }
    pendingAnnotations = [];
  };

  for (let ci = 0; ci < root.namedChildren.length; ci++) {
    const child = root.namedChildren[ci]!;
    if (
      child.type === SyntaxType.ExtendsStatement ||
      child.type === SyntaxType.ClassNameStatement
    ) {
      continue; // handled in class header
    }

    // Skip root-level @abstract annotations (handled via isAbstractClass / abstractFunctions)
    if (
      child.type === SyntaxType.Annotation &&
      header.rootAbstractAnnotationIndices.has(ci)
    ) {
      continue;
    }

    // Standalone annotations (e.g. @export_group) — collect and prepend to next member
    if (child.type === SyntaxType.Annotation) {
      pendingAnnotations.push(`  ${emitAnnotationAsDecorator(child, ctx)}`);
      continue;
    }

    if (child.type === SyntaxType.Comment) {
      memberLines.push(emitComment(child));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    // Triple-quoted string as standalone expression → block comment
    if (child.type === SyntaxType.ExpressionStatement) {
      const expr = child.namedChildren[0];
      if (
        expr?.type === SyntaxType.String &&
        (expr.text.startsWith('"""') || expr.text.startsWith("'''"))
      ) {
        memberLines.push(emitBlockComment(expr.text, '  '));
        hasNonFunctionMembers = true;
        lastWasFunction = false;
        continue;
      }
    }

    const isFunction =
      child.type === SyntaxType.FunctionDefinition ||
      child.type === SyntaxType.ConstructorDefinition;

    if (isFunction) {
      // Add blank line before first function if there were property members
      if (hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
    }

    if (child.type === SyntaxType.FunctionDefinition) {
      const isAbstract = header.abstractFunctionIndices.has(ci);
      flushPendingAnnotations();
      memberLines.push(emitFunction(child, ctx, isAbstract));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (child.type === SyntaxType.ConstructorDefinition) {
      flushPendingAnnotations();
      memberLines.push(emitConstructor(child, ctx));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (
      child.type === SyntaxType.VariableStatement ||
      child.type === SyntaxType.ExportVariableStatement ||
      child.type === SyntaxType.OnreadyVariableStatement
    ) {
      const hasSetget = child.namedChildren.some(
        (c) => c.type === SyntaxType.Setget,
      );
      // Variables with setget clauses emit function-like bodies (accessors or
      // gd.getset blocks) and should be surrounded by blank lines.
      if (hasSetget && hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
      flushPendingAnnotations();
      memberLines.push(emitClassVariable(child, ctx));
      if (hasSetget) {
        memberLines.push('');
        lastWasFunction = true;
      } else {
        lastWasFunction = false;
      }
      hasNonFunctionMembers = true;
      continue;
    }

    if (child.type === SyntaxType.ConstStatement) {
      // GD class-body `const X = ...` lifts to TS file scope. The
      // forward TS→GD converter pulls file-scope const back into the
      // class body, so this is the symmetric reverse.
      flushPendingAnnotations();
      fileScopeLines.push(emitFileScopeConst(child, ctx));
      continue;
    }

    if (child.type === SyntaxType.SignalStatement) {
      flushPendingAnnotations();
      memberLines.push(emitSignal(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (child.type === SyntaxType.EnumDefinition) {
      // Named GD enums lift to a file-scope native TS `enum X { ... }`.
      // Anonymous GD enums (no name) stay inside the class body as
      // a series of static constants — there's no clean file-scope
      // form for them in TS.
      flushPendingAnnotations();
      const named = child.childForFieldName('name') !== null;
      if (named) {
        fileScopeLines.push(emitFileScopeEnum(child, ctx));
      } else {
        memberLines.push(emitEnum(child, ctx));
        hasNonFunctionMembers = true;
        lastWasFunction = false;
      }
      continue;
    }

    if (child.type === SyntaxType.ClassDefinition) {
      // GD inner class lifts to a TS file-scope `class X { ... }`
      // (no `export` — only the script class is exported per file).
      // Forward TS→GD pulls file-scope classes back into the script
      // class body as inner classes.
      flushPendingAnnotations();
      const isAbstractInner = header.abstractClassIndices.has(ci);
      fileScopeLines.push(emitFileScopeClass(child, ctx, isAbstractInner));
      continue;
    }

    ctx.diagnostics.push({
      message: `Unhandled top-level node: ${child.type}`,
      severity: 'error',
      file: ctx.filePath,
      line: child.startPosition.row + 1,
      column: child.startPosition.column + 1,
    });
    memberLines.push(
      `  /* ERROR: Unhandled top-level node: ${child.type} */ ${child.text.split('\n')[0]}`,
    );
  }

  // Remove trailing empty lines from members
  while (
    memberLines.length > 0 &&
    memberLines[memberLines.length - 1]!.trim() === ''
  ) {
    memberLines.pop();
  }

  return { memberLines, fileScopeLines };
}
