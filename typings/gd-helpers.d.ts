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

declare const gd: {
  /** Create a signal. Transforms to `signal name` in GDScript. */
  readonly signal<T extends unknown[] = unknown[]>(): Signal<T>;

  /**
   * Create an enum. Transforms to `enum Name {...}` in GDScript.
   * @example
   * MY_ENUM = gd.enum('VALUE_1', 'VALUE_2', ['VALUE_3', -1])
   * // becomes: enum MyEnum {VALUE_1, VALUE_2, VALUE_3 = -1}
   */
  readonly enum<const T extends string>(...args: (T | [T, number])[]): Record<T, number>;
  // `enum` is reserved in TS, so use `enum_` in declaration but map to `enum` in user code

  /** GDScript `as` operator. Transforms to `value as Type` in GDScript. */
  readonly as<T, U>(value: T, type: new (...args: any[]) => U):
    T extends U ? U : U | null;

  readonly math: {
    /** Transforms to `a + b + ...` in GDScript (operator overload for non-primitives) */
    readonly add<T>(...operands: T[]): T;
    /** Transforms to `a - b - ...` in GDScript */
    readonly sub<T>(...operands: T[]): T;
    /** Transforms to `a * b * ...` in GDScript */
    readonly mul<T>(...operands: T[]): T;
    /** Transforms to `a / b / ...` in GDScript */
    readonly div<T>(...operands: T[]): T;
  }

  // Decorators

  // Decorators are accessed as `@gd.export`, `@gd.onready`, etc.
  // Since `export` is a reserved word in TS, decorators are defined via
  // the `decorators` sub-namespace. The transformer maps `@gd.export` directly.
  readonly export(target: any, context: any): void;
  readonly export_category(category: string): (target: any, context: any) => void;
  readonly export_global_file(...filters: string[]): (target: any, context: any) => void;
  readonly onready(target: any, context: any): void;
  readonly icon(path: string): (target: any, context: any) => void;
  readonly tool(target: any, context: any): void;
}
