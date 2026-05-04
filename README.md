# typescript-to-gdscript

Convert TypeScript to GDScript for the Godot game engine, with source maps, a TypeScript language service plugin for live IDE diagnostics, and type-safe helpers.

## Philosophy

Write GDScript logic using TypeScript syntax with strong type support, linting, and IDE autocomplete. Only features and APIs supported in GDScript are supported by the converter — for GDScript-specific constructs not available in TypeScript, use the `gd` namespace helpers.

## Installation

```bash
yarn add typescript-to-gdscript
```

## Setup

### Godot Typings

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

### Configuration: `tstogd.json`

Create a `tstogd.json` in your project root to configure the converter:

```json
{
  "rootDir": "src",
  "outputDir": "scripts",
  "tsconfig": "tsconfig.json",
  "exclude": ["test/**", "**/*.test.ts"]
}
```

| Field              | Type       | Description                                                              |
| ------------------ | ---------- | ------------------------------------------------------------------------ |
| `rootDir`          | `string`   | Root directory for TS source files.                                      |
| `outputDir`        | `string`   | Output directory for GDScript files.                                     |
| `typingsDir`       | `string`   | Directory for all generated typings (`globals.d.ts`, `scene-typings.d.ts`). Relative to `rootDir`. Defaults to `"_gdtots"`. |
| `tsconfig`         | `string`   | Path to `tsconfig.json`.                                                 |
| `exclude`          | `string[]` | Glob patterns (from project root) for files/folders to exclude from all CLI commands (e.g. `["test/**", "**/*.test.ts"]`). Uses [minimatch](https://github.com/isaacs/minimatch) syntax. |
| `disableGodotLint` | `boolean`  | Disable Godot executable validation in lint and the ts-plugin. Defaults to `false`. |
| `cacheDir`         | `string`   | Cache directory (source maps and diagnostics stored inline). Default: `node_modules/.cache/typescript-to-gdscript` (or OS temp dir). |
| `godotTypingsDir`  | `string`   | Path to Godot engine typings (classes, gd-helpers, globals). Default: `node_modules/typescript-to-gdscript/typings`. |
| `converterOptions` | `object`   | Converter behavior tweaks. Currently: `{ "generateGlobalClassTypes": boolean }` — when `true`, non-anonymous classes are emitted into `declare global` so consumers can use them without `import`. When `false` (default), classes are module-scoped and must be imported. Addons always emit globals regardless of this flag. |

### Anonymous classes (`_FilenameClass` convention)

A `.gd` file with no `class_name` declaration has no global identifier in Godot. On the TS side this project models such files with a class whose name starts with `_` and matches the file's basename in UpperCamelCase — `some_class.gd` → `_SomeClass`, `Anonym.gd` → `_Anonym`. The leading underscore is the marker; if a real GD file declares `class_name _Foo`, the TS shadow is escaped to `G_Foo` so the underscore-prefix convention stays unambiguous.

A TS class named `_Foo` produces a `.gd` file with no `class_name`. The `G_` escape is **one-way** — applied during GD→TS conversion as a fallback, but TS→GD treats `G_Foo` as a regular class name and emits `class_name G_Foo` verbatim. After the initial migration `G_Foo` is the canonical identifier on both sides; there's no hidden reversible alias to keep track of.

**Addons override the filename rule.** When `generate-addon-typings` runs, anonymous addon scripts (no `class_name`) are emitted with the sentinel name `_$CLASS$_` instead of `_FilenameClass`. `$` is not a valid GDScript identifier character, so the sentinel can never collide with a real GD class. Each addon's `.ts` is its own ES module, so multiple addons exporting `_$CLASS$_` don't collide either — consumers reach the class through the `import type { _$CLASS$_ as ScriptClass }` alias in the generated `.gd.d.ts`, never by global name.

**Addons also preserve `_`-prefixed `class_name` verbatim.** With `_$CLASS$_` claiming the "anonymous" slot for addons, real `class_name _Foo` declarations are unambiguous and the `_Foo` → `G_Foo` escape is bypassed in addon mode. Addon class names are external — third-party-owned, globally registered, referenced by consumer code under that exact name — so a rename would silently break things. `_Foo` lands in `declare global` as a normal global class. The escape still applies in non-addon GD→TS runs.

#### Imports → preload consts

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

## CLI Commands

The CLI binary is `tstogd`.

### `tstogd init`

Initialize a Godot project for typescript-to-gdscript. Walks through an interactive setup:

```bash
tstogd init
```

The command will:

1. **Create `tstogd.json`** — asks for TypeScript source directory, GDScript output directory, and typings directory
2. **Create `tsconfig.json`** — from a template with proper settings for Godot development (`noLib`, strict mode, typings reference, `typescript-to-gdscript/ts-plugin` enabled under `compilerOptions.plugins` for live IDE diagnostics)
3. **Install npm packages** — TypeScript as a dev dependency
4. **Create `node_modules/.gdignore`** — to exclude node_modules from Godot's file scanner

If any of these files already exist, the command will skip them and remind you to check the README for configuration options.

### `tstogd convert <files...>`

Convert TypeScript files to GDScript.

```bash
tstogd convert src/Player.ts -o scripts/
```

Source maps are stored in the cache directory (not alongside `.gd` files).
Unchanged files are skipped automatically via the cache.

Options:

- `-o, --output-dir <dir>` — Output directory
- `--root-dir <dir>` — Root directory (default: `.`)
- `--tsconfig <path>` — Path to tsconfig.json
- `--no-cache` — Disable cache (force full reconversion)
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `# ERROR:` comments)

