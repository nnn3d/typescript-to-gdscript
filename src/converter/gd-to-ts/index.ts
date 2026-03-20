import { GDScriptParser } from '../../parser/gdscript/index.ts';
import type { GDNode, GDNodeBase } from '../../parser/gdscript/types.ts';
import { isGDNodeType } from '../../parser/gdscript/types.ts';
import type { TransformResult, TransformDiagnostic } from '../common/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

export interface GdToTsOptions {
  /** GDScript source code */
  source: string;
  /** File path (for diagnostics) */
  filePath: string;
  /** Whether this is an addon file */
  isAddon?: boolean;
  /** Godot class registry for inherited member resolution (required) */
  registry: GodotClassRegistry;
  /** Additional GD source files in the project (for resolving user-defined class inheritance) */
  projectSources?: Array<{ source: string; filePath: string }>;
}

/** Lightweight class info extracted from a GD source file */
export interface UserClassInfo {
  name: string;
  extends: string;
  members: Set<string>;
  /** Known types of member variables (for gd.ops detection across inheritance) */
  memberTypes: Map<string, string>;
}

/**
 * Extracts class info (class_name, extends, own members) from a GD source without full conversion.
 */
export function parseGdClassInfo(source: string): UserClassInfo | null {
  const parser = new GDScriptParser();
  const root = parser.parse(source);

  let className = '';
  let extendsClass = '';
  const members = new Set<string>();
  const memberTypes = new Map<string, string>();

  for (const child of root.namedChildren) {
    if (isGDNodeType(child, 'extends_statement')) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = isGDNodeType(typeNode, 'type')
          ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
          : typeNode.text;
      }
    } else if (isGDNodeType(child, 'class_name_statement')) {
      className = child.childForFieldName('name')?.text ?? '';
    } else if (
      isGDNodeType(child, 'function_definition') ||
      isGDNodeType(child, 'constructor_definition')
    ) {
      const name = child.childForFieldName('name')?.text ?? '_init';
      members.add(name === '_init' ? 'constructor' : name);
    } else if (
      isGDNodeType(child, 'variable_statement') ||
      isGDNodeType(child, 'export_variable_statement') ||
      isGDNodeType(child, 'onready_variable_statement')
    ) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        members.add(name);
        const typeNode = child.childForFieldName('type');
        const valueNode = child.childForFieldName('value');
        const inferredType = typeNode
          ? extractGdTypeName(typeNode)
          : valueNode
            ? inferExprTypeStatic(valueNode)
            : null;
        if (inferredType) memberTypes.set(name, inferredType);
      }
    } else if (isGDNodeType(child, 'signal_statement')) {
      const name = child.childForFieldName('name')?.text;
      if (name) members.add(name);
    } else if (isGDNodeType(child, 'const_statement')) {
      const name = child.childForFieldName('name')?.text;
      if (name) members.add(name);
    }
  }

  if (!className) return null;
  return { name: className, extends: extendsClass, members, memberTypes };
}

/**
 * Resolves all inherited members for a class, walking through user classes and Godot registry.
 */
function resolveAllInheritedMembers(
  extendsClass: string,
  userClasses: Map<string, UserClassInfo>,
  registry: GodotClassRegistry,
): Set<string> {
  const allMembers = new Set<string>();
  let current: string | null = extendsClass;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    visited.add(current);

    // Check Godot registry first
    if (registry.hasClass(current)) {
      const inherited = registry.getAllMembers(current);
      for (const name of inherited) allMembers.add(name);
      break; // Registry already walks the full Godot chain
    }

    // Check user classes
    const userClass = userClasses.get(current);
    if (userClass) {
      for (const name of userClass.members) allMembers.add(name);
      current = userClass.extends || null;
    } else {
      break;
    }
  }

  return allMembers;
}

/**
 * Walks user class inheritance chain and copies memberTypes into the target map.
 * Does not overwrite types already present (own types take priority).
 */
function resolveInheritedMemberTypes(
  extendsClass: string,
  userClasses: Map<string, UserClassInfo>,
  target: Map<string, string>,
): void {
  let current: string | null = extendsClass;
  const visited = new Set<string>();

  while (current && !visited.has(current)) {
    visited.add(current);
    const userClass = userClasses.get(current);
    if (!userClass) break;
    for (const [name, type] of userClass.memberTypes) {
      if (!target.has(name)) target.set(name, type);
    }
    current = userClass.extends || null;
  }
}

export function convertGdToTs(options: GdToTsOptions): TransformResult {
  // Build user class index from project sources
  const userClasses = new Map<string, UserClassInfo>();
  if (options.projectSources) {
    for (const ps of options.projectSources) {
      const info = parseGdClassInfo(ps.source);
      if (info) userClasses.set(info.name, info);
    }
  }
  // Also parse the current file so it's available for inner class extends resolution
  const selfInfo = parseGdClassInfo(options.source);
  if (selfInfo) userClasses.set(selfInfo.name, selfInfo);

  const parser = new GDScriptParser();
  const root = parser.parse(options.source);
  const ctx: GdToTsContext = {
    source: options.source,
    filePath: options.filePath,
    diagnostics: [],
    classMembers: new Set(),
    localVars: new Set(),
    localVarTypes: new Map(),
    classMemberTypes: new Map(),
    registry: options.registry,
    userClasses,
    className: '',
    staticMembers: new Set(),
  };

  const code = emitSourceFile(root, ctx);

  return {
    code,
    diagnostics: ctx.diagnostics,
  };
}

