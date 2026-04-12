import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';

// ---- gd.as / gd.is ----

/**
 * Handle `gd.as(value, Type)` -> `value as Type`.
 * Returns null if this is not a gd.as call.
 */
export function tryEmitGdAs(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'as') return null;
  if (node.arguments.length >= 2) {
    const value = t.emitExpression(node.arguments[0]!);
    const type = t.emitExpression(node.arguments[1]!);
    return `${value} as ${type}`;
  }
  return null;
}

/**
 * Handle `gd.is(value, Type)` -> `value is Type`.
 * Returns null if this is not a gd.is call.
 */
export function tryEmitGdIs(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'is') return null;
  if (node.arguments.length >= 2) {
    const value = t.emitExpression(node.arguments[0]!);
    const type = t.emitExpression(node.arguments[1]!);
    return `${value} is ${type}`;
  }
  return null;
}

// ---- gd.dict() ----

/**
 * Handle `gd.dict([[key, value], ...])` -> `{key: value, ...}`.
 * Returns null if this is not a gd.dict call.
 */
export function tryEmitGdDict(
  t: TransformerDelegate,
  node: ts.CallExpression,
  obj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isIdentifier(obj) || obj.text !== 'gd' || method !== 'dict') return null;
  return emitGdDict(t, node);
}

function emitGdDict(t: TransformerDelegate, node: ts.CallExpression): string {
  if (node.arguments.length !== 1) {
    t.addDiagnostic(
      node,
      'error',
      'gd.dict() requires exactly one argument (array of [key, value] pairs)',
    );
    return '{}';
  }

  const arg = node.arguments[0]!;
  if (!ts.isArrayLiteralExpression(arg)) {
    t.addDiagnostic(
      node,
      'error',
      'gd.dict() argument must be an array literal of [key, value] pairs',
    );
    return '{}';
  }

  const entries: string[] = [];
  for (const element of arg.elements) {
    if (
      !ts.isArrayLiteralExpression(element) ||
      element.elements.length !== 2
    ) {
      t.addDiagnostic(
        element,
        'error',
        'gd.dict() entries must be [key, value] tuples',
      );
      continue;
    }

    const keyNode = element.elements[0]!;
    const valueNode = element.elements[1]!;

    let key: string;
    if (ts.isStringLiteral(keyNode)) {
      key = t.emitStringLiteral(keyNode);
    } else if (ts.isNumericLiteral(keyNode)) {
      key = keyNode.getText(t.ctx.sourceFile);
    } else if (ts.isIdentifier(keyNode)) {
      key = keyNode.text;
    } else if (ts.isPropertyAccessExpression(keyNode)) {
      key = t.emitExpression(keyNode);
    } else {
      t.addDiagnostic(
        keyNode,
        'error',
        'gd.dict() keys must be identifiers, property accesses, or string/number literals, not expressions',
      );
      key = keyNode.getText(t.ctx.sourceFile);
    }

    const value = t.emitExpression(valueNode);
    entries.push(`${key}: ${value}`);
  }

  if (entries.length === 0) {
    return '{}';
  }

  return t.emitMultiLineDict(entries);
}

// ---- gd.ops.* ----

/**
 * Handle `gd.ops.add(a, b)` etc. -> `(a + b)`.
 * Returns null if this is not a gd.ops.* call.
 */
export function tryEmitGdOps(
  t: TransformerDelegate,
  node: ts.CallExpression,
  outerObj: ts.Expression,
  method: string,
): string | null {
  if (!ts.isPropertyAccessExpression(outerObj)) return null;
  const gdObj = outerObj.expression;
  const opsNs = outerObj.name.text;
  if (!ts.isIdentifier(gdObj) || gdObj.text !== 'gd' || opsNs !== 'ops') return null;
  return emitOpsHelper(t, method, node.arguments);
}

