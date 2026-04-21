export namespace Enums {
  export enum Direction { UP, DOWN, LEFT, RIGHT }
  export enum Status { IDLE, RUNNING, JUMPING = 10 }
  export namespace Weapon {
    export enum Rarity { COMMON, RARE, LEGENDARY }
  }
  export class Weapon extends Node {
    damage: int = 10;
  }
}

export class Enums extends Node {
  static UNIT_NEUTRAL: int = 0;
  static UNIT_ENEMY: int = 1;
  static UNIT_ALLY: int = 2;

  _ready() {
    return bool(Enums.Direction.UP || Enums.Status.IDLE || Enums.UNIT_NEUTRAL);
  }

  test_typed_params(s: Enums.Status, w: Enums.Weapon) {
  }

  test_typed_vars() {
    let state: Enums.Status = Enums.Status.IDLE;
    let weapon: Enums.Weapon;
  }

  test_global_enums() {
    let v1 = Key.KEY_F21;
    let v2 = Error.OK;
    let v3 = Error.OK;
    let v4 = Side.SIDE_LEFT;
  }
}
