# tstogd for agents

`typescript-to-gdscript` (CLI `tstogd`) converts `.ts` to `.gd`. Godot runs only the `.gd`; there is no JS runtime. Write GDScript in TS syntax: **Godot API + Godot semantics + TS types**. If GDScript can't do it, neither can you. Assume GDScript knowledge; below is only what differs.

## Files

Read `tstogd.json` first (nearest one upwards; paths are relative to its `rootDir`, default its own folder). Layouts vary: don't assume `src/` or `scripts/`.

- `tsDir` (default `src`, may be `.`): every `.ts` in it is converted, except `.d.ts`, `node_modules`, hidden folders, `tstogd_modules` and `exclude` globs.
- `gdDir` (default `scripts`, may equal `tsDir`): output, same relative path: `<tsDir>/a/b.ts` → `<gdDir>/a/b.gd`.
- `typingsDir` (default `_gdtots`): generated `.d.ts`.
- `converterOptions.generateGlobalClassTypes: true`: named classes are global in TS, no imports needed.
- `lib`, `externalPackages`: shared packages, linked into `tstogd_modules/`.

Never edit generated files: a `.gd` with a `.ts` at the mirrored path (edit the `.ts`), anything in `typingsDir` or `tstogd_modules/`. A `.gd` without a mirrored `.ts` is hand-written. Scenes, `project.godot`, `preload` etc. reference the `.gd` path (`res://<gdDir>/...`), never the `.ts`.

Renaming or deleting a `.ts` leaves the old `.gd` behind: delete it (and its `.gd.uid`) and update references.

## Loop

1. Edit `.ts`.
2. `npx tstogd convert` — converts, regenerates typings, checks everything; non-zero exit on error. Run it also after changing scenes, resources, autoloads, groups or addons: types come from them. A running `watch` does this on save (addons: only at start), but still run `convert` at the end.
3. Fix by label, all at `.ts` positions: `[TS]` type checker, `[CONV]` no GDScript equivalent (that `.gd` is NOT rewritten, the old one stays), `[GD]` Godot rejected the output. `[ADDON]` warnings are third-party, ignore. If Godot isn't found, the `[GD]` check is skipped with a warning: set `godotPath` in `tstogd.json` or `GODOT_PATH`.

Don't silence errors with `any`, `as any`, `@ts-ignore`: the types mirror the engine. Other commands and flags: `npx tstogd --help`, `npx tstogd <command> --help`.

## Look up, don't guess

In `node_modules/typescript-to-gdscript/typings/` (or `godotTypingsDir`):

- `classes/<GodotClass>.d.ts` — engine API with docs (`Object.d.ts` = `GodotObject`); `classes/_globals.d.ts` — global functions, enums, annotations.
- `globals/gd-helpers.d.ts` — the whole `gd` namespace.

Names are Godot's, snake_case: `append`, `size()`, `length()`, `to_upper()`, `print`. No JS library: no `push`, `.length`, `Math`, `console`, `Map`, `Set`, `Date`, `RegExp`, `setTimeout`, `Object.keys`; `JSON` is Godot's class.

## Script

```ts
// import { Enemy } from './enemy';    named class: emits nothing (global class_name)
// import { _Hud } from './hud';       `_` class: const _Hud = preload("res://...")
// import type { T } from './types';   erased

export interface Hit {
  damage: int;
}

// const, enum and inner classes live here, all exported, same name as the class
export namespace Player {
  export const MAX_HP = 100; // → const MAX_HP = 100
  export enum State {
    IDLE,
    DEAD = 10,
  }
  export class Loot extends RefCounted {
    amount: int = 1;
  }
}

@tool
@icon('res://player.svg')
export class Player extends CharacterBody2D {
  static count: int = 0; // → static var count: int = 0
  health_changed = gd.signal<[old_value: int, new_value: int]>(); // → signal health_changed(old_value: int, new_value: int)
  died = gd.signal(); // → signal died

  @export_group('Stats')
  @exports // → @export
  speed: float = 200.0;
  @export_range(0, 100) armor: int = 0;
  @export_multiline() notes: string = ''; // → @export_multiline
  @exports bullet!: PackedScene; // → var bullet: PackedScene
  @onready body = gd.as(this.get_node('Body'), Sprite2D); // → self.get_node("Body") as Sprite2D

  state: Player.State = Player.State.IDLE;
  hp: int = Player.MAX_HP;
  target: Node2D | null = null; // → var target: Node2D = null
  tags: string[] = []; // → Array[String]
  on_hit: (by: string) => void = (by) => print(by); // → var on_hit: Callable

  // `this.level` inside is the backing field
  get level(): int {
    return this.level;
  }
  set level(v: int) {
    this.level = maxi(v, 1);
  }
  // accessor plus default; the annotation is required
  mana: int = gd.getset({
    value: 10,
    get: null, // null = default accessor
    set: (v) => {
      this.mana = clampi(v, 0, 100);
    },
  });

  constructor(start: int = 1) {
    this.level = start; // → func _init(start: int = 1):
  }

  _ready() {
    let timer = new Timer(); // → Timer.new()
    this.add_child(timer);
    timer.timeout.connect(this._on_timeout.bind(2));
    this.died.connect(() => print('died'), Object.CONNECT_ONE_SHOT);
    this.on_hit('spike'); // → self.on_hit.call("spike")
  }

  _physics_process(delta: float) {
    let dir = Input.get_vector('ui_left', 'ui_right', 'ui_up', 'ui_down');
    this.velocity = gd.ops.mul(dir, this.speed); // → (dir * self.speed)
    this.position.x += 1;
    if (this.target !== null && this.target instanceof Sprite2D) {
      this.target.flip_h = true;
    }
    for (let i of range(3)) print(i); // → for i in range(3):
    switch (this.state) {
      case Player.State.IDLE:
      case Player.State.DEAD:
        this.move_and_slide(); // no break
      default:
        print(`hp ${this.hp}`); // → "hp " + str(self.hp)
    }
  }

  async hit(info: Hit): Promise<int> {
    this.health_changed.emit(this.hp, this.hp - info.damage); // → info.get("damage")
    await this.get_tree().create_timer(0.2).timeout;
    return this.hp;
  }

  static make(): Player {
    this.count += 1; // → Player.count += 1
    return new Player();
  }

  _on_timeout(slot: int) {}
}
```

