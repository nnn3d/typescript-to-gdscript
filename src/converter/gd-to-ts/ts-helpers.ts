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

// ─── Types ───────────────────────────────────────────────────

export interface TsHelperOptions {
  /** Converted .ts file paths to process */
  files: string[];
  /** Root directory (for TS program creation) */
  rootDir: string;
  /** Path to tsconfig.json */
  tsConfigPath?: string;
  /** Which helpers to run (all default to true) */
  helpers?: {
    /** Fix operator type errors by wrapping in gd.ops.X() */
    operatorFix?: boolean;
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
  const { files, rootDir, tsConfigPath, helpers = {} } = options;
  const result: TsHelperResult = { fixedFiles: [], diagnostics: [] };

  if (files.length === 0) return result;

  const operatorFixEnabled = helpers.operatorFix !== false;

  if (!operatorFixEnabled) return result;

  // Run operator fix in a loop — each round of fixes may expose new operator
  // errors in chained expressions (e.g. `a + b * c` → `gd.ops.add(a, b * c)` → `gd.ops.add(a, gd.ops.mul(b, c))`)
  const MAX_FIX_PASSES = 10;
  const allFixedFiles = new Set<string>();

  for (let pass = 0; pass < MAX_FIX_PASSES; pass++) {
    // (Re-)create TS program to pick up changes from previous pass
    const program = createTsProgram({
      rootDir,
      files,
      tsConfigPath,
    });

    // Build set of file paths to process, normalized for comparison
    const filePaths = new Set<string>();
    const normalizedInputFiles = new Set(files.map(f => resolve(f).replace(/\\/g, '/')));
    for (const sf of program.getSourceFiles()) {
      const normalizedSf = resolve(sf.fileName).replace(/\\/g, '/');
      if (normalizedInputFiles.has(normalizedSf)) {
        filePaths.add(sf.fileName);
      }
    }

    const fixesByFile = collectOperatorFixes(program, filePaths);

    let fixedInPass = 0;
    for (const [fileName, fixes] of fixesByFile) {
      if (fixes.length === 0) continue;

      const source = readFileSync(fileName, 'utf-8');
      const fixed = applyFixes(source, fixes);
      writeFileSync(fileName, fixed);
      allFixedFiles.add(fileName);
      fixedInPass += fixes.length;
    }

    // No more fixes needed — done
    if (fixedInPass === 0) break;
  }

  result.fixedFiles = [...allFixedFiles];
  return result;
}
