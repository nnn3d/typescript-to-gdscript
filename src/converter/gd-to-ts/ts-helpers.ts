/**
 * TS-based post-processing helpers for GD-to-TS conversion.
 *
 * These run AFTER initial conversion and typings generation, using the TS
 * type-checker to find and fix issues that couldn't be detected during
 * GDScript parsing (e.g. operator overloads on inherited types).
 */

import ts from 'typescript';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createTsProgram } from '../../parser/typescript/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

// ─── Types ───────────────────────────────────────────────────

export interface TsHelperOptions {
  /** Converted .ts file paths to process */
  files: string[];
  /** Root directory (for TS program creation) */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Godot class registry (required for explicitConvert helper) */
  registry?: GodotClassRegistry;
  /**
   * Use `!` (definite-assignment) instead of `?` (optional) for non-primitive
   * TS2564 fields that aren't assigned in `_ready()`. Less strict but fewer
   * downstream `X | undefined` errors at usage sites.
   */
  unsafeUseAny?: boolean;
  /** Which helpers to run (all default to true) */
  helpers?: {
    /** Fix operator type errors by wrapping in gd.ops.X() */
    operatorFix?: boolean;
    /** Fix variant-type assignment errors by inserting explicit `gd.as(value, Target)` conversions */
    explicitConvert?: boolean;
    /** Fix TS7008/TS2564 on class properties by adding `!` and inferring type from `_ready()` assignments */
    readyFieldTypes?: boolean;
    /** Fix TS7006 implicit-any parameters on overridden methods by copying types from the parent class */
    extendsType?: boolean;
  };
}

export interface TsHelperResult {
  /** Files that were modified */
  fixedFiles: string[];
  /** Remaining diagnostics that couldn't be auto-fixed */
  diagnostics: Array<{
    file: string;
    message: string;
    line: number;
    column: number;
  }>;
}

// ─── Operator Fix Helper ─────────────────────────────────────

/** TS operator token → gd.ops function name */
const TS_OP_TO_GD_OPS: Partial<Record<ts.SyntaxKind, string>> = {
  [ts.SyntaxKind.PlusToken]: 'add',
  [ts.SyntaxKind.MinusToken]: 'sub',
  [ts.SyntaxKind.AsteriskToken]: 'mul',
  [ts.SyntaxKind.SlashToken]: 'div',
  [ts.SyntaxKind.PercentToken]: 'rem',
  [ts.SyntaxKind.EqualsEqualsEqualsToken]: 'eq',
  [ts.SyntaxKind.ExclamationEqualsEqualsToken]: 'ne',
  [ts.SyntaxKind.GreaterThanToken]: 'gt',
  [ts.SyntaxKind.GreaterThanEqualsToken]: 'gte',
  [ts.SyntaxKind.LessThanToken]: 'lt',
  [ts.SyntaxKind.LessThanEqualsToken]: 'lte',
};

/** TS compound assignment operator → gd.ops function name.
 *  `a += b` → `a = gd.ops.add(a, b)` */
const TS_COMPOUND_OP_TO_GD_OPS: Partial<Record<ts.SyntaxKind, string>> = {
  [ts.SyntaxKind.PlusEqualsToken]: 'add',
  [ts.SyntaxKind.MinusEqualsToken]: 'sub',
  [ts.SyntaxKind.AsteriskEqualsToken]: 'mul',
  [ts.SyntaxKind.SlashEqualsToken]: 'div',
  [ts.SyntaxKind.PercentEqualsToken]: 'rem',
};

/** TS error codes for operator type mismatches */
const TS_OPERATOR_ERROR_CODES = new Set([
  2365,  // Operator 'X' cannot be applied to types 'Y' and 'Z'.
  2362,  // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
  2363,  // The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
]);

