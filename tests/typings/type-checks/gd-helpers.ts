// Tests for gd namespace helpers

// ─── gd.signal ──────────────────────────────────────────────

class SignalTest extends Node {
  // Signal with no params
  simple_signal = gd.signal();

  // Signal with typed params
  health_changed = gd.signal<[int, int]>();

  test_signals() {
    // Typed emit
    this.health_changed.emit(10, 20);

    // @ts-expect-error — wrong number of args
    this.health_changed.emit(10);

    // @ts-expect-error — wrong arg type
    this.health_changed.emit('a', 'b');

    // Connect with typed callback
    this.health_changed.connect((old_hp: int, new_hp: int) => {});

    // Simple signal with default type accepts any args (Signal defaults to any[])
    this.simple_signal.emit();
    this.simple_signal.emit(42);
  }
}

// ─── gd.as ──────────────────────────────────────────────────

class AsTest extends Node {
  test_as() {
    let node: Node = this;

    // gd.as returns the type or null
    let sprite = gd.as(node, Sprite2D);
    // Result could be Sprite2D or null
    let check: Sprite2D | null = sprite;

    // When the type is known to match, no null
    let sprite2d: Sprite2D = new Sprite2D();
    let result = gd.as(sprite2d, Sprite2D);
    let exact: Sprite2D = result;
  }

  test_as_variant_converts() {
    // Variant conversion: Vector2 ↔ Vector2i via single-param "from" constructors
    let v2: Vector2 = Vector2(1, 2);
    let v2i: Vector2i = Vector2i(1, 2);

    // Vector2i → Vector2 (Vector2 accepts `from: Vector2i` constructor)
    let asV2: Vector2 = gd.as(v2i, Vector2);

    // Vector2 → Vector2i (Vector2i accepts `from: Vector2` constructor)
    let asV2i: Vector2i = gd.as(v2, Vector2i);

    // Vector2 → Vector2 (identity, since Vector2 accepts Vector2)
    let asSameV2: Vector2 = gd.as(v2, Vector2);

    // Vector3 ↔ Vector3i
    let v3: Vector3 = Vector3(1, 2, 3);
    let v3i: Vector3i = Vector3i(1, 2, 3);
    let asV3: Vector3 = gd.as(v3i, Vector3);
    let asV3i: Vector3i = gd.as(v3, Vector3i);

    // Rect2 ↔ Rect2i
    let r2: Rect2 = Rect2();
    let r2i: Rect2i = Rect2i();
    let asR2: Rect2 = gd.as(r2i, Rect2);

    let ca: PackedColorArray = PackedColorArray();
    let asA: Array<Color> = gd.as(ca, Array);
    // @ts-expect-error — Vector2 can't be converted to Array
    let asError: Array<unknown> = gd.as(v2, Array);

    let ar: Array<unknown> = [];
    let asCA: PackedColorArray = gd.as(ar, PackedColorArray);

    // @ts-expect-error — Vector3 can't be converted to Vector2 (no `from: Vector3` constructor)
    let bad: Vector2 = gd.as(v3, Vector2);

    // @ts-expect-error — a plain Node can't be converted to Vector2
    let bad2: Vector2 = gd.as(node, Vector2);
  }

  test_instanceof_value_types() {
    // `instanceof` works on value-type constructor interfaces via `prototype` property
    let v: Vector2 | Vector2i = Vector2(1, 2);

    if (v instanceof Vector2) {
      // Narrowed to Vector2
      let x: Vector2 = v;
    } else {
      // Narrowed to Vector2i
      let y: Vector2i = v;
    }

    let color: Color | Vector2 = Color();
    if (color instanceof Color) {
      let c: Color = color;
    }

    let arr: Array<unknown> | Vector2 = Array();
    if (arr instanceof Array) {
      let a: Array<unknown> = arr;
    }
  }
}

// ─── gd.ops ─────────────────────────────────────────────────

class OpsTest extends Node {
  test_ops() {
    let v1 = Vector2();
    let v2 = Vector2();

    // gd.ops infers result from operator overloads
    let v3: Vector2 = gd.ops.add(v1, v2);
    let v4: Vector2 = gd.ops.sub(v1, v2);
    let v5: Vector2 = gd.ops.mul(v1, v2);
    let v6: Vector2 = gd.ops.div(v1, v2);

    // Mixed-type: Vector2 * float -> Vector2
    let v7: Vector2 = gd.ops.mul(v1, 2.0);
    let v8: Vector2 = gd.ops.mul(2.0, v1);
    let v9: float = gd.ops.mul(2.0, 1);

    // Arrays
    let v10: Array<string> = gd.ops.add([''], ['']);
    let v11: Array<string | number> = gd.ops.add([''], ['', 2]);
    let v12: Array<string | number | Vector2> = gd.ops.add(['', v1], ['', 3]);

    // @ts-expect-error — can't multiply Vector2 and Vector3
    gd.ops.mul(Vector2(), Vector3());

    // Comparison operators
    let eq: boolean = gd.ops.eq(v1, v2);
    let ne: boolean = gd.ops.ne(v1, v2);
    let gt: boolean = gd.ops.gt(v1, v2);
    let lt: boolean = gd.ops.lt(v1, v2);

    // Unary operators
    let neg: Vector2 = gd.ops.minus(v1);
    let pos: Vector2 = gd.ops.plus(v1);
  }
}

// ─── global decorators ──────────────────────────────────────

class DecoratorTest extends Node {
  @exports
  speed: float = 100.0;

  @onready
  sprite: Sprite2D = null!;

  @export_category('Movement')
  @exports
  max_speed: float = 200.0;
}

// ─── StringName / NodePath ──────────────────────────────────

class StringNameTest extends Node {
  test_string_helpers() {
    let sn: string = StringName('my_name');
    let np: NodePath = NodePath('Path/To/Node');

    // @ts-expect-error — StringName requires a string argument
    let bad1 = StringName(123);

    // @ts-expect-error — NodePath requires a string argument
    let bad2 = NodePath(123);
  }
}

// ─── int / float type aliases ───────────────────────────────

class TypeAliasTest extends Node {
  test_aliases() {
    // int and float are aliases for number
    let i: int = 42;
    let f: float = 3.14;
    let n: number = i + f;

    // Can assign int to float and vice versa (both are number)
    let f2: float = i;
    let i2: int = f;
  }
}

// ─── int / float type aliases ───────────────────────────────

class TypeDictTest extends Node {
  test_dict() {
    const key1 = 'key';
    const key2 = Vector2.DOWN;
    const key3 = new Node2D();

    const dict = gd.dict([
      [key1, 'value'],
      [key2, 'value'],
      [key3, 'value'],
      ['key', 'value'],
    ]);
  }
}

// ─── getters / setters ───────────────────────────────

class GetSetTest extends Node {
  // Explicit property annotation is required: the inline getter body
  // references `this.f`, so TS needs a type for `f` independent of the
  // initializer to avoid TS7022.
  f: int = gd.getset({
    value: 10,
    get: () => {
      return this.f;
    },
    set: null,
  });
}
