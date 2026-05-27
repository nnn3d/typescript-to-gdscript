# typescript-to-gdscript

Convert TypeScript to GDScript for the Godot game engine, with source maps, a TypeScript language service plugin for live IDE diagnostics, and type-safe helpers.

## Features

- **TypeScript → GDScript converter** — AST-based conversion with source maps and an incremental cache that skips unchanged files
- **Live IDE diagnostics** — language service plugin surfaces converter and Godot errors as TypeScript squiggles on unsaved buffers
- **Watch mode** — auto-convert on file change, then run a debounced full-project diagnostic check (TypeScript + converter + Godot CLI)
- **Type-safe `gd` namespace** — strongly-typed helpers for GDScript-only constructs: signals, decorators, math operators, `eval`, advanced match patterns, `is`/`as`, getters/setters
- **Scene typings** — typed `get_node()`, `get_parent()`, `get_child()`, and group queries generated from `.tscn` files
- **Godot class typings** — full `.d.ts` for all Godot engine classes (916+) generated from Godot XML docs, with nullable reference types
- **GD → TS migration** — one-shot bulk conversion of existing GDScript projects, polished by 5 post-conversion helpers (operator fix, nullable widening, ready-field types, extends-type inference, signal-handler typing)
- **Godot addons support** — typings for third-party GDScript addons, consumable from TypeScript
- **External editor integration** — `tstogd open-editor` opens the source `.ts` when you double-click a `.gd` in Godot, with line/column remapped via source map

## Installation

### Prerequisites

