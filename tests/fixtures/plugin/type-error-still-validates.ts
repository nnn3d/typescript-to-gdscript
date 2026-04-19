export class __CLASS__ extends Node {
  test() {
    let a: int = 1;
    let b: int = 2;
    // type-error — `||` as non-boolean value (should NOT block Godot validation)
    let x = a || b;
    // Godot-catchable error — missing method on Node (should be reported by Godot)
    this.definitely_not_a_method();
  }
}
