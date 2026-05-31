/**
 * Script-class body emission for TS→GD conversion.
 *
 * `emitClassHeader` writes `extends Base` / `class_name Foo` / the
 * `const X = preload(...)` lines for imports, then flags any class
 * field/method whose name collides with an imported local or a
 * file-scope lift. Returns the resolved class name so the caller can
 * update `currentClassName` without a callback round-trip.
 *
 * `emitClassMembers` walks the class's body and emits signals,
 * enums, properties, methods, the constructor, accessor pairs, and
 * inline inner classes in declaration order — with the blank-line
 * policy that matches idiomatic GDScript (functions surrounded by
 * blanks, plain properties pack tight). Used for BOTH the script
 * class body AND inner-class bodies (via `opts.passIfEmpty`).
 *
 * Both functions operate on a `TransformerDelegate` plus explicit
 * context values (import map, lifted names, import consts) rather
 * than reaching into private transformer state — keeps the
 * dependency surface visible.
 */

import ts from 'typescript';
import { isAnonymousClassName } from '../common/index.ts';
import type { ImportEntry } from './imports.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import {
  isSignalProperty,
  isEnumProperty,
  visitSignalDeclaration,
  visitEnumDeclaration,
  visitPropertyDeclaration,
  visitAccessorPair,
  visitConstructor,
  visitMethodDeclaration,
  getDecorators,
} from './class-members.ts';

/**
 * Context values `emitClassHeader` needs from the transformer.
 * Passed explicitly instead of reaching into private fields so the
 * dependency surface is visible at the call site.
 */
export interface ClassHeaderCtx {
  importMap: Map<string, ImportEntry>;
  liftedNames: Set<string>;
  importConsts: string[];
}

// ---- Class Header (extends + class_name + import consts) ----
//
// Emitted once, at the top of the GD output, regardless of where the
// class declaration sits in the TS source. Returns the resolved
// class name so the caller can update `_currentClassName` — used by
// downstream type lookups (e.g. `Foo.X` qualifier resolution).

export function emitClassHeader(
  node: ts.ClassDeclaration,
  t: TransformerDelegate,
  ctx: ClassHeaderCtx,
): string {
  const pos = t.getLineAndCol(node);

  // Class-level decorators (e.g. `@tool`, `@icon("res://x.svg")`) emit
  // as GDScript class-level annotations BEFORE `extends` / `class_name`.
  // Mirror of the GD→TS direction, where root-level annotations above
  // the header are pulled into TS class-decorator position.
  for (const dec of getDecorators(node, t)) {
    t.emitter.writeLine(dec, pos.line, pos.col);
  }

  // abstract class -> @abstract annotation before extends/class_name
  const isAbstract = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
  );
  if (isAbstract) {
    t.emitter.writeLine('@abstract', pos.line, pos.col);
  }

  // extends — rewritten to `extends "res://…"` when the base type
  // resolves to an imported anonymous class (which has no
  // `class_name`, so a string-literal path is the only valid form).
  // For non-anonymous and same-file extends, emit the bare identifier.
  //
  // When no `extends` clause is present, GDScript silently defaults to
  // `RefCounted`. That works but is implicit — flag as a `type-error`
  // so editors/lint surface a nudge toward explicit declaration
  // without blocking GD output.
  let hasExtends = false;
  if (node.heritageClauses) {
    for (const clause of node.heritageClauses) {
      if (
        clause.token === ts.SyntaxKind.ExtendsKeyword &&
        clause.types.length > 0
      ) {
        hasExtends = true;
        const baseType = clause.types[0]!;
        const expr = baseType.expression;
        // `extends preload("res://some.gd")` → `extends "res://some.gd"`.
        // GDScript supports a string-literal extends form for extending
        // a script by file path (used for anonymous scripts that don't
        // declare `class_name`). The TS-side mirror is `preload(...)`.
        let extendsClause: string;
        if (
          ts.isCallExpression(expr) &&
          ts.isIdentifier(expr.expression) &&
          expr.expression.text === 'preload' &&
          expr.arguments.length >= 1 &&
          ts.isStringLiteralLike(expr.arguments[0]!)
        ) {
          const path = (expr.arguments[0] as ts.StringLiteralLike).text;
          extendsClause = `extends "${path}"`;
        } else {
          const baseText = expr.getText(t.ctx.sourceFile);
          const importedAnon = ctx.importMap.get(baseText);
          extendsClause =
            importedAnon && importedAnon.isAnonymous
              ? `extends "${importedAnon.resPath}"`
              : `extends ${baseText}`;
        }
        t.emitter.writeLine(extendsClause, pos.line, pos.col);
      }
    }
  }
  if (!hasExtends) {
    t.addDiagnostic(
      node.name ?? node,
      'type-error',
      'Class has no `extends` clause. GDScript defaults to `RefCounted` — ' +
        'declare `extends RefCounted` explicitly.',
    );
  }

  // class_name emission rules under the naming convention:
  //   - `_FilenameInUpperCamel`  → anonymous; do NOT emit `class_name`
  //   - everything else          → emit `class_name <name>` verbatim
  //
  // `G_` is the one-way escape applied during GD→TS conversion as a
  // fallback for the rare GD `class_name _Foo` that would otherwise
  // collide with the anonymous-class convention on the TS side. It
  // is NOT undone on TS→GD — once the user has `G_Foo` in their TS
  // source, that becomes the canonical name everywhere (the emitted
  // GD has `class_name G_Foo`). Treating it as a normal identifier
  // keeps the round-trip predictable: whatever TS shows is what the
  // user reads in the .gd file too.
  const className = node.name?.getText(t.ctx.sourceFile) ?? '';
  if (className && !isAnonymousClassName(className)) {
    t.emitter.writeLine(`class_name ${className}`, pos.line, pos.col);
  }

  // `const X = preload("res://…")` lines for renamed and anonymous
  // imports. Emitted between `class_name`/`extends` and the class
  // body — the conventional spot for top-level `const` in GDScript.
  if (ctx.importConsts.length > 0) {
    t.emitter.writeEmptyLine();
    for (const line of ctx.importConsts) {
      t.emitter.writeLine(line, pos.line, pos.col);
    }
  }

  // Hard-error any class field/method whose name collides with
  // either an imported local (renamed/anonymous class import) OR a
  // file-scope lift (`const`/`enum`/`class`/namespace export). All
  // of these become same-scope members in the emitted GD class, so
  // a name clash there isn't recoverable. Anchor the diagnostic at
  // the offending field's source location so the IDE highlight is
  // accurate.
  for (const member of node.members) {
    if (
      (ts.isPropertyDeclaration(member) || ts.isMethodDeclaration(member)) &&
      member.name &&
      ts.isIdentifier(member.name)
    ) {
      const name = member.name.text;
      if (ctx.importMap.has(name)) {
        t.addDiagnostic(
          member.name,
          'error',
          `Field/method name "${name}" conflicts with an imported class of the same name. Rename the field or the import alias.`,
        );
      } else if (ctx.liftedNames.has(name)) {
        t.addDiagnostic(
          member.name,
          'error',
          `Field/method name "${name}" conflicts with a file-scope declaration that lifts into this class. Rename the field or the file-scope declaration.`,
        );
      }
    }
  }

  return className;
}