/** Find the innermost BinaryExpression at a given position */
function findBinaryExpressionAt(
  sourceFile: ts.SourceFile,
  pos: number,
): ts.BinaryExpression | undefined {
  function visit(node: ts.Node): ts.BinaryExpression | undefined {
    if (node.getStart(sourceFile) > pos || node.getEnd() <= pos) return undefined;

    // Check children first for deeper match
    for (const child of node.getChildren(sourceFile)) {
      const found = visit(child);
      if (found) return found;
    }

    if (ts.isBinaryExpression(node)) {
      return node;
    }
    return undefined;
  }
  return visit(sourceFile);
}

interface SourceFix {
  start: number;
  end: number;
  replacement: string;
}

/**
 * Collect operator-related TS errors and produce source fixes.
 */
function collectOperatorFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);

    // Track fixed ranges to deduplicate and prevent overlapping fixes.
    // Overlapping fixes (nested operators like `a + b * c`) corrupt positions —
    // only the innermost is fixed per pass; the outer loop catches the rest.
    const fixedRanges: Array<{ start: number; end: number }> = [];

    function overlapsExisting(start: number, end: number): boolean {
      return fixedRanges.some(r =>
        (start >= r.start && start < r.end) ||
        (end > r.start && end <= r.end) ||
        (start <= r.start && end >= r.end),
      );
    }

    for (const diag of diagnostics) {
      if (!TS_OPERATOR_ERROR_CODES.has(diag.code)) continue;
      if (diag.start === undefined) continue;

      const expr = findBinaryExpressionAt(sourceFile, diag.start);
      if (!expr) continue;

      const exprStart = expr.getStart(sourceFile);
      const exprEnd = expr.getEnd();
      if (overlapsExisting(exprStart, exprEnd)) continue;

      // Check regular operators first, then compound assignments
      const opName = TS_OP_TO_GD_OPS[expr.operatorToken.kind];
      const compoundOpName = TS_COMPOUND_OP_TO_GD_OPS[expr.operatorToken.kind];

      if (!opName && !compoundOpName) continue;

      const leftText = expr.left.getText(sourceFile);
      const rightText = expr.right.getText(sourceFile);

      let replacement: string;
      if (compoundOpName) {
        // a += b → a = gd.ops.add(a, b)
        replacement = `${leftText} = gd.ops.${compoundOpName}(${leftText}, ${rightText})`;
      } else {
        replacement = `gd.ops.${opName}(${leftText}, ${rightText})`;
      }

      let fixes = fixesByFile.get(fileName);
      if (!fixes) {
        fixes = [];
        fixesByFile.set(fileName, fixes);
      }
      fixes.push({
        start: exprStart,
        end: exprEnd,
        replacement,
      });
      fixedRanges.push({ start: exprStart, end: exprEnd });
    }
  }

  return fixesByFile;
}

// ─── Explicit Convert Helper ─────────────────────────────────

/** Map TS primitive type names back to Godot type names for registry lookups. */
const TS_TO_GD_TYPE_NAMES = new Map<string, string>([
  ['string', 'String'],
  ['boolean', 'bool'],
  ['number', 'float'],
]);

