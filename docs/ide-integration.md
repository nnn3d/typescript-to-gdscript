[← Back to README](../README.md)

> Brief: hook up your editor — the TypeScript language service plugin for live diagnostics, and `tstogd open-editor` for Godot's external-editor integration.

# IDE Integration

## TypeScript Language Service Plugin

typescript-to-gdscript ships a TypeScript language service plugin that runs inside your IDE's tsserver and surfaces converter + Godot diagnostics as real TypeScript squiggles — including on **unsaved** buffer contents.

### Converter diagnostics surfaced

- **Conversion errors** — unsupported TS features; `.gd` is NOT emitted:
  - `var` keyword (use `let` or `const`)
  - `undefined` keyword as a value (use `null`)
  - Optional chaining (`?.`), nullish coalescing (`??`, `??=`)
  - Spread operator (`...`), destructuring
  - `yield`, `for...in`
  - Multiple classes per file
  - Top-level statements outside classes
- **Type errors** — `.gd` is still emitted, but the plugin reports them inline:
  - `undefined` in function parameter type annotations
  - Argument that may be `undefined`
  - `||`/`&&` used as a non-boolean value
  - `x in y` where `y` is a value-type primitive (Vector2, Color, Transform2D, etc.), an array (`Array<T>`, `T[]`, `Packed*Array`), a number, or a boolean — GDScript only supports `in` on `Dictionary` and `String`
  - Call returning `Promise<T>` used as a value without `await` (assigned, passed as argument, returned, etc.) — GDScript has no Promise; an unawaited coroutine resolves to a `GDScriptFunctionState` at runtime
- **Godot validation errors** (when Godot is available on `PATH`) — type mismatches, unknown functions/methods, parse errors in the generated GDScript. These fire asynchronously ~300–500ms after the converter diagnostics and are merged into the IDE's diagnostic list via an internal tsserver refresh.

Godot validation is enabled automatically when the Godot executable is found on the system (resolved via `resolveGodotPath()`). To disable it, set `disableGodotLint: true` in `tstogd.json`. Source maps are always generated for error remapping.

### Enable it

Add to your project's `tsconfig.json` (added automatically on `tstogd init`):

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-to-gdscript/ts-plugin" }
    ]
  }
}
```

#### Plugin options

| Option              | Type      | Description                                                                                                                                              |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `debug`             | `boolean` | Emit verbose `[tstogd-plugin] TRACE` lines to the tsserver log. Off by default.                                                                          |
| `debugLog`          | `string`  | File path. When set, plugin log + trace lines are appended there in addition to the tsserver log — easier than fishing trace lines out of `tsserver.log`. |
| `disableGodotLint`  | `boolean` | Per-editor override for `tstogd.json`'s `disableGodotLint`. Set `true` to skip the async Godot pass in the IDE only; set `false` to force-enable it.     |

Example — silence the Godot pass in the IDE without changing project-wide config:

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-to-gdscript/ts-plugin", "disableGodotLint": true }
    ]
  }
}
```

Tell the IDE to use the workspace's TypeScript — plugins only load through `tsserver` spawned by the workspace `typescript` package, not the IDE's bundled one:

- **WebStorm**: *Settings → Languages & Frameworks → TypeScript* — set "TypeScript" to `node_modules/typescript` (typically auto-detected), ensure "TypeScript Language Service" is ON, then restart the TS service (File → Invalidate Caches → Just Restart is the blunt way).
- **VS Code**: Open any `.ts` file, Command Palette → `TypeScript: Select TypeScript Version...` → `Use Workspace Version`.

Verify: the plugin logs `[tstogd-plugin] plugin loaded` on startup. WebStorm → `Help → Show Log in Explorer/Finder → idea.log`; VS Code → `Output panel → TypeScript`.

### What it does

1. **Inline diagnostics on the current buffer.** On every `getSemanticDiagnostics` query, the plugin runs `convertTsToGd` in-process using tsserver's own `ts.Program` (no fork, no IPC — just reuses the warm program + type checker). Converter diagnostics (conversion errors, type-errors, `||`/`&&` as value, `Promise` as value, etc.) appear as `ts.Diagnostic`s with `source: 'tstogd'` and codes in the `90000–90099` range.

2. **Augmentation-noise filtering.** When you use the `export namespace Foo { ... }` + `export class Foo` pattern (the way enums and inner classes are expressed in TypeScript for this project), TypeScript generates a few spurious diagnostic codes from the namespace+class merge. The plugin silently drops these for all in-scope files so you never see them in the IDE:
   - `TS2434` / `TS2435` — "Namespace must precede the class declaration"
   - `TS2449` — "Class used before its declaration"

