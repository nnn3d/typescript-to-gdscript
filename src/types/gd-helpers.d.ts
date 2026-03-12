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

/** GDScript Dictionary type */
type Dictionary<K = any, V = any> = {
  [key: string]: V;
};

/** Global helper for StringName */
declare function StringName(value: string): string;

/** Global helper for NodePath */
declare function NodePath(value: string): string;

declare namespace gd {
  /** Create a signal. Transforms to `signal name` in GDScript. */
  function signal<T extends any[] = any[]>(): Signal<T>;

  /**
   * Create an enum. Transforms to `enum Name {...}` in GDScript.
   * @example
   * MY_ENUM = gd.enum('VALUE_1', 'VALUE_2', ['VALUE_3', -1])
   * // becomes: enum MyEnum {VALUE_1, VALUE_2, VALUE_3 = -1}
   */
  function enum_(...args: (string | [string, number])[]): any;
  // `enum` is reserved in TS, so use `enum_` in declaration but map to `enum` in user code

  /** GDScript `as` operator. Transforms to `value as Type` in GDScript. */
  function as<T, U>(value: T, type: new (...args: any[]) => U):
    T extends U ? U : U | null;

  namespace math {
    /** Transforms to `a + b + ...` in GDScript (operator overload for non-primitives) */
    function add<T>(...operands: T[]): T;
    /** Transforms to `a - b - ...` in GDScript */
    function sub<T>(...operands: T[]): T;
    /** Transforms to `a * b * ...` in GDScript */
    function mul<T>(...operands: T[]): T;
    /** Transforms to `a / b / ...` in GDScript */
    function div<T>(...operands: T[]): T;
  }

  // Decorators

  // Decorators are accessed as `@gd.export`, `@gd.onready`, etc.
  // Since `export` is a reserved word in TS, decorators are defined via
  // the `decorators` sub-namespace. The transformer maps `@gd.export` directly.
  namespace decorators {
    function export_(target: any, context: any): void;
    function export_category(category: string): (target: any, context: any) => void;
    function export_global_file(...filters: string[]): (target: any, context: any) => void;
    function onready(target: any, context: any): void;
    function icon(path: string): (target: any, context: any) => void;
    function tool(target: any, context: any): void;
  }
}
