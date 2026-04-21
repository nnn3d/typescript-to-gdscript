/**
 * Per-class context for GD→TS emission.
 *
 * Every class (top-level script class OR inner class) has its own set
 * of member names, static classification, inferred types, and lifted
 * type names. Rather than mutating these fields on `GdToTsContext`
 * directly and manually save/restore-ing around inner class emission
 * — which accumulated bugs across iterations — we collect them once
 * into an immutable `ClassScope` and install it via `withClassScope`,
 * which guarantees restore-on-exit through `try/finally`.
 *
 * ## Building a scope
 *
 * `buildClassScope(className, statements, ctx)` walks a class body
 * (or the file root for the script class) ONCE and returns the
 * populated scope. Pure — no mutation beyond temporarily installing
 * the partial scope's `classMemberTypes` on `ctx` so
 * `inferExprType` value inferences during the walk can see
 * same-class members already collected.
 *
 * ## Entering a scope
 *
 * `withClassScope(ctx, scope, fn)` swaps the six per-class fields
 * onto `ctx`, runs `fn`, then restores — even if `fn` throws.
 * Function-scope state (`localVars`, `localVarTypes`) is always reset
 * fresh on entry since function-scope doesn't leak across class
 * boundaries.
 */

import { SyntaxType, type SyntaxNode } from '../../parser/gdscript/types.ts';
import type { GdToTsContext } from './context.ts';
import { extractGdTypeName, inferExprType } from './type-inference.ts';

export interface ClassScope {
  /** TS-side class name (already-escaped, e.g. `G_Foo` for a GD `_Foo`). */
  className: string;
  /** Known instance + static member names — drives `this.X` prefixing. */
  classMembers: Set<string>;
  /**
   * Names accessed via `ClassName.X` rather than `this.X` — consts,
   * static vars, enums, inner classes, static funcs.
   */
  staticMembers: Set<string>;
  /** Resolved GD type strings per member name (for `gd.ops` detection). */
  classMemberTypes: Map<string, string>;
  /**
   * Class-level types that can qualify as `ClassName.X` in emitted TS
   * (enum names + inner class names). Used by `qualifyClassType`.
   */
  classTypeNames: Set<string>;
}

/**
 * Walk a class body (or the file root for the script class) and
 * collect everything that belongs in the per-class scope. Returns a
 * fresh scope — doesn't persistently mutate `ctx`.
 *
 * @param className  TS-side class name (already escaped).
 * @param statements The class body's children (for inner classes)
 *                   or the file root's children (for script class).
 *                   Non-member node types are ignored.
 * @param ctx        Used only for `inferExprType` (reads
 *                   `registry`, `localVarTypes`, `classMemberTypes`).
 *                   The partial scope's `classMemberTypes` is
 *                   temporarily installed so value-expr inferences
 *                   during the walk see same-class members already
 *                   collected.
 */
export function buildClassScope(
  className: string,
  statements: readonly SyntaxNode[],
  ctx: GdToTsContext,
): ClassScope {
  const scope: ClassScope = {
    className,
    classMembers: new Set(),
    staticMembers: new Set(),
    classMemberTypes: new Map(),
    classTypeNames: new Set(),
  };

  // Temporarily install `scope.classMemberTypes` so `inferExprType`
  // can resolve a member's value-expr type against same-class members
  // that have already been seen in this walk. Restored on exit so the
  // caller's context is untouched.
  const savedMemberTypes = ctx.classMemberTypes;
  ctx.classMemberTypes = scope.classMemberTypes;
  try {
    for (const child of statements) {
      collectMember(child, scope, ctx);
    }
  } finally {
    ctx.classMemberTypes = savedMemberTypes;
  }

  return scope;
}

/**
 * Inspect a single statement and, if it's a class member, add it to
 * `scope`. Non-member nodes (annotations, comments, extends, etc.)
 * are silently ignored — callers pass broader statement lists
 * (e.g. the file root) and rely on this routine to filter.
 */
