import ts from 'typescript';
import { resolveRegistry } from '../../config/index.ts';

/**
 * Container types that DO support the `in` operator in GDScript. Everything
 * else in the registry's `constructors` list (all Godot variant/value types)
 * is considered banned for use with `in`.
 *
 * `Dictionary` supports `in` (checks key presence).
 * `Array` supports `in` (checks value presence).
 * `Packed*Array` types do NOT support `in`.
 * `String` supports `in` (substring check) but is mapped to `string` primitive.
 */
const GD_IN_ALLOWED_CONTAINER_TYPES = new Set(['Dictionary', 'Array', 'ReadonlyArray']);

/** GDScript primitive types that don't need type annotation on `= null` optional params. */
const GD_PRIMITIVE_TYPES = new Set([
  'int', 'float', 'bool', 'String', 'void',
]);

/**
 * Returns true if a GDScript type is a "class type" -- i.e. not a primitive and
 * not a variant/value type (Vector2, Color, etc.). Only class types need an
 * explicit type annotation when used as optional null-default parameters.
 */
export function isGdClassType(gdType: string): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  try {
    const registry = resolveRegistry();
    if (registry.isConstructor(gdType)) return false;
  } catch { /* registry unavailable */ }
  return true;
}

/**
 * Returns true if a GDScript type is a variant/value type (Vector2, Color, etc.)
 * -- i.e. a registry constructor but not a primitive.
 */
export function isGdVariantType(gdType: string): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  try {
    const registry = resolveRegistry();
    return registry.isConstructor(gdType);
  } catch { return false; }
}

/**
 * Packed array type names are recognized as "array" in error messages.
 * Derived from the registry's `constructors` list, filtered to entries that
 * start with `Packed` (Godot's naming convention for packed arrays).
 */
let cachedPackedArrayTypes: Set<string> | null = null;
/**
 * Non-container variant types banned from `in` RHS -- the set of registry
 * constructors minus `GD_IN_ALLOWED_CONTAINER_TYPES`, excluding `Packed*Array`
 * entries (those get a dedicated "the array type `X`" label).
 */
let cachedBannedValueTypes: Set<string> | null = null;

export function ensureBannedTypeSets(): void {
  if (cachedBannedValueTypes && cachedPackedArrayTypes) return;
  const banned = new Set<string>();
  const packed = new Set<string>();
  try {
    const registry = resolveRegistry();
    const constructors = registry.getData().constructors ?? [];
    for (const name of constructors) {
      if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) continue;
      if (name.startsWith('Packed') && name.endsWith('Array')) {
        packed.add(name);
      } else {
        banned.add(name);
      }
    }
  } catch {
    // Registry unavailable -- sets stay empty; only `isArrayType`/primitive
    // checks will fire.
  }
  cachedBannedValueTypes = banned;
  cachedPackedArrayTypes = packed;
}

/**
 * If the type is banned as a right-hand side of `in`, return a human-readable
 * label for the error message; otherwise return null.
 */
export function classifyInRhsType(
  type: ts.Type,
  checker: ts.TypeChecker,
): string | null {
  // Check symbol name first for allowed/banned types
  ensureBannedTypeSets();
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  const name = symbol?.getName();
  if (name) {
    // Array, Dictionary support `in` -- allow them
    if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) return null;
    if (cachedBannedValueTypes!.has(name)) {
      return `the value type \`${name}\``;
    }
    if (cachedPackedArrayTypes!.has(name)) {
      return `the array type \`${name}\``;
    }
  }

  // TS array types (T[], tuples) -- these map to GDScript Array, which supports `in`
  if (checker.isArrayType?.(type)) return null;
  if (checker.isTupleType?.(type)) return null;

  // Number/boolean primitives: `x in 42` / `x in true` is always wrong too.
  if (type.flags & ts.TypeFlags.NumberLike) return 'a number';
  if (type.flags & ts.TypeFlags.BooleanLike) return 'a boolean';

  return null;
}
