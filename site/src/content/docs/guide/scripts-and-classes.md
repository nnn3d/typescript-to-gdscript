---
title: 'Scripts and classes'
description: 'In GDScript a file is a class: class_name, extends, then its members. In TypeScript you write that class out with export class, and each .ts file becomes one…'
---

In GDScript a file is a class: `class_name`, `extends`, then its members. In TypeScript you write that class out with `export class`, and each `.ts` file becomes one `.gd` script.

```ts
export class Enemy extends CharacterBody2D {
  /** Pixels per second. */
  @exports speed: float = 80.0;
  target: Node2D | null = null;

  _physics_process(delta: float) {
    // Stand still until there is something to chase.
    if (this.target === null) {
      return;
    }
    let direction = this.global_position.direction_to(
      this.target.global_position,
    );
    this.velocity = gd.ops.mul(direction, this.speed);
    this.move_and_slide();
  }

  chase(node: Node2D) {
    this.target = node;
  }
}
```

```gdscript
class_name Enemy
extends CharacterBody2D

## Pixels per second.
@export
var speed: float = 80.0
var target: Node2D = null

func _physics_process(delta: float):
	# Stand still until there is something to chase.
	if self.target == null:
		return
	var direction = self.global_position.direction_to(self.target.global_position)
	self.velocity = (direction * self.speed)
	self.move_and_slide()

func chase(node: Node2D):
	self.target = node
```

The class name becomes `class_name`, and `extends` works as in GDScript. Lifecycle methods (`_ready`, `_process`, `_physics_process`, `_input`, …) are ordinary methods: write them, and Godot calls them as usual. Fields become `var`s; see [Variables and types](/typescript-to-gdscript/guide/variables-and-types/) for the types.

## Comments

`//` comments become `#`, and a `/** … */` comment becomes a `##` doc comment, which Godot shows in inspector tooltips, as for `speed` above.

## One class per file

Each file holds exactly one `export class`, and the class must say what it extends. GDScript would quietly fall back to `RefCounted`; here you write `extends RefCounted` (or `Resource`, `Node`, …) yourself. For helper classes inside the same script, use [inner classes](/typescript-to-gdscript/guide/enums-constants-inner-classes/).

Godot's `Object` is called `GodotObject` in TypeScript, because `Object` already means something else there. Write `extends GodotObject`; it goes out as `extends Object`.

> **Note:** A field can't reuse the name of an inherited property. `name: string` on a `Node` type-checks, but Godot refuses the script (`Member "name" redefined`). Pick another name. Overriding inherited methods is fine.

## Types next to the class

Types don't count toward the one class. Declare `type` aliases and `interface`s at the top level of the file and export them as usual; they only exist for TypeScript and leave nothing in the `.gd`:

```ts
export type DamageKind = 'fire' | 'ice' | 'physical';

export interface Hit {
  damage: int;
  kind: DamageKind;
}

export class Weapon extends Node2D {
  damage: int = 10;

  strike(kind: DamageKind): Hit {
    return { damage: this.damage, kind: kind };
  }
}
```

```gdscript
class_name Weapon
extends Node2D

var damage: int = 10

func strike(kind: String):
	return {
		"damage": self.damage,
		"kind": kind,
	}
```

Other scripts import them like any TypeScript type, `import type { Hit } from './weapon'`, and the import adds nothing to their `.gd` either. An object type such as `Hit` is a dictionary in GDScript; see [Arrays and dictionaries](/typescript-to-gdscript/guide/arrays-and-dictionaries/).

## `this` and static members

TypeScript needs `this.` in front of every member, even where GDScript lets you write the bare name. It always converts to `self.`.

`static high_score: int = 0` becomes `static var high_score: int = 0`, shared by all instances, and a `static` method becomes a `static func`. Inside a static method `this` is the class itself, so `this.high_score` goes out as `Score.high_score`. For a class-level `const`, see [Enums, constants and inner classes](/typescript-to-gdscript/guide/enums-constants-inner-classes/).

## Scripts without `class_name`

A class whose name starts with `_` gets no `class_name`, like a GDScript file without one. By convention the name matches the file: `hit_flash.ts` holds `_HitFlash`.

```ts
export class _HitFlash extends RefCounted {
  play(target: CanvasItem) {
    target.modulate = Color.RED;
  }
}
```

```gdscript
extends RefCounted

func play(target: CanvasItem):
	target.modulate = Color.RED
```

## Using your other scripts

In GDScript every `class_name` is global. In TypeScript you import the class first, and that import produces no GDScript, because `class_name` already makes it visible. Importing a `_Name` class gives a `preload`. Here `Unit` is a class of yours with a constructor and a `take_damage` method:

```ts nocheck
// src/units/soldier.ts
import { Unit } from './unit';
import { _HitFlash } from '../effects/hit_flash';

export class Soldier extends Unit {
  flash = new _HitFlash();

  constructor() {
    super(150);
  }

  take_damage(amount: int) {
    super.take_damage(amount);
    this.flash.play(this);
  }
}
```

```gdscript
class_name Soldier
extends Unit

const _HitFlash = preload("res://scripts/effects/hit_flash.gd")

var flash = _HitFlash.new()

func _init():
	super(150)

func take_damage(amount: int):
	super.take_damage(amount)
	self.flash.play(self)
```

`new _HitFlash()` becomes `_HitFlash.new()`, and `super.take_damage()` calls the parent's method as in GDScript.

A renamed import (`import { Unit as BaseUnit } from './unit'`) becomes a `preload` too, and extending a `_Name` class extends it by path: `extends "res://scripts/effects/hit_flash.gd"`. Default imports (`import Unit from …`) and `import * as` have no GDScript equivalent and are errors.

## Constructors

`constructor` becomes `_init`, with its parameters and defaults. `super(...)` is optional in a constructor, unlike in normal TypeScript: GDScript runs a parent `_init` only when you call it. Write `super(...)` only when a class of yours higher up has a constructor you want to run, as `Soldier` does above. Directly under an engine class (`Node`, `RefCounted`, …) leave it out, because Godot rejects that call.

TypeScript's parameter properties (`constructor(public hp: int)`) are not supported. Declare the field and assign it in the constructor.

## Abstract classes

`abstract class Weapon` gets `@abstract` above its `class_name`, and an `abstract fire(): void` method becomes `@abstract func fire() -> void`, a signature with no body.

## Details

The reference covers the rest: [anonymous classes](/typescript-to-gdscript/reference/transform-rules/#anonymous-classes-_filenameclass-convention), [imports](/typescript-to-gdscript/reference/transform-rules/#imports--preload), [`super`](/typescript-to-gdscript/reference/transform-rules/#super-calls), [`this` and `self`](/typescript-to-gdscript/reference/transform-rules/#this--self), [statics](/typescript-to-gdscript/reference/transform-rules/#constants-and-static-fields) and [abstract classes](/typescript-to-gdscript/reference/transform-rules/#abstract-classes).
