/**
 * Unsafe helper fixes for GD-to-TS post-processing.
 * - collectUnsafeAnyFieldFixes: adds `any` type annotations to untyped fields/params
 * - collectUnsafeNonNullFixes: adds `!` non-null assertions for "possibly null" errors
 * - collectExtendsTypeFixes: copies parent method param types to overrides
 */

import ts from 'typescript';
import type { SourceFix } from '../ts-helpers.ts';
import { findNodeAt } from './explicit-convert.ts';
import { findEnclosingClass } from './ready-field-types.ts';

// ─── Extends Type Helper ─────────────────────────────────────

/**
 * TS error code for implicit-any parameters.
 * - TS7006: Parameter 'X' implicitly has an 'any' type.
 */
export const TS_IMPLICIT_ANY_PARAM_CODE = 7006;

/**
 * Walk up from a node to find the enclosing MethodDeclaration.
 */
export function findEnclosingMethod(node: ts.Node): ts.MethodDeclaration | undefined {
  let current: ts.Node | undefined = node;
  while (current) {
    if (ts.isMethodDeclaration(current)) return current;
    current = current.parent;
  }
  return undefined;
}

/**
 * Look up the parent-class signature for a method by name, walking the
 * inheritance chain via the TS checker. Returns the first call signature found.
 */
export function findParentMethodSignature(
  cls: ts.ClassDeclaration,
  methodName: string,
  checker: ts.TypeChecker,
): ts.Signature | undefined {
  // Use the class's own declared type and walk its base types via the checker.
  // This correctly resolves `Node2D -> CanvasItem -> Node` for overridden methods.
  const classType = checker.getTypeAtLocation(cls);
  const baseTypes = classType.getBaseTypes() ?? [];
  for (const baseType of baseTypes) {
    const symbol = baseType.getProperty(methodName);
    if (!symbol) continue;
    const decl = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];
    if (!decl) continue;
    const methodType = checker.getTypeOfSymbolAtLocation(symbol, decl);
    const signatures = methodType.getCallSignatures();
    if (signatures.length > 0) return signatures[0];
  }
  return undefined;
}

/**
 * Collect TS7006 errors on parameters of methods that override inherited
 * methods, and produce type-annotation insertion fixes using the parent's
 * parameter types.
 */
export function collectExtendsTypeFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();
  const checker = program.getTypeChecker();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);

    // Cache parent signatures per (class,method) to avoid repeated lookups
    const sigCache = new Map<string, ts.Signature | undefined>();

    for (const diag of diagnostics) {
      if (diag.code !== TS_IMPLICIT_ANY_PARAM_CODE) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Walk up to the Parameter
      let paramDecl: ts.ParameterDeclaration | undefined;
      let current: ts.Node | undefined = node;
      while (current) {
        if (ts.isParameter(current)) {
          paramDecl = current;
          break;
        }
        current = current.parent;
      }
      if (!paramDecl || paramDecl.type) continue; // already typed

      const method = findEnclosingMethod(paramDecl);
      if (!method || !ts.isIdentifier(method.name)) continue;
      const cls = findEnclosingClass(method);
      if (!cls) continue;

      const methodName = method.name.text;
      const cacheKey = `${cls.pos}:${methodName}`;
      let parentSig = sigCache.get(cacheKey);
      if (!sigCache.has(cacheKey)) {
        parentSig = findParentMethodSignature(cls, methodName, checker);
        sigCache.set(cacheKey, parentSig);
      }
      if (!parentSig) continue;

      // Find matching parameter by index (name-based matching is unreliable
      // because overrides often rename parameters).
      const paramIndex = method.parameters.indexOf(paramDecl);
      const parentParams = parentSig.getParameters();
      const parentParam = parentParams[paramIndex];
      if (!parentParam) continue;

      const parentParamDecl = parentParam.valueDeclaration;
      if (!parentParamDecl || !ts.isParameter(parentParamDecl)) continue;

      // Prefer the SYNTACTIC type text from the parent's .d.ts declaration so
      // that type aliases like `float`/`int` are preserved (the checker would
      // resolve them to `number`).
      let typeText: string;
      if (parentParamDecl.type) {
        typeText = parentParamDecl.type.getText(parentParamDecl.getSourceFile());
      } else {
        const parentType = checker.getTypeOfSymbolAtLocation(
          parentParam,
          parentParamDecl,
        );
        typeText = checker.typeToString(
          parentType,
          method,
          ts.TypeFormatFlags.NoTruncation |
            ts.TypeFormatFlags.UseFullyQualifiedType,
        );
      }
      if (!typeText || typeText === 'any' || typeText === 'error') continue;

      const insertAt = paramDecl.name.getEnd();
      const replacement = `: ${typeText}`;

      let fixes = fixesByFile.get(fileName);
      if (!fixes) {
        fixes = [];
        fixesByFile.set(fileName, fixes);
      }
      fixes.push({ start: insertAt, end: insertAt, replacement });
    }
  }

  return fixesByFile;
}

