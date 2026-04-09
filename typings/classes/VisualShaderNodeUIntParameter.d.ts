// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A visual shader node for shader parameter (uniform) of type unsigned [int]. */
declare class VisualShaderNodeUIntParameter extends VisualShaderNodeParameter {
  /**
   * Default value of this parameter, which will be used if not set externally. {@link default_value_enabled} must be enabled; defaults to `0` otherwise.
   */
  default_value: int;
  /** If `true`, the node will have a custom default value. */
  default_value_enabled: boolean;
  set_default_value(value: int): void;
  get_default_value(): int;
  set_default_value_enabled(value: boolean): void;
  is_default_value_enabled(): boolean;
}
