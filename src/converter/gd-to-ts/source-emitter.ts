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
  ANONYMOUS_ADDON_CLASS_NAME,
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
  formatExtendsForTs,
} from './file-scope-emitter.ts';

// ─── Source File ─────────────────────────────────────────────

export function emitSourceFile(root: SyntaxNode, ctx: GdToTsContext): string {
  // First — resolve the script class's identity (name, extends,
  // abstract-ness) from the file's header statements. These drive
  // both the `ClassScope` we're about to build AND the eventual
  // `export class ...` header line.
  const header = scanScriptClassHeader(root);
  const className = resolveTsClassName(header.className, ctx);

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
  const extendsClause = ` extends ${formatExtendsForTs(resolvedExtends)}`;
  const abstractKeyword = header.isAbstractClass ? 'abstract ' : '';
  // Class-level annotations (`@tool`, `@icon`, …) emit on their own
  // lines directly above the class declaration as TS decorators —
  // mirrors how field decorators sit above their property.
  const classDecoratorLines = header.classLevelAnnotationNodes.map((node) =>
    emitAnnotationAsDecorator(node, ctx),
  );
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
    // Blank line between the namespace block and the class — but
    // only when there are no class-level decorators. Decorators bind
    // tightly to the next class declaration in idiomatic TS, so the
    // blank line goes ABOVE the decorator stack instead.
    if (classDecoratorLines.length === 0) out.push('');
  }
  out.push(...classDecoratorLines, classHeader, ...memberLines, '}', '');
  return out.join('\n');
}

/**
 * Map a raw GD `class_name` (or empty for an anonymous script) to the
 * TS-side class name. Four cases collapse onto two axes — has-name and
 * is-addon:
 *
 *   |             | non-addon                          | addon                  |
 *   |-------------|------------------------------------|------------------------|
 *   | no name     | `_FilenameInUpperCamel`            | `_$CLASS$_` sentinel   |
 *   | `class_name`| `escapeUnderscoreClassName(raw)`   | `raw` verbatim         |
 *
 * Why addons differ on both axes:
 *   - Anonymous: `_$CLASS$_` uses `$` (invalid in GD identifiers) so
 *     it can't collide with any real GD class. Each addon `.ts` is
 *     its own ES module, so multiple files exporting the sentinel
 *     don't collide either.
 *   - Named with `_` prefix: addon class names are external — the
 *     third-party owns them and consumers reference them by exact
 *     name — so renaming `_Foo` to `G_Foo` would silently break
 *     things. With `_$CLASS$_` claiming the "anonymous" slot, a real
 *     `class_name _Foo` is unambiguous and the escape is unnecessary.
 */
function resolveTsClassName(rawName: string, ctx: GdToTsContext): string {
  if (!rawName) {
    return ctx.isAddon
      ? ANONYMOUS_ADDON_CLASS_NAME
      : gdFilenameToAnonymousClassName(ctx.filePath);
  }
  return ctx.isAddon ? rawName : escapeUnderscoreClassName(rawName);
}

// ─── Header scan ──────────────────────────────────────────────

interface ScriptClassHeader {
  /** Raw GD `class_name` text (verbatim from the AST). Empty when GD has no `class_name`. The `_Foo` → `G_Foo` escape and the addon-mode preserve-verbatim decision are made by the caller, which has `ctx.isAddon` in scope. */
  className: string;
  /** Base class from `extends <X>`. Empty when no explicit extends. */
  extendsClass: string;
  /** True when `@abstract` sits above `extends` / `class_name`. */
  isAbstractClass: boolean;
  /**
   * Indices of root-level annotations consumed by the header — both
   * `@abstract` (handled via `isAbstractClass` / abstract-function
   * tracking) and class-level annotations like `@tool` / `@icon` that
   * appear above `extends` / `class_name`. Skipped during member
   * emission so they don't get re-emitted as field decorators.
   */
  rootAbstractAnnotationIndices: Set<number>;
  /** Indices of functions that have a preceding `@abstract` — rendered as `abstract method() {}`. */
  abstractFunctionIndices: Set<number>;
  /** Indices of inner classes that have a preceding `@abstract` — rendered as `export abstract class ...`. */
  abstractClassIndices: Set<number>;
  /**
   * Class-level annotation nodes (e.g. `@tool`, `@icon("res://x.svg")`)
   * that sit above `extends` / `class_name` and apply to the script
   * class itself. Rendered by the caller via `emitAnnotationAsDecorator`
   * and emitted on their own lines BEFORE the `export class` header,
   * mirroring TypeScript's class decorator syntax.
   */
  classLevelAnnotationNodes: SyntaxNode[];
}

/**
 * Single pass over the file root collecting everything needed to
 * compose the eventual script class header: name, extends, abstract
 * flags, and any class-level annotations (`@tool`, `@icon`, …) that
 * sit above the header statements. Pure — doesn't touch `ctx`.
 *
 * Class-level annotations are identified positionally: any
 * `Annotation` child whose NEXT non-annotation neighbour at root is
 * an `ExtendsStatement` or `ClassNameStatement`. `@abstract` follows
 * its own dedicated path (it influences `isAbstractClass`); other
 * annotations get added to `classLevelAnnotationNodes` for the caller
 * to render. The neighbour-walk skips intermediate annotations so a
 * stack like `@tool` / `@icon(...)` / `extends Node` all qualify as
 * class-level, not just the one immediately preceding `extends`.
 */
