/**
 * Nullable helper for GD-to-TS post-processing.
 *
 * Handles `T | null` widening and narrowing at OUT and IN positions. Emit-time
 * IN widening is done separately in the converter (`widenInType` in
 * `../functions.ts`). Four phases run in order every pass:
 *
 *   A  AST-only, both modes. Class fields with a reference-type annotation
 *      that are never assigned (no initializer, no constructor assignment,
 *      no `_ready` assignment) are rewritten to `field: T | null = null`.
 *
 *   B  AST-only, addon mode only. Reference-typed OUT positions that don't
 *      benefit from type-checker feedback — assigned field annotations and
 *      local-variable annotations — get widened up-front via text-based
 *      classification. Function / method / arrow / getter return types are
 *      NOT widened here; they fall through to Phase C like user mode so
 *      narrowing done by Phase D can influence whether they actually need
 *      `| null`.
 *
 *   C  Type-checker driven, both modes, iterative. TS2322 "Type '...null...'
 *      is not assignable to type 'X'" where X is a reference class → widen
 *      the declared type at the assignment target (return annotation, field
 *      annotation, or local variable annotation).
 *
 *   D  Type-checker driven, both modes, iterative. Inverse of Phase C for
 *      parameters: TS2531 / TS18047 "possibly null" on an identifier that
 *      resolves to a parameter declaration → strip `| null` from the
 *      parameter's annotation. Runs AFTER Phase C each pass so return-type
 *      flow (which can depend on params) settles first.
 *
 * Replaces the former `nullable-return.ts` helper — its return-null case is
 * subsumed by Phase C.
 */

import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';
import { findNodeAt } from './explicit-convert.ts';

// ─── Reference-type classification at the TS level ────────────

/**
 * True when the TS type node refers to a Godot reference type (class,
 * user class, or inner class). False for primitives, enums, value types,
 * generics, and special markers.
 *
 * Uses the TS type checker for primitive/enum detection and the Godot
 * registry's constructor set to rule out value types by name.
 */
function isTsReferenceType(
  typeNode: ts.TypeNode,
  checker: ts.TypeChecker,
  registry: GodotClassRegistry,
): boolean {
  const type = checker.getTypeAtLocation(typeNode);
  const excludeFlags =
    ts.TypeFlags.NumberLike |
    ts.TypeFlags.StringLike |
    ts.TypeFlags.BooleanLike |
    ts.TypeFlags.EnumLike |
    ts.TypeFlags.Void |
    ts.TypeFlags.Undefined |
    ts.TypeFlags.Null |
    ts.TypeFlags.Never |
    ts.TypeFlags.Any |
    ts.TypeFlags.Unknown;
  if (type.flags & excludeFlags) return false;

  const text = typeNode.getText().trim();
  // Generic or array syntax — skip (`Array<T>`, `Foo[]`, etc.)
  if (text.includes('<') || text.includes('[')) return false;
  const firstSeg = text.split('.')[0]!.trim();
  if (registry.isConstructor(firstSeg)) return false;

  return true;
}

/** True when the type text already includes `null` as a union member. */
function typeTextIncludesNull(text: string): boolean {
  // Match `null` as a standalone token — `| null`, `null |`, or bare `null`.
  return /(^|[\s|])null(\s*\||$)/.test(text);
}

/** TS-side primitive / special type names that are never widenable. */
const NON_REFERENCE_NAMES = new Set([
  'void',
  'never',
  'any',
  'unknown',
  'number',
  'boolean',
  'string',
  'int',
  'float',
  'bool',
]);

/**
 * Text-only reference-type classification — no TS type-checker required.
 * Used by Phase B (addon mode) where we can't rely on the checker to
 * resolve Godot class typings. Mirrors {@link isTsReferenceType} but
 * consults only the textual form of the annotation.
 */