### `tstogd convert-gd <files...>`

Convert GDScript files to TypeScript. Uses the Godot class registry to resolve inherited members for correct `this.` prefix insertion.

```bash
tstogd convert-gd addons/plugin/Plugin.gd -o src/
```

Registry resolution order:

1. `--registry` CLI flag (explicit path to `godot-class-registry.json`)
2. Bundled `typings/godot-class-registry.json`

Options:

- `-o, --output-dir <dir>` — Output directory
- `--registry <path>` — Path to `godot-class-registry.json`
- `--unsafe-use-any` — Less strict but less error-prone conversion mode. Currently affects:
  - `gd.getset` fallback type: uses `any` instead of `unknown` when neither a GDScript type annotation nor a typeof-able value expression is available.
  - Unsafe non-null assertions: TS2531/18047/18048/18046 "possibly null/undefined" errors get `!` inserted after the expression. TS2322/2345 where the root cause is a null union type get `!` after the RHS/argument.
  - TS7034 "variable implicitly has type `any[]`" gets `: any[]` annotation added.
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `/* ERROR: ... */` comments)

The full set of conversion helpers (see next section) always runs; there is no per-helper disable flag.

#### Conversion Helpers

GD-to-TS conversion includes optional helpers that enhance the output:

- **Signal handler helper** (default: enabled) — Scans `.tscn` scene files for signal connections and adds typed parameter annotations to signal handler methods (e.g., `_on_area_entered(area: Area2D)` instead of untyped `_on_area_entered(area)`).

- **Operator fix helper** (default: enabled) — After conversion and typings generation, runs the TypeScript type-checker on converted files to find operator type errors (e.g., `Vector2 + Vector2`). Automatically wraps them in `gd.ops.X()` calls (e.g., `gd.ops.add(v1, v2)`). Catches cases that GDScript-time type inference misses (inherited members, method return values, etc.).

- **Explicit convert helper** (default: enabled) — Runs alongside operator fix. Detects TS2345/TS2322/TS2739/TS2740/TS2741 assignment/argument errors where the source and target are both variant types (Vector2 ↔ Vector2i, PackedColorArray ↔ Array, etc.) and inserts an explicit `gd.as(value, Target)` conversion. Uses `variantConverts` metadata in `godot-class-registry.json` (derived from Godot XML "from" constructors). Handles return statements (wraps returned expression, not the `return` keyword) and property access assignments (redirects from LHS to RHS). Example: `wants_v2i(Vector2.DOWN)` → `wants_v2i(gd.as(Vector2.DOWN, Vector2i))`.

- **Extends type helper** (default: enabled) — Detects TS7006 ("Parameter X implicitly has an any type") on method parameters where the method overrides one inherited from a parent class. Copies the parameter types from the parent class signature, preserving type aliases (`float`, `int`) by using the syntactic type text from the parent's `.d.ts`. Example:

  ```typescript
  class Player extends Node2D {
    _process(delta) {        // TS7006
      this.position.x += delta;
    }
    _input(event) {}         // TS7006
  }
  ```
  becomes:
  ```typescript
  class Player extends Node2D {
    _process(delta: float) {
      this.position.x += delta;
    }
    _input(event: InputEvent) {}
  }
  ```
  Methods that don't override anything (`custom_method(arg)`) are left untouched.

- **Nullable helper** — Applies `T | null` widening and narrowing in two directions:

  - **At emit time (IN positions)**: reference-typed function/method/lambda parameters, setter value parameters, and `gd.signal<[…]>()` generics start as `T | null` because Godot lets callers pass null to any class-typed argument. Accessor pairs (GD `setget` → TS `get`/`set`) emit the same type on both sides so reads and writes stay symmetric. Value types (Vector2, Color, PackedByteArray, …), primitives, and enum references are left strict.
  - **After conversion (OUT positions)**: a post-processing pass handles return types, field annotations, getter returns, and local-variable annotations. Unassigned reference-typed fields are rewritten to `field: T | null = null` (both modes). Return types and assigned fields/locals start **strict** and get widened to `T | null` only when the TypeScript type-checker proves null flows through (TS2322). Addon mode additionally widens assigned fields and local-variable annotations up-front, since their full body isn't available to the type-checker the same way user code is.
  - **After widening (IN fallback)**: parameters that were emitted as `T | null` get narrowed back to `T` when the function body dereferences them without a null-check (triggering TS2531 / TS18047 "possibly null" diagnostics). Runs after the OUT widening pass so return types settle before parameter narrowing kicks in — a return type's null status often depends on its parameters. Setter value params of accessor pairs are skipped to keep getter/setter nullability in sync.

  Example:
  ```typescript
  class Player extends Node2D {
    target: Node;                    // TS2564 + unassigned + reference
    find_target(node: Node2D) { ... } // IN position: reference
    dereference(node: Node2D) { node.queue_free(); } // body uses as non-null
    set_target(v: Node2D) { ... }     // IN position: reference
    signal_fired = gd.signal<[Node]>();

    do_something() {
      let found: Node = this.get_node("Foo");
      if (!found) found = null;       // TS2322
    }
  }
  ```
  becomes:
  ```typescript
  class Player extends Node2D {
    target: Node | null = null;              // Phase A
    find_target(node: Node2D | null) { ... } // emit-time (body doesn't deref)
    dereference(node: Node2D) { node.queue_free(); } // Phase D narrowed back
    set_target(v: Node2D | null) { ... }     // emit-time
    signal_fired = gd.signal<[Node | null]>(); // emit-time

    do_something() {
      let found: Node | null = this.get_node("Foo"); // Phase C
      if (!found) found = null;
    }
  }
  ```

