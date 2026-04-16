import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import type { GodotClassXml } from './godot-registry.ts';

// ─── Module-level mutable state ──────────────────────────────────
// These are set by `generateGodotDocsTypings()` before generation starts.

/** Set of known Godot classes, populated during generation */
let knownClasses = new Set<string>();

/**
 * Fundamental value types that are constructed as function calls in GDScript (not `new`).
 * These are emitted as interface + constructor function instead of `declare class`.
 *
 * Derived set of Godot value/variant types — classes that have a copy constructor
 * (a constructor with exactly one parameter of its own type).
 * Populated by `generateGodotDocsTypings()` before any class generation.
 */
let valueTypes = new Set<string>();

/**
 * Per-class set of member names whose types should stay non-nullable even
 * though they would normally be nullable reference types.
 * Populated from `src/typings/non-nullable/index.json` by `generateGodotDocsTypings()`.
 */
let nonNullableMembers = new Map<string, Set<string>>();

/**
 * Map of Godot type name → set of types that can be implicitly converted to it.
 * Built from single-parameter "from" constructors in the XML docs.
 * Used to widen method parameter types (e.g. `Vector2` parameter also accepts `Vector2i`).
 */
let variantParamConverts = new Map<string, string[]>();

// ─── Setter functions for mutable state ──────────────────────────

export function setKnownClasses(classes: Set<string>): void {
  knownClasses = classes;
}

export function setValueTypes(types: Set<string>): void {
  valueTypes = types;
}

export function setNonNullableMembers(members: Map<string, Set<string>>): void {
  nonNullableMembers = members;
}

export function setVariantParamConverts(converts: Map<string, string[]>): void {
  variantParamConverts = converts;
}

// ─── Getter functions for mutable state ──────────────────────────

export function getValueTypes(): Set<string> {
  return valueTypes;
}

export function getNonNullableMembers(): Map<string, Set<string>> {
  return nonNullableMembers;
}

export function getVariantParamConverts(): Map<string, string[]> {
  return variantParamConverts;
}

// ─── Constants ───────────────────────────────────────────────────

/** TS primitive types — widening between two primitives is excluded (too noisy). */
export const TS_PRIMITIVE_TYPES = new Set(['int', 'float', 'boolean', 'string', 'void', 'unknown']);

/** TS type names that are always non-nullable (primitives, void, unknown). */
export const NON_NULLABLE_TS_TYPES = new Set([
  'int', 'float', 'boolean', 'string', 'void', 'unknown', 'Dictionary',
]);

/** Names that conflict with TS/JS built-in globals and need prefixing */
export const CLASS_NAME_CONFLICTS = new Map<string, string>([
  ['Object', 'GodotObject'],
]);

/**
 * GDScript classes emitted as TS interfaces (replacing standard TS built-in types).
 * Maps GD class name → TS interface name. These are generated from Godot docs
 * instead of being hardcoded in globals.d.ts.
 */
export const INTERFACE_CLASSES = new Map<string, string>([
  ['Dictionary', 'Object'],
  ['Array', 'Array'],
  ['String', 'String'],
  ['Callable', 'Function'],
]);

export function sanitizeClassName(name: string): string {
  return CLASS_NAME_CONFLICTS.get(name) ?? name;
}

// ─── Type mapping functions ──────────────────────────────────────

/**
 * Maps a Godot type string to a TypeScript type string.
 */
export function godotTypeToTs(type: string): string {
  // Strip C++ pointer/reference markers (handle "type*", "type **", "const type*")
  const cleaned = type
    .replace(/[\s*]*\*+\s*$/, '')
    .replace(/^const\s+/, '')
    .trim();

  // Typed array suffix notation: "Node[]" → Array<Node>
  if (cleaned.endsWith('[]')) {
    const inner = cleaned.slice(0, -2);
    return `Array<${godotTypeToTs(inner)}>`;
  }

  switch (cleaned) {
    case 'int':
      return 'int';
    case 'float':
      return 'float';
    case 'bool':
      return 'boolean';
    case 'String':
      return 'string';
    case 'void':
      return 'void';
    case 'Nil':
      return 'void';
    case 'Variant':
      return 'unknown';
    case 'Array':
      return 'Array<unknown>';
    case 'Dictionary':
      return 'Dictionary';
    case 'StringName':
      return 'string';
    case 'Object':
      return 'GodotObject';
    case '':
      return 'void';
    // C++ internal types that leak from Godot docs
    case 'uint8_t':
      return 'int';
    case 'int32_t':
      return 'int';
    case 'int64_t':
      return 'int';
    case 'uint32_t':
      return 'int';
    case 'uint64_t':
      return 'int';
    case 'AudioFrame':
      return 'unknown';
    default:
      // Typed arrays like Array[Node]
      if (cleaned.startsWith('Array[')) {
        const inner = cleaned.slice(6, -1);
        return `Array<${godotTypeToTs(inner)}>`;
      }
      // Dictionary[K, V]
      if (cleaned.startsWith('Dictionary[')) {
        return 'Dictionary';
      }
      // Enum references like Node.ProcessMode
      if (cleaned.includes('.')) {
        return cleaned.replace('.', '_');
      }
      // Apply class name sanitization
      const sanitized = CLASS_NAME_CONFLICTS.get(cleaned);
      if (sanitized) return sanitized;
      // Unknown types not in Godot class list → unknown
      if (knownClasses.size > 0 && !knownClasses.has(cleaned)) {
        return 'unknown';
      }
      return cleaned;
  }
}

