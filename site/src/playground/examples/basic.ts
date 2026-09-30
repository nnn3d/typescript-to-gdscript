// A script is one exported class; `extends` picks the Godot base class.
export class Player extends CharacterBody2D {
  speed: float = 200.0;

  _physics_process(delta: float) {
    let direction = Input.get_vector('ui_left', 'ui_right', 'ui_up', 'ui_down');
    this.velocity = gd.ops.mul(direction, this.speed);
    this.move_and_slide();
  }
}
