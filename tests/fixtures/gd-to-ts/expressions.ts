export default class Expressions extends Node {
  test_expressions() {
    let arr = [1, 2, 3];
    let dict = {"key": "value", "num": 42};
    let sn = StringName('my_name');
    let np = NodePath('path/to/node');
    let result = health > 0 ? 42 : -1;
    let node = gd.as(this.getNode("Label"), Label);
    let child = this.getNode("Path/To/Node");
  }
}
