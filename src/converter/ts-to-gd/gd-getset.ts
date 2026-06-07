/**
 * `gd.getset()` property emitter for TS→GD conversion.
 *
 * `X = gd.getset<T>({ value?, get, set })` is the TS-side escape
 * hatch for GDScript setget patterns that don't fit the native
 * `get X() {} / set X(v) {}` accessor pair — specifically:
 *   - Properties with a default value + custom get/set
 *   - The `get = fn, set = fn` function-reference form in GDScript
 *
 * Two emission modes:
 *   - **Inline**: `get` / `set` are arrow functions — emitted as
 *     native GD `var X: get: ... set(v): ...`.
 *   - **Function-reference**: `get` / `set` are identifiers /
 *     `this.fn` accesses — emitted as GD `var X: get = fn, set = fn`.
 *
 * `null` on one side means "use GDScript's default" (backing-field
 * read/write) — the corresponding side is omitted from the GD
 * output. Both-null is an error. Mixing inline bodies with function
 * references in one call is also an error.
 *
 * Type resolution order (see `resolveGetsetType`):
 *   1. Explicit `gd.getset<T>({...})` type argument
 *   2. Property declaration's own annotation (`name: T = ...`)
 *   3. `set` callback parameter type (via call signature)
 *   4. `value` expression's type (numeric literal → `int` / `float`
 *      from source text; else `typeToString` + widening)
 */

import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import type { TransformerDelegate } from './transformer-types.ts';

export function visitGdGetsetProperty(
  name: string,
  node: ts.PropertyDeclaration,
  call: ts.CallExpression,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);

  if (
    call.arguments.length !== 1 ||
    !ts.isObjectLiteralExpression(call.arguments[0]!)
  ) {
    t.addDiagnostic(
      call,
      'error',
      '`gd.getset()` requires a single object literal argument with `get` and `set` properties.',
    );
    return;
  }
  const objArg = call.arguments[0] as ts.ObjectLiteralExpression;

  let valueExpr: ts.Expression | undefined;
  let getExpr: ts.Expression | undefined;
  let setExpr: ts.Expression | undefined;
  let hasGetKey = false;
  let hasSetKey = false;

  for (const prop of objArg.properties) {
    if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) continue;
    const key = prop.name.text;
    if (key === 'value') valueExpr = prop.initializer;
    else if (key === 'get') {
      hasGetKey = true;
      getExpr = prop.initializer;
    } else if (key === 'set') {
      hasSetKey = true;
      setExpr = prop.initializer;
    }
  }

  if (!hasGetKey || !hasSetKey) {
    t.addDiagnostic(
      call,
      'error',
      '`gd.getset()` requires both `get` and `set` properties (use `null` for the default).',
    );
    return;
  }

  const getIsNull =
    getExpr !== undefined && getExpr.kind === ts.SyntaxKind.NullKeyword;
  const setIsNull =
    setExpr !== undefined && setExpr.kind === ts.SyntaxKind.NullKeyword;

  if (getIsNull && setIsNull) {
    t.addDiagnostic(
      call,
      'error',
      '`gd.getset()`: at least one of `get` or `set` must be non-null.',
    );
    return;
  }

  const getIsInline =
    !getIsNull &&
    getExpr !== undefined &&
    (ts.isArrowFunction(getExpr) || ts.isFunctionExpression(getExpr));
  const setIsInline =
    !setIsNull &&
    setExpr !== undefined &&
    (ts.isArrowFunction(setExpr) || ts.isFunctionExpression(setExpr));
  const getIsRef = !getIsNull && !getIsInline;
  const setIsRef = !setIsNull && !setIsInline;

  if ((getIsInline && setIsRef) || (getIsRef && setIsInline)) {
    t.addDiagnostic(
      call,
      'error',
      '`gd.getset()`: cannot mix inline `get`/`set` bodies with function-reference form.',
    );
    return;
  }

  const usingRefForm = getIsRef || setIsRef;

  if (usingRefForm && valueExpr) {
    t.addDiagnostic(
      call,
      'error',
      '`gd.getset()`: `value` default cannot be used with function-reference `get`/`set`.',
    );
    return;
  }

  // Resolve type annotation
  const gdType = resolveGetsetType(
    call,
    node,
    setExpr,
    setIsNull,
    valueExpr,
    t,
  );
  const typePart = gdType ? `: ${gdType}` : '';
  const valuePart = valueExpr ? ` = ${t.emitExpression(valueExpr)}` : '';

  if (usingRefForm) {
    const parts: string[] = [];
    if (getIsRef) {
      const fn = extractFunctionRefName(getExpr!);
      if (!fn) {
        t.addDiagnostic(
          call,
          'error',
          '`gd.getset()`: function-reference form requires `this.fn_name` expressions.',
        );
        return;
      }
      parts.push(`get = ${fn}`);
    }
    if (setIsRef) {
      const fn = extractFunctionRefName(setExpr!);
      if (!fn) {
        t.addDiagnostic(
          call,
          'error',
          '`gd.getset()`: function-reference form requires `this.fn_name` expressions.',
        );
        return;
      }
      parts.push(`set = ${fn}`);
    }
    t.emitter.writeLine(
      `var ${name}${typePart}${valuePart}:`,
      pos.line,
      pos.col,
    );
    t.emitter.indent();
    t.emitter.writeLine(parts.join(', '), pos.line, pos.col);
    t.emitter.dedent();
    return;
  }

  // Inline form
  t.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
  t.emitter.indent();

  const savedAccessorName = t.currentAccessorName;
  t.setCurrentAccessorName(name);

  if (getIsInline) {
    const getFn = getExpr as ts.ArrowFunction | ts.FunctionExpression;
    const getPos = t.getLineAndCol(getFn);
    t.emitter.writeLine('get:', getPos.line, getPos.col);
    t.emitter.indent();
    if (ts.isBlock(getFn.body)) {
      for (const stmt of getFn.body.statements) t.visitStatement(stmt);
    } else {
      t.emitter.writeLine(
        `return ${t.emitExpression(getFn.body)}`,
        getPos.line,
        getPos.col,
      );
    }
    t.emitter.dedent();
  }

  if (setIsInline) {
    const setFn = setExpr as ts.ArrowFunction | ts.FunctionExpression;
    const setPos = t.getLineAndCol(setFn);
    const paramName =
      setFn.parameters[0] && ts.isIdentifier(setFn.parameters[0].name)
        ? setFn.parameters[0].name.text
        : 'value';
    t.emitter.writeLine(`set(${paramName}):`, setPos.line, setPos.col);
    t.emitter.indent();
    if (ts.isBlock(setFn.body)) {
      for (const stmt of setFn.body.statements) t.visitStatement(stmt);
    } else {
      t.emitter.writeLine(
        t.emitExpression(setFn.body),
        setPos.line,
        setPos.col,
      );
    }
    t.emitter.dedent();
  }

  t.setCurrentAccessorName(savedAccessorName);
  t.emitter.dedent();
}

