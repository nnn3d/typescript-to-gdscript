import { writeFileSync, readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import ts from 'typescript';
import {
  parseAllClassXmls,
  generateRegistryData,
  GodotClassRegistry,
  gdDocToPlain,
  type GodotClassXml,
  type GodotMethodXml,
  type GodotParamXml,
} from './godot-registry.js';

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

/**
 * Formats a description string as JSDoc comment lines.
 * Returns array of lines like ["  /** Description here *​/"]
 * or multi-line JSDoc for longer descriptions.
 */
function emitJsDoc(description: string | undefined, indent: string = '  '): string[] {
  if (!description) return [];
  var plain = gdDocToPlain(description);
  if (!plain) return [];

  // Escape */ inside JSDoc to prevent premature closure
  plain = plain.replace(/\*\//g, '*\\/');

  // Use brief (first sentence or first line) for short descriptions
  const lines = plain.split('\n').filter(l => l.trim());
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
  const params: string[] = method.parameters.map(p => {
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
  const methodName = needsQuoting(method.name) ? `'${method.name}'` : method.name;
  lines.push(`  ${staticPrefix}${methodName}(${params.join(', ')}): ${returnType};`);
  return lines;
}

/**
 * Generates a TypeScript declaration for a single Godot class.
 */
/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
const SKIP_CLASSES = new Set([
  'int', 'float', 'bool', 'Nil',
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
function generateInterfaceDeclaration(cls: GodotClassXml, tsName: string): string {
  const lines: string[] = [];

  // Class-level JSDoc
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  lines.push(`interface ${tsName} {`);

  // Properties (skip static-like things)
  for (const prop of cls.properties) {
    lines.push(...emitJsDoc(prop.description));
    const tsType = godotTypeToTs(prop.type);
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType};`);
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Methods (skip static and virtual)
  for (const method of cls.methods) {
    if (method.isStatic) continue;
    lines.push(...emitJsDoc(method.description));
    let seenOptional = false;
    const params: string[] = method.parameters.map(p => {
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
    const methodName = needsQuoting(method.name) ? `'${method.name}'` : method.name;
    lines.push(`  ${methodName}(${params.join(', ')}): ${returnType};`);
  }

  // For String interface, add index signature
  if (cls.name === 'String') {
    lines.push('');
    lines.push('  [index: number]: string;');
  }

  lines.push('}');
  return lines.join('\n');
}

function generateClassDeclaration(cls: GodotClassXml, dictOnlyOverrides?: Set<string>): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);
  const extendsName = cls.inherits ? sanitizeClassName(cls.inherits) : '';
  const extendsClause = extendsName ? ` extends ${extendsName}` : '';

  // Class-level JSDoc
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  lines.push(`declare class ${className}${extendsClause} {`);

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

  // Methods
  for (const method of cls.methods) {
    lines.push(...emitMethodSignature(method));
  }

  // Signals
  if (cls.signals.length > 0) {
    lines.push('');
    for (const sig of cls.signals) {
      lines.push(...emitJsDoc(sig.description));
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
        // Find description from constants
        const constInfo = cls.constants.find(c => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description));
        lines.push(`  static readonly ${v.name}: int;`);
      }
    }
  }

  // Non-enum constants
  const nonEnumConstants = cls.constants.filter(c => !c.enumName);
  if (nonEnumConstants.length > 0) {
    lines.push('');
    for (const c of nonEnumConstants) {
      lines.push(...emitJsDoc(c.description));
      lines.push(`  static readonly ${c.name}: int;`);
    }
  }

  // For GodotObject: override Dictionary-only methods from Object interface with never
  if (cls.name === 'Object' && dictOnlyOverrides && dictOnlyOverrides.size > 0) {
    lines.push('');
    lines.push('  // Override Dictionary-only methods from Object interface with never.');
    lines.push('  // Only methods that no Godot subclass uses are overridden here.');
    for (const name of [...dictOnlyOverrides].sort()) {
      lines.push(`  /** @deprecated GodotObject is not a Dictionary */ ${name}: never;`);
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
    lines.push(...emitJsDoc(method.description, ''));
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
        // Find description from constants
        const constInfo = cls.constants.find(c => c.name === v.name);
        lines.push(...emitJsDoc(constInfo?.description));
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
      lines.push(...emitJsDoc(c.description, ''));
      lines.push(`declare const ${c.name}: int;`);
    }
  }

  return lines.join('\n');
}

/**
 * Computes Dictionary member names that no class in the Object hierarchy defines.
 * These are safe to override with `never` on GodotObject to block Dictionary API leaking
 * through the Object interface to all Godot classes.
 */
function computeDictOnlyOverrides(classes: Map<string, GodotClassXml>): Set<string> {
  const dictClass = classes.get('Dictionary');
  if (!dictClass) return new Set();

  // Collect all Dictionary member names (methods + properties)
  const dictMembers = new Set<string>();
  for (const m of dictClass.methods) dictMembers.add(m.name);
  for (const p of dictClass.properties) dictMembers.add(p.name);

  // Collect all member names used by any class that inherits from Object
  const objectSubclassMembers = new Set<string>();
  for (const [name, cls] of classes) {
    if (name === 'Object' || name === 'Dictionary' || name.startsWith('@') || SKIP_CLASSES.has(name)) continue;
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

  const files = readdirSync(overrideDir).filter(f => f.endsWith('.d.ts')).sort();

  for (const file of files) {
    const filePath = join(overrideDir, file);
    const content = readFileSync(filePath, 'utf-8');
    const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

    for (const stmt of sourceFile.statements) {
      var name: string | undefined;
      var header: string | undefined;
      var membersNode: ts.NodeArray<ts.TypeElement | ts.ClassElement> | undefined;

      if (ts.isInterfaceDeclaration(stmt)) {
        name = stmt.name.text;
        // Get header from source: everything from "interface" to "{"
        const headerEnd = stmt.members.pos;
        header = content.substring(stmt.pos, headerEnd).trim().replace(/\{$/, '').trim();
      } else if (ts.isClassDeclaration(stmt) && stmt.name) {
        name = stmt.name.text;
        // For class overrides, don't replace header (preserve extends clause etc.)
        // Only interface overrides need header replacement (for adding generics to built-in types)
        header = undefined;
      }

      if (!name || !(stmt as any).members) continue;
      membersNode = (stmt as any).members as ts.NodeArray<any>;

      const members = new Map<string, string>();
      const extras: string[] = [];

      for (const member of membersNode) {
        var memberName: string | undefined;

        if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
          memberName = member.name?.getText(sourceFile);
        } else if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
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
          const lines = text.split('\n').map(l => {
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
 * Applies override to a generated declaration string.
 * Replaces the header and merges members: overridden members replace generated ones,
 * new members from the override are appended.
 */
function applyOverride(generated: string, override: ParsedOverride): string {
  const lines = generated.split('\n');

  // Replace header line (first line that has interface/class + {)
  if (override.header) {
    const headerIdx = lines.findIndex(l => /^(interface|declare class)\s/.test(l.trim()));
    if (headerIdx >= 0) {
      // The override header may be multi-line (with JSDoc). Split it into individual lines.
      const headerLines = (override.header + ' {').split('\n');
      lines.splice(headerIdx, 1, ...headerLines);
    }
  }

  // Parse generated members: find each "  memberName(" or "  memberName:" line
  const result: string[] = [];
  const usedOverrides = new Set<string>();
  var i = 0;

  // Copy lines up to and including the opening brace
  while (i < lines.length) {
    result.push(lines[i]);
    if (lines[i].trimEnd().endsWith('{')) { i++; break; }
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
    if (trimmed.startsWith('/**') || trimmed.startsWith('* ') || trimmed.startsWith('*/') || trimmed === '*') {
      pendingJsDoc.push(line);
      i++;
      continue;
    }

    // Try to extract member name from this line
    const memberMatch = trimmed.match(/^(?:static\s+)?(?:readonly\s+)?(?:'([^']+)'|(\w+))\s*[:(]/);
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
export function generateGodotDocsTypings(options: GodotDocsTypingsOptions): GodotClassRegistry | null {
  const classes = parseAllClassXmls(options.classDocsDir);

  // Populate known class names for type resolution
  knownClasses = new Set(
    [...classes.keys()].filter(n => !n.startsWith('@'))
  );

  // Load override .d.ts files
  const overrides = options.overrideDir ? loadOverrides(options.overrideDir) : new Map();

  // Report unmatched overrides (class name not found in Godot docs)
  // Special overrides that don't map to a Godot class directly
  const SPECIAL_OVERRIDES = new Set(['CallableFunction']);
  for (const overrideName of overrides.keys()) {
    if (SPECIAL_OVERRIDES.has(overrideName)) continue;
    // Map interface names back to GD class names for validation
    var found = false;
    for (const [gdName, tsName] of INTERFACE_CLASSES) {
      if (tsName === overrideName) { found = true; break; }
    }
    if (!found) {
      const sanitizedName = [...CLASS_NAME_CONFLICTS.entries()].find(([_, v]) => v === overrideName)?.[0] ?? overrideName;
      found = classes.has(sanitizedName) || classes.has(overrideName);
    }
    if (!found) {
      console.warn(`Warning: override for "${overrideName}" does not match any Godot class`);
    }
  }

  // Compute Dictionary-only member names that no Object subclass defines.
  const dictOnlyOverrides = computeDictOnlyOverrides(classes);

  const allDeclarations: string[] = [];
  allDeclarations.push('// AUTO-GENERATED from Godot class documentation.');
  allDeclarations.push('// Manual overrides applied from typings/overrides/*.d.ts');
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

    // Some GD classes are emitted as TS interfaces (replacing built-in types)
    const interfaceName = INTERFACE_CLASSES.get(name);
    if (interfaceName) {
      var declaration = generateInterfaceDeclaration(cls, interfaceName);

      // Apply overrides if available (by TS interface name)
      const override = overrides.get(interfaceName);
      if (override) {
        declaration = applyOverride(declaration, override);
      }

      allDeclarations.push(declaration);
      allDeclarations.push('');

      // Emit renamed alias so existing references still work
      const renamedName = CLASS_NAME_CONFLICTS.get(name);
      if (renamedName) {
        // Check if override added generics (look for < in header)
        const hasGenerics = override?.header.includes('<') ?? false;
        allDeclarations.push(`type ${renamedName} = ${interfaceName}${hasGenerics ? '<unknown>' : ''};`);
      }
      // Dictionary → Object interface, but keep Dictionary as a type alias + constructor
      if (name === 'Dictionary') {
        allDeclarations.push(`type Dictionary = Object;`);
        allDeclarations.push('declare var Dictionary: { new(): Dictionary };');
        allDeclarations.push('declare var Object: typeof GodotObject;');
      }
      // Callable → Function, keep Callable alias + constructor + CallableFunction/NewableFunction
      if (name === 'Callable') {
        allDeclarations.push(`type Callable = Function;`);
        allDeclarations.push('declare var Callable: { new(): Callable; create(object: GodotObject, method: string): Callable };');
        // Use CallableFunction override if available, otherwise emit empty extension
        const cfOverride = overrides.get('CallableFunction');
        if (cfOverride) {
          // Emit the full override content
          const cfLines = [cfOverride.header + ' {'];
          for (const [, text] of cfOverride.members) {
            cfLines.push(text);
          }
          for (const extra of cfOverride.extras) {
            cfLines.push(extra);
          }
          cfLines.push('}');
          allDeclarations.push(cfLines.join('\n'));
        } else {
          allDeclarations.push('interface CallableFunction extends Function {}');
        }
        allDeclarations.push('interface NewableFunction extends Function {}');
      }
      // Array → keep ArrayConstructor + GodotArray constructor
      if (name === 'Array') {
        const hasGenerics = override?.header.includes('<') ?? false;
        const typeParam = hasGenerics ? '<T>' : '';
        const unknownParam = hasGenerics ? '<unknown>' : '';
        allDeclarations.push('interface ArrayConstructor {');
        allDeclarations.push(`  new ${typeParam}(): Array${typeParam};`);
        allDeclarations.push(`  new ${typeParam}(...items: ${hasGenerics ? 'T' : 'unknown'}[]): Array${typeParam};`);
        allDeclarations.push('}');
        allDeclarations.push('declare var Array: ArrayConstructor;');
        allDeclarations.push(`declare var GodotArray: { new(): Array${unknownParam} };`);
      }

      allDeclarations.push('');
      continue;
    }

    var classDecl = generateClassDeclaration(cls, name === 'Object' ? dictOnlyOverrides : undefined);

    // Apply overrides if available (by TS class name)
    const className = sanitizeClassName(name);
    const classOverride = overrides.get(className);
    if (classOverride) {
      classDecl = applyOverride(classDecl, classOverride);
    }

    allDeclarations.push(classDecl);
    allDeclarations.push('');
  }

  const outputPath = join(options.outputDir, 'godot.d.ts');
  const output = allDeclarations.join('\n');
  writeFileSync(outputPath, output);

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
