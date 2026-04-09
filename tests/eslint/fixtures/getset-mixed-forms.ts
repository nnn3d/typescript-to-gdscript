export class __CLASS__ extends Node {
  a: int = gd.getset({
    get: () => {
      return this.a;
    },
    set: this.set_a,
  });

  set_a(v: int) {
  }
}
