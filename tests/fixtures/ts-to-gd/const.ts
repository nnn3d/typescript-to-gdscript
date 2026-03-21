export class ConstClass extends Node {
  readonly MAX_HP = 100;

  static HEALTH = 100;

  get_health() {
    return ConstClass.HEALTH;
  }
}
