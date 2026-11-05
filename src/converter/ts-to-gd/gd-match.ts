/**
 * `gd.match(...)` -> GDScript `match`, and the TS-side pattern
 * language it shares with `switch` -> `match`.
 *
 * Split from `gd-helpers.ts` to keep that file under the 500-line cap;
 * this is the one `gd.*` helper that carries a whole statement form
 * rather than rewriting a single expression.
 */
import ts from 'typescript';
import { withoutOuterWrappers } from './operator-tokens.ts';
import type { TransformerDelegate } from './transformer-types.ts';

// ---- gd.match() -> match ----

export function isGdMatchCall(node: ts.Expression): boolean {
  if (!ts.isCallExpression(node)) return false;
  if (!ts.isPropertyAccessExpression(node.expression)) return false;
  const obj = node.expression.expression;
  return (
    ts.isIdentifier(obj) &&
    obj.text === 'gd' &&
    node.expression.name.text === 'match'
  );
}

const CASES_ERROR =
  '`gd.match` takes an inline array of cases: objects, or arrow functions returning one';
const CASE_MEMBER_ERROR =
  'A `gd.match` case holds only `match`, `matchMany`, `when` and `do`, written out as `key: value`';
const CASE_PATTERN_ERROR =
  'A `gd.match` case needs either `match: pattern` or `matchMany: [patterns]`';
const CASE_DO_ERROR =
  '`do` must be an inline arrow function or method. Wrap a callback: `do: () => handler()`';

export function visitGdMatchStatement(
  t: TransformerDelegate,
  node: ts.CallExpression,
): void {
  const [valueExpr, casesExpr] = node.arguments;
  if (!valueExpr || !casesExpr || !ts.isArrayLiteralExpression(casesExpr)) {
    t.addDiagnostic(node, 'error', CASES_ERROR);
    return;
  }

  const pos = t.getLineAndCol(node);
  t.emitter.writeLine(
    `match ${t.emitExpression(valueExpr)}:`,
    pos.line,
    pos.col,
  );
  t.emitter.indent();
  for (const element of casesExpr.elements) emitGdMatchCase(t, element);
  t.emitter.dedent();
}

/** What a case object says, whichever form it was written in. */
interface GdMatchCase {
  match?: ts.Expression;
  matchMany?: ts.Expression;
  when?: ts.Expression;
  doMember?: ts.Node;
  body?: ts.ConciseBody;
}

/**
 * Emit one branch: `{ match, do }`, or `(bindings) => ({ match, when, do })`
 * for pattern bindings. A case either goes out whole or is reported: a
 * branch that vanishes, or keeps only part of itself, matches differently
 * and Godot accepts the result.
 */
function emitGdMatchCase(t: TransformerDelegate, element: ts.Expression): void {
  const inner = withoutOuterWrappers(element);
  const arrow = ts.isArrowFunction(inner) ? inner : undefined;
  const source = arrow ? arrow.body : inner;
  const obj = ts.isBlock(source) ? source : withoutOuterWrappers(source);
  if (!ts.isObjectLiteralExpression(obj)) {
    t.addDiagnostic(element, 'error', CASES_ERROR);
    return;
  }

  const parts = readGdMatchCase(t, obj);
  const bindings =
    arrow &&
    new Set(arrow.parameters.map((p) => p.name.getText(t.ctx.sourceFile)));
  const patterns = emitCasePatterns(t, parts, bindings);
  if (patterns === null) {
    t.addDiagnostic(obj, 'error', CASE_PATTERN_ERROR);
    return;
  }

  const pos = t.getLineAndCol(element);
  const guard = parts.when ? ` when ${t.emitExpression(parts.when)}` : '';
  t.emitter.writeLine(`${patterns}${guard}:`, pos.line, pos.col);
  t.emitter.indent();
  emitCaseBody(t, parts, obj, pos);
  t.emitter.dedent();
}

function readGdMatchCase(
  t: TransformerDelegate,
  obj: ts.ObjectLiteralExpression,
): GdMatchCase {
  const parts: GdMatchCase = {};
  for (const prop of obj.properties) {
    const name = prop.name?.getText(t.ctx.sourceFile);
    if (ts.isMethodDeclaration(prop) && name === 'do') {
      parts.doMember = prop;
      parts.body = prop.body;
    } else if (!ts.isPropertyAssignment(prop)) {
      t.addDiagnostic(prop, 'error', CASE_MEMBER_ERROR);
    } else if (name === 'do') {
      parts.doMember = prop;
      const fn = withoutOuterWrappers(prop.initializer);
      if (ts.isArrowFunction(fn)) parts.body = fn.body;
    } else if (name === 'match') {
      parts.match = prop.initializer;
    } else if (name === 'matchMany') {
      parts.matchMany = prop.initializer;
    } else if (name === 'when') {
      parts.when = prop.initializer;
    } else {
      t.addDiagnostic(prop, 'error', CASE_MEMBER_ERROR);
    }
  }
  return parts;
}

