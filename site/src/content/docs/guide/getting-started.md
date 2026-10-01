---
title: 'Getting started'
description: 'This page sets up an existing Godot project so you can write its scripts in TypeScript. You write .ts files, the converter turns them into ordinary .gd…'
---

This page sets up an existing Godot project so you can write its scripts in TypeScript. You write `.ts` files, the converter turns them into ordinary `.gd` scripts, and Godot uses those as usual.

It assumes you know Godot and GDScript. If TypeScript is new to you, skim the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html) first; you only need the basics.

## Requirements

- **Node.js 22** or newer.
- **Godot 4.** Put the `godot` executable on your `PATH`, set `GODOT_PATH`, or set `"godotPath"` in `tstogd.json`, so tstogd can check the generated scripts with Godot itself.
- **TypeScript**, installed by `tstogd init`.
- An editor with TypeScript support: VS Code, WebStorm, Rider, and so on.

## Install

Run these in your Godot project folder, next to `project.godot`:

```bash
npm install --save-dev typescript-to-gdscript
npx tstogd init
```

The package adds a `tstogd` command; run it with `npx tstogd …` or from npm scripts. `tstogd init` asks a few questions and writes two files:

- `tstogd.json` — where your TypeScript lives (default `src/`) and where the `.gd` files go (default `scripts/`);
- `tsconfig.json` — TypeScript settings for Godot, with the TypeScript plugin enabled.

It also offers to install TypeScript and to hide `node_modules` from Godot's file scanner. Say yes to both.

## Your first script

Create `src/player.ts` like the one below, then run `npx tstogd convert`. It writes `scripts/player.gd`, shown under it:

```ts
export class Player extends CharacterBody2D {
  speed: float = 200.0;

  _physics_process(delta: float) {
    let direction = Input.get_vector('ui_left', 'ui_right', 'ui_up', 'ui_down');
    this.velocity = gd.ops.mul(direction, this.speed);
    this.move_and_slide();
  }
}
```

```gdscript
class_name Player
extends CharacterBody2D

var speed: float = 200.0

func _physics_process(delta: float):
	var direction = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	self.velocity = (direction * self.speed)
	self.move_and_slide()
```

Attach `scripts/player.gd` to a node in Godot, as you would any script. Run the game: it is plain GDScript, nothing else is needed at runtime.

A few things in that example are different from GDScript, and the next pages explain them: `this.` instead of `self.`, `float` as a type, and `gd.ops.mul` for multiplying a vector. You can also try it in the [playground](https://nnn3d.github.io/typescript-to-gdscript/playground/) without installing anything.

## Keep it running while you work

```bash
npx tstogd watch
```

`watch` converts every file you save and keeps the Godot typings up to date when you change scenes in the editor. Leave it running in a terminal while you work. See [How it works](/typescript-to-gdscript/guide/how-it-works/) for what happens on each save.

## Next steps

- [How it works](/typescript-to-gdscript/guide/how-it-works/) — the convert/watch loop and what gets generated.
- [Editor setup](/typescript-to-gdscript/guide/editor-setup/) — errors in your editor as you type, and jumping from Godot to your `.ts`.
- [Scripts and classes](/typescript-to-gdscript/guide/scripts-and-classes/) — start of the "Writing scripts" guides.
- [Migrating from GDScript](/typescript-to-gdscript/guide/migrating-from-gdscript/) — if the project already has GDScript you want to convert.
- [Caveats](/typescript-to-gdscript/guide/caveats/) — TypeScript features that don't carry over.

## Details

[`tstogd init`](/typescript-to-gdscript/reference/cli/#tstogd-init) in the CLI reference, and [Configuration](/typescript-to-gdscript/reference/configuration/) to set up `tstogd.json` and `tsconfig.json` by hand.