- **Node.js 22+** — required (the package uses `require(esm)` semantics; earlier versions can't load the ESM plugin)
- **TypeScript >= 5.9** — installed automatically by `tstogd init`, or add it as a dev dependency yourself
- **Godot >= 4.6** — recommended on `PATH`, or reachable via `godotPath` in `tstogd.json` / the `GODOT_PATH` env var. Needed for full diagnostic checks and the language service plugin's Godot pass. Set `disableGodotLint: true` in `tstogd.json` to opt out.

### Install

```bash
yarn add typescript-to-gdscript
```

## Setup

### `tsconfig.json`

Add to your `tsconfig.json` to get type-checking and IDE autocomplete for Godot classes, `gd` helpers, and global types:

```json
{
  "compilerOptions": {
    "noLib": true,
    "strict": true,
    "noEmit": true,
    "types": []
  },
  "include": [
    "node_modules/typescript-to-gdscript/typings",
    "src/**/*.ts",
    "_typings/**/*.d.ts"
  ]
}
```

> **Note:** `noLib: true` disables standard TypeScript libs since GDScript uses a different runtime. The `include` array must reference the package typings directory. Adjust `src` and `_typings` paths to match your `tsDir` and `typingsDir`. Run `tstogd generate-typings` to populate the typings directory — the generated `_index.d.ts` includes a `/// <reference>` to the package typings so IDEs (WebStorm, Rider, VS Code) eagerly index all Godot classes for autocomplete.

This provides:

- All Godot engine classes (Node, Sprite2D, Vector2, etc.)
- Global functions (print, load, range, etc.)
- `gd` namespace helpers (signals, enums, math, decorators, type casting)
- Type aliases: `int`, `float`, `bool`, `StringName`, `NodePath`, `Dictionary<K, V>`

### `tstogd.json`

Create a `tstogd.json` in your project root:

```json
{
  "rootDir": "src",
  "outputDir": "scripts",
  "tsconfig": "tsconfig.json",
  "exclude": ["test/**", "**/*.test.ts"]
}
```

| Field        | Type       | Description                                                              |
| ------------ | ---------- | ------------------------------------------------------------------------ |
| `rootDir`    | `string`   | Root directory for TS source files.                                      |
| `outputDir`  | `string`   | Output directory for GDScript files.                                     |
| `typingsDir` | `string`   | Directory for generated typings. Relative to `rootDir`. Defaults to `"_gdtots"`. |
| `tsconfig`   | `string`   | Path to `tsconfig.json`.                                                 |
| `exclude`    | `string[]` | Glob patterns for files/folders to exclude. Uses [minimatch](https://github.com/isaacs/minimatch) syntax. |

For the full reference (`disableGodotLint`, `cacheDir`, `godotTypingsDir`, `converterOptions`, `helpers`), see [docs/configuration.md](docs/configuration.md).

### Quick init

Prefer an interactive scaffold? Run `tstogd init` — it creates `tstogd.json`, a Godot-ready `tsconfig.json` (with the ts-plugin pre-configured), installs TypeScript, and adds `node_modules/.gdignore`. See [docs/cli.md](docs/cli.md#tstogd-init) for details.

## CLI essentials

```bash
tstogd init           # interactive project setup (tsconfig + tstogd.json + ts-plugin)
tstogd convert        # convert TS → GD (cached, with diagnostic check)
tstogd watch          # auto-convert on change + debounced full check
tstogd generate-typings   # generate scene typings (.tscn.d.ts, .gd.d.ts)
tstogd clear-cache    # clear conversion cache
```

The full CLI reference — every command and every flag — is in [docs/cli.md](docs/cli.md). Specialized commands have their own docs:

- [`initial-convert-gd-to-ts`](docs/gd-to-ts-migration.md) — one-shot bulk migration of an existing GDScript project to TypeScript
- [`generate-gdscript-global-typings`](docs/typings.md#tstogd-generate-gdscript-global-typings), [`generate-addon-typings`](docs/typings.md#tstogd-generate-addon-typings), [`generate-class-typings`](docs/typings.md#tstogd-generate-class-typings) — typings generation
- [`open-editor`](docs/ide-integration.md#tstogd-open-editor) — Godot external-editor integration

## Transform rules

### File structure

Each `.ts` file must contain exactly one class. Named classes are available globally (generated via `generate-class-typings`).

### Types

- `int` and `float` are type aliases for `number`. Pure `number` converts to GDScript `float`.
- `undefined` is restricted — use `null`.
- `Dictionary<K, V>` has generic key/value types. Typed `get()`, `set()`, `keys()`, `values()`, etc. Untyped `Dictionary` defaults to `<unknown, unknown>`. `{}` object literals keep Dictionary methods via the `Object` interface.
- Optional property access is auto-converted: `obj.optionalProp` → `obj.get("optionalProp")` when the property type includes `undefined`. Element access `obj["key"]` with undefined type also converts to `obj.get("key")`. Skipped for chained access, calls, and class field access (always defined in GDScript).
- `var` is restricted — use `let` or `const` (both convert to GDScript `var`).
- `TSOnly<T>` wrapper type is stripped during transformation.
- `bool` is a type alias for `boolean` and also a cast function (`bool(x)` → GDScript `bool(x)`).
- `String` is also a cast function (`String(x)` → GDScript `String(x)`).

### Constructor

TypeScript `constructor()` maps to GDScript `_init()`.

### Comments

- `//` → `#`
- `/** */` → `##`

### Async/Await

`async` keyword is stripped (GDScript coroutines use `await` without `async`).

### Self

- TS `this.method()` → GD `method()` (for own/inherited methods)
- TS `this.property` → GD `property` or `self.property`

### Logical operators (`||` / `&&`)

GDScript `or`/`and` return `bool`, unlike JavaScript/TypeScript where `||`/`&&` return one of the operands. The converter handles this difference in both directions:

**TS-to-GD**: When `||`/`&&` is used as a non-boolean value (assigned, passed as argument, returned), the converter reports an error with two suggested fixes:
- Wrap in `bool()` to accept the boolean result: `let x = bool(a || b)`
- Use a ternary for value coalescing: `let x = a ? a : b`

The error is suppressed when the expression is in a boolean context (if/while condition, negation, nested in another logical operator, or already wrapped in `bool()`).

**GD-to-TS**: When `or`/`and` is used as a value in GDScript, the converter auto-wraps the expression in `bool()` to preserve correct semantics:
```
# GDScript
var x = a or b
# becomes TypeScript
let x = bool(a || b)
```

The `bool()` wrapper is skipped when the expression is already boolean (composed of comparisons, logical operators, or boolean literals).

## Anonymous classes (`_FilenameClass` convention)

A `.gd` file with no `class_name` declaration has no global identifier in Godot. On the TS side this project models such files with a class whose name starts with `_` and matches the file's basename in UpperCamelCase — `some_class.gd` → `_SomeClass`, `Anonym.gd` → `_Anonym`. The leading underscore is the marker.

A TS class named `_Foo` produces a `.gd` file with no `class_name`.

For addon-mode behaviour (the `_$CLASS$_` sentinel) and the `_Foo` → `G_Foo` escape used when migrating GDScript files that already declare `class_name _Foo`, see [docs/configuration.md](docs/configuration.md#anonymous-classes--advanced-details).

## Imports → preload consts

When the TS→GD converter sees an `import` statement, it emits one of the following:

| TS import                                       | GD output                                            | Why                                                 |
| ----------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `import { Foo } from './foo.ts'` (no rename)    | _(nothing — skipped)_                                | `Foo` is global in GD via `class_name Foo`          |
| `import { Foo as Bar } from './foo.ts'`         | `const Bar = preload("res://foo.gd")`                | Local alias must point at the script               |
| `import { _Anon } from './anon.ts'`             | `const _Anon = preload("res://anon.gd")`             | Anonymous class — only reachable via path           |
| `extends _Anon` (after the import above)        | `extends "res://anon.gd"`                            | GDScript form for inheriting an anonymous script    |
| `extends preload("res://some.gd")`              | `extends "res://some.gd"`                            | Direct path-extends form (round-trips both ways)    |
| `import type { … } from '…'`                    | _(nothing — type-only, erased)_                      |                                                     |
| `import Foo from '…'` (default)                 | **error**                                            | No GDScript equivalent                              |
| `import * as ns from '…'` (namespace)           | **error**                                            | No GDScript equivalent                              |

The converter also raises a hard error when a class field's name collides with an imported local — the emitted `const` would shadow the field.

## `gd` namespace helpers

- **Signals** — `gd.signal<[int, int]>()` declares typed signals
- **Enums** — native TS `enum` lifts into the GDScript class as `enum Name { … }`
- **Math operations** — `gd.ops.add/sub/mul/div/rem/eq/ne/gt/...` for operator overloading on value types
- **Type casting (`as`)** — `gd.as(value, Target)` for class casts (returns `T | null`) and variant conversions (Vector2 ↔ Vector2i, packed arrays ↔ Array, …)
- **Raw GDScript (`eval`)** — `gd.eval('var a = 10')` or `// @gd.eval:` magic comments to inject GDScript that has no TS equivalent
- **Match statement** — native `switch` for simple patterns; `gd.match()` for advanced patterns (arrays, dicts, guards, bindings)
- **Decorators** — `@gd.export`, `@gd.export_range`, `@gd.onready`
- **Getters/setters** — native TS `get`/`set` for simple cases; `gd.getset()` for defaults and `get = fn_name` function-reference form
- **Type checking (`is`)** — `instanceof` for class types; `gd.is(x, int)` for primitive types
- **`StringName` / `NodePath`** — `StringName('my_signal')`, `NodePath('Path/To/Node')`

Full semantics, rules, and edge cases live in [docs/gd-helpers.md](docs/gd-helpers.md).

## Documentation

- [Configuration](docs/configuration.md) — full `tstogd.json` options and advanced anonymous-class details
- [CLI reference](docs/cli.md) — every command and every flag
- [`gd` namespace](docs/gd-helpers.md) — full helper API and rules
- [GD-to-TS migration](docs/gd-to-ts-migration.md) — `initial-convert-gd-to-ts` and the post-conversion helpers
- [Typings & scene typings](docs/typings.md) — `generate-*` commands and the typings tree layout
- [IDE integration](docs/ide-integration.md) — TypeScript language service plugin and `open-editor`
- [Development](docs/development.md) — building, testing, regenerating Godot typings

## License

MIT
