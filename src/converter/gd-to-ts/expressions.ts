import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import { isGlobalName } from './context.ts';
import {
  inferExprType,
  GD_OPS_MAP,
  NOT_LIFT_OPS,
  GD_IS_PRIMITIVE_TYPES,
} from './type-inference.ts';
import { emitLambda } from './functions.ts';

// ─── Expressions ──────────────────────────────────────────────

export function emitExpr(node: SyntaxNode, ctx: GdToTsContext): string {
  if (node.type === SyntaxType.Identifier) {
    if (node.text === 'self') return 'this';
    if (node.text === 'null') return 'null';
    if (node.text === 'true') return 'true';
    if (node.text === 'false') return 'false';
    // If identifier is a known class member AND not a local variable,
    // prefix with `this.` (instance) or `ClassName.` (static — const /
    // static var / enum / inner class / static func). Matches GDScript's
    // convention of accessing statics via the class name.
    if (ctx.classMembers.has(node.text) && !ctx.localVars.has(node.text)) {
      const prefix = ctx.staticMembers.has(node.text) ? ctx.className : 'this';
      return `${prefix}.${node.text}`;
    }
    // Global enum constant → qualified name (e.g. KEY_F21 → Key.KEY_F21)
    const enumQualified = ctx.globalEnumMap.get(node.text);
    if (enumQualified) return enumQualified;
    return node.text;
  }

  if (node.type === SyntaxType.Integer || node.type === SyntaxType.Float) {
    return node.text;
  }

  if (node.type === SyntaxType.String) {
    return node.text;
  }

  if (node.type === SyntaxType.True) return 'true';
  if (node.type === SyntaxType.False) return 'false';
  if (node.type === SyntaxType.Null) return 'null';

  if (node.type === SyntaxType.Call) {
    return emitCall(node, ctx);
  }

  if (node.type === SyntaxType.Attribute) {
    return emitAttribute(node, ctx);
  }

  if (node.type === SyntaxType.BinaryOperator) {
    // Check for %"UniqueNode"/Child pattern — tree-sitter parses / as division
    const uniqueNodePath = tryEmitUniqueNodePath(node);
    if (uniqueNodePath !== null) {
      return `this.get_node("${uniqueNodePath.path}")${uniqueNodePath.suffix}`;
    }
    return emitBinaryOp(node, ctx);
  }

  if (node.type === SyntaxType.UnaryOperator) {
    return emitUnaryOp(node, ctx);
  }

  if (node.type === SyntaxType.StringName) {
    const strChild = node.namedChildren.find((c) => c.type === SyntaxType.String);
    if (strChild) {
      // Extract the string content
      const content = strChild.text.slice(1, -1); // remove quotes
      return `StringName('${content}')`;
    }
    // &"text" — extract content between &" and "
    const text = node.text;
    const content = text.slice(2, -1);
    return `StringName('${content}')`;
  }

  if (node.type === SyntaxType.NodePath) {
    const text = node.text;
    const content = text.slice(2, -1);
    return `NodePath('${content}')`;
  }

  if (node.type === SyntaxType.GetNode) {
    // $Path -> this.get_node("Path")
    // $"Path/To/Node" -> this.get_node("Path/To/Node")
    // %UniqueNode -> this.get_node("%UniqueNode")
    // %"UniqueNode" -> this.get_node("%UniqueNode")
    const text = node.text;
    if (text.startsWith('%"')) {
      // %"UniqueNode" -> get_node("%UniqueNode")
      const name = text.slice(2, -1);
      return `this.get_node("%${name}")`;
    } else if (text.startsWith('%')) {
      // %UniqueNode -> get_node("%UniqueNode")
      const name = text.slice(1);
      return `this.get_node("%${name}")`;
    } else if (text.startsWith('$"')) {
      // $"Path/To/Node" -> get_node("Path/To/Node")
      const path = text.slice(2, -1);
      return `this.get_node("${path}")`;
    } else {
      // $Path -> get_node("Path")
      const path = text.slice(1);
      return `this.get_node("${path}")`;
    }
  }

  if (node.type === SyntaxType.Array) {
    const elements = node.namedChildren.map((e) => emitExpr(e, ctx)).join(', ');
    return `[${elements}]`;
  }

  if (node.type === SyntaxType.Dictionary) {
    const pairNodes = node.namedChildren.filter((c) => c.type === SyntaxType.Pair);
    // Check if any key is an identifier (variable reference, not string/number literal)
    const hasIdentifierKey = pairNodes.some((p) => {
      const key = p.childForFieldName('left');
      return key && key.type === SyntaxType.Identifier;
    });
    if (hasIdentifierKey) {
      // Use gd.dict() format for dicts with variable keys
      const entries = pairNodes.map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        const keyStr = key ? emitExpr(key, ctx) : '';
        const valStr = value ? emitExpr(value, ctx) : '';
        return `[${keyStr}, ${valStr}]`;
      });
      return `gd.dict([\n${entries.map((e) => `      ${e},`).join('\n')}\n    ])`;
    }
    // Check if any key is an expression (binary_operator, subscript, attribute, etc.)
    const hasExpressionKey = pairNodes.some((p) => {
      const key = p.childForFieldName('left');
      return key && key.type !== SyntaxType.String && key.type !== SyntaxType.Integer && key.type !== SyntaxType.Float;
    });
    if (hasExpressionKey) {
      // Use computed property syntax for expression keys
      const pairs = pairNodes.map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        const keyStr = key ? emitExpr(key, ctx) : '';
        const valStr = value ? emitExpr(value, ctx) : '';
        // Wrap non-literal keys in [...]
        const isLiteral = key && (key.type === SyntaxType.String || key.type === SyntaxType.Integer || key.type === SyntaxType.Float);
        return isLiteral ? `${keyStr}: ${valStr}` : `[${keyStr}]: ${valStr}`;
      });
      return `{\n${pairs.map((p) => `      ${p},`).join('\n')}\n    }`;
    }
    // Regular object literal for string/number-keyed dicts
    const pairs = pairNodes
      .map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        return `${key ? emitExpr(key, ctx) : ''}: ${value ? emitExpr(value, ctx) : ''}`;
      })
      .join(', ');
    return `{${pairs}}`;
  }

  if (node.type === SyntaxType.ConditionalExpression) {
    // GD: value if cond else other -> TS: cond ? value : other
    const left = node.childForFieldName('left');
    const condition = node.childForFieldName('condition');
    const right = node.childForFieldName('right');
    if (left && condition && right) {
      return `${emitExpr(condition, ctx)} ? ${emitExpr(left, ctx)} : ${emitExpr(right, ctx)}`;
    }
    return node.text;
  }

  if (node.type === SyntaxType.AwaitExpression) {
    const expr = node.namedChildren[0];
    return `await ${expr ? emitExpr(expr, ctx) : ''}`;
  }

  if (node.type === SyntaxType.ParenthesizedExpression) {
    const inner = node.namedChildren[0];
    return inner ? `(${emitExpr(inner, ctx)})` : '()';
  }

  if (node.type === SyntaxType.Subscript) {
    // obj[key]
    const obj = node.namedChildren[0];
    const argsNode = node.childForFieldName('arguments');
    const key = argsNode?.namedChildren[0];
    return `${obj ? emitExpr(obj, ctx) : ''}[${key ? emitExpr(key, ctx) : ''}]`;
  }

  if (node.type === SyntaxType.Lambda) {
    return emitLambda(node, ctx);
  }

  // Inline comment in expression context — emit as trailing comment
  if (node.type === SyntaxType.Comment) {
    const content = node.text.startsWith('##')
      ? node.text.slice(2).trim()
      : node.text.slice(1).trim();
    return `/* ${content} */`;
  }

  // Fallback: return raw text with warning
  ctx.diagnostics.push({
    message: `Unhandled GDScript expression: ${node.type}`,
    severity: 'error',
    file: ctx.filePath,
    line: node.startPosition.row + 1,
    column: node.startPosition.column + 1,
  });
  return `/* ERROR: Unhandled GDScript expression: ${node.type} */ ${node.text}`;
}

