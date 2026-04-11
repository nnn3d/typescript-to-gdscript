import { GDScriptParser } from '../../parser/gdscript/index.ts';
import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { TransformResult, TransformDiagnostic } from '../common/index.ts';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/**
 * Fix comment indentation so tree-sitter doesn't break block structure.
 * In GDScript, comments don't affect block indentation. A comment at column 0
 * inside an indented block shouldn't break the block. This function aligns
 * such comments to the indentation of the next non-comment, non-empty line.
 */
function fixCommentIndentation(source: string): string {
  const lines = source.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const trimmed = line.trimStart();

    // Check if this is a comment line (# or ##)
    if (trimmed.startsWith('#')) {
      // tree-sitter-gdscript bug: `#"` (no space) is not parsed as a comment.
      // Workaround: ensure a space after # or ## before non-space characters.
      const commentPrefix = trimmed.startsWith('##') ? '##' : '#';
      const afterPrefix = trimmed.slice(commentPrefix.length);
      let fixedTrimmed = trimmed;
      if (afterPrefix.length > 0 && afterPrefix[0] !== ' ' && afterPrefix[0] !== '\t') {
        fixedTrimmed = commentPrefix + ' ' + afterPrefix;
      }

      // Find the next non-empty, non-comment line
      let nextIndent: string | null = null;
      for (let j = i + 1; j < lines.length; j++) {
        const nextTrimmed = lines[j]!.trimStart();
        if (nextTrimmed === '' || nextTrimmed.startsWith('#')) continue;
        // Get indentation of the next code line
        nextIndent = lines[j]!.substring(
          0,
          lines[j]!.length - nextTrimmed.length,
        );
        break;
      }

      if (nextIndent !== null) {
        // Get current comment indentation
        const currentIndent = line.substring(0, line.length - trimmed.length);
        // If comment has less indentation than the next code line, re-indent it
        if (currentIndent.length < nextIndent.length) {
          result.push(nextIndent + fixedTrimmed);
          continue;
        }
      }
      if (fixedTrimmed !== trimmed) {
        const currentIndent = line.substring(0, line.length - trimmed.length);
        result.push(currentIndent + fixedTrimmed);
        continue;
      }
    }

    result.push(line);
  }

  return result.join('\n');
}

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
  /**
   * Signal handler type info resolved from .tscn scene connections.
   * Maps method name → array of typed parameters (Godot type names).
   * When a GDScript function matches a handler name and has untyped params,
   * the signal's parameter types are used instead.
   */
  signalHandlers?: Map<string, { params: Array<{ name: string; gdType: string }> }>;
  /**
   * Use `any` instead of `unknown` as the fallback for unresolvable types
   * (e.g. `gd.getset` without a GDScript type annotation and without a
   * typeof-able value expression). Less strict but more error-prone.
   */
  unsafeUseAny?: boolean;
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
export function parseGdClassInfo(
  source: string,
  registry?: GodotClassRegistry,
): UserClassInfo | null {
  const parser = new GDScriptParser();
  const root = parser.parse(fixCommentIndentation(source));

  let className = '';
  let extendsClass = '';
  const members = new Set<string>();
  const memberTypes = new Map<string, string>();

  for (const child of root.namedChildren) {
    if (child.type === SyntaxType.ExtendsStatement) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = typeNode.type === SyntaxType.Type
          ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
          : typeNode.text;
      }
    } else if (child.type === SyntaxType.ClassNameStatement) {
      className = child.childForFieldName('name')?.text ?? '';
    } else if (
      child.type === SyntaxType.FunctionDefinition ||
      child.type === SyntaxType.ConstructorDefinition
    ) {
      const name = child.childForFieldName('name')?.text ?? '_init';
      members.add(name === '_init' ? 'constructor' : name);
    } else if (
      child.type === SyntaxType.VariableStatement ||
      child.type === SyntaxType.ExportVariableStatement ||
      child.type === SyntaxType.OnreadyVariableStatement
    ) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        members.add(name);
        const typeNode = child.childForFieldName('type');
        const valueNode = child.childForFieldName('value');
        const inferredType = typeNode
          ? extractGdTypeName(typeNode)
          : valueNode
            ? inferExprTypeStatic(valueNode, registry)
            : null;
        if (inferredType) memberTypes.set(name, inferredType);
      }
    } else if (child.type === SyntaxType.SignalStatement) {
      const name = child.childForFieldName('name')?.text;
      if (name) members.add(name);
    } else if (child.type === SyntaxType.ConstStatement) {
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
      const info = parseGdClassInfo(ps.source, options.registry);
      if (info) userClasses.set(info.name, info);
    }
  }
  // Also parse the current file so it's available for inner class extends resolution
  const selfInfo = parseGdClassInfo(options.source, options.registry);
  if (selfInfo) userClasses.set(selfInfo.name, selfInfo);

  const parser = new GDScriptParser();
  const fixedSource = fixCommentIndentation(options.source);
  const root = parser.parse(fixedSource);
  const ctx: GdToTsContext = {
    source: fixedSource,
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
    signalHandlers: options.signalHandlers ?? new Map(),
    globalEnumMap: buildGlobalEnumMap(options.registry),
    classTypeNames: new Set(),
    unsafeUseAny: options.unsafeUseAny ?? false,
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
  /** Signal handler type info from .tscn connections (method name → param types) */
  signalHandlers: Map<string, { params: Array<{ name: string; gdType: string }> }>;
  /** Global enum constant → qualified name (e.g. "KEY_F21" → "Key.KEY_F21") */
  globalEnumMap: Map<string, string>;
  /** Class-level enum and inner class names (for type qualification: State → ClassName.State) */
  classTypeNames: Set<string>;
  /** Use `any` instead of `unknown` as the fallback for unresolvable types */
  unsafeUseAny: boolean;
}

