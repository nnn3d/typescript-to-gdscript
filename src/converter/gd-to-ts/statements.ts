import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import { emitExpr } from './expressions.ts';
import { emitBlockComment, emitCommentInline, emitLocalVariable } from './members.ts';

// ─── Body / Statements ────────────────────────────────────────

export function emitBody(node: SyntaxNode, ctx: GdToTsContext, depth: number): string {
  const indent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.Comment) {
      lines.push(`${indent}${emitCommentInline(child)}`);
      continue;
    }

    if (child.type === SyntaxType.ExpressionStatement) {
      const expr = child.namedChildren[0];
      if (expr) {
        // Triple-quoted string as standalone expression → block comment
        if (expr.type === SyntaxType.String && (expr.text.startsWith('"""') || expr.text.startsWith("'''"))) {
          lines.push(emitBlockComment(expr.text, indent));
          continue;
        }
        if (expr.type === SyntaxType.Assignment) {
          lines.push(`${indent}${emitAssignment(expr, ctx)};`);
        } else if (expr.type === SyntaxType.AugmentedAssignment) {
          lines.push(`${indent}${emitAugmentedAssignment(expr, ctx)};`);
        } else {
          lines.push(`${indent}${emitExpr(expr, ctx)};`);
        }
      }
      continue;
    }

    if (child.type === SyntaxType.ReturnStatement) {
      const value = child.namedChildren[0];
      lines.push(
        value ? `${indent}return ${emitExpr(value, ctx)};` : `${indent}return;`,
      );
      continue;
    }

    if (child.type === SyntaxType.VariableStatement) {
      lines.push(emitLocalVariable(child, ctx, indent));
      continue;
    }

    if (child.type === SyntaxType.IfStatement) {
      lines.push(emitIfStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.ForStatement) {
      lines.push(emitForStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.WhileStatement) {
      lines.push(emitWhileStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.MatchStatement) {
      lines.push(emitMatchStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.PassStatement) {
      // Skip pass in TS
      continue;
    }

    if (child.type === SyntaxType.BreakStatement) {
      lines.push(`${indent}break;`);
      continue;
    }

    if (child.type === SyntaxType.ContinueStatement) {
      lines.push(`${indent}continue;`);
      continue;
    }

    // Annotations inside function bodies → // @gd.eval: magic comments
    if (child.type === SyntaxType.Annotation) {
      lines.push(`${indent}// @gd.eval: ${child.text}`);
      continue;
    }

    ctx.diagnostics.push({
      message: `Unhandled GDScript statement: ${child.type}`,
      severity: 'error',
      file: ctx.filePath,
      line: child.startPosition.row + 1,
      column: child.startPosition.column,
    });
    lines.push(`${indent}/* ERROR: Unhandled GDScript statement: ${child.type} */ ${child.text.split('\n')[0]}`);
  }

  return lines.join('\n');
}

// ─── Control Flow ─────────────────────────────────────────────

function emitIfStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');
  const condStr = condition ? emitExpr(condition, ctx) : 'true';

  let result = `${indent}if (${condStr}) {\n`;
  if (body) result += emitBody(body, ctx, depth + 1);
  result += `\n${indent}}`;

  // Handle elif and else via alternatives
  const alternatives = node.childrenForFieldName('alternative');
  for (const alt of alternatives) {
    if (alt.type === SyntaxType.ElifClause) {
      const elifCond = alt.childForFieldName('condition');
      const elifBody = alt.childForFieldName('body');
      const elifCondStr = elifCond ? emitExpr(elifCond, ctx) : 'true';
      result += ` else if (${elifCondStr}) {\n`;
      if (elifBody) result += emitBody(elifBody, ctx, depth + 1);
      result += `\n${indent}}`;
    } else if (alt.type === SyntaxType.ElseClause) {
      const elseBody = alt.childForFieldName('body');
      result += ` else {\n`;
      if (elseBody) result += emitBody(elseBody, ctx, depth + 1);
      result += `\n${indent}}`;
    }
  }

  return result;
}

function emitForStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const body = node.childForFieldName('body');

  const varName = left?.text ?? 'item';

  // In `for x in a + b + c`, `+` is always array concatenation → gd.ops.add (recursive)
  function emitArrayConcat(node: SyntaxNode): string {
    if (node.type === SyntaxType.BinaryOperator) {
      const opNode = node.children.find(c => !c.isNamed);
      if (opNode?.text === '+') {
        const lhs = node.childForFieldName('left');
        const rhs = node.childForFieldName('right');
        return `gd.ops.add(${lhs ? emitArrayConcat(lhs) : ''}, ${rhs ? emitExpr(rhs, ctx) : ''})`;
      }
    }
    return emitExpr(node, ctx);
  }
  const iterable = right ? emitArrayConcat(right) : '[]';

  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';

  return `${indent}for (let ${varName} of ${iterable}) {\n${bodyStr}\n${indent}}`;
}

function emitWhileStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');

  const condStr = condition ? emitExpr(condition, ctx) : 'true';
  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';

  return `${indent}while (${condStr}) {\n${bodyStr}\n${indent}}`;
}

/**
 * Check whether a match statement can be expressed as a plain TS `switch`:
 *  - Every PatternSection uses only "simple" patterns (literals/expressions/
 *    wildcard), never Arrays, Dictionaries, pattern bindings, or guards.
 *  - Multi-pattern sections (`1, 2, 3:`) are allowed — they become
 *    fall-through `case` labels.
 */
function isSimpleMatchStatement(bodyNode: SyntaxNode): boolean {
  for (const section of bodyNode.namedChildren) {
    if (section.type !== SyntaxType.PatternSection) continue;
    const patterns = section.namedChildren.filter(
      (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
    );
    const hasGuard = section.namedChildren.some(
      (c) => c.type === SyntaxType.PatternGuard,
    );
    if (hasGuard) return false;
    for (const p of patterns) {
      if (
        p.type === SyntaxType.Array ||
        p.type === SyntaxType.Dictionary ||
        p.type === SyntaxType.PatternBinding
      ) {
        return false;
      }
      // Any nested pattern bindings also disqualify
      const bindings: string[] = [];
      collectBindings(p, bindings);
      if (bindings.length > 0) return false;
    }
  }
  return true;
}

function emitSimpleMatchAsSwitch(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const iCase = indent + '  ';
  const iBody = indent + '    ';
  const value = node.childForFieldName('value');
  const bodyNode = node.childForFieldName('body');
  const valueStr = value ? emitExpr(value, ctx) : '';
  let result = `${indent}switch (${valueStr}) {\n`;

  if (bodyNode) {
    for (const section of bodyNode.namedChildren) {
      if (section.type !== SyntaxType.PatternSection) continue;

      const body = section.childForFieldName('body');
      const patterns = section.namedChildren.filter(
        (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
      );

      // Emit case/default labels (one per pattern for fall-through)
      for (const p of patterns) {
        if (p.type === SyntaxType.Identifier && p.text === '_') {
          result += `${iCase}default:\n`;
        } else {
          result += `${iCase}case ${emitExpr(p, ctx)}:\n`;
        }
      }

      // Emit body statements, then `break;`
      const bodyStr = body ? emitBody(body, ctx, depth + 2) : '';
      if (bodyStr) result += `${bodyStr}\n`;
      result += `${iBody}break;\n`;
    }
  }

  result += `${indent}}`;
  return result;
}

function emitMatchStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const i1 = indent + '  '; // cases array indent
  const i2 = indent + '    '; // case object indent
  const i3 = indent + '      '; // do() body indent
  const value = node.childForFieldName('value');
  const bodyNode = node.childForFieldName('body');

  // If all sections use only simple patterns, emit a plain TS `switch`.
  // The TS→GD converter already handles `switch` → `match` in reverse.
  if (bodyNode && isSimpleMatchStatement(bodyNode)) {
    return emitSimpleMatchAsSwitch(node, ctx, depth);
  }

  const valueStr = value ? emitExpr(value, ctx) : '';
  let result = `${indent}gd.match(${valueStr}, [\n`;

  if (bodyNode) {
    for (const section of bodyNode.namedChildren) {
      if (section.type !== SyntaxType.PatternSection) continue;

      const body = section.childForFieldName('body');
      // Patterns are all named children except body and pattern_guard
      const patterns = section.namedChildren.filter(
        (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
      );
      const guard = section.namedChildren.find((c) =>
        c.type === SyntaxType.PatternGuard,
      );

      // Collect all pattern_binding names from all patterns
      const bindings: string[] = [];
      for (const p of patterns) {
        collectBindings(p, bindings);
      }

      const hasBindings = bindings.length > 0;
      const hasGuard = !!guard;
      const isMultiPattern =
        patterns.length > 1 && !hasBindings && !hasGuard;

      // Add pattern bindings to local scope so they don't get this. prefix
      const savedLocals = new Set(ctx.localVars);
      for (const b of bindings) ctx.localVars.add(b);

      // Emit do: () => {} body (arrow function preserves outer `this`)
      const bodyStr = body ? emitBody(body, ctx, depth + 3) : '';
      const doBlock = `do: () => {\n${bodyStr}\n${i2}}`;

      if (isMultiPattern) {
        // Multiple patterns: { matchMany: [...], do() { ... } }
        const patternStrs = patterns.map((p) => emitMatchPattern(p, ctx));
        result += `${i1}{\n`;
        result += `${i2}matchMany: [${patternStrs.join(', ')}],\n`;
        result += `${i2}${doBlock},\n`;
        result += `${i1}},\n`;
      } else if (hasBindings || hasGuard) {
        // Arrow function: (bindings...) => ({ match: ..., when?: ..., do() { ... } })
        const patternStr = emitMatchPattern(patterns[0]!, ctx);
        result += `${i1}(${bindings.join(', ')}) => ({\n`;
        result += `${i2}match: ${patternStr},\n`;
        if (hasGuard) {
          const guardExpr = guard!.namedChildren[0];
          const guardStr = guardExpr ? emitExpr(guardExpr, ctx) : 'true';
          result += `${i2}when: ${guardStr},\n`;
        }
        result += `${i2}${doBlock},\n`;
        result += `${i1}}),\n`;
      } else {
        // Simple object: { match: ..., do() { ... } }
        const pattern = patterns[0];
        const patternStr = pattern
          ? emitMatchPattern(pattern, ctx)
          : 'undefined';
        result += `${i1}{\n`;
        result += `${i2}match: ${patternStr},\n`;
        result += `${i2}${doBlock},\n`;
        result += `${i1}},\n`;
      }

      // Restore local scope
      ctx.localVars = savedLocals;
    }
  }

  result += `${indent}]);`;
  return result;
}

/** Collect all pattern_binding identifier names from a pattern tree */
function collectBindings(node: SyntaxNode, bindings: string[]): void {
  if (node.type === SyntaxType.PatternBinding) {
    const ident = node.namedChildren[0];
    if (ident) bindings.push(ident.text);
    return;
  }
  for (const child of node.namedChildren) {
    collectBindings(child, bindings);
  }
}

/** Emit a match pattern as a TypeScript expression for use inside gd.match() */
function emitMatchPattern(node: SyntaxNode, ctx: GdToTsContext): string {
  // Wildcard: _ → undefined
  if (node.type === SyntaxType.Identifier && node.text === '_') {
    return 'undefined';
  }

  // Binding: var name → just the name (it becomes an arrow param)
  if (node.type === SyntaxType.PatternBinding) {
    const ident = node.namedChildren[0];
    return ident ? ident.text : 'undefined';
  }

  // Array pattern: [elem1, elem2, ..]
  if (node.type === SyntaxType.Array) {
    const elements: string[] = [];
    let hasOpenEnding = false;
    for (const child of node.namedChildren) {
      if (child.type === SyntaxType.PatternOpenEnding) {
        hasOpenEnding = true;
        continue;
      }
      elements.push(emitMatchPattern(child, ctx));
    }
    if (hasOpenEnding) {
      return `[${elements.join(', ')}, ...[]]`;
    }
    return `[${elements.join(', ')}]`;
  }

  // Dictionary pattern: {key: value, ..} or {key1, key2}
  if (node.type === SyntaxType.Dictionary) {
    const entries: string[] = [];
    let hasOpenEnding = false;
    for (const child of node.namedChildren) {
      if (child.type === SyntaxType.PatternOpenEnding) {
        hasOpenEnding = true;
        continue;
      }
      if (child.type === SyntaxType.Pair) {
        const left = child.childForFieldName('left');
        const value = child.childForFieldName('value');
        // Key: strip quotes for object key
        let key: string;
        if (left && left.type === SyntaxType.String) {
          key = left.text.slice(1, -1); // remove quotes
        } else {
          key = left ? emitExpr(left, ctx) : '';
        }
        // Value: may be a pattern_binding or regular value
        const valStr = value ? emitMatchPattern(value, ctx) : 'undefined';
        entries.push(`${key}: ${valStr}`);
      } else if (child.type === SyntaxType.String) {
        // Bare string in dict like {"name", "age"} → name: undefined
        const key = child.text.slice(1, -1);
        entries.push(`${key}: undefined`);
      }
    }
    const inner = entries.join(', ');
    if (hasOpenEnding) {
      return `{ ${inner}, ...{} }`;
    }
    return `{ ${inner} }`;
  }

  // Everything else: use regular expression emitter
  return emitExpr(node, ctx);
}

// ─── Assignment ───────────────────────────────────────────────

export function emitAssignment(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} = ${rightStr}`;
}

export function emitAugmentedAssignment(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const op =
    opNode?.text ??
    node.children.find((c) => !c.isNamed && /[+\-*/]=/.test(c.text))?.text ??
    '+=';
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} ${op} ${rightStr}`;
}
