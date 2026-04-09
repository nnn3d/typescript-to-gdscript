# typescript-to-gdscript

Convert TypeScript to GDScript for the Godot game engine, with source maps, ESLint integration, and type-safe helpers.

## Philosophy

Write GDScript logic using TypeScript syntax with strong type support, linting, and IDE autocomplete. Only features and APIs supported in GDScript are supported by the converter — for GDScript-specific constructs not available in TypeScript, use the `gd` namespace helpers.

## Installation

```bash
yarn add typescript-to-gdscript
```

## Setup

### Godot Typings

Add to your `tsconfig.json` to get autocomplete for Godot classes, `gd` helpers, and global types:

```json
{
  "compilerOptions": {
    "types": ["typescript-to-gdscript/typings"]
  }
}
```

This provides:

- All Godot engine classes (Node, Sprite2D, Vector2, etc.)
- Global functions (print, load, range, etc.)
- `gd` namespace helpers (signals, enums, math, decorators, type casting)
- Type aliases: `int`, `float`, `StringName`, `NodePath`, `Dictionary`

### Configuration: `tstogd.json`

Create a `tstogd.json` in your project root to configure the converter:

```json
{
  "godotVersion": "4.6",
  "rootDir": "src",
  "outputDir": "scripts",
  "sourceMap": true,
  "tsconfig": "tsconfig.json"
}
```

| Field          | Type      | Description                                                              |
| -------------- | --------- | ------------------------------------------------------------------------ |
| `godotVersion` | `string`  | Godot version for typings lookup (e.g. `"4.6"`). Defaults to `"latest"`. |
| `registryPath` | `string`  | Path to a custom `godot-class-registry.json`. Overrides `godotVersion`.  |
| `rootDir`      | `string`  | Root directory for TS source files.                                      |
| `outputDir`    | `string`  | Output directory for GDScript files.                                     |
| `typingsDir`   | `string`  | Directory for all generated typings (`globals.d.ts`, `scene-typings.d.ts`). Relative to `rootDir`. Defaults to `"_gdtots"`. |
| `sourceMap`    | `boolean` | Generate source maps.                                                    |
| `tsconfig`     | `string`  | Path to `tsconfig.json`.                                                 |
| `ignore`       | `string[]` | Glob patterns for files/folders to ignore in all conversions (e.g. `["addons/**", "test/**"]`). |

## CLI Commands

The CLI binary is `ts2gd`.

### `ts2gd init`

Initialize a Godot project for typescript-to-gdscript. Walks through an interactive setup:

```bash
ts2gd init
```

The command will:

1. **Create `tstogd.json`** — asks for TypeScript source directory, GDScript output directory, typings directory, source maps, and Godot version
2. **Create `tsconfig.json`** — from a template with proper settings for Godot development (`noLib`, strict mode, typings reference)
3. **Create `eslint.config.js`** — from a template with the ts2gd ESLint plugin configured
4. **Install npm packages** — TypeScript, ESLint, and @typescript-eslint/parser as dev dependencies
5. **Create `node_modules/.gdignore`** — to exclude node_modules from Godot's file scanner

If any of these files already exist, the command will skip them and remind you to check the README for configuration options.

### `ts2gd convert <files...>`

Convert TypeScript files to GDScript.

```bash
ts2gd convert src/Player.ts -o scripts/ --source-map
```

Options:

- `-o, --output-dir <dir>` — Output directory
- `--source-map` — Generate source maps
- `--root-dir <dir>` — Root directory (default: `.`)
- `--tsconfig <path>` — Path to tsconfig.json
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `# ERROR:` comments)

### `ts2gd convert-gd <files...>`

Convert GDScript files to TypeScript. Uses the Godot class registry to resolve inherited members for correct `this.` prefix insertion.

```bash
ts2gd convert-gd addons/plugin/Plugin.gd -o src/
```

Registry resolution order:

1. `--registry` CLI flag (explicit path to `godot-class-registry.json`)
2. `registryPath` from `tstogd.json` in CWD
3. Bundled `typings/godot-class-registry.json`

Options:

