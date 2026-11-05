/**
 * `gd.match(...)` -> GDScript `match`, and the TS-side pattern
 * language it shares with `switch` -> `match`.
 *
 * Split from `gd-helpers.ts` to keep that file under the 500-line cap;
 * this is the one `gd.*` helper that carries a whole statement form
 * rather than rewriting a single expression.
 */
import ts from 'typescript';
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

export function visitGdMatchStatement(
  t: TransformerDelegate,
  node: ts.CallExpression,
): void {
  if (node.arguments.length < 2) return;
  const pos = t.getLineAndCol(node);
  const valueExpr = node.arguments[0]!;
  const casesExpr = node.arguments[1]!;

  t.emitter.writeLine(
    `match ${t.emitExpression(valueExpr)}:`,
    pos.line,
    pos.col,
  );
  t.emitter.indent();

  if (ts.isArrayLiteralExpression(casesExpr)) {
    for (const caseElement of casesExpr.elements) {
      if (ts.isObjectLiteralExpression(caseElement)) {
        emitGdMatchCase(t, caseElement);
      } else if (ts.isArrowFunction(caseElement)) {
        emitGdMatchArrowCase(t, caseElement);
      } else if (ts.isParenthesizedExpression(caseElement)) {
        // (x, y) => ({...}) sometimes parenthesized
        const inner = caseElement.expression;
        if (ts.isArrowFunction(inner)) {
          emitGdMatchArrowCase(t, inner);
        }
      }
    }
  }

  t.emitter.dedent();
}

/** Emit a plain object case: { match: ..., do() { ... } } or { matchMany: [...], do() { ... } } */
function emitGdMatchCase(
  t: TransformerDelegate,
  obj: ts.ObjectLiteralExpression,
): void {
  let matchExpr: ts.Expression | undefined;
  let matchManyExpr: ts.Expression | undefined;
  let doBody: ts.Block | undefined;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) && !ts.isMethodDeclaration(prop))
      continue;
    const name = prop.name?.getText(t.ctx.sourceFile);
    if (name === 'match' && ts.isPropertyAssignment(prop)) {
      matchExpr = prop.initializer;
    } else if (name === 'matchMany' && ts.isPropertyAssignment(prop)) {
      matchManyExpr = prop.initializer;
    } else if (name === 'do' && ts.isMethodDeclaration(prop) && prop.body) {
      doBody = prop.body;
    } else if (name === 'do' && ts.isPropertyAssignment(prop)) {
      // do: () => { ... } (arrow function variant preserving `this`)
      const init = prop.initializer;
      if (ts.isArrowFunction(init) && ts.isBlock(init.body)) {
        doBody = init.body;
      }
    }
  }

  const casePos = t.getLineAndCol(obj);
  if (matchManyExpr && ts.isArrayLiteralExpression(matchManyExpr)) {
    // Multiple patterns: 1, 2, 3:
    const patterns = matchManyExpr.elements.map((e) =>
      emitMatchPatternExpr(t, e),
    );
    t.emitter.writeLine(`${patterns.join(', ')}:`, casePos.line, casePos.col);
  } else if (matchExpr) {
    const pattern = emitMatchPatternExpr(t, matchExpr);
    t.emitter.writeLine(`${pattern}:`, casePos.line, casePos.col);
  } else {
    return;
  }

  t.emitter.indent();
  if (doBody) {
    // `visitBlock` drops statements that emit nothing and falls back
    // to `pass`, so the branch always has a body.
    t.visitBlock(doBody);
  } else {
    t.emitter.writeLine('pass', casePos.line, casePos.col);
  }
  t.emitter.dedent();
}

/** Emit an arrow function case: (bindings...) => ({ match: ..., when?: ..., do() { ... } }) */
function emitGdMatchArrowCase(
  t: TransformerDelegate,
  arrow: ts.ArrowFunction,
): void {
  // Extract parameter names (bindings)
  const bindings = arrow.parameters.map((p) =>
    p.name.getText(t.ctx.sourceFile),
  );

  // Get the object literal from body
  let obj: ts.ObjectLiteralExpression | undefined;
  if (ts.isParenthesizedExpression(arrow.body)) {
    const inner = arrow.body.expression;
    if (ts.isObjectLiteralExpression(inner)) obj = inner;
  } else if (ts.isObjectLiteralExpression(arrow.body)) {
    obj = arrow.body;
  }
  if (!obj) return;

  let matchExpr: ts.Expression | undefined;
  let whenExpr: ts.Expression | undefined;
  let doBody: ts.Block | undefined;

  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop) && !ts.isMethodDeclaration(prop))
      continue;
    const name = prop.name?.getText(t.ctx.sourceFile);
    if (name === 'match' && ts.isPropertyAssignment(prop)) {
      matchExpr = prop.initializer;
    } else if (name === 'when' && ts.isPropertyAssignment(prop)) {
      whenExpr = prop.initializer;
    } else if (name === 'do' && ts.isMethodDeclaration(prop) && prop.body) {
      doBody = prop.body;
    } else if (name === 'do' && ts.isPropertyAssignment(prop)) {
      // do: () => { ... } (arrow function variant preserving `this`)
      const init = prop.initializer;
      if (ts.isArrowFunction(init) && ts.isBlock(init.body)) {
        doBody = init.body;
      }
    }
  }

  if (!matchExpr) return;

  const arrowPos = t.getLineAndCol(arrow);
  // Build the pattern, replacing binding names with `var name`
  const bindingSet = new Set(bindings);
  const pattern = emitMatchPatternExpr(t, matchExpr, bindingSet);

  if (whenExpr) {
    t.emitter.writeLine(
      `${pattern} when ${t.emitExpression(whenExpr)}:`,
      arrowPos.line,
      arrowPos.col,
    );
  } else {
    t.emitter.writeLine(`${pattern}:`, arrowPos.line, arrowPos.col);
  }

  t.emitter.indent();
  if (doBody) {
    // `visitBlock` drops statements that emit nothing and falls back
    // to `pass`, so the branch always has a body.
    t.visitBlock(doBody);
  } else {
    t.emitter.writeLine('pass', arrowPos.line, arrowPos.col);
  }
  t.emitter.dedent();
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
