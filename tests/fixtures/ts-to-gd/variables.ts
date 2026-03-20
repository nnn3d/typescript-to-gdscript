export default class MyClass extends Node {
  // Variable declarations with types
  speed: float = 10.5;
  health: int = 100;
  name: string = "Player";
  alive: boolean = true;
  position_2d: Vector2 = Vector2(0, 0);

  _ready() {
    // Local variables
    let x: int = 5;
    let y: float = 3.14;
    let greeting: string = "hello";
    let flag: boolean = false;

    // Variable without explicit type (inferred)
    let result = x + y;

    // Null value
    let node: Node = null;
  }
}
