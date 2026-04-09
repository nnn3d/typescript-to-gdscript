// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Positional 2D light source. */
declare class PointLight2D extends Light2D {
  /**
   * The height of the light. Used with 2D normal mapping. The units are in pixels, e.g. if the height is 100, then it will illuminate an object 100 pixels away at a 45° angle to the plane.
   */
  height: float;
  /** The offset of the light's {@link texture}. */
  offset: Vector2;
  /** {@link Texture2D} used for the light's appearance. */
  texture: Texture2D | null;
  /** The {@link texture}'s scale factor. */
  texture_scale: float;
  set_texture_offset(value: Vector2): void;
  get_texture_offset(): Vector2;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;
  set_texture_scale(value: float): void;
  get_texture_scale(): float;
}
