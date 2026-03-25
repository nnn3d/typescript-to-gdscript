// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Texture-based button. Supports Pressed, Hover, Disabled and Focused states. */
declare class TextureButton<Tree extends object = any> extends BaseButton<Tree> {
  /** If `true`, texture is flipped horizontally. */
  flip_h: boolean;
  /** If `true`, texture is flipped vertically. */
  flip_v: boolean;
  /**
   * If `true`, the size of the texture won't be considered for minimum size calculation, so the {@link TextureButton} can be shrunk down past the texture size.
   */
  ignore_texture_size: boolean;
  /**
   * Controls the texture's behavior when you resize the node's bounding rectangle. See the {@link StretchMode} constants for available options.
   */
  stretch_mode: int;
  /**
   * Pure black and white {@link BitMap} image to use for click detection. On the mask, white pixels represent the button's clickable area. Use it to create buttons with curved shapes.
   */
  texture_click_mask: BitMap;
  /**
   * Texture to display when the node is disabled. See {@link BaseButton.disabled}. If not assigned, the {@link TextureButton} displays {@link texture_normal} instead.
   */
  texture_disabled: Texture2D;
  /**
   * Texture to *overlay on the base texture* when the node has mouse or keyboard focus. Because {@link texture_focused} is displayed on top of the base texture, a partially transparent texture should be used to ensure the base texture remains visible. A texture that represents an outline or an underline works well for this purpose. To disable the focus visual effect, assign a fully transparent texture of any size. Note that disabling the focus visual effect will harm keyboard/controller navigation usability, so this is not recommended for accessibility reasons.
   */
  texture_focused: Texture2D;
  /**
   * Texture to display when the mouse hovers over the node. If not assigned, the {@link TextureButton} displays {@link texture_normal} instead when hovered over.
   */
  texture_hover: Texture2D;
  /**
   * Texture to display by default, when the node is **not** in the disabled, hover or pressed state. This texture is still displayed in the focused state, with {@link texture_focused} drawn on top.
   */
  texture_normal: Texture2D;
  /**
   * Texture to display on mouse down over the node, if the node has keyboard focus and the player presses the Enter key or if the player presses the {@link BaseButton.shortcut} key. If not assigned, the {@link TextureButton} displays {@link texture_hover} instead when pressed.
   */
  texture_pressed: Texture2D;
  set_flip_h(value: boolean): void;
  is_flipped_h(): boolean;
  set_flip_v(value: boolean): void;
  is_flipped_v(): boolean;
  set_ignore_texture_size(value: boolean): void;
  get_ignore_texture_size(): boolean;
  set_stretch_mode(value: int): void;
  get_stretch_mode(): int;
  set_click_mask(value: BitMap): void;
  get_click_mask(): BitMap;
  set_texture_disabled(value: Texture2D): void;
  get_texture_disabled(): Texture2D;
  set_texture_focused(value: Texture2D): void;
  get_texture_focused(): Texture2D;
  set_texture_hover(value: Texture2D): void;
  get_texture_hover(): Texture2D;
  set_texture_normal(value: Texture2D): void;
  get_texture_normal(): Texture2D;
  set_texture_pressed(value: Texture2D): void;
  get_texture_pressed(): Texture2D;

  // enum StretchMode
  /** Scale to fit the node's bounding rectangle. */
  static readonly STRETCH_SCALE: int;
  /** Tile inside the node's bounding rectangle. */
  static readonly STRETCH_TILE: int;
  /** The texture keeps its original size and stays in the bounding rectangle's top-left corner. */
  static readonly STRETCH_KEEP: int;
  /** The texture keeps its original size and stays centered in the node's bounding rectangle. */
  static readonly STRETCH_KEEP_CENTERED: int;
  /** Scale the texture to fit the node's bounding rectangle, but maintain the texture's aspect ratio. */
  static readonly STRETCH_KEEP_ASPECT: int;
  /** Scale the texture to fit the node's bounding rectangle, center it, and maintain its aspect ratio. */
  static readonly STRETCH_KEEP_ASPECT_CENTERED: int;
  /**
   * Scale the texture so that the shorter side fits the bounding rectangle. The other side clips to the node's limits.
   */
  static readonly STRETCH_KEEP_ASPECT_COVERED: int;
}
