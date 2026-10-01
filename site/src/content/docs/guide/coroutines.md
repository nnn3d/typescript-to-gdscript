---
title: 'Coroutines'
description: 'In GDScript any function that uses await becomes a coroutine. In TypeScript you write the same await, and mark the method async because TypeScript requires…'
---

In GDScript any function that uses `await` becomes a coroutine. In TypeScript you write the same `await`, and mark the method `async` because TypeScript requires it. The `async` keyword is dropped from the `.gd`.

## Waiting for a timer or a signal

```ts
export class Intro extends Control {
  @exports title_label!: Label;

  async _ready() {
    this.title_label.text = 'Get ready...';
    await this.get_tree().create_timer(1.0).timeout;
    this.title_label.text = 'Go!';

    let tween = this.create_tween();
    tween.tween_property(this.title_label, 'modulate:a', 0.0, 0.5);
    await tween.finished;
    this.title_label.hide();
  }
}
```

```gdscript
class_name Intro
extends Control

@export
var title_label: Label

func _ready():
	self.title_label.text = "Get ready..."
	await self.get_tree().create_timer(1.0).timeout
	self.title_label.text = "Go!"
	var tween = self.create_tween()
	tween.tween_property(self.title_label, "modulate:a", 0.0, 0.5)
	await tween.finished
	self.title_label.hide()
```

`await` works on any signal: engine signals like `timeout` and `finished`, and your own `gd.signal` fields. It gives you the values the signal was emitted with, typed; see [Signals](/typescript-to-gdscript/guide/signals/#waiting-for-a-signal).

## Waiting for another method

`await` on a call to another coroutine waits until it returns, and gives you its return value. Calling a coroutine without `await`, as a plain statement, starts it and moves on as soon as it pauses, the same as in GDScript.

```ts
export class Game extends Node {
  score: int = 0;

  _ready() {
    this.play_round();
    print('play_round is waiting; _ready goes on');
  }

  async play_round() {
    await this.countdown(3);
    let points = await this.run_round();
    this.score += points;
  }

  async countdown(seconds: int) {
    for (let i of range(seconds, 0, -1)) {
      print(i);
      await this.get_tree().create_timer(1.0).timeout;
    }
  }

  async run_round(): Promise<int> {
    await this.get_tree().create_timer(30.0).timeout;
    return 100;
  }
}
```

```gdscript
class_name Game
extends Node

var score: int = 0

func _ready():
	self.play_round()
	print("play_round is waiting; _ready goes on")

func play_round():
	await self.countdown(3)
	var points = await self.run_round()
	self.score += points

func countdown(seconds: int):
	for i in range(seconds, 0, -1):
		print(i)
		await self.get_tree().create_timer(1.0).timeout

func run_round() -> int:
	await self.get_tree().create_timer(30.0).timeout
	return 100
```

## Return types

TypeScript types the result of an `async` method as `Promise<T>`, so that is how you write its return type. The converter unwraps it: `Promise<int>` becomes `-> int`, and `Promise<void>` gives no return type at all.

You can also leave the return type out, as `countdown` and `play_round` do above. TypeScript infers it, and the `.gd` function has no return type.

## What you can't do

A coroutine's result only exists once you `await` it. There is no promise object to hold on to, so these are errors:

```ts nocheck
_ready() {
  let points = this.run_round();         // error: used without await
  this.run_round().then((p) => print(p)); // error: no .then in GDScript
}
```

- Storing, passing or returning the call without `await`. Write `await`, or call it as a plain statement when you don't need the value.
- `.then`, `.catch` and `.finally`. Your editor shows them struck through; use `await` instead.
- `Promise<T>` as the type of a field, parameter or variable. It only makes sense as the return type of an `async` method.
- `new Promise(...)` and `Promise.all(...)`. They are TypeScript errors: GDScript has nothing like them.

## Details

[Async / await](/typescript-to-gdscript/reference/transform-rules/#async--await) and [Promise rules](/typescript-to-gdscript/reference/gd-helpers/#promise--gdscript-coroutine-rules) in the reference.
