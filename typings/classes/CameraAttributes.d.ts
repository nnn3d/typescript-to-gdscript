// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Parent class for camera settings. */
declare class CameraAttributes extends Resource {
  /**
   * If `true`, enables the tonemapping auto exposure mode of the scene renderer. If `true`, the renderer will automatically determine the exposure setting to adapt to the scene's illumination and the observed light.
   * **Note:** Auto-exposure is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   */
  auto_exposure_enabled: boolean;
  /** The scale of the auto exposure effect. Affects the intensity of auto exposure. */
  auto_exposure_scale: float;
  /**
   * The speed of the auto exposure effect. Affects the time needed for the camera to perform auto exposure.
   */
  auto_exposure_speed: float;
  /** Multiplier for the exposure amount. A higher value results in a brighter image. */
  exposure_multiplier: float;
  /**
   * Sensitivity of camera sensors, measured in ISO. A higher sensitivity results in a brighter image.
   * If {@link auto_exposure_enabled} is `true`, this can be used as a method of exposure compensation, doubling the value will increase the exposure value (measured in EV100) by 1 stop.
   * **Note:** Only available when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is enabled.
   */
  exposure_sensitivity: float;
  set_auto_exposure_enabled(value: boolean): void;
  is_auto_exposure_enabled(): boolean;
  set_auto_exposure_scale(value: float): void;
  get_auto_exposure_scale(): float;
  set_auto_exposure_speed(value: float): void;
  get_auto_exposure_speed(): float;
  set_exposure_multiplier(value: float): void;
  get_exposure_multiplier(): float;
  set_exposure_sensitivity(value: float): void;
  get_exposure_sensitivity(): float;
}
