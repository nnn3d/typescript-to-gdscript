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

/** TS error codes for argument/assignment type mismatches */
const TS_ASSIGNMENT_ERROR_CODES = new Set([
  2345, // Argument of type 'X' is not assignable to parameter of type 'Y'.
  2322, // Type 'X' is not assignable to type 'Y'.
]);

/**
 * Extract source and target type names from a TS2345/TS2322 error message.
 * TypeScript message format:
 *   "Argument of type 'Vector2' is not assignable to parameter of type 'Vector2i'."
 *   "Type 'Vector2' is not assignable to type 'Vector2i'."
 */
function extractAssignmentTypes(
  messageText: string | ts.DiagnosticMessageChain,
): { source: string; target: string } | null {
  const text = typeof messageText === 'string'
    ? messageText
    : messageText.messageText;

  const match = text.match(
    /type '([^']+)' is not assignable to (?:parameter of )?type '([^']+)'/,
  );
  if (!match) return null;
  return { source: match[1]!, target: match[2]!.replace(/\s*\|\s*null$/, '') };
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
  // Normalize all array forms to bare "Array" for registry lookup
  if (/\[\]$/.test(t) || /^Array</.test(t) || /^ReadonlyArray</.test(t)) {
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

      // Both must be variant types and target must accept source as a variant convert
      if (!registry.canVariantConvert(source, target)) continue;

      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

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
        //  - Otherwise → `?` (mark as optional)
        if (rhs) {
          insertText = '!';
        } else {
          const declaredType = propDecl.type
            ? propDecl.type.getText(sourceFile)
            : '';
          insertText = isGdPrimitiveType(declaredType, registry) ? '!' : '?';
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
  const result: TsHelperResult = { fixedFiles: [], diagnostics: [] };

  if (files.length === 0) return result;

  const operatorFixEnabled = helpers.operatorFix !== false;
  const explicitConvertEnabled = helpers.explicitConvert !== false && !!registry;
  const readyFieldTypesEnabled = helpers.readyFieldTypes !== false;
  const extendsTypeEnabled = helpers.extendsType !== false;

  if (
    !operatorFixEnabled &&
    !explicitConvertEnabled &&
    !readyFieldTypesEnabled &&
    !extendsTypeEnabled
  ) {
    return result;
  }

  // Run fixes in a loop — each round may expose new errors in chained/nested
  // expressions (e.g. operator-wrapping creates new call sites).
  const MAX_FIX_PASSES = 10;
  const allFixedFiles = new Set<string>();

  const normalizedInputFiles = new Set(
    files.map((f) => resolve(f).replace(/\\/g, '/')),
  );

  for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
    const program = createTsProgram({ rootDir, files, tsConfigPath });

    // Build set of file paths to process, normalized for comparison
    const filePaths = new Set<string>();
    for (const sf of program.getSourceFiles()) {
      const normalizedSf = resolve(sf.fileName).replace(/\\/g, '/');
      if (normalizedInputFiles.has(normalizedSf)) {
        filePaths.add(sf.fileName);
      }
    }

    // Merge fixes from both helpers
    const mergedFixes = new Map<string, SourceFix[]>();
    const mergeFixes = (from: Map<string, SourceFix[]>) => {
      for (const [file, fixes] of from) {
        const existing = mergedFixes.get(file) ?? [];
        mergedFixes.set(file, [...existing, ...fixes]);
      }
    };

    if (operatorFixEnabled) {
      mergeFixes(collectOperatorFixes(program, filePaths));
    }
    if (explicitConvertEnabled) {
      mergeFixes(collectExplicitConvertFixes(program, filePaths, registry!));
    }
    if (readyFieldTypesEnabled) {
      mergeFixes(collectReadyFieldTypeFixes(program, filePaths, registry));
    }
    if (extendsTypeEnabled) {
      mergeFixes(collectExtendsTypeFixes(program, filePaths));
    }

    let fixedInPass = 0;
    for (const [fileName, fixes] of mergedFixes) {
      if (fixes.length === 0) continue;

      // Drop overlapping fixes within a single pass — keep innermost/earliest.
      // Sorted descending by start so nested fixes are applied safely.
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
  }

  result.fixedFiles = [...allFixedFiles];
  return result;
}
