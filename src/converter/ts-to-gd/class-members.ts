/**
 * Class member visitors for TS→GD conversion.
 * Handles signals, enums, properties, accessor pairs, gd.getset(),
 * inner classes, constructors, methods, and decorators.
 */
import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import type { TransformerDelegate } from './transformer-types.ts';

// ── Signals ──────────────────────────────────────────────────

export function isSignalProperty(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): boolean {
  if (!node.initializer) return false;
  return t.isGdHelperCall(node.initializer, 'signal');
}

export function visitSignalDeclaration(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const name = node.name.getText(t.ctx.sourceFile);
  const params = extractSignalParams(node, t);
  if (params.length > 0) {
    // GD permits untyped signal params (`signal foo(arg)`) — omit the `:
    // Variant` annotation when the TS type doesn't map to anything useful.
    const paramStr = params
      .map((p) => (p.type ? `${p.name}: ${p.type}` : p.name))
      .join(', ');
    t.emitter.writeLine(`signal ${name}(${paramStr})`, pos.line, pos.col);
  } else {
    t.emitter.writeLine(`signal ${name}`, pos.line, pos.col);
  }
}

function extractSignalParams(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): { name: string; type?: string }[] {
  if (!node.initializer || !ts.isCallExpression(node.initializer)) return [];
  const call = node.initializer;
  if (!call.typeArguments || call.typeArguments.length === 0) return [];
  const typeArg = call.typeArguments[0]!;
  if (!ts.isTupleTypeNode(typeArg)) return [];

  const params: { name: string; type?: string }[] = [];
  for (let i = 0; i < typeArg.elements.length; i++) {
    const element = typeArg.elements[i]!;
    let paramName: string;
    let typeNode: ts.TypeNode;
    if (ts.isNamedTupleMember(element)) {
      paramName = element.name.text;
      typeNode = element.type;
    } else {
      paramName = `arg${i + 1}`;
      typeNode = element;
    }
    const gdType = tsTypeNodeToGdType(
      typeNode, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
    );
    params.push(gdType ? { name: paramName, type: gdType } : { name: paramName });
  }
  return params;
}

// ── Enums ────────────────────────────────────────────────────

export function isEnumProperty(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): boolean {
  if (!node.initializer) return false;
  return t.isGdHelperCall(node.initializer, 'enum');
}

export function visitEnumDeclaration(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const name = node.name.getText(t.ctx.sourceFile);
  if (!node.initializer || !ts.isCallExpression(node.initializer)) return;

  const args = node.initializer.arguments;
  const enumValues: string[] = [];
  for (const arg of args) {
    if (ts.isStringLiteral(arg)) {
      enumValues.push(arg.text);
    } else if (ts.isArrayLiteralExpression(arg)) {
      const elements = arg.elements;
      if (elements.length >= 2 && ts.isStringLiteral(elements[0]!)) {
        enumValues.push(
          `${elements[0]!.text} = ${elements[1]!.getText(t.ctx.sourceFile)}`,
        );
      }
    }
  }
  t.emitter.writeLine(
    `enum ${toPascalCase(name)} {${enumValues.join(', ')}}`,
    pos.line, pos.col,
  );
}

// ── Properties ───────────────────────────────────────────────

export function visitPropertyDeclaration(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const name = node.name.getText(t.ctx.sourceFile);

  // Inner class
  if (node.initializer && ts.isClassExpression(node.initializer)) {
    visitInnerClassDeclaration(name, node.initializer, node, t);
    return;
  }

  // gd.getset
  if (node.initializer && t.isGdHelperCall(node.initializer, 'getset')) {
    visitGdGetsetProperty(name, node, node.initializer as ts.CallExpression, t);
    return;
  }

  const decorators = getDecorators(node, t);
  for (const dec of decorators) {
    t.emitter.writeLine(dec, pos.line, pos.col);
  }

  const isStatic = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.StaticKeyword,
  );
  const isReadonly = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ReadonlyKeyword,
  );

  const gdType = tsTypeNodeToGdType(
    node.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
  );

  let decl: string;
  if (isReadonly) {
    decl = `const ${name}`;
  } else {
    const staticPrefix = isStatic ? 'static ' : '';
    decl = `${staticPrefix}var ${name}`;
  }
  if (gdType) decl += `: ${gdType}`;

  if (
    node.initializer &&
    !t.isGdHelperCall(node.initializer, 'signal') &&
    !t.isGdHelperCall(node.initializer, 'enum')
  ) {
    decl += ` = ${t.emitExpression(node.initializer)}`;
  }

  t.emitter.writeLine(decl, pos.line, pos.col);

  if (node.initializer && t.isBlockLambda(node.initializer)) {
    t.emitLambdaBody(node.initializer);
  }
}

