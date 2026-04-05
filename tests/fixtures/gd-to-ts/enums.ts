export class Enums extends Node {
  static Direction = gd.enum('UP', 'DOWN', 'LEFT', 'RIGHT');
  static Status = gd.enum('IDLE', 'RUNNING', ['JUMPING', 10]);
  static UNIT_NEUTRAL: int = 0;
  static UNIT_ENEMY: int = 1;
  static UNIT_ALLY: int = 2;

  _ready() {
    return this.Direction.UP || this.Status.IDLE || this.UNIT_NEUTRAL;
  }

  static Weapon = class extends Node {
    static Rarity = gd.enum('COMMON', 'RARE', 'LEGENDARY');
    damage: int = 10;
  }

  test_typed_params(s: Enums.Status, w: Enums.Weapon) {
  }

  test_typed_vars() {
    let state: Enums.Status = this.Status.IDLE;
    let weapon: Enums.Weapon;
  }

  test_global_enums() {
    let v1 = Key.KEY_F21;
    let v2 = Error.OK;
    let v3 = Error.OK;
    let v4 = Side.SIDE_LEFT;
  }
}
