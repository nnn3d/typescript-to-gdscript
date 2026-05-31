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
    gd-helpers.d.ts         # gd namespace types (signal, getset, dict, as, is, eval, match, ops) + int/float/bool/String casts + StringName/NodePath constructors + Promise deprecation overlay
  godot-class-registry.json # Class hierarchy JSON
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

## `tstogd generate-typings`

Generates scene typings — per-file `.d.ts` declarations that provide typed `get_node()`, `get_parent()`, `get_child()`, and group methods based on your `.tscn` scene structure.

```bash
tstogd generate-typings
```

This generates in your `typingsDir`:
- **`.tscn.d.ts`** — Tree type structure for each scene (node types, parent/child relationships, flat paths)
- **`.gd.d.ts`** — Module augmentation per script with typed `get_node()` overloads
- **`_resources.d.ts`** — Bundled `GodotResources` entries for all asset files
- **`_index.d.ts`** — Empty global interfaces (`GodotScripts`, `GodotSceneTrees`, `GodotScenes`, `GodotResources`, `GodotGroups`, `GodotConnections`), the six `keyof` aliases (`GodotResourceName`, `GodotSceneName`, `GodotSceneTreeName`, `GodotScriptName`, `GodotGroupName`, `GodotConnectionSceneName`), and autoload singleton declarations

### Global project key-union types

Each of the six project-wide interfaces gets a parallel `Godot<X>Name` alias defined as `keyof Godot<X>s`. The aliases live in `_index.d.ts` inside `declare global`, so they're available without an `import`.

| Alias                          | Equivalent to                  | What its values look like                         |
| ------------------------------ | ------------------------------ | ------------------------------------------------- |
| `GodotResourceName`            | `keyof GodotResources`         | `"res://Player.tscn"`, `"res://Enemy.gd"`, `"res://icon.png"`, … |
| `GodotSceneName`               | `keyof GodotScenes`            | `"res://Player.tscn"`, `"res://Level.tscn"`, …    |
| `GodotSceneTreeName`           | `keyof GodotSceneTrees`        | Same set as `GodotSceneName` — pick this one if you want the tree type, not the root node |
| `GodotScriptName`              | `keyof GodotScripts`           | `"res://Player.gd"`, `"res://Enemy.gd"`, …        |
| `GodotGroupName`               | `keyof GodotGroups`            | `"enemies"`, `"entities"`, … (group identifiers from `.tscn`) |
| `GodotConnectionSceneName`     | `keyof GodotConnections`       | Scene paths that have `[connection]` entries     |

`keyof` is resolved lazily, so each alias picks up new entries as more `.tscn.d.ts` / `.gd.d.ts` / `_resources.d.ts` files merge into the underlying interfaces. Typos in resource paths or group names become compile-time errors, and IDEs autocomplete the literal union as you type.

```typescript
class AssetRegistry extends Node {
  cache: Dictionary<GodotResourceName, Resource> = {};

  preload_asset(path: GodotResourceName) {
    if (!this.cache.has(path)) this.cache.set(path, load(path));
    return this.cache.get(path);
  }

  pick_random_group(group: GodotGroupName): Node | null {
    const nodes = this.get_tree().get_nodes_in_group(group);
    return nodes.size() > 0 ? nodes[0] : null;
  }
}
```

For the typed lookup itself (turning a path into its resource type, a group name into its node-union, a script path into its class), index the interface directly:

```typescript
const player_class: GodotScripts["res://Player.gd"] = Player;       // typeof Player
const level_tree: GodotSceneTrees["res://Level.tscn"]   = /* ... */; // tree type
const enemies: GodotGroups["enemies"]["res://Level.tscn"] = /* ... */;
```

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

## `tstogd generate-gdscript-global-typings`

> **Most users never run this.** The package already ships pre-generated typings for the supported stock Godot version (`typings/classes/` + `godot-class-registry.json`). You only need this command if you're on a different engine version, a fork, or one with extra C++ modules / GDExtension classes — and want the engine-class typings to match your build exactly.

Generate the bundled Godot **engine class** typings and class registry from Godot's XML class docs. The Godot version is auto-detected from `version.py` next to the docs (or `vendor/godot/version.py`).

`--docs-dir` is **variadic** — pass every XML directory whose classes you want included. Godot ships docs across several locations (`doc/classes/` for the core, `modules/<module>/doc_classes/` for per-module additions like `@GDScript.xml`); listing them all in one invocation merges them into a single typings tree. Later dirs override earlier ones for same-named classes.

Tip: place `--docs-dir` *last* on the command line. Variadic options consume every following positional value until the next flag, so any options that come after will be wrongly absorbed.

Options:

- `--docs-dir <dirs...>` — Godot XML class documentation directories (required, one or more).
- `--output-dir <dir>` — Root typings output directory (default: `typings`).
- `--override-dir <dir>` — User override directory for `.d.ts` files and `non-nullable.json` (combined with bundled defaults).
- `--no-default-overrides` — Disable the bundled default overrides.

### Using it for a custom Godot build

The Godot source tree contains the class XML you need under `doc/classes/` (core) and `modules/<name>/doc_classes/` (per-module / custom classes). Generate typings into a folder you control, then point both `tsconfig.json` and `tstogd.json` at it.

**1. Generate the typings from your Godot's docs.** Pick an output directory outside `node_modules` (so it survives reinstalls), e.g. `_godot-typings/`:

```bash
tstogd generate-gdscript-global-typings \
  --output-dir _godot-typings \
  --docs-dir /path/to/your-godot/doc/classes \
            /path/to/your-godot/modules/gdscript/doc_classes \
            /path/to/your-godot/modules/your_custom_module/doc_classes
```

