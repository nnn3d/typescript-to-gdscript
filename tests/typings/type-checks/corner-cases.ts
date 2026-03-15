// Corner cases and edge case checks

// ─── TSOnly type erasure ────────────────────────────────────

class TSOnlyTest extends Node {
  // TSOnly wraps a type that gets erased during transformation
  metadata: TSOnly<{ debug: boolean; version: string }> = { debug: true, version: "1.0" };

  test_tsonly() {
    // Should still be usable as the inner type in TS
    var d: boolean = this.metadata.debug;
    var v: string = this.metadata.version;
  }
}

// ─── Signal type used as property type ──────────────────────

class SignalTypeTest extends Node {
  // Signal with specific param types
  damage_dealt: Signal<[float, Node]> = gd.signal<[float, Node]>();

  test_signal_type() {
    // Emit with correct types
    this.damage_dealt.emit(10.0, this);

    // @ts-expect-error — wrong param types
    this.damage_dealt.emit("not a number", "not a node");

    // Connect with correct callback signature
    this.damage_dealt.connect((amount: float, source: Node) => {
      print(amount);
    });

    // Check connection
    var fn = (a: float, b: Node) => {};
    var connected: boolean = this.damage_dealt.is_connected(fn);
    this.damage_dealt.disconnect(fn);
  }
}

// ─── Class name conflicts (renamed classes) ─────────────────

class RenamedClassTest extends Node {
  test_godot_classes() {
    // GodotObject is available directly
    var obj = new GodotObject();
    obj.get_class();
    obj.has_method("test");

    // Global Object = GodotObject
    var obj2 = new Object();
    obj2.get_class();
    obj2.has_method("test");

    // GodotArray is the untyped array class
    var arr = new GodotArray();
    arr.append("value");
    arr.size();

    // Array<T> is the generic GDScript array
    var typed_arr: Array<int> = [];
    typed_arr.append(42);
    typed_arr.size();
  }
}

// ─── Packed arrays ──────────────────────────────────────────

class PackedArrayTest extends Node {
  test_packed_arrays() {
    var bytes = new PackedByteArray();
    var floats = new PackedFloat32Array();
    var ints = new PackedInt32Array();
    var strings = new PackedStringArray();
    var vectors = new PackedVector2Array();

    // These should have their own methods
    bytes.append(0);
    bytes.size();
    strings.append("hello");
    vectors.append(new Vector2());
  }
}

// ─── Enum constants on classes ──────────────────────────────

class EnumConstTest extends Node {
  test_enum_constants() {
    // GodotObject connect flags
    var flag: int = GodotObject.CONNECT_DEFERRED;
    var one_shot: int = GodotObject.CONNECT_ONE_SHOT;

    // Vector2 axis constants
    var ax: int = Vector2.AXIS_X;
    var ay: int = Vector2.AXIS_Y;

    // Node process mode (from godot docs)
    // These are int constants
    var notif: int = GodotObject.NOTIFICATION_POSTINITIALIZE;
  }
}

// ─── Resource (RefCounted subclass) ─────────────────────────

class ResourceTest extends Resource {
  test_resource() {
    // Resource properties
    this.resource_name = "test";
    this.resource_path = "res://test.tres";
    var path: string = this.resource_path;

    // Inherited from RefCounted
    var count: int = this.get_reference_count();

    // Inherited from GodotObject
    var cls: string = this.get_class();

    // Resource does NOT have Node methods
    // @ts-expect-error — Resource is not a Node, no add_child
    this.add_child(new Node());

    // @ts-expect-error — Resource is not a Node, no get_node
    this.get_node("path");

    // @ts-expect-error — Resource is not a Node, no _ready
    this._ready();

    // Dictionary-only methods are overridden with never on GodotObject
    // @ts-expect-error — keys() is never on GodotObject hierarchy
    this.keys();

    // @ts-expect-error — values() is never on GodotObject hierarchy
    this.values();
  }
}

// ─── Multiple gd.math operands ──────────────────────────────

class MathEdgeCases extends Node {
  test_math_type_safety() {
    var v1 = new Vector2();
    var v2 = new Vector2();
    var v3 = new Vector2();

    // Multiple operands
    var sum: Vector2 = gd.math.add(v1, v2, v3);
    var diff: Vector2 = gd.math.sub(v1, v2, v3);

    // gd.math with Vector3
    var a = new Vector3();
    var b = new Vector3();
    var c: Vector3 = gd.math.add(a, b);

    // gd.math with Color
    var c1 = new Color();
    var c2 = new Color();
    var c3: Color = gd.math.mul(c1, c2);
  }
}

// ─── Node get_node returns Node ─────────────────────────────

class GetNodeTest extends Node {
  test_get_node() {
    var child: Node = this.get_node("Child");
    var maybe: Node | null = this.get_node_or_null("Maybe");

    // Can add retrieved nodes
    var other: Node = this.get_node("Other");
    this.add_child(other);
  }
}
