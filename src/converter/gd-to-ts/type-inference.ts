import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import type { GdToTsContext } from './context.ts';
import { escapeUnderscoreClassName } from '../common/index.ts';

// ─── Type Inference (for gd.ops detection) ──────────────────

/** Extract raw GD type name from a type node */
export function extractGdTypeName(typeNode: SyntaxNode): string | null {
  if (typeNode.type === SyntaxType.Type) {
    return typeNode.namedChildren[0]?.text ?? typeNode.text;
  }
  if (typeNode.type === SyntaxType.InferredType) {
    return null;
  }
  return typeNode.text;
}

/** Infer type from expression without context (for parseGdClassInfo). Only handles constructor calls. */
export function inferExprTypeStatic(
  node: SyntaxNode,
  registry?: GodotClassRegistry,
): string | null {
  if (node.type === SyntaxType.Call) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      callee.type === SyntaxType.Identifier &&
      registry?.isConstructor(callee.text)
    ) {
      return callee.text;
    }
  }
  return null;
}

/** Infer the GD type of an expression (best-effort, for gd.ops detection) */
export function inferExprType(
  node: SyntaxNode,
  ctx: GdToTsContext,
): string | null {
  // Constructor call: Vector2(...), Color(...), etc.
  if (node.type === SyntaxType.Call) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      callee.type === SyntaxType.Identifier &&
      ctx.registry.hasOperators(callee.text)
    ) {
      return callee.text;
    }
  }
  // Array literal: [...]
  if (node.type === SyntaxType.Array) {
    return 'Array';
  }
  // Numeric/string/boolean literals
  if (node.type === SyntaxType.Integer) return 'int';
  if (node.type === SyntaxType.Float) return 'float';
  if (node.type === SyntaxType.String) return 'String';
  if (node.type === SyntaxType.True || node.type === SyntaxType.False)
    return 'bool';
  // Identifier: look up tracked type (local vars first, then class members)
  if (node.type === SyntaxType.Identifier) {
    if (ctx.localVarTypes.has(node.text))
      return ctx.localVarTypes.get(node.text)!;
    if (ctx.classMemberTypes.has(node.text))
      return ctx.classMemberTypes.get(node.text)!;
  }
  // Binary operator: inherit type from left operand
  if (node.type === SyntaxType.BinaryOperator) {
    const left = node.childForFieldName('left');
    if (left) return inferExprType(left, ctx);
  }
  return null;
}

export const GD_OPS_MAP: Record<string, string> = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '%': 'rem',
  '==': 'eq',
  '!=': 'ne',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
};

/** Comparison operators where GDScript `not` has lower precedence than the op,
 *  but tree-sitter-gdscript incorrectly parses `not X op Y` as `(not X) op Y`.
 *  In real GDScript, `not a == 0` means `not (a == 0)`. */
export const NOT_LIFT_OPS = new Set([
  '==',
  '!=',
  '<',
  '>',
  '<=',
  '>=',
  'in',
  'is',
]);

/** GDScript primitive types that use `gd.is()` instead of `instanceof` */
export const GD_IS_PRIMITIVE_TYPES = new Set([
  'int',
  'float',
  'bool',
  'String',
]);

// ─── Helpers ──────────────────────────────────────────────────

/**
 * True when `node` contains an `await` that belongs to the function/lambda
 * owning `node`. Does NOT recurse into nested lambda bodies — a `func(): …:
 * await …` inside the body defines its own async scope and shouldn't force
 * the enclosing function to be async.
 */
export function containsAwait(node: SyntaxNode): boolean {
  if (node.type === SyntaxType.AwaitExpression) return true;
  if (node.type === SyntaxType.Lambda) return false;
  for (const child of node.namedChildren) {
    if (containsAwait(child)) return true;
  }
  return false;
}