- **Ready field types helper** — Detects TS7008 ("Member implicitly has an any type") and TS2564 ("Property has no initializer") on class properties:
  - **TS2564** (`field: Type;`) — if assigned in `_ready()`, adds `!` (definite-assignment). If not assigned in `_ready()` but the type is a GDScript primitive or value type (`int`, `float`, `bool`, `String`, `Vector2`, `Color`, any value type with a guaranteed default), still adds `!`. Non-primitive unassigned fields are handled by the nullable helper (see above).
  - **TS7008** (`field;`) — if assigned in `_ready()`, adds `!: <inferred type>` (type taken from the `_ready()` expression). Otherwise left untouched (no type to infer from).

  Example:

  ```typescript
  class Game extends Node {
    time: float;                   // TS2564, assigned in _ready
    progress_bar;                  // TS7008, assigned in _ready
    score: int;                    // TS2564, NOT assigned, but primitive
    target: Node2D;                // TS2564, NOT assigned, nullable helper widens

    _ready() {
      this.time = 0.0;
      this.progress_bar = this.game_ui.progress_bar;
    }
  }
  ```
  becomes:
  ```typescript
  class Game extends Node {
    time!: float;                                    // assigned → `!`
    progress_bar!: typeof this.game_ui.progress_bar; // assigned → `!: <inferred>`
    score!: int;                                     // primitive → `!`
    target: Node2D | null = null;                    // nullable helper widens

    _ready() {
      this.time = 0.0;
      this.progress_bar = this.game_ui.progress_bar;
    }
  }
  ```
  For simple identifier/property-access right-hand sides, the helper emits `typeof <expr>`; for other expressions (literals, `new` calls, etc.) it uses the TS type checker's inferred type string.

### `tstogd convert` — diagnostic modes

After converting, `convert` runs a full three-source diagnostic check unless disabled:

| Source | Label | Notes |
|--------|-------|-------|
| TypeScript | `[TS:severity]` | Semantic + syntactic errors (requires `--tsconfig`; noise codes TS2434/2435/2449 suppressed) |
| Converter | `[CONV:severity]` | Errors and warnings from the TS→GD transformer |
| Godot | `[GD:severity]` | Full-project `godot --check-only` (requires `--godot-path` and `project.godot`) |

Extra flags:

- `--no-emit` — Dry-run: convert in memory, report stale `.gd` outputs, do not write files. Godot validates existing `.gd` files on disk. Note: for files flagged as stale, Godot errors are reported at `.gd` positions (no source-map remap to `.ts` — the in-memory map doesn't match what's on disk).
- `--no-check` — Skip the post-convert diagnostic check entirely (write files only)
- `--godot-path <path>` — Path to Godot executable (enables GDScript validation)
- `--project-root <dir>` — Godot project root for validation

```bash
# Normal convert + full check
tstogd convert

# Dry-run: see all errors without writing
tstogd convert --no-emit

# Fast: convert only, no check
tstogd convert --no-check
```

### `tstogd watch`

Watch TypeScript files and auto-convert on change. After each conversion batch settles (1.5s debounce), runs a full diagnostic check and clears the console before printing results.

```bash
tstogd watch --root-dir src --output-dir scripts
```

Source maps are stored in the cache directory.

Options:

- `--root-dir <dir>` — Root directory to watch (default: `.`)
- `--output-dir <dir>` — Output directory for GDScript files
- `--tsconfig <path>` — Path to tsconfig.json
- `--typings-dir <path>` — Directory for all generated typings (globals.d.ts, scene-typings.d.ts)
- `--no-check` — Disable the debounced full-project diagnostic check

### `tstogd generate-gdscript-global-typings`

Generate TypeScript typings and class registry from Godot XML docs. Requires the `vendor/godot` git submodule. The Godot version is auto-detected from `vendor/godot/version.py`.

```bash
tstogd generate-gdscript-global-typings --docs-dir vendor/godot/doc/classes
```

Options:

- `--docs-dir <dir>` — Godot XML class documentation directory (required)
- `--output-dir <dir>` — Root typings output directory (default: `typings`)
- `--override-dir <dir>` — User override directory for `.d.ts` files and `non-nullable.json` (combined with bundled defaults)
- `--no-default-overrides` — Disable the bundled default overrides