interface GdToTsContext {
  source: string;
  filePath: string;
  diagnostics: TransformDiagnostic[];
  /** Known class-level member names (for self -> this resolution) */
  classMembers: Set<string>;
  /** Local variables in current scope (params + local vars) — these shadow classMembers */
  localVars: Set<string>;
  /** Tracked types of local variables (for gd.ops detection) */
  localVarTypes: Map<string, string>;
  /** Tracked types of class member variables (for gd.ops detection) */
  classMemberTypes: Map<string, string>;
  /** Godot class registry for inherited member resolution */
  registry: GodotClassRegistry;
  /** User-defined class info from project sources */
  userClasses: Map<string, UserClassInfo>;
  /** Current method name (for super() → super.method() resolution) */
  currentMethodName?: string;
  /** The class name (or '__CLASS__' for anonymous) */
  className: string;
  /** Static member names (const + static var) — accessed via ClassName, not this */
  staticMembers: Set<string>;
}

/**
 * Check if a name is a global function/constructor/class (not a class member).
 * In GDScript, bare identifiers that are not local, not global, and not class names
 * must be class members (self properties/methods).
 */
function isGlobalName(name: string, ctx: GdToTsContext): boolean {
  return (
    ctx.registry.isGlobal(name) ||
    ctx.registry.hasClass(name) ||
    ctx.userClasses.has(name)
  );
}

// ─── Source File ─────────────────────────────────────────────

