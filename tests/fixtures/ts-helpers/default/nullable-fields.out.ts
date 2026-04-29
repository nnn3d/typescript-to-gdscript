// Covers Phase A (unassigned reference fields → `T | null = null`) +
// ready-field-types interactions (primitives, value types, enums,
// _ready-assigned, already-widened, decorators, modifiers).
//
// Enum coverage exercises three resolution paths the TS checker may take
// for `TypeFlags.EnumLike`: file-local declaration, class-scoped
// declaration via namespace+class merge (the converter's standard output
// for inner enums), and a global Godot enum (`Key`) from the bundled
// typings (`declare const enum` in classes/_globals.d.ts).
enum LocalState { IDLE, RUNNING }

export namespace TestFields {
  export enum InnerMode { ONE, TWO }
}

export class TestFields extends Node2D {
  // Phase A: widen + initialize
  target: Node | null = null;
  texture: Texture2D | null = null;

  // Primitive / value type: Phase A skips; ready-field-types adds `!`
  count!: int;
  pos!: Vector2;

  // Local enum: ready-field-types adds `!` (defaults to 0 at runtime).
  state!: LocalState;
  // Class-scoped enum (namespace+class merge — converter's typical inner-enum form).
  inner_state!: TestFields.InnerMode;
  // Global Godot enum from the bundled typings.
  current_key!: Key;

  // Already nullish: untouched
  already: Node | null;

  // Assigned in _ready: Phase A skips; ready-field-types adds `!`
  in_ready!: Sprite2D;

  // Has initializer: fully strict, both helpers skip
  with_init: Node = this;

  // Decorators + modifiers must survive the widening
  @onready
  deco: Node | null = null;
  @onready readonly locked: Resource | null = null;

  _ready() {
    this.in_ready = Sprite2D.new();
  }
}
