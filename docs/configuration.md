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
    "_gdtots/**/*.d.ts"
  ]
}
```

- `noLib: true` disables the standard TypeScript libs — GDScript has a different runtime, so DOM / Node / ES libs would lie to you.
- `types: []` prevents stray `@types/*` packages from leaking in.
- The `include` array must reference the package typings directory so Godot classes, global functions, and `gd` helpers resolve.
- Adjust `src/**/*.ts` and `_gdtots/**/*.d.ts` to match your `rootDir` and `typingsDir`.

Run `tstogd generate-typings` to populate the typings directory. The generated `_index.d.ts` includes a `/// <reference>` to the package typings so IDEs (WebStorm, Rider, VS Code) eagerly index all Godot classes for autocomplete.

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

| Field              | Type       | Description                                                              |
| ------------------ | ---------- | ------------------------------------------------------------------------ |
| `rootDir`          | `string`   | Base for relative paths. Defaults to the directory containing `tstogd.json`. |
| `tsDir`            | `string`   | TypeScript source directory. Relative to `rootDir`. Defaults to `"src"`. |
| `gdDir`            | `string`   | GDScript output directory. Relative to `rootDir`. Defaults to `"scripts"`. Overridable per-call via `--gd-dir`. |
| `typingsDir`       | `string`   | Directory for all generated typings (per-file `.gd.d.ts` / `.tscn.d.ts`, `_resources.d.ts`, `_index.d.ts`). Relative to `rootDir`. Defaults to `"_gdtots"`. |
| `scenesDir`        | `string`   | Directory to scan for `.tscn` scene files. Relative to `rootDir`. Defaults to `rootDir`. |
| `projectFile`      | `string`   | Path to `project.godot`. Relative to `rootDir`. Defaults to `"project.godot"`. |
| `tsconfig`         | `string`   | Path to `tsconfig.json`. Defaults to `rootDir/tsconfig.json` if present. |
| `godotPath`        | `string`   | Path to the Godot executable. Falls back to the `GODOT_PATH` env var or `godot` on `PATH`. |
| `exclude`          | `string[]` | Glob patterns (relative to `rootDir`) for files/folders to exclude from all CLI commands (e.g. `["test/**", "**/*.test.ts"]`). Uses [minimatch](https://github.com/isaacs/minimatch) syntax. |
| `disableGodotLint` | `boolean`  | Disable Godot CLI validation in `convert`'s post-write check and in the ts-plugin's async Godot pass. Defaults to `false`. |
| `cacheDir`         | `string`   | Cache directory (source maps and diagnostics stored inline). Default: `<rootDir>/node_modules/.cache/typescript-to-gdscript` when `node_modules` exists, otherwise an OS temp dir. |
| `godotTypingsDir`  | `string`   | Override path to Godot engine typings (classes, gd-helpers, globals). Default: the bundled `node_modules/typescript-to-gdscript/typings`. |
| `converterOptions` | `object`   | Converter behavior tweaks. Currently: `{ "generateGlobalClassTypes": boolean }` — when `true`, non-anonymous classes are emitted into `declare global` so consumers can use them without `import`. When `false` (default), classes are module-scoped and must be imported. Addons always emit globals regardless of this flag. |

> **GD→TS conversion helpers are always-on.** Older revisions of this doc mentioned a `helpers.signalHandler` toggle — it doesn't exist in the source. See [GD-to-TS migration](gd-to-ts-migration.md) for the full helper set; the only user-facing toggle is `--unsafe-use-any` on `initial-convert-gd-to-ts`.
