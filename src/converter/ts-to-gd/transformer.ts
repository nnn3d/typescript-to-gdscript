import ts from 'typescript';
import type {
  TransformContext,
  TransformResult,
  TransformDiagnostic,
} from '../common/index.ts';
import {
  tsTypeNodeToGdType,
  isAnonymousClassName,
} from '../common/index.ts';
import { processImports, type ImportEntry } from './imports.ts';
import { GDScriptEmitter } from './emitter.ts';
import type { TransformerDelegate } from './transformer-types.ts';
import {
  isSignalProperty,
  isEnumProperty,
  visitSignalDeclaration,
  visitEnumDeclaration,
  visitPropertyDeclaration,
  visitAccessorPair,
  visitGdGetsetProperty as visitGdGetsetImpl,
  visitInnerClassDeclaration as visitInnerClassImpl,
  visitConstructor as visitConstructorImpl,
  visitMethodDeclaration as visitMethodImpl,
  getDecorators as getDecoratorsImpl,
  toPascalCase,
} from './class-members.ts';
import { emitParameters as emitParametersImpl } from './parameters.ts';
import {
  visitBlock as visitBlockImpl,
  visitStatement as visitStatementImpl,
  visitVariableStatement as visitVariableStatementImpl,
} from './statements.ts';
import {
  emitExpression as emitExpressionImpl,
  emitStringLiteral as emitStringLiteralImpl,
  escapeGdString as escapeGdStringImpl,
  isBlockLambda as isBlockLambdaImpl,
  emitLambdaBody as emitLambdaBodyImpl,
  emitMultiLineDict as emitMultiLineDictImpl,
} from './expressions.ts';

export interface TransformerOptions {
  sourceMap: boolean;
}

/**
 * Transforms a TypeScript AST into GDScript code.
 *
 * The class acts as the orchestrator: it owns the emitter and context,
 * implements TransformerDelegate, and delegates expression/statement/parameter
 * handling to dedicated module functions.
 */
export class TsToGdTransformer implements TransformerDelegate {
  readonly ctx: TransformContext;
  readonly emitter: GDScriptEmitter;
  private opts: TransformerOptions;
  private _currentClassName: string = '';
  /**
   * Name of the property whose get/set accessor body is currently being
   * emitted. Inside the body, `this.<accessorName>` is stripped to a bare
   * identifier to reference the GDScript backing field (emitting `self.X`
   * inside `get X`/`set X` would cause infinite recursion in GDScript).
   */
  private _currentAccessorName: string | null = null;
  /**
   * Local-name → import entry, populated once at the start of
   * `transform()` and reused across `visitClassDeclaration` (extends
   * rewrite) and field-conflict checks. Empty when the file has no
   * preload-worthy imports — see `processImports` for the inclusion
   * rules.
   */
  private _importMap: Map<string, ImportEntry> = new Map();
  /**
   * Pre-rendered `const X = preload("res://…")` lines emitted between
   * `class_name` and the class body. Order preserved from source.
   */
  private _importConsts: string[] = [];

  get currentClassName(): string {
    return this._currentClassName;
  }

  get currentAccessorName(): string | null {
    return this._currentAccessorName;
  }

  setCurrentAccessorName(name: string | null): void {
    this._currentAccessorName = name;
  }

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

    // Build the import map BEFORE visiting any statements so the
    // class-emit path can consult it for `extends`-rewrites and the
    // member-emit path can flag field-name conflicts.
    const imports = processImports(this.ctx.sourceFile, this.ctx);
    this._importMap = imports.importMap;
    this._importConsts = imports.consts;
    for (const err of imports.errors) {
      this.ctx.diagnostics.push(err);
    }

    this.visitSourceFile(this.ctx.sourceFile);

