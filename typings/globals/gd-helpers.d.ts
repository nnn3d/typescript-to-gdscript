/**
 * Global `gd` namespace for GDScript helpers in TypeScript.
 * These helpers are transformed into native GDScript constructs during conversion.
 */

/** Type that gets removed during transformation — for TS-only type info */
type TSOnly<T> = T;

/** Alias for number representing an integer in GDScript */
type int = number;
/** GDScript `int()` cast function — truncates to integer */
declare function int(from?: int | float | String | boolean): int;


/** Alias for number representing a float in GDScript */
type float = number;
/** GDScript `float()` cast function — converts to float */
declare function float(from?: int | float | String | boolean): float;

/** Alias for boolean representing a bool in GDScript */
type bool = boolean;
/** GDScript `bool()` cast function — converts to boolean */
declare function bool(from?: int | float | String | boolean): boolean;

/** GDScript `String()` cast function — converts to string */
declare function String(from?: unknown): string;

/** Global helper for StringName */
declare function StringName(value: string): string;

// ─── Node Tree Symbols ───────────────────────────────────────
// Used by scene typings to encode parent-child relationships in Node<Tree> generics.

declare const __node_root: unique symbol;
declare const __node_type: unique symbol;
declare const __node_children: unique symbol;
declare const __node_parent: unique symbol;
/** Symbol for unique name nodes accessible from any subtree */
declare const __node_unique: unique symbol;
/** Symbol for scene tree inheritance: extended scene references its base scene's tree */
declare const __node_extends: unique symbol;

// ─── Operator Symbols ─────────────────────────────────────────
// Unique symbols used as branded keys for operator overload dispatch.
// Godot classes declare [__ops_add](right: T): R overloads keyed by these symbols.

declare const __ops_add: unique symbol;
declare const __ops_sub: unique symbol;
declare const __ops_mul: unique symbol;
declare const __ops_div: unique symbol;
declare const __ops_eq: unique symbol;
declare const __ops_ne: unique symbol;
declare const __ops_gt: unique symbol;
declare const __ops_gte: unique symbol;
declare const __ops_lt: unique symbol;
declare const __ops_lte: unique symbol;
declare const __ops_rem: unique symbol;
declare const __ops_plus: unique symbol;
declare const __ops_minus: unique symbol;

// ─── Primitive Convert Symbols ───────────────────────────────────

declare const __variant_converts: unique symbol;

// ─── Operator Type Dispatch ───────────────────────────────────

/**
 * Operator symbols hold unions of `{ right: R, ret: Ret }` entries (binary)
 * or `{ ret: Ret }` entries (unary). This enables extraction of valid
 * right-hand types and per-overload return type inference.
 */

/** Get the operator entries union from a type */
type OpEntries<S extends symbol, L> = S extends keyof L ? L[S] : never;

/** Extract valid right-hand types (distributes over the union) */
type _ExtractRight<U> = U extends { right: infer R } ? R : never;
type OpRight<S extends symbol, L> = _ExtractRight<OpEntries<S, L>>;

/** Extract return type matching a specific right-hand type */
type _ExtractRet<U, R> = U extends { right: infer RightT; ret: infer Ret }
  ? R extends RightT ? Ret : never
  : never;
type OpResult<S extends symbol, L, R> = _ExtractRet<OpEntries<S, L>, R>;

/** Extract unary operator return type */
type _ExtractUnaryRet<U> = U extends { ret: infer Ret } ? Ret : never;
type UnaryOpResult<S extends symbol, L> = _ExtractUnaryRet<OpEntries<S, L>>;

