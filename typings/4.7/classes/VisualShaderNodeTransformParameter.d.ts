// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A {@link Transform3D} parameter for use within the visual shader graph. */
declare class VisualShaderNodeTransformParameter extends VisualShaderNodeParameter {
  /** A default value to be assigned within the shader. */
  default_value: Transform3D;
  /** Enables usage of the {@link default_value}. */
  default_value_enabled: boolean;
  set_default_value(value: Transform3D): void;
  get_default_value(): Transform3D;
  set_default_value_enabled(value: boolean): void;
  is_default_value_enabled(): boolean;
}