### `tstogd generate-addon-typings`

Generate TypeScript typings for GDScript addon files in `addons/`. Converts each `.gd` file to `.ts` (via GD-to-TS), then generates `.gd.d.ts` scene typings with global class declarations, `GodotScripts`/`GodotResources` entries, and namespace enums.

```bash
tstogd generate-addon-typings
```

Options:

- `-o, --output <path>` — Output directory for generated typings
- `--root-dir <dir>` — Root directory (default: `.`)

Output structure preserves the addon directory layout:

```
ts/_typings/
  addons/MyAddon/
    my_script.ts          ← converted from GDScript
    my_script.gd.d.ts     ← typings (global class, GodotScripts, enums)
```

This command is automatically called by `convert-gd` and `watch` (on first run). It can also be run standalone.

### `tstogd generate-class-typings <files...>`

Generate a global `.d.ts` file declaring all named classes from your TS source files, making them available globally (like in GDScript).

```bash
tstogd generate-class-typings src/**/*.ts -o globals.d.ts
```

### `tstogd open-editor`

Open a GDScript file in an external editor as the corresponding TypeScript file. Designed for Godot's external text editor integration -- when you double-click a script in Godot, it opens the `.ts` source instead of the generated `.gd` file.

```bash
tstogd open-editor -f {file} -l {line} -c {col} -p {project} -e "code --goto {tsFile}:{tsLine}:{tsCol}"
```

Options:

- `-f, --file <path>` -- GDScript file path (absolute or `res://`)
- `-e, --editor-cmd <cmd>` -- Editor command template. Placeholders: `{tsFile}`, `{tsLine}`, `{tsCol}` (plus any Godot placeholders like `{line}`, `{col}`)
- `-l, --line <n>` -- GDScript line number (from Godot, default: `1`)
- `-c, --col <n>` -- GDScript column number (from Godot, default: `1`)
- `-p, --project <dir>` -- Godot project directory (where `tstogd.json` is)

How it works:

1. Loads `tstogd.json` from the project directory
2. Maps the `.gd` file to `.ts` file using `gdDir` -> `tsDir` path mapping
3. Remaps GD line:col to TS line:col using cached source maps (`{tsLine}`, `{tsCol}`)
4. Replaces `{tsFile}`, `{tsLine}`, `{tsCol}` in the editor command
5. Spawns the editor process

#### Godot configuration

In Godot, go to **Editor Settings → Text Editor → External** and configure:

- **Use External Editor**: `On`
- **Exec Path**: `tstogd` (or `npx tstogd`, or full path to the binary)
- **Exec Flags**: `open-editor -f "{file}" -l {line} -c {col} -p "{project}" -e "code --goto {tsFile}:{tsLine}:{tsCol}"`

> **Note:** Use double quotes around `{file}` and `{project}` to handle paths with spaces. Do **not** use single quotes — they become literal characters on Windows.

Also enable **Editor Settings → Text Editor → Behavior → Auto Reload Scripts on External Change**. When you edit TypeScript files and the converter regenerates the `.gd` output, Godot needs to pick up the changes without manually refocusing or reopening each script. With this option enabled, Godot automatically reloads any `.gd` file that was modified on disk, so your changes take effect immediately when you switch back to the editor.

#### Debug with external editor

Godot has a **separate** toggle for whether runtime errors (stack traces in the Debugger panel) open in the external editor vs the built-in script editor. The "Use External Editor" setting in *Editor Settings → Text Editor → External* only controls double-click-to-open from the FileSystem dock — it does **not** cover debugger stack-frame clicks.