- `-o, --output-dir <dir>` — Output directory
- `--registry <path>` — Path to `godot-class-registry.json`
- `--no-helpers` — Disable all GD-to-TS conversion helpers
- `--no-signal-handler-helper` — Disable signal handler type inference from `.tscn` connections
- `--no-operator-fix-helper` — Disable TS-based operator type error auto-fix
- `--no-explicit-convert-helper` — Disable TS-based variant-type auto-fix (explicit `gd.as` insertion)
- `--no-ready-field-types-helper` — Disable TS-based class property auto-fix (adds `!` and infers types from `_ready()` assignments)
- `--no-extends-type-helper` — Disable TS-based override-method parameter auto-fix (copies parameter types from parent class)
- `--unsafe-use-any` — Less strict but less error-prone conversion mode. Currently affects two places:
  - `gd.getset` fallback type: uses `any` instead of `unknown` when neither a GDScript type annotation nor a typeof-able value expression is available.
  - Ready field types helper: non-primitive TS2564 fields that aren't assigned in `_ready()` get `!` (definite-assignment) instead of `?` (optional) — avoids downstream `X | undefined` errors at usage sites at the cost of losing the runtime safety check.
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `/* ERROR: ... */` comments)

#### Conversion Helpers

GD-to-TS conversion includes optional helpers that enhance the output:

- **Signal handler helper** (default: enabled) — Scans `.tscn` scene files for signal connections and adds typed parameter annotations to signal handler methods (e.g., `_on_area_entered(area: Area2D)` instead of untyped `_on_area_entered(area)`).

- **Operator fix helper** (default: enabled) — After conversion and typings generation, runs the TypeScript type-checker on converted files to find operator type errors (e.g., `Vector2 + Vector2`). Automatically wraps them in `gd.ops.X()` calls (e.g., `gd.ops.add(v1, v2)`). Catches cases that GDScript-time type inference misses (inherited members, method return values, etc.).

- **Explicit convert helper** (default: enabled) — Runs alongside operator fix. Detects TS2345/TS2322 assignment/argument errors where the source and target are both variant types (Vector2 ↔ Vector2i, PackedColorArray ↔ Array, etc.) and inserts an explicit `gd.as(value, Target)` conversion. Uses `variantConverts` metadata in `godot-class-registry.json` (derived from Godot XML "from" constructors). Example: `wants_v2i(Vector2.DOWN)` → `wants_v2i(gd.as(Vector2.DOWN, Vector2i))`.

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

- **Ready field types helper** (default: enabled) — Detects TS7008 ("Member implicitly has an any type") and TS2564 ("Property has no initializer") on class properties:
  - **TS2564** (`field: Type;`) — if assigned in `_ready()`, adds `!` (definite-assignment). If not assigned in `_ready()` but the type is a GDScript primitive (`int`, `float`, `bool`, `String`, `Vector2`, `Color`, any value type with a guaranteed default), still adds `!`. Otherwise marks the field optional with `?` — or with `!` when `--unsafe-use-any` is passed.
  - **TS7008** (`field;`) — if assigned in `_ready()`, adds `!: <inferred type>` (type taken from the `_ready()` expression). Otherwise left untouched (no type to infer from).

  Example:

  ```typescript
  class Game extends Node {
    time: float;                   // TS2564, assigned in _ready
    progress_bar;                  // TS7008, assigned in _ready
    score: int;                    // TS2564, NOT assigned, but primitive
    target: Node2D;                // TS2564, NOT assigned, not primitive

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
    target?: Node2D;                                 // non-primitive → `?`

    _ready() {
      this.time = 0.0;
      this.progress_bar = this.game_ui.progress_bar;
    }
  }
  ```
  For simple identifier/property-access right-hand sides, the helper emits `typeof <expr>`; for other expressions (literals, `new` calls, etc.) it uses the TS type checker's inferred type string.

### `ts2gd watch`

Watch TypeScript files and auto-convert on change.

```bash
ts2gd watch --root-dir src --output-dir scripts --source-map
```

Options:

- `--root-dir <dir>` — Root directory to watch (default: `.`)
- `--output-dir <dir>` — Output directory for GDScript files
- `--source-map` — Generate source maps
- `--tsconfig <path>` — Path to tsconfig.json
- `--typings-dir <path>` — Directory for all generated typings (globals.d.ts, scene-typings.d.ts)

### `ts2gd generate-typings`

