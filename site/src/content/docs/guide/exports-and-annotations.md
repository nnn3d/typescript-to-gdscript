---
title: 'Exports and annotations'
description: 'GDScript annotations (@export_range, @onready, @tool, …) are TypeScript decorators with the same names. The one exception is @export itself, which you write…'
---

GDScript annotations (`@export_range`, `@onready`, `@tool`, …) are TypeScript decorators with the same names. The one exception is `@export` itself, which you write as `@exports`.

```ts
@tool
@icon('res://icons/turret.svg')
export class Turret extends Node2D {
  @export_group('Combat')
  @exports
  damage: int = 10;
  @export_range(0.1, 5.0, 0.1) fire_rate: float = 1.0;
  @export_enum('Bullet', 'Laser', 'Rocket') ammo: int = 0;

  @export_group('Scene')
  @exports
  bullet_scene!: PackedScene;
  @exports target: Node2D | null = null;
  @export_multiline() notes: string = '';

  @onready muzzle = gd.as(this.get_node('Muzzle'), Marker2D);
}
```

```gdscript
@tool
@icon("res://icons/turret.svg")
class_name Turret
extends Node2D

@export_group("Combat")
@export
var damage: int = 10
@export_range(0.1, 5.0, 0.1)
var fire_rate: float = 1.0
@export_enum("Bullet", "Laser", "Rocket")
var ammo: int = 0
@export_group("Scene")
@export
var bullet_scene: PackedScene
@export
var target: Node2D = null
@export_multiline
var notes: String = ""
@onready
var muzzle = self.get_node("Muzzle") as Marker2D
```

Every annotation Godot knows is available, with its arguments checked by TypeScript. Each one goes on its own line in the `.gd`, right above what it annotates.

## Why `@exports`

`export` is a reserved word in TypeScript, so `@export` doesn't even parse. Write `@exports`, plural; it goes out as `@export`. All other annotations keep their Godot names: `@export_range`, `@export_file`, `@export_group` and so on.

> **Note:** An annotation whose arguments are all optional needs empty parentheses when you pass none: `@export_multiline()`, `@export_file()`, `@rpc()`. Without them TypeScript reports an error about the decorator's return type. The `.gd` gets the bare `@export_multiline`. Annotations that never take arguments, such as `@exports`, `@onready` and `@tool`, are written without parentheses.

## Exports without a default

An export the inspector fills in, like `bullet_scene` above, needs no value in the code: mark it with `!`, or use `| null = null` when it may be left empty, as [Variables and types](/typescript-to-gdscript/guide/variables-and-types/#fields-without-an-initializer) explains.

## `@onready`

`@onready` works as in GDScript: the initializer runs just before `_ready()`, when the child nodes exist. With [scene typings](/typescript-to-gdscript/guide/nodes-and-scenes/), `this.get_node()` already has the right type, so you can write `@onready sprite: Sprite2D = this.get_node('Sprite2D');`. Without them, cast the node with `gd.as` as above.

## Class annotations

`@tool`, `@icon(...)` and `@static_unload` go above the class, and come out above `class_name`. You don't need `@abstract`: an `abstract class` gets it automatically (see [Scripts and classes](/typescript-to-gdscript/guide/scripts-and-classes/#abstract-classes)).

## Method and statement annotations

Annotations such as `@rpc` and `@warning_ignore` work on methods too:

```ts
export class Lobby extends Node {
  @rpc('any_peer', 'call_local')
  ping(from: int) {
    print('ping from ', from);
  }

  @warning_ignore('unused_parameter')
  _process(delta: float) {
    print('tick');
  }
}
```

```gdscript
class_name Lobby
extends Node

@rpc("any_peer", "call_local")
func ping(from: int):
	print("ping from ", from)

@warning_ignore("unused_parameter")
func _process(delta: float):
	print("tick")
```

A decorator can't go on a statement inside a function; there you write the annotation in a `// @gd.eval:` comment, as [Escape hatches](/typescript-to-gdscript/guide/escape-hatches/#the--gdeval-comment) shows.

## Details

See [decorators and annotations](/typescript-to-gdscript/reference/transform-rules/#decorators-and-annotations) in the reference, and [`gd.eval`](/typescript-to-gdscript/reference/gd-helpers/#raw-gdscript-eval) for the magic comment.
