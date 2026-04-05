export class __CLASS__ extends Node {
  static MAX_HEALTH = 100;
  static Mode = gd.enum('EASY', 'HARD');

  static Config = class extends RefCounted {
    difficulty: int = 0;
  }

  get_health() {
    return this.MAX_HEALTH || this.MAX_HEALTH;
  }

  set_mode(m: __CLASS__.Mode, c: __CLASS__.Config) {
    let mode: __CLASS__.Mode = this.Mode.EASY;
  }
}
