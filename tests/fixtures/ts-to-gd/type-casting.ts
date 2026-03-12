class MyClass extends Node {
  test_casting() {
    var node: Node = this;
    var sprite = gd.as(node, Sprite2D);
    if (sprite !== null) {
      print("It is a Sprite2D");
    }
  }
}