// ─── Unsafe Any Fallback Helper ──────────────────────────────

/**
 * (unsafe) Add `any` type annotations to any class properties and function
 * parameters that still have no explicit type after other helpers have run.
 * Only activated via `--unsafe-use-any`. Intended as a final cleanup pass so
 * the converted TS code compiles even when earlier helpers couldn't infer a
 * concrete type.
 *
 * - Class property without a type -> insert `!: any` after the name (or `: any`
 *   after an existing `!`/`?` token). Ignores properties that already have
 *   a type annotation.
 * - Function/method/arrow/constructor parameter without a type -> insert
 *   `: any` after the parameter name (or after its `?` token if optional).
 *   Rest parameters get `: any[]`.
 */
export function collectUnsafeAnyFieldFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);
    const fixedPositions = new Set<number>();
    const fixes: SourceFix[] = [];

    const pushFix = (start: number, replacement: string) => {
      if (fixedPositions.has(start)) return;
      fixedPositions.add(start);
      fixes.push({ start, end: start, replacement });
    };

    for (const diag of diagnostics) {
      // TS7006: Parameter 'X' implicitly has an 'any' type.
      // TS7008: Member 'X' implicitly has an 'any' type.
      // TS7034: Variable 'X' implicitly has type 'any[]' in some locations.
      if (diag.code !== 7006 && diag.code !== 7008 && diag.code !== 7034) continue;
      if (diag.start === undefined || diag.length === undefined) continue;

      const node = findNodeAt(sourceFile, diag.start, diag.length);
      if (!node) continue;

      // Walk up to PropertyDeclaration, ParameterDeclaration, or VariableDeclaration
      let current: ts.Node | undefined = node;
      let propDecl: ts.PropertyDeclaration | undefined;
      let paramDecl: ts.ParameterDeclaration | undefined;
      let varDecl: ts.VariableDeclaration | undefined;
      while (current) {
        if (ts.isPropertyDeclaration(current)) {
          propDecl = current;
          break;
        }
        if (ts.isParameter(current)) {
          paramDecl = current;
          break;
        }
        if (ts.isVariableDeclaration(current)) {
          varDecl = current;
          break;
        }
        current = current.parent;
      }

      if (propDecl) {
        if (propDecl.type) continue; // already typed
        // Insert after `!`/`?` if present, otherwise after the name. Add
        // `!` ourselves if neither is present so TS2564 doesn't fire later.
        if (propDecl.exclamationToken) {
          pushFix(propDecl.exclamationToken.getEnd(), ': any');
        } else if (propDecl.questionToken) {
          pushFix(propDecl.questionToken.getEnd(), ': any');
        } else {
          pushFix(propDecl.name.getEnd(), '!: any');
        }
        continue;
      }

      if (paramDecl) {
        if (paramDecl.type) continue;
        // Rest parameter -> `: any[]`
        const typeText = paramDecl.dotDotDotToken ? ': any[]' : ': any';
        // Insert after `?` if optional, otherwise after the name
        if (paramDecl.questionToken) {
          pushFix(paramDecl.questionToken.getEnd(), typeText);
        } else {
          pushFix(paramDecl.name.getEnd(), typeText);
        }
        continue;
      }

      if (varDecl) {
        if (varDecl.type) continue; // already typed
        // TS7034: variable implicitly has `any[]` -- add `: any[]` after the name
        pushFix(varDecl.name.getEnd(), ': any[]');
        continue;
      }
    }

    if (fixes.length > 0) {
      fixesByFile.set(fileName, fixes);
    }
  }

  return fixesByFile;
}

