// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Camera node, displays from a point of view. */
declare class Camera3D extends Node3D {
  /** The {@link CameraAttributes} to use for this camera. */
  attributes: CameraAttributes | null;
  /** The {@link Compositor} to use for this camera. */
  compositor: Compositor | null;
  /**
   * The culling mask that describes which {@link VisualInstance3D.layers} are rendered by this camera. By default, all 20 user-visible layers are rendered.
   * **Note:** Since the {@link cull_mask} allows for 32 layers to be stored in total, there are an additional 12 layers that are only used internally by the engine and aren't exposed in the editor. Setting {@link cull_mask} using a script allows you to toggle those reserved layers, which can be useful for editor plugins.
   * To adjust {@link cull_mask} more easily using a script, use {@link get_cull_mask_value} and {@link set_cull_mask_value}.
   * **Note:** {@link VoxelGI}, SDFGI and {@link LightmapGI} will always take all layers into account to determine what contributes to global illumination. If this is an issue, set {@link GeometryInstance3D.gi_mode} to {@link GeometryInstance3D.GI_MODE_DISABLED} for meshes and {@link Light3D.light_bake_mode} to {@link Light3D.BAKE_DISABLED} for lights to exclude them from global illumination.
   */
  cull_mask: int;
  /**
   * If `true`, the ancestor {@link Viewport} is currently using this camera.
   * If multiple cameras are in the scene, one will always be made current. For example, if two {@link Camera3D} nodes are present in the scene and only one is current, setting one camera's {@link current} to `false` will cause the other camera to be made current.
   */
  current: boolean;
  /**
   * If not {@link DOPPLER_TRACKING_DISABLED}, this camera will simulate the Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) for objects changed in particular `_process` methods.
   * **Note:** The Doppler effect will only be heard on {@link AudioStreamPlayer3D}s if {@link AudioStreamPlayer3D.doppler_tracking} is not set to {@link AudioStreamPlayer3D.DOPPLER_TRACKING_DISABLED}.
   */
  doppler_tracking: int;
  /** The {@link Environment} to use for this camera. */
  environment: Environment | null;
  /**
   * The distance to the far culling boundary for this camera relative to its local Z axis. Higher values allow the camera to see further away, while decreasing {@link far} can improve performance if it results in objects being partially or fully culled.
   */
  far: float;
  /**
   * The camera's field of view angle (in degrees). Only applicable in perspective mode. Since {@link keep_aspect} locks one axis, {@link fov} sets the other axis' field of view angle.
   * For reference, the default vertical field of view value (`75.0`) is equivalent to a horizontal FOV of:
   * - ~91.31 degrees in a 4:3 viewport
   * - ~101.67 degrees in a 16:10 viewport
   * - ~107.51 degrees in a 16:9 viewport
   * - ~121.63 degrees in a 21:9 viewport
   */
  fov: float;
  /**
   * The camera's frustum offset. This can be changed from the default to create "tilted frustum" effects such as Y-shearing (https://zdoom.org/wiki/Y-shearing).
   * **Note:** Only effective if {@link projection} is {@link PROJECTION_FRUSTUM}.
   */
  frustum_offset: Vector2;
  /** The horizontal (X) offset of the camera viewport. */
  h_offset: float;
  /**
   * The axis to lock during {@link fov}/{@link size} adjustments. Can be either {@link KEEP_WIDTH} or {@link KEEP_HEIGHT}.
   */
  keep_aspect: int;
  /**
   * The distance to the near culling boundary for this camera relative to its local Z axis. Lower values allow the camera to see objects more up close to its origin, at the cost of lower precision across the *entire* range. Values lower than the default can lead to increased Z-fighting.
   */
  near: float;
  /**
   * The camera's projection mode. In {@link PROJECTION_PERSPECTIVE} mode, objects' Z distance from the camera's local space scales their perceived size.
   */
  projection: int;
  /**
   * The camera's size in meters measured as the diameter of the width or height, depending on {@link keep_aspect}. Only applicable in orthogonal and frustum modes.
   */
  size: float;
  /** The vertical (Y) offset of the camera viewport. */
  v_offset: float;
  set_attributes(value: CameraAttributes | null): void;
  get_attributes(): CameraAttributes | null;
  set_compositor(value: Compositor | null): void;
  get_compositor(): Compositor | null;
  set_cull_mask(value: int): void;
  get_cull_mask(): int;
  set_current(value: boolean): void;
  is_current(): boolean;
  set_doppler_tracking(value: int): void;
  get_doppler_tracking(): int;
  set_environment(value: Environment | null): void;
  get_environment(): Environment | null;
  set_far(value: float): void;
  get_far(): float;
  set_fov(value: float): void;
  get_fov(): float;
  set_frustum_offset(value: Vector2 | Vector2i): void;
  get_frustum_offset(): Vector2;
  set_h_offset(value: float): void;
  get_h_offset(): float;
  set_keep_aspect_mode(value: int): void;
  get_keep_aspect_mode(): int;
  set_near(value: float): void;
  get_near(): float;
  set_projection(value: int): void;
  get_projection(): int;
  set_size(value: float): void;
  get_size(): float;
  set_v_offset(value: float): void;
  get_v_offset(): float;

