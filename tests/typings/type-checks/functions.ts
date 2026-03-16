// Tests for Function / Callable — Function maps to GDScript Callable

class FunctionTest extends Node {
  test_gdscript_callable_methods() {
    let fn = () => {};

    // GDScript Callable methods work
    let bound: Callable = fn.bind();
    let bound_v: Callable = fn.bindv([]);
    let result: unknown = fn.call();
    fn.call_deferred();
    let result_v: unknown = fn.callv([]);
    let arg_count: int = fn.get_argument_count();
    let bound_args: Array<unknown> = fn.get_bound_arguments();
    let bound_count: int = fn.get_bound_arguments_count();
    let method: string = fn.get_method();
    let obj: GodotObject = fn.get_object();
    let obj_id: int = fn.get_object_id();
    let unbound_count: int = fn.get_unbound_arguments_count();
    let h: int = fn.hash();
    let custom: boolean = fn.is_custom();
    let is_null: boolean = fn.is_null();
    let standard: boolean = fn.is_standard();
    let valid: boolean = fn.is_valid();
    fn.rpc();
    fn.rpc_id(1);
    let unbound: Callable = fn.unbind(1);
  }

  generic_args() {
    const fn = (arg1: string, arg2: int) => {};

    // Typed call — checks argument types
    fn.call('', 0);
    // @ts-expect-error — wrong arguments
    fn.call()

    // bind: 1 arg from end — removes last param, checks bound arg type
    fn.bind(0).call('');
    // @ts-expect-error — bind(0) returns (string) => void, not () => void
    fn.bind(0).call();

    // bind: 2 args from end — removes all params
    fn.bind('', 0).call();

    // bind: 0 args — returns same type
    let same: (arg1: string, arg2: int) => void = fn.bind();

    // bind: chained — bind 1, then bind 1 more
    fn.bind(0).bind('').call();
  }

  test_bind_overloads() {
    // 3-arg bind
    let fn3 = (a: string, b: int, c: boolean) => {};
    fn3.bind(true).call('', 0);
    fn3.bind(0, true).call('');
    fn3.bind('', 0, true).call();

    // 4-arg bind
    let fn4 = (a: string, b: int, c: boolean, d: float) => {};
    fn4.bind(1.0).call('', 0, true);
    fn4.bind('', 0, true, 1.0).call();

    // 5-arg bind
    let fn5 = (a: string, b: int, c: boolean, d: float, e: string) => {};
    fn5.bind('e').call('', 0, true, 1.0);
    fn5.bind('', 0, true, 1.0, 'e').call();

    // 6+ args — fallback to untyped Callable
    let fn6 = (a: string, b: int, c: boolean, d: float, e: string, f: int) => {};
    let fallback: Callable = fn6.bind('', 0, true, 1.0, 'e', 0);
  }

  test_no_js_function_methods() {
    let fn = () => {};

    // @ts-expect-error — no JS apply
    fn.apply(null, []);

    // @ts-expect-error — no JS length (use get_argument_count)
    fn.length;

    // @ts-expect-error — no JS name
    fn.name;

    // @ts-expect-error — no JS toString (use get_method)
    fn.toString();

    // @ts-expect-error — no JS prototype
    fn.prototype;

    // @ts-expect-error — no JS arguments
    fn.arguments;

    // @ts-expect-error — no JS caller
    fn.caller;
  }

  test_function_as_callable() {
    // Function and Callable are interchangeable
    let fn = () => {};
    let c: Callable = fn;
    let fn2 = c;

    // Lambda assigned to Callable
    let cb: Callable = () => {};
    cb.call();
    cb.is_valid();

    // Method reference as Callable
    let method_ref: Callable = this.test_function_as_callable;
    method_ref.get_method();
  }

  test_callable_constructor() {
    // new Callable() creates an empty callable
    let c = new Callable();
    let is_null: boolean = c.is_null();
    let valid: boolean = c.is_valid();

    // Callable.create() factory
    let created: Callable = Callable.create(this, "some_method");
    let method: string = created.get_method();
  }

  test_callable_in_gdscript_apis() {
    // Array methods accept typed functions
    let arr: Array<int> = [];
    let filtered: Array<int> = arr.filter((x: int) => x > 0);
    let mapped: Array<int> = arr.map((x: int) => x * 2);
    let reduced: int = arr.reduce((acc: int, x: int) => acc + x);
    arr.sort_custom((a: int, b: int) => a < b);

    // map can change element type
    let bools: Array<boolean> = arr.map((x: int) => x > 0);

    // reduce with different accumulator type
    let sum: float = arr.reduce((acc: float, x: int) => acc + x, 0.0);
  }
}
