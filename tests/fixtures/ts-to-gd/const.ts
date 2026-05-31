// Class-level GD `const` comes from the paired namespace block.
// On the class itself, `readonly` is a TS-only contract — it emits
// a regular `var` (or `static var` when combined with `static`).
export namespace ConstClass {
  export const MAX_HP = 100;
}

export class ConstClass extends Node {
  readonly default_speed = 50;
  static HEALTH = 100;

  get_health() {
    return ConstClass.HEALTH;
  }
}