function isTextReferenceType(
  text: string,
  registry: GodotClassRegistry,
): boolean {
  const cleaned = text.trim();
  if (!cleaned) return false;
  if (NON_REFERENCE_NAMES.has(cleaned)) return false;
  if (cleaned.includes('<') || cleaned.includes('[')) return false;
  const firstSeg = cleaned.split('.')[0]!.trim();
  if (registry.isConstructor(firstSeg)) return false;
  if (registry.isGlobalEnum(firstSeg)) return false;
  // Dotted reference where the first segment is a Godot class → class enum
  // (e.g. `Node.ProcessMode`). Not widenable.
  if (cleaned.includes('.') && registry.hasClass(firstSeg)) return false;
  return true;
}

// ─── Assignment detection ───────────────────────────────────────

/**
 * True when `this.<propName> = ...` appears anywhere inside the given
 * method / constructor body. Mirrors the logic used by
 * `ready-field-types`'s `findReadyAssignment`.
 */
function hasAssignmentTo(
  body: ts.Block | undefined,
  propName: string,
): boolean {
  if (!body) return false;
  let found = false;
  function visit(node: ts.Node): void {
    if (found) return;
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.expression.kind === ts.SyntaxKind.ThisKeyword &&
      node.left.name.text === propName
    ) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(body);
  return found;
}

/**
 * True when the property is assigned somewhere in the class body
 * (initializer, constructor body, or `_ready` method body).
 */
function isPropertyAssigned(
  cls: ts.ClassDeclaration,
  prop: ts.PropertyDeclaration,
  propName: string,
): boolean {
  if (prop.initializer) return true;
  for (const m of cls.members) {
    if (ts.isConstructorDeclaration(m) && hasAssignmentTo(m.body, propName))
      return true;
    if (
      ts.isMethodDeclaration(m) &&
      ts.isIdentifier(m.name) &&
      m.name.text === '_ready' &&
      hasAssignmentTo(m.body, propName)
    ) {
      return true;
    }
  }
  return false;
}

// ─── Phase A: unassigned reference fields ─────────────────────

/**
 * Phase A: find class fields with a reference-typed annotation that are
 * never assigned and rewrite the declaration to `field: T | null = null;`.
 *
 * Emits a single fix replacing the entire property-declaration text range.
 * Runs in both user mode and addon mode.
 */
