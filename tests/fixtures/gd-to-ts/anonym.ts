export namespace _Anonym {
  export enum Mode { EASY, HARD }
  export namespace Config {
    export enum HARD { A, B }
    export namespace Inner {
      export const TYPE = 'inner';
    }
    export class Inner extends RefCounted {
      static VAL = 10;
    }
  }
  export class Config extends RefCounted {
    difficulty: int = 0;
    set_inner(i: Config.Inner) {
      let d = Config.Inner.TYPE;
    }
  }
  export class Second extends RefCounted {
    set_second(i: Config.HARD) {
      let d = Config.Inner.TYPE;
    }
  }
}

export class _Anonym extends Node {
  static MAX_HEALTH = 100;

  get_health() {
    return _Anonym.MAX_HEALTH;
  }

  set_mode(m: _Anonym.Mode, c: _Anonym.Config, i: _Anonym.Config.Inner) {
    let mode: _Anonym.Mode = _Anonym.Mode.EASY;
  }
}