3. **Godot validation in the background.** After conversion, the plugin kicks off `validateGdFiles` asynchronously against the cache-folder `.gd` mirror. When Godot finishes (~300–500ms later), the plugin merges its diagnostics and calls `refreshDiagnostics()` on the project — your IDE updates without you doing anything.

4. **Cancellation.** Typing another character while Godot is still running aborts the stale validation (both the subprocess and the superseded result) — no stale squiggles from a version you've already moved past.

5. **Persistent-cache write-through.** Every live conversion updates the shared `ProjectCache` (keyed by buffer hash). When you save, `tstogd watch` / `tstogd convert` detects that the cache already holds the right bytes and promotes them with a single `rename()` — no double conversion.

### Plugin diagnostic codes

| Code    | Meaning                                |
| ------- | -------------------------------------- |
| `90000` | converter `error` / `warning` / `info` |
| `90001` | converter `type-error`                 |

All plugin-originated diagnostics have `source: 'tstogd'`, so you can filter them in IDE settings if needed.

## `tstogd open-editor`

Open a GDScript file in an external editor as the corresponding TypeScript file. Designed for Godot's external text editor integration - when you double-click a script in Godot, it opens the `.ts` source instead of the generated `.gd` file.

```bash
tstogd open-editor -f {file} -l {line} -c {col} -p {project} -e "code --goto {tsFile}:{tsLine}:{tsCol}"
```

Options:

- `-f, --file <path>` -- GDScript file path (absolute or `res://`)
- `-e, --editor-cmd <cmd>` -- Editor command template. Placeholders: `{tsFile}`, `{tsLine}`, `{tsCol}` (plus any Godot placeholders like `{line}`, `{col}`)
- `-l, --line <n>` -- GDScript line number (from Godot, default: `1`)
- `-c, --col <n>` -- GDScript column number (from Godot, default: `1`)
- `-p, --project <dir>` -- Godot project directory (where `tstogd.json` is)

How it works:

1. Loads `tstogd.json` from the project directory
2. Maps the `.gd` file to `.ts` file using `gdDir` -> `tsDir` path mapping
3. Remaps GD line:col to TS line:col using cached source maps (`{tsLine}`, `{tsCol}`)
4. Replaces `{tsFile}`, `{tsLine}`, `{tsCol}` in the editor command
5. Spawns the editor process

### Godot configuration

In Godot, go to **Editor Settings → Text Editor → External** and configure:

- **Use External Editor**: `On`
- **Exec Path**: `tstogd` (or `npx tstogd`, or full path to the binary)
- **Exec Flags**: `open-editor -f "{file}" -l {line} -c {col} -p "{project}" -e "code --goto {tsFile}:{tsLine}:{tsCol}"`

> **Note:** Use double quotes around `{file}` and `{project}` to handle paths with spaces.

Also enable **Editor Settings → Text Editor → Behavior → Auto Reload Scripts on External Change**. When you edit TypeScript files and the converter regenerates the `.gd` output, Godot needs to pick up the changes without manually refocusing or reopening each script. With this option enabled, Godot automatically reloads any `.gd` file that was modified on disk, so your changes take effect immediately when you switch back to the editor.

### Debug with external editor

Godot has a **separate** toggle for whether runtime errors (stack traces in the Debugger panel) open in the external editor vs the built-in script editor. The "Use External Editor" setting in *Editor Settings → Text Editor → External* only controls double-click-to-open from the FileSystem dock — it does **not** cover debugger stack-frame clicks.

To also route debugger errors to your external editor, switch to the **Script** tab at the top of the Godot editor and look for the option there — the Script workspace has its own menu bar. From [godotengine/godot#65554](https://github.com/godotengine/godot/issues/65554):

> if you select the Script tab, that has its own menu bar, where you can find the option as described.

If the toggle is off, clicking a stack frame silently does nothing — `tstogd open-editor` is never invoked, so you won't see the editor open and there'll be no entry in the debug log. See related Godot issues: [#65554](https://github.com/godotengine/godot/issues/65554), [#84294](https://github.com/godotengine/godot/issues/84294), [#95198](https://github.com/godotengine/godot/issues/95198).

### Editor command examples

| Editor  | `-e` flag                                              |
|---------|--------------------------------------------------------|
| VS Code | `-e "code --goto {tsFile}:{tsLine}:{tsCol}"`           |
| Rider   | `-e "rider --line {tsLine} --column {tsCol} {tsFile}"` |
| Vim     | `-e "vim +{tsLine} {tsFile}"`                          |
