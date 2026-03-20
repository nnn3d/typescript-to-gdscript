export default class MyClass extends Node {
  test_dict() {
    let key1 = "key";
    let key2 = Vector2.DOWN;
    let key3 = new Node2D();
    let dict = gd.dict([
      [key1, "value"],
      [key2, "value"],
      [key3, "value"],
      ["key", "value"],
    ]);
    let dict2 = gd.dict([
      [key1, "value"],
      ["key2", "value"],
    ]);
  }
}
