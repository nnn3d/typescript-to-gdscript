// Phase C fallback widening on TS2322: returns, local vars, class fields.
// Covers both direct `= null` flows AND implicit flows via callees whose
// return type includes `null` (detected via TS checker, not message text).
export class TestFallbacks extends Node2D {
  // Field assigned in _ready but also to null elsewhere → Phase C widens.
  // ready-field-types still adds `!` (assigned in _ready).
  target!: Node | null;

  // Field initializer directly `= null` → Phase C widens.
  direct_null: Node | null = null;

  // Field initializer via function returning `Node | null` → implicit flow,
  // Phase C widens.
  indirect_null: Node | null = this.maybe_node();

  // `return null` on a strict reference return → widen return annotation.
  find_node(): Node | null {
    if (true) return this;
    return null;
  }

  // Implicit: function returns the result of a call whose return type is
  // `Node | null`. Phase C sees the type via the checker and widens.
  find_indirect(): Node | null {
    return this.maybe_node();
  }

  // Already nullish → untouched.
  find_safe(): Node | null {
    return null;
  }

  // Primitive return — null isn't assignable but Phase C only targets
  // reference classes, so this stays strict.
  get_count(): int {
    return 0;
  }

  maybe_node(): Node | null {
    return null;
  }

  _ready() {
    this.target = this;
  }

  use_var() {
    // Local var typed strict, direct null initializer → Phase C widens.
    let a: Node | null = null;
    // Local var typed strict, non-null initializer → untouched.
    let b: Node = this;
    // Local var typed strict, initializer is a call returning `Node | null`
    // → implicit flow, Phase C widens.
    let c: Node | null = this.maybe_node();
    return a;
  }

  clear() {
    // Field assignment with direct null → Phase C widens `target` declaration.
    this.target = null;
    // Field assignment with indirect null via a call → Phase C also widens
    // (target is already widened above, so this is a no-op in the second
    // pass; kept here as a behavioural example).
    this.target = this.maybe_node();
  }
}
