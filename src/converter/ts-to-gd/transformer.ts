import ts from 'typescript';
import type {
  TransformContext,
  TransformResult,
  TransformDiagnostic,
} from '../common/index.ts';
import { tsTypeNodeToGdType } from '../common/index.ts';
import { resolveRegistry } from '../../config/index.ts';
import { GDScriptEmitter } from './emitter.ts';

export interface TransformerOptions {
  sourceMap: boolean;
}

/**
 * Container types that DO support the `in` operator in GDScript. Everything
 * else in the registry's `constructors` list (all Godot variant/value types)
 * is considered banned for use with `in`.
 *
 * `Dictionary` supports `in` (checks key presence).
 * `Array` supports `in` (checks value presence).
 * `Packed*Array` types do NOT support `in`.
 * `String` supports `in` (substring check) but is mapped to `string` primitive.
 */
const GD_IN_ALLOWED_CONTAINER_TYPES = new Set(['Dictionary', 'Array', 'ReadonlyArray']);

/** GDScript primitive types that don't need type annotation on `= null` optional params. */
const GD_PRIMITIVE_TYPES = new Set([
  'int', 'float', 'bool', 'String', 'void',
]);

/**
 * Returns true if a GDScript type is a "class type" — i.e. not a primitive and
 * not a variant/value type (Vector2, Color, etc.). Only class types need an
 * explicit type annotation when used as optional null-default parameters.
 */
function isGdClassType(gdType: string): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  try {
    const registry = resolveRegistry();
    if (registry.isConstructor(gdType)) return false;
  } catch { /* registry unavailable */ }
  return true;
}

/**
 * Returns true if a GDScript type is a variant/value type (Vector2, Color, etc.)
 * — i.e. a registry constructor but not a primitive.
 */
function isGdVariantType(gdType: string): boolean {
  if (GD_PRIMITIVE_TYPES.has(gdType)) return false;
  try {
    const registry = resolveRegistry();
    return registry.isConstructor(gdType);
  } catch { return false; }
}

/**
 * Packed array type names are recognized as "array" in error messages.
 * Derived from the registry's `constructors` list, filtered to entries that
 * start with `Packed` (Godot's naming convention for packed arrays).
 */
let cachedPackedArrayTypes: Set<string> | null = null;
/**
 * Non-container variant types banned from `in` RHS — the set of registry
 * constructors minus `GD_IN_ALLOWED_CONTAINER_TYPES`, excluding `Packed*Array`
 * entries (those get a dedicated "the array type `X`" label).
 */
let cachedBannedValueTypes: Set<string> | null = null;

function ensureBannedTypeSets(): void {
  if (cachedBannedValueTypes && cachedPackedArrayTypes) return;
  const banned = new Set<string>();
  const packed = new Set<string>();
  try {
    const registry = resolveRegistry();
    const constructors = registry.getData().constructors ?? [];
    for (const name of constructors) {
      if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) continue;
      if (name.startsWith('Packed') && name.endsWith('Array')) {
        packed.add(name);
      } else {
        banned.add(name);
      }
    }
  } catch {
    // Registry unavailable — sets stay empty; only `isArrayType`/primitive
    // checks will fire.
  }
  cachedBannedValueTypes = banned;
  cachedPackedArrayTypes = packed;
}

/**
 * If the type is banned as a right-hand side of `in`, return a human-readable
 * label for the error message; otherwise return null.
 */
function classifyInRhsType(
  type: ts.Type,
  checker: ts.TypeChecker,
): string | null {
  // Check symbol name first for allowed/banned types
  ensureBannedTypeSets();
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  const name = symbol?.getName();
  if (name) {
    // Array, Dictionary support `in` — allow them
    if (GD_IN_ALLOWED_CONTAINER_TYPES.has(name)) return null;
    if (cachedBannedValueTypes!.has(name)) {
      return `the value type \`${name}\``;
    }
    if (cachedPackedArrayTypes!.has(name)) {
      return `the array type \`${name}\``;
    }
  }

  // TS array types (T[], tuples) — these map to GDScript Array, which supports `in`
  if (checker.isArrayType?.(type)) return null;
  if (checker.isTupleType?.(type)) return null;

  // Number/boolean primitives: `x in 42` / `x in true` is always wrong too.
  if (type.flags & ts.TypeFlags.NumberLike) return 'a number';
  if (type.flags & ts.TypeFlags.BooleanLike) return 'a boolean';

  return null;
}

/**
 * Transforms a TypeScript AST into GDScript code.
 */
export class TsToGdTransformer {
  private ctx: TransformContext;
  private emitter: GDScriptEmitter;
  private opts: TransformerOptions;
  private currentClassName: string = '';
  /**
   * Name of the property whose get/set accessor body is currently being
   * emitted. Inside the body, `this.<accessorName>` is stripped to a bare
   * identifier to reference the GDScript backing field (emitting `self.X`
   * inside `get X`/`set X` would cause infinite recursion in GDScript).
   */
  private currentAccessorName: string | null = null;

  constructor(ctx: TransformContext, opts: TransformerOptions) {
    this.ctx = ctx;
    this.opts = opts;
    const gdFilePath = ctx.filePath.replace(/\.ts$/, '.gd');
    this.emitter = new GDScriptEmitter(
      ctx.filePath,
      gdFilePath,
      opts.sourceMap,
    );
  }

  transform(): TransformResult {
    if (this.opts.sourceMap) {
      this.emitter.setSourceContent(this.ctx.sourceFile.getFullText());
    }

    this.visitSourceFile(this.ctx.sourceFile);

    return {
      code: this.emitter.getOutput(),
      sourceMap: this.emitter.getSourceMap(),
      diagnostics: this.ctx.diagnostics,
    };
  }

  // ─── Source File ─────────────────────────────────────────────

