// A Dictionary literal holds `key: value` entries and nothing else. Every other
// object literal member is rejected: dropping it would ship a smaller Dictionary.
export class ObjectLiteralMembers extends RefCounted {
  spread(a: { x: int }) {
    return { ...a, y: 1 };
  }

  spread_only(a: { x: int }) {
    return { ...a };
  }

  method() {
    return {
      m() {
        return 1;
      },
      y: 1,
    };
  }

  getter() {
    return {
      get g() {
        return 1;
      },
      y: 1,
    };
  }

  setter() {
    return {
      set s(v: int) {},
      y: 1,
    };
  }

  nested(a: { x: int }) {
    return { inner: { ...a } };
  }

  pattern_shorthand(v: any, name: any) {
    gd.match(v, [
      {
        match: { name, hp: 1 },
        do: () => {
          print(1);
        },
      },
    ]);
  }

  pattern_method(v: any) {
    gd.match(v, [
      {
        match: {
          m() {
            return 1;
          },
          hp: 1,
        },
        do: () => {
          print(1);
        },
      },
    ]);
  }
}
