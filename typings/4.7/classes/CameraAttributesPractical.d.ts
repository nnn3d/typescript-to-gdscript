// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Camera settings in an easy to use format. */
declare class CameraAttributesPractical extends CameraAttributes {
  /**
   * The maximum sensitivity (in ISO) used when calculating auto exposure. When calculating scene average luminance, color values will be clamped to at least this value. This limits the auto-exposure from exposing below a certain brightness, resulting in a cut off point where the scene will remain bright.
   */
  auto_exposure_max_sensitivity: float;
  /**
   * The minimum sensitivity (in ISO) used when calculating auto exposure. When calculating scene average luminance, color values will be clamped to at least this value. This limits the auto-exposure from exposing above a certain brightness, resulting in a cut off point where the scene will remain dark.
   */
  auto_exposure_min_sensitivity: float;
  /**
   * Sets the maximum amount of blur. When using physically-based blur amounts, will instead act as a multiplier. High values lead to an increased amount of blurriness, but can be much more expensive to calculate. It is best to keep this as low as possible for a given art style.
   */
  dof_blur_amount: float;
  /**
   * Objects further from the {@link Camera3D} by this amount will be blurred by the depth of field effect. Measured in meters.
   */
  dof_blur_far_distance: float;
  /**
   * Enables depth of field blur for objects further than {@link dof_blur_far_distance}. Strength of blur is controlled by {@link dof_blur_amount} and modulated by {@link dof_blur_far_transition}.
   * **Note:** Depth of field blur is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** Depth of field blur is not supported on viewports that have a transparent background (where {@link Viewport.transparent_bg} is `true`).
   */
  dof_blur_far_enabled: boolean;
  /**
   * When positive, distance over which (starting from {@link dof_blur_far_distance}) blur effect will scale from 0 to {@link dof_blur_amount}. When negative, uses physically-based scaling so depth of field effect will scale from 0 at {@link dof_blur_far_distance} and will increase in a physically accurate way as objects get further from the {@link Camera3D}.
   */
  dof_blur_far_transition: float;
  /**
   * Objects closer from the {@link Camera3D} by this amount will be blurred by the depth of field effect. Measured in meters.
   */
  dof_blur_near_distance: float;
  /**
   * Enables depth of field blur for objects closer than {@link dof_blur_near_distance}. Strength of blur is controlled by {@link dof_blur_amount} and modulated by {@link dof_blur_near_transition}.
   * **Note:** Depth of field blur is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** Depth of field blur is not supported on viewports that have a transparent background (where {@link Viewport.transparent_bg} is `true`).
   */
  dof_blur_near_enabled: boolean;
  /**
   * When positive, distance over which blur effect will scale from 0 to {@link dof_blur_amount}, ending at {@link dof_blur_near_distance}. When negative, uses physically-based scaling so depth of field effect will scale from 0 at {@link dof_blur_near_distance} and will increase in a physically accurate way as objects get closer to the {@link Camera3D}.
   */
  dof_blur_near_transition: float;
  set_auto_exposure_max_sensitivity(value: float): void;
  get_auto_exposure_max_sensitivity(): float;
  set_auto_exposure_min_sensitivity(value: float): void;
  get_auto_exposure_min_sensitivity(): float;
  set_dof_blur_amount(value: float): void;
  get_dof_blur_amount(): float;
  set_dof_blur_far_distance(value: float): void;
  get_dof_blur_far_distance(): float;
  set_dof_blur_far_enabled(value: boolean): void;
  is_dof_blur_far_enabled(): boolean;
  set_dof_blur_far_transition(value: float): void;
  get_dof_blur_far_transition(): float;
  set_dof_blur_near_distance(value: float): void;
  get_dof_blur_near_distance(): float;
  set_dof_blur_near_enabled(value: boolean): void;
  is_dof_blur_near_enabled(): boolean;
  set_dof_blur_near_transition(value: float): void;
  get_dof_blur_near_transition(): float;
}
