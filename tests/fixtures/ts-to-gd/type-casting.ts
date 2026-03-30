export class MyClass extends Node {
  test_casting() {
    let node: Node = this;
    let sprite = gd.as(node, Sprite2D);
    if (sprite !== null) {
      print("It is a Sprite2D");
    }

    let satisfies = 'string' satisfies string;
  }
}
