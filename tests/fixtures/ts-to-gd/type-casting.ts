export class MyClass extends Node {
  test_casting() {
    let node: Node = this;
    let sprite = gd.as(node, Sprite2D);
    if (sprite !== null) {
      print("It is a Sprite2D");
    }

    let satisfies = 'string' satisfies string;
  }

  // `as` binds looser than everything but assignment and takes the whole
  // expression to its LEFT as the value, so it is bare only in a slot
  // delimited on both sides. As a receiver, `node as Sprite2D.texture`
  // reads `Sprite2D.texture` as a type path; as a right-hand operand,
  // `count / total as float` casts the quotient (0.0, not 0.5).
  test_as_grouping(node: Node, count: int, total: int, c: boolean, w: float, v: float, packed: PackedInt32Array) {
    let texture = gd.as(node, Sprite2D)!.texture;
    let rect = gd.as(node, Sprite2D)!.get_rect();
    let first = gd.as(packed, Array)[0];
    let ratio = count / gd.as(total, float);
    let pick = c ? w : gd.as(v, int);
    let same = gd.as(node, Sprite2D) === null;
  }

  // Delimited on both sides — the cast stays bare.
  test_as_bare(node: Node, path: NodePath) {
    let sprite = gd.as(node, Sprite2D);
    let text = gd.as(path, String);
    print(gd.as(node, Sprite2D));
    let list = [gd.as(node, Sprite2D)];
  }

  // `is` binds tighter than everything but `.`, `[]` and `()`, so it
  // stays bare as an operand — only its VALUE needs grouping when that
  // is itself infix, or the `is` binds to the last piece of it.
  test_is_grouping(value: unknown, c: boolean, a: int, b: float) {
    if (gd.is(value, int) && c) {
      print("int");
    }
    let flipped = !gd.is(value, int);
    let picked = gd.is(c ? a : b, float);
    // `!` goes out as `not` and a template as a `+` chain — both bind
    // looser than `is`, which would otherwise test only their last piece.
    let negated = gd.is(!c, bool);
    let text = gd.is(`a = ${a}`, String);
    // `-`, `+` and `~` bind looser than `is` as well.
    let negative = gd.is(-a, int);
    // A lambda's body runs to the end of the line, so a bare one would
    // swallow the operator after it.
    let wrapped = gd.as(() => a, Callable);
  }
}
