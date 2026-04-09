// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link Texture2D} based on an {@link Image}. */
declare class ImageTexture extends Texture2D {
  resource_local_to_scene: boolean;

  /**
   * Creates a new {@link ImageTexture} and initializes it by allocating and setting the data from an {@link Image}.
   */
  static create_from_image(image: Image): ImageTexture;
  /**
   * Replaces the texture's data with a new {@link Image}. This will re-allocate new memory for the texture.
   * If you want to update the image, but don't need to change its parameters (format, size), use {@link update} instead for better performance.
   */
  set_image(image: Image): void;
  /** Resizes the texture to the specified dimensions. */
  set_size_override(size: Vector2i): void;
  /**
   * Replaces the texture's data with a new {@link Image}.
   * **Note:** The texture has to be created using {@link create_from_image} or initialized first with the {@link set_image} method before it can be updated. The new image dimensions, format, and mipmaps configuration should match the existing texture's image configuration.
   * Use this method over {@link set_image} if you need to update the texture frequently, which is faster than allocating additional memory for a new texture each time.
   */
  update(image: Image): void;
}
