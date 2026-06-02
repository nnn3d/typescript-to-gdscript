// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An automatically scalable {@link Texture2D} based on an SVG image. */
declare class DPITexture extends Texture2D {
  /** Texture scale. `1.0` is the original SVG size. Higher values result in a larger image. */
  base_scale: float;
  /** If set, remaps texture colors according to {@link Color}-{@link Color} map. */
  color_map: Dictionary;
  /**
   * <member name="saturation" type="float" setter="set_saturation" getter="get_saturation" default="1.0">
   * Overrides texture saturation.
   */
  resource_local_to_scene: boolean;
  set_base_scale(value: float): void;
  get_base_scale(): float;
  set_color_map(value: Dictionary): void;
  get_color_map(): Dictionary;

  /**
   * Creates a new {@link DPITexture} and initializes it by allocating and setting the SVG data to `source`.
   */
  static create_from_string(source: string | NodePath, scale?: float, saturation?: float, color_map?: Dictionary): DPITexture | null;
  /**
   * Returns the {@link RID} of the texture rasterized to match the oversampling of the currently drawn canvas item.
   */
  get_scaled_rid(): RID;
  /** Returns this SVG texture's source code. */
  get_source(): string;
  /** Resizes the texture to the specified dimensions. */
  set_size_override(size: Vector2i | Vector2): void;
  /** Sets this SVG texture's source code. */
  set_source(source: string | NodePath): void;
}
