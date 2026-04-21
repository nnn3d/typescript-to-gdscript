/**
 * File-scope declaration lifting for TS→GD conversion.
 *
 * The conversion model treats the `.ts` file as a GDScript script
 * class plus lifted file-scope declarations. TS users express class-
 * level consts / enums / inner classes via an explicit
 * `export namespace Foo { ... } export class Foo` pair — TypeScript's
 * native namespace+class merging makes `Foo.X` resolve cross-file
 * and `this.X` resolve on instance (matching GDScript's `self.X`).
 *
 * The namespace's members LIFT:
 *   - top-level (paired with the script class)    → GD top-level decls
 *   - nested (paired with a sibling inner class)  → inside that inner class's body
 *
 * The single shared walker `emitNamespaceBody` does the pairing —
 * both `emitFileScopeNamespace` (top-level) and `emitFileScopeClass`
 * (when given a `pairedNamespace`) call it, so the exact same
 * logic applies at every nesting depth.
 */

import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import type { ImportEntry } from './imports.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import { emitClassMembers } from './class-body.ts';

// ---- File-scope `const` lifting ----
//
// A top-level `const X = …;` (inside the script-class-paired
// namespace) becomes `const X = …` inside the script class body in
// GDScript, emitted at the source position of the user's
// declaration relative to other top-level statements. Multiple
// declarations on one line (`const a = 1, b = 2;`) emit as separate
// GD const lines.
//
// `let` / `var` at file scope have no clean GD equivalent at script-
// class scope (mutable globals don't exist in GDScript outside of
// `static var`, which is a class-member concept). Surface as an error.

export function emitFileScopeVariable(
  node: ts.VariableStatement,
  t: TransformerDelegate,
  opts?: { leadingBlank?: boolean },
): void {
  const leadingBlank = opts?.leadingBlank ?? true;
  const flags = node.declarationList.flags;
  const isConst = (flags & ts.NodeFlags.Const) !== 0;
  if (!isConst) {
    t.addDiagnostic(
      node,
      'error',
      'File-scope `let` / `var` is not supported — use `const`, or move it inside the class as an instance / static member.',
    );
    return;
  }

  for (const decl of node.declarationList.declarations) {
    if (!decl.name || !ts.isIdentifier(decl.name)) {
      t.addDiagnostic(
        decl,
        'error',
        'File-scope `const` must use a simple identifier (no destructuring patterns).',
      );
      continue;
    }
    if (!decl.initializer) {
      t.addDiagnostic(
        decl,
        'error',
        'File-scope `const` must have an initializer (GDScript `const` requires a value).',
      );
      continue;
    }

    const pos = t.getLineAndCol(decl);
    const name = decl.name.text;
    const gdType = decl.type
      ? tsTypeNodeToGdType(
          decl.type,
          t.ctx.checker,
          t.ctx.sourceFile,
          t.currentClassName,
        )
      : null;

    // One blank line before each file-scope const — mirrors the
    // section-style spacing `emitClassMembers` uses for its leading
    // break, so source-mixed `const X; class Foo {}; const Y;` yields
    // properly-spaced output. Suppressed when called from inside a
    // class body (`leadingBlank: false`) — there the parent class
    // emitter controls spacing.
    if (leadingBlank) t.emitter.writeEmptyLine();
    t.emitLeadingComments(decl);
    let line = `const ${name}`;
    if (gdType) line += `: ${gdType}`;
    line += ` = ${t.emitExpression(decl.initializer)}`;
    t.emitter.writeLine(line, pos.line, pos.col);
  }
}

// ---- File-scope native `enum` lifting ----
//
// `enum X { A, B, C }` at file scope becomes `enum X { A, B, C }`
// inside the script class body. Auto-incrementing values are
// preserved. Explicit numeric initializers map directly. String
// initializers are an error — GDScript enums are integer-only.
//
// We deliberately don't try to evaluate non-literal initializers
// (e.g. `A = OTHER_CONST + 1`); GDScript itself accepts certain
// const expressions in enum initializers and Godot's validator
// catches anything it can't evaluate. Per the design, the converter
// emits what the user wrote and lets Godot enforce semantic rules.

