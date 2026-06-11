import ts from 'typescript';
import { tsTypeNodeToGdType } from '../common/index.ts';
import { classifyInRhsType } from './diagnostics.ts';
import {
  tryEmitGdAs,
  tryEmitGdIs,
  tryEmitGdDict,
  tryEmitGdOps,
} from './gd-helpers.ts';
import { typeContainsUndefined } from './parameters.ts';
import { isPlainObjectType, isAssignmentTarget } from './access-rewrite.ts';
import type { TransformerDelegate } from './transformer-types.ts';

// ---- Main Expression Emitter ----

export function emitExpression(
  t: TransformerDelegate,
  node: ts.Expression,
): string {
  // Identifiers
  if (ts.isIdentifier(node)) {
    const text = node.text;
    if (text === 'undefined') {
      t.addDiagnostic(node, 'error', '`undefined` is restricted; use `null`');
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

  // Numeric literals -- preserve original source text to keep 100.0 vs 100
  if (ts.isNumericLiteral(node)) {
    return node.getText(t.ctx.sourceFile);
  }

  // String literals -- properly escape
  if (ts.isStringLiteral(node)) {
    return t.emitStringLiteral(node);
  }

  // Template literals
  if (ts.isTemplateExpression(node)) {
    return emitTemplateExpression(t, node);
  }
  if (ts.isNoSubstitutionTemplateLiteral(node)) {
    return `"${t.escapeGdString(node.text)}"`;
  }

  // Property access
  if (ts.isPropertyAccessExpression(node)) {
    return emitPropertyAccess(t, node);
  }

  // Element access: a[b] — convert standalone reads to .get() when the
  // object is a plain TS object (a Dictionary in GD), or when the element
  // type includes undefined (legacy fallback for other object kinds).
  if (ts.isElementAccessExpression(node)) {
    const elemType = t.ctx.checker.getTypeAtLocation(node);
    const objType = t.ctx.checker.getTypeAtLocation(node.expression);
    if (
      isPlainObjectType(objType, t.ctx.checker, t.ctx.registry) ||
      typeContainsUndefined(elemType)
    ) {
      const parent = node.parent;
      const isChainedOrCalled =
        (ts.isCallExpression(parent) && parent.expression === node) ||
        (ts.isPropertyAccessExpression(parent) && parent.expression === node) ||
        (ts.isElementAccessExpression(parent) && parent.expression === node);
      if (!isChainedOrCalled && !isAssignmentTarget(node)) {
        return `${t.emitExpression(node.expression)}.get(${t.emitExpression(node.argumentExpression)})`;
      }
    }
    return `${t.emitExpression(node.expression)}[${t.emitExpression(node.argumentExpression)}]`;
  }

  // Call expression
  if (ts.isCallExpression(node)) {
    return emitCallExpression(t, node);
  }

  // New expression -> ClassName.new()
  if (ts.isNewExpression(node)) {
    const className = t.emitExpression(node.expression);
    const args =
      node.arguments?.map((a) => t.emitExpression(a)).join(', ') ?? '';
    return `${className}.new(${args})`;
  }

  // Binary expression
  if (ts.isBinaryExpression(node)) {
    return emitBinaryExpression(t, node);
  }

  // Prefix unary
  if (ts.isPrefixUnaryExpression(node)) {
    const operand = t.emitExpression(node.operand);
    const op = unaryOperator(node.operator);
    return `${op}${operand}`;
  }

  // Postfix unary (i++ / i--)
  if (ts.isPostfixUnaryExpression(node)) {
    const operand = t.emitExpression(node.operand);
    if (node.operator === ts.SyntaxKind.PlusPlusToken) {
      return `${operand} += 1`;
    }
    if (node.operator === ts.SyntaxKind.MinusMinusToken) {
      return `${operand} -= 1`;
    }
  }

  // Parenthesized
  if (ts.isParenthesizedExpression(node)) {
    return `(${t.emitExpression(node.expression)})`;
  }

  // Array literal
  if (ts.isArrayLiteralExpression(node)) {
    const elements = node.elements.map((e) => t.emitExpression(e)).join(', ');
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
          key = t.emitExpression(p.name.expression);
        } else if (ts.isStringLiteral(p.name)) {
          // String literal key: {'key': v} or {"key": v} -> "key": v
          key = t.emitStringLiteral(p.name);
        } else {
          // Regular property: quote the key name
          key = `"${t.escapeGdString(p.name.getText(t.ctx.sourceFile))}"`;
        }
        const value = t.emitExpression(p.initializer);
        entries.push(`${key}: ${value}`);
      }
    }
    if (entries.length === 0) return '{}';
    return t.emitMultiLineDict(entries);
  }

  // Conditional (ternary) -> GDScript ternary
  if (ts.isConditionalExpression(node)) {
    const cond = t.emitExpression(node.condition);
    const whenTrue = t.emitExpression(node.whenTrue);
    const whenFalse = t.emitExpression(node.whenFalse);
    return `${whenTrue} if ${cond} else ${whenFalse}`;
  }

  // Await
  if (ts.isAwaitExpression(node)) {
    return `await ${t.emitExpression(node.expression)}`;
  }

  // Type assertion (as) -> skip
  if (ts.isAsExpression(node)) {
    return t.emitExpression(node.expression);
  }

  // Satisfies expression -> skip (type-only, no runtime effect)
  if (ts.isSatisfiesExpression(node)) {
    return t.emitExpression(node.expression);
  }

  // Non-null assertion (!) -> skip
  if (ts.isNonNullExpression(node)) {
    return t.emitExpression(node.expression);
  }

  // Arrow function / function expression -> lambda
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    return emitLambda(t, node);
  }

  // Spread -> not supported
  if (ts.isSpreadElement(node)) {
    t.addDiagnostic(
      node,
      'error',
      'Spread operator is not supported in GDScript',
    );
    return t.emitExpression(node.expression);
  }

  // Yield -> not supported
  if (ts.isYieldExpression(node)) {
    t.addDiagnostic(
      node,
      'error',
      '`yield` is not supported; use `await` instead',
    );
    return node.getText(t.ctx.sourceFile);
  }

  // Fallback -- unsupported expression
  t.addDiagnostic(
    node,
    'error',
    `Unsupported expression: ${ts.SyntaxKind[node.kind]}`,
  );
  return node.getText(t.ctx.sourceFile);
}

