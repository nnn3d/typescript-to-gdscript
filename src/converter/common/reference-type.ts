import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/**
 * True when `gdType` refers to a Godot class (Node, Resource, Material, user
 * class, ...) — a type that can legitimately hold `null` in GDScript. False
 * for primitives (int, float, bool, String), variant/value types (Vector2,
 * Color, Packed*Array, Dictionary, Callable, Signal, StringName, NodePath, ...),
 * typed array/dictionary syntax, enum references, and special markers
 * (`void`, `Nil`, `Variant`, `any`, `unknown`).
 *
 * Reference types are candidates for `T | null` widening in the GD-to-TS
 * converter. Value types are not — Godot does not permit assigning null to
 * them.
 */
export function isReferenceType(
  gdType: string,
  registry: GodotClassRegistry,
): boolean {
  const cleaned = gdType.trim();

  if (
    cleaned === '' ||
    cleaned === 'Nil' ||
    cleaned === 'Variant' ||
    cleaned === 'void'
  ) {
    return false;
  }
  if (cleaned === 'any' || cleaned === 'unknown') return false;
  if (
    cleaned.endsWith('[]') ||
    cleaned.startsWith('Array[') ||
    cleaned.startsWith('Dictionary[')
  ) {
    return false;
  }
  // Dotted names are always Godot class enum refs (e.g. `Node.ProcessMode`).
  // GDScript has no syntax for dotted inner-class type references in its own
  // source, so any `.` here is an enum. TS-side dotted references are handled
  // separately by callers that have class-scope context.
  if (cleaned.includes('.')) return false;
  if (registry.isConstructor(cleaned)) return false;
  // A global enum (`Key`, `Error`, …) is an int in GDScript.
  if (registry.isGlobalEnum(cleaned)) return false;

  return true;
}
