[← Back to README](../README.md)

> Brief: full `tstogd.json` and `tsconfig.json` reference. For the quick-start setup, `tstogd init` generates both files for you — see [CLI reference](cli.md#tstogd-init).

# Configuration

## `tsconfig.json`

`tstogd init` writes this for you. To set it up manually, add to your `tsconfig.json`:

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
    "src/_typings/**/*.d.ts"
  ]
}
```

- `noLib: true` disables the standard TypeScript libs — GDScript has a different runtime, so DOM / Node / ES libs would lie to you.
- `types: []` prevents stray `@types/*` packages from leaking in.
- The `include` array must reference the package typings directory so Godot classes, global functions, and `gd` helpers resolve.
- Adjust `src/**/*.ts` to match your `tsDir`, and the `*.d.ts` glob to match your `typingsDir` — **these two must point at the same directory** or your generated scene typings won't be picked up. (`tstogd init` keeps them in sync for you; the value shown here, `src/_typings`, is what `init` writes.)

`tstogd convert` and `tstogd watch` populate this directory for you on every run (you can also run `tstogd generate-typings` standalone). The generated `_index.d.ts` includes a `/// <reference>` to the package typings so IDEs (WebStorm, Rider, VS Code) eagerly index all Godot classes for autocomplete.

> Tip: use a **dedicated** `tsconfig.json` for the Godot subtree. If you share a tsconfig with a non-Godot TS project, `noLib: true` will break the other side.

## `tstogd.json`

Create a `tstogd.json` in your project root to configure the converter. Paths are resolved relative to the directory containing `tstogd.json` (which becomes the implicit `rootDir`):

```json
{
  "tsDir": "src",
  "gdDir": "scripts",
  "typingsDir": "src/_typings",
  "tsconfig": "tsconfig.json",
  "exclude": ["test/**", "**/*.test.ts"]
}
```

| Field              | Type       | Description                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rootDir`          | `string`   | Base for relative paths. Defaults to the directory containing `tstogd.json`.                                                                                                                                                                                                                                                   |
| `tsDir`            | `string`   | TypeScript source directory. Relative to `rootDir`. Defaults to `"src"`.                                                                                                                                                                                                                                                       |
| `gdDir`            | `string`   | GDScript output directory. Relative to `rootDir`. Defaults to `"scripts"`. Overridable per-call via `--gd-dir`.                                                                                                                                                                                                                |
| `typingsDir`       | `string`   | Directory for all generated typings (per-file `.gd.d.ts` / `.tscn.d.ts`, `_resources.d.ts`, `_index.d.ts`). Relative to `rootDir`. Falls back to `"_gdtots"` when unset; `tstogd init` writes `"src/_typings"`. Whatever you choose, the `tsconfig.json` `include` glob must match it.                                         |
| `scenesDir`        | `string`   | Directory to scan for `.tscn` scene files. Relative to `rootDir`. Defaults to `rootDir`.                                                                                                                                                                                                                                       |
| `projectFile`      | `string`   | Path to `project.godot`. Relative to `rootDir`. Defaults to `"project.godot"`.                                                                                                                                                                                                                                                 |
| `tsconfig`         | `string`   | Path to `tsconfig.json`. Defaults to `rootDir/tsconfig.json` if present.                                                                                                                                                                                                                                                       |
| `godotPath`        | `string`   | Path to the Godot executable. Falls back to the `GODOT_PATH` env var or `godot` on `PATH`.                                                                                                                                                                                                                                     |
| `exclude`          | `string[]` | Glob patterns (relative to `rootDir`) for files/folders to exclude from all CLI commands (e.g. `["test/**", "**/*.test.ts"]`). Uses [minimatch](https://github.com/isaacs/minimatch) syntax.                                                                                                                                   |
| `disableGodotLint` | `boolean`  | Disable Godot CLI validation in `convert`'s post-write check and in the ts-plugin's async Godot pass. Defaults to `false`.                                                                                                                                                                                                     |
| `cacheDir`         | `string`   | Cache directory (source maps and diagnostics stored inline). Default: `<rootDir>/node_modules/.cache/typescript-to-gdscript` when `node_modules` exists, otherwise an OS temp dir.                                                                                                                                             |
| `godotTypingsDir`  | `string`   | Override path to Godot engine typings (classes, gd-helpers, globals). Default: the bundled `node_modules/typescript-to-gdscript/typings`.                                                                                                                                                                                      |
| `converterOptions` | `object`   | Converter behavior tweaks. Currently: `{ "generateGlobalClassTypes": boolean }` — when `true`, non-anonymous classes are emitted into `declare global` so consumers can use them without `import`. When `false` (default), classes are module-scoped and must be imported. Addons always emit globals regardless of this flag. |
| `lib`              | `boolean`  | Marks this project as a shared tstogd library. Library imports use relative GDScript paths. Defaults to `false`.                                                                                                                                                                                                               |
| `externalPackages` | `object[]` | Adds shared tstogd folders or changes their mount names. Each item has `from` and optional `to` fields.                                                                                                                                                                                                                        |

> **GD→TS conversion helpers are always-on.** Older revisions of this doc mentioned a `helpers.signalHandler` toggle — it doesn't exist in the source. See [GD-to-TS migration](gd-to-ts-migration.md) for the full helper set; the only user-facing toggle is `--unsafe-use-any` on `initial-convert-gd-to-ts`.

## Shared packages

A shared package builds its own complete Godot content. Set `lib: true` in the package configuration:

```json
{
  "lib": true,
  "tsDir": "src",
  "gdDir": "dist/godot"
}
```

Library imports use relative `preload()` paths. A consumer can mount the package at a different project location.

Publish the TypeScript source, `tstogd.json`, generated GDScript, scenes, resources, and Godot UID files. Godot creates the UIDs during its normal scan.

Keep the UID files stable between releases. This prevents broken resource references after a package update.

`tstogd convert` and `tstogd watch` scan the project dependencies. They link each dependency with `lib: true` into `tstogd_modules/<package-name>`.

The consumer does not convert the dependency. Godot scans the complete linked package, including files that no TypeScript import uses.

Use `externalPackages` for a plain folder or a custom mount name:

```json
{
  "externalPackages": [
    { "from": "../shared-gameplay", "to": "gameplay" },
    { "from": "@scope/shared", "to": "shared-v2" }
  ]
}
```

`from` accepts a package name or a path relative to `rootDir`. `to` names a path below `tstogd_modules`.

Each external package must contain `tstogd.json` with `lib: true`. Its `tsDir` and `gdDir` must stay inside the linked package root.

tstogd always excludes `tstogd_modules` from conversion and typing scans. Add `tstogd_modules/` to the project `.gitignore` because tstogd recreates these links.

The link step also creates `node_modules/.gdignore` when it links an npm package. This marker prevents Godot from scanning the same package twice.

For UID behavior after resource moves, see the [Godot ResourceUID reference](https://docs.godotengine.org/en/stable/classes/class_resourceuid.html).