function collectPhaseAFixes(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  registry: GodotClassRegistry,
): SourceFix[] {
  const fixes: SourceFix[] = [];

  function visitClass(cls: ts.ClassDeclaration): void {
    for (const member of cls.members) {
      if (!ts.isPropertyDeclaration(member)) continue;
      if (!ts.isIdentifier(member.name)) continue;
      if (member.initializer) continue;
      if (!member.type) continue;
      if (member.exclamationToken || member.questionToken) continue;
      if (typeTextIncludesNull(member.type.getText(sourceFile))) continue;
      if (!isTsReferenceType(member.type, checker, registry)) continue;
      if (isPropertyAssigned(cls, member, member.name.text)) continue;

      // Single surgical insert preserves decorators, modifiers, and trailing
      // trivia. Inserting ` | null = null` at the end of the type annotation
      // turns `<decorators> <modifiers> name: T;` into
      // `<decorators> <modifiers> name: T | null = null;` without touching
      // anything else in the declaration.
      const typeEnd = member.type.getEnd();
      fixes.push({
        start: typeEnd,
        end: typeEnd,
        replacement: ' | null = null',
      });
    }
  }

  function visit(node: ts.Node): void {
    if (ts.isClassDeclaration(node)) visitClass(node);
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return fixes;
}

// ─── Phase B: addon-mode full OUT widening ────────────────────

/**
 * Phase B (addon mode only): widen every remaining reference-typed OUT
 * position — class field annotations, function/method/lambda return
 * annotations, getter return annotations, and local variable annotations.
 */
function collectPhaseBFixes(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  registry: GodotClassRegistry,
): SourceFix[] {
  const fixes: SourceFix[] = [];

  function widen(typeNode: ts.TypeNode | undefined): void {
    if (!typeNode) return;
    // Only plain type references are candidates. Skip `typeof`, `keyof`,
    // array literals, unions, conditionals, literal types, etc. — none of
    // those represent a single reference class and widening them produces
    // invalid syntax or nonsense semantics.
    if (!ts.isTypeReferenceNode(typeNode)) return;
    const text = typeNode.getText(sourceFile);
    if (typeTextIncludesNull(text)) return;
    // Use the TS checker to rule out enums that the text form can't catch
    // (e.g. `TestAddon.AddonState` where `TestAddon` is a user class, not a
    // Godot class, so `registry.hasClass` returns false). The checker can
    // still resolve file-local types like this even when Godot typings are
    // unavailable. For references where the checker returns `any` (the
    // Godot-type case), the text check is authoritative.
    const type = checker.getTypeAtLocation(typeNode);
    const hardExclude =
      ts.TypeFlags.EnumLike |
      ts.TypeFlags.NumberLike |
      ts.TypeFlags.StringLike |
      ts.TypeFlags.BooleanLike |
      ts.TypeFlags.Void |
      ts.TypeFlags.Never;
    if (type.flags & hardExclude) return;
    if (!isTextReferenceType(text, registry)) return;
    fixes.push({
      start: typeNode.getEnd(),
      end: typeNode.getEnd(),
      replacement: ' | null',
    });
  }

  function visit(node: ts.Node): void {
    // Function / method / arrow / getter return types are NOT widened here.
    // They go through Phase C's fallback (identical to user mode): start
    // strict, widen on TS2322. This matters because a return type's null
    // status often depends on the parameters, which are themselves subject
    // to Phase D narrowing — trying to fully resolve returns up-front in
    // Phase B would conflict with that later narrowing.
    if (ts.isPropertyDeclaration(node)) widen(node.type);
    else if (ts.isVariableDeclaration(node)) widen(node.type);
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return fixes;
}

// ─── Phase C: TS2322 fallback widening ────────────────────────

/**
 * True when `type` is `null` or a union containing `null`. Used to
 * decide whether a TS2322 diagnostic represents null flowing into a
 * non-null target. Covers both direct nulls (`= null`) and indirect
 * ones (`= fnReturningNull()` where the call's return type is
 * `Node | null`).
 */
function typeIncludesNull(type: ts.Type): boolean {
  if (type.flags & ts.TypeFlags.Null) return true;
  if (type.isUnion()) {
    return type.types.some((t) => t.flags & ts.TypeFlags.Null);
  }
  return false;
}

/**
 * Given a diagnostic node, find the "source expression" — the value being
 * assigned / returned / initialized. TS2322 diagnostics can land on
 * intermediate nodes (the `return` keyword, the whole statement) rather
 * than the value expression itself, so we walk up through the common
 * carriers until we find an actual expression.
 */
function findSourceExpression(node: ts.Node): ts.Expression | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isReturnStatement(current)) return current.expression;
    if (ts.isVariableDeclaration(current) && current.initializer)
      return current.initializer;
    if (ts.isPropertyDeclaration(current) && current.initializer)
      return current.initializer;
    if (
      ts.isBinaryExpression(current) &&
      current.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      return current.right;
    }
    current = current.parent;
  }
  // Nothing upstream recognized — fall back to the node itself if it's
  // already an expression (happens when the diagnostic landed on a bare
  // call expression inside a larger context we don't handle).
  return ts.isExpression(node) ? node : undefined;
}

function diagnosticHasNullSource(
  node: ts.Node,
  checker: ts.TypeChecker,
): boolean {
  const sourceExpr = findSourceExpression(node);
  if (!sourceExpr) return false;
  if (sourceExpr.kind === ts.SyntaxKind.NullKeyword) return true;
  const type = checker.getTypeAtLocation(sourceExpr);
  return typeIncludesNull(type);
}

/** Walk up from `node` to find the enclosing function/method/arrow/getter. */
function findEnclosingFunctionLike(
  node: ts.Node,
): ts.SignatureDeclaration | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isMethodDeclaration(current) ||
      ts.isArrowFunction(current) ||
      ts.isFunctionExpression(current) ||
      ts.isGetAccessorDeclaration(current)
    ) {
      return current;
    }
    current = current.parent;
  }
  return undefined;
}

