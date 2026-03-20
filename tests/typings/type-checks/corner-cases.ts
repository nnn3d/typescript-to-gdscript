// Corner cases and edge case checks

// ─── TSOnly type erasure ────────────────────────────────────

class TSOnlyTest extends Node {
  // TSOnly wraps a type that gets erased during transformation
  metadata: TSOnly<{ debug: boolean; version: string }> = {
    debug: true,
    version: '1.0',
  };

  test_tsonly() {
    // Should still be usable as the inner type in TS
    let d: boolean = this.metadata.debug;
    let v: string = this.metadata.version;
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
    this.damage_dealt.emit('not a number', 'not a node');

    // Connect with correct callback signature
    this.damage_dealt.connect((amount: float, source: Node) => {
      print(amount);
    });

    // Check connection
    let fn = (a: float, b: Node) => {};
    let connected: boolean = this.damage_dealt.is_connected(fn);
    this.damage_dealt.disconnect(fn);
  }
}

// ─── Class name conflicts (renamed classes) ─────────────────

class RenamedClassTest extends Node {
  test_godot_classes() {
    // GodotObject is available directly
    let obj = new GodotObject();
    obj.get_class();
    obj.has_method('test');

    // Global Object = GodotObject
    let obj2 = new Object();
    obj2.get_class();
    obj2.has_method('test');

    // GodotArray is the untyped array class
    let arr = new GodotArray();
    arr.append('value');
    arr.size();

    // Array<T> is the generic GDScript array
    let typed_arr: Array<int> = [];
    typed_arr.append(42);
    typed_arr.size();
  }
}

// ─── Packed arrays ──────────────────────────────────────────

class PackedArrayTest extends Node {
  test_packed_arrays() {
    let bytes = PackedByteArray();
    let floats = PackedFloat32Array();
    let ints = PackedInt32Array();
    let strings = PackedStringArray();
    let vectors = PackedVector2Array();

    // These should have their own methods
    bytes.append(0);
    bytes.size();
    strings.append('hello');
    vectors.append(Vector2());
  }
}

// ─── Enum constants on classes ──────────────────────────────

class EnumConstTest extends Node {
  test_enum_constants() {
    // GodotObject connect flags
    let flag: int = GodotObject.CONNECT_DEFERRED;
    let one_shot: int = GodotObject.CONNECT_ONE_SHOT;

    // Vector2 axis constants
    let ax: int = Vector2.AXIS_X;
    let ay: int = Vector2.AXIS_Y;

    // Node process mode (from godot docs)
    // These are int constants
    let notif: int = GodotObject.NOTIFICATION_POSTINITIALIZE;
  }
}

// ─── Resource (RefCounted subclass) ─────────────────────────

class ResourceTest extends Resource {
  test_resource() {
    // Resource properties
    this.resource_name = 'test';
    this.resource_path = 'res://test.tres';
    let path: string = this.resource_path;

    // Inherited from RefCounted
    let count: int = this.get_reference_count();

    // Inherited from GodotObject
    let cls: string = this.get_class();

    // Resource does NOT have Node methods
    // @ts-expect-error — Resource is not a Node, no add_child
    this.add_child(new Node());

    // @ts-expect-error — Resource is not a Node, no get_node
    this.get_node('path');

    // @ts-expect-error — Resource is not a Node, no _ready
    this._ready();

    // Dictionary-only methods are overridden with never on GodotObject
    // @ts-expect-error — keys() is never on GodotObject hierarchy
    this.keys();

    // @ts-expect-error — values() is never on GodotObject hierarchy
    this.values();
  }
}

// ─── gd.ops type safety ─────────────────────────────────────

class OpsEdgeCases extends Node {
  test_ops_type_safety() {
    let v1 = Vector2();
    let v2 = Vector2();

    // Chained ops (2 args each)
    let sum: Vector2 = gd.ops.add(gd.ops.add(v1, v2), v1);

    // gd.ops with Vector3
    let a = Vector3();
    let b = Vector3();
    let c: Vector3 = gd.ops.add(a, b);

    // gd.ops with Color
    let c1 = Color();
    let c2 = Color();
    let c3: Color = gd.ops.mul(c1, c2);

    // Numeric ops
    let n1: int = 10;
    let n2: float = 3.14;
    let r: float = gd.ops.mul(n1, n2);
  }
}

// ─── Node get_node returns Node ─────────────────────────────

class GetNodeTest extends Node {
  test_get_node() {
    let child: Node = this.get_node('Child');
    let maybe: Node | null = this.get_node_or_null('Maybe');

    // Can add retrieved nodes
    let other: Node = this.get_node('Other');
    this.add_child(other);
  }
}

// ─── Globals ─────────────────────────────

class GlobalsTest extends Node {
  globals() {
    let inf: number = INF;
    let pi: number = PI;
    let length = len([]);
  }
}

// ─── Vector ─────────────────────────────

class VectorDictTest extends Node {
  vector_dict_test() {
    let v = Vector2();

    // @ts-expect-error — keys() is Dictionary-only, overridden with never
    v.keys();
  }
}

// ─── ForOf ─────────────────────────────

class ForOfTest extends Node {
  for_of_test() {
    for (let i of range(10)) {
      print(i);
    }
  }
}
