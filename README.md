# typescript-to-gdscript

Write Godot 4 scripts in TypeScript. Get autocomplete and type-checking for the full Godot API, live IDE squiggles from the converter and Godot CLI, and clean `.gd` output with source maps so stack traces still point at your `.ts`.

![](https://raw.githubusercontent.com/nnn3d/typescript-to-gdscript/HEAD/docs/assets/convert.webp)

> Have an existing GDScript project? Bulk-convert it to TypeScript with [tstogd initial-convert-gd-to-ts](docs/gd-to-ts-migration.md).

## Why

GDScript is great for getting things on screen, but its type system and tooling are intentionally lightweight. The bigger a project gets, the more that costs you: typos surface at runtime, refactors are risky, and autocomplete only goes so far. TypeScript was built for exactly this problem, and it has had a decade of investment poured into making large codebases safe to change.

This project lets you **write GDScript-shaped code in TypeScript** — same engine semantics, same API, same mental model — while gaining the things TypeScript does better:

- **Catch errors before you run the game.** A misspelled property, a wrong argument type, a `null` you forgot to check — the type checker flags it as you type, not three scenes deep into playtesting.
- **Autocomplete and inline docs for the entire Godot API.** All 916+ engine classes are fully typed, so you get accurate completions, signatures, and hover docs for every method, property, and signal.
- **Refactor with confidence.** Rename a method, change a signature, find every usage — TypeScript's tooling makes project-wide changes safe and mechanical instead of a manual grep-and-pray.
- **Scene-aware typing.** `get_node("Player/Sprite")` returns the _actual_ node type from your `.tscn`, group queries return typed arrays, and `res://` paths are checked against files that really exist.
- **Use the editor you already know.** WebStorm, Rider, VS Code — any TS-capable IDE gives you first-class diagnostics, navigation, and formatting out of the box.

The output is clean, idiomatic `.gd` you can read and ship — TypeScript is the authoring layer, not a runtime dependency. The philosophy is **"write like GDScript, but with strong types, linting, and autocomplete"**: only GDScript-supported features and API are exposed, and TS-only constructs that have no Godot equivalent are deliberately restricted.

## Main features

- **Type-safe Godot API** — all 900+ engine classes generated as `.d.ts` from the official Godot XML docs, with nullable reference types where appropriate
- **Live IDE diagnostics** — TypeScript language service plugin surfaces converter and Godot CLI errors as squiggles, on unsaved buffers
- **Watch mode** — auto-convert on save, then run a debounced full-project check (TypeScript + converter + Godot CLI)
- **Source maps** — Godot script parse errors, runtime errors and stack traces map back to your TypeScript line/column
- **Scene and path typings** — `get_node()`, `get_parent()`, `get_child()`, `load()`, `preload()` and group queries typed from your project files
- **`gd` namespace** — strongly-typed helpers for GDScript-only constructs (signals, decorators, match, operator overloading)
- **Addons supported** — typings for third-party GDScript addons, consumable from TypeScript
- **GD → TS migration** — one-shot bulk converter for existing projects

## Quick start

```bash
npm install typescript-to-gdscript # or another preferred package manager
tstogd init # interactive: writes tstogd.json + tsconfig.json + installs typescript
```

Then:

1. Write a `.ts` class in your TS source dir (default `src/`).
2. `tstogd convert` — emits `.gd` files into your output dir (default `scripts/`).
3. Attach the `.gd` file in Godot as you normally would. Configure Godot's external editor to point at your IDE for TS language server and one-click jump-to-source ([guide](docs/ide-integration.md)).

Use `tstogd watch` during development for auto-conversion plus live diagnostics.

### Requirements

- **Node.js 22+** — required (the package uses `require(esm)` semantics; older Node can't load the ESM plugin)
- **TypeScript ≥ 5.9** — installed automatically by `tstogd init`, or add it as a dev dependency yourself
- **Godot ≥ 4.0** — recommended on `PATH`, or set `godotPath` / `GODOT_PATH`. Needed for the Godot diagnostic pass. Set `disableGodotLint: true` in `tstogd.json` to opt out.

### Manual setup (without `tstogd init`)

Setup `tstogd.json` and `tsconfig.json` in your project - for full template and field reference see [docs/configuration.md](docs/configuration.md).

## CLI

```bash
tstogd init                # interactive scaffold (tsconfig + tstogd.json + ts-plugin)
tstogd convert             # convert TS → GD (cached, with diagnostic check)
tstogd watch               # auto-convert on change + debounced full check
tstogd generate-typings    # generate scene + script typings
tstogd clear-cache         # clear conversion cache
```

Full reference in [docs/cli.md](docs/cli.md). Specialized commands:

- [`initial-convert-gd-to-ts`](docs/gd-to-ts-migration.md) — bulk migration of an existing GDScript project to TypeScript
- [`generate-gdscript-global-typings`](docs/typings.md#tstogd-generate-gdscript-global-typings), [`generate-addon-typings`](docs/typings.md#tstogd-generate-addon-typings) — typings generation
- [`open-editor`](docs/ide-integration.md#tstogd-open-editor) — Godot external-editor integration

## Writing code

### One class per file

Each `.ts` file must contain exactly one class. Named classes (`class Foo`) are global in GDScript via `class_name Foo`. Classes whose name starts with `_` (e.g. `_Foo`) emit anonymous `.gd` files reachable only via `preload(...)` (see [docs/transform-rules.md#anonymous-classes](docs/transform-rules.md#anonymous-classes-_filenameclass-convention) for more information).

### Types

- `int`, `float` — type aliases for `number`. Plain `number` converts to GDScript `float`.
- `bool` — alias for `boolean`, also a cast: `bool(x)` → GDScript `bool(x)`. Same for `String(x)`.
- `Dictionary<K, V>` — generic, with typed `get` / `set` / `keys` / `values`. `{}` literals keep dictionary methods via the `Object` interface. Untyped `Dictionary` is `<unknown, unknown>`.
- `let` and `const` both convert to GDScript `var`. **Use `let`** — TS `var` is restricted (GDScript `var` ≈ TS `let`, not TS `var`).
- `undefined` is restricted — use `null`. Optional property access (`obj.foo` where the type includes `undefined`) auto-converts to `obj.get("foo")`. Same for `obj["key"]` with an undefined type. Class-field access stays direct.
- `TSOnly<T>` — type-level wrapper, stripped at conversion.

For comments, async, `this` / `self`, logical operators, and constructor mapping, see [docs/transform-rules.md](docs/transform-rules.md).

## Cheat sheet

Cheat sheet with all basics to write scripts, with comments showing the generated GDScript. For advanced helpers and deep dive, see the [**full cheat sheet** in docs/transform-rules.md](docs/transform-rules.md#full-cheat-sheet).

```typescript
// ── Inner classes, class-level constants & enums (namespace merging) ──
// A `namespace Player { ... }` block paired with the same-named class
// lifts each `export`ed member into the class as a nested member.
// Put constants and enums INSIDE the namespace — that's how GD
// class-level `const` and `enum` are declared.
export namespace Player {
  export const MAX_HP = 100; // → const MAX_HP = 100   (on Player)

  export enum State {
    IDLE,
    RUNNING,
  } // → enum State { ... }   (on Player)

  export class Bullet extends Node2D {
    // → class Bullet extends Node2D:
    damage: int = 10; //       var damage: int = 10
  }
}

export class Player extends CharacterBody2D {
  // ── Statics (mutable) — for constants, use the namespace block above ──
  static MAX_INSTANCES = 8; // → static var MAX_INSTANCES = 8
  // `readonly` is a TS-only contract — emits a plain `var` on GD.

  // ── Field decorators ─────────────────────────────────────────────
  // Every Godot annotation works as a decorator.
  // `@exports` is the only special alias:
  // `@export` is a TS reserved word, so the plural form emits
  @exports speed: float = 200.0; // → @export var speed: float = 200.0
  @export_range(0, 100) health: int = 100; // → @export_range(0, 100) var health: int = 100
  @onready sprite: Sprite2D; // → @onready var sprite: Sprite2D

  // ── Signals — named tuple labels become GD arg names ─────────────
  health_changed = gd.signal<[from: int, to: int]>(); // → signal health_changed(from: int, to: int)
  died = gd.signal(); // → signal died

  // ── Constructor → _init ──────────────────────────────────────────
  constructor(speed: float = 200.0) {
    // → func _init(speed: float = 200.0):
    this.speed = speed; //       self.speed = speed
  }

  // ── Getters / setters — native TS accessors ──────────────────────
  get score(): int {
    return this.score;
  } // → var score: int:
  set score(v: int) {
    this.score = v;
  } //       get: return score
  //       set(value): score = value

  // ── Async / await — Promise<T> unwraps to T on the GD side ───────
  async long_task(): Promise<int> {
    // → func long_task() -> int:
    await this.get_tree().create_timer(1).timeout;
    return 42;
  }

  _process(delta: float) {
    // → func _process(delta: float):
    // ── Operators ──────────────────────────────────────────────────
    let eq = this.health === 0; // → var eq      = self.health == 0
    let ternary = eq ? 1 : 2; // → var ternary = 1 if eq else 2

    // ── Math on value types (Vector2, Color, …) needs gd.ops ───────
    let pos = gd.ops.add(this.position, Vector2(1, 0)); // → var pos = (self.position + Vector2(1, 0))
    // Available: add, sub, mul, div, rem, eq, ne, gt, gte, lt, lte, plus (unary), minus (unary)

    // ── Type casting / checking ────────────────────────────────────
    let body = gd.as(this.get_node('Body'), CharacterBody2D); // → var body = self.get_node("Body") as CharacterBody2D
    if (body instanceof CharacterBody2D) {
      /* class check */
    } // → if body is CharacterBody2D:
    if (gd.is(this.health, int)) {
      /* primitive   */
    } // → if self.health is int:

    // ── Object construction ────────────────────────────────────────
    let bullet = new Player.Bullet(); // → var bullet = Bullet.new()

    // ── Dictionaries (string keys — for non-string keys use gd.dict) ──
    let stats = { name: 'Hero', hp: 100 }; // → var stats = { "name": "Hero", "hp": 100 }

    // ── Strings, StringName, NodePath ──────────────────────────────
    let greet = `Hi ${this.name}!`; // → var greet = "Hi " + str(self.name) + "!"
    let path = NodePath('Body/Sprite'); // → var path  = ^"Body/Sprite"
    let sig = StringName('died'); // → var sig   = &"died"

    // ── Control flow ───────────────────────────────────────────────
    for (let s of range(3)) print(s); // → for s in range(3): print(s)

    // ── Match — native TS switch round-trips with GD `match` ───────
    switch (
      this.health // → match self.health:
    ) {
      case 0:
        this.died.emit();
        break; //       0: self.died.emit()
      default:
        print('alive');
        break; //       _: print("alive")
    }
  }

  _ready() {
    // → func _ready():
    // Signals — emit and connect
    this.health_changed.emit(0, 100); // → self.health_changed.emit(0, 100)
    this.health_changed.connect(this._on_health_changed);
  }

  _on_health_changed(from: int, to: int) {
    /* ... */
  }
  die() {
    /* ... */
  }
}
```

#### Useful global types

Each interface is a map from a string literal (a `res://` path or a group name) to the typed entity that path resolves to. You index them directly to get the typed value:

| Interface          | Keys                                                         | Values                                                                                                                                            | Example                                                          |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `GodotResources`   | every asset path (`.tscn`, `.gd`, `.tres`, images, audio, …) | The resource type the path resolves to — `PackedScene<Root>` for scenes, `typeof Class` for scripts, the concrete `Resource` subclass for `.tres` | `let mat: GodotResources["res://player_material.tres"]`          |
| `GodotScripts`     | `.gd` script paths                                           | `typeof <Class>` — the class constructor for the script                                                                                           | `const GameManager: GodotScripts["res://GameManager.gd"]`        |
| `GodotScenes`      | `.tscn` paths                                                | The **root node** type of the scene (with full tree attached)                                                                                     | `let root: GodotScenes["res://Level.tscn"]`                      |
| `GodotSceneTrees`  | `.tscn` paths                                                | The **tree** type — used when you need to index descendants directly                                                                              | `type Tree = GodotSceneTrees["res://Player.tscn"]`               |
| `GodotGroups`      | group names declared in `.tscn` files                        | `{ [scenePath]: union of node types in that group }`                                                                                              | `GodotGroups["enemies"]["res://Level.tscn"]` → `Goblin \| Slime` |
| `GodotConnections` | scene paths that have `[connection]` entries                 | `{ "Node.signal": _GDSignalConnection<…> }` — connection metadata                                                                                 | `GodotConnections["res://UI.tscn"]["Button.pressed"]`            |

The Godot-typed `load()`, `preload()`, `get_node()`, and autoload singletons all index these interfaces under the hood.

#### The `*Name` key-union aliases

Each base interface has a parallel alias defined as `keyof <Interface>`, so you can constrain a function argument to **only paths/names that exist in the project**:

| Alias                      | Equivalent to            | Typical use                                                             |
| -------------------------- | ------------------------ | ----------------------------------------------------------------------- |
| `GodotResourceName`        | `keyof GodotResources`   | `res://…` to any asset                                                  |
| `GodotSceneName`           | `keyof GodotScenes`      | `res://…` to a `.tscn`                                                  |
| `GodotSceneTreeName`       | `keyof GodotSceneTrees`  | Same set as `GodotSceneName`; pick when you want the tree, not the root |
| `GodotScriptName`          | `keyof GodotScripts`     | `res://…` to a `.gd`                                                    |
| `GodotGroupName`           | `keyof GodotGroups`      | Group identifier (`"enemies"`, `"entities"`, …)                         |
| `GodotConnectionSceneName` | `keyof GodotConnections` | Scene paths that have `[connection]` entries                            |

`keyof` is resolved lazily, so each alias automatically picks up new entries as more files are converted. Typos in resource paths or group names become compile-time errors instead of silent runtime failures:

```typescript
class AssetLoader extends Node {
  preload_asset(path: GodotResourceName) {
    return load(path);
  }

  count_in_group(group: GodotGroupName): int {
    return this.get_tree().get_nodes_in_group(group).size();
  }

  _ready() {
    this.preload_asset('res://Player.tscn'); // ✅ typed
    this.preload_asset('res://does_not_exist.png'); // ❌ TS2345
    this.count_in_group('enemies'); // ✅ typed
    this.count_in_group('typo'); // ❌ TS2345
  }
}
```

### What's not supported

Destructuring, `for...in`, `??`, `?.`, spread in calls, top-level `let`/`const`, multiple classes per file, `undefined` types, string enums, `Promise.then`/`.catch`/`.finally`. Full list with reasons: [docs/transform-rules.md#restrictions](docs/transform-rules.md#restrictions--unsupported-typescript-features).

## Documentation

- [Configuration](docs/configuration.md) — full `tstogd.json` and `tsconfig.json` reference, advanced anonymous-class details
- [Transform rules](docs/transform-rules.md) — primitive types, operators, comments, async / Promise, Callables, constants & statics, enums, inner classes, decorators / `@exports`, abstract classes, signals, GD-side shorthand literals (`$`, `%`, `&`, `^`), `super`, member ordering, logical operators, anonymous classes, imports, **restrictions / unsupported TS features**
- [CLI reference](docs/cli.md) — every command and every flag
- [`gd` namespace](docs/gd-helpers.md) — full helper API and rules
- [GD-to-TS migration](docs/gd-to-ts-migration.md) — `initial-convert-gd-to-ts` and the post-conversion helpers
- [Typings & scene typings](docs/typings.md) — `generate-*` commands and the typings tree layout
- [IDE integration](docs/ide-integration.md) — TypeScript language service plugin and `open-editor`
- [Development](docs/development.md) — building, testing, regenerating Godot typings

## FAQ

<details>
<summary>Something converts the wrong way — not how I want it. What can I do?</summary>

You have a few escape hatches, in order of preference:

- **Inject raw GDScript** with [`gd.eval(...)`](docs/gd-helpers.md#raw-gdscript-eval) for expressions/statements, or the `// @gd.eval:` magic comment for places where a call doesn't fit (before the class, between members, as a statement-level annotation). The string is emitted verbatim into the `.gd`.
- **Keep that file as hand-written GDScript.** Place the `.gd` outside your `gdDir` so the converter never overwrites it, and write a `.d.ts` next to it (or in your typings dir) so TypeScript still sees a typed view of the class. The rest of your project keeps importing it normally.

Either way, **please open a GitHub issue** with a small before/after example — most conversion gaps are fixable, and a real case is the fastest way to get it handled.

</details>

<details>
<summary>An addon's generated typings are wrong. How do I fix them?</summary>

Addon typings are produced by automatic GD→TS conversion, which can't always get a third-party addon perfect. To fix it:

1. Move that addon's generated typings **out of** the auto-generated typings folder (so a re-run won't regenerate over your edits).
2. Fix the `.ts` / `.d.ts` by hand.
3. Add the addon to `exclude` in `tstogd.json` so it's skipped on future runs.

And again — **open a GitHub issue** so the addon-conversion path can be improved for your case.

</details>

<details>
<summary>I'm on an older/newer Godot version with different built-in class signatures.</summary>

The package ships typings for one stock Godot version. If your engine's built-in classes differ (older release, newer release, a fork, or custom C++ modules), generate typings that match your build with [`tstogd generate-gdscript-global-typings`](docs/typings.md#tstogd-generate-gdscript-global-typings) and point your project at them. The [custom-build walkthrough](docs/typings.md#using-it-for-a-custom-godot-build) covers the `tsconfig.json` + `tstogd.json` wiring step by step.

</details>

<details>
<summary>I hit another problem, or have a suggestion.</summary>

**Open a GitHub issue** — bug reports and feature ideas are both welcome. PRs are very welcome too; see [docs/development.md](docs/development.md) to get a dev environment running.

</details>

## License

MIT
