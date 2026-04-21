// Multiple same-name `namespace Foo { ... }` blocks — TypeScript
// merges them natively via declaration merging, and the converter
// treats them as a single namespace whose members all lift into the
// paired `class Foo`.

export namespace Merged {
  export const FIRST = 1;
  export enum Color { RED, BLUE }
}

// A second `namespace Merged { ... }` block: its members should also
// lift into `class Merged`.
export namespace Merged {
  export const SECOND = 2;
  export class Inner {
    value: int = 0;
  }
}

// A third pass — mixing another nested class + namespace. The nested
// `Inner` namespace merges with the one above would, if there were
// one; here it's only seen once.
export namespace Merged {
  export namespace Inner {
    export const TAG = "inner";
  }
}

export class Merged extends Node {
  first: int = Merged.FIRST;
  second: int = Merged.SECOND;
  color: Merged.Color = Merged.Color.RED;

  pick() {
    return this.FIRST + this.SECOND;
  }
}
