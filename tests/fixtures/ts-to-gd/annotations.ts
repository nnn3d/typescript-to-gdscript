export class MyClass extends Node2D {
  @exports
  speed: float = 100.0;

  @exports
  jump_height: float = 200.0;

  @onready
  sprite: Sprite2D = null;

  _ready() {
    print("Speed: " + str(this.speed));
  }
}
