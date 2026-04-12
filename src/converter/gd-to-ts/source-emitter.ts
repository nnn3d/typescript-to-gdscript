import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import {
  type GdToTsContext,
  resolveAllInheritedMembers,
  resolveInheritedMemberTypes,
} from './context.ts';
import { extractGdTypeName, inferExprType } from './type-inference.ts';
import { emitFunction, emitConstructor } from './functions.ts';
import {
  emitClassVariable,
  emitConstStatement,
  emitSignal,
  emitEnum,
  emitComment,
  emitBlockComment,
  emitAnnotationAsDecorator,
  getAnnotations,
} from './members.ts';

// ─── Source File ─────────────────────────────────────────────

export function emitSourceFile(root: SyntaxNode, ctx: GdToTsContext): string {
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

export function emitInnerClass(node: SyntaxNode, ctx: GdToTsContext, isAbstractFromParent = false): string {
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