To also route debugger errors to your external editor, switch to the **Script** tab at the top of the Godot editor and look for the option there — the Script workspace has its own menu bar. From [godotengine/godot#65554](https://github.com/godotengine/godot/issues/65554):

> if you select the Script tab, that has its own menu bar, where you can find the option as described.

If the toggle is off, clicking a stack frame silently does nothing — `tstogd open-editor` is never invoked, so you won't see the editor open and there'll be no entry in the debug log. See related Godot issues: [#65554](https://github.com/godotengine/godot/issues/65554), [#84294](https://github.com/godotengine/godot/issues/84294), [#95198](https://github.com/godotengine/godot/issues/95198).

#### Editor command examples

| Editor  | `-e` flag                                              |
|---------|--------------------------------------------------------|
| VS Code | `-e "code --goto {tsFile}:{tsLine}:{tsCol}"`           |
| Rider   | `-e "rider --line {tsLine} --column {tsCol} {tsFile}"` |
| Vim     | `-e "vim +{tsLine} {tsFile}"`                          |

### `tstogd clear-cache`

Clear the conversion cache. Useful when cache becomes stale or after upgrading the converter.

```bash
tstogd clear-cache
```

## TypeScript Helpers (`gd` namespace)

### Signals

```typescript
class Player extends CharacterBody2D {
  health_changed = gd.signal<[int, int]>();
  died = gd.signal();
}
```

### Enums

Use a native TS `enum` at file scope — it lifts into the GDScript class as `enum Name { ... }`:

```typescript
enum State { IDLE, PATROL, ATTACK = 2 }

export class Enemy extends Node2D {
  current: State = State.IDLE;
}
```

The legacy `static X = gd.enum('A', 'B')` form is no longer supported.

### Math operations

For operator overloading on value types (Vector2, Color, etc.):

```typescript
let result = gd.ops.add(Vector2(1, 1), Vector2(2, 3));
let scaled = gd.ops.mul(position, 2.0);
let remainder = gd.ops.rem(Vector2i(10, 20), Vector2i(3, 7));
let concat = gd.ops.add([1, 2], [3, 4]); // Array concatenation
```

Available operators: `add`, `sub`, `mul`, `div`, `rem`, `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `plus` (unary), `minus` (unary).

### Type casting (`as`)

```typescript
// Class cast (returns Type | null)
let sprite = gd.as(get_node('Sprite'), Sprite2D);

// Variant conversion between primitive value types (Vector2 ↔ Vector2i, Rect2 ↔ Rect2i, etc.)
let v2: Vector2 = Vector2(1, 2);
let v2i: Vector2i = gd.as(v2, Vector2i);  // Vector2 → Vector2i

// Array conversion (PackedColorArray ↔ Array, etc.)
let packed: PackedColorArray = PackedColorArray();
let arr: Array<Color> = gd.as(packed, Array);  // element type inferred from iterator
```

Variant conversion is enabled via `[__variant_converts]` symbol on each value-type interface. The symbol's type is a union of types that the target's constructor accepts as single "from" parameters. For `Array`-like conversions, the element type is inferred via `[Symbol.iterator]: IterableIterator<T>` on the source interface.

### Raw GDScript (`eval`)

Emit raw GDScript code that can't be expressed in TypeScript. The string content is inserted as-is, with indentation automatically adjusted to the current level.

```typescript
class Player extends CharacterBody2D {
  _ready() {
    gd.eval('var a = 10');
    gd.eval(`
var b = 20
if b > 10:
\tb = 30
    `);
  }
}
```

Space-based indentation is automatically converted to tabs. Mixed tabs and spaces produce a conversion error.

`gd.eval()` can also be used as a variable initializer for inline expressions or multiline constructs (e.g. GDScript lambdas). A generic type parameter `gd.eval<T>(...)` provides the TS type:

```typescript
// Simple inline expression
const v = gd.eval<string>('c');
// becomes: var v = c

// Multiline lambda
const fun1 = gd.eval<(x: string) => void>(`func (x: string):
  print(x)
`);
// becomes:
// var fun1 = func (x: string):
//     print(x)
```

The first non-empty line becomes the RHS of the variable declaration; subsequent lines are emitted as the body with their relative indentation preserved.

For contexts where `gd.eval()` can't be used directly (e.g., before the class declaration or between members), use `// @gd.eval:` magic comments:

```typescript
// @gd.eval: @tool
export class Player extends CharacterBody2D {
  // @gd.eval: @icon("res://icon.svg")
  speed: float = 100.0;

  // @gd.eval: signal custom_signal(value: int)
  health: int = 100;

  _ready() {
    // @gd.eval: var special := preload("res://special.tscn")
    let x: int = 1;
  }
}
```

Spaces after `@gd.eval:` are ignored, but tab characters are preserved as additional indentation.

### Match statement

**Simple matches** (literal/expression patterns + wildcard) use the native TS `switch` statement. GD→TS emits `switch` for these and TS→GD converts `switch` back to `match`:

```typescript
switch (this.state) {
  case 1:
    print("one");
    break;
  case 2:
    print("two");
    break;
  default:
    print("other");
    break;
}
// ↔ match self.state:
//       1:
//         print("one")
//       2:
//         print("two")
//       _:
//         print("other")
```

Fall-through `case` labels map to multi-pattern `1, 2, 3:` on the GDScript side.

**Advanced patterns** (arrays, dicts, pattern bindings, guards) use `gd.match()` with arrow-function `do: () => {}` cases to preserve `this` context:

```typescript
gd.match(this.x, [
  // Multiple patterns
  { matchMany: [1, 2, 3], do: () => { print("1-3"); } },
  // Pattern binding with guard
  (x, y) => ({ match: [x, y], when: y === x, do: () => { print("y = x"); } }),
  // Array open-ending
  { match: [42, ...[]], do: () => { print("starts with 42"); } },
  // Dictionary pattern
  (age) => ({ match: { name: "Dennis", age: age }, do: () => { print(age); } }),
  // Dictionary open-ending
  { match: { key: "val", ...{} }, do: () => { print("has key"); } },
]);
```

### Decorators

```typescript
class Player extends CharacterBody2D {
  @gd.export
  speed: float = 100.0;

  @gd.export_range(0, 100)
  health: int = 100;

  @gd.onready
  sprite: Sprite2D;
}
```

### Getters and setters

Simple GDScript setget clauses map to native TypeScript `get`/`set` accessors. If only one of `get` or `set` is defined in GDScript, the converter synthesizes a default for the other.

```typescript
class GetsetExample extends Node {
  // ↔ var a: int:
  //       get: return a
  //       set(value): a = value
  get a(): int { return this.a; }
  set a(value: int) { this.a = value; }
}
```

Inside accessor bodies, `this.<propName>` is rewritten to a bare identifier in GDScript to reference the backing field (avoiding the infinite recursion that `self.x` would cause inside `get x`/`set x`).

For cases that TS accessors can't express — a default value, or the `get = fn_name, set = fn_name` function-reference syntax — use the `gd.getset()` helper. An explicit **property type annotation** (`b: int = gd.getset({...})`) is **required**: the inline arrow functions reference `this.b` inside the initializer, which fires `TS7022: 'b' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer`. The annotation breaks the binding-resolution cycle and also supplies the contextual type for `gd.getset`, so the generic `<T>` is inferred and can be omitted. The GD→TS converter emits the annotation automatically.

```typescript
class GetsetExample extends Node {
  //   var b: int = 10:
  //       get: return b
  //       set(value): b = value
  b: int = gd.getset({
    value: 10,
    get: () => { return this.b; },
    set: (value) => { this.b = value; },
  });

  //   var c: int:
  //       get = get_c, set = set_c
  c: int = gd.getset({
    get: this.get_c,
    set: this.set_c,
  });

  get_c(): int { return 10; }
  set_c(v: int) {}
}
```

Rules:
- `gd.getset()` requires **both** `get` and `set` keys (a converter error is raised otherwise). Either may be set to `null` to fall back to GDScript's default backing-field read/write — at least one must be non-null.
- You **cannot mix** inline arrow-function bodies with function-reference form in a single `gd.getset()` call. Same restriction applies to GDScript — mixing inline `get:` bodies with `get = fn_name` is rejected.
- A `value` default can only be combined with inline bodies, not with function-reference form.

```typescript
// `set: null` — only a custom getter; GDScript uses its default setter.
// No explicit GDScript type → converter emits `typeof this.e` as the
// property annotation (derived from the value expression).
f: typeof this.e = gd.getset({
  value: this.e,
  get: () => { return this.f; },
  set: null,
});
// ↔ var f = self.e:
//       get:
//           return f
```

When the value expression is not typeof-able (a literal like `10`, a call, an operator expression, etc.) and there's no GDScript type annotation, the fallback is `unknown` by default, or `any` when `--unsafe-use-any` is passed to `convert-gd`.

### Type checking (`is`)

For class types, use standard `instanceof`:

```typescript
if (x instanceof Node2D) { ... }
// ↔ if x is Node2D:
```

For primitive types (`int`, `float`, `bool`, `String`), use `gd.is()`:

```typescript
if (gd.is(x, int)) { ... }
// ↔ if x is int:

if (!gd.is(x, int)) { ... }
// ↔ if x is not int:
```

Negation of `not x is Y` in GDScript converts to `!(gd.is(x, Y))` or `!(x instanceof Y)` with correct parenthesization.

### StringName / NodePath

`StringName` is a type alias for `String` (identical API in GDScript). `NodePath` is its own variant type with a dedicated interface and constructor.

```typescript
let sn = StringName('my_signal');
let np = NodePath('Path/To/Node');
```

## Transform Rules

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

## Typings

Typings are stored in a flat `typings/` folder (no version subdirectories):

```
typings/
  index.d.ts                # Entry point (references globals.d.ts, gd-helpers.d.ts, classes/)
  globals.d.ts              # Generated global class declarations
  gd-helpers.d.ts           # gd namespace types (signal, enum_, as, ops, decorators)
  godot-class-registry.json # Class hierarchy JSON (916 classes)
  classes/                  # Per-class .d.ts files
```

The `generate-typings` command outputs directly to `typings/` root.

Value types (Vector2, Color, etc.), `Dictionary`, and `Callable` use call syntax constructors (no `new`). `Dictionary` and `Callable` constructors and static methods are generated from Godot XML docs via a shared `generateConstructorInterface()` utility.

### Nullable Reference Types

Generated typings distinguish between value types and reference types for nullability:

- **Reference types** (Node, Material, Texture2D, etc.) — properties and method return types are generated as `T | null`, matching GDScript semantics where these can be `null` at runtime.
- **Value types** (Vector2, Color, int, float, Rect2, Transform2D, etc.) — remain non-nullable, since GDScript always initializes them to a default value.

A type is classified as a value type if its Godot XML documentation includes a copy constructor (a constructor with a single parameter of its own type). This is derived automatically from the parsed XML docs at generation time — no hardcoded type lists.

**Overrides**: Files in `src/typings/overrides/` can restore non-null return types for specific members where `null` is never returned in practice. For example, `src/typings/overrides/node.d.ts` overrides `get_tree(): SceneTree`, `get_viewport(): Viewport`, and `get_window(): Window` as non-null.

## Scene Typings

The scene typings generator creates per-file `.d.ts` declarations that provide typed `get_node()`, `get_parent()`, `get_child()`, and group methods based on your `.tscn` scene structure.

### Generate scene typings

```bash
tstogd generate-typings
```

This generates in your `typingsDir`:
- **`.tscn.d.ts`** — Tree type structure for each scene (node types, parent/child relationships, flat paths)
- **`.gd.d.ts`** — Module augmentation per script with typed `get_node()` overloads
- **`_resources.d.ts`** — Bundled `GodotResources` entries for all asset files
- **`_index.d.ts`** — Empty global interfaces + autoload singleton declarations, including `GodotScenes` (maps scene resource paths to root node types)

### Features

- **Typed `get_node()`**: autocomplete for node paths, returns exact node types
  ```typescript
  let sprite: Sprite2D = this.get_node('Sprite2D');
  let label: Label = this.get_node('UI/ScoreLabel');
  ```

- **Typed `get_node_or_null()`**: same as `get_node()` but always includes `| null`

- **Absolute `/root/` paths**: type-inferred from the root scene tree
  ```typescript
  let player: Player = this.get_node('/root/Level/Player');
  ```

- **Unique name nodes (`%Name`)**: accessible from any node in the scene
  ```typescript
  let health: ProgressBar = this.get_node('%HealthBar');
  ```

- **Typed `get_parent()`**: resolves to parent scene's script class

- **Typed `get_child(idx)`**: resolves to child node type by index

- **Instanced scene support**: instanced scene nodes carry their full tree, enabling deep path traversal

- **Scene inheritance (`__node_extends`)**: extended scenes inherit base scene paths lazily

- **Group typing**: `get_nodes_in_group()` returns typed arrays based on which nodes are in each group
  ```typescript
  let enemies: Array<Player | Enemy> = this.get_tree().get_nodes_in_group('entities');
  ```

- **Autoload scenes**: scene autoloads typed as tree nodes with `get_node()` support
  ```typescript
  let bar: ProgressBar = UIManager.get_node('HealthBar');
  ```

- **Static fields on instances**: class static members (enums, etc.) accessible on instances via `StaticProps`

- **Non-Node scripts excluded**: scripts that don't extend Node (e.g. `extends Resource`) skip tree navigation typings (ScriptTree, `get_node` overrides, `__Trees` interface) since they have no scene tree context

### Configuration

Add `helpers` to `tstogd.json` to control GD-to-TS conversion helpers:

```json
{
  "helpers": {
    "signalHandler": true
  }
}
```

## TypeScript Language Service Plugin

typescript-to-gdscript ships a TypeScript language service plugin that runs inside your IDE's tsserver and surfaces converter + Godot diagnostics as real TypeScript squiggles — including on **unsaved** buffer contents.

### Converter diagnostics surfaced

- **Conversion errors** — unsupported TS features; `.gd` is NOT emitted:
  - `var` keyword (use `let` or `const`)
  - `undefined` keyword as a value (use `null`)
  - Optional chaining (`?.`), nullish coalescing (`??`, `??=`)
  - Spread operator (`...`), destructuring
  - `yield`, `for...in`
  - Multiple classes per file
  - Top-level statements outside classes
- **Type errors** — `.gd` is still emitted, but the plugin reports them inline:
  - `undefined` in function parameter type annotations
  - Argument that may be `undefined`
  - `||`/`&&` used as a non-boolean value
  - `x in y` where `y` is a value-type primitive (Vector2, Color, Transform2D, etc.), an array (`Array<T>`, `T[]`, `Packed*Array`), a number, or a boolean — GDScript only supports `in` on `Dictionary` and `String`
  - Call returning `Promise<T>` used as a value without `await` (assigned, passed as argument, returned, etc.) — GDScript has no Promise; an unawaited coroutine resolves to a `GDScriptFunctionState` at runtime
- **Godot validation errors** (when Godot is available on `PATH`) — type mismatches, unknown functions/methods, parse errors in the generated GDScript. These fire asynchronously ~300–500ms after the converter diagnostics and are merged into the IDE's diagnostic list via an internal tsserver refresh.

Godot validation is enabled automatically when the Godot executable is found on the system (resolved via `resolveGodotPath()`). To disable it, set `disableGodotLint: true` in `tstogd.json`. Source maps are always generated for error remapping.

### Enable it

Add to your project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-to-gdscript/ts-plugin" }
    ]
  }
}
```

#### Plugin options

| Option              | Type      | Description                                                                                                                                              |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug`             | `boolean` | Emit verbose `[tstogd-plugin] TRACE` lines to the tsserver log. Off by default.                                                                          |
| `debugLog`          | `string`  | File path. When set, plugin log + trace lines are appended there in addition to the tsserver log — easier than fishing trace lines out of `tsserver.log`. |
| `disableGodotLint`  | `boolean` | Per-editor override for `tstogd.json`'s `disableGodotLint`. Set `true` to skip the async Godot pass in the IDE only; set `false` to force-enable it.     |

