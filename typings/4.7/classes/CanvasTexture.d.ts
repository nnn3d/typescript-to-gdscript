// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Texture with optional normal and specular maps for use in 2D rendering. */
declare class CanvasTexture extends Texture2D {
  /** The diffuse (color) texture to use. This is the main texture you want to set in most cases. */
  diffuse_texture: Texture2D;
  /**
   * The normal map texture to use. Only has a visible effect if {@link Light2D}s are affecting this {@link CanvasTexture}.
   * **Note:** Godot expects the normal map to use X+, Y+, and Z+ coordinates. See this page (http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates) for a comparison of normal map coordinates expected by popular engines.
   */
  normal_texture: Texture2D;
  /**
   * <member name="specular_color" type="Color" setter="set_specular_color" getter="get_specular_color" default="Color(1, 1, 1, 1)">
   * The multiplier for specular reflection colors. The {@link Light2D}'s color is also taken into account when determining the reflection color. Only has a visible effect if {@link Light2D}s are affecting this {@link CanvasTexture}.
   */
  resource_local_to_scene: boolean;
  /**
   * The specular exponent for {@link Light2D} specular reflections. Higher values result in a more glossy/"wet" look, with reflections becoming more localized and less visible overall. The default value of `1.0` disables specular reflections entirely. Only has a visible effect if {@link Light2D}s are affecting this {@link CanvasTexture}.
   */
  specular_shininess: float;
  /**
   * The specular map to use for {@link Light2D} specular reflections. This should be a grayscale or colored texture, with brighter areas resulting in a higher {@link specular_shininess} value. Using a colored {@link specular_texture} allows controlling specular shininess on a per-channel basis. Only has a visible effect if {@link Light2D}s are affecting this {@link CanvasTexture}.
   */
  specular_texture: Texture2D;
  /** The texture filtering mode to use when drawing this {@link CanvasTexture}. */
  texture_filter: int;
  /** The texture repeat mode to use when drawing this {@link CanvasTexture}. */
  texture_repeat: int;
  set_diffuse_texture(value: Texture2D): void;
  get_diffuse_texture(): Texture2D;
  set_normal_texture(value: Texture2D): void;
  get_normal_texture(): Texture2D;
  set_specular_shininess(value: float): void;
  get_specular_shininess(): float;
  set_specular_texture(value: Texture2D): void;
  get_specular_texture(): Texture2D;
  set_texture_filter(value: int): void;
  get_texture_filter(): int;
  set_texture_repeat(value: int): void;
  get_texture_repeat(): int;
}
