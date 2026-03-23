import {
  writeFileSync,
  readFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  rmSync,
} from 'fs';
import { join } from 'path';
import ts from 'typescript';
import {
  parseAllClassXmls,
  generateRegistryData,
  GodotClassRegistry,
  gdDocToPlain,
  type GodotClassXml,
  type GodotMethodXml,
  type GodotParamXml,
  type GodotOperatorXml,
} from './godot-registry.ts';

export interface GodotDocsTypingsOptions {
  /** Path to Godot docs XML class reference directory */
  classDocsDir: string;
  /** Output directory for generated .d.ts files */
  outputDir: string;
  /** Directory containing override .d.ts files to merge into generated output */
  overrideDir?: string;
  /** Also generate the class registry JSON at this path */
  registryOutputPath?: string;
  /** Godot version label */
  version?: string;
}

/**
 * Maps a Godot type string to a TypeScript type string.
 */
/** Set of known Godot classes, populated during generation */
let knownClasses = new Set<string>();

export function godotTypeToTs(type: string): string {
  // Strip C++ pointer/reference markers (handle "type*", "type **", "const type*")
  const cleaned = type
    .replace(/[\s*]*\*+\s*$/, '')
    .replace(/^const\s+/, '')
    .trim();

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
    case 'NodePath':
      return 'string';
    case 'StringName':
      return 'string';
    case 'Object':
      return 'GodotObject';
    case 'Signal':
      return 'GodotSignal';
    case 'Error':
      return 'GodotError';
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

/** TS reserved words and strict-mode identifiers that cannot be used as-is */
const TS_RESERVED = new Set([
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
  // Strict mode / TS contextual
  'as',
  'async',
  'await',
  'from',
  'get',
  'is',
  'let',
  'of',
  'set',
  'static',
  'type',
  // TS declaration keywords
  'abstract',
  'implements',
  'interface',
  'private',
  'protected',
  'public',
]);

function sanitizeParamName(name: string): string {
  if (TS_RESERVED.has(name)) return `${name}_`;
  return name;
}

/** Check if a property name needs quoting (contains non-identifier chars or starts with digit) */
function needsQuoting(name: string): boolean {
  return /[^a-zA-Z0-9_$]/.test(name) || /^\d/.test(name);
}

function sanitizeFunctionName(name: string): string {
  if (TS_RESERVED.has(name)) return `${name}_`;
  return name;
}

/**
 * Formats a description string as JSDoc comment lines.
 * Returns array of lines like ["  /** Description here *​/"]
 * or multi-line JSDoc for longer descriptions.
 */
function emitJsDoc(
  description: string | undefined,
  indent: string = '  ',
): string[] {
  if (!description) return [];
  var plain = gdDocToPlain(description);
  if (!plain) return [];

  // Escape */ inside JSDoc to prevent premature closure
  plain = plain.replace(/\*\//g, '*\\/');

  // Use brief (first sentence or first line) for short descriptions
  const lines = plain.split('\n').filter((l) => l.trim());
  if (lines.length === 1 && lines[0]!.length < 100) {
    return [`${indent}/** ${lines[0]} */`];
  }

  // Multi-line JSDoc
  const result: string[] = [`${indent}/**`];
  for (const line of lines) {
    result.push(`${indent} * ${line}`);
  }
  result.push(`${indent} */`);
  return result;
}

function emitMethodSignature(method: GodotMethodXml): string[] {
  const lines: string[] = [];

  // JSDoc
  lines.push(...emitJsDoc(method.description));

  // Once we see an optional param, all subsequent must be optional too
  let seenOptional = false;
  const params: string[] = method.parameters.map((p) => {
    const tsType = godotTypeToTs(p.type);
    if (p.defaultValue !== undefined) seenOptional = true;
    const optional = seenOptional ? '?' : '';
    return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
  });
  if (method.isVararg) {
    params.push('...args: any[]');
  }

  const returnType = godotTypeToTs(method.returnType);
  const staticPrefix = method.isStatic ? 'static ' : '';
  const methodName = needsQuoting(method.name)
    ? `'${method.name}'`
    : method.name;
  lines.push(
    `  ${staticPrefix}${methodName}(${params.join(', ')}): ${returnType};`,
  );
  return lines;
}

// ─── Operator Overloads ─────────────────────────────────────────

/** Maps GDScript operator names to unique symbol names */
const OPERATOR_SYMBOL_MAP: Record<string, string> = {
  '+': '__add',
  '-': '__sub',
  '*': '__mul',
  '/': '__div',
  '==': '__eq',
  '!=': '__ne',
  '>': '__gt',
  '>=': '__gte',
  '<': '__lt',
  '<=': '__lte',
  'unary+': '__plus',
  'unary-': '__minus',
};

/**
 * Generates operator overload declarations as symbol-keyed union properties.
 * Binary ops: [__add]: { right: T1, ret: R1 } | { right: T2, ret: R2 };
 * Unary ops:  [__minus]: { ret: R };
 *
 * This union-of-entries pattern enables extracting the set of valid right-hand
 * types and per-overload return type inference via distributive conditional types.
 */
function emitOperatorOverloads(operators: GodotOperatorXml[]): string[] {
  const lines: string[] = [];

  // Group operators by symbol name
  const grouped = new Map<string, GodotOperatorXml[]>();
  for (const op of operators) {
    const symbolName = OPERATOR_SYMBOL_MAP[op.operator];
    if (!symbolName) continue;
    if (!grouped.has(symbolName)) grouped.set(symbolName, []);
    grouped.get(symbolName)!.push(op);
  }

  if (grouped.size === 0) return lines;

  lines.push('');
  lines.push('  // Operator overloads');

  for (const [symbolName, ops] of grouped) {
    const isUnary = ops[0]!.operator.startsWith('unary');

    if (isUnary) {
      const returnType = godotTypeToTs(ops[0]!.returnType);
      lines.push(`  [${symbolName}]: { ret: ${returnType} };`);
    } else {
      const entries = ops.map((op) => {
        const rightType = godotTypeToTs(op.rightType ?? 'Variant');
        const returnType = godotTypeToTs(op.returnType);
        return `{ right: ${rightType}; ret: ${returnType} }`;
      });
      lines.push(`  [${symbolName}]: ${entries.join(' | ')};`);
    }
  }

  return lines;
}

/**
 * Generates a TypeScript declaration for a single Godot class.
 */
/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
const SKIP_CLASSES = new Set(['int', 'float', 'bool', 'Nil']);

/**
 * Fundamental value types that are constructed as function calls in GDScript (not `new`).
 * These are emitted as interface + constructor function instead of `declare class`.
 */
const VALUE_TYPES = new Set([
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
]);

/**
 * GDScript classes emitted as TS interfaces (replacing standard TS built-in types).
 * Maps GD class name → TS interface name. These are generated from Godot docs
 * instead of being hardcoded in globals.d.ts.
 */
const INTERFACE_CLASSES = new Map<string, string>([
  ['Dictionary', 'Object'],
  ['Array', 'Array'],
  ['String', 'String'],
  ['Callable', 'Function'],
]);

/** Names that conflict with TS/JS built-in globals and need prefixing */
const CLASS_NAME_CONFLICTS = new Map<string, string>([
  ['Object', 'GodotObject'],
  ['Signal', 'GodotSignal'],
  ['Error', 'GodotError'],
  ['Array', 'GodotArray'],
  ['String', 'GodotString'],
  ['JSON', 'GodotJSON'],
  ['WeakRef', 'GodotWeakRef'],
]);

function sanitizeClassName(name: string): string {
  return CLASS_NAME_CONFLICTS.get(name) ?? name;
}

/**
 * Generates a TS interface from a GDScript class, used for classes that map
 * to TS built-in interfaces (Object, Array, String, Function).
 */
function generateInterfaceDeclaration(
  cls: GodotClassXml,
  tsName: string,
): string {
  const lines: string[] = [];

  // Class-level JSDoc
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  lines.push(`declare interface ${tsName} {`);

  // Properties (skip static-like things)
  const ifMethodNames = new Set(cls.methods.map((m) => m.name));
  for (const prop of cls.properties) {
    lines.push(...emitJsDoc(prop.description));
    const tsType = godotTypeToTs(prop.type);
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType};`);
  }

  // Property setter/getter methods
  for (const prop of cls.properties) {
    const tsType = godotTypeToTs(prop.type);
    if (prop.setter && !ifMethodNames.has(prop.setter)) {
      lines.push(`  ${prop.setter}(value: ${tsType}): void;`);
    }
    if (prop.getter && !ifMethodNames.has(prop.getter)) {
      lines.push(`  ${prop.getter}(): ${tsType};`);
    }
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Methods (skip static and virtual)
  for (const method of cls.methods) {
    if (method.isStatic) continue;
    lines.push(...emitJsDoc(method.description));
    let seenOptional = false;
    const params: string[] = method.parameters.map((p) => {
      const tsType = godotTypeToTs(p.type);
      if (p.defaultValue !== undefined) seenOptional = true;
      const optional = seenOptional ? '?' : '';
      const paramName = TS_RESERVED.has(p.name) ? `${p.name}_` : p.name;
      return `${paramName}${optional}: ${tsType}`;
    });
    if (method.isVararg) {
      params.push('...args: any[]');
    }
    const returnType = godotTypeToTs(method.returnType);
    const methodName = needsQuoting(method.name)
      ? `'${method.name}'`
      : method.name;
    lines.push(`  ${methodName}(${params.join(', ')}): ${returnType};`);
  }

  // For String interface, add index signature
  if (cls.name === 'String') {
    lines.push('');
    lines.push('  [index: number]: string;');
  }

  // Operator overloads
  if (cls.operators.length > 0) {
    lines.push(...emitOperatorOverloads(cls.operators));
  }

  lines.push('}');
  return lines.join('\n');
}

function generateClassDeclaration(
  cls: GodotClassXml,
  dictOnlyOverrides?: Set<string>,
  /** All explicit method names from ancestor classes (to avoid setter/getter conflicts) */
  inheritedMethodNames?: Set<string>,
): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);
  const extendsName = cls.inherits ? sanitizeClassName(cls.inherits) : '';
  const extendsClause = extendsName ? ` extends ${extendsName}` : '';

  // Class-level JSDoc
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  lines.push(`declare class ${className}${extendsClause} {`);

  // Properties
  const methodNames = new Set(cls.methods.map((m) => m.name));
  // Collect all property names (own) to detect property/method conflicts in children
  const propNames = new Set(cls.properties.map((p) => p.name));
  for (const prop of cls.properties) {
    lines.push(...emitJsDoc(prop.description));
    const tsType = godotTypeToTs(prop.type);
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType};`);
  }

  // Property setter/getter methods (implicit methods from Godot properties).
  // Skip if the name conflicts with an explicit method in this class or ancestors,
  // or with a property name (TS doesn't allow property + method with same name).
  for (const prop of cls.properties) {
    const tsType = godotTypeToTs(prop.type);
    if (
      prop.setter &&
      !methodNames.has(prop.setter) &&
      !propNames.has(prop.setter) &&
      !inheritedMethodNames?.has(prop.setter)
    ) {
      lines.push(`  ${prop.setter}(value: ${tsType}): void;`);
    }
    if (
      prop.getter &&
      !methodNames.has(prop.getter) &&
      !propNames.has(prop.getter) &&
      !inheritedMethodNames?.has(prop.getter)
    ) {
      lines.push(`  ${prop.getter}(): ${tsType};`);
    }
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Methods
  for (const method of cls.methods) {
    lines.push(...emitMethodSignature(method));
  }

  // Signals
  if (cls.signals.length > 0) {
    lines.push('');
    for (const sig of cls.signals) {
      lines.push(...emitJsDoc(sig.description));
      const paramTypes = sig.parameters.map((p) => godotTypeToTs(p.type));
      const sigName = needsQuoting(sig.name) ? `'${sig.name}'` : sig.name;
      lines.push(`  ${sigName}: Signal<[${paramTypes.join(', ')}]>;`);
    }
  }

  // Enums as nested const enums
  if (cls.enums.length > 0) {
    lines.push('');
    for (const e of cls.enums) {
      // Emit as static readonly constants grouped by comment
      lines.push(`  // enum ${e.name}`);
      for (const v of e.values) {
        // Find description from constants
        const constInfo = cls.constants.find((c) => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description));
        lines.push(`  static readonly ${v.name}: int;`);
      }
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter((c) => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(...emitJsDoc(c.description));
      lines.push(`  static readonly ${c.name}: int;`);
    }
  }

  // Operator overloads
  if (cls.operators.length > 0) {
    lines.push(...emitOperatorOverloads(cls.operators));
  }

  // For GodotObject: override Dictionary-only methods from Object interface with never
  if (
    cls.name === 'Object' &&
    dictOnlyOverrides &&
    dictOnlyOverrides.size > 0
  ) {
    lines.push('');
    lines.push(
      '  // Override Dictionary-only methods from Object interface with never.',
    );
    lines.push(
      '  // Only methods that no Godot subclass uses are overridden here.',
    );
    for (const name of [...dictOnlyOverrides].sort()) {
      lines.push(
        `  /** @deprecated GodotObject is not a Dictionary */ ${name}: never;`,
      );
    }
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generates a value type declaration as interface + constructor function.
 * Value types in GDScript are called as functions (Vector2(1, 2)), not with `new`.
 */
function generateValueTypeDeclaration(
  cls: GodotClassXml,
  dictMembers?: Set<string>,
): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);

  // Collect own member names to avoid overriding with never
  const ownMembers = new Set<string>();
  for (const prop of cls.properties) ownMembers.add(prop.name);
  for (const method of cls.methods) ownMembers.add(method.name);

  // Interface for instance members
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  lines.push(`declare interface ${className} {`);

  // Properties
  for (const prop of cls.properties) {
    lines.push(...emitJsDoc(prop.description));
    const tsType = godotTypeToTs(prop.type);
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType};`);
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Instance methods (non-static only)
  for (const method of cls.methods) {
    if (method.isStatic) continue;
    lines.push(...emitMethodSignature(method));
  }

  // Operator overloads
  if (cls.operators.length > 0) {
    lines.push(...emitOperatorOverloads(cls.operators));
  }

  // Anti-dict: override Dictionary members with never to prevent leaking through Object interface
  if (dictMembers && dictMembers.size > 0) {
    const toOverride = [...dictMembers]
      .filter((m) => !ownMembers.has(m))
      .sort();
    if (toOverride.length > 0) {
      lines.push('');
      lines.push(
        '  // Dictionary method overrides (prevent Object interface leaking)',
      );
      for (const m of toOverride) {
        lines.push(`  ${m}: never;`);
      }
    }
  }

  lines.push('}');
  lines.push('');

  // Constructor interface with static members
  lines.push(`declare interface ${className}Constructor {`);

  // Constructor overloads from XML
  for (const ctor of cls.constructors) {
    lines.push(...emitJsDoc(ctor.description));
    let seenOptional = false;
    const params = ctor.parameters.map((p) => {
      const tsType = godotTypeToTs(p.type);
      if (p.defaultValue !== undefined) seenOptional = true;
      const optional = seenOptional ? '?' : '';
      return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
    });
    lines.push(`  (${params.join(', ')}): ${className};`);
  }

  // If no constructors found in XML, add a default one
  if (cls.constructors.length === 0) {
    lines.push(`  (): ${className};`);
  }

  // Static methods (emit without 'static' prefix since this is an interface)
  for (const method of cls.methods) {
    if (!method.isStatic) continue;
    const sig = emitMethodSignature(method);
    lines.push(...sig.map((l) => l.replace('  static ', '  ')));
  }

  // Enums as static readonly
  if (cls.enums.length > 0) {
    lines.push('');
    for (const e of cls.enums) {
      lines.push(`  // enum ${e.name}`);
      for (const v of e.values) {
        const constInfo = cls.constants.find((c) => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description));
        lines.push(`  readonly ${v.name}: int;`);
      }
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter((c) => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(...emitJsDoc(c.description));
      lines.push(`  readonly ${c.name}: ${className};`);
    }
  }

  lines.push('}');
  lines.push(`declare const ${className}: ${className}Constructor;`);

  return lines.join('\n');
}

/**
 * Generates global scope declarations (top-level functions, constants, enums).
 */
/**
 * Generates a Number interface extension with operator overloads from int and float XML docs.
 * Since int/float are `type number`, their operators need to be on the Number interface.
 * We merge both int and float operators, deduplicating where they overlap.
 */
function generateNumberOperatorOverloads(
  classes: Map<string, GodotClassXml>,
): string | null {
  const intCls = classes.get('int');
  const floatCls = classes.get('float');
  if (!intCls && !floatCls) return null;

  // Merge all operators from both int and float, grouped by symbol
  const grouped = new Map<string, { entries: Set<string>; isUnary: boolean }>();

  for (const cls of [intCls, floatCls]) {
    if (!cls) continue;
    for (const op of cls.operators) {
      const symbolName = OPERATOR_SYMBOL_MAP[op.operator];
      if (!symbolName) continue;

      if (!grouped.has(symbolName)) {
        grouped.set(symbolName, {
          entries: new Set(),
          isUnary: op.operator.startsWith('unary'),
        });
      }
      const group = grouped.get(symbolName)!;

      const returnType = godotTypeToTs(op.returnType);
      if (group.isUnary) {
        group.entries.add(`{ ret: ${returnType} }`);
      } else {
        const rightType = godotTypeToTs(op.rightType ?? 'Variant');
        group.entries.add(`{ right: ${rightType}; ret: ${returnType} }`);
      }
    }
  }

  if (grouped.size === 0) return null;

  const lines: string[] = [];
  lines.push('// Operator overloads for int/float (number type)');
  lines.push('declare interface Number {');
  for (const [symbolName, group] of grouped) {
    lines.push(`  [${symbolName}]: ${[...group.entries].join(' | ')};`);
  }
  lines.push('}');
  return lines.join('\n');
}

function generateGlobalScopeDeclaration(cls: GodotClassXml): string {
  const lines: string[] = [];
  lines.push('// @GlobalScope — global functions and constants');
  lines.push('');

  // Global functions
  for (const method of cls.methods) {
    lines.push(...emitJsDoc(method.description, ''));
    let seenOptional = false;
    const params = method.parameters.map((p) => {
      const tsType = godotTypeToTs(p.type);
      if (p.defaultValue !== undefined) seenOptional = true;
      const optional = seenOptional ? '?' : '';
      return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
    });
    if (method.isVararg) {
      params.push('...args: any[]');
    }
    const returnType = godotTypeToTs(method.returnType);
    lines.push(
      `declare function ${sanitizeFunctionName(method.name)}(${params.join(', ')}): ${returnType};`,
    );
  }

  // Global enums
  if (cls.enums.length > 0) {
    lines.push('');
    for (const e of cls.enums) {
      let enumName = e.name.includes('.') ? e.name.replace(/\./g, '_') : e.name;
      // Avoid conflicts with TS builtins
      if (enumName === 'Error') enumName = 'GodotError';
      lines.push(`declare const enum ${enumName} {`);
      for (const v of e.values) {
        // Find description from constants
        const constInfo = cls.constants.find((c) => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description));
        lines.push(`  ${v.name} = ${v.value},`);
      }
      lines.push('}');
      lines.push('');
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter((c) => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(...emitJsDoc(c.description, ''));
      lines.push(`declare const ${c.name}: int;`);
    }
  }

  // Singleton instances are emitted in per-class .d.ts files
  // (as `declare interface` + `declare const`), not here.

  // GDScript built-in constants and functions (from @GDScript, not in @GlobalScope XML docs)
  lines.push('');
  lines.push('// @GDScript — built-in constants and functions');
  lines.push('/** Positive floating-point infinity. */');
  lines.push('declare const INF: float;');
  lines.push('/** "Not a Number" invalid float value. */');
  lines.push('declare const NAN: float;');
  lines.push(
    '/** Constant that represents how many times the diameter of a circle fits around its perimeter. Approximately 3.14159265358979. */',
  );
  lines.push('declare const PI: float;');
  lines.push(
    '/** The circle constant, the circumference of the unit circle in radians. Approximately 6.28318530717959. Equivalent to PI * 2. */',
  );
  lines.push('declare const TAU: float;');
  lines.push('');
  lines.push(
    '/** Returns the length of the given Variant. Arrays, strings, dictionaries, and packed arrays return their element count. */',
  );
  lines.push('declare function len(value: unknown): int;');
  lines.push(
    '/** Returns an array with the given range. range(n) is [0..n-1], range(a,b) is [a..b-1], range(a,b,step). */',
  );
  lines.push('declare function range(end: int): Array<int>;');
  lines.push('declare function range(begin: int, end: int): Array<int>;');
  lines.push(
    'declare function range(begin: int, end: int, step: int): Array<int>;',
  );
  lines.push(
    '/** Loads a resource from the given path. Returns the registered type from GodotResources if the path is known. */',
  );
  lines.push(
    'declare function load<P extends keyof GodotResources>(path: P): GodotResources[P];',
  );
  lines.push(
    'declare function load(path: string): Resource;',
  );
  lines.push(
    '/** Returns a resource from the filesystem that is loaded during script parsing. Returns the registered type from GodotResources if the path is known. */',
  );
  lines.push(
    'declare function preload<P extends keyof GodotResources>(path: P): GodotResources[P];',
  );
  lines.push(
    'declare function preload(path: string): Resource;',
  );
  lines.push(
    '/** Asserts that the condition is true. If the condition is false in debug builds, execution is halted. */',
  );
  lines.push(
    'declare function assert(condition: boolean, message?: string): void;',
  );

  return lines.join('\n');
}

/**
 * Computes Dictionary member names that no class in the Object hierarchy defines.
 * These are safe to override with `never` on GodotObject to block Dictionary API leaking
 * through the Object interface to all Godot classes.
 */
function computeDictOnlyOverrides(
  classes: Map<string, GodotClassXml>,
): Set<string> {
  const dictClass = classes.get('Dictionary');
  if (!dictClass) return new Set();

  // Collect all Dictionary member names (methods + properties)
  const dictMembers = new Set<string>();
  for (const m of dictClass.methods) dictMembers.add(m.name);
  for (const p of dictClass.properties) dictMembers.add(p.name);

  // Collect all member names used by any class that inherits from Object
  const objectSubclassMembers = new Set<string>();
  for (const [name, cls] of classes) {
    if (
      name === 'Object' ||
      name === 'Dictionary' ||
      name.startsWith('@') ||
      SKIP_CLASSES.has(name)
    )
      continue;
    if (!cls.inherits) continue; // no parent — not in Object hierarchy
    for (const m of cls.methods) objectSubclassMembers.add(m.name);
    for (const p of cls.properties) objectSubclassMembers.add(p.name);
  }

  // Also exclude names that Object itself defines (they'd conflict)
  const objectClass = classes.get('Object');
  if (objectClass) {
    for (const m of objectClass.methods) objectSubclassMembers.add(m.name);
    for (const p of objectClass.properties) objectSubclassMembers.add(p.name);
  }

  // Dictionary-only = in Dictionary but not in any Object-hierarchy class
  const result = new Set<string>();
  for (const name of dictMembers) {
    if (!objectSubclassMembers.has(name)) result.add(name);
  }
  return result;
}

/**
 * Collects all Dictionary interface member names (methods + properties).
 * Used to override them with `never` on value type interfaces, preventing
 * Dictionary methods from leaking through the TS Object interface.
 */
function collectAllDictMembers(
  classes: Map<string, GodotClassXml>,
): Set<string> {
  const dictClass = classes.get('Dictionary');
  if (!dictClass) return new Set();
  const members = new Set<string>();
  for (const m of dictClass.methods) members.add(m.name);
  for (const p of dictClass.properties) members.add(p.name);
  return members;
}

// ─── Override System ───────────────────────────────────────────

/**
 * Parsed override: a class/interface declaration with individual members.
 */
interface ParsedOverride {
  /** The full declaration header, e.g. "interface Array<T>" or "declare class Node extends GodotObject" */
  header: string | undefined;
  /** Member name → full source text (one or more lines). Order preserved. */
  members: Map<string, string>;
  /** Extra lines (index signatures, comments) that don't have a named member */
  extras: string[];
}

/**
 * Loads all override .d.ts files from a directory and parses them.
 * Returns a map: TS declaration name → ParsedOverride.
 */
function loadOverrides(overrideDir: string): Map<string, ParsedOverride> {
  const result = new Map<string, ParsedOverride>();
  if (!existsSync(overrideDir)) return result;

  const files = readdirSync(overrideDir)
    .filter((f) => f.endsWith('.d.ts'))
    .sort();

  for (const file of files) {
    const filePath = join(overrideDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true,
    );

    for (const stmt of sourceFile.statements) {
      var name: string | undefined;
      var header: string | undefined;
      var membersNode:
        | ts.NodeArray<ts.TypeElement | ts.ClassElement>
        | undefined;

      if (ts.isInterfaceDeclaration(stmt)) {
        name = stmt.name.text;
        // Get header from source: everything from "interface" to "{"
        const headerEnd = stmt.members.pos;
        header = content
          .substring(stmt.pos, headerEnd)
          .trim()
          .replace(/\{$/, '')
          .trim();
      } else if (ts.isClassDeclaration(stmt) && stmt.name) {
        name = stmt.name.text;
        // Extract class header only when it has generics (e.g. PackedScene<T extends Node = Node>)
        // Otherwise keep the generated header to preserve extends clause
        if (stmt.typeParameters && stmt.typeParameters.length > 0) {
          const headerEnd = stmt.members.pos;
          header = content
            .substring(stmt.pos, headerEnd)
            .trim()
            .replace(/\{$/, '')
            .trim();
        } else {
          header = undefined;
        }
      }

      if (!name || !(stmt as any).members) continue;
      membersNode = (stmt as any).members as ts.NodeArray<any>;

      const members = new Map<string, string>();
      const extras: string[] = [];

      for (const member of membersNode) {
        var memberName: string | undefined;

        if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
          memberName = member.name?.getText(sourceFile);
        } else if (
          ts.isPropertyDeclaration(member) ||
          ts.isPropertySignature(member)
        ) {
          memberName = member.name?.getText(sourceFile);
        } else if (ts.isIndexSignatureDeclaration(member)) {
          // Index signatures like [index: number]: T
          extras.push('  ' + member.getText(sourceFile));
          continue;
        }

        if (memberName) {
          // Get text without excessive leading trivia, but keep JSDoc
          const start = member.getStart(sourceFile);
          const end = member.getEnd();
          var text = content.substring(start, end).trimEnd();

          // Check for JSDoc above (between fullStart and start)
          const trivia = content.substring(member.getFullStart(), start);
          const jsdocMatch = trivia.match(/(\/\*\*[\s\S]*?\*\/)\s*$/);
          if (jsdocMatch) {
            text = jsdocMatch[1] + '\n' + text;
          }

          // Ensure proper indentation
          const lines = text.split('\n').map((l) => {
            const trimmed = l.trimStart();
            if (trimmed === '') return '';
            return '  ' + trimmed;
          });
          text = lines.join('\n');

          // Support multiple overloads by appending
          if (members.has(memberName)) {
            members.set(memberName, members.get(memberName)! + '\n' + text);
          } else {
            members.set(memberName, text);
          }
        }
      }

      result.set(name, { header, members, extras });
    }
  }

  return result;
}

/**
 * Loads global function overrides from `_globals.d.ts` in the override directory.
 * Returns a map: function name → full declaration text (JSDoc + all overloads).
 */
function loadGlobalOverrides(overrideDir: string): Map<string, string> {
  const result = new Map<string, string>();
  const filePath = join(overrideDir, '_globals.d.ts');
  if (!existsSync(filePath)) return result;

  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let pendingJsDoc: string[] = [];
  let currentName: string | null = null;
  let currentLines: string[] = [];

  function flush() {
    if (currentName && currentLines.length > 0) {
      result.set(currentName, currentLines.join('\n'));
    }
    currentName = null;
    currentLines = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Accumulate JSDoc lines
    if (trimmed.startsWith('/**') || trimmed.startsWith(' *') || trimmed.startsWith('*')) {
      if (!currentName) {
        // JSDoc before first function
        pendingJsDoc.push(line);
      } else if (trimmed.startsWith('/**')) {
        // New JSDoc block — might be a different function
        pendingJsDoc = [line];
      } else {
        pendingJsDoc.push(line);
      }
      continue;
    }

    // Match declare function lines
    const fnMatch = trimmed.match(/^declare\s+function\s+(\w+)/);
    if (fnMatch) {
      const fnName = fnMatch[1]!;
      if (fnName !== currentName) {
        flush();
        currentName = fnName;
        currentLines = [...pendingJsDoc, line];
      } else {
        // Additional overload for same function
        currentLines.push(...pendingJsDoc, line);
      }
      pendingJsDoc = [];
      continue;
    }

    // Skip empty lines and comments between functions
    if (trimmed === '' || trimmed.startsWith('//')) {
      if (currentName) {
        // Could be between overloads — keep pending
      }
      pendingJsDoc = [];
      continue;
    }
  }
  flush();

  return result;
}

/**
 * Applies global function overrides to generated `_globals.d.ts` content.
 * For each overridden function, replaces the generated declaration (and its JSDoc)
 * with the override text.
 */
function applyGlobalOverrides(
  content: string,
  globalOverrides: Map<string, string>,
): string {
  if (globalOverrides.size === 0) return content;

  const lines = content.split('\n');
  const result: string[] = [];
  const replaced = new Set<string>();
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;
    const fnMatch = line.match(/^declare\s+function\s+(\w+)/);

    if (fnMatch && globalOverrides.has(fnMatch[1]!)) {
      const fnName = fnMatch[1]!;

      // Remove preceding JSDoc comment (scan backwards in result)
      while (
        result.length > 0 &&
        (result[result.length - 1]!.trimStart().startsWith('*') ||
          result[result.length - 1]!.trimStart().startsWith('/**') ||
          result[result.length - 1]!.trimStart().startsWith('*/'))
      ) {
        result.pop();
      }

      // Insert override text on first occurrence
      if (!replaced.has(fnName)) {
        result.push(globalOverrides.get(fnName)!);
        replaced.add(fnName);
      }

      // Skip this line (and any subsequent overloads of the same function)
      i++;
      continue;
    }

    result.push(line);
    i++;
  }

  return result.join('\n');
}

/**
 * Applies override to a generated declaration string.
 * Replaces the header and merges members: overridden members replace generated ones,
 * new members from the override are appended.
 */
function applyOverride(generated: string, override: ParsedOverride): string {
  const lines = generated.split('\n');

  // Replace header line (first line that has interface/class + {)
  if (override.header) {
    const headerIdx = lines.findIndex((l) =>
      /^(declare\s+)?(interface|class)\s/.test(l.trim()),
    );
    if (headerIdx >= 0) {
      // The override header may be multi-line (with JSDoc). Split it into individual lines.
      const headerLines = (override.header + ' {').split('\n');
      // Ensure the interface/class line has `declare` prefix
      for (let hi = 0; hi < headerLines.length; hi++) {
        if (
          /^\s*(interface|class)\s/.test(headerLines[hi]) &&
          !/^\s*declare\s/.test(headerLines[hi])
        ) {
          headerLines[hi] = 'declare ' + headerLines[hi];
        }
      }
      // If the override header includes JSDoc, remove existing JSDoc before the header line
      const overrideHasJsDoc = headerLines.some((l) => l.trim().startsWith('/**'));
      let removeFrom = headerIdx;
      if (overrideHasJsDoc) {
        // Walk backwards to find the start of the existing JSDoc block
        let j = headerIdx - 1;
        while (j >= 0 && (lines[j].trim().startsWith('*') || lines[j].trim().startsWith('/**') || lines[j].trim() === '*/')) {
          j--;
        }
        removeFrom = j + 1;
      }
      lines.splice(removeFrom, headerIdx - removeFrom + 1, ...headerLines);
    }
  }

  // Parse generated members: find each "  memberName(" or "  memberName:" line
  const result: string[] = [];
  const usedOverrides = new Set<string>();
  var i = 0;

  // Copy lines up to and including the opening brace
  while (i < lines.length) {
    result.push(lines[i]);
    if (lines[i].trimEnd().endsWith('{')) {
      i++;
      break;
    }
    i++;
  }

  // Process body lines — buffer JSDoc lines so they can be dropped when a member is overridden
  var pendingJsDoc: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimStart();

    // Closing brace — stop
    if (trimmed === '}') break;

    // Buffer JSDoc/comment lines
    if (
      trimmed.startsWith('/**') ||
      trimmed.startsWith('* ') ||
      trimmed.startsWith('*/') ||
      trimmed === '*'
    ) {
      pendingJsDoc.push(line);
      i++;
      continue;
    }

    // Try to extract member name from this line
    const memberMatch = trimmed.match(
      /^(?:static\s+)?(?:readonly\s+)?(?:'([^']+)'|(\w+))\s*[:(]/,
    );
    if (memberMatch) {
      const memberName = memberMatch[1] ?? memberMatch[2];
      if (override.members.has(memberName)) {
        // Drop buffered JSDoc (replaced by override's own JSDoc)
        pendingJsDoc = [];
        result.push(override.members.get(memberName)!);
        usedOverrides.add(memberName);
        i++;
        continue;
      }
    }

    // Flush buffered JSDoc (not overridden) then push current line
    result.push(...pendingJsDoc);
    pendingJsDoc = [];
    result.push(line);
    i++;
  }
  // Flush any trailing JSDoc
  result.push(...pendingJsDoc);

  // Add override-only members (new additions) before closing brace
  for (const [name, text] of override.members) {
    if (!usedOverrides.has(name)) {
      result.push(text);
    }
  }

  // Add extras (index signatures etc.)
  for (const extra of override.extras) {
    result.push(extra);
  }

  // Closing brace
  result.push('}');

  return result.join('\n');
}

