// Addon-mode behaviour. Phase B widens field/local annotations up-front;
// returns and params still route through Phase C / Phase D. Phase D narrows
// params the same way user mode does.
export class TestAddon extends Node2D {
  // Reference field assigned in _ready → Phase B widens.
  target!: Node | null;
  // Value-type field — Phase B skips, ready-field-types adds `!`.
  pos!: Vector2;
  // Primitive field — Phase B skips, ready-field-types adds `!`.
  count!: int;

  _ready() {
    this.target = this;
  }

  // Function return: Phase B doesn't widen; Phase C only widens when TS2322
  // fires. `return this.target` is now type-checker-visible as `Node | null`
  // (field was widened by Phase B), so TS2322 fires and Phase C widens.
  get_target(): Node | null {
    return this.target;
  }

  // Value-type return — no widening anywhere.
  get_origin(): Vector2 {
    return Vector2(0, 0);
  }

  use_local() {
    // Local var annotations get widened by Phase B (reference types only).
    let n: Node | null = this;
    let v: Vector2 = Vector2(1, 2);
  }

  // Field with reference-type annotation → Phase B widens (addon mode
  // blankets all reference OUT positions; initializer-check doesn't apply).
  anchor: Node | null = this;
  // `typeof` annotations are NOT widened — TypeQueryNode, not TypeReferenceNode.
  shadow!: typeof this.anchor;

  // Phase D narrows addon params same as user mode.
  greet(target: Node): string {
    return target.name;
  }
}
