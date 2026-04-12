/**
 * Explicit convert helper for GD-to-TS post-processing.
 * Collects variant-type assignment errors and produces gd.as(value, Target) fixes.
 */

import ts from 'typescript';
import type { GodotClassRegistry } from '../../../typings/godot-registry.ts';
import type { SourceFix } from '../ts-helpers.ts';

/** Map TS primitive type names back to Godot type names for registry lookups. */
export const TS_TO_GD_TYPE_NAMES = new Map<string, string>([
  ['string', 'String'],
  ['boolean', 'bool'],
  ['number', 'float'],
]);

/** TS error codes for argument/assignment type mismatches */
export const TS_ASSIGNMENT_ERROR_CODES = new Set([
  2345, // Argument of type 'X' is not assignable to parameter of type 'Y'.
  2322, // Type 'X' is not assignable to type 'Y'.
  2739, // Type 'X' is missing the following properties from type 'Y': ...
  2740, // Type 'X' is missing the following properties from type 'Y': ..., and N more.
  2741, // Property 'p' is missing in type 'X' but required in type 'Y'.
]);

/**
 * Extract source and target type names from a TS assignment-like error message.
 * Supported formats:
 *   "Argument of type 'Vector2' is not assignable to parameter of type 'Vector2i'."
 *   "Type 'Vector2' is not assignable to type 'Vector2i'."
 *   "Type '[]' is missing the following properties from type 'PackedVector2Array': ..."
 *   "Property 'x' is missing in type '[]' but required in type 'PackedVector2Array'."
 */
export function extractAssignmentTypes(
  messageText: string | ts.DiagnosticMessageChain,
): { source: string; target: string } | null {
  const text = typeof messageText === 'string'
    ? messageText
    : messageText.messageText;

  const notAssignable = text.match(
    /type '([^']+)' is not assignable to (?:parameter of )?type '([^']+)'/,
  );
  if (notAssignable) {
    return {
      source: notAssignable[1]!,
      target: notAssignable[2]!.replace(/\s*\|\s*null$/, ''),
    };
  }

  const missingProps = text.match(
    /Type '([^']+)' is missing the following properties from type '([^']+)'/,
  );
  if (missingProps) {
    return {
      source: missingProps[1]!,
      target: missingProps[2]!.replace(/\s*\|\s*null$/, ''),
    };
  }

  const missingProp = text.match(
    /Property '[^']+' is missing in type '([^']+)' but required in type '([^']+)'/,
  );
  if (missingProp) {
    return {
      source: missingProp[1]!,
      target: missingProp[2]!.replace(/\s*\|\s*null$/, ''),
    };
  }

  return null;
}

/**
 * Strip TypeScript type qualifiers to get the base class name.
 * Examples:
 *   "Vector2 | null"   -> "Vector2"
 *   "readonly Vector2" -> "Vector2"
 *   "Array<Color>"     -> "Array"
 *   "Color[]"          -> "Array"
 */
export function simplifyTypeName(type: string): string {
  let t = type
    .replace(/\s*\|\s*null$/, '')
    .replace(/\s*\|\s*undefined$/, '')
    .replace(/^readonly\s+/, '')
    .trim();
  // Normalize all array forms (including the empty-array literal type `[]`)
  // to bare "Array" for registry lookup.
  if (t === '[]' || /\[\]$/.test(t) || /^Array</.test(t) || /^ReadonlyArray</.test(t)) {
    return 'Array';
  }
  // Strip generic parameters from any other qualified type
  return t.replace(/<.*>$/, '');
}

/**
 * Find the node at a given position -- used for argument expressions.
 * Returns the smallest node that covers exactly the given position+length.
 */
export function findNodeAt(
  sourceFile: ts.SourceFile,
  pos: number,
  length: number,
): ts.Node | undefined {
  const end = pos + length;
  function visit(node: ts.Node): ts.Node | undefined {
    if (node.getStart(sourceFile) > pos || node.getEnd() < end) return undefined;
    for (const child of node.getChildren(sourceFile)) {
      const found = visit(child);
      if (found) return found;
    }
    return node;
  }
  return visit(sourceFile);
}

/**
 * Collect variant-type assignment errors and produce `gd.as(value, Target)` fixes.
 */
export function collectExplicitConvertFixes(
  program: ts.Program,
  filePaths: Set<string>,
  registry: GodotClassRegistry,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

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
      if (!TS_ASSIGNMENT_ERROR_CODES.has(diag.code)) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const types = extractAssignmentTypes(diag.messageText);
      if (!types) continue;

      const source = simplifyTypeName(types.source);
      const target = simplifyTypeName(types.target);
      if (source === target) continue;

      // Both must be variant types and target must accept source as a variant convert.
      // Map TS primitive names back to Godot names for registry lookup.
      const gdSource = TS_TO_GD_TYPE_NAMES.get(source) ?? source;
      const gdTarget = TS_TO_GD_TYPE_NAMES.get(target) ?? target;
      if (!registry.canVariantConvert(gdSource, gdTarget)) continue;

      let node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Some diagnostics point at the LHS / keyword rather than the value
      // expression. Redirect to the actual value we want to wrap.
      {
        const parent = node.parent;
        if (
          ts.isIdentifier(node) &&
          (ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) &&
          parent.name === node &&
          parent.initializer
        ) {
          // Variable/property name -> use initializer
          node = parent.initializer;
        } else if (
          ts.isBinaryExpression(parent) &&
          parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          parent.left === node
        ) {
          // Assignment LHS -> use RHS
          node = parent.right;
        } else if (
          ts.isReturnStatement(parent) &&
          parent.expression
        ) {
          // `return` keyword -> use returned expression
          node = parent.expression;
        }
      }

      const start = node.getStart(sourceFile);
      const end = node.getEnd();
      if (overlapsExisting(start, end)) continue;

      const valueText = node.getText(sourceFile);
      const replacement = `gd.as(${valueText}, ${target})`;

      let fixes = fixesByFile.get(fileName);
      if (!fixes) {
        fixes = [];
        fixesByFile.set(fileName, fixes);
      }
      fixes.push({ start, end, replacement });
      fixedRanges.push({ start, end });
    }
  }

  return fixesByFile;
}