// ── Accessor Pair (get/set) ──────────────────────────────────

export function visitAccessorPair(
  name: string,
  getNode: ts.GetAccessorDeclaration | undefined,
  setNode: ts.SetAccessorDeclaration | undefined,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(getNode ?? setNode!);

  let gdType: string | null = null;
  if (getNode?.type) {
    gdType = tsTypeNodeToGdType(
      getNode.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
    );
  } else if (setNode && setNode.parameters.length > 0 && setNode.parameters[0]!.type) {
    gdType = tsTypeNodeToGdType(
      setNode.parameters[0]!.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
    );
  }

  const typeSuffix = gdType ? `: ${gdType}` : '';
  t.emitter.writeLine(`var ${name}${typeSuffix}:`, pos.line, pos.col);
  t.emitter.indent();

  const savedAccessorName = t.currentAccessorName;
  t.setCurrentAccessorName(name);

  if (getNode?.body) {
    t.emitter.writeLine('get:');
    t.emitter.indent();
    for (const stmt of getNode.body.statements) t.visitStatement(stmt);
    t.emitter.dedent();
  } else {
    t.emitter.writeLine('get:');
    t.emitter.indent();
    t.emitter.writeLine(`return ${name}`);
    t.emitter.dedent();
  }

  if (setNode?.body) {
    const paramName =
      setNode.parameters[0] && ts.isIdentifier(setNode.parameters[0].name)
        ? setNode.parameters[0].name.text
        : 'value';
    t.emitter.writeLine(`set(${paramName}):`);
    t.emitter.indent();
    for (const stmt of setNode.body.statements) t.visitStatement(stmt);
    t.emitter.dedent();
  } else {
    t.emitter.writeLine('set(value):');
    t.emitter.indent();
    t.emitter.writeLine(`${name} = value`);
    t.emitter.dedent();
  }

  t.setCurrentAccessorName(savedAccessorName);
  t.emitter.dedent();
}

// ── gd.getset() ──────────────────────────────────────────────

