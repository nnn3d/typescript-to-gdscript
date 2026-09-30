---
title: Getting started
description: Install typescript-to-gdscript, set up a Godot project and convert your first TypeScript class.
editUrl: false
---

## Requirements

- **Node.js 22+**
- **TypeScript ≥ 5.9** — installed by `tstogd init`, or add it as a dev dependency yourself
- **Godot ≥ 4.0** — on `PATH`, or set `godotPath` / `GODOT_PATH`. Needed for the Godot diagnostic pass; set `disableGodotLint: true` in `tstogd.json` to opt out.

## Install

Run these in your Godot project folder:

```bash
npm install typescript-to-gdscript
npx tstogd init
```

`tstogd init` asks a few questions and writes `tstogd.json` and `tsconfig.json`.

## Your first script

1. Write a `.ts` class in your TS source folder (default `src/`).
2. Run `npx tstogd convert`. It writes `.gd` files into your output folder (default `scripts/`), regenerates all typings, and runs a full check.
3. Attach the `.gd` file in Godot as usual.

For day-to-day work run `npx tstogd watch`: it converts on save and keeps scene typings in sync with your `.tscn` files.

Want to see the output first? Try the [playground](/typescript-to-gdscript/playground/).

## Next steps

- [Transform rules](/typescript-to-gdscript/transform-rules/) — how each TypeScript construct maps to GDScript
- [IDE integration](/typescript-to-gdscript/ide-integration/) — live diagnostics in your editor
- [GD-to-TS migration](/typescript-to-gdscript/gd-to-ts-migration/) — convert an existing GDScript project
