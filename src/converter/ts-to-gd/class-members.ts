/**
 * Class member visitors for TS→GD conversion.
 * Handles signals, enums, properties, accessor pairs, gd.getset(),
 * inner classes, constructors, methods, and decorators.
 */
import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import { visitGdGetsetProperty } from './gd-getset.ts';

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
  // The legacy `static X = gd.enum(...)` form is no longer supported.
  // Use a native TS `enum X { ... }` declaration at file scope —
  // it lifts into the script class as a GDScript `enum` via the
  // file-scope-decl pipeline (Phase 1).
  const name = node.name.getText(t.ctx.sourceFile);
  t.addDiagnostic(
    node,
    'error',
    `'static ${name} = gd.enum(...)' is no longer supported. ` +
      `Use a native TS \`enum ${toPascalCase(name)} { ... }\` at file scope ` +
      `(outside the script class) — it lifts into the GDScript class as an enum.`,
  );
}

// ── Properties ───────────────────────────────────────────────

export function visitPropertyDeclaration(
  node: ts.PropertyDeclaration,
  t: TransformerDelegate,
): void {
  const pos = t.getLineAndCol(node);
  const name = node.name.getText(t.ctx.sourceFile);

  // Inner class via the legacy `static X = class { ... }` form is no
  // longer supported. Use a file-scope `class X { ... }` declaration
  // instead — it lifts into the script class as an inner class via
  // the file-scope-decl pipeline (Phase 1).
  if (node.initializer && ts.isClassExpression(node.initializer)) {
    t.addDiagnostic(
      node,
      'error',
      `Inline 'static ${name} = class { ... }' is no longer supported. ` +
        `Move the class to file scope: \`class ${name} { ... }\` outside the script class.`,
    );
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
  // `readonly` is a TS-only contract — the compiler enforces no
  // reassignment, but on the GD side it emits a plain `var` (or
  // `static var` when paired with `static`). Class-level constants
  // are declared via a paired `namespace ClassName { export const X = ... }`
  // block instead — that lifts into `const X = ...` inside the GD class.

  const gdType = tsTypeNodeToGdType(
    node.type, t.ctx.checker, t.ctx.sourceFile, t.currentClassName,
  );

  const staticPrefix = isStatic ? 'static ' : '';
  let decl = `${staticPrefix}var ${name}`;
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
    const getPos = t.getLineAndCol(getNode);
    t.emitter.writeLine('get:', getPos.line, getPos.col);
    t.emitter.indent();
    for (const stmt of getNode.body.statements) t.visitStatement(stmt);
    t.emitter.dedent();
  } else {
    t.emitter.writeLine('get:', pos.line, pos.col);
    t.emitter.indent();
    t.emitter.writeLine(`return ${name}`, pos.line, pos.col);
    t.emitter.dedent();
  }

  if (setNode?.body) {
    const setPos = t.getLineAndCol(setNode);
    const paramName =
      setNode.parameters[0] && ts.isIdentifier(setNode.parameters[0].name)
        ? setNode.parameters[0].name.text
        : 'value';
    t.emitter.writeLine(`set(${paramName}):`, setPos.line, setPos.col);
    t.emitter.indent();
    for (const stmt of setNode.body.statements) t.visitStatement(stmt);
    t.emitter.dedent();
  } else {
    t.emitter.writeLine('set(value):', pos.line, pos.col);
    t.emitter.indent();
    t.emitter.writeLine(`${name} = value`, pos.line, pos.col);
    t.emitter.dedent();
  }

  t.setCurrentAccessorName(savedAccessorName);
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
    t.emitter.writeLine('pass', pos.line, pos.col);
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
    t.emitter.writeLine('pass', pos.line, pos.col);
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

  // Decorators are bare global function names — e.g. `@onready`, `@tool`,
  // `@export_range(0, 100)`, `@icon("res://x.svg")`. They're declared in
  // `typings/classes/_globals.d.ts` as global decorator functions and
  // emitted verbatim as GDScript annotations. The lone TS-specific quirk
  // is `@exports` (plural) — `export` is a TS reserved word so the
  // plural alias is rewritten to GDScript `@export`.
  for (const dec of decorators) {
    if (ts.isCallExpression(dec.expression) && ts.isIdentifier(dec.expression.expression)) {
      let name = dec.expression.expression.text;
      if (name === 'exports') name = 'export';
      const args = dec.expression.arguments.map((a) => t.emitExpression(a)).join(', ');
      result.push(args ? `@${name}(${args})` : `@${name}`);
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