// ---- Class Members (signals, enums, properties, methods, ...) ----
//
// Walks the class's member list and emits GDScript declarations in
// source order with idiomatic blank-line spacing (functions and
// inner classes surrounded by blanks; plain fields pack tight).
// Used for both the script class body AND inner classes — the
// opts let the caller tune behaviors that differ between the two.

export interface EmitClassMembersOpts {
  /**
   * Emit a leading blank line before the first member. The script
   * class wants this to separate the member block from the
   * `extends`/`class_name` header. Inner classes pack tight after
   * `class Foo:` so they typically pass `false`.
   * Default: `true`.
   */
  leadingBlank?: boolean;

  /**
   * Emit `pass` when the class body is empty. Required for inner
   * classes (GDScript syntax error otherwise). Script classes can
   * be empty — nothing follows `extends`/`class_name`, so no `pass`
   * is needed. Default: `false`.
   */
  passIfEmpty?: boolean;

  /**
   * When emitting additional lifted members BEFORE the regular
   * members (e.g. an inner class with a paired namespace), the
   * caller sets this to `true` so the first member's spacing logic
   * treats itself as a continuation rather than the first line.
   * Default: `false`.
   */
  hasPriorContent?: boolean;
}

export function emitClassMembers(
  node: ts.ClassDeclaration,
  t: TransformerDelegate,
  opts?: EmitClassMembersOpts,
): void {
  const leadingBlank = opts?.leadingBlank ?? true;
  const passIfEmpty = opts?.passIfEmpty ?? false;
  const hasPriorContent = opts?.hasPriorContent ?? false;

  if (leadingBlank) t.emitter.writeEmptyLine();

  // Emit members preserving declaration order.
  // All members (signals, enums, properties, methods, inner classes, constructor)
  // are emitted in their original interleaved order.
  type OrderedMember =
    | { kind: 'signal'; node: ts.PropertyDeclaration }
    | { kind: 'enum'; node: ts.PropertyDeclaration }
    | { kind: 'property'; node: ts.PropertyDeclaration }
    | { kind: 'method'; node: ts.MethodDeclaration }
    | { kind: 'constructor'; node: ts.ConstructorDeclaration }
    | { kind: 'innerClass'; node: ts.PropertyDeclaration }
    | {
        kind: 'accessor';
        name: string;
        get?: ts.GetAccessorDeclaration;
        set?: ts.SetAccessorDeclaration;
        node: ts.Node;
      };
  const orderedMembers: OrderedMember[] = [];

  for (const member of node.members) {
    if (ts.isPropertyDeclaration(member)) {
      if (isSignalProperty(member, t)) {
        orderedMembers.push({ kind: 'signal', node: member });
      } else if (isEnumProperty(member, t)) {
        orderedMembers.push({ kind: 'enum', node: member });
      } else if (
        member.initializer &&
        ts.isClassExpression(member.initializer)
      ) {
        orderedMembers.push({ kind: 'innerClass', node: member });
      } else {
        orderedMembers.push({ kind: 'property', node: member });
      }
    } else if (ts.isMethodDeclaration(member)) {
      orderedMembers.push({ kind: 'method', node: member });
    } else if (ts.isConstructorDeclaration(member)) {
      orderedMembers.push({ kind: 'constructor', node: member });
    } else if (
      ts.isGetAccessorDeclaration(member) ||
      ts.isSetAccessorDeclaration(member)
    ) {
      // Pair `get X` and `set X` with the same name into one entry so they
      // emit as a single GDScript `var X: get: ... set(v): ...` block.
      const name =
        member.name && ts.isIdentifier(member.name)
          ? member.name.text
          : undefined;
      if (!name) continue;
      const existing = orderedMembers.find(
        (e) => e.kind === 'accessor' && e.name === name,
      ) as
        | {
            kind: 'accessor';
            name: string;
            get?: ts.GetAccessorDeclaration;
            set?: ts.SetAccessorDeclaration;
            node: ts.Node;
          }
        | undefined;
      if (existing) {
        if (ts.isGetAccessorDeclaration(member)) existing.get = member;
        else existing.set = member;
      } else {
        orderedMembers.push({
          kind: 'accessor',
          name,
          get: ts.isGetAccessorDeclaration(member) ? member : undefined,
          set: ts.isSetAccessorDeclaration(member) ? member : undefined,
          node: member,
        } as OrderedMember);
      }
    }
  }

  if (orderedMembers.length === 0) {
    if (passIfEmpty) {
      const pos = t.getLineAndCol(node);
      t.emitter.writeLine('pass', pos.line, pos.col);
    }
    return;
  }

  // Emit members in original declaration order
  let lastEmittedTrailingBlank = false;
  let lastWasFunc = false;
  for (let i = 0; i < orderedMembers.length; i++) {
    const entry = orderedMembers[i]!;
    const isLast = i === orderedMembers.length - 1;

    // A "function-like" entry -- methods, constructors, accessors, and
    // properties initialized via `gd.getset` -- should be surrounded by
    // blank lines for readability.
    const isGdGetsetProp =
      entry.kind === 'property' &&
      entry.node.initializer !== undefined &&
      t.isGdHelperCall(entry.node.initializer, 'getset');
    const isFunc =
      entry.kind === 'method' ||
      entry.kind === 'constructor' ||
      entry.kind === 'accessor' ||
      isGdGetsetProp;
    // `hasPriorContent` threads through so when an inner class emits
    // paired-namespace lifted members BEFORE its own class members,
    // the first class-member's spacing logic treats itself as a
    // continuation (i > 0 behavior) rather than the first line.
    const isContinuation = i > 0 || hasPriorContent;
    if (
      isContinuation &&
      !lastEmittedTrailingBlank &&
      (isFunc || lastWasFunc || entry.kind === 'innerClass')
    ) {
      t.emitter.writeEmptyLine();
    }

    lastEmittedTrailingBlank = false;

    switch (entry.kind) {
      case 'signal':
        t.emitLeadingComments(entry.node);
        visitSignalDeclaration(entry.node, t);
        break;
      case 'enum':
        t.emitLeadingComments(entry.node);
        visitEnumDeclaration(entry.node, t);
        break;
      case 'property':
        t.emitLeadingComments(entry.node);
        visitPropertyDeclaration(entry.node, t);
        if (isGdGetsetProp && !isLast) {
          t.emitter.writeEmptyLine();
          lastEmittedTrailingBlank = true;
        }
        break;
      case 'method':
        t.emitLeadingComments(entry.node);
        visitMethodDeclaration(entry.node, t);
        if (!isLast) {
          t.emitter.writeEmptyLine();
          lastEmittedTrailingBlank = true;
        }
        break;
      case 'constructor':
        t.emitLeadingComments(entry.node);
        visitConstructor(entry.node, t);
        if (!isLast) {
          t.emitter.writeEmptyLine();
          lastEmittedTrailingBlank = true;
        }
        break;
      case 'innerClass':
        t.emitLeadingComments(entry.node);
        visitPropertyDeclaration(entry.node, t);
        if (!isLast) {
          t.emitter.writeEmptyLine();
          lastEmittedTrailingBlank = true;
        }
        break;
      case 'accessor':
        visitAccessorPair(entry.name, entry.get, entry.set, t);
        if (!isLast) {
          t.emitter.writeEmptyLine();
          lastEmittedTrailingBlank = true;
        }
        break;
    }

    lastWasFunc = isFunc;
  }

  // Emit trailing comments before the class closing brace
  const closeBrace = node.getLastToken();
  if (closeBrace) {
    const sourceText = t.ctx.sourceFile.getFullText();
    const ranges = ts.getLeadingCommentRanges(
      sourceText,
      closeBrace.getFullStart(),
    );
    if (ranges && ranges.length > 0) {
      t.emitter.writeEmptyLine();
      t.emitLeadingComments(closeBrace);
    }
  }
}
