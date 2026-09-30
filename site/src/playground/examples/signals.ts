// Signals are fields; tuple labels become the argument names.
export class Health extends Node {
  health_changed = gd.signal<[old_value: int, new_value: int]>();
  died = gd.signal();

  health: int = 100;

  take_damage(amount: int) {
    let old_value = this.health;
    this.health -= amount;
    this.health_changed.emit(old_value, this.health);
    if (this.health <= 0) {
      this.died.emit();
    }
  }
}