- One `export class` per file, explicit `extends` (`extends RefCounted` if none; Godot `Object` as a type or base is `GodotObject`). Top level may also hold imports, `type`, `interface` and the same-name namespace; nothing else.
- `_FileName` class (PascalCase of the file name) = script without `class_name`. Import it by name; `extends _Name` becomes a path extends.
- Imports: named only, no extension, relative (a shared package by its name).
- Members always through `this.`, constants/enums/statics through the class name (`Player.MAX_HP`; inherited engine ones `Node.PROCESS_MODE_INHERIT`).
- `super.method()` as in GDScript. `super(...)` in a constructor only when one of your own base classes has a constructor: it is never run implicitly, and Godot rejects it directly under an engine class.
- `abstract class` / `abstract m(): void` → `@abstract`.
- Doc comment `/** */` → `##`.
- Annotations: Godot names as decorators. With optional-only args, keep the parens: `@export_file()`, `@rpc()`.
- Don't redeclare an inherited property (`name`, `position`, ...): Godot rejects it.

## Types

- `int`, `float`, `bool`, `string` (lowercase; `String(x)` is the cast). `number` = `float`. Always annotate ints as `int`.
- `T[]` → `Array[T]`. `Dictionary<K, V>` → `Dictionary`. Function type → `Callable`. Interfaces, unions, `any`, aliases of objects: checked in TS, untyped in GD.
- Only `null`, never `undefined`. Optional parameter or field: `x: Node | null = null`, not `x?: Node`. A value type `| null` (`int | null`) becomes untyped.
- Engine properties and returns that are objects are often `T | null`: narrow with `!== null`, or `!` when certain.
- Fields need an initializer: value type → its default; object set by the editor or in `_ready` → `name!: T`; may be absent → `T | null = null`.
- Engine-class enums (`Node.ProcessMode`) are typed `int`; global ones keep their name: `Key.KEY_A`, `Error.OK`, `Variant.Type.TYPE_INT`.
- `x as T` and `x!` are TS-only, erased. Runtime cast: `gd.as(x, T)` (class → `T | null`; also converts value types: `gd.as(v2, Vector2i)`). Runtime check: `x instanceof Class`, or `gd.is(x, int)` for `int` / `float` / `bool` / `String`.

## Values

- Value types are called, no `new`: `Vector2(1, 2)`, `Color.RED`, `Array()`, `Dictionary<Vector2i, Node>()`, `PackedByteArray([1])`. Objects use `new`.
- Operators on non-numbers: `gd.ops.add|sub|mul|div|rem|plus|minus(...)`, also for joining arrays (`gd.ops.add(a, b)`) and compound assignment (`this.position = gd.ops.add(this.position, v)`). `===` works on all types, by content (`is_same(a, b)` for identity).
- `{ a: 1 }` and anything typed by an interface is a `Dictionary`: reads become `.get("a")` (`null` if missing), writes stay `o.a = 1`. Class instances keep dot access.
- Non-string keys: `gd.dict<Vector2i, string>([[Vector2i.UP, 'n']])` (keys: names, literals, members only), then `.get()` / `.set()`.
- Strings: `'x' + str(n)` or a template (`'x' + 1` type-checks, Godot rejects it). Formatting: `s.format([...])`; there is no `%`.
- `StringName('a')` = `&"a"`, `NodePath('a')` = `^"a"`. A plain string is accepted as `StringName`; `get_node` takes a string, a `NodePath` property needs `NodePath(...)`.

