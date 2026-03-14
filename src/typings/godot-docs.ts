import { writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import {
  parseAllClassXmls,
  generateRegistryData,
  GodotClassRegistry,
  type GodotClassXml,
  type GodotMethodXml,
  type GodotParamXml,
} from './godot-registry.js';

export interface GodotDocsTypingsOptions {
  /** Path to Godot docs XML class reference directory */
  classDocsDir: string;
  /** Output directory for generated .d.ts files */
  outputDir: string;
  /** Directory containing .patch files to apply on top of generated types */
  patchDir?: string;
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

function godotTypeToTs(type: string): string {
  // Strip C++ pointer/reference markers (handle "type*", "type **", "const type*")
  const cleaned = type.replace(/[\s*]*\*+\s*$/, '').replace(/^const\s+/, '').trim();

  switch (cleaned) {
    case 'int': return 'int';
    case 'float': return 'float';
    case 'bool': return 'boolean';
    case 'String': return 'string';
    case 'void': return 'void';
    case 'Nil': return 'void';
    case 'Variant': return 'unknown';
    case 'Array': return 'Array<unknown>';
    case 'Dictionary': return 'Dictionary';
    case 'NodePath': return 'string';
    case 'StringName': return 'string';
    case 'Object': return 'GodotObject';
    case 'Signal': return 'GodotSignal';
    case 'Error': return 'GodotError';
    case '': return 'void';
    // C++ internal types that leak from Godot docs
    case 'uint8_t': return 'int';
    case 'int32_t': return 'int';
    case 'int64_t': return 'int';
    case 'uint32_t': return 'int';
    case 'uint64_t': return 'int';
    case 'AudioFrame': return 'unknown';
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
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
  'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
  'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
  'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield',
  // Strict mode / TS contextual
  'as', 'async', 'await', 'from', 'get', 'is', 'let', 'of', 'set',
  'static', 'type',
  // TS declaration keywords
  'abstract', 'implements', 'interface', 'private', 'protected', 'public',
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

function emitMethodSignature(method: GodotMethodXml): string {
  // Once we see an optional param, all subsequent must be optional too
  let seenOptional = false;
  const params = method.parameters.map(p => {
    const tsType = godotTypeToTs(p.type);
    if (p.defaultValue !== undefined) seenOptional = true;
    const optional = seenOptional ? '?' : '';
    return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
  }).join(', ');

  const returnType = godotTypeToTs(method.returnType);
  const staticPrefix = method.isStatic ? 'static ' : '';
  const methodName = needsQuoting(method.name) ? `'${method.name}'` : method.name;
  return `  ${staticPrefix}${methodName}(${params}): ${returnType};`;
}

/**
 * Generates a TypeScript declaration for a single Godot class.
 */
/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
const SKIP_CLASSES = new Set([
  'int', 'float', 'bool', 'Nil',
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

function generateClassDeclaration(cls: GodotClassXml): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);
  const extendsName = cls.inherits ? sanitizeClassName(cls.inherits) : '';
  const extendsClause = extendsName ? ` extends ${extendsName}` : '';

  lines.push(`declare class ${className}${extendsClause} {`);

  // Properties
  for (const prop of cls.properties) {
    const tsType = godotTypeToTs(prop.type);
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType};`);
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Methods
  for (const method of cls.methods) {
    lines.push(emitMethodSignature(method));
  }

  // Signals
  if (cls.signals.length > 0) {
    lines.push('');
    for (const sig of cls.signals) {
      const paramTypes = sig.parameters.map(p => godotTypeToTs(p.type));
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
        lines.push(`  static readonly ${v.name}: int;`);
      }
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter(c => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(`  static readonly ${c.name}: int;`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generates global scope declarations (top-level functions, constants, enums).
 */
function generateGlobalScopeDeclaration(cls: GodotClassXml): string {
  const lines: string[] = [];
  lines.push('// @GlobalScope — global functions and constants');
  lines.push('');

  // Global functions
  for (const method of cls.methods) {
    let seenOptional = false;
    const params = method.parameters.map(p => {
      const tsType = godotTypeToTs(p.type);
      if (p.defaultValue !== undefined) seenOptional = true;
      const optional = seenOptional ? '?' : '';
      return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
    });
    if (method.isVararg) {
      params.push('...args: any[]');
    }
    const returnType = godotTypeToTs(method.returnType);
    lines.push(`declare function ${sanitizeFunctionName(method.name)}(${params.join(', ')}): ${returnType};`);
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
        lines.push(`  ${v.name} = ${v.value},`);
      }
      lines.push('}');
      lines.push('');
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter(c => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(`declare const ${c.name}: int;`);
    }
  }

  return lines.join('\n');
}

/**
 * Generates TypeScript typings from Godot XML class documentation.
 * Also generates the class registry JSON if registryOutputPath is specified.
 * Returns the GodotClassRegistry if generated.
 */
export function generateGodotDocsTypings(options: GodotDocsTypingsOptions): GodotClassRegistry | null {
  const classes = parseAllClassXmls(options.classDocsDir);

  // Populate known class names for type resolution
  knownClasses = new Set(
    [...classes.keys()].filter(n => !n.startsWith('@'))
  );

  const allDeclarations: string[] = [];
  allDeclarations.push('// AUTO-GENERATED from Godot class documentation.');
  allDeclarations.push('// Manual improvements can be applied via .patch files.');
  allDeclarations.push('');

  // Sort class names for deterministic output
  const sortedNames = [...classes.keys()].sort();

  for (const name of sortedNames) {
    const cls = classes.get(name)!;

    if (name === '@GlobalScope') {
      allDeclarations.push(generateGlobalScopeDeclaration(cls));
      allDeclarations.push('');
      continue;
    }

    // Skip other @-prefixed special docs
    if (name.startsWith('@')) continue;

    // Skip primitive types handled by gd-helpers.d.ts or TS builtins
    if (SKIP_CLASSES.has(name)) continue;

    allDeclarations.push(generateClassDeclaration(cls));
    allDeclarations.push('');
  }

  const outputPath = join(options.outputDir, 'godot.d.ts');
  const output = allDeclarations.join('\n');
  writeFileSync(outputPath, output);

  // Apply patches if patch directory exists
  if (options.patchDir && existsSync(options.patchDir)) {
    const patches = readdirSync(options.patchDir)
      .filter(f => f.endsWith('.patch'))
      .sort();

    for (const patchFile of patches) {
      const patchPath = join(options.patchDir, patchFile);
      try {
        execSync(`patch -p0 "${outputPath}" < "${patchPath}"`, {
          cwd: options.outputDir,
          stdio: 'pipe',
        });
        console.log(`Applied patch: ${patchFile}`);
      } catch (e) {
        console.error(`Failed to apply patch: ${patchFile}`);
      }
    }
  }

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
