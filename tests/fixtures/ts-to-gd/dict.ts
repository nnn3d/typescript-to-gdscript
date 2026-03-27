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
    }

    let dict3 = {'key': 'value', "key2": "value"};

    let dict4 = {'it\'s': 'value', "say \"hello\"": 'value'};
  }
}
