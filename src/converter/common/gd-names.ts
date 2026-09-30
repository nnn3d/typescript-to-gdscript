import ts from 'typescript';
import type { GodotClassRegistry } from '../../typings/godot-registry.ts';
import {
  CLASS_NAME_CONFLICTS,
  godotClassName,
  sanitizeClassName,
} from '../../typings/type-mapping.ts';

/**
 * True when nothing in the converted program declares the binding — it
 * is read out of a `.d.ts`, or written `declare` at the top level of a
 * `.ts` (a declaration nested in a `declare global` / `declare module`
 * block is NOT detected; `ts.getCombinedModifierFlags` walks only the
 * variable-statement chain, and the flag that would catch it is
 * internal to TypeScript).
 *
 * In this dialect that answers "is this the engine's or the user's".
 * An ambient declaration describes something GDScript already provides
 * and creates nothing in the emitted script; anything else was written
 * in code that is being converted.
 */
export function isAmbient(d: ts.Declaration): boolean {
  return (
    d.getSourceFile().isDeclarationFile ||
    (ts.getCombinedModifierFlags(d) & ts.ModifierFlags.Ambient) !== 0
  );
}

/**
 * True when the user's own code declares this name, so Godot's meaning
 * for it does not apply. A name that resolves nowhere is not the
 * user's — it just means the typings are not loaded.
 */
export function isUserDeclared(
  declarations: readonly ts.Declaration[],
): boolean {
  return declarations.length > 0 && !declarations.some(isAmbient);
}

/** True when the registry knows this name as a GDScript type. */
export function isGdTypeName(
  name: string,
  registry?: GodotClassRegistry,
): boolean {
  return (
    !!registry &&
    (registry.hasClass(name) ||
      registry.isConstructor(name) ||
      registry.isGlobalEnum(name))
  );
}

/**
 * GDScript's name for an engine class the typings renamed to dodge a JS
 * global — `GodotObject` is `Object` (`CLASS_NAME_CONFLICTS`). Returns
 * `name` unchanged for anything else, including a class of the user's
 * own that happens to share the renamed spelling: only a name that
 * resolves to the typings' declaration is the engine's.
 */
export function gdClassSpelling(
  name: string,
  declarations: readonly ts.Declaration[],
): string {
  if (declarations.length === 0 || isUserDeclared(declarations)) return name;
  return godotClassName(name);
}

/**
 * True for a name the typings gave AWAY — `Object` — because TypeScript
 * already owns it. In TS it keeps TS's meaning (the type is the
 * plain-object interface, the value is aliased to the engine class), so
 * as a TYPE it is no GDScript type and must not be matched against the
 * registry, where `Object` is the engine class.
 */
export function isRenamedAwayClassName(name: string): boolean {
  return CLASS_NAME_CONFLICTS.has(name);
}

/**
 * What a name means as a GDScript type when the name alone decides it:
 * the GDScript spelling of a type the registry knows (`GodotObject` goes
 * out as `Object`), or `null` for a name the typings gave away — TS's own
 * `Object` type is the plain-object interface, no GDScript type at all,
 * although the registry knows an `Object`. `undefined` when the name
 * decides nothing: it is the user's own, or no GDScript type has it.
 *
 * Every path that turns a TS name into a GD annotation goes through here
 * — a WRITTEN type (`classifyTypeReferenceName`) and the spelling of a
 * resolved one (`gd.getset`'s inferred field type) — so they cannot
 * disagree about the renamed classes.
 */
export function engineTypeName(
  name: string,
  declarations: readonly ts.Declaration[],
  registry?: GodotClassRegistry,
): string | null | undefined {
  if (isUserDeclared(declarations)) return undefined;
  if (isRenamedAwayClassName(name)) return null;
  const gdName = gdClassSpelling(name, declarations);
  return isGdTypeName(gdName, registry) ? gdName : undefined;
}

