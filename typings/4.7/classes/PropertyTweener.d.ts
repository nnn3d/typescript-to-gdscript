// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

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
  /** Sets a custom interpolation function. `interpolator_method` receives a value from 0.0 to 1.0 and should return a value in the same range. */
  set_custom_interpolator(interpolator_method: (value: float) => float): PropertyTweener;
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
