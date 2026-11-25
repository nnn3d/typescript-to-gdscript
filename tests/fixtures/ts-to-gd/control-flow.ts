export class MyClass extends Node {
  test_if() {
    let x: int = 5;

    if (x > 10) {
      print('big');
    } else if (x > 0) {
      print('positive');
    } else {
      print('non-positive');
    }
  }

  test_while() {
    let i: int = 0;
    while (i < 10) {
      print(i);
      i += 1;
    }
  }

  test_for() {
    let items = [1, 2, 3, 4, 5];
    for (let item of items) {
      print(item);
    }
  }

  test_match() {
    let value: int = 2;
    switch (value) {
      case 1:
        print('one');
      case 2:
        print('two');
      case 3:
        print('three');
      default:
        print('other');
    }
  }

  test_break_continue() {
    let i: int = 0;
    while (i < 20) {
      i += 1;
      if (i === 5) {
        continue;
      }
      if (i === 15) {
        break;
      }
      print(i);
    }
  }

  // The `while` a C-style `for` becomes has its step at the end of the body,
  // so a `continue` runs the step itself before it jumps past it.
  test_for_step() {
    for (let i: int = 0; i < 10; i++) {
      if (i === 5) {
        continue;
      }
      switch (i) {
        case 1:
          continue;
        default:
          print(i);
      }
    }
  }

  // Each `continue` takes the step of its own loop, and only that.
  test_for_step_nested(items: int[]) {
    for (let j: int = 0; j < 3; j += 1) {
      for (let item of items) {
        if (item === j) continue;
        print(item);
      }
      for (let k: int = 3; k > 0; k--) {
        if (k === j) continue;
        print(k);
      }
      let n: int = 0;
      while (n < 3) {
        n += 1;
        if (n === j) continue;
        print(n);
      }
      if (j === 1) continue;
      print(j);
    }
    let m: int = 0;
    for (; m < 3; ) {
      m += 1;
      if (m === 1) continue;
      print(m);
    }
  }

  test_is(x: unknown) {
    if (x instanceof Node2D) {
      print(x, 'is Node2D');
    }
    if (!(x instanceof Node2D)) {
      print(x, 'is not Node2D');
    }
    if (gd.is(x, int)) {
      print(x, 'is int');
    }
    if (!gd.is(x, float)) {
      print(x, 'is not float');
    }
  }
}
