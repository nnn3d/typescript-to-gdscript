// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A countdown timer. */
declare class Timer extends Node {
  /**
   * If `true`, the timer will start immediately when it enters the scene tree.
   * **Note:** After the timer enters the tree, this property is automatically set to `false`.
   * **Note:** This property does nothing when the timer is running in the editor.
   */
  autostart: boolean;
  /** If `true`, the timer will ignore {@link Engine.time_scale} and update with the real, elapsed time. */
  ignore_time_scale: boolean;
  /**
   * If `true`, the timer will stop after reaching the end. Otherwise, as by default, the timer will automatically restart.
   */
  one_shot: boolean;
  /**
   * If `true`, the timer is paused. A paused timer does not process until this property is set back to `false`, even when {@link start} is called. See also {@link stop}.
   */
  paused: boolean;
  /** Specifies when the timer is updated during the main loop. */
  process_callback: int;
  /**
   * The timer's remaining time in seconds. This is always `0` if the timer is stopped.
   * **Note:** This property is read-only and cannot be modified. It is based on {@link wait_time}.
   */
  time_left: float;
  /**
   * The time required for the timer to end, in seconds. This property can also be set every time {@link start} is called.
   * **Note:** Timers can only process once per physics or process frame (depending on the {@link process_callback}). An unstable framerate may cause the timer to end inconsistently, which is especially noticeable if the wait time is lower than roughly `0.05` seconds. For very short timers, it is recommended to write your own code instead of using a {@link Timer} node. Timers are also affected by {@link Engine.time_scale}.
   */
  wait_time: float;
  set_autostart(value: boolean): void;
  has_autostart(): boolean;
  set_ignore_time_scale(value: boolean): void;
  is_ignoring_time_scale(): boolean;
  set_one_shot(value: boolean): void;
  is_one_shot(): boolean;
  set_paused(value: boolean): void;
  is_paused(): boolean;
  set_timer_process_callback(value: int): void;
  get_timer_process_callback(): int;
  get_time_left(): float;
  set_wait_time(value: float): void;
  get_wait_time(): float;

  /** Returns `true` if the timer is stopped or has not started. */
  is_stopped(): boolean;
  /**
   * Starts the timer, or resets the timer if it was started already. Fails if the timer is not inside the scene tree. If `time_sec` is greater than `0`, this value is used for the {@link wait_time}.
   * **Note:** This method does not resume a paused timer. See {@link paused}.
   */
  start(time_sec?: float): void;
  /**
   * Stops the timer. See also {@link paused}. Unlike {@link start}, this can safely be called if the timer is not inside the scene tree.
   * **Note:** Calling {@link stop} does not emit the {@link timeout} signal, as the timer is not considered to have timed out. If this is desired, use `$Timer.timeout.emit()` after calling {@link stop} to manually emit the signal.
   */
  stop(): void;

  /** Emitted when the timer reaches the end. */
  timeout: Signal<[]>;

  // enum TimerProcessCallback
  /**
   * Update the timer every physics process frame (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}).
   */
  static readonly TIMER_PROCESS_PHYSICS: int;
  /** Update the timer every process (rendered) frame (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}). */
  static readonly TIMER_PROCESS_IDLE: int;
}