/** Resolve type for gd.getset: generic arg > property annotation > set param > value inference */
function resolveGetsetType(
  call: ts.CallExpression,
  node: ts.PropertyDeclaration,
  setExpr: ts.Expression | undefined,
  setIsNull: boolean,
  valueExpr: ts.Expression | undefined,
  t: TransformerDelegate,
): string | null {
  let gdType: string | null = null;

  if (call.typeArguments && call.typeArguments.length > 0) {
    gdType = tsTypeNodeToGdType(
      call.typeArguments[0]!,
      t.ctx.checker,
      t.ctx.sourceFile,
      t.currentClassName,
      t.ctx.registry,
    );
  }
  if (!gdType && node.type) {
    gdType = tsTypeNodeToGdType(
      node.type,
      t.ctx.checker,
      t.ctx.sourceFile,
      t.currentClassName,
      t.ctx.registry,
    );
  }
  if (!gdType && setExpr && !setIsNull) {
    const setType = t.ctx.checker.getTypeAtLocation(setExpr);
    const sigs = setType.getCallSignatures();
    if (sigs.length > 0 && sigs[0]!.parameters.length > 0) {
      const param = sigs[0]!.parameters[0]!;
      const paramDecl = param.valueDeclaration;
      if (paramDecl) {
        const paramType = t.ctx.checker.getTypeOfSymbolAtLocation(
          param,
          paramDecl,
        );
        let cleaned = t.ctx.checker
          .typeToString(paramType, node, ts.TypeFormatFlags.NoTruncation)
          .replace(/\s*\|\s*null$/, '')
          .replace(/\s*\|\s*undefined$/, '')
          .trim();
        if (cleaned === 'number') cleaned = 'float';
        else if (cleaned === 'string') cleaned = 'String';
        else if (cleaned === 'boolean') cleaned = 'bool';
        if (cleaned && !['any', 'unknown', 'error', '{}'].includes(cleaned))
          gdType = cleaned;
      }
    }
  }
  if (!gdType && valueExpr) {
    if (ts.isNumericLiteral(valueExpr)) {
      const raw = valueExpr.getText(t.ctx.sourceFile);
      gdType = raw.includes('.') ? 'float' : 'int';
    } else {
      const inferred = t.ctx.checker.getTypeAtLocation(valueExpr);
      const widened = t.ctx.checker.getBaseTypeOfLiteralType(inferred);
      let cleaned = t.ctx.checker
        .typeToString(widened, node, ts.TypeFormatFlags.NoTruncation)
        .replace(/\s*\|\s*null$/, '')
        .replace(/\s*\|\s*undefined$/, '')
        .trim();
      if (cleaned === 'number') cleaned = 'float';
      else if (cleaned === 'string') cleaned = 'String';
      else if (cleaned === 'boolean') cleaned = 'bool';
      if (cleaned && !['any', 'unknown', 'error', '{}'].includes(cleaned))
        gdType = cleaned;
    }
  }
  return gdType;
}

function extractFunctionRefName(expr: ts.Expression): string | null {
  if (
    ts.isPropertyAccessExpression(expr) &&
    expr.expression.kind === ts.SyntaxKind.ThisKeyword &&
    ts.isIdentifier(expr.name)
  )
    return expr.name.text;
  if (ts.isIdentifier(expr)) return expr.text;
  return null;
}
