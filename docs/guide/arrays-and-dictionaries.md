# Arrays and dictionaries

Arrays and dictionaries are Godot's `Array` and `Dictionary`, with Godot's methods: `append`, `size`, `has`, `erase`, `keys`, and the rest. JavaScript's `push` and `length` don't exist here, and using them is an error in your editor.

## Arrays

```ts
export class Inventory extends Node {
  items: string[] = [];

  add(item: string) {
    if (!this.items.has(item)) {
      this.items.append(item);
    }
  }

  _ready() {
    this.add('sword');
    print(this.items.size(), ' items, first: ', this.items[0]);
    for (let item of this.items) {
      print(item);
    }
    let long_names = this.items.filter((name) => name.length() > 5);
    this.items.erase('sword');
  }
}
```

```gdscript
class_name Inventory
extends Node

var items: Array[String] = []

func add(item: String):
	if not self.items.has(item):
		self.items.append(item)

func _ready():
	self.add("sword")
	print(self.items.size(), " items, first: ", self.items[0])
	for item in self.items:
		print(item)
	var long_names = self.items.filter(func(name): return name.length() > 5)
	self.items.erase("sword")
```

Write a typed array as `T[]`: `string[]` becomes `Array[String]`, `Node2D[]` becomes `Array[Node2D]`. An array with no annotation, like `let list = [1, 2]`, stays an untyped `Array` in GDScript. Godot's methods that take a function (`filter`, `map`, `any`, `all`, `reduce`, `sort_custom`) take an arrow function, which becomes a lambda.

## Loops and `range`

`for...of` becomes `for ... in`, as in the example above. To count, use Godot's `range()` as you would in GDScript: `for (let i of range(3))` becomes `for i in range(3):`, and `range(0, 10, 2)` counts in steps of two. `for...in` is an error: in TypeScript it walks keys, while GDScript's `for x in` walks values. To loop over a dictionary's keys, use `for (let key of dict.keys())`.

## Dictionaries

An object literal becomes a `Dictionary`. Reading a key with a dot becomes `.get()`, which returns `null` for a missing key instead of raising an error. Writing a key stays a plain assignment.

```ts
export class Hero extends Node {
  stats = { name: 'Hero', hp: 100 };

  take_hit(damage: int) {
    this.stats.hp -= damage;
    print(this.stats.name, ' has ', this.stats.hp, ' hp');
  }
}
```

```gdscript
class_name Hero
extends Node

var stats = {
	"name": "Hero",
	"hp": 100,
}

func take_hit(damage: int):
	self.stats.hp -= damage
	print(self.stats.get("name"), " has ", self.stats.get("hp"), " hp")
```

The same goes for anything typed with an `interface` or an object type: in GDScript it is a dictionary, so its reads become `.get()` too. Instances of classes keep plain dot access.

## Typed dictionaries

`Dictionary<K, V>` lets TypeScript check the keys and values. Index reads become `.get()` here as well. The `.gd` gets a plain `Dictionary`.

```ts
export class Scores extends Node {
  scores: Dictionary<string, int> = {};

  add(player: string, points: int) {
    this.scores[player] = this.scores.get(player, 0) + points;
    print(player, ': ', this.scores[player]);
  }
}
```

```gdscript
class_name Scores
extends Node

var scores: Dictionary = {}

func add(player: String, points: int):
	self.scores[player] = self.scores.get(player, 0) + points
	print(player, ": ", self.scores.get(player))
```

## Keys that aren't strings

TypeScript turns every key of an object literal into a string, so a `Vector2i` or a node can't be a key there. Build such a dictionary with `gd.dict`, from a list of `[key, value]` pairs, or start an empty one with `Dictionary<K, V>()`. Read and write it with `get` and `set`: TypeScript only allows strings and numbers inside `[]`.

```ts
export class Board extends Node2D {
  pieces = Dictionary<Vector2i, Node2D>();

  _ready() {
    let names = gd.dict<Vector2i, string>([
      [Vector2i.LEFT, 'west'],
      [Vector2i.RIGHT, 'east'],
    ]);
    print(names.get(Vector2i.LEFT));
    this.pieces.set(Vector2i(0, 0), this);
  }
}
```

```gdscript
class_name Board
extends Node2D

var pieces = Dictionary()

func _ready():
	var names = {
		Vector2i.LEFT: "west",
		Vector2i.RIGHT: "east",
	}
	print(names.get(Vector2i.LEFT))
	self.pieces.set(Vector2i(0, 0), self)
```

The type arguments, like those of `pieces` and `names`, set the key and value types, and TypeScript checks every pair against them. Without them, `gd.dict` takes the types from the field or variable it goes into. Each key in `gd.dict` must be a variable, a literal or a member like `Vector2i.LEFT`. Compute anything else into a variable first.

## Details

[Dictionaries in the full cheat sheet](../reference/transform-rules.md#full-cheat-sheet) and [`gd.dict`](../reference/gd-helpers.md#typed-dictionary-literals-gddict) in the reference.
