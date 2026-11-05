import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import { isGdEvalCall, processGdEval, emitGdEval } from './gd-helpers.ts';
import { withoutOuterWrappers } from './operator-tokens.ts';
import { isGdMatchCall, visitGdMatchStatement } from './gd-match.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import { isVoidExpression } from './void-value.ts';
import { SWITCH_BREAK_ERROR, visitSwitchStatement } from './switch.ts';
import {
  emitStatements,
  isLabeledJump,
  isSwitchBreak,
} from './statement-body.ts';

/**
 * Labels have no GDScript equivalent, and unlike most unsupported
 * constructs there is nothing partial to fall back on: a labeled jump
 * emitted bare binds to the nearest loop instead, which is a different
 * program. Both the label and the jumps naming it are rejected.
 */
const LABEL_ERROR =
  'Labels are not supported — GDScript has none, and a `break` or ' +
  '`continue` naming one would bind to the nearest loop instead. ' +
  'Restructure the loop: an early `return`, or a flag its condition ' +
  'checks.';

// ---- Block / Statement Visitors ----

export function visitBlock(t: TransformerDelegate, block: ts.Block): void {
  emitStatements(
    t,
    block.statements,
    t.getLineAndCol(block),
    block.getLastToken(),
  );
}

/** An expression whose value is discarded, on a line (or lines) of its own. */
export function emitExpressionAsStatement(
  t: TransformerDelegate,
  expr: ts.Expression,
): void {
  const pos = t.getLineAndCol(expr);
  if (isGdEvalCall(expr)) {
    emitGdEval(t, expr as ts.CallExpression, pos);
  } else if (isGdMatchCall(expr)) {
    visitGdMatchStatement(t, expr as ts.CallExpression);
  } else {
    // Parentheses around a whole statement mean nothing in GDScript,
    // and around an assignment they are an error (`withoutOuterWrappers`).
    // An expression that emits nothing leaves no statement behind;
    // `emitStatements` turns a body that ends up empty into `pass`, so
    // there is nothing to hold the line open for.
    const text = t.emitExpression(withoutOuterWrappers(expr));
    if (text !== '') t.emitter.writeLine(text, pos.line, pos.col);
  }
}

export function visitStatement(
  t: TransformerDelegate,
  node: ts.Statement,
): void {
  const pos = t.getLineAndCol(node);

  if (ts.isVariableStatement(node)) {
    visitVariableStatement(t, node);
  } else if (ts.isExpressionStatement(node)) {
    emitExpressionAsStatement(t, node.expression);
  } else if (ts.isReturnStatement(node)) {
    if (node.expression && isVoidExpression(t, node.expression)) {
      // GDScript refuses to take the value of a call that returns
      // nothing, so the call stands on its own and the `return` goes
      // bare — it still has to be there to leave early.
      t.emitter.writeLine(t.emitExpression(node.expression), pos.line, pos.col);
      t.emitter.writeLine('return', pos.line, pos.col);
    } else {
      const expr = node.expression
        ? ` ${t.emitExpression(node.expression)}`
        : '';
      t.emitter.writeLine(`return${expr}`, pos.line, pos.col);
    }
  } else if (ts.isIfStatement(node)) {
    visitIfStatement(t, node);
  } else if (ts.isForOfStatement(node)) {
    visitForOfStatement(t, node);
  } else if (ts.isForStatement(node)) {
    visitForStatement(t, node);
  } else if (ts.isWhileStatement(node)) {
    visitWhileStatement(t, node);
  } else if (ts.isBlock(node)) {
    // GDScript has no bare block, so a block statement flattens into
    // the body around it. Its comments still belong to the output —
    // and whether what is left needs `pass` is that body's call, not
    // this one, so there is no fallback here.
    for (const s of node.statements) {
      t.emitLeadingComments(s);
      visitStatement(t, s);
    }
    const closeBrace = node.getLastToken();
    if (closeBrace) t.emitLeadingComments(closeBrace);
  } else if (
    ts.isTypeAliasDeclaration(node) ||
    ts.isInterfaceDeclaration(node)
  ) {
    // Type-only, so there is nothing to convert and nothing to report:
    // it declares no value and runs no code. Erased here the same way
    // `file-scope.ts` and the namespace walk erase it at their levels —
    // this branch is what makes the rule hold at every scope instead of
    // two out of three. A body left empty by the erasure still gets
    // `pass` from `emitStatements`, which asks the emitter what came
    // out rather than counting statements.
  } else if (isLabeledJump(node)) {
    // Unreachable through a well-formed program — TypeScript requires
    // the label to be in scope, so the `LabeledStatement` holding it is
    // rejected below before the jump is ever visited. Kept so the rule
    // stands on its own: emitting a labeled jump bare would bind it to
    // the nearest loop instead of the labeled one, and nothing else
    // here would notice.
    t.addDiagnostic(node, 'error', LABEL_ERROR);
  } else if (ts.isBreakStatement(node)) {
    // A `break` bound to the enclosing `switch` has no GDScript
    // equivalent. Reported here, where the emitter is positioned
    // inside the branch the `break` was written in, so its `# ERROR:`
    // marker lands there instead of above the `match`.
    if (isSwitchBreak(node)) {
      t.addDiagnostic(node, 'error', SWITCH_BREAK_ERROR);
    } else {
      t.emitter.writeLine('break', pos.line, pos.col);
    }
  } else if (ts.isContinueStatement(node)) {
    t.emitter.writeLine('continue', pos.line, pos.col);
  } else if (ts.isLabeledStatement(node)) {
    // The label carries the whole meaning — a `break`/`continue` naming
    // it jumps somewhere a bare one would not — so the statement is
    // rejected as a unit rather than emitted without its label. Its
    // body is deliberately NOT visited: emitting the loop inside would
    // look like a successful conversion of something that isn't one.
    t.addDiagnostic(node, 'error', LABEL_ERROR);
  } else if (ts.isSwitchStatement(node)) {
    visitSwitchStatement(t, node);
  } else if (ts.isForInStatement(node)) {
    t.addDiagnostic(
      node,
      'error',
      '`for...in` is not supported; use `for...of` instead',
    );
  } else {
    t.addDiagnostic(
      node,
      'error',
      `Unsupported statement: ${ts.SyntaxKind[node.kind]}`,
    );
  }
}

