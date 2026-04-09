// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Imports an SVG file as an automatically scalable texture for use in UI elements and 2D rendering. */
declare class ResourceImporterSVG extends ResourceImporter {
  /** Texture scale. `1.0` is the original SVG size. Higher values result in a larger image. */
  base_scale: float;
  /** If set, remaps texture colors according to {@link Color}-{@link Color} map. */
  color_map: Dictionary;
  /** If `true`, uses lossless compression for the SVG source. */
  compress: boolean;
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
  /** Overrides texture saturation. */
  saturation: float;
}
