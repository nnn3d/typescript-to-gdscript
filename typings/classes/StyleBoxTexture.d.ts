// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A texture-based nine-patch {@link StyleBox}. */
declare class StyleBoxTexture extends StyleBox {
  /** Controls how the stylebox's texture will be stretched or tiled horizontally. */
  axis_stretch_horizontal: int;
  /** Controls how the stylebox's texture will be stretched or tiled vertically. */
  axis_stretch_vertical: int;
  /** If `true`, the nine-patch texture's center tile will be drawn. */
  draw_center: boolean;
  /**
   * Expands the bottom margin of this style box when drawing, causing it to be drawn larger than requested.
   */
  expand_margin_bottom: float;
  /**
   * Expands the left margin of this style box when drawing, causing it to be drawn larger than requested.
   */
  expand_margin_left: float;
  /**
   * Expands the right margin of this style box when drawing, causing it to be drawn larger than requested.
   */
  expand_margin_right: float;
  /**
   * Expands the top margin of this style box when drawing, causing it to be drawn larger than requested.
   */
  expand_margin_top: float;
  /** Modulates the color of the texture when this style box is drawn. */
  modulate_color: Color;
  /**
   * The region to use from the {@link texture}.
   * This is equivalent to first wrapping the {@link texture} in an {@link AtlasTexture} with the same region.
   * If empty (`Rect2(0, 0, 0, 0)`), the whole {@link texture} is used.
   */
  region_rect: Rect2;
  /** The texture to use when drawing this style box. */
  texture: Texture2D | null;
  /**
   * Increases the bottom margin of the 3×3 texture box.
   * A higher value means more of the source texture is considered to be part of the bottom border of the 3×3 box.
   * This is also the value used as fallback for {@link StyleBox.content_margin_bottom} if it is negative.
   */
  texture_margin_bottom: float;
  /**
   * Increases the left margin of the 3×3 texture box.
   * A higher value means more of the source texture is considered to be part of the left border of the 3×3 box.
   * This is also the value used as fallback for {@link StyleBox.content_margin_left} if it is negative.
   */
  texture_margin_left: float;
  /**
   * Increases the right margin of the 3×3 texture box.
   * A higher value means more of the source texture is considered to be part of the right border of the 3×3 box.
   * This is also the value used as fallback for {@link StyleBox.content_margin_right} if it is negative.
   */
  texture_margin_right: float;
  /**
   * Increases the top margin of the 3×3 texture box.
   * A higher value means more of the source texture is considered to be part of the top border of the 3×3 box.
   * This is also the value used as fallback for {@link StyleBox.content_margin_top} if it is negative.
   */
  texture_margin_top: float;
  set_h_axis_stretch_mode(value: int): void;
  get_h_axis_stretch_mode(): int;
  set_v_axis_stretch_mode(value: int): void;
  get_v_axis_stretch_mode(): int;
  set_draw_center(value: boolean): void;
  is_draw_center_enabled(): boolean;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_region_rect(value: Rect2 | Rect2i): void;
  get_region_rect(): Rect2;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;

  /** Returns the expand margin size of the specified {@link Side}. */
  get_expand_margin(margin: int): float;
  /** Returns the margin size of the specified {@link Side}. */
  get_texture_margin(margin: int): float;
  /** Sets the expand margin to `size` pixels for the specified {@link Side}. */
  set_expand_margin(margin: int, size: float): void;
  /** Sets the expand margin to `size` pixels for all sides. */
  set_expand_margin_all(size: float): void;
  /** Sets the margin to `size` pixels for the specified {@link Side}. */
  set_texture_margin(margin: int, size: float): void;
  /** Sets the margin to `size` pixels for all sides. */
  set_texture_margin_all(size: float): void;

  // enum AxisStretchMode
  /**
   * Stretch the stylebox's texture. This results in visible distortion unless the texture size matches the stylebox's size perfectly.
   */
  static readonly AXIS_STRETCH_MODE_STRETCH: int;
  /** Repeats the stylebox's texture to match the stylebox's size according to the nine-patch system. */
  static readonly AXIS_STRETCH_MODE_TILE: int;
  /**
   * Repeats the stylebox's texture to match the stylebox's size according to the nine-patch system. Unlike {@link AXIS_STRETCH_MODE_TILE}, the texture may be slightly stretched to make the nine-patch texture tile seamlessly.
   */
  static readonly AXIS_STRETCH_MODE_TILE_FIT: int;
}
