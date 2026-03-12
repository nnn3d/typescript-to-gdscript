class MyClass extends Node {
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
    var inner_func = (another_value: string) => {
      var result = another_value + '.';
      return result;
    }

    // Anonymous empty function
    var inner_func_empty = (another_value: string) => {
    }

    return this;
  }
}
