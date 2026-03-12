class MyClass extends Node {
  // Variable declarations with types
  speed: float = 10.5;
  health: int = 100;
  name: string = "Player";
  alive: boolean = true;
  position_2d: Vector2 = Vector2(0, 0);

  _ready() {
    // Local variables
    var x: int = 5;
    var y: float = 3.14;
    var greeting: string = "hello";
    var flag: boolean = false;

    // Variable without explicit type (inferred)
    var result = x + y;

    // Null value
    var node: Node = null;
  }
}
