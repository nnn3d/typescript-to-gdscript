import ts from 'typescript';

import type { GodotClassRegistry } from '../../typings/godot-registry.ts';

/**
 * Pre-derived lookup sets for `in`-operator diagnostics and variant/class type
 * checks. Built once per converter run from the Godot class registry.
 */
export interface DiagnosticsTypeInfo {
  /** All variant/value type constructors (Vector2, Color, Packed*Array, Dictionary, ...). */
  constructors: Set<string>;
  /** Subset of {@link constructors} whose names match `Packed*Array`. */
  packedArrayTypes: Set<string>;
  /** Constructors banned from `in` RHS (excludes allowed containers and packed arrays). */
  bannedInTypes: Set<string>;
}

/**
 * Context passed through the transformation pipeline.
 */
export interface TransformContext {
  /** TypeScript program */
  program: ts.Program;
  /** TypeScript type checker */
  checker: ts.TypeChecker;
  /** Current source file being transformed */
  sourceFile: ts.SourceFile;
  /** File path of the source */
  filePath: string;
  /** Diagnostics / warnings collected during transformation */
  diagnostics: TransformDiagnostic[];
  /** Pre-derived sets of Godot variant types (for `in`-operator and param diagnostics). */
  diagInfo: DiagnosticsTypeInfo;
  /**
   * TypeScript source root. Used by import-resolution code to mirror
   * relative paths into the GDScript output tree.
   */
  tsDir: string;
  /** GDScript output root — sibling of {@link tsDir}. */
  gdDir: string;
  /**
   * Godot project root. `res://` paths emitted by `preload(...)` and
   * `extends "res://..."` are taken relative to this directory.
   */
  projectRoot: string;
  /**
   * Godot class registry. Used to recognise Godot built-in types (classes,
   * value-type constructors, global enums) by name when classifying TS type
   * annotations — see {@link tsTypeNodeToGdType}. May be `undefined` when the
   * registry could not be resolved, in which case classification can only
   * emit types it proves are classes/enums via the checker and drops every
   * other name (Godot built-ins can no longer be recognised by name).
   */
  registry?: GodotClassRegistry;
}

// ─── Anonymous class naming ─────────────────────────────────

/**
 * Sentinel TS class name used for anonymous addon scripts (a `.gd`
 * file under `addons/` with no `class_name` declaration). `$` is not
 * a valid GDScript identifier character, so this name can never
 * collide with a real GD class. Each addon `.ts` is its own ES
 * module, so multiple files exporting `_$CLASS$_` don't collide
 * either — consumers of the addon's `.gd.d.ts` see the class via the
 * `import type { _$CLASS$_ as ScriptClass }` alias.
 *
 * Non-addon anonymous classes use {@link gdFilenameToAnonymousClassName}
 * instead — the filename-derived form is friendlier when users actually
 * read the generated TS source. Addons are auto-generated and read
 * mostly through their `.gd.d.ts` shadows, so the sentinel is fine.
 */
export const ANONYMOUS_ADDON_CLASS_NAME = '_$CLASS$_';

/**
 * Derive the TS class name for a `.gd` file that has no `class_name`
 * declaration. The convention: the leading underscore marks the class as
 * "module-scoped / anonymous in GD", and the body is the file's basename
 * converted to UpperCamelCase. Same on both conversion directions, so
 * round-tripping is stable.
 *
 * Examples:
 *   - `some_class.gd`  → `_SomeClass`
 *   - `Anonym.gd`      → `_Anonym`
 *   - `enemy.gd`       → `_Enemy`
 *   - `nested/foo.gd`  → `_Foo`  (path is ignored — only basename matters)
 */
export function gdFilenameToAnonymousClassName(filePath: string): string {
  // Strip directories (handle both / and \) and the .gd extension.
  const base = filePath.replace(/\\/g, '/').split('/').pop() ?? filePath;
  const stem = base.replace(/\.gd$/i, '');
  return '_' + toUpperCamelCase(stem);
}

/**
 * Convert a snake_case / kebab-case / dot.separated identifier to
 * UpperCamelCase. Already-PascalCase names pass through unchanged
 * (preserves embedded acronyms). Leading non-alphanumeric chars and
 * an empty result are coerced to `Anonym` so callers always get a
 * usable identifier.
 */
