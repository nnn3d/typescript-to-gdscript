# How it works

You write `.ts` files, tstogd turns them into `.gd` files, and Godot only ever sees the `.gd`. Two commands run the whole loop: `tstogd convert` once, and `tstogd watch` while you work.

## Where files go

`tstogd.json`, written by `tstogd init`, says where things live:

```json
{
  "tsDir": "src",
  "gdDir": "scripts",
  "typingsDir": "src/_typings"
}
```

Each `.ts` file under `tsDir` becomes a `.gd` file at the same relative path under `gdDir`:

```text
src/player.ts            ->  scripts/player.gd
src/enemies/goblin.ts    ->  scripts/enemies/goblin.gd
```

Attach the `.gd` files to nodes in Godot as usual. Each `.ts` file holds one class, the same way each `.gd` file is one script.

> **Note:** Don't edit the generated `.gd` files. The next conversion overwrites them. Change the `.ts` instead.

## `tstogd convert`

```bash
npx tstogd convert
```

One run does three things:

1. Converts every `.ts` file under `tsDir` to `.gd`.
2. Regenerates the typings for your scenes, scripts, resources and addons, so `get_node()` paths and `res://` paths match the project as it is now.
3. Checks the whole project: TypeScript errors, converter errors, and Godot's own check of the generated scripts. Every error points at a line in your `.ts`.

Errors are labelled by where they come from: `[TS:error]`, `[CONV:error]` or `[GD:error]`. A file with a converter error is not written, so its old `.gd` stays in place. When anything reports an error, `convert` exits with a non-zero code, which makes it usable in CI.

## `tstogd watch`

```bash
npx tstogd watch
```

`watch` is `convert` that keeps running. It converts each `.ts` file when you save it. It also watches your scenes, resources and `project.godot`, so when you change the scene tree in Godot, the typings update and `get_node()` knows about the new nodes right away. About a second after your changes settle, it runs the full check and prints the result.

> **Note:** An edit in one file can change the output of another, for example when you change a shared type. `watch` reconverts such files when they start reporting errors, but a file that still converts without errors can keep its old output. Run `tstogd convert` after a long session to refresh every `.gd`.

## What gets generated

- **`.gd` scripts** in `gdDir`. These are what Godot runs.
- **Typings** in `typingsDir`: types for your scenes, scripts, resources, autoloads and addons. `tstogd init` adds the folder to `tsconfig.json`. Don't edit them; they're rewritten on every run.
- **Source maps**, kept in the cache. They let errors from Godot, and [`open-editor`](./editor-setup.md#open-your-ts-from-godot), point at the right `.ts` line.
- **`tstogd_modules/`**, only if you use [shared packages](./shared-packages.md).

## The Godot check

`convert` and `watch` run Godot in check-only mode on the generated scripts, so you see Godot's parse and type errors without opening the editor. They find Godot through `godotPath` in `tstogd.json`, then the `GODOT_PATH` environment variable, then `godot` on your `PATH`. If Godot isn't found, the check is skipped with a warning.

To turn the Godot check off, set `"disableGodotLint": true` in `tstogd.json`. That covers `convert`, `watch` and the [TypeScript plugin](./editor-setup.md). To skip the whole check for one run, use `tstogd convert --no-check`.

## The cache

tstogd caches conversion results and source maps in `node_modules/.cache/typescript-to-gdscript`. Upgrading clears it; if output ever looks stale, run `tstogd clear-cache`.

## Other commands

You rarely need anything besides `convert` and `watch`. The other commands are for one-off jobs. The ones you are most likely to meet:

| Command                            | When you need it                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `init`                             | Once, to set up a project ([Getting started](./getting-started.md)).                             |
| `initial-convert-gd-to-ts`         | Once, to [migrate existing GDScript](./migrating-from-gdscript.md).                              |
| `open-editor`                      | Called by Godot to open your `.ts` ([Editor setup](./editor-setup.md)).                          |
| `generate-gdscript-global-typings` | Your Godot build differs from the bundled one ([Custom Godot builds](./custom-godot-builds.md)). |
| `generate-typings`                 | Regenerate typings without converting, for example in CI.                                        |
| `clear-cache`                      | Output looks stale.                                                                              |

## Run it with npm scripts

Add both commands to `package.json`, so nobody has to remember them:

```json
{
  "scripts": {
    "build": "tstogd convert",
    "dev": "tstogd watch"
  }
}
```

Then run `npm run dev` while you work and `npm run build` before you commit or in CI.

## Details

The [CLI reference](../reference/cli.md) lists every command and flag, including [`convert`](../reference/cli.md#tstogd-convert) and [`watch`](../reference/cli.md#tstogd-watch). All `tstogd.json` fields are in [Configuration](../reference/configuration.md#tstogdjson).