Example — silence the Godot pass in the IDE without changing project-wide config:

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-to-gdscript/ts-plugin", "disableGodotLint": true }
    ]
  }
}
```

Tell the IDE to use the workspace's TypeScript — plugins only load through `tsserver` spawned by the workspace `typescript` package, not the IDE's bundled one:

- **WebStorm**: *Settings → Languages & Frameworks → TypeScript* — set "TypeScript" to `node_modules/typescript` (typically auto-detected), ensure "TypeScript Language Service" is ON, then restart the TS service (File → Invalidate Caches → Just Restart is the blunt way).
- **VS Code**: Open any `.ts` file, Command Palette → `TypeScript: Select TypeScript Version...` → `Use Workspace Version`.

Verify: the plugin logs `[tstogd-plugin] plugin loaded` on startup. WebStorm → `Help → Show Log in Explorer/Finder → idea.log`; VS Code → `Output panel → TypeScript`.

### What it does

1. **Inline diagnostics on the current buffer.** On every `getSemanticDiagnostics` query, the plugin runs `convertTsToGd` in-process using tsserver's own `ts.Program` (no fork, no IPC — just reuses the warm program + type checker). Converter diagnostics (conversion errors, type-errors, `||`/`&&` as value, `Promise` as value, etc.) appear as `ts.Diagnostic`s with `source: 'tstogd'` and codes in the `90000–90099` range.

2. **Augmentation-noise filtering.** When you use the `export namespace Foo { ... }` + `export class Foo` pattern (the way enums and inner classes are expressed in TypeScript for this project), TypeScript generates a few spurious diagnostic codes from the namespace+class merge. The plugin silently drops these for all in-scope files so you never see them in the IDE:
   - `TS2434` / `TS2435` — "Namespace must precede the class declaration"
   - `TS2449` — "Class used before its declaration"

3. **Godot validation in the background.** After conversion, the plugin kicks off `validateGdFiles` asynchronously against the cache-folder `.gd` mirror. When Godot finishes (~300–500ms later), the plugin merges its diagnostics and calls `refreshDiagnostics()` on the project — your IDE updates without you doing anything.

4. **Cancellation.** Typing another character while Godot is still running aborts the stale validation (both the subprocess and the superseded result) — no stale squiggles from a version you've already moved past.

5. **Persistent-cache write-through.** Every live conversion updates the shared `ProjectCache` (keyed by buffer hash). When you save, `tstogd watch` / `tstogd convert` detects that the cache already holds the right bytes and promotes them with a single `rename()` — no double conversion.

> **Note on navigation:** an earlier version of the plugin also redirected Go-to-Definition / Find-Usages between the generated `*.gd.d.ts` shadow classes and their real TypeScript sources. That feature was removed because WebStorm handles symbol navigation entirely through its own native indexer (it doesn't forward `definition` / `references` to tsserver), so the overrides had no effect there. In WebStorm, Ctrl+B on a generated class lands on its `*.gd.d.ts`; the `@see import("…")` JSDoc emitted alongside each shadow class takes you to the real source on the next Ctrl+B.

### Plugin diagnostic codes

| Code    | Meaning                                |
| ------- | -------------------------------------- |
| `90000` | converter `error` / `warning` / `info` |
| `90001` | converter `type-error`                 |

All plugin-originated diagnostics have `source: 'tstogd'`, so you can filter them in IDE settings if needed.


## Development

```bash
yarn install
yarn build
yarn test:run
```

### Prerequisites

- **Node.js 22+** — the plugin uses `require(esm)` semantics (no top-level await in the plugin itself, but earlier Node versions refuse ESM via `require`).
- **Godot** on `PATH`, or reachable via `godotPath` / `GODOT_PATH` — required to run the test suite. Tests that exercise the Godot CLI integration (converter-round-trip validation, ts-plugin async Godot diagnostics, etc.) fail loudly when Godot is not resolvable; they are **not** skipped. If you need to develop without Godot installed, run just the subset of scripts that don't touch it (`yarn test:tstogd`, `yarn test:gdtots`, `yarn test:diag`, `yarn test:sourcemap`, `yarn test:godot-registry`, `yarn test:typecheck`, `yarn test:cli`) — the rest will fail with a spawn error.

### Test scripts

Individual test suites can be run via npm scripts:

| Script                | Description                        |
| --------------------- | ---------------------------------- |
| `yarn test:tstogd`    | TS-to-GD converter fixtures        |
| `yarn test:gdtots`    | GD-to-TS converter fixtures        |
| `yarn test:diag`      | Converter diagnostics              |
| `yarn test:ts-plugin` | TypeScript language service plugin |
| `yarn test:scene-typings` | Scene typings generation       |
| `yarn test:type-checks`   | Type check tests               |
| `yarn test:class-typings` | Class typings generation       |
| `yarn test:godot-docs`    | Godot docs typings generation  |
| `yarn test:godot-registry` | Godot class registry          |
| `yarn test:godot-validate` | Godot validation              |
| `yarn test:sourcemap` | Source map position tests          |
| `yarn test:gd-registry` | GD-to-TS registry tests         |
| `yarn test:typecheck` | TypeScript type-level tests        |
| `yarn test:cli`       | CLI integration tests              |

### Regenerating Godot typings

```bash
git submodule update --init
yarn generate:godot-typings
```

### Requirements

- Node.js >= 20
- TypeScript >= 5.9
- Godot >= 4.6 (for typings generation)

## License

MIT
