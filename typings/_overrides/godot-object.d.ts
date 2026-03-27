/**
 * Override: GodotObject — typed get_meta, call, emit_signal.
 */
declare class GodotObject {
  get_meta<T = unknown>(name: string, default_?: T): T;
  call<N extends string, A extends any[], R>(
    this: Record<N, (...args: A) => R>,
    method: N,
    ...args: A
  ): R;
  call_deferred<const N extends string, A extends any[], R>(
    this: Record<N, (...args: A) => R>,
    method: N,
    ...args: A
  ): R;
  emit_signal<const N extends string, A extends any[]>(
    this: Record<N, Signal<A>>,
    signal: N,
    ...args: A
  ): int;
}
