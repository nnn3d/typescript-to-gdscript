export class Expressions extends Node {
  test_expressions() {
    let arr = [1, 2, 3];
    let dict = {"key": "value", "num": 42};
    let sn = StringName('my_name');
    let np = NodePath('path/to/node');
    let result = health > 0 ? 42 : -1;
    let node = gd.as(this.get_node("Label"), Label);
    let child = this.get_node("Path/To/Node");
    let unique = this.get_node("%UniqueNode");
    let unique2 = this.get_node("%UniqueNode");
  }
}