export function visitGdGetsetProperty(
  name: string,
  node: ts.PropertyDeclaration,
  call: ts.CallExpression,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);

  if (call.arguments.length !== 1 || !ts.isObjectLiteralExpression(call.arguments[0]!)) {
    t.addDiagnostic(call, 'error',
      '`gd.getset()` requires a single object literal argument with `get` and `set` properties.');
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
    else if (key === 'get') { hasGetKey = true; getExpr = prop.initializer; }
    else if (key === 'set') { hasSetKey = true; setExpr = prop.initializer; }
  }

  if (!hasGetKey || !hasSetKey) {
    t.addDiagnostic(call, 'error',
      '`gd.getset()` requires both `get` and `set` properties (use `null` for the default).');
    return;
  }

  const getIsNull = getExpr !== undefined && getExpr.kind === ts.SyntaxKind.NullKeyword;
  const setIsNull = setExpr !== undefined && setExpr.kind === ts.SyntaxKind.NullKeyword;

  if (getIsNull && setIsNull) {
    t.addDiagnostic(call, 'error',
      '`gd.getset()`: at least one of `get` or `set` must be non-null.');
    return;
  }

  const getIsInline = !getIsNull && getExpr !== undefined &&
    (ts.isArrowFunction(getExpr) || ts.isFunctionExpression(getExpr));
  const setIsInline = !setIsNull && setExpr !== undefined &&
    (ts.isArrowFunction(setExpr) || ts.isFunctionExpression(setExpr));
  const getIsRef = !getIsNull && !getIsInline;
  const setIsRef = !setIsNull && !setIsInline;

  if ((getIsInline && setIsRef) || (getIsRef && setIsInline)) {
    t.addDiagnostic(call, 'error',
      '`gd.getset()`: cannot mix inline `get`/`set` bodies with function-reference form.');
    return;
  }

  const usingRefForm = getIsRef || setIsRef;

  if (usingRefForm && valueExpr) {
    t.addDiagnostic(call, 'error',
      '`gd.getset()`: `value` default cannot be used with function-reference `get`/`set`.');
    return;
  }

  // Resolve type annotation
  let gdType = resolveGetsetType(call, node, setExpr, setIsNull, valueExpr, t);
  const typePart = gdType ? `: ${gdType}` : '';
  const valuePart = valueExpr ? ` = ${t.emitExpression(valueExpr)}` : '';

  if (usingRefForm) {
    const parts: string[] = [];
    if (getIsRef) {
      const fn = extractFunctionRefName(getExpr!);
      if (!fn) {
        t.addDiagnostic(call, 'error',
          '`gd.getset()`: function-reference form requires `this.fn_name` expressions.');
        return;
      }
      parts.push(`get = ${fn}`);
    }
    if (setIsRef) {
      const fn = extractFunctionRefName(setExpr!);
      if (!fn) {
        t.addDiagnostic(call, 'error',
          '`gd.getset()`: function-reference form requires `this.fn_name` expressions.');
        return;
      }
      parts.push(`set = ${fn}`);
    }
    t.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
    t.emitter.indent();
    t.emitter.writeLine(parts.join(', '));
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
    t.emitter.writeLine('get:');
    t.emitter.indent();
    if (ts.isBlock(getFn.body)) {
      for (const stmt of getFn.body.statements) t.visitStatement(stmt);
    } else {
      t.emitter.writeLine(`return ${t.emitExpression(getFn.body)}`);
    }
    t.emitter.dedent();
  }

  if (setIsInline) {
    const setFn = setExpr as ts.ArrowFunction | ts.FunctionExpression;
    const paramName =
      setFn.parameters[0] && ts.isIdentifier(setFn.parameters[0].name)
        ? setFn.parameters[0].name.text
        : 'value';
    t.emitter.writeLine(`set(${paramName}):`);
    t.emitter.indent();
    if (ts.isBlock(setFn.body)) {
      for (const stmt of setFn.body.statements) t.visitStatement(stmt);
    } else {
      t.emitter.writeLine(t.emitExpression(setFn.body));
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
      call.typeArguments[0]!, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
    );
  }
  if (!gdType && node.type) {
    gdType = tsTypeNodeToGdType(
      node.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
    );
  }
  if (!gdType && setExpr && !setIsNull) {
    const setType = t.ctx.checker.getTypeAtLocation(setExpr);
    const sigs = setType.getCallSignatures();
    if (sigs.length > 0 && sigs[0]!.parameters.length > 0) {
      const param = sigs[0]!.parameters[0]!;
      const paramDecl = param.valueDeclaration;
      if (paramDecl) {
        const paramType = t.ctx.checker.getTypeOfSymbolAtLocation(param, paramDecl);
        let cleaned = t.ctx.checker.typeToString(paramType, node, ts.TypeFormatFlags.NoTruncation)
          .replace(/\s*\|\s*null$/, '').replace(/\s*\|\s*undefined$/, '').trim();
        if (cleaned === 'number') cleaned = 'float';
        else if (cleaned === 'string') cleaned = 'String';
        else if (cleaned === 'boolean') cleaned = 'bool';
        if (cleaned && !['any', 'unknown', 'error', '{}'].includes(cleaned)) gdType = cleaned;
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
      let cleaned = t.ctx.checker.typeToString(widened, node, ts.TypeFormatFlags.NoTruncation)
        .replace(/\s*\|\s*null$/, '').replace(/\s*\|\s*undefined$/, '').trim();
      if (cleaned === 'number') cleaned = 'float';
      else if (cleaned === 'string') cleaned = 'String';
      else if (cleaned === 'boolean') cleaned = 'bool';
      if (cleaned && !['any', 'unknown', 'error', '{}'].includes(cleaned)) gdType = cleaned;
    }
  }
  return gdType;
}

function extractFunctionRefName(expr: ts.Expression): string | null {
  if (
    ts.isPropertyAccessExpression(expr) &&
    expr.expression.kind === ts.SyntaxKind.ThisKeyword &&
    ts.isIdentifier(expr.name)
  ) return expr.name.text;
  if (ts.isIdentifier(expr)) return expr.text;
  return null;
}

// ── Inner Class ──────────────────────────────────────────────

