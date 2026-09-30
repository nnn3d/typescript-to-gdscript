# Functions and lambdas

Methods become `func`s, and arrow functions become GDScript lambdas. A function held in a variable is a `Callable`, as in GDScript, and the converter adds the `.call()` for you.

## Methods

```ts
export class Shop extends Node {
  gold: int = 100;

  buy(item: string, price: int, count: int = 1): bool {
    if (price * count > this.gold) {
      return false;
    }
    this.gold -= price * count;
    print('bought ', count, ' x ', item);
    return true;
  }

  restock() {
    print('restocking');
  }
}
```

```gdscript
class_name Shop
extends Node

var gold: int = 100

func buy(item: String, price: int, count: int = 1) -> bool:
	if price * count > self.gold:
		return false
	self.gold -= price * count
	print("bought ", count, " x ", item)
	return true

func restock():
	print("restocking")
```

Parameter types and default values carry over. A return type goes into the `.gd` only when you write it: `restock()` has none, although TypeScript infers `void` for it. Write `: void` if you want `-> void`. Static methods are covered in [Scripts and classes](./scripts-and-classes.md#this-and-static-members).

## Arrow functions and callables

An arrow function becomes a lambda. A field or parameter with a function type, such as `(by: string) => void`, is a `Callable` in GDScript. GDScript can't call a variable directly, so every call through one gets `.call()`:

```ts
export class Door extends Node {
  on_open: (by: string) => void = (by: string) => {
    print('opened by ', by);
  };

  open(opener: string) {
    let shout = (text: string): string => text.to_upper();
    this.on_open(shout(opener));
  }

  run_twice(action: () => void) {
    action();
    action();
  }
}
```

```gdscript
class_name Door
extends Node

var on_open: Callable = func(by: String):
	print("opened by ", by)

func open(opener: String):
	var shout = func(text: String) -> String: return text.to_upper()
	self.on_open.call(shout.call(opener))

func run_twice(action: Callable):
	action.call()
	action.call()
```

TypeScript checks the arguments of each call against the function type. Inside an arrow function, `this` is the object the method runs on, and goes out as `self`.

> **Note:** A lambda gets a copy of the local variables it uses, as in GDScript. `let count = 0; let add = () => { count += 1; };` looks fine to TypeScript, but after `add()` the outer `count` is still `0` in Godot. Keep shared state in a field (`this.count`) or inside an array or dictionary.

## Passing a method

`this.method` without parentheses is the method as a `Callable`, just like `self.method` in GDScript. Pass it to `connect`, store it, or use Godot's `bind()`, which adds arguments at the end:

```ts
export class Menu extends Control {
  _ready() {
    let save = new Button();
    this.add_child(save);
    save.pressed.connect(this._on_slot_chosen.bind(2));
  }

  _on_slot_chosen(slot: int) {
    print('saving to slot ', slot);
  }
}
```

```gdscript
class_name Menu
extends Control

func _ready():
	var save = Button.new()
	self.add_child(save)
	save.pressed.connect(self._on_slot_chosen.bind(2))

func _on_slot_chosen(slot: int):
	print("saving to slot ", slot)
```

The bound result is typed too: `_on_slot_chosen.bind(2)` takes no arguments, which is what `pressed` expects, and `bind('two')` would be an error. More on connecting in [Signals](./signals.md).

## `map`, `filter` and friends

Godot's array methods that take a function, such as `map`, `filter`, `any` and `sort_custom`, take an arrow function, which becomes a lambda; see [Arrays and dictionaries](./arrays-and-dictionaries.md#arrays).

## Details

The reference has the full rules for [lambdas](../reference/transform-rules.md#arrow-functions--lambdas) and [callables](../reference/transform-rules.md#callables-and-function-references).
