// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Override: GodotSignal — typed connect, disconnect, emit for bare Signal variables.
 *
 * The callback stays a concrete function type rather than widening to
 * `Callable`: `type Callable = Function`, so a union with it accepts any
 * function at all and the parameter list stops being checked. A bound
 * callable does not need the widening — `CallableFunction.bind` returns
 * a proper function type with the bound arguments removed.
 */
declare class Signal<T extends any[] = any[]> {
  /**
  * `flags` takes `Object.ConnectFlags` values (`CONNECT_ONE_SHOT`,
  * `CONNECT_DEFERRED`, …). Returns an `Error` code, as Godot does.
  */
  connect(callable: (...args: T) => void, flags?: int): int;
  /**
   * Disconnects this signal from the specified {@link Callable}. If the connection does not exist, generates an error. Use {@link is_connected} to make sure that the connection exists.
   */
  disconnect(callable: (...args: T) => void): void;
  /**
   * Emits this signal. All {@link Callable}s connected to this signal will be triggered. This method supports a variable number of arguments, so parameters can be passed as a comma separated list.
   */
  emit(...args: T): void;
  /**
   * Returns an {@link Array} of connections for this signal. Each connection is represented as a {@link Dictionary} that contains three entries:
   * - `signal` is a reference to this signal;
   * - `callable` is a reference to the connected {@link Callable};
   * - `flags` is a combination of {@link Object.ConnectFlags}.
   */
  get_connections(): Array<unknown>;
  /** Returns the name of this signal. */
  get_name(): string;
  /** Returns the object emitting this signal. */
  get_object(): GodotObject | null;
  /** Returns the ID of the object emitting this signal (see {@link Object.get_instance_id}). */
  get_object_id(): int;
  /** Returns `true` if any {@link Callable} is connected to this signal. */
  has_connections(): boolean;
  /** Returns `true` if the specified {@link Callable} is connected to this signal. */
  is_connected(callable: (...args: T) => void): boolean;
  /**
   * Returns `true` if this {@link Signal} has no object and the signal name is empty. Equivalent to `signal == Signal()`.
   */
  is_null(): boolean;

  // Operator overloads
  [__ops_ne]: { right: Signal; ret: boolean };
  [__ops_eq]: { right: Signal; ret: boolean };

  [__variant_converts]: Signal;

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  clear: never;
  duplicate: never;
  duplicate_deep: never;
  erase: never;
  find_key: never;
  get: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has: never;
  has_all: never;
  hash: never;
  is_empty: never;
  is_read_only: never;
  is_same_typed: never;
  is_same_typed_key: never;
  is_same_typed_value: never;
  is_typed: never;
  is_typed_key: never;
  is_typed_value: never;
  keys: never;
  make_read_only: never;
  merge: never;
  merged: never;
  recursive_equal: never;
  set: never;
  size: never;
  sort: never;
  values: never;
  /**
  * Types `await signal` only: GDScript signals have no `then`, and being
  * private keeps a call to it a type error. Godot returns `null` with no
  * arguments, the value itself with one, and an Array of them with more,
  * counting the arguments the emit actually passed; see `_GDSignalAwaited`
  * in `globals/globals.d.ts`.
  */
  private then(onfulfilled: (value: _GDSignalAwaited<T>) => void): void;
}
