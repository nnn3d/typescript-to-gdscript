[← Back to README](../README.md)

> Brief: full `tstogd.json` field reference, plus advanced details of the anonymous-class (`_FilenameClass`) convention.

# Configuration

## `tstogd.json`

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
| `helpers`          | `object`   | GD-to-TS conversion helpers. Currently: `{ "signalHandler": boolean }` — see [GD-to-TS migration](gd-to-ts-migration.md). |

## Anonymous classes — advanced details

The basic `_FilenameClass` convention is documented in the [README](../README.md#anonymous-classes-_filenameclass-convention). This section covers the addon-mode override and the `G_Foo` escape.

### `G_Foo` escape

A TS class named `_Foo` produces a `.gd` file with no `class_name`. If a real GD file declares `class_name _Foo`, the TS shadow is escaped to `G_Foo` so the underscore-prefix convention stays unambiguous.

The `G_` escape is **one-way** — applied during GD→TS conversion as a fallback, but TS→GD treats `G_Foo` as a regular class name and emits `class_name G_Foo` verbatim. After the initial migration `G_Foo` is the canonical identifier on both sides; there's no hidden reversible alias to keep track of.

### Addon override: `_$CLASS$_` sentinel

When `generate-addon-typings` runs, anonymous addon scripts (no `class_name`) are emitted with the sentinel name `_$CLASS$_` instead of `_FilenameClass`. `$` is not a valid GDScript identifier character, so the sentinel can never collide with a real GD class. Each addon's `.ts` is its own ES module, so multiple addons exporting `_$CLASS$_` don't collide either — consumers reach the class through the `import type { _$CLASS$_ as ScriptClass }` alias in the generated `.gd.d.ts`, never by global name.

### Addons preserve `_`-prefixed `class_name` verbatim

With `_$CLASS$_` claiming the "anonymous" slot for addons, real `class_name _Foo` declarations are unambiguous and the `_Foo` → `G_Foo` escape is bypassed in addon mode. Addon class names are external — third-party-owned, globally registered, referenced by consumer code under that exact name — so a rename would silently break things. `_Foo` lands in `declare global` as a normal global class. The escape still applies in non-addon GD→TS runs.
