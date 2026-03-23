/**
 * Override: Tween — typed callbacks and tween_method generic.
 */
declare class Tween {
  tween_callback(callback: () => void): CallbackTweener;
  tween_method<T>(
    method: (value: T) => void,
    from_: T,
    to: T,
    duration: float,
  ): MethodTweener;
  tween_property<T>(
    object: GodotObject,
    property: string,
    final_val: T,
    duration: float,
  ): PropertyTweener;
}
