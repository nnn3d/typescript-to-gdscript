// Tests for Array<T> — now maps to GDScript Array, not JS Array

class ArrayTest extends Node {
  test_gdscript_array_methods() {
    let arr: Array<string> = [];

    // GDScript Array methods work
    arr.append('hello');
    arr.push_back('world');
    arr.push_front('first');
    let val: string = arr.pop_back();
    let front: string = arr.pop_front();
    arr.erase('hello');
    arr.clear();
    let s: int = arr.size();
    let empty: boolean = arr.is_empty();
    let has_it: boolean = arr.has('test');
    arr.sort();
    arr.reverse();
    arr.shuffle();
    let idx: int = arr.find('hello');
    let picked: string = arr.pick_random();
    arr.remove_at(0);
    arr.insert(0, 'value');
    let sliced: Array<string> = arr.slice(0, 5);
    let duped: Array<string> = arr.duplicate();
    let max_val: string = arr.max();
    let min_val: string = arr.min();
    arr.resize(10);
    arr.fill('default');
    let first: string = arr.front();
    let last: string = arr.back();
    let cnt: int = arr.count('hello');

    // map/filter/reduce use typed function signatures
    let mapped: Array<string> = arr.map((x: string) => x);
    let filtered: Array<string> = arr.filter((x: string) => x === 'yes');
    let reduced: string = arr.reduce((acc: string, x: string) => acc + x);

    // map with different return type
    let bools: Array<boolean> = arr.map((x: string) => x === 'yes');

    // @ts-expect-error — gdscript Array has no JS pop()
    arr.pop();
  }

  test_no_js_array_methods() {
    let nums: Array<int> = [];

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
    nums.join(',');

    // @ts-expect-error — no JS concat
    nums.concat([1, 2]);
  }

  test_typed_arrays() {
    // Array is generic
    let ints: Array<int> = [];
    ints.append(42);

    // @ts-expect-error — wrong element type
    ints.append('hello');

    let nodes: Array<Node> = [];
    nodes.append(new Node());

    // @ts-expect-error — wrong element type
    nodes.append('not a node');

    // Index access
    let first: int = ints[0];
    let node: Node = nodes[0];
  }

}
