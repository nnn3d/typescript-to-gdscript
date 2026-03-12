class MyClass extends Node {
  test_if() {
    var x: int = 5;

    if (x > 10) {
      print("big");
    } else if (x > 0) {
      print("positive");
    } else {
      print("non-positive");
    }
  }

  test_while() {
    var i: int = 0;
    while (i < 10) {
      print(i);
      i += 1;
    }
  }

  test_for() {
    var items = [1, 2, 3, 4, 5];
    for (var item of items) {
      print(item);
    }
  }

  test_match() {
    var value: int = 2;
    switch (value) {
      case 1:
        print("one");
        break;
      case 2:
        print("two");
        break;
      case 3:
        print("three");
        break;
      default:
        print("other");
        break;
    }
  }

  test_break_continue() {
    var i: int = 0;
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
}
