// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A base type for the parameters within the visual shader graph. */
declare class VisualShaderNodeParameter extends VisualShaderNode {
  /** The index within 0-15 range, which is used to avoid clashes when shader used on multiple materials. */
  instance_index: int;
  /** Name of the parameter, by which it can be accessed through the {@link ShaderMaterial} properties. */
  parameter_name: string;
  /** Defines the scope of the parameter. */
  qualifier: int;
  set_instance_index(value: int): void;
  get_instance_index(): int;
  set_parameter_name(value: string): void;
  get_parameter_name(): string;
  set_qualifier(value: int): void;
  get_qualifier(): int;

  // enum Qualifier
  /** The parameter will be tied to the {@link ShaderMaterial} using this shader. */
  static readonly QUAL_NONE: int;
  /** The parameter will use a global value, defined in Project Settings. */
  static readonly QUAL_GLOBAL: int;
  /** The parameter will be tied to the node with attached {@link ShaderMaterial} using this shader. */
  static readonly QUAL_INSTANCE: int;
  /**
   * The parameter will be tied to the node with attached {@link ShaderMaterial} using this shader. Enables setting a {@link instance_index} property.
   */
  static readonly QUAL_INSTANCE_INDEX: int;
  /** Represents the size of the {@link Qualifier} enum. */
  static readonly QUAL_MAX: int;
}
