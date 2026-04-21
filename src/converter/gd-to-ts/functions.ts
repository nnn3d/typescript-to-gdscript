import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import {
  gdTypeToTs,
  containsAwait,
  extractGdTypeName,
  qualifyClassType,
} from './type-inference.ts';
import { getAnnotations } from './members.ts';
import { emitBody } from './statements.ts';
import { emitExpr } from './expressions.ts';

// ─── Functions ────────────────────────────────────────────────

export function emitFunction(node: SyntaxNode, ctx: GdToTsContext, isAbstract = false): string {
  const name = node.childForFieldName('name')?.text ?? 'unknown';
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  // Check for @abstract annotation as child (inner class context)
  const annotations = getAnnotations(node);
  const childAbstract = annotations.some(
    (ann) => ann.text === '@abstract',
  );

  // Create local scope for this function
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  const savedMethodName = ctx.currentMethodName;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  ctx.currentMethodName = name;
  collectParamNames(paramsNode, ctx);

  // Body `await` makes the function async in TS. Compute up front so the
  // return type can be wrapped in `Promise<…>` — TS requires async functions
  // to return a Promise. Abstract functions have no body, so they're never
  // async here.
  const isAsync = bodyNode ? containsAwait(bodyNode) : false;

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode, ctx, isAsync) : '';

  // GDScript `@abstract func` — emit as TS native `abstract method(): T;`
  // (no body) regardless of whether the abstract flag came from the
  // outer emitSourceFile pass (top-level) or from a child `@abstract`
  // annotation (inner class). Native abstract round-trips cleanly:
  // forward TS→GD turns `abstract method(): T;` back into
  // `@abstract func method() -> T`.
  if (isAbstract || childAbstract) {
    ctx.localVars = savedLocals;
    ctx.localVarTypes = savedLocalTypes;
    ctx.currentMethodName = savedMethodName;
    return `  abstract ${name}(${params})${returnType};`;
  }

  const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
  ctx.localVars = savedLocals;
  ctx.localVarTypes = savedLocalTypes;
  ctx.currentMethodName = savedMethodName;

  const asyncPrefix = isAsync ? 'async ' : '';

  if (body) {
    return `  ${asyncPrefix}${name}(${params})${returnType} {\n${body}\n  }`;
  }
  return `  ${asyncPrefix}${name}(${params})${returnType} {\n  }`;
}

export function emitConstructor(node: SyntaxNode, ctx: GdToTsContext): string {
  const paramsNode = node.childForFieldName('parameters');
  const bodyNode = node.childForFieldName('body');

  // Create local scope for constructor
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  collectParamNames(paramsNode, ctx);

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
  ctx.localVars = savedLocals;
  ctx.localVarTypes = savedLocalTypes;

  if (body) {
    return `  constructor(${params}) {\n${body}\n  }`;
  }
  return `  constructor(${params}) {\n  }`;
}

export function collectParamNames(
  paramsNode: SyntaxNode | null,
  ctx: GdToTsContext,
): void {
  if (!paramsNode) return;
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.Identifier) {
      ctx.localVars.add(child.text);
    } else if (
      child.type === SyntaxType.TypedParameter ||
      child.type === SyntaxType.DefaultParameter ||
      child.type === SyntaxType.TypedDefaultParameter
    ) {
      const name = child.namedChildren.find((c) =>
        c.type === SyntaxType.Identifier,
      )?.text;
      if (name) {
        ctx.localVars.add(name);
        // Track param type for operator overload inference
        const typeNode = child.childForFieldName('type');
        if (typeNode) {
          const typeName = extractGdTypeName(typeNode);
          if (typeName) ctx.localVarTypes.set(name, typeName);
        }
      }
    } else if (child.type === SyntaxType.VariadicParameter) {
      // Variadic param: `...args` or `...args: Array` — inner child holds the name
      const inner = child.namedChildren.find(
        (c) =>
          c.type === SyntaxType.Identifier ||
          c.type === SyntaxType.TypedParameter,
      );
      const name =
        inner?.type === SyntaxType.Identifier
          ? inner.text
          : inner?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
              ?.text;
      if (name) ctx.localVars.add(name);
    }
  }
}

