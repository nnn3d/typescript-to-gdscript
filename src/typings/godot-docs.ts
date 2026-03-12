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
function godotTypeToTs(type: string): string {
  switch (type) {
    case 'int': return 'int';
    case 'float': return 'float';
    case 'bool': return 'boolean';
    case 'String': return 'string';
    case 'void': return 'void';
    case 'Nil': return 'void';
    case 'Variant': return 'any';
    case 'Array': return 'Array<any>';
    case 'Dictionary': return 'Dictionary';
    case 'NodePath': return 'string';
    case 'StringName': return 'string';
    case 'Object': return 'GodotObject';
    case '': return 'void';
    default:
      // Typed arrays like Array[Node]
      if (type.startsWith('Array[')) {
        const inner = type.slice(6, -1);
        return `Array<${godotTypeToTs(inner)}>`;
      }
      // Enum references like Node.ProcessMode
      if (type.includes('.')) {
        return type.replace('.', '_');
      }
      return type;
  }
}

function sanitizeParamName(name: string): string {
  const reserved = new Set(['class', 'default', 'function', 'in', 'var', 'new', 'delete', 'typeof', 'void', 'null', 'true', 'false', 'this', 'super', 'import', 'export', 'return', 'switch', 'case', 'break', 'continue', 'if', 'else', 'while', 'for', 'do', 'try', 'catch', 'finally', 'throw', 'const', 'let', 'enum', 'interface', 'type', 'extends', 'implements', 'private', 'protected', 'public', 'static', 'abstract', 'async', 'await', 'yield', 'of', 'from', 'as', 'is']);
  if (reserved.has(name)) return `${name}_`;
  return name;
}

function emitMethodSignature(method: GodotMethodXml): string {
  const params = method.parameters.map(p => {
    const tsType = godotTypeToTs(p.type);
    const optional = p.defaultValue !== undefined ? '?' : '';
    return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
  }).join(', ');

  const returnType = godotTypeToTs(method.returnType);
  const staticPrefix = method.isStatic ? 'static ' : '';
  return `  ${staticPrefix}${method.name}(${params}): ${returnType};`;
}

/**
 * Generates a TypeScript declaration for a single Godot class.
 */
function generateClassDeclaration(cls: GodotClassXml): string {
  const lines: string[] = [];
  const extendsClause = cls.inherits ? ` extends ${cls.inherits}` : '';

  lines.push(`declare class ${cls.name}${extendsClause} {`);

  // Properties
  for (const prop of cls.properties) {
    const tsType = godotTypeToTs(prop.type);
    lines.push(`  ${prop.name}: ${tsType};`);
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
      lines.push(`  ${sig.name}: Signal<[${paramTypes.join(', ')}]>;`);
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
    const params = method.parameters.map(p => {
      const tsType = godotTypeToTs(p.type);
      const optional = p.defaultValue !== undefined ? '?' : '';
      return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
    });
    if (method.isVararg) {
      params.push('...args: any[]');
    }
    const returnType = godotTypeToTs(method.returnType);
    lines.push(`declare function ${method.name}(${params.join(', ')}): ${returnType};`);
  }

  // Global enums
  if (cls.enums.length > 0) {
    lines.push('');
    for (const e of cls.enums) {
      lines.push(`declare const enum ${e.name} {`);
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
