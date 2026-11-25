export namespace UnsupportedMembers {
  export class Inner extends RefCounted {
    static {
      print('inner');
    }
  }
}

export class UnsupportedMembers extends Node {
  static count: int = 0;

  // GDScript has `_static_init` for this.
  static {
    UnsupportedMembers.count = 1;
  }

  *values() {
    print('a generator');
  }

  lambda() {
    let f = function* () {};
  }

  // A `var` needs a plain name, so this pair has nowhere to go.
  get 'not a name'(): int {
    return 1;
  }

  // Types only, nothing to emit.
  [key: string]: unknown;
}
