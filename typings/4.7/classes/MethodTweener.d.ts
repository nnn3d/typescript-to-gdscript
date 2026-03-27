// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Interpolates an abstract value and supplies it to a method called over time. */
declare class MethodTweener extends Tweener {
  /**
   * Sets the time in seconds after which the {@link MethodTweener} will start interpolating. By default there's no delay.
   */
  set_delay(delay: float): MethodTweener;
  /**
   * Sets the type of used easing from {@link Tween.EaseType}. If not set, the default easing is used from the {@link Tween} that contains this Tweener.
   */
  set_ease(ease: int): MethodTweener;
  /**
   * Sets the type of used transition from {@link Tween.TransitionType}. If not set, the default transition is used from the {@link Tween} that contains this Tweener.
   */
  set_trans(trans: int): MethodTweener;
}