This writes `_godot-typings/classes/`, `_godot-typings/godot-class-registry.json`, and copies the static `globals/` + `index.d.ts` into it — a complete, self-contained typings tree.

**2. Point `tsconfig.json` at the custom typings** instead of the bundled package ones. Replace the `node_modules/typescript-to-gdscript/typings` entry in `include` with your folder:

```jsonc
{
  "compilerOptions": {
    "noLib": true,
    "strict": true,
    "noEmit": true,
    "types": []
  },
  "include": [
    "_godot-typings",        // ← your generated engine typings (was node_modules/typescript-to-gdscript/typings)
    "src/**/*.ts",
    "src/_typings/**/*.d.ts"
  ]
}
```

**3. Point `tstogd.json` at the same folder** via `godotTypingsDir`:

```json
{
  "tsDir": "src",
  "gdDir": "scripts",
  "godotTypingsDir": "_godot-typings"
}
```

`godotTypingsDir` (resolved relative to the directory containing `tstogd.json`) is what `generate-typings` writes into the `/// <reference path="…" />` line at the top of the generated `_index.d.ts`, so your IDE eagerly indexes your custom engine classes for autocomplete. It defaults to the bundled package typings when unset.

**Conversion registry (GD → TS only).** The `godot-class-registry.json` the converter uses for `this.`-resolution, operator detection, and nullable classification is separate from the typings tree — it is **not** read from `godotTypingsDir`. If you're migrating GDScript with custom classes, pass your generated registry explicitly:

```bash
tstogd initial-convert-gd-to-ts --registry _godot-typings/godot-class-registry.json
```

(`generate-typings` and `convert` always use the bundled registry; only `initial-convert-gd-to-ts` accepts `--registry`.)

Re-run step 1 whenever you rebuild Godot with new/changed classes.

> Keep `_godot-typings/` in version control (or a build step) so teammates and CI get the same engine surface. The bundled package typings remain the default whenever `godotTypingsDir` is unset.

### Custom override files

Godot's XML docs don't capture everything TypeScript wants — some methods are documented as returning a base class when they always return a concrete one, some return values are never actually `null`, and some methods deserve extra overloads or generics. The generator applies a layer of **overrides** on top of the raw XML to fix these. The package ships a default set — browse [`src/typings/overrides/`](../src/typings/overrides) as a working reference — and you can supply **your own** via `--override-dir`, useful for custom-module classes, project-specific refinements, or correcting an engine signature you know better than the docs.

```bash
tstogd generate-gdscript-global-typings \
  --output-dir _godot-typings \
  --override-dir my-overrides \
  --docs-dir /path/to/your-godot/doc/classes
```

Your directory is **combined with the bundled defaults** (defaults loaded first, your dir second). Pass `--no-default-overrides` to drop the bundled set entirely and use only yours. Conflicts resolve **by declaration name**: if both you and the bundled set override the same class `X`, your declaration of `X` replaces the bundled one *as a whole* (re-list any bundled members you still want). Classes you don't touch keep their bundled overrides. An override directory can contain two kinds of files:

#### 1. `.d.ts` member overrides

Each `.d.ts` file declares one or more `interface X { … }` / `declare class X { … }` blocks. The **declaration name** (not the filename) is the key — the members you list are applied on top of the class `X` generated from the XML. A member you declare **replaces** the generated one; a member that doesn't exist yet is **added**; multiple signatures for the same name become **overloads**. Members of `X` you don't mention keep their XML-generated form.

```typescript
// my-overrides/resource.d.ts
declare class Resource {
  // `duplicate()` is documented as returning Resource; refine to `this`
  // so subclasses keep their own type.
  duplicate(deep?: boolean): this;
}
```

```typescript
// my-overrides/node.d.ts — add a generic so the result type is precise
declare class Node {
  get_parent<N extends Node = Node>(): N;
}
```

This is exactly how the bundled defaults work — see [`src/typings/overrides/`](../src/typings/overrides) for real examples: [`array.d.ts`](../src/typings/overrides/array.d.ts), [`dictionary.d.ts`](../src/typings/overrides/dictionary.d.ts), [`node.d.ts`](../src/typings/overrides/node.d.ts), [`packed-scene.d.ts`](../src/typings/overrides/packed-scene.d.ts), and more. A special [`_globals.d.ts`](../src/typings/overrides/_globals.d.ts) overrides **global functions** (the `@GlobalScope` free functions like `load`, `preload`, `str`) the same way.

#### 2. `non-nullable.json` — opt members out of `T | null`

By default every reference-typed return is widened to `T | null` (see [Nullable reference types](#nullable-reference-types)). When a method *never* returns null in practice, list it in `non-nullable.json` to keep its return type strict. The format is `ClassName → [methodName, …]`:

```json
{
  "Node": ["get_tree", "get_viewport", "get_window"],
  "SceneTree": ["create_timer", "create_tween", "root"],
  "MyCustomSingleton": ["get_instance"]
}
```

With the entry above, `node.get_tree()` is typed `SceneTree` instead of `SceneTree | null`. Your `non-nullable.json` merges with the bundled one **per class**: a class you list replaces the bundled member list for that class (so re-list the bundled members if you're extending an already-covered class like `Node`), while classes you omit keep their bundled entries. See the bundled [`src/typings/overrides/non-nullable.json`](../src/typings/overrides/non-nullable.json) for the full default set.

> Both file kinds are optional and independent — an override dir can have just `.d.ts` files, just `non-nullable.json`, or both. After generating, point `tsconfig.json` + `tstogd.json` at the output folder as shown above.