function toUpperCamelCase(name: string): string {
  // Split on any run of non-alphanumeric chars. Empty parts dropped.
  const parts = name.split(/[^a-zA-Z0-9]+/).filter((p) => p.length > 0);
  if (parts.length === 0) return 'Anonym';
  // For each part, uppercase the first char and keep the rest as-is —
  // that way `MyClass` stays `MyClass` (don't lowercase mid-word).
  return parts.map((p) => p[0]!.toUpperCase() + p.slice(1)).join('');
}

/**
 * True when a class name follows the "anonymous" convention — single
 * leading underscore that is NOT the `G_` global-class escape. Used
 * everywhere we need to decide whether to emit `class_name` (in TS→GD)
 * or `declare global` (in typings generation).
 */
export function isAnonymousClassName(name: string): boolean {
  return name.startsWith('_');
}

/**
 * One-way fallback applied during GD→TS conversion only: a GD
 * `class_name _Foo` would collide with the anonymous-class convention
 * (where `_`-prefixed TS names mean "no `class_name` in GD"), so the
 * TS shadow class is renamed to `G_Foo`. The TS→GD direction does NOT
 * un-escape — `G_Foo` in TS source emits `class_name G_Foo` in the
 * generated `.gd` verbatim. The escape happens at most once, when
 * generating addon shadows or running `initial-convert-gd-to-ts`; afterwards `G_Foo`
 * is the canonical identifier on both sides.
 */
export function escapeUnderscoreClassName(gdClassName: string): string {
  return gdClassName.startsWith('_')
    ? 'G_' + gdClassName.slice(1)
    : gdClassName;
}

/**
 * Diagnostic severity levels.
 *
 * - `error` — conversion failure (invalid/unsupported syntax). Blocks .gd
 *   output (unless `--emit-on-error`). Blocks Godot validation.
 * - `type-error` — semantic/type issue, but GD emission produced valid output.
 *   .gd IS written. Counted as an error by `convert`/`watch` and the ts-plugin.
 *   Godot validation still runs.
 * - `warning` — non-blocking advisory. Shown as WARN everywhere.
 * - `info` — debug-level; filtered out in most consumers.
 */
export type DiagnosticSeverity = 'error' | 'type-error' | 'warning' | 'info';

export interface TransformDiagnostic {
  message: string;
  severity: DiagnosticSeverity;
  file: string;
  /** 1-based line number (matches editor/CLI `line:col` convention). */
  line: number;
  /**
   * 1-based column number. Producers that obtain a 0-based character
   * index (TypeScript `getLineAndCharacterOfPosition`, tree-sitter
   * `startPosition.column`) MUST add `+1` before storing here.
   * Consumers that need a 0-based offset (e.g. TypeScript
   * `getPositionOfLineAndCharacter` in the ts-plugin) subtract `1`
   * on the way out.
   */
  column: number;
}

/**
 * True for severities that should surface as lint / ts-plugin errors (exit code 1 for CLI lint, red squiggle in the IDE).
 * Both `error` and `type-error` are user-facing errors; only `error` blocks
 * emission/Godot validation. Use {@link isConversionErrorSeverity} for that.
 */
export function isReportableErrorSeverity(sev: DiagnosticSeverity): boolean {
  return sev === 'error' || sev === 'type-error';
}

/**
 * True only for real conversion errors — the converter could not emit valid
 * GDScript. These block `.gd` write (unless `--emit-on-error`) AND block
 * Godot validation (unless `--godot-validate-on-error`).
 */
export function isConversionErrorSeverity(sev: DiagnosticSeverity): boolean {
  return sev === 'error';
}

export interface TransformResult {
  /** Generated GDScript code */
  code: string;
  /** Source map JSON (if generated) */
  sourceMap?: string;
  /** Diagnostics from transformation */
  diagnostics: TransformDiagnostic[];
}

/**
 * Checks if a TypeScript type is the `int` alias.
 */
export function isIntType(type: ts.Type, checker: ts.TypeChecker): boolean {
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  return symbol?.getName() === 'int';
}

/**
 * Checks if a TypeScript type is the `float` alias.
 */
export function isFloatType(type: ts.Type, checker: ts.TypeChecker): boolean {
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  return symbol?.getName() === 'float';
}

