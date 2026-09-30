# Addons

Addons from the Asset Library are written in GDScript, and you can use them from TypeScript as they are. tstogd reads the scripts under `addons/` and generates typings for them, so the addon's classes get autocomplete and type checks like the engine's own.

## Using an addon

Install the addon into `addons/` as you normally would, and enable it under **Project Settings → Plugins** if it is an editor plugin. Then run `tstogd convert` once, or restart `tstogd watch`, before you use the addon in TypeScript. That generates its typings into `addons/` inside your `typingsDir`.

> **Note:** `convert` regenerates addon typings on every run, but `watch` only does so when it starts. After you add or update an addon, run `convert` or restart `watch`.

An addon class with a `class_name` is global, as in GDScript, so you use it without an import. A script without `class_name` is reached with `preload()`, and its type comes from the addon's typings too:

```ts nocheck
export namespace Level {
  export const TextUtils = preload('res://addons/dialog_box/text_utils.gd');
}

export class Level extends Node2D {
  _ready() {
    let dialog = new DialogBox();
    this.add_child(dialog);
    dialog.show_text(Level.TextUtils.wrap('Welcome!', 20));
    dialog.closed.connect(() => print('closed'));
  }
}
```

```gdscript
class_name Level
extends Node2D

const TextUtils = preload("res://addons/dialog_box/text_utils.gd")

func _ready():
	var dialog = DialogBox.new()
	self.add_child(dialog)
	dialog.show_text(Level.TextUtils.wrap("Welcome!", 20))
	dialog.closed.connect(func(): print("closed"))
```

Here `DialogBox` is the addon's `class_name`, and TypeScript checks the call to `show_text` and the `closed` signal against the addon's code.

The addon's own `.gd` files are never touched. tstogd only reads them.

## When an addon's typings are wrong

Addon typings come from an automatic GDScript-to-TypeScript conversion, and a third-party addon can trip it up: a missing type, a wrong parameter, a class TypeScript can't see. You can take the typings over and fix them by hand:

1. Add the addon to `exclude` in `tstogd.json`, so tstogd stops generating its typings:

   ```json
   {
     "exclude": ["addons/dialog_box/**"]
   }
   ```

2. Move the addon's folder out of `<typingsDir>/addons/` into a folder of your own, for example `typings-fixes/dialog_box/`. Keep it outside `tsDir`: tstogd converts every `.ts` file there into a `.gd`.
3. Add that folder to `include` in `tsconfig.json`:

   ```json
   {
     "include": [
       "node_modules/typescript-to-gdscript/typings",
       "src/**/*.ts",
       "src/_typings/**/*.d.ts",
       "typings-fixes/**/*.d.ts"
     ]
   }
   ```

4. Fix the `.ts` and `.gd.d.ts` files in it by hand. They are yours now, and no run overwrites them.

When the addon gets an update, compare its changes with your fixed copy yourself, since tstogd no longer regenerates it.

Please also [open an issue](https://github.com/nnn3d/typescript-to-gdscript/issues) with the addon and what went wrong, so the conversion can improve.

## Details

[`generate-addon-typings` in the typings reference](../reference/typings.md#tstogd-generate-addon-typings) describes the generated files. `exclude` is listed in [Configuration](../reference/configuration.md#tstogdjson).