export function emitFileScopeEnum(
  node: ts.EnumDeclaration,
  t: TransformerDelegate,
  opts?: { leadingBlank?: boolean },
): void {
  const leadingBlank = opts?.leadingBlank ?? true;
  const pos = t.getLineAndCol(node);
  const name = node.name.text;

  const members: string[] = [];
  for (const member of node.members) {
    const memberName = member.name.getText(t.ctx.sourceFile);
    const init = member.initializer;
    if (!init) {
      members.push(memberName);
      continue;
    }
    if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) {
      t.addDiagnostic(
        init,
        'error',
        `Enum member "${memberName}" has a string value. GDScript enums only support integer values — remove the initializer or use a numeric one.`,
      );
      // Drop the bad initializer; emit just the name so we still
      // produce parseable GD.
      members.push(memberName);
      continue;
    }
    // Pass through whatever the user wrote (numeric literal,
    // negation, identifier reference to another const). Godot
    // will reject unevaluable forms during validation.
    members.push(`${memberName} = ${init.getText(t.ctx.sourceFile)}`);
  }

  // Same blank-line policy as file-scope const — one blank before
  // each top-level emission keeps mixed source readable. Suppressed
  // inside a class body (`leadingBlank: false`).
  if (leadingBlank) t.emitter.writeEmptyLine();
  t.emitLeadingComments(node);
  t.emitter.writeLine(
    `enum ${name} { ${members.join(', ')} }`,
    pos.line,
    pos.col,
  );
}

// ---- File-scope class lifting (→ GDScript inner class) ----
//
// A file-scope `class X { ... }` (inside the script-class-paired
// namespace, any declaration that isn't the script class itself)
// becomes a GDScript inner class declared inside the script class
// body at the source position. Body members reuse the class-
// members.ts emitters.
//
// When `pairedNamespace` is set, the namespace's lifted content
// (`const`s / `enum`s / nested inner classes) emits INSIDE this
// class's body BEFORE its own members. That's the mechanism that
// makes `namespace Inner { const TYPE; } class Inner { static VAL; }`
// produce `class Inner: const TYPE; static var VAL` at any depth.

export function emitFileScopeClass(
  node: ts.ClassDeclaration,
  t: TransformerDelegate,
  importMap: Map<string, ImportEntry>,
  opts?: {
    leadingBlank?: boolean;
    /**
     * Flat list of statements from any namespace(s) paired with this
     * class by name. When the user writes multiple same-name namespace
     * blocks — which TypeScript merges natively — their statements are
     * concatenated in source order by `emitNamespaceBody` so all their
     * lifted members emit inside this class.
     */
    pairedStatements?: readonly ts.Statement[];
  },
): void {
  const leadingBlank = opts?.leadingBlank ?? true;
  const pairedStatements = opts?.pairedStatements;
  const name = node.name?.getText(t.ctx.sourceFile);
  if (!name) {
    t.addDiagnostic(
      node,
      'error',
      'File-scope class must have a name (no anonymous classes at file scope).',
    );
    return;
  }
  const pos = t.getLineAndCol(node);
  const isAbstract = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
  );
  let extendsClause = '';
  let hasExtends = false;
  if (node.heritageClauses) {
    for (const clause of node.heritageClauses) {
      if (
        clause.token === ts.SyntaxKind.ExtendsKeyword &&
        clause.types.length > 0
      ) {
        hasExtends = true;
        const baseType = clause.types[0]!;
        const baseText = baseType.expression.getText(t.ctx.sourceFile);
        // Same import-aware extends-rewrite as the script class:
        // when extending an imported anonymous class, GDScript needs
        // the path-literal form.
        const importedAnon = importMap.get(baseText);
        extendsClause =
          importedAnon && importedAnon.isAnonymous
            ? ` extends "${importedAnon.resPath}"`
            : ` extends ${baseText}`;
      }
    }
  }
  if (!hasExtends) {
    t.addDiagnostic(
      node.name ?? node,
      'type-error',
      'Class has no `extends` clause. GDScript defaults to `RefCounted` — ' +
        'declare `extends RefCounted` explicitly (or use a different base like ' +
        '`Node`, `Resource`, etc.) so the intent is clear in both languages.',
    );
  }

  // Blank line before the inner class — matches the section spacing
  // we use for file-scope consts so mixed top-level decls stay readable.
  // Suppressed when called from inside a parent class body
  // (`leadingBlank: false`) so members pack tight.
  if (leadingBlank) t.emitter.writeEmptyLine();
  t.emitLeadingComments(node);
  if (isAbstract) {
    t.emitter.writeLine('@abstract', pos.line, pos.col);
  }
  t.emitter.writeLine(`class ${name}${extendsClause}:`, pos.line, pos.col);
  t.emitter.indent();

  // Paired namespace's lifted content comes FIRST (consts, enums,
  // nested inner classes). Emitted at the CURRENT indent (inside this
  // class's body) via `emitNamespaceBody(..., insideClassBody=true)`,
  // which propagates `leadingBlank: false` down to each lifted entry
  // so members pack tight inside the class body.
  const hasNamespaceContent =
    pairedStatements !== undefined &&
    pairedStatements.some(
      (s) =>
        ts.isVariableStatement(s) ||
        ts.isEnumDeclaration(s) ||
        ts.isClassDeclaration(s),
    );
  if (pairedStatements && pairedStatements.length > 0) {
    emitNamespaceBody(pairedStatements, t, importMap, true);
  }

  // Class's own members — shared walker from `class-body.ts`. Inner
  // class context:
  //   - no leading blank (members pack tight after `class Foo:`)
  //   - `pass` if totally empty (GDScript requires a body)
  //   - `hasPriorContent` forwarded so the first member's spacing
  //     logic sees the paired-namespace content as a predecessor.
  const hasAnyClassMember = node.members.some(
    (m) =>
      ts.isPropertyDeclaration(m) ||
      ts.isMethodDeclaration(m) ||
      ts.isConstructorDeclaration(m) ||
      ts.isGetAccessorDeclaration(m) ||
      ts.isSetAccessorDeclaration(m),
  );
  emitClassMembers(node, t, {
    leadingBlank: false,
    // Only emit `pass` when NEITHER the namespace NOR the class body
    // contributed anything — otherwise the `pass` would duplicate with
    // actual content.
    passIfEmpty: !hasNamespaceContent && !hasAnyClassMember,
    hasPriorContent: hasNamespaceContent,
  });

  t.emitter.dedent();
}