function emitSourceFile(root: GDNode, ctx: GdToTsContext): string {
  const lines: string[] = [];
  let className = '';
  let extendsClass = '';
  const topComments: string[] = [];
  const memberLines: string[] = [];

  // First pass: collect class name, extends, and member names
  for (const child of root.namedChildren) {
    if (isGDNodeType(child, 'extends_statement')) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = isGDNodeType(typeNode, 'type')
          ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
          : typeNode.text;
      }
    } else if (isGDNodeType(child, 'class_name_statement')) {
      className = child.childForFieldName('name')?.text ?? '';
    } else if (
      isGDNodeType(child, 'function_definition') ||
      isGDNodeType(child, 'constructor_definition')
    ) {
      const name = child.childForFieldName('name')?.text ?? '_init';
      ctx.classMembers.add(name === '_init' ? 'constructor' : name);
    } else if (
      isGDNodeType(child, 'variable_statement') ||
      isGDNodeType(child, 'export_variable_statement') ||
      isGDNodeType(child, 'onready_variable_statement')
    ) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        ctx.classMembers.add(name);
        const isStatic = child.childForFieldName('static') !== null;
        if (isStatic) ctx.staticMembers.add(name);
        const typeNode = child.childForFieldName('type');
        const valueNode = child.childForFieldName('value');
        const inferredType = typeNode
          ? extractGdTypeName(typeNode)
          : valueNode
            ? inferExprType(valueNode, ctx)
            : null;
        if (inferredType) ctx.classMemberTypes.set(name, inferredType);
      }
    } else if (isGDNodeType(child, 'signal_statement')) {
      const name = child.childForFieldName('name')?.text;
      if (name) ctx.classMembers.add(name);
    } else if (isGDNodeType(child, 'const_statement')) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        ctx.classMembers.add(name);
        ctx.staticMembers.add(name);
      }
    }
  }

  // Set class name in context for static member resolution
  ctx.className = className || '__CLASS__';

  // Add inherited members from registry and user classes
  if (extendsClass) {
    const inherited = resolveAllInheritedMembers(
      extendsClass,
      ctx.userClasses,
      ctx.registry,
    );
    for (const name of inherited) {
      ctx.classMembers.add(name);
    }
    // Also inherit member types from user classes
    resolveInheritedMemberTypes(
      extendsClass,
      ctx.userClasses,
      ctx.classMemberTypes,
    );
  }

  // Second pass: emit everything
  let lastWasFunction = false;
  let hasNonFunctionMembers = false;

  for (const child of root.namedChildren) {
    if (
      isGDNodeType(child, 'extends_statement') ||
      isGDNodeType(child, 'class_name_statement')
    ) {
      continue; // handled in class header
    }

    if (isGDNodeType(child, 'comment')) {
      // Comments before class body become top-level comments inside class
      memberLines.push(emitComment(child));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    const isFunction =
      isGDNodeType(child, 'function_definition') ||
      isGDNodeType(child, 'constructor_definition');

    if (isFunction) {
      // Add blank line before first function if there were property members
      if (hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
    }

    if (isGDNodeType(child, 'function_definition')) {
      memberLines.push(emitFunction(child, ctx));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (isGDNodeType(child, 'constructor_definition')) {
      memberLines.push(emitConstructor(child, ctx));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (
      isGDNodeType(child, 'variable_statement') ||
      isGDNodeType(child, 'export_variable_statement') ||
      isGDNodeType(child, 'onready_variable_statement')
    ) {
      memberLines.push(emitClassVariable(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (isGDNodeType(child, 'const_statement')) {
      memberLines.push(emitConstStatement(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (isGDNodeType(child, 'signal_statement')) {
      memberLines.push(emitSignal(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (isGDNodeType(child, 'enum_definition')) {
      memberLines.push(emitEnum(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (isGDNodeType(child, 'class_definition')) {
      // Add blank line before inner class if there were non-function members
      // (functions already add trailing blank lines)
      if (hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
      memberLines.push(emitInnerClass(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    ctx.diagnostics.push({
      message: `Unhandled top-level node: ${child.type}`,
      severity: 'warning',
      file: ctx.filePath,
      line: child.startPosition.row + 1,
      column: child.startPosition.column,
    });
  }

  // Remove trailing empty lines from members
  while (
    memberLines.length > 0 &&
    memberLines[memberLines.length - 1]!.trim() === ''
  ) {
    memberLines.pop();
  }

  const extendsClause = extendsClass ? ` extends ${extendsClass}` : '';
  const classHeader = `export default class ${className || '__CLASS__'}${extendsClause} {`;
  return [classHeader, ...memberLines, '}', ''].join('\n');
}

// ─── Inner Class ──────────────────────────────────────────────

function emitInnerClass(node: GDNode, ctx: GdToTsContext): string {
  const nameNode = node.childForFieldName('name');
  const className = nameNode?.text ?? 'InnerClass';

  // Find extends
  let extendsClass = '';
  const bodyNode = node.childForFieldName('body');

  for (const child of node.namedChildren) {
    if (isGDNodeType(child, 'extends_statement')) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = isGDNodeType(typeNode, 'type')
          ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
          : typeNode.text;
      }
    }
  }

  // Save outer context and create inner class context
  const savedMembers = ctx.classMembers;
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  const savedMemberTypes = ctx.classMemberTypes;
  ctx.classMembers = new Set();
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  ctx.classMemberTypes = new Map();

  // First pass: collect member names from inner class body
  if (bodyNode) {
    for (const child of bodyNode.namedChildren) {
      if (
        isGDNodeType(child, 'function_definition') ||
        isGDNodeType(child, 'constructor_definition')
      ) {
        const name = child.childForFieldName('name')?.text ?? '_init';
        ctx.classMembers.add(name === '_init' ? 'constructor' : name);
      } else if (
        isGDNodeType(child, 'variable_statement') ||
        isGDNodeType(child, 'export_variable_statement')
      ) {
        const name = child.childForFieldName('name')?.text;
        if (name) ctx.classMembers.add(name);
      } else if (isGDNodeType(child, 'signal_statement')) {
        const name = child.childForFieldName('name')?.text;
        if (name) ctx.classMembers.add(name);
      }
    }
  }

  // Add inherited members from registry and user classes for inner class
  if (extendsClass) {
    const inherited = resolveAllInheritedMembers(
      extendsClass,
      ctx.userClasses,
      ctx.registry,
    );
    for (const name of inherited) {
      ctx.classMembers.add(name);
    }
  }

  // Second pass: emit members
  const memberLines: string[] = [];
  if (bodyNode) {
    for (const child of bodyNode.namedChildren) {
      if (isGDNodeType(child, 'function_definition')) {
        memberLines.push(emitFunction(child, ctx));
        continue;
      }
      if (isGDNodeType(child, 'constructor_definition')) {
        memberLines.push(emitConstructor(child, ctx));
        continue;
      }
      if (
        isGDNodeType(child, 'variable_statement') ||
        isGDNodeType(child, 'export_variable_statement')
      ) {
        memberLines.push(emitClassVariable(child, ctx));
        continue;
      }
    }
  }

  // Restore outer context
  ctx.classMembers = savedMembers;
  ctx.localVars = savedLocals;
  ctx.localVarTypes = savedLocalTypes;
  ctx.classMemberTypes = savedMemberTypes;

  const extendsClause = extendsClass ? ` extends ${extendsClass}` : '';

  // Add extra 2-space indent to all output lines (members may contain multi-line strings)
  const indentedMembers = memberLines
    .join('\n')
    .split('\n')
    .map((line) => (line === '' ? '' : `  ${line}`))
    .join('\n')
    .replace(/\n+$/, '');

  return `  ${className} = class${extendsClause} {\n${indentedMembers}\n  }`;
}

// ─── Comments ─────────────────────────────────────────────────

function emitComment(node: GDNode): string {
  const text = node.text;
  if (text.startsWith('##')) {
    // Doc comment: ## ... -> /** ... */
    const content = text.slice(2).trim();
    return `  /** ${content} */`;
  }
  // Regular comment: # ... -> // ...
  const content = text.slice(1).trim();
  return `  // ${content}`;
}

// ─── Signals ──────────────────────────────────────────────────

function emitSignal(node: GDNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const paramsNode = node.childForFieldName('parameters');

  if (paramsNode && paramsNode.namedChildren.length > 0) {
    const types = emitSignalParamTypes(paramsNode);
    return `  ${name} = gd.signal<[${types}]>();`;
  }

  return `  ${name} = gd.signal();`;
}

function emitSignalParamTypes(paramsNode: GDNode): string {
  const types: string[] = [];
  for (const child of paramsNode.namedChildren) {
    if (isGDNodeType(child, 'typed_parameter')) {
      const typeNode = child.childForFieldName('type');
      const tsType = typeNode ? gdTypeToTs(typeNode.text) : 'any';
      types.push(tsType ?? 'any');
    } else if (isGDNodeType(child, 'identifier')) {
      types.push('any');
    }
  }
  return types.join(', ');
}

// ─── Enums ────────────────────────────────────────────────────

function emitEnum(node: GDNode, ctx: GdToTsContext): string {
  const nameNode = node.childForFieldName('name');
  const bodyNode = node.childForFieldName('body');
  if (!bodyNode) return '';

  const enumerators = bodyNode.namedChildren.filter((c) =>
    isGDNodeType(c, 'enumerator'),
  );

  if (nameNode) {
    // Named enum -> gd.enum(...)
    const values: string[] = [];
    for (const e of enumerators) {
      const eName = e.childForFieldName('left')?.text;
      const eValue = e.childForFieldName('right');
      if (eName) {
        if (eValue) {
          values.push(`['${eName}', ${eValue.text}]`);
        } else {
          values.push(`'${eName}'`);
        }
      }
    }
    return `  ${nameNode.text} = gd.enum(${values.join(', ')});`;
  }

  // Anonymous enum -> constants
  const lines: string[] = [];
  let counter = 0;
  for (const e of enumerators) {
    const eName = e.childForFieldName('left')?.text;
    const eValue = e.childForFieldName('right');
    const val = eValue ? parseInt(eValue.text) : counter;
    if (eName) {
      lines.push(`  ${eName}: int = ${val};`);
    }
    counter = val + 1;
  }
  return lines.join('\n');
}

// ─── Variables ────────────────────────────────────────────────

function emitClassVariable(node: GDNode, ctx: GdToTsContext): string {
  const annotations = getAnnotations(node);
  const isStatic = node.childForFieldName('static') !== null;
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  let decorators = '';
  for (const ann of annotations) {
    decorators += `  ${emitAnnotationAsDecorator(ann)}\n`;
  }

  const staticPrefix = isStatic ? 'static ' : '';
  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  return `${decorators}  ${staticPrefix}${name}${typeAnnotation}${init};`;
}

function emitConstStatement(node: GDNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  // GDScript const -> TS static readonly
  return `  static readonly ${name}${typeAnnotation}${init};`;
}

function emitLocalVariable(
  node: GDNode,
  ctx: GdToTsContext,
  indent: string,
): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  // Register as local variable before emitting value (to avoid this. prefix in self-reference)
  ctx.localVars.add(name);

  // Track variable type from explicit annotation or inferred from initializer
  const inferredType = typeNode
    ? extractGdTypeName(typeNode)
    : valueNode
      ? inferExprType(valueNode, ctx)
      : null;
  if (inferredType) ctx.localVarTypes.set(name, inferredType);

  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  return `${indent}let ${name}${typeAnnotation}${init};`;
}

// ─── Type Annotations ─────────────────────────────────────────

function emitTypeAnnotation(typeNode: GDNode): string {
  if (isGDNodeType(typeNode, 'inferred_type')) {
    return ''; // := inferred — omit type in TS
  }
  if (isGDNodeType(typeNode, 'type')) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    const tsType = gdTypeToTs(inner);
    return tsType ? `: ${tsType}` : '';
  }
  const tsType = gdTypeToTs(typeNode.text);
  return tsType ? `: ${tsType}` : '';
}

// ─── Annotations / Decorators ─────────────────────────────────

function getAnnotations(node: GDNode): GDNode[] {
  const annotations: GDNode[] = [];
  for (const child of node.namedChildren) {
    if (isGDNodeType(child, 'annotations')) {
      for (const ann of child.namedChildren) {
        if (isGDNodeType(ann, 'annotation')) {
          annotations.push(ann);
        }
      }
    }
  }
  return annotations;
}

function emitAnnotationAsDecorator(node: GDNode): string {
  // Annotation text is like "@export" or "@onready" or "@export_range(0, 100)"
  const text = node.text;
  const match = text.match(/^@(\w+)(?:\((.+)\))?$/);
  if (!match) return `// ${text}`;

  const name = match[1]!;
  const args = match[2];

  switch (name) {
    case 'export':
      return args ? `@gd.export(${args})` : '@gd.export';
    case 'export_range':
    case 'export_category':
    case 'export_group':
    case 'export_subgroup':
    case 'export_global_file':
    case 'export_file':
    case 'export_multiline':
      return args ? `@gd.${name}(${args})` : `@gd.${name}`;
    case 'onready':
      return '@gd.onready';
    case 'tool':
      return '@gd.tool';
    case 'icon':
      return args ? `@gd.icon(${args})` : '@gd.icon';
    default:
      return args ? `@gd.${name}(${args})` : `@gd.${name}`;
  }
}

// ─── Functions ────────────────────────────────────────────────

function emitFunction(node: GDNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? 'unknown';
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  // Create local scope for this function
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  const savedMethodName = ctx.currentMethodName;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  ctx.currentMethodName = name;
  collectParamNames(paramsNode, ctx);

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode) : '';
  const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
  ctx.localVars = savedLocals;
  ctx.localVarTypes = savedLocalTypes;
  ctx.currentMethodName = savedMethodName;

  // Check if the body contains await -> mark as async
  const isAsync = bodyNode ? containsAwait(bodyNode) : false;
  const asyncPrefix = isAsync ? 'async ' : '';

  if (body) {
    return `  ${asyncPrefix}${name}(${params})${returnType} {\n${body}\n  }`;
  }
  return `  ${asyncPrefix}${name}(${params})${returnType} {\n  }`;
}

function emitConstructor(node: GDNode, ctx: GdToTsContext): string {
  const paramsNode = node.childForFieldName('parameters');
  const bodyNode = node.childForFieldName('body');

  // Create local scope for constructor
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  collectParamNames(paramsNode, ctx);

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
  ctx.localVars = savedLocals;
  ctx.localVarTypes = savedLocalTypes;

  if (body) {
    return `  constructor(${params}) {\n${body}\n  }`;
  }
  return `  constructor(${params}) {\n  }`;
}

function collectParamNames(
  paramsNode: GDNode | null,
  ctx: GdToTsContext,
): void {
  if (!paramsNode) return;
  for (const child of paramsNode.namedChildren) {
    if (isGDNodeType(child, 'identifier')) {
      ctx.localVars.add(child.text);
    } else if (
      isGDNodeType(child, 'typed_parameter') ||
      isGDNodeType(child, 'default_parameter') ||
      isGDNodeType(child, 'typed_default_parameter')
    ) {
      const name = child.namedChildren.find((c) =>
        isGDNodeType(c, 'identifier'),
      )?.text;
      if (name) ctx.localVars.add(name);
    }
  }
}

function emitParams(paramsNode: GDNode, ctx: GdToTsContext): string {
  const params: string[] = [];
  for (const child of paramsNode.namedChildren) {
    if (isGDNodeType(child, 'identifier')) {
      params.push(child.text);
    } else if (isGDNodeType(child, 'typed_parameter')) {
      const name =
        child.namedChildren.find((c) => isGDNodeType(c, 'identifier'))?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const tsType = typeNode ? gdTypeToTs(typeNode.text) : null;
      params.push(tsType ? `${name}: ${tsType}` : name);
    } else if (isGDNodeType(child, 'default_parameter')) {
      const name =
        child.namedChildren.find((c) => isGDNodeType(c, 'identifier'))?.text ??
        '';
      const value = child.childForFieldName('value');
      const valueStr = value ? emitExpr(value, ctx) : '';
      params.push(`${name} = ${valueStr}`);
    } else if (isGDNodeType(child, 'typed_default_parameter')) {
      const name =
        child.namedChildren.find((c) => isGDNodeType(c, 'identifier'))?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const value = child.childForFieldName('value');
      const tsType = typeNode ? gdTypeToTs(typeNode.text) : null;
      const valueStr = value ? emitExpr(value, ctx) : '';
      const typeStr = tsType ? `: ${tsType}` : '';
      params.push(`${name}${typeStr} = ${valueStr}`);
    }
  }
  return params.join(', ');
}

function emitReturnType(typeNode: GDNode): string {
  if (isGDNodeType(typeNode, 'type')) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    const tsType = gdTypeToTs(inner);
    return tsType ? `: ${tsType}` : '';
  }
  const tsType = gdTypeToTs(typeNode.text);
  return tsType ? `: ${tsType}` : '';
}

// ─── Body / Statements ────────────────────────────────────────

function emitBody(node: GDNode, ctx: GdToTsContext, depth: number): string {
  const indent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const child of node.namedChildren) {
    if (isGDNodeType(child, 'comment')) {
      lines.push(`${indent}${emitCommentInline(child)}`);
      continue;
    }

    if (isGDNodeType(child, 'expression_statement')) {
      const expr = child.namedChildren[0];
      if (expr) {
        if (isGDNodeType(expr, 'assignment')) {
          lines.push(`${indent}${emitAssignment(expr, ctx)};`);
        } else if (isGDNodeType(expr, 'augmented_assignment')) {
          lines.push(`${indent}${emitAugmentedAssignment(expr, ctx)};`);
        } else {
          lines.push(`${indent}${emitExpr(expr, ctx)};`);
        }
      }
      continue;
    }

    if (isGDNodeType(child, 'return_statement')) {
      const value = child.namedChildren[0];
      lines.push(
        value ? `${indent}return ${emitExpr(value, ctx)};` : `${indent}return;`,
      );
      continue;
    }

    if (isGDNodeType(child, 'variable_statement')) {
      lines.push(emitLocalVariable(child, ctx, indent));
      continue;
    }

    if (isGDNodeType(child, 'if_statement')) {
      lines.push(emitIfStatement(child, ctx, depth));
      continue;
    }

    if (isGDNodeType(child, 'for_statement')) {
      lines.push(emitForStatement(child, ctx, depth));
      continue;
    }

    if (isGDNodeType(child, 'while_statement')) {
      lines.push(emitWhileStatement(child, ctx, depth));
      continue;
    }

    if (isGDNodeType(child, 'match_statement')) {
      lines.push(emitMatchStatement(child, ctx, depth));
      continue;
    }

    if (isGDNodeType(child, 'pass_statement')) {
      // Skip pass in TS
      continue;
    }

    if (isGDNodeType(child, 'break_statement')) {
      lines.push(`${indent}break;`);
      continue;
    }

    if (isGDNodeType(child, 'continue_statement')) {
      lines.push(`${indent}continue;`);
      continue;
    }

    lines.push(
      `${indent}/* TODO: ${child.type} */ ${child.text.split('\n')[0]}`,
    );
  }

  return lines.join('\n');
}

// ─── Control Flow ─────────────────────────────────────────────

function emitIfStatement(
  node: GDNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');
  const condStr = condition ? emitExpr(condition, ctx) : 'true';

  let result = `${indent}if (${condStr}) {\n`;
  if (body) result += emitBody(body, ctx, depth + 1);
  result += `\n${indent}}`;

  // Handle elif and else via alternatives
  const alternatives = node.childrenForFieldName('alternative');
  for (const alt of alternatives) {
    if (isGDNodeType(alt, 'elif_clause')) {
      const elifCond = alt.childForFieldName('condition');
      const elifBody = alt.childForFieldName('body');
      const elifCondStr = elifCond ? emitExpr(elifCond, ctx) : 'true';
      result += ` else if (${elifCondStr}) {\n`;
      if (elifBody) result += emitBody(elifBody, ctx, depth + 1);
      result += `\n${indent}}`;
    } else if (isGDNodeType(alt, 'else_clause')) {
      const elseBody = alt.childForFieldName('body');
      result += ` else {\n`;
      if (elseBody) result += emitBody(elseBody, ctx, depth + 1);
      result += `\n${indent}}`;
    }
  }

  return result;
}

function emitForStatement(
  node: GDNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const body = node.childForFieldName('body');

  const varName = left?.text ?? 'item';
  const iterable = right ? emitExpr(right, ctx) : '[]';
  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';

  return `${indent}for (let ${varName} of ${iterable}) {\n${bodyStr}\n${indent}}`;
}

function emitWhileStatement(
  node: GDNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const condition = node.childForFieldName('condition');
  const body = node.childForFieldName('body');

  const condStr = condition ? emitExpr(condition, ctx) : 'true';
  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';

  return `${indent}while (${condStr}) {\n${bodyStr}\n${indent}}`;
}

function emitMatchStatement(
  node: GDNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const value = node.childForFieldName('value');
  const bodyNode = node.childForFieldName('body');

  const valueStr = value ? emitExpr(value, ctx) : '';
  let result = `${indent}switch (${valueStr}) {\n`;

  if (bodyNode) {
    for (const section of bodyNode.namedChildren) {
      if (isGDNodeType(section, 'pattern_section')) {
        const body = section.childForFieldName('body');
        // Patterns are all named children before 'body'
        const patterns = section.namedChildren.filter(
          (c) => !isGDNodeType(c, 'body'),
        );
        const isDefault = patterns.length === 1 && patterns[0]?.text === '_';

        if (isDefault) {
          result += `${indent}  default: {\n`;
        } else {
          const patternStr = patterns.map((p) => emitExpr(p, ctx)).join(', ');
          result += `${indent}  case ${patternStr}: {\n`;
        }

        if (body) {
          result += emitBody(body, ctx, depth + 2);
          result += '\n';
        }
        result += `${indent}    break;\n`;
        result += `${indent}  }\n`;
      }
    }
  }

  result += `${indent}}`;
  return result;
}

// ─── Assignment ───────────────────────────────────────────────

function emitAssignment(node: GDNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} = ${rightStr}`;
}

function emitAugmentedAssignment(node: GDNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const op =
    opNode?.text ??
    node.children.find((c) => !c.isNamed && /[+\-*/]=/.test(c.text))?.text ??
    '+=';
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} ${op} ${rightStr}`;
}

// ─── Expressions ──────────────────────────────────────────────

function emitExpr(node: GDNode, ctx: GdToTsContext): string {
  if (isGDNodeType(node, 'identifier')) {
    if (node.text === 'self') return 'this';
    if (node.text === 'null') return 'null';
    if (node.text === 'true') return 'true';
    if (node.text === 'false') return 'false';
    // If identifier is a known class member AND not a local variable, prefix with this/ClassName
    if (ctx.classMembers.has(node.text) && !ctx.localVars.has(node.text)) {
      if (ctx.staticMembers.has(node.text)) {
        return `${ctx.className}.${node.text}`;
      }
      return `this.${node.text}`;
    }
    return node.text;
  }

  if (isGDNodeType(node, 'integer') || isGDNodeType(node, 'float')) {
    return node.text;
  }

  if (isGDNodeType(node, 'string')) {
    return node.text;
  }

  if (isGDNodeType(node, 'true')) return 'true';
  if (isGDNodeType(node, 'false')) return 'false';
  if (isGDNodeType(node, 'null')) return 'null';

  if (isGDNodeType(node, 'call')) {
    return emitCall(node, ctx);
  }

  if (isGDNodeType(node, 'attribute')) {
    return emitAttribute(node, ctx);
  }

  if (isGDNodeType(node, 'binary_operator')) {
    return emitBinaryOp(node, ctx);
  }

  if (isGDNodeType(node, 'unary_operator')) {
    return emitUnaryOp(node, ctx);
  }

  if (isGDNodeType(node, 'string_name')) {
    const strChild = node.namedChildren.find((c) => isGDNodeType(c, 'string'));
    if (strChild) {
      // Extract the string content
      const content = strChild.text.slice(1, -1); // remove quotes
      return `StringName('${content}')`;
    }
    // &"text" — extract content between &" and "
    const text = node.text;
    const content = text.slice(2, -1);
    return `StringName('${content}')`;
  }

  if (isGDNodeType(node, 'node_path')) {
    const text = node.text;
    const content = text.slice(2, -1);
    return `NodePath('${content}')`;
  }

  if (isGDNodeType(node, 'get_node')) {
    // $Path -> this.getNode("Path")
    // $"Path/To/Node" -> this.getNode("Path/To/Node")
    const text = node.text;
    const path = text.startsWith('$"') ? text.slice(2, -1) : text.slice(1);
    return `this.getNode("${path}")`;
  }

  if (isGDNodeType(node, 'array')) {
    const elements = node.namedChildren.map((e) => emitExpr(e, ctx)).join(', ');
    return `[${elements}]`;
  }

  if (isGDNodeType(node, 'dictionary')) {
    const pairNodes = node.namedChildren.filter((c) => isGDNodeType(c, 'pair'));
    // Check if any key is an identifier (variable reference, not string/number literal)
    const hasIdentifierKey = pairNodes.some((p) => {
      const key = p.childForFieldName('left');
      return key && isGDNodeType(key, 'identifier');
    });
    if (hasIdentifierKey) {
      // Use gd.dict() format for dicts with variable keys
      const entries = pairNodes.map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        const keyStr = key ? emitExpr(key, ctx) : '';
        const valStr = value ? emitExpr(value, ctx) : '';
        return `[${keyStr}, ${valStr}]`;
      });
      return `gd.dict([\n${entries.map((e) => `      ${e},`).join('\n')}\n    ])`;
    }
    // Regular object literal for string/number-keyed dicts
    const pairs = pairNodes
      .map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        return `${key ? emitExpr(key, ctx) : ''}: ${value ? emitExpr(value, ctx) : ''}`;
      })
      .join(', ');
    return `{${pairs}}`;
  }

  if (isGDNodeType(node, 'conditional_expression')) {
    // GD: value if cond else other -> TS: cond ? value : other
    const left = node.childForFieldName('left');
    const condition = node.childForFieldName('condition');
    const right = node.childForFieldName('right');
    if (left && condition && right) {
      return `${emitExpr(condition, ctx)} ? ${emitExpr(left, ctx)} : ${emitExpr(right, ctx)}`;
    }
    return node.text;
  }

  if (isGDNodeType(node, 'await_expression')) {
    const expr = node.namedChildren[0];
    return `await ${expr ? emitExpr(expr, ctx) : ''}`;
  }

  if (isGDNodeType(node, 'parenthesized_expression')) {
    const inner = node.namedChildren[0];
    return inner ? `(${emitExpr(inner, ctx)})` : '()';
  }

  if (isGDNodeType(node, 'subscript')) {
    // obj[key]
    const obj = node.namedChildren[0];
    const argsNode = node.childForFieldName('arguments');
    const key = argsNode?.namedChildren[0];
    return `${obj ? emitExpr(obj, ctx) : ''}[${key ? emitExpr(key, ctx) : ''}]`;
  }

  if (isGDNodeType(node, 'lambda')) {
    return emitLambda(node, ctx);
  }

  // Fallback: return raw text with warning
  ctx.diagnostics.push({
    message: `Unhandled GDScript expression: ${node.type}`,
    severity: 'warning',
    file: ctx.filePath,
    line: node.startPosition.row + 1,
    column: node.startPosition.column,
  });
  return node.text;
}

// ─── Call Expression ──────────────────────────────────────────

function emitCall(node: GDNode, ctx: GdToTsContext): string {
  // call node: first named child is callee, 'arguments' field has args
  const callee = node.namedChildren[0];
  const argsNode = node.childForFieldName('arguments');
  const args = argsNode
    ? argsNode.namedChildren.map((a) => emitExpr(a, ctx)).join(', ')
    : '';

  if (!callee) return `(${args})`;

  // GDScript super() → TS super.methodName() (or super() in constructors)
  if (isGDNodeType(callee, 'identifier') && callee.text === 'super') {
    if (ctx.currentMethodName && ctx.currentMethodName !== 'constructor') {
      return `super.${ctx.currentMethodName}(${args})`;
    }
    return `super(${args})`;
  }

  // For bare identifier calls: add this. prefix for known class members
  if (
    isGDNodeType(callee, 'identifier') &&
    !ctx.localVars.has(callee.text) &&
    !isGlobalName(callee.text, ctx)
  ) {
    if (ctx.classMembers.has(callee.text)) {
      return `this.${callee.text}(${args})`;
    }
  }

  const calleeStr = emitExpr(callee, ctx);
  return `${calleeStr}(${args})`;
}

// ─── Attribute Expression ─────────────────────────────────────

function emitAttribute(node: GDNode, ctx: GdToTsContext): string {
  // attribute node children: [object, ".", name] or [object, ".", attribute_call]
  const children = node.namedChildren;
  if (children.length === 0) return node.text;

  const parts: string[] = [];
  let selfSeen = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i]!;

    // `self` at the start of an attribute chain becomes `this` (or ClassName for static members)
    if (i === 0 && isGDNodeType(child, 'identifier') && child.text === 'self') {
      // Look ahead to see if the next part is a static member
      const nextChild = children[i + 1];
      const nextName =
        nextChild && isGDNodeType(nextChild, 'identifier')
          ? nextChild.text
          : '';
      if (nextName && ctx.staticMembers.has(nextName)) {
        parts.push(ctx.className);
      } else {
        parts.push('this');
      }
      selfSeen = true;
      continue;
    }

    if (isGDNodeType(child, 'attribute_call')) {
      // method call on attribute: obj.method(args)
      const methodName =
        child.namedChildren.find((c) => isGDNodeType(c, 'identifier'))?.text ??
        '';
      const argsNode = child.childForFieldName('arguments');
      const args = argsNode
        ? argsNode.namedChildren.map((a) => emitExpr(a, ctx)).join(', ')
        : '';
      // .new() -> new ClassName()
      if (methodName === 'new') {
        const className = parts.join('.');
        parts.length = 0;
        parts.push(`new ${className}(${args})`);
      } else {
        parts.push(`${methodName}(${args})`);
      }
    } else if (isGDNodeType(child, 'attribute_subscript')) {
      const attrName =
        child.namedChildren.find((c) => isGDNodeType(c, 'identifier'))?.text ??
        '';
      const argsNode = child.childForFieldName('arguments');
      const key = argsNode?.namedChildren[0];
      parts.push(`${attrName}[${key ? emitExpr(key, ctx) : ''}]`);
    } else if (isGDNodeType(child, 'identifier')) {
      // After self or for property access, use raw identifier (no this. prefix)
      parts.push(child.text);
    } else {
      parts.push(emitExpr(child, ctx));
    }
  }

  // If the first part is a known class member and no self was used, prefix with this/ClassName
  if (!selfSeen && parts.length >= 1 && ctx.classMembers.has(parts[0]!)) {
    if (ctx.staticMembers.has(parts[0]!)) {
      parts.unshift(ctx.className);
    } else {
      parts.unshift('this');
    }
  }

  return parts.join('.');
}

// ─── Binary / Unary Operators ─────────────────────────────────

function emitBinaryOp(node: GDNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const opText =
    opNode?.text ?? node.children.find((c) => !c.isNamed)?.text ?? '??';

  // GD `as` -> gd.as()
  if (opText === 'as') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    return `gd.as(${leftStr}, ${rightStr})`;
  }

  // GD `is` -> instanceof (or keep as is)
  if (opText === 'is') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    return `${leftStr} instanceof ${rightStr}`;
  }

  // Check if this is an arithmetic op on operator-overloaded types (Vector2, Color, etc.)
  const mathFn = GD_OPS_MAP[opText];
  if (mathFn && left) {
    const leftType = inferExprType(left, ctx);
    if (leftType && OPERATOR_OVERLOAD_TYPES.has(leftType)) {
      const leftStr = emitExpr(left, ctx);
      const rightStr = right ? emitExpr(right, ctx) : '';
      return `gd.ops.${mathFn}(${leftStr}, ${rightStr})`;
    }
  }

  const gdToTsOp: Record<string, string> = {
    and: '&&',
    or: '||',
    not: '!',
    '==': '===',
    '!=': '!==',
  };

  const tsOp = gdToTsOp[opText] ?? opText;
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';

  return `${leftStr} ${tsOp} ${rightStr}`;
}

function emitUnaryOp(node: GDNode, ctx: GdToTsContext): string {
  const operand = node.namedChildren[0];
  const op = node.children.find((c) => !c.isNamed)?.text ?? '';
  const tsOp = op === 'not' ? '!' : op;
  return `${tsOp}${operand ? emitExpr(operand, ctx) : ''}`;
}

// ─── Lambda ───────────────────────────────────────────────────

function emitLambda(node: GDNode, ctx: GdToTsContext): string {
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode) : '';

  // Check if body is a single return expression
  if (bodyNode && bodyNode.namedChildren.length === 1) {
    const stmt = bodyNode.namedChildren[0]!;
    if (
      isGDNodeType(stmt, 'return_statement') &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      return `(${params})${returnType} => ${emitExpr(expr, ctx)}`;
    }
    if (
      isGDNodeType(stmt, 'expression_statement') &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      return `(${params})${returnType} => { ${emitExpr(expr, ctx)}; }`;
    }
  }

  // Multi-statement lambda
  const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
  return `(${params})${returnType} => {\n${body}\n  }`;
}

// ─── Comments (inline) ───────────────────────────────────────

function emitCommentInline(node: GDNode): string {
  const text = node.text;
  if (text.startsWith('##')) {
    const content = text.slice(2).trim();
    return `/** ${content} */`;
  }
  const content = text.slice(1).trim();
  return `// ${content}`;
}

// ─── Type Inference (for gd.ops detection) ──────────────────

/** Types that require gd.ops.* wrappers for arithmetic */
const OPERATOR_OVERLOAD_TYPES = new Set([
  'Vector2',
  'Vector2i',
  'Vector3',
  'Vector3i',
  'Vector4',
  'Vector4i',
  'Color',
  'Quaternion',
  'Basis',
  'Transform2D',
  'Transform3D',
  'Projection',
]);

/** Extract raw GD type name from a type node */
function extractGdTypeName(typeNode: GDNode): string | null {
  if (isGDNodeType(typeNode, 'type')) {
    return typeNode.namedChildren[0]?.text ?? typeNode.text;
  }
  if (isGDNodeType(typeNode, 'inferred_type')) {
    return null;
  }
  return typeNode.text;
}

/** Infer the GD type of an expression (best-effort, for gd.ops detection) */
/** Infer type from expression without context (for parseGdClassInfo). Only handles constructor calls. */
function inferExprTypeStatic(node: GDNode): string | null {
  if (isGDNodeType(node, 'call')) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      isGDNodeType(callee, 'identifier') &&
      OPERATOR_OVERLOAD_TYPES.has(callee.text)
    ) {
      return callee.text;
    }
  }
  return null;
}

