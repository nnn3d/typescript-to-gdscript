import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// ─── Data Types ───────────────────────────────────────────────

export interface GodotClassInfo {
  name: string;
  inherits: string | null;
  methods: string[];
  properties: string[];
  signals: string[];
  constants: string[];
  enums: GodotEnumInfo[];
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
}

// ─── XML Parsing ──────────────────────────────────────────────

export interface GodotClassXml {
  name: string;
  inherits?: string;
  methods: GodotMethodXml[];
  properties: GodotPropertyXml[];
  signals: GodotSignalXml[];
  constants: GodotConstantXml[];
  enums: GodotEnumInfo[];
}

export interface GodotMethodXml {
  name: string;
  returnType: string;
  parameters: GodotParamXml[];
  isVirtual: boolean;
  isStatic: boolean;
  isConst: boolean;
  isVararg: boolean;
}

export interface GodotParamXml {
  name: string;
  type: string;
  defaultValue?: string;
}

export interface GodotPropertyXml {
  name: string;
  type: string;
  setter?: string;
  getter?: string;
}

export interface GodotSignalXml {
  name: string;
  parameters: GodotParamXml[];
}

export interface GodotConstantXml {
  name: string;
  value: string;
  enumName?: string;
}

/**
 * Parses a Godot XML class documentation file.
 */
export function parseClassXml(xmlContent: string): GodotClassXml | null {
  const nameMatch = /<class name="([^"]+)"/.exec(xmlContent);
  if (!nameMatch) return null;

  const name = nameMatch[1]!;
  const inheritsMatch = /inherits="([^"]+)"/.exec(xmlContent);
  const inherits = inheritsMatch?.[1];

  const methods: GodotMethodXml[] = [];
  const properties: GodotPropertyXml[] = [];
  const signals: GodotSignalXml[] = [];
  const constants: GodotConstantXml[] = [];

  // Parse methods
  const methodRegex = /<method name="([^"]+)"([^>]*)>([\s\S]*?)<\/method>/g;
  let match: RegExpExecArray | null;
  while ((match = methodRegex.exec(xmlContent)) !== null) {
    const methodName = match[1]!;
    const attrs = match[2]!;
    const body = match[3]!;

    const returnMatch = /<return type="([^"]*)"/.exec(body);
    const returnType = returnMatch?.[1] ?? 'void';

    const params: GodotParamXml[] = [];
    const paramRegex = /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex.exec(body)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }

    const qualifiers = attrs.match(/qualifiers="([^"]*)"/)?.[1] ?? '';

    methods.push({
      name: methodName,
      returnType,
      parameters: params,
      isVirtual: qualifiers.includes('virtual'),
      isStatic: qualifiers.includes('static'),
      isConst: qualifiers.includes('const'),
      isVararg: qualifiers.includes('vararg'),
    });
  }

  // Parse properties (members)
  const propRegex = /<member name="([^"]+)" type="([^"]+)"(?:\s+setter="([^"]*)")?(?:\s+getter="([^"]*)")?/g;
  while ((match = propRegex.exec(xmlContent)) !== null) {
    properties.push({
      name: match[1]!,
      type: match[2]!,
      setter: match[3],
      getter: match[4],
    });
  }

  // Parse signals
  const signalRegex = /<signal name="([^"]+)"(?:\s*\/|>([\s\S]*?)<\/signal)>/g;
  while ((match = signalRegex.exec(xmlContent)) !== null) {
    const sigName = match[1]!;
    const body = match[2] ?? '';
    const params: GodotParamXml[] = [];
    const paramRegex2 = /<param index="\d+" name="([^"]+)" type="([^"]+)"/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex2.exec(body)) !== null) {
      params.push({ name: paramMatch[1]!, type: paramMatch[2]! });
    }
    signals.push({ name: sigName, parameters: params });
  }

  // Parse constants
  const constRegex = /<constant name="([^"]+)" value="([^"]*)"(?:\s+enum="([^"]*)")?/g;
  while ((match = constRegex.exec(xmlContent)) !== null) {
    constants.push({
      name: match[1]!,
      value: match[2]!,
      enumName: match[3],
    });
  }

  // Group constants by enum
  const enumMap = new Map<string, GodotEnumInfo>();
  for (const c of constants) {
    if (c.enumName) {
      let e = enumMap.get(c.enumName);
      if (!e) {
        e = { name: c.enumName, values: [] };
        enumMap.set(c.enumName, e);
      }
      e.values.push({ name: c.name, value: c.value });
    }
  }

  return {
    name,
    inherits,
    methods,
    properties,
    signals,
    constants,
    enums: [...enumMap.values()],
  };
}

