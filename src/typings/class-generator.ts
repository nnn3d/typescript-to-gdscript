import { gdDocToPlain, type GodotClassXml, type GodotMethodXml, type GodotOperatorXml } from './godot-registry.ts';
import {
  godotTypeToTs,
  isNullableGodotType,
  widenParamType,
  getNonNullableMembers,
  sanitizeClassName,
} from './type-mapping.ts';

// ─── Name sanitization helpers ───────────────────────────────────

/** TS reserved words and strict-mode identifiers that cannot be used as-is */
export const TS_RESERVED = new Set([
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

export function sanitizeParamName(name: string): string {
  if (TS_RESERVED.has(name)) return `${name}_`;
  return name;
}

/** Check if a property name needs quoting (contains non-identifier chars or starts with digit) */
export function needsQuoting(name: string): boolean {
  return /[^a-zA-Z0-9_$]/.test(name) || /^\d/.test(name);
}

export function sanitizeFunctionName(name: string): string {
  if (TS_RESERVED.has(name)) return `${name}_`;
  return name;
}

// Re-export sanitizeClassName for convenience (defined in type-mapping.ts)
export { sanitizeClassName } from './type-mapping.ts';

// ─── JSDoc generation ────────────────────────────────────────────

/**
 * Formats a description string as JSDoc comment lines.
 * Returns array of lines like ["  /** Description here *​/"]
 * or multi-line JSDoc for longer descriptions.
 */
export function emitJsDoc(
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

// ─── Method signature generation ─────────────────────────────────

export function emitMethodSignature(
  method: GodotMethodXml,
  nonNullMembers?: Set<string>,
): string[] {
  const lines: string[] = [];

  // JSDoc
  lines.push(...emitJsDoc(method.description));

  // Once we see an optional param, all subsequent must be optional too
  let seenOptional = false;
  const params: string[] = method.parameters.map((p) => {
    const tsType = widenParamType(p.type);
    if (p.defaultValue !== undefined) seenOptional = true;
    const optional = seenOptional ? '?' : '';
    return `${sanitizeParamName(p.name)}${optional}: ${tsType}`;
  });
  if (method.isVararg) {
    params.push('...args: any[]');
  }

  const returnType = godotTypeToTs(method.returnType);
  const nullable = isNullableGodotType(method.returnType) && !nonNullMembers?.has(method.name)
    ? ' | null' : '';
  const staticPrefix = method.isStatic ? 'static ' : '';
  const methodName = needsQuoting(method.name)
    ? `'${method.name}'`
    : method.name;
  lines.push(
    `  ${staticPrefix}${methodName}(${params.join(', ')}): ${returnType}${nullable};`,
  );
  return lines;
}

// ─── Operator Overloads ──────────────────────────────────────────

/** Maps GDScript operator names to unique symbol names */
export const OPERATOR_SYMBOL_MAP: Record<string, string> = {
  '+': '__ops_add',
  '-': '__ops_sub',
  '*': '__ops_mul',
  '/': '__ops_div',
  '==': '__ops_eq',
  '!=': '__ops_ne',
  '>': '__ops_gt',
  '>=': '__ops_gte',
  '<': '__ops_lt',
  '<=': '__ops_lte',
  '%': '__ops_rem',
  'unary+': '__ops_plus',
  'unary-': '__ops_minus',
};

/**
 * Generates operator overload declarations as symbol-keyed union properties.
 * Binary ops: [__add]: { right: T1, ret: R1 } | { right: T2, ret: R2 };
 * Unary ops:  [__minus]: { ret: R };
 *
 * This union-of-entries pattern enables extracting the set of valid right-hand
 * types and per-overload return type inference via distributive conditional types.
 */
export function emitOperatorOverloads(operators: GodotOperatorXml[]): string[] {
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

// ─── Class declaration generators ────────────────────────────────

/**
 * Generates a TypeScript declaration for a single Godot class.
 */
export function generateClassDeclaration(
  cls: GodotClassXml,
  dictOnlyOverrides?: Set<string>,
  /** All explicit method names from ancestor classes (to avoid setter/getter conflicts) */
  inheritedMethodNames?: Set<string>,
): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);
  const extendsName = cls.inherits ? sanitizeClassName(cls.inherits) : '';

  // Class-level JSDoc
  lines.push(...emitJsDoc(cls.briefDescription, ''));
  const extendsClause = extendsName ? ` extends ${extendsName}` : '';
  lines.push(`declare class ${className}${extendsClause} {`);

  // Non-nullable member overrides for this class
  const nonNullMembers = getNonNullableMembers().get(cls.name) ?? new Set<string>();

  // Properties
  const methodNames = new Set(cls.methods.map((m) => m.name));
  // Collect all property names (own) to detect property/method conflicts in children
  const propNames = new Set(cls.properties.map((p) => p.name));
  for (const prop of cls.properties) {
    lines.push(...emitJsDoc(prop.description));
    const tsType = godotTypeToTs(prop.type);
    const nullable = isNullableGodotType(prop.type) && !nonNullMembers.has(prop.name) ? ' | null' : '';
    const propName = needsQuoting(prop.name) ? `'${prop.name}'` : prop.name;
    lines.push(`  ${propName}: ${tsType}${nullable};`);
  }

  // Property setter/getter methods (implicit methods from Godot properties).
  // Skip if the name conflicts with an explicit method in this class or ancestors,
  // or with a property name (TS doesn't allow property + method with same name).
  for (const prop of cls.properties) {
    const tsType = godotTypeToTs(prop.type);
    const setterType = widenParamType(prop.type);
    const nullable = isNullableGodotType(prop.type) && !nonNullMembers.has(prop.name) ? ' | null' : '';
    if (
      prop.setter &&
      !methodNames.has(prop.setter) &&
      !propNames.has(prop.setter) &&
      !inheritedMethodNames?.has(prop.setter)
    ) {
      lines.push(`  ${prop.setter}(value: ${setterType}${nullable}): void;`);
    }
    if (
      prop.getter &&
      !methodNames.has(prop.getter) &&
      !propNames.has(prop.getter) &&
      !inheritedMethodNames?.has(prop.getter)
    ) {
      lines.push(`  ${prop.getter}(): ${tsType}${nullable};`);
    }
  }

  if (cls.properties.length > 0 && cls.methods.length > 0) {
    lines.push('');
  }

  // Methods
  for (const method of cls.methods) {
    lines.push(...emitMethodSignature(method, nonNullMembers));
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
export function generateValueTypeDeclaration(
  cls: GodotClassXml,
  dictMembers?: Set<string>,
): string {
  const lines: string[] = [];
  const className = sanitizeClassName(cls.name);

  // Collect own member names to avoid overriding with never
  const ownMembers = new Set<string>();
  for (const prop of cls.properties) ownMembers.add(prop.name);
  for (const method of cls.methods) ownMembers.add(method.name);

  // Collect variant convert types from single-parameter "from" constructors.
  // These represent types that can be converted to this type via `gd.as(value, ClassName)`.
  // For Array types, infer the item type from `append(value: T)` method signature (used for [Symbol.iterator]).
  let itemType: string | null = null;
  for (const method of cls.methods) {
    if (method.name === 'append' && method.parameters.length === 1) {
      itemType = godotTypeToTs(method.parameters[0]!.type);
      break;
    }
  }
  const variantConvertTypes: string[] = [];
  for (const ctor of cls.constructors) {
    if (ctor.parameters.length === 1) {
      const param = ctor.parameters[0]!;
      if (param.name === 'from' || param.name.startsWith('from')) {
        // Keep Array<unknown> as-is — element type is exposed via [Symbol.iterator]
        variantConvertTypes.push(godotTypeToTs(param.type));
      }
    }
  }

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

  // Variant convert types: enables `gd.as(value, ClassName)` type narrowing
  if (variantConvertTypes.length > 0) {
    lines.push('');
    lines.push(`  [__variant_converts]: ${variantConvertTypes.join(' | ')};`);
  }

  // Iterator support for array-like types (when item type is known)
  const isArrayLike = variantConvertTypes.some((t) => t.startsWith('Array<'));
  if (isArrayLike && itemType) {
    lines.push('');
    lines.push(`  [Symbol.iterator](): IterableIterator<${itemType}>;`);
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

  lines.push(generateConstructorInterface(cls, className));

  return lines.join('\n');
}

/**
 * Generate a constructor interface with call signatures, static methods,
 * enums, and constants from a Godot class XML. Used for value types (Vector2,
 * Color, etc.) and interface classes (Dictionary, Callable).
 *
 * @param cls - The parsed Godot class XML data
 * @param className - The TS class/interface name (may differ from cls.name)
 * @param returnType - The return type for constructor calls (defaults to className)
 */
export function generateConstructorInterface(
  cls: GodotClassXml,
  className: string,
  returnType?: string,
): string {
  const ret = returnType ?? className;
  const lines: string[] = [];

  lines.push(`declare interface ${className}Constructor {`);
  lines.push(`  readonly prototype: ${ret};`);

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
    lines.push(`  (${params.join(', ')}): ${ret};`);
  }

  // If no constructors found in XML, add a default one
  if (cls.constructors.length === 0) {
    lines.push(`  (): ${ret};`);
  }

  // Static methods
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
      lines.push(`  readonly ${c.name}: ${ret};`);
    }
  }

  lines.push('}');
  lines.push(`declare const ${className}: ${className}Constructor;`);

  return lines.join('\n');
}

/**
 * Generates a TS interface from a GDScript class, used for classes that map
 * to TS built-in interfaces (Object, Array, String, Function).
 */
export function generateInterfaceDeclaration(
  cls: GodotClassXml,
  tsName: string,
): string {
  const lines: string[] = [];

  // Collect variant convert types from single-parameter "from" constructors
  const variantConvertTypes: string[] = [];
  for (const ctor of cls.constructors) {
    if (ctor.parameters.length === 1) {
      const param = ctor.parameters[0]!;
      if (param.name === 'from' || param.name.startsWith('from')) {
        variantConvertTypes.push(godotTypeToTs(param.type));
      }
    }
  }

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

  // Variant convert types (for Array, Dictionary, etc.)
  if (variantConvertTypes.length > 0) {
    lines.push('');
    lines.push(`  [__variant_converts]: ${variantConvertTypes.join(' | ')};`);
  }

  lines.push('}');
  return lines.join('\n');
}
