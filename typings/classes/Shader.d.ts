// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A shader implemented in the Godot shading language. */
declare class Shader extends Resource {
  /** Returns the shader's code as the user has written it, not the full generated code used internally. */
  code: string;
  set_code(value: string | NodePath): void;
  get_code(): string;

  /**
   * Returns the texture that is set as default for the specified parameter.
   * **Note:** `name` must match the name of the uniform in the code exactly.
   * **Note:** If the sampler array is used use `index` to access the specified texture.
   */
  get_default_texture_parameter(name: string, index?: int): Texture | null;
  /** Returns the shader mode for the shader. */
  get_mode(): int;
  /**
   * Returns the list of shader uniforms that can be assigned to a {@link ShaderMaterial}, for use with {@link ShaderMaterial.set_shader_parameter} and {@link ShaderMaterial.get_shader_parameter}. The parameters returned are contained in dictionaries in a similar format to the ones returned by {@link Object.get_property_list}.
   * If argument `get_groups` is `true`, parameter grouping hints are also included in the list.
   */
  get_shader_uniform_list(get_groups?: boolean): Array<unknown>;
  /**
   * Only available when running in the editor. Opens a popup that visualizes the generated shader code, including all variants and internal shader code. See also {@link Material.inspect_native_shader_code}.
   */
  inspect_native_shader_code(): void;
  /**
   * Sets the default texture to be used with a texture uniform. The default is used if a texture is not set in the {@link ShaderMaterial}.
   * **Note:** `name` must match the name of the uniform in the code exactly.
   * **Note:** If the sampler array is used use `index` to access the specified texture.
   */
  set_default_texture_parameter(name: string, texture: Texture, index?: int): void;

  // enum Mode
  /** Mode used to draw all 3D objects. */
  static readonly MODE_SPATIAL: int;
  /** Mode used to draw all 2D objects. */
  static readonly MODE_CANVAS_ITEM: int;
  /** Mode used to calculate particle information on a per-particle basis. Not used for drawing. */
  static readonly MODE_PARTICLES: int;
  /** Mode used for drawing skies. Only works with shaders attached to {@link Sky} objects. */
  static readonly MODE_SKY: int;
  /** Mode used for setting the color and density of volumetric fog effect. */
  static readonly MODE_FOG: int;
  /** Mode used for drawing to DrawableTexture resources via blit calls. */
  static readonly MODE_TEXTURE_BLIT: int;
}
