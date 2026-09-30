// A platformer player: run, jump with coyote time and jump buffering,
// variable jump height, and animations driven by a small state enum.
export namespace PlatformerPlayer {
  export enum State {
    IDLE,
    RUN,
    JUMP,
    FALL,
  }

  export const COYOTE_TIME = 0.1;
  export const JUMP_BUFFER_TIME = 0.12;
}

export class PlatformerPlayer extends CharacterBody2D {
  state_changed = gd.signal<[from: int, to: int]>();
  landed = gd.signal();

  @export_group('Movement')
  @exports max_speed: float = 220.0;
  @exports acceleration: float = 1400.0;
  @exports friction: float = 1800.0;

  @export_group('Jump')
  @exports jump_velocity: float = -380.0;
  @export_range(0.0, 1.0) jump_cut: float = 0.45;

  @onready sprite: AnimatedSprite2D | null = gd.as(
    this.get_node('AnimatedSprite2D'),
    AnimatedSprite2D,
  );

  state: PlatformerPlayer.State = PlatformerPlayer.State.IDLE;
  coyote_timer: float = 0.0;
  jump_buffer_timer: float = 0.0;

  _physics_process(delta: float) {
    let was_on_floor = this.is_on_floor();

    this.apply_gravity(delta);
    this.update_timers(delta, was_on_floor);
    this.handle_jump();
    this.handle_run(delta);
    this.move_and_slide();

    if (!was_on_floor && this.is_on_floor()) {
      this.landed.emit();
    }
    this.update_state();
  }

  apply_gravity(delta: float) {
    if (!this.is_on_floor()) {
      // Math on Vector2 goes through `gd.ops`; it emits plain operators.
      this.velocity = gd.ops.add(
        this.velocity,
        gd.ops.mul(this.get_gravity(), delta),
      );
    }
  }

  update_timers(delta: float, was_on_floor: boolean) {
    this.coyote_timer = was_on_floor
      ? PlatformerPlayer.COYOTE_TIME
      : maxf(this.coyote_timer - delta, 0.0);

    if (Input.is_action_just_pressed('jump')) {
      this.jump_buffer_timer = PlatformerPlayer.JUMP_BUFFER_TIME;
    } else {
      this.jump_buffer_timer = maxf(this.jump_buffer_timer - delta, 0.0);
    }
  }

  handle_jump() {
    let can_jump = this.coyote_timer > 0.0;
    if (this.jump_buffer_timer > 0.0 && can_jump) {
      this.velocity.y = this.jump_velocity;
      this.jump_buffer_timer = 0.0;
      this.coyote_timer = 0.0;
    }

    // Releasing the button early cuts the jump short.
    if (Input.is_action_just_released('jump') && this.velocity.y < 0.0) {
      this.velocity.y *= this.jump_cut;
    }
  }

  handle_run(delta: float) {
    let direction = Input.get_axis('move_left', 'move_right');
    if (direction !== 0.0) {
      this.velocity.x = move_toward(
        this.velocity.x,
        direction * this.max_speed,
        this.acceleration * delta,
      );
      if (this.sprite !== null) {
        this.sprite.flip_h = direction < 0.0;
      }
    } else {
      this.velocity.x = move_toward(
        this.velocity.x,
        0.0,
        this.friction * delta,
      );
    }
  }

  update_state() {
    let next = this.state;
    if (this.is_on_floor()) {
      next =
        absf(this.velocity.x) > 1.0
          ? PlatformerPlayer.State.RUN
          : PlatformerPlayer.State.IDLE;
    } else {
      next =
        this.velocity.y < 0.0
          ? PlatformerPlayer.State.JUMP
          : PlatformerPlayer.State.FALL;
    }

    if (next !== this.state) {
      this.state_changed.emit(this.state, next);
      this.state = next;
      this.play_animation();
    }
  }

  play_animation() {
    if (this.sprite === null) {
      return;
    }
    switch (this.state) {
      case PlatformerPlayer.State.IDLE:
        this.sprite.play('idle');
      case PlatformerPlayer.State.RUN:
        this.sprite.play('run');
      case PlatformerPlayer.State.JUMP:
        this.sprite.play('jump');
      case PlatformerPlayer.State.FALL:
        this.sprite.play('fall');
    }
  }
}
