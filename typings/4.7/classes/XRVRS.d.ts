// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Helper class for XR interfaces that generates VRS images. */
declare class XRVRS extends GodotObject {
  /**
   * The minimum radius around the focal point where full quality is guaranteed if VRS is used as a percentage of screen size.
   */
  vrs_min_radius: float;
  /** The render region that the VRS texture will be scaled to when generated. */
  vrs_render_region: Rect2i;
  /**
   * The strength used to calculate the VRS density map. The greater this value, the more noticeable VRS is.
   */
  vrs_strength: float;
  set_vrs_min_radius(value: float): void;
  get_vrs_min_radius(): float;
  set_vrs_render_region(value: Rect2i): void;
  get_vrs_render_region(): Rect2i;
  set_vrs_strength(value: float): void;
  get_vrs_strength(): float;

  /**
   * Generates the VRS texture based on a render `target_size` adjusted by our VRS tile size. For each eyes focal point passed in `eye_foci` a layer is created. Focal point should be in NDC.
   * The result will be cached, requesting a VRS texture with unchanged parameters and settings will return the cached RID.
   */
  make_vrs_texture(target_size: Vector2, eye_foci: PackedVector2Array): RID;
}
