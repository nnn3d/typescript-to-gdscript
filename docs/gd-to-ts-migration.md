[← Back to README](../README.md)

> Brief: one-shot bulk migration of an existing GDScript project to TypeScript, plus the post-conversion helpers that polish the output.

# GD-to-TS Migration

## `tstogd initial-convert-gd-to-ts`

One-shot bulk conversion of GDScript files to TypeScript — intended for the **initial migration** of an existing GDScript project. Uses the Godot class registry to resolve inherited members for correct `this.` prefix insertion.

By default the command **refuses to overwrite existing `.ts` files** so it can be re-run safely without clobbering any TypeScript you've hand-edited since the first migration. Skipped files are listed at the end of the run and the command exits non-zero. Pass `--force` to overwrite.

```bash
tstogd initial-convert-gd-to-ts addons/plugin/Plugin.gd -o src/
tstogd initial-convert-gd-to-ts --force          # re-run from scratch, clobbering existing .ts
```

Registry resolution order:

1. `--registry` CLI flag (explicit path to `godot-class-registry.json`)
2. Bundled `typings/godot-class-registry.json`

Options:

- `-o, --output-dir <dir>` — Output directory
- `--registry <path>` — Path to `godot-class-registry.json`
- `-f, --force` — Overwrite existing TypeScript output files. Without this flag the command skips any `.gd` whose mirrored `.ts` already exists and exits non-zero.
- `--unsafe-use-any` — Less strict but less error-prone conversion mode. Currently affects:
  - `gd.getset` fallback type: uses `any` instead of `unknown` when neither a GDScript type annotation nor a typeof-able value expression is available.
  - Unsafe non-null assertions: TS2531/18047/18048/18046 "possibly null/undefined" errors get `!` inserted after the expression. TS2322/2345 where the root cause is a null union type get `!` after the RHS/argument.
  - TS7034 "variable implicitly has type `any[]`" gets `: any[]` annotation added.
- `--emit-on-error` — Emit output files even when conversion errors occur (errors inlined as `/* ERROR: ... */` comments)

The full set of conversion helpers (see below) always runs; there is no per-helper disable flag.

## Conversion Helpers

GD-to-TS conversion includes optional helpers that enhance the output.

### Signal handler helper

**Default: enabled.** Scans `.tscn` scene files for signal connections and adds typed parameter annotations to signal handler methods (e.g., `_on_area_entered(area: Area2D)` instead of untyped `_on_area_entered(area)`).

Toggle via `tstogd.json`:

```json
{
  "helpers": {
    "signalHandler": true
  }
}
```

### Operator fix helper

**Default: enabled.** After conversion and typings generation, runs the TypeScript type-checker on converted files to find operator type errors (e.g., `Vector2 + Vector2`). Automatically wraps them in `gd.ops.X()` calls (e.g., `gd.ops.add(v1, v2)`). Catches cases that GDScript-time type inference misses (inherited members, method return values, etc.).

### Explicit convert helper

**Default: enabled.** Runs alongside operator fix. Detects TS2345/TS2322/TS2739/TS2740/TS2741 assignment/argument errors where the source and target are both variant types (Vector2 ↔ Vector2i, PackedColorArray ↔ Array, etc.) and inserts an explicit `gd.as(value, Target)` conversion. Uses `variantConverts` metadata in `godot-class-registry.json` (derived from Godot XML "from" constructors). Handles return statements (wraps returned expression, not the `return` keyword) and property access assignments (redirects from LHS to RHS). Example: `wants_v2i(Vector2.DOWN)` → `wants_v2i(gd.as(Vector2.DOWN, Vector2i))`.

### Extends type helper

**Default: enabled.** Detects TS7006 ("Parameter X implicitly has an any type") on method parameters where the method overrides one inherited from a parent class. Copies the parameter types from the parent class signature, preserving type aliases (`float`, `int`) by using the syntactic type text from the parent's `.d.ts`. Example:

```typescript
class Player extends Node2D {
  _process(delta) {        // TS7006
    this.position.x += delta;
  }
  _input(event) {}         // TS7006
}
```
becomes:
```typescript
class Player extends Node2D {
  _process(delta: float) {
    this.position.x += delta;
  }
  _input(event: InputEvent) {}
}
```
Methods that don't override anything (`custom_method(arg)`) are left untouched.

