// A literal type is typed as its base type in GDScript: a string literal, a
// union of them, a template literal, `keyof` or an alias to any of these is a
// `String`, and `true` / `false` is a `bool`. Number literals keep no type:
// `1 | 2` doesn't say whether it is an int or a float. With `null` in the
// union the annotation is dropped, as for any value type.
export type Rarity = 'common' | 'rare' | 'epic';

export interface Stats {
  hp: int;
  speed: float;
}

export class LiteralTypes extends Node {
  @exports team: 'player' | 'enemy' = 'player';
  rarity: Rarity = 'common';
  id: `item_${string}` = 'item_1';
  stat: keyof Stats = 'hp';
  enabled: true = true;
  flag: true | false = false;
  rarities: Rarity[] = [];
  maybe: Rarity | null = null;
  level: 1 | 2 | 3 = 1;
  mixed: 'auto' | 0 = 0;

  set_rarity(value: Rarity): Rarity {
    this.rarity = value;
    return value;
  }

  first<T extends Rarity>(values: T[]): T {
    return values[0];
  }
}
