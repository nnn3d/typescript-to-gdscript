// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Imports a bitmap font in the BMFont (`.fnt`) format. */
declare class ResourceImporterBMFont extends ResourceImporter {
  /** If `true`, uses lossless compression for the resulting font. */
  compress: boolean;
  /**
   * List of font fallbacks to use if a glyph isn't found in this bitmap font. Fonts at the beginning of the array are attempted first.
   */
  fallbacks: Array<unknown>;
  /** Font scaling mode. */
  scaling_mode: int;
}