// ---- Variable Statements ----

export function visitVariableStatement(
  t: TransformerDelegate,
  node: ts.VariableStatement,
): void {
  for (const decl of node.declarationList.declarations) {
    const pos = t.getLineAndCol(decl);

    // Check for destructuring
    if (
      ts.isArrayBindingPattern(decl.name) ||
      ts.isObjectBindingPattern(decl.name)
    ) {
      t.addDiagnostic(
        decl,
        'error',
        'Destructuring is not supported in GDScript',
      );
      continue;
    }

    const name = decl.name.getText(t.ctx.sourceFile);

    // Check for var restriction (const and let are both allowed)
    const flags = node.declarationList.flags;
    if (!(flags & (ts.NodeFlags.Const | ts.NodeFlags.Let))) {
      t.addDiagnostic(
        node,
        'warning',
        '`var` is restricted; use `let` or `const` instead. Converting to `var`.',
      );
    }

    // Type
    const typeNode = (decl as ts.VariableDeclaration).type;
    const gdType = tsTypeNodeToGdType(
      typeNode,
      t.ctx.checker,
      t.ctx.sourceFile,
      t.currentClassName,
      t.ctx.registry,
    );
    const typeAnnotation = gdType ? `: ${gdType}` : '';

    // Special case: gd.eval() as initializer
    if (decl.initializer && isGdEvalCall(decl.initializer)) {
      const evalLines = processGdEval(t, decl.initializer as ts.CallExpression);
      if (evalLines && evalLines.length > 0) {
        // First line becomes the RHS of the var declaration
        const firstLine = evalLines[0]!;
        t.emitter.writeLine(
          `var ${name}${typeAnnotation} = ${firstLine}`,
          pos.line,
          pos.col,
        );
        // Remaining lines emit at current indent; their embedded \t prefixes
        // represent relative depth beyond the var line.
        for (let i = 1; i < evalLines.length; i++) {
          t.emitter.writeLine(evalLines[i]!, pos.line, pos.col);
        }
        continue;
      }
    }

    // Initializer
    const init = decl.initializer
      ? ` = ${t.emitExpression(decl.initializer)}`
      : '';

    t.emitter.writeLine(
      `var ${name}${typeAnnotation}${init}`,
      pos.line,
      pos.col,
    );
  }
}

// ---- If Statement ----

