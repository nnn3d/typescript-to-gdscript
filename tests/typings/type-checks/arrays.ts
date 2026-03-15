// Tests for Array<T> — now maps to GDScript Array, not JS Array

class ArrayTest extends Node {
  test_gdscript_array_methods() {
    var arr: Array<string> = [];

    // GDScript Array methods work
    arr.append("hello");
    arr.push_back("world");
    arr.push_front("first");
    var val: string = arr.pop_back();
    var front: string = arr.pop_front();
    arr.erase("hello");
    arr.clear();
    var s: int = arr.size();
    var empty: boolean = arr.is_empty();
    var has_it: boolean = arr.has("test");
    arr.sort();
    arr.reverse();
    arr.shuffle();
    var idx: int = arr.find("hello");
    var picked: string = arr.pick_random();
    arr.remove_at(0);
    arr.insert(0, "value");
    var sliced: Array<string> = arr.slice(0, 5);
    var duped: Array<string> = arr.duplicate();
    var max_val: string = arr.max();
    var min_val: string = arr.min();
    arr.resize(10);
    arr.fill("default");
    var first: string = arr.front();
    var last: string = arr.back();
    var cnt: int = arr.count("hello");

    // map/filter/reduce take Callable (not JS callbacks)
    var mapped: Array<string> = arr.map(new Callable());
    var filtered: Array<string> = arr.filter(new Callable());
    var reduced: string = arr.reduce(new Callable());

    // @ts-expect-error — gdscript Array has no JS pop()
    arr.pop();

    // Callable = Function, so lambdas are accepted
    arr.map((x: string) => x);
    arr.filter((x: string) => true);
  }

  test_no_js_array_methods() {
    var nums: Array<int> = [];

    // @ts-expect-error — no JS push (use append or push_back)
    nums.push(4);

    // @ts-expect-error — no JS length (use size())
    nums.length;

    // @ts-expect-error — no JS pop (use pop_back)
    nums.pop();

    // @ts-expect-error — no JS forEach
    nums.forEach;

    // @ts-expect-error — no JS splice
    nums.splice(0, 1);

    // @ts-expect-error — no JS indexOf (use find)
    nums.indexOf(1);

    // @ts-expect-error — no JS join
    nums.join(",");

    // @ts-expect-error — no JS concat
    nums.concat([1, 2]);
  }

  test_typed_arrays() {
    // Array is generic
    var ints: Array<int> = [];
    ints.append(42);

    // @ts-expect-error — wrong element type
    ints.append("hello");

    var nodes: Array<Node> = [];
    nodes.append(new Node());

    // @ts-expect-error — wrong element type
    nodes.append("not a node");

    // Index access
    var first: int = ints[0];
    var node: Node = nodes[0];
  }

  test_godot_array_class() {
    // GodotArray class also exists (untyped version)
    var arr = new GodotArray();
    arr.append("hello");
    arr.size();
    arr.has("test");
  }
}
