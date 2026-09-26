// Implicit-null returns (addon mode). A GDScript function yields `null` on
// a path that ends in a bare `return` or falls off the end; the converted
// TS leaves those paths as they are and TypeScript would type them
// `undefined`. The helper writes the return type with `null` in its place.
export class ImplicitNull extends Node {
  target: Node | null = null;
  mode: ImplicitNull.Mode = ImplicitNull.Mode.A;

  // Bare `return` on one path, a value on another.
  bare_return(flag: boolean): number | null {
    if (flag) {
      return;
    }
    return 1;
  }

  // Falls off the end when `flag` is false.
  fall_through(flag: boolean): number | null {
    if (flag) {
      return 1;
    }
  }

  // Literals widen to what a person would write.
  flag_or_nothing(flag: boolean): boolean | null {
    if (flag) {
      return true;
    }
  }

  enum_or_nothing(flag: boolean): ImplicitNull.Mode | null {
    if (flag) {
      return ImplicitNull.Mode.B;
    }
  }

  // Already nullable: `null` is not added twice.
  target_or_nothing(flag: boolean): Node | null {
    if (flag) {
      return this.target;
    }
  }

  // A coroutine's awaited value gets the same treatment.
  async coroutine(flag: boolean): Promise<number | null> {
    await this.get_tree().process_frame;
    if (flag) {
      return 1;
    }
  }

  // Lambdas are functions too.
  make_lambda() {
    return (x: int): number | null => {
      if (x > 0) {
        return x;
      }
    };
  }

  // Left alone: no value on any path — TypeScript infers `void`.
  early_exit_only(flag: boolean) {
    if (flag) {
      return;
    }
    print("x");
  }

  // Left alone: every path returns a value, `null` included.
  explicit_null(flag: boolean) {
    if (flag) {
      return 1;
    }
    return null;
  }

  // Left alone: already annotated.
  annotated(flag: boolean): int {
    if (flag) {
      return 1;
    }
    return 0;
  }

  // Left alone: this `undefined` is real — the returned value can be it.
  real_undefined(flag: boolean, value?: int) {
    if (flag) {
      return value;
    }
    return 0;
  }
}

export namespace ImplicitNull {
  export enum Mode { A, B }
}
