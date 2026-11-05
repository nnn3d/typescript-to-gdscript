export class GdMatchDo extends Node {
  n: int = 0;

  value(): int {
    return 1;
  }

  expression_body(v: int) {
    gd.match(v, [
      { match: 1, do: () => print('one') },
      { match: 2, do: () => (this.n = 2) },
      { match: 3, do: () => this.value() },
      { match: 4, do: (() => print('four')) as () => void },
      { matchMany: [5, 6], do: () => print('many') },
      (x: any) => ({ match: x, when: x > 10, do: () => print(x) }),
    ]);
  }

  guard_without_binding(v: int) {
    gd.match(v, [
      { match: 1, when: this.n > 0, do: () => print('guarded') },
      { matchMany: [2, 3], when: this.n > 0, do: () => print('many guarded') },
    ]);
  }

  nested(v: int, w: int) {
    gd.match(v, [
      {
        match: 1,
        do: () => gd.match(w, [{ match: 2, do: () => print('two') }]),
      },
    ]);
  }
}