/** TS error codes for argument/assignment type mismatches */
const TS_ASSIGNMENT_ERROR_CODES = new Set([
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
function extractAssignmentTypes(
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
 *   "Vector2 | null"   → "Vector2"
 *   "readonly Vector2" → "Vector2"
 *   "Array<Color>"     → "Array"
 *   "Color[]"          → "Array"
 */
function simplifyTypeName(type: string): string {
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
 * Find the node at a given position — used for argument expressions.
 * Returns the smallest node that covers exactly the given position+length.
 */
function findNodeAt(
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
function collectExplicitConvertFixes(
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
          // Variable/property name → use initializer
          node = parent.initializer;
        } else if (
          ts.isBinaryExpression(parent) &&
          parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          parent.left === node
        ) {
          // Assignment LHS → use RHS
          node = parent.right;
        } else if (
          ts.isReturnStatement(parent) &&
          parent.expression
        ) {
          // `return` keyword → use returned expression
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

// ─── Ready Field Types Helper ────────────────────────────────

/**
 * TS error codes for class properties that need type/initializer fixes.
 * - TS7008: Member 'X' implicitly has an 'any' type.
 * - TS2564: Property 'X' has no initializer and is not definitely assigned in the constructor.
 */
const TS_CLASS_READY_ERROR_CODES = new Set([7008, 2564]);

/**
 * Walk up from a node to find the enclosing ClassDeclaration.
 */
function findEnclosingClass(node: ts.Node): ts.ClassDeclaration | undefined {
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
function findReadyAssignment(
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
function inferTypeFromExpression(
  expr: ts.Expression,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
): string {
  if (ts.isIdentifier(expr) || ts.isPropertyAccessExpression(expr)) {
    return `typeof ${expr.getText(sourceFile)}`;
  }
  // Fall back to the TS checker for literals / calls / new expressions.
  // Widen literal types (42 → number, "foo" → string) so stored fields keep
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
const GD_BUILTIN_PRIMITIVE_TYPES = new Set([
  'int',
  'float',
  'bool',
  'boolean',
  'string',
  'String',
  'number',
]);

function isGdPrimitiveType(
  typeText: string,
  registry: GodotClassRegistry | undefined,
): boolean {
  const t = typeText.trim();
  if (GD_BUILTIN_PRIMITIVE_TYPES.has(t)) return true;
  // Strip generic params for checks like `Array<int>` → `Array`
  const bare = t.replace(/<.*>$/, '').trim();
  if (GD_BUILTIN_PRIMITIVE_TYPES.has(bare)) return true;
  // All Godot value types (Vector2, Color, Packed*Array, Array, Dictionary,
  // StringName, NodePath, Callable, Signal, etc.) are listed in the
  // registry's `constructors` field — they all have GDScript default values.
  return !!registry?.isConstructor(bare);
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
function collectReadyFieldTypeFixes(
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
      // — skip in either case.
      if (propDecl.exclamationToken || propDecl.questionToken) continue;

      const cls = findEnclosingClass(propDecl);
      if (!cls) continue;
      const rhs = findReadyAssignment(cls, propName);

      let insertText: string;
      if (diag.code === 2564) {
        // Property has a type but no initializer.
        //  - Assigned in _ready  → `!` (definite-assignment assertion)
        //  - GDScript primitive type (int, float, Vector2, Color, etc.) → `!`
        //    (these always have a non-null default value at runtime)
        //  - Otherwise → `?` (mark as optional), or `!` when
        //    `--unsafe-use-any` is set (fewer `X | undefined` errors downstream)
        if (rhs) {
          insertText = '!';
        } else {
          const declaredType = propDecl.type
            ? propDecl.type.getText(sourceFile)
            : '';
          if (isGdPrimitiveType(declaredType, registry)) {
            insertText = '!';
          } else {
            insertText = unsafeUseAny ? '!' : '?';
          }
        }
      } else {
        // TS7008: no type declared — only fixable if we can infer from _ready
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

// ─── Extends Type Helper ─────────────────────────────────────

/**
 * TS error code for implicit-any parameters.
 * - TS7006: Parameter 'X' implicitly has an 'any' type.
 */
const TS_IMPLICIT_ANY_PARAM_CODE = 7006;

/**
 * Walk up from a node to find the enclosing MethodDeclaration.
 */
function findEnclosingMethod(node: ts.Node): ts.MethodDeclaration | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isMethodDeclaration(current)) return current;
    current = current.parent;
  }
  return undefined;
}

/**
 * Look up the parent-class signature for a method by name, walking the
 * inheritance chain via the TS checker. Returns the first call signature found.
 */
function findParentMethodSignature(
  cls: ts.ClassDeclaration,
  methodName: string,
  checker: ts.TypeChecker,
): ts.Signature | undefined {
  // Use the class's own declared type and walk its base types via the checker.
  // This correctly resolves `Node2D → CanvasItem → Node` for overridden methods.
  const classType = checker.getTypeAtLocation(cls);
  const baseTypes = classType.getBaseTypes() ?? [];
  for (const baseType of baseTypes) {
    const symbol = baseType.getProperty(methodName);
    if (!symbol) continue;
    const decl = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];
    if (!decl) continue;
    const methodType = checker.getTypeOfSymbolAtLocation(symbol, decl);
    const signatures = methodType.getCallSignatures();
    if (signatures.length > 0) return signatures[0];
  }
  return undefined;
}

/**
 * Collect TS7006 errors on parameters of methods that override inherited
 * methods, and produce type-annotation insertion fixes using the parent's
 * parameter types.
 */
function collectExtendsTypeFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);

    // Cache parent signatures per (class,method) to avoid repeated lookups
    const sigCache = new Map<string, ts.Signature | undefined>();

    for (const diag of diagnostics) {
      if (diag.code !== TS_IMPLICIT_ANY_PARAM_CODE) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Walk up to the Parameter
      let paramDecl: ts.ParameterDeclaration | undefined;
      let current: ts.Node | undefined = node;
      while (current) {
        if (ts.isParameter(current)) {
          paramDecl = current;
          break;
        }
        current = current.parent;
      }
      if (!paramDecl || paramDecl.type) continue; // already typed

      const method = findEnclosingMethod(paramDecl);
      if (!method || !ts.isIdentifier(method.name)) continue;
      const cls = findEnclosingClass(method);
      if (!cls) continue;

      const methodName = method.name.text;
      const cacheKey = `${cls.pos}:${methodName}`;
      let parentSig = sigCache.get(cacheKey);
      if (!sigCache.has(cacheKey)) {
        parentSig = findParentMethodSignature(cls, methodName, checker);
        sigCache.set(cacheKey, parentSig);
      }
      if (!parentSig) continue;

      // Find matching parameter by index (name-based matching is unreliable
      // because overrides often rename parameters).
      const paramIndex = method.parameters.indexOf(paramDecl);
      const parentParams = parentSig.getParameters();
      const parentParam = parentParams[paramIndex];
      if (!parentParam) continue;

      const parentParamDecl = parentParam.valueDeclaration;
      if (!parentParamDecl || !ts.isParameter(parentParamDecl)) continue;

      // Prefer the SYNTACTIC type text from the parent's .d.ts declaration so
      // that type aliases like `float`/`int` are preserved (the checker would
      // resolve them to `number`).
      let typeText: string;
      if (parentParamDecl.type) {
        typeText = parentParamDecl.type.getText(parentParamDecl.getSourceFile());
      } else {
        const parentType = checker.getTypeOfSymbolAtLocation(
          parentParam,
          parentParamDecl,
        );
        typeText = checker.typeToString(
          parentType,
          method,
          ts.TypeFormatFlags.NoTruncation |
            ts.TypeFormatFlags.UseFullyQualifiedType,
        );
      }
      if (!typeText || typeText === 'any' || typeText === 'error') continue;

      const insertAt = paramDecl.name.getEnd();
      const replacement = `: ${typeText}`;

      let fixes = fixesByFile.get(fileName);
      if (!fixes) {
        fixes = [];
        fixesByFile.set(fileName, fixes);
      }
      fixes.push({ start: insertAt, end: insertAt, replacement });
    }
  }

  return fixesByFile;
}

// ─── Unsafe Any Fallback Helper ──────────────────────────────

/**
 * (unsafe) Add `any` type annotations to any class properties and function
 * parameters that still have no explicit type after other helpers have run.
 * Only activated via `--unsafe-use-any`. Intended as a final cleanup pass so
 * the converted TS code compiles even when earlier helpers couldn't infer a
 * concrete type.
 *
 * - Class property without a type → insert `!: any` after the name (or `: any`
 *   after an existing `!`/`?` token). Ignores properties that already have
 *   a type annotation.
 * - Function/method/arrow/constructor parameter without a type → insert
 *   `: any` after the parameter name (or after its `?` token if optional).
 *   Rest parameters get `: any[]`.
 */
function collectUnsafeAnyFieldFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);
    const fixedPositions = new Set<number>();
    const fixes: SourceFix[] = [];

    const pushFix = (start: number, replacement: string) => {
      if (fixedPositions.has(start)) return;
      fixedPositions.add(start);
      fixes.push({ start, end: start, replacement });
    };

    for (const diag of diagnostics) {
      // TS7006: Parameter 'X' implicitly has an 'any' type.
      // TS7008: Member 'X' implicitly has an 'any' type.
      // TS7034: Variable 'X' implicitly has type 'any[]' in some locations.
      if (diag.code !== 7006 && diag.code !== 7008 && diag.code !== 7034) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Walk up to PropertyDeclaration, ParameterDeclaration, or VariableDeclaration
      let current: ts.Node | undefined = node;
      let propDecl: ts.PropertyDeclaration | undefined;
      let paramDecl: ts.ParameterDeclaration | undefined;
      let varDecl: ts.VariableDeclaration | undefined;
      while (current) {
        if (ts.isPropertyDeclaration(current)) {
          propDecl = current;
          break;
        }
        if (ts.isParameter(current)) {
          paramDecl = current;
          break;
        }
        if (ts.isVariableDeclaration(current)) {
          varDecl = current;
          break;
        }
        current = current.parent;
      }

      if (propDecl) {
        if (propDecl.type) continue; // already typed
        // Insert after `!`/`?` if present, otherwise after the name. Add
        // `!` ourselves if neither is present so TS2564 doesn't fire later.
        if (propDecl.exclamationToken) {
          pushFix(propDecl.exclamationToken.getEnd(), ': any');
        } else if (propDecl.questionToken) {
          pushFix(propDecl.questionToken.getEnd(), ': any');
        } else {
          pushFix(propDecl.name.getEnd(), '!: any');
        }
        continue;
      }

      if (paramDecl) {
        if (paramDecl.type) continue;
        // Rest parameter → `: any[]`
        const typeText = paramDecl.dotDotDotToken ? ': any[]' : ': any';
        // Insert after `?` if optional, otherwise after the name
        if (paramDecl.questionToken) {
          pushFix(paramDecl.questionToken.getEnd(), typeText);
        } else {
          pushFix(paramDecl.name.getEnd(), typeText);
        }
        continue;
      }

      if (varDecl) {
        if (varDecl.type) continue; // already typed
        // TS7034: variable implicitly has `any[]` — add `: any[]` after the name
        pushFix(varDecl.name.getEnd(), ': any[]');
        continue;
      }
    }

    if (fixes.length > 0) {
      fixesByFile.set(fileName, fixes);
    }
  }

  return fixesByFile;
}

// ─── Unsafe Non-Null Assertion Helper ───────────────────────

/**
 * TS error codes for "possibly null/undefined" that can be suppressed with `!`.
 * - TS2531: Object is possibly 'null'.
 * - TS18047: 'X' is possibly 'null'.
 * - TS18048: 'X' is possibly 'null' or 'undefined'.
 * - TS18046: 'X' is of type 'unknown'.
 */
const TS_POSSIBLY_NULL_CODES = new Set([2531, 18047, 18048, 18046]);

/**
 * Check if a TS2322 diagnostic is caused by null in a union type.
 * Looks for "Type 'null' is not assignable to type" in the message chain.
 */
function isNullAssignmentError(messageText: string | ts.DiagnosticMessageChain): boolean {
  if (typeof messageText === 'string') {
    return /type 'null' is not assignable to type/i.test(messageText);
  }
  if (/type 'null' is not assignable to type/i.test(messageText.messageText)) return true;
  if (messageText.next) {
    for (const sub of messageText.next) {
      if (isNullAssignmentError(sub)) return true;
    }
  }
  return false;
}

/**
 * Collect "possibly null" errors and produce `!` (non-null assertion) fixes.
 * Also handles TS2322 where the error is caused by `T | null` assigned to `T`
 * (adds `!` after the RHS expression).
 * Only runs when `--unsafe-use-any` is set (Phase 2).
 */
function collectUnsafeNonNullFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);
    const fixedPositions = new Set<number>();
    const fixes: SourceFix[] = [];
    const sourceText = sourceFile.getFullText();

    const pushNonNull = (pos: number) => {
      if (fixedPositions.has(pos)) return;
      if (sourceText[pos] === '!') return; // already has `!`
      fixedPositions.add(pos);
      fixes.push({ start: pos, end: pos, replacement: '!' });
    };

    for (const diag of diagnostics) {
      if (diag.start === undefined || diag.length === undefined) continue;

      // Direct "possibly null" errors — insert `!` right after the expression
      if (TS_POSSIBLY_NULL_CODES.has(diag.code)) {
        pushNonNull(diag.start + diag.length);
        continue;
      }

      // TS2322: "Type 'X | null' is not assignable to type 'X'"
      // TS2345: "Argument of type 'X | null' is not assignable to parameter of type 'X'"
      // where the root cause is null — insert `!` after the expression
      if ((diag.code === 2322 || diag.code === 2345) && isNullAssignmentError(diag.messageText)) {
        let node = findNodeAt(sourceFile, diag.start, diag.length);
        if (!node) continue;

        // Redirect from LHS/keyword to the actual value expression
        const parent = node.parent;
        if (
          ts.isIdentifier(node) &&
          (ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) &&
          parent.name === node &&
          parent.initializer
        ) {
          node = parent.initializer;
        } else if (
          ts.isBinaryExpression(parent) &&
          parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          parent.left === node
        ) {
          node = parent.right;
        } else if (
          ts.isReturnStatement(parent) &&
          parent.expression
        ) {
          node = parent.expression;
        }

        pushNonNull(node.getEnd());
        continue;
      }
    }

    if (fixes.length > 0) {
      fixesByFile.set(fileName, fixes);
    }
  }

  return fixesByFile;
}