// ---- Property Access ----

/**
 * Promise method names that can't map to GDScript. `.then` / `.catch`
 * / `.finally` would need callback-based desugaring, but GD's
 * coroutine model works the other way round — the whole point of
 * `await` is that you don't need `.then`. Flag any access of these
 * method names on a Promise-typed object as a `type-error`; the
 * emitted GD would be broken (`.then` doesn't exist on GD's
 * `GDScriptFunctionState`), but leaving GD output intact keeps
 * downstream lint/Godot passes informative.
 */
const PROMISE_FORBIDDEN_METHODS = new Set<string>(['then', 'catch', 'finally']);

/**
 * True when `node` is the direct `.type` slot of a function-like
 * declaration that carries the `async` modifier. This is the ONLY
 * position where an explicit `Promise<T>` annotation is meaningful
 * in this project — async functions/methods/arrows desugar to GD
 * coroutines, and the `Promise<T>` wrapper is stripped by
 * `tsTypeNodeToGdType` before emit.
 *
 * Anything else — variable annotations, parameter types, non-async
 * return types, nested generics, type aliases, generic constraints
 * — is explicit Promise usage that has no GD counterpart.
 *
 * The four kinds below are the ONLY function-like declarations that
 * can carry an `async` modifier in TypeScript. Getters/setters, the
 * constructor, `MethodSignature`, `FunctionTypeNode`, and call/
 * construct signatures cannot be async — a `Promise<T>` return on
 * any of those correctly falls through and gets flagged. Do NOT
 * expand this list.
 */
