// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents the input shader parameter within the visual shader graph. */
declare class VisualShaderNodeInput extends VisualShaderNode {
  /**
   * One of the several input constants in lower-case style like: "vertex" (`VERTEX`) or "point_size" (`POINT_SIZE`).
   */
  input_name: string;
  set_input_name(value: string): void;
  get_input_name(): string;

  /**
   * Returns a translated name of the current constant in the Godot Shader Language. E.g. `"ALBEDO"` if the {@link input_name} equal to `"albedo"`.
   */
  get_input_real_name(): string;

  /** Emitted when input is changed via {@link input_name}. */
  input_type_changed: Signal<[]>;
}
