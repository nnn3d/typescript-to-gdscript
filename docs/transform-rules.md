[← Back to README](../README.md)

> Brief: detailed transform rules — every TS construct's GDScript mapping. The [README cheat sheet](../README.md#cheat-sheet) covers the must-haves; the [full cheat sheet](#full-cheat-sheet) below adds every advanced helper (`gd.dict`, `gd.getset`, `gd.match`, `gd.eval`, Callable rewrite, …). The sections after that drill into individual rules.

# Transform rules

## Full cheat sheet

**Everything TS-specific** in this project, in **one Player.ts** with comments showing the generated GDScript. Each section maps to a doc subsection below for the full semantics.

```typescript
// ── Inner classes, class-level constants & enums (namespace merging) ──
// A `namespace Player { ... }` block paired with the same-named class
// lifts each `export`ed member into the class as a nested member.
// Put **constants and enums INSIDE the namespace** — that's how GD
// class-level `const` and nested `enum` are declared.
export namespace Player {
  export const MAX_HP = 100; // → const MAX_HP = 100   (on Player)

  export enum State {
    IDLE,
    RUNNING,
  } // → enum State { ... }   (on Player)

  // Constants and enums for inner class
  export namespace Bullet {
    const SPEED = 100; // → const SPEED = 100 (on Bullet)
  }
  export class Bullet extends Node2D {
    // → class Bullet extends Node2D:
    damage: int = 10; //       var damage: int = 10
  }
}

// ── Class-level annotations — bare global names, NOT `@gd.*` ────────
// Every Godot annotation works as a decorator (declared in
// `typings/classes/_globals.d.ts`). `@exports` is the only special
// alias: `@export` is a TS reserved word, so the plural form emits
// GDScript `@export`.
@tool // → @tool
@icon('res://player.svg') // → @icon("res://player.svg")
export abstract class Player extends CharacterBody2D {
  // abstract → @abstract above extends/class_name

  // ── Class-level statics & TS-only readonly ───────────────────────
  // `static FOO = ...` → `static var FOO = ...` (mutable, shared).
  // `readonly` is a TS-only contract — emits a plain `var` on GD.
  // For GD class-level constants, use the namespace block above.
  static MAX_INSTANCES = 8; // → static var MAX_INSTANCES = 8
  readonly default_speed = 200.0; // → var default_speed = 200.0  (readonly is TS-only)
  static readonly TAG = 'player'; // → static var TAG = "player"  (static stays; readonly TS-only)

  // ── Field decorators ─────────────────────────────────────────────
  @exports speed: float = 200.0; // → @export var speed: float = 200.0
  @export_range(0, 100) health: int = 100; // → @export_range(0, 100) var health: int = 100
  @export_group('Stats') damage: int = 10; // → @export_group("Stats") var damage: int = 10
  @onready sprite: Sprite2D; // → @onready var sprite: Sprite2D

  // ── Signals — named tuple labels become GD arg names ─────────────
  health_changed = gd.signal<[from: int, to: int]>(); // → signal health_changed(from: int, to: int)
  hit_at = gd.signal<[int, int]>(); // → signal hit_at(arg1: int, arg2: int)
  died = gd.signal(); // → signal died

  // ── Abstract method (auto-translated, no decorator needed) ───────
  abstract take_damage(amount: int): void; // → @abstract func take_damage(amount: int) -> void: pass

  // ── Constructor → _init ──────────────────────────────────────────
  constructor(speed: float = 200.0) {
    // → func _init(speed: float = 200.0):
    this.speed = speed; //       self.speed = speed
  }

  // ── Getters / setters — native TS accessors for simple cases ─────
  get score(): int {
    return this.score;
  } // → var score: int:
  set score(v: int) {
    this.score = v;
  } //       get: return score
  //       set(value): score = value

  // For default values or function-reference form, use gd.getset()
  hp: int = gd.getset({
    // → var hp: int = 100:
    value: 100, //       get: return hp
    get: () => this.hp, //       set(value): hp = value
    set: (v) => {
      this.hp = v;
    },
  });

  // ── Async / await — Promise<T> unwraps to T on the GD side ───────
  async long_task(): Promise<int> {
    // → func long_task() -> int:
    await this.get_tree().create_timer(1).timeout; //   await self.get_tree()...
    return 42;
  }

  // ── Comments ─────────────────────────────────────────────────────
  // single-line                           → # single-line
  /** doc comment */ // → ## doc comment
  /* block comment */ // → """block comment"""  (GD has no native block comments)

  _process(delta: float) {
    // → func _process(delta: float):

    // ── Operators ──────────────────────────────────────────────────
    let eq = this.health === 0; // → var eq      = self.health == 0
    let and_ = true && false; // → var and_    = true and false
    let not_ = !true; // → var not_    = not true
    let ternary = eq ? 1 : 2; // → var ternary = 1 if eq else 2

    // ── Math on value types — primitives + works, vectors need gd.ops ──
    let pos = gd.ops.add(this.position, Vector2(1, 0)); // → var pos    = (self.position + Vector2(1, 0))
    let scaled = gd.ops.mul(this.position, 2.0); // → var scaled = (self.position * 2.0)
    // Available: add, sub, mul, div, rem, eq, ne, gt, gte, lt, lte, plus (unary), minus (unary)

    // ── Type casting / checking ────────────────────────────────────
    let body = gd.as(this.get_node('Body'), CharacterBody2D); // → var body = self.get_node("Body") as CharacterBody2D
    if (body instanceof CharacterBody2D) {
      /* class check */
    } // → if body is CharacterBody2D:
    if (gd.is(this.health, int)) {
      /* primitive   */
    } // → if self.health is int:

    // ── Object construction ────────────────────────────────────────
    let bullet = new Player.Bullet(); // → var bullet = Bullet.new()

    // ── Dictionaries ───────────────────────────────────────────────
    let stats = { name: 'Hero', hp: 100 }; // → var stats = { "name": "Hero", "hp": 100 }
    // Non-string keys → use gd.dict():
    let key = Vector2.DOWN;
    let directions = gd.dict([
      // → var directions = { key: "down" }
      [key, 'down'],
    ]);

    // Optional property access auto-converts when the type includes undefined
    let maybe: { v?: int } = {};
    let val = maybe.v; // → var val = maybe.get("v")

    // ── Strings, StringName, NodePath ──────────────────────────────
    let greet = `Hi ${this.name}!`; // → var greet = "Hi " + str(self.name) + "!"
    let path = NodePath('Body/Sprite'); // → var path  = ^"Body/Sprite"
    let sig = StringName('died'); // → var sig   = &"died"

    // ── Callables — `fn()` via variable needs `.call()` (auto) ─────
    let cb: () => void = this.die;
    cb(); // → cb.call()
    this.die(); // → self.die()           (direct call, preserved)

    // ── Control flow ───────────────────────────────────────────────
    for (let s of [1, 2, 3]) print(s); // → for s in [1, 2, 3]: print(s)
    // for...in is NOT supported — converter rejects it.

    // ── Match — simple → native TS switch (round-trips with GD `match`) ──
    switch (
      this.health // → match self.health:
    ) {
      case 0:
        this.died.emit();
        break; //       0: self.died.emit()
      default:
        print('alive');
        break; //       _: print("alive")
    }

    // ── Match — advanced patterns → gd.match ──────────────────────
    gd.match(stats, [
      { match: { name: 'Hero', ...{} }, do: () => print('the hero') }, // dict pattern + open-end
      (n) => ({
        match: n,
        when: typeof n === 'number',
        do: () => print('a number'),
      }), // binding + guard
      { match: [1, 2, ..._], do: () => print('starts 1,2') }, // array pattern + open-end
    ]);

    // ── Escape hatch — raw GDScript ────────────────────────────────
    gd.eval('var raw = 10'); // → var raw = 10
    // @gd.eval: @warning_ignore("integer_division")  ← magic comment for statements
  }

  _ready() {
    // → func _ready():
    // Signals — emit and connect
    this.health_changed.emit(0, 100); // → self.health_changed.emit(0, 100)
    this.health_changed.connect(this._on_health_changed);
  }

  _on_health_changed(from: int, to: int) {
    /* ... */
  }
  die() {
    /* ... */
  }
}
```

