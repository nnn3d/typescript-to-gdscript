export class __CLASS__ extends Node {
  test() {
    // ❌ Errors — `in` on value-type primitives
    let v = Vector2(1, 2);
    let a = "x" in v;
    let b = 0 in Color(0, 0, 0);
    let c = "r" in Transform2D();

    // ❌ Error — `in` on an array: TS checks an index or property, GDScript
    // checks for an element, so the meaning would silently change
    let arr: Array<int> = [];
    let d = 1 in arr;
    let list: int[] = [];
    let g = 1 in list;

    // ❌ Error — `in` on PackedColorArray (not allowed)
    let packed: PackedColorArray = PackedColorArray();
    let e = 0 in packed;

    // ✅ OK — `in` on Dictionary-like object literal
    let dict = { a: 1, b: 2 };
    let f = "a" in dict;
  }
}