// ─── Call Expression ──────────────────────────────────────────

export function emitCall(node: SyntaxNode, ctx: GdToTsContext): string {
  // call node: first named child is callee, 'arguments' field has args
  const callee = node.namedChildren[0];
  const argsNode = node.childForFieldName('arguments');
  const args = argsNode
    ? argsNode.namedChildren.map((a) => emitExpr(a, ctx)).join(', ')
    : '';

  if (!callee) return `(${args})`;

  // GDScript super() → TS super.methodName() (or super() in constructors)
  if (callee.type === SyntaxType.Identifier && callee.text === 'super') {
    if (ctx.currentMethodName && ctx.currentMethodName !== 'constructor') {
      return `super.${ctx.currentMethodName}(${args})`;
    }
    return `super(${args})`;
  }

  // For bare identifier calls: add this. prefix for known class members
  if (
    callee.type === SyntaxType.Identifier &&
    !ctx.localVars.has(callee.text) &&
    !isGlobalName(callee.text, ctx)
  ) {
    if (ctx.classMembers.has(callee.text)) {
      return `this.${callee.text}(${args})`;
    }
  }

  const calleeStr = emitExpr(callee, ctx);
  return `${calleeStr}(${args})`;
}

// ─── Attribute Expression ─────────────────────────────────────