export function emitParams(paramsNode: SyntaxNode, ctx: GdToTsContext): string {
  // Look up signal handler info for the current method (if any)
  const handlerInfo = ctx.currentMethodName
    ? ctx.signalHandlers.get(ctx.currentMethodName)
    : undefined;

  const params: string[] = [];
  let paramIndex = 0;
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.Identifier) {
      // Untyped param — use signal handler type if available
      if (handlerInfo && paramIndex < handlerInfo.params.length) {
        const sigParam = handlerInfo.params[paramIndex]!;
        const tsType = gdTypeToTs(sigParam.gdType);
        params.push(tsType ? `${child.text}: ${tsType}` : child.text);
      } else {
        params.push(child.text);
      }
      paramIndex++;
    } else if (child.type === SyntaxType.TypedParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const rawType = typeNode?.text ?? '';
      const tsType =
        qualifyClassType(rawType, ctx.classTypeNames, ctx.className) ??
        (typeNode ? gdTypeToTs(rawType) : null);
      params.push(tsType ? `${name}: ${tsType}` : name);
      paramIndex++;
    } else if (child.type === SyntaxType.DefaultParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const value = child.childForFieldName('value');
      const valueText = value?.text?.trim() ?? '';
      // `param = null` → `param: unknown = null` (or `any` with unsafe flag)
      if (valueText === 'null') {
        const fallbackType = ctx.unsafeUseAny ? 'any' : 'unknown';
        params.push(`${name}: ${fallbackType} = null`);
      } else {
        const valueStr = value ? emitExpr(value, ctx) : '';
        params.push(`${name} = ${valueStr}`);
      }
      paramIndex++;
    } else if (child.type === SyntaxType.TypedDefaultParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const value = child.childForFieldName('value');
      const rawType = typeNode?.text ?? '';
      const tsType =
        qualifyClassType(rawType, ctx.classTypeNames, ctx.className) ??
        (typeNode ? gdTypeToTs(rawType) : null);
      const valueText = value?.text?.trim() ?? '';
      // `param: Type = null` → `param: Type | null = null`
      if (valueText === 'null') {
        const typeStr = tsType ? `: ${tsType} | null` : ': unknown';
        params.push(`${name}${typeStr} = null`);
      } else {
        const valueStr = value ? emitExpr(value, ctx) : '';
        const typeStr = tsType ? `: ${tsType}` : '';
        params.push(`${name}${typeStr} = ${valueStr}`);
      }
      paramIndex++;
    } else if (child.type === SyntaxType.VariadicParameter) {
      // Variadic: `...args` → `...args: any[]`, `...args: Array` → `...args: Array<unknown>`
      const inner = child.namedChildren.find(
        (c) =>
          c.type === SyntaxType.Identifier ||
          c.type === SyntaxType.TypedParameter,
      );
      if (inner?.type === SyntaxType.Identifier) {
        params.push(`...${inner.text}: any[]`);
      } else if (inner?.type === SyntaxType.TypedParameter) {
        const name =
          inner.namedChildren.find((c) => c.type === SyntaxType.Identifier)
            ?.text ?? '';
        const typeNode = inner.childForFieldName('type');
        const rawType = typeNode?.text ?? '';
        const tsType = gdTypeToTs(rawType);
        // GDScript varargs always collect into an Array. The mapped TS type
        // for `Array` is already `Array<unknown>`, so use it directly.
        // For any other type, it's already an array-like form.
        params.push(`...${name}: ${tsType ?? 'any[]'}`);
      }
      paramIndex++;
    }
  }
  return params.join(', ');
}

/**
 * Emit a TypeScript return-type annotation from a GDScript return type node.
 *
 * When `isAsync` is true the resolved type is wrapped in `Promise<…>` so the
 * emitted signature is valid TS for an `async` method/lambda (TS rejects a
 * bare non-Promise return type on an async function).
 *
 * Returns an empty string when no usable type was resolved — TS will then
 * infer (e.g. `Promise<void>` for an async function with no annotation).
 */
export function emitReturnType(
  typeNode: SyntaxNode,
  ctx: GdToTsContext,
  isAsync = false,
): string {
  let tsType: string | null;
  if (typeNode.type === SyntaxType.Type) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    tsType =
      qualifyClassType(inner, ctx.classTypeNames, ctx.className) ??
      gdTypeToTs(inner);
  } else {
    const raw = typeNode.text;
    tsType =
      qualifyClassType(raw, ctx.classTypeNames, ctx.className) ??
      gdTypeToTs(raw);
  }
  if (!tsType) return '';
  return isAsync ? `: Promise<${tsType}>` : `: ${tsType}`;
}

// ─── Lambda ───────────────────────────────────────────────────

export function emitLambda(node: SyntaxNode, ctx: GdToTsContext): string {
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  // Register lambda params in scope for type inference (e.g. operator overload detection)
  const savedLocalVars = new Set(ctx.localVars);
  const savedLocalVarTypes = new Map(ctx.localVarTypes);
  collectParamNames(paramsNode, ctx);

  // `await` inside a lambda body makes it an async arrow function; wrap the
  // return type in `Promise<…>` for the same reason as for `emitFunction`.
  const isAsync = bodyNode ? containsAwait(bodyNode) : false;
  const asyncPrefix = isAsync ? 'async ' : '';

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode, ctx, isAsync) : '';

  let result: string;

  // Check if body is a single return expression
  if (bodyNode && bodyNode.namedChildren.length === 1) {
    const stmt = bodyNode.namedChildren[0]!;
    if (
      stmt.type === SyntaxType.ReturnStatement &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      result = `${asyncPrefix}(${params})${returnType} => ${emitExpr(expr, ctx)}`;
    } else if (
      stmt.type === SyntaxType.ExpressionStatement &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      result = `${asyncPrefix}(${params})${returnType} => { ${emitExpr(expr, ctx)}; }`;
    } else {
      const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
      result = `${asyncPrefix}(${params})${returnType} => {\n${body}\n  }`;
    }
  } else {
    // Multi-statement lambda
    const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
    result = `${asyncPrefix}(${params})${returnType} => {\n${body}\n  }`;
  }

  // Restore scope
  ctx.localVars = savedLocalVars;
  ctx.localVarTypes = savedLocalVarTypes;
  return result;
}
