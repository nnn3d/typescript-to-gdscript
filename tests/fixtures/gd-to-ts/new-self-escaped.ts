export class G_Esc extends RefCounted {
  hp: int;

  make(): G_Esc {
    let copy: G_Esc = new G_Esc();
    copy.hp = this.hp;
    return copy;
  }

  clone(): G_Esc {
    return new G_Esc();
  }
}
