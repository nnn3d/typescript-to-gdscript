import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import {
  gdTypeToTs,
  extractGdTypeName,
  inferExprType,
  qualifyClassType,
} from './type-inference.ts';
import { emitExpr } from './expressions.ts';
import { emitBody } from './statements.ts';
import { widenInType } from './functions.ts';

// ─── Comments ─────────────────────────────────────────────────

/** Convert a triple-quoted GDScript string to a JS block comment */
export function emitBlockComment(text: string, indent: string): string {
  const content = text.slice(3, -3);
  // Single-line: /* content */
  if (!content.includes('\n')) {
    return `${indent}/* ${content.trim()} */`;
  }
  // Multiline: strip common leading whitespace, then re-indent
  const rawLines = content.split('\n');
  const nonEmptyLines = rawLines.filter(l => l.trim() !== '');
  const minIndent = nonEmptyLines.reduce((min, l) => {
    const leading = l.match(/^(\s*)/)?.[1]?.length ?? 0;
    return Math.min(min, leading);
  }, Infinity);
  const stripped = nonEmptyLines.map(l => l.slice(minIndent));

  const result: string[] = [];
  result.push(`${indent}/*`);
  for (const line of stripped) {
    result.push(`${indent}${line.trimEnd()}`);
  }
  result.push(`${indent}*/`);
  return result.join('\n');
}

export function emitComment(node: SyntaxNode): string {
  const text = node.text;
  if (text.startsWith('##')) {
    // Doc comment: ## ... -> /** ... */
    const content = text.slice(2).trim();
    return `  /** ${content} */`;
  }
  // Regular comment: # ... -> // ...
  const content = text.slice(1).trim();
  return `  // ${content}`;
}

// ─── Comments (inline) ───────────────────────────────────────

export function emitCommentInline(node: SyntaxNode): string {
  const text = node.text;
  if (text.startsWith('##')) {
    const content = text.slice(2).trim();
    return `/** ${content} */`;
  }
  const content = text.slice(1).trim();
  return `// ${content}`;
}

// ─── Signals ──────────────────────────────────────────────────

export function emitSignal(node: SyntaxNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const paramsNode = node.childForFieldName('parameters');

  if (paramsNode && paramsNode.namedChildren.length > 0) {
    const types = emitSignalParamTypes(paramsNode, ctx);
    return `  ${name} = gd.signal<[${types}]>();`;
  }

  return `  ${name} = gd.signal();`;
}

export function emitSignalParamTypes(
  paramsNode: SyntaxNode,
  ctx: GdToTsContext,
): string {
  const types: string[] = [];
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.TypedParameter) {
      const typeNode = child.childForFieldName('type');
      const rawType = typeNode?.text ?? '';
      const baseType = typeNode ? gdTypeToTs(rawType) : 'any';
      const widened = widenInType(rawType, baseType, ctx);
      types.push(widened ?? 'any');
    } else if (child.type === SyntaxType.Identifier) {
      types.push('any');
    }
  }
  return types.join(', ');
}

// ─── Enums ────────────────────────────────────────────────────

export function emitEnum(node: SyntaxNode, ctx: GdToTsContext): string {
  // Named GD enums are lifted to file scope by the source emitter
  // (see `emitFileScopeEnum` / `emitFileScopeClass`); this function
  // only handles ANONYMOUS GD enums (no name) which have no clean
  // file-scope TS form and stay as a series of static constants
  // inside the class body.
  const bodyNode = node.childForFieldName('body');
  if (!bodyNode) return '';

  const enumerators = bodyNode.namedChildren.filter((c) =>
    c.type === SyntaxType.Enumerator,
  );

  // Anonymous enum -> static constants
  const lines: string[] = [];
  let counter = 0;
  for (const e of enumerators) {
    const eName = e.childForFieldName('left')?.text;
    const eValue = e.childForFieldName('right');
    const val = eValue ? parseInt(eValue.text) : counter;
    if (eName) {
      lines.push(`  static ${eName}: int = ${val};`);
    }
    counter = val + 1;
  }
  return lines.join('\n');
}

// ─── Variables ────────────────────────────────────────────────

