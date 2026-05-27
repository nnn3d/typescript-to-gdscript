[← Back to README](../README.md)

> Brief: full reference for every `tstogd` CLI command and its flags.

# CLI Reference

The CLI binary is `tstogd`.

## Command index

| Command | Purpose |
| ------- | ------- |
| [`init`](#tstogd-init) | Interactive project setup |
| [`convert`](#tstogd-convert) | Convert TS → GD |
| [`watch`](#tstogd-watch) | Watch TS files and auto-convert |
| [`clear-cache`](#tstogd-clear-cache) | Clear conversion cache |
| [`initial-convert-gd-to-ts`](gd-to-ts-migration.md#tstogd-initial-convert-gd-to-ts) | One-shot bulk GD → TS migration |
| [`generate-typings`](typings.md#tstogd-generate-typings) | Generate scene typings |
| [`generate-gdscript-global-typings`](typings.md#tstogd-generate-gdscript-global-typings) | Generate Godot class typings from XML docs |
| [`generate-addon-typings`](typings.md#tstogd-generate-addon-typings) | Generate typings for addon GDScript files |
| [`generate-class-typings`](typings.md#tstogd-generate-class-typings) | Generate globals from your TS classes |
| [`open-editor`](ide-integration.md#tstogd-open-editor) | Open `.gd` as its `.ts` source in an editor |

## `tstogd init`

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

## `tstogd convert`

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

### Diagnostic modes

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

## `tstogd watch`

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

## `tstogd clear-cache`

Clear the conversion cache. Useful when cache becomes stale or after upgrading the converter.

```bash
tstogd clear-cache
```

## See also

- [GD-to-TS migration](gd-to-ts-migration.md) — `initial-convert-gd-to-ts` and the post-conversion helpers
- [Typings](typings.md) — `generate-typings`, `generate-gdscript-global-typings`, `generate-addon-typings`, `generate-class-typings`
- [IDE integration](ide-integration.md) — `open-editor` and editor configuration
