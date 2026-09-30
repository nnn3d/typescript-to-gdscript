# Math and value types

`Vector2`, `Vector3`, `Color`, `Rect2`, `Transform2D` and Godot's other value types work as in GDScript: you create them by calling the type, read and write their components, and call their methods. The one difference is arithmetic. TypeScript has no operator overloading, so `+`, `-`, `*` and `/` on these types go through `gd.ops`, and the `.gd` gets the plain operators back.

```ts
export class Mover extends Node2D {
  speed: float = 120.0;
  target: Vector2 = Vector2(400, 300);

  _process(delta: float) {
    let to_target = gd.ops.sub(this.target, this.position);
    if (to_target.length() > 1.0) {
      let step = gd.ops.mul(to_target.normalized(), this.speed * delta);
      this.position = gd.ops.add(this.position, step);
    }
  }
}
```

```gdscript
class_name Mover
extends Node2D

var speed: float = 120.0
var target: Vector2 = Vector2(400, 300)

func _process(delta: float):
	var to_target = (self.target - self.position)
	if to_target.length() > 1.0:
		var step = (to_target.normalized() * (self.speed * delta))
		self.position = (self.position + step)
```

The parentheses keep the order of operations exactly as you wrote it. Plain numbers (`this.speed * delta`) need no helper.

## Creating values

Call the type, as in GDScript. There is no `new`: `new Vector2(1, 2)` is a TypeScript error. Constants such as `Vector2.ZERO` and `Color.RED` are there too.

```ts
export class Paddle extends Node2D {
  tint: Color = Color(1.0, 0.5, 0.0);

  _ready() {
    this.position = Vector2.ZERO;
    this.position.x += 20;
    this.modulate = this.tint.lerp(Color.RED, 0.5);
  }
}
```

```gdscript
class_name Paddle
extends Node2D

var tint: Color = Color(1.0, 0.5, 0.0)

func _ready():
	self.position = Vector2.ZERO
	self.position.x += 20
	self.modulate = self.tint.lerp(Color.RED, 0.5)
```

> **Note:** Value types are copied when you assign them, as in GDScript, even though TypeScript sees them as objects. `let p = this.position; p.x = 100;` changes only `p`; write `this.position = p;` afterwards, or change `this.position.x` directly.

## Arithmetic with `gd.ops`

| Helper                                      | GDScript                                   |
| ------------------------------------------- | ------------------------------------------ |
| `gd.ops.add(a, b)`, `sub`, `mul`, `div`     | `(a + b)`, `(a - b)`, `(a * b)`, `(a / b)` |
| `gd.ops.rem(a, b)`                          | `(a % b)`                                  |
| `gd.ops.minus(a)`, `gd.ops.plus(a)`         | `(-a)`, `(+a)`                             |
| `gd.ops.eq`, `ne`, `lt`, `lte`, `gt`, `gte` | `==`, `!=`, `<`, `<=`, `>`, `>=`           |

The helpers are typed from Godot's own operator list, so the result has the right type (`Vector2` times `float` is a `Vector2`), and a pair Godot can't combine is an error in your editor. They work for every type with operators: `gd.ops.mul(this.transform, point)` transforms a point, and `gd.ops.add(a, b)` joins two arrays.

`gd.ops.rem` is the `%` for vectors, such as `gd.ops.rem(Vector2i(7, 9), 4)`. For plain numbers, write `%` as usual.

## Comparing values

Comparisons need no helper. `===` and `!==` become `==` and `!=`, which compare value types by their contents: `offset === Vector2.ZERO` checks whether `offset` is a zero vector. `gd.ops.eq` and the other comparison helpers give the same result.

## `int` and `float`

TypeScript has one number type. The typings add `int` and `float` as names for it, and your annotation decides the GDScript type: `hp: int` becomes `var hp: int`, `speed: float` becomes `var speed: float`. Plain `number` becomes `float`. `int(x)` and `float(x)` convert, as in GDScript.

Because TypeScript can't tell `int` from `float`, it can't warn you about integer division. The `.gd` does what GDScript does:

```ts
export class Loot extends Node {
  _ready() {
    let coins: int = 7;
    let per_player = coins / 2;
    let exact = coins / 2.0;
    let also_exact = float(coins) / 2;
  }
}
```

```gdscript
class_name Loot
extends Node

func _ready():
	var coins: int = 7
	var per_player = coins / 2
	var exact = coins / 2.0
	var also_exact = float(coins) / 2
```

`per_player` is `3`, not `3.5`: both sides are integers. Make one side a float to get `3.5`. For the remainder of floats use `fmod`, as GDScript's `%` fails on a float.

## Math functions

Godot's global math functions are there under their usual names: `clampf`, `lerp`, `lerp_angle`, `move_toward`, `absf`, `randf_range`, `deg_to_rad`, and constants like `PI`.

```ts
export class Runner extends CharacterBody2D {
  health: float = 100.0;

  _physics_process(delta: float) {
    let speed = Input.get_axis('ui_left', 'ui_right') * 300.0;
    this.velocity.x = move_toward(this.velocity.x, speed, 1200.0 * delta);
    this.health = clampf(this.health + 5.0 * delta, 0.0, 100.0);
    this.move_and_slide();
  }
}
```

```gdscript
class_name Runner
extends CharacterBody2D

var health: float = 100.0

func _physics_process(delta: float):
	var speed = Input.get_axis("ui_left", "ui_right") * 300.0
	self.velocity.x = move_toward(self.velocity.x, speed, 1200.0 * delta)
	self.health = clampf(self.health + 5.0 * delta, 0.0, 100.0)
	self.move_and_slide()
```

Vectors and colors have their methods as well: `length()`, `normalized()`, `distance_to()`, `move_toward()`, `lerp()`, and so on.

## Details

[Math operations](../reference/gd-helpers.md#math-operations), [operators](../reference/transform-rules.md#operators) and [primitive types](../reference/transform-rules.md#primitive-types--case-mapping) in the reference.
