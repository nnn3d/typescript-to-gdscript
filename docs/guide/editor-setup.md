# Editor setup

This page sets up two things. The TypeScript plugin shows converter and Godot errors while you type, and `tstogd open-editor` makes Godot open your `.ts` file when you double-click a script.

## Errors as you type

typescript-to-gdscript ships a plugin for the TypeScript service that your editor already runs. It converts the file you are editing, even before you save, and shows two more kinds of errors next to the usual TypeScript ones:

- **Converter errors**: code GDScript can't express. For example, `??` doesn't exist in GDScript:

  ```ts nocheck
  let text = this.label_text ?? 'Ready';
  // Nullish coalescing (`??`) is not supported in GDScript
  ```

- **Godot errors**: Godot checks the generated script in the background, and its errors show up a moment later on the matching `.ts` line.

`tstogd init` turns the plugin on in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [{ "name": "typescript-to-gdscript/ts-plugin" }]
  }
}
```

## Make sure the plugin is loaded

The plugin only loads when the editor uses the project's own TypeScript from `node_modules/typescript`, not the copy bundled with the editor.

- **VS Code:** open any `.ts` file, run **TypeScript: Select TypeScript Version…** from the Command Palette, and choose **Use Workspace Version**.
- **WebStorm:** in **Settings → Languages & Frameworks → TypeScript**, set **TypeScript** to `node_modules/typescript` and keep **TypeScript Language Service** on. Then restart the TypeScript service (**File → Invalidate Caches → Just Restart** always works).

To check it works, write `??` in a method, as in the example above. If the converter error appears under it, the plugin is running.

> **Note:** Changes to `tsconfig.json`, including the plugin options, take effect only after the TypeScript service restarts. In VS Code, run **TypeScript: Restart TS Server**.

To keep the converter errors but skip the Godot check in the editor only, add `"disableGodotLint": true` to the plugin entry:

```json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-to-gdscript/ts-plugin", "disableGodotLint": true }
    ]
  }
}
```

## Open your `.ts` from Godot

Godot opens scripts in its own editor by default, and there you would see the generated `.gd`. Point Godot at `tstogd open-editor` instead. It finds the `.ts` file for the `.gd`, maps the line with the source map, and starts your editor there.

In Godot, open **Editor Settings → Text Editor → External** and set:

- **Use External Editor:** on.
- **Exec Path:** `tstogd` if it is on your `PATH`, otherwise its full path. For a project install that is `node_modules/.bin/tstogd` in your project (`tstogd.cmd` on Windows).
- **Exec Flags:**

  ```text
  open-editor -f "{file}" -l {line} -c {col} -p "{project}" -e "code --goto {tsFile}:{tsLine}:{tsCol}"
  ```

Godot fills in `{file}`, `{line}`, `{col}` and `{project}`. tstogd fills in `{tsFile}`, `{tsLine}` and `{tsCol}` and runs the command after `-e`. Keep the quotes around `{file}` and `{project}` so paths with spaces work.

The `-e` part depends on your editor:

| Editor   | `-e` value                                                |
| -------- | --------------------------------------------------------- |
| VS Code  | `-e "code --goto {tsFile}:{tsLine}:{tsCol}"`              |
| WebStorm | `-e "webstorm --line {tsLine} --column {tsCol} {tsFile}"` |
| Rider    | `-e "rider --line {tsLine} --column {tsCol} {tsFile}"`    |

> **Note:** tstogd starts the editor directly, without a shell. On Windows that means `code` and other `.cmd` launchers don't start. Put the full path to the editor's `.exe` in `-e` instead.

Also turn on **Editor Settings → Text Editor → Behavior → Auto Reload Scripts on External Change**. Then Godot picks up each regenerated `.gd` without asking.

## Debugging

Godot's debugger reports errors and stack frames at `.gd` lines. Opened through `open-editor`, they land on the matching `.ts` line instead.

The external-editor setting covers double-clicks in the FileSystem dock, but not the Debugger panel. For clicks on errors and stack frames to open your `.ts` too, switch to the **Script** screen and turn on **Debug with External Editor** in its **Debug** menu. While it is off, those clicks never reach `open-editor`.

## Details

[IDE integration](../reference/ide-integration.md) covers the plugin options and diagnostics in full, and the [`open-editor` reference](../reference/cli.md#tstogd-open-editor) lists its flags.
