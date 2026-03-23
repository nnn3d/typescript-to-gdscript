import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

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
}

// ─── XML Parsing ──────────────────────────────────────────────

export interface GodotClassXml {
  name: string;
  inherits?: string;
  briefDescription?: string;
  description?: string;
  methods: GodotMethodXml[];
  constructors: GodotMethodXml[];
  properties: GodotPropertyXml[];
  signals: GodotSignalXml[];
  constants: GodotConstantXml[];
  enums: GodotEnumInfo[];
  operators: GodotOperatorXml[];
  annotations: GodotAnnotationXml[];
}

export interface GodotMethodXml {
  name: string;
  returnType: string;
  parameters: GodotParamXml[];
  description?: string;
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
  description?: string;
  setter?: string;
  getter?: string;
}

export interface GodotSignalXml {
  name: string;
  parameters: GodotParamXml[];
  description?: string;
}

export interface GodotConstantXml {
  name: string;
  value: string;
  description?: string;
  enumName?: string;
}

export interface GodotAnnotationXml {
  name: string;
  parameters: GodotParamXml[];
  description?: string;
  isVararg: boolean;
}

export interface GodotOperatorXml {
  /** e.g., "+", "-", "*", "/", "==", "!=", "<", "<=", ">", ">=", "unary+", "unary-" */
  operator: string;
  returnType: string;
  /** For binary operators, the right-hand operand type. Absent for unary. */
  rightType?: string;
  description?: string;
}

/**
 * Extracts text content from a `<description>` tag within a body string.
 * Returns trimmed text or undefined if empty/missing.
 */
function extractDescription(body: string): string | undefined {
  const match = /<description>([\s\S]*?)<\/description>/.exec(body);
  if (!match) return undefined;
  const text = match[1]!.trim();
  return text || undefined;
}

/**
 * Converts Godot BBCode-style markup to plain text for JSDoc.
 * Strips [code], [b], [i], [url], [param], etc. tags.
 */
