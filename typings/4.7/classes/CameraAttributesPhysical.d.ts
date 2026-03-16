// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Physically-based camera settings. */
declare class CameraAttributesPhysical extends CameraAttributes {
  /**
   * The maximum luminance (in EV100) used when calculating auto exposure. When calculating scene average luminance, color values will be clamped to at least this value. This limits the auto-exposure from exposing below a certain brightness, resulting in a cut off point where the scene will remain bright.
   */
  auto_exposure_max_exposure_value: float;
  /**
   * The minimum luminance (in EV100) used when calculating auto exposure. When calculating scene average luminance, color values will be clamped to at least this value. This limits the auto-exposure from exposing above a certain brightness, resulting in a cut off point where the scene will remain dark.
   */
  auto_exposure_min_exposure_value: float;
  /**
   * Size of the aperture of the camera, measured in f-stops. An f-stop is a unitless ratio between the focal length of the camera and the diameter of the aperture. A high aperture setting will result in a smaller aperture which leads to a dimmer image and sharper focus. A low aperture results in a wide aperture which lets in more light resulting in a brighter, less-focused image. Default is appropriate for outdoors at daytime (i.e. for use with a default {@link DirectionalLight3D}), for indoor lighting, a value between 2 and 4 is more appropriate.
   * Only available when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is enabled.
   */
  exposure_aperture: float;
  /**
   * Time for shutter to open and close, evaluated as `1 / shutter_speed` seconds. A higher value will allow less light (leading to a darker image), while a lower value will allow more light (leading to a brighter image).
   * Only available when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is enabled.
   */
  exposure_shutter_speed: float;
  /**
   * Override value for {@link Camera3D.far}. Used internally when calculating depth of field. When attached to a {@link Camera3D} as its {@link Camera3D.attributes}, it will override the {@link Camera3D.far} property.
   */
  frustum_far: float;
  /**
   * Distance between camera lens and camera aperture, measured in millimeters. Controls field of view and depth of field. A larger focal length will result in a smaller field of view and a narrower depth of field meaning fewer objects will be in focus. A smaller focal length will result in a wider field of view and a larger depth of field meaning more objects will be in focus. When attached to a {@link Camera3D} as its {@link Camera3D.attributes}, it will override the {@link Camera3D.fov} property and the {@link Camera3D.keep_aspect} property.
   */
  frustum_focal_length: float;
  /**
   * Distance from camera of object that will be in focus, measured in meters. Internally this will be clamped to be at least 1 millimeter larger than {@link frustum_focal_length}.
   */
  frustum_focus_distance: float;
  /**
   * Override value for {@link Camera3D.near}. Used internally when calculating depth of field. When attached to a {@link Camera3D} as its {@link Camera3D.attributes}, it will override the {@link Camera3D.near} property.
   */
  frustum_near: float;

  /**
   * Returns the vertical field of view that corresponds to the {@link frustum_focal_length}. This value is calculated internally whenever {@link frustum_focal_length} is changed.
   */
  get_fov(): float;
}
