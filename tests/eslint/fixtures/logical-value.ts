export class __CLASS__ extends Node {
  test() {
    let a: int = 1;
    let b: int = 2;
    let c = { a: () => true, b: () => '' };

    // ❌ Error — || used as non-bool value
    let x = a || b;

    // ❌ Error — || used as non-bool value
    let y = c.a() && c.b() || b;

    let m = {
      a: c.a() || c.b()
    }

    // ✅ OK — boolean context (if condition)
    if (a || b) {}

    // ✅ OK — wrapped in bool()
    let z = bool(a || b);

    // ✅ OK — wrapped in bool()
    let q = bool(b ? a || b && c.a() : a)

    // ✅ OK — result is boolean (comparison)
    let w = a > 0 && b > 0;
  }
}

