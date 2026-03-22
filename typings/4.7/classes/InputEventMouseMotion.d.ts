// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a mouse or a pen movement. */
declare class InputEventMouseMotion extends InputEventMouse {
  /**
   * Returns `true` when using the eraser end of a stylus pen.
   * **Note:** This property is implemented on Linux, macOS and Windows.
   */
  pen_inverted: boolean;
  /** Represents the pressure the user puts on the pen. Ranges from `0.0` to `1.0`. */
  pressure: float;
  /**
   * The mouse position relative to the previous position (position at the last frame).
   * **Note:** Since {@link InputEventMouseMotion} may only be emitted when the mouse moves, it is not possible to reliably detect when the mouse has stopped moving by checking this property. A separate, short timer may be necessary.
   * **Note:** {@link relative} is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. This means mouse sensitivity will appear different depending on resolution when using {@link relative} in a script that handles mouse aiming with the {@link Input.MOUSE_MODE_CAPTURED} mouse mode. To avoid this, use {@link screen_relative} instead.
   */
  relative: Vector2;
  /**
   * The unscaled mouse position relative to the previous position in the coordinate system of the screen (position at the last frame).
   * **Note:** Since {@link InputEventMouseMotion} may only be emitted when the mouse moves, it is not possible to reliably detect when the mouse has stopped moving by checking this property. A separate, short timer may be necessary.
   * **Note:** This coordinate is *not* scaled according to the content scale factor or calls to {@link InputEvent.xformed_by}. This should be preferred over {@link relative} for mouse aiming when using the {@link Input.MOUSE_MODE_CAPTURED} mouse mode, regardless of the project's stretch mode.
   */
  screen_relative: Vector2;
  /**
   * The unscaled mouse velocity in pixels per second in screen coordinates. This velocity is *not* scaled according to the content scale factor or calls to {@link InputEvent.xformed_by}.
   * **Note:** Use {@link screen_relative} for mouse aiming using the {@link Input.MOUSE_MODE_CAPTURED} mouse mode.
   */
  screen_velocity: Vector2;
  /**
   * Represents the angles of tilt of the pen. Positive X-coordinate value indicates a tilt to the right. Positive Y-coordinate value indicates a tilt toward the user. Ranges from `-1.0` to `1.0` for both axes.
   */
  tilt: Vector2;
  /**
   * The mouse velocity in pixels per second.
   * **Note:** {@link velocity} is automatically scaled according to the content scale factor, which is defined by the project's stretch mode settings. That means mouse sensitivity may appear different depending on resolution.
   * **Note:** Use {@link screen_relative} for mouse aiming using the {@link Input.MOUSE_MODE_CAPTURED} mouse mode.
   */
  velocity: Vector2;
  set_pen_inverted(value: boolean): void;
  get_pen_inverted(): boolean;
  set_pressure(value: float): void;
  get_pressure(): float;
  set_relative(value: Vector2): void;
  get_relative(): Vector2;
  set_screen_relative(value: Vector2): void;
  get_screen_relative(): Vector2;
  set_screen_velocity(value: Vector2): void;
  get_screen_velocity(): Vector2;
  set_tilt(value: Vector2): void;
  get_tilt(): Vector2;
  set_velocity(value: Vector2): void;
  get_velocity(): Vector2;
}