/**
 * Classify a TS type-reference name and decide whether it should be emitted
 * as a GDScript type annotation.
 *
 * Only types that GDScript actually has are emitted:
 *   - User / Godot `class` declarations and `enum` declarations (resolved via
 *     the TS checker — user classes resolve locally even without the Godot
 *     typings loaded).
 *   - Godot built-in types recognised *by name* from the registry: classes
 *     (`Node`, `Node2D`, …), value-type constructors (`Vector2`, `Color`,
 *     `Dictionary`, …) and global enums (`Key`, `MouseButton`, …). The
 *     name-based check is what keeps Godot types working in test/program
 *     setups that don't load the Godot `.d.ts` typings.
 *
 * Everything else — type aliases, plain interfaces, `object`-like types,
 * dotted refs that don't resolve to a class/enum (`Node.ProcessMode`,
 * `Outer.SomeIface`) and unknown / unresolved names — is omitted (the bare
 * `var x` / `func f(x)` form is the idiomatic "untyped" GD). GD type hints are
 * optional, so dropping an unverifiable type is always safe; emitting a bogus
 * one would break the `.gd`.
 *
 * Omitting is always safe; emitting an annotation GDScript doesn't recognise
 * breaks the generated `.gd`. So when no registry is available the converter
 * can't recognise Godot built-ins by name — it only emits types it can prove
 * are classes/enums (via the checker) and drops the rest, rather than risk
 * leaking an invalid type.
 */
export function classifyTypeReferenceName(
  typeNode: ts.TypeReferenceNode,
  name: string,
  checker: ts.TypeChecker,
  registry?: GodotClassRegistry,
): string | null {
  // Resolve the symbol, following import aliases to the real declaration so
  // that types imported from another file are classified by what they are,
  // not by the `ImportSpecifier` binding.
  const declarations = resolvedDeclarations(checker, typeNode.typeName);

  // Godot built-ins are recognised by name, BEFORE the alias rule below:
  // the dialect spells several of them as aliases (`type bool = boolean`,
  // `type Callable = Function`) that rule would otherwise drop.
  const engine = engineTypeName(name, declarations, registry);
  if (engine !== undefined) return engine;

  // Type aliases have no GDScript equivalent → omit.
  if (declarations.some(ts.isTypeAliasDeclaration)) return null;

  // User / Godot `class` and `enum` declarations are valid GD types.
  if (
    declarations.some(
      (d) => ts.isClassDeclaration(d) || ts.isEnumDeclaration(d),
    )
  ) {
    return gdClassSpelling(name, declarations);
  }

  // Whatever is left is a non-class type (interface, `object`-like, namespace),
  // a dotted ref we can't verify (`Node.ProcessMode`, `Outer.SomeIface`), or an
  // unknown / unresolved name — none provably a GD type. Omit the annotation:
  // GD type hints are optional, so dropping a type is always safe, whereas
  // emitting a bogus one breaks the generated GDScript.
  return null;
}

/**
 * The declarations a name resolves to, an import followed to what it
 * binds — so something imported from another file is judged by its
 * declaration, not by the import specifier standing in for it.
 */
export function resolvedDeclarations(
  checker: ts.TypeChecker,
  node: ts.Node,
): readonly ts.Declaration[] {
  let symbol =
    node.parent &&
    ts.isShorthandPropertyAssignment(node.parent) &&
    node.parent.name === node
      ? checker.getShorthandAssignmentValueSymbol(node.parent)
      : checker.getSymbolAtLocation(node);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
    symbol = checker.getAliasedSymbol(symbol);
  }
  return symbol?.getDeclarations() ?? [];
}

/**
 * An `extends` expression as GDScript spells it: a class name respelled
 * where the typings renamed it (`GodotObject` → `Object`), anything else
 * as written.
 */
export function gdHeritageText(
  checker: ts.TypeChecker,
  expr: ts.Expression,
  sourceFile: ts.SourceFile,
): string {
  return ts.isIdentifier(expr)
    ? gdClassSpelling(expr.text, resolvedDeclarations(checker, expr))
    : expr.getText(sourceFile);
}

/**
 * The error for an `extends` naming a class the typings gave away —
 * `extends Object` — or null for any other base. In TypeScript `Object`
 * is TS's own name, the plain-object interface as a type; the engine
 * class is `GodotObject`. The value `Object` is aliased to it, so the
 * heritage type-checks, but it reads as the JS object. One name per role:
 * `GodotObject` wherever a class is named, `Object` only as a value.
 */
export function renamedAwayBaseError(
  checker: ts.TypeChecker,
  expr: ts.Expression,
): string | null {
  if (!ts.isIdentifier(expr) || !isRenamedAwayClassName(expr.text)) {
    return null;
  }
  if (isUserDeclared(resolvedDeclarations(checker, expr))) return null;
  const name = expr.text;
  const renamed = sanitizeClassName(name);
  return (
    `\`extends ${name}\` names TypeScript's \`${name}\`, not Godot's class. ` +
    `Extend \`${renamed}\`, the typings' name for it — it goes out as ` +
    `\`extends ${name}\`.`
  );
}
