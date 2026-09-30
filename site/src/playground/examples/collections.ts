// Arrays map to Array, object literals to Dictionary.
export class Collections extends Node {
  _ready() {
    let names = ['Ada', 'Grace', 'Linus'];
    names.append('Guido');
    for (let name of names) {
      print(name.to_upper());
    }

    // Dot access on a Dictionary reads with `.get()`.
    let stats: { hp: int; mana: int } = { hp: 100, mana: 30 };
    let mana = stats.mana;
    stats.hp -= 10;

    // Non-string keys go through `gd.dict`.
    let home = Vector2i(0, 0);
    let lake = Vector2i(1, 0);
    let cells = gd.dict([
      [home, 'grass'],
      [lake, 'water'],
    ]);
    print(mana, cells.size());
  }
}
