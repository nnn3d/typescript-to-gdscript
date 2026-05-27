[← Back to README](../README.md)

> Brief: typings generation commands (Godot classes, scene typings, addons, project classes) and the structure of the generated typings tree.

# Typings

## Typings folder layout

Typings are stored in a flat `typings/` folder (no version subdirectories):

```
typings/
  index.d.ts                # Entry point (references globals/, classes/)
  globals/                  # Static stubs that ship with the package (NOT regenerated from Godot docs)
    globals.d.ts            # noLib stubs (Boolean, Number, RegExp, …) used when consumers set "noLib": true
    gd-helpers.d.ts         # gd namespace types (signal, enum_, as, ops, decorators) + int/float/bool casts
  godot-class-registry.json # Class hierarchy JSON (916 classes)
  classes/                  # Per-class .d.ts files
```

The `generate-gdscript-global-typings` command outputs the generated `classes/`, `godot-class-registry.json` to `--output-dir`. It also copies the bundled static `globals/` folder and `index.d.ts` from the installed package's `typings/` into `--output-dir` (skipped when `--output-dir` *is* the package's own bundled folder, e.g. when re-running `yarn generate:godot-typings` in the source tree).

Value types (Vector2, Color, etc.), `Dictionary`, and `Callable` use call syntax constructors (no `new`). `Dictionary` and `Callable` constructors and static methods are generated from Godot XML docs via a shared `generateConstructorInterface()` utility.

## Nullable reference types

Generated typings distinguish between value types and reference types for nullability:

- **Reference types** (Node, Material, Texture2D, etc.) — properties and method return types are generated as `T | null`, matching GDScript semantics where these can be `null` at runtime.
- **Value types** (Vector2, Color, int, float, Rect2, Transform2D, etc.) — remain non-nullable, since GDScript always initializes them to a default value.

A type is classified as a value type if its Godot XML documentation includes a copy constructor (a constructor with a single parameter of its own type). This is derived automatically from the parsed XML docs at generation time — no hardcoded type lists.

**Overrides**: Files in `src/typings/overrides/` can restore non-null return types for specific members where `null` is never returned in practice. For example, `src/typings/overrides/node.d.ts` overrides `get_tree(): SceneTree`, `get_viewport(): Viewport`, and `get_window(): Window` as non-null.

## `tstogd generate-gdscript-global-typings`

Generate TypeScript typings and class registry from Godot XML docs. Requires the `vendor/godot` git submodule. The Godot version is auto-detected from `vendor/godot/version.py`.

`--docs-dir` is **variadic** — pass every XML directory whose classes you want included. Godot ships docs across several locations (`doc/classes/` for the core, `modules/<module>/doc_classes/` for per-module additions like `@GDScript.xml`); listing them all in one invocation merges them into a single typings tree. Later dirs override earlier ones for same-named classes.

```bash
# Core classes only
tstogd generate-gdscript-global-typings --docs-dir vendor/godot/doc/classes

# Core + GDScript globals + custom module docs (variadic — list all dirs after the flag)
tstogd generate-gdscript-global-typings --output-dir typings \
  --docs-dir vendor/godot/doc/classes vendor/godot/modules/gdscript/doc_classes vendor/godot/modules/myaddon/doc_classes
```

Tip: place `--docs-dir` *last* on the command line. Variadic options consume every following positional value until the next flag, so any options that come after will be wrongly absorbed.

Options:

- `--docs-dir <dirs...>` — Godot XML class documentation directories (required, one or more)
- `--output-dir <dir>` — Root typings output directory (default: `typings`)
- `--override-dir <dir>` — User override directory for `.d.ts` files and `non-nullable.json` (combined with bundled defaults)
- `--no-default-overrides` — Disable the bundled default overrides

## `tstogd generate-typings`

Generates scene typings — per-file `.d.ts` declarations that provide typed `get_node()`, `get_parent()`, `get_child()`, and group methods based on your `.tscn` scene structure.

```bash
tstogd generate-typings
```

This generates in your `typingsDir`:
- **`.tscn.d.ts`** — Tree type structure for each scene (node types, parent/child relationships, flat paths)
- **`.gd.d.ts`** — Module augmentation per script with typed `get_node()` overloads
- **`_resources.d.ts`** — Bundled `GodotResources` entries for all asset files
- **`_index.d.ts`** — Empty global interfaces + autoload singleton declarations, including `GodotScenes` (maps scene resource paths to root node types)

### Scene typings features

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

## `tstogd generate-addon-typings`

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

This command is automatically called by `initial-convert-gd-to-ts` and `watch` (on first run). It can also be run standalone.

## `tstogd generate-class-typings`

Generate a global `.d.ts` file declaring all named classes from your TS source files, making them available globally (like in GDScript).

```bash
tstogd generate-class-typings src/**/*.ts -o globals.d.ts
```
