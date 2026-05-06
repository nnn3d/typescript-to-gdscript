import { readFileSync, writeFileSync } from 'fs';

import { parseAllClassXmls } from './xml-parser.ts';
import { generateRegistryData } from './registry-generator.ts';

// Re-export everything that external consumers need from the sub-modules
export { gdDocToPlain, parseClassXml, parseAllClassXmls } from './xml-parser.ts';
export type {
  GodotClassXml,
  GodotMethodXml,
  GodotParamXml,
  GodotPropertyXml,
  GodotSignalXml,
  GodotConstantXml,
  GodotAnnotationXml,
  GodotOperatorXml,
} from './xml-parser.ts';

export { generateRegistryData, parseGodotVersion } from './registry-generator.ts';
export type { GodotVersion } from './registry-generator.ts';

// ─── Data Types ───────────────────────────────────────────────

export interface GodotSignalParamInfo {
  name: string;
  /** Godot type name (e.g. "RID", "Area2D", "int") */
  type: string;
}

export interface GodotSignalInfo {
  name: string;
  parameters: GodotSignalParamInfo[];
}

export interface GodotClassInfo {
  name: string;
  inherits: string | null;
  description?: string;
  methods: string[];
  properties: string[];
  signals: GodotSignalInfo[];
  constants: string[];
  enums: GodotEnumInfo[];
  /**
   * List of variant types that can be converted to this class via `gd.as(value, ClassName)`.
   * Computed from single-parameter "from" constructors.
   * Example: Vector2 has variantConverts = ["Vector2", "Vector2i"]
   */
  variantConverts?: string[];
}

export interface GodotEnumInfo {
  name: string;
  values: Array<{ name: string; value: string }>;
}

export interface GodotRegistryData {
  version: string;
  classes: Record<string, GodotClassInfo>;
  globalFunctions: string[];
  globalConstants: string[];
  globalEnums: GodotEnumInfo[];
  /** Constructors like Vector2, Color etc */
  constructors: string[];
  /** Global singleton instances from @GlobalScope (e.g. Engine, Input, ProjectSettings) */
  singletons: Array<{ name: string; type: string }>;
  /** GDScript annotations that take no parameters (bare decorators in TS) */
  bareAnnotations: string[];
  /** Classes that have operator overloads (need gd.ops.* wrappers in TS) */
  operatorTypes: string[];
}

// ─── Registry Class (runtime) ─────────────────────────────────

export class GodotClassRegistry {
  private data: GodotRegistryData;
  private allMembersCache = new Map<string, Set<string>>();
  private globalFunctionsSet: Set<string>;
  private constructorsSet: Set<string>;
  private singletonsSet: Set<string>;

  private bareAnnotationsSet: Set<string>;
  private operatorTypesSet: Set<string>;
  private globalEnumNamesSet: Set<string>;

  constructor(data: GodotRegistryData) {
    this.data = data;
    this.globalFunctionsSet = new Set(data.globalFunctions);
    this.constructorsSet = new Set(data.constructors);
    this.singletonsSet = new Set((data.singletons ?? []).map((s) => s.name));
    this.bareAnnotationsSet = new Set(data.bareAnnotations ?? []);
    this.operatorTypesSet = new Set(data.operatorTypes ?? []);
    this.globalEnumNamesSet = new Set(
      (data.globalEnums ?? []).map((e) => e.name),
    );
  }

  static fromJsonFile(jsonPath: string): GodotClassRegistry {
    const data = JSON.parse(
      readFileSync(jsonPath, 'utf-8'),
    ) as GodotRegistryData;
    return new GodotClassRegistry(data);
  }

  static fromJson(json: string): GodotClassRegistry {
    return new GodotClassRegistry(JSON.parse(json) as GodotRegistryData);
  }

  /**
   * Get all member names (own + inherited) for a class.
   * Includes methods, properties, signals, and constants.
   */
  getAllMembers(className: string): Set<string> {
    const cached = this.allMembersCache.get(className);
    if (cached) return cached;

    const members = new Set<string>();
    const chain = this.getInheritanceChain(className);

    for (const cn of chain) {
      const cls = this.data.classes[cn];
      if (!cls) continue;
      for (const m of cls.methods) members.add(m);
      for (const p of cls.properties) members.add(p);
      for (const s of cls.signals) members.add(s.name);
      for (const c of cls.constants) members.add(c);
    }

    this.allMembersCache.set(className, members);
    return members;
  }

