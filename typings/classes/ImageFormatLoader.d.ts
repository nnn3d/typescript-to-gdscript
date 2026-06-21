// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class to add support for specific image formats. */
declare class ImageFormatLoader extends RefCounted {

  // enum LoaderFlags
  /** Default loading behavior. No processing is applied to the image. */
  static readonly FLAG_NONE: int;
  /** If set, the image is converted from sRGB to linear encoding. */
  static readonly FLAG_FORCE_LINEAR: int;
  /**
   * If set, a predefined color map is applied to the image. Used when {@link ResourceImporterTexture.editor/convert_colors_with_editor_theme} is `true`.
   */
  static readonly FLAG_CONVERT_COLORS: int;
}