/**
 * Parses all Godot XML class docs from a directory.
 */
export function parseAllClassXmls(classDocsDir: string): Map<string, GodotClassXml> {
  const xmlFiles = readdirSync(classDocsDir).filter(f => f.endsWith('.xml'));
  const classes = new Map<string, GodotClassXml>();

  for (const xmlFile of xmlFiles) {
    const xmlPath = join(classDocsDir, xmlFile);
    const xmlContent = readFileSync(xmlPath, 'utf-8');
    const cls = parseClassXml(xmlContent);
    if (cls) {
      classes.set(cls.name, cls);
    }
  }

  return classes;
}

// ─── Known constructor types (value types constructed as functions in GDScript) ──

const CONSTRUCTOR_TYPES = new Set([
  'Vector2', 'Vector2i', 'Vector3', 'Vector3i', 'Vector4', 'Vector4i',
  'Color', 'Rect2', 'Rect2i', 'Transform2D', 'Transform3D',
  'Basis', 'Quaternion', 'AABB', 'Plane', 'Projection',
  'RID', 'Callable', 'Signal', 'Dictionary', 'Array',
  'PackedByteArray', 'PackedInt32Array', 'PackedInt64Array',
  'PackedFloat32Array', 'PackedFloat64Array',
  'PackedStringArray', 'PackedVector2Array', 'PackedVector3Array',
  'PackedColorArray', 'PackedVector4Array',
  'StringName', 'NodePath',
]);

/**
 * Generates the class registry data from parsed XML classes.
 */
export function generateRegistryData(classes: Map<string, GodotClassXml>): GodotRegistryData {
  const registry: GodotRegistryData = {
    version: '',
    classes: {},
    globalFunctions: [],
    globalConstants: [],
    globalEnums: [],
    constructors: [...CONSTRUCTOR_TYPES],
  };

  for (const [name, cls] of classes) {
    // @GlobalScope is special — its members become globals
    if (name === '@GlobalScope') {
      registry.globalFunctions = cls.methods.map(m => m.name);
      registry.globalConstants = cls.constants
        .filter(c => !c.enumName)
        .map(c => c.name);
      registry.globalEnums = cls.enums;
      continue;
    }

    // Skip other @-prefixed special docs
    if (name.startsWith('@')) continue;

    registry.classes[name] = {
      name,
      inherits: cls.inherits ?? null,
      methods: cls.methods.map(m => m.name),
      properties: cls.properties.map(p => p.name),
      signals: cls.signals.map(s => s.name),
      constants: cls.constants.filter(c => !c.enumName).map(c => c.name),
      enums: cls.enums,
    };
  }

  return registry;
}

// ─── Registry Class (runtime) ─────────────────────────────────

export class GodotClassRegistry {
  private data: GodotRegistryData;
  private allMembersCache = new Map<string, Set<string>>();
  private globalFunctionsSet: Set<string>;
  private constructorsSet: Set<string>;

  constructor(data: GodotRegistryData) {
    this.data = data;
    this.globalFunctionsSet = new Set(data.globalFunctions);
    this.constructorsSet = new Set(data.constructors);
  }

  static fromJsonFile(jsonPath: string): GodotClassRegistry {
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8')) as GodotRegistryData;
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
      for (const s of cls.signals) members.add(s);
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

  /** Check if a name should not get `this.` prefix (global function OR constructor) */
  isGlobal(name: string): boolean {
    return this.globalFunctionsSet.has(name) || this.constructorsSet.has(name);
  }

  /** Get the inheritance chain for a class (including itself) */
  getInheritanceChain(className: string): string[] {
    const chain: string[] = [];
    let current: string | null = className;
    const visited = new Set<string>();

    while (current && !visited.has(current)) {
      visited.add(current);
      chain.push(current);
      const cls = this.data.classes[current];
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

  /** Get registry data (for serialization) */
  getData(): GodotRegistryData {
    return this.data;
  }
}

// ─── Generation Entry Point ───────────────────────────────────

export interface GenerateRegistryOptions {
  classDocsDir: string;
  outputPath: string;
  version?: string;
}

/**
 * Generates the Godot class registry JSON from XML class docs.
 */
export function generateGodotRegistry(options: GenerateRegistryOptions): GodotClassRegistry {
  const classes = parseAllClassXmls(options.classDocsDir);
  const data = generateRegistryData(classes);
  data.version = options.version ?? '';

  writeFileSync(options.outputPath, JSON.stringify(data, null, 2));
  return new GodotClassRegistry(data);
}