export function emitClassVariable(node: SyntaxNode, ctx: GdToTsContext): string {
  const annotations = getAnnotations(node);
  const isStatic = node.childForFieldName('static') !== null;
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  // Detect setget clause (inline `get: ... set(v): ...` OR `get = fn, set = fn`)
  const setgetNode = node.namedChildren.find(
    (c) => c.type === SyntaxType.Setget,
  );

  let decorators = '';
  for (const ann of annotations) {
    decorators += `  ${emitAnnotationAsDecorator(ann, ctx)}\n`;
  }

  const staticPrefix = isStatic ? 'static ' : '';
  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';

  // If there's a setget clause, delegate to specialized emitter
  if (setgetNode) {
    return emitSetgetVariable(
      name,
      typeNode,
      typeAnnotation,
      valueNode,
      setgetNode,
      decorators,
      staticPrefix,
      ctx,
    );
  }

  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';
  return `${decorators}  ${staticPrefix}${name}${typeAnnotation}${init};`;
}

/**
 * Try to emit a `typeof <expr>` type annotation for a value expression.
 * Returns null if the expression isn't typeof-able (literal, call, operator,
 * etc.) — `typeof` in type position only accepts identifiers and property
 * access chains that refer to values.
 */
function tryEmitTypeofValue(
  valueNode: SyntaxNode,
  ctx: GdToTsContext,
): string | null {
  // Walk past any simple parenthesized wrapping
  let node: SyntaxNode | undefined = valueNode;
  while (node && node.type === SyntaxType.ParenthesizedExpression) {
    node = node.namedChildren[0];
  }
  if (!node) return null;

  // Plain identifiers and attribute/member chains
  if (node.type === SyntaxType.Identifier) {
    return `typeof ${emitExpr(node, ctx)}`;
  }
  if (node.type === SyntaxType.Attribute) {
    return `typeof ${emitExpr(node, ctx)}`;
  }
  return null;
}

/**
 * Emit a variable with a `setget` clause as either:
 *  - TS `get`/`set` accessors (simple case: no value, inline get/set bodies)
 *  - `name = gd.getset<T>({...})` assignment (complex case: has value, or alt
 *    `get = fn, set = fn` syntax)
 *
 * Mixing alt function-ref syntax with inline bodies, or using a value with
 * alt syntax, is an error (the user's rule).
 */
function emitSetgetVariable(
  name: string,
  typeNode: SyntaxNode | null,
  typeAnnotation: string,
  valueNode: SyntaxNode | null,
  setgetNode: SyntaxNode,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const getNode = setgetNode.namedChildren.find(
    (c) => c.type === SyntaxType.GetBody || c.type === SyntaxType.Getter,
  );
  const setNode = setgetNode.namedChildren.find(
    (c) => c.type === SyntaxType.SetBody || c.type === SyntaxType.Setter,
  );

  const getIsInline = getNode?.type === SyntaxType.GetBody;
  const getIsRef = getNode?.type === SyntaxType.Getter;
  const setIsInline = setNode?.type === SyntaxType.SetBody;
  const setIsRef = setNode?.type === SyntaxType.Setter;

  const hasAnyInline = getIsInline || setIsInline;
  const hasAnyRef = getIsRef || setIsRef;
  const hasValue = !!valueNode;

  // Error: mixing inline and function-ref syntax
  if (hasAnyInline && hasAnyRef) {
    ctx.diagnostics.push({
      message:
        `Variable '${name}': cannot mix inline get/set bodies with ` +
        `function-reference syntax (\`get = fn_name, set = fn_name\`).`,
      severity: 'error',
      line: setgetNode.startPosition.row + 1,
      column: setgetNode.startPosition.column + 1,
      file: ctx.filePath,
    });
  }

  // Decide which output form to use
  const useGdGetset = hasValue || hasAnyRef;

  // Resolve the TS type for the property annotation.
  //  1. Explicit GDScript type annotation (e.g. `var b: int = ...`)
  //  2. `typeof <value>` when the value expression is typeof-able
  //     (identifier / property-access — not a literal or complex expr)
  //  3. Fall back to `unknown` (default) or `any` (with `--unsafe-use-any`)
  let tsType: string;
  if (typeNode) {
    const typeText = extractGdTypeName(typeNode) ?? 'Variant';
    tsType = gdTypeToTs(typeText) ?? (ctx.unsafeUseAny ? 'any' : 'unknown');
  } else if (valueNode) {
    const typeofExpr = tryEmitTypeofValue(valueNode, ctx);
    tsType = typeofExpr ?? (ctx.unsafeUseAny ? 'any' : 'unknown');
  } else {
    tsType = ctx.unsafeUseAny ? 'any' : 'unknown';
  }

  if (!useGdGetset) {
    // Simple case: emit TS get/set accessors. Getter return and setter
    // value are emitted with the SAME type — they represent the same
    // property and mismatched nullability (getter strict, setter nullish,
    // or vice versa) produces confusing semantics at call sites. For
    // reference types, both sides default to `T | null`; Phase D skips
    // setter value params to preserve this symmetry.
    const rawType = typeNode ? extractGdTypeName(typeNode) ?? '' : '';
    const accessorType = widenInType(rawType, tsType, ctx) ?? tsType;
    return emitTsAccessors(
      name,
      accessorType,
      getNode,
      setNode,
      decorators,
      staticPrefix,
      ctx,
    );
  }

  // Complex case: emit `name = gd.getset<T>({...})` assignment
  return emitGdGetsetCall(
    name,
    tsType,
    typeAnnotation,
    valueNode,
    getNode,
    setNode,
    decorators,
    staticPrefix,
    ctx,
  );
}

