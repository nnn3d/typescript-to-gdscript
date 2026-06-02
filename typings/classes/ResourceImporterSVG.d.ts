// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports an SVG file as an automatically scalable texture for use in UI elements and 2D rendering. */
declare class ResourceImporterSVG extends ResourceImporter {
  /** Texture scale. `1.0` is the original SVG size. Higher values result in a larger image. */
  base_scale: float;
  /** If set, remaps texture colors according to {@link Color}-{@link Color} map. */
  color_map: Dictionary;
  /** If `true`, uses lossless compression for the SVG source. */
  compress: boolean;
  /** Overrides texture saturation. */
  saturation: float;
}
