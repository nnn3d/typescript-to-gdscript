// `gd.as` is GDScript's `as` cast; `instanceof` and `gd.is` become `is`.
export class Picker extends Node {
  pick(node: Node) {
    let sprite = gd.as(node, Sprite2D);
    if (sprite !== null) {
      sprite.modulate = Color.RED;
    }

    if (node instanceof CharacterBody2D) {
      node.velocity = Vector2.ZERO;
    }
  }

  describe(value: unknown): string {
    if (gd.is(value, int)) {
      return 'an int';
    }
    return 'something else';
  }
}
