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

    // No type argument means no arguments, as `signal name` in GDScript
    this.simple_signal.emit();
    // @ts-expect-error — the signal has no arguments
    this.simple_signal.emit(42);
    this.simple_signal.connect(() => {});
    // @ts-expect-error — the handler expects an argument the signal never sends
    this.simple_signal.connect((value: int) => {});
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

  // Scalar casts, mirroring the `gd.is` overload set. `x as int` and
  // friends are ordinary GDScript casts.
  test_as_scalar(value: unknown) {
    let i: int = gd.as(value, int);
    let f: float = gd.as(value, float);
    let b: boolean = gd.as(value, bool);
    let sn: StringName = gd.as(value, StringName);
  }

  // An abstract class is a legal cast target — `abstract new` accepts
  // it, and a concrete constructor as well.
  test_as_abstract(node: Node) {
    let base: AbstractBase | null = gd.as(node, AbstractBase);
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

  // Entries of one key type and one value type make a typed dictionary,
  // and an empty one takes its types from where it goes — which an object
  // literal cannot do for a class key.
  test_typed_dict(node: Node, other: Node2D) {
    const typed: Dictionary<Node, int> = gd.dict([
      [node, 1],
      [other, 2],
    ]);
    const empty: Dictionary<Node, int> = gd.dict([]);
    // A subclass key still fits: the types come from the destination.
    const subclass_key: Dictionary<Node, int> = gd.dict([[other, 1]]);
    const self_key: Dictionary<Node, int> = gd.dict([[this, 1]]);
    const value: int = typed.get(node);
    // String and number keys take their types from the destination too.
    const by_name: Dictionary<string, int> = gd.dict([['hp', 1]]);
    const by_index: Dictionary<int, string> = gd.dict([[1, 'a']]);
    // @ts-expect-error — a value of the wrong type for a string key
    const wrong_name: Dictionary<string, int> = gd.dict([['hp', 'x']]);
    // @ts-expect-error — a value of the wrong type
    const wrong: Dictionary<Node, int> = gd.dict([[node, 'x']]);
    // @ts-expect-error — `{}` has no typed find_key for a class key
    const literal: Dictionary<Node, int> = {};
    // Or name the key and value types right in the call.
    const explicit = gd.dict<Vector2, int>([
      [Vector2.ZERO, 1],
      [Vector2.ONE, 2],
    ]);
    const explicit_value: int = explicit.get(Vector2.ZERO);
    const explicit_named = gd.dict<string, int>([['hp', 1]]);
    const explicit_hp: int = explicit_named['hp'];
    const explicit_typed: Dictionary<Node, int> = gd.dict<Node, int>([
      [node, 1],
    ]);
    // @ts-expect-error — a value of the wrong type
    gd.dict<Vector2, int>([[Vector2.ZERO, 'x']]);
    // @ts-expect-error — a key of the wrong type
    gd.dict<Vector2, int>([['a', 1]]);
    // With nothing typed to go to, it stays untyped — mixed keys included.
    const loose = gd.dict([]);
    loose.set(node, 1);
    loose.set('key', 'value');
    const mixed: Dictionary = gd.dict([
      [node, 1],
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

// ─── typeof ──────────────────────────────────────────

class TypeofTest extends Node {
  describe(value: unknown): string {
    const kind: Variant.Type = gd.typeof(value);
    if (kind === Variant.Type.TYPE_INT) {
      return "int";
    }
    // Variant.Type is a numeric enum, so it still satisfies `int` params.
    return type_string(gd.typeof(value));
  }

  compare(op: Variant.Operator): boolean {
    return op === Variant.Operator.OP_EQUAL;
  }
}

// A base of the user's own, abstract on the TS side.
abstract class AbstractBase extends Node {
  abstract step(): void;
}