/** The branch's pattern list, or null when the case doesn't name one. */
function emitCasePatterns(
  t: TransformerDelegate,
  parts: GdMatchCase,
  bindings: Set<string> | undefined,
): string | null {
  if (parts.match && parts.matchMany) return null;
  if (parts.match) return emitMatchPatternExpr(t, parts.match, bindings);
  const many = parts.matchMany && withoutOuterWrappers(parts.matchMany);
  if (!many || !ts.isArrayLiteralExpression(many)) return null;
  return many.elements
    .map((e) => emitMatchPatternExpr(t, e, bindings))
    .join(', ');
}

/**
 * An expression body becomes the branch's statement: `gd.match` discards
 * what `do` returns, so `do: () => f()` is `f()` and takes no `return`.
 * A `do` that is not written inline has no body to put here.
 */
function emitCaseBody(
  t: TransformerDelegate,
  parts: GdMatchCase,
  obj: ts.ObjectLiteralExpression,
  pos: { line: number; col: number },
): void {
  const mark = t.emitter.mark();
  if (!parts.body) {
    t.addDiagnostic(parts.doMember ?? obj, 'error', CASE_DO_ERROR);
  } else if (ts.isBlock(parts.body)) {
    t.visitBlock(parts.body);
  } else {
    t.emitExpressionAsStatement(parts.body);
  }
  if (!t.emitter.hasCodeSince(mark)) {
    t.emitter.writeLine('pass', pos.line, pos.col);
  }
}

/**
 * Convert a TS expression to a GDScript match pattern.
 * @param bindings - Set of variable names that should be emitted as `var name` pattern bindings
 * @param wildcardUndefined - Whether a bare `undefined` spells the `_`
 *   wildcard. True for `gd.match`, whose TS-side pattern language says
 *   it that way (it is what the GD→TS direction emits for `_`). False
 *   for a `switch` case, whose label is an ordinary TS expression:
 *   there `undefined` is restricted like anywhere else, and reading it
 *   as `_` would turn one branch into a catch-all and every branch
 *   below it into dead code, silently.
 */
export function emitMatchPatternExpr(
  t: TransformerDelegate,
  node: ts.Expression,
  bindings?: Set<string>,
  wildcardUndefined = true,
): string {
  // undefined -> _ (wildcard)
  if (wildcardUndefined && ts.isIdentifier(node) && node.text === 'undefined') {
    return '_';
  }

  // Binding variable: becomes `var name`
  if (bindings && ts.isIdentifier(node) && bindings.has(node.text)) {
    return `var ${node.text}`;
  }

  // Array literal -> array pattern
  if (ts.isArrayLiteralExpression(node)) {
    const elements: string[] = [];
    for (const el of node.elements) {
      // ...[] -> .. (open ending)
      if (ts.isSpreadElement(el)) {
        elements.push('..');
        continue;
      }
      elements.push(emitMatchPatternExpr(t, el, bindings, wildcardUndefined));
    }
    return `[${elements.join(', ')}]`;
  }

  // Object literal -> dictionary pattern
  if (ts.isObjectLiteralExpression(node)) {
    const entries: string[] = [];
    let hasSpread = false;
    for (const prop of node.properties) {
      if (ts.isSpreadAssignment(prop)) {
        // ...{} -> ..
        hasSpread = true;
        continue;
      }
      if (ts.isPropertyAssignment(prop)) {
        const key = ts.isStringLiteral(prop.name)
          ? t.emitStringLiteral(prop.name)
          : `"${t.escapeGdString(prop.name.getText(t.ctx.sourceFile))}"`;
        const val = emitMatchPatternExpr(
          t,
          prop.initializer,
          bindings,
          wildcardUndefined,
        );
        if (val === '_') {
          // { name: undefined } -> just "name" as a key-only check
          entries.push(key);
        } else {
          entries.push(`${key}: ${val}`);
        }
      } else {
        // Dropping a member would widen what the pattern matches.
        t.addDiagnostic(
          prop,
          'error',
          'Only `key: pattern` and `...` can go in a dictionary pattern',
        );
      }
    }
    if (hasSpread) {
      return `{${entries.join(', ')}, ..}`;
    }
    return `{${entries.join(', ')}}`;
  }

  // Own-class member in pattern position. Godot accepts a bare
  // identifier as a pattern unconditionally, but an attribute access
  // (`self.X`, `MyClass.X`) only when it resolves to a CONSTANT. So a
  // plain field has to shed its prefix, while enum members and
  // consts — which are constant — keep theirs and stay shadow-proof.
  if (ts.isPropertyAccessExpression(node)) {
    let root: ts.Expression = node;
    while (ts.isPropertyAccessExpression(root)) root = root.expression;
    const isOwnClass =
      root.kind === ts.SyntaxKind.ThisKeyword ||
      (ts.isIdentifier(root) && root.text === t.currentClassName);
    if (isOwnClass) {
      const decl = t.ctx.checker
        .getSymbolAtLocation(node)
        ?.getDeclarations()?.[0];
      if (decl && ts.isPropertyDeclaration(decl)) return node.name.text;
    }
  }

  // Everything else: regular expression
  return t.emitExpression(node);
}
