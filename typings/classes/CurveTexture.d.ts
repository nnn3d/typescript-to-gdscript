// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 1D texture where pixel brightness corresponds to points on a curve. */
declare class CurveTexture extends Texture2D {
  /** The {@link Curve} that is rendered onto the texture. Should be a unit {@link Curve}. */
  curve: Curve | null;
  /**
   * <member name="texture_mode" type="int" setter="set_texture_mode" getter="get_texture_mode" enum="CurveTexture.TextureMode" default="0">
   * The format the texture should be generated with. When passing a CurveTexture as an input to a {@link Shader}, this may need to be adjusted.
   */
  resource_local_to_scene: boolean;
  /**
   * The width of the texture (in pixels). Higher values make it possible to represent high-frequency data better (such as sudden direction changes), at the cost of increased generation time and memory usage.
   */
  width: int;
  set_curve(value: Curve | null): void;
  get_curve(): Curve | null;
  set_width(value: int): void;

  // enum TextureMode
  /**
   * Store the curve equally across the red, green and blue channels. This uses more video memory, but is more compatible with shaders that only read the green and blue values.
   */
  static readonly TEXTURE_MODE_RGB: int;
  /**
   * Store the curve only in the red channel. This saves video memory, but some custom shaders may not be able to work with this.
   */
  static readonly TEXTURE_MODE_RED: int;
}