export function emitAttribute(node: SyntaxNode, ctx: GdToTsContext): string {
  // attribute node children: [object, ".", name] or [object, ".", attribute_call]
  const children = node.namedChildren;
  if (children.length === 0) return node.text;

  const parts: string[] = [];
  let selfSeen = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i]!;

    // `self` at the start of an attribute chain becomes:
    //   - `ClassName` if the NEXT part is a static member
    //     (static var / const / enum / inner class / static func) —
    //     matches GDScript's convention of accessing statics via the
    //     class name, and avoids TS type-check surprises from
    //     accessing a static through `this`.
    //   - `this` otherwise (regular instance member).
    if (i === 0 && child.type === SyntaxType.Identifier && child.text === 'self') {
      const nextChild = children[i + 1];
      const nextName =
        nextChild && nextChild.type === SyntaxType.Identifier
          ? nextChild.text
          : nextChild && nextChild.type === SyntaxType.AttributeCall
            ? nextChild.namedChildren.find(
                (c) => c.type === SyntaxType.Identifier,
              )?.text ?? ''
            : '';
      if (nextName && ctx.staticMembers.has(nextName)) {
        parts.push(ctx.className);
      } else {
        parts.push('this');
      }
      selfSeen = true;
      continue;
    }

    if (child.type === SyntaxType.AttributeCall) {
      // method call on attribute: obj.method(args)
      const methodName =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const argsNode = child.childForFieldName('arguments');
      const args = argsNode
        ? argsNode.namedChildren.map((a) => emitExpr(a, ctx)).join(', ')
        : '';
      // .new() -> new ClassName()
      if (methodName === 'new') {
        const className = parts.join('.');
        parts.length = 0;
        parts.push(`new ${className}(${args})`);
      } else {
        parts.push(`${methodName}(${args})`);
      }
    } else if (child.type === SyntaxType.AttributeSubscript) {
      const attrName =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const argsNode = child.childForFieldName('arguments');
      const key = argsNode?.namedChildren[0];
      parts.push(`${attrName}[${key ? emitExpr(key, ctx) : ''}]`);
    } else if (child.type === SyntaxType.Identifier) {
      // After self or for property access, use raw identifier (no this. prefix)
      parts.push(child.text);
    } else {
      parts.push(emitExpr(child, ctx));
    }
  }

  // If the first part is a known class member, not shadowed by a
  // local variable, and no self was used, prefix with `this` (instance
  // member) or `ClassName` (static member — matches GDScript's
  // convention of accessing statics via the class name).
  if (!selfSeen && parts.length >= 1 && ctx.classMembers.has(parts[0]!) && !ctx.localVars.has(parts[0]!)) {
    const prefix = ctx.staticMembers.has(parts[0]!) ? ctx.className : 'this';
    parts.unshift(prefix);
  }

  return parts.join('.');
}

// ─── Binary / Unary Operators ─────────────────────────────────

