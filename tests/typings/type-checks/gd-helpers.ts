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
    this.health_changed.emit("a", "b");

    // Connect with typed callback
    this.health_changed.connect((old_hp: int, new_hp: int) => {});

    // Simple signal with default type accepts any args (Signal defaults to any[])
    this.simple_signal.emit();
    this.simple_signal.emit(42);
  }
}

// ─── gd.enum ────────────────────────────────────────────────

class EnumTest extends Node {
  // Enum creates a Record<T, number>
  MY_ENUM = gd.enum('VALUE_1', 'VALUE_2', ['VALUE_3', -1]);

  test_enum() {
    // Access enum values as numbers
    let x: number = this.MY_ENUM.VALUE_1;
    let y: number = this.MY_ENUM.VALUE_2;
    let z: number = this.MY_ENUM.VALUE_3;

    // @ts-expect-error — non-existent enum value
    let w = this.MY_ENUM.NONEXISTENT;
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

// ─── gd decorators ──────────────────────────────────────────

class DecoratorTest extends Node {
  @gd.export
  speed: float = 100.0;

  @gd.onready
  sprite: Sprite2D = null!;

  @gd.export_category("Movement")
  @gd.export
  max_speed: float = 200.0;
}

// ─── StringName / NodePath ──────────────────────────────────

class StringNameTest extends Node {
  test_string_helpers() {
    let sn: string = StringName("my_name");
    let np: string = NodePath("Path/To/Node");

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
    const key1 = "key";
    const key2 = Vector2.DOWN;
    const key3 = new Node2D();

    const dict = gd.dict([
      [key1, "value"],
      [key2, "value"],
      [key3, "value"],
      ["key", "value"],
    ]);
  }
}
