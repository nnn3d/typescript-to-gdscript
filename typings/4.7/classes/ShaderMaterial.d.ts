// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A material defined by a custom {@link Shader} program and the values of its shader parameters. */
declare class ShaderMaterial extends Material {
  /** The {@link Shader} program used to render this material. */
  shader: Shader | null;
  set_shader(value: Shader | null): void;
  get_shader(): Shader | null;

  /** Returns the current value set for this material of a uniform in the shader. */
  get_shader_parameter(param: string): unknown;
  /**
   * Changes the value set for this material of a uniform in the shader.
   * **Note:** `param` is case-sensitive and must match the name of the uniform in the code exactly (not the capitalized name in the inspector).
   * **Note:** Changes to the shader uniform will be effective on all instances using this {@link ShaderMaterial}. To prevent this, use per-instance uniforms with {@link CanvasItem.set_instance_shader_parameter}, {@link GeometryInstance3D.set_instance_shader_parameter} or duplicate the {@link ShaderMaterial} resource using {@link Resource.duplicate}. Per-instance uniforms allow for better shader reuse and are therefore faster, so they should be preferred over duplicating the {@link ShaderMaterial} when possible.
   */
  set_shader_parameter(param: string, value: unknown): void;
}