/**
 * Emit a pair of TS `get`/`set` accessors for a simple inline setget.
 * If only one of get/set exists, synthesize a default for the other that
 * reads/writes `this.<name>`.
 */
function emitTsAccessors(
  name: string,
  tsType: string,
  getNode: SyntaxNode | undefined,
  setNode: SyntaxNode | undefined,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const indent = '  ';
  const bodyIndent = '    ';
  const lines: string[] = [];

  // Getter and setter share `tsType` so the property's read and write
  // contracts stay in sync (both nullish for reference types by default).
  lines.push(`${decorators}${indent}${staticPrefix}get ${name}(): ${tsType} {`);
  if (getNode?.type === SyntaxType.GetBody) {
    const body = getNode.childForFieldName('body');
    const bodyStr = body ? emitBody(body, ctx, 2) : '';
    if (bodyStr) lines.push(bodyStr);
  } else {
    lines.push(`${bodyIndent}return this.${name};`);
  }
  lines.push(`${indent}}`);
  lines.push('');

  lines.push(`${indent}${staticPrefix}set ${name}(value: ${tsType}) {`);
  if (setNode?.type === SyntaxType.SetBody) {
    const body = setNode.childForFieldName('body');
    // The setter's parameter name may differ from `value` — copy it verbatim
    // from the GD source by using the original parameter identifier.
    const params = setNode.namedChildren.find(
      (c) => c.type === SyntaxType.Parameters,
    );
    const paramName =
      params?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
        ?.text ?? 'value';
    const savedLocals = new Set(ctx.localVars);
    ctx.localVars.add(paramName);
    const bodyStr = body ? emitBody(body, ctx, 2) : '';
    ctx.localVars = savedLocals;
    if (paramName !== 'value') {
      lines[lines.length - 1] =
        `${indent}${staticPrefix}set ${name}(${paramName}: ${tsType}) {`;
    }
    if (bodyStr) lines.push(bodyStr);
  } else {
    lines.push(`${bodyIndent}this.${name} = value;`);
  }
  lines.push(`${indent}}`);

  return lines.join('\n');
}

/**
 * Emit `name = gd.getset<T>({ value?: ..., get: ..., set: ... })` for complex
 * cases (has default value or uses `get = fn, set = fn` function-ref syntax).
 */
