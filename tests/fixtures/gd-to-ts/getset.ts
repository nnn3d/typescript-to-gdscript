export class GetsetTest extends Node {
  get a(): int {
    return this.a;
  }

  set a(value: int) {
    this.a = value;
  }

  b: int = gd.getset({
    value: 10,
    get: () => {
      return this.b;
    },
    set: (value) => {
      this.b = value;
    },
  });

  c: int = gd.getset({
    get: this.get_c,
    set: this.set_c,
  });

  get d(): int {
    return this.d;
  }

  set d(value: int) {
    this.d = value;
  }

  get e(): int {
    return this.e;
  }

  set e(value: int) {
    this.e = value;
  }

  f: typeof this.e = gd.getset({
    value: this.e,
    get: () => {
      return this.f;
    },
    set: null,
  });

  get_c(): int {
    return 10;
  }

  set_c(v: int) {
  }
}