export function gdDocToPlain(text: string): string {
  return (
    text
      .replace(/\[codeblock\][\s\S]*?\[\/codeblock\]/g, '') // remove code blocks entirely
      .replace(/\[codeblocks\][\s\S]*?\[\/codeblocks\]/g, '')
      .replace(/\[code\](.*?)\[\/code\]/g, '`$1`')
      .replace(/\[param\s+(\w+)\]/g, '`$1`')
      .replace(/\[b\](.*?)\[\/b\]/g, '**$1**')
      .replace(/\[i\](.*?)\[\/i\]/g, '*$1*')
      .replace(/\[url=([^\]]*)\](.*?)\[\/url\]/g, '$2 ($1)')
      .replace(/\[([A-Z]\w*)\]/g, '{@link $1}') // class refs like [Node]
      .replace(/\[method\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[member\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[signal\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[constant\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[enum\s+([^\]]+)\]/g, '{@link $1}')
      .replace(/\[kbd\](.*?)\[\/kbd\]/g, '`$1`')
      .replace(/\[annotation\s+[^\]]+\]/g, '')
      .replace(/\[theme_item\s+[^\]]+\]/g, '')
      .replace(/\[color=[^\]]*\](.*?)\[\/color\]/g, '$1')
      .replace(/\[font=[^\]]*\](.*?)\[\/font\]/g, '$1')
      .replace(/\[br\]/g, '\n')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      // Normalize indentation: replace tabs and collapse multi-spaces
      .split('\n')
      .map((l) => l.replace(/\t/g, '').trim())
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
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

  // Parse class-level descriptions
  const briefMatch = /<brief_description>([\s\S]*?)<\/brief_description>/.exec(
    xmlContent,
  );
  const briefDescription = briefMatch?.[1]?.trim() || undefined;
  const classDescMatch = xmlContent.match(
    /<class[^>]*>[\s\S]*?<description>([\s\S]*?)<\/description>/,
  );
  const classDescription = classDescMatch?.[1]?.trim() || undefined;

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
    const paramRegex =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
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
      description: extractDescription(body),
      isVirtual: qualifiers.includes('virtual'),
      isStatic: qualifiers.includes('static'),
      isConst: qualifiers.includes('const'),
      isVararg: qualifiers.includes('vararg'),
    });
  }

  // Parse properties (members) — may have inline text or child <description>
  const propRegex =
    /<member name="([^"]+)" type="([^"]+)"(?:\s+setter="([^"]*)")?(?:\s+getter="([^"]*)")?[^>]*(?:\/>|>([\s\S]*?)<\/member>)/g;
  while ((match = propRegex.exec(xmlContent)) !== null) {
    const propDesc = match[5]?.trim() || undefined;
    properties.push({
      name: match[1]!,
      type: match[2]!,
      description: propDesc,
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
    signals.push({
      name: sigName,
      parameters: params,
      description: extractDescription(body),
    });
  }

  // Parse constants — may have inline text or child content
  const constRegex =
    /<constant name="([^"]+)" value="([^"]*)"(?:\s+enum="([^"]*)")?[^>]*(?:\/>|>([\s\S]*?)<\/constant>)/g;
  while ((match = constRegex.exec(xmlContent)) !== null) {
    const constContent = match[4]?.trim() || undefined;
    constants.push({
      name: match[1]!,
      value: match[2]!,
      description: constContent,
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

  // Parse operators
  const operators: GodotOperatorXml[] = [];
  const operatorRegex =
    /<operator name="operator ([^"]+)"[^>]*>([\s\S]*?)<\/operator>/g;
  while ((match = operatorRegex.exec(xmlContent)) !== null) {
    var opName = match[1]!
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    const opBody = match[2]!;

    const returnMatch = /<return type="([^"]*)"/.exec(opBody);
    const returnType = returnMatch?.[1] ?? '';

    const paramMatch = /<param index="0" name="[^"]*" type="([^"]+)"/.exec(
      opBody,
    );
    const rightType = paramMatch?.[1];

    operators.push({
      operator: opName,
      returnType,
      rightType,
      description: extractDescription(opBody),
    });
  }

  // Parse constructors
  const constructorMethods: GodotMethodXml[] = [];
  const ctorRegex =
    /<constructor name="([^"]+)"[^>]*>([\s\S]*?)<\/constructor>/g;
  while ((match = ctorRegex.exec(xmlContent)) !== null) {
    const ctorBody = match[2]!;
    const returnMatch = /<return type="([^"]*)"/.exec(ctorBody);
    const returnType = returnMatch?.[1] ?? name;
    const params: GodotParamXml[] = [];
    const paramRegex3 =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex3.exec(ctorBody)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }
    constructorMethods.push({
      name: match[1]!,
      returnType,
      parameters: params,
      description: extractDescription(ctorBody),
      isVirtual: false,
      isStatic: false,
      isConst: false,
      isVararg: false,
    });
  }

  // Parse annotations
  const annotations: GodotAnnotationXml[] = [];
  const annotationRegex =
    /<annotation name="@([^"]+)"(?:\s+qualifiers="([^"]*)")?[^>]*>([\s\S]*?)<\/annotation>/g;
  while ((match = annotationRegex.exec(xmlContent)) !== null) {
    const annName = match[1]!;
    const qualifiers = match[2] ?? '';
    const annBody = match[3]!;
    const params: GodotParamXml[] = [];
    const paramRegex4 =
      /<param index="\d+" name="([^"]+)" type="([^"]+)"(?:\s+default="([^"]*)")?/g;
    let paramMatch: RegExpExecArray | null;
    while ((paramMatch = paramRegex4.exec(annBody)) !== null) {
      params.push({
        name: paramMatch[1]!,
        type: paramMatch[2]!,
        defaultValue: paramMatch[3],
      });
    }
    annotations.push({
      name: annName,
      parameters: params,
      description: extractDescription(annBody),
      isVararg: qualifiers.includes('vararg'),
    });
  }

  return {
    name,
    inherits,
    briefDescription,
    description: classDescription,
    methods,
    constructors: constructorMethods,
    properties,
    signals,
    constants,
    enums: [...enumMap.values()],
    operators,
    annotations,
  };
}

/**
 * Parses all Godot XML class docs from a directory.
 */
