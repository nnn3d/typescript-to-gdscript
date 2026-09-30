# Signals

In GDScript you declare a signal with `signal name(args)`. In TypeScript a signal is a class field created with `gd.signal`, and the argument list is a tuple type. Emitting, connecting and awaiting work the way you already know.

## Declaring a signal

```ts
export class Player extends CharacterBody2D {
  health_changed = gd.signal<[old_value: int, new_value: int]>();
  died = gd.signal();
}
```

```gdscript
class_name Player
extends CharacterBody2D

signal health_changed(old_value: int, new_value: int)
signal died
```

The labels in the tuple (`old_value`, `new_value`) become the argument names in GDScript. Leave the type argument out for a signal with no arguments.

> **Note:** Always label the tuple elements. Without labels (`gd.signal<[int, int]>()`) the arguments are named `arg1`, `arg2`, which is what the Godot editor then shows when you connect the signal.

## Emitting

Call `emit` with the arguments. TypeScript checks them against the tuple, so a wrong count or type is an error before you run the game.

```ts
export class Health extends Node {
  health_changed = gd.signal<[old_value: int, new_value: int]>();
  died = gd.signal();

  health: int = 100;

  take_damage(amount: int) {
    let old_value = this.health;
    this.health -= amount;
    this.health_changed.emit(old_value, this.health);
    if (this.health <= 0) {
      this.died.emit();
    }
  }
}
```

```gdscript
class_name Health
extends Node

signal health_changed(old_value: int, new_value: int)
signal died
var health: int = 100

func take_damage(amount: int):
	var old_value = self.health
	self.health -= amount
	self.health_changed.emit(old_value, self.health)
	if self.health <= 0:
		self.died.emit()
```

## Connecting

Pass a method or an arrow function to `connect`. Its parameters are checked against the signal. The optional second argument takes Godot's connect flags, such as `Object.CONNECT_ONE_SHOT`.

```ts
export class Spawner extends Node {
  @exports enemy_scene!: PackedScene;

  _ready() {
    let timer = new Timer();
    this.add_child(timer);
    timer.timeout.connect(this._on_timer_timeout);
    timer.start(2.0);

    this.get_tree().process_frame.connect(() => {
      print('first frame');
    }, Object.CONNECT_ONE_SHOT);
  }

  _on_timer_timeout() {
    this.add_child(this.enemy_scene.instantiate());
  }
}
```

```gdscript
class_name Spawner
extends Node

@export
var enemy_scene: PackedScene

func _ready():
	var timer = Timer.new()
	self.add_child(timer)
	timer.timeout.connect(self._on_timer_timeout)
	timer.start(2.0)
	self.get_tree().process_frame.connect(func():
		print("first frame")
		, Object.CONNECT_ONE_SHOT)

func _on_timer_timeout():
	self.add_child(self.enemy_scene.instantiate())
```

Engine signals (`timeout`, `pressed`, `body_entered`, …) are typed from the Godot API, so their handlers are checked too.

## Waiting for a signal

`await` on a signal pauses the method until the signal is emitted, as in GDScript. The result is what the signal was emitted with: `null` for no arguments, the value itself for one argument, and an array for more.

```ts
export class Door extends Node3D {
  opened = gd.signal();
  unlocked = gd.signal<[by: Node]>();

  async open_when_unlocked() {
    let who = await this.unlocked;
    print(who.name, ' unlocked the door');
    await this.get_tree().create_timer(0.5).timeout;
    this.opened.emit();
  }
}
```

```gdscript
class_name Door
extends Node3D

signal opened
signal unlocked(by: Node)

func open_when_unlocked():
	var who = await self.unlocked
	print(who.name, " unlocked the door")
	await self.get_tree().create_timer(0.5).timeout
	self.opened.emit()
```

TypeScript knows the result type too: `who` above is a `Node`. More about pausing methods in [Coroutines](./coroutines.md).

## Details

[`gd.signal` in the reference](../reference/gd-helpers.md#signals) covers the remaining cases, such as binding extra arguments with `bind()`.