The remaining sections cover the same rules in tables / prose form so individual features can be looked up by name.

## Primitive types — case mapping

Lowercase TypeScript primitive names map to GDScript's PascalCase value-type names. The aliases live in the `gd` global typings — you just write the lowercase form in TS.

| TS        | GD       |
| --------- | -------- |
| `number`  | `float`  |
| `int`     | `int`    |
| `float`   | `float`  |
| `boolean` | `bool`   |
| `bool`    | `bool`   |
| `string`  | `String` |
| `String`  | `String` |

`int`, `float`, and `bool` are also **cast functions**: `int(x)`, `float(x)`, `bool(x)`, `String(x)` all transpile verbatim.

## Operators

| TS                     | GD                   | Notes                                                                                                                                                    |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `===` / `!==`          | `==` / `!=`          | TS loose `==` / `!=` are also accepted and emit the same GD operators — GDScript has no coercion-vs-identity distinction. Prefer strict on the TS side.  |
| `&&` / `\|\|` / `!`    | `and` / `or` / `not` | See [Logical operators](#logical-operators--) for the value-vs-bool nuance.                                                                              |
| `**`                   | `**`                 | GDScript also has `**` (power).                                                                                                                          |
| `gd.ops.add(a, b)`     | `(a + b)`            | Wraps in parentheses to preserve precedence. Same for `sub`, `mul`, `div`, `rem`, `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `plus` (unary), `minus` (unary). |
| `cond ? a : b`         | `a if cond else b`   | TS ternary order (cond/then/else) inverts to GD's value-first form.                                                                                      |
| `instanceof Type`      | `is Type`            | For class types. Use `gd.is(x, int)` for primitives.                                                                                                     |
| `!(x instanceof Type)` | `not (x is Type)`    | Negation parenthesizes the `is` to keep precedence.                                                                                                      |
| `new Foo(args)`        | `Foo.new(args)`      | GDScript constructs Objects via `.new()`.                                                                                                                |

## Comments

| TS            | GD            | Notes                                                                                                                                               |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `// line`     | `# line`      |                                                                                                                                                     |
| `/** doc */`  | `## doc`      | TypeScript JSDoc → GDScript doc comment.                                                                                                            |
| `/* block */` | `"""block"""` | GDScript has no block-comment syntax — it uses a triple-quoted string as the idiomatic substitute. Multi-line blocks emit a multi-line `"""..."""`. |

## Constructor

TypeScript `constructor()` maps to GDScript `_init()`.

## Async / await

The `async` keyword is stripped — GDScript coroutines use `await` without an `async` marker on the function. The `await` expression itself is preserved.

A return type of `Promise<T>` is unwrapped to a plain `T` annotation on the generated `func` (`Promise<void>` drops the annotation entirely). Writing `Promise<T>` is only meaningful as the **return type of an `async` method**:

```typescript
async long_task(): Promise<int> { return 42; }
async void_task(): Promise<void> { /* ... */ }
```

```gdscript
func long_task() -> int:
    return 42

func void_task():
    pass
```

Using `Promise<T>` anywhere else (a field, a parameter, a `let` annotation) is a converter error — there's no GDScript runtime type to map it to. The runtime "promise" is just an unresolved coroutine, and treating it as a value (passing it around, calling `.then` / `.catch` / `.finally`, returning it without `await`) is rejected.

## Callables and function references

GDScript treats functions stored in variables as `Callable` values, which must be invoked through `.call(...)` rather than direct parenthesis. The converter handles this automatically when the value is typed as a `() => ...` arrow:

```typescript
call(fn: () => void) {
  fn();                       // → fn.call()
  fn.call_deferred();         // direct method on Callable, preserved
  fn.callv();                 // ditto
  this.say_hello();           // direct method call, preserved as self.say_hello()
  let saved = this.say_hello;
  saved();                    // → saved.call()
}
```

```gdscript
func call(fn: Callable):
    fn.call()
    fn.call_deferred()
    fn.callv()
    self.say_hello()
    var saved = self.say_hello
    saved.call()
```

Direct method calls (`this.method()`) are not rewritten — only call-via-variable. Property access on a Callable (`fn.bind(...)`, `fn.call_deferred(...)`) is preserved verbatim.

## `this` / `self`

- `this.property` → `self.property` — the explicit form is always preserved.

## Constants and static fields

GDScript has two kinds of class-level storage — **constants** (immutable, `const`) and **statics** (mutable, `static var`). Each has its own TS-side mapping:

| GDScript                  | TS source                                                  | Notes                                                                                                 |
| ------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `const MAX_HP = 100`      | `export const MAX_HP = 100;` inside the paired `namespace` | Class-level constants are declared via the namespace block (same place enums and inner classes live). |
| `static var HEALTH = 100` | `static HEALTH = 100;` on the class                        | Per-class mutable static, shared across instances.                                                    |

The `readonly` keyword on a class field is a **TS-only contract** — the TypeScript compiler prevents reassignment, but on the GD side it emits a regular `var` (or `static var` when combined with `static`). Use it to express intent in TS without changing the runtime shape:

```typescript
export namespace ConstClass {
  export const MAX_HP = 100; // → const MAX_HP = 100     (on the class)
}

export class ConstClass extends Node {
  readonly default_speed = 50; // → var default_speed = 50  (no GD `const` — readonly is TS-only)
  static HEALTH = 100; // → static var HEALTH = 100

  get_health() {
    return ConstClass.HEALTH; // → self.HEALTH
  }
}
```

Inside the class, `ConstClass.HEALTH` resolves to `self.HEALTH` on the GDScript side — GDScript reaches class-level members through `self` rather than through the class name.

## Enums

**Declare enums inside the paired `namespace` block** — that's the supported pattern and what every fixture uses:

```typescript
export namespace MyClass {
  export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
  }
  export enum State {
    IDLE,
    WALKING,
    RUNNING = 5,
  }
}

export class MyClass extends Node {
  state: MyClass.State = MyClass.State.IDLE;
}
```

```gdscript
extends Node
class_name MyClass

enum Direction { UP, DOWN, LEFT, RIGHT }

enum State { IDLE, WALKING, RUNNING = 5 }

var state: State = self.State.IDLE
```

The enum lifts into the class as a nested enum, accessible from outside as `MyClass.Direction.LEFT` on the TS side and `MyClass.Direction.LEFT` in GDScript too.

### Restrictions

- Explicit values must be integer literals (matches GDScript).
- String enums and computed initializers are rejected.
- The legacy `static X = gd.enum('A', 'B')` form is no longer supported — use native `enum`.

## Inner classes (via namespace merging)

GDScript nested classes are modelled using TypeScript's [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). A `namespace ClassName { ... }` block paired with `class ClassName { ... }` adds the namespace's `export`ed members as static / nested members on the class side:

```typescript
export namespace MyClass {
  export const MAX = 100;
  export enum State {
    IDLE,
    RUNNING,
  }
  export class Inner extends Node {
    value: int = 0;
  }
}

export class MyClass extends Node {
  state: MyClass.State = MyClass.State.IDLE;
}
```

```gdscript
extends Node
class_name MyClass

const MAX = 100

enum State { IDLE, RUNNING }

class Inner extends Node:
    var value: int = 0

var state: State = self.State.IDLE
```

### Merging rules

- The namespace and class **must share a name**. Mismatched names are a converter error.
- Multiple `namespace ClassName { ... }` blocks for the same name **are merged** (TS declaration merging). All `export`ed members from all blocks lift into the class.
- Nested namespaces inside the outer one (e.g. `namespace MyClass { namespace Inner { ... } }`) are flattened: `Inner.TAG` becomes a constant on the inner class.
- Namespace members must be `export`ed — non-exported declarations don't reach the class side and produce a converter error.

### What can go in the namespace

- `export const X = ...` → `const X = ...` on the class
- `export enum Foo { ... }` → nested `enum Foo { ... }` on the class
- `export class Inner { ... }` → nested `class Inner: ... ` on the class
- `export abstract class Inner { ... }` → nested `@abstract class Inner:`

Functions, type aliases, and interfaces in the namespace are TS-only (erased) — there's no GDScript counterpart.

## Decorators and annotations

GDScript annotations (`@tool`, `@export`, `@onready`, `@export_range(...)`, `@icon(...)`, `@warning_ignore(...)`, `@abstract`, `@static_unload`, etc.) are written as TypeScript decorators on the class, fields, or methods. The list of bare annotations is derived from the Godot class registry — any annotation Godot recognises is accepted.

### Bare form

Decorators are written as bare global names declared in `typings/classes/_globals.d.ts`:

```typescript
@tool
@icon('res://icon.svg')
export class Player extends Node {
  @exports speed: float = 200.0; // ← note plural; see below
  @export_range(0, 100) health: int = 100;
  @onready sprite: Sprite2D;
}
```

### Why `@exports` (plural)?

`export` is a TypeScript reserved word — `@export` is a parse error. The converter accepts **`@exports`** (plural) as an alias and emits GDScript `@export`. All other annotations use their normal Godot names (no plural).

> **No `@gd.*` decorator form.** The `gd` namespace holds helpers like `gd.signal`, `gd.getset`, `gd.match`, but **never decorators**. Use the bare names above.

### Class-level annotations

`@tool`, `@icon(...)`, and `@abstract` apply to the class. The converter emits them above `extends` / `class_name`, matching GDScript convention. `abstract class Foo` (the TS keyword) is auto-translated to `@abstract` — you don't need to write the decorator yourself for abstractness:

```typescript
@tool
@icon('res://icon.svg')
export abstract class EdgeAnnotations extends Node {
  abstract process_item(item: string): string;
}
```

```gdscript
@tool
@icon("res://icon.svg")
@abstract
extends Node
class_name EdgeAnnotations

@abstract
func process_item(item: String) -> String:
    pass
```

### Inline annotations in function bodies

Annotations inside function bodies (e.g. `@warning_ignore`) can't be expressed as TS decorators on a statement. Use the `// @gd.eval:` magic comment:

```typescript
test() {
  // @gd.eval: @warning_ignore("integer_division")
  let a = 11 / 2;
}
```

See [`gd.eval`](gd-helpers.md#raw-gdscript-eval) for full magic-comment semantics.

## Abstract classes

TS `abstract class Foo` → `@abstract` annotation on the class. Abstract methods (`abstract foo(): void`) become `@abstract func foo(): pass` in GDScript. Both class-level and method-level abstractness round-trip cleanly.

## Signals — argument names from named tuples

`gd.signal<T>()` declares a typed signal. The tuple **element labels** (TypeScript named tuple syntax) become signal argument names in GDScript:

```typescript
health_changed = gd.signal<[from: int, to: int]>(); // named labels
mana_changed = gd.signal<[int, int]>(); // unnamed
game_over = gd.signal(); // no args
```

```gdscript
signal health_changed(from: int, to: int)
signal mana_changed(arg1: int, arg2: int)
signal game_over
```

When the tuple elements are unlabelled, GDScript args fall back to `arg1`, `arg2`, …. Always prefer named tuples — they give readable signal signatures both in IDE autocomplete (via TS) and in the Godot editor (via GD).

## Logical operators (`||` / `&&`)

GDScript `or` / `and` always return `bool`, unlike JS/TS where `||` / `&&` return one of the operands. The converter handles this asymmetry in both directions.

### TS → GD

When `||` / `&&` is used **as a value** (assigned, passed as argument, returned), the converter raises an error with two suggested fixes:

- Wrap in `bool()` to accept the boolean result: `let x = bool(a || b)`
- Use a ternary for value coalescing: `let x = a ? a : b`

The error is suppressed when the expression is in a **boolean context** (`if` / `while` condition, negation, nested in another logical operator, or already wrapped in `bool()`).

### GD → TS

When `or` / `and` is used as a value in GDScript, the converter auto-wraps the expression in `bool()` to preserve correct semantics:

```gdscript
# GDScript
var x = a or b
```

```typescript
// TypeScript
let x = bool(a || b);
```

The `bool()` wrapper is skipped when the expression is already boolean (composed of comparisons, logical operators, or boolean literals).

## Anonymous classes (`_FilenameClass` convention)

A `.gd` file with no `class_name` declaration has no global identifier in Godot. On the TS side this project models such files with a class whose name starts with `_` and matches the file's basename in UpperCamelCase:

- `some_class.gd` → `_SomeClass`
- `Anonym.gd` → `_Anonym`

The leading underscore is the marker. A TS class named `_Foo` produces a `.gd` file with no `class_name`.

For addon-mode behaviour (the `_$CLASS$_` sentinel) and the `_Foo` → `G_Foo` escape used when migrating GDScript files that already declare `class_name _Foo`, see [docs/configuration.md](configuration.md#anonymous-classes--advanced-details).

## Strings and template literals

Single quotes, double quotes, and template literals all map to GDScript double-quoted strings (escapes preserved).

Template literals are flattened into `str()`-wrapped concatenation:

```typescript
let s = `${name}! has ${count} items`;
```

```gdscript
var s = "" + str(name) + "! has " + str(count) + " items"
```

Verbose, but GDScript has no native f-strings. If you need cleaner output, use `String.format` from the GDScript side via `gd.eval`.

## GD-side shorthand literals (GD → TS only)

GDScript has shorthand literal syntax for common node-tree and string types. These are normalized to explicit calls when converting GD → TS:

| GDScript              | TypeScript                                       |
| --------------------- | ------------------------------------------------ |
| `&"name"`             | `StringName("name")`                             |
| `^"path/to/node"`     | `NodePath("path/to/node")`                       |
| `$Sprite`             | `this.get_node("Sprite")`                        |
| `$"Path/To/Node"`     | `this.get_node("Path/To/Node")`                  |
| `%UniqueNode`         | `this.get_node("%UniqueNode")`                   |
| `%"UniqueNode"/Child` | `this.get_node("%UniqueNode/Child")`             |
| `$Sprite as Sprite2D` | `gd.as(this.get_node("Sprite"), Sprite2D)`       |
| `var x := 42`         | `let x = 42` (walrus inference drops annotation) |

(TS → GD prefers `this.get_node(...)` over `$` so source-map columns stay meaningful.)

## `super` calls

| GDScript         | TypeScript         | Notes                                                                                           |
| ---------------- | ------------------ | ----------------------------------------------------------------------------------------------- |
| `super()`        | `super.<method>()` | GD's bare `super()` calls the same-named method on the parent; the TS side names it explicitly. |
| `super.method()` | `super.method()`   | Direct parent-method invocation, identical syntax.                                              |

## GD → TS implicit `this.`

GDScript reaches own/inherited members via a bare identifier (`speed`, `move_and_slide()`); TypeScript needs `this.`. When converting GD → TS, the converter resolves each bare identifier against:

1. The class's own members (fields, methods, signals, constants).
2. The inherited member list from the registered base class (Godot built-ins or a user `class_name` chain).

If the name matches a member, `this.` is prefixed. Globals (Godot global functions like `print`, `tanh`, `move_toward`; autoload singletons like `TextServerManager`) stay bare. Unknown identifiers are also left bare — usually a sign of a missing typings file.

## Member ordering

The TS → GD converter preserves source order for class members (fields, methods, signals, constants, static vars). Members lifted from a paired `namespace` block (enums, inner classes, namespace-scoped consts) are emitted first, in their own declaration order, followed by the class body in source order. This keeps generated GD files easy to read against their TS source.

## Imports → preload

| TS                                       | GD                                                 |
| ---------------------------------------- | -------------------------------------------------- |
| `import { Foo } from './foo.ts'`         | _(skipped — `Foo` is global via `class_name Foo`)_ |
| `import { Foo as Bar } from './foo.ts'`  | `const Bar = preload("res://foo.gd")`              |
| `import { _Anon } from './anon.ts'`      | `const _Anon = preload("res://anon.gd")`           |
| `extends _Anon` (after the import above) | `extends "res://anon.gd"`                          |
| `extends preload("res://some.gd")`       | `extends "res://some.gd"`                          |
| `import type { ... } from '...'`         | _(erased — type-only)_                             |
| `import Foo from '...'` (default)        | **error** — no GD equivalent                       |
| `import * as ns from '...'` (namespace)  | **error** — no GD equivalent                       |

A field name that collides with an imported local is a hard error (the emitted `const` would shadow the field).

## Restrictions — unsupported TypeScript features

The converter rejects TS features that have no faithful GDScript equivalent. Each appears as a converter error (TS → GD) and a squiggle in the IDE plugin.

### Syntax-level restrictions (errors)

| TS feature                                                  | Why it's rejected                                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Destructuring** — `let [a, b] = ...` / `let {a, b} = ...` | GDScript has no destructuring. Assign each binding manually.                                                       |
| **`for...in`**                                              | GDScript `for in` always iterates **values** (TS `for...of` semantics). Use `for...of` to avoid confusion.         |
| **Nullish coalescing** — `??` / `??=`                       | GDScript distinguishes `null` from default values differently; no direct equivalent.                               |
| **Optional chaining** — `?.`                                | GDScript has no `?.` short-circuit. Use explicit `null` checks or `obj.get("key")` for Dictionary access.          |
| **Spread** — `f(...args)` / `[...arr]`                      | Variadic call sites can't be desugared to GDScript. Function declarations may use `...rest` (rest parameters).     |
| **`var` keyword** — function-scoped `var x`                 | Warning (not error). Use `let` or `const`; both convert to GDScript `var`. GD `var` ≈ TS `let`.                    |
| **File-scope `const`/`let`/`var`**                          | GDScript doesn't allow top-level mutable bindings outside a class. Wrap in a class.                                |
| **Multiple `export class` per file**                        | Each `.gd` is one class. Split additional classes into separate files, or use inner classes via namespace merging. |
| **Missing `extends` clause**                                | GDScript defaults to `RefCounted` — declare the base explicitly (`RefCounted`, `Node`, `Resource`, ...).           |
| **`import Foo from '...'`** (default import)                | GDScript has no default-export concept.                                                                            |
| **`import * as ns from '...'`** (namespace)                 | Same reason.                                                                                                       |
| **Namespace member without `export`**                       | The paired class can only see `export`ed members from the namespace.                                               |
| **Field name conflicts with a file-scope declaration**      | The emitted `preload` const would shadow the field — name them differently.                                        |

### Type-system restrictions

| Pattern                                                                                                | Rejected because                                                                           |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **`undefined` type or value** — `x: undefined`, `let x = undefined`                                    | GDScript has only `null`. Use `null` everywhere.                                           |
| **Optional parameter that may be `undefined`** — `x?: T` used where the body would receive `undefined` | Same reason — `undefined` is forbidden at the value level. Use `x: T \| null = null`.      |
| **String-valued enum members** — `enum E { A = "alpha" }`                                              | GDScript enums are integers.                                                               |
| **Explicit `Promise<T>` annotation outside an `async` return**                                         | GDScript has no `Promise` runtime — the type can only describe an `async` method's return. |
| **Promise value used without `await`**                                                                 | Storing or passing a coroutine result as a value has no GDScript equivalent.               |
| **`Promise.then` / `.catch` / `.finally`**                                                             | No GDScript equivalent — use `await` and try/catch-like flow.                              |

### `in` operator (Godot CLI surfaces these)

GDScript's `in` operator is supported on `Array`, `Dictionary`, and `String`. It does **not** work on:

- Value types like `Vector2`, `Color`, `Transform2D` — components are accessed by name (`.x`, `.r`).
- `Packed*Array` types (e.g. `PackedColorArray`, `PackedByteArray`) — use `.has(value)` instead.

The TypeScript plugin and Godot CLI both flag these as errors so the diagnostic surfaces in your editor.

### `gd.dict([...])` constraints

Use `gd.dict()` when you need a Dictionary with non-string keys (variables, computed values). See [`gd.dict`](gd-helpers.md#typed-dictionary-literals-gddict). Restrictions:

- Must take **exactly one** argument.
- The argument must be an array literal (`gd.dict([...])`).
- Each entry must be a 2-tuple `[key, value]`.
- Keys may be identifiers, string literals, or member access — **not** arbitrary expressions (`key + 1`, function calls). Pre-compute the key into a variable if needed.

### `gd.getset({...})` constraints

- Must include **both** `get` and `set` keys (set either to `null` to fall back to GDScript's default backing-field accessor). At least one must be non-null.
- **Cannot mix** inline arrow-function bodies with the function-reference form (`get: this.get_x`) in a single call. GDScript itself rejects mixing `get:` bodies with `get = fn_name`.
- A `value:` default is only valid alongside inline bodies, not the function-reference form.

Full helper reference: [docs/gd-helpers.md](gd-helpers.md#getters-and-setters).