declare const gd: {
  /**
   * Create a signal. Transforms to `signal name(args)` in GDScript. The type
   * argument is the argument list as a labelled tuple; without one the
   * signal has no arguments, like a bare `signal name`.
   */
  readonly signal: <T extends unknown[] = []>() => Signal<T>;

  /**
   * Godot getter/setter helper. `get` and `set` are required keys — pass
   * `null` to use GDScript's default (backing-field read/write) instead of
   * a custom accessor. At least one of them must be non-null.
   *
   * Both `get` and `set` are strictly typed against `T`, so bodies get full
   * type checking. Because the inline bodies reference `this.<name>` (the
   * property being defined), TypeScript's binding analysis fires TS7022
   * unless the property has an explicit type annotation (`b: int = ...`).
   * The GD→TS converter always emits that annotation for this reason.
   */
  readonly getset: <T>(config: {
    value?: T,
    get: (() => T) | null,
    set: ((v: T) => void) | null,
  }) => T;

  /**
   * Create a Dictionary with non-string keys. Transforms to `{key: value, ...}` in GDScript.
   * Keys must be identifiers (variables) or string/number literals — expressions are not allowed.
   * @example
   * gd.dict([[key1, 'value'], [key2, 'value'], ['str_key', 'value']])
   * // becomes: {key1: "value", key2: "value", "str_key": "value"}
   *
   * The dictionary type comes from where the result goes — class keys,
   * string keys or number keys alike — and the entries are checked
   * against its key and value types, so it fits a `Dictionary<Node, int>`,
   * which an object literal cannot, `{}` included. It is never inferred
   * from the entries: a key typed `this` or a subclass would make a
   * dictionary TypeScript refuses as `Dictionary<Node, int>` (its key is
   * invariant). With nowhere typed to go, the result is untyped.
   *
   * Or name the key and value types in the call: `gd.dict<Vector2, int>([...])`
   * is a `Dictionary<Vector2, int>` wherever it goes. (Two type arguments
   * select the second signature; a call without them keeps the first.)
   */
  readonly dict: {
    <D = Dictionary>(entries: NoInfer<GdDictEntry<NonNullable<D>>>[]): D;
    <K, V>(entries: [NoInfer<K>, NoInfer<V>][]): Dictionary<K, V>;
  };

  /**
   * GDScript `match` statement. Transforms to `match value:` with pattern cases in GDScript.
   *
   * Cases can be:
   * - **Simple match**: `{ match: value, do: () => { ... } }` → `value: ...`
   * - **Wildcard**: `{ match: undefined, do: () => { ... } }` → `_: ...`
   * - **Multiple patterns**: `{ matchMany: [1, 2, 3], do: () => { ... } }` → `1, 2, 3: ...`
   * - **Binding with guard**: `(x, y) => ({ match: [x, y], when: y === x, do: () => { ... } })` → `[var x, var y] when y == x: ...`
   * - **Array pattern**: `{ match: [1, ...[] ], do: () => { ... } }` → `[1, ..]: ...`
   * - **Dict pattern**: `{ match: { key: "val", ...{} }, do: () => { ... } }` → `{"key": "val", ..}: ...`
   *
   * In array/dict patterns, `undefined` maps to `_` (wildcard).
   * Arrow function parameters become `var name` pattern bindings.
   * Spread `...[]` in arrays and `...{}` in dicts map to `..` (open-ended).
   * Uses arrow functions (`do: () => {}`) to preserve `this` context.
   *
   * @example
   * gd.match(this.x, [
   *   { match: 1, do: () => { print("one"); } },
   *   { match: 2, do: () => { print("two"); } },
   *   { match: undefined, do: () => { print("other"); } },
   * ]);
   * // becomes:
   * // match x:
   * //   1:
   * //     print("one")
   * //   2:
   * //     print("two")
   * //   _:
   * //     print("other")
   */
  readonly match: (
    value: unknown,
    cases: Array<
      | {
          match: unknown;
          do: () => void;
        }
      | {
          matchMany: unknown[];
          do: () => void;
        }
      | ((...args: unknown[]) => {
          match: unknown;
          when?: unknown;
          do: () => void;
        })
    >,
  ) => void;

  /** GDScript `as` operator. Transforms to `value as Type` in GDScript. */
  /** Variant conversion to plain Array: extracts the array variant from the source's __variant_converts. */
  as<
    T extends { [__variant_converts]: any } & Array[typeof __variant_converts],
  >(
    value: T,
    type: ArrayConstructor,
  ): T extends { [Symbol.iterator](): IterableIterator<infer A> }
    ? A[]
    : unknown[];
  /** Variant conversion: convert between primitive value types (Vector2 ↔ Vector2i, etc.) */
  as<U extends { prototype: { [__variant_converts]: any } }>(
    value: U['prototype'][typeof __variant_converts],
    type: U,
  ): U['prototype'];
  /**
   * Cast to a scalar. The result is the scalar type rather than a
   * narrowing of the source: `int` and `float` are both aliases of
   * `number` in these typings, so the cast cannot be expressed as a
   * narrowing the way a class type can. For the same reason
   * `gd.as(x, float)` binds to the `int` overload on the TS side —
   * harmless, since both return `number`; the emitted GDScript names
   * the type the source wrote.
   */
  as(value: unknown, type: typeof int): int;
  as(value: unknown, type: typeof float): float;
  as(value: unknown, type: typeof bool): boolean;
  as(value: unknown, type: typeof StringName): StringName;
  /**
   * Cast to a class. `abstract new` rather than `new` so the target may
   * be an abstract class — `gd.as(node, SomeAbstractBase)` is an
   * ordinary GDScript cast, and a concrete constructor satisfies
   * `abstract new` too.
   */
  as<T, U>(
    value: T,
    type: abstract new (...args: any[]) => U,
  ): T extends U ? U : U | null;

  /** GDScript `is` check for primitive types (int, float, bool, String). Use `instanceof` for class types. */
  is(value: unknown, type: typeof int): value is int;
  is(value: unknown, type: typeof float): value is float;
  is(value: unknown, type: typeof bool): value is boolean;
  is(value: unknown, type: typeof String): value is string;

  /**
   * GDScript `typeof()`. Transforms to `typeof(value)` in GDScript.
   *
   * Lives here because `typeof` is a TypeScript operator, so the global
   * function cannot be declared under its own name.
   *
   * @example
   * if (gd.typeof(value) === Variant.Type.TYPE_INT) { print("int"); }
   */
  readonly typeof: (value: unknown) => Variant.Type;

  /**
   * Emit raw GDScript code. The string is inserted as-is into the output.
   * Single-line strings are emitted at the current indentation level.
   * Multiline strings (starting with \n) have their common indentation stripped
   * and are re-indented to the current level.
   * @example
   * gd.eval('var a = 10')
   * gd.eval(`
   *   var b = 20
   *   if b > 10:
   *     b = 30
   * `)
   */
  readonly eval: <T = void>(expression: string) => T;

  readonly ops: {
    /** Transforms to `[] + []` in GDScript */
    add<A, B>(a: Array<A>, b: Array<B>): Array<A | B>;
    /** Transforms to `a + b` in GDScript */
    add<
      L extends Record<typeof __ops_add, any>,
      R extends OpRight<typeof __ops_add, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_add, L, R>;
    /** Transforms to `a - b` in GDScript */
    sub<
      L extends Record<typeof __ops_sub, any>,
      R extends OpRight<typeof __ops_sub, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_sub, L, R>;
    /** Transforms to `a * b` in GDScript */
    mul<
      L extends Record<typeof __ops_mul, any>,
      R extends OpRight<typeof __ops_mul, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_mul, L, R>;
    /** Transforms to `a / b` in GDScript */
    div<
      L extends Record<typeof __ops_div, any>,
      R extends OpRight<typeof __ops_div, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_div, L, R>;
    /** Transforms to `a % b` in GDScript (remainder/modulo) */
    rem<
      L extends Record<typeof __ops_rem, any>,
      R extends OpRight<typeof __ops_rem, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_rem, L, R>;
    /** Transforms to `a == b` in GDScript */
    eq<
      L extends Record<typeof __ops_eq, any>,
      R extends OpRight<typeof __ops_eq, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_eq, L, R>;
    /** Transforms to `a != b` in GDScript */
    ne<
      L extends Record<typeof __ops_ne, any>,
      R extends OpRight<typeof __ops_ne, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_ne, L, R>;
    /** Transforms to `a > b` in GDScript */
    gt<
      L extends Record<typeof __ops_gt, any>,
      R extends OpRight<typeof __ops_gt, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_gt, L, R>;
    /** Transforms to `a >= b` in GDScript */
    gte<
      L extends Record<typeof __ops_gte, any>,
      R extends OpRight<typeof __ops_gte, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_gte, L, R>;
    /** Transforms to `a < b` in GDScript */
    lt<
      L extends Record<typeof __ops_lt, any>,
      R extends OpRight<typeof __ops_lt, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_lt, L, R>;
    /** Transforms to `a <= b` in GDScript */
    lte<
      L extends Record<typeof __ops_lte, any>,
      R extends OpRight<typeof __ops_lte, L>,
    >(
      a: L,
      b: R,
    ): OpResult<typeof __ops_lte, L, R>;
    /** Transforms to `+a` in GDScript (unary plus) */
    plus<T extends Record<typeof __ops_plus, any>>(
      a: T,
    ): UnaryOpResult<typeof __ops_plus, T>;
    /** Transforms to `-a` in GDScript (unary minus) */
    minus<T extends Record<typeof __ops_minus, any>>(
      a: T,
    ): UnaryOpResult<typeof __ops_minus, T>;
  };
};