export function visitInnerClassDeclaration(
  name: string,
  classExpr: ts.ClassExpression,
  property: ts.PropertyDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(property);

  const decorators = getDecorators(property, t);
  for (const dec of decorators) t.emitter.writeLine(dec, pos.line, pos.col);

  let extendsClause = '';
  if (classExpr.heritageClauses) {
    for (const clause of classExpr.heritageClauses) {
      if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length > 0) {
        extendsClause = ` extends ${clause.types[0]!.expression.getText(t.ctx.sourceFile)}`;
      }
    }
  }

  t.emitter.writeLine(`class ${name}${extendsClause}:`, pos.line, pos.col);
  t.emitter.indent();

  let hasMembers = false;
  for (const member of classExpr.members) {
    if (ts.isMethodDeclaration(member)) {
      if (hasMembers) t.emitter.writeEmptyLine();
      visitMethodDeclaration(member, t);
      hasMembers = true;
    } else if (ts.isPropertyDeclaration(member)) {
      if (isSignalProperty(member, t)) visitSignalDeclaration(member, t);
      else if (isEnumProperty(member, t)) visitEnumDeclaration(member, t);
      else visitPropertyDeclaration(member, t);
      hasMembers = true;
    } else if (ts.isConstructorDeclaration(member)) {
      if (hasMembers) t.emitter.writeEmptyLine();
      visitConstructor(member, t);
      hasMembers = true;
    }
  }

  if (!hasMembers) t.emitter.writeLine('pass');
  t.emitter.dedent();
}

// ── Constructor → _init ──────────────────────────────────────

export function visitConstructor(
  node: ts.ConstructorDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const params = t.emitParameters(node.parameters);
  t.emitter.writeLine(`func _init(${params}):`, pos.line, pos.col);
  t.emitter.indent();
  if (node.body) {
    t.visitBlock(node.body);
  } else {
    t.emitter.writeLine('pass');
  }
  t.emitter.dedent();
}

// ── Methods ──────────────────────────────────────────────────

export function visitMethodDeclaration(
  node: ts.MethodDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const name = node.name.getText(t.ctx.sourceFile);
  const params = t.emitParameters(node.parameters);

  const returnType = tsTypeNodeToGdType(
    node.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
  );
  const returnAnnotation = returnType ? ` -> ${returnType}` : '';

  const decorators = getDecorators(node, t);
  for (const dec of decorators) t.emitter.writeLine(dec, pos.line, pos.col);

  const isAbstract = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
  );
  if (isAbstract) t.emitter.writeLine('@abstract', pos.line, pos.col);

  const isStatic = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.StaticKeyword,
  );
  const staticPrefix = isStatic ? 'static ' : '';

  t.emitter.writeLine(
    `${staticPrefix}func ${name}(${params})${returnAnnotation}:`,
    pos.line, pos.col,
  );
  t.emitter.indent();
  if (node.body) {
    t.visitBlock(node.body);
  } else {
    t.emitter.writeLine('pass');
  }
  t.emitter.dedent();
}

// ── Decorators ───────────────────────────────────────────────

export function getDecorators(
  node: ts.HasDecorators,
  t: TransformerDelegate,
): string[] {
  const result: string[] = [];
  const decorators = ts.getDecorators(node);
  if (!decorators) return result;

  for (const dec of decorators) {
    if (ts.isCallExpression(dec.expression)) {
      const callExpr = dec.expression;
      if (ts.isPropertyAccessExpression(callExpr.expression)) {
        const obj = callExpr.expression.expression;
        const method = callExpr.expression.name.text;
        if (ts.isIdentifier(obj) && obj.text === 'gd') {
          const args = callExpr.arguments.map((a) => t.emitExpression(a)).join(', ');
          result.push(args ? `@${method}(${args})` : `@${method}`);
        }
      } else if (ts.isIdentifier(callExpr.expression)) {
        let name = callExpr.expression.text;
        if (name === 'exports') name = 'export';
        const args = callExpr.arguments.map((a) => t.emitExpression(a)).join(', ');
        result.push(args ? `@${name}(${args})` : `@${name}`);
      }
    } else if (ts.isPropertyAccessExpression(dec.expression)) {
      const obj = dec.expression.expression;
      const method = dec.expression.name.text;
      if (ts.isIdentifier(obj) && obj.text === 'gd') {
        result.push(`@${method}`);
      }
    } else if (ts.isIdentifier(dec.expression)) {
      let name = dec.expression.text;
      if (name === 'exports') name = 'export';
      result.push(`@${name}`);
    }
  }
  return result;
}

// ── Helpers ──────────────────────────────────────────────────

export function toPascalCase(str: string): string {
  return str
    .replace(/^[A-Z]+/, (m) => m.charAt(0) + m.slice(1).toLowerCase())
    .replace(/_([a-zA-Z])/g, (_, c: string) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase());
}
