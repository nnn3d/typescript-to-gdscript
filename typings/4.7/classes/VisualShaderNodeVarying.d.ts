// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A visual shader node that represents a "varying" shader value. */
declare class VisualShaderNodeVarying extends VisualShaderNode {
  /** Name of the variable. Must be unique. */
  varying_name: string;
  /** Type of the variable. Determines where the variable can be accessed. */
  varying_type: int;
  set_varying_name(value: string): void;
  get_varying_name(): string;
  set_varying_type(value: int): void;
  get_varying_type(): int;
}
