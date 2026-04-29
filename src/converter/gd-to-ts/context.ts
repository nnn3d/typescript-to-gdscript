import type { TransformDiagnostic } from '../common/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/** Lightweight class info extracted from a GD source file */
export interface UserClassInfo {
  name: string;
  extends: string;
  members: Set<string>;
  /** Known types of member variables (for gd.ops detection across inheritance) */
  memberTypes: Map<string, string>;
  /**
   * Absolute path of the `.gd` source where this class is declared.
   * Used to compute import specifiers when the GD→TS converter needs
   * to emit `import { Foo } from './foo.js'` for cross-file
   * references in the new module-scoped typings layout (i.e. when the
   * project's `generateGlobalClassTypes` is `false`).
   *
   * Optional for back-compat: parsed via `parseGdClassInfo` callers
   * that don't yet thread the file path through.
   */
  filePath?: string;
}

export interface GdToTsContext {
  source: string;
  filePath: string;
  diagnostics: TransformDiagnostic[];
  /** Known class-level member names (for self -> this resolution) */
  classMembers: Set<string>;
  /** Local variables in current scope (params + local vars) — these shadow classMembers */
  localVars: Set<string>;
  /** Tracked types of local variables (for gd.ops detection) */
  localVarTypes: Map<string, string>;
  /** Tracked types of class member variables (for gd.ops detection) */
  classMemberTypes: Map<string, string>;
  /** Godot class registry for inherited member resolution */
  registry: GodotClassRegistry;
  /** User-defined class info from project sources */
  userClasses: Map<string, UserClassInfo>;
  /** Current method name (for super() → super.method() resolution) */
  currentMethodName?: string;
  /**
   * The TS-side class name. For named GD `class_name X`, this is `X`
   * (or `G_X` if the GD name began with an underscore — see
   * `escapeUnderscoreClassName`). For anonymous GD scripts (no
   * `class_name`), it is `_FilenameInUpperCamel`.
   */
  className: string;
  /** Static member names (const + static var) — accessed via ClassName, not this */
  staticMembers: Set<string>;
  /** Signal handler type info from .tscn connections (method name → param types) */
  signalHandlers: Map<string, { params: Array<{ name: string; gdType: string }> }>;
  /** Global enum constant → qualified name (e.g. "KEY_F21" → "Key.KEY_F21") */
  globalEnumMap: Map<string, string>;
  /** Class-level enum and inner class names (for type qualification: State → ClassName.State) */
  classTypeNames: Set<string>;
  /**
   * Subset of {@link classTypeNames} that are enums (not inner classes).
   * Used by IN-position widening to skip enums (which are numeric in TS)
   * while still widening reference-typed inner-class parameters.
   */
  classEnumNames: Set<string>;
  /** Use `any` instead of `unknown` as the fallback for unresolvable types */
  unsafeUseAny: boolean;
}

/** Build a map of bare global enum constant names → qualified TS names (e.g. "KEY_F21" → "Key.KEY_F21") */
export function buildGlobalEnumMap(registry: GodotClassRegistry): Map<string, string> {
  const map = new Map<string, string>();
  const data = registry.getData();
  for (const e of data.globalEnums) {
    const enumName = e.name.includes('.') ? e.name.replace(/\./g, '_') : e.name;
    for (const v of e.values) {
      map.set(v.name, `${enumName}.${v.name}`);
    }
  }
  return map;
}

/**
 * Check if a name is a global function/constructor/class (not a class member).
 * In GDScript, bare identifiers that are not local, not global, and not class names
 * must be class members (self properties/methods).
 */
export function isGlobalName(name: string, ctx: GdToTsContext): boolean {
  return (
    ctx.registry.isGlobal(name) ||
    ctx.registry.hasClass(name) ||
    ctx.userClasses.has(name)
  );
}

/**
 * Resolves all inherited members for a class, walking through user classes and Godot registry.
 */
export function resolveAllInheritedMembers(
  extendsClass: string,
  userClasses: Map<string, UserClassInfo>,
  registry: GodotClassRegistry,
): Set<string> {
  const allMembers = new Set<string>();
  let current: string | null = extendsClass;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    visited.add(current);

    // Check Godot registry first
    if (registry.hasClass(current)) {
      const inherited = registry.getAllMembers(current);
      for (const name of inherited) allMembers.add(name);
      break; // Registry already walks the full Godot chain
    }

    // Check user classes
    const userClass = userClasses.get(current);
    if (userClass) {
      for (const name of userClass.members) allMembers.add(name);
      current = userClass.extends || null;
    } else {
      break;
    }
  }

  return allMembers;
}

/**
 * Walks user class inheritance chain and copies memberTypes into the target map.
 * Does not overwrite types already present (own types take priority).
 */
export function resolveInheritedMemberTypes(
  extendsClass: string,
  userClasses: Map<string, UserClassInfo>,
  target: Map<string, string>,
): void {
  let current: string | null = extendsClass;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    visited.add(current);
    const userClass = userClasses.get(current);
    if (!userClass) break;
    for (const [name, type] of userClass.memberTypes) {
      if (!target.has(name)) target.set(name, type);
    }
    current = userClass.extends || null;
  }
}