// ---- File-scope `namespace` lifting ----
//
// A namespace at file scope must be paired with a same-named class.
// Top-level: pairs with the script class (namespace members lift to
// script-class scope, rendering as top-level GD decls). Nested:
// pairs with a sibling inner class (namespace members lift INSIDE
// the inner class's body — see `emitFileScopeClass`'s
// `pairedNamespace` branch).

export function emitFileScopeNamespace(
  node: ts.ModuleDeclaration,
  scriptClass: ts.ClassDeclaration,
  t: TransformerDelegate,
  importMap: Map<string, ImportEntry>,
): void {
  const namespaceName = ts.isIdentifier(node.name) ? node.name.text : '';
  const expectedName = scriptClass.name?.text ?? '';
  if (namespaceName !== expectedName) {
    t.addDiagnostic(
      node.name,
      'error',
      `Namespace "${namespaceName}" does not match the script class "${expectedName}". File-scope namespaces must pair with the script class (their members lift into its body).`,
    );
    return;
  }

  if (!node.body || !ts.isModuleBlock(node.body)) {
    // `namespace X.Y { ... }` (qualified name body) or empty
    // namespace — we don't support qualified-name nesting at file
    // scope; users should write nested namespaces explicitly.
    t.addDiagnostic(
      node,
      'error',
      'Namespace must use a `{ ... }` block body (no qualified-name forms).',
    );
    return;
  }

  // TypeScript merges multiple same-name `namespace Foo { ... }` blocks
  // at the same scope natively. Honor that: when the user writes three
  // `namespace Merged { ... }` blocks, their bodies concatenate in
  // source order into a single merged statement list — so a
  // `namespace Inner { ... }` in one block can pair with a
  // `class Inner { ... }` in another.
  //
  // We only emit on the FIRST occurrence; subsequent same-name
  // namespaces become no-ops. This preserves source position (merged
  // content appears where the user wrote the first block) and avoids
  // duplicate output.
  const sf = node.getSourceFile();
  const firstMatch = sf.statements.find(
    (s): s is ts.ModuleDeclaration =>
      ts.isModuleDeclaration(s) &&
      ts.isIdentifier(s.name) &&
      s.name.text === namespaceName,
  );
  if (firstMatch !== node) return;

  const mergedStatements: ts.Statement[] = [];
  for (const s of sf.statements) {
    if (
      ts.isModuleDeclaration(s) &&
      ts.isIdentifier(s.name) &&
      s.name.text === namespaceName &&
      s.body &&
      ts.isModuleBlock(s.body)
    ) {
      mergedStatements.push(...s.body.statements);
    }
  }

  // `insideClassBody: false` so each lifted entry prepends a
  // section-break blank line, matching the file-scope layout of the
  // rest of the output.
  emitNamespaceBody(mergedStatements, t, importMap, false);
}

