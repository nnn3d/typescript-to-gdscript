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

| Field | Type | Description |
|-------|------|-------------|
| `godotVersion` | `string` | Godot version for typings lookup (e.g. `"4.6"`). Defaults to `"latest"`. |
| `registryPath` | `string` | Path to a custom `godot-class-registry.json`. Overrides `godotVersion`. |
| `rootDir` | `string` | Root directory for TS source files. |
| `outputDir` | `string` | Output directory for GDScript files. |
| `sourceMap` | `boolean` | Generate source maps. |
| `tsconfig` | `string` | Path to `tsconfig.json`. |

## CLI Commands

The CLI binary is `ts2gd`.

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

### `ts2gd convert-gd <files...>`

Convert GDScript files to TypeScript. Uses the Godot class registry to resolve inherited members for correct `this.` prefix insertion.

```bash
ts2gd convert-gd addons/plugin/Plugin.gd -o src/
```

Registry resolution order:
1. `--registry` CLI flag (explicit path to `godot-class-registry.json`)
2. `registryPath` from `tstogd.json` in CWD
3. `godotVersion` from `tstogd.json` → bundled `typings/<version>/`
4. Bundled `typings/latest/godot-class-registry.json`

Options:
- `-o, --output-dir <dir>` — Output directory
- `--registry <path>` — Path to `godot-class-registry.json`

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
- `--class-typings <path>` — Output path for global class typings

### `ts2gd generate-typings`

Generate TypeScript typings and class registry from Godot XML docs. Requires the `vendor/godot` git submodule.

```bash
ts2gd generate-typings --docs-dir vendor/godot/doc/classes --set-latest
```

Options:
- `--docs-dir <dir>` — Godot XML class documentation directory (required)
- `--typings-dir <dir>` — Root typings directory (default: `typings`)
- `--patch-dir <dir>` — Directory containing `.patch` files for manual type improvements
- `--version <ver>` — Godot version label (auto-detected from `vendor/godot/version.py`)
- `--set-latest` — Also copy to `latest/` (default: true)

### `ts2gd set-latest <version>`

Switch the active "latest" typings to an already-generated version.

```bash
ts2gd set-latest 4.6
```

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
```

### Type casting (`as`)

```typescript
let sprite = gd.as(get_node("Sprite"), Sprite2D);
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

## Versioned Typings

Typings are stored in `typings/<version>/` folders:

```
typings/
  index.d.ts          # Entry point (references latest)
  gd-helpers.d.ts     # gd namespace types
  4.6/
    godot.d.ts
    godot-class-registry.json
  latest/             # Copy of active version
    godot.d.ts
    godot-class-registry.json
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

export default [{
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
    'ts2gd/convert': ['error', {
      rootDir: '.',
      godotPath: 'godot',       // optional: enables Godot validation
      projectRoot: '.',          // optional: Godot project root (must contain project.godot)
    }],
  },
}];
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

2. **Godot validation errors** (when `godotPath` is configured) — errors detected by the Godot compiler:
   - Type mismatches
   - Unknown functions/methods
   - Parse errors in generated GDScript

### Rule options

| Option | Type | Description |
|--------|------|-------------|
| `rootDir` | `string` | Root directory for the project |
| `tsDir` | `string` | TypeScript source directory |
| `tsconfig` | `string` | Path to tsconfig.json |
| `godotPath` | `string` | Path to Godot executable (enables Godot validation) |
| `projectRoot` | `string` | Godot project root (must contain `project.godot`) |
| `sourceMap` | `boolean` | Generate source maps for error remapping |

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