/**
 * Detect %"UniqueNode"/Child or %UniqueNode/Child patterns.
 * Tree-sitter parses the `/` as a binary division operator.
 * Returns { path, suffix } where path is e.g. "%UniqueNode/Child" and suffix is
 * any trailing attribute chain (e.g. ".text" from `%"UniqueNode"/Child.text`), or null.
 */
export function tryEmitUniqueNodePath(node: SyntaxNode): { path: string; suffix: string } | null {
  const opNode = node.childForFieldName('op');
  if (!opNode || opNode.text !== '/') return null;

  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  if (!left || !right) return null;

  // Collect path segments: left may be another binary_operator with / or a get_node
  let basePath: string | null = null;
  let baseSuffix = '';
  if (left.type === SyntaxType.GetNode && left.text.startsWith('%')) {
    // %"UniqueNode" or %UniqueNode
    const text = left.text;
    if (text.startsWith('%"')) {
      basePath = `%${text.slice(2, -1)}`;
    } else {
      basePath = `%${text.slice(1)}`;
    }
  } else if (left.type === SyntaxType.BinaryOperator) {
    // Nested: %"UniqueNode"/Child/Grandchild
    const result = tryEmitUniqueNodePath(left);
    if (result) {
      basePath = result.path;
      baseSuffix = result.suffix;
    }
  }

  if (basePath === null) return null;

  // Right side: identifier (the child name) or attribute (Child.text → path + ".text")
  if (right.type === SyntaxType.Identifier) {
    return { path: `${basePath}/${right.text}`, suffix: baseSuffix };
  }
  if (right.type === SyntaxType.Attribute) {
    // Extract leading identifier as path component, rest becomes suffix
    // e.g. "Child.text" → path component "Child", suffix ".text"
    const firstChild = right.namedChildren[0];
    if (firstChild && firstChild.type === SyntaxType.Identifier) {
      const pathPart = firstChild.text;
      // The rest of the attribute text after the first identifier
      const attrSuffix = right.text.slice(firstChild.text.length);
      return { path: `${basePath}/${pathPart}`, suffix: baseSuffix + attrSuffix };
    }
  }

  return null;
}

export function emitBinaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const opText =
    opNode?.text ?? node.children.find((c) => !c.isNamed)?.text ?? '??';

  // GD `is not` -> !(... instanceof ...) or !gd.is<T>(...) for primitives
  // tree-sitter parses `x is not Y` as binary_operator with children: x, "is", "not", Y
  if (opText === 'is') {
    const anonymousChildren = node.children.filter((c) => !c.isNamed);
    const hasNot = anonymousChildren.some((c) => c.text === 'not');
    if (hasNot) {
      const leftStr = left ? emitExpr(left, ctx) : '';
      const rightStr = right?.text ?? '';
      if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
        return `!gd.is(${leftStr}, ${rightStr})`;
      }
      return `!(${leftStr} instanceof ${rightStr})`;
    }
  }

  // Fix tree-sitter-gdscript precedence bug: `not X op Y` is parsed as
  // `(not X) op Y` but GDScript evaluates it as `not (X op Y)`.
  // Lift the `not` to wrap the entire comparison.
  if (
    NOT_LIFT_OPS.has(opText) &&
    left &&
    left.type === SyntaxType.UnaryOperator
  ) {
    const unaryOp = left.children.find((c) => !c.isNamed)?.text;
    if (unaryOp === 'not') {
      const innerLeft = left.namedChildren[0];
      const innerLeftStr = innerLeft ? emitExpr(innerLeft, ctx) : '';
      const rightStr = right ? emitExpr(right, ctx) : '';
      // Rebuild the comparison without `not`, then wrap with `!(...)`
      const gdToTsOp: Record<string, string> = {
        '==': '===',
        '!=': '!==',
      };
      const tsOp = gdToTsOp[opText] ?? opText;
      if (opText === 'is') {
        if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
          return `!gd.is(${innerLeftStr}, ${rightStr})`;
        }
        return `!(${innerLeftStr} instanceof ${rightStr})`;
      }
      return `!(${innerLeftStr} ${tsOp} ${rightStr})`;
    }
  }

  // GD `as` -> gd.as()
  if (opText === 'as') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    return `gd.as(${leftStr}, ${rightStr})`;
  }

  // GD `is` -> instanceof for classes, gd.is<T>() for primitives
  if (opText === 'is') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
      return `gd.is(${leftStr}, ${rightStr})`;
    }
    return `${leftStr} instanceof ${rightStr}`;
  }

  // Check if this is an arithmetic op on operator-overloaded types (Vector2, Color, etc.)
  const mathFn = GD_OPS_MAP[opText];
  if (mathFn && left) {
    const leftType = inferExprType(left, ctx);
    if (leftType && ctx.registry.hasOperators(leftType)) {
      const leftStr = emitExpr(left, ctx);
      const rightStr = right ? emitExpr(right, ctx) : '';
      return `gd.ops.${mathFn}(${leftStr}, ${rightStr})`;
    }
  }

  const gdToTsOp: Record<string, string> = {
    and: '&&',
    or: '||',
    not: '!',
    '==': '===',
    '!=': '!==',
  };

  const tsOp = gdToTsOp[opText] ?? opText;
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';

  const result = `${leftStr} ${tsOp} ${rightStr}`;

  // Wrap `or`/`and` in `bool()` when used as a value (assigned, argument, returned)
  // AND the expression is not already boolean (comparisons return bool naturally).
  if ((opText === 'or' || opText === 'and') && isGdLogicalValueContext(node) && !isGdBoolExpression(node)) {
    return `bool(${result})`;
  }

  return result;
}