function emitOpsHelper(
  t: TransformerDelegate,
  method: string,
  args: ts.NodeArray<ts.Expression>,
): string {
  const operands = args.map((a) => t.emitExpression(a));

  // Unary operators (1 arg)
  if (method === 'plus' && operands.length === 1) return `+${operands[0]}`;
  if (method === 'minus' && operands.length === 1) return `-${operands[0]}`;

  // Binary operators (2 args)
  const binaryOpMap: Record<string, string> = {
    add: ' + ',
    sub: ' - ',
    mul: ' * ',
    div: ' / ',
    rem: ' % ',
    eq: ' == ',
    ne: ' != ',
    gt: ' > ',
    gte: ' >= ',
    lt: ' < ',
    lte: ' <= ',
  };
  const op = binaryOpMap[method];
  if (op && operands.length === 2) {
    return `(${operands[0]}${op}${operands[1]})`;
  }
  return `${operands.join(', ')}`;
}

// ---- gd.eval() ----

export function isGdEvalCall(node: ts.Expression): boolean {
  if (!ts.isCallExpression(node)) return false;
  if (!ts.isPropertyAccessExpression(node.expression)) return false;
  const obj = node.expression.expression;
  return (
    ts.isIdentifier(obj) &&
    obj.text === 'gd' &&
    node.expression.name.text === 'eval'
  );
}

/**
 * Process a gd.eval() call and return the GDScript lines (with relative indentation).
 * Each line is prefixed with tabs for its depth relative to the first non-empty line.
 * Returns null if the content cannot be extracted or is empty.
 */
export function processGdEval(
  t: TransformerDelegate,
  node: ts.CallExpression,
): string[] | null {
  if (node.arguments.length < 1) return null;
  const arg = node.arguments[0]!;

  // Extract the string content
  let content: string;
  if (ts.isStringLiteral(arg)) {
    content = arg.text;
  } else if (ts.isNoSubstitutionTemplateLiteral(arg)) {
    content = arg.text;
  } else if (ts.isTemplateExpression(arg)) {
    t.addDiagnostic(node, 'warning', 'gd.eval with template expressions is not supported');
    return null;
  } else {
    t.addDiagnostic(node, 'warning', 'gd.eval argument must be a string literal');
    return null;
  }

  // Strip leading newline if present
  const body = content.startsWith('\n') ? content.slice(1) : content;
  const rawLines = body.split('\n');

  // Strip trailing empty lines
  while (rawLines.length > 0 && rawLines[rawLines.length - 1]!.trim() === '') {
    rawLines.pop();
  }
  const nonEmpty = rawLines.filter((l) => l.trim() !== '');
  if (nonEmpty.length === 0) return null;

  // Single non-empty line: return trimmed
  if (nonEmpty.length === 1) {
    return [nonEmpty[0]!.trim()];
  }

  // Detect indentation style: tabs vs spaces
  const hasTabs = nonEmpty.some((l) => l.startsWith('\t'));
  const hasSpaces = nonEmpty.some((l) => /^ /.test(l));

  if (hasTabs && hasSpaces) {
    t.addDiagnostic(node, 'error', 'gd.eval: mixed tabs and spaces indentation is not supported');
    return null;
  }

  const out: string[] = [];
  if (hasTabs) {
    // Tab indentation: strip common tab prefix, emit as-is
    const minTabs = nonEmpty.reduce((min, l) => {
      const leading = l.match(/^(\t*)/)?.[1]?.length ?? 0;
      return Math.min(min, leading);
    }, Infinity);
    for (const line of rawLines) {
      if (line.trim() === '') continue;
      out.push(line.slice(minTabs));
    }
  } else {
    // Space indentation: convert indent levels to tabs
    const spaceToDepth = new Map<number, number>();
    let prevSpaces = nonEmpty[0]!.match(/^( *)/)?.[1]?.length ?? 0;
    let depth = 0;
    spaceToDepth.set(prevSpaces, 0);

    for (const line of rawLines) {
      if (line.trim() === '') continue;
      const spaces = line.match(/^( *)/)?.[1]?.length ?? 0;
      const lineContent = line.trimStart();

      if (spaces > prevSpaces) {
        depth++;
      } else if (spaces < prevSpaces) {
        const mapped = spaceToDepth.get(spaces);
        if (mapped !== undefined) {
          depth = mapped;
        } else {
          depth = Math.max(0, depth - 1);
        }
      }

      spaceToDepth.set(spaces, depth);
      prevSpaces = spaces;
      out.push('\t'.repeat(depth) + lineContent);
    }
  }
  return out;
}