/**
 * Given a diagnostic node, walk up to find the widenable declaration's type
 * node. Returns the `TypeNode` directly so callers don't re-search for it.
 *
 * Walk-up order: ReturnStatement (use enclosing function's return type) →
 * VariableDeclaration (use its type) → BinaryExpression-with-`=` (resolve
 * LHS symbol, use its declaration's type). The first match wins; TS walks
 * parents from innermost out, so the closest widenable container is picked.
 */
function findWidenTarget(
  node: ts.Node,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
): ts.TypeNode | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isReturnStatement(current)) {
      const func = findEnclosingFunctionLike(current);
      return func?.type;
    }
    if (ts.isVariableDeclaration(current)) {
      return current.type;
    }
    // Class-field initializer `target: Node = null` — the null literal's
    // parent chain is NullLiteral → PropertyDeclaration (no intermediate
    // BinaryExpression since it's an initializer, not an assignment).
    if (ts.isPropertyDeclaration(current)) {
      return current.type;
    }
    if (
      ts.isBinaryExpression(current) &&
      current.operatorToken.kind === ts.SyntaxKind.EqualsToken
    ) {
      const lhs = current.left;
      let symbol: ts.Symbol | undefined;
      if (ts.isIdentifier(lhs)) {
        symbol = checker.getSymbolAtLocation(lhs);
      } else if (ts.isPropertyAccessExpression(lhs)) {
        symbol = checker.getSymbolAtLocation(lhs.name);
      }
      const decl = symbol?.declarations?.[0];
      if (!decl) return undefined;
      if (decl.getSourceFile() !== sourceFile) return undefined;
      if (ts.isPropertyDeclaration(decl)) return decl.type;
      if (ts.isVariableDeclaration(decl)) return decl.type;
      return undefined;
    }
    current = current.parent;
  }
  return undefined;
}

function collectPhaseCFixes(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  registry: GodotClassRegistry,
): SourceFix[] {
  const checker = program.getTypeChecker();
  const diagnostics = program.getSemanticDiagnostics(sourceFile);
  const fixes: SourceFix[] = [];
  const usedEnds = new Set<number>();

  for (const diag of diagnostics) {
    if (diag.code !== 2322) continue;
    if (diag.start === undefined || diag.length === undefined) continue;

    const node = findNodeAt(sourceFile, diag.start, diag.length);
    if (!node) continue;

    // Verify that null actually flows through the error source. Covers
    // direct `= null` and implicit cases like `= fnReturningNull()`
    // where the callee's return type includes `null`.
    if (!diagnosticHasNullSource(node, checker)) continue;

    const typeNode = findWidenTarget(node, checker, sourceFile);
    if (!typeNode) continue;
    const end = typeNode.getEnd();
    if (usedEnds.has(end)) continue;
    if (typeTextIncludesNull(typeNode.getText(sourceFile))) continue;
    if (!isTsReferenceType(typeNode, checker, registry)) continue;

    usedEnds.add(end);
    fixes.push({ start: end, end, replacement: ' | null' });
  }

  return fixes;
}

// ─── Phase D: IN param fallback (narrow `T | null` → `T`) ────

/**
 * Remove `null` from a union type's text form. Handles `T | null`,
 * `null | T`, and `T | null | U`. Returns the narrowed text or `null` if
 * the input wasn't affected (shouldn't happen since callers pre-check).
 */
function removeNullFromUnion(text: string): string | null {
  const trimmed = text.trim();
  // Try trailing `| null` first: `T | null` or `T | null | U`
  let out = trimmed.replace(/\s*\|\s*null\b/, '');
  if (out !== trimmed) return out;
  // Try leading `null |`: `null | T`
  out = trimmed.replace(/\bnull\s*\|\s*/, '');
  if (out !== trimmed) return out;
  return null;
}

