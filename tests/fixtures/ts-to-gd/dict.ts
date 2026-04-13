export class MyClass extends Node {
  test_dict() {
    const key1 = 'key';
    const key2 = Vector2.DOWN;
    const key3 = new Node2D();

    let dict = gd.dict([
      [key1, 'value'],
      [key2, 'value'],
      [key3, 'value'],
      ['key', 'value'],
    ]);

    let dict2 = {
      [key1]: 'value',
      key2: 'value',
      [key1 + key2]: 'value',
    }

    let dict3 = {'key': 'value', "key2": "value"};

    let dict4 = {'it\'s': 'value', "say \"hello\"": 'value'};
  }

  test_dict_value?: Node;

  test_optional_access() {
    let d: { a?: number, b: number } = { b: 1 };

    // Optional prop → .get()
    let a = d.a;

    // Non-optional prop → stays dot access
    let b = d.b;

    // Optional element access → .get()
    let c = d["a"];

    // Standalone optional → .get()
    let e: { f?: { g: number } } = {};
    let f = e.f;
    // Chained access — no .get() (used as object for further access)
    let g = e.f!.g;

    if (e.f) {
      let g2 = e.f.g;
    }

    // Call on optional — no .get() (used as callee)
    let h: { fn?: () => void } = {};
    h.fn!();

    if (h.fn) {
      h.fn();
    }

    let i = this.test_dict_value;

    // Class field — no .get() (always defined in GDScript)
    let node = new Node2D();
    let pos = node.position;
  }
}
