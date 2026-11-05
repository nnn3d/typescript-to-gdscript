// Every `gd.match` case either goes out whole or is reported: a branch that
// vanishes, or keeps only part of itself, matches differently with nothing to see.
export class GdMatchCases extends RefCounted {
  handler(): void {}

  not_an_array(v: any, cases: any) {
    gd.match(v, cases);
    gd.match(v);
  }

  not_a_case(v: any, one: any, rest: any[]) {
    gd.match(v, [
      one,
      ...rest,
      (x: any) => {
        return { match: x, do: () => {} };
      },
    ]);
  }

  members(v: any, match: any, common: any) {
    gd.match(v, [
      { match, do: () => {} },
      { ...common, match: 1, do: () => {} },
      { match: 2, note: 'x', do: () => {} },
    ]);
  }

  patterns(v: any, list: any[]) {
    gd.match(v, [
      { do: () => {} },
      { matchMany: list, do: () => {} },
      { match: 1, matchMany: [2], do: () => {} },
    ]);
  }

  bodies(v: any, callback: () => void) {
    gd.match(v, [
      { match: 1 },
      { match: 2, do: callback },
      { match: 3, do: this.handler },
      { match: 4, do: function () {} },
      (x: any) => ({ match: x, do: callback }),
    ]);
  }
}
