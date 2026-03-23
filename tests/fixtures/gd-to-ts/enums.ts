export class Enums extends Node {
  static Direction = gd.enum('UP', 'DOWN', 'LEFT', 'RIGHT');
  static Status = gd.enum('IDLE', 'RUNNING', ['JUMPING', 10]);
  static UNIT_NEUTRAL: int = 0;
  static UNIT_ENEMY: int = 1;
  static UNIT_ALLY: int = 2;

  _ready() {
    return Enums.Direction.UP || Enums.Status.IDLE || Enums.UNIT_NEUTRAL;
  }
}
