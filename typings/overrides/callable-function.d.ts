/**
 * Override: CallableFunction — typed overloads for concrete function types.
 *
 * TS uses CallableFunction for lambda/arrow types and concrete function references.
 * These overloads provide type-safe call/bind with `this` parameter inference.
 *
 * GDScript bind() appends arguments to the END of the parameter list,
 * so bind(lastArg) on (a, b, c) => R returns (a, b) => R.
 */
interface CallableFunction extends Function {
  // bind: 0 args — returns same callable
  bind<F>(this: F): F;
  // bind: 1 arg from end
  bind<Init extends any[], L, R>(
    this: (...args: [...Init, L]) => R,
    arg: L,
  ): (...args: Init) => R;
  // bind: 2 args from end
  bind<Init extends any[], L1, L2, R>(
    this: (...args: [...Init, L1, L2]) => R,
    arg1: L1,
    arg2: L2,
  ): (...args: Init) => R;
  // bind: 3 args from end
  bind<Init extends any[], L1, L2, L3, R>(
    this: (...args: [...Init, L1, L2, L3]) => R,
    arg1: L1,
    arg2: L2,
    arg3: L3,
  ): (...args: Init) => R;
  // bind: 4 args from end
  bind<Init extends any[], L1, L2, L3, L4, R>(
    this: (...args: [...Init, L1, L2, L3, L4]) => R,
    arg1: L1,
    arg2: L2,
    arg3: L3,
    arg4: L4,
  ): (...args: Init) => R;
  // bind: 5 args from end
  bind<Init extends any[], L1, L2, L3, L4, L5, R>(
    this: (...args: [...Init, L1, L2, L3, L4, L5]) => R,
    arg1: L1,
    arg2: L2,
    arg3: L3,
    arg4: L4,
    arg5: L5,
  ): (...args: Init) => R;
  // bind: 6+ args — fallback to untyped Callable
  bind(...args: any[]): Callable;

  // bindv: 0 args — returns same callable
  bindv<F>(this: F, args: []): F;
  // bindv: 1 arg from end
  bindv<Init extends any[], L, R>(
    this: (...args: [...Init, L]) => R,
    args: [L],
  ): (...args: Init) => R;
  // bindv: 2 args from end
  bindv<Init extends any[], L1, L2, R>(
    this: (...args: [...Init, L1, L2]) => R,
    args: [L1, L2],
  ): (...args: Init) => R;
  // bindv: 3 args from end
  bindv<Init extends any[], L1, L2, L3, R>(
    this: (...args: [...Init, L1, L2, L3]) => R,
    args: [L1, L2, L3],
  ): (...args: Init) => R;
  // bindv: 4 args from end
  bindv<Init extends any[], L1, L2, L3, L4, R>(
    this: (...args: [...Init, L1, L2, L3, L4]) => R,
    args: [L1, L2, L3, L4],
  ): (...args: Init) => R;
  // bindv: 5 args from end
  bindv<Init extends any[], L1, L2, L3, L4, L5, R>(
    this: (...args: [...Init, L1, L2, L3, L4, L5]) => R,
    args: [L1, L2, L3, L4, L5],
  ): (...args: Init) => R;
  // bindv: 6+ args — fallback to untyped Callable
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
