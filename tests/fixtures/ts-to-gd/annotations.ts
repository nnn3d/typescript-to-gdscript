export class MyClass extends Node2D {
  @gd.export
  speed: float = 100.0;

  @gd.export
  jump_height: float = 200.0;

  @gd.onready
  sprite: Sprite2D = null;

  _ready() {
    print("Speed: " + str(this.speed));
  }
}
