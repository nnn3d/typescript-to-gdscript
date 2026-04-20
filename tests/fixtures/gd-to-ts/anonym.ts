export class _Anonym extends Node {
  static MAX_HEALTH = 100;
  static Mode = gd.enum('EASY', 'HARD');

  static Config = class extends RefCounted {
    difficulty: int = 0;
  }

  get_health() {
    return bool(this.MAX_HEALTH || this.MAX_HEALTH);
  }

  set_mode(m: _Anonym.Mode, c: _Anonym.Config) {
    let mode: _Anonym.Mode = this.Mode.EASY;
  }
}