/**
 * Converts a TypeScript type to its GDScript type annotation string.
 * Returns null if the type should be omitted.
 *
 * NOTE: unlike {@link tsTypeNodeToGdType}, this `ts.Type`-based variant does
 * NOT classify reference types — it returns the symbol name verbatim for any
 * class-like type, so an `object`/`interface`/unknown type would leak a bogus
 * annotation. It is currently unused for emission (kept only for its own
 * recursion). Do not wire it into an emit path without adding the same
 * class/enum/registry classification `classifyTypeReferenceName` applies.
 */
export function tsTypeToGdType(
  type: ts.Type,
  checker: ts.TypeChecker,
): string | null {
  // Check for int/float aliases
  if (isIntType(type, checker)) return 'int';
  if (isFloatType(type, checker)) return 'float';

  // number -> float
  if (type.getFlags() & ts.TypeFlags.Number) return 'float';

  // string
  if (type.getFlags() & ts.TypeFlags.String) return 'String';

  // boolean
  if (type.getFlags() & ts.TypeFlags.Boolean) return 'bool';

  // void
  if (type.getFlags() & ts.TypeFlags.Void) return 'void';

  // null
  if (type.getFlags() & ts.TypeFlags.Null) return 'null';

  // Array<T> -> Array[T]
  if (checker.isArrayType(type)) {
    const typeArgs = (type as ts.TypeReference).typeArguments;
    if (typeArgs && typeArgs.length > 0) {
      const elementType = tsTypeToGdType(typeArgs[0]!, checker);
      return elementType ? `Array[${elementType}]` : 'Array';
    }
    return 'Array';
  }

  // Function/callable types
  if (
    type.getCallSignatures().length > 0 &&
    !type.getConstructSignatures().length
  ) {
    const symbol = type.getSymbol();
    if (!symbol || symbol.getName() === '__type') return 'Callable';
  }

  // Class types
  const symbol = type.getSymbol();
  if (symbol) {
    const name = symbol.getName();
    // Skip TSOnly wrapped types
    if (name === 'TSOnly') return null;
    // Dictionary
    if (name === 'Dictionary') return 'Dictionary';
    return name;
  }

  // Union/intersection types -> omit (unsupported in GDScript)
  if (type.isUnion() || type.isIntersection()) return null;

  return null;
}

/**
 * Converts a TypeScript type annotation node to GDScript type string.
 */
