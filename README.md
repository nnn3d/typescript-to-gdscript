# typescript-to-gdscript

**[Documentation & playground](https://nnn3d.github.io/typescript-to-gdscript/)**

Write Godot 4 scripts in TypeScript. You get autocomplete and type-checking for the whole Godot API, errors in your editor as you type, and clean `.gd` files that Godot runs as usual.

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/convert.webp)

## Why

GDScript is great for getting things on screen, but its type system and tooling stay lightweight on purpose. As a project grows, TypeScript helps where GDScript doesn't:

- **Errors before you run the game.** A misspelled property, a wrong argument, a forgotten `null` check: the type checker flags it as you type.
- **The whole Godot API, typed.** Accurate completions and docs for every class, method, property and signal, plus node paths and resource paths typed from your project.
- **Safe refactoring.** Rename a method or change a signature, and your editor updates every use.

You still write GDScript, just in TypeScript syntax: Godot's API (`append`, not `push`), Godot's semantics, and an error for any TypeScript feature GDScript can't express. [Caveats](docs/guide/caveats.md) lists them.

The output is ordinary GDScript you can read and ship. TypeScript is only how you write it, not something Godot runs.

## Features

- **Type-safe Godot API** — all 900+ engine classes generated as `.d.ts` from the official Godot XML docs, with nullable reference types where appropriate
- **Live IDE diagnostics** — TypeScript language service plugin surfaces converter and Godot CLI errors as squiggles, on unsaved buffers
- **Watch mode** — auto-convert on save and keep typings in sync (it watches your `.tscn` scenes and assets too), then run a debounced full-project check (TypeScript + converter, and Godot when `godotPath` is set)
- **Source maps** — Godot script parse errors, runtime errors and stack traces map back to your TypeScript line/column
- **Scene and path typings** — `get_node()`, `get_parent()`, `get_child()`, `load()`, `preload()` and group queries typed from your project files
- **`gd` namespace** — strongly-typed helpers for GDScript-only constructs (signals, `match` patterns, getters/setters, operator overloading, raw GDScript)
- **Addons supported** — typings for third-party GDScript addons, consumable from TypeScript
- **GD → TS migration** — one-shot bulk converter for existing projects

### Showcase

<details>
<summary>Scene and path type hints</summary>

Given this scene structure:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_scene.png)

You get type hints for this:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_hint_1.png)

…or this:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_hint_2.png)

…or even this:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_hint_3.png)

`preload()` is typed too:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_preload.png)

</details>

<details>
<summary>GDScript and converter errors in TypeScript code</summary>

GDScript doesn't allow a static and an instance member to share the same name — though TypeScript does. Your IDE surfaces the GDScript error at the exact spot in your `.ts`:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_gdscript_error.png)

For edge cases — like using the result of `&&` as a value — you get a converter error instead, because logical operations in GDScript always return a boolean:

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/showcase_converter_error.png)

You also get all of these errors (along with the TypeScript errors themselves) from the `convert` CLI command.

</details>

## A taste

```ts
export class Player extends CharacterBody2D {
  health_changed = gd.signal<[health: int]>();

  @exports speed: float = 200.0;
  health: int = 100;

  _physics_process(delta: float) {
    let direction = Input.get_vector('ui_left', 'ui_right', 'ui_up', 'ui_down');
    this.velocity = gd.ops.mul(direction, this.speed);
    this.move_and_slide();
  }

  async take_damage(amount: int) {
    this.health -= amount;
    this.health_changed.emit(this.health);
    this.modulate = Color.RED;
    await this.get_tree().create_timer(0.2).timeout;
    this.modulate = Color.WHITE;
  }
}
```

```gdscript
class_name Player
extends CharacterBody2D

signal health_changed(health: int)
@export
var speed: float = 200.0
var health: int = 100

func _physics_process(delta: float):
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	self.velocity = (direction * self.speed)
	self.move_and_slide()

func take_damage(amount: int):
	self.health -= amount
	self.health_changed.emit(self.health)
	self.modulate = Color.RED
	await self.get_tree().create_timer(0.2).timeout
	self.modulate = Color.WHITE
```

Try more in the [playground](https://nnn3d.github.io/typescript-to-gdscript/playground/).

## Quick start

You need Node.js 22+ and Godot 4. In your Godot project folder:

```bash
npm install --save-dev typescript-to-gdscript
npx tstogd init
```

Then write `.ts` files in `src/`, run `npx tstogd watch`, and attach the generated `.gd` files from `scripts/` in Godot. The [Getting started](docs/guide/getting-started.md) guide walks through it step by step.

## Documentation

**Basics:** [Getting started](docs/guide/getting-started.md) · [How it works](docs/guide/how-it-works.md) · [Editor setup](docs/guide/editor-setup.md)

**Writing scripts:** [Scripts and classes](docs/guide/scripts-and-classes.md) · [Variables and types](docs/guide/variables-and-types.md) · [Functions and lambdas](docs/guide/functions-and-lambdas.md) · [Signals](docs/guide/signals.md) · [Nodes and scenes](docs/guide/nodes-and-scenes.md) · [Exports and annotations](docs/guide/exports-and-annotations.md) · [Coroutines](docs/guide/coroutines.md) · [Math and value types](docs/guide/math-and-value-types.md) · [Arrays and dictionaries](docs/guide/arrays-and-dictionaries.md) · [Enums, constants and inner classes](docs/guide/enums-constants-inner-classes.md)

**Going further:** [Migrating from GDScript](docs/guide/migrating-from-gdscript.md) · [Shared packages](docs/guide/shared-packages.md) · [Addons](docs/guide/addons.md) · [Custom Godot builds](docs/guide/custom-godot-builds.md) · [Escape hatches](docs/guide/escape-hatches.md) · [Caveats](docs/guide/caveats.md) · [FAQ](docs/guide/faq.md)

**Reference:** [Conversion rules](docs/reference/transform-rules.md) · [`gd` namespace](docs/reference/gd-helpers.md) · [CLI](docs/reference/cli.md) · [Configuration](docs/reference/configuration.md) · [Typings](docs/reference/typings.md) · [IDE integration](docs/reference/ide-integration.md)

## Contributing

Bug reports and ideas are welcome in [GitHub issues](https://github.com/nnn3d/typescript-to-gdscript/issues), and pull requests too. To set up a development environment, see [Development](docs/development.md).

## License

MIT
