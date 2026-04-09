// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Override: Function — untyped base for bare Callable/Function variables.
 *
 * Typed overloads (with `this` parameter) live on CallableFunction,
 * which TS automatically uses for concrete function types (lambdas, etc.).
 * This base interface works for `var c = new Callable()` and `var fn: Function`.
 */
declare interface Function {
  /**
   * Returns a copy of this {@link Callable} with one or more arguments bound. When called, the bound arguments are passed *after* the arguments supplied by {@link call}. See also {@link unbind}.
   * **Note:** When this method is chained with other similar methods, the order in which the argument list is modified is read from right to left.
   */
  bind(...args: any[]): Callable;
  /**
   * Returns a copy of this {@link Callable} with one or more arguments bound, reading them from an array. When called, the bound arguments are passed *after* the arguments supplied by {@link call}. See also {@link unbind}.
   * **Note:** When this method is chained with other similar methods, the order in which the argument list is modified is read from right to left.
   */
  bindv(args: Array<any>): Callable;
  /**
   * Calls the method represented by this {@link Callable}. Arguments can be passed and should match the method's signature.
   */
  call(...args: any[]): unknown;
  /**
   * Calls the method represented by this {@link Callable} in deferred mode, i.e. at the end of the current frame. Arguments can be passed and should match the method's signature.
   * **Note:** Deferred calls are processed at idle time. Idle time happens mainly at the end of process and physics frames. In it, deferred calls will be run until there are none left, which means you can defer calls from other deferred calls and they'll still be run in the current idle time cycle. This means you should not call a method deferred from itself (or from a method called by it), as this causes infinite recursion the same way as if you had called the method directly.
   * See also {@link Object.call_deferred}.
   */
  call_deferred(...args: any[]): void;
  /**
   * Calls the method represented by this {@link Callable}. Unlike {@link call}, this method expects all arguments to be contained inside the `arguments` {@link Array}.
   */
  callv(args: Array<any>): unknown;
  /**
   * Returns the total number of arguments this {@link Callable} should take, including optional arguments. This means that any arguments bound with {@link bind} are *subtracted* from the result, and any arguments unbound with {@link unbind} are *added* to the result.
   */
  get_argument_count(): int;
  /**
   * Returns the array of arguments bound via successive {@link bind} or {@link unbind} calls. These arguments will be added *after* the arguments passed to the call, from which {@link get_unbound_arguments_count} arguments on the right have been previously excluded.
   */
  get_bound_arguments(): Array<unknown>;
  /**
   * Returns the total amount of arguments bound via successive {@link bind} or {@link unbind} calls. This is the same as the size of the array returned by {@link get_bound_arguments}. See {@link get_bound_arguments} for details.
   * **Note:** The {@link get_bound_arguments_count} and {@link get_unbound_arguments_count} methods can both return positive values.
   */
  get_bound_arguments_count(): int;
  /**
   * Returns the name of the method represented by this {@link Callable}. If the callable is a GDScript lambda function, returns the function's name or `"<anonymous lambda>"`.
   */
  get_method(): string;
  /** Returns the object on which this {@link Callable} is called. */
  get_object(): GodotObject;
  /** Returns the ID of this {@link Callable}'s object (see {@link Object.get_instance_id}). */
  get_object_id(): int;
  /**
   * Returns the total amount of arguments unbound via successive {@link bind} or {@link unbind} calls. See {@link get_bound_arguments} for details.
   * **Note:** The {@link get_bound_arguments_count} and {@link get_unbound_arguments_count} methods can both return positive values.
   */
  get_unbound_arguments_count(): int;
  /**
   * Returns the 32-bit hash value of this {@link Callable}'s object.
   * **Note:** {@link Callable}s with equal content will always produce identical hash values. However, the reverse is not true. Returning identical hash values does *not* imply the callables are equal, because different callables can have identical hash values due to hash collisions. The engine uses a 32-bit hash algorithm for {@link hash}.
   */
  hash(): int;
  /**
   * Returns `true` if this {@link Callable} is a custom callable. Custom callables are used:
   * - for binding/unbinding arguments (see {@link bind} and {@link unbind});
   * - for representing methods of built-in {@link Variant} types (see {@link create});
   * - for representing global, lambda, and RPC functions in GDScript;
   * - for other purposes in the core, GDExtension, and C#.
   */
  is_custom(): boolean;
  /**
   * Returns `true` if this {@link Callable} has no target to call the method on. Equivalent to `callable == Callable()`.
   * **Note:** This is *not* the same as `not is_valid()` and using `not is_null()` will *not* guarantee that this callable can be called. Use {@link is_valid} instead.
   */
  is_null(): boolean;
  /**
   * Returns `true` if this {@link Callable} is a standard callable. This method is the opposite of {@link is_custom}. Returns `false` if this callable is a lambda function.
   */
  is_standard(): boolean;
  /**
   * Returns `true` if the callable's object exists and has a valid method name assigned, or is a custom callable.
   */
  is_valid(): boolean;
  /**
   * Perform an RPC (Remote Procedure Call) on all connected peers. This is used for multiplayer and is normally not available, unless the function being called has been marked as *RPC* (using  or {@link Node.rpc_config}). Calling this method on unsupported functions will result in an error. See {@link Node.rpc}.
   */
  rpc(...args: any[]): void;
  /**
   * Perform an RPC (Remote Procedure Call) on a specific peer ID (see multiplayer documentation for reference). This is used for multiplayer and is normally not available unless the function being called has been marked as *RPC* (using  or {@link Node.rpc_config}). Calling this method on unsupported functions will result in an error. See {@link Node.rpc_id}.
   */
  rpc_id(peer_id: int, ...args: any[]): void;
  /**
   * Returns a copy of this {@link Callable} with a number of arguments unbound. In other words, when the new callable is called the last few arguments supplied by the user are ignored, according to `argcount`. The remaining arguments are passed to the callable. This allows to use the original callable in a context that attempts to pass more arguments than this callable can handle, e.g. a signal with a fixed number of arguments. See also {@link bind}.
   * **Note:** When this method is chained with other similar methods, the order in which the argument list is modified is read from right to left.
   */
  unbind(argcount: int): Callable;

  // Operator overloads
  [__ops_ne]: { right: Callable; ret: boolean };
  [__ops_eq]: { right: Callable; ret: boolean };

  [__variant_converts]: Callable;
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