function inferExprType(node: GDNode, ctx: GdToTsContext): string | null {
  // Constructor call: Vector2(...), Color(...), etc.
  if (isGDNodeType(node, 'call')) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      isGDNodeType(callee, 'identifier') &&
      OPERATOR_OVERLOAD_TYPES.has(callee.text)
    ) {
      return callee.text;
    }
  }
  // Identifier: look up tracked type (local vars first, then class members)
  if (isGDNodeType(node, 'identifier')) {
    if (ctx.localVarTypes.has(node.text))
      return ctx.localVarTypes.get(node.text)!;
    if (ctx.classMemberTypes.has(node.text))
      return ctx.classMemberTypes.get(node.text)!;
  }
  // Binary operator: inherit type from left operand
  if (isGDNodeType(node, 'binary_operator')) {
    const left = node.childForFieldName('left');
    if (left) return inferExprType(left, ctx);
  }
  return null;
}

const GD_OPS_MAP: Record<string, string> = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '==': 'eq',
  '!=': 'ne',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
};

// ─── Helpers ──────────────────────────────────────────────────

function containsAwait(node: GDNode): boolean {
  if (isGDNodeType(node, 'await_expression')) return true;
  for (const child of node.namedChildren) {
    if (containsAwait(child)) return true;
  }
  return false;
}

function gdTypeToTs(gdType: string): string | null {
  switch (gdType) {
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
    case 'Array':
      return 'Array<any>';
    case 'Dictionary':
      return 'Dictionary';
    case 'null':
      return 'null';
    case 'Variant':
      return 'any';
    default:
      // Array[T] -> Array<T>
      if (gdType.startsWith('Array[')) {
        const inner = gdType.slice(6, -1);
        const tsInner = gdTypeToTs(inner);
        return `Array<${tsInner ?? inner}>`;
      }
      // Class type or unknown — keep as-is
      return gdType;
  }
}
