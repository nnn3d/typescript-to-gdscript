export namespace MyClass {
  export const v = 0;
}
@tool
export class MyClass extends Node2D {
  @export_group("group")
  @exports
  speed: float = 100.0;

  @exports
  jump_height: float = 200.0;

  @onready
  sprite: Sprite2D = null;

  _ready() {
    print("Speed: " + str(this.speed));
  }

  test() {
    // @gd.eval: @warning_ignore("integer_division")
    let a = 11 / 2;
  }
}
