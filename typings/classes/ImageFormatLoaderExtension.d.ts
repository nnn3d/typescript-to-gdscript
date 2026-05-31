// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Base class for creating {@link ImageFormatLoader} extensions (adding support for extra image formats).
 */
declare class ImageFormatLoaderExtension extends ImageFormatLoader {
  /**
   * Returns the list of file extensions for this image format. Files with the given extensions will be treated as image file and loaded using this class.
   */
  _get_recognized_extensions(): PackedStringArray;
  /** Loads the content of `fileaccess` into the provided `image`. */
  _load_image(image: Image, fileaccess: FileAccess, flags: int, scale: float): int;
  /**
   * Add this format loader to the engine, allowing it to recognize the file extensions returned by {@link _get_recognized_extensions}.
   */
  add_format_loader(): void;
  /** Remove this format loader from the engine. */
  remove_format_loader(): void;
}