/**
 * Phase D: parameter narrowing. IN widening at emit time gives every
 * reference-typed parameter `T | null`. If the function body then uses
 * the parameter as non-null (producing TS2531 / TS18047 "possibly null"
 * diagnostics on its accesses), the author clearly didn't intend callers
 * to pass null. Narrow the annotation back to `T`.
 *
 * Runs AFTER Phase C on the same pass so return-type widening has already
 * settled — a narrowed param might otherwise cause Phase C to decide a
 * return "can't be null" prematurely.
 */
function collectPhaseDFixes(
  program: ts.Program,
  sourceFile: ts.SourceFile,
): SourceFix[] {
  const checker = program.getTypeChecker();
  const diagnostics = program.getSemanticDiagnostics(sourceFile);
  const fixes: SourceFix[] = [];
  const usedParams = new Set<number>();

  for (const diag of diagnostics) {
    // TS2531 "Object is possibly 'null'"
    // TS18047 "<X> is possibly 'null'"
    if (diag.code !== 2531 && diag.code !== 18047) continue;
    if (diag.start === undefined || diag.length === undefined) continue;

    const node = findNodeAt(sourceFile, diag.start, diag.length);
    if (!node) continue;

    // The diagnostic is typically on the accessed value. Resolve its symbol;
    // if it's a parameter declared in this file, we can narrow it.
    // Destructured parameters (`function f({ a }: T | null)`) are intentionally
    // skipped: `decl` is a `BindingElement` there, not a `Parameter`, so the
    // `isParameter` check falls through. The helper only narrows simple
    // `name: T | null` forms — converter-generated code never destructures.
    const symbol = checker.getSymbolAtLocation(node);
    if (!symbol) continue;
    const decl = symbol.declarations?.[0];
    if (!decl || !ts.isParameter(decl)) continue;
    if (decl.getSourceFile() !== sourceFile) continue;
    if (!decl.type) continue;
    // Setter value parameters are paired with a getter return type; narrowing
    // only one side of an accessor pair produces asymmetric signatures that
    // confuse call sites. The emitter always gives both sides the same type,
    // so Phase D leaves setter params alone.
    if (decl.parent && ts.isSetAccessorDeclaration(decl.parent)) continue;

    const typeStart = decl.type.getStart(sourceFile);
    if (usedParams.has(typeStart)) continue;

    const typeText = decl.type.getText(sourceFile);
    if (!typeTextIncludesNull(typeText)) continue;

    const narrowed = removeNullFromUnion(typeText);
    if (!narrowed) continue;

    usedParams.add(typeStart);
    fixes.push({
      start: typeStart,
      end: decl.type.getEnd(),
      replacement: narrowed,
    });
  }

  return fixes;
}

// ─── Entry point ───────────────────────────────────────────────

export interface NullableHelperOptions {
  addonMode: boolean;
}

export function collectNullableFixes(
  program: ts.Program,
  filePaths: Set<string>,
  registry: GodotClassRegistry,
  options: NullableHelperOptions,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    if (!filePaths.has(sourceFile.fileName)) continue;

    // Phases run in order: A (always) → B (addon only) → C (always) → D (always).
    // Within a single pass this ordering ensures return types (Phase C) are
    // resolved before parameter types (Phase D), since return-type flow can
    // depend on parameter types.
    //
    // Phases C and D target disjoint declaration kinds by design — Phase C
    // touches return/variable/field annotations (from ReturnStatement,
    // VariableDeclaration, and assignment-LHS symbols); Phase D touches
    // parameter annotations. They never compete for the same annotation, so
    // the overlap detection in `runFixLoop` never has to choose between them.
    const perFile: SourceFix[] = [];
    perFile.push(...collectPhaseAFixes(sourceFile, checker, registry));
    if (options.addonMode) {
      perFile.push(...collectPhaseBFixes(sourceFile, checker, registry));
    }
    perFile.push(...collectPhaseCFixes(program, sourceFile, registry));
    perFile.push(...collectPhaseDFixes(program, sourceFile));

    if (perFile.length > 0) fixesByFile.set(sourceFile.fileName, perFile);
  }

  return fixesByFile;
}
