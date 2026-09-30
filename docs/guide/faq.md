# FAQ

Short answers to common questions. Each one links to the page with the full story.

## Something converts the wrong way. What can I do?

Write that part as raw GDScript with `gd.eval`, or keep the whole script as a hand-written `.gd`; [Escape hatches](./escape-hatches.md) shows both. Please also [open a GitHub issue](https://github.com/nnn3d/typescript-to-gdscript/issues) with a small before/after example, so the conversion can be fixed.

## An addon's generated typings are wrong. How do I fix them?

Take the typings over: exclude the addon in `tstogd.json`, move its generated typings to a folder of your own, and fix them by hand. [Addons](./addons.md#when-an-addons-typings-are-wrong) has the steps. Please also [open a GitHub issue](https://github.com/nnn3d/typescript-to-gdscript/issues), so the conversion can improve.

## My Godot version has different built-in classes. What now?

The package ships typings for one stock Godot version. Generate typings from your own build instead, as [Custom Godot builds](./custom-godot-builds.md) shows.

## Does the game need anything extra at runtime?

No. The output is plain GDScript, and Godot runs it like any other script. TypeScript, Node.js and this package are only needed while you write and convert.

## Can I mix TypeScript and GDScript in one project?

Yes. Hand-written `.gd` scripts keep working next to converted ones, and a `.d.ts` file lets your TypeScript use them with full types; see [Escape hatches](./escape-hatches.md#keeping-a-hand-written-gd). To turn existing GDScript into TypeScript, see [Migrating from GDScript](./migrating-from-gdscript.md).

## Why `@exports` and not `@export`?

`export` is a reserved word in TypeScript, so `@export` can't be written as a decorator. `@exports` becomes `@export` in the `.gd`. Every other annotation keeps its Godot name. See [Exports and annotations](./exports-and-annotations.md).

## Why `gd.ops.add(a, b)` instead of `a + b` for vectors?

TypeScript has no operator overloading, so `+` on two `Vector2` values is a type error. `gd.ops` gives you typed operators, and the `.gd` gets the plain `a + b`. See [Math and value types](./math-and-value-types.md).

## Why is `undefined` not allowed?

GDScript has only `null`. Write `null` wherever you would write `undefined`, and `x: int | null = null` for an optional parameter. [Caveats](./caveats.md) lists the other TypeScript features that don't carry over.

## I hit another problem, or have a suggestion.

Please [open a GitHub issue](https://github.com/nnn3d/typescript-to-gdscript/issues): bug reports and feature ideas are both welcome. Pull requests are welcome too; [Development](../development.md) explains how to set up a dev environment.
