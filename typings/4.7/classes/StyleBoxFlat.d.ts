// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A customizable {@link StyleBox} that doesn't use a texture. */
declare class StyleBoxFlat extends StyleBox {
  /**
   * Antialiasing draws a small ring around the edges, which fades to transparency. As a result, edges look much smoother. This is only noticeable when using rounded corners or {@link skew}.
   * **Note:** When using beveled corners with 45-degree angles ({@link corner_detail} = 1), it is recommended to set {@link anti_aliasing} to `false` to ensure crisp visuals and avoid possible visual glitches.
   */
  anti_aliasing: boolean;
  /**
   * This changes the size of the antialiasing effect. `1.0` is recommended for an optimal result at 100% scale, identical to how rounded rectangles are rendered in web browsers and most vector drawing software.
   * **Note:** Higher values may produce a blur effect but can also create undesired artifacts on small boxes with large-radius corners.
   */
  anti_aliasing_size: float;
  /** The background color of the stylebox. */
  bg_color: Color;
  /** If `true`, the border will fade into the background color. */
  border_blend: boolean;
  /** Sets the color of the border. */
  border_color: Color;
  /** Border width for the bottom border. */
  border_width_bottom: int;
  /** Border width for the left border. */
  border_width_left: int;
  /** Border width for the right border. */
  border_width_right: int;
  /** Border width for the top border. */
  border_width_top: int;
  /**
   * This sets the number of vertices used for each corner. Higher values result in rounder corners but take more processing power to compute. When choosing a value, you should take the corner radius ({@link set_corner_radius_all}) into account.
   * For corner radii less than 10, `4` or `5` should be enough. For corner radii less than 30, values between `8` and `12` should be enough.
   * A corner detail of `1` will result in chamfered corners instead of rounded corners, which is useful for some artistic effects.
   */
  corner_detail: int;
  /** The bottom-left corner's radius. If `0`, the corner is not rounded. */
  corner_radius_bottom_left: int;
  /** The bottom-right corner's radius. If `0`, the corner is not rounded. */
  corner_radius_bottom_right: int;
  /** The top-left corner's radius. If `0`, the corner is not rounded. */
  corner_radius_top_left: int;
  /** The top-right corner's radius. If `0`, the corner is not rounded. */
  corner_radius_top_right: int;
  /** Toggles drawing of the inner part of the stylebox. */
  draw_center: boolean;
  /**
   * Expands the stylebox outside of the control rect on the bottom edge. Useful in combination with {@link border_width_bottom} to draw a border outside the control rect.
   * **Note:** Unlike {@link StyleBox.content_margin_bottom}, {@link expand_margin_bottom} does *not* affect the size of the clickable area for {@link Control}s. This can negatively impact usability if used wrong, as the user may try to click an area of the StyleBox that cannot actually receive clicks.
   */
  expand_margin_bottom: float;
  /**
   * Expands the stylebox outside of the control rect on the left edge. Useful in combination with {@link border_width_left} to draw a border outside the control rect.
   * **Note:** Unlike {@link StyleBox.content_margin_left}, {@link expand_margin_left} does *not* affect the size of the clickable area for {@link Control}s. This can negatively impact usability if used wrong, as the user may try to click an area of the StyleBox that cannot actually receive clicks.
   */
  expand_margin_left: float;
  /**
   * Expands the stylebox outside of the control rect on the right edge. Useful in combination with {@link border_width_right} to draw a border outside the control rect.
   * **Note:** Unlike {@link StyleBox.content_margin_right}, {@link expand_margin_right} does *not* affect the size of the clickable area for {@link Control}s. This can negatively impact usability if used wrong, as the user may try to click an area of the StyleBox that cannot actually receive clicks.
   */
  expand_margin_right: float;
  /**
   * Expands the stylebox outside of the control rect on the top edge. Useful in combination with {@link border_width_top} to draw a border outside the control rect.
   * **Note:** Unlike {@link StyleBox.content_margin_top}, {@link expand_margin_top} does *not* affect the size of the clickable area for {@link Control}s. This can negatively impact usability if used wrong, as the user may try to click an area of the StyleBox that cannot actually receive clicks.
   */
  expand_margin_top: float;
  /** The color of the shadow. This has no effect if {@link shadow_size} is lower than 1. */
  shadow_color: Color;
  /** The shadow offset in pixels. Adjusts the position of the shadow relatively to the stylebox. */
  shadow_offset: Vector2;
  /** The shadow size in pixels. */
  shadow_size: int;
  /**
   * If set to a non-zero value on either axis, {@link skew} distorts the StyleBox horizontally and/or vertically. This can be used for "futuristic"-style UIs. Positive values skew the StyleBox towards the right (X axis) and upwards (Y axis), while negative values skew the StyleBox towards the left (X axis) and downwards (Y axis).
   * **Note:** To ensure text does not touch the StyleBox's edges, consider increasing the {@link StyleBox}'s content margin (see {@link StyleBox.content_margin_bottom}). It is preferable to increase the content margin instead of the expand margin (see {@link expand_margin_bottom}), as increasing the expand margin does not increase the size of the clickable area for {@link Control}s.
   */
  skew: Vector2;
  set_anti_aliased(value: boolean): void;
  is_anti_aliased(): boolean;
  set_aa_size(value: float): void;
  get_aa_size(): float;
  set_bg_color(value: Color): void;
  get_bg_color(): Color;
  set_border_blend(value: boolean): void;
  get_border_blend(): boolean;
  set_border_color(value: Color): void;
  get_border_color(): Color;
  set_corner_detail(value: int): void;
  get_corner_detail(): int;
  set_draw_center(value: boolean): void;
  is_draw_center_enabled(): boolean;
  set_shadow_color(value: Color): void;
  get_shadow_color(): Color;
  set_shadow_offset(value: Vector2): void;
  get_shadow_offset(): Vector2;
  set_shadow_size(value: int): void;
  get_shadow_size(): int;
  set_skew(value: Vector2): void;
  get_skew(): Vector2;

  /** Returns the specified {@link Side}'s border width. */
  get_border_width(margin: int): int;
  /** Returns the smallest border width out of all four borders. */
  get_border_width_min(): int;
  /** Returns the given `corner`'s radius. */
  get_corner_radius(corner: int): int;
  /** Returns the size of the specified {@link Side}'s expand margin. */
  get_expand_margin(margin: int): float;
  /** Sets the specified {@link Side}'s border width to `width` pixels. */
  set_border_width(margin: int, width: int): void;
  /** Sets the border width to `width` pixels for all sides. */
  set_border_width_all(width: int): void;
  /** Sets the corner radius to `radius` pixels for the given `corner`. */
  set_corner_radius(corner: int, radius: int): void;
  /** Sets the corner radius to `radius` pixels for all corners. */
  set_corner_radius_all(radius: int): void;
  /** Sets the expand margin to `size` pixels for the specified {@link Side}. */
  set_expand_margin(margin: int, size: float): void;
  /** Sets the expand margin to `size` pixels for all sides. */
  set_expand_margin_all(size: float): void;
}
