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
  call(method: string, ...args: any[]): unknown;
  call_deferred<N extends string, A extends any[], R>(
    this: Record<N, (...args: A) => R>,
    method: N,
    ...args: A
  ): R;
  call_deferred(method: string, ...args: any[]): unknown;
  callv<N extends string, A extends any[], R>(
    this: Record<N, (...args: A) => R>,
    method: N,
    args: A,
  ): R;
  callv(method: string, args: any[]): unknown;
  emit_signal<const N extends string, A extends any[]>(
    this: Record<N, Signal<A>>,
    signal: N,
    ...args: A
  ): Error.OK | Error.ERR_UNAVAILABLE;
  emit_signal(signal: string, ...args: any[]): Error.OK | Error.ERR_UNAVAILABLE;
  get<P extends keyof this>(property: P): this[P];
  get(property: string): unknown;
}
