// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for sliders. */
declare class Slider extends Range {
  /** If `true`, the slider can be interacted with. If `false`, the value can be changed only by code. */
  editable: boolean;
  /**
   * <member name="scrollable" type="bool" setter="set_scrollable" getter="is_scrollable" default="true">
   * If `true`, the value can be changed using the mouse wheel.
   */
  focus_mode: int;
  /**
   * <member name="tick_count" type="int" setter="set_ticks" getter="get_ticks" default="0">
   * Number of ticks displayed on the slider, including border ticks. Ticks are uniformly-distributed value markers.
   */
  step: float;
  /** If `true`, the slider will display ticks for minimum and maximum values. */
  ticks_on_borders: boolean;
  /** Sets the position of the ticks. See {@link TickPosition} for details. */
  ticks_position: int;
  set_editable(value: boolean): void;
  is_editable(): boolean;
  set_step(value: float): void;
  get_step(): float;
  set_ticks_on_borders(value: boolean): void;
  get_ticks_on_borders(): boolean;
  set_ticks_position(value: int): void;
  get_ticks_position(): int;

  /**
   * Emitted when the grabber stops being dragged. If `value_changed` is `true`, {@link Range.value} is different from the value when the dragging was started.
   */
  drag_ended: Signal<[boolean]>;
  /**
   * Emitted when the grabber starts being dragged. This is emitted before the corresponding {@link Range.value_changed} signal.
   */
  drag_started: Signal<[]>;

  // enum TickPosition
  /** Places the ticks at the bottom of the {@link HSlider}, or right of the {@link VSlider}. */
  static readonly TICK_POSITION_BOTTOM_RIGHT: int;
  /** Places the ticks at the top of the {@link HSlider}, or left of the {@link VSlider}. */
  static readonly TICK_POSITION_TOP_LEFT: int;
  /** Places the ticks at the both sides of the slider. */
  static readonly TICK_POSITION_BOTH: int;
  /** Places the ticks at the center of the slider. */
  static readonly TICK_POSITION_CENTER: int;
}