/**
 * Qualify a GD type reference against the current enclosing class's
 * type names. Handles both bare (`Inner`) and qualified
 * (`Config.Inner`) forms — if the FIRST segment matches a class-level
 * type name (enum or inner class declared directly in the current
 * class body), prepend the current class name so the type is
 * addressable through TypeScript's namespace+class merge.
 *
 *   Inner                 (inside Config, Inner ∈ Config types)    → Config.Inner
 *   Config.Inner          (inside _Anonym, Config ∈ _Anonym types) → _Anonym.Config.Inner
 *   Node                  (not in class types)                      → null
 *
 * Returns `null` when the type is not a class-level reference so
 * callers can fall back to `gdTypeToTs` / primitive mapping.
 */
export function qualifyClassType(
  raw: string,
  classTypeNames: Set<string>,
  enclosingClassName: string,
): string | null {
  const firstSegment = raw.split('.')[0] ?? raw;
  if (classTypeNames.has(firstSegment)) {
    return `${enclosingClassName}.${raw}`;
  }
  return null;
}

/**
 * If `raw` names the CURRENT class — accounting for the GD `_Foo` → TS
 * `G_Foo` escape applied to the class declaration (`escapeUnderscoreClassName`,
 * non-addon) — return the emitted TS class name (`ctx.className`). Otherwise
 * `null`.
 *
 * Only the self class is matched here: other user classes are left verbatim so
 * the batch import-injection pass (which keys on the un-escaped GD name) keeps
 * resolving them. Anonymous (filename-derived) class names like `_Anonym` are
 * never `G_`-escaped, so they only match via the exact-equality branch — a
 * no-op — and qualified forms (`G_Foo.Inner`, `_Anonym.Mode`) never match.
 */
export function selfClassNameIfMatches(
  raw: string,
  ctx: GdToTsContext,
): string | null {
  if (!ctx.className || !raw) return null;
  if (raw === ctx.className) return ctx.className;
  if (!ctx.isAddon && escapeUnderscoreClassName(raw) === ctx.className) {
    return ctx.className;
  }
  return null;
}

/**
 * Escape an already-mapped TS type string when it refers to the self class
 * (`_Foo` → `G_Foo`). No-op for primitives, Godot types, qualified
 * enum/inner-class names, and other user classes.
 */
export function escapeSelfClassType(
  tsType: string | null,
  ctx: GdToTsContext,
): string | null {
  if (!tsType) return tsType;
  return selfClassNameIfMatches(tsType, ctx) ?? tsType;
}

export function gdTypeToTs(gdType: string): string | null {
  switch (gdType) {
    case 'int':
      return 'int';
    case 'float':
      return 'float';
    case 'bool':
      return 'boolean';
    case 'String':
      return 'string';
    case 'StringName':
      return 'string';
    case 'void':
      return 'void';
    case 'Array':
      return 'Array<any>';
    case 'Dictionary':
      return 'Dictionary';
    case 'null':
      return 'null';
    case 'Variant':
      return 'any';
    default:
      // Array[T] -> Array<T>
      if (gdType.startsWith('Array[')) {
        const inner = gdType.slice(6, -1);
        const tsInner = gdTypeToTs(inner);
        return `Array<${tsInner ?? inner}>`;
      }
      // Dictionary[K, V] -> Dictionary<K, V>
      if (gdType.startsWith('Dictionary[')) {
        const inner = gdType.slice(11, -1);
        const [key, value] = splitTopLevelTypeArgs(inner);
        const tsKey = key ? (gdTypeToTs(key) ?? key) : 'unknown';
        const tsValue = value ? (gdTypeToTs(value) ?? value) : 'unknown';
        return `Dictionary<${tsKey}, ${tsValue}>`;
      }
      // Class type or unknown — keep as-is
      return gdType;
  }
}

/**
 * Split a GDScript generic argument list (the text inside `[...]`) on its
 * top-level commas, ignoring commas nested inside further `[...]` groups.
 * E.g. `int, Dictionary[String, float]` → ['int', 'Dictionary[String, float]'].
 */
export function splitTopLevelTypeArgs(inner: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of inner) {
    if (ch === '[') depth++;
    else if (ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) args.push(current.trim());
  return args;
}
