class Expressions extends Node {
  test_expressions() {
    var arr = [1, 2, 3];
    var dict = {"key": "value", "num": 42};
    var sn = StringName('my_name');
    var np = NodePath('path/to/node');
    var result = health > 0 ? 42 : -1;
    var node = gd.as(this.getNode("Label"), Label);
    var child = this.getNode("Path/To/Node");
  }
}
