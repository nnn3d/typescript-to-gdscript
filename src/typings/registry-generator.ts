/**
 * Registry data generation from parsed Godot XML classes.
 * Produces GodotRegistryData from GodotClassXml maps.
 */

import { readFileSync } from 'fs';
import type { GodotRegistryData, GodotEnumInfo } from './godot-registry.ts';
import type { GodotClassXml } from './xml-parser.ts';

// Re-export XML types needed by godot-docs.ts and other consumers
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

// ─── GDScript-specific builtins not in @GlobalScope XML ──

export const GDSCRIPT_BUILTINS = [
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

/**
 * Derive constructor/value types from parsed XML classes.
 * A class is a value type if it has a copy constructor -- a constructor with
 * exactly one parameter whose type matches the class name (e.g. `Vector2(from: Vector2)`).
 */
export function deriveConstructorTypes(classes: Map<string, GodotClassXml>): string[] {
  const result: string[] = [];
  for (const [name, cls] of classes) {
    if (name.startsWith('@')) continue;
    const hasSelfCtor = cls.constructors.some(
      (c) => c.parameters.length === 1 && c.parameters[0]!.type === name,
    );
    if (hasSelfCtor) result.push(name);
  }
  return result;
}

/**
 * GDScript primitive types that use native JS operators (not gd.ops.* wrappers).
 * These have operator entries in the Godot XML docs but shouldn't be wrapped.
 */
export const NATIVE_OPERATOR_TYPES = new Set([
  'int', 'float', 'bool', 'String', 'StringName',
]);

/**
 * Derive classes that have operator overloads from parsed XML.
 * These types need `gd.ops.*` wrappers in TypeScript.
 * Excludes primitive types that use native JS operators.
 */
export function deriveOperatorTypes(classes: Map<string, GodotClassXml>): string[] {
  const result: string[] = [];
  for (const [name, cls] of classes) {
    if (name.startsWith('@')) continue;
    if (NATIVE_OPERATOR_TYPES.has(name)) continue;
    if (cls.operators.length > 0) result.push(name);
  }
  return result;
}

/**
 * Generates the class registry data from parsed XML classes.
 */
export function generateRegistryData(
  classes: Map<string, GodotClassXml>,
  gdscriptCls?: GodotClassXml | null,
): GodotRegistryData {
  const registry: GodotRegistryData = {
    version: '',
    classes: {},
    globalFunctions: [],
    globalConstants: [],
    globalEnums: [],
    constructors: deriveConstructorTypes(classes),
    singletons: [],
    bareAnnotations: [],
    operatorTypes: deriveOperatorTypes(classes),
  };

  // Compute bare annotations from @GDScript XML (annotations with no params and not vararg)
  if (gdscriptCls) {
    registry.bareAnnotations = gdscriptCls.annotations
      .filter((a) => a.parameters.length === 0 && !a.isVararg)
      .map((a) => a.name);
  }

  for (const [name, cls] of classes) {
    // @GlobalScope is special -- its members become globals
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

    // Compute variantConverts: types accepted by single-parameter "from" constructors
    const variantConverts: string[] = [];
    for (const ctor of cls.constructors) {
      if (ctor.parameters.length === 1) {
        const param = ctor.parameters[0]!;
        if (param.name === 'from' || param.name.startsWith('from')) {
          variantConverts.push(param.type);
        }
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
      ...(variantConverts.length > 0 ? { variantConverts } : {}),
    };
  }

  return registry;
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
