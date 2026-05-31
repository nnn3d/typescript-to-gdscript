/**
 * Override: PropertyTweener — typed custom interpolator callback.
 */
declare class PropertyTweener {
  set_custom_interpolator(
    interpolator_method: (value: float) => float,
  ): PropertyTweener;
}
