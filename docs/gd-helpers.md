[← Back to README](../README.md)

> Brief: complete reference for the `gd` namespace — every helper, its semantics, and its edge cases.

# `gd` Namespace Helpers

## Signals

```typescript
class Player extends CharacterBody2D {
  health_changed = gd.signal<[from: int, to: int]>();   // named tuple → named args
  mana_changed   = gd.signal<[int, int]>();             // unnamed → arg1, arg2
  died           = gd.signal();                         // no args
}
```

Tuple **element labels** (TypeScript named tuple syntax) become signal argument names in the generated GDScript. Unlabelled tuple elements fall back to `arg1`, `arg2`, …. Always prefer labelled tuples — they give readable signatures in both IDE autocomplete (via TS) and the Godot editor (via GD).

Emitting and connecting:

```typescript
this.health_changed.emit(old, new);
this.health_changed.connect(this._on_health_changed);
```

## Cast functions and primitive helpers

These live at the top level (not under `gd.*`) but are part of the helper surface:

| Helper                | Behavior                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `int(x)` / `float(x)` | GDScript primitive cast — truncates / converts to the named numeric type.                |
| `bool(x)`             | Converts to GDScript `bool`. Also used to wrap `\|\|` / `&&` value-context expressions.  |
| `String(x)`           | Converts to GDScript `String`.                                                           |
| `StringName(s)`       | Constructs a GDScript `StringName`. Round-trips as `&"..."` shorthand.                   |
| `NodePath(s)`         | Constructs a GDScript `NodePath`. Round-trips as `^"..."` shorthand.                     |
| `TSOnly<T>`           | Type-level only — stripped at conversion. Use to mark types that have no GD counterpart and must not survive into the emitted code. |

## Typed dictionary literals (`gd.dict`)

A normal TypeScript object literal `{ "key": value }` converts to a GDScript dictionary literal — but TS object-literal keys are always string-coerced, so non-string keys (variables holding `StringName`, `Vector2`, an object reference, …) lose their identity.

`gd.dict()` accepts an array of `[key, value]` tuples and preserves the key expression exactly:

```typescript
const key1 = "key";
const key2 = Vector2.DOWN;
const key3 = new Node2D();

let dict = gd.dict([
  [key1, "value"],
  [key2, "value"],
  [key3, "value"],
  ["string-key", "value"],
]);
```

```gdscript
var dict = {
    key1: "value",
    key2: "value",
    key3: "value",
    "string-key": "value",
}
```

Constraints (enforced by the converter):

- Exactly one argument, which must be an **array literal**.
- Each entry is a 2-tuple `[key, value]`.
- Keys must be identifiers, string literals, or member access — not arbitrary expressions like `key + 1` or function calls. Pre-compute into a variable first.

## Math operations

For operator overloading on value types (Vector2, Color, etc.):

```typescript
let result = gd.ops.add(Vector2(1, 1), Vector2(2, 3));
let scaled = gd.ops.mul(position, 2.0);
let remainder = gd.ops.rem(Vector2i(10, 20), Vector2i(3, 7));
let concat = gd.ops.add([1, 2], [3, 4]); // Array concatenation
```

Available operators: `add`, `sub`, `mul`, `div`, `rem`, `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `plus` (unary), `minus` (unary).

## Type casting (`as`)

```typescript
// Class cast (returns Type | null)
let sprite = gd.as(get_node('Sprite'), Sprite2D);

// Variant conversion between primitive value types (Vector2 ↔ Vector2i, Rect2 ↔ Rect2i, etc.)
let v2: Vector2 = Vector2(1, 2);
let v2i: Vector2i = gd.as(v2, Vector2i);  // Vector2 → Vector2i