## Nodes and resources

- `this.get_node('A/B')` / `'%Unique'` is `$A/B` / `%Unique`, typed from the scenes the script is attached to. Unknown path → `Node | null`: fix the path, or run `convert` if the scene changed. Script in no scene, or runtime path: `gd.as(this.get_node(p), Label)`.
- `preload('res://x.tscn').instantiate()`, `load('res://x.tres')`, `get_nodes_in_group('g')`, `get_child(0)` and autoload names are typed from the project. `get_parent<T>()` when you know better.
- Types of existing names: `GodotResourceName`, `GodotSceneName`, `GodotScriptName`, `GodotGroupName`; lookups like `GodotScenes['res://a.tscn']`.
- Addon classes with `class_name` are global; others through `preload`. Hand-written `.gd`: declare it in a global `.d.ts` (`declare class Foo extends Node { ... }`).

## Functions, coroutines

- `func` in a class → method; `(x: int) => ...` → lambda. Nested `function` is not supported. `this.method` is a `Callable`; calling a stored function adds `.call()` itself. `bind` appends arguments at the end.
- Uses `await` → `async`. Return type `Promise<T>` → `-> T`. Await a coroutine or call it as a bare statement; storing, passing, returning it unawaited is an error, and so are `.then`, `new Promise`, `Promise.all`.
- `await signal` gives `null`, the single argument, or an array of them.

## Errors → write instead

- `a ?? b`, `a || b` as a value → `a !== null ? a : b`; as a boolean → `bool(a || b)`. `a?.b` → null check.
- Destructuring, `...spread` in calls / literals → separate statements, `gd.ops.add`, `dict.merged()`. Rest parameters are fine.
- `for (let i = 0; ...)` works, but a second one with `let i` in the same block is a Godot error → `for (let i of range(n))`.
- `for...in` → `for (let k of dict.keys())`. Iterating a dictionary or a string directly is a type error.
- `x in array` → `array.has(x)` (`key in dict` is fine). `delete d.x` → `d.erase('x')`.
- `do...while` → `while (true)` + `break`. `try` / `throw` → return values, `push_error`, `assert`. `typeof x` → `gd.typeof(x)`. Regex literal → Godot `RegEx`.
- `x++` as a value, `a = b = c`, comma, `>>>`, `&&=`, `||=`, `??=`, `void`, labels, `var` → plain statements.
- `break` ending a `case` → delete it, cases never fall through. Stacked empty cases share a body. Early exit from a case → restructure with `if`.
- String enum → int enum or string constants. `constructor(public x)` → field + assignment. Methods / accessors in an object literal → `{ m: () => 1 }`.
- `static {}` → `static _static_init()`. Generators → array, signal or coroutine. Overload signatures, `#private`, decorators of your own: don't use. `private` / `protected` / `readonly` are fine (TS-only).

## Silent traps (nothing reports these)

- `int / int` truncates. Make one side float: `a / 2.0`, `float(a) / b`. `%` is int-only; use `fmod`.
- `switch` is type-strict on numbers: a `number` / `float` subject never matches `case 1:`. Switch on `int`, an enum or a string.
- Lambdas copy captured locals: assigning an outer `let` inside one is lost. Use a field, array or dictionary.
- Value types copy on assignment: `let p = this.position; p.x = 1` doesn't move the node; assign it back. Arrays and dictionaries are shared.
- Truthiness is GDScript's: empty array / dictionary / string, `0`, zero vector and freed object are falsy.
- `s.length` without `()` is a `Callable`, not a number. Same for any method.
- A missing `super()` skips your parent's constructor.

## Escape hatches (last resort)

- `gd.eval('raw gdscript')` as a statement; `let x = gd.eval<int>('expr')` as a value. Write `self`, not `this`; TS doesn't see names declared inside.
- `// @gd.eval: <line>` anywhere, e.g. before a statement: `// @gd.eval: @warning_ignore("integer_division")`.
- Array / dictionary / binding / guard patterns: `gd.match(v, [...])`, syntax in `gd-helpers.d.ts`.
- `TSOnly<T>`: type kept out of the `.gd`.

## More

Full spec, rarely needed: https://nnn3d.github.io/typescript-to-gdscript/ + `reference/transform-rules/`, `reference/gd-helpers/`, `reference/configuration/`, `reference/typings/`, `reference/cli/`. Tasks: `guide/migrating-from-gdscript/`, `guide/addons/`, `guide/shared-packages/`, `guide/custom-godot-builds/`.
