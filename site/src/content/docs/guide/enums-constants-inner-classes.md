---
title: 'Enums, constants and inner classes'
description: "In GDScript you put const, enum and inner class declarations straight into the script. A TypeScript class can't hold those, so they go into an export…"
---

In GDScript you put `const`, `enum` and inner `class` declarations straight into the script. A TypeScript class can't hold those, so they go into an `export namespace` with the same name as the class. The converter lifts everything in it into the script class.

```ts
export namespace Enemy {
  export const MAX_HP = 100;

  export enum State {
    IDLE,
    CHASING,
    DEAD = 10,
  }

  export class Loot extends RefCounted {
    item: string = '';
    amount: int = 1;
  }
}

export class Enemy extends CharacterBody2D {
  static alive_count: int = 0;

  state: Enemy.State = Enemy.State.IDLE;
  hp: int = Enemy.MAX_HP;

  _ready() {
    Enemy.alive_count += 1;
  }

  die(): Enemy.Loot {
    this.state = Enemy.State.DEAD;
    let loot = new Enemy.Loot();
    loot.item = 'coin';
    return loot;
  }
}
```

```gdscript
class_name Enemy
extends CharacterBody2D

const MAX_HP = 100

enum State { IDLE, CHASING, DEAD = 10 }

class Loot extends RefCounted:
	var item: String = ""
	var amount: int = 1

static var alive_count: int = 0
var state: State = Enemy.State.IDLE
var hp: int = Enemy.MAX_HP

func _ready():
	Enemy.alive_count += 1

func die() -> Loot:
	self.state = Enemy.State.DEAD
	var loot = Enemy.Loot.new()
	loot.item = "coin"
	return loot
```

You refer to these members through the class name, `Enemy.MAX_HP` or `Enemy.State.IDLE`, inside the class and outside it alike. The namespace members come first in the `.gd`, then the class body in the order you wrote it.

> **Note:** Every member of the namespace needs `export`. Without it the class can't see the member, and the converter reports an error.

## Constants and static fields

GDScript has two kinds of class-level values, and each has its own place in TypeScript:

| GDScript               | TypeScript                                    |
| ---------------------- | --------------------------------------------- |
| `const MAX_HP = 100`   | `export const MAX_HP = 100;` in the namespace |
| `static var count = 0` | `static count = 0;` in the class              |

A `static` field can change and is shared by all instances. `readonly` is only a TypeScript check: `readonly speed = 50` becomes a plain `var`, and `static readonly` a `static var`. For a real GDScript `const`, use the namespace.

## Enums

Enum values are integers, as in GDScript. You can give a member an explicit integer (`DEAD = 10`); string values are an error. Use the enum as a type (`state: Enemy.State`), and the `.gd` gets the enum as its type hint.

## `switch` on an enum

```ts
export namespace Guard {
  export enum State {
    IDLE,
    PATROL,
    STUNNED,
  }
}

export class Guard extends CharacterBody2D {
  state: Guard.State = Guard.State.IDLE;

  _physics_process(delta: float) {
    switch (this.state) {
      case Guard.State.IDLE:
      case Guard.State.STUNNED:
        this.velocity = Vector2.ZERO;
      case Guard.State.PATROL:
        this.velocity = Vector2(60, 0);
    }
    this.move_and_slide();
  }
}
```

```gdscript
class_name Guard
extends CharacterBody2D

enum State { IDLE, PATROL, STUNNED }

var state: State = Guard.State.IDLE

func _physics_process(delta: float):
	match self.state:
		Guard.State.IDLE, Guard.State.STUNNED:
			self.velocity = Vector2.ZERO
		Guard.State.PATROL:
			self.velocity = Vector2(60, 0)
	self.move_and_slide()
```

A `switch` becomes a `match`, the usual shape of a state machine in GDScript. A `match` branch never falls through, so write each `case` without `break`; a `break` that leaves the `switch` is an error. Empty cases stacked above another share its body, and `default` becomes `_`, always the last branch. Keep `noFallthroughCasesInSwitch` off in `tsconfig.json` (it is off by default), or TypeScript flags every case. Switching on numbers rather than an enum? A `match` never matches a float against a whole-number case: see [the caveat](/typescript-to-gdscript/guide/caveats/#switch-becomes-match). For array, dictionary and guard patterns, use [`gd.match`](/typescript-to-gdscript/reference/gd-helpers/#match-statement).

## Inner classes

An `export class` in the namespace becomes an inner class. Create one with `new Enemy.Loot()`, which becomes `Enemy.Loot.new()`. `export abstract class` works too and becomes an `@abstract` inner class.

To give an inner class its own constants or enums, nest a namespace with the inner class's name inside the outer one.

## Everything goes in the namespace

A file holds one class, the script class. An `enum`, a class or a `const` written at the top of the file, outside the namespace, is an error. Move it into the namespace and add `export`, as the error message suggests.

## Godot's own enums

Godot's global enums keep their GDScript names, dots included: `Key.KEY_SPACE`, or `Variant.Type.TYPE_VECTOR3` to compare with `gd.typeof(x)`, which becomes `typeof(x)`.

An enum that belongs to an engine class, such as `Node.ProcessMode`, is different: the typings have only its values (`Node.PROCESS_MODE_DISABLED`), typed as `int`, and no `Node.ProcessMode` type. Annotate a variable that holds one as `int`.

## Details

[Constants and static fields](/typescript-to-gdscript/reference/transform-rules/#constants-and-static-fields), [enums](/typescript-to-gdscript/reference/transform-rules/#enums), [`switch` → `match`](/typescript-to-gdscript/reference/transform-rules/#switch--match) and [inner classes](/typescript-to-gdscript/reference/transform-rules/#inner-classes-via-namespace-merging) in the reference.
