// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A {@link Cubemap} sampling node to be used within the visual shader graph. */
declare class VisualShaderNodeCubemap extends VisualShaderNode {
  /** The {@link Cubemap} texture to sample when using {@link SOURCE_TEXTURE} as {@link source}. */
  cube_map: TextureLayered | null;
  /** Defines which source should be used for the sampling. */
  source: int;
  /** Defines the type of data provided by the source texture. */
  texture_type: int;
  set_cube_map(value: TextureLayered | null): void;
  get_cube_map(): TextureLayered | null;
  set_source(value: int): void;
  get_source(): int;
  set_texture_type(value: int): void;
  get_texture_type(): int;

  // enum Source
  /**
   * Use the {@link Cubemap} set via {@link cube_map}. If this is set to {@link source}, the `samplerCube` port is ignored.
   */
  static readonly SOURCE_TEXTURE: int;
  /**
   * Use the {@link Cubemap} sampler reference passed via the `samplerCube` port. If this is set to {@link source}, the {@link cube_map} texture is ignored.
   */
  static readonly SOURCE_PORT: int;
  /** Represents the size of the {@link Source} enum. */
  static readonly SOURCE_MAX: int;
  // enum TextureType
  /** No hints are added to the uniform declaration. */
  static readonly TYPE_DATA: int;
  /**
   * Adds `source_color` as hint to the uniform declaration for proper conversion from nonlinear sRGB encoding to linear encoding.
   */
  static readonly TYPE_COLOR: int;
  /**
   * Adds `hint_normal` as hint to the uniform declaration, which internally converts the texture for proper usage as normal map.
   */
  static readonly TYPE_NORMAL_MAP: int;
  /** Represents the size of the {@link TextureType} enum. */
  static readonly TYPE_MAX: int;
}