### Nullable helper

Applies `T | null` widening and narrowing in two directions:

- **At emit time (IN positions)**: reference-typed function/method/lambda parameters, setter value parameters, and `gd.signal<[…]>()` generics start as `T | null` because Godot lets callers pass null to any class-typed argument. Accessor pairs (GD `setget` → TS `get`/`set`) emit the same type on both sides so reads and writes stay symmetric. Value types (Vector2, Color, PackedByteArray, …), primitives, and enum references are left strict.
- **After conversion (OUT positions)**: a post-processing pass handles return types, field annotations, getter returns, and local-variable annotations. Unassigned reference-typed fields are rewritten to `field: T | null = null` (both modes). Return types and assigned fields/locals start **strict** and get widened to `T | null` only when the TypeScript type-checker proves null flows through (TS2322). Addon mode additionally widens assigned fields and local-variable annotations up-front, since their full body isn't available to the type-checker the same way user code is.
- **After widening (IN fallback)**: parameters that were emitted as `T | null` get narrowed back to `T` when the function body dereferences them without a null-check (triggering TS2531 / TS18047 "possibly null" diagnostics). Runs after the OUT widening pass so return types settle before parameter narrowing kicks in — a return type's null status often depends on its parameters. Setter value params of accessor pairs are skipped to keep getter/setter nullability in sync.

Example:
```typescript
class Player extends Node2D {
  target: Node;                    // TS2564 + unassigned + reference
  find_target(node: Node2D) { ... } // IN position: reference
  dereference(node: Node2D) { node.queue_free(); } // body uses as non-null
  set_target(v: Node2D) { ... }     // IN position: reference
  signal_fired = gd.signal<[Node]>();

  do_something() {
    let found: Node = this.get_node("Foo");
    if (!found) found = null;       // TS2322
  }
}
```
becomes:
```typescript
class Player extends Node2D {
  target: Node | null = null;              // Phase A
  find_target(node: Node2D | null) { ... } // emit-time (body doesn't deref)
  dereference(node: Node2D) { node.queue_free(); } // Phase D narrowed back
  set_target(v: Node2D | null) { ... }     // emit-time
  signal_fired = gd.signal<[Node | null]>(); // emit-time

  do_something() {
    let found: Node | null = this.get_node("Foo"); // Phase C
    if (!found) found = null;
  }
}
```

### Ready field types helper

Detects TS7008 ("Member implicitly has an any type") and TS2564 ("Property has no initializer") on class properties:

- **TS2564** (`field: Type;`) — if assigned in `_ready()`, adds `!` (definite-assignment). If not assigned in `_ready()` but the type is a GDScript primitive or value type (`int`, `float`, `bool`, `String`, `Vector2`, `Color`, any value type with a guaranteed default), still adds `!`. Non-primitive unassigned fields are handled by the nullable helper (see above).
- **TS7008** (`field;`) — if assigned in `_ready()`, adds `!: <inferred type>` (type taken from the `_ready()` expression). Otherwise left untouched (no type to infer from).

Example:

```typescript
class Game extends Node {
  time: float;                   // TS2564, assigned in _ready
  progress_bar;                  // TS7008, assigned in _ready
  score: int;                    // TS2564, NOT assigned, but primitive
  target: Node2D;                // TS2564, NOT assigned, nullable helper widens

  _ready() {
    this.time = 0.0;
    this.progress_bar = this.game_ui.progress_bar;
  }
}
```
becomes:
```typescript
class Game extends Node {
  time!: float;                                    // assigned → `!`
  progress_bar!: typeof this.game_ui.progress_bar; // assigned → `!: <inferred>`
  score!: int;                                     // primitive → `!`
  target: Node2D | null = null;                    // nullable helper widens

  _ready() {
    this.time = 0.0;
    this.progress_bar = this.game_ui.progress_bar;
  }
}
```
For simple identifier/property-access right-hand sides, the helper emits `typeof <expr>`; for other expressions (literals, `new` calls, etc.) it uses the TS type checker's inferred type string.
