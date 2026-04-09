// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link Vector3} parameter to be used within the visual shader graph. */
declare class VisualShaderNodeVec3Parameter extends VisualShaderNodeParameter {
  /** A default value to be assigned within the shader. */
  default_value: Vector3;
  /** Enables usage of the {@link default_value}. */
  default_value_enabled: boolean;
  set_default_value(value: Vector3 | Vector3i): void;
  get_default_value(): Vector3;
  set_default_value_enabled(value: boolean): void;
  is_default_value_enabled(): boolean;
}
