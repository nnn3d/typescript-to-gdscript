export class NewSelf extends RefCounted {
  hp: int;

  constructor(hp: int = 0) {
    this.hp = hp;
  }

  clone(): NewSelf {
    let copy = new NewSelf();
    copy.hp = this.hp;
    return copy;
  }

  spawn_other(): Node2D {
    return new Node2D();
  }
}