  private visitSourceFile(sf: ts.SourceFile): void {
    // Check single class per file
    const classDecls = sf.statements.filter(ts.isClassDeclaration);
    if (classDecls.length > 1) {
      for (const cls of classDecls.slice(1)) {
        this.addDiagnostic(
          cls,
          'error',
          'Only one class per file is allowed (GDScript file structure)',
        );
      }
    }

    for (const statement of sf.statements) {
      if (ts.isClassDeclaration(statement)) {
        this.emitLeadingComments(statement);
        this.visitClassDeclaration(statement);
      } else if (ts.isImportDeclaration(statement)) {
        // Imports are type-only in this model; skip
      } else if (
        ts.isTypeAliasDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement)
      ) {
        // Type declarations are TS-only; skip
      } else if (
        ts.isExportDeclaration(statement) ||
        ts.isExportAssignment(statement)
      ) {
        // Exports are TS-only; skip
      } else {
        this.addDiagnostic(
          statement,
          'error',
          `Top-level statement outside class is not supported: ${ts.SyntaxKind[statement.kind]}`,
        );
      }
    }
  }

  // ─── Class Declaration ───────────────────────────────────────

  private visitClassDeclaration(node: ts.ClassDeclaration): void {
    const pos = this.getLineAndCol(node);

    // abstract class → @abstract annotation before extends/class_name
    const isAbstract = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
    );
    if (isAbstract) {
      this.emitter.writeLine('@abstract', pos.line, pos.col);
    }

    // extends
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (
          clause.token === ts.SyntaxKind.ExtendsKeyword &&
          clause.types.length > 0
        ) {
          const baseType = clause.types[0]!;
          this.emitter.writeLine(
            `extends ${baseType.expression.getText(this.ctx.sourceFile)}`,
            pos.line,
            pos.col,
          );
        }
      }
    }

    // class_name (skip for __CLASS__ — anonymous class)
    const className = node.name?.getText(this.ctx.sourceFile) ?? '';
    this.currentClassName = className;
    if (className && className !== '__CLASS__') {
      this.emitter.writeLine(`class_name ${className}`, pos.line, pos.col);
    }

    this.emitter.writeEmptyLine();

    // Emit members preserving declaration order.
    // All members (signals, enums, properties, methods, inner classes, constructor)
    // are emitted in their original interleaved order.
    type OrderedMember =
      | { kind: 'signal'; node: ts.PropertyDeclaration }
      | { kind: 'enum'; node: ts.PropertyDeclaration }
      | { kind: 'property'; node: ts.PropertyDeclaration }
      | { kind: 'method'; node: ts.MethodDeclaration }
      | { kind: 'constructor'; node: ts.ConstructorDeclaration }
      | { kind: 'innerClass'; node: ts.PropertyDeclaration }
      | {
          kind: 'accessor';
          name: string;
          get?: ts.GetAccessorDeclaration;
          set?: ts.SetAccessorDeclaration;
          node: ts.Node;
        };
    const orderedMembers: OrderedMember[] = [];

    for (const member of node.members) {
      if (ts.isPropertyDeclaration(member)) {
        if (this.isSignalProperty(member)) {
          orderedMembers.push({ kind: 'signal', node: member });
        } else if (this.isEnumProperty(member)) {
          orderedMembers.push({ kind: 'enum', node: member });
        } else if (
          member.initializer &&
          ts.isClassExpression(member.initializer)
        ) {
          orderedMembers.push({ kind: 'innerClass', node: member });
        } else {
          orderedMembers.push({ kind: 'property', node: member });
        }
      } else if (ts.isMethodDeclaration(member)) {
        orderedMembers.push({ kind: 'method', node: member });
      } else if (ts.isConstructorDeclaration(member)) {
        orderedMembers.push({ kind: 'constructor', node: member });
      } else if (
        ts.isGetAccessorDeclaration(member) ||
        ts.isSetAccessorDeclaration(member)
      ) {
        // Pair `get X` and `set X` with the same name into one entry so they
        // emit as a single GDScript `var X: get: ... set(v): ...` block.
        const name =
          member.name && ts.isIdentifier(member.name)
            ? member.name.text
            : undefined;
        if (!name) continue;
        const existing = orderedMembers.find(
          (e) => e.kind === 'accessor' && e.name === name,
        ) as
          | {
              kind: 'accessor';
              name: string;
              get?: ts.GetAccessorDeclaration;
              set?: ts.SetAccessorDeclaration;
              node: ts.Node;
            }
          | undefined;
        if (existing) {
          if (ts.isGetAccessorDeclaration(member)) existing.get = member;
          else existing.set = member;
        } else {
          orderedMembers.push({
            kind: 'accessor',
            name,
            get: ts.isGetAccessorDeclaration(member) ? member : undefined,
            set: ts.isSetAccessorDeclaration(member) ? member : undefined,
            node: member,
          } as OrderedMember);
        }
      }
    }

    // Emit members in original declaration order
    let lastEmittedTrailingBlank = false;
    let lastWasFunc = false;
    for (let i = 0; i < orderedMembers.length; i++) {
      const entry = orderedMembers[i]!;
      const isLast = i === orderedMembers.length - 1;

      // A "function-like" entry — methods, constructors, accessors, and
      // properties initialized via `gd.getset` — should be surrounded by
      // blank lines for readability.
      const isGdGetsetProp =
        entry.kind === 'property' &&
        entry.node.initializer !== undefined &&
        this.isGdHelperCall(entry.node.initializer, 'getset');
      const isFunc =
        entry.kind === 'method' ||
        entry.kind === 'constructor' ||
        entry.kind === 'accessor' ||
        isGdGetsetProp;
      if (
        i > 0 &&
        !lastEmittedTrailingBlank &&
        (isFunc || lastWasFunc || entry.kind === 'innerClass')
      ) {
        this.emitter.writeEmptyLine();
      }

      lastEmittedTrailingBlank = false;

      switch (entry.kind) {
        case 'signal':
          this.emitLeadingComments(entry.node);
          this.visitSignalDeclaration(entry.node);
          break;
        case 'enum':
          this.emitLeadingComments(entry.node);
          this.visitEnumDeclaration(entry.node);
          break;
        case 'property':
          this.emitLeadingComments(entry.node);
          this.visitPropertyDeclaration(entry.node);
          if (isGdGetsetProp && !isLast) {
            this.emitter.writeEmptyLine();
            lastEmittedTrailingBlank = true;
          }
          break;
        case 'method':
          this.emitLeadingComments(entry.node);
          this.visitMethodDeclaration(entry.node);
          if (!isLast) {
            this.emitter.writeEmptyLine();
            lastEmittedTrailingBlank = true;
          }
          break;
        case 'constructor':
          this.emitLeadingComments(entry.node);
          this.visitConstructor(entry.node);
          if (!isLast) {
            this.emitter.writeEmptyLine();
            lastEmittedTrailingBlank = true;
          }
          break;
        case 'innerClass':
          this.emitLeadingComments(entry.node);
          this.visitPropertyDeclaration(entry.node);
          if (!isLast) {
            this.emitter.writeEmptyLine();
            lastEmittedTrailingBlank = true;
          }
          break;
        case 'accessor':
          this.visitAccessorPair(entry.name, entry.get, entry.set);
          if (!isLast) {
            this.emitter.writeEmptyLine();
            lastEmittedTrailingBlank = true;
          }
          break;
      }

      lastWasFunc = isFunc;
    }

    // Emit trailing comments before the class closing brace
    const closeBrace = node.getLastToken();
    if (closeBrace) {
      const sourceText = this.ctx.sourceFile.getFullText();
      const ranges = ts.getLeadingCommentRanges(sourceText, closeBrace.getFullStart());
      if (ranges && ranges.length > 0) {
        this.emitter.writeEmptyLine();
        this.emitLeadingComments(closeBrace);
      }
    }
  }

  // ─── Comments ───────────────────────────────────────────────

  private emitLeadingComments(node: ts.Node): void {
    const sourceText = this.ctx.sourceFile.getFullText();
    const ranges = ts.getLeadingCommentRanges(sourceText, node.getFullStart());
    if (!ranges) return;

    for (const range of ranges) {
      const commentText = sourceText.slice(range.pos, range.end);
      const { line, character } =
        this.ctx.sourceFile.getLineAndCharacterOfPosition(range.pos);
      const origLine = line + 1;
      const origCol = character;

      if (range.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
        const content = commentText.replace(/^\/\/\s?/, '');
        // @gd.eval: magic comment → emit raw GDScript
        // Spaces after @gd.eval: are ignored, but tabs are preserved as indentation
        const gdEvalMatch = content.match(/^\s*@gd\.eval: *(.*)/);
        if (gdEvalMatch) {
          this.emitter.writeLine(gdEvalMatch[1]!, origLine, origCol);
        } else {
          // // comment -> # comment
          this.emitter.writeLine(`# ${content}`, origLine, origCol);
        }
      } else if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
        if (commentText.startsWith('/**')) {
          // /** comment */ -> ## comment (doc comment)
          const content = commentText
            .replace(/^\/\*\*\s*/, '')
            .replace(/\s*\*\/$/, '')
            .replace(/^\s*\*\s?/gm, '')
            .trim();
          this.emitter.writeLine(`## ${content}`, origLine, origCol);
        } else {
          // /* comment */ -> """comment""" (block comment)
          const content = commentText
            .replace(/^\/\*\s?/, '')
            .replace(/\s?\*\/$/, '');
          if (!content.includes('\n')) {
            // Single-line block comment
            this.emitter.writeLine(`"""${content.trim()}"""`, origLine, origCol);
          } else {
            // Multiline block comment — strip indent matching the comment's own column
            const rawLines = content.split('\n');
            const nonEmpty = rawLines.filter(l => l.trim() !== '');
            // Strip indent equal to the comment's own column position
            const stripAmount = character;
            this.emitter.writeLine(`"""`, origLine, origCol);
            for (const line of nonEmpty) {
              // Strip up to stripAmount leading spaces/tabs
              let stripped = line;
              let count = 0;
              while (count < stripAmount && stripped.length > 0 && (stripped[0] === ' ' || stripped[0] === '\t')) {
                stripped = stripped.slice(1);
                count++;
              }
              this.emitter.writeLine(stripped.trimEnd(), origLine, origCol);
            }
            this.emitter.writeLine(`"""`, origLine, origCol);
          }
        }
      }
    }
  }

  private emitInlineComments(node: ts.Node): void {
    const sourceText = this.ctx.sourceFile.getFullText();
    const ranges = ts.getTrailingCommentRanges(sourceText, node.getEnd());
    if (!ranges) return;

    for (const range of ranges) {
      const commentText = sourceText.slice(range.pos, range.end);
      const { line, character } =
        this.ctx.sourceFile.getLineAndCharacterOfPosition(range.pos);
      if (range.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
        const content = commentText.replace(/^\/\/\s?/, '');
        this.emitter.writeLine(`# ${content}`, line + 1, character);
      }
    }
  }

  // ─── Signals ─────────────────────────────────────────────────

  private isSignalProperty(node: ts.PropertyDeclaration): boolean {
    if (!node.initializer) return false;
    return this.isGdHelperCall(node.initializer, 'signal');
  }

  private visitSignalDeclaration(node: ts.PropertyDeclaration): void {
    const pos = this.getLineAndCol(node);
    const name = node.name.getText(this.ctx.sourceFile);

    // Extract signal parameters from gd.signal<[...]>() type arguments
    const params = this.extractSignalParams(node);
    if (params.length > 0) {
      const paramStr = params.map((p) => `${p.name}: ${p.type}`).join(', ');
      this.emitter.writeLine(`signal ${name}(${paramStr})`, pos.line, pos.col);
    } else {
      this.emitter.writeLine(`signal ${name}`, pos.line, pos.col);
    }
  }

  private extractSignalParams(
    node: ts.PropertyDeclaration,
  ): { name: string; type: string }[] {
    if (!node.initializer || !ts.isCallExpression(node.initializer)) return [];
    const call = node.initializer;

    // Get type arguments: gd.signal<[from: int, to: int]>()
    if (!call.typeArguments || call.typeArguments.length === 0) return [];
    const typeArg = call.typeArguments[0]!;

    // Must be a tuple type: [from: int, to: int]
    if (!ts.isTupleTypeNode(typeArg)) return [];

    const params: { name: string; type: string }[] = [];
    for (var i = 0; i < typeArg.elements.length; i++) {
      var element = typeArg.elements[i]!;
      var paramName: string;
      var typeNode: ts.TypeNode;

      // Named tuple element: `from: int`
      if (ts.isNamedTupleMember(element)) {
        paramName = element.name.text;
        typeNode = element.type;
      } else {
        // Unnamed: generate arg1, arg2, ...
        paramName = `arg${i + 1}`;
        typeNode = element;
      }

      var gdType = tsTypeNodeToGdType(
        typeNode,
        this.ctx.checker,
        this.ctx.sourceFile,
      this.currentClassName,
      );
      // unknown, non-GDScript types → Variant
      params.push({ name: paramName, type: gdType ?? 'Variant' });
    }
    return params;
  }

  // ─── Enums ───────────────────────────────────────────────────

  private isEnumProperty(node: ts.PropertyDeclaration): boolean {
    if (!node.initializer) return false;
    return this.isGdHelperCall(node.initializer, 'enum');
  }

  private visitEnumDeclaration(node: ts.PropertyDeclaration): void {
    const pos = this.getLineAndCol(node);
    const name = node.name.getText(this.ctx.sourceFile);

    if (!node.initializer || !ts.isCallExpression(node.initializer)) return;

    const args = node.initializer.arguments;
    const enumValues: string[] = [];

    for (const arg of args) {
      if (ts.isStringLiteral(arg)) {
        enumValues.push(arg.text);
      } else if (ts.isArrayLiteralExpression(arg)) {
        const elements = arg.elements;
        if (elements.length >= 2 && ts.isStringLiteral(elements[0]!)) {
          enumValues.push(
            `${elements[0]!.text} = ${elements[1]!.getText(this.ctx.sourceFile)}`,
          );
        }
      }
    }

    this.emitter.writeLine(
      `enum ${this.toPascalCase(name)} {${enumValues.join(', ')}}`,
      pos.line,
      pos.col,
    );
  }

  // ─── Properties ──────────────────────────────────────────────

  private visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
    const pos = this.getLineAndCol(node);
    const name = node.name.getText(this.ctx.sourceFile);

    // Inner class: static Foo = class extends Bar { ... }
    if (node.initializer && ts.isClassExpression(node.initializer)) {
      this.visitInnerClassDeclaration(name, node.initializer, node);
      return;
    }

    // gd.getset<T>({...}) — emit as `var X[: T][ = value]:\n\tget:...\n\tset(v):...`
    if (
      node.initializer &&
      this.isGdHelperCall(node.initializer, 'getset')
    ) {
      this.visitGdGetsetProperty(name, node, node.initializer as ts.CallExpression);
      return;
    }

    // Check for decorators (@gd.export, @gd.onready, etc.)
    const decorators = this.getDecorators(node);
    for (const dec of decorators) {
      this.emitter.writeLine(dec, pos.line, pos.col);
    }

    // Static and readonly
    const isStatic = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.StaticKeyword,
    );
    const isReadonly = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ReadonlyKeyword,
    );

    // Type annotation
    const gdType = tsTypeNodeToGdType(
      node.type,
      this.ctx.checker,
      this.ctx.sourceFile,
    this.currentClassName,
    );

    // Build declaration: readonly -> const, static -> static var, else -> var
    let decl: string;
    if (isReadonly) {
      decl = `const ${name}`;
    } else {
      const staticPrefix = isStatic ? 'static ' : '';
      decl = `${staticPrefix}var ${name}`;
    }
    if (gdType) {
      decl += `: ${gdType}`;
    }

    // Initializer
    if (
      node.initializer &&
      !this.isGdHelperCall(node.initializer, 'signal') &&
      !this.isGdHelperCall(node.initializer, 'enum')
    ) {
      decl += ` = ${this.emitExpression(node.initializer)}`;
    }

    this.emitter.writeLine(decl, pos.line, pos.col);

    // If the initializer was a block lambda, emit its body after the declaration line
    if (node.initializer && this.isBlockLambda(node.initializer)) {
      this.emitLambdaBody(node.initializer);
    }
  }

  // ─── Accessor Pair (get/set) ────────────────────────────────

  /**
   * Emit a pair of TS get/set accessors as a GDScript variable with an
   * inline setget clause:
   *     var <name>: <type>:
   *         get:
   *             <get body>
   *         set(<param>):
   *             <set body>
   */
  private visitAccessorPair(
    name: string,
    getNode: ts.GetAccessorDeclaration | undefined,
    setNode: ts.SetAccessorDeclaration | undefined,
  ): void {
    const pos = this.getLineAndCol(getNode ?? setNode!);

    // Type: prefer getter return type, then setter parameter type
    let gdType: string | null = null;
    if (getNode?.type) {
      gdType = tsTypeNodeToGdType(
        getNode.type,
        this.ctx.checker,
        this.ctx.sourceFile,
        this.currentClassName,
      );
    } else if (setNode && setNode.parameters.length > 0 && setNode.parameters[0]!.type) {
      gdType = tsTypeNodeToGdType(
        setNode.parameters[0]!.type,
        this.ctx.checker,
        this.ctx.sourceFile,
        this.currentClassName,
      );
    }

    const typeSuffix = gdType ? `: ${gdType}` : '';
    this.emitter.writeLine(`var ${name}${typeSuffix}:`, pos.line, pos.col);
    this.emitter.indent();

    // Activate `this.<name>` → bare `<name>` rewriting for accessor bodies.
    const savedAccessorName = this.currentAccessorName;
    this.currentAccessorName = name;

    // Emit getter body (synthesize default if missing)
    if (getNode?.body) {
      this.emitter.writeLine('get:');
      this.emitter.indent();
      for (const stmt of getNode.body.statements) {
        this.visitStatement(stmt);
      }
      this.emitter.dedent();
    } else {
      this.emitter.writeLine('get:');
      this.emitter.indent();
      this.emitter.writeLine(`return ${name}`);
      this.emitter.dedent();
    }

    // Emit setter body (synthesize default if missing)
    if (setNode?.body) {
      const paramName =
        setNode.parameters[0] && ts.isIdentifier(setNode.parameters[0].name)
          ? setNode.parameters[0].name.text
          : 'value';
      this.emitter.writeLine(`set(${paramName}):`);
      this.emitter.indent();
      for (const stmt of setNode.body.statements) {
        this.visitStatement(stmt);
      }
      this.emitter.dedent();
    } else {
      this.emitter.writeLine('set(value):');
      this.emitter.indent();
      this.emitter.writeLine(`${name} = value`);
      this.emitter.dedent();
    }

    this.currentAccessorName = savedAccessorName;
    this.emitter.dedent();
  }

  // ─── gd.getset() helper ─────────────────────────────────────

  /**
   * Emit `name = gd.getset<T>({ value?, get, set })` as a GDScript variable
   * with a setget clause. Both `get` and `set` are required. Mixing inline
   * bodies with function-reference (`get: this.fn_name`) forms — or omitting
   * either — is an error.
   */
  private visitGdGetsetProperty(
    name: string,
    node: ts.PropertyDeclaration,
    call: ts.CallExpression,
  ): void {
    const pos = this.getLineAndCol(node);

    if (call.arguments.length !== 1 || !ts.isObjectLiteralExpression(call.arguments[0]!)) {
      this.addDiagnostic(
        call,
        'error',
        '`gd.getset()` requires a single object literal argument with `get` and `set` properties.',
      );
      return;
    }
    const objArg = call.arguments[0] as ts.ObjectLiteralExpression;

    let valueExpr: ts.Expression | undefined;
    let getExpr: ts.Expression | undefined;
    let setExpr: ts.Expression | undefined;
    let hasGetKey = false;
    let hasSetKey = false;

    for (const prop of objArg.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      if (!ts.isIdentifier(prop.name)) continue;
      const key = prop.name.text;
      if (key === 'value') valueExpr = prop.initializer;
      else if (key === 'get') {
        hasGetKey = true;
        getExpr = prop.initializer;
      } else if (key === 'set') {
        hasSetKey = true;
        setExpr = prop.initializer;
      }
    }

    if (!hasGetKey || !hasSetKey) {
      this.addDiagnostic(
        call,
        'error',
        '`gd.getset()` requires both `get` and `set` properties (use `null` for the default).',
      );
      return;
    }

    // `null` means "use GDScript's default (backing-field read/write)".
    const getIsNull =
      getExpr !== undefined && getExpr.kind === ts.SyntaxKind.NullKeyword;
    const setIsNull =
      setExpr !== undefined && setExpr.kind === ts.SyntaxKind.NullKeyword;

    if (getIsNull && setIsNull) {
      this.addDiagnostic(
        call,
        'error',
        '`gd.getset()`: at least one of `get` or `set` must be non-null.',
      );
      return;
    }

    // Classify non-null accessors as inline vs function-ref
    const getIsInline =
      !getIsNull &&
      getExpr !== undefined &&
      (ts.isArrowFunction(getExpr) || ts.isFunctionExpression(getExpr));
    const setIsInline =
      !setIsNull &&
      setExpr !== undefined &&
      (ts.isArrowFunction(setExpr) || ts.isFunctionExpression(setExpr));
    const getIsRef = !getIsNull && !getIsInline;
    const setIsRef = !setIsNull && !setIsInline;

    // Error: mixing inline bodies with function-reference form
    if ((getIsInline && setIsRef) || (getIsRef && setIsInline)) {
      this.addDiagnostic(
        call,
        'error',
        '`gd.getset()`: cannot mix inline `get`/`set` bodies with function-reference form.',
      );
      return;
    }

    const usingRefForm = getIsRef || setIsRef;

    // Error: function-ref form cannot have a `value` default
    if (usingRefForm && valueExpr) {
      this.addDiagnostic(
        call,
        'error',
        '`gd.getset()`: `value` default cannot be used with function-reference `get`/`set`.',
      );
      return;
    }

    // Type annotation for the GDScript `var <name>: <Type>`.
    // Prefer the explicit `gd.getset<T>()` generic, then the property's own
    // annotation, then fall back to the TS type checker's inferred type
    // (which resolves T from `value` via contextual typing).
    let gdType: string | null = null;
    if (call.typeArguments && call.typeArguments.length > 0) {
      gdType = tsTypeNodeToGdType(
        call.typeArguments[0]!,
        this.ctx.checker,
        this.ctx.sourceFile,
        this.currentClassName,
      );
    }
    if (!gdType && node.type) {
      gdType = tsTypeNodeToGdType(
        node.type,
        this.ctx.checker,
        this.ctx.sourceFile,
        this.currentClassName,
      );
    }
    // Fall back to inferring the type from the `set` callback's parameter
    // type. Used for both inline `set: (v: int) => ...` and function-ref
    // `set: this.set_x` forms — TS can resolve the method signature even
    // when Godot typings aren't loaded for the outer `gd.getset<T>` call.
    if (!gdType && setExpr && !setIsNull) {
      const setType = this.ctx.checker.getTypeAtLocation(setExpr);
      const sigs = setType.getCallSignatures();
      if (sigs.length > 0 && sigs[0]!.parameters.length > 0) {
        const param = sigs[0]!.parameters[0]!;
        const paramDecl = param.valueDeclaration;
        if (paramDecl) {
          const paramType = this.ctx.checker.getTypeOfSymbolAtLocation(
            param,
            paramDecl,
          );
          const typeStr = this.ctx.checker.typeToString(
            paramType,
            node,
            ts.TypeFormatFlags.NoTruncation,
          );
          let cleaned = typeStr
            .replace(/\s*\|\s*null$/, '')
            .replace(/\s*\|\s*undefined$/, '')
            .trim();
          if (cleaned === 'number') cleaned = 'float';
          else if (cleaned === 'string') cleaned = 'String';
          else if (cleaned === 'boolean') cleaned = 'bool';
          if (
            cleaned &&
            cleaned !== 'any' &&
            cleaned !== 'unknown' &&
            cleaned !== 'error' &&
            cleaned !== '{}'
          ) {
            gdType = cleaned;
          }
        }
      }
    }

    // Fall back to inferring the type from the `value` expression directly.
    // This works even when Godot typings aren't loaded into the test program,
    // because literal/plain expressions have locally-determinable types.
    if (!gdType && valueExpr) {
      // Special case for numeric literals: check the source text to
      // distinguish `int` (no decimal) from `float` (with decimal). The TS
      // type checker widens both to `number`, losing this distinction.
      if (ts.isNumericLiteral(valueExpr)) {
        const raw = valueExpr.getText(this.ctx.sourceFile);
        gdType = raw.includes('.') ? 'float' : 'int';
      } else {
        const inferred = this.ctx.checker.getTypeAtLocation(valueExpr);
        const widened = this.ctx.checker.getBaseTypeOfLiteralType(inferred);
        const typeStr = this.ctx.checker.typeToString(
          widened,
          node,
          ts.TypeFormatFlags.NoTruncation,
        );
        let cleaned = typeStr
          .replace(/\s*\|\s*null$/, '')
          .replace(/\s*\|\s*undefined$/, '')
          .trim();
        // Map TS primitives to GDScript equivalents
        if (cleaned === 'number') cleaned = 'float';
        else if (cleaned === 'string') cleaned = 'String';
        else if (cleaned === 'boolean') cleaned = 'bool';
        if (
          cleaned &&
          cleaned !== 'any' &&
          cleaned !== 'unknown' &&
          cleaned !== 'error' &&
          cleaned !== '{}'
        ) {
          gdType = cleaned;
        }
      }
    }
    const typePart = gdType ? `: ${gdType}` : '';
    const valuePart = valueExpr ? ` = ${this.emitExpression(valueExpr)}` : '';

    if (usingRefForm) {
      // `var name: Type: get = fn_name, set = fn_name`
      // If one side is null, only emit the present one (`get = fn` or `set = fn`)
      const parts: string[] = [];
      if (getIsRef) {
        const fn = this.extractFunctionRefName(getExpr!);
        if (!fn) {
          this.addDiagnostic(
            call,
            'error',
            '`gd.getset()`: function-reference form requires `this.fn_name` expressions.',
          );
          return;
        }
        parts.push(`get = ${fn}`);
      }
      if (setIsRef) {
        const fn = this.extractFunctionRefName(setExpr!);
        if (!fn) {
          this.addDiagnostic(
            call,
            'error',
            '`gd.getset()`: function-reference form requires `this.fn_name` expressions.',
          );
          return;
        }
        parts.push(`set = ${fn}`);
      }
      this.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
      this.emitter.indent();
      this.emitter.writeLine(parts.join(', '));
      this.emitter.dedent();
      return;
    }

    // Inline form — may have only one of get/set (the other is null)
    this.emitter.writeLine(`var ${name}${typePart}${valuePart}:`, pos.line, pos.col);
    this.emitter.indent();

    // Activate `this.<name>` → bare `<name>` rewriting for accessor bodies.
    const savedAccessorName = this.currentAccessorName;
    this.currentAccessorName = name;

    if (getIsInline) {
      const getFn = getExpr as ts.ArrowFunction | ts.FunctionExpression;
      this.emitter.writeLine('get:');
      this.emitter.indent();
      if (ts.isBlock(getFn.body)) {
        for (const stmt of getFn.body.statements) {
          this.visitStatement(stmt);
        }
      } else {
        this.emitter.writeLine(`return ${this.emitExpression(getFn.body)}`);
      }
      this.emitter.dedent();
    }

    if (setIsInline) {
      const setFn = setExpr as ts.ArrowFunction | ts.FunctionExpression;
      const paramName =
        setFn.parameters[0] && ts.isIdentifier(setFn.parameters[0].name)
          ? setFn.parameters[0].name.text
          : 'value';
      this.emitter.writeLine(`set(${paramName}):`);
      this.emitter.indent();
      if (ts.isBlock(setFn.body)) {
        for (const stmt of setFn.body.statements) {
          this.visitStatement(stmt);
        }
      } else {
        this.emitter.writeLine(this.emitExpression(setFn.body));
      }
      this.emitter.dedent();
    }

    this.currentAccessorName = savedAccessorName;
    this.emitter.dedent();
  }

  /**
   * Extract the function name from a reference like `this.get_x` or `get_x`.
   * Returns null if the expression is neither a `this`-property-access nor
   * a bare identifier.
   */
  private extractFunctionRefName(expr: ts.Expression): string | null {
    if (
      ts.isPropertyAccessExpression(expr) &&
      expr.expression.kind === ts.SyntaxKind.ThisKeyword &&
      ts.isIdentifier(expr.name)
    ) {
      return expr.name.text;
    }
    if (ts.isIdentifier(expr)) {
      return expr.text;
    }
    return null;
  }

  // ─── Inner Class ──────────────────────────────────────────────

  private visitInnerClassDeclaration(
    name: string,
    classExpr: ts.ClassExpression,
    property: ts.PropertyDeclaration,
  ): void {
    const pos = this.getLineAndCol(property);

    // Emit decorators as annotations (e.g., @abstract)
    const decorators = this.getDecorators(property);
    for (const dec of decorators) {
      this.emitter.writeLine(dec, pos.line, pos.col);
    }

    // Emit class header: class Name:  or  class Name extends Base:
    let extendsClause = '';
    if (classExpr.heritageClauses) {
      for (const clause of classExpr.heritageClauses) {
        if (
          clause.token === ts.SyntaxKind.ExtendsKeyword &&
          clause.types.length > 0
        ) {
          const baseType = clause.types[0]!;
          extendsClause = ` extends ${baseType.expression.getText(this.ctx.sourceFile)}`;
        }
      }
    }

    this.emitter.writeLine(
      `class ${name}${extendsClause}:`,
      pos.line,
      pos.col,
    );

    this.emitter.indent();

    // Emit members
    let hasMembers = false;
    for (const member of classExpr.members) {
      if (ts.isMethodDeclaration(member)) {
        if (hasMembers) this.emitter.writeEmptyLine();
        this.visitMethodDeclaration(member);
        hasMembers = true;
      } else if (ts.isPropertyDeclaration(member)) {
        if (this.isSignalProperty(member)) {
          this.visitSignalDeclaration(member);
        } else if (this.isEnumProperty(member)) {
          this.visitEnumDeclaration(member);
        } else {
          this.visitPropertyDeclaration(member);
        }
        hasMembers = true;
      } else if (ts.isConstructorDeclaration(member)) {
        if (hasMembers) this.emitter.writeEmptyLine();
        this.visitConstructor(member);
        hasMembers = true;
      }
    }

    if (!hasMembers) {
      this.emitter.writeLine('pass');
    }

    this.emitter.dedent();
  }

  // ─── Constructor → _init ─────────────────────────────────────

  private visitConstructor(node: ts.ConstructorDeclaration): void {
    const pos = this.getLineAndCol(node);
    const params = this.emitParameters(node.parameters);
    this.emitter.writeLine(`func _init(${params}):`, pos.line, pos.col);

    this.emitter.indent();
    if (node.body) {
      this.visitBlock(node.body);
    } else {
      this.emitter.writeLine('pass');
    }
    this.emitter.dedent();
  }

  // ─── Methods ─────────────────────────────────────────────────

  private visitMethodDeclaration(node: ts.MethodDeclaration): void {
    const pos = this.getLineAndCol(node);
    const name = node.name.getText(this.ctx.sourceFile);
    const params = this.emitParameters(node.parameters);

    // Return type
    const returnType = tsTypeNodeToGdType(
      node.type,
      this.ctx.checker,
      this.ctx.sourceFile,
    this.currentClassName,
    );
    const returnAnnotation = returnType ? ` -> ${returnType}` : '';

    // Check for decorators (including @abstract)
    const decorators = this.getDecorators(node);
    for (const dec of decorators) {
      this.emitter.writeLine(dec, pos.line, pos.col);
    }

    // Abstract method → @abstract annotation + func with pass body
    const isAbstract = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
    );
    if (isAbstract) {
      this.emitter.writeLine('@abstract', pos.line, pos.col);
    }

    // Static (ignore async — GDScript doesn't have it)
    const isStatic = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.StaticKeyword,
    );
    const staticPrefix = isStatic ? 'static ' : '';

    this.emitter.writeLine(
      `${staticPrefix}func ${name}(${params})${returnAnnotation}:`,
      pos.line,
      pos.col,
    );

    this.emitter.indent();
    if (node.body) {
      this.visitBlock(node.body);
    } else {
      this.emitter.writeLine('pass');
    }
    this.emitter.dedent();
  }

  // ─── Parameters ──────────────────────────────────────────────

  /** Check a type node for `undefined` keyword and emit a diagnostic. */
  private checkTypeForUndefined(typeNode: ts.TypeNode): void {
    if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) {
      this.addDiagnostic(
        typeNode,
        'error',
        '`undefined` type is not supported in GDScript; use `null` instead',
      );
    }
    if (ts.isUnionTypeNode(typeNode)) {
      for (const t of typeNode.types) {
        if (t.kind === ts.SyntaxKind.UndefinedKeyword) {
          this.addDiagnostic(
            t,
            'error',
            '`undefined` type is not supported in GDScript; use `null` instead',
          );
        }
      }
    }
  }

  /** Check if a resolved TS type contains `undefined` (for runtime value checks). */
  private typeContainsUndefined(type: ts.Type): boolean {
    if (type.flags & ts.TypeFlags.Undefined) return true;
    if (type.isUnion()) {
      return type.types.some((t) => !!(t.flags & ts.TypeFlags.Undefined));
    }
    return false;
  }

  private emitParameters(
    params: ts.NodeArray<ts.ParameterDeclaration>,
  ): string {
    return params
      .map((p) => {
        const name = p.name.getText(this.ctx.sourceFile);
        const isRest = !!p.dotDotDotToken;

        // Check for `undefined` in type annotations (type position, not value)
        if (p.type) {
          this.checkTypeForUndefined(p.type);
        }

        if (isRest) {
          // Rest parameter: `...args: Type[]` → `...args: Array` or `...args`
          // GDScript varargs use `...name` or `...name: Array`
          let gdType: string | null = null;
          if (p.type) {
            // Strip array wrapper: `any[]` → null, `Type[]` → Array, `Array<Type>` → Array
            const typeText = p.type.getText(this.ctx.sourceFile);
            if (typeText === 'any[]' || typeText === 'unknown[]') {
              gdType = null;
            } else {
              gdType = 'Array';
            }
          }
          const typeAnnotation = gdType ? `: ${gdType}` : '';
          return `...${name}${typeAnnotation}`;
        }

        const isNullDefault = p.initializer?.kind === ts.SyntaxKind.NullKeyword;

        // Check if the type is a union containing null (e.g. `Node | null`, `null | Node2D`)
        const isNullableUnion = p.type && ts.isUnionTypeNode(p.type) &&
          p.type.types.some(
            (t) =>
              t.kind === ts.SyntaxKind.NullKeyword ||
              (ts.isLiteralTypeNode(t) && t.literal.kind === ts.SyntaxKind.NullKeyword),
          );

        // For nullable unions, strip `| null` and use the base type
        let gdType: string | null = null;
        if (p.type && isNullableUnion) {
          const nonNullTypes = (p.type as ts.UnionTypeNode).types.filter(
            (t) =>
              t.kind !== ts.SyntaxKind.NullKeyword &&
              !(ts.isLiteralTypeNode(t) && t.literal.kind === ts.SyntaxKind.NullKeyword),
          );
          if (nonNullTypes.length === 1) {
            gdType = tsTypeNodeToGdType(
              nonNullTypes[0]!, this.ctx.checker, this.ctx.sourceFile,
              this.currentClassName,
            );
          }
          // Multi-type union (e.g. Node | Node2D | null) — can't express in GD
        } else {
          gdType = tsTypeNodeToGdType(
            p.type, this.ctx.checker, this.ctx.sourceFile,
            this.currentClassName,
          );
        }

        // Nullable param with `?` or `= null` → `= null` in GDScript.
        // Add type annotation only for class types (not primitives/variant types).
        const needsNullDefault =
          (p.questionToken && !p.initializer) || isNullDefault;
        if (needsNullDefault) {
          if (gdType && isGdClassType(gdType)) {
            return `${name}: ${gdType} = null`;
          }
          return `${name} = null`;
        }

        const defaultValue = p.initializer
          ? ` = ${this.emitExpression(p.initializer)}`
          : '';
        // Omit type annotation for variant/constructor types with non-null defaults
        // (GDScript infers type from the constructor call, e.g. Vector2.DOWN → Vector2)
        const omitType = gdType && p.initializer && !isNullDefault && isGdVariantType(gdType);
        const typeAnnotation = gdType && !omitType ? `: ${gdType}` : '';
        return `${name}${typeAnnotation}${defaultValue}`;
      })
      .join(', ');
  }

  // ─── Statements ──────────────────────────────────────────────

  private visitBlock(block: ts.Block): void {
    if (block.statements.length === 0) {
      this.emitter.writeLine('pass');
      return;
    }
    for (const stmt of block.statements) {
      this.emitLeadingComments(stmt);
      this.visitStatement(stmt);
    }
    // Emit trailing comments before the closing brace
    const closeBrace = block.getLastToken();
    if (closeBrace) {
      this.emitLeadingComments(closeBrace);
    }
  }

  private visitStatement(node: ts.Statement): void {
    const pos = this.getLineAndCol(node);

    if (ts.isVariableStatement(node)) {
      this.visitVariableStatement(node);
    } else if (ts.isExpressionStatement(node)) {
      if (this.isGdEvalCall(node.expression)) {
        this.emitGdEval(node.expression as ts.CallExpression, pos);
      } else if (this.isGdMatchCall(node.expression)) {
        this.visitGdMatchStatement(node.expression as ts.CallExpression);
      } else {
        this.emitter.writeLine(
          this.emitExpression(node.expression),
          pos.line,
          pos.col,
        );
      }
    } else if (ts.isReturnStatement(node)) {
      const expr = node.expression
        ? ` ${this.emitExpression(node.expression)}`
        : '';
      this.emitter.writeLine(`return${expr}`, pos.line, pos.col);
    } else if (ts.isIfStatement(node)) {
      this.visitIfStatement(node);
    } else if (ts.isForOfStatement(node)) {
      this.visitForOfStatement(node);
    } else if (ts.isForStatement(node)) {
      this.visitForStatement(node);
    } else if (ts.isWhileStatement(node)) {
      this.visitWhileStatement(node);
    } else if (ts.isBlock(node)) {
      for (const s of node.statements) {
        this.visitStatement(s);
      }
    } else if (ts.isBreakStatement(node)) {
      this.emitter.writeLine('break', pos.line, pos.col);
    } else if (ts.isContinueStatement(node)) {
      this.emitter.writeLine('continue', pos.line, pos.col);
    } else if (ts.isSwitchStatement(node)) {
      this.visitSwitchStatement(node);
    } else if (ts.isForInStatement(node)) {
      this.addDiagnostic(
        node,
        'error',
        '`for...in` is not supported; use `for...of` instead',
      );
    } else {
      this.addDiagnostic(
        node,
        'error',
        `Unsupported statement: ${ts.SyntaxKind[node.kind]}`,
      );
    }
  }

  // ─── Variable Statements ────────────────────────────────────

  private visitVariableStatement(node: ts.VariableStatement): void {
    for (const decl of node.declarationList.declarations) {
      const pos = this.getLineAndCol(decl);

      // Check for destructuring
      if (
        ts.isArrayBindingPattern(decl.name) ||
        ts.isObjectBindingPattern(decl.name)
      ) {
        this.addDiagnostic(
          decl,
          'error',
          'Destructuring is not supported in GDScript',
        );
        continue;
      }

      const name = decl.name.getText(this.ctx.sourceFile);

      // Check for var restriction (const and let are both allowed)
      const flags = node.declarationList.flags;
      if (!(flags & (ts.NodeFlags.Const | ts.NodeFlags.Let))) {
        this.addDiagnostic(
          node,
          'warning',
          '`var` is restricted; use `let` or `const` instead. Converting to `var`.',
        );
      }

      // Type
      const typeNode = (decl as ts.VariableDeclaration).type;
      const gdType = tsTypeNodeToGdType(
        typeNode,
        this.ctx.checker,
        this.ctx.sourceFile,
      this.currentClassName,
      );
      const typeAnnotation = gdType ? `: ${gdType}` : '';

      // Special case: gd.eval() as initializer
      if (decl.initializer && this.isGdEvalCall(decl.initializer)) {
        const evalLines = this.processGdEval(decl.initializer as ts.CallExpression);
        if (evalLines && evalLines.length > 0) {
          // First line becomes the RHS of the var declaration
          const firstLine = evalLines[0]!;
          this.emitter.writeLine(
            `var ${name}${typeAnnotation} = ${firstLine}`,
            pos.line,
            pos.col,
          );
          // Remaining lines emit at current indent; their embedded \t prefixes
          // represent relative depth beyond the var line.
          for (let i = 1; i < evalLines.length; i++) {
            this.emitter.writeLine(evalLines[i]!, pos.line, pos.col);
          }
          continue;
        }
      }

      // Initializer
      const init = decl.initializer
        ? ` = ${this.emitExpression(decl.initializer)}`
        : '';

      this.emitter.writeLine(
        `var ${name}${typeAnnotation}${init}`,
        pos.line,
        pos.col,
      );

      // If the initializer was a block lambda, emit its body after the declaration line
      if (decl.initializer && this.isBlockLambda(decl.initializer)) {
        this.emitLambdaBody(decl.initializer);
      }
    }
  }

  // ─── If Statement ────────────────────────────────────────────

  private visitIfStatement(node: ts.IfStatement): void {
    const pos = this.getLineAndCol(node);
    this.emitter.writeLine(
      `if ${this.emitExpression(node.expression)}:`,
      pos.line,
      pos.col,
    );

    this.emitter.indent();
    this.visitStatementBody(node.thenStatement);
    this.emitter.dedent();

    if (node.elseStatement) {
      if (ts.isIfStatement(node.elseStatement)) {
        const elsePos = this.getLineAndCol(node.elseStatement);
        this.emitter.writeLine(
          `elif ${this.emitExpression(node.elseStatement.expression)}:`,
          elsePos.line,
          elsePos.col,
        );
        this.emitter.indent();
        this.visitStatementBody(node.elseStatement.thenStatement);
        this.emitter.dedent();
        if (node.elseStatement.elseStatement) {
          this.visitElseChain(node.elseStatement.elseStatement);
        }
      } else {
        this.emitter.writeLine('else:');
        this.emitter.indent();
        this.visitStatementBody(node.elseStatement);
        this.emitter.dedent();
      }
    }
  }

  private visitElseChain(node: ts.Statement): void {
    if (ts.isIfStatement(node)) {
      const pos = this.getLineAndCol(node);
      this.emitter.writeLine(
        `elif ${this.emitExpression(node.expression)}:`,
        pos.line,
        pos.col,
      );
      this.emitter.indent();
      this.visitStatementBody(node.thenStatement);
      this.emitter.dedent();
      if (node.elseStatement) {
        this.visitElseChain(node.elseStatement);
      }
    } else {
      this.emitter.writeLine('else:');
      this.emitter.indent();
      this.visitStatementBody(node);
      this.emitter.dedent();
    }
  }

  // ─── For Statements ─────────────────────────────────────────

  private visitForOfStatement(node: ts.ForOfStatement): void {
    const pos = this.getLineAndCol(node);
    const varName = ts.isVariableDeclarationList(node.initializer)
      ? (node.initializer.declarations[0]?.name.getText(this.ctx.sourceFile) ??
        '_')
      : this.emitExpression(node.initializer as ts.Expression);
    const iterable = this.emitExpression(node.expression);
    this.emitter.writeLine(`for ${varName} in ${iterable}:`, pos.line, pos.col);
    this.emitter.indent();
    this.visitStatementBody(node.statement);
    this.emitter.dedent();
  }

  private visitForStatement(node: ts.ForStatement): void {
    const pos = this.getLineAndCol(node);
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        this.visitVariableStatement(
          ts.factory.createVariableStatement(undefined, node.initializer),
        );
      } else {
        this.emitter.writeLine(
          this.emitExpression(node.initializer),
          pos.line,
          pos.col,
        );
      }
    }
    const condition = node.condition
      ? this.emitExpression(node.condition)
      : 'true';
    this.emitter.writeLine(`while ${condition}:`, pos.line, pos.col);
    this.emitter.indent();
    this.visitStatementBody(node.statement);
    if (node.incrementor) {
      this.emitter.writeLine(this.emitExpression(node.incrementor));
    }
    this.emitter.dedent();
  }

  // ─── While Statement ────────────────────────────────────────

  private visitWhileStatement(node: ts.WhileStatement): void {
    const pos = this.getLineAndCol(node);
    this.emitter.writeLine(
      `while ${this.emitExpression(node.expression)}:`,
      pos.line,
      pos.col,
    );
    this.emitter.indent();
    this.visitStatementBody(node.statement);
    this.emitter.dedent();
  }

  // ─── Switch → Match ─────────────────────────────────────────

  private visitSwitchStatement(node: ts.SwitchStatement): void {
    const pos = this.getLineAndCol(node);
    this.emitter.writeLine(
      `match ${this.emitExpression(node.expression)}:`,
      pos.line,
      pos.col,
    );
    this.emitter.indent();

    for (const clause of node.caseBlock.clauses) {
      if (ts.isCaseClause(clause)) {
        this.emitter.writeLine(`${this.emitExpression(clause.expression)}:`);
        this.emitter.indent();
        const stmts = clause.statements.filter((s) => !ts.isBreakStatement(s));
        if (stmts.length === 0) {
          this.emitter.writeLine('pass');
        } else {
          for (const stmt of stmts) {
            this.visitStatement(stmt);
          }
        }
        this.emitter.dedent();
      } else {
        this.emitter.writeLine('_:');
        this.emitter.indent();
        const stmts = clause.statements.filter((s) => !ts.isBreakStatement(s));
        if (stmts.length === 0) {
          this.emitter.writeLine('pass');
        } else {
          for (const stmt of stmts) {
            this.visitStatement(stmt);
          }
        }
        this.emitter.dedent();
      }
    }

    this.emitter.dedent();
  }

  // ─── gd.match() → match ─────────────────────────────────────

  // ─── gd.eval() ──────────────────────────────────────────────

  private isGdEvalCall(node: ts.Expression): boolean {
    if (!ts.isCallExpression(node)) return false;
    if (!ts.isPropertyAccessExpression(node.expression)) return false;
    const obj = node.expression.expression;
    return (
      ts.isIdentifier(obj) &&
      obj.text === 'gd' &&
      node.expression.name.text === 'eval'
    );
  }

  /**
   * Process a gd.eval() call and return the GDScript lines (with relative indentation).
   * Each line is prefixed with tabs for its depth relative to the first non-empty line.
   * Returns null if the content cannot be extracted or is empty.
   */
  private processGdEval(node: ts.CallExpression): string[] | null {
    if (node.arguments.length < 1) return null;
    const arg = node.arguments[0]!;

    // Extract the string content
    let content: string;
    if (ts.isStringLiteral(arg)) {
      content = arg.text;
    } else if (ts.isNoSubstitutionTemplateLiteral(arg)) {
      content = arg.text;
    } else if (ts.isTemplateExpression(arg)) {
      this.addDiagnostic(node, 'warning', 'gd.eval with template expressions is not supported');
      return null;
    } else {
      this.addDiagnostic(node, 'warning', 'gd.eval argument must be a string literal');
      return null;
    }

    // Strip leading newline if present
    const body = content.startsWith('\n') ? content.slice(1) : content;
    const rawLines = body.split('\n');

    // Strip trailing empty lines
    while (rawLines.length > 0 && rawLines[rawLines.length - 1]!.trim() === '') {
      rawLines.pop();
    }
    const nonEmpty = rawLines.filter((l) => l.trim() !== '');
    if (nonEmpty.length === 0) return null;

    // Single non-empty line: return trimmed
    if (nonEmpty.length === 1) {
      return [nonEmpty[0]!.trim()];
    }

    // Detect indentation style: tabs vs spaces
    const hasTabs = nonEmpty.some((l) => l.startsWith('\t'));
    const hasSpaces = nonEmpty.some((l) => /^ /.test(l));

    if (hasTabs && hasSpaces) {
      this.addDiagnostic(node, 'error', 'gd.eval: mixed tabs and spaces indentation is not supported');
      return null;
    }

    const out: string[] = [];
    if (hasTabs) {
      // Tab indentation: strip common tab prefix, emit as-is
      const minTabs = nonEmpty.reduce((min, l) => {
        const leading = l.match(/^(\t*)/)?.[1]?.length ?? 0;
        return Math.min(min, leading);
      }, Infinity);
      for (const line of rawLines) {
        if (line.trim() === '') continue;
        out.push(line.slice(minTabs));
      }
    } else {
      // Space indentation: convert indent levels to tabs
      const spaceToDepth = new Map<number, number>();
      let prevSpaces = nonEmpty[0]!.match(/^( *)/)?.[1]?.length ?? 0;
      let depth = 0;
      spaceToDepth.set(prevSpaces, 0);

      for (const line of rawLines) {
        if (line.trim() === '') continue;
        const spaces = line.match(/^( *)/)?.[1]?.length ?? 0;
        const lineContent = line.trimStart();

        if (spaces > prevSpaces) {
          depth++;
        } else if (spaces < prevSpaces) {
          const mapped = spaceToDepth.get(spaces);
          if (mapped !== undefined) {
            depth = mapped;
          } else {
            depth = Math.max(0, depth - 1);
          }
        }

        spaceToDepth.set(spaces, depth);
        prevSpaces = spaces;
        out.push('\t'.repeat(depth) + lineContent);
      }
    }
    return out;
  }

  /**
   * Emit gd.eval('gdscript code') as a standalone statement (raw GDScript lines).
   */
  private emitGdEval(
    node: ts.CallExpression,
    pos: { line: number; col: number },
  ): void {
    const lines = this.processGdEval(node);
    if (!lines) return;
    for (const line of lines) {
      this.emitter.writeLine(line, pos.line, pos.col);
    }
  }

  private isGdMatchCall(node: ts.Expression): boolean {
    if (!ts.isCallExpression(node)) return false;
    if (!ts.isPropertyAccessExpression(node.expression)) return false;
    const obj = node.expression.expression;
    return (
      ts.isIdentifier(obj) &&
      obj.text === 'gd' &&
      node.expression.name.text === 'match'
    );
  }

  private visitGdMatchStatement(node: ts.CallExpression): void {
    if (node.arguments.length < 2) return;
    const pos = this.getLineAndCol(node);
    const valueExpr = node.arguments[0]!;
    const casesExpr = node.arguments[1]!;

    this.emitter.writeLine(
      `match ${this.emitExpression(valueExpr)}:`,
      pos.line,
      pos.col,
    );
    this.emitter.indent();

    if (ts.isArrayLiteralExpression(casesExpr)) {
      for (const caseElement of casesExpr.elements) {
        if (ts.isObjectLiteralExpression(caseElement)) {
          this.emitGdMatchCase(caseElement);
        } else if (ts.isArrowFunction(caseElement)) {
          this.emitGdMatchArrowCase(caseElement);
        } else if (ts.isParenthesizedExpression(caseElement)) {
          // (x, y) => ({...}) sometimes parenthesized
          const inner = caseElement.expression;
          if (ts.isArrowFunction(inner)) {
            this.emitGdMatchArrowCase(inner);
          }
        }
      }
    }

    this.emitter.dedent();
  }

  /** Emit a plain object case: { match: ..., do() { ... } } or { matchMany: [...], do() { ... } } */
  private emitGdMatchCase(obj: ts.ObjectLiteralExpression): void {
    let matchExpr: ts.Expression | undefined;
    let matchManyExpr: ts.Expression | undefined;
    let doBody: ts.Block | undefined;

    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop) && !ts.isMethodDeclaration(prop))
        continue;
      const name = prop.name?.getText(this.ctx.sourceFile);
      if (name === 'match' && ts.isPropertyAssignment(prop)) {
        matchExpr = prop.initializer;
      } else if (name === 'matchMany' && ts.isPropertyAssignment(prop)) {
        matchManyExpr = prop.initializer;
      } else if (name === 'do' && ts.isMethodDeclaration(prop) && prop.body) {
        doBody = prop.body;
      } else if (name === 'do' && ts.isPropertyAssignment(prop)) {
        // do: () => { ... } (arrow function variant preserving `this`)
        const init = prop.initializer;
        if (ts.isArrowFunction(init) && ts.isBlock(init.body)) {
          doBody = init.body;
        }
      }
    }

    if (matchManyExpr && ts.isArrayLiteralExpression(matchManyExpr)) {
      // Multiple patterns: 1, 2, 3:
      const patterns = matchManyExpr.elements.map((e) =>
        this.emitMatchPatternExpr(e),
      );
      this.emitter.writeLine(`${patterns.join(', ')}:`);
    } else if (matchExpr) {
      const pattern = this.emitMatchPatternExpr(matchExpr);
      this.emitter.writeLine(`${pattern}:`);
    } else {
      return;
    }

    this.emitter.indent();
    if (doBody) {
      const stmts = doBody.statements;
      if (stmts.length === 0) {
        this.emitter.writeLine('pass');
      } else {
        for (const stmt of stmts) {
          this.visitStatement(stmt);
        }
      }
    } else {
      this.emitter.writeLine('pass');
    }
    this.emitter.dedent();
  }

  /** Emit an arrow function case: (bindings...) => ({ match: ..., when?: ..., do() { ... } }) */
  private emitGdMatchArrowCase(arrow: ts.ArrowFunction): void {
    // Extract parameter names (bindings)
    const bindings = arrow.parameters.map((p) =>
      p.name.getText(this.ctx.sourceFile),
    );

    // Get the object literal from body
    let obj: ts.ObjectLiteralExpression | undefined;
    if (ts.isParenthesizedExpression(arrow.body)) {
      const inner = arrow.body.expression;
      if (ts.isObjectLiteralExpression(inner)) obj = inner;
    } else if (ts.isObjectLiteralExpression(arrow.body)) {
      obj = arrow.body;
    }
    if (!obj) return;

    let matchExpr: ts.Expression | undefined;
    let whenExpr: ts.Expression | undefined;
    let doBody: ts.Block | undefined;

    for (const prop of obj.properties) {
      if (!ts.isPropertyAssignment(prop) && !ts.isMethodDeclaration(prop))
        continue;
      const name = prop.name?.getText(this.ctx.sourceFile);
      if (name === 'match' && ts.isPropertyAssignment(prop)) {
        matchExpr = prop.initializer;
      } else if (name === 'when' && ts.isPropertyAssignment(prop)) {
        whenExpr = prop.initializer;
      } else if (name === 'do' && ts.isMethodDeclaration(prop) && prop.body) {
        doBody = prop.body;
      } else if (name === 'do' && ts.isPropertyAssignment(prop)) {
        // do: () => { ... } (arrow function variant preserving `this`)
        const init = prop.initializer;
        if (ts.isArrowFunction(init) && ts.isBlock(init.body)) {
          doBody = init.body;
        }
      }
    }

    if (!matchExpr) return;

    // Build the pattern, replacing binding names with `var name`
    const bindingSet = new Set(bindings);
    const pattern = this.emitMatchPatternExpr(matchExpr, bindingSet);

    if (whenExpr) {
      this.emitter.writeLine(
        `${pattern} when ${this.emitExpression(whenExpr)}:`,
      );
    } else {
      this.emitter.writeLine(`${pattern}:`);
    }

    this.emitter.indent();
    if (doBody) {
      const stmts = doBody.statements;
      if (stmts.length === 0) {
        this.emitter.writeLine('pass');
      } else {
        for (const stmt of stmts) {
          this.visitStatement(stmt);
        }
      }
    } else {
      this.emitter.writeLine('pass');
    }
    this.emitter.dedent();
  }

  /**
   * Convert a TS expression to a GDScript match pattern.
   * @param bindings - Set of variable names that should be emitted as `var name` pattern bindings
   */
  private emitMatchPatternExpr(
    node: ts.Expression,
    bindings?: Set<string>,
  ): string {
    // undefined → _ (wildcard)
    if (ts.isIdentifier(node) && node.text === 'undefined') {
      return '_';
    }

    // Binding variable: becomes `var name`
    if (bindings && ts.isIdentifier(node) && bindings.has(node.text)) {
      return `var ${node.text}`;
    }

    // Array literal → array pattern
    if (ts.isArrayLiteralExpression(node)) {
      const elements: string[] = [];
      for (const el of node.elements) {
        // ...[] → .. (open ending)
        if (ts.isSpreadElement(el)) {
          elements.push('..');
          continue;
        }
        elements.push(this.emitMatchPatternExpr(el, bindings));
      }
      return `[${elements.join(', ')}]`;
    }

    // Object literal → dictionary pattern
    if (ts.isObjectLiteralExpression(node)) {
      const entries: string[] = [];
      let hasSpread = false;
      for (const prop of node.properties) {
        if (ts.isSpreadAssignment(prop)) {
          // ...{} → ..
          hasSpread = true;
          continue;
        }
        if (ts.isPropertyAssignment(prop)) {
          const key = ts.isStringLiteral(prop.name)
            ? this.emitStringLiteral(prop.name)
            : `"${this.escapeGdString(prop.name.getText(this.ctx.sourceFile))}"`;
          const val = this.emitMatchPatternExpr(prop.initializer, bindings);
          if (val === '_') {
            // { name: undefined } → just "name" as a key-only check
            entries.push(key);
          } else {
            entries.push(`${key}: ${val}`);
          }
        }
      }
      if (hasSpread) {
        return `{${entries.join(', ')}, ..}`;
      }
      return `{${entries.join(', ')}}`;
    }

    // Everything else: regular expression
    return this.emitExpression(node);
  }

  // ─── Statement Body Helper ──────────────────────────────────

  private visitStatementBody(node: ts.Statement): void {
    if (ts.isBlock(node)) {
      if (node.statements.length === 0) {
        this.emitter.writeLine('pass');
      } else {
        for (const stmt of node.statements) {
          this.emitLeadingComments(stmt);
          this.visitStatement(stmt);
        }
      }
    } else {
      this.visitStatement(node);
    }
  }

  // ─── Expressions ─────────────────────────────────────────────

  private emitExpression(node: ts.Expression): string {
    // Identifiers
    if (ts.isIdentifier(node)) {
      const text = node.text;
      if (text === 'undefined') {
        this.addDiagnostic(
          node,
          'error',
          '`undefined` is restricted; use `null`',
        );
        return 'null';
      }
      if (text === 'null') return 'null';
      if (text === 'true') return 'true';
      if (text === 'false') return 'false';
      return text;
    }

    // this -> self
    if (node.kind === ts.SyntaxKind.ThisKeyword) {
      return 'self';
    }

    // null keyword
    if (node.kind === ts.SyntaxKind.NullKeyword) return 'null';
    if (node.kind === ts.SyntaxKind.TrueKeyword) return 'true';
    if (node.kind === ts.SyntaxKind.FalseKeyword) return 'false';

    // Numeric literals — preserve original source text to keep 100.0 vs 100
    if (ts.isNumericLiteral(node)) {
      return node.getText(this.ctx.sourceFile);
    }

    // String literals — properly escape
    if (ts.isStringLiteral(node)) {
      return this.emitStringLiteral(node);
    }

    // Template literals
    if (ts.isTemplateExpression(node)) {
      return this.emitTemplateExpression(node);
    }
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      return `"${this.escapeGdString(node.text)}"`;
    }

    // Property access
    if (ts.isPropertyAccessExpression(node)) {
      return this.emitPropertyAccess(node);
    }

    // Element access: a[b]
    if (ts.isElementAccessExpression(node)) {
      return `${this.emitExpression(node.expression)}[${this.emitExpression(node.argumentExpression)}]`;
    }

    // Call expression
    if (ts.isCallExpression(node)) {
      return this.emitCallExpression(node);
    }

    // New expression -> ClassName.new()
    if (ts.isNewExpression(node)) {
      const className = this.emitExpression(node.expression);
      const args =
        node.arguments?.map((a) => this.emitExpression(a)).join(', ') ?? '';
      return `${className}.new(${args})`;
    }

    // Binary expression
    if (ts.isBinaryExpression(node)) {
      return this.emitBinaryExpression(node);
    }

    // Prefix unary
    if (ts.isPrefixUnaryExpression(node)) {
      const operand = this.emitExpression(node.operand);
      const op = this.unaryOperator(node.operator);
      return `${op}${operand}`;
    }

    // Postfix unary (i++ / i--)
    if (ts.isPostfixUnaryExpression(node)) {
      const operand = this.emitExpression(node.operand);
      if (node.operator === ts.SyntaxKind.PlusPlusToken) {
        return `${operand} += 1`;
      }
      if (node.operator === ts.SyntaxKind.MinusMinusToken) {
        return `${operand} -= 1`;
      }
    }

    // Parenthesized
    if (ts.isParenthesizedExpression(node)) {
      return `(${this.emitExpression(node.expression)})`;
    }

    // Array literal
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements
        .map((e) => this.emitExpression(e))
        .join(', ');
      return `[${elements}]`;
    }

    // Object literal -> Dictionary
    if (ts.isObjectLiteralExpression(node)) {
      const entries: string[] = [];
      for (const p of node.properties) {
        if (ts.isPropertyAssignment(p)) {
          let key: string;
          if (ts.isComputedPropertyName(p.name)) {
            // {[expr]: value} -> expr: value (strip brackets, use raw expression)
            key = this.emitExpression(p.name.expression);
          } else if (ts.isStringLiteral(p.name)) {
            // String literal key: {'key': v} or {"key": v} -> "key": v
            key = this.emitStringLiteral(p.name);
          } else {
            // Regular property: quote the key name
            key = `"${this.escapeGdString(p.name.getText(this.ctx.sourceFile))}"`;
          }
          const value = this.emitExpression(p.initializer);
          entries.push(`${key}: ${value}`);
        }
      }
      if (entries.length === 0) return '{}';
      return this.emitMultiLineDict(entries);
    }

    // Conditional (ternary) -> GDScript ternary
    if (ts.isConditionalExpression(node)) {
      const cond = this.emitExpression(node.condition);
      const whenTrue = this.emitExpression(node.whenTrue);
      const whenFalse = this.emitExpression(node.whenFalse);
      return `${whenTrue} if ${cond} else ${whenFalse}`;
    }

    // Await
    if (ts.isAwaitExpression(node)) {
      return `await ${this.emitExpression(node.expression)}`;
    }

    // Type assertion (as) -> skip
    if (ts.isAsExpression(node)) {
      return this.emitExpression(node.expression);
    }

    // Satisfies expression -> skip (type-only, no runtime effect)
    if (ts.isSatisfiesExpression(node)) {
      return this.emitExpression(node.expression);
    }

    // Non-null assertion (!) -> skip
    if (ts.isNonNullExpression(node)) {
      return this.emitExpression(node.expression);
    }

    // Arrow function / function expression -> lambda
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      return this.emitLambda(node);
    }

    // Spread -> not supported
    if (ts.isSpreadElement(node)) {
      this.addDiagnostic(
        node,
        'error',
        'Spread operator is not supported in GDScript',
      );
      return this.emitExpression(node.expression);
    }

    // Yield -> not supported
    if (ts.isYieldExpression(node)) {
      this.addDiagnostic(
        node,
        'error',
        '`yield` is not supported; use `await` instead',
      );
      return node.getText(this.ctx.sourceFile);
    }

    // Fallback — unsupported expression
    this.addDiagnostic(
      node,
      'error',
      `Unsupported expression: ${ts.SyntaxKind[node.kind]}`,
    );
    return node.getText(this.ctx.sourceFile);
  }

  // ─── String Literals ─────────────────────────────────────────

  private emitStringLiteral(node: ts.StringLiteral): string {
    // Get the raw source text which preserves escape sequences
    const raw = node.getText(this.ctx.sourceFile);
    // If already double-quoted, use as-is
    if (raw.startsWith('"')) {
      return raw;
    }
    // Single-quoted -> double-quoted with proper escaping
    const inner = node.text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `"${inner}"`;
  }

  private escapeGdString(text: string): string {
    return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  }

  // ─── Property Access ─────────────────────────────────────────

  private emitPropertyAccess(node: ts.PropertyAccessExpression): string {
    // Optional chaining (?.) -> not supported
    if (node.questionDotToken) {
      this.addDiagnostic(
        node,
        'error',
        'Optional chaining (`?.`) is not supported in GDScript',
      );
    }
    // Inside a get/set accessor body, `this.<accessorName>` refers to the
    // GDScript backing field, which must be emitted as a bare identifier
    // (emitting `self.<name>` would recursively call the accessor).
    if (
      this.currentAccessorName &&
      node.expression.kind === ts.SyntaxKind.ThisKeyword &&
      node.name.text === this.currentAccessorName
    ) {
      return this.currentAccessorName;
    }
    // ClassName.staticProp -> self.staticProp (when accessing own class)
    if (
      ts.isIdentifier(node.expression) &&
      node.expression.text === this.currentClassName
    ) {
      return `self.${node.name.text}`;
    }
    const obj = this.emitExpression(node.expression);
    const prop = node.name.text;
    return `${obj}.${prop}`;
  }

  // ─── Call Expressions ────────────────────────────────────────

  private emitCallExpression(node: ts.CallExpression): string {
    // Optional chaining on calls (?.) -> not supported
    if (node.questionDotToken) {
      this.addDiagnostic(
        node,
        'error',
        'Optional chaining (`?.`) is not supported in GDScript',
      );
    }

    // Check each argument for `undefined` in its type.
    // Skip literal `undefined` — already caught by emitExpression's identifier check.
    const checker = this.ctx.checker;
    for (const arg of node.arguments) {
      if (ts.isIdentifier(arg) && arg.text === 'undefined') continue;
      const argType = checker.getTypeAtLocation(arg);
      if (this.typeContainsUndefined(argType)) {
        this.addDiagnostic(
          arg,
          'error',
          `Argument '${arg.getText(this.ctx.sourceFile)}' may be 'undefined', ` +
            `which is not supported in GDScript. Use 'null' instead.`,
        );
      }
    }

    const args = node.arguments.map((a) => this.emitExpression(a)).join(', ');

    // Handle gd.* helper calls
    if (ts.isPropertyAccessExpression(node.expression)) {
      const obj = node.expression.expression;
      const method = node.expression.name.text;

      // gd.as(value, Type)
      if (ts.isIdentifier(obj) && obj.text === 'gd' && method === 'as') {
        if (node.arguments.length >= 2) {
          const value = this.emitExpression(node.arguments[0]!);
          const type = this.emitExpression(node.arguments[1]!);
          return `${value} as ${type}`;
        }
      }

      // gd.is(value, Type) → value is Type
      if (ts.isIdentifier(obj) && obj.text === 'gd' && method === 'is') {
        if (node.arguments.length >= 2) {
          const value = this.emitExpression(node.arguments[0]!);
          const type = this.emitExpression(node.arguments[1]!);
          return `${value} is ${type}`;
        }
      }

      // gd.dict([[key, value], ...]) -> {key: value, ...}
      if (ts.isIdentifier(obj) && obj.text === 'gd' && method === 'dict') {
        return this.emitGdDict(node);
      }

      // gd.ops.add/sub/mul/div/eq/ne/gt/gte/lt/lte/plus/minus -> operator
      if (ts.isPropertyAccessExpression(obj)) {
        const gdObj = obj.expression;
        const opsNs = obj.name.text;
        if (ts.isIdentifier(gdObj) && gdObj.text === 'gd' && opsNs === 'ops') {
          return this.emitOpsHelper(method, node.arguments);
        }
      }

      // Handle self.method() / self.property() calls
      if (this.isSelfExpression(obj)) {
        // Check if it's a method call or function (property) call via type checker
        const symbol = this.ctx.checker.getSymbolAtLocation(node.expression);
        if (symbol) {
          const declarations = symbol.getDeclarations();
          if (declarations && declarations.length > 0) {
            const decl = declarations[0]!;
            if (ts.isPropertyDeclaration(decl)) {
              return `self.${method}.call(${args})`;
            }
          }
        }
        // Method call or default
        return `self.${method}(${args})`;
      }
    }

    const callee = this.emitExpression(node.expression);

    // Check if the callee is a Callable type (function variable, parameter)
    // In GDScript, Callable values must be invoked via .call()
    if (ts.isIdentifier(node.expression)) {
      const symbol = this.ctx.checker.getSymbolAtLocation(node.expression);
      if (symbol) {
        const declarations = symbol.getDeclarations();
        if (declarations && declarations.length > 0) {
          const decl = declarations[0]!;
          // Local variables and parameters holding callables need .call()
          if (ts.isVariableDeclaration(decl) || ts.isParameter(decl)) {
            const type = this.ctx.checker.getTypeAtLocation(node.expression);
            if (
              type.getCallSignatures().length > 0 &&
              !type.getConstructSignatures().length
            ) {
              return `${callee}.call(${args})`;
            }
          }
        }
      }
    }

    return `${callee}(${args})`;
  }

  /** Check if an expression evaluates to `self` (i.e., is `this`) */
  private isSelfExpression(node: ts.Expression): boolean {
    return node.kind === ts.SyntaxKind.ThisKeyword;
  }

  // ─── Operator Helpers ────────────────────────────────────────

  private emitOpsHelper(
    method: string,
    args: ts.NodeArray<ts.Expression>,
  ): string {
    const operands = args.map((a) => this.emitExpression(a));

    // Unary operators (1 arg)
    if (method === 'plus' && operands.length === 1) return `+${operands[0]}`;
    if (method === 'minus' && operands.length === 1) return `-${operands[0]}`;

    // Binary operators (2 args)
    const binaryOpMap: Record<string, string> = {
      add: ' + ',
      sub: ' - ',
      mul: ' * ',
      div: ' / ',
      rem: ' % ',
      eq: ' == ',
      ne: ' != ',
      gt: ' > ',
      gte: ' >= ',
      lt: ' < ',
      lte: ' <= ',
    };
    const op = binaryOpMap[method];
    if (op && operands.length === 2) {
      return `(${operands[0]}${op}${operands[1]})`;
    }
    return `${operands.join(', ')}`;
  }

  // ─── gd.dict() ─────────────────────────────────────────────

  private emitGdDict(node: ts.CallExpression): string {
    if (node.arguments.length !== 1) {
      this.addDiagnostic(
        node,
        'error',
        'gd.dict() requires exactly one argument (array of [key, value] pairs)',
      );
      return '{}';
    }

    const arg = node.arguments[0]!;
    if (!ts.isArrayLiteralExpression(arg)) {
      this.addDiagnostic(
        node,
        'error',
        'gd.dict() argument must be an array literal of [key, value] pairs',
      );
      return '{}';
    }

    const entries: string[] = [];
    for (const element of arg.elements) {
      if (
        !ts.isArrayLiteralExpression(element) ||
        element.elements.length !== 2
      ) {
        this.addDiagnostic(
          element,
          'error',
          'gd.dict() entries must be [key, value] tuples',
        );
        continue;
      }

      const keyNode = element.elements[0]!;
      const valueNode = element.elements[1]!;

      let key: string;
      if (ts.isStringLiteral(keyNode)) {
        key = this.emitStringLiteral(keyNode);
      } else if (ts.isNumericLiteral(keyNode)) {
        key = keyNode.getText(this.ctx.sourceFile);
      } else if (ts.isIdentifier(keyNode)) {
        key = keyNode.text;
      } else if (ts.isPropertyAccessExpression(keyNode)) {
        key = this.emitExpression(keyNode);
      } else {
        this.addDiagnostic(
          keyNode,
          'error',
          'gd.dict() keys must be identifiers, property accesses, or string/number literals, not expressions',
        );
        key = keyNode.getText(this.ctx.sourceFile);
      }

      const value = this.emitExpression(valueNode);
      entries.push(`${key}: ${value}`);
    }

    if (entries.length === 0) {
      return '{}';
    }

    return this.emitMultiLineDict(entries);
  }

  /** Emit a multi-line GDScript dict with proper indentation */
  private emitMultiLineDict(entries: string[]): string {
    const innerIndent = this.emitter.getIndentStr(
      this.emitter.getIndentLevel() + 1,
    );
    const outerIndent = this.emitter.getIndentStr();
    const lines = entries.map((e) => `${innerIndent}${e},`);
    return `{\n${lines.join('\n')}\n${outerIndent}}`;
  }

  // ─── Binary Expressions ─────────────────────────────────────

  private emitBinaryExpression(node: ts.BinaryExpression): string {
    // Nullish coalescing (??) -> not supported
    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      this.addDiagnostic(
        node,
        'error',
        'Nullish coalescing (`??`) is not supported in GDScript',
      );
    }
    // Nullish coalescing assignment (??=) -> not supported
    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      this.addDiagnostic(
        node,
        'error',
        'Nullish coalescing assignment (`??=`) is not supported in GDScript',
      );
    }
    // `x in y` — GDScript only supports `in` on Dictionary and String.
    // Arrays, Packed*Array, and all value types (Vector2, Color, ...) are invalid.
    if (node.operatorToken.kind === ts.SyntaxKind.InKeyword) {
      this.checkInOperatorRhs(node);
    }
    const left = this.emitExpression(node.left);
    const right = this.emitExpression(node.right);
    const op = this.binaryOperator(node.operatorToken.kind);
    return `${left} ${op} ${right}`;
  }

  /**
   * Report an error if the right-hand side of a `x in y` expression resolves
   * to a type that GDScript doesn't support with `in`. Only `Dictionary`
   * (object-like types) and `String` are valid; arrays, Packed*Array, and
   * value types like `Vector2`/`Color` are rejected.
   */
  private checkInOperatorRhs(node: ts.BinaryExpression): void {
    const rhs = node.right;
    const checker = this.ctx.checker;
    const type = checker.getTypeAtLocation(rhs);

    // Collapse union types to their non-null constituents
    const baseTypes = type.isUnion()
      ? type.types.filter(
          (t) =>
            !(t.flags & ts.TypeFlags.Null) &&
            !(t.flags & ts.TypeFlags.Undefined),
        )
      : [type];

    for (const t of baseTypes) {
      const banned = classifyInRhsType(t, checker);
      if (banned) {
        this.addDiagnostic(
          node,
          'error',
          `The \`in\` operator cannot be used with ${banned} in GDScript. ` +
            `Only Dictionary and String support \`in\`.`,
        );
        return;
      }
    }
  }

  private binaryOperator(kind: ts.SyntaxKind): string {
    switch (kind) {
      case ts.SyntaxKind.PlusToken:
        return '+';
      case ts.SyntaxKind.MinusToken:
        return '-';
      case ts.SyntaxKind.AsteriskToken:
        return '*';
      case ts.SyntaxKind.SlashToken:
        return '/';
      case ts.SyntaxKind.PercentToken:
        return '%';
      case ts.SyntaxKind.AsteriskAsteriskToken:
        return '**';
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        return '==';
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        return '!=';
      case ts.SyntaxKind.EqualsEqualsToken:
        return '==';
      case ts.SyntaxKind.ExclamationEqualsToken:
        return '!=';
      case ts.SyntaxKind.LessThanToken:
        return '<';
      case ts.SyntaxKind.LessThanEqualsToken:
        return '<=';
      case ts.SyntaxKind.GreaterThanToken:
        return '>';
      case ts.SyntaxKind.GreaterThanEqualsToken:
        return '>=';
      case ts.SyntaxKind.AmpersandAmpersandToken:
        return 'and';
      case ts.SyntaxKind.BarBarToken:
        return 'or';
      case ts.SyntaxKind.EqualsToken:
        return '=';
      case ts.SyntaxKind.PlusEqualsToken:
        return '+=';
      case ts.SyntaxKind.MinusEqualsToken:
        return '-=';
      case ts.SyntaxKind.AsteriskEqualsToken:
        return '*=';
      case ts.SyntaxKind.SlashEqualsToken:
        return '/=';
      case ts.SyntaxKind.PercentEqualsToken:
        return '%=';
      case ts.SyntaxKind.AmpersandToken:
        return '&';
      case ts.SyntaxKind.BarToken:
        return '|';
      case ts.SyntaxKind.CaretToken:
        return '^';
      case ts.SyntaxKind.LessThanLessThanToken:
        return '<<';
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        return '>>';
      case ts.SyntaxKind.InKeyword:
        return 'in';
      case ts.SyntaxKind.InstanceOfKeyword:
        return 'is';
      default:
        return '??';
    }
  }

  private unaryOperator(op: ts.PrefixUnaryOperator): string {
    switch (op) {
      case ts.SyntaxKind.ExclamationToken:
        return 'not ';
      case ts.SyntaxKind.MinusToken:
        return '-';
      case ts.SyntaxKind.PlusToken:
        return '+';
      case ts.SyntaxKind.TildeToken:
        return '~';
      default:
        return '';
    }
  }

  // ─── Template Literals ───────────────────────────────────────

  private emitTemplateExpression(node: ts.TemplateExpression): string {
    let result = `"${this.escapeGdString(node.head.text)}"`;
    for (const span of node.templateSpans) {
      const expr = this.emitExpression(span.expression);
      result += ` + str(${expr})`;
      if (span.literal.text) {
        result += ` + "${this.escapeGdString(span.literal.text)}"`;
      }
    }
    return result;
  }

  // ─── Lambda ──────────────────────────────────────────────────

  private emitLambda(node: ts.ArrowFunction | ts.FunctionExpression): string {
    const params = this.emitParameters(node.parameters);

    // Return type
    const returnType = tsTypeNodeToGdType(
      node.type,
      this.ctx.checker,
      this.ctx.sourceFile,
    this.currentClassName,
    );
    const returnAnnotation = returnType ? ` -> ${returnType}` : '';

    if (ts.isBlock(node.body)) {
      // Multi-line lambda: return header only. Body will be emitted by emitLambdaBody().
      return `func(${params})${returnAnnotation}:`;
    }

    // Single expression lambda
    const body = this.emitExpression(node.body);
    return `func(${params})${returnAnnotation}: return ${body}`;
  }

  /**
   * Check if an expression is a block-body lambda (arrow function or function expression with a block body).
   */
  private isBlockLambda(
    node: ts.Expression,
  ): node is ts.ArrowFunction | ts.FunctionExpression {
    return (
      (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
      ts.isBlock(node.body)
    );
  }

  /**
   * Emit the body of a block lambda. Call this after the line containing the lambda header.
   */
  private emitLambdaBody(node: ts.ArrowFunction | ts.FunctionExpression): void {
    if (!ts.isBlock(node.body)) return;
    this.emitter.indent();
    if (node.body.statements.length === 0) {
      this.emitter.writeLine('pass');
    } else {
      this.visitBlock(node.body);
    }
    this.emitter.dedent();
  }

  // ─── Decorators ──────────────────────────────────────────────

  private getDecorators(node: ts.HasDecorators): string[] {
    const result: string[] = [];
    const decorators = ts.getDecorators(node);
    if (!decorators) return result;

    for (const dec of decorators) {
      if (ts.isCallExpression(dec.expression)) {
        const callExpr = dec.expression;
        if (ts.isPropertyAccessExpression(callExpr.expression)) {
          // Legacy @gd.export_range(...) style
          const obj = callExpr.expression.expression;
          const method = callExpr.expression.name.text;
          if (ts.isIdentifier(obj) && obj.text === 'gd') {
            const args = callExpr.arguments
              .map((a) => this.emitExpression(a))
              .join(', ');
            if (args) {
              result.push(`@${method}(${args})`);
            } else {
              result.push(`@${method}`);
            }
          }
        } else if (ts.isIdentifier(callExpr.expression)) {
          // Global decorator call: @export_range(0, 100), @icon("res://icon.png")
          let name = callExpr.expression.text;
          // 'exports' in TS → 'export' in GDScript
          if (name === 'exports') name = 'export';
          const args = callExpr.arguments
            .map((a) => this.emitExpression(a))
            .join(', ');
          if (args) {
            result.push(`@${name}(${args})`);
          } else {
            result.push(`@${name}`);
          }
        }
      } else if (ts.isPropertyAccessExpression(dec.expression)) {
        // Legacy @gd.export style
        const obj = dec.expression.expression;
        const method = dec.expression.name.text;
        if (ts.isIdentifier(obj) && obj.text === 'gd') {
          result.push(`@${method}`);
        }
      } else if (ts.isIdentifier(dec.expression)) {
        // Global decorator: @exports, @onready, @tool
        let name = dec.expression.text;
        // 'exports' in TS → 'export' in GDScript
        if (name === 'exports') name = 'export';
        result.push(`@${name}`);
      }
    }
    return result;
  }

  // ─── Helpers ─────────────────────────────────────────────────

  private isGdHelperCall(node: ts.Expression, methodName: string): boolean {
    if (!ts.isCallExpression(node)) return false;
    if (!ts.isPropertyAccessExpression(node.expression)) return false;
    const obj = node.expression.expression;
    return (
      ts.isIdentifier(obj) &&
      obj.text === 'gd' &&
      node.expression.name.text === methodName
    );
  }

  private getLineAndCol(node: ts.Node): { line: number; col: number } {
    const { line, character } =
      this.ctx.sourceFile.getLineAndCharacterOfPosition(
        node.getStart(this.ctx.sourceFile),
      );
    return { line: line + 1, col: character };
  }

  private addDiagnostic(
    node: ts.Node,
    severity: TransformDiagnostic['severity'],
    message: string,
  ): void {
    const { line, col } = this.getLineAndCol(node);
    this.ctx.diagnostics.push({
      message,
      severity,
      file: this.ctx.filePath,
      line,
      column: col,
    });
    // Emit inline error comment in output for --emit-on-error visibility
    if (severity === 'error') {
      this.emitter.writeLine(`# ERROR: ${message}`, line, col);
    }
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/^[A-Z]+/, (m) => m.charAt(0) + m.slice(1).toLowerCase())
      .replace(/_([a-zA-Z])/g, (_, c: string) => c.toUpperCase())
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  }
}
