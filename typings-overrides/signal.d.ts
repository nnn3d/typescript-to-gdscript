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
  emit(...args: T): void;
  /**
   * `flags` takes `Object.ConnectFlags` values (`CONNECT_ONE_SHOT`,
   * `CONNECT_DEFERRED`, …). Returns an `Error` code, as Godot does.
   */
  connect(callable: (...args: T) => void, flags?: int): int;
  disconnect(callable: (...args: T) => void): void;
  is_connected(callable: (...args: T) => void): boolean;
  /**
   * Types `await signal` only: GDScript signals have no `then`, and being
   * private keeps a call to it a type error. Godot returns `null` with no
   * arguments, the value itself with one, and an Array of them with more,
   * counting the arguments the emit actually passed; see `_GDSignalAwaited`
   * in `globals/globals.d.ts`.
   */
  private then(onfulfilled: (value: _GDSignalAwaited<T>) => void): void;
}
