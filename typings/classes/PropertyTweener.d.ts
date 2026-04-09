// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Interpolates an {@link Object}'s property over time. */
declare class PropertyTweener extends Tweener {
  /**
   * When called, the final value will be used as a relative value instead.
   * **Example:** Move the node by `100` pixels to the right.
   */
  as_relative(): PropertyTweener;
  /**
   * Sets a custom initial value to the {@link PropertyTweener}.
   * **Example:** Move the node from position `(100, 100)` to `(200, 100)`.
   */
  from(value: unknown): PropertyTweener;
  /**
   * Makes the {@link PropertyTweener} use the current property value (i.e. at the time of creating this {@link PropertyTweener}) as a starting point. This is equivalent of using {@link from} with the current value. These two calls will do the same:
   */
  from_current(): PropertyTweener;
  /**
   * Allows interpolating the value with a custom easing function. The provided `interpolator_method` will be called with a value ranging from `0.0` to `1.0` and is expected to return a value within the same range (values outside the range can be used for overshoot). The return value of the method is then used for interpolation between initial and final value. Note that the parameter passed to the method is still subject to the tweener's own easing.
   */
  set_custom_interpolator(
  interpolator_method: (value: float) => float,
  ): PropertyTweener;
  /**
   * Sets the time in seconds after which the {@link PropertyTweener} will start interpolating. By default there's no delay.
   */
  set_delay(delay: float): PropertyTweener;
  /**
   * Sets the type of used easing from {@link Tween.EaseType}. If not set, the default easing is used from the {@link Tween} that contains this Tweener.
   */
  set_ease(ease: int): PropertyTweener;
  /**
   * Sets the type of used transition from {@link Tween.TransitionType}. If not set, the default transition is used from the {@link Tween} that contains this Tweener.
   */
  set_trans(trans: int): PropertyTweener;
}