// ─── Unsafe Non-Null Assertion Helper ───────────────────────

/**
 * TS error codes for "possibly null/undefined" that can be suppressed with `!`.
 * - TS2531: Object is possibly 'null'.
 * - TS18047: 'X' is possibly 'null'.
 * - TS18048: 'X' is possibly 'null' or 'undefined'.
 * - TS18046: 'X' is of type 'unknown'.
 */
export const TS_POSSIBLY_NULL_CODES = new Set([2531, 18047, 18048, 18046]);

/**
 * Check if a TS2322 diagnostic is caused by null in a union type.
 * Looks for "Type 'null' is not assignable to type" in the message chain.
 */
export function isNullAssignmentError(messageText: string | ts.DiagnosticMessageChain): boolean {
  if (typeof messageText === 'string') {
    return /type 'null' is not assignable to type/i.test(messageText);
  }
  if (/type 'null' is not assignable to type/i.test(messageText.messageText)) return true;
  if (messageText.next) {
    for (const sub of messageText.next) {
      if (isNullAssignmentError(sub)) return true;
    }
  }
  return false;
}

/**
 * Collect "possibly null" errors and produce `!` (non-null assertion) fixes.
 * Also handles TS2322 where the error is caused by `T | null` assigned to `T`
 * (adds `!` after the RHS expression).
 * Only runs when `--unsafe-use-any` is set (Phase 2).
 */
export function collectUnsafeNonNullFixes(
  program: ts.Program,
  filePaths: Set<string>,
): Map<string, SourceFix[]> {
  const fixesByFile = new Map<string, SourceFix[]>();

  for (const sourceFile of program.getSourceFiles()) {
    const fileName = sourceFile.fileName;
    if (!filePaths.has(fileName)) continue;

    const diagnostics = program.getSemanticDiagnostics(sourceFile);
    const fixedPositions = new Set<number>();
    const fixes: SourceFix[] = [];
    const sourceText = sourceFile.getFullText();

    const pushNonNull = (pos: number) => {
      if (fixedPositions.has(pos)) return;
      if (sourceText[pos] === '!') return; // already has `!`
      fixedPositions.add(pos);
      fixes.push({ start: pos, end: pos, replacement: '!' });
    };

    for (const diag of diagnostics) {
      if (diag.start === undefined || diag.length === undefined) continue;

      // Direct "possibly null" errors -- insert `!` right after the expression
      if (TS_POSSIBLY_NULL_CODES.has(diag.code)) {
        pushNonNull(diag.start + diag.length);
        continue;
      }

      // TS2322: "Type 'X | null' is not assignable to type 'X'"
      // TS2345: "Argument of type 'X | null' is not assignable to parameter of type 'X'"
      // where the root cause is null -- insert `!` after the expression
      if ((diag.code === 2322 || diag.code === 2345) && isNullAssignmentError(diag.messageText)) {
        let node = findNodeAt(sourceFile, diag.start, diag.length);
        if (!node) continue;

        // Redirect from LHS/keyword to the actual value expression
        const parent = node.parent;
        if (
          ts.isIdentifier(node) &&
          (ts.isVariableDeclaration(parent) || ts.isPropertyDeclaration(parent)) &&
          parent.name === node &&
          parent.initializer
        ) {
          node = parent.initializer;
        } else if (
          ts.isBinaryExpression(parent) &&
          parent.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          parent.left === node
        ) {
          node = parent.right;
        } else if (
          ts.isReturnStatement(parent) &&
          parent.expression
        ) {
          node = parent.expression;
        }

        pushNonNull(node.getEnd());
        continue;
      }
    }

    if (fixes.length > 0) {
      fixesByFile.set(fileName, fixes);
    }
  }

  return fixesByFile;
}
