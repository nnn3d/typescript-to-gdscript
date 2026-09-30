# Migrating from GDScript

If your project already has GDScript, `tstogd initial-convert-gd-to-ts` converts all of it to TypeScript in one go. It gets you most of the way. Expect to fix some type errors by hand afterwards, because strict TypeScript catches things GDScript let through.

## Before you start

1. Commit your project, or back it up. After the migration, `tstogd convert` writes new `.gd` files over your original scripts.
2. Set up tstogd as in [Getting started](./getting-started.md). When `tstogd init` asks for the GDScript output directory, give the folder your scripts are in now, or `.` if they are spread around the project. The migration reads from that folder, and `convert` later writes back to the same paths, so your scenes keep pointing at the right scripts.

## Convert the project

```bash
npx tstogd initial-convert-gd-to-ts
```

Every `.gd` file under `gdDir` becomes a `.ts` file at the same relative path under `tsDir`. With the defaults, `scripts/world/level.gd` becomes `src/world/level.ts`. Scripts under `addons/` are left alone; tstogd generates [typings for addons](./addons.md) instead.

To convert only some files, list them:

```bash
npx tstogd initial-convert-gd-to-ts scripts/player.gd scripts/enemies/*.gd
```

The command never overwrites an existing `.ts` file. It lists the files it skipped and exits with an error. Pass `--force` to overwrite them, and with them any edits you made.

Here is a script before the migration:

```gdscript
class_name Player
extends CharacterBody2D

signal health_changed(old_value: int, new_value: int)

const SPEED = 200.0

@export var max_health: int = 100

var health: int = 100
var target: Node2D

func _physics_process(delta):
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = direction * SPEED
	move_and_slide()
```

And the TypeScript it becomes:

<!-- prettier-ignore -->
```ts nocheck
export namespace Player {
  export const SPEED = 200.0;
}

export class Player extends CharacterBody2D {
  health_changed = gd.signal<[int, int]>();
  @exports
  max_health: int = 100;
  health: int = 100;
  target: Node2D | null = null;

  _physics_process(delta: float) {
    let direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down");
    this.velocity = gd.ops.mul(direction, Player.SPEED);
    this.move_and_slide();
  }
}
```

The constant moved into a namespace, `delta` got its type from the engine's `_physics_process`, and the vector math became `gd.ops.mul`. A script without `class_name` becomes a class whose name starts with `_`, which is how tstogd marks a script with no global name.

## Check the result

1. Open the project in your editor and work through the TypeScript errors. The files are written even when they have type errors, so nothing blocks you; the errors are there for you to fix with real types.
2. Put the signal argument names back. The migration drops them: `health_changed` above became `gd.signal<[int, int]>()`, which converts back to `signal health_changed(arg1: int, arg2: int)`. Write `gd.signal<[old_value: int, new_value: int]>()` instead. See [Signals](./signals.md).
3. Run `npx tstogd convert`. It writes the new `.gd` files over your originals and reports what is still wrong. `git diff` on your scripts shows how they changed.
4. Run the game.

## What the migration fixes for you

After converting, tstogd type-checks the new files and patches the most common mismatches. These fixes always run:

- **Parameter types** of overridden engine methods (`_process(delta)` becomes `_process(delta: float)`) and of signal handlers connected in `.tscn` files.
- **Math on value types** becomes `gd.ops` calls, because TypeScript can't add two `Vector2`s with `+`.
- **Implicit conversions**, such as a `Vector2` passed where a `Vector2i` is expected, become explicit `gd.as(value, Vector2i)`.
- **Nullable types:** object-typed fields, parameters and return values become `T | null` where `null` can get in. An object field with no value gets `= null`, and one set in `_ready()` gets a `!`.
- **Imports** are added for the other classes of yours that a file uses.

For a looser first pass, add `--unsafe-use-any`. It uses `any` for types it can't work out and adds `!` wherever TypeScript says a value may be `null`. You get fewer errors, but also fewer checks, so fixing the types is the better long-term choice.

## What the converter refuses

A `break` inside a `match` branch is reported as an error, and that file is not written. In GDScript it leaves the surrounding loop; inside the `switch` that the branch becomes, it would only leave the branch. Restructure the loop by hand, with an early `return` or a flag that the loop condition checks.

> **Note:** Any file with a conversion error is skipped. Pass `--emit-on-error` to write it anyway, with the errors as comments in place, so you can fix it in the `.ts`.

## `match` becomes `switch`

The generated `switch` has no `break` in its cases, because a `match` branch never falls through; don't add them back. [`switch` on an enum](./enums-constants-inner-classes.md#switch-on-an-enum) shows how it converts, and the [reference](../reference/transform-rules.md#switch--match) covers empty branches and a `_` that isn't the last one.

## Custom engine classes

If your Godot build has classes the bundled typings don't know, pass the `godot-class-registry.json` you generated for it with `--registry`. See [Custom Godot builds](./custom-godot-builds.md#migrating-with-custom-classes).

## Details

The [`initial-convert-gd-to-ts` reference](../reference/cli.md#tstogd-initial-convert-gd-to-ts) lists every flag, and [`switch` → `match`](../reference/transform-rules.md#switch--match) covers how `switch` converts.