/**
 * Check if a GDScript `or`/`and` binary_operator is used as a value
 * (assigned, passed as argument, returned). In these contexts, we wrap
 * with `bool()` since GDScript returns bool but TS `||`/`&&` return operands.
 */
function isGdLogicalValueContext(node: SyntaxNode): boolean {
  const parent = node.parent;
  if (!parent) return false;

  // Assignment RHS: `a = b or c`
  if (
    parent.type === SyntaxType.Assignment ||
    parent.type === SyntaxType.AugmentedAssignment
  ) {
    return parent.childForFieldName('right')?.id === node.id;
  }

  // Variable initializer: `var a = b or c`
  if (parent.type === SyntaxType.VariableStatement) {
    return parent.childForFieldName('value')?.id === node.id;
  }

  // Function argument: `func(a or b)`
  if (parent.type === SyntaxType.Arguments) return true;

  // Return statement: `return a or b`
  if (parent.type === SyntaxType.ReturnStatement) return true;

  return false;
}

/** Comparison operators that always return bool. */
const GD_COMPARISON_OPS = new Set(['==', '!=', '<', '>', '<=', '>=', 'is', 'in']);

/**
 * Check if a GDScript expression is inherently boolean — composed entirely of
 * comparisons and logical operators. If so, `bool()` wrapper is unnecessary.
 */
function isGdBoolExpression(node: SyntaxNode): boolean {
  if (node.type === SyntaxType.BinaryOperator) {
    const op = node.children.find((c) => !c.isNamed)?.text ?? '';
    if (GD_COMPARISON_OPS.has(op)) return true;
    if (op === 'or' || op === 'and') {
      const left = node.childForFieldName('left');
      const right = node.childForFieldName('right');
      return (
        (left ? isGdBoolExpression(left) : true) &&
        (right ? isGdBoolExpression(right) : true)
      );
    }
  }
  if (node.type === SyntaxType.UnaryOperator) {
    const op = node.children.find((c) => !c.isNamed)?.text ?? '';
    if (op === 'not' || op === '!') return true;
  }
  // `true` / `false` literals
  if (node.text === 'true' || node.text === 'false') return true;
  return false;
}

export function emitUnaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const operand = node.namedChildren[0];
  const op = node.children.find((c) => !c.isNamed)?.text ?? '';
  const tsOp = op === 'not' ? '!' : op;
  const operandStr = operand ? emitExpr(operand, ctx) : '';
  // `not X is Y` → `!(X instanceof Y)` — needs parens so `!` applies to the whole expression
  if (tsOp === '!' && operand?.type === SyntaxType.BinaryOperator) {
    return `!(${operandStr})`;
  }
  return `${tsOp}${operandStr}`;
}
