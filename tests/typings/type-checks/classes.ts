// Tests for Godot class hierarchy and type relationships

// ─── Inheritance chain ──────────────────────────────────────

class InheritanceTest extends Node {
  test_inheritance() {
    var obj: GodotObject = new Node();
    var ref: RefCounted = new Resource();
    var node: Node = new Node2D();
    var node2d: Node2D = new Sprite2D();

    // @ts-expect-error — Node is not RefCounted (different branch)
    var bad: RefCounted = new Node();

    // @ts-expect-error — Sprite2D is not RefCounted
    var bad2: RefCounted = new Sprite2D();

    // @ts-expect-error — RefCounted is not Node
    var bad3: Node = new RefCounted();
  }
}

// ─── Node methods ───────────────────────────────────────────

class NodeMethodsTest extends Node {
  test_node_methods() {
    // Lifecycle methods
    this._ready();
    this._process(0.016);
    this._physics_process(0.016);

    // Tree operations
    var child = new Node();
    this.add_child(child);
    this.remove_child(child);
    var found: Node = this.get_node("Path/To/Node");
    var maybe: Node = this.get_node_or_null("Maybe");
    var count: int = this.get_child_count();
    var parent: Node = this.get_parent();
    var path: string = this.get_path();

    // Node inherits GodotObject methods
    var cls: string = this.get_class();
    var id: int = this.get_instance_id();
    this.free();
  }
}

// ─── Vector2 ────────────────────────────────────────────────

class VectorTest extends Node {
  test_vector2() {
    var v = new Vector2();
    v.x = 10.0;
    v.y = 20.0;

    var len: float = v.length();
    var norm: Vector2 = v.normalized();
    var dot: float = v.dot(new Vector2());
    var dist: float = v.distance_to(new Vector2());
    var angle: float = v.angle();
    var lerped: Vector2 = v.lerp(new Vector2(), 0.5);
    var rotated: Vector2 = v.rotated(1.57);
    var abs_v: Vector2 = v.abs();

    // Static members
    var axis_x: int = Vector2.AXIS_X;
    var zero: int = Vector2.ZERO;

    // Static factory
    var from: Vector2 = Vector2.from_angle(1.0);

    // @ts-expect-error — Vector2 has no push method
    v.push(1);

    // @ts-expect-error — Vector2 has no length property (it's a method)
    var bad: number = v.length;
  }
}

// ─── Callable / Function ────────────────────────────────────

class CallableTest extends Node {
  test_callable_class() {
    var c = new Callable();
    var result: unknown = c.call();
    c.call_deferred();
    var bound: Callable = c.bind();
    var method: string = c.get_method();
    var obj: GodotObject = c.get_object();
    var is_null: boolean = c.is_null();
    var is_valid: boolean = c.is_valid();

    // Static factory
    var created: Callable = Callable.create(this, "method_name");
  }

  test_function_interface() {
    // Function interface has Callable-like methods (bind, call)
    var fn: Function = () => {};
    var bound: Callable = fn.bind();
    var result: unknown = fn.call();
    var arg_count: int = fn.get_argument_count();
  }
}

// ─── Signal type on classes ─────────────────────────────────

class SignalPropertyTest extends Node {
  test_builtin_signals() {
    // GodotObject has built-in signals
    this.property_list_changed.emit();
    this.script_changed.emit();

    // @ts-expect-error — these signals take no args
    this.property_list_changed.emit(42);
  }
}

// ─── Global functions ───────────────────────────────────────

class GlobalFunctionsTest extends Node {
  test_global_functions() {
    // Math functions
    var a: float = absf(-3.14);
    var b: int = absi(-42);
    var c: float = cos(1.0);
    var d: float = sin(1.0);
    var e: float = sqrt(4.0);
    var f: unknown = lerp(0.0, 1.0, 0.5);
    var g: float = clampf(1.5, 0.0, 1.0);
    var h: int = clampi(5, 0, 3);

    // Print functions
    print("hello");
    print("a", "b", "c");
    printerr("error");
    prints("spaced", "output");

    // Utility
    var hashed: int = hash("test");
    var type: string = type_string(0);
    var valid: boolean = is_instance_valid(this);
  }
}
