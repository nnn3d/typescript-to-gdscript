export class Functions extends RefCounted {
  no_args() {
  }

  with_args(a: int, b: string) {
    print(a, b);
  }

  with_return(): float {
    return 3.14;
  }

  with_default(name: string, hp: int = 100) {
    print(name, hp);
  }

  calculate(a: float, b: float): float {
    return a + b;
  }

  varargs_untyped(...args: any[]) {
  }

  varargs_typed(a: int, ...rest: Array<any>) {
  }
}