function collectMember(
  child: SyntaxNode,
  scope: ClassScope,
  ctx: GdToTsContext,
): void {
  if (
    child.type === SyntaxType.FunctionDefinition ||
    child.type === SyntaxType.ConstructorDefinition
  ) {
    const raw = child.childForFieldName('name')?.text ?? '_init';
    const name = raw === '_init' ? 'constructor' : raw;
    scope.classMembers.add(name);
    // `static func foo()` → accessed as `ClassName.foo()` from
    // instance methods, so tracked as static.
    const isStatic = child.childForFieldName('static') !== null;
    if (isStatic) scope.staticMembers.add(name);
    return;
  }

  if (
    child.type === SyntaxType.VariableStatement ||
    child.type === SyntaxType.ExportVariableStatement ||
    child.type === SyntaxType.OnreadyVariableStatement
  ) {
    const name = child.childForFieldName('name')?.text;
    if (!name) return;
    scope.classMembers.add(name);
    const isStatic = child.childForFieldName('static') !== null;
    if (isStatic) scope.staticMembers.add(name);
    const typeNode = child.childForFieldName('type');
    const valueNode = child.childForFieldName('value');
    const inferredType = typeNode
      ? extractGdTypeName(typeNode)
      : valueNode
        ? inferExprType(valueNode, ctx)
        : null;
    if (inferredType) scope.classMemberTypes.set(name, inferredType);
    return;
  }

  if (child.type === SyntaxType.SignalStatement) {
    const name = child.childForFieldName('name')?.text;
    if (name) scope.classMembers.add(name);
    return;
  }

  if (child.type === SyntaxType.ConstStatement) {
    const name = child.childForFieldName('name')?.text;
    if (name) {
      scope.classMembers.add(name);
      scope.staticMembers.add(name);
    }
    return;
  }

  if (child.type === SyntaxType.EnumDefinition) {
    const nameNode = child.childForFieldName('name');
    if (nameNode) {
      // Named enum → both static access (`ClassName.X.VALUE`) AND a
      // class-level type name (so a type reference `X` can qualify to
      // `ClassName.X`).
      scope.classMembers.add(nameNode.text);
      scope.staticMembers.add(nameNode.text);
      scope.classTypeNames.add(nameNode.text);
    } else {
      // Anonymous enum → each enumerator is a static constant in
      // its own right (GDScript flattens them into the class namespace).
      const bodyNode = child.childForFieldName('body');
      if (bodyNode) {
        for (const e of bodyNode.namedChildren) {
          if (e.type !== SyntaxType.Enumerator) continue;
          const eName = e.childForFieldName('left')?.text;
          if (!eName) continue;
          scope.classMembers.add(eName);
          scope.staticMembers.add(eName);
        }
      }
    }
    return;
  }

  if (child.type === SyntaxType.ClassDefinition) {
    const name = child.childForFieldName('name')?.text;
    if (!name) return;
    scope.classMembers.add(name);
    scope.staticMembers.add(name);
    scope.classTypeNames.add(name);
  }
}

/**
 * Run `fn` with the given `ClassScope` installed on `ctx`. Swaps
 * `className`, `classMembers`, `staticMembers`, `classMemberTypes`,
 * `classTypeNames`, and RESETS `localVars` / `localVarTypes` to
 * fresh empty collections (function-scope doesn't carry across class
 * boundaries).
 *
 * Restores the previous values on return — including when `fn`
 * throws. This is the single point where per-class scope management
 * happens, replacing the earlier scatter of save/restore triples.
 */
export function withClassScope<T>(
  ctx: GdToTsContext,
  scope: ClassScope,
  fn: () => T,
): T {
  const saved = {
    className: ctx.className,
    classMembers: ctx.classMembers,
    staticMembers: ctx.staticMembers,
    classMemberTypes: ctx.classMemberTypes,
    classTypeNames: ctx.classTypeNames,
    localVars: ctx.localVars,
    localVarTypes: ctx.localVarTypes,
  };
  ctx.className = scope.className;
  ctx.classMembers = scope.classMembers;
  ctx.staticMembers = scope.staticMembers;
  ctx.classMemberTypes = scope.classMemberTypes;
  ctx.classTypeNames = scope.classTypeNames;
  ctx.localVars = new Set();
  ctx.localVarTypes = new Map();
  try {
    return fn();
  } finally {
    ctx.className = saved.className;
    ctx.classMembers = saved.classMembers;
    ctx.staticMembers = saved.staticMembers;
    ctx.classMemberTypes = saved.classMemberTypes;
    ctx.classTypeNames = saved.classTypeNames;
    ctx.localVars = saved.localVars;
    ctx.localVarTypes = saved.localVarTypes;
  }
}
