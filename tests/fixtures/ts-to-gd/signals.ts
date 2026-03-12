class MyClass extends Node {
  health_changed = gd.signal<[int, int]>();
  game_over = gd.signal();

  health: int = 100;

  take_damage(amount: int) {
    var old_health: int = this.health;
    this.health -= amount;
    this.health_changed.emit(old_health, this.health);
    if (this.health <= 0) {
      this.game_over.emit();
    }
  }

  _ready() {
    this.health_changed.connect(this._on_health_changed);
  }

  _on_health_changed(old_value: int, new_value: int) {
    print("Health changed from " + str(old_value) + " to " + str(new_value));
  }
}