function scanScriptClassHeader(root: SyntaxNode): ScriptClassHeader {
  let className = '';
  let extendsClass = '';
  let isAbstractClass = false;
  const rootAbstractAnnotationIndices = new Set<number>();
  const abstractFunctionIndices = new Set<number>();
  const abstractClassIndices = new Set<number>();
  const classLevelAnnotationNodes: SyntaxNode[] = [];

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
      // Capture the raw `class_name` text. The escape decision is made
      // by the caller (which has the `isAddon` flag in `ctx`): in
      // non-addon mode `_Foo` collides with the anonymous-class
      // convention and gets escaped to `G_Foo`; in addon mode the
      // sentinel `_$CLASS$_` already owns the "anonymous" namespace,
      // so `_Foo` is unambiguous as a real class_name and is preserved
      // verbatim — addon class names are global and the user can't
      // change them, so renaming would break consumer references.
      className = child.childForFieldName('name')?.text ?? '';
    } else if (child.type === SyntaxType.Annotation) {
      // Find the next "real" node: skip both annotations (other
      // members of an annotation stack) AND comments (a `# note`
      // between `@tool` and `extends` shouldn't cause `@tool` to be
      // misclassified as field-level). If that node is a header
      // statement, this annotation applies to the class itself; if
      // there's no following node at all, the annotation is trailing
      // — also treat as class-level so it isn't silently dropped.
      const next = nextNonAnnotationOrComment(root, i);
      const targetsClass =
        !next ||
        next.type === SyntaxType.ExtendsStatement ||
        next.type === SyntaxType.ClassNameStatement;

      if (child.text === '@abstract') {
        // Use the same `next` lookup as non-abstract class
        // annotations — `@abstract` followed by `@tool` followed by
        // `extends` should still mark the class abstract, mirroring
        // GDScript's tolerance for arbitrary annotation ordering
        // above the header.
        if (
          next?.type === SyntaxType.ExtendsStatement ||
          next?.type === SyntaxType.ClassNameStatement
        ) {
          isAbstractClass = true;
          rootAbstractAnnotationIndices.add(i);
        } else if (next?.type === SyntaxType.FunctionDefinition) {
          // Function-level @abstract: the immediate-next is still an
          // annotation in stacked cases, so resolve by index past any
          // intervening annotations.
          const targetIndex = indexOfNextNonAnnotationOrComment(root, i);
          if (targetIndex !== -1) abstractFunctionIndices.add(targetIndex);
          rootAbstractAnnotationIndices.add(i);
        } else if (next?.type === SyntaxType.ClassDefinition) {
          const targetIndex = indexOfNextNonAnnotationOrComment(root, i);
          if (targetIndex !== -1) abstractClassIndices.add(targetIndex);
          rootAbstractAnnotationIndices.add(i);
        }
      } else if (targetsClass) {
        // E.g. `@tool` / `@icon("res://...")` above `extends Node`,
        // or a trailing annotation with no member after it. Mark as
        // consumed-by-header AND remember the node so the caller can
        // render it as a TS class decorator.
        classLevelAnnotationNodes.push(child);
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
    classLevelAnnotationNodes,
  };
}

/**
 * Return the next root-level child after `start` that is neither an
 * `Annotation` nor a `Comment`, or `null` if none exists. Used to
 * look past stacks of annotations (`@tool` / `@icon`) and any
 * intervening comments when classifying which declaration an
 * annotation actually decorates. Comments are skipped because they
 * don't change the GDScript parser's view of "what does this
 * annotation attach to" — `@tool` / `# comment` / `extends Node`
 * still has `@tool` attached to the script class.
 */
function nextNonAnnotationOrComment(
  root: SyntaxNode,
  start: number,
): SyntaxNode | null {
  const j = indexOfNextNonAnnotationOrComment(root, start);
  return j === -1 ? null : root.namedChildren[j]!;
}

/**
 * Index variant of {@link nextNonAnnotationOrComment} for callers
 * that need to mark the target by position (e.g.
 * `abstractFunctionIndices` / `abstractClassIndices`). Returns `-1`
 * when no qualifying child exists.
 */
function indexOfNextNonAnnotationOrComment(
  root: SyntaxNode,
  start: number,
): number {
  for (let j = start + 1; j < root.namedChildren.length; j++) {
    const candidate = root.namedChildren[j]!;
    if (
      candidate.type !== SyntaxType.Annotation &&
      candidate.type !== SyntaxType.Comment
    ) {
      return j;
    }
  }
  return -1;
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

  // Defensive flush: any annotation that didn't claim a target via
  // the loop above (no member followed it, and the header-scan
  // didn't pull it in as class-level) gets emitted at the end so it
  // is never silently dropped. Header-scan already routes
  // trailing-only annotations to the class header, so reaching this
  // path means an annotation appeared between members in an
  // unrecognised position — surface it rather than swallowing it.
  flushPendingAnnotations();

  // Remove trailing empty lines from members
  while (
    memberLines.length > 0 &&
    memberLines[memberLines.length - 1]!.trim() === ''
  ) {
    memberLines.pop();
  }

  return { memberLines, fileScopeLines };
}
