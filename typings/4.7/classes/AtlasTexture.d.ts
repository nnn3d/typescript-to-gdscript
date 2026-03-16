// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A texture that crops out part of another Texture2D. */
declare class AtlasTexture extends Texture2D {
  /**
   * The texture that contains the atlas. Can be any type inheriting from {@link Texture2D}, including another {@link AtlasTexture}.
   */
  atlas: Texture2D;
  /**
   * If `true`, the area outside of the {@link region} is clipped to avoid bleeding of the surrounding texture pixels.
   */
  filter_clip: boolean;
  /**
   * The margin around the {@link region}. Useful for small adjustments. If the {@link Rect2.size} of this property ("w" and "h" in the editor) is set, the drawn texture is resized to fit within the margin.
   */
  margin: Rect2;
  /**
   * The region used to draw the {@link atlas}. If either dimension of the region's size is `0`, the value from {@link atlas} size will be used for that axis instead.
   * **Note:** The image size is always an integer, so the actual region size is rounded down.
   */
  region: Rect2;
  resource_local_to_scene: boolean;
}
