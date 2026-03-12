class Variables extends Node {
  health: int = 100;
  speed: float = 10.5;
  name: string = "Player";
  alive: boolean = true;
  position_2d: Vector2 = Vector2(0, 0);
  static count: int = 0;
  inferred = 42;

  _ready() {
    var x: int = 5;
    var y: float = 3.14;
    var greeting: string = "hello";
    var local_inferred = true;
  }
}
