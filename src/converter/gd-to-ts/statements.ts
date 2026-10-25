import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import { emitExpr } from './expressions.ts';
import {
  emitBlockComment,
  emitCommentInline,
  emitLocalVariable,
} from './members.ts';
import { escapeTsBindingName } from './identifiers.ts';
import { emitMatchStatement } from './match.ts';
import { firstSyntaxChild } from './syntax-children.ts';

// ─── Break Resolution ────────────────────────────────────────────

/**
 * True for a `break` whose nearest enclosing loop is reached through a
 * `match`. GDScript `match` is not breakable, so such a `break` exits
 * the loop around it — but the `switch` it converts into *is*
 * breakable, so the same word would exit the branch instead. TypeScript
 * has no way to name the outer loop (GDScript has no labels either, so
 * the dialect does not carry them), which leaves the construct
 * unconvertible rather than merely unsupported.
 */
function breaksThroughMatch(node: SyntaxNode): boolean {
  let parent = node.parent;
  while (parent) {
    // A `break` cannot cross a function boundary. The grammar also has
    // `ConstructorDefinition`, `GetBody` and `SetBody`, but none of
    // those can nest inside a `match` or a loop, so the walk can never
    // reach one before it stops.
    if (
      parent.type === SyntaxType.FunctionDefinition ||
      parent.type === SyntaxType.Lambda
    ) {
      return false;
    }
    if (
      parent.type === SyntaxType.WhileStatement ||
      parent.type === SyntaxType.ForStatement
    ) {
      return false;
    }
    if (parent.type === SyntaxType.MatchStatement) return true;
    parent = parent.parent;
  }
  return false;
}

// ─── Body / Statements ────────────────────────────────────────

export function emitBody(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
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
        if (
          expr.type === SyntaxType.String &&
          (expr.text.startsWith('"""') || expr.text.startsWith("'''"))
        ) {
          lines.push(emitBlockComment(expr.text, indent));
          continue;
        }
        lines.push(`${indent}${emitStatementExpression(expr, ctx)};`);
      }
      continue;
    }

    if (child.type === SyntaxType.ReturnStatement) {
      const value = firstSyntaxChild(child);
      lines.push(
        value ? `${indent}return ${emitExpr(value, ctx)};` : `${indent}return;`,
      );
      continue;
    }

    if (child.type === SyntaxType.VariableStatement) {
      lines.push(emitLocalVariable(child, ctx, indent));
      continue;
    }

    // A GDScript `const` inside a function body is a local binding, not
    // a class member — the class-scope emitter only ever sees the
    // file/class-level ones. It carries the same name/type/value fields
    // as a `var`, so it goes through the same emitter under `const`.
    if (child.type === SyntaxType.ConstStatement) {
      lines.push(emitLocalVariable(child, ctx, indent, 'const'));
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
      if (breaksThroughMatch(child)) {
        ctx.diagnostics.push({
          message:
            '`break` inside a `match` branch has no TypeScript ' +
            'equivalent. In GDScript it exits the loop around the ' +
            '`match`; in the `switch` this becomes, `break` would leave ' +
            'the branch instead. Restructure the loop (an early ' +
            '`return`, or a flag checked by its condition).',
          severity: 'error',
          file: ctx.filePath,
          line: child.startPosition.row + 1,
          column: child.startPosition.column + 1,
        });
        lines.push(
          `${indent}/* ERROR: \`break\` inside a \`match\` branch has no ` +
            `TypeScript equivalent */`,
        );
        continue;
      }
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
      column: child.startPosition.column + 1,
    });
    lines.push(
      `${indent}/* ERROR: Unhandled GDScript statement: ${child.type} */ ${child.text.split('\n')[0]}`,
    );
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

  // A typed loop var (`for x: T in …`) exposes only the identifier in `left`
  // (TS for-of can't annotate the binding, so the type is naturally dropped).
  // Escape the name if it collides with a TS reserved word (`function` → `function_`).
  const gdVarName = left?.text ?? 'item';
  const varName = escapeTsBindingName(gdVarName);

  // In `for x in a + b + c`, `+` is always array concatenation → gd.ops.add (recursive)
  function emitArrayConcat(node: SyntaxNode): string {
    if (node.type === SyntaxType.BinaryOperator) {
      const opNode = node.children.find((c) => !c.isNamed);
      if (opNode?.text === '+') {
        const lhs = node.childForFieldName('left');
        const rhs = node.childForFieldName('right');
        return `gd.ops.add(${lhs ? emitArrayConcat(lhs) : ''}, ${rhs ? emitExpr(rhs, ctx) : ''})`;
      }
    }
    return emitExpr(node, ctx);
  }
  const iterable = right ? emitArrayConcat(right) : '[]';

  // Register the loop var as a local (under its GD name) for the body so its
  // references resolve as locals (consistent escaping, no stray `this.` prefix
  // if it shadows a member). Scoped to the loop body via save/restore.
  const savedLocals = new Set(ctx.localVars);
  ctx.localVars.add(gdVarName);
  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';
  ctx.localVars = savedLocals;

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

// ─── Assignment ───────────────────────────────────────────────

/**
 * The value of an expression statement. An assignment is a GDScript
 * statement, not an expression, so `emitExpr` has no case for it; every
 * place that emits a statement's value (a body, a one-line lambda) goes
 * through here.
 */
export function emitStatementExpression(
  expr: SyntaxNode,
  ctx: GdToTsContext,
): string {
  if (expr.type === SyntaxType.Assignment) return emitAssignment(expr, ctx);
  if (expr.type === SyntaxType.AugmentedAssignment)
    return emitAugmentedAssignment(expr, ctx);
  return emitExpr(expr, ctx);
}

export function emitAssignment(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} = ${rightStr}`;
}

export function emitAugmentedAssignment(
  node: SyntaxNode,
  ctx: GdToTsContext,
): string {
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
