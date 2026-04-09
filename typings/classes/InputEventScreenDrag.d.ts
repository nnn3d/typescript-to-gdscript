// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Represents a screen drag event. */
declare class InputEventScreenDrag extends InputEventFromWindow {
  /** The drag event index in the case of a multi-drag event. */
  index: int;
  /** Returns `true` when using the eraser end of a stylus pen. */
  pen_inverted: boolean;
  /** The drag position in the viewport the node is in, using the coordinate system of this viewport. */
  position: Vector2;
  /** Represents the pressure the user puts on the pen. Ranges from `0.0` to `1.0`. */
  pressure: float;
  /**
   * The drag position relative to the previous position (position at the last frame).
   * **Note:** {@link relative} is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means touch sensitivity will appear different depending on resolution when using {@link relative} in a script that handles touch aiming. To avoid this, use {@link screen_relative} instead.
   */
  relative: Vector2;
  /**
   * The unscaled drag position relative to the previous position in screen coordinates (position at the last frame). This position is *not* scaled according to the content scale factor or calls to {@link InputEvent.xformed_by}. This should be preferred over {@link relative} for touch aiming regardless of the project's stretch mode.
   */
  screen_relative: Vector2;
  /**
   * The unscaled drag velocity in pixels per second in screen coordinates. This velocity is *not* scaled according to the content scale factor or calls to {@link InputEvent.xformed_by}. This should be preferred over {@link velocity} for touch aiming regardless of the project's stretch mode.
   */
  screen_velocity: Vector2;
  /**
   * Represents the angles of tilt of the pen. Positive X-coordinate value indicates a tilt to the right. Positive Y-coordinate value indicates a tilt toward the user. Ranges from `-1.0` to `1.0` for both axes.
   */
  tilt: Vector2;
  /**
   * The drag velocity.
   * **Note:** {@link velocity} is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means touch sensitivity will appear different depending on resolution when using {@link velocity} in a script that handles touch aiming. To avoid this, use {@link screen_velocity} instead.
   */
  velocity: Vector2;
  set_index(value: int): void;
  get_index(): int;
  set_pen_inverted(value: boolean): void;
  get_pen_inverted(): boolean;
  set_position(value: Vector2 | Vector2i): void;
  get_position(): Vector2;
  set_pressure(value: float): void;
  get_pressure(): float;
  set_relative(value: Vector2 | Vector2i): void;
  get_relative(): Vector2;
  set_screen_relative(value: Vector2 | Vector2i): void;
  get_screen_relative(): Vector2;
  set_screen_velocity(value: Vector2 | Vector2i): void;
  get_screen_velocity(): Vector2;
  set_tilt(value: Vector2 | Vector2i): void;
  get_tilt(): Vector2;
  set_velocity(value: Vector2 | Vector2i): void;
  get_velocity(): Vector2;
}