// Array conversion (PackedColorArray ↔ Array, etc.)
let packed: PackedColorArray = PackedColorArray();
let arr: Array<Color> = gd.as(packed, Array);  // element type inferred from iterator
```

Variant conversion is enabled via `[__variant_converts]` symbol on each value-type interface. The symbol's type is a union of types that the target's constructor accepts as single "from" parameters. For `Array`-like conversions, the element type is inferred via `[Symbol.iterator]: IterableIterator<T>` on the source interface.

## Raw GDScript (`eval`)

Emit raw GDScript code that can't be expressed in TypeScript. The string content is inserted as-is, with indentation automatically adjusted to the current level.

```typescript
class Player extends CharacterBody2D {
  _ready() {
    gd.eval('var a = 10');
    gd.eval(`
var b = 20
if b > 10:
\tb = 30
    `);
  }
}
```

Space-based indentation is automatically converted to tabs. Mixed tabs and spaces produce a conversion error.

`gd.eval()` can also be used as a variable initializer for inline expressions or multiline constructs (e.g. GDScript lambdas). A generic type parameter `gd.eval<T>(...)` provides the TS type:

```typescript
// Simple inline expression
const v = gd.eval<string>('c');
// becomes: var v = c

// Multiline lambda
const fun1 = gd.eval<(x: string) => void>(`func (x: string):
  print(x)
`);
// becomes:
// var fun1 = func (x: string):
//     print(x)
```

The first non-empty line becomes the RHS of the variable declaration; subsequent lines are emitted as the body with their relative indentation preserved.

For contexts where `gd.eval()` can't be used directly (e.g., before the class declaration or between members), use `// @gd.eval:` magic comments:

```typescript
// @gd.eval: @tool
export class Player extends CharacterBody2D {
  // @gd.eval: @icon("res://icon.svg")
  speed: float = 100.0;

  // @gd.eval: signal custom_signal(value: int)
  health: int = 100;

  _ready() {
    // @gd.eval: var special := preload("res://special.tscn")
    let x: int = 1;
  }
}
```

Spaces after `@gd.eval:` are ignored, but tab characters are preserved as additional indentation.

## Match statement

**Simple matches** (literal/expression patterns + wildcard) use the native TS `switch` statement. GD→TS emits `switch` for these and TS→GD converts `switch` back to `match`:

```typescript
switch (this.state) {
  case 1:
    print("one");
    break;
  case 2:
    print("two");
    break;
  default:
    print("other");
    break;
}
// ↔ match self.state:
//       1:
//         print("one")
//       2:
//         print("two")
//       _:
//         print("other")
```

Fall-through `case` labels map to multi-pattern `1, 2, 3:` on the GDScript side.

**Advanced patterns** (arrays, dicts, pattern bindings, guards) use `gd.match()` with arrow-function `do: () => {}` cases to preserve `this` context:

```typescript
gd.match(this.x, [
  // Multiple patterns
  { matchMany: [1, 2, 3], do: () => { print("1-3"); } },
  // Pattern binding with guard
  (x, y) => ({ match: [x, y], when: y === x, do: () => { print("y = x"); } }),
  // Array open-ending
  { match: [42, ...[]], do: () => { print("starts with 42"); } },
  // Dictionary pattern
  (age) => ({ match: { name: "Dennis", age: age }, do: () => { print(age); } }),
  // Dictionary open-ending
  { match: { key: "val", ...{} }, do: () => { print("has key"); } },
]);
```

## Getters and setters

Simple GDScript setget clauses map to native TypeScript `get`/`set` accessors. If only one of `get` or `set` is defined in GDScript, the converter synthesizes a default for the other.

```typescript
class GetsetExample extends Node {
  // ↔ var a: int:
  //       get: return a
  //       set(value): a = value
  get a(): int { return this.a; }
  set a(value: int) { this.a = value; }
}
```

Inside accessor bodies, `this.<propName>` is rewritten to a bare identifier in GDScript to reference the backing field (avoiding the infinite recursion that `self.x` would cause inside `get x`/`set x`).