/** Build a map of bare global enum constant names → qualified TS names (e.g. "KEY_F21" → "Key.KEY_F21") */
function buildGlobalEnumMap(registry: GodotClassRegistry): Map<string, string> {
  const map = new Map<string, string>();
  const data = registry.getData();
  for (const e of data.globalEnums) {
    const enumName = e.name.includes('.') ? e.name.replace(/\./g, '_') : e.name;
    for (const v of e.values) {
      map.set(v.name, `${enumName}.${v.name}`);
    }
  }
  return map;
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

function emitSourceFile(root: SyntaxNode, ctx: GdToTsContext): string {
  const lines: string[] = [];
  let className = '';
  let extendsClass = '';
  const topComments: string[] = [];
  const memberLines: string[] = [];

  // First pass: collect class name, extends, and member names
  for (const child of root.namedChildren) {
    if (child.type === SyntaxType.ExtendsStatement) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = typeNode.type === SyntaxType.Type
          ? (typeNode.namedChildren[0]?.text ?? typeNode.text)
          : typeNode.text;
      }
    } else if (child.type === SyntaxType.ClassNameStatement) {
      className = child.childForFieldName('name')?.text ?? '';
    } else if (
      child.type === SyntaxType.FunctionDefinition ||
      child.type === SyntaxType.ConstructorDefinition
    ) {
      const name = child.childForFieldName('name')?.text ?? '_init';
      ctx.classMembers.add(name === '_init' ? 'constructor' : name);
    } else if (
      child.type === SyntaxType.VariableStatement ||
      child.type === SyntaxType.ExportVariableStatement ||
      child.type === SyntaxType.OnreadyVariableStatement
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
    } else if (child.type === SyntaxType.SignalStatement) {
      const name = child.childForFieldName('name')?.text;
      if (name) ctx.classMembers.add(name);
    } else if (child.type === SyntaxType.ConstStatement) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        ctx.classMembers.add(name);
        ctx.staticMembers.add(name);
      }
    } else if (child.type === SyntaxType.EnumDefinition) {
      const nameNode = child.childForFieldName('name');
      if (nameNode) {
        // Named enum → static member + class type name
        ctx.classMembers.add(nameNode.text);
        ctx.staticMembers.add(nameNode.text);
        ctx.classTypeNames.add(nameNode.text);
      } else {
        // Anonymous enum → each enumerator is a static constant
        const bodyNode = child.childForFieldName('body');
        if (bodyNode) {
          for (const e of bodyNode.namedChildren) {
            if (e.type === SyntaxType.Enumerator) {
              const eName = e.childForFieldName('left')?.text;
              if (eName) {
                ctx.classMembers.add(eName);
                ctx.staticMembers.add(eName);
              }
            }
          }
        }
      }
    } else if (child.type === SyntaxType.ClassDefinition) {
      const name = child.childForFieldName('name')?.text;
      if (name) {
        ctx.classMembers.add(name);
        ctx.staticMembers.add(name);
        ctx.classTypeNames.add(name);
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

  // Check for @abstract annotation at root level (sibling of extends/class_name)
  let isAbstractClass = false;
  // Track indices of @abstract annotation nodes at root level (to skip in second pass)
  const rootAbstractAnnotationIndices = new Set<number>();
  // Track indices of function_definition nodes that have a preceding @abstract annotation
  const abstractFunctionIndices = new Set<number>();
  // Track indices of class_definition nodes that have a preceding @abstract annotation
  const abstractClassIndices = new Set<number>();

  for (let i = 0; i < root.namedChildren.length; i++) {
    const child = root.namedChildren[i]!;
    if (
      child.type === SyntaxType.Annotation &&
      child.text === '@abstract'
    ) {
      // Check what follows this annotation
      const next = root.namedChildren[i + 1];
      if (
        next &&
        (next.type === SyntaxType.ExtendsStatement ||
          next.type === SyntaxType.ClassNameStatement)
      ) {
        isAbstractClass = true;
        rootAbstractAnnotationIndices.add(i);
      } else if (next && next.type === SyntaxType.FunctionDefinition) {
        abstractFunctionIndices.add(i + 1);
        rootAbstractAnnotationIndices.add(i);
      } else if (next && next.type === SyntaxType.ClassDefinition) {
        abstractClassIndices.add(i + 1);
        rootAbstractAnnotationIndices.add(i);
      }
    }
  }

  // Second pass: emit everything
  let lastWasFunction = false;
  let hasNonFunctionMembers = false;
  let pendingAnnotations: string[] = [];
  const flushPendingAnnotations = () => {
    for (const ann of pendingAnnotations) {
      memberLines.push(ann);
    }
    pendingAnnotations = [];
  };

  for (let ci = 0; ci < root.namedChildren.length; ci++) {
    const child = root.namedChildren[ci]!;
    if (
      child.type === SyntaxType.ExtendsStatement ||
      child.type === SyntaxType.ClassNameStatement
    ) {
      continue; // handled in class header
    }

    // Skip root-level @abstract annotations (handled via isAbstractClass / abstractFunctions)
    if (
      child.type === SyntaxType.Annotation &&
      rootAbstractAnnotationIndices.has(ci)
    ) {
      continue;
    }

    // Standalone annotations (e.g. @export_group) — collect and prepend to next member
    if (child.type === SyntaxType.Annotation) {
      pendingAnnotations.push(`  ${emitAnnotationAsDecorator(child, ctx)}`);
      continue;
    }

    if (child.type === SyntaxType.Comment) {
      // Comments before class body become top-level comments inside class
      memberLines.push(emitComment(child));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    // Triple-quoted string as standalone expression → block comment
    if (child.type === SyntaxType.ExpressionStatement) {
      const expr = child.namedChildren[0];
      if (expr?.type === SyntaxType.String && (expr.text.startsWith('"""') || expr.text.startsWith("'''"))) {
        memberLines.push(emitBlockComment(expr.text, '  '));
        hasNonFunctionMembers = true;
        lastWasFunction = false;
        continue;
      }
    }

    const isFunction =
      child.type === SyntaxType.FunctionDefinition ||
      child.type === SyntaxType.ConstructorDefinition;

    if (isFunction) {
      // Add blank line before first function if there were property members
      if (hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
    }

    if (child.type === SyntaxType.FunctionDefinition) {
      const isAbstract = abstractFunctionIndices.has(ci);
      flushPendingAnnotations();
      memberLines.push(emitFunction(child, ctx, isAbstract));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (child.type === SyntaxType.ConstructorDefinition) {
      flushPendingAnnotations();
      memberLines.push(emitConstructor(child, ctx));
      memberLines.push('');
      lastWasFunction = true;
      continue;
    }

    if (
      child.type === SyntaxType.VariableStatement ||
      child.type === SyntaxType.ExportVariableStatement ||
      child.type === SyntaxType.OnreadyVariableStatement
    ) {
      const hasSetget = child.namedChildren.some(
        (c) => c.type === SyntaxType.Setget,
      );
      // Variables with setget clauses emit function-like bodies (accessors or
      // gd.getset blocks) and should be surrounded by blank lines.
      if (hasSetget && hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
      flushPendingAnnotations();
      memberLines.push(emitClassVariable(child, ctx));
      if (hasSetget) {
        memberLines.push('');
        lastWasFunction = true;
      } else {
        lastWasFunction = false;
      }
      hasNonFunctionMembers = true;
      continue;
    }

    if (child.type === SyntaxType.ConstStatement) {
      flushPendingAnnotations();
      memberLines.push(emitConstStatement(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (child.type === SyntaxType.SignalStatement) {
      flushPendingAnnotations();
      memberLines.push(emitSignal(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (child.type === SyntaxType.EnumDefinition) {
      flushPendingAnnotations();
      memberLines.push(emitEnum(child, ctx));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    if (child.type === SyntaxType.ClassDefinition) {
      // Add blank line before inner class if there were non-function members
      // (functions already add trailing blank lines)
      if (hasNonFunctionMembers && !lastWasFunction) {
        memberLines.push('');
      }
      flushPendingAnnotations();
      const isAbstractInner = abstractClassIndices.has(ci);
      memberLines.push(emitInnerClass(child, ctx, isAbstractInner));
      hasNonFunctionMembers = true;
      lastWasFunction = false;
      continue;
    }

    ctx.diagnostics.push({
      message: `Unhandled top-level node: ${child.type}`,
      severity: 'error',
      file: ctx.filePath,
      line: child.startPosition.row + 1,
      column: child.startPosition.column,
    });
    memberLines.push(`  /* ERROR: Unhandled top-level node: ${child.type} */ ${child.text.split('\n')[0]}`);
  }

  // Remove trailing empty lines from members
  while (
    memberLines.length > 0 &&
    memberLines[memberLines.length - 1]!.trim() === ''
  ) {
    memberLines.pop();
  }

  const extendsClause = extendsClass ? ` extends ${extendsClass}` : '';
  const abstractKeyword = isAbstractClass ? 'abstract ' : '';
  const classHeader = `export ${abstractKeyword}class ${className || '__CLASS__'}${extendsClause} {`;
  return [classHeader, ...memberLines, '}', ''].join('\n');
}

// ─── Inner Class ──────────────────────────────────────────────

function emitInnerClass(node: SyntaxNode, ctx: GdToTsContext, isAbstractFromParent = false): string {
  const nameNode = node.childForFieldName('name');
  const className = nameNode?.text ?? 'InnerClass';

  // Check for @abstract annotation as child of class_definition, or passed from parent scope
  const annotations = getAnnotations(node);
  const isAbstractInner = isAbstractFromParent || annotations.some((ann) => ann.text === '@abstract');

  // Find extends
  let extendsClass = '';
  const bodyNode = node.childForFieldName('body');

  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.ExtendsStatement) {
      const typeNode = child.namedChildren[0];
      if (typeNode) {
        extendsClass = typeNode.type === SyntaxType.Type
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
        child.type === SyntaxType.FunctionDefinition ||
        child.type === SyntaxType.ConstructorDefinition
      ) {
        const name = child.childForFieldName('name')?.text ?? '_init';
        ctx.classMembers.add(name === '_init' ? 'constructor' : name);
      } else if (
        child.type === SyntaxType.VariableStatement ||
        child.type === SyntaxType.ExportVariableStatement
      ) {
        const name = child.childForFieldName('name')?.text;
        if (name) ctx.classMembers.add(name);
      } else if (child.type === SyntaxType.SignalStatement) {
        const name = child.childForFieldName('name')?.text;
        if (name) ctx.classMembers.add(name);
      } else if (child.type === SyntaxType.EnumDefinition) {
        const name = child.childForFieldName('name')?.text;
        if (name) {
          ctx.classMembers.add(name);
          ctx.staticMembers.add(name);
        }
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
      if (child.type === SyntaxType.FunctionDefinition) {
        memberLines.push(emitFunction(child, ctx));
        continue;
      }
      if (child.type === SyntaxType.ConstructorDefinition) {
        memberLines.push(emitConstructor(child, ctx));
        continue;
      }
      if (
        child.type === SyntaxType.VariableStatement ||
        child.type === SyntaxType.ExportVariableStatement
      ) {
        memberLines.push(emitClassVariable(child, ctx));
        continue;
      }
      if (child.type === SyntaxType.EnumDefinition) {
        memberLines.push(emitEnum(child, ctx));
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

  const abstractDecorator = isAbstractInner ? '  @abstract\n' : '';
  return `${abstractDecorator}  static ${className} = class${extendsClause} {\n${indentedMembers}\n  }`;
}

// ─── Comments ─────────────────────────────────────────────────

/** Convert a triple-quoted GDScript string to a JS block comment */
function emitBlockComment(text: string, indent: string): string {
  const content = text.slice(3, -3);
  // Single-line: /* content */
  if (!content.includes('\n')) {
    return `${indent}/* ${content.trim()} */`;
  }
  // Multiline: strip common leading whitespace, then re-indent
  const rawLines = content.split('\n');
  const nonEmptyLines = rawLines.filter(l => l.trim() !== '');
  const minIndent = nonEmptyLines.reduce((min, l) => {
    const leading = l.match(/^(\s*)/)?.[1]?.length ?? 0;
    return Math.min(min, leading);
  }, Infinity);
  const stripped = nonEmptyLines.map(l => l.slice(minIndent));

  const result: string[] = [];
  result.push(`${indent}/*`);
  for (const line of stripped) {
    result.push(`${indent}${line.trimEnd()}`);
  }
  result.push(`${indent}*/`);
  return result.join('\n');
}

function emitComment(node: SyntaxNode): string {
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

function emitSignal(node: SyntaxNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const paramsNode = node.childForFieldName('parameters');

  if (paramsNode && paramsNode.namedChildren.length > 0) {
    const types = emitSignalParamTypes(paramsNode);
    return `  ${name} = gd.signal<[${types}]>();`;
  }

  return `  ${name} = gd.signal();`;
}

function emitSignalParamTypes(paramsNode: SyntaxNode): string {
  const types: string[] = [];
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.TypedParameter) {
      const typeNode = child.childForFieldName('type');
      const tsType = typeNode ? gdTypeToTs(typeNode.text) : 'any';
      types.push(tsType ?? 'any');
    } else if (child.type === SyntaxType.Identifier) {
      types.push('any');
    }
  }
  return types.join(', ');
}

// ─── Enums ────────────────────────────────────────────────────

function emitEnum(node: SyntaxNode, ctx: GdToTsContext): string {
  const nameNode = node.childForFieldName('name');
  const bodyNode = node.childForFieldName('body');
  if (!bodyNode) return '';

  const enumerators = bodyNode.namedChildren.filter((c) =>
    c.type === SyntaxType.Enumerator,
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
    return `  static ${nameNode.text} = gd.enum(${values.join(', ')});`;
  }

  // Anonymous enum -> static constants
  const lines: string[] = [];
  let counter = 0;
  for (const e of enumerators) {
    const eName = e.childForFieldName('left')?.text;
    const eValue = e.childForFieldName('right');
    const val = eValue ? parseInt(eValue.text) : counter;
    if (eName) {
      lines.push(`  static ${eName}: int = ${val};`);
    }
    counter = val + 1;
  }
  return lines.join('\n');
}

// ─── Variables ────────────────────────────────────────────────

function emitClassVariable(node: SyntaxNode, ctx: GdToTsContext): string {
  const annotations = getAnnotations(node);
  const isStatic = node.childForFieldName('static') !== null;
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  // Detect setget clause (inline `get: ... set(v): ...` OR `get = fn, set = fn`)
  const setgetNode = node.namedChildren.find(
    (c) => c.type === SyntaxType.Setget,
  );

  let decorators = '';
  for (const ann of annotations) {
    decorators += `  ${emitAnnotationAsDecorator(ann, ctx)}\n`;
  }

  const staticPrefix = isStatic ? 'static ' : '';
  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';

  // If there's a setget clause, delegate to specialized emitter
  if (setgetNode) {
    return emitSetgetVariable(
      name,
      typeNode,
      typeAnnotation,
      valueNode,
      setgetNode,
      decorators,
      staticPrefix,
      ctx,
    );
  }

  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';
  return `${decorators}  ${staticPrefix}${name}${typeAnnotation}${init};`;
}

/**
 * Try to emit a `typeof <expr>` type annotation for a value expression.
 * Returns null if the expression isn't typeof-able (literal, call, operator,
 * etc.) — `typeof` in type position only accepts identifiers and property
 * access chains that refer to values.
 */
function tryEmitTypeofValue(
  valueNode: SyntaxNode,
  ctx: GdToTsContext,
): string | null {
  // Walk past any simple parenthesized wrapping
  let node: SyntaxNode | undefined = valueNode;
  while (node && node.type === SyntaxType.ParenthesizedExpression) {
    node = node.namedChildren[0];
  }
  if (!node) return null;

  // Plain identifiers and attribute/member chains
  if (node.type === SyntaxType.Identifier) {
    return `typeof ${emitExpr(node, ctx)}`;
  }
  if (node.type === SyntaxType.Attribute) {
    return `typeof ${emitExpr(node, ctx)}`;
  }
  return null;
}

/**
 * Emit a variable with a `setget` clause as either:
 *  - TS `get`/`set` accessors (simple case: no value, inline get/set bodies)
 *  - `name = gd.getset<T>({...})` assignment (complex case: has value, or alt
 *    `get = fn, set = fn` syntax)
 *
 * Mixing alt function-ref syntax with inline bodies, or using a value with
 * alt syntax, is an error (the user's rule).
 */
function emitSetgetVariable(
  name: string,
  typeNode: SyntaxNode | null,
  typeAnnotation: string,
  valueNode: SyntaxNode | null,
  setgetNode: SyntaxNode,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const getNode = setgetNode.namedChildren.find(
    (c) => c.type === SyntaxType.GetBody || c.type === SyntaxType.Getter,
  );
  const setNode = setgetNode.namedChildren.find(
    (c) => c.type === SyntaxType.SetBody || c.type === SyntaxType.Setter,
  );

  const getIsInline = getNode?.type === SyntaxType.GetBody;
  const getIsRef = getNode?.type === SyntaxType.Getter;
  const setIsInline = setNode?.type === SyntaxType.SetBody;
  const setIsRef = setNode?.type === SyntaxType.Setter;

  const hasAnyInline = getIsInline || setIsInline;
  const hasAnyRef = getIsRef || setIsRef;
  const hasValue = !!valueNode;

  // Error: mixing inline and function-ref syntax
  if (hasAnyInline && hasAnyRef) {
    ctx.diagnostics.push({
      message:
        `Variable '${name}': cannot mix inline get/set bodies with ` +
        `function-reference syntax (\`get = fn_name, set = fn_name\`).`,
      severity: 'error',
      line: setgetNode.startPosition.row + 1,
      column: setgetNode.startPosition.column,
      file: ctx.filePath,
    });
  }

  // Decide which output form to use
  const useGdGetset = hasValue || hasAnyRef;

  // Resolve the TS type for the property annotation.
  //  1. Explicit GDScript type annotation (e.g. `var b: int = ...`)
  //  2. `typeof <value>` when the value expression is typeof-able
  //     (identifier / property-access — not a literal or complex expr)
  //  3. Fall back to `unknown` (default) or `any` (with `--unsafe-use-any`)
  let tsType: string;
  if (typeNode) {
    const typeText = extractGdTypeName(typeNode) ?? 'Variant';
    tsType = gdTypeToTs(typeText) ?? (ctx.unsafeUseAny ? 'any' : 'unknown');
  } else if (valueNode) {
    const typeofExpr = tryEmitTypeofValue(valueNode, ctx);
    tsType = typeofExpr ?? (ctx.unsafeUseAny ? 'any' : 'unknown');
  } else {
    tsType = ctx.unsafeUseAny ? 'any' : 'unknown';
  }

  if (!useGdGetset) {
    // Simple case: emit TS get/set accessors
    return emitTsAccessors(
      name,
      tsType,
      getNode,
      setNode,
      decorators,
      staticPrefix,
      ctx,
    );
  }

  // Complex case: emit `name = gd.getset<T>({...})` assignment
  return emitGdGetsetCall(
    name,
    tsType,
    typeAnnotation,
    valueNode,
    getNode,
    setNode,
    decorators,
    staticPrefix,
    ctx,
  );
}

/**
 * Emit a pair of TS `get`/`set` accessors for a simple inline setget.
 * If only one of get/set exists, synthesize a default for the other that
 * reads/writes `this.<name>`.
 */
function emitTsAccessors(
  name: string,
  tsType: string,
  getNode: SyntaxNode | undefined,
  setNode: SyntaxNode | undefined,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const indent = '  ';
  const bodyIndent = '    ';
  const lines: string[] = [];

  // Emit getter
  lines.push(`${decorators}${indent}${staticPrefix}get ${name}(): ${tsType} {`);
  if (getNode?.type === SyntaxType.GetBody) {
    const body = getNode.childForFieldName('body');
    const bodyStr = body ? emitBody(body, ctx, 2) : '';
    if (bodyStr) lines.push(bodyStr);
  } else {
    lines.push(`${bodyIndent}return this.${name};`);
  }
  lines.push(`${indent}}`);
  lines.push('');

  // Emit setter
  lines.push(`${indent}${staticPrefix}set ${name}(value: ${tsType}) {`);
  if (setNode?.type === SyntaxType.SetBody) {
    const body = setNode.childForFieldName('body');
    // The setter's parameter name may differ from `value` — copy it verbatim
    // from the GD source by using the original parameter identifier.
    const params = setNode.namedChildren.find(
      (c) => c.type === SyntaxType.Parameters,
    );
    const paramName =
      params?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
        ?.text ?? 'value';
    const savedLocals = new Set(ctx.localVars);
    ctx.localVars.add(paramName);
    const bodyStr = body ? emitBody(body, ctx, 2) : '';
    ctx.localVars = savedLocals;
    if (paramName !== 'value') {
      // Rewrite the parameter name at the signature level to match
      lines[lines.length - 1] =
        `${indent}${staticPrefix}set ${name}(${paramName}: ${tsType}) {`;
    }
    if (bodyStr) lines.push(bodyStr);
  } else {
    lines.push(`${bodyIndent}this.${name} = value;`);
  }
  lines.push(`${indent}}`);

  return lines.join('\n');
}

/**
 * Emit `name = gd.getset<T>({ value?: ..., get: ..., set: ... })` for complex
 * cases (has default value or uses `get = fn, set = fn` function-ref syntax).
 */
function emitGdGetsetCall(
  name: string,
  tsType: string,
  typeAnnotation: string,
  valueNode: SyntaxNode | null,
  getNode: SyntaxNode | undefined,
  setNode: SyntaxNode | undefined,
  decorators: string,
  staticPrefix: string,
  ctx: GdToTsContext,
): string {
  const indent = '  ';
  const iProp = '    ';
  const iBody = '      ';
  const lines: string[] = [];
  const entries: string[] = [];

  if (valueNode) {
    entries.push(`${iProp}value: ${emitExpr(valueNode, ctx)},`);
  }

  // Both `get` and `set` keys are required in gd.getset. `null` means
  // "use GDScript's default (backing-field read/write)".
  if (getNode?.type === SyntaxType.GetBody) {
    const body = getNode.childForFieldName('body');
    const bodyStr = body ? emitBody(body, ctx, 3) : '';
    entries.push(`${iProp}get: () => {`);
    if (bodyStr) entries.push(bodyStr);
    entries.push(`${iProp}},`);
  } else if (getNode?.type === SyntaxType.Getter) {
    entries.push(`${iProp}get: this.${getNode.text},`);
  } else {
    entries.push(`${iProp}get: null,`);
  }

  if (setNode?.type === SyntaxType.SetBody) {
    const body = setNode.childForFieldName('body');
    const params = setNode.namedChildren.find(
      (c) => c.type === SyntaxType.Parameters,
    );
    const paramName =
      params?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
        ?.text ?? 'value';
    const savedLocals = new Set(ctx.localVars);
    ctx.localVars.add(paramName);
    const bodyStr = body ? emitBody(body, ctx, 3) : '';
    ctx.localVars = savedLocals;
    entries.push(`${iProp}set: (${paramName}) => {`);
    if (bodyStr) entries.push(bodyStr);
    entries.push(`${iProp}},`);
  } else if (setNode?.type === SyntaxType.Setter) {
    entries.push(`${iProp}set: this.${setNode.text},`);
  } else {
    entries.push(`${iProp}set: null,`);
  }

  // Emit an explicit property type annotation. Without it, TS7022 fires
  // because the inline get/set arrow functions reference `this.<name>`
  // inside the initializer, creating a binding-resolution cycle. The
  // annotation breaks the cycle (TS knows the field's type independent of
  // the initializer) and also provides the contextual type for `gd.getset`,
  // so the explicit `<T>` generic is not emitted.
  lines.push(`${decorators}${indent}${staticPrefix}${name}: ${tsType} = gd.getset({`);
  lines.push(...entries);
  lines.push(`${indent}});`);

  return lines.join('\n');
}


function emitConstStatement(node: SyntaxNode, ctx: GdToTsContext): string {
  const name = node.childForFieldName('name')?.text ?? '';
  const typeNode = node.childForFieldName('type');
  const valueNode = node.childForFieldName('value');

  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  // GDScript const -> TS static readonly
  return `  static readonly ${name}${typeAnnotation}${init};`;
}

function emitLocalVariable(
  node: SyntaxNode,
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

  const typeAnnotation = typeNode ? emitTypeAnnotation(typeNode, ctx) : '';
  const init = valueNode ? ` = ${emitExpr(valueNode, ctx)}` : '';

  return `${indent}let ${name}${typeAnnotation}${init};`;
}

// ─── Type Annotations ─────────────────────────────────────────

function emitTypeAnnotation(typeNode: SyntaxNode, ctx: GdToTsContext): string {
  if (typeNode.type === SyntaxType.InferredType) {
    return ''; // := inferred — omit type in TS
  }
  if (typeNode.type === SyntaxType.Type) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    // Qualify class-level enum/inner class types: State → ClassName.State
    if (ctx.classTypeNames.has(inner)) {
      return `: ${ctx.className}.${inner}`;
    }
    const tsType = gdTypeToTs(inner);
    return tsType ? `: ${tsType}` : '';
  }
  const raw = typeNode.text;
  if (ctx.classTypeNames.has(raw)) {
    return `: ${ctx.className}.${raw}`;
  }
  const tsType = gdTypeToTs(raw);
  return tsType ? `: ${tsType}` : '';
}

// ─── Annotations / Decorators ─────────────────────────────────

function getAnnotations(node: SyntaxNode): SyntaxNode[] {
  const annotations: SyntaxNode[] = [];
  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.Annotations) {
      for (const ann of child.namedChildren) {
        if (ann.type === SyntaxType.Annotation) {
          annotations.push(ann);
        }
      }
    }
  }
  return annotations;
}

function emitAnnotationAsDecorator(node: SyntaxNode, ctx: GdToTsContext): string {
  // Annotation text is like "@export" or "@onready" or "@export_range(0, 100)"
  const text = node.text;
  const match = text.match(/^@(\w+)(?:\((.+)\))?$/);
  if (!match) return `// ${text}`;

  const name = match[1]!;
  const args = match[2];

  // GDScript @export → TS @exports (avoids TS keyword conflict)
  const tsName = name === 'export' ? 'exports' : name;

  if (args) {
    return `@${tsName}(${args})`;
  }
  // Parameterized annotations need () even when called without args in GD
  if (!ctx.registry.isBareAnnotation(name)) {
    return `@${tsName}()`;
  }
  return `@${tsName}`;
}

// ─── Functions ────────────────────────────────────────────────

function emitFunction(node: SyntaxNode, ctx: GdToTsContext, isAbstract = false): string {
  const name = node.childForFieldName('name')?.text ?? 'unknown';
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  // Check for @abstract annotation as child (inner class context)
  const annotations = getAnnotations(node);
  const childAbstract = annotations.some(
    (ann) => ann.text === '@abstract',
  );

  // Create local scope for this function
  const savedLocals = ctx.localVars;
  const savedLocalTypes = ctx.localVarTypes;
  const savedMethodName = ctx.currentMethodName;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  ctx.currentMethodName = name;
  collectParamNames(paramsNode, ctx);

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode, ctx) : '';

  // Root-level abstract (passed from emitSourceFile): native TS abstract keyword, no body
  if (isAbstract) {
    ctx.localVars = savedLocals;
    ctx.localVarTypes = savedLocalTypes;
    ctx.currentMethodName = savedMethodName;
    return `  abstract ${name}(${params})${returnType};`;
  }

  // Child annotation @abstract (inner class): use @abstract decorator
  if (childAbstract) {
    const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
    ctx.localVars = savedLocals;
    ctx.localVarTypes = savedLocalTypes;
    ctx.currentMethodName = savedMethodName;
    if (body) {
      return `  @abstract\n  ${name}(${params})${returnType} {\n${body}\n  }`;
    }
    return `  @abstract\n  ${name}(${params})${returnType} {\n  }`;
  }

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

function emitConstructor(node: SyntaxNode, ctx: GdToTsContext): string {
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
  paramsNode: SyntaxNode | null,
  ctx: GdToTsContext,
): void {
  if (!paramsNode) return;
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.Identifier) {
      ctx.localVars.add(child.text);
    } else if (
      child.type === SyntaxType.TypedParameter ||
      child.type === SyntaxType.DefaultParameter ||
      child.type === SyntaxType.TypedDefaultParameter
    ) {
      const name = child.namedChildren.find((c) =>
        c.type === SyntaxType.Identifier,
      )?.text;
      if (name) {
        ctx.localVars.add(name);
        // Track param type for operator overload inference
        const typeNode = child.childForFieldName('type');
        if (typeNode) {
          const typeName = extractGdTypeName(typeNode);
          if (typeName) ctx.localVarTypes.set(name, typeName);
        }
      }
    } else if (child.type === SyntaxType.VariadicParameter) {
      // Variadic param: `...args` or `...args: Array` — inner child holds the name
      const inner = child.namedChildren.find(
        (c) =>
          c.type === SyntaxType.Identifier ||
          c.type === SyntaxType.TypedParameter,
      );
      const name =
        inner?.type === SyntaxType.Identifier
          ? inner.text
          : inner?.namedChildren.find((c) => c.type === SyntaxType.Identifier)
              ?.text;
      if (name) ctx.localVars.add(name);
    }
  }
}

function emitParams(paramsNode: SyntaxNode, ctx: GdToTsContext): string {
  // Look up signal handler info for the current method (if any)
  const handlerInfo = ctx.currentMethodName
    ? ctx.signalHandlers.get(ctx.currentMethodName)
    : undefined;

  const params: string[] = [];
  let paramIndex = 0;
  for (const child of paramsNode.namedChildren) {
    if (child.type === SyntaxType.Identifier) {
      // Untyped param — use signal handler type if available
      if (handlerInfo && paramIndex < handlerInfo.params.length) {
        const sigParam = handlerInfo.params[paramIndex]!;
        const tsType = gdTypeToTs(sigParam.gdType);
        params.push(tsType ? `${child.text}: ${tsType}` : child.text);
      } else {
        params.push(child.text);
      }
      paramIndex++;
    } else if (child.type === SyntaxType.TypedParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const rawType = typeNode?.text ?? '';
      const tsType = ctx.classTypeNames.has(rawType) ? `${ctx.className}.${rawType}` : (typeNode ? gdTypeToTs(rawType) : null);
      params.push(tsType ? `${name}: ${tsType}` : name);
      paramIndex++;
    } else if (child.type === SyntaxType.DefaultParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const value = child.childForFieldName('value');
      const valueStr = value ? emitExpr(value, ctx) : '';
      params.push(`${name} = ${valueStr}`);
      paramIndex++;
    } else if (child.type === SyntaxType.TypedDefaultParameter) {
      const name =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const typeNode = child.childForFieldName('type');
      const value = child.childForFieldName('value');
      const rawType = typeNode?.text ?? '';
      const tsType = ctx.classTypeNames.has(rawType) ? `${ctx.className}.${rawType}` : (typeNode ? gdTypeToTs(rawType) : null);
      const valueStr = value ? emitExpr(value, ctx) : '';
      const typeStr = tsType ? `: ${tsType}` : '';
      params.push(`${name}${typeStr} = ${valueStr}`);
      paramIndex++;
    } else if (child.type === SyntaxType.VariadicParameter) {
      // Variadic: `...args` → `...args: any[]`, `...args: Array` → `...args: Array<unknown>`
      const inner = child.namedChildren.find(
        (c) =>
          c.type === SyntaxType.Identifier ||
          c.type === SyntaxType.TypedParameter,
      );
      if (inner?.type === SyntaxType.Identifier) {
        params.push(`...${inner.text}: any[]`);
      } else if (inner?.type === SyntaxType.TypedParameter) {
        const name =
          inner.namedChildren.find((c) => c.type === SyntaxType.Identifier)
            ?.text ?? '';
        const typeNode = inner.childForFieldName('type');
        const rawType = typeNode?.text ?? '';
        const tsType = gdTypeToTs(rawType);
        // GDScript varargs always collect into an Array. The mapped TS type
        // for `Array` is already `Array<unknown>`, so use it directly.
        // For any other type, it's already an array-like form.
        params.push(`...${name}: ${tsType ?? 'any[]'}`);
      }
      paramIndex++;
    }
  }
  return params.join(', ');
}

function emitReturnType(typeNode: SyntaxNode, ctx: GdToTsContext): string {
  if (typeNode.type === SyntaxType.Type) {
    const inner = typeNode.namedChildren[0]?.text ?? typeNode.text;
    if (ctx.classTypeNames.has(inner)) {
      return `: ${ctx.className}.${inner}`;
    }
    const tsType = gdTypeToTs(inner);
    return tsType ? `: ${tsType}` : '';
  }
  const raw = typeNode.text;
  if (ctx.classTypeNames.has(raw)) {
    return `: ${ctx.className}.${raw}`;
  }
  const tsType = gdTypeToTs(raw);
  return tsType ? `: ${tsType}` : '';
}

// ─── Body / Statements ────────────────────────────────────────

function emitBody(node: SyntaxNode, ctx: GdToTsContext, depth: number): string {
  const indent = '  '.repeat(depth);
  const lines: string[] = [];

  for (const child of node.namedChildren) {
    if (child.type === SyntaxType.Comment) {
      lines.push(`${indent}${emitCommentInline(child)}`);
      continue;
    }

    if (child.type === SyntaxType.ExpressionStatement) {
      const expr = child.namedChildren[0];
      if (expr) {
        // Triple-quoted string as standalone expression → block comment
        if (expr.type === SyntaxType.String && (expr.text.startsWith('"""') || expr.text.startsWith("'''"))) {
          lines.push(emitBlockComment(expr.text, indent));
          continue;
        }
        if (expr.type === SyntaxType.Assignment) {
          lines.push(`${indent}${emitAssignment(expr, ctx)};`);
        } else if (expr.type === SyntaxType.AugmentedAssignment) {
          lines.push(`${indent}${emitAugmentedAssignment(expr, ctx)};`);
        } else {
          lines.push(`${indent}${emitExpr(expr, ctx)};`);
        }
      }
      continue;
    }

    if (child.type === SyntaxType.ReturnStatement) {
      const value = child.namedChildren[0];
      lines.push(
        value ? `${indent}return ${emitExpr(value, ctx)};` : `${indent}return;`,
      );
      continue;
    }

    if (child.type === SyntaxType.VariableStatement) {
      lines.push(emitLocalVariable(child, ctx, indent));
      continue;
    }

    if (child.type === SyntaxType.IfStatement) {
      lines.push(emitIfStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.ForStatement) {
      lines.push(emitForStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.WhileStatement) {
      lines.push(emitWhileStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.MatchStatement) {
      lines.push(emitMatchStatement(child, ctx, depth));
      continue;
    }

    if (child.type === SyntaxType.PassStatement) {
      // Skip pass in TS
      continue;
    }

    if (child.type === SyntaxType.BreakStatement) {
      lines.push(`${indent}break;`);
      continue;
    }

    if (child.type === SyntaxType.ContinueStatement) {
      lines.push(`${indent}continue;`);
      continue;
    }

    // Annotations inside function bodies → // @gd.eval: magic comments
    if (child.type === SyntaxType.Annotation) {
      lines.push(`${indent}// @gd.eval: ${child.text}`);
      continue;
    }

    ctx.diagnostics.push({
      message: `Unhandled GDScript statement: ${child.type}`,
      severity: 'error',
      file: ctx.filePath,
      line: child.startPosition.row + 1,
      column: child.startPosition.column,
    });
    lines.push(`${indent}/* ERROR: Unhandled GDScript statement: ${child.type} */ ${child.text.split('\n')[0]}`);
  }

  return lines.join('\n');
}

// ─── Control Flow ─────────────────────────────────────────────

function emitIfStatement(
  node: SyntaxNode,
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
    if (alt.type === SyntaxType.ElifClause) {
      const elifCond = alt.childForFieldName('condition');
      const elifBody = alt.childForFieldName('body');
      const elifCondStr = elifCond ? emitExpr(elifCond, ctx) : 'true';
      result += ` else if (${elifCondStr}) {\n`;
      if (elifBody) result += emitBody(elifBody, ctx, depth + 1);
      result += `\n${indent}}`;
    } else if (alt.type === SyntaxType.ElseClause) {
      const elseBody = alt.childForFieldName('body');
      result += ` else {\n`;
      if (elseBody) result += emitBody(elseBody, ctx, depth + 1);
      result += `\n${indent}}`;
    }
  }

  return result;
}

function emitForStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const body = node.childForFieldName('body');

  const varName = left?.text ?? 'item';

  // In `for x in a + b + c`, `+` is always array concatenation → gd.ops.add (recursive)
  function emitArrayConcat(node: SyntaxNode): string {
    if (node.type === SyntaxType.BinaryOperator) {
      const opNode = node.children.find(c => !c.isNamed);
      if (opNode?.text === '+') {
        const lhs = node.childForFieldName('left');
        const rhs = node.childForFieldName('right');
        return `gd.ops.add(${lhs ? emitArrayConcat(lhs) : ''}, ${rhs ? emitExpr(rhs, ctx) : ''})`;
      }
    }
    return emitExpr(node, ctx);
  }
  const iterable = right ? emitArrayConcat(right) : '[]';

  const bodyStr = body ? emitBody(body, ctx, depth + 1) : '';

  return `${indent}for (let ${varName} of ${iterable}) {\n${bodyStr}\n${indent}}`;
}

function emitWhileStatement(
  node: SyntaxNode,
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

/**
 * Check whether a match statement can be expressed as a plain TS `switch`:
 *  - Every PatternSection uses only "simple" patterns (literals/expressions/
 *    wildcard), never Arrays, Dictionaries, pattern bindings, or guards.
 *  - Multi-pattern sections (`1, 2, 3:`) are allowed — they become
 *    fall-through `case` labels.
 */
function isSimpleMatchStatement(bodyNode: SyntaxNode): boolean {
  for (const section of bodyNode.namedChildren) {
    if (section.type !== SyntaxType.PatternSection) continue;
    const patterns = section.namedChildren.filter(
      (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
    );
    const hasGuard = section.namedChildren.some(
      (c) => c.type === SyntaxType.PatternGuard,
    );
    if (hasGuard) return false;
    for (const p of patterns) {
      if (
        p.type === SyntaxType.Array ||
        p.type === SyntaxType.Dictionary ||
        p.type === SyntaxType.PatternBinding
      ) {
        return false;
      }
      // Any nested pattern bindings also disqualify
      const bindings: string[] = [];
      collectBindings(p, bindings);
      if (bindings.length > 0) return false;
    }
  }
  return true;
}

function emitSimpleMatchAsSwitch(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const iCase = indent + '  ';
  const iBody = indent + '    ';
  const value = node.childForFieldName('value');
  const bodyNode = node.childForFieldName('body');
  const valueStr = value ? emitExpr(value, ctx) : '';
  let result = `${indent}switch (${valueStr}) {\n`;

  if (bodyNode) {
    for (const section of bodyNode.namedChildren) {
      if (section.type !== SyntaxType.PatternSection) continue;

      const body = section.childForFieldName('body');
      const patterns = section.namedChildren.filter(
        (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
      );

      // Emit case/default labels (one per pattern for fall-through)
      for (const p of patterns) {
        if (p.type === SyntaxType.Identifier && p.text === '_') {
          result += `${iCase}default:\n`;
        } else {
          result += `${iCase}case ${emitExpr(p, ctx)}:\n`;
        }
      }

      // Emit body statements, then `break;`
      const bodyStr = body ? emitBody(body, ctx, depth + 2) : '';
      if (bodyStr) result += `${bodyStr}\n`;
      result += `${iBody}break;\n`;
    }
  }

  result += `${indent}}`;
  return result;
}

function emitMatchStatement(
  node: SyntaxNode,
  ctx: GdToTsContext,
  depth: number,
): string {
  const indent = '  '.repeat(depth);
  const i1 = indent + '  '; // cases array indent
  const i2 = indent + '    '; // case object indent
  const i3 = indent + '      '; // do() body indent
  const value = node.childForFieldName('value');
  const bodyNode = node.childForFieldName('body');

  // If all sections use only simple patterns, emit a plain TS `switch`.
  // The TS→GD converter already handles `switch` → `match` in reverse.
  if (bodyNode && isSimpleMatchStatement(bodyNode)) {
    return emitSimpleMatchAsSwitch(node, ctx, depth);
  }

  const valueStr = value ? emitExpr(value, ctx) : '';
  let result = `${indent}gd.match(${valueStr}, [\n`;

  if (bodyNode) {
    for (const section of bodyNode.namedChildren) {
      if (section.type !== SyntaxType.PatternSection) continue;

      const body = section.childForFieldName('body');
      // Patterns are all named children except body and pattern_guard
      const patterns = section.namedChildren.filter(
        (c) => c.type !== SyntaxType.Body && c.type !== SyntaxType.PatternGuard,
      );
      const guard = section.namedChildren.find((c) =>
        c.type === SyntaxType.PatternGuard,
      );

      // Collect all pattern_binding names from all patterns
      const bindings: string[] = [];
      for (const p of patterns) {
        collectBindings(p, bindings);
      }

      const hasBindings = bindings.length > 0;
      const hasGuard = !!guard;
      const isMultiPattern =
        patterns.length > 1 && !hasBindings && !hasGuard;

      // Add pattern bindings to local scope so they don't get this. prefix
      const savedLocals = new Set(ctx.localVars);
      for (const b of bindings) ctx.localVars.add(b);

      // Emit do: () => {} body (arrow function preserves outer `this`)
      const bodyStr = body ? emitBody(body, ctx, depth + 3) : '';
      const doBlock = `do: () => {\n${bodyStr}\n${i2}}`;

      if (isMultiPattern) {
        // Multiple patterns: { matchMany: [...], do() { ... } }
        const patternStrs = patterns.map((p) => emitMatchPattern(p, ctx));
        result += `${i1}{\n`;
        result += `${i2}matchMany: [${patternStrs.join(', ')}],\n`;
        result += `${i2}${doBlock},\n`;
        result += `${i1}},\n`;
      } else if (hasBindings || hasGuard) {
        // Arrow function: (bindings...) => ({ match: ..., when?: ..., do() { ... } })
        const patternStr = emitMatchPattern(patterns[0]!, ctx);
        result += `${i1}(${bindings.join(', ')}) => ({\n`;
        result += `${i2}match: ${patternStr},\n`;
        if (hasGuard) {
          const guardExpr = guard!.namedChildren[0];
          const guardStr = guardExpr ? emitExpr(guardExpr, ctx) : 'true';
          result += `${i2}when: ${guardStr},\n`;
        }
        result += `${i2}${doBlock},\n`;
        result += `${i1}}),\n`;
      } else {
        // Simple object: { match: ..., do() { ... } }
        const pattern = patterns[0];
        const patternStr = pattern
          ? emitMatchPattern(pattern, ctx)
          : 'undefined';
        result += `${i1}{\n`;
        result += `${i2}match: ${patternStr},\n`;
        result += `${i2}${doBlock},\n`;
        result += `${i1}},\n`;
      }

      // Restore local scope
      ctx.localVars = savedLocals;
    }
  }

  result += `${indent}]);`;
  return result;
}

/** Collect all pattern_binding identifier names from a pattern tree */
function collectBindings(node: SyntaxNode, bindings: string[]): void {
  if (node.type === SyntaxType.PatternBinding) {
    const ident = node.namedChildren[0];
    if (ident) bindings.push(ident.text);
    return;
  }
  for (const child of node.namedChildren) {
    collectBindings(child, bindings);
  }
}

/** Emit a match pattern as a TypeScript expression for use inside gd.match() */
function emitMatchPattern(node: SyntaxNode, ctx: GdToTsContext): string {
  // Wildcard: _ → undefined
  if (node.type === SyntaxType.Identifier && node.text === '_') {
    return 'undefined';
  }

  // Binding: var name → just the name (it becomes an arrow param)
  if (node.type === SyntaxType.PatternBinding) {
    const ident = node.namedChildren[0];
    return ident ? ident.text : 'undefined';
  }

  // Array pattern: [elem1, elem2, ..]
  if (node.type === SyntaxType.Array) {
    const elements: string[] = [];
    let hasOpenEnding = false;
    for (const child of node.namedChildren) {
      if (child.type === SyntaxType.PatternOpenEnding) {
        hasOpenEnding = true;
        continue;
      }
      elements.push(emitMatchPattern(child, ctx));
    }
    if (hasOpenEnding) {
      return `[${elements.join(', ')}, ...[]]`;
    }
    return `[${elements.join(', ')}]`;
  }

  // Dictionary pattern: {key: value, ..} or {key1, key2}
  if (node.type === SyntaxType.Dictionary) {
    const entries: string[] = [];
    let hasOpenEnding = false;
    for (const child of node.namedChildren) {
      if (child.type === SyntaxType.PatternOpenEnding) {
        hasOpenEnding = true;
        continue;
      }
      if (child.type === SyntaxType.Pair) {
        const left = child.childForFieldName('left');
        const value = child.childForFieldName('value');
        // Key: strip quotes for object key
        let key: string;
        if (left && left.type === SyntaxType.String) {
          key = left.text.slice(1, -1); // remove quotes
        } else {
          key = left ? emitExpr(left, ctx) : '';
        }
        // Value: may be a pattern_binding or regular value
        const valStr = value ? emitMatchPattern(value, ctx) : 'undefined';
        entries.push(`${key}: ${valStr}`);
      } else if (child.type === SyntaxType.String) {
        // Bare string in dict like {"name", "age"} → name: undefined
        const key = child.text.slice(1, -1);
        entries.push(`${key}: undefined`);
      }
    }
    const inner = entries.join(', ');
    if (hasOpenEnding) {
      return `{ ${inner}, ...{} }`;
    }
    return `{ ${inner} }`;
  }

  // Everything else: use regular expression emitter
  return emitExpr(node, ctx);
}

// ─── Assignment ───────────────────────────────────────────────

function emitAssignment(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const leftStr = left ? emitExpr(left, ctx) : '';
  const rightStr = right ? emitExpr(right, ctx) : '';
  return `${leftStr} = ${rightStr}`;
}

function emitAugmentedAssignment(node: SyntaxNode, ctx: GdToTsContext): string {
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

function emitExpr(node: SyntaxNode, ctx: GdToTsContext): string {
  if (node.type === SyntaxType.Identifier) {
    if (node.text === 'self') return 'this';
    if (node.text === 'null') return 'null';
    if (node.text === 'true') return 'true';
    if (node.text === 'false') return 'false';
    // If identifier is a known class member AND not a local variable, prefix with this/ClassName
    if (ctx.classMembers.has(node.text) && !ctx.localVars.has(node.text)) {
      return `this.${node.text}`;
    }
    // Global enum constant → qualified name (e.g. KEY_F21 → Key.KEY_F21)
    const enumQualified = ctx.globalEnumMap.get(node.text);
    if (enumQualified) return enumQualified;
    return node.text;
  }

  if (node.type === SyntaxType.Integer || node.type === SyntaxType.Float) {
    return node.text;
  }

  if (node.type === SyntaxType.String) {
    return node.text;
  }

  if (node.type === SyntaxType.True) return 'true';
  if (node.type === SyntaxType.False) return 'false';
  if (node.type === SyntaxType.Null) return 'null';

  if (node.type === SyntaxType.Call) {
    return emitCall(node, ctx);
  }

  if (node.type === SyntaxType.Attribute) {
    return emitAttribute(node, ctx);
  }

  if (node.type === SyntaxType.BinaryOperator) {
    // Check for %"UniqueNode"/Child pattern — tree-sitter parses / as division
    const uniqueNodePath = tryEmitUniqueNodePath(node);
    if (uniqueNodePath !== null) {
      return `this.get_node("${uniqueNodePath.path}")${uniqueNodePath.suffix}`;
    }
    return emitBinaryOp(node, ctx);
  }

  if (node.type === SyntaxType.UnaryOperator) {
    return emitUnaryOp(node, ctx);
  }

  if (node.type === SyntaxType.StringName) {
    const strChild = node.namedChildren.find((c) => c.type === SyntaxType.String);
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

  if (node.type === SyntaxType.NodePath) {
    const text = node.text;
    const content = text.slice(2, -1);
    return `NodePath('${content}')`;
  }

  if (node.type === SyntaxType.GetNode) {
    // $Path -> this.get_node("Path")
    // $"Path/To/Node" -> this.get_node("Path/To/Node")
    // %UniqueNode -> this.get_node("%UniqueNode")
    // %"UniqueNode" -> this.get_node("%UniqueNode")
    const text = node.text;
    if (text.startsWith('%"')) {
      // %"UniqueNode" -> get_node("%UniqueNode")
      const name = text.slice(2, -1);
      return `this.get_node("%${name}")`;
    } else if (text.startsWith('%')) {
      // %UniqueNode -> get_node("%UniqueNode")
      const name = text.slice(1);
      return `this.get_node("%${name}")`;
    } else if (text.startsWith('$"')) {
      // $"Path/To/Node" -> get_node("Path/To/Node")
      const path = text.slice(2, -1);
      return `this.get_node("${path}")`;
    } else {
      // $Path -> get_node("Path")
      const path = text.slice(1);
      return `this.get_node("${path}")`;
    }
  }

  if (node.type === SyntaxType.Array) {
    const elements = node.namedChildren.map((e) => emitExpr(e, ctx)).join(', ');
    return `[${elements}]`;
  }

  if (node.type === SyntaxType.Dictionary) {
    const pairNodes = node.namedChildren.filter((c) => c.type === SyntaxType.Pair);
    // Check if any key is an identifier (variable reference, not string/number literal)
    const hasIdentifierKey = pairNodes.some((p) => {
      const key = p.childForFieldName('left');
      return key && key.type === SyntaxType.Identifier;
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
    // Check if any key is an expression (binary_operator, subscript, attribute, etc.)
    const hasExpressionKey = pairNodes.some((p) => {
      const key = p.childForFieldName('left');
      return key && key.type !== SyntaxType.String && key.type !== SyntaxType.Integer && key.type !== SyntaxType.Float;
    });
    if (hasExpressionKey) {
      // Use computed property syntax for expression keys
      const pairs = pairNodes.map((p) => {
        const key = p.childForFieldName('left');
        const value = p.childForFieldName('value');
        const keyStr = key ? emitExpr(key, ctx) : '';
        const valStr = value ? emitExpr(value, ctx) : '';
        // Wrap non-literal keys in [...]
        const isLiteral = key && (key.type === SyntaxType.String || key.type === SyntaxType.Integer || key.type === SyntaxType.Float);
        return isLiteral ? `${keyStr}: ${valStr}` : `[${keyStr}]: ${valStr}`;
      });
      return `{\n${pairs.map((p) => `      ${p},`).join('\n')}\n    }`;
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

  if (node.type === SyntaxType.ConditionalExpression) {
    // GD: value if cond else other -> TS: cond ? value : other
    const left = node.childForFieldName('left');
    const condition = node.childForFieldName('condition');
    const right = node.childForFieldName('right');
    if (left && condition && right) {
      return `${emitExpr(condition, ctx)} ? ${emitExpr(left, ctx)} : ${emitExpr(right, ctx)}`;
    }
    return node.text;
  }

  if (node.type === SyntaxType.AwaitExpression) {
    const expr = node.namedChildren[0];
    return `await ${expr ? emitExpr(expr, ctx) : ''}`;
  }

  if (node.type === SyntaxType.ParenthesizedExpression) {
    const inner = node.namedChildren[0];
    return inner ? `(${emitExpr(inner, ctx)})` : '()';
  }

  if (node.type === SyntaxType.Subscript) {
    // obj[key]
    const obj = node.namedChildren[0];
    const argsNode = node.childForFieldName('arguments');
    const key = argsNode?.namedChildren[0];
    return `${obj ? emitExpr(obj, ctx) : ''}[${key ? emitExpr(key, ctx) : ''}]`;
  }

  if (node.type === SyntaxType.Lambda) {
    return emitLambda(node, ctx);
  }

  // Inline comment in expression context — emit as trailing comment
  if (node.type === SyntaxType.Comment) {
    const content = node.text.startsWith('##')
      ? node.text.slice(2).trim()
      : node.text.slice(1).trim();
    return `/* ${content} */`;
  }

  // Fallback: return raw text with warning
  ctx.diagnostics.push({
    message: `Unhandled GDScript expression: ${node.type}`,
    severity: 'error',
    file: ctx.filePath,
    line: node.startPosition.row + 1,
    column: node.startPosition.column,
  });
  return `/* ERROR: Unhandled GDScript expression: ${node.type} */ ${node.text}`;
}

// ─── Call Expression ──────────────────────────────────────────

function emitCall(node: SyntaxNode, ctx: GdToTsContext): string {
  // call node: first named child is callee, 'arguments' field has args
  const callee = node.namedChildren[0];
  const argsNode = node.childForFieldName('arguments');
  const args = argsNode
    ? argsNode.namedChildren.map((a) => emitExpr(a, ctx)).join(', ')
    : '';

  if (!callee) return `(${args})`;

  // GDScript super() → TS super.methodName() (or super() in constructors)
  if (callee.type === SyntaxType.Identifier && callee.text === 'super') {
    if (ctx.currentMethodName && ctx.currentMethodName !== 'constructor') {
      return `super.${ctx.currentMethodName}(${args})`;
    }
    return `super(${args})`;
  }

  // For bare identifier calls: add this. prefix for known class members
  if (
    callee.type === SyntaxType.Identifier &&
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

function emitAttribute(node: SyntaxNode, ctx: GdToTsContext): string {
  // attribute node children: [object, ".", name] or [object, ".", attribute_call]
  const children = node.namedChildren;
  if (children.length === 0) return node.text;

  const parts: string[] = [];
  let selfSeen = false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i]!;

    // `self` at the start of an attribute chain becomes `this` (or ClassName for static members)
    if (i === 0 && child.type === SyntaxType.Identifier && child.text === 'self') {
      // Look ahead to see if the next part is a static member
      const nextChild = children[i + 1];
      const nextName =
        nextChild && nextChild.type === SyntaxType.Identifier
          ? nextChild.text
          : '';
      parts.push('this');
      selfSeen = true;
      continue;
    }

    if (child.type === SyntaxType.AttributeCall) {
      // method call on attribute: obj.method(args)
      const methodName =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
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
    } else if (child.type === SyntaxType.AttributeSubscript) {
      const attrName =
        child.namedChildren.find((c) => c.type === SyntaxType.Identifier)?.text ??
        '';
      const argsNode = child.childForFieldName('arguments');
      const key = argsNode?.namedChildren[0];
      parts.push(`${attrName}[${key ? emitExpr(key, ctx) : ''}]`);
    } else if (child.type === SyntaxType.Identifier) {
      // After self or for property access, use raw identifier (no this. prefix)
      parts.push(child.text);
    } else {
      parts.push(emitExpr(child, ctx));
    }
  }

  // If the first part is a known class member, not shadowed by a local variable, and no self was used, prefix with this
  if (!selfSeen && parts.length >= 1 && ctx.classMembers.has(parts[0]!) && !ctx.localVars.has(parts[0]!)) {
    parts.unshift('this');
  }

  return parts.join('.');
}

// ─── Binary / Unary Operators ─────────────────────────────────

/** Comparison operators where GDScript `not` has lower precedence than the op,
 *  but tree-sitter-gdscript incorrectly parses `not X op Y` as `(not X) op Y`.
 *  In real GDScript, `not a == 0` means `not (a == 0)`. */
const NOT_LIFT_OPS = new Set(['==', '!=', '<', '>', '<=', '>=', 'in', 'is']);

/** GDScript primitive types that use `gd.is()` instead of `instanceof` */
const GD_IS_PRIMITIVE_TYPES = new Set(['int', 'float', 'bool', 'String']);

/**
 * Detect %"UniqueNode"/Child or %UniqueNode/Child patterns.
 * Tree-sitter parses the `/` as a binary division operator.
 * Returns { path, suffix } where path is e.g. "%UniqueNode/Child" and suffix is
 * any trailing attribute chain (e.g. ".text" from `%"UniqueNode"/Child.text`), or null.
 */
function tryEmitUniqueNodePath(node: SyntaxNode): { path: string; suffix: string } | null {
  const opNode = node.childForFieldName('op');
  if (!opNode || opNode.text !== '/') return null;

  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  if (!left || !right) return null;

  // Collect path segments: left may be another binary_operator with / or a get_node
  let basePath: string | null = null;
  let baseSuffix = '';
  if (left.type === SyntaxType.GetNode && left.text.startsWith('%')) {
    // %"UniqueNode" or %UniqueNode
    const text = left.text;
    if (text.startsWith('%"')) {
      basePath = `%${text.slice(2, -1)}`;
    } else {
      basePath = `%${text.slice(1)}`;
    }
  } else if (left.type === SyntaxType.BinaryOperator) {
    // Nested: %"UniqueNode"/Child/Grandchild
    const result = tryEmitUniqueNodePath(left);
    if (result) {
      basePath = result.path;
      baseSuffix = result.suffix;
    }
  }

  if (basePath === null) return null;

  // Right side: identifier (the child name) or attribute (Child.text → path + ".text")
  if (right.type === SyntaxType.Identifier) {
    return { path: `${basePath}/${right.text}`, suffix: baseSuffix };
  }
  if (right.type === SyntaxType.Attribute) {
    // Extract leading identifier as path component, rest becomes suffix
    // e.g. "Child.text" → path component "Child", suffix ".text"
    const firstChild = right.namedChildren[0];
    if (firstChild && firstChild.type === SyntaxType.Identifier) {
      const pathPart = firstChild.text;
      // The rest of the attribute text after the first identifier
      const attrSuffix = right.text.slice(firstChild.text.length);
      return { path: `${basePath}/${pathPart}`, suffix: baseSuffix + attrSuffix };
    }
  }

  return null;
}

function emitBinaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const left = node.childForFieldName('left');
  const right = node.childForFieldName('right');
  const opNode = node.childForFieldName('op');
  const opText =
    opNode?.text ?? node.children.find((c) => !c.isNamed)?.text ?? '??';

  // GD `is not` -> !(... instanceof ...) or !gd.is<T>(...) for primitives
  // tree-sitter parses `x is not Y` as binary_operator with children: x, "is", "not", Y
  if (opText === 'is') {
    const anonymousChildren = node.children.filter((c) => !c.isNamed);
    const hasNot = anonymousChildren.some((c) => c.text === 'not');
    if (hasNot) {
      const leftStr = left ? emitExpr(left, ctx) : '';
      const rightStr = right?.text ?? '';
      if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
        return `!gd.is(${leftStr}, ${rightStr})`;
      }
      return `!(${leftStr} instanceof ${rightStr})`;
    }
  }

  // Fix tree-sitter-gdscript precedence bug: `not X op Y` is parsed as
  // `(not X) op Y` but GDScript evaluates it as `not (X op Y)`.
  // Lift the `not` to wrap the entire comparison.
  if (
    NOT_LIFT_OPS.has(opText) &&
    left &&
    left.type === SyntaxType.UnaryOperator
  ) {
    const unaryOp = left.children.find((c) => !c.isNamed)?.text;
    if (unaryOp === 'not') {
      const innerLeft = left.namedChildren[0];
      const innerLeftStr = innerLeft ? emitExpr(innerLeft, ctx) : '';
      const rightStr = right ? emitExpr(right, ctx) : '';
      // Rebuild the comparison without `not`, then wrap with `!(...)`
      const gdToTsOp: Record<string, string> = {
        '==': '===',
        '!=': '!==',
      };
      const tsOp = gdToTsOp[opText] ?? opText;
      if (opText === 'is') {
        if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
          return `!gd.is(${innerLeftStr}, ${rightStr})`;
        }
        return `!(${innerLeftStr} instanceof ${rightStr})`;
      }
      return `!(${innerLeftStr} ${tsOp} ${rightStr})`;
    }
  }

  // GD `as` -> gd.as()
  if (opText === 'as') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    return `gd.as(${leftStr}, ${rightStr})`;
  }

  // GD `is` -> instanceof for classes, gd.is<T>() for primitives
  if (opText === 'is') {
    const leftStr = left ? emitExpr(left, ctx) : '';
    const rightStr = right?.text ?? '';
    if (GD_IS_PRIMITIVE_TYPES.has(rightStr)) {
      return `gd.is(${leftStr}, ${rightStr})`;
    }
    return `${leftStr} instanceof ${rightStr}`;
  }

  // Check if this is an arithmetic op on operator-overloaded types (Vector2, Color, etc.)
  const mathFn = GD_OPS_MAP[opText];
  if (mathFn && left) {
    const leftType = inferExprType(left, ctx);
    if (leftType && ctx.registry.hasOperators(leftType)) {
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

function emitUnaryOp(node: SyntaxNode, ctx: GdToTsContext): string {
  const operand = node.namedChildren[0];
  const op = node.children.find((c) => !c.isNamed)?.text ?? '';
  const tsOp = op === 'not' ? '!' : op;
  const operandStr = operand ? emitExpr(operand, ctx) : '';
  // `not X is Y` → `!(X instanceof Y)` — needs parens so `!` applies to the whole expression
  if (tsOp === '!' && operand?.type === SyntaxType.BinaryOperator) {
    return `!(${operandStr})`;
  }
  return `${tsOp}${operandStr}`;
}

// ─── Lambda ───────────────────────────────────────────────────

function emitLambda(node: SyntaxNode, ctx: GdToTsContext): string {
  const paramsNode = node.childForFieldName('parameters');
  const returnTypeNode = node.childForFieldName('return_type');
  const bodyNode = node.childForFieldName('body');

  // Register lambda params in scope for type inference (e.g. operator overload detection)
  const savedLocalVars = new Set(ctx.localVars);
  const savedLocalVarTypes = new Map(ctx.localVarTypes);
  collectParamNames(paramsNode, ctx);

  const params = paramsNode ? emitParams(paramsNode, ctx) : '';
  const returnType = returnTypeNode ? emitReturnType(returnTypeNode, ctx) : '';

  let result: string;

  // Check if body is a single return expression
  if (bodyNode && bodyNode.namedChildren.length === 1) {
    const stmt = bodyNode.namedChildren[0]!;
    if (
      stmt.type === SyntaxType.ReturnStatement &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      result = `(${params})${returnType} => ${emitExpr(expr, ctx)}`;
    } else if (
      stmt.type === SyntaxType.ExpressionStatement &&
      stmt.namedChildren.length > 0
    ) {
      const expr = stmt.namedChildren[0]!;
      result = `(${params})${returnType} => { ${emitExpr(expr, ctx)}; }`;
    } else {
      const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
      result = `(${params})${returnType} => {\n${body}\n  }`;
    }
  } else {
    // Multi-statement lambda
    const body = bodyNode ? emitBody(bodyNode, ctx, 2) : '';
    result = `(${params})${returnType} => {\n${body}\n  }`;
  }

  // Restore scope
  ctx.localVars = savedLocalVars;
  ctx.localVarTypes = savedLocalVarTypes;
  return result;
}

// ─── Comments (inline) ───────────────────────────────────────

function emitCommentInline(node: SyntaxNode): string {
  const text = node.text;
  if (text.startsWith('##')) {
    const content = text.slice(2).trim();
    return `/** ${content} */`;
  }
  const content = text.slice(1).trim();
  return `// ${content}`;
}

// ─── Type Inference (for gd.ops detection) ──────────────────


/** Extract raw GD type name from a type node */
function extractGdTypeName(typeNode: SyntaxNode): string | null {
  if (typeNode.type === SyntaxType.Type) {
    return typeNode.namedChildren[0]?.text ?? typeNode.text;
  }
  if (typeNode.type === SyntaxType.InferredType) {
    return null;
  }
  return typeNode.text;
}

/** Infer the GD type of an expression (best-effort, for gd.ops detection) */
/** Infer type from expression without context (for parseGdClassInfo). Only handles constructor calls. */
function inferExprTypeStatic(
  node: SyntaxNode,
  registry?: GodotClassRegistry,
): string | null {
  if (node.type === SyntaxType.Call) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      callee.type === SyntaxType.Identifier &&
      registry?.isConstructor(callee.text)
    ) {
      return callee.text;
    }
  }
  return null;
}

function inferExprType(node: SyntaxNode, ctx: GdToTsContext): string | null {
  // Constructor call: Vector2(...), Color(...), etc.
  if (node.type === SyntaxType.Call) {
    const callee = node.namedChildren[0];
    if (
      callee &&
      callee.type === SyntaxType.Identifier &&
      ctx.registry.hasOperators(callee.text)
    ) {
      return callee.text;
    }
  }
  // Array literal: [...]
  if (node.type === SyntaxType.Array) {
    return 'Array';
  }
  // Numeric/string/boolean literals
  if (node.type === SyntaxType.Integer) return 'int';
  if (node.type === SyntaxType.Float) return 'float';
  if (node.type === SyntaxType.String) return 'String';
  if (node.type === SyntaxType.True || node.type === SyntaxType.False) return 'bool';
  // Identifier: look up tracked type (local vars first, then class members)
  if (node.type === SyntaxType.Identifier) {
    if (ctx.localVarTypes.has(node.text))
      return ctx.localVarTypes.get(node.text)!;
    if (ctx.classMemberTypes.has(node.text))
      return ctx.classMemberTypes.get(node.text)!;
  }
  // Binary operator: inherit type from left operand
  if (node.type === SyntaxType.BinaryOperator) {
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
  '%': 'rem',
  '==': 'eq',
  '!=': 'ne',
  '>': 'gt',
  '>=': 'gte',
  '<': 'lt',
  '<=': 'lte',
};

// ─── Helpers ──────────────────────────────────────────────────

function containsAwait(node: SyntaxNode): boolean {
  if (node.type === SyntaxType.AwaitExpression) return true;
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