  /** Check if a function name is a global/builtin function */
  isGlobalFunction(name: string): boolean {
    return this.globalFunctionsSet.has(name);
  }

  /** Check if a name is a constructor type (Vector2, Color, etc) */
  isConstructor(name: string): boolean {
    return this.constructorsSet.has(name);
  }

  /**
   * Check if a source type can be converted to a target type via `gd.as(value, Target)`.
   * Returns true when the target class has the source type in its `variantConverts` list.
   */
  canVariantConvert(source: string, target: string): boolean {
    const targetCls = this.data.classes[target];
    if (!targetCls?.variantConverts) return false;
    return targetCls.variantConverts.includes(source);
  }

  /** Get the list of types that can be converted to a given target class. */
  getVariantConverts(target: string): string[] {
    return this.data.classes[target]?.variantConverts ?? [];
  }

  /** Check if a name is a global singleton instance (Engine, Input, ProjectSettings, etc.) */
  isSingleton(name: string): boolean {
    return this.singletonsSet.has(name);
  }

  /** Check if a name should not get `this.` prefix (global function, constructor, or singleton) */
  isGlobal(name: string): boolean {
    return this.globalFunctionsSet.has(name) || this.constructorsSet.has(name) || this.singletonsSet.has(name);
  }

  /** Check if an annotation takes no parameters (bare decorator in TS, no `()` needed) */
  isBareAnnotation(name: string): boolean {
    return this.bareAnnotationsSet.has(name);
  }

  /** Check if a class has operator overloads (needs gd.ops.* wrappers) */
  hasOperators(name: string): boolean {
    return this.operatorTypesSet.has(name);
  }

  /** Check if a name is a Godot global enum type (e.g. Key, MouseButton). */
  isGlobalEnum(name: string): boolean {
    return this.globalEnumNamesSet.has(name);
  }

  /** Get the inheritance chain for a class (including itself) */
  getInheritanceChain(className: string): string[] {
    const chain: string[] = [];
    let current: string | null = className;
    const visited = new Set<string>();

    while (current && !visited.has(current)) {
      visited.add(current);
      chain.push(current);
      const cls: GodotClassInfo | undefined = this.data.classes[current];
      current = cls?.inherits ?? null;
    }

    return chain;
  }

  /** Check if className extends (directly or indirectly) parentName */
  isSubclassOf(className: string, parentName: string): boolean {
    return this.getInheritanceChain(className).includes(parentName);
  }

  /** Check if a class exists in the registry */
  hasClass(className: string): boolean {
    return className in this.data.classes;
  }

  /** Get class info */
  getClass(className: string): GodotClassInfo | undefined {
    return this.data.classes[className];
  }

  /**
   * Get signal parameters for a signal on a class (walks inheritance chain).
   * Returns null if the signal is not found on the class or any ancestor.
   */
  getSignalParams(className: string, signalName: string): GodotSignalParamInfo[] | null {
    const chain = this.getInheritanceChain(className);
    for (const cn of chain) {
      const cls = this.data.classes[cn];
      if (!cls) continue;
      const sig = cls.signals.find((s) => s.name === signalName);
      if (sig) return sig.parameters;
    }
    return null;
  }

  /** Get registry data (for serialization) */
  getData(): GodotRegistryData {
    return this.data;
  }
}

// ─── Generation Entry Point ───────────────────────────────────

export interface GenerateRegistryOptions {
  /**
   * Path(s) to Godot docs XML class reference directories. Accepts a
   * single dir (legacy) or an array; later dirs override earlier ones
   * for same-named classes. See {@link parseAllClassXmls} for details.
   */
  classDocsDir: string | string[];
  outputPath: string;
  version?: string;
}

/**
 * Generates the Godot class registry JSON from XML class docs.
 */
export function generateGodotRegistry(
  options: GenerateRegistryOptions,
): GodotClassRegistry {
  const classes = parseAllClassXmls(options.classDocsDir);
  const data = generateRegistryData(classes);
  data.version = options.version ?? '';

  writeFileSync(options.outputPath, JSON.stringify(data, null, 2));
  return new GodotClassRegistry(data);
}
