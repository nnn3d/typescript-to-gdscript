/**
 * Ready field types helper for GD-to-TS post-processing.
 * Collects TS7008/TS2564 errors on class properties and produces fixes
 * that add `!` and infer types from `_ready()` assignments.
 */

import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';
import { findNodeAt } from './explicit-convert.ts';

/**
 * TS error codes for class properties that need type/initializer fixes.
 * - TS7008: Member 'X' implicitly has an 'any' type.
 * - TS2564: Property 'X' has no initializer and is not definitely assigned in the constructor.
 */
export const TS_CLASS_READY_ERROR_CODES = new Set([7008, 2564]);

/**
 * Walk up from a node to find the enclosing ClassDeclaration.
 */
export function findEnclosingClass(
  node: ts.Node,
): ts.ClassDeclaration | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isClassDeclaration(current)) return current;
    current = current.parent;
  }
  return undefined;
}

/**
 * Find `this.<propName> = <expr>` assignment inside a `_ready` method body.
 * Returns the right-hand-side expression of the first matching assignment.
 */
export function findReadyAssignment(
  cls: ts.ClassDeclaration,
  propName: string,
): ts.Expression | undefined {
  // Find _ready method
  const readyMethod = cls.members.find(
    (m): m is ts.MethodDeclaration =>
      ts.isMethodDeclaration(m) &&
      !!m.name &&
      ts.isIdentifier(m.name) &&
      m.name.text === '_ready',
  );
  if (!readyMethod?.body) return undefined;

  let result: ts.Expression | undefined;
  function visit(node: ts.Node): void {
    if (result) return;
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(node.left) &&
      node.left.expression.kind === ts.SyntaxKind.ThisKeyword &&
      node.left.name.text === propName
    ) {
      result = node.right;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(readyMethod.body);
  return result;
}

/**
 * Infer a type annotation text from an expression.
 * Uses `typeof <text>` for identifiers and property accesses, otherwise
 * falls back to the TS type checker's string representation.
 */
export function inferTypeFromExpression(
  expr: ts.Expression,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
): string {
  if (ts.isIdentifier(expr) || ts.isPropertyAccessExpression(expr)) {
    return `typeof ${expr.getText(sourceFile)}`;
  }
  // Fall back to the TS checker for literals / calls / new expressions.
  // Widen literal types (42 -> number, "foo" -> string) so stored fields keep
  // their general type rather than pinning to the specific literal value.
  let type = checker.getTypeAtLocation(expr);
  type = checker.getBaseTypeOfLiteralType(type);
  return checker.typeToString(
    type,
    expr,
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType,
  );
}

/**
 * Names of GDScript primitive/value types that always have a non-null default
 * value at runtime (so they're effectively initialized even without an
 * explicit assignment). For TS2564 fields of these types, we add `!` even if
 * there's no `_ready()` assignment.
 */
export const GD_BUILTIN_PRIMITIVE_TYPES = new Set([
  'int',
  'float',
  'bool',
  'boolean',
  'string',
  'String',
  'number',
]);

export function isGdPrimitiveType(
  typeText: string,
  registry: GodotClassRegistry | undefined,
): boolean {
  const t = typeText.trim();
  if (GD_BUILTIN_PRIMITIVE_TYPES.has(t)) return true;
  // Strip generic params for checks like `Array<int>` -> `Array`
  const bare = t.replace(/<.*>$/, '').trim();
  if (GD_BUILTIN_PRIMITIVE_TYPES.has(bare)) return true;
  // All Godot value types (Vector2, Color, Packed*Array, Array, Dictionary,
  // StringName, NodePath, Callable, Signal, etc.) are listed in the
  // registry's `constructors` field -- they all have GDScript default values.
  return !!registry?.isConstructor(bare);
}

/**
 * True when the TS checker resolves the annotation to an enum (or enum
 * literal). Enum-typed fields default to `0` at runtime in GDScript, so
 * they're effectively initialized just like primitives.
 */
function isEnumLikeType(
  typeNode: ts.TypeNode,
  checker: ts.TypeChecker,
): boolean {
  const type = checker.getTypeAtLocation(typeNode);
  return !!(type.flags & ts.TypeFlags.EnumLike);
}

/**
 * Collect TS7008/TS2564 errors on class properties that are assigned in
 * `_ready()` and produce fixes:
 * - For both error codes, only fields assigned in `_ready()` are considered.
 * - Adds `!` (definite-assignment assertion) so TypeScript stops complaining
 *   about missing initializers.
 * - For TS7008 (no type declared), additionally inserts a type annotation
 *   inferred from the `_ready()` assignment expression.
 */
export function collectReadyFieldTypeFixes(
  program: ts.Program,
  filePaths: Set<string>,
  registry: GodotClassRegistry | undefined,
  unsafeUseAny: boolean,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);
    const fixedRanges: Array<{ start: number; end: number }> = [];

    function overlapsExisting(start: number, end: number): boolean {
      return fixedRanges.some(
        (r) =>
          (start >= r.start && start < r.end) ||
          (end > r.start && end <= r.end) ||
          (start <= r.start && end >= r.end),
      );
    }

    for (const diag of diagnostics) {
      if (!TS_CLASS_READY_ERROR_CODES.has(diag.code)) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      // Find the PropertyDeclaration at the diagnostic position
      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      let propDecl: ts.PropertyDeclaration | undefined;
      let current: ts.Node | undefined = node;
      while (current) {
        if (ts.isPropertyDeclaration(current)) {
          propDecl = current;
          break;
        }
        current = current.parent;
      }
      if (!propDecl || !ts.isIdentifier(propDecl.name)) continue;

      const propName = propDecl.name.text;
      const nameEnd = propDecl.name.getEnd();
      if (overlapsExisting(nameEnd, nameEnd + 1)) continue;

      // Already has a `!` (definite-assignment assertion) or a `?` (optional)
      // -- skip in either case.
      if (propDecl.exclamationToken || propDecl.questionToken) continue;

      const cls = findEnclosingClass(propDecl);
      if (!cls) continue;
      const rhs = findReadyAssignment(cls, propName);

      let insertText: string;
      if (diag.code === 2564) {
        // Property has a type but no initializer.
        //  - Assigned in _ready  -> `!` (definite-assignment assertion)
        //  - GDScript primitive / value type / enum -> `!` (non-null runtime default)
        //  - Otherwise -> skip (the nullable helper handles non-primitive
        //    unassigned fields by rewriting them to `field: T | null = null`;
        //    any that remain here lack a type the nullable helper recognized
        //    as reference, so we can't make a safe decision).
        if (rhs) {
          insertText = '!';
        } else {
          const declaredType = propDecl.type
            ? propDecl.type.getText(sourceFile)
            : '';
          const primitive = isGdPrimitiveType(declaredType, registry);
          const enumLike = propDecl.type
            ? isEnumLikeType(propDecl.type, checker)
            : false;
          if (primitive || enumLike) {
            insertText = '!';
          } else {
            continue;
          }
        }
      } else {
        // TS7008: no type declared -- only fixable if we can infer from _ready
        if (propDecl.type) continue;
        if (!rhs) continue;
        const typeText = inferTypeFromExpression(rhs, checker, sourceFile);
        if (!typeText || typeText === 'any' || typeText === 'error') continue;
        insertText = `!: ${typeText}`;
      }

      let fixes = fixesByFile.get(fileName);
      if (!fixes) {
        fixes = [];
        fixesByFile.set(fileName, fixes);
      }
      fixes.push({
        start: nameEnd,
        end: nameEnd,
        replacement: insertText,
      });
      fixedRanges.push({ start: nameEnd, end: nameEnd + insertText.length });
    }
  }

  return fixesByFile;
}
