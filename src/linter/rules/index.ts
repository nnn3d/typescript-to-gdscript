import ts from 'typescript';
import type { TransformDiagnostic } from '../../converter/common/index.js';

export type LintRule = (
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  diagnostics: TransformDiagnostic[]
) => void;

function getLineAndCol(sf: ts.SourceFile, node: ts.Node): { line: number; col: number } {
  const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
  return { line: line + 1, col: character };
}

/**
 * Rule: Only one class per file
 */
const singleClassRule: LintRule = (sf, _checker, diagnostics) => {
  const classes = sf.statements.filter(ts.isClassDeclaration);
  if (classes.length > 1) {
    for (const cls of classes.slice(1)) {
      const { line, col } = getLineAndCol(sf, cls);
      diagnostics.push({
        message: 'Only one class per file is allowed (GDScript file structure)',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
  }
};

/**
 * Rule: No undefined usage
 */
const noUndefinedRule: LintRule = (sf, _checker, diagnostics) => {
  function visit(node: ts.Node) {
    if (ts.isIdentifier(node) && node.text === 'undefined') {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: '`undefined` is restricted; use `null` instead',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
};

/**
 * Rule: No var (let and const allowed, both convert to GDScript var)
 */
const noVarRule: LintRule = (sf, _checker, diagnostics) => {
  function visit(node: ts.Node) {
    if (ts.isVariableStatement(node)) {
      const flags = node.declarationList.flags;
      if (!(flags & (ts.NodeFlags.Const | ts.NodeFlags.Let))) {
        const { line, col } = getLineAndCol(sf, node);
        diagnostics.push({
          message: '`var` is restricted; use `let` or `const` instead',
          severity: 'warning',
          file: sf.fileName,
          line,
          column: col,
        });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
};

/**
 * Rule: No top-level statements outside the class
 */
const noTopLevelStatementsRule: LintRule = (sf, _checker, diagnostics) => {
  for (const stmt of sf.statements) {
    if (
      ts.isClassDeclaration(stmt) ||
      ts.isImportDeclaration(stmt) ||
      ts.isTypeAliasDeclaration(stmt) ||
      ts.isInterfaceDeclaration(stmt) ||
      ts.isExportDeclaration(stmt) ||
      ts.isExportAssignment(stmt)
    ) {
      continue;
    }
    const { line, col } = getLineAndCol(sf, stmt);
    diagnostics.push({
      message: `Top-level statement outside class is not allowed: ${ts.SyntaxKind[stmt.kind]}`,
      severity: 'error',
      file: sf.fileName,
      line,
      column: col,
    });
  }
};

/**
 * Rule: No unsupported TS features (spread, generators, etc.)
 */
const noUnsupportedFeaturesRule: LintRule = (sf, _checker, diagnostics) => {
  function visit(node: ts.Node) {
    if (ts.isSpreadElement(node)) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: 'Spread operator is not supported in GDScript',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    if (ts.isYieldExpression(node)) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: '`yield` is not supported; use `await` instead',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    if (ts.isForInStatement(node)) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: '`for...in` is not supported; use `for...of` instead',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    // Optional chaining (?.) — not supported in GDScript
    if (
      (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) || ts.isCallExpression(node)) &&
      node.questionDotToken
    ) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: 'Optional chaining (`?.`) is not supported in GDScript',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    // Nullish coalescing (??) — not supported in GDScript
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
    ) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: 'Nullish coalescing (`??`) is not supported in GDScript',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    // Destructuring — not supported in GDScript
    if (ts.isVariableDeclaration(node) && (ts.isArrayBindingPattern(node.name) || ts.isObjectBindingPattern(node.name))) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: 'Destructuring is not supported in GDScript',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    // Nullish coalescing assignment (??=) — not supported
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken
    ) {
      const { line, col } = getLineAndCol(sf, node);
      diagnostics.push({
        message: 'Nullish coalescing assignment (`??=`) is not supported in GDScript',
        severity: 'error',
        file: sf.fileName,
        line,
        column: col,
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
};

export const lintRules: LintRule[] = [
  singleClassRule,
  noUndefinedRule,
  noVarRule,
  noTopLevelStatementsRule,
  noUnsupportedFeaturesRule,
];
