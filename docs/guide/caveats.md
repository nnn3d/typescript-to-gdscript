# Caveats

Your TypeScript becomes GDScript, so it can only do what GDScript can. Some TypeScript syntax has no GDScript counterpart, and some behaves differently once converted. This page lists both.

The converter reports everything under "Unsupported syntax" as an error, in your editor as you type and from `tstogd convert`, so none of it slips into a `.gd` unnoticed. The differences further down convert fine, so they are worth knowing before they surprise you.

## Unsupported syntax

- **Destructuring**, such as `let [a, b] = pair` or `let { x } = point`. GDScript has none. Assign each value on its own line.
- **`for...in`**. It walks keys in TypeScript, while GDScript's `for x in` walks values. Use `for...of`, and `dict.keys()` for a dictionary's keys.
- **`x in array`**. It checks for an index in TypeScript, while GDScript's `in` checks for an element. Use `array.has(x)`. `in` on a dictionary checks for a key in both and is fine.
- **`??` and `??=`**. GDScript has no such operator. Use a ternary: `x !== null ? x : fallback`.
- **Optional chaining `?.`**. GDScript has no short-circuiting member access. Check for `null` first; a dictionary read already gives `null` for a missing key.
- **Spread**, `f(...args)` and `[...list]`. A call can't take a variable number of arguments in GDScript. Pass the values one by one, and join arrays with `gd.ops.add(a, b)`. A rest parameter in a declaration (`f(...args: int[])`) is fine.
- **Top-level `let` and `const`**. GDScript has no variables outside a class. Put constants in the class's [namespace](./enums-constants-inner-classes.md) and variables in the class.
- **More than one class per file**. A `.gd` file is one class. Move the others to files of their own, or make them [inner classes](./enums-constants-inner-classes.md#inner-classes).
- **A class without `extends`**. GDScript would pick `RefCounted` for you. Write the base class, even when it is `RefCounted`.
- **String enums**, `enum E { A = 'a' }`. GDScript enum values are integers. Use integer values, or string constants.
- **`undefined`**. GDScript has only `null`. Write `null`, and write an optional parameter as `x: int | null = null` rather than `x?: int`.
- **`var`**. This one is a warning: it converts to GDScript `var`, but TypeScript's `var` is scoped to the function. Use `let`, which matches GDScript's `var`, or `const`.
- **Operators GDScript lacks**: `>>>`, `&&=`, `||=`, the comma operator, `void`, and `x++` used as a value. Rewrite with plain statements; `x++;` on its own line is fine.
- **Labels** on loops, with `break label` or `continue label`. GDScript has no labels. Use a flag or an early `return`.
- **Parameter properties**, `constructor(public x: int)`. Declare `x` as a field and assign it in the constructor.
- **Default and namespace imports**, `import Foo from` and `import * as ns from`. GDScript has nothing like them. Import classes by name: `import { Foo } from './foo'`.

## Differences to know

### `&&` and `||` return a bool

In TypeScript `a || b` gives one of the operands. GDScript's `or` and `and` always give `true` or `false`. Using one as a value is an error. Pick a value with a ternary (`a ? a : b`), or wrap the expression in `bool()` when a boolean is what you want. Conditions (`if (a && b)`) are unaffected.

### `switch` becomes `match`

`match` branches never fall through, so write each `case` without `break`. A `break` that leaves the `switch` is an error. Empty cases stacked above another share its body, as in TypeScript. `default` becomes `_` and always goes last. See [`switch` on an enum](./enums-constants-inner-classes.md#switch-on-an-enum).

### `==` and `===` are the same

Both become GDScript `==`. It compares vectors, colors, arrays and dictionaries by their contents, not by identity: two separate arrays `[1, 2]` are equal. Use `is_same(a, b)` to check whether two values are the same object.

### Integer division

`/` between two `int` values drops the fraction (`7 / 2` is `3`), and TypeScript can't warn you. See [Math and value types](./math-and-value-types.md#int-and-float).

### Dictionary reads return `null`

A plain object is a `Dictionary` in GDScript. Reading `obj.key` becomes `obj.get("key")`, which gives `null` for a missing key, never `undefined`.

### Value types are copied

`Vector2`, `Color`, `Transform2D` and the other value types are copied when you assign them, even though TypeScript sees them as objects. `let p = this.position; p.x = 1;` doesn't move the node. Arrays and dictionaries are shared, as in TypeScript.

### A constructor runs the parent's only through `super()`

A `constructor` becomes `_init`, and GDScript runs the parent class's `_init` from it only when you call `super()`. TypeScript lets you leave `super()` out here, and then the parent's constructor is skipped. A class with no constructor of its own still gets the parent's.

### Lambdas copy the local variables they use

`count += 1` inside an arrow function doesn't change the outer `count` in Godot: a GDScript lambda gets its own copy of the local variables it uses, and TypeScript doesn't warn you. Keep shared state in a field (`this.count`). See [Functions and lambdas](./functions-and-lambdas.md#arrow-functions-and-callables).

### Coroutines, not promises

An `async` method is a GDScript coroutine. `await` is the only way to get its result: `.then`, `.catch`, `.finally`, `new Promise` and keeping an unawaited result are all errors. See [Coroutines](./coroutines.md#what-you-cant-do).

### Inherited properties can't be redeclared

TypeScript lets a subclass declare a field its base already has, such as `name: string` on a `Node`. GDScript refuses such a script. Rename the field.

## Details

[Restrictions](../reference/transform-rules.md#restrictions--unsupported-typescript-features) in the reference has the full list, with the reason for each item.