/**
 * True when `stmt` carries the `export` modifier keyword. Used to
 * flag namespace members that would otherwise be invisible to
 * TypeScript declaration merging — the GDScript lift still happens,
 * but the TS side wouldn't resolve the name, so lint surfaces this
 * for the user to fix.
 */
function hasExportModifier(stmt: ts.Statement): boolean {
  const modifiers = ts.canHaveModifiers(stmt)
    ? ts.getModifiers(stmt)
    : undefined;
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

/**
 * Collect statements from all namespace declarations in `statements`
 * grouped by namespace name. When the user writes multiple
 * `namespace Foo { ... }` blocks in the same scope (TypeScript's
 * native declaration merging), all their body statements concatenate
 * in source order — giving the paired class a single flat list to
 * consume.
 *
 * Non-namespace statements are ignored. Empty namespaces (no body
 * block) are silently skipped — `emitFileScopeNamespace` would have
 * errored on an ill-formed top-level one, and nested ones without a
 * body have nothing to contribute.
 */
function collectNamespacesByName(
  statements: readonly ts.Statement[],
): Map<string, ts.Statement[]> {
  const byName = new Map<string, ts.Statement[]>();
  for (const stmt of statements) {
    if (!ts.isModuleDeclaration(stmt)) continue;
    const nsName = ts.isIdentifier(stmt.name) ? stmt.name.text : '';
    if (!nsName) continue;
    if (!stmt.body || !ts.isModuleBlock(stmt.body)) continue;
    const existing = byName.get(nsName);
    if (existing) {
      existing.push(...stmt.body.statements);
    } else {
      byName.set(nsName, [...stmt.body.statements]);
    }
  }
  return byName;
}

/**
 * Walk a list of namespace-body statements and emit their members in
 * GDScript form. When a class statement has same-named sibling
 * namespace(s), those namespaces are consumed by that class (their
 * members lift into the class body) rather than emitted on their own
 * — this is what makes nested `namespace Config { ... class Config
 * { ... } }` produce `class Config: <namespace content> <class
 * content>` at any depth, and it's where multi-block same-name
 * namespaces merge.
 *
 * @param insideClassBody when true, each lifted entry's
 *        leading-blank-line is suppressed so members pack tight
 *        inside the parent class's body. When false (top-level),
 *        each entry gets the section-break blank that the file-scope
 *        layout expects.
 */
function emitNamespaceBody(
  statements: readonly ts.Statement[],
  t: TransformerDelegate,
  importMap: Map<string, ImportEntry>,
  insideClassBody: boolean,
): void {
  const pairedByClassName = collectNamespacesByName(statements);
  const leadingBlank = !insideClassBody;

  // Track which classes have already consumed their paired namespaces
  // so two `class Foo` declarations (a TS error — but we still want to
  // behave gracefully) don't both pull the merged members in.
  const consumedClassNames = new Set<string>();

  for (const stmt of statements) {
    if (
      ts.isTypeAliasDeclaration(stmt) ||
      ts.isInterfaceDeclaration(stmt)
    ) {
      continue;
    }
    // Non-exported namespace members aren't visible outside the
    // namespace via TS's native namespace+class merge — e.g.
    // `const X = 1` (no `export`) inside `namespace Foo` can't be
    // accessed as `Foo.X`. Since the GDScript lift DOES expose the
    // member at class scope (which corresponds to `ClassName.X` in
    // TS), the lack of `export` creates an asymmetry that'd surface
    // as "Property X does not exist on type Foo" in TS. Flag it so
    // the user fixes the source rather than hunting mysterious type
    // errors downstream.
    if (
      ts.isVariableStatement(stmt) ||
      ts.isEnumDeclaration(stmt) ||
      ts.isClassDeclaration(stmt) ||
      ts.isModuleDeclaration(stmt)
    ) {
      if (!hasExportModifier(stmt)) {
        t.addDiagnostic(
          stmt,
          'type-error',
          'Namespace members must be `export`ed to resolve via TypeScript declaration merging. ' +
            'Add the `export` keyword to this declaration so it is accessible as `ClassName.<name>`.',
        );
      }
    }
    if (ts.isVariableStatement(stmt)) {
      emitFileScopeVariable(stmt, t, { leadingBlank });
      continue;
    }
    if (ts.isEnumDeclaration(stmt)) {
      emitFileScopeEnum(stmt, t, { leadingBlank });
      continue;
    }
    if (ts.isClassDeclaration(stmt)) {
      const className = stmt.name?.text ?? '';
      const paired =
        className && !consumedClassNames.has(className)
          ? pairedByClassName.get(className)
          : undefined;
      if (className) consumedClassNames.add(className);
      emitFileScopeClass(stmt, t, importMap, {
        leadingBlank,
        pairedStatements: paired,
      });
      continue;
    }
    if (ts.isModuleDeclaration(stmt)) {
      // Namespace: if it has a same-named sibling class in this
      // body, the class consumes it above. Without a sibling class
      // there's nothing to lift into — error (once per unique name
      // so merged namespaces don't produce N copies of the same
      // error).
      const nsName = ts.isIdentifier(stmt.name) ? stmt.name.text : '';
      const hasSibling = statements.some(
        (s) => ts.isClassDeclaration(s) && s.name?.text === nsName,
      );
      if (!hasSibling) {
        // Only report on the FIRST unpaired namespace of a given
        // name — duplicates would just echo the same message.
        const firstUnpaired = statements.find(
          (s): s is ts.ModuleDeclaration =>
            ts.isModuleDeclaration(s) &&
            ts.isIdentifier(s.name) &&
            s.name.text === nsName,
        );
        if (firstUnpaired === stmt) {
          t.addDiagnostic(
            stmt.name,
            'error',
            `Nested namespace "${nsName}" has no matching sibling class. Inner namespaces must pair with a class of the same name in the same scope.`,
          );
        }
      }
      continue;
    }
    t.addDiagnostic(
      stmt,
      'error',
      `Namespace member not supported: ${ts.SyntaxKind[stmt.kind]}`,
    );
  }
}

// ---- Pre-walk: lifted-name collector ----
//
// Builds the set of identifiers that lift into the SCRIPT class body
// from file-scope decls and the script-class-paired namespace (if
// any). Used by `emitClassHeader`'s field-conflict check — a class
// field whose name collides with a top-level lifted member would
// produce two same-scope GD members.
//
// Scope: only the script-class-paired namespace's DIRECT members
// lift into the script class. Nested namespaces lift into their own
// paired inner class instead — those are structurally isolated from
// the script class's member namespace, so their names CAN'T collide
// with script fields and must not appear in this set.

export function collectLiftedNames(
  sf: ts.SourceFile,
  scriptClass: ts.ClassDeclaration,
): Set<string> {
  const names = new Set<string>();
  const scriptName = scriptClass.name?.text;

  // Direct-member walk: only inspects the immediate children of the
  // given statement list. No recursion into nested namespaces — those
  // names lift into a DIFFERENT inner class, not this one.
  const collectDirectMembers = (
    statements: readonly ts.Statement[],
  ): void => {
    for (const stmt of statements) {
      if (ts.isVariableStatement(stmt)) {
        for (const decl of stmt.declarationList.declarations) {
          if (decl.name && ts.isIdentifier(decl.name)) {
            names.add(decl.name.text);
          }
        }
      } else if (ts.isEnumDeclaration(stmt)) {
        names.add(stmt.name.text);
      } else if (ts.isClassDeclaration(stmt)) {
        if (stmt !== scriptClass && stmt.name) {
          names.add(stmt.name.text);
        }
      }
      // Nested `namespace` / `module` declarations are intentionally
      // skipped — their members are in the enclosing inner class's
      // namespace, not this one.
    }
  };

  // Start with the file's own top-level decls (file-scope const /
  // enum / non-script class — though the current grammar errors on
  // those outside a namespace, we collect them defensively for the
  // conflict check so the error arrives with a clear cause).
  collectDirectMembers(sf.statements);

  // Then the DIRECT members of EVERY script-class-paired namespace
  // (same-name as script class). TypeScript merges multiple same-name
  // `namespace Foo { ... }` blocks natively — the emitter honors that
  // merge, so the collision check needs to see all their members too.
  // Nested modules inside each matching namespace are NOT traversed
  // (their names lift into a DIFFERENT inner class, not this one).
  for (const stmt of sf.statements) {
    if (!ts.isModuleDeclaration(stmt)) continue;
    const nsName = ts.isIdentifier(stmt.name) ? stmt.name.text : '';
    if (nsName !== scriptName) continue;
    if (!stmt.body || !ts.isModuleBlock(stmt.body)) continue;
    collectDirectMembers(stmt.body.statements);
  }

  return names;
}
