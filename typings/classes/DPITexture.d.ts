// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An automatically scalable {@link Texture2D} based on an SVG image. */
declare class DPITexture extends Texture2D {
  /** Texture scale. `1.0` is the original SVG size. Higher values result in a larger image. */
  base_scale: float;
  /** If set, remaps texture colors according to {@link Color}-{@link Color} map. */
  color_map: Dictionary;
  /**
   * If `true`, puts pixels of the same surrounding color in transition from transparent to opaque areas. For textures displayed with bilinear filtering, this helps to reduce the outline effect when exporting images from an image editor.
   */
  fix_alpha_border: boolean;
  /**
   * An alternative to fixing darkened borders with {@link fix_alpha_border} is to use premultiplied alpha. By enabling this option, the texture will be converted to this format. A premultiplied alpha texture requires specific materials to be displayed correctly:
   * - In 2D, a {@link CanvasItemMaterial} will need to be created and configured to use the {@link CanvasItemMaterial.BLEND_MODE_PREMULT_ALPHA} blend mode on {@link CanvasItem}s that use this texture. In custom `canvas_item` shaders, `render_mode blend_premul_alpha;` should be used.
   * - In 3D, a {@link BaseMaterial3D} will need to be created and configured to use the {@link BaseMaterial3D.BLEND_MODE_PREMULT_ALPHA} blend mode on materials that use this texture. In custom `spatial` shaders, `render_mode blend_premul_alpha;` should be used.
   */
  premult_alpha: boolean;
  /**
   * <member name="saturation" type="float" setter="set_saturation" getter="get_saturation" default="1.0">
   * Overrides texture saturation.
   */
  resource_local_to_scene: boolean;
  set_base_scale(value: float): void;
  get_base_scale(): float;
  set_color_map(value: Dictionary): void;
  get_color_map(): Dictionary;
  set_fix_alpha_border(value: boolean): void;
  get_fix_alpha_border(): boolean;
  set_premult_alpha(value: boolean): void;
  get_premult_alpha(): boolean;

  /**
   * Creates a new {@link DPITexture} and initializes it by allocating and setting the SVG data to `source`.
   */
  static create_from_string(source: string, scale?: float, saturation?: float, color_map?: Dictionary): DPITexture | null;
  /**
   * Returns the {@link RID} of the texture rasterized to match the oversampling of the currently drawn canvas item.
   */
  get_scaled_rid(): RID;
  /** Returns this SVG texture's source code. */
  get_source(): string;
  /** Resizes the texture to the specified dimensions. */
  set_size_override(size: Vector2i): void;
  /** Sets this SVG texture's source code. */
  set_source(source: string): void;
}
