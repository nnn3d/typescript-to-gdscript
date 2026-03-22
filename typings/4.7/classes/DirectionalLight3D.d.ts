// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Directional light from a distance, as from the Sun. */
declare class DirectionalLight3D extends Light3D {
  /**
   * If `true`, shadow detail is sacrificed in exchange for smoother transitions between splits. Enabling shadow blend splitting also has a moderate performance cost. This is ignored when {@link directional_shadow_mode} is {@link SHADOW_ORTHOGONAL}.
   */
  directional_shadow_blend_splits: boolean;
  /**
   * Proportion of {@link directional_shadow_max_distance} at which point the shadow starts to fade. At {@link directional_shadow_max_distance}, the shadow will disappear. The default value is a balance between smooth fading and distant shadow visibility. If the camera moves fast and the {@link directional_shadow_max_distance} is low, consider lowering {@link directional_shadow_fade_start} below `0.8` to make shadow transitions less noticeable. On the other hand, if you tuned {@link directional_shadow_max_distance} to cover the entire scene, you can set {@link directional_shadow_fade_start} to `1.0` to prevent the shadow from fading in the distance (it will suddenly cut off instead).
   */
  directional_shadow_fade_start: float;
  /**
   * The maximum distance for shadow splits. Increasing this value will make directional shadows visible from further away, at the cost of lower overall shadow detail and performance (since more objects need to be included in the directional shadow rendering).
   */
  directional_shadow_max_distance: float;
  /** The light's shadow rendering algorithm. */
  directional_shadow_mode: int;
  /**
   * Sets the size of the directional shadow pancake. The pancake offsets the start of the shadow's camera frustum to provide a higher effective depth resolution for the shadow. However, a high pancake size can cause artifacts in the shadows of large objects that are close to the edge of the frustum. Reducing the pancake size can help. Setting the size to `0` turns off the pancaking effect.
   */
  directional_shadow_pancake_size: float;
  /**
   * The distance from camera to shadow split 1. Relative to {@link directional_shadow_max_distance}. Only used when {@link directional_shadow_mode} is {@link SHADOW_PARALLEL_2_SPLITS} or {@link SHADOW_PARALLEL_4_SPLITS}.
   */
  directional_shadow_split_1: float;
  /**
   * The distance from shadow split 1 to split 2. Relative to {@link directional_shadow_max_distance}. Only used when {@link directional_shadow_mode} is {@link SHADOW_PARALLEL_4_SPLITS}.
   */
  directional_shadow_split_2: float;
  /**
   * The distance from shadow split 2 to split 3. Relative to {@link directional_shadow_max_distance}. Only used when {@link directional_shadow_mode} is {@link SHADOW_PARALLEL_4_SPLITS}.
   */
  directional_shadow_split_3: float;
  /**
   * Whether this {@link DirectionalLight3D} is visible in the sky, in the scene, or both in the sky and in the scene.
   */
  sky_mode: int;
  set_blend_splits(value: boolean): void;
  is_blend_splits_enabled(): boolean;
  set_shadow_mode(value: int): void;
  get_shadow_mode(): int;
  set_sky_mode(value: int): void;
  get_sky_mode(): int;

  // enum ShadowMode
  /**
   * Renders the entire scene's shadow map from an orthogonal point of view. This is the fastest directional shadow mode. May result in blurrier shadows on close objects.
   */
  static readonly SHADOW_ORTHOGONAL: int;
  /**
   * Splits the view frustum in 2 areas, each with its own shadow map. This shadow mode is a compromise between {@link SHADOW_ORTHOGONAL} and {@link SHADOW_PARALLEL_4_SPLITS} in terms of performance.
   */
  static readonly SHADOW_PARALLEL_2_SPLITS: int;
  /**
   * Splits the view frustum in 4 areas, each with its own shadow map. This is the slowest directional shadow mode.
   */
  static readonly SHADOW_PARALLEL_4_SPLITS: int;
  // enum SkyMode
  /** Makes the light visible in both scene lighting and sky rendering. */
  static readonly SKY_MODE_LIGHT_AND_SKY: int;
  /**
   * Makes the light visible in scene lighting only (including direct lighting and global illumination). When using this mode, the light will not be visible from sky shaders.
   */
  static readonly SKY_MODE_LIGHT_ONLY: int;
  /**
   * Makes the light visible to sky shaders only. When using this mode the light will not cast light into the scene (either through direct lighting or through global illumination), but can be accessed through sky shaders. This can be useful, for example, when you want to control sky effects without illuminating the scene (during a night cycle, for example).
   */
  static readonly SKY_MODE_SKY_ONLY: int;
}
