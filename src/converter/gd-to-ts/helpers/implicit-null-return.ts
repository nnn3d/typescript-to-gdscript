/**
 * Implicit-null returns.
 *
 * Every GDScript function produces a value: on a path that ends in a bare
 * `return` or falls off the end, that value is `null`. The converted TS
 * keeps those paths as they are, and TypeScript types them `undefined` —
 * so a function that returns a value on only some paths infers as
 * `T | undefined`. `undefined` has no GDScript counterpart: the caller
 * actually receives `null`, and a consumer checking `=== null` is told the
 * comparison can never be true.
 *
 * The fix is an explicit return type — the inferred one with `undefined`
 * replaced by `null` and literals widened to their base types, as a person
 * would write it (an inferred `1 | undefined` becomes `number | null`).
 * The checker has already worked out which paths fall through, so bare
 * `return` and falling off the end are covered alike without reachability
 * analysis of our own.
 *
 * Only an `undefined` that came from those implicit paths is replaced. If
 * any returned expression is itself possibly `undefined` (an index access
 * under `noUncheckedIndexedAccess`, say), that `undefined` is real and the
 * function is left alone.
 *
 * Accessors are skipped: GD→TS always annotates them, and a getter/setter
 * pair has to stay symmetric, which a one-sided fix here could break.
 */

import ts from 'typescript';
import type { SourceFix } from '../ts-helpers.ts';
import { typeTextForSource } from './type-text.ts';

type FunctionWithBody =
  | ts.MethodDeclaration
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.ArrowFunction;

function isCandidate(node: ts.Node): node is FunctionWithBody {
  if (
    !ts.isMethodDeclaration(node) &&
    !ts.isFunctionDeclaration(node) &&
    !ts.isFunctionExpression(node) &&
    !ts.isArrowFunction(node)
  ) {
    return false;
  }
  return (
    !node.type && !!node.body && ts.isBlock(node.body) && !node.asteriskToken
  );
}

/** `return` statements belonging to `fn` itself, not to a nested function or class. */
function ownReturns(body: ts.Block): ts.ReturnStatement[] {
  const found: ts.ReturnStatement[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isFunctionLike(node) || ts.isClassLike(node)) return;
    if (ts.isReturnStatement(node)) found.push(node);
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(body, visit);
  return found;
}

function isAsync(fn: FunctionWithBody): boolean {
  return !!ts
    .getModifiers(fn)
    ?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword);
}

function unionParts(type: ts.Type): readonly ts.Type[] {
  return type.isUnion() ? type.types : [type];
}

function includesUndefined(type: ts.Type): boolean {
  return unionParts(type).some((t) => (t.flags & ts.TypeFlags.Undefined) !== 0);
}

/**
 * The annotation to write, or `undefined` when the function should be
 * left alone.
 */
function nullableReturnAnnotation(
  fn: FunctionWithBody,
  checker: ts.TypeChecker,
): string | undefined {
  const signature = checker.getSignatureFromDeclaration(fn);
  if (!signature) return undefined;

  const async = isAsync(fn);
  const unwrap = (type: ts.Type): ts.Type | undefined =>
    async ? checker.getAwaitedType(type) : type;

  const returnType = unwrap(checker.getReturnTypeOfSignature(signature));
  if (!returnType || !includesUndefined(returnType)) return undefined;

  // Is the `undefined` real? Only if some returned expression can be it.
  for (const ret of ownReturns(fn.body as ts.Block)) {
    if (!ret.expression) continue;
    const exprType = unwrap(checker.getTypeAtLocation(ret.expression));
    if (!exprType || includesUndefined(exprType)) return undefined;
  }

  // `null` is written last whether or not the inferred type had it, which
  // is the order the rest of the dialect uses (`Node | null`); TypeScript's
  // own ordering of union members would put it first.
  const valueParts = unionParts(returnType).filter(
    (t) => (t.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)) === 0,
  );
  // All paths return nothing: TypeScript infers `void` for that, so this
  // is not a shape that reaches here — but never annotate a bare `null`.
  if (valueParts.length === 0) return undefined;

  const texts: string[] = [];
  for (const part of valueParts) {
    let text = typeTextForSource(
      checker,
      checker.getBaseTypeOfLiteralType(part),
      fn,
      ts.TypeFormatFlags.NoTruncation,
    );
    // A function type needs parentheses to sit inside a union.
    if (text.includes('=>')) text = `(${text})`;
    if (!texts.includes(text)) texts.push(text);
  }
  texts.push('null');

  const union = texts.join(' | ');
  return async ? `Promise<${union}>` : union;
}

/** Position just after the parameter list's `)`; undefined for `x => …`. */
function afterParameterList(fn: FunctionWithBody): number | undefined {
  const closeParen = fn
    .getChildren()
    .find((c) => c.kind === ts.SyntaxKind.CloseParenToken);
  return closeParen?.getEnd();
}

export function collectImplicitNullReturnFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const checker = program.getTypeChecker();
  const result = new Map<string, SourceFix[]>();

  for (const fileName of filePaths) {
    const sf = program.getSourceFile(fileName);
    if (!sf) continue;
    const fixes: SourceFix[] = [];

    const visit = (node: ts.Node): void => {
      if (isCandidate(node)) {
        const annotation = nullableReturnAnnotation(node, checker);
        const at = annotation ? afterParameterList(node) : undefined;
        if (annotation && at !== undefined) {
          fixes.push({ start: at, end: at, replacement: `: ${annotation}` });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);

    if (fixes.length > 0) result.set(fileName, fixes);
  }

  return result;
}