Generate TypeScript typings and class registry from Godot XML docs. Requires the `vendor/godot` git submodule.

```bash
ts2gd generate-typings --docs-dir vendor/godot/doc/classes
```

Options:

- `--docs-dir <dir>` — Godot XML class documentation directory (required)
- `--typings-dir <dir>` — Root typings directory (default: `typings`)
- `--patch-dir <dir>` — Directory containing `.patch` files for manual type improvements
- `--version <ver>` — Godot version label (auto-detected from `vendor/godot/version.py`)

### `ts2gd generate-addon-typings`

Generate TypeScript typings for GDScript addon files in `addons/`. Converts each `.gd` file to `.ts` (via GD-to-TS), then generates `.gd.d.ts` scene typings with global class declarations, `GodotScripts`/`GodotResources` entries, and namespace enums.

```bash
ts2gd generate-addon-typings
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

### `ts2gd generate-class-typings <files...>`

Generate a global `.d.ts` file declaring all named classes from your TS source files, making them available globally (like in GDScript).

```bash
ts2gd generate-class-typings src/**/*.ts -o globals.d.ts
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

```typescript
class Enemy extends Node2D {
  State = gd.enum('IDLE', 'PATROL', ['ATTACK', 2]);
}
```

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

### StringName / NodePath

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
- `var` is restricted — use `let` or `const` (both convert to GDScript `var`).
- `TSOnly<T>` wrapper type is stripped during transformation.

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
ts2gd generate-typings
```

This generates in your `typingsDir`:
- **`.tscn.d.ts`** — Tree type structure for each scene (node types, parent/child relationships, flat paths)
- **`.gd.d.ts`** — Module augmentation per script with typed `get_node()` overloads
- **`_resources.d.ts`** — Bundled `GodotResources` entries for all asset files
- **`_index.d.ts`** — Empty global interfaces + autoload singleton declarations

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

### Configuration

Add `helpers` to `tstogd.json` to control GD-to-TS conversion helpers:

```json
{
  "helpers": {
    "signalHandler": true
  }
}
```

## ESLint Plugin

The ESLint plugin reports converter diagnostics (unsupported TS features) and optionally Godot validation errors inline in your editor.

### Setup

Install ESLint and the TypeScript parser:

```bash
yarn add --dev eslint @typescript-eslint/parser
```

Create `eslint.config.js` (ESLint flat config):

```javascript
import ts2gd from 'typescript-to-gdscript/eslint';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      ts2gd,
    },
    rules: {
      'ts2gd/convert': [
        'error',
        {
          rootDir: '.',
          godotPath: 'godot', // optional: enables Godot validation
          projectRoot: '.', // optional: Godot project root (must contain project.godot)
        },
      ],
    },
  },
];
```

### Rule: `ts2gd/convert`

Converts each TS file to GDScript and reports errors at two levels:

1. **Converter diagnostics** — unsupported TS features:
   - `var` keyword (use `let` or `const`)
   - `undefined` (use `null`)
   - Optional chaining (`?.`), nullish coalescing (`??`, `??=`)
   - Spread operator (`...`), destructuring
   - `yield`, `for...in`
   - Multiple classes per file
   - Top-level statements outside classes
   - `x in y` where `y` is a value-type primitive (Vector2, Color, Transform2D, etc.), an array (`Array<T>`, `T[]`, `Packed*Array`), a number, or a boolean — GDScript only supports `in` on `Dictionary` and `String`

2. **Godot validation errors** (when `godotPath` is configured) — errors detected by the Godot compiler:
   - Type mismatches
   - Unknown functions/methods
   - Parse errors in generated GDScript

### Rule options

| Option        | Type      | Description                                         |
| ------------- | --------- | --------------------------------------------------- |
| `rootDir`     | `string`  | Root directory for the project                      |
| `tsDir`       | `string`  | TypeScript source directory                         |
| `tsconfig`    | `string`  | Path to tsconfig.json                               |
| `godotPath`   | `string`  | Path to Godot executable (enables Godot validation) |
| `projectRoot` | `string`  | Godot project root (must contain `project.godot`)   |
| `sourceMap`   | `boolean` | Generate source maps for error remapping            |


## Development

```bash
yarn install
yarn build
yarn test:run
```

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
