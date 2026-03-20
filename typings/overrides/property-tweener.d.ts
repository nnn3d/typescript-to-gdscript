/**
 * Override: PropertyTweener — typed custom interpolator callback.
 */
declare class PropertyTweener {
  /** Sets a custom interpolation function. `interpolator_method` receives a value from 0.0 to 1.0 and should return a value in the same range. */
  set_custom_interpolator(
    interpolator_method: (value: float) => float,
  ): PropertyTweener;
}
