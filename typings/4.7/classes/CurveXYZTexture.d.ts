// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 1D texture where the red, green, and blue color channels correspond to points on 3 curves. */
declare class CurveXYZTexture extends Texture2D {
  /** The {@link Curve} that is rendered onto the texture's red channel. Should be a unit {@link Curve}. */
  curve_x: Curve | null;
  /**
   * The {@link Curve} that is rendered onto the texture's green channel. Should be a unit {@link Curve}.
   */
  curve_y: Curve | null;
  /** The {@link Curve} that is rendered onto the texture's blue channel. Should be a unit {@link Curve}. */
  curve_z: Curve | null;
  /**
   * <member name="width" type="int" setter="set_width" getter="get_width" default="256">
   * The width of the texture (in pixels). Higher values make it possible to represent high-frequency data better (such as sudden direction changes), at the cost of increased generation time and memory usage.
   */
  resource_local_to_scene: boolean;
  set_curve_x(value: Curve | null): void;
  get_curve_x(): Curve | null;
  set_curve_y(value: Curve | null): void;
  get_curve_y(): Curve | null;
  set_curve_z(value: Curve | null): void;
  get_curve_z(): Curve | null;
}