/**
 * Returns true when a Godot type should be made nullable (`T | null`) in
 * generated declarations.  Reference types (Node, Resource, Material, etc.)
 * are nullable; value/variant types, primitives, enums and arrays are not.
 */
export function isNullableGodotType(gdType: string): boolean {
  const cleaned = gdType
    .replace(/[\s*]*\*+\s*$/, '')
    .replace(/^const\s+/, '')
    .trim();
  // Empty / void / Nil / Variant
  if (cleaned === '' || cleaned === 'Nil' || cleaned === 'Variant') return false;
  // Derived value types (Vector2, Color, Packed*Array, etc.)
  if (valueTypes.has(cleaned)) return false;
  // Interface classes (Array, Dictionary, String, Callable)
  if (INTERFACE_CLASSES.has(cleaned)) return false;
  // Typed arrays / dictionaries — the container is never null
  if (cleaned.endsWith('[]') || cleaned.startsWith('Array[') || cleaned.startsWith('Dictionary['))
    return false;
  // Enum references (Node.ProcessMode → int)
  if (cleaned.includes('.')) return false;
  // Check the mapped TS type for primitives (int, float, bool→boolean, String→string, etc.)
  if (NON_NULLABLE_TS_TYPES.has(godotTypeToTs(cleaned))) return false;
  // Everything else is a reference type → nullable
  return true;
}

/**
 * Widen a Godot type for use as a method parameter by including all types
 * that can be variant-converted to it.
 * Returns the TS type string, potentially as a union (e.g. `Vector2 | Vector2i`).
 */
export function widenParamType(gdType: string): string {
  const tsType = godotTypeToTs(gdType);
  const converts = variantParamConverts.get(gdType);
  if (!converts || converts.length === 0) return tsType;
  const targetIsPrimitive = TS_PRIMITIVE_TYPES.has(tsType);
  const tsConverts = converts
    .map((t) => godotTypeToTs(t))
    .filter((t) => {
      if (t === tsType) return false; // no duplicate
      // Skip primitive→primitive widening (e.g. int accepting bool/string)
      if (targetIsPrimitive && TS_PRIMITIVE_TYPES.has(t)) return false;
      return true;
    });
  if (tsConverts.length === 0) return tsType;
  return `${tsType} | ${tsConverts.join(' | ')}`;
}

/**
 * Derive value types from parsed XML class data.
 * A class is a value type if it has a constructor with a single parameter of
 * its own type (e.g. `Vector2(from: Vector2)`).
 */
export function deriveValueTypes(classes: Map<string, GodotClassXml>): Set<string> {
  const result = new Set<string>();
  for (const [name, cls] of classes) {
    if (name.startsWith('@')) continue;
    // Skip types that godotTypeToTs maps to a different name (e.g. StringName→string,
    // bool→boolean) — they're handled as primitives, not value types.
    if (godotTypeToTs(name) !== name) continue;
    // Skip types handled as TS interfaces (Array, Dictionary, String, Callable)
    if (INTERFACE_CLASSES.has(name)) continue;
    const hasSelfCtor = cls.constructors.some(
      (c) => c.parameters.length === 1 && c.parameters[0]!.type === name,
    );
    if (hasSelfCtor) result.add(name);
  }
  return result;
}

/**
 * Derive variant conversion map from parsed XML class data.
 * For each class with single-parameter "from" constructors, records which types
 * can be converted to this class.
 */
export function deriveVariantParamConverts(
  classes: Map<string, GodotClassXml>,
): Map<string, string[]> {
  const result = new Map<string, string[]>();
  for (const [name, cls] of classes) {
    if (name.startsWith('@')) continue;
    const convertFrom: string[] = [];
    for (const ctor of cls.constructors) {
      if (ctor.parameters.length !== 1) continue;
      const param = ctor.parameters[0]!;
      if (param.name !== 'from' && !param.name.startsWith('from')) continue;
      if (param.type === name) continue; // skip self-copy constructor
      convertFrom.push(param.type);
    }
    if (convertFrom.length > 0) result.set(name, convertFrom);
  }
  return result;
}

/**
 * Load `non-nullable.json` from each override directory and merge.
 * Later directories override earlier ones (user > defaults).
 * Returns a map of ClassName → Set of member names that should be non-nullable.
 */
export function loadNonNullableOverrides(overrideDirs: string[]): Map<string, Set<string>> {
  const result = new Map<string, Set<string>>();
  for (const dir of overrideDirs) {
    const filePath = join(dir, 'non-nullable.json');
    if (!existsSync(filePath)) continue;
    const data: Record<string, string[]> = JSON.parse(readFileSync(filePath, 'utf-8'));
    for (const [cls, members] of Object.entries(data)) {
      // Later dirs fully replace the class entry (consistent with override merging)
      result.set(cls, new Set(members));
    }
  }
  return result;
}