function isAsyncFunctionReturnTypeSlot(node: ts.TypeReferenceNode): boolean {
  const parent = node.parent;
  if (!parent) return false;
  const isFunctionLikeReturnSlot =
    (ts.isFunctionDeclaration(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isArrowFunction(parent) ||
      ts.isFunctionExpression(parent)) &&
    parent.type === node;
  if (!isFunctionLikeReturnSlot) return false;
  const modifiers = ts.canHaveModifiers(parent)
    ? ts.getModifiers(parent)
    : undefined;
  return modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false;
}

/**
 * Type-reference names that represent "a thing you await" at the TS
 * type level. Both have no GD counterpart:
 *   - `Promise<T>` — the standard lib type. `await` unwraps it.
 *   - `PromiseLike<T>` — the structural minimum (`.then` only). TS's
 *                       `await` accepts either interchangeably.
 * Users rarely write `PromiseLike` explicitly, but when they do the
 * intent is identical ("this is awaitable") and GDScript has no way
 * to express it.
 */
const FORBIDDEN_PROMISE_TYPE_NAMES = new Set<string>([
  'Promise',
  'PromiseLike',
]);

/**
 * Pre-pass: forbid EXPLICIT `Promise<T>` / `PromiseLike<T>` type
 * annotations anywhere except as the return type of an `async`
 * function / method / arrow.
 *
 * Walks the whole source file once so variable annotations,
 * parameter types, non-async return types, type aliases, generic
 * constraints, and nested positions (e.g. `Array<Promise<T>>`) are
 * all caught in a single place — no per-call-site sprinkling.
 *
 * Only flags USER-WRITTEN annotations (TypeReferenceNodes with a
 * forbidden name). Inferred Promise types from `async` functions
 * aren't touched here — those are handled by
 * `tsTypeNodeToGdType` stripping `Promise<T>` → `T` on emission,
 * and by `checkPromiseUsedAsValue` for value-position misuse.
 *
 * A symbol-level check (via `checker.getSymbolAtLocation`) runs
 * only when the name-based gate already matched, so the cost is
 * bounded by the number of Promise-named references in the file
 * (typically 0–5). It filters out user-shadowed names like
 * `class Promise {}` that aren't actually the global Promise.
 */
export function checkExplicitPromiseTypes(t: TransformerDelegate): void {
  const walk = (node: ts.Node): void => {
    if (
      ts.isTypeReferenceNode(node) &&
      ts.isIdentifier(node.typeName) &&
      FORBIDDEN_PROMISE_TYPE_NAMES.has(node.typeName.text) &&
      !isAsyncFunctionReturnTypeSlot(node) &&
      resolvesToBuiltinAwaitable(t, node.typeName)
    ) {
      const typeName = node.typeName.text;
      t.addDiagnostic(
        node,
        'type-error',
        `Explicit \`${typeName}<T>\` type is forbidden except as the return type of ` +
          'an `async` function / method / arrow. GDScript has no Promise — ' +
          'remove the annotation, or wrap the callsite in an `async` function ' +
          'whose `Promise<T>` return is auto-unwrapped on emit.',
      );
      // Still recurse into type arguments — `Promise<Promise<T>>` must
      // flag the INNER one too (nested Promises are invalid anywhere,
      // including inside an otherwise-allowed async return slot).
    }
    ts.forEachChild(node, walk);
  };
  walk(t.ctx.sourceFile);
}

/**
 * True when the identifier resolves to the built-in `Promise` /
 * `PromiseLike` type from TypeScript's lib, NOT a user-defined
 * symbol that happens to share the name. Defense-in-depth for the
 * rare case of `class Promise {}` shadowing the global — without
 * this filter the name-only check would mis-flag uses of the
 * shadow.
 *
 * When the symbol can't be resolved (no type-checker, or an
 * unresolvable name), defaults to `true` — safer to over-flag than
 * to silently let a real Promise reference through.
 */
function resolvesToBuiltinAwaitable(
  t: TransformerDelegate,
  identifier: ts.Identifier,
): boolean {
  const symbol = t.ctx.checker.getSymbolAtLocation(identifier);
  if (!symbol) return true;
  // The global Promise / PromiseLike declarations live in lib files
  // whose names contain ".d.ts". A user class shadowing them would
  // be declared in a user `.ts` file. Checking the declaration's
  // source-file name is cheap and avoids comparing against the
  // global symbol directly (which requires a global-scope lookup
  // and more plumbing).
  const decls = symbol.getDeclarations();
  if (!decls || decls.length === 0) return true;
  return decls.some((d) => {
    const fileName = d.getSourceFile().fileName;
    return fileName.includes('/lib.') || fileName.includes('\\lib.');
  });
}

function checkPromiseMethodAccess(
  t: TransformerDelegate,
  node: ts.PropertyAccessExpression,
): void {
  if (!PROMISE_FORBIDDEN_METHODS.has(node.name.text)) return;
  const objType = t.ctx.checker.getTypeAtLocation(node.expression);
  if (!isPromiseType(objType)) return;
  const method = node.name.text;
  const hint =
    method === 'catch'
      ? 'wrap `await` in `try { … } catch (e) { … }` — GDScript propagates thrown errors through the coroutine chain'
      : method === 'finally'
        ? 'run cleanup after `await` completes — GDScript has no `finally` equivalent for coroutines'
        : 'use `await` and normal control flow — the unwrapped value is what you get from `await fn()`';
  t.addDiagnostic(
    node.name,
    'type-error',
    `Promise.${method} is not supported in GDScript. GDScript has no Promise type — ${hint}.`,
  );
}

export function emitPropertyAccess(
  t: TransformerDelegate,
  node: ts.PropertyAccessExpression,
): string {
  // Optional chaining (?.) -> not supported
  if (node.questionDotToken) {
    t.addDiagnostic(
      node,
      'error',
      'Optional chaining (`?.`) is not supported in GDScript',
    );
  }

  checkPromiseMethodAccess(t, node);
  // Inside a get/set accessor body, `this.<accessorName>` refers to the
  // GDScript backing field, which must be emitted as a bare identifier
  // (emitting `self.<name>` would recursively call the accessor).
  if (
    t.currentAccessorName &&
    node.expression.kind === ts.SyntaxKind.ThisKeyword &&
    node.name.text === t.currentAccessorName
  ) {
    return t.currentAccessorName;
  }
  // ClassName.staticProp -> self.staticProp (when accessing own class)
  if (
    ts.isIdentifier(node.expression) &&
    node.expression.text === t.currentClassName
  ) {
    return `self.${node.name.text}`;
  }
  const obj = t.emitExpression(node.expression);
  const prop = node.name.text;

  // Property access → `obj.get("prop")` rewrite. Applies to standalone
  // READS when:
  // - the object is a plain TS object type (interface / type literal /
  //   object literal) — a Dictionary in GD, where `.get()` is the
  //   stale-type-safe access form (it also exists on Object); or
  // - the property type includes `undefined` (legacy fallback for other
  //   object kinds).
  // Skip when:
  // - chained or called: obj.prop(), obj.prop.inner, obj.prop["key"]
  // - assignment target: obj.prop = v / obj.prop += v / obj.prop++
  //   (`obj.get("p") = v` is invalid GD; plain assignment works on both
  //   Dictionary and Object)
  // - accessing a class field (always defined in GDScript)
  const propType = t.ctx.checker.getTypeAtLocation(node);
  const objType = t.ctx.checker.getTypeAtLocation(node.expression);
  if (
    isPlainObjectType(objType, t.ctx.checker, t.ctx.registry) ||
    typeContainsUndefined(propType)
  ) {
    // Walk up through non-null assertions (!) and parens to find the real parent
    let effectiveNode: ts.Node = node;
    let parent = node.parent;
    while (
      parent &&
      (ts.isNonNullExpression(parent) || ts.isParenthesizedExpression(parent))
    ) {
      effectiveNode = parent;
      parent = parent.parent;
    }
    const isChainedOrCalled =
      parent != null &&
      ((ts.isCallExpression(parent) && parent.expression === effectiveNode) ||
        (ts.isPropertyAccessExpression(parent) &&
          parent.expression === effectiveNode) ||
        (ts.isElementAccessExpression(parent) &&
          parent.expression === effectiveNode));
    // Check if the property is a class field (declared via PropertyDeclaration in a class body).
    // PropertySignature (in interfaces/type literals) is NOT a class field.
    const symbol = t.ctx.checker.getSymbolAtLocation(node.name);
    const isClassField =
      symbol?.getDeclarations()?.some((d) => ts.isPropertyDeclaration(d)) ??
      false;
    if (!isChainedOrCalled && !isClassField && !isAssignmentTarget(node)) {
      return `${obj}.get("${prop}")`;
    }
  }

  return `${obj}.${prop}`;
}

// ---- Call Expressions ----

/**
 * Return the first non-transparent ancestor of `node` — i.e. walk through
 * parenthesis, non-null assertions, and type assertions which don't change
 * runtime semantics. Used to decide whether a value is actually "consumed"
 * vs merely wrapped.
 */
function effectiveParent(node: ts.Node): ts.Node | undefined {
  let parent: ts.Node | undefined = node.parent;
  while (
    parent &&
    (ts.isParenthesizedExpression(parent) ||
      ts.isNonNullExpression(parent) ||
      ts.isAsExpression(parent) ||
      ts.isTypeAssertionExpression(parent))
  ) {
    parent = parent.parent;
  }
  return parent;
}

/**
 * True when `type` is a TypeScript `Promise<T>` (or a union/intersection that
 * contains one). In GDScript there is no Promise; an unawaited coroutine
 * yields a `GDScriptFunctionState` at runtime, not the resolved value.
 */
function isPromiseType(type: ts.Type): boolean {
  if (type.isUnionOrIntersection()) {
    return type.types.some((t) => isPromiseType(t));
  }
  const symbol = type.aliasSymbol ?? type.getSymbol();
  return symbol?.getName() === 'Promise';
}

/**
 * Report a `type-error` when a call that returns `Promise<T>` is used as a
 * value without `await`. Calls used as statements (value discarded) and
 * calls directly awaited are fine.
 *
 * Only checks call expressions — other producers of Promise values (e.g.
 * reading a Promise-typed variable) are rare, and the error at the call
 * site that originally created the Promise covers the common path.
 */
function checkPromiseUsedAsValue(
  t: TransformerDelegate,
  node: ts.CallExpression,
): void {
  const returnType = t.ctx.checker.getTypeAtLocation(node);
  if (!isPromiseType(returnType)) return;
  const parent = effectiveParent(node);
  if (!parent) return;
  // `await fn()` — the whole point of the Promise, clearly fine.
  if (ts.isAwaitExpression(parent)) return;
  // `fn();` on its own line — value is discarded, same as not caring about
  // the coroutine's result in GD. Allowed.
  if (ts.isExpressionStatement(parent)) return;
  t.addDiagnostic(
    node,
    'type-error',
    'Promise value used without `await`. In GDScript an unawaited coroutine ' +
      'resolves to a `GDScriptFunctionState`, not the value — this will fail ' +
      'at runtime. Prefix with `await`, or discard the call as a statement.',
  );
}

export function emitCallExpression(
  t: TransformerDelegate,
  node: ts.CallExpression,
): string {
  // Optional chaining on calls (?.) -> not supported
  if (node.questionDotToken) {
    t.addDiagnostic(
      node,
      'error',
      'Optional chaining (`?.`) is not supported in GDScript',
    );
  }

  checkPromiseUsedAsValue(t, node);

  // Check each argument for `undefined` in its type.
  // Skip literal `undefined` -- already caught by emitExpression's identifier check.
  // Skip class field accesses -- their `undefined` maps to `null` in GDScript.
  const checker = t.ctx.checker;
  for (const arg of node.arguments) {
    if (ts.isIdentifier(arg) && arg.text === 'undefined') continue;
    const argType = checker.getTypeAtLocation(arg);
    if (typeContainsUndefined(argType)) {
      // Class fields (PropertyDeclaration) are nullable in GDScript, not undefined
      if (ts.isPropertyAccessExpression(arg)) {
        const sym = checker.getSymbolAtLocation(arg.name);
        const isClassField =
          sym?.getDeclarations()?.some((d) => ts.isPropertyDeclaration(d)) ??
          false;
        if (isClassField) continue;
      }
      t.addDiagnostic(
        arg,
        'type-error',
        `Argument '${arg.getText(t.ctx.sourceFile)}' may be 'undefined', ` +
          `which is not supported in GDScript. Use 'null' instead.`,
      );
    }
  }

  const args = node.arguments.map((a) => t.emitExpression(a)).join(', ');

  // Handle gd.* helper calls
  if (ts.isPropertyAccessExpression(node.expression)) {
    const obj = node.expression.expression;
    const method = node.expression.name.text;

    // gd.as(value, Type)
    const asResult = tryEmitGdAs(t, node, obj, method);
    if (asResult !== null) return asResult;

    // gd.is(value, Type) -> value is Type
    const isResult = tryEmitGdIs(t, node, obj, method);
    if (isResult !== null) return isResult;

    // gd.dict([[key, value], ...]) -> {key: value, ...}
    const dictResult = tryEmitGdDict(t, node, obj, method);
    if (dictResult !== null) return dictResult;

    // gd.ops.add/sub/mul/div/eq/ne/gt/gte/lt/lte/plus/minus -> operator
    const opsResult = tryEmitGdOps(t, node, obj, method);
    if (opsResult !== null) return opsResult;

    // Handle self.method() / self.property() calls
    if (isSelfExpression(obj)) {
      // Check if it's a method call or function (property) call via type checker
      const symbol = t.ctx.checker.getSymbolAtLocation(node.expression);
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

  const callee = t.emitExpression(node.expression);

  // Check if the callee is a Callable type (function variable, parameter)
  // In GDScript, Callable values must be invoked via .call()
  if (ts.isIdentifier(node.expression)) {
    const symbol = t.ctx.checker.getSymbolAtLocation(node.expression);
    if (symbol) {
      const declarations = symbol.getDeclarations();
      if (declarations && declarations.length > 0) {
        const decl = declarations[0]!;
        // Local variables and parameters holding callables need .call()
        if (ts.isVariableDeclaration(decl) || ts.isParameter(decl)) {
          const type = t.ctx.checker.getTypeAtLocation(node.expression);
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

/**
 * Check if a logical expression (`||`/`&&`) is in a boolean context where
 * GDScript `or`/`and` returning `bool` is correct. Contexts:
 * - if/while condition
 * - negation (`!expr`)
 * - nested in another `||`/`&&` that is itself in bool context
 * - wrapped in `bool()` call
 * - used as a standalone expression statement (not assigned)
 */
function isLogicalBoolContext(node: ts.BinaryExpression): boolean {
  let current: ts.Node = node;
  let parent = current.parent;

  // Walk up through parenthesized expressions
  while (parent && ts.isParenthesizedExpression(parent)) {
    current = parent;
    parent = parent.parent;
  }

  if (!parent) return true;

  // if/while/for condition
  if (ts.isIfStatement(parent) && parent.expression === current) return true;
  if (ts.isWhileStatement(parent) && parent.expression === current) return true;
  if (ts.isForStatement(parent) && parent.condition === current) return true;

  // Negation: !expr
  if (
    ts.isPrefixUnaryExpression(parent) &&
    parent.operator === ts.SyntaxKind.ExclamationToken
  )
    return true;

  // Nested logical: part of another || or &&
  if (
    ts.isBinaryExpression(parent) &&
    (parent.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
      parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken)
  )
    return true;

  // Wrapped in bool() call — walk up through ternary/parens to find it
  if (isInsideBoolCall(current)) return true;

  // Expression statement (standalone, not assigned)
  if (ts.isExpressionStatement(parent)) return true;

  return false;
}

/** Walk up ancestors to check if this node is inside a `bool()` call. */
function isInsideBoolCall(node: ts.Node): boolean {
  let current = node.parent;
  while (current) {
    // Skip transparent wrappers
    if (
      ts.isParenthesizedExpression(current) ||
      ts.isConditionalExpression(current)
    ) {
      current = current.parent;
      continue;
    }
    // Found bool() call
    if (
      ts.isCallExpression(current) &&
      ts.isIdentifier(current.expression) &&
      current.expression.text === 'bool'
    )
      return true;
    // Anything else breaks the chain
    break;
  }
  return false;
}

/** Check if an expression evaluates to `self` (i.e., is `this`) */
function isSelfExpression(node: ts.Expression): boolean {
  return node.kind === ts.SyntaxKind.ThisKeyword;
}

// ---- Binary Expressions ----

export function emitBinaryExpression(
  t: TransformerDelegate,
  node: ts.BinaryExpression,
): string {
  // Destructuring assignment ([a, b] = arr / ({ x } = obj)) -> not
  // supported. Declarations are rejected in visitVariableStatement; the
  // assignment-expression form must fail loudly too — emitting the
  // literal-as-LHS form would be silently invalid GDScript.
  if (
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    (ts.isArrayLiteralExpression(node.left) ||
      ts.isObjectLiteralExpression(node.left))
  ) {
    t.addDiagnostic(
      node,
      'error',
      'Destructuring assignment is not supported in GDScript',
    );
  }
  // Nullish coalescing (??) -> not supported
  if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
    t.addDiagnostic(
      node,
      'error',
      'Nullish coalescing (`??`) is not supported in GDScript',
    );
  }
  // Nullish coalescing assignment (??=) -> not supported
  if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken) {
    t.addDiagnostic(
      node,
      'error',
      'Nullish coalescing assignment (`??=`) is not supported in GDScript',
    );
  }
  // `x in y` -- GDScript only supports `in` on Dictionary and String.
  if (node.operatorToken.kind === ts.SyntaxKind.InKeyword) {
    checkInOperatorRhs(t, node);
  }
  // Error when `||`/`&&` is used as a non-boolean value.
  // GDScript `or`/`and` return `bool`, not the operand like JS/TS.
  // User can wrap in `bool()` to acknowledge the bool return and suppress this error.
  if (
    node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
    node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
  ) {
    if (!isLogicalBoolContext(node)) {
      const resultType = t.ctx.checker.getTypeAtLocation(node);
      const isBoolResult = !!(resultType.flags & ts.TypeFlags.BooleanLike);
      if (!isBoolResult) {
        const op =
          node.operatorToken.kind === ts.SyntaxKind.BarBarToken ? '||' : '&&';
        t.addDiagnostic(
          node,
          'type-error',
          `\`${op}\` used as a non-boolean value. GDScript \`or\`/\`and\` return \`bool\`, ` +
            `not the operand. Wrap in \`bool()\` to accept bool result, or use a ternary ` +
            `(\`a ? a : b\`) for value coalescing.`,
        );
      }
    }
  }
  const left = t.emitExpression(node.left);
  const right = t.emitExpression(node.right);
  const op = binaryOperator(node.operatorToken.kind);
  return `${left} ${op} ${right}`;
}

/**
 * Report an error if the right-hand side of a `x in y` expression resolves
 * to a type that GDScript doesn't support with `in`. Only `Dictionary`
 * (object-like types) and `String` are valid; arrays, Packed*Array, and
 * value types like `Vector2`/`Color` are rejected.
 */
function checkInOperatorRhs(
  t: TransformerDelegate,
  node: ts.BinaryExpression,
): void {
  const rhs = node.right;
  const checker = t.ctx.checker;
  const type = checker.getTypeAtLocation(rhs);

  // Collapse union types to their non-null constituents
  const baseTypes = type.isUnion()
    ? type.types.filter(
        (u) =>
          !(u.flags & ts.TypeFlags.Null) && !(u.flags & ts.TypeFlags.Undefined),
      )
    : [type];

  for (const bt of baseTypes) {
    const banned = classifyInRhsType(bt, checker, t.ctx.diagInfo);
    if (banned) {
      t.addDiagnostic(
        node,
        'type-error',
        `The \`in\` operator cannot be used with ${banned} in GDScript. ` +
          `Only Dictionary and String support \`in\`.`,
      );
      return;
    }
  }
}

// ---- Operator Mapping ----

export function binaryOperator(kind: ts.SyntaxKind): string {
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

export function unaryOperator(op: ts.PrefixUnaryOperator): string {
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

// ---- String Literals ----

export function emitStringLiteral(
  t: TransformerDelegate,
  node: ts.StringLiteral,
): string {
  // Get the raw source text which preserves escape sequences
  const raw = node.getText(t.ctx.sourceFile);
  // If already double-quoted, use as-is
  if (raw.startsWith('"')) {
    return raw;
  }
  // Single-quoted -> double-quoted with proper escaping
  const inner = node.text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `"${inner}"`;
}

export function escapeGdString(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// ---- Template Literals ----

export function emitTemplateExpression(
  t: TransformerDelegate,
  node: ts.TemplateExpression,
): string {
  let result = `"${t.escapeGdString(node.head.text)}"`;
  for (const span of node.templateSpans) {
    const expr = t.emitExpression(span.expression);
    result += ` + str(${expr})`;
    if (span.literal.text) {
      result += ` + "${t.escapeGdString(span.literal.text)}"`;
    }
  }
  return result;
}

// ---- Lambda ----

export function emitLambda(
  t: TransformerDelegate,
  node: ts.ArrowFunction | ts.FunctionExpression,
): string {
  const params = t.emitParameters(node.parameters);

  // Return type
  const returnType = tsTypeNodeToGdType(
    node.type,
    t.ctx.checker,
    t.ctx.sourceFile,
    t.currentClassName,
    t.ctx.registry,
  );
  const returnAnnotation = returnType ? ` -> ${returnType}` : '';

  if (ts.isBlock(node.body)) {
    // Multi-line lambda: return header only. Body will be emitted by emitLambdaBody().
    return `func(${params})${returnAnnotation}:`;
  }

  // Single expression lambda
  const body = t.emitExpression(node.body);
  return `func(${params})${returnAnnotation}: return ${body}`;
}

/**
 * Check if an expression is a block-body lambda (arrow function or function expression with a block body).
 */
export function isBlockLambda(
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
export function emitLambdaBody(
  t: TransformerDelegate,
  node: ts.ArrowFunction | ts.FunctionExpression,
): void {
  if (!ts.isBlock(node.body)) return;
  t.emitter.indent();
  if (node.body.statements.length === 0) {
    const pos = t.getLineAndCol(node.body);
    t.emitter.writeLine('pass', pos.line, pos.col);
  } else {
    t.visitBlock(node.body);
  }
  t.emitter.dedent();
}

// ---- Multi-line Dict ----

/** Emit a multi-line GDScript dict with proper indentation */
export function emitMultiLineDict(
  t: TransformerDelegate,
  entries: string[],
): string {
  const innerIndent = t.emitter.getIndentStr(t.emitter.getIndentLevel() + 1);
  const outerIndent = t.emitter.getIndentStr();
  const lines = entries.map((e) => `${innerIndent}${e},`);
  return `{\n${lines.join('\n')}\n${outerIndent}}`;
}
