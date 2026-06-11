[← Back to README](../README.md)

> Brief: full reference for every `tstogd` CLI command and its flags.

# CLI Reference

The CLI binary is `tstogd`. A global `--debug` flag (placed before the subcommand) enables verbose info/debug messages on any command.

> **You usually only need `convert` and `watch`.** Both convert your TypeScript _and_ regenerate every typing (scene, script, resource, addon) _and_ run the diagnostic check in a single pass — there is no separate "generate typings" step to remember. The remaining commands (`generate-typings`, `generate-addon-typings`, `validate-gd`, `clear-cache`, …) cover one-off setup, migration, or custom Godot builds; a typical project never runs them directly.

> **Config keys vs flags.** Names like `tsDir`, `gdDir`, `typingsDir`, `rootDir`, `scenesDir`, and `godotPath` referenced below are fields read from **`tstogd.json`** (see [Configuration](configuration.md#tstogdjson) for defaults and the full schema). Most commands accept matching CLI flags (`--ts-dir`, `--gd-dir`, …) that override the config value for that run. When this page says e.g. "reads from `gdDir`", it means the value resolved from `tstogd.json` (or its overriding flag).

## Command index

| Command                                                                        | Purpose                                                     |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| [`init`](#tstogd-init)                                                         | Interactive project setup                                   |
| [`convert`](#tstogd-convert)                                                   | Convert TS → GD                                             |
| [`watch`](#tstogd-watch)                                                       | Watch TS files and auto-convert                             |
| [`validate-gd`](#tstogd-validate-gd)                                           | Run Godot CLI validation on `.gd` files, remap errors to TS |
| [`clear-cache`](#tstogd-clear-cache)                                           | Clear conversion cache                                      |
| [`initial-convert-gd-to-ts`](#tstogd-initial-convert-gd-to-ts)                 | One-shot bulk GD → TS migration                             |
| [`generate-typings`](#tstogd-generate-typings)                                 | Generate scene/script typings                               |
| [`generate-gdscript-global-typings`](#tstogd-generate-gdscript-global-typings) | Generate Godot engine class typings from XML docs           |
| [`generate-addon-typings`](#tstogd-generate-addon-typings)                     | Generate typings for addon GDScript files                   |
| [`open-editor`](#tstogd-open-editor)                                           | Open `.gd` as its `.ts` source in an editor                 |

## `tstogd init`

Initialize a Godot project for typescript-to-gdscript. Walks through an interactive setup:

```bash
tstogd init
```

The command will:

1. **Create `tstogd.json`** — asks for TypeScript source directory, GDScript output directory, and typings directory. `gdDir` is written only when it differs from `tsDir`.
2. **Create `tsconfig.json`** (optional, asks first) — from a template with proper settings for Godot development (`noLib`, strict mode, typings reference, `typescript-to-gdscript/ts-plugin` enabled under `compilerOptions.plugins` for live IDE diagnostics)
3. **Install npm packages** (optional, asks first) — TypeScript as a dev dependency via `npm install --save-dev`. If `package.json` doesn't exist, offers to create a minimal one.
4. **Create `node_modules/.gdignore`** (optional, asks first) — to exclude node_modules from Godot's file scanner. Only offered when `node_modules` already exists.
5. **Add `node_modules/` to `.gitignore`** (optional, asks first) — creates the file or appends to it if the rule isn't already present.

Each step is skipped if its target file already exists (the existing file is preserved).

## `tstogd convert`

Convert TypeScript files to GDScript. A full `tstogd convert` run is self-contained: it converts, **regenerates all scene/script/resource/addon typings** (the same output as `generate-typings` + `generate-addon-typings`), and then runs the diagnostic check described below. You do not need to call the typings commands separately.

```bash
tstogd convert src/Player.ts --gd-dir scripts/
```

Source maps are stored in the cache directory (not alongside `.gd` files).

By default every file is converted fresh on each run — correct even when the
output depends on types from _other_ files (imports, scene typings, global
classes) that changed since the last run. Results are still written to the
cache so `watch` and the IDE plugin can reuse them.

Options:

- `--ts-dir <dir>` — TypeScript source directory (overrides `tsDir` from `tstogd.json`)
- `--gd-dir <dir>` — GDScript output directory (overrides `gdDir` from `tstogd.json`)
- `--root-dir <dir>` — Root directory (default: `.`)
- `--tsconfig <path>` — Path to tsconfig.json
- `--use-cache` — Skip conversion for files with a fresh cache entry (fast, but may keep stale `.gd` output when types in imported files or global typings changed)
- `--no-cache` — Disable cache entirely (no reads, no writes)
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `# ERROR:` comments)

### Diagnostic modes

After converting, `convert` runs a full three-source diagnostic check unless disabled:

| Source     | Label             | Notes                                                                                        |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------- |
| TypeScript | `[TS:severity]`   | Semantic + syntactic errors (requires `--tsconfig`; noise codes TS2434/2435/2449 suppressed) |
| Converter  | `[CONV:severity]` | Errors and warnings from the TS→GD transformer                                               |
| Godot      | `[GD:severity]`   | Full-project `godot --check-only` (requires `--godot-path` and `project.godot`)              |

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

## `tstogd watch`

The long-running version of `convert`, and the only command most projects keep running. It watches not just `.ts` files but also `.tscn` scenes, `.tres`/`.res` resources, common asset files, and `project.godot` — so editing your scene tree in Godot **regenerates the affected scene typings live**. Each changed `.ts` is reconverted (with source maps and typings updated incrementally); after the batch settles (~1s debounce) it runs a full diagnostic check and clears the console before printing results.

```bash
tstogd watch --ts-dir src --gd-dir scripts
```

Source maps are stored in the cache directory.

> **Self-healing:** an edit in one file can change the correct output of _other_ files (shared types, scene typings). When that happens, it surfaces as new errors in the per-cycle check, and `watch` reconverts those files automatically. Stale output that causes no error may still linger, so run `tstogd convert` after a session for a guaranteed full refresh.

Options:

- `--root-dir <dir>` — Root directory to watch (default: `.`)
- `--ts-dir <dir>` — TypeScript source directory (overrides `tsDir` from `tstogd.json`)
- `--gd-dir <dir>` — GDScript output directory (overrides `gdDir` from `tstogd.json`)
- `--tsconfig <path>` — Path to tsconfig.json
- `--typings-dir <path>` — Directory for all generated typings (overrides `typingsDir` from `tstogd.json`; relative to `rootDir`)
- `--godot-path <path>` — Path to Godot executable (enables GD validation after conversion)
- `--project-root <dir>` — Godot project root for validation
- `--emit-on-error` — Emit output files even when conversion errors occur
- `--no-check` — Disable the debounced full-project diagnostic check

## `tstogd validate-gd`

Run Godot's `--check-only` validator on one or more `.gd` files (or `.ts` files — they auto-resolve to the corresponding `.gd`) and remap any errors back to TypeScript line/column via the cached source maps.

```bash
tstogd validate-gd scripts/Player.gd
tstogd validate-gd src/Player.ts    # auto-resolves to scripts/Player.gd
```

Options:

- `--godot-path <path>` — Path to Godot executable (otherwise resolved via `godotPath` / `GODOT_PATH`)
- `--project-root <dir>` — Godot project root, must contain `project.godot` (default: `.`)

Exits non-zero if any error-severity diagnostic is reported. Output format: `[ERROR|WARN|INFO] <file>:<line>:<col> - <message>`.

## `tstogd clear-cache`

Clear the conversion cache. Useful when cache becomes stale or after upgrading the converter.

```bash
tstogd clear-cache
```

No options.

## `tstogd initial-convert-gd-to-ts`

One-shot bulk **GD → TS** conversion for migrating an existing GDScript project. Reads `.gd` files from `gdDir` and writes mirrored `.ts` files into `tsDir` (both `tstogd.json` keys), preserving the directory structure. Refuses to overwrite existing `.ts` files unless `--force` is passed.

```bash
# Convert every .gd under gdDir → mirrored .ts under tsDir
tstogd initial-convert-gd-to-ts

# Convert specific files
tstogd initial-convert-gd-to-ts scripts/Player.gd scripts/enemies/*.gd
```

Arguments / options:

- `[files...]` — GDScript files or glob patterns to convert. Omit to convert every `.gd` under `gdDir`.
- `--gd-dir <dir>` — GDScript **source** directory to read from (overrides `gdDir` from `tstogd.json`; config default `scripts`).
- `--ts-dir <dir>` — TypeScript **output** directory to write to (overrides `tsDir` from `tstogd.json`; config default `src`).
- `--root-dir <dir>` — Root directory, base for the two dirs above (default: `.`).
- `--registry <path>` — Path to `godot-class-registry.json` (overrides `tstogd.json` and the bundled registry).
- `--unsafe-use-any` — Use `any` instead of `unknown` for unresolvable types. Less strict, more error-prone.
- `--emit-on-error` — Write output files even when conversion errors occur (errors inlined as comments).
- `-f, --force` — Overwrite existing `.ts` outputs. Without it, files whose `.ts` already exists are skipped and the command exits non-zero.

**Where files come from and go:** input is resolved relative to `gdDir`; each `<gdDir>/path/to/x.gd` is written to `<tsDir>/path/to/x.ts`. Full details + the post-conversion helpers in [GD-to-TS migration](gd-to-ts-migration.md#tstogd-initial-convert-gd-to-ts).

## `tstogd generate-typings`

> **Usually automatic.** `convert` and `watch` run this on every conversion, so you normally never call it directly. Reach for it standalone only to regenerate typings _without_ converting — e.g. a CI step, or after editing scenes outside a running watcher.

Generate scene/script typings — per-file `.gd.d.ts` / `.tscn.d.ts`, `_resources.d.ts`, and `_index.d.ts` — so `get_node()`, `get_parent()`, group queries, autoloads, and `res://` paths are typed from your `.tscn` / `.gd` / `.tres` files. Scans `tsDir` (the `tstogd.json` key) when no files are given.

```bash
tstogd generate-typings
```

Options:

- `[files...]` — TypeScript source files or glob patterns (default: all `.ts` under `tsDir` from `tstogd.json`).
- `-o, --output <path>` — Output `.d.ts` directory (overrides the resolved `typingsDir` from `tstogd.json`).
- `--typings-dir <path>` — Directory for generated typings (overrides `typingsDir` from `tstogd.json`; relative to `rootDir`).
- `--root-dir <dir>` — Root directory (default: `.`).
- `--tsconfig <path>` — Path to `tsconfig.json`.

Full output-tree layout and the global project types in [Typings](typings.md#tstogd-generate-typings).

## `tstogd generate-gdscript-global-typings`

Generate the bundled Godot **engine class** typings (`classes/` + `godot-class-registry.json`) from Godot's XML docs. Needed only when regenerating typings for a new Godot version — the package ships pre-generated typings.

```bash
tstogd generate-gdscript-global-typings \
  --output-dir typings \
  --docs-dir vendor/godot/doc/classes vendor/godot/modules/gdscript/doc_classes
```

Options:

- `--docs-dir <dirs...>` — **Required.** One or more Godot XML doc directories. Later dirs override earlier ones for same-named classes. Place this flag **last** (variadic — it consumes following positionals).
- `--output-dir <dir>` — Root typings output directory (default: `typings`).
- `--override-dir <dir>` — User override directory for `.d.ts` files + `non-nullable.json` (combined with bundled defaults).
- `--no-default-overrides` — Disable the bundled default overrides.

Details in [Typings](typings.md#tstogd-generate-gdscript-global-typings).

## `tstogd generate-addon-typings`

Generate typings for third-party GDScript addons under `addons/`. Converts each addon `.gd` to `.ts`, then emits `.gd.d.ts` with global class declarations so addon classes are usable from your TypeScript.

```bash
tstogd generate-addon-typings
```

Options:

- `-o, --output <path>` — Output directory for generated typings.
- `--root-dir <dir>` — Root directory (default: `.`).

Run automatically by `convert` (every run), `watch` (first run), and `initial-convert-gd-to-ts` — you rarely need it standalone. Details in [Typings](typings.md#tstogd-generate-addon-typings).

## `tstogd open-editor`

Open a `.gd` file in an external editor as its corresponding `.ts` source, remapping the GD line/column to TS via the cached source map. Designed for Godot's external-editor integration (double-click a script → opens the `.ts`).

```bash
tstogd open-editor -f "{file}" -l {line} -c {col} -p "{project}" -e "code --goto {tsFile}:{tsLine}:{tsCol}"
```

Options:

- `-f, --file <path>` — **Required.** GDScript file path (absolute or `res://`).
- `-e, --editor-cmd <cmd>` — **Required.** Editor command template. Placeholders: `{tsFile}`, `{tsLine}`, `{tsCol}` (remapped via source map).
- `-l, --line <n>` — GDScript line number from Godot (default: `1`).
- `-c, --col <n>` — GDScript column number from Godot (default: `1`).
- `-p, --project <dir>` — Godot project directory (where `tstogd.json` lives).

Godot editor-settings configuration and per-editor command examples in [IDE integration](ide-integration.md#tstogd-open-editor).

## See also

- [GD-to-TS migration](gd-to-ts-migration.md) — `initial-convert-gd-to-ts` and the post-conversion helpers
- [Typings](typings.md) — `generate-typings`, `generate-gdscript-global-typings`, `generate-addon-typings`
- [IDE integration](ide-integration.md) — `open-editor` and editor configuration
