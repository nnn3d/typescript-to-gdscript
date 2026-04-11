export class MyClass extends Node {
  // Method with no return
  say_hello() {
    print("Hello!");
  }

  // Method with parameters and return type
  add(a: int, b: int): int {
    return a + b;
  }

  // Method with default parameters
  greet(name: string = "World") {
    print("Hello " + name);
  }

  // Static method
  static create_instance(): MyClass {
    return new MyClass();
  }

  // Void return
  do_nothing(): void {
  }

  // Var as function
  var_func = (value: string): MyClass => {
    // Anonymous function
    let inner_func = (another_value: string) => {
      let result = another_value + '.';
      return result;
    }

    // Anonymous empty function
    let inner_func_empty = (another_value: string) => {
    }

    return this;
  }

  // Variadic functions
  varargs(...args: any[]) {
  }

  varargs_typed(a: int, ...rest: Array<unknown>) {
  }

  call(fn: () => void) {
    fn();
    fn.call_deferred();
    fn.callv();
    this.var_func('');
    this.var_func.call('');
    this.say_hello();

    let var_say_hello = this.say_hello;
    var_say_hello();
  }

  optional_args(a: int, b: int = 0, c?: string, d?: Node, e?: Vector2, f?: Node, g: Vector2 = Vector2.DOWN, h?: int) {
  }

  optional_args2(a: null | Node, b: string | null = null, c: Node | null = null, d: Node | Node2D | null = null, e: null | Node2D = null) {
  }
}