For cases that TS accessors can't express — a default value, or the `get = fn_name, set = fn_name` function-reference syntax — use the `gd.getset()` helper. An explicit **property type annotation** (`b: int = gd.getset({...})`) is **required**: the inline arrow functions reference `this.b` inside the initializer, which fires `TS7022: 'b' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer`. The annotation breaks the binding-resolution cycle and also supplies the contextual type for `gd.getset`, so the generic `<T>` is inferred and can be omitted. The GD→TS converter emits the annotation automatically.

```typescript
class GetsetExample extends Node {
  //   var b: int = 10:
  //       get: return b
  //       set(value): b = value
  b: int = gd.getset({
    value: 10,
    get: () => { return this.b; },
    set: (value) => { this.b = value; },
  });

  //   var c: int:
  //       get = get_c, set = set_c
  c: int = gd.getset({
    get: this.get_c,
    set: this.set_c,
  });

  get_c(): int { return 10; }
  set_c(v: int) {}
}
```

Rules:
- `gd.getset()` requires **both** `get` and `set` keys (a converter error is raised otherwise). Either may be set to `null` to fall back to GDScript's default backing-field read/write — at least one must be non-null.
- You **cannot mix** inline arrow-function bodies with function-reference form in a single `gd.getset()` call. Same restriction applies to GDScript — mixing inline `get:` bodies with `get = fn_name` is rejected.
- A `value` default can only be combined with inline bodies, not with function-reference form.

```typescript
// `set: null` — only a custom getter; GDScript uses its default setter.
// No explicit GDScript type → converter emits `typeof this.e` as the
// property annotation (derived from the value expression).
f: typeof this.e = gd.getset({
  value: this.e,
  get: () => { return this.f; },
  set: null,
});
// ↔ var f = self.e:
//       get:
//           return f
```

When the value expression is not typeof-able (a literal like `10`, a call, an operator expression, etc.) and there's no GDScript type annotation, the fallback is `unknown` by default, or `any` when `--unsafe-use-any` is passed to `initial-convert-gd-to-ts`.

## Type checking (`is`)

For class types, use standard `instanceof`:

```typescript
if (x instanceof Node2D) { ... }
// ↔ if x is Node2D:
```

For primitive types (`int`, `float`, `bool`, `String`), use `gd.is()`:

```typescript
if (gd.is(x, int)) { ... }
// ↔ if x is int:

if (!gd.is(x, int)) { ... }
// ↔ if x is not int:
```

Negation of `not x is Y` in GDScript converts to `!(gd.is(x, Y))` or `!(x instanceof Y)` with correct parenthesization.

## StringName / NodePath

`StringName` is a type alias for `String` (identical API in GDScript). `NodePath` is its own variant type with a dedicated interface and constructor.

```typescript
let sn = StringName('my_signal');
let np = NodePath('Path/To/Node');
```

## Promise — GDScript coroutine rules

GDScript has no `Promise` type. `async` / `await` map directly to GDScript's coroutine `await`, but the chained-callback API has no equivalent. The bundled typings mark `Promise.then`, `Promise.catch`, and `Promise.finally` as **`@deprecated`** so your IDE shows a strikethrough as you type, and the converter raises a `type-error` if you call them.

```typescript
async load(): Promise<int> { return 42; }

run() {
  // ✅ OK — awaited
  const value = await this.load();

  // ❌ Error — Promise used as value
  const promise = this.load();        // type-error
  somewhere(this.load());             // type-error
  return this.load();                 // type-error (when caller isn't awaiting)

  // ❌ Error — chained-callback API
  this.load().then((v) => v + 1);     // @deprecated + converter error
  this.load().catch((e) => e);        // @deprecated + converter error
  this.load().finally(() => {});      // @deprecated + converter error
}
```

The IDE warns immediately (via `@deprecated`); the converter catches the same cases on save. See [`transform-rules.md` § Async / await](transform-rules.md#async--await) for the return-type unwrapping rules and [`transform-rules.md` § Restrictions](transform-rules.md#restrictions--unsupported-typescript-features) for the full Promise restriction table.
