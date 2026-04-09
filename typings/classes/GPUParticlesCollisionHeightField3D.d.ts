// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A real-time heightmap-shaped 3D particle collision shape affecting {@link GPUParticles3D} nodes. */
declare class GPUParticlesCollisionHeightField3D extends GPUParticlesCollision3D {
  /**
   * If `true`, the {@link GPUParticlesCollisionHeightField3D} will follow the current camera in global space. The {@link GPUParticlesCollisionHeightField3D} does not need to be a child of the {@link Camera3D} node for this to work.
   * Following the camera has a performance cost, as it will force the heightmap to update whenever the camera moves. Consider lowering {@link resolution} to improve performance if {@link follow_camera_enabled} is `true`.
   */
  follow_camera_enabled: boolean;
  /**
   * The visual layers to account for when updating the heightmap. Only {@link MeshInstance3D}s whose {@link VisualInstance3D.layers} match with this {@link heightfield_mask} will be included in the heightmap collision update. By default, all 20 user-visible layers are taken into account for updating the heightmap collision.
   * **Note:** Since the {@link heightfield_mask} allows for 32 layers to be stored in total, there are an additional 12 layers that are only used internally by the engine and aren't exposed in the editor. Setting {@link heightfield_mask} using a script allows you to toggle those reserved layers, which can be useful for editor plugins.
   * To adjust {@link heightfield_mask} more easily using a script, use {@link get_heightfield_mask_value} and {@link set_heightfield_mask_value}.
   */
  heightfield_mask: int;
  /**
   * Higher resolutions can represent small details more accurately in large scenes, at the cost of lower performance. If {@link update_mode} is {@link UPDATE_MODE_ALWAYS}, consider using the lowest resolution possible.
   */
  resolution: int;
  /**
   * The collision heightmap's size in 3D units. To improve heightmap quality, {@link size} should be set as small as possible while covering the parts of the scene you need.
   */
  size: Vector3;
  /** The update policy to use for the generated heightmap. */
  update_mode: int;
  set_follow_camera_enabled(value: boolean): void;
  is_follow_camera_enabled(): boolean;
  set_heightfield_mask(value: int): void;
  get_heightfield_mask(): int;
  set_resolution(value: int): void;
  get_resolution(): int;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;
  set_update_mode(value: int): void;
  get_update_mode(): int;

  /**
   * Returns `true` if the specified layer of the {@link heightfield_mask} is enabled, given a `layer_number` between `1` and `20`, inclusive.
   */
  get_heightfield_mask_value(layer_number: int): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link heightfield_mask}, given a `layer_number` between `1` and `20`, inclusive.
   */
  set_heightfield_mask_value(layer_number: int, value: boolean): void;

  // enum Resolution
  /**
   * Generate a 256×256 heightmap. Intended for small-scale scenes, or larger scenes with no distant particles.
   */
  static readonly RESOLUTION_256: int;
  /**
   * Generate a 512×512 heightmap. Intended for medium-scale scenes, or larger scenes with no distant particles.
   */
  static readonly RESOLUTION_512: int;
  /** Generate a 1024×1024 heightmap. Intended for large scenes with distant particles. */
  static readonly RESOLUTION_1024: int;
  /** Generate a 2048×2048 heightmap. Intended for very large scenes with distant particles. */
  static readonly RESOLUTION_2048: int;
  /** Generate a 4096×4096 heightmap. Intended for huge scenes with distant particles. */
  static readonly RESOLUTION_4096: int;
  /** Generate a 8192×8192 heightmap. Intended for gigantic scenes with distant particles. */
  static readonly RESOLUTION_8192: int;
  /** Represents the size of the {@link Resolution} enum. */
  static readonly RESOLUTION_MAX: int;
  // enum UpdateMode
  /**
   * Only update the heightmap when the {@link GPUParticlesCollisionHeightField3D} node is moved, or when the camera moves if {@link follow_camera_enabled} is `true`. An update can be forced by slightly moving the {@link GPUParticlesCollisionHeightField3D} in any direction, or by calling {@link RenderingServer.particles_collision_height_field_update}.
   */
  static readonly UPDATE_MODE_WHEN_MOVED: int;
  /**
   * Update the heightmap every frame. This has a significant performance cost. This update should only be used when geometry that particles can collide with changes significantly during gameplay.
   */
  static readonly UPDATE_MODE_ALWAYS: int;
}
