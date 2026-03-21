export class Enums extends Node {
  Direction = gd.enum('UP', 'DOWN', 'LEFT', 'RIGHT');
  Status = gd.enum('IDLE', 'RUNNING', ['JUMPING', 10]);
  UNIT_NEUTRAL: int = 0;
  UNIT_ENEMY: int = 1;
  UNIT_ALLY: int = 2;
}