export function tsTypeNodeToGdType(
  typeNode: ts.TypeNode | undefined,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  className?: string,
  registry?: GodotClassRegistry,
): string | null {
  if (!typeNode) return null;

  // Check for literal type names like `int` and `float`
  if (ts.isTypeReferenceNode(typeNode)) {
    let name = typeNode.typeName.getText(sourceFile);
    // Strip own class name prefix: `MyClass.State` → `State`. Same for
    // anonymous classes (`_FilenameClass.State` → `State`).
    if (className && name.startsWith(className + '.')) {
      name = name.slice(className.length + 1);
    }
    if (name === 'int' || name === 'float') return name;
    if (name === 'TSOnly') return null;
    if (name === 'Signal') return 'Signal';
    // `Promise<T>` is a TS-only async wrapper. GDScript's `await` resumes with
    // the raw value, so for type purposes `Promise<T>` ≡ `T`. Unwrap and recurse.
    // `Promise` (no arg) and `Promise<void>` degrade to no return type.
    if (name === 'Promise') {
      const arg = typeNode.typeArguments?.[0];
      if (!arg) return null;
      if (arg.kind === ts.SyntaxKind.VoidKeyword) return null;
      return tsTypeNodeToGdType(arg, checker, sourceFile, className, registry);
    }
    return classifyTypeReferenceName(typeNode, name, checker, registry);
  }

  // Keyword types
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return 'float';
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return 'String';
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return 'bool';
  if (typeNode.kind === ts.SyntaxKind.VoidKeyword) return 'void';
  if (typeNode.kind === ts.SyntaxKind.NullKeyword) return 'null';
  // `unknown` / `any` → omit annotation. GD's `Variant` is just "untyped",
  // and the no-annotation form is the idiomatic way to express that.
  if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) return null;
  if (typeNode.kind === ts.SyntaxKind.AnyKeyword) return null;

  // Array type: T[] -> Array[T]
  if (ts.isArrayTypeNode(typeNode)) {
    const elementType = tsTypeNodeToGdType(
      typeNode.elementType,
      checker,
      sourceFile,
      className,
      registry,
    );
    return elementType ? `Array[${elementType}]` : 'Array';
  }

  // Function type: () => void -> Callable
  if (ts.isFunctionTypeNode(typeNode)) {
    return 'Callable';
  }

  // Union types: GDScript has no union syntax, but every typed
  // variable in GD already accepts `null` implicitly, so a TS union of
  // the form `T | null` (or `null | T`) collapses cleanly to `T`.
  // Anything more complex than that — multiple non-null members,
  // intersections, etc. — has no GD equivalent and is omitted.
  if (ts.isUnionTypeNode(typeNode)) {
    const nonNull = typeNode.types.filter((t) => !isNullLiteralTypeNode(t));
    if (nonNull.length === 1 && nonNull.length !== typeNode.types.length) {
      return tsTypeNodeToGdType(
        nonNull[0]!,
        checker,
        sourceFile,
        className,
        registry,
      );
    }
    return null;
  }
  if (ts.isIntersectionTypeNode(typeNode)) {
    return null;
  }

  return null;
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
function classifyTypeReferenceName(
  typeNode: ts.TypeReferenceNode,
  name: string,
  checker: ts.TypeChecker,
  registry?: GodotClassRegistry,
): string | null {
  // Resolve the symbol, following import aliases to the real declaration so
  // that types imported from another file are classified by what they are,
  // not by the `ImportSpecifier` binding.
  let symbol = checker.getSymbolAtLocation(typeNode.typeName);
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
    symbol = checker.getAliasedSymbol(symbol);
  }
  const declarations = symbol?.getDeclarations() ?? [];

  // Type aliases have no GDScript equivalent → omit.
  if (declarations.some(ts.isTypeAliasDeclaration)) return null;

  // User / Godot `class` and `enum` declarations are valid GD types.
  if (
    declarations.some(
      (d) => ts.isClassDeclaration(d) || ts.isEnumDeclaration(d),
    )
  ) {
    return name;
  }

  // Godot built-in types are recognised by name (works without typings).
  if (
    registry &&
    (registry.hasClass(name) ||
      registry.isConstructor(name) ||
      registry.isGlobalEnum(name))
  ) {
    return name;
  }

  // Whatever is left is a non-class type (interface, `object`-like, namespace),
  // a dotted ref we can't verify (`Node.ProcessMode`, `Outer.SomeIface`), or an
  // unknown / unresolved name — none provably a GD type. Omit the annotation:
  // GD type hints are optional, so dropping a type is always safe, whereas
  // emitting a bogus one breaks the generated GDScript.
  return null;
}

/** True for the `null` keyword wrapped in a `LiteralTypeNode`. */
function isNullLiteralTypeNode(node: ts.TypeNode): boolean {
  return (
    ts.isLiteralTypeNode(node) &&
    node.literal.kind === ts.SyntaxKind.NullKeyword
  );
}

// ─── Reference-type classification ────────────────────────────────

/**
 * True when `gdType` refers to a Godot class (Node, Resource, Material, user
 * class, ...) — a type that can legitimately hold `null` in GDScript. False
 * for primitives (int, float, bool, String), variant/value types (Vector2,
 * Color, Packed*Array, Dictionary, Callable, Signal, StringName, NodePath, ...),
 * typed array/dictionary syntax, enum references, and special markers
 * (`void`, `Nil`, `Variant`, `any`, `unknown`).
 *
 * Reference types are candidates for `T | null` widening in the GD-to-TS
 * converter. Value types are not — Godot does not permit assigning null to
 * them.
 */
export function isReferenceType(
  gdType: string,
  registry: GodotClassRegistry,
): boolean {
  const cleaned = gdType.trim();

  if (
    cleaned === '' ||
    cleaned === 'Nil' ||
    cleaned === 'Variant' ||
    cleaned === 'void'
  ) {
    return false;
  }
  if (cleaned === 'any' || cleaned === 'unknown') return false;
  if (
    cleaned.endsWith('[]') ||
    cleaned.startsWith('Array[') ||
    cleaned.startsWith('Dictionary[')
  ) {
    return false;
  }
  // Dotted names are always Godot class enum refs (e.g. `Node.ProcessMode`).
  // GDScript has no syntax for dotted inner-class type references in its own
  // source, so any `.` here is an enum. TS-side dotted references are handled
  // separately by callers that have class-scope context.
  if (cleaned.includes('.')) return false;
  if (registry.isConstructor(cleaned)) return false;

  return true;
}