// ─── Promise — GDScript coroutine rules ─────────────────────────
//
// GDScript has no `Promise` type. `async`/`await` map directly to
// GDScript's coroutine `await`. The chained callback API
// (`.then` / `.catch` / `.finally`) has no equivalent — the
// converter emits a `type-error` diagnostic if any of these are
// called on a Promise value.
//
// We also flag them at the TypeScript level via `@deprecated` JSDoc
// overloads. Declaration merging keeps the original lib signatures
// intact (so `await` and internal async/await desugaring still
// work), but IDEs show a strikethrough + deprecation warning on
// `.then` / `.catch` / `.finally` calls — immediate feedback as the
// user types, before the converter even runs.
//
// This file is a script-mode `.d.ts` (no imports/exports), so the
// `interface Promise<T>` declaration merges with the global Promise
// directly — no `declare global` wrapper needed (which would only
// be valid in module-mode files).
interface Promise<T> {
  /**
   * @deprecated GDScript has no Promise. Use `await` instead —
   * the unwrapped value is what `await fn()` returns directly.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): Promise<TResult1 | TResult2>;
  /**
   * @deprecated GDScript has no Promise. Wrap `await` in
   * `try { … } catch (e) { … }` — GDScript propagates thrown
   * errors through the coroutine chain.
   */
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
  ): Promise<T | TResult>;
  /**
   * @deprecated GDScript has no `finally` equivalent for
   * coroutines. Run cleanup code after `await` completes instead.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

/**
 * The `[key, value]` entry type of a dictionary type, for `gd.dict`. A
 * string- or number-keyed `Dictionary<K, V>` is an index signature, any
 * other key a `DictionaryKeyMethods` surface; `keyof` tells the index
 * forms apart (a string index also admits numbers, so the pattern alone
 * cannot), and a surface is read last because an index type matches its
 * pattern too.
 */
type GdDictEntry<D> = string extends keyof D
  ? [string, D[keyof D]]
  : number extends keyof D
    ? [number, D[keyof D]]
    : D extends DictionaryKeyMethods<infer K, infer V>
      ? [K, V]
      : [unknown, unknown];
