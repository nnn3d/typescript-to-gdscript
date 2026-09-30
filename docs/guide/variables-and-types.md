# Variables and types

GDScript's `var` and type hints map onto TypeScript's `let` and type annotations. The types are the ones you know from GDScript, and TypeScript checks them before the game runs.

```ts
export class Player extends CharacterBody2D {
  max_health: int = 100;
  health: int = 100;
  title: string = 'Hero';
  weapon: Node2D | null = null;

  heal(amount: int): int {
    const before = this.health;
    let after = mini(this.health + amount, this.max_health);
    this.health = after;
    print(`${this.title} healed by ${after - before}`);
    return after - before;
  }
}
```

```gdscript
class_name Player
extends CharacterBody2D

var max_health: int = 100
var health: int = 100
var title: String = "Hero"
var weapon: Node2D = null

func heal(amount: int) -> int:
	var before = self.health
	var after = mini(self.health + amount, self.max_health)
	self.health = after
	print("" + str(self.title) + " healed by " + str(after - before))
	return after - before
```

`let` and `const` both become `var`. Use `let` for a value that changes and `const` for one that doesn't; TypeScript enforces the `const`, and GDScript sees a plain `var`. Avoid TypeScript's `var`: it is scoped to the whole function, while GDScript's `var` is scoped to its block like `let`. The converter warns about it. Class-level constants are covered in [Enums, constants and inner classes](./enums-constants-inner-classes.md).

## Types

| TypeScript                    | GDScript      |
| ----------------------------- | ------------- |
| `int`                         | `int`         |
| `float`, `number`             | `float`       |
| `bool`, `boolean`             | `bool`        |
| `string`                      | `String`      |
| `Vector2`, `Color`, `Node`, … | the same name |
| `GodotObject`                 | `Object`      |

> **Note:** Write text types as `string`, in lowercase. Godot's API is typed with `string`, and TypeScript won't pass a value typed `String` where a `string` is expected. `String(x)` is still the cast.

`int` and `float` are both `number` to TypeScript, so `7 / 2` between two `int`s is `3`, as in GDScript; see [Math and value types](./math-and-value-types.md#int-and-float).

A type hint goes into the `.gd` only when GDScript has that type: Godot classes and value types, your own classes, enums. An `interface`, a `type` alias, a union of several classes, `any` and `unknown` have no GDScript type, so the variable is left untyped, which is always valid GDScript. TypeScript still checks it.

## `null`, not `undefined`

GDScript has only `null`, so `undefined` is an error. Mark a value that may be empty with `| null` and give it `null`, like `weapon` above. For an optional parameter, write `who: Node | null = null` rather than `who?: Node`.

In GDScript only objects (nodes, resources, your classes) can be `null`. So `count: int | null = null` becomes an untyped `var count = null`: an `int`, `String`, `Vector2`, typed array or enum variable can't hold `null`.

## Fields without an initializer

GDScript starts every `var` with a value: `null` for an object, `0` or `Vector2()` for a value type. TypeScript's `strict` mode flags a field with no initializer, so write the form that says what really happens:

```ts
export class Turret extends Node2D {
  @exports target!: Node2D;
  hp: int = 0;
  last_hit: Node | null = null;
}
```

```gdscript
class_name Turret
extends Node2D

@export
var target: Node2D
var hp: int = 0
var last_hit: Node = null
```

- `!` means "set before use": by the editor for an export, or in `_ready()`. It disappears from the `.gd`.
- A value type gets the default GDScript would use anyway.
- `| null = null` is for a value that may really be missing.

## Properties with get and set

```ts
export class Player extends CharacterBody2D {
  get hp(): int {
    return this.hp;
  }
  set hp(v: int) {
    this.hp = clampi(v, 0, 100);
  }
}
```

```gdscript
class_name Player
extends CharacterBody2D

var hp: int:
	get:
		return hp
	set(v):
		hp = clampi(v, 0, 100)
```

Inside the accessors `this.hp` is the stored value, like the bare `hp` in GDScript. For a default value, use [`gd.getset`](../reference/gd-helpers.md#getters-and-setters).

## Casts and type checks

`int(x)`, `float(x)`, `bool(x)`, `String(x)` and `str(...)` work as in GDScript. `instanceof` becomes `is`, and TypeScript narrows the type inside the `if`. For `int`, `float`, `bool` and `String`, use `gd.is(x, int)`. `gd.as(x, Type)` becomes `x as Type` and gives `null` when `x` is something else.

```ts
export class Inspector extends Node {
  inspect(node: Node, value: Variant) {
    if (node instanceof Sprite2D) {
      print('a sprite with ', node.texture);
    }
    if (gd.is(value, int)) {
      print('an int');
    }
  }
}
```

```gdscript
class_name Inspector
extends Node

func inspect(node: Node, value: Variant):
	if node is Sprite2D:
		print("a sprite with ", node.texture)
	if value is int:
		print("an int")
```

## Strings, `StringName` and `NodePath`

Single quotes, double quotes and template literals all become double-quoted strings. A template literal becomes a `str()` concatenation, as in `heal` above, since GDScript has no string interpolation.

`StringName('jump')` and `NodePath('Body/Sprite2D')` go out as these same constructor calls, which mean the same as `&"jump"` and `^"Body/Sprite2D"`. A plain string works wherever Godot takes a `StringName`, as in `Input.is_action_pressed('jump')`. A `NodePath` property needs `NodePath(...)`, while `get_node()` takes a plain string (see [Nodes and scenes](./nodes-and-scenes.md)).

## Details

See the reference for [primitive types](../reference/transform-rules.md#primitive-types--case-mapping), [which hints are emitted](../reference/transform-rules.md#type-annotations--what-gets-emitted), [fields without an initializer](../reference/transform-rules.md#fields-without-an-initializer), [casts](../reference/gd-helpers.md#type-casting-as), [type checks](../reference/gd-helpers.md#type-checking-is) and [strings](../reference/transform-rules.md#strings-and-template-literals).
