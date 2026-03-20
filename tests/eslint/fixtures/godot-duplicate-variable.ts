export default class ValidGodot extends Node {
  health: int = 100;

  static health: int = 100;

  _ready() {
    this.health = 50;
  }
}
