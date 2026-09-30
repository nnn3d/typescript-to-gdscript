// `T | null` keeps its GDScript type only when T is a reference type: a Node,
// a Resource or a user class can hold null in GDScript. An int, a String, a
// Vector2, a typed array or an enum can't, so the annotation is dropped.
export namespace NullableTypes {
  export enum Mode {
    IDLE,
    BUSY,
  }
}

export class NullableTypes extends Node {
  count: int | null = null;
  label: string | null = null;
  offset: Vector2 | null = null;
  scores: int[] | null = null;
  key: Key | null = null;
  mode: NullableTypes.Mode | null = null;
  target: Node2D | null = null;

  pick(amount: int | null, node: Node | null): int | null {
    if (node === null) {
      return amount;
    }
    return 0;
  }

  find_target(): Node2D | null {
    return this.target;
  }
}
