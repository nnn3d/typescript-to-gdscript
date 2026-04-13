/**
 * Nullable return type helper.
 *
 * Detects TS2322 "Type 'null' is not assignable to type 'X'" on return
 * statements where X is a class type, and adds `| null` to the function's
 * return type annotation.
 */

import ts from 'typescript';

export interface SourceFix {
  start: number;
  end: number;
  replacement: string;
}

/**
 * Collect fixes for functions that return null but have a non-nullable
 * return type annotation. Adds `| null` to the return type.
 */
export function collectNullableReturnFixes(
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

    for (const diag of diagnostics) {
      // TS2322: Type 'X' is not assignable to type 'Y'
      if (diag.code !== 2322) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      // Check if the error is about null assignment
      if (!isNullReturnError(diag.messageText)) continue;

      // Find the node at the diagnostic position — should be a return keyword
      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Walk up to find the return statement
      let returnStmt: ts.ReturnStatement | undefined;
      let current: ts.Node | undefined = node;
      while (current) {
        if (ts.isReturnStatement(current)) {
          returnStmt = current;
          break;
        }
        current = current.parent;
      }
      if (!returnStmt) continue;

      // Find the enclosing function with a return type annotation
      const func = findEnclosingFunction(returnStmt);
      if (!func?.type) continue;

      // Skip if already has `| null` in return type
      const typeText = func.type.getText(sourceFile);
      if (typeText.includes('null')) continue;

      // Insert `| null` after the return type annotation
      const typeEnd = func.type.getEnd();
      if (fixedPositions.has(typeEnd)) continue;
      fixedPositions.add(typeEnd);

      fixes.push({ start: typeEnd, end: typeEnd, replacement: ' | null' });
    }

    if (fixes.length > 0) {
      fixesByFile.set(fileName, fixes);
    }
  }

  return fixesByFile;
}

/**
 * Check if a TS2322 diagnostic is about returning null.
 * Looks for "Type 'null' is not assignable to type" in the message chain.
 */
function isNullReturnError(
  messageText: string | ts.DiagnosticMessageChain,
): boolean {
  if (typeof messageText === 'string') {
    return /type 'null' is not assignable to type/i.test(messageText);
  }
  if (/type 'null' is not assignable to type/i.test(messageText.messageText)) {
    return true;
  }
  if (messageText.next) {
    for (const sub of messageText.next) {
      if (isNullReturnError(sub)) return true;
    }
  }
  return false;
}

/** Find the smallest AST node covering a position+length. */
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

/** Find the enclosing function/method/arrow declaration. */
function findEnclosingFunction(
  node: ts.Node,
): ts.FunctionDeclaration | ts.MethodDeclaration | ts.ArrowFunction | ts.FunctionExpression | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isMethodDeclaration(current) ||
      ts.isArrowFunction(current) ||
      ts.isFunctionExpression(current)
    ) {
      return current;
    }
    current = current.parent;
  }
  return undefined;
}
