/**
 * Override: Function — untyped base for bare Callable/Function variables.
 *
 * Typed overloads (with `this` parameter) live on CallableFunction,
 * which TS automatically uses for concrete function types (lambdas, etc.).
 * This base interface works for `var c = new Callable()` and `var fn: Function`.
 */
interface Function {
  bind(...args: any[]): Callable;
  bindv(args: Array<any>): Callable;
  call(...args: any[]): unknown;
  call_deferred(...args: any[]): void;
  callv(args: Array<any>): unknown;
  get_argument_count(): int;
  get_bound_arguments(): Array<unknown>;
  get_bound_arguments_count(): int;
  get_method(): string;
  get_object(): GodotObject;
  get_object_id(): int;
  get_unbound_arguments_count(): int;
  hash(): int;
  is_custom(): boolean;
  is_null(): boolean;
  is_standard(): boolean;
  is_valid(): boolean;
  rpc(...args: any[]): void;
  rpc_id(peer_id: int, ...args: any[]): void;
  unbind(argcount: int): Callable;
}
