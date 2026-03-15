/**
 * Override: GodotObject — typed get_meta, call, emit_signal.
 */
declare class GodotObject {
  /** Returns the object's metadata for the given `name`. If the entry does not exist, returns `default_`. */
  get_meta<T = unknown>(name: string, default_?: T): T;
  /** Calls the `method` on the object and returns the result. Supports variable arguments. */
  call<R = unknown>(method: string, ...args: any[]): R;
  /** Calls the `method` on the object during idle time. Always returns null. */
  call_deferred(method: string, ...args: any[]): void;
  /** Emits the given `signal` by name with the provided arguments. */
  emit_signal(signal: string, ...args: any[]): int;
}
