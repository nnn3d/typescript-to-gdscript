// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Imports a collection of textures from a PNG image into an optimized {@link AtlasTexture} for 2D rendering.
 */
declare class ResourceImporterTextureAtlas extends ResourceImporter {
  /**
   * Path to the atlas spritesheet. This *must* be set to valid path to a PNG image. Otherwise, the atlas will fail to import.
   */
  atlas_file: string;
  /**
   * If `true`, discards empty areas from the atlas. This only affects final sprite positioning, not storage. See also {@link trim_alpha_border_from_region}.
   * **Note:** Only effective if {@link import_mode} is **Region**.
   */
  crop_to_region: boolean;
  /**
   * **Region:** Imports the atlas in an {@link AtlasTexture} resource, which is rendered as a rectangle. This is fast to render, but transparent areas still have to be rendered if they can't be trimmed effectively by {@link trim_alpha_border_from_region}. This can reduce performance when rendering large sprites on screen.
   * **Mesh:** Imports the atlas as an {@link ArrayMesh} resource, keeping the original bitmap visible (but rendered as a polygon). This can be used to reduce fill rate when rendering large transparent sprites, at the cost of slower rendering if there are little to no transparent areas in the sprite.
   */
  import_mode: int;
  /**
   * If `true`, trims the region to exclude fully transparent pixels using a clipping rectangle (which is never rotated). This can be used to save memory. See also {@link crop_to_region}.
   * **Note:** Only effective if {@link import_mode} is **Region**.
   */
  trim_alpha_border_from_region: boolean;
}
