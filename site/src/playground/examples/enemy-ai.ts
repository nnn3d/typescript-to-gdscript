// An enemy with a patrol / chase / attack state machine, a cooldown
// coroutine, and damage handling.
export namespace Enemy {
  export enum State {
    PATROL,
    CHASE,
    ATTACK,
    DEAD,
  }
}

export class Enemy extends CharacterBody2D {
  died = gd.signal();
  health_changed = gd.signal<[health: int, max_health: int]>();

  @exports max_health: int = 30;
  @exports speed: float = 80.0;
  @exports chase_range: float = 200.0;
  @exports attack_range: float = 28.0;
  @exports attack_damage: int = 10;
  @exports attack_cooldown: float = 1.2;
  @exports patrol_points: Vector2[] = [];

  target: Node2D | null = null;
  state: Enemy.State = Enemy.State.PATROL;
  health: int = 0;
  patrol_index: int = 0;
  can_attack: boolean = true;

  _ready() {
    this.health = this.max_health;
    this.target = gd.as(
      this.get_tree().get_first_node_in_group('player'),
      Node2D,
    );
  }

  _physics_process(delta: float) {
    if (this.state === Enemy.State.DEAD) {
      return;
    }
    this.state = this.pick_state();

    switch (this.state) {
      case Enemy.State.PATROL:
        this.patrol();
      case Enemy.State.CHASE:
        this.chase();
      case Enemy.State.ATTACK:
        this.velocity = Vector2.ZERO;
        this.try_attack();
    }
    this.move_and_slide();
  }

  pick_state(): Enemy.State {
    if (this.target === null) {
      return Enemy.State.PATROL;
    }
    let distance = this.global_position.distance_to(
      this.target.global_position,
    );
    if (distance <= this.attack_range) {
      return Enemy.State.ATTACK;
    }
    if (distance <= this.chase_range) {
      return Enemy.State.CHASE;
    }
    return Enemy.State.PATROL;
  }

  patrol() {
    if (this.patrol_points.is_empty()) {
      this.velocity = Vector2.ZERO;
      return;
    }
    let point = this.patrol_points[this.patrol_index];
    if (this.global_position.distance_to(point) < 4.0) {
      this.patrol_index = (this.patrol_index + 1) % this.patrol_points.size();
      return;
    }
    // Math on Vector2 goes through `gd.ops`; it emits plain operators.
    this.velocity = gd.ops.mul(
      this.global_position.direction_to(point),
      this.speed,
    );
  }

  chase() {
    if (this.target !== null) {
      this.velocity = gd.ops.mul(
        this.global_position.direction_to(this.target.global_position),
        this.speed,
      );
    }
  }

  async try_attack(): Promise<void> {
    if (!this.can_attack || this.target === null) {
      return;
    }
    this.can_attack = false;
    if (this.target.has_method('take_damage')) {
      this.target.call('take_damage', this.attack_damage);
    }
    await this.get_tree().create_timer(this.attack_cooldown).timeout;
    this.can_attack = true;
  }

  take_damage(amount: int) {
    if (this.state === Enemy.State.DEAD) {
      return;
    }
    this.health = maxi(this.health - amount, 0);
    this.health_changed.emit(this.health, this.max_health);
    if (this.health === 0) {
      this.die();
    }
  }

  die() {
    this.state = Enemy.State.DEAD;
    this.velocity = Vector2.ZERO;
    this.died.emit();
    this.queue_free();
  }
}
