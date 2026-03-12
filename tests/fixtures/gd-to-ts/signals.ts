class Signals extends Node {
  health_changed = gd.signal<[int, int]>();
  died = gd.signal();
  score_updated = gd.signal<[float]>();

  take_damage(amount: int) {
    var old_hp: int = health;
    health -= amount;
    this.health_changed.emit(old_hp, health);
    if (health <= 0) {
      this.died.emit();
    }
  }
}
