// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Captures its surroundings to create fast, accurate reflections from a given point. */
declare class ReflectionProbe<Tree extends object = any> extends VisualInstance3D<Tree> {
  /**
   * The custom ambient color to use within the {@link ReflectionProbe}'s box defined by its {@link size}. Only effective if {@link ambient_mode} is {@link AMBIENT_COLOR}.
   */
  ambient_color: Color;
  /**
   * The custom ambient color energy to use within the {@link ReflectionProbe}'s box defined by its {@link size}. Only effective if {@link ambient_mode} is {@link AMBIENT_COLOR}.
   */
  ambient_color_energy: float;
  /**
   * The ambient color to use within the {@link ReflectionProbe}'s box defined by its {@link size}. The ambient color will smoothly blend with other {@link ReflectionProbe}s and the rest of the scene (outside the {@link ReflectionProbe}'s box defined by its {@link size}).
   */
  ambient_mode: int;
  /** Defines the distance in meters over which a probe blends into the scene. */
  blend_distance: float;
  /**
   * If `true`, enables box projection. This makes reflections look more correct in rectangle-shaped rooms by offsetting the reflection center depending on the camera's location.
   * **Note:** To better fit rectangle-shaped rooms that are not aligned to the grid, you can rotate the {@link ReflectionProbe} node.
   */
  box_projection: boolean;
  /**
   * Sets the cull mask which determines what objects are drawn by this probe. Every {@link VisualInstance3D} with a layer included in this cull mask will be rendered by the probe. It is best to only include large objects which are likely to take up a lot of space in the reflection in order to save on rendering cost.
   * This can also be used to prevent an object from reflecting upon itself (for instance, a {@link ReflectionProbe} centered on a vehicle).
   */
  cull_mask: int;
  /**
   * If `true`, computes shadows in the reflection probe. This makes the reflection probe slower to render; you may want to disable this if using the {@link UPDATE_ALWAYS} {@link update_mode}.
   */
  enable_shadows: boolean;
  /** Defines the reflection intensity. Intensity modulates the strength of the reflection. */
  intensity: float;
  /** If `true`, reflections will ignore sky contribution. */
  interior: boolean;
  /**
   * The maximum distance away from the {@link ReflectionProbe} an object can be before it is culled. Decrease this to improve performance, especially when using the {@link UPDATE_ALWAYS} {@link update_mode}.
   * **Note:** The maximum reflection distance is always at least equal to the probe's extents. This means that decreasing {@link max_distance} will not always cull objects from reflections, especially if the reflection probe's box defined by its {@link size} is already large.
   */
  max_distance: float;
  /**
   * The automatic LOD bias to use for meshes rendered within the {@link ReflectionProbe} (this is analog to {@link Viewport.mesh_lod_threshold}). Higher values will use less detailed versions of meshes that have LOD variations generated. If set to `0.0`, automatic LOD is disabled. Increase {@link mesh_lod_threshold} to improve performance at the cost of geometry detail, especially when using the {@link UPDATE_ALWAYS} {@link update_mode}.
   * **Note:** {@link mesh_lod_threshold} does not affect {@link GeometryInstance3D} visibility ranges (also known as "manual" LOD or hierarchical LOD).
   */
  mesh_lod_threshold: float;
  /**
   * Sets the origin offset to be used when this {@link ReflectionProbe} is in {@link box_projection} mode. This can be set to a non-zero value to ensure a reflection fits a rectangle-shaped room, while reducing the number of objects that "get in the way" of the reflection.
   */
  origin_offset: Vector3;
  /**
   * Sets the reflection mask which determines what objects have reflections applied from this probe. Every {@link VisualInstance3D} with a layer included in this reflection mask will have reflections applied from this probe. See also {@link cull_mask}, which can be used to exclude objects from appearing in the reflection while still making them affected by the {@link ReflectionProbe}.
   */
  reflection_mask: int;
  /**
   * The size of the reflection probe. The larger the size, the more space covered by the probe, which will lower the perceived resolution. It is best to keep the size only as large as you need it.
   * **Note:** To better fit areas that are not aligned to the grid, you can rotate the {@link ReflectionProbe} node.
   */
  size: Vector3;
  /**
   * Sets how frequently the {@link ReflectionProbe} is updated. Can be {@link UPDATE_ONCE} or {@link UPDATE_ALWAYS}.
   */
  update_mode: int;
  set_ambient_color(value: Color): void;
  get_ambient_color(): Color;
  set_ambient_color_energy(value: float): void;
  get_ambient_color_energy(): float;
  set_ambient_mode(value: int): void;
  get_ambient_mode(): int;
  set_blend_distance(value: float): void;
  get_blend_distance(): float;
  set_enable_box_projection(value: boolean): void;
  is_box_projection_enabled(): boolean;
  set_cull_mask(value: int): void;
  get_cull_mask(): int;
  set_enable_shadows(value: boolean): void;
  are_shadows_enabled(): boolean;
  set_intensity(value: float): void;
  get_intensity(): float;
  set_as_interior(value: boolean): void;
  is_set_as_interior(): boolean;
  set_max_distance(value: float): void;
  get_max_distance(): float;
  set_mesh_lod_threshold(value: float): void;
  get_mesh_lod_threshold(): float;
  set_origin_offset(value: Vector3): void;
  get_origin_offset(): Vector3;
  set_reflection_mask(value: int): void;
  get_reflection_mask(): int;
  set_size(value: Vector3): void;
  get_size(): Vector3;
  set_update_mode(value: int): void;
  get_update_mode(): int;

  // enum UpdateMode
  /**
   * Update the probe once on the next frame (recommended for most objects). The corresponding radiance map will be generated over the following six frames. This takes more time to update than {@link UPDATE_ALWAYS}, but it has a lower performance cost and can result in higher-quality reflections. The ReflectionProbe is updated when its transform changes, but not when nearby geometry changes. You can force a {@link ReflectionProbe} update by moving the {@link ReflectionProbe} slightly in any direction.
   */
  static readonly UPDATE_ONCE: int;
  /**
   * Update the probe every frame. This provides better results for fast-moving dynamic objects (such as cars). However, it has a significant performance cost. Due to the cost, it's recommended to only use one ReflectionProbe with {@link UPDATE_ALWAYS} at most per scene. For all other use cases, use {@link UPDATE_ONCE}.
   */
  static readonly UPDATE_ALWAYS: int;
  // enum AmbientMode
  /**
   * Do not apply any ambient lighting inside the {@link ReflectionProbe}'s box defined by its {@link size}.
   */
  static readonly AMBIENT_DISABLED: int;
  /**
   * Apply automatically-sourced environment lighting inside the {@link ReflectionProbe}'s box defined by its {@link size}.
   */
  static readonly AMBIENT_ENVIRONMENT: int;
  /**
   * Apply custom ambient lighting inside the {@link ReflectionProbe}'s box defined by its {@link size}. See {@link ambient_color} and {@link ambient_color_energy}.
   */
  static readonly AMBIENT_COLOR: int;
}