    return {
      code: this.emitter.getOutput(),
      sourceMap: this.emitter.getSourceMap(),
      diagnostics: this.ctx.diagnostics,
    };
  }

  // ---- TransformerDelegate: delegated to modules ----

  emitExpression(node: ts.Expression): string {
    return emitExpressionImpl(this, node);
  }

  visitStatement(node: ts.Statement): void {
    visitStatementImpl(this, node);
  }

  visitBlock(block: ts.Block): void {
    visitBlockImpl(this, block);
  }

  visitVariableStatement(node: ts.VariableStatement): void {
    visitVariableStatementImpl(this, node);
  }

  emitParameters(params: ts.NodeArray<ts.ParameterDeclaration>): string {
    return emitParametersImpl(this, params);
  }

  emitLeadingComments(node: ts.Node): void {
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
        // @gd.eval: magic comment -> emit raw GDScript
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
            // Multiline block comment -- strip indent matching the comment's own column
            const rawLines = content.split('\n');
            const nonEmpty = rawLines.filter(l => l.trim() !== '');
            // Strip indent equal to the comment's own column position
            const stripAmount = character;
            this.emitter.writeLine(`"""`, origLine, origCol);
            for (const ln of nonEmpty) {
              // Strip up to stripAmount leading spaces/tabs
              let stripped = ln;
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

  emitStringLiteral(node: ts.StringLiteral): string {
    return emitStringLiteralImpl(this, node);
  }

  escapeGdString(text: string): string {
    return escapeGdStringImpl(text);
  }

  isBlockLambda(node: ts.Expression): node is ts.ArrowFunction | ts.FunctionExpression {
    return isBlockLambdaImpl(node);
  }

  emitLambdaBody(node: ts.ArrowFunction | ts.FunctionExpression): void {
    emitLambdaBodyImpl(this, node);
  }

  addDiagnostic(
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

  getLineAndCol(node: ts.Node): { line: number; col: number } {
    const { line, character } =
      this.ctx.sourceFile.getLineAndCharacterOfPosition(
        node.getStart(this.ctx.sourceFile),
      );
    return { line: line + 1, col: character };
  }

  isGdHelperCall(node: ts.Expression, methodName: string): boolean {
    if (!ts.isCallExpression(node)) return false;
    if (!ts.isPropertyAccessExpression(node.expression)) return false;
    const obj = node.expression.expression;
    return (
      ts.isIdentifier(obj) &&
      obj.text === 'gd' &&
      node.expression.name.text === methodName
    );
  }

  emitMultiLineDict(entries: string[]): string {
    return emitMultiLineDictImpl(this, entries);
  }

  // ---- Source File ----

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

  // ---- Class Declaration ----

  private visitClassDeclaration(node: ts.ClassDeclaration): void {
    const pos = this.getLineAndCol(node);

    // abstract class -> @abstract annotation before extends/class_name
    const isAbstract = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.AbstractKeyword,
    );
    if (isAbstract) {
      this.emitter.writeLine('@abstract', pos.line, pos.col);
    }

    // extends — rewritten to `extends "res://…"` when the base type
    // resolves to an imported anonymous class (which has no
    // `class_name`, so a string-literal path is the only valid form).
    // For non-anonymous and same-file extends, emit the bare identifier.
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (
          clause.token === ts.SyntaxKind.ExtendsKeyword &&
          clause.types.length > 0
        ) {
          const baseType = clause.types[0]!;
          const baseText = baseType.expression.getText(this.ctx.sourceFile);
          const importedAnon = this._importMap.get(baseText);
          const extendsClause =
            importedAnon && importedAnon.isAnonymous
              ? `extends "${importedAnon.resPath}"`
              : `extends ${baseText}`;
          this.emitter.writeLine(extendsClause, pos.line, pos.col);
        }
      }
    }

    // class_name emission rules under the new naming convention:
    //   - `_FilenameInUpperCamel`  → anonymous; do NOT emit `class_name`
    //   - everything else          → emit `class_name <name>` verbatim
    //
    // `G_` is the one-way escape applied during GD→TS conversion as a
    // fallback for the rare GD `class_name _Foo` that would otherwise
    // collide with the anonymous-class convention on the TS side. It
    // is NOT undone on TS→GD — once the user has `G_Foo` in their TS
    // source, that becomes the canonical name everywhere (the emitted
    // GD has `class_name G_Foo`). Treating it as a normal identifier
    // keeps the round-trip predictable: whatever TS shows is what the
    // user reads in the .gd file too.
    const className = node.name?.getText(this.ctx.sourceFile) ?? '';
    this._currentClassName = className;
    if (className && !isAnonymousClassName(className)) {
      this.emitter.writeLine(
        `class_name ${className}`,
        pos.line,
        pos.col,
      );
    }

    // `const X = preload("res://…")` lines for renamed and anonymous
    // imports. Emitted between `class_name`/`extends` and the class
    // body — the conventional spot for top-level `const` in GDScript.
    if (this._importConsts.length > 0) {
      this.emitter.writeEmptyLine();
      for (const line of this._importConsts) {
        this.emitter.writeLine(line, pos.line, pos.col);
      }
    }

    // Hard-error any class field whose name collides with an imported
    // local (renamed class or anonymous class). The `const X = preload`
    // we just emitted would conflict with `var X` in GD — so it's
    // better to surface this as a structured diagnostic anchored at
    // the offending field's source location than to let GD spit out
    // a confusing parse error.
    for (const member of node.members) {
      if (
        (ts.isPropertyDeclaration(member) || ts.isMethodDeclaration(member)) &&
        member.name &&
        ts.isIdentifier(member.name)
      ) {
        const name = member.name.text;
        if (this._importMap.has(name)) {
          this.addDiagnostic(
            member.name,
            'error',
            `Field/method name "${name}" conflicts with an imported class of the same name. Rename the field or the import alias.`,
          );
        }
      }
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

      // A "function-like" entry -- methods, constructors, accessors, and
      // properties initialized via `gd.getset` -- should be surrounded by
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

  // ---- Inline Comments ----

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

  // ---- Class Members (delegated to class-members.ts) ----

  private isSignalProperty(node: ts.PropertyDeclaration): boolean {
    return isSignalProperty(node, this);
  }

  private visitSignalDeclaration(node: ts.PropertyDeclaration): void {
    visitSignalDeclaration(node, this);
  }

  private isEnumProperty(node: ts.PropertyDeclaration): boolean {
    return isEnumProperty(node, this);
  }

  private visitEnumDeclaration(node: ts.PropertyDeclaration): void {
    visitEnumDeclaration(node, this);
  }

  private visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
    visitPropertyDeclaration(node, this);
  }

  private visitAccessorPair(
    name: string,
    getNode: ts.GetAccessorDeclaration | undefined,
    setNode: ts.SetAccessorDeclaration | undefined,
  ): void {
    visitAccessorPair(name, getNode, setNode, this);
  }

  private visitGdGetsetProperty(
    name: string, node: ts.PropertyDeclaration, call: ts.CallExpression,
  ): void {
    visitGdGetsetImpl(name, node, call, this);
  }

  private visitInnerClassDeclaration(
    name: string, classExpr: ts.ClassExpression, property: ts.PropertyDeclaration,
  ): void {
    visitInnerClassImpl(name, classExpr, property, this);
  }

  // ---- Constructor -> _init ----

  private visitConstructor(node: ts.ConstructorDeclaration): void {
    visitConstructorImpl(node, this);
  }

  // ---- Methods ----

  private visitMethodDeclaration(node: ts.MethodDeclaration): void {
    visitMethodImpl(node, this);
  }

  // ---- Decorators ----

  private getDecorators(node: ts.HasDecorators): string[] {
    return getDecoratorsImpl(node, this);
  }

  // ---- Helpers ----

  private toPascalCase(str: string): string {
    return toPascalCase(str);
  }
}
