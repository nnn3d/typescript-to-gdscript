// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Lightweight object used for general-purpose animation via script, using {@link Tweener}s. */
declare class Tween extends RefCounted {
  /**
   * Binds this {@link Tween} with the given `node`. {@link Tween}s are processed directly by the {@link SceneTree}, so they run independently of the animated nodes. When you bind a {@link Node} with the {@link Tween}, the {@link Tween} will halt the animation when the object is not inside tree and the {@link Tween} will be automatically killed when the bound object is freed. Also {@link TWEEN_PAUSE_BOUND} will make the pausing behavior dependent on the bound node.
   * For a shorter way to create and bind a {@link Tween}, you can use {@link Node.create_tween}.
   */
  bind_node(node: Node): Tween;
  /** Used to chain two {@link Tweener}s after {@link set_parallel} is called with `true`. */
  chain(): Tween;
  /**
   * Processes the {@link Tween} by the given `delta` value, in seconds. This is mostly useful for manual control when the {@link Tween} is paused. It can also be used to end the {@link Tween} animation immediately, by setting `delta` longer than the whole duration of the {@link Tween} animation.
   * Returns `true` if the {@link Tween} still has {@link Tweener}s that haven't finished.
   */
  custom_step(delta: float): boolean;
  /**
   * Returns the number of remaining loops for this {@link Tween} (see {@link set_loops}). A return value of `-1` indicates an infinitely looping {@link Tween}, and a return value of `0` indicates that the {@link Tween} has already finished.
   */
  get_loops_left(): int;
  /**
   * Returns the total time in seconds the {@link Tween} has been animating (i.e. the time since it started, not counting pauses etc.). The time is affected by {@link set_speed_scale}, and {@link stop} will reset it to `0`.
   * **Note:** As it results from accumulating frame deltas, the time returned after the {@link Tween} has finished animating will be slightly greater than the actual {@link Tween} duration.
   */
  get_total_elapsed_time(): float;
  /**
   * Returns `true` if any {@link Tweener} has been added to the {@link Tween} and the {@link Tween} is valid. Useful when tweeners are added dynamically and the tween can end up empty. Killing an empty tween before it starts will prevent errors.
   */
  has_tweeners(): boolean;
  /**
   * This method can be used for manual interpolation of a value, when you don't want {@link Tween} to do animating for you. It's similar to {@link @GlobalScope.lerp}, but with support for custom transition and easing.
   * `initial_value` is the starting value of the interpolation.
   * `delta_value` is the change of the value in the interpolation, i.e. it's equal to `final_value - initial_value`.
   * `elapsed_time` is the time in seconds that passed after the interpolation started and it's used to control the position of the interpolation. E.g. when it's equal to half of the `duration`, the interpolated value will be halfway between initial and final values. This value can also be greater than `duration` or lower than 0, which will extrapolate the value.
   * `duration` is the total time of the interpolation.
   * **Note:** If `duration` is equal to `0`, the method will always return the final value, regardless of `elapsed_time` provided.
   */
  static interpolate_value(initial_value: unknown, delta_value: unknown, elapsed_time: float, duration: float, trans_type: int, ease_type: int): unknown;
  /**
   * Returns whether the {@link Tween} is currently running, i.e. it wasn't paused and it's not finished.
   */
  is_running(): boolean;
  /**
   * Returns whether the {@link Tween} is valid. A valid {@link Tween} is a {@link Tween} contained by the scene tree (i.e. the array from {@link SceneTree.get_processed_tweens} will contain this {@link Tween}). A {@link Tween} might become invalid when it has finished tweening, is killed, or when created with `Tween.new()`. Invalid {@link Tween}s can't have {@link Tweener}s appended.
   */
  is_valid(): boolean;
  /** Aborts all tweening operations and invalidates the {@link Tween}. */
  kill(): void;
  /**
   * Makes the next {@link Tweener} run parallelly to the previous one.
   * All {@link Tweener}s in the example will run at the same time.
   * You can make the {@link Tween} parallel by default by using {@link set_parallel}.
   */
  parallel(): Tween;
  /**
   * Pauses the tweening. The animation can be resumed by using {@link play}.
   * **Note:** If a Tween is paused and not bound to any node, it will exist indefinitely until manually started or invalidated. If you lose a reference to such Tween, you can retrieve it using {@link SceneTree.get_processed_tweens}.
   */
  pause(): void;
  /** Resumes a paused or stopped {@link Tween}. */
  play(): void;
  /**
   * Sets the default ease type for {@link PropertyTweener}s and {@link MethodTweener}s appended after this method.
   * Before this method is called, the default ease type is {@link EASE_IN_OUT}.
   */
  set_ease(ease: int): Tween;
  /**
   * If `ignore` is `true`, the tween will ignore {@link Engine.time_scale} and update with the real, elapsed time. This affects all {@link Tweener}s and their delays. Default value is `false`.
   */
  set_ignore_time_scale(ignore?: boolean): Tween;
  /**
   * Sets the number of times the tweening sequence will be repeated, i.e. `set_loops(2)` will run the animation twice.
   * Calling this method without arguments will make the {@link Tween} run infinitely, until either it is killed with {@link kill}, the {@link Tween}'s bound node is freed, or all the animated objects have been freed (which makes further animation impossible).
   * **Warning:** Make sure to always add some duration/delay when using infinite loops. To prevent the game freezing, 0-duration looped animations (e.g. a single {@link CallbackTweener} with no delay) are stopped after a small number of loops, which may produce unexpected results. If a {@link Tween}'s lifetime depends on some node, always use {@link bind_node}.
   */
  set_loops(loops?: int): Tween;
  /**
   * If `parallel` is `true`, the {@link Tweener}s appended after this method will by default run simultaneously, as opposed to sequentially.
   * **Note:** Just like with {@link parallel}, the tweener added right before this method will also be part of the parallel step.
   */
  set_parallel(parallel?: boolean): Tween;
  /**
   * Determines the behavior of the {@link Tween} when the {@link SceneTree} is paused.
   * Default value is {@link TWEEN_PAUSE_BOUND}.
   */
  set_pause_mode(mode: int): Tween;
  /**
   * Determines whether the {@link Tween} should run after process frames (see {@link Node._process}) or physics frames (see {@link Node._physics_process}).
   * Default value is {@link TWEEN_PROCESS_IDLE}.
   */
  set_process_mode(mode: int): Tween;
  /** Scales the speed of tweening. This affects all {@link Tweener}s and their delays. */
  set_speed_scale(speed: float): Tween;
  /**
   * Sets the default transition type for {@link PropertyTweener}s and {@link MethodTweener}s appended after this method.
   * Before this method is called, the default transition type is {@link TRANS_LINEAR}.
   */
  set_trans(trans: int): Tween;
  /**
   * Stops the tweening and resets the {@link Tween} to its initial state. This will not remove any appended {@link Tweener}s.
   * **Note:** This does *not* reset targets of {@link PropertyTweener}s to their values when the {@link Tween} first started.
   * **Note:** If a Tween is stopped and not bound to any node, it will exist indefinitely until manually started or invalidated. If you lose a reference to such Tween, you can retrieve it using {@link SceneTree.get_processed_tweens}.
   */
  stop(): void;
  /**
   * Creates and appends an {@link AwaitTweener}. This method can be used to await a signal to be emitted and create asynchronous animations or cutscenes.
   * The animation will not progress to the next step until the awaited signal is emitted or the connection becomes invalid (e.g. as a result of freeing the target object). If you know that the emission may not happen, use {@link AwaitTweener.set_timeout}.
   * **Note:** The awaited signal should be emitted during the step when {@link AwaitTweener} is active.
   * **Example:** An object launches itself and explodes upon collision or after 4 seconds.
   * **Example:** A character walks to a specific point, says some lines and walks back when the player closes the message box.
   * **Note:** If you are awaiting a signal from a callback called in the same {@link Tween}, make sure the signal is emitted *after* the await starts. If it can't be reasonably guaranteed, you can await and emit in the same step:
   */
  tween_await(signal: Signal): AwaitTweener;
  /**
   * Creates and appends a {@link CallbackTweener}. This method can be used to call an arbitrary method in any object. Use {@link Callable.bind} to bind additional arguments for the call.
   * **Example:** Object that keeps shooting every 1 second:
   * **Example:** Turning a sprite red and then blue, with 2 second delay:
   */
  tween_callback(callback: () => void): CallbackTweener;
  /**
   * Creates and appends an {@link IntervalTweener}. This method can be used to create delays in the tween animation, as an alternative to using the delay in other {@link Tweener}s, or when there's no animation (in which case the {@link Tween} acts as a timer). `time` is the length of the interval, in seconds.
   * **Example:** Creating an interval in code execution:
   * **Example:** Creating an object that moves back and forth and jumps every few seconds:
   */
  tween_interval(time: float): IntervalTweener;
  /**
   * Creates and appends a {@link MethodTweener}. This method is similar to a combination of {@link tween_callback} and {@link tween_property}. It calls a method over time with a tweened value provided as an argument. The value is tweened between `from` and `to` over the time specified by `duration`, in seconds. Use {@link Callable.bind} to bind additional arguments for the call. You can use {@link MethodTweener.set_ease} and {@link MethodTweener.set_trans} to tweak the easing and transition of the value or {@link MethodTweener.set_delay} to delay the tweening.
   * **Example:** Making a 3D object look from one point to another point:
   * **Example:** Setting the text of a {@link Label}, using an intermediate method and after a delay:
   */
  tween_method<T>(
  method: (value: T) => void,
  from_: T,
  to: T,
  duration: float,
  ): MethodTweener;
  /**
   * Creates and appends a {@link PropertyTweener}. This method tweens a `property` of an `object` between an initial value and `final_val` in a span of time equal to `duration`, in seconds. The initial value by default is the property's value at the time the tweening of the {@link PropertyTweener} starts.
   * will move the sprite to position (100, 200) and then to (200, 300). If you use {@link PropertyTweener.from} or {@link PropertyTweener.from_current}, the starting position will be overwritten by the given value instead. See other methods in {@link PropertyTweener} to see how the tweening can be tweaked further.
   * **Note:** You can find the correct property name by hovering over the property in the Inspector. You can also provide the components of a property directly by using `"property:component"` (eg. `position:x`), where it would only apply to that particular component.
   * **Example:** Moving an object twice from the same position, with different transition types:
   */
  tween_property<T>(
  object: GodotObject,
  property: string,
  final_val: T,
  duration: float,
  ): PropertyTweener;
  /**
   * Creates and appends a {@link SubtweenTweener}. This method can be used to nest `subtween` within this {@link Tween}, allowing for the creation of more complex and composable sequences.
   * **Note:** The methods {@link pause}, {@link stop}, and {@link set_loops} can cause the parent {@link Tween} to get stuck on the subtween step; see the documentation for those methods for more information.
   * **Note:** The pause and process modes set by {@link set_pause_mode} and {@link set_process_mode} on `subtween` will be overridden by the parent {@link Tween}'s settings.
   */
  tween_subtween(subtween: Tween): SubtweenTweener;

