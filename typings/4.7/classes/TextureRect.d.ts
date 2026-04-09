// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A control that displays a texture. */
declare class TextureRect extends Control {
  /** Defines how minimum size is determined based on the texture's size. */
  expand_mode: int;
  /** If `true`, texture is flipped horizontally. */
  flip_h: boolean;
  /** If `true`, texture is flipped vertically. */
  flip_v: boolean;
  /**
   * <member name="stretch_mode" type="int" setter="set_stretch_mode" getter="get_stretch_mode" enum="TextureRect.StretchMode" default="0">
   * Controls the texture's behavior when resizing the node's bounding rectangle.
   */
  mouse_filter: int;
  /** The node's {@link Texture2D} resource. */
  texture: Texture2D | null;
  set_expand_mode(value: int): void;
  get_expand_mode(): int;
  set_flip_h(value: boolean): void;
  is_flipped_h(): boolean;
  set_flip_v(value: boolean): void;
  is_flipped_v(): boolean;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;

  // enum ExpandMode
  /**
   * The minimum size will be equal to texture size, i.e. {@link TextureRect} can't be smaller than the texture.
   */
  static readonly EXPAND_KEEP_SIZE: int;
  /**
   * The size of the texture won't be considered for minimum size calculation, so the {@link TextureRect} can be shrunk down past the texture size.
   */
  static readonly EXPAND_IGNORE_SIZE: int;
  /**
   * The height of the texture will be ignored. Minimum width will be equal to the current height. Useful for horizontal layouts, e.g. inside {@link HBoxContainer}.
   */
  static readonly EXPAND_FIT_WIDTH: int;
  /** Same as {@link EXPAND_FIT_WIDTH}, but keeps texture's aspect ratio. */
  static readonly EXPAND_FIT_WIDTH_PROPORTIONAL: int;
  /**
   * The width of the texture will be ignored. Minimum height will be equal to the current width. Useful for vertical layouts, e.g. inside {@link VBoxContainer}.
   */
  static readonly EXPAND_FIT_HEIGHT: int;
  /** Same as {@link EXPAND_FIT_HEIGHT}, but keeps texture's aspect ratio. */
  static readonly EXPAND_FIT_HEIGHT_PROPORTIONAL: int;
  // enum StretchMode
  /** Scale to fit the node's bounding rectangle. */
  static readonly STRETCH_SCALE: int;
  /**
   * Tile inside the node's bounding rectangle.
   * **Note:** {@link STRETCH_TILE} mode is not supported for {@link texture} set to an {@link AtlasTexture} with non-zero {@link AtlasTexture.margin}.
   */
  static readonly STRETCH_TILE: int;
  /** The texture keeps its original size and stays in the bounding rectangle's top-left corner. */
  static readonly STRETCH_KEEP: int;
  /** The texture keeps its original size and stays centered in the node's bounding rectangle. */
  static readonly STRETCH_KEEP_CENTERED: int;
  /** Scale the texture to fit the node's bounding rectangle, but maintain the texture's aspect ratio. */
  static readonly STRETCH_KEEP_ASPECT: int;
  /** Scale the texture to fit the node's bounding rectangle, center it and maintain its aspect ratio. */
  static readonly STRETCH_KEEP_ASPECT_CENTERED: int;
  /**
   * Scale the texture so that the shorter side fits the bounding rectangle. The other side clips to the node's limits.
   */
  static readonly STRETCH_KEEP_ASPECT_COVERED: int;
}
