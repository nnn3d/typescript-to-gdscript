// Native TS accessors become a GDScript property with `get`/`set`.
export class Stamina extends Node {
  max_value: float = 100.0;

  get value(): float {
    return this.value;
  }

  set value(next: float) {
    this.value = clampf(next, 0.0, this.max_value);
  }

  // `gd.getset` adds an initial value, or reuses existing methods.
  regen_rate: float = gd.getset({
    value: 5.0,
    get: () => {
      return this.regen_rate;
    },
    set: (next) => {
      this.regen_rate = maxf(next, 0.0);
    },
  });

  _process(delta: float) {
    this.value += this.regen_rate * delta;
  }
}
