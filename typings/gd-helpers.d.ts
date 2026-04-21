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
  /** Create a signal. Transforms to `signal name` in GDScript. */
  readonly signal: <T extends unknown[] = unknown[]>() => Signal<T>;

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
   */
  readonly dict: (entries: [unknown, unknown][]) => Dictionary;

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
  as<T, U>(
    value: T,
    type: new (...args: any[]) => U,
  ): T extends U ? U : U | null;

  /** GDScript `is` check for primitive types (int, float, bool, String). Use `instanceof` for class types. */
  is(value: unknown, type: typeof int): value is int;
  is(value: unknown, type: typeof float): value is float;
  is(value: unknown, type: typeof bool): value is boolean;
  is(value: unknown, type: typeof String): value is string;

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
