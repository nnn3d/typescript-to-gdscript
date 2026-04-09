// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for 3-dimensional textures. */
declare class Texture3D extends Texture {
  /** Called when the {@link Texture3D}'s data is queried. */
  _get_data(): Array<Image>;
  /** Called when the {@link Texture3D}'s depth is queried. */
  _get_depth(): int;
  /** Called when the {@link Texture3D}'s format is queried. */
  _get_format(): int;
  /** Called when the {@link Texture3D}'s height is queried. */
  _get_height(): int;
  /** Called when the {@link Texture3D}'s width is queried. */
  _get_width(): int;
  /** Called when the presence of mipmaps in the {@link Texture3D} is queried. */
  _has_mipmaps(): boolean;
  /** Creates a placeholder version of this resource ({@link PlaceholderTexture3D}). */
  create_placeholder(): Resource;
  /**
   * Returns the {@link Texture3D}'s data as an array of {@link Image}s. Each {@link Image} represents a *slice* of the {@link Texture3D}, with different slices mapping to different depth (Z axis) levels.
   */
  get_data(): Array<Image>;
  /**
   * Returns the {@link Texture3D}'s depth in pixels. Depth is typically represented by the Z axis (a dimension not present in {@link Texture2D}).
   */
  get_depth(): int;
  /** Returns the current format being used by this texture. */
  get_format(): int;
  /** Returns the {@link Texture3D}'s height in pixels. Width is typically represented by the Y axis. */
  get_height(): int;
  /** Returns the {@link Texture3D}'s width in pixels. Width is typically represented by the X axis. */
  get_width(): int;
  /** Returns `true` if the {@link Texture3D} has generated mipmaps. */
  has_mipmaps(): boolean;
}