export function visitIfStatement(
  t: TransformerDelegate,
  node: ts.IfStatement,
): void {
  const pos = t.getLineAndCol(node);
  t.emitter.writeLine(
    `if ${t.emitExpression(node.expression)}:`,
    pos.line,
    pos.col,
  );

  t.emitter.indent();
  visitStatementBody(t, node.thenStatement);
  t.emitter.dedent();

  if (node.elseStatement) {
    if (ts.isIfStatement(node.elseStatement)) {
      const elsePos = t.getLineAndCol(node.elseStatement);
      t.emitter.writeLine(
        `elif ${t.emitExpression(node.elseStatement.expression)}:`,
        elsePos.line,
        elsePos.col,
      );
      t.emitter.indent();
      visitStatementBody(t, node.elseStatement.thenStatement);
      t.emitter.dedent();
      if (node.elseStatement.elseStatement) {
        visitElseChain(t, node.elseStatement.elseStatement);
      }
    } else {
      const elsePos = t.getLineAndCol(node.elseStatement);
      t.emitter.writeLine('else:', elsePos.line, elsePos.col);
      t.emitter.indent();
      visitStatementBody(t, node.elseStatement);
      t.emitter.dedent();
    }
  }
}

function visitElseChain(t: TransformerDelegate, node: ts.Statement): void {
  if (ts.isIfStatement(node)) {
    const pos = t.getLineAndCol(node);
    t.emitter.writeLine(
      `elif ${t.emitExpression(node.expression)}:`,
      pos.line,
      pos.col,
    );
    t.emitter.indent();
    visitStatementBody(t, node.thenStatement);
    t.emitter.dedent();
    if (node.elseStatement) {
      visitElseChain(t, node.elseStatement);
    }
  } else {
    const pos = t.getLineAndCol(node);
    t.emitter.writeLine('else:', pos.line, pos.col);
    t.emitter.indent();
    visitStatementBody(t, node);
    t.emitter.dedent();
  }
}

// ---- For Statements ----

export function visitForOfStatement(
  t: TransformerDelegate,
  node: ts.ForOfStatement,
): void {
  const pos = t.getLineAndCol(node);
  const varName = ts.isVariableDeclarationList(node.initializer)
    ? (node.initializer.declarations[0]?.name.getText(t.ctx.sourceFile) ?? '_')
    : t.emitExpression(node.initializer as ts.Expression);
  const iterable = t.emitExpression(node.expression);
  t.emitter.writeLine(`for ${varName} in ${iterable}:`, pos.line, pos.col);
  t.emitter.indent();
  visitStatementBody(t, node.statement);
  t.emitter.dedent();
}

export function visitForStatement(
  t: TransformerDelegate,
  node: ts.ForStatement,
): void {
  const pos = t.getLineAndCol(node);
  if (node.initializer) {
    if (ts.isVariableDeclarationList(node.initializer)) {
      visitVariableStatement(
        t,
        ts.factory.createVariableStatement(undefined, node.initializer),
      );
    } else {
      t.emitter.writeLine(
        t.emitExpression(node.initializer),
        pos.line,
        pos.col,
      );
    }
  }
  const condition = node.condition ? t.emitExpression(node.condition) : 'true';
  t.emitter.writeLine(`while ${condition}:`, pos.line, pos.col);
  t.emitter.indent();
  visitStatementBody(t, node.statement);
  if (node.incrementor) {
    const incPos = t.getLineAndCol(node.incrementor);
    t.emitter.writeLine(
      t.emitExpression(withoutOuterWrappers(node.incrementor)),
      incPos.line,
      incPos.col,
    );
  }
  t.emitter.dedent();
}

// ---- While Statement ----

export function visitWhileStatement(
  t: TransformerDelegate,
  node: ts.WhileStatement,
): void {
  const pos = t.getLineAndCol(node);
  t.emitter.writeLine(
    `while ${t.emitExpression(node.expression)}:`,
    pos.line,
    pos.col,
  );
  t.emitter.indent();
  visitStatementBody(t, node.statement);
  t.emitter.dedent();
}

// ---- Statement Body Helper ----

export function visitStatementBody(
  t: TransformerDelegate,
  node: ts.Statement,
): void {
  const pos = t.getLineAndCol(node);
  if (ts.isBlock(node)) {
    emitStatements(t, node.statements, pos, node.getLastToken());
  } else {
    emitStatements(t, [node], pos);
  }
}
