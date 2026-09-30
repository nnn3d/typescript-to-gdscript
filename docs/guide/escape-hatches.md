# Escape hatches

Sometimes the converter doesn't give you the GDScript you want, or can't express something at all. You then have three ways out: raw GDScript with `gd.eval`, the `// @gd.eval:` comment, and a hand-written `.gd` file. And please tell us about the gap, so it can be fixed.

## Raw GDScript with `gd.eval`

`gd.eval('…')` puts its string into the `.gd` as it is, indented to fit where it stands. Used as a statement, it inserts one or more lines. Used as a value, it becomes the expression, and the type argument tells TypeScript what it holds:

```ts
export class Hud extends Control {
  _ready() {
    let label = gd.eval<Label>('$Panel/Score');
    label.text = '0';
    gd.eval('var started := Time.get_ticks_msec()');
    gd.eval(`
for i in 3:
    print(i)
`);
  }
}
```

```gdscript
class_name Hud
extends Control

func _ready():
	var label = $Panel/Score
	label.text = "0"
	var started := Time.get_ticks_msec()
	for i in 3:
		print(i)
```

In a multi-line string, indent with spaces or with tabs; the spaces become tabs. Mixing both is an error.

> **Note:** TypeScript doesn't look inside the string. Write GDScript there (`self`, not `this`), and remember that a variable declared inside it, like `started` above, is unknown to the TypeScript around it.

## The `// @gd.eval:` comment

A `gd.eval` call only fits where a statement or an expression does. For other places, such as above the class, between members, or an annotation on a single statement, write a comment that starts with `// @gd.eval:`. The rest of the line goes into the `.gd`:

```ts
export class Hud extends Control {
  // @gd.eval: @warning_ignore("unused_private_class_variable")
  _secret: int = 0;

  split(total: int) {
    // @gd.eval: @warning_ignore("integer_division")
    let half = total / 2;
    print(half);
  }
}
```

```gdscript
class_name Hud
extends Control

@warning_ignore("unused_private_class_variable")
var _secret: int = 0

func split(total: int):
	@warning_ignore("integer_division")
	var half = total / 2
	print(half)
```

This is the usual way to silence a Godot warning for one line.

## Keeping a hand-written `.gd`

You can keep any script in GDScript and still use it from TypeScript. Put the `.gd` outside your `gdDir` (default `scripts/`), so the converter never writes over it:

```gdscript
# res://legacy/leaderboard.gd
class_name Leaderboard
extends Node

func submit_score(player: String, score: int) -> void:
	pass

func top_scores(count: int) -> Array[int]:
	return []
```

Then describe it for TypeScript in a `.d.ts` file in your TypeScript folder, for example `src/legacy/leaderboard.d.ts`:

```ts nocheck
declare class Leaderboard extends Node {
  submit_score(player: string, score: int): void;
  top_scores(count: int): int[];
}
```

A `.d.ts` with no `import` or `export` is global, so every script can use `Leaderboard` without importing it: `new Leaderboard()`, `board.submit_score('ada', 120)`, a field typed `Leaderboard`. The converter emits them like any other class. TypeScript trusts the `.d.ts`, so update it whenever you change the `.gd`.

## Asking for a fix

If something converts the wrong way, please [open a GitHub issue](https://github.com/nnn3d/typescript-to-gdscript/issues) with a small example: the TypeScript, the GDScript you got, and the GDScript you expected. Most conversion gaps can be fixed, and a real case is the fastest way to get there. See also the [FAQ](./faq.md).

## Details

[`gd.eval` and the magic comment](../reference/gd-helpers.md#raw-gdscript-eval) in the reference.