/**
 * Generates TypeScript typings from Godot XML class documentation.
 * Also generates the class registry JSON if registryOutputPath is specified.
 * Returns the GodotClassRegistry if generated.
 */
export function generateGodotDocsTypings(
  options: GodotDocsTypingsOptions,
): GodotClassRegistry | null {
  const classes = parseAllClassXmls(options.classDocsDir);

  // Populate known class names for type resolution
  knownClasses = new Set([...classes.keys()].filter((n) => !n.startsWith('@')));

  // Load override .d.ts files
  const overrides = options.overrideDir
    ? loadOverrides(options.overrideDir)
    : new Map();
  const globalOverrides = options.overrideDir
    ? loadGlobalOverrides(options.overrideDir)
    : new Map();

  // Report unmatched overrides (class name not found in Godot docs)
  // Special overrides that don't map to a Godot class directly
  const SPECIAL_OVERRIDES = new Set(['CallableFunction']);
  for (const overrideName of overrides.keys()) {
    if (SPECIAL_OVERRIDES.has(overrideName)) continue;
    // Map interface names back to GD class names for validation
    var found = false;
    for (const [gdName, tsName] of INTERFACE_CLASSES) {
      if (tsName === overrideName) {
        found = true;
        break;
      }
    }
    if (!found) {
      const sanitizedName =
        [...CLASS_NAME_CONFLICTS.entries()].find(
          ([_, v]) => v === overrideName,
        )?.[0] ?? overrideName;
      found = classes.has(sanitizedName) || classes.has(overrideName);
    }
    if (!found) {
      console.warn(
        `Warning: override for "${overrideName}" does not match any Godot class`,
      );
    }
  }

  // Compute Dictionary-only member names that no Object subclass defines.
  const dictOnlyOverrides = computeDictOnlyOverrides(classes);

  // Collect all Dictionary members for value type anti-dict overrides
  const allDictMembers = collectAllDictMembers(classes);

  // Prepare classes/ subdirectory — clean and recreate
  const classesDir = join(options.outputDir, 'classes');
  if (existsSync(classesDir)) {
    rmSync(classesDir, { recursive: true, force: true });
  }
  mkdirSync(classesDir, { recursive: true });

  const header =
    '// AUTO-GENERATED from Godot class documentation.\n// Manual overrides applied from typings/overrides/*.d.ts\n';

  // Track generated files for the index
  const generatedFiles: string[] = [];

  // Build set of singleton class names (from @GlobalScope properties)
  const globalScope = classes.get('@GlobalScope');
  const singletonClassNames = new Set<string>(
    globalScope?.properties.map((p) => p.type) ?? [],
  );

  // Find singletons that are extended by other classes —
  // these need `declare var` with `new()` instead of `declare const`
  const extendedSingletons = new Set<string>();
  for (const [, cls] of classes) {
    if (cls.inherits && singletonClassNames.has(cls.inherits)) {
      extendedSingletons.add(cls.inherits);
    }
  }

  // Sort class names for deterministic output
  const sortedNames = [...classes.keys()].sort();

  for (const name of sortedNames) {
    const cls = classes.get(name)!;

    if (name === '@GlobalScope') {
      let globalsContent = generateGlobalScopeDeclaration(cls);
      globalsContent = applyGlobalOverrides(globalsContent, globalOverrides);
      const content = header + '\n' + globalsContent + '\n';
      const fileName = '_globals.d.ts';
      writeFileSync(join(classesDir, fileName), content);
      generatedFiles.push(fileName);
      continue;
    }

    // Skip other @-prefixed special docs
    if (name.startsWith('@')) continue;

    // Skip primitive types handled by gd-helpers.d.ts or TS builtins
    if (SKIP_CLASSES.has(name)) continue;

    // Some GD classes are emitted as TS interfaces (replacing built-in types)
    const interfaceName = INTERFACE_CLASSES.get(name);
    if (interfaceName) {
      const fileLines: string[] = [];

      var declaration = generateInterfaceDeclaration(cls, interfaceName);

      // Apply overrides if available (by TS interface name)
      const override = overrides.get(interfaceName);
      if (override) {
        declaration = applyOverride(declaration, override);
      }

      fileLines.push(declaration);
      fileLines.push('');

      // Emit renamed alias so existing references still work
      const renamedName = CLASS_NAME_CONFLICTS.get(name);
      if (renamedName) {
        const hasGenerics = override?.header.includes('<') ?? false;
        fileLines.push(
          `type ${renamedName} = ${interfaceName}${hasGenerics ? '<unknown>' : ''};`,
        );
      }
      // Dictionary → Object interface, but keep Dictionary as a type alias + constructor
      if (name === 'Dictionary') {
        fileLines.push(`type Dictionary = Object;`);
        fileLines.push('declare var Dictionary: { new(): Dictionary };');
        fileLines.push('declare var Object: typeof GodotObject;');
      }
      // Callable → Function, keep Callable alias + constructor + CallableFunction/NewableFunction
      if (name === 'Callable') {
        fileLines.push(`type Callable = Function;`);
        fileLines.push(
          'declare var Callable: { new(): Callable; create(object: GodotObject, method: string): Callable };',
        );
        const cfOverride = overrides.get('CallableFunction');
        if (cfOverride) {
          const cfHeader = cfOverride.header!.replace(
            /^(interface|class)\s/m,
            'declare $1 ',
          );
          const cfLines = [cfHeader + ' {'];
          for (const [, text] of cfOverride.members) {
            cfLines.push(text);
          }
          for (const extra of cfOverride.extras) {
            cfLines.push(extra);
          }
          cfLines.push('}');
          fileLines.push(cfLines.join('\n'));
        } else {
          fileLines.push(
            'declare interface CallableFunction extends Function {}',
          );
        }
        fileLines.push('declare interface NewableFunction extends Function {}');
      }
      // Array → keep ArrayConstructor + GodotArray constructor
      if (name === 'Array') {
        const hasGenerics = override?.header.includes('<') ?? false;
        const typeParam = hasGenerics ? '<T>' : '';
        const unknownParam = hasGenerics ? '<unknown>' : '';
        fileLines.push('declare interface ArrayConstructor {');
        fileLines.push(`  new ${typeParam}(): Array${typeParam};`);
        fileLines.push(
          `  new ${typeParam}(...items: ${hasGenerics ? 'T' : 'unknown'}[]): Array${typeParam};`,
        );
        fileLines.push('}');
        fileLines.push('declare var Array: ArrayConstructor;');
        fileLines.push(
          `declare var GodotArray: { new(): Array${unknownParam} };`,
        );
      }

      const fileName = `${name}.d.ts`;
      writeFileSync(
        join(classesDir, fileName),
        header + '\n' + fileLines.join('\n') + '\n',
      );
      generatedFiles.push(fileName);
      continue;
    }

    // Value types: emitted as interface + constructor function (no `new`)
    if (VALUE_TYPES.has(name)) {
      var valueDecl = generateValueTypeDeclaration(cls, allDictMembers);

      // Apply overrides if available
      const className = sanitizeClassName(name);
      const classOverride = overrides.get(className);
      if (classOverride) {
        valueDecl = applyOverride(valueDecl, classOverride);
      }

      const fileName = `${name}.d.ts`;
      writeFileSync(
        join(classesDir, fileName),
        header + '\n' + valueDecl + '\n',
      );
      generatedFiles.push(fileName);
      continue;
    }

    // Collect explicit method names and property names from ancestor classes.
    // Generated setter/getter methods must not clash with inherited explicit methods
    // (which may have different signatures) or inherited properties (TS can't have
    // a method override a property).
    const inheritedMemberNames = new Set<string>();
    let ancestor = cls.inherits;
    while (ancestor) {
      const ancestorCls = classes.get(ancestor);
      if (!ancestorCls) break;
      for (const m of ancestorCls.methods) inheritedMemberNames.add(m.name);
      for (const p of ancestorCls.properties) {
        inheritedMemberNames.add(p.name);
        if (p.setter) inheritedMemberNames.add(p.setter);
        if (p.getter) inheritedMemberNames.add(p.getter);
      }
      ancestor = ancestorCls.inherits;
    }
    // Dict-only overrides on Object add `name: never` properties — any descendant
    // must not generate a setter/getter method with the same name.
    if (name !== 'Object' && dictOnlyOverrides) {
      for (const n of dictOnlyOverrides) inheritedMemberNames.add(n);
    }

    var classDecl = generateClassDeclaration(
      cls,
      name === 'Object' ? dictOnlyOverrides : undefined,
      inheritedMemberNames,
    );

    // Apply overrides if available (by TS class name)
    const className = sanitizeClassName(name);
    const classOverride = overrides.get(className);
    if (classOverride) {
      classDecl = applyOverride(classDecl, classOverride);
    }

    // Singleton classes: convert to interface + global instance value.
    // Interfaces can't have `static` members, so strip the `static` keyword.
    if (singletonClassNames.has(name)) {
      // Replace `declare class` with `declare interface`
      classDecl = classDecl.replace(
        /^declare class /m,
        'declare interface ',
      );
      // Strip `static` keyword from members (interfaces don't support it;
      // all members become instance members accessible via the global const/var).
      classDecl = classDecl.replace(/^(\s+)static readonly /gm, '$1readonly ');
      classDecl = classDecl.replace(/^(\s+)static /gm, '$1');

      if (extendedSingletons.has(name)) {
        // Singletons extended by other classes: use `declare var` with `new()`
        // so TS treats the name as a constructor type for `extends` clauses.
        classDecl += `\ndeclare var ${className}: ${className} & {\n  new(): ${className};\n  readonly prototype: ${className};\n};\n`;
      } else {
        // Singletons NOT extended: use `declare const` (can't construct).
        classDecl += `\ndeclare const ${className}: ${className};\n`;
      }
    }

    const fileName = `${name}.d.ts`;
    writeFileSync(join(classesDir, fileName), header + '\n' + classDecl + '\n');
    generatedFiles.push(fileName);
  }

  // Generate Number interface extension with int/float operator overloads
  const numberOps = generateNumberOperatorOverloads(classes);
  if (numberOps) {
    const fileName = '_number-ops.d.ts';
    writeFileSync(join(classesDir, fileName), header + '\n' + numberOps + '\n');
    generatedFiles.push(fileName);
  }

  // Generate classes/index.d.ts that references all class files
  const indexLines = generatedFiles
    .sort()
    .map((f) => `/// <reference path="${f}" />`);
  writeFileSync(join(classesDir, 'index.d.ts'), indexLines.join('\n') + '\n');

  // Generate registry JSON if requested
  let registry: GodotClassRegistry | null = null;
  if (options.registryOutputPath) {
    const data = generateRegistryData(classes);
    data.version = options.version ?? '';
    writeFileSync(options.registryOutputPath, JSON.stringify(data, null, 2));
    registry = new GodotClassRegistry(data);
  }

  return registry;
}
