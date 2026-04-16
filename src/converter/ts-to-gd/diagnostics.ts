import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import type { DiagnosticsTypeInfo } from '../common/index.ts';

export type { DiagnosticsTypeInfo };

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
 * Build the diagnostics type info from a Godot class registry.
 * If `registry` is undefined (registry unavailable), returns empty sets — callers
 * fall back to primitive / TS-array checks only.
 */
export function buildDiagnosticsTypeInfo(
  registry: GodotClassRegistry | undefined,
): DiagnosticsTypeInfo {
  const constructors = new Set<string>();
  const packedArrayTypes = new Set<string>();
  const bannedInTypes = new Set<string>();
  if (registry) {
    for (const name of registry.getData().constructors ?? []) {
      constructors.add(name);
      if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) continue;
      if (name.startsWith('Packed') && name.endsWith('Array')) {
        packedArrayTypes.add(name);
      } else {
        bannedInTypes.add(name);
      }
    }
  }
  return { constructors, packedArrayTypes, bannedInTypes };
}

/**
 * Returns true if a GDScript type is a "class type" -- i.e. not a primitive and
 * not a variant/value type (Vector2, Color, etc.). Only class types need an
 * explicit type annotation when used as optional null-default parameters.
 */
export function isGdClassType(gdType: string, diagInfo: DiagnosticsTypeInfo): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  if (diagInfo.constructors.has(gdType)) return false;
  return true;
}

/**
 * Returns true if a GDScript type is a variant/value type (Vector2, Color, etc.)
 * -- i.e. a registry constructor but not a primitive.
 */
export function isGdVariantType(gdType: string, diagInfo: DiagnosticsTypeInfo): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  return diagInfo.constructors.has(gdType);
}

/**
 * If the type is banned as a right-hand side of `in`, return a human-readable
 * label for the error message; otherwise return null.
 */
export function classifyInRhsType(
  type: ts.Type,
  checker: ts.TypeChecker,
  diagInfo: DiagnosticsTypeInfo,
): string | null {
  // Check symbol name first for allowed/banned types
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  const name = symbol?.getName();
  if (name) {
    // Array, Dictionary support `in` -- allow them
    if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) return null;
    if (diagInfo.bannedInTypes.has(name)) {
      return `the value type \`${name}\``;
    }
    if (diagInfo.packedArrayTypes.has(name)) {
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
