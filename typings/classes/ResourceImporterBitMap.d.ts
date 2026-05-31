// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports a {@link BitMap} resource (2D array of boolean values). */
declare class ResourceImporterBitMap extends ResourceImporter {
  /**
   * The data source to use for generating the bitmap.
   * **Black & White:** Pixels whose HSV value is greater than the {@link threshold} will be considered as "enabled" (bit is `true`). If the pixel is lower than or equal to the threshold, it will be considered as "disabled" (bit is `false`).
   * **Alpha:** Pixels whose alpha value is greater than the {@link threshold} will be considered as "enabled" (bit is `true`). If the pixel is lower than or equal to the threshold, it will be considered as "disabled" (bit is `false`).
   */
  create_from: int;
  /**
   * The threshold to use to determine which bits should be considered enabled or disabled. See also {@link create_from}.
   */
  threshold: float;
}
