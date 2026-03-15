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
    var x: number = this.MY_ENUM.VALUE_1;
    var y: number = this.MY_ENUM.VALUE_2;
    var z: number = this.MY_ENUM.VALUE_3;

    // @ts-expect-error — non-existent enum value
    var w = this.MY_ENUM.NONEXISTENT;
  }
}

// ─── gd.as ──────────────────────────────────────────────────

class AsTest extends Node {
  test_as() {
    var node: Node = this;

    // gd.as returns the type or null
    var sprite = gd.as(node, Sprite2D);
    // Result could be Sprite2D or null
    var check: Sprite2D | null = sprite;

    // When the type is known to match, no null
    var sprite2d: Sprite2D = new Sprite2D();
    var result = gd.as(sprite2d, Sprite2D);
    var exact: Sprite2D = result;
  }
}

// ─── gd.math ────────────────────────────────────────────────

class MathTest extends Node {
  test_math() {
    var v1 = new Vector2();
    var v2 = new Vector2();

    // gd.math preserves the type
    var v3: Vector2 = gd.math.add(v1, v2);
    var v4: Vector2 = gd.math.sub(v1, v2);
    var v5: Vector2 = gd.math.mul(v1, v2);
    var v6: Vector2 = gd.math.div(v1, v2);

    // Multiple operands
    var v7: Vector2 = gd.math.add(v1, v2, v1);
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
    var sn: string = StringName("my_name");
    var np: string = NodePath("Path/To/Node");

    // @ts-expect-error — StringName requires a string argument
    var bad1 = StringName(123);

    // @ts-expect-error — NodePath requires a string argument
    var bad2 = NodePath(123);
  }
}

// ─── int / float type aliases ───────────────────────────────

class TypeAliasTest extends Node {
  test_aliases() {
    // int and float are aliases for number
    var i: int = 42;
    var f: float = 3.14;
    var n: number = i + f;

    // Can assign int to float and vice versa (both are number)
    var f2: float = i;
    var i2: int = f;
  }
}
