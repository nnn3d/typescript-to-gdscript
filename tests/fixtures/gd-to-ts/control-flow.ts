export class ControlFlow extends Node {
  test_if() {
    if (health > 50) {
      print("healthy");
    } else if (health > 20) {
      print("wounded");
    } else {
      print("critical");
    }
  }

  test_for() {
    for (let i of range(10)) {
      print(i);
    }
  }

  test_while() {
    let count: int = 0;
    while (count < 10) {
      count += 1;
    }
  }

  test_match() {
    let value: int = 42;
    gd.match(value, [
      {
        match: 1,
        do: () => {
          print("one");
        },
      },
      {
        match: 2,
        do: () => {
          print("two");
        },
      },
      {
        match: undefined,
        do: () => {
          print("other");
        },
      },
    ]);
  }

  test_break_continue() {
    for (let i of range(10)) {
      if (i === 5) {
        break;
      }
      if (i === 3) {
        continue;
      }
      print(i);
    }
  }

  test_is(x) {
    if (x instanceof Node2D) {
      print(x, "is Node2D");
    }
    if (!(x instanceof Node2D)) {
      print(x, "is not Node2D");
    }
  }
}
