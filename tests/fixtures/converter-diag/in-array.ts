// `in` on an array checks for an index or a property in TypeScript but for
// an element in GDScript, so the same line would mean something else.
// `in` on a dictionary checks for a key on both sides and stays allowed.
export class Foo extends Node {
  test() {
    let list: number[] = [1, 2, 3];
    let has_index = 1 in list;

    let items: Array<number> = [];
    let has_prop = 'length' in items;

    let pair: [number, string] = [1, 'a'];
    let in_tuple = 0 in pair;

    let stats = { hp: 10 };
    let has_key = 'hp' in stats;
  }
}