function emitGdGetsetCall(
  name: string,
  tsType: string,
  typeAnnotation: string,
  valueNode: SyntaxNode | null,
  getNode: SyntaxNode | undefined,
  setNode: SyntaxNode | undefined,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const indent = '  ';
  const iProp = '    ';
  const iBody = '      ';
  const lines: string[] = [];
  const entries: string[] = [];

  if (valueNode) {
    entries.push(`${iProp}value: ${emitExpr(valueNode, ctx)},`);
  }

  // Both `get` and `set` keys are required in gd.getset. `null` means
  // "use GDScript's default (backing-field read/write)".
  if (getNode?.type === SyntaxType.GetBody) {
    const body = getNode.childForFieldName('body');
    const bodyStr = body ? emitBody(body, ctx, 3) : '';
    entries.push(`${iProp}get: () => {`);
    if (bodyStr) entries.push(bodyStr);
    entries.push(`${iProp}},`);
  } else if (getNode?.type === SyntaxType.Getter) {
    entries.push(`${iProp}get: this.${getNode.text},`);
  } else {
    entries.push(`${iProp}get: null,`);
  }

  if (setNode?.type === SyntaxType.SetBody) {
    const body = setNode.childForFieldName('body');
    const params = setNode.namedChildren.find(
      (c) => c.type === SyntaxType.Parameters,
    );
    const paramName =
      params?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
        ?.text ?? 'value';
    const savedLocals = new Set(ctx.localVars);
    ctx.localVars.add(paramName);
    const bodyStr = body ? emitBody(body, ctx, 3) : '';
    ctx.localVars = savedLocals;
    entries.push(`${iProp}set: (${paramName}) => {`);
    if (bodyStr) entries.push(bodyStr);
    entries.push(`${iProp}},`);
  } else if (setNode?.type === SyntaxType.Setter) {
    entries.push(`${iProp}set: this.${setNode.text},`);
  } else {
    entries.push(`${iProp}set: null,`);
  }

  // Emit an explicit property type annotation. Without it, TS7022 fires
  // because the inline get/set arrow functions reference `this.<name>`
  // inside the initializer, creating a binding-resolution cycle. The
  // annotation breaks the cycle (TS knows the field's type independent of
  // the initializer) and also provides the contextual type for `gd.getset`,
  // so the explicit `<T>` generic is not emitted.
  lines.push(`${decorators}${indent}${staticPrefix}${name}: ${tsType} = gd.getset({`);
  lines.push(...entries);
  lines.push(`${indent}});`);

  return lines.join('\n');
}

// GD class-body `const X = ...` declarations are lifted into the
// paired `export namespace ClassName { export const X = ... }` block
// by the file-scope emitter, not emitted as a class member. (Previously
// there was an `emitConstStatement` here that produced `static readonly`,
// but the namespace-merge pattern superseded it.)

export function emitLocalVariable(
  node: SyntaxNode,
  ctx: GdToTsContext,
  indent: string,
): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  // Register as local variable before emitting value (to avoid this. prefix in self-reference)
  ctx.localVars.add(name);

  // Track variable type from explicit annotation or inferred from initializer
  const inferredType = typeNode
    ? extractGdTypeName(typeNode)
    : valueNode
      ? inferExprType(valueNode, ctx)
      : null;
  if (inferredType) ctx.localVarTypes.set(name, inferredType);

  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  return `${indent}let ${name}${typeAnnotation}${init};`;
}

// ─── Type Annotations ─────────────────────────────────────────

export function emitTypeAnnotation(typeNode: SyntaxNode, ctx: GdToTsContext): string {
  if (typeNode.type === SyntaxType.InferredType) {
    return ''; // := inferred — omit type in TS
  }
  if (typeNode.type === SyntaxType.Type) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    // Qualify class-level enum/inner class types. Handles both bare
    // (`State` → `ClassName.State`) and qualified
    // (`Config.Inner` → `_Anonym.Config.Inner`) forms.
    const qualified = qualifyClassType(inner, ctx.classTypeNames, ctx.className);
    if (qualified) return `: ${qualified}`;
    const tsType = gdTypeToTs(inner);
    return tsType ? `: ${tsType}` : '';
  }
  const raw = typeNode.text;
  const qualified = qualifyClassType(raw, ctx.classTypeNames, ctx.className);
  if (qualified) return `: ${qualified}`;
  const tsType = gdTypeToTs(raw);
  return tsType ? `: ${tsType}` : '';
}

// ─── Annotations / Decorators ─────────────────────────────────

export function getAnnotations(node: SyntaxNode): SyntaxNode[] {
  const annotations: SyntaxNode[] = [];
  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.Annotations) {
      for (const ann of child.namedChildren) {
        if (ann.type === SyntaxType.Annotation) {
          annotations.push(ann);
        }
      }
    }
  }
  return annotations;
}

export function emitAnnotationAsDecorator(node: SyntaxNode, ctx: GdToTsContext): string {
  // Annotation text is like "@export" or "@onready" or "@export_range(0, 100)"
  const text = node.text;
  const match = text.match(/^@(\w+)(?:\((.+)\))?$/);
  if (!match) return `// ${text}`;

  const name = match[1]!;
  const args = match[2];

  // GDScript @export → TS @exports (avoids TS keyword conflict)
  const tsName = name === 'export' ? 'exports' : name;

  if (args) {
    return `@${tsName}(${args})`;
  }
  // Parameterized annotations need () even when called without args in GD
  if (!ctx.registry.isBareAnnotation(name)) {
    return `@${tsName}()`;
  }
  return `@${tsName}`;
}
