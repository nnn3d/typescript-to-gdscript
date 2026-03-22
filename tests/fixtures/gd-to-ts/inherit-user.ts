export class __CLASS__ extends EnemyBase {
  velocity_target = -100;
  toggle = true;

  _physics_process(delta) {
    if (this.dead) {
      return;
    }
    if (this.is_on_wall()) {
      if (this.direction === 1) {
        this.direction = -1;
      } else {
        this.direction = 1;
      }
      this.basic_flip();
    }
    this.velocity.y = move_toward(this.velocity.y, this.velocity_target, 100 * delta);
    this.manage_animation();
    if (!this.dead) {
      this.move_and_slide();
    }
  }

  manage_animation() {
    this.sprite.play("flying");
  }

  _ready() {
    this.hp = 3;
    this.direction = 1;
    this.basic_on_ready();
  }
}
