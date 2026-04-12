import type { GodotClassXml } from './godot-registry.ts';
import { godotTypeToTs, INTERFACE_CLASSES } from './type-mapping.ts';
import {
  emitJsDoc,
  sanitizeParamName,
  sanitizeFunctionName,
  sanitizeClassName,
  OPERATOR_SYMBOL_MAP,
} from './class-generator.ts';

// ─── Constants ───────────────────────────────────────────────────

/** Classes to skip entirely (handled by gd-helpers.d.ts or TS builtins) */
export const SKIP_CLASSES = new Set(['int', 'float', 'bool', 'Nil']);

// ─── Global scope generators ─────────────────────────────────────

/**
 * Generates global scope declarations (top-level functions, constants, enums).
 */
export function generateGlobalScopeDeclaration(cls: GodotClassXml): string {
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

  return lines.join('\n');
}

/**
 * Generates TypeScript declarations from @GDScript.xml:
 * constants, methods, and annotation decorators.
 */
export function generateGDScriptDeclaration(cls: GodotClassXml): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('// @GDScript — built-in constants, functions, and annotations');

  // Constants
  if (cls.constants.length > 0) {
    lines.push('');
    for (const c of cls.constants) {
      lines.push(...emitJsDoc(c.description, ''));
      const tsType = c.value === 'inf' || c.value === 'nan' ||
        c.value.includes('.') ? 'float' : 'int';
      lines.push(`declare const ${c.name}: ${tsType};`);
    }
  }

  // Methods
  if (cls.methods.length > 0) {
    lines.push('');
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
  }

  // Annotations → global decorator functions
  if (cls.annotations.length > 0) {
    lines.push('');
    lines.push('// GDScript annotations as TypeScript decorators');
    for (const ann of cls.annotations) {
      lines.push(...emitJsDoc(ann.description, ''));
      // Strip @ prefix and rename 'export' → 'exports' to avoid TS keyword conflict
      let tsName = ann.name;
      if (tsName === 'export') tsName = 'exports';

      if (ann.parameters.length === 0 && !ann.isVararg) {
        // No-param decorator: bare decorator function
        lines.push(
          `declare function ${tsName}(target: any, context: any): void;`,
        );
      } else {
        // Parameterized decorator: factory function returning decorator
        let seenOptional = false;
        const params = ann.parameters.map((p) => {
          const tsType = godotTypeToTs(p.type);
          if (p.defaultValue !== undefined) seenOptional = true;
          const optional = seenOptional ? '?' : '';
          return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
        });
        if (ann.isVararg) {
          params.push('...args: any[]');
        }
        lines.push(
          `declare function ${tsName}(${params.join(', ')}): (target: any, context: any) => void;`,
        );
      }
    }
  }

  return lines.join('\n');
}

// ─── Number operator overloads ───────────────────────────────────

/**
 * Generates a Number interface extension with operator overloads from int and float XML docs.
 * Since int/float are `type number`, their operators need to be on the Number interface.
 * We merge both int and float operators, deduplicating where they overlap.
 */
export function generateNumberOperatorOverloads(
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

// ─── Dictionary helpers ──────────────────────────────────────────

/**
 * Computes Dictionary member names that no class in the Object hierarchy defines.
 * These are safe to override with `never` on GodotObject to block Dictionary API leaking
 * through the Object interface to all Godot classes.
 */
export function computeDictOnlyOverrides(
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
export function collectAllDictMembers(
  classes: Map<string, GodotClassXml>,
): Set<string> {
  const dictClass = classes.get('Dictionary');
  if (!dictClass) return new Set();
  const members = new Set<string>();
  for (const m of dictClass.methods) members.add(m.name);
  for (const p of dictClass.properties) members.add(p.name);
  return members;
}
