// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for defining stylized boxes for UI elements. */
declare class StyleBox extends Resource {
  /**
   * The bottom margin for the contents of this style box. Increasing this value reduces the space available to the contents from the bottom.
   * If this value is negative, it is ignored and a child-specific margin is used instead. For example, for {@link StyleBoxFlat}, the border thickness (if any) is used instead.
   * It is up to the code using this style box to decide what these contents are: for example, a {@link Button} respects this content margin for the textual contents of the button.
   * {@link get_margin} should be used to fetch this value as consumer instead of reading these properties directly. This is because it correctly respects negative values and the fallback mentioned above.
   */
  content_margin_bottom: float;
  /**
   * The left margin for the contents of this style box. Increasing this value reduces the space available to the contents from the left.
   * Refer to {@link content_margin_bottom} for extra considerations.
   */
  content_margin_left: float;
  /**
   * The right margin for the contents of this style box. Increasing this value reduces the space available to the contents from the right.
   * Refer to {@link content_margin_bottom} for extra considerations.
   */
  content_margin_right: float;
  /**
   * The top margin for the contents of this style box. Increasing this value reduces the space available to the contents from the top.
   * Refer to {@link content_margin_bottom} for extra considerations.
   */
  content_margin_top: float;

  _draw(to_canvas_item: RID, rect: Rect2): void;
  _get_draw_rect(rect: Rect2): Rect2;
  /**
   * Virtual method to be implemented by the user. Returns a custom minimum size that the stylebox must respect when drawing. By default {@link get_minimum_size} only takes content margins into account. This method can be overridden to add another size restriction. A combination of the default behavior and the output of this method will be used, to account for both sizes.
   */
  _get_minimum_size(): Vector2;
  _test_mask(point: Vector2, rect: Rect2): boolean;
  /**
   * Draws this stylebox using a canvas item identified by the given {@link RID}.
   * The {@link RID} value can either be the result of {@link CanvasItem.get_canvas_item} called on an existing {@link CanvasItem}-derived node, or directly from creating a canvas item in the {@link RenderingServer} with {@link RenderingServer.canvas_item_create}.
   */
  draw(canvas_item: RID, rect: Rect2): void;
  /** Returns the default margin of the specified {@link Side}. */
  get_content_margin(margin: int): float;
  /**
   * Returns the {@link CanvasItem} that handles its {@link CanvasItem.NOTIFICATION_DRAW} or {@link CanvasItem._draw} callback at this moment.
   */
  get_current_item_drawn(): CanvasItem | null;
  /**
   * Returns the content margin offset for the specified {@link Side}.
   * Positive values reduce size inwards, unlike {@link Control}'s margin values.
   */
  get_margin(margin: int): float;
  /** Returns the minimum size that this stylebox can be shrunk to. */
  get_minimum_size(): Vector2;
  /**
   * Returns the "offset" of a stylebox. This helper function returns a value equivalent to `Vector2(style.get_margin(MARGIN_LEFT), style.get_margin(MARGIN_TOP))`.
   */
  get_offset(): Vector2;
  /** Sets the default value of the specified {@link Side} to `offset` pixels. */
  set_content_margin(margin: int, offset: float): void;
  /** Sets the default margin to `offset` pixels for all sides. */
  set_content_margin_all(offset: float): void;
  /** Test a position in a rectangle, return whether it passes the mask test. */
  test_mask(point: Vector2, rect: Rect2): boolean;
}
