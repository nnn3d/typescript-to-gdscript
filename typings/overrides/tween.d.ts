/**
 * Override: Tween — typed callbacks and tween_method generic.
 */
declare class Tween {
  /** Creates and appends a {@link CallbackTweener}. Calls the given callback when this step is reached. */
  tween_callback(callback: () => void): CallbackTweener;
  /** Creates and appends a {@link MethodTweener}. Tweens a value from `from_` to `to` over `duration` seconds, calling `method` with the interpolated value each step. */
  tween_method<T>(method: (value: T) => void, from_: T, to: T, duration: float): MethodTweener;
  /** Creates and appends a {@link PropertyTweener}. Tweens `property` of `object` to `final_val` over `duration` seconds. */
  tween_property<T>(object: GodotObject, property: string, final_val: T, duration: float): PropertyTweener;
}
