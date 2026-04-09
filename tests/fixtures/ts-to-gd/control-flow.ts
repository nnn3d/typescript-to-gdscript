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
        break;
      case 2:
        print('two');
        break;
      case 3:
        print('three');
        break;
      default:
        print('other');
        break;
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

  test_is(x) {
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
