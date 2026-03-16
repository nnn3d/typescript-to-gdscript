/**
 * Global `gd` namespace for GDScript helpers in TypeScript.
 * These helpers are transformed into native GDScript constructs during conversion.
 */

/** Type that gets removed during transformation — for TS-only type info */
type TSOnly<T> = T;

/** Alias for number representing an integer in GDScript */
type int = number;

/** Alias for number representing a float in GDScript */
type float = number;

/** GDScript Signal type with typed parameters */
type Signal<T extends any[] = any[]> = {
  emit(...args: T): void;
  connect(callable: (...args: T) => void): void;
  disconnect(callable: (...args: T) => void): void;
  is_connected(callable: (...args: T) => void): boolean;
};

/** Global helper for StringName */
declare function StringName(value: string): string;

/** Global helper for NodePath */
declare function NodePath(value: string): string;

// ─── Operator Symbols ─────────────────────────────────────────
// Unique symbols used as branded keys for operator overload dispatch.
// Godot classes declare [__add](right: T): R overloads keyed by these symbols.

declare const __add: unique symbol;
declare const __sub: unique symbol;
declare const __mul: unique symbol;
declare const __div: unique symbol;
declare const __eq: unique symbol;
declare const __ne: unique symbol;
declare const __gt: unique symbol;
declare const __gte: unique symbol;
declare const __lt: unique symbol;
declare const __lte: unique symbol;
declare const __plus: unique symbol;
declare const __minus: unique symbol;

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
type _ExtractRet<U, R> = U extends { right: R; ret: infer Ret } ? Ret : never;
type OpResult<S extends symbol, L, R> = _ExtractRet<OpEntries<S, L>, R>;

/** Extract unary operator return type */
type _ExtractUnaryRet<U> = U extends { ret: infer Ret } ? Ret : never;
type UnaryOpResult<S extends symbol, L> = _ExtractUnaryRet<OpEntries<S, L>>;

declare const gd: {
  /** Create a signal. Transforms to `signal name` in GDScript. */
  readonly signal: <T extends unknown[] = unknown[]>() => Signal<T>;

  /**
   * Create an enum. Transforms to `enum Name {...}` in GDScript.
   * @example
   * MY_ENUM = gd.enum('VALUE_1', 'VALUE_2', ['VALUE_3', -1])
   * // becomes: enum MyEnum {VALUE_1, VALUE_2, VALUE_3 = -1}
   */
  readonly enum: <const T extends string>(...args: (T | [T, number])[]) => Record<T, number>;
  // `enum` is reserved in TS, so use `enum_` in declaration but map to `enum` in user code

  /** GDScript `as` operator. Transforms to `value as Type` in GDScript. */
  readonly as: <T, U>(value: T, type: new (...args: any[]) => U) =>
    T extends U ? U : U | null;

  readonly ops: {
    /** Transforms to `a + b` in GDScript */
    readonly add: <L extends Record<typeof __add, any>, R extends OpRight<typeof __add, L>>(a: L, b: R) => OpResult<typeof __add, L, R>;
    /** Transforms to `a - b` in GDScript */
    readonly sub: <L extends Record<typeof __sub, any>, R extends OpRight<typeof __sub, L>>(a: L, b: R) => OpResult<typeof __sub, L, R>;
    /** Transforms to `a * b` in GDScript */
    readonly mul: <L extends Record<typeof __mul, any>, R extends OpRight<typeof __mul, L>>(a: L, b: R) => OpResult<typeof __mul, L, R>;
    /** Transforms to `a / b` in GDScript */
    readonly div: <L extends Record<typeof __div, any>, R extends OpRight<typeof __div, L>>(a: L, b: R) => OpResult<typeof __div, L, R>;
    /** Transforms to `a == b` in GDScript */
    readonly eq: <L extends Record<typeof __eq, any>, R extends OpRight<typeof __eq, L>>(a: L, b: R) => OpResult<typeof __eq, L, R>;
    /** Transforms to `a != b` in GDScript */
    readonly ne: <L extends Record<typeof __ne, any>, R extends OpRight<typeof __ne, L>>(a: L, b: R) => OpResult<typeof __ne, L, R>;
    /** Transforms to `a > b` in GDScript */
    readonly gt: <L extends Record<typeof __gt, any>, R extends OpRight<typeof __gt, L>>(a: L, b: R) => OpResult<typeof __gt, L, R>;
    /** Transforms to `a >= b` in GDScript */
    readonly gte: <L extends Record<typeof __gte, any>, R extends OpRight<typeof __gte, L>>(a: L, b: R) => OpResult<typeof __gte, L, R>;
    /** Transforms to `a < b` in GDScript */
    readonly lt: <L extends Record<typeof __lt, any>, R extends OpRight<typeof __lt, L>>(a: L, b: R) => OpResult<typeof __lt, L, R>;
    /** Transforms to `a <= b` in GDScript */
    readonly lte: <L extends Record<typeof __lte, any>, R extends OpRight<typeof __lte, L>>(a: L, b: R) => OpResult<typeof __lte, L, R>;
    /** Transforms to `+a` in GDScript (unary plus) */
    readonly plus: <T extends Record<typeof __plus, any>>(a: T) => UnaryOpResult<typeof __plus, T>;
    /** Transforms to `-a` in GDScript (unary minus) */
    readonly minus: <T extends Record<typeof __minus, any>>(a: T) => UnaryOpResult<typeof __minus, T>;
  }

  // Decorators

  // Decorators are accessed as `@gd.export`, `@gd.onready`, etc.
  // Since `export` is a reserved word in TS, decorators are defined via
  // the `decorators` sub-namespace. The transformer maps `@gd.export` directly.
  readonly export: (target: any, context: any) => void;
  readonly export_category: (category: string) => (target: any, context: any) => void;
  readonly export_global_file: (...filters: string[]) => (target: any, context: any) => void;
  readonly onready: (target: any, context: any) => void;
  readonly icon: (path: string) => (target: any, context: any) => void;
  readonly tool: (target: any, context: any) => void;
}