/**
 * Apply fixes to source text, processing from end to start to preserve positions.
 */
function applyFixes(source: string, fixes: SourceFix[]): string {
  // Sort descending by start position
  const sorted = [...fixes].sort((a, b) => b.start - a.start);
  let result = source;
  for (const fix of sorted) {
    result = result.slice(0, fix.start) + fix.replacement + result.slice(fix.end);
  }
  return result;
}

// ─── Main Entry Point ────────────────────────────────────────

/**
 * Run TS-based post-processing helpers on converted files.
 * Call AFTER conversion and typings generation.
 */
export function runTsHelpers(options: TsHelperOptions): TsHelperResult {
  const { files, rootDir, tsConfigPath, registry, helpers = {} } = options;
  const unsafeUseAny = !!options.unsafeUseAny;
  const result: TsHelperResult = { fixedFiles: [], diagnostics: [] };

  if (files.length === 0) return result;

  const operatorFixEnabled = helpers.operatorFix !== false;
  const explicitConvertEnabled = helpers.explicitConvert !== false && !!registry;
  const readyFieldTypesEnabled = helpers.readyFieldTypes !== false;
  const extendsTypeEnabled = helpers.extendsType !== false;
  // `unsafeAnyFallback` is a final cleanup pass that types any remaining
  // untyped fields/parameters as `any`. Only enabled by `--unsafe-use-any`.
  const unsafeAnyFallbackEnabled = unsafeUseAny;

  if (
    !operatorFixEnabled &&
    !explicitConvertEnabled &&
    !readyFieldTypesEnabled &&
    !extendsTypeEnabled &&
    !unsafeAnyFallbackEnabled
  ) {
    return result;
  }

  const MAX_FIX_PASSES = 10;
  const allFixedFiles = new Set<string>();

  const normalizedInputFiles = new Set(
    files.map((f) => resolve(f).replace(/\\/g, '/')),
  );

  /** Run a set of fix collectors in a multi-pass loop until convergence. */
  const runFixLoop = (
    collectors: Array<(program: ts.Program, filePaths: Set<string>) => Map<string, SourceFix[]>>,
    label?: string,
  ) => {
    for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
      const program = createTsProgram({ rootDir, files, tsConfigPath });

      const filePaths = new Set<string>();
      for (const sf of program.getSourceFiles()) {
        const normalizedSf = resolve(sf.fileName).replace(/\\/g, '/');
        if (normalizedInputFiles.has(normalizedSf)) {
          filePaths.add(sf.fileName);
        }
      }

      // Merge fixes from all collectors in this pass
      const mergedFixes = new Map<string, SourceFix[]>();
      for (const collect of collectors) {
        const from = collect(program, filePaths);
        for (const [file, fs] of from) {
          const existing = mergedFixes.get(file) ?? [];
          mergedFixes.set(file, [...existing, ...fs]);
        }
      }

      let fixedInPass = 0;
      for (const [fileName, fixes] of mergedFixes) {
        if (fixes.length === 0) continue;

        // Drop overlapping fixes within a single pass — keep innermost/earliest.
        const dedupedFixes: SourceFix[] = [];
        const used: Array<{ start: number; end: number }> = [];
        for (const f of fixes) {
          const overlap = used.some(
            (u) =>
              (f.start >= u.start && f.start < u.end) ||
              (f.end > u.start && f.end <= u.end) ||
              (f.start <= u.start && f.end >= u.end),
          );
          if (overlap) continue;
          dedupedFixes.push(f);
          used.push({ start: f.start, end: f.end });
        }
        if (dedupedFixes.length === 0) continue;

        const source = readFileSync(fileName, 'utf-8');
        const fixed = applyFixes(source, dedupedFixes);
        writeFileSync(fileName, fixed);
        allFixedFiles.add(fileName);
        fixedInPass += dedupedFixes.length;
      }

      if (fixedInPass === 0) break;
      if (label) {
        console.log(`  [ts-helpers] ${label}: pass ${pass + 1} — ${fixedInPass} fix(es) applied`);
      }
    }
  };

  // Phase 1: primary helpers (converge first so the unsafe fallback only
  // fires on fields/params the other helpers couldn't resolve).
  const primaryCollectors: Array<(program: ts.Program, filePaths: Set<string>) => Map<string, SourceFix[]>> = [];
  if (operatorFixEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectOperatorFixes(program, filePaths),
    );
  }
  if (explicitConvertEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectExplicitConvertFixes(program, filePaths, registry!),
    );
  }
  if (readyFieldTypesEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectReadyFieldTypeFixes(program, filePaths, registry, unsafeUseAny),
    );
  }
  if (extendsTypeEnabled) {
    primaryCollectors.push((program, filePaths) =>
      collectExtendsTypeFixes(program, filePaths),
    );
  }
  if (primaryCollectors.length > 0) {
    console.log('[ts-helpers] Running primary helpers...');
    runFixLoop(primaryCollectors, 'primary');
  }

  // Phase 2 (unsafe mode only): type any remaining untyped fields/params as `any`,
  // then suppress "possibly null" errors with `!` assertions.
  if (unsafeAnyFallbackEnabled) {
    console.log('[ts-helpers] Running unsafe-any fallback...');
    runFixLoop([
      (program, filePaths) => collectUnsafeAnyFieldFixes(program, filePaths),
    ], 'unsafe-any');
    console.log('[ts-helpers] Running unsafe non-null assertions...');
    runFixLoop([
      (program, filePaths) => collectUnsafeNonNullFixes(program, filePaths),
    ], 'non-null');
  }

  result.fixedFiles = [...allFixedFiles];
  if (allFixedFiles.size > 0) {
    console.log(`[ts-helpers] Done — ${allFixedFiles.size} file(s) modified`);
  }
  return result;
}
