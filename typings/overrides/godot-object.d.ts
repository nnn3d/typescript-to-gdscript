/**
 * Override: GodotObject — typed get_meta, call, emit_signal.
 */
declare class GodotObject {
  /** Returns the object's metadata for the given `name`. If the entry does not exist, returns `default_`. */
  get_meta<T = unknown>(name: string, default_?: T): T;
  /** Calls the `method` on the object and returns the result. Supports variable arguments. */
  call<N extends string, A extends any[], R>(this: Record<N, (...args: A) => R>, method: N, ...args: A): R;
  /** Calls the `method` on the object during idle time. Always returns null. */
  call_deferred<const N extends string, A extends any[], R>(this: Record<N, (...args: A) => R>, method: N, ...args: A): R;
  /** Emits the given `signal` by name with the provided arguments. */
  emit_signal<const N extends string, A extends any[]>(this: Record<N, Signal<A>>, signal: N, ...args: A): int;
}