/**
 * Emit gd.eval('gdscript code') as a standalone statement (raw GDScript lines).
 */
export function emitGdEval(
  t: TransformerDelegate,
  node: ts.CallExpression,
  pos: { line: number; col: number },
): void {
  const lines = processGdEval(t, node);
  if (!lines) return;
  for (const line of lines) {
    t.emitter.writeLine(line, pos.line, pos.col);
  }
}

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
  visitStatement: (t: TransformerDelegate, node: ts.Statement) => void,
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
        emitGdMatchCase(t, caseElement, visitStatement);
      } else if (ts.isArrowFunction(caseElement)) {
        emitGdMatchArrowCase(t, caseElement, visitStatement);
      } else if (ts.isParenthesizedExpression(caseElement)) {
        // (x, y) => ({...}) sometimes parenthesized
        const inner = caseElement.expression;
        if (ts.isArrowFunction(inner)) {
          emitGdMatchArrowCase(t, inner, visitStatement);
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
  visitStatement: (t: TransformerDelegate, node: ts.Statement) => void,
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

  if (matchManyExpr && ts.isArrayLiteralExpression(matchManyExpr)) {
    // Multiple patterns: 1, 2, 3:
    const patterns = matchManyExpr.elements.map((e) =>
      emitMatchPatternExpr(t, e),
    );
    t.emitter.writeLine(`${patterns.join(', ')}:`);
  } else if (matchExpr) {
    const pattern = emitMatchPatternExpr(t, matchExpr);
    t.emitter.writeLine(`${pattern}:`);
  } else {
    return;
  }

  t.emitter.indent();
  if (doBody) {
    const stmts = doBody.statements;
    if (stmts.length === 0) {
      t.emitter.writeLine('pass');
    } else {
      for (const stmt of stmts) {
        visitStatement(t, stmt);
      }
    }
  } else {
    t.emitter.writeLine('pass');
  }
  t.emitter.dedent();
}

/** Emit an arrow function case: (bindings...) => ({ match: ..., when?: ..., do() { ... } }) */
function emitGdMatchArrowCase(
  t: TransformerDelegate,
  arrow: ts.ArrowFunction,
  visitStatement: (t: TransformerDelegate, node: ts.Statement) => void,
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

  // Build the pattern, replacing binding names with `var name`
  const bindingSet = new Set(bindings);
  const pattern = emitMatchPatternExpr(t, matchExpr, bindingSet);

  if (whenExpr) {
    t.emitter.writeLine(
      `${pattern} when ${t.emitExpression(whenExpr)}:`,
    );
  } else {
    t.emitter.writeLine(`${pattern}:`);
  }

  t.emitter.indent();
  if (doBody) {
    const stmts = doBody.statements;
    if (stmts.length === 0) {
      t.emitter.writeLine('pass');
    } else {
      for (const stmt of stmts) {
        visitStatement(t, stmt);
      }
    }
  } else {
    t.emitter.writeLine('pass');
  }
  t.emitter.dedent();
}

/**
 * Convert a TS expression to a GDScript match pattern.
 * @param bindings - Set of variable names that should be emitted as `var name` pattern bindings
 */
export function emitMatchPatternExpr(
  t: TransformerDelegate,
  node: ts.Expression,
  bindings?: Set<string>,
): string {
  // undefined -> _ (wildcard)
  if (ts.isIdentifier(node) && node.text === 'undefined') {
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
      elements.push(emitMatchPatternExpr(t, el, bindings));
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
        const val = emitMatchPatternExpr(t, prop.initializer, bindings);
        if (val === '_') {
          // { name: undefined } -> just "name" as a key-only check
          entries.push(key);
        } else {
          entries.push(`${key}: ${val}`);
        }
      }
    }
    if (hasSpread) {
      return `{${entries.join(', ')}, ..}`;
    }
    return `{${entries.join(', ')}}`;
  }

  // Everything else: regular expression
  return t.emitExpression(node);
}
