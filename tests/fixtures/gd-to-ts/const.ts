export class ConstClass extends Node {
  static readonly MAX_HP = 100;

  get_health() {
    return ConstClass.MAX_HP;
  }
}
