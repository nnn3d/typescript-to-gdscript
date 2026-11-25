import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import { isVoidExpression } from './void-value.ts';

export const GENERATOR_ERROR =
  'Generators are not supported in GDScript; return an array, or use a ' +
  'signal or a coroutine';

/**
 * Arrow function / function expression -> GDScript lambda.
 *
 * A block body is one expression that needs LINES, which an emitter
 * building a string cannot write. It is handed to the emitter as a
 * reserved block instead: `reserveBlock` takes the thunk and returns a
 * marker to leave in the string, and `writeLine` expands it once the
 * line it belongs to is written. That is what lets a lambda carry a
 * body in EVERY position — before, the body was written by whoever
 * emitted the line, which only two callers knew to do, and the rest
 * silently dropped it.
 */
export function emitLambda(
  t: TransformerDelegate,
  node: ts.ArrowFunction | ts.FunctionExpression,
): string {
  if (node.asteriskToken) {
    t.addDiagnostic(node.asteriskToken, 'error', GENERATOR_ERROR);
  }
  const params = t.emitParameters(node.parameters);

  // Return type
  const returnType = tsTypeNodeToGdType(
    node.type,
    t.ctx.checker,
    t.ctx.sourceFile,
    t.currentClassName,
    t.ctx.registry,
  );
  const returnAnnotation = returnType ? ` -> ${returnType}` : '';
  const header = `func(${params})${returnAnnotation}:`;

  let lambda: string;
  if (ts.isBlock(node.body)) {
    // `visitBlock` falls back to `pass` for a body that emits nothing,
    // so an empty block needs no separate case.
    const body = node.body;
    lambda = header + t.emitter.reserveBlock(() => t.visitBlock(body));
  } else if (isVoidExpression(t, node.body)) {
    // The lambda ends with its one expression either way, and GDScript
    // refuses to take the value of a call that returns nothing.
    lambda = `${header} ${t.emitExpression(node.body)}`;
  } else {
    lambda = `${header} return ${t.emitExpression(node.body)}`;
  }

  return standsAlone(node) ? lambda : `(${lambda})`;
}

/**
 * True when nothing on the line can follow the lambda and be mistaken
 * for part of it.
 *
 * A GDScript lambda body runs to the end of the expression, so
 * `func(): f() if c else g` is one lambda whose body is the
 * conditional — not a conditional picking between two callables.
 * `,`, `)` and `]` cannot continue an expression, which is what makes
 * the positions below safe; everywhere else the lambda is
 * parenthesized. Listing those rather than the unsafe ones keeps the
 * failure mode on the harmless side: a redundant pair of parentheses
 * instead of a silently different program.
 *
 * `ExpressionStatement` covers a bare `() => {};`. GDScript rejects
 * that outright ("Standalone lambdas cannot be accessed") — Godot's
 * error to report, not the converter's — so the lambda is emitted as
 * written and the parenthesis question decides nothing there.
 */
function standsAlone(node: ts.Expression): boolean {
  const parent = node.parent;
  if (!parent) return true;
  // Erased on the way out, so the lambda takes the wrapper's place.
  if (
    ts.isAsExpression(parent) ||
    ts.isSatisfiesExpression(parent) ||
    ts.isNonNullExpression(parent) ||
    ts.isTypeAssertionExpression(parent)
  ) {
    return standsAlone(parent);
  }
  if (ts.isParenthesizedExpression(parent)) return true;
  if (ts.isCallExpression(parent) || ts.isNewExpression(parent)) {
    // An argument is followed by `,` or `)`; a callee is not.
    return parent.arguments?.includes(node) ?? false;
  }
  if (ts.isArrayLiteralExpression(parent)) return true;
  if (ts.isPropertyAssignment(parent)) return parent.initializer === node;
  if (
    ts.isVariableDeclaration(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isParameter(parent)
  ) {
    return parent.initializer === node;
  }
  if (ts.isReturnStatement(parent) || ts.isExpressionStatement(parent))
    return true;
  if (ts.isArrowFunction(parent)) return parent.body === node;
  if (ts.isBinaryExpression(parent)) {
    // An assignment only stands alone if the assignment itself does —
    // the rule is transitive, and `a = b = () => x` is the shape that
    // would otherwise slip through.
    return (
      parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      parent.right === node &&
      standsAlone(parent)
    );
  }
  return false;
}
