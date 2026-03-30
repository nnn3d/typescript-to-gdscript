// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A container used to provide scrollbars to a child control when needed. */
declare class ScrollContainer extends Container {
  /**
   * <member name="draw_focus_border" type="bool" setter="set_draw_focus_border" getter="get_draw_focus_border" default="false">
   * If `true`,  is drawn when the ScrollContainer or one of its descendant nodes is focused.
   */
  clip_contents: boolean;
  /**
   * If `true`, the ScrollContainer will automatically scroll to focused children (including indirect children) to make sure they are fully visible.
   */
  follow_focus: boolean;
  /** Controls whether horizontal scrollbar can be used and when it should be visible. */
  horizontal_scroll_mode: int;
  /** Deadzone for touch scrolling. Lower deadzone makes the scrolling more sensitive. */
  scroll_deadzone: int;
  /**
   * The way which scroll hints (indicators that show that the content can still be scrolled in a certain direction) will be shown.
   * **Note:** Hints won't be shown if the content can be scrolled both vertically and horizontally.
   */
  scroll_hint_mode: int;
  /**
   * The current horizontal scroll value.
   * **Note:** If you are setting this value in the {@link Node._ready} function or earlier, it needs to be wrapped with {@link Object.set_deferred}, since scroll bar's {@link Range.max_value} is not initialized yet.
   */
  scroll_horizontal: int;
  /**
   * Overrides the {@link ScrollBar.custom_step} used when clicking the internal scroll bar's horizontal increment and decrement buttons or when using arrow keys when the {@link ScrollBar} is focused.
   */
  scroll_horizontal_custom_step: float;
  /**
   * The current vertical scroll value.
   * **Note:** Setting it early needs to be deferred, just like in {@link scroll_horizontal}.
   */
  scroll_vertical: int;
  /**
   * Overrides the {@link ScrollBar.custom_step} used when clicking the internal scroll bar's vertical increment and decrement buttons or when using arrow keys when the {@link ScrollBar} is focused.
   */
  scroll_vertical_custom_step: float;
  /**
   * If `true`, the scroll hint texture will be tiled instead of stretched. See {@link scroll_hint_mode}.
   */
  tile_scroll_hint: boolean;
  /** Controls whether vertical scrollbar can be used and when it should be visible. */
  vertical_scroll_mode: int;
  set_follow_focus(value: boolean): void;
  is_following_focus(): boolean;
  set_horizontal_scroll_mode(value: int): void;
  get_horizontal_scroll_mode(): int;
  set_deadzone(value: int): void;
  get_deadzone(): int;
  set_scroll_hint_mode(value: int): void;
  get_scroll_hint_mode(): int;
  set_h_scroll(value: int): void;
  get_h_scroll(): int;
  set_horizontal_custom_step(value: float): void;
  get_horizontal_custom_step(): float;
  set_v_scroll(value: int): void;
  get_v_scroll(): int;
  set_vertical_custom_step(value: float): void;
  get_vertical_custom_step(): float;
  set_tile_scroll_hint(value: boolean): void;
  is_scroll_hint_tiled(): boolean;
  set_vertical_scroll_mode(value: int): void;
  get_vertical_scroll_mode(): int;

  /**
   * Ensures the given `control` is visible (must be a direct or indirect child of the ScrollContainer). Used by {@link follow_focus}.
   * **Note:** This will not work on a node that was just added during the same frame. If you want to scroll to a newly added child, you must wait until the next frame using {@link SceneTree.process_frame}:
   */
  ensure_control_visible(control: Control): void;
  /**
   * Returns the horizontal scrollbar {@link HScrollBar} of this {@link ScrollContainer}.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to disable or hide a scrollbar, you can use {@link horizontal_scroll_mode}.
   */
  get_h_scroll_bar(): HScrollBar;
  /**
   * Returns the vertical scrollbar {@link VScrollBar} of this {@link ScrollContainer}.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to disable or hide a scrollbar, you can use {@link vertical_scroll_mode}.
   */
  get_v_scroll_bar(): VScrollBar;

  /**
   * Emitted when scrolling stops when dragging the scrollable area *with a touch event*. This signal is *not* emitted when scrolling by dragging the scrollbar, scrolling with the mouse wheel or scrolling with keyboard/gamepad events.
   * **Note:** This signal is only emitted on Android or iOS, or on desktop/web platforms when {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse} is enabled.
   */
  scroll_ended: Signal<[]>;
  /**
   * Emitted when scrolling starts when dragging the scrollable area w*ith a touch event*. This signal is *not* emitted when scrolling by dragging the scrollbar, scrolling with the mouse wheel or scrolling with keyboard/gamepad events.
   * **Note:** This signal is only emitted on Android or iOS, or on desktop/web platforms when {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse} is enabled.
   */
  scroll_started: Signal<[]>;

  // enum ScrollMode
  /** Scrolling disabled, scrollbar will be invisible. */
  static readonly SCROLL_MODE_DISABLED: int;
  /**
   * Scrolling enabled, scrollbar will be visible only if necessary, i.e. container's content is bigger than the container.
   */
  static readonly SCROLL_MODE_AUTO: int;
  /** Scrolling enabled, scrollbar will be always visible. */
  static readonly SCROLL_MODE_SHOW_ALWAYS: int;
  /** Scrolling enabled, scrollbar will be hidden. */
  static readonly SCROLL_MODE_SHOW_NEVER: int;
  /**
   * Combines {@link SCROLL_MODE_AUTO} and {@link SCROLL_MODE_SHOW_ALWAYS}. The scrollbar is only visible if necessary, but the content size is adjusted as if it was always visible. It's useful for ensuring that content size stays the same regardless if the scrollbar is visible.
   */
  static readonly SCROLL_MODE_RESERVE: int;
  // enum ScrollHintMode
  /** Scroll hints will never be shown. */
  static readonly SCROLL_HINT_MODE_DISABLED: int;
  /** Scroll hints will be shown at the top and bottom (if vertical), or left and right (if horizontal). */
  static readonly SCROLL_HINT_MODE_ALL: int;
  /** Scroll hints will be shown at the top (if vertical), or the left (if horizontal). */
  static readonly SCROLL_HINT_MODE_TOP_AND_LEFT: int;
  /** Scroll hints will be shown at the bottom (if horizontal), or the right (if horizontal). */
  static readonly SCROLL_HINT_MODE_BOTTOM_AND_RIGHT: int;
}
