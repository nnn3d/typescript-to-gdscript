// Tests for Godot class hierarchy and type relationships

// ─── Inheritance chain ──────────────────────────────────────

class InheritanceTest extends Node {
  test_inheritance() {
    let obj: GodotObject = new Node();
    let ref: RefCounted = new Resource();
    let node: Node = new Node2D();
    let node2d: Node2D = new Sprite2D();

    // @ts-expect-error — Node is not RefCounted (different branch)
    let bad: RefCounted = new Node();

    // @ts-expect-error — Sprite2D is not RefCounted
    let bad2: RefCounted = new Sprite2D();

    // @ts-expect-error — RefCounted is not Node
    let bad3: Node = new RefCounted();
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
    let child = new Node();
    this.add_child(child);
    this.remove_child(child);
    let found: Node | null = this.get_node('Path/To/Node');
    let maybe: Node | null = this.get_node_or_null('Maybe');
    let count: int = this.get_child_count();
    let parent: Node = this.get_parent();
    let path: NodePath = this.get_path();

    // Node inherits GodotObject methods
    let cls: string = this.get_class();
    let id: int = this.get_instance_id();
    this.free();
  }
}

// ─── Vector2 ────────────────────────────────────────────────

class VectorTest extends Node {
  test_vector2() {
    let v = Vector2();
    v.x = 10.0;
    v.y = 20.0;

    let len: float = v.length();
    let norm: Vector2 = v.normalized();
    let dot: float = v.dot(Vector2());
    let dist: float = v.distance_to(Vector2());
    let angle: float = v.angle();
    let lerped: Vector2 = v.lerp(Vector2(), 0.5);
    let rotated: Vector2 = v.rotated(1.57);
    let abs_v: Vector2 = v.abs();

    // Static members
    let axis_x: int = Vector2.AXIS_X;
    let zero: Vector2 = Vector2.ZERO;

    // Static factory
    let from: Vector2 = Vector2.from_angle(1.0);

    // @ts-expect-error — Vector2 has no push method
    v.push(1);

    // @ts-expect-error — Vector2 has no length property (it's a method)
    let bad: number = v.length;
  }
}

// ─── Callable / Function ────────────────────────────────────

class CallableTest extends Node {
  test_callable_class() {
    let c = new Callable();
    let result: unknown = c.call();
    c.call_deferred();
    let bound: Callable = c.bind();
    let method: string = c.get_method();
    let obj: GodotObject = c.get_object();
    let is_null: boolean = c.is_null();
    let is_valid: boolean = c.is_valid();

    // Static factory
    let created: Callable = Callable.create(this, 'method_name');
  }

  test_function_interface() {
    // Function interface has Callable-like methods (bind, call)
    let fn: Function = () => {};
    let bound: Callable = fn.bind();
    let result: unknown = fn.call();
    let arg_count: int = fn.get_argument_count();
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

// ─── GodotObject ─────────────────────────────────

class GodotObjectTest extends Object {
  test_fn(value: string): number {
    return 0;
  }
  test_val = 10;
  test_builtin_methods() {
    const t: unknown = this.call('test_fn', 'sdf');
    // @ts-expect-error — problems with ts typings
    const t2: number = this.call('test_fn', 'sdf');
    // String fallback overload accepts any args
    const t3 = this.call('test_fn', 0);
    const t4 = this.call('test_val');
  }
}

// ─── Global functions ───────────────────────────────────────

class GlobalFunctionsTest extends Node {
  test_global_functions() {
    // Math functions
    let a: float = absf(-3.14);
    let b: int = absi(-42);
    let c: float = cos(1.0);
    let d: float = sin(1.0);
    let e: float = sqrt(4.0);
    let f: unknown = lerp(0.0, 1.0, 0.5);
    let g: float = clampf(1.5, 0.0, 1.0);
    let h: int = clampi(5, 0, 3);

    // Print functions
    print('hello');
    print('a', 'b', 'c');
    printerr('error');
    prints('spaced', 'output');

    // Utility
    let hashed: int = hash('test');
    let type: string = type_string(0);
    let valid: boolean = is_instance_valid(this);
  }
}
