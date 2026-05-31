// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Texture-based progress bar. Useful for loading screens and life or stamina bars. */
declare class TextureProgressBar extends Range {
  /** The fill direction. See {@link FillMode} for possible values. */
  fill_mode: int;
  /**
   * <member name="nine_patch_stretch" type="bool" setter="set_nine_patch_stretch" getter="get_nine_patch_stretch" default="false">
   * If `true`, Godot treats the bar's textures like in {@link NinePatchRect}. Use the `stretch_margin_*` properties like {@link stretch_margin_bottom} to set up the nine patch's 3×3 grid. When using a radial {@link fill_mode}, this setting will only enable stretching for {@link texture_progress}, while {@link texture_under} and {@link texture_over} will be treated like in {@link NinePatchRect}.
   */
  mouse_filter: int;
  /**
   * Offsets {@link texture_progress} if {@link fill_mode} is {@link FILL_CLOCKWISE}, {@link FILL_COUNTER_CLOCKWISE}, or {@link FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE}.
   * **Note:** The effective radial center always stays within the {@link texture_progress} bounds. If you need to move it outside the texture's bounds, modify the {@link texture_progress} to contain additional empty space where needed.
   */
  radial_center_offset: Vector2;
  /**
   * Upper limit for the fill of {@link texture_progress} if {@link fill_mode} is {@link FILL_CLOCKWISE}, {@link FILL_COUNTER_CLOCKWISE}, or {@link FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE}. When the node's `value` is equal to its `max_value`, the texture fills up to this angle.
   * See {@link Range.value}, {@link Range.max_value}.
   */
  radial_fill_degrees: float;
  /**
   * Starting angle for the fill of {@link texture_progress} if {@link fill_mode} is {@link FILL_CLOCKWISE}, {@link FILL_COUNTER_CLOCKWISE}, or {@link FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE}. When the node's `value` is equal to its `min_value`, the texture doesn't show up at all. When the `value` increases, the texture fills and tends towards {@link radial_fill_degrees}.
   * **Note:** {@link radial_initial_angle} is wrapped between `0` and `360` degrees (inclusive).
   */
  radial_initial_angle: float;
  /**
   * <member name="step" type="float" setter="set_step" getter="get_step" overrides="Range" default="1.0" />
   * <member name="stretch_margin_bottom" type="int" setter="set_stretch_margin" getter="get_stretch_margin" default="0">
   * The height of the 9-patch's bottom row. A margin of 16 means the 9-slice's bottom corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders. Only effective if {@link nine_patch_stretch} is `true`.
   */
  size_flags_vertical: int;
  /** The width of the 9-patch's left column. Only effective if {@link nine_patch_stretch} is `true`. */
  stretch_margin_left: int;
  /** The width of the 9-patch's right column. Only effective if {@link nine_patch_stretch} is `true`. */
  stretch_margin_right: int;
  /** The height of the 9-patch's top row. Only effective if {@link nine_patch_stretch} is `true`. */
  stretch_margin_top: int;
  /**
   * {@link Texture2D} that draws over the progress bar. Use it to add highlights or an upper-frame that hides part of {@link texture_progress}.
   */
  texture_over: Texture2D | null;
  /**
   * {@link Texture2D} that clips based on the node's `value` and {@link fill_mode}. As `value` increased, the texture fills up. It shows entirely when `value` reaches `max_value`. It doesn't show at all if `value` is equal to `min_value`.
   * The `value` property comes from {@link Range}. See {@link Range.value}, {@link Range.min_value}, {@link Range.max_value}.
   */
  texture_progress: Texture2D | null;
  /**
   * The offset of {@link texture_progress}. Useful for {@link texture_over} and {@link texture_under} with fancy borders, to avoid transparent margins in your progress texture.
   */
  texture_progress_offset: Vector2;
  /** {@link Texture2D} that draws under the progress bar. The bar's background. */
  texture_under: Texture2D | null;
  /**
   * Multiplies the color of the bar's {@link texture_over} texture. The effect is similar to {@link CanvasItem.modulate}, except it only affects this specific texture instead of the entire node.
   */
  tint_over: Color;
  /** Multiplies the color of the bar's {@link texture_progress} texture. */
  tint_progress: Color;
  /** Multiplies the color of the bar's {@link texture_under} texture. */
  tint_under: Color;
  set_fill_mode(value: int): void;
  get_fill_mode(): int;
  set_radial_center_offset(value: Vector2 | Vector2i): void;
  get_radial_center_offset(): Vector2;
  set_fill_degrees(value: float): void;
  get_fill_degrees(): float;
  set_radial_initial_angle(value: float): void;
  get_radial_initial_angle(): float;
  set_over_texture(value: Texture2D | null): void;
  get_over_texture(): Texture2D | null;
  set_progress_texture(value: Texture2D | null): void;
  get_progress_texture(): Texture2D | null;
  set_texture_progress_offset(value: Vector2 | Vector2i): void;
  get_texture_progress_offset(): Vector2;
  set_under_texture(value: Texture2D | null): void;
  get_under_texture(): Texture2D | null;
  set_tint_over(value: Color): void;
  get_tint_over(): Color;
  set_tint_progress(value: Color): void;
  get_tint_progress(): Color;
  set_tint_under(value: Color): void;
  get_tint_under(): Color;

  /**
   * Returns the stretch margin with the specified index. See {@link stretch_margin_bottom} and related properties.
   */
  get_stretch_margin(margin: int): int;
  /**
   * Sets the stretch margin with the specified index. See {@link stretch_margin_bottom} and related properties.
   */
  set_stretch_margin(margin: int, value: int): void;

  // enum FillMode
  /** The {@link texture_progress} fills from left to right. */
  static readonly FILL_LEFT_TO_RIGHT: int;
  /** The {@link texture_progress} fills from right to left. */
  static readonly FILL_RIGHT_TO_LEFT: int;
  /** The {@link texture_progress} fills from top to bottom. */
  static readonly FILL_TOP_TO_BOTTOM: int;
  /** The {@link texture_progress} fills from bottom to top. */
  static readonly FILL_BOTTOM_TO_TOP: int;
  /**
   * Turns the node into a radial bar. The {@link texture_progress} fills clockwise. See {@link radial_center_offset}, {@link radial_initial_angle} and {@link radial_fill_degrees} to control the way the bar fills up.
   */
  static readonly FILL_CLOCKWISE: int;
  /**
   * Turns the node into a radial bar. The {@link texture_progress} fills counterclockwise. See {@link radial_center_offset}, {@link radial_initial_angle} and {@link radial_fill_degrees} to control the way the bar fills up.
   */
  static readonly FILL_COUNTER_CLOCKWISE: int;
  /** The {@link texture_progress} fills from the center, expanding both towards the left and the right. */
  static readonly FILL_BILINEAR_LEFT_AND_RIGHT: int;
  /** The {@link texture_progress} fills from the center, expanding both towards the top and the bottom. */
  static readonly FILL_BILINEAR_TOP_AND_BOTTOM: int;
  /**
   * Turns the node into a radial bar. The {@link texture_progress} fills radially from the center, expanding both clockwise and counterclockwise. See {@link radial_center_offset}, {@link radial_initial_angle} and {@link radial_fill_degrees} to control the way the bar fills up.
   */
  static readonly FILL_CLOCKWISE_AND_COUNTER_CLOCKWISE: int;
}
