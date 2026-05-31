// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Compiled shader file in SPIR-V form (used by {@link RenderingDevice}). Not to be confused with Godot's own {@link Shader}.
 */
declare class RDShaderFile extends Resource {
  /**
   * The base compilation error message, which indicates errors not related to a specific shader stage if non-empty. If empty, shader compilation is not necessarily successful (check {@link RDShaderSPIRV}'s error message members).
   */
  base_error: string;
  set_base_error(value: string | NodePath): void;
  get_base_error(): string;

  /** Returns the SPIR-V intermediate representation for the specified shader `version`. */
  get_spirv(version?: string): RDShaderSPIRV | null;
  /** Returns the list of compiled versions for this shader. */
  get_version_list(): Array<string>;
  /** Sets the SPIR-V `bytecode` that will be compiled for the specified `version`. */
  set_bytecode(bytecode: RDShaderSPIRV, version?: string): void;
}