  /**
   * If this is the current camera, remove it from being current. If `enable_next` is `true`, request to make the next camera current, if any.
   */
  clear_current(enable_next?: boolean): void;
  /**
   * Returns the projection matrix that this camera uses to render to its associated viewport. The camera must be part of the scene tree to function.
   */
  get_camera_projection(): Projection;
  /** Returns the camera's RID from the {@link RenderingServer}. */
  get_camera_rid(): RID;
  /**
   * Returns the transform of the camera plus the vertical ({@link v_offset}) and horizontal ({@link h_offset}) offsets; and any other adjustments made to the position and orientation of the camera by subclassed cameras such as {@link XRCamera3D}.
   */
  get_camera_transform(): Transform3D;
  /**
   * Returns whether or not the specified layer of the {@link cull_mask} is enabled, given a `layer_number` between 1 and 20.
   */
  get_cull_mask_value(layer_number: int): boolean;
  /**
   * Returns the camera's frustum planes in world space units as an array of {@link Plane}s in the following order: near, far, left, top, right, bottom. Not to be confused with {@link frustum_offset}.
   */
  get_frustum(): Array<Plane>;
  /**
   * Returns the RID of a pyramid shape encompassing the camera's view frustum, ignoring the camera's near plane. The tip of the pyramid represents the position of the camera.
   */
  get_pyramid_shape_rid(): RID;
  /**
   * Returns `true` if the given position is behind the camera (the blue part of the linked diagram). See this diagram (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/camera3d_position_frustum.png) for an overview of position query methods.
   * **Note:** A position which returns `false` may still be outside the camera's field of view.
   */
  is_position_behind(world_point: Vector3 | Vector3i): boolean;
  /**
   * Returns `true` if the given position is inside the camera's frustum (the green part of the linked diagram). See this diagram (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/camera3d_position_frustum.png) for an overview of position query methods.
   */
  is_position_in_frustum(world_point: Vector3 | Vector3i): boolean;
  /**
   * Makes this camera the current camera for the {@link Viewport} (see class description). If the camera node is outside the scene tree, it will attempt to become current once it's added.
   */
  make_current(): void;
  /**
   * Returns a normal vector from the screen point location directed along the camera. Orthogonal cameras are normalized. Perspective cameras account for perspective, screen width/height, etc.
   */
  project_local_ray_normal(screen_point: Vector2 | Vector2i): Vector3;
  /**
   * Returns the 3D point in world space that maps to the given 2D coordinate in the {@link Viewport} rectangle on a plane that is the given `z_depth` distance into the scene away from the camera.
   */
  project_position(screen_point: Vector2 | Vector2i, z_depth: float): Vector3;
  /**
   * Returns a normal vector in world space, that is the result of projecting a point on the {@link Viewport} rectangle by the inverse camera projection. This is useful for casting rays in the form of (origin, normal) for object intersection or picking.
   */
  project_ray_normal(screen_point: Vector2 | Vector2i): Vector3;
  /**
   * Returns a 3D position in world space, that is the result of projecting a point on the {@link Viewport} rectangle by the inverse camera projection. This is useful for casting rays in the form of (origin, normal) for object intersection or picking.
   */
  project_ray_origin(screen_point: Vector2 | Vector2i): Vector3;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link cull_mask}, given a `layer_number` between 1 and 20.
   */
  set_cull_mask_value(layer_number: int, value: boolean): void;
  /**
   * Sets the camera projection to frustum mode (see {@link PROJECTION_FRUSTUM}), by specifying a `size`, an `offset`, and the `z_near` and `z_far` clip planes in world space units. See also {@link frustum_offset}.
   */
  set_frustum(size: float, offset: Vector2 | Vector2i, z_near: float, z_far: float): void;
  /**
   * Sets the camera projection to orthogonal mode (see {@link PROJECTION_ORTHOGONAL}), by specifying a `size`, and the `z_near` and `z_far` clip planes in world space units.
   * As a hint, 3D games that look 2D often use this projection, with `size` specified in pixels.
   */
  set_orthogonal(size: float, z_near: float, z_far: float): void;
  /**
   * Sets the camera projection to perspective mode (see {@link PROJECTION_PERSPECTIVE}), by specifying a `fov` (field of view) angle in degrees, and the `z_near` and `z_far` clip planes in world space units.
   */
  set_perspective(fov: float, z_near: float, z_far: float): void;
  /**
   * Returns the 2D coordinate in the {@link Viewport} rectangle that maps to the given 3D point in world space.
   * **Note:** When using this to position GUI elements over a 3D viewport, use {@link is_position_behind} to prevent them from appearing if the 3D point is behind the camera:
   */
  unproject_position(world_point: Vector3 | Vector3i): Vector2;

  // enum ProjectionType
  /** Perspective projection. Objects on the screen becomes smaller when they are far away. */
  static readonly PROJECTION_PERSPECTIVE: int;
  /**
   * Orthogonal projection, also known as orthographic projection. Objects remain the same size on the screen no matter how far away they are.
   */
  static readonly PROJECTION_ORTHOGONAL: int;
  /**
   * Frustum projection. This mode allows adjusting {@link frustum_offset} to create "tilted frustum" effects.
   */
  static readonly PROJECTION_FRUSTUM: int;
  // enum KeepAspect
  /**
   * Preserves the horizontal aspect ratio; also known as Vert- scaling. This is usually the best option for projects running in portrait mode, as taller aspect ratios will benefit from a wider vertical FOV.
   */
  static readonly KEEP_WIDTH: int;
  /**
   * Preserves the vertical aspect ratio; also known as Hor+ scaling. This is usually the best option for projects running in landscape mode, as wider aspect ratios will automatically benefit from a wider horizontal FOV.
   */
  static readonly KEEP_HEIGHT: int;
  // enum DopplerTracking
  /** Disables Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) simulation (default). */
  static readonly DOPPLER_TRACKING_DISABLED: int;
  /**
   * Simulate Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) by tracking positions of objects that are changed in `_process`. Changes in the relative velocity of this camera compared to those objects affect how audio is perceived (changing the audio's {@link AudioStreamPlayer3D.pitch_scale}).
   */
  static readonly DOPPLER_TRACKING_IDLE_STEP: int;
  /**
   * Simulate Doppler effect (https://en.wikipedia.org/wiki/Doppler_effect) by tracking positions of objects that are changed in `_physics_process`. Changes in the relative velocity of this camera compared to those objects affect how audio is perceived (changing the audio's {@link AudioStreamPlayer3D.pitch_scale}).
   */
  static readonly DOPPLER_TRACKING_PHYSICS_STEP: int;
}
