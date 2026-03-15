// Tests for Function / Callable — Function maps to GDScript Callable

class FunctionTest extends Node {
  test_gdscript_callable_methods() {
    var fn = () => {};

    // GDScript Callable methods work
    var bound: Callable = fn.bind();
    var bound_v: Callable = fn.bindv([]);
    var result: unknown = fn.call();
    fn.call_deferred();
    var result_v: unknown = fn.callv([]);
    var arg_count: int = fn.get_argument_count();
    var bound_args: Array<unknown> = fn.get_bound_arguments();
    var bound_count: int = fn.get_bound_arguments_count();
    var method: string = fn.get_method();
    var obj: GodotObject = fn.get_object();
    var obj_id: int = fn.get_object_id();
    var unbound_count: int = fn.get_unbound_arguments_count();
    var h: int = fn.hash();
    var custom: boolean = fn.is_custom();
    var is_null: boolean = fn.is_null();
    var standard: boolean = fn.is_standard();
    var valid: boolean = fn.is_valid();
    fn.rpc();
    fn.rpc_id(1);
    var unbound: Callable = fn.unbind(1);
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
    var same: (arg1: string, arg2: int) => void = fn.bind();

    // bind: chained — bind 1, then bind 1 more
    fn.bind(0).bind('').call();
  }

  test_bind_overloads() {
    // 3-arg bind
    var fn3 = (a: string, b: int, c: boolean) => {};
    fn3.bind(true).call('', 0);
    fn3.bind(0, true).call('');
    fn3.bind('', 0, true).call();

    // 4-arg bind
    var fn4 = (a: string, b: int, c: boolean, d: float) => {};
    fn4.bind(1.0).call('', 0, true);
    fn4.bind('', 0, true, 1.0).call();

    // 5-arg bind
    var fn5 = (a: string, b: int, c: boolean, d: float, e: string) => {};
    fn5.bind('e').call('', 0, true, 1.0);
    fn5.bind('', 0, true, 1.0, 'e').call();

    // 6+ args — fallback to untyped Callable
    var fn6 = (a: string, b: int, c: boolean, d: float, e: string, f: int) => {};
    var fallback: Callable = fn6.bind('', 0, true, 1.0, 'e', 0);
  }

  test_no_js_function_methods() {
    var fn = () => {};

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
    var fn = () => {};
    var c: Callable = fn;
    var fn2 = c;

    // Lambda assigned to Callable
    var cb: Callable = () => {};
    cb.call();
    cb.is_valid();

    // Method reference as Callable
    var method_ref: Callable = this.test_function_as_callable;
    method_ref.get_method();
  }

  test_callable_constructor() {
    // new Callable() creates an empty callable
    var c = new Callable();
    var is_null: boolean = c.is_null();
    var valid: boolean = c.is_valid();

    // Callable.create() factory
    var created: Callable = Callable.create(this, "some_method");
    var method: string = created.get_method();
  }

  test_callable_in_gdscript_apis() {
    // Array methods accept typed functions
    var arr: Array<int> = [];
    var filtered: Array<int> = arr.filter((x: int) => x > 0);
    var mapped: Array<int> = arr.map((x: int) => x * 2);
    var reduced: int = arr.reduce((acc: int, x: int) => acc + x);
    arr.sort_custom((a: int, b: int) => a < b);

    // map can change element type
    var bools: Array<boolean> = arr.map((x: int) => x > 0);

    // reduce with different accumulator type
    var sum: float = arr.reduce((acc: float, x: int) => acc + x, 0.0);
  }
}