  /**
   * Emitted when the {@link Tween} has finished all tweening. Never emitted when the {@link Tween} is set to infinite looping (see {@link set_loops}).
   */
  finished: Signal<[]>;
  /**
   * Emitted when a full loop is complete (see {@link set_loops}), providing the loop index. This signal is not emitted after the final loop, use {@link finished} instead for this case.
   */
  loop_finished: Signal<[int]>;
  /**
   * Emitted when one step of the {@link Tween} is complete, providing the step index. One step is either a single {@link Tweener} or a group of {@link Tweener}s running in parallel.
   */
  step_finished: Signal<[int]>;

  // enum TweenProcessMode
  /** The {@link Tween} updates after each physics frame (see {@link Node._physics_process}). */
  static readonly TWEEN_PROCESS_PHYSICS: int;
  /** The {@link Tween} updates after each process frame (see {@link Node._process}). */
  static readonly TWEEN_PROCESS_IDLE: int;
  // enum TweenPauseMode
  /**
   * If the {@link Tween} has a bound node, it will process when that node can process (see {@link Node.process_mode}). Otherwise it's the same as {@link TWEEN_PAUSE_STOP}.
   */
  static readonly TWEEN_PAUSE_BOUND: int;
  /** If {@link SceneTree} is paused, the {@link Tween} will also pause. */
  static readonly TWEEN_PAUSE_STOP: int;
  /** The {@link Tween} will process regardless of whether {@link SceneTree} is paused. */
  static readonly TWEEN_PAUSE_PROCESS: int;
  // enum TransitionType
  /** The animation is interpolated linearly. */
  static readonly TRANS_LINEAR: int;
  /** The animation is interpolated using a sine function. */
  static readonly TRANS_SINE: int;
  /** The animation is interpolated with a quintic (to the power of 5) function. */
  static readonly TRANS_QUINT: int;
  /** The animation is interpolated with a quartic (to the power of 4) function. */
  static readonly TRANS_QUART: int;
  /** The animation is interpolated with a quadratic (to the power of 2) function. */
  static readonly TRANS_QUAD: int;
  /** The animation is interpolated with an exponential (to the power of x) function. */
  static readonly TRANS_EXPO: int;
  /** The animation is interpolated with elasticity, wiggling around the edges. */
  static readonly TRANS_ELASTIC: int;
  /** The animation is interpolated with a cubic (to the power of 3) function. */
  static readonly TRANS_CUBIC: int;
  /** The animation is interpolated with a function using square roots. */
  static readonly TRANS_CIRC: int;
  /** The animation is interpolated by bouncing at the end. */
  static readonly TRANS_BOUNCE: int;
  /** The animation is interpolated backing out at ends. */
  static readonly TRANS_BACK: int;
  /** The animation is interpolated like a spring towards the end. */
  static readonly TRANS_SPRING: int;
  // enum EaseType
  /** The interpolation starts slowly and speeds up towards the end. */
  static readonly EASE_IN: int;
  /** The interpolation starts quickly and slows down towards the end. */
  static readonly EASE_OUT: int;
  /** A combination of {@link EASE_IN} and {@link EASE_OUT}. The interpolation is slowest at both ends. */
  static readonly EASE_IN_OUT: int;
  /** A combination of {@link EASE_IN} and {@link EASE_OUT}. The interpolation is fastest at both ends. */
  static readonly EASE_OUT_IN: int;
}