export function parseAllClassXmls(
  classDocsDir: string,
): Map<string, GodotClassXml> {
  const xmlFiles = readdirSync(classDocsDir).filter((f) => f.endsWith('.xml'));
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

// ─── GDScript-specific builtins not in @GlobalScope XML ──

const GDSCRIPT_BUILTINS = [
  'range',
  'len',
  'load',
  'preload',
  'assert',
  'int',
  'float',
  'bool',
  'String',
  'str',
  'type_string',
  'is_instance_of',
  'inst_to_dict',
  'dict_to_inst',
  'print_stack',
  'get_stack',
];

// ─── Known constructor types (value types constructed as functions in GDScript) ──

const CONSTRUCTOR_TYPES = new Set([
  'Vector2',
  'Vector2i',
  'Vector3',
  'Vector3i',
  'Vector4',
  'Vector4i',
  'Color',
  'Rect2',
  'Rect2i',
  'Transform2D',
  'Transform3D',
  'Basis',
  'Quaternion',
  'AABB',
  'Plane',
  'Projection',
  'RID',
  'Callable',
  'Signal',
  'Dictionary',
  'Array',
  'PackedByteArray',
  'PackedInt32Array',
  'PackedInt64Array',
  'PackedFloat32Array',
  'PackedFloat64Array',
  'PackedStringArray',
  'PackedVector2Array',
  'PackedVector3Array',
  'PackedColorArray',
  'PackedVector4Array',
  'StringName',
  'NodePath',
]);

/**
 * Generates the class registry data from parsed XML classes.
 */
export function generateRegistryData(
  classes: Map<string, GodotClassXml>,
): GodotRegistryData {
  const registry: GodotRegistryData = {
    version: '',
    classes: {},
    globalFunctions: [],
    globalConstants: [],
    globalEnums: [],
    constructors: [...CONSTRUCTOR_TYPES],
    singletons: [],
  };

  for (const [name, cls] of classes) {
    // @GlobalScope is special — its members become globals
    if (name === '@GlobalScope') {
      registry.globalFunctions = [
        ...cls.methods.map((m) => m.name),
        ...GDSCRIPT_BUILTINS,
      ];
      registry.globalConstants = cls.constants
        .filter((c) => !c.enumName)
        .map((c) => c.name);
      registry.globalEnums = cls.enums;
      // Properties are global singletons (Engine, Input, ProjectSettings, etc.)
      registry.singletons = cls.properties.map((p) => ({
        name: p.name,
        type: p.type,
      }));
      continue;
    }

    // Skip other @-prefixed special docs
    if (name.startsWith('@')) continue;

    // Collect explicit method names + implicit setter/getter methods from properties
    const methodNames = cls.methods.map((m) => m.name);
    const explicitMethodSet = new Set(methodNames);
    for (const prop of cls.properties) {
      if (prop.setter && !explicitMethodSet.has(prop.setter)) {
        methodNames.push(prop.setter);
      }
      if (prop.getter && !explicitMethodSet.has(prop.getter)) {
        methodNames.push(prop.getter);
      }
    }

    registry.classes[name] = {
      name,
      inherits: cls.inherits ?? null,
      description: cls.briefDescription,
      methods: methodNames,
      properties: cls.properties.map((p) => p.name),
      signals: cls.signals.map((s) => ({
        name: s.name,
        parameters: s.parameters.map((p) => ({ name: p.name, type: p.type })),
      })),
      constants: cls.constants.filter((c) => !c.enumName).map((c) => c.name),
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
  private singletonsSet: Set<string>;

  constructor(data: GodotRegistryData) {
    this.data = data;
    this.globalFunctionsSet = new Set(data.globalFunctions);
    this.constructorsSet = new Set(data.constructors);
    this.singletonsSet = new Set((data.singletons ?? []).map((s) => s.name));
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

  /** Check if a name is a global singleton instance (Engine, Input, ProjectSettings, etc.) */
  isSingleton(name: string): boolean {
    return this.singletonsSet.has(name);
  }

  /** Check if a name should not get `this.` prefix (global function, constructor, or singleton) */
  isGlobal(name: string): boolean {
    return this.globalFunctionsSet.has(name) || this.constructorsSet.has(name) || this.singletonsSet.has(name);
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

// ─── Version Detection ────────────────────────────────────────

export interface GodotVersion {
  major: number;
  minor: number;
  patch: number;
  status: string;
  /** e.g. "4.7" */
  short: string;
  /** e.g. "4.7.0" */
  full: string;
}

/**
 * Parses version.py from the Godot repo to extract version info.
 */
export function parseGodotVersion(versionPyPath: string): GodotVersion {
  const content = readFileSync(versionPyPath, 'utf-8');
  const get = (key: string): string => {
    const m = new RegExp(`^${key}\\s*=\\s*(.+)$`, 'm').exec(content);
    if (!m) return '';
    return m[1]!.replace(/^["']|["']$/g, '').trim();
  };
  const major = parseInt(get('major')) || 0;
  const minor = parseInt(get('minor')) || 0;
  const patch = parseInt(get('patch')) || 0;
  const status = get('status');
  return {
    major,
    minor,
    patch,
    status,
    short: `${major}.${minor}`,
    full: `${major}.${minor}.${patch}`,
  };
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
export function generateGodotRegistry(
  options: GenerateRegistryOptions,
): GodotClassRegistry {
  const classes = parseAllClassXmls(options.classDocsDir);
  const data = generateRegistryData(classes);
  data.version = options.version ?? '';

  writeFileSync(options.outputPath, JSON.stringify(data, null, 2));
  return new GodotClassRegistry(data);
}
