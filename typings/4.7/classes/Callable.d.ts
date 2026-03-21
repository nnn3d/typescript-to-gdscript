// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Override: Function — untyped base for bare Callable/Function variables.
 *
 * Typed overloads (with `this` parameter) live on CallableFunction,
 * which TS automatically uses for concrete function types (lambdas, etc.).
 * This base interface works for `var c = new Callable()` and `var fn: Function`.
 */
declare interface Function {
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

  // Operator overloads
  [__ne]: { right: Callable; ret: boolean };
  [__eq]: { right: Callable; ret: boolean };
}

type Callable = Function;
declare var Callable: { new(): Callable; create(object: GodotObject, method: string): Callable };
/**
 * Override: CallableFunction — typed overloads for concrete function types.
 *
 * TS uses CallableFunction for lambda/arrow types and concrete function references.
 * These overloads provide type-safe call/bind with `this` parameter inference.
 *
 * GDScript bind() appends arguments to the END of the parameter list,
 * so bind(lastArg) on (a, b, c) => R returns (a, b) => R.
 */
declare interface CallableFunction extends Function {
  bind<F>(this: F): F;
  bind<Init extends any[], L, R>(
  this: (...args: [...Init, L]) => R,
  arg: L,
  ): (...args: Init) => R;
  bind<Init extends any[], L1, L2, R>(
  this: (...args: [...Init, L1, L2]) => R,
  arg1: L1,
  arg2: L2,
  ): (...args: Init) => R;
  bind<Init extends any[], L1, L2, L3, R>(
  this: (...args: [...Init, L1, L2, L3]) => R,
  arg1: L1,
  arg2: L2,
  arg3: L3,
  ): (...args: Init) => R;
  bind<Init extends any[], L1, L2, L3, L4, R>(
  this: (...args: [...Init, L1, L2, L3, L4]) => R,
  arg1: L1,
  arg2: L2,
  arg3: L3,
  arg4: L4,
  ): (...args: Init) => R;
  bind<Init extends any[], L1, L2, L3, L4, L5, R>(
  this: (...args: [...Init, L1, L2, L3, L4, L5]) => R,
  arg1: L1,
  arg2: L2,
  arg3: L3,
  arg4: L4,
  arg5: L5,
  ): (...args: Init) => R;
  bind(...args: any[]): Callable;
  bindv<F>(this: F, args: []): F;
  bindv<Init extends any[], L, R>(
  this: (...args: [...Init, L]) => R,
  args: [L],
  ): (...args: Init) => R;
  bindv<Init extends any[], L1, L2, R>(
  this: (...args: [...Init, L1, L2]) => R,
  args: [L1, L2],
  ): (...args: Init) => R;
  bindv<Init extends any[], L1, L2, L3, R>(
  this: (...args: [...Init, L1, L2, L3]) => R,
  args: [L1, L2, L3],
  ): (...args: Init) => R;
  bindv<Init extends any[], L1, L2, L3, L4, R>(
  this: (...args: [...Init, L1, L2, L3, L4]) => R,
  args: [L1, L2, L3, L4],
  ): (...args: Init) => R;
  bindv<Init extends any[], L1, L2, L3, L4, L5, R>(
  this: (...args: [...Init, L1, L2, L3, L4, L5]) => R,
  args: [L1, L2, L3, L4, L5],
  ): (...args: Init) => R;
  bindv(args: Array<any>): Callable;
  call<A extends any[], R>(this: (...args: A) => R, ...args: A): R;
  call_deferred<A extends any[], R>(this: (...args: A) => R, ...args: A): void;
  callv<A extends any[], R>(this: (...args: A) => R, args: A): R;
  rpc<A extends any[]>(this: (...args: A) => any, ...args: A): void;
  rpc_id<A extends any[]>(
  this: (...args: A) => any,
  peer_id: int,
  ...args: A
  ): void;
  unbind<F>(this: F, argcount: int): F;
}
declare interface NewableFunction extends Function {}
