/**
 * Classification helpers for the member-access → `.get()` rewrite.
 *
 * Plain TS object types (interfaces, type literals, inferred object
 * literals) are Dictionaries at GDScript runtime, so standalone member
 * READS on them are emitted as `obj.get("prop")`. `.get()` exists on
 * both `Dictionary` and `Object`, which makes the emitted form valid
 * even when the classification is computed from stale types — the
 * property that lets the watch/check pipeline treat staleness as a
 * visible-diagnostics problem instead of a silent-runtime one.
 *
 * Writes are NOT rewritten (`obj.get("p") = v` is invalid GDScript;
 * plain `obj.prop = v` works on both Dictionary and Object), and
 * chained links / callee positions keep dot access (no safety
 * difference, less output churn).
 */

import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/**
 * True when every non-nullish union constituent of `type` is a plain
 * TS object type — i.e. a value that exists as a `Dictionary` in the
 * generated GDScript.
 *
 * Deliberately conservative: anything unprovable (any/unknown/error
 * types, type parameters, mixed unions, intersections) returns false
 * so the caller falls back to the legacy optionality-based behavior.
 */
export function isPlainObjectType(
  type: ts.Type,
  checker: ts.TypeChecker,
  registry?: GodotClassRegistry,
): boolean {
  const constituents = type.isUnion()
    ? type.types.filter(
        (u) =>
          !(u.flags & ts.TypeFlags.Null) && !(u.flags & ts.TypeFlags.Undefined),
      )
    : [type];
  if (constituents.length === 0) return false;
  return constituents.every((c) =>
    isPlainObjectConstituent(c, checker, registry),
  );
}

function isPlainObjectConstituent(
  type: ts.Type,
  checker: ts.TypeChecker,
  registry?: GodotClassRegistry,
): boolean {
  // Only structural object types qualify. Excludes any/unknown/error,
  // primitives, enums, and type parameters (all unprovable or wrong).
  if (!(type.flags & ts.TypeFlags.Object)) return false;
  // Arrays/tuples map to GD Array which has no `.get()`.
  if (checker.isArrayType(type) || checker.isTupleType(type)) return false;
  // Callables / constructor types (incl. `typeof Class` statics access).
  if (
    type.getCallSignatures().length > 0 ||
    type.getConstructSignatures().length > 0
  ) {
    return false;
  }

  // Check both the alias name and the target symbol name, so a type
  // alias can't smuggle an excluded type past the name checks.
  const names = [
    type.aliasSymbol?.getName(),
    type.getSymbol()?.getName(),
  ].filter((n): n is string => !!n);
  for (const name of names) {
    // `Dictionary` keeps its existing (optionality-based) semantics —
    // the user explicitly opted into Godot Dictionary typing. `TSOnly`
    // wraps TS-only values that never reach GD.
    if (name === 'Dictionary' || name === 'TSOnly') return false;
    // Godot engine types are NOT plain objects even though our typings
    // declare many of them as interfaces (value types like Vector2 have
    // no `.get()` at runtime).
    if (
      registry &&
      (registry.hasClass(name) ||
        registry.isConstructor(name) ||
        registry.isGlobalEnum(name))
    ) {
      return false;
    }
  }
  // Without a registry we cannot prove a NAMED type isn't a Godot type
  // (value types are interfaces in our typings, and `.get()` on them
  // crashes at runtime) — correctness over completeness: drop the
  // rewrite. Anonymous literals (`__type`/`__object`) stay eligible;
  // they can never be Godot types.
  if (!registry && names.some((n) => !n.startsWith('__'))) {
    return false;
  }

  // Class instances (user classes, scene-typing shadow classes) are GD
  // Objects with real properties — keep dot access. Enum objects and
  // namespaces in value position are not Dictionaries either.
  const decls = type.getSymbol()?.getDeclarations() ?? [];
  if (
    decls.some(
      (d) =>
        ts.isClassDeclaration(d) ||
        ts.isClassExpression(d) ||
        ts.isEnumDeclaration(d) ||
        ts.isModuleDeclaration(d),
    )
  ) {
    return false;
  }

  return true;
}

/**
 * True when `node` is the target of an assignment: LHS of `=` or any
 * compound assignment (`+=`, `||=`, …), or the operand of `++`/`--`.
 * Walks through parentheses and non-null assertions wrapping the node
 * (`(obj.prop) = v`, `obj.prop! += 1`).
 *
 * Assignment targets must keep plain dot/index form — `obj.get("p") = v`
 * is invalid GDScript, while `obj.prop = v` is valid on both Dictionary
 * and Object.
 */
export function isAssignmentTarget(node: ts.Expression): boolean {
  let current: ts.Node = node;
  let parent = current.parent;
  while (
    parent &&
    (ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent))
  ) {
    current = parent;
    parent = parent.parent;
  }
  if (!parent) return false;

  if (
    ts.isBinaryExpression(parent) &&
    parent.left === current &&
    parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
    parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment
  ) {
    return true;
  }
  if (
    (ts.isPrefixUnaryExpression(parent) ||
      ts.isPostfixUnaryExpression(parent)) &&
    (parent.operator === ts.SyntaxKind.PlusPlusToken ||
      parent.operator === ts.SyntaxKind.MinusMinusToken)
  ) {
    return true;
  }
  return false;
}
