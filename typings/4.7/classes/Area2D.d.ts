// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A region of 2D space that detects other {@link CollisionObject2D}s entering or exiting it. */
declare class Area2D extends CollisionObject2D {
  /**
   * The rate at which objects stop spinning in this area. Represents the angular velocity lost per second.
   * See {@link ProjectSettings.physics/2d/default_angular_damp} for more details about damping.
   */
  angular_damp: float;
  /** Override mode for angular damping calculations within this area. */
  angular_damp_space_override: int;
  /** The name of the area's audio bus. */
  audio_bus_name: string;
  /** If `true`, the area's audio bus overrides the default audio bus. */
  audio_bus_override: boolean;
  /**
   * The area's gravity intensity (in pixels per second squared). This value multiplies the gravity direction. This is useful to alter the force of gravity without altering its direction.
   */
  gravity: float;
  /** The area's gravity vector (not normalized). */
  gravity_direction: Vector2;
  /**
   * If `true`, gravity is calculated from a point (set via {@link gravity_point_center}). See also {@link gravity_space_override}.
   */
  gravity_point: boolean;
  /** If gravity is a point (see {@link gravity_point}), this will be the point of attraction. */
  gravity_point_center: Vector2;
  /**
   * The distance at which the gravity strength is equal to {@link gravity}. For example, on a planet 100 pixels in radius with a surface gravity of 4.0 px/s², set the {@link gravity} to 4.0 and the unit distance to 100.0. The gravity will have falloff according to the inverse square law, so in the example, at 200 pixels from the center the gravity will be 1.0 px/s² (twice the distance, 1/4th the gravity), at 50 pixels it will be 16.0 px/s² (half the distance, 4x the gravity), and so on.
   * The above is true only when the unit distance is a positive number. When this is set to 0.0, the gravity will be constant regardless of distance.
   */
  gravity_point_unit_distance: float;
  /** Override mode for gravity calculations within this area. */
  gravity_space_override: int;
  /**
   * The rate at which objects stop moving in this area. Represents the linear velocity lost per second.
   * See {@link ProjectSettings.physics/2d/default_linear_damp} for more details about damping.
   */
  linear_damp: float;
  /** Override mode for linear damping calculations within this area. */
  linear_damp_space_override: int;
  /** If `true`, other monitoring areas can detect this area. */
  monitorable: boolean;
  /** If `true`, the area detects bodies or areas entering and exiting it. */
  monitoring: boolean;
  /**
   * The area's priority. Higher priority areas are processed first. The {@link World2D}'s physics is always processed last, after all areas.
   */
  priority: int;
  set_angular_damp(value: float): void;
  get_angular_damp(): float;
  set_angular_damp_space_override_mode(value: int): void;
  get_angular_damp_space_override_mode(): int;
  set_audio_bus_name(value: string): void;
  get_audio_bus_name(): string;
  set_audio_bus_override(value: boolean): void;
  is_overriding_audio_bus(): boolean;
  set_gravity(value: float): void;
  get_gravity(): float;
  set_gravity_direction(value: Vector2): void;
  get_gravity_direction(): Vector2;
  set_gravity_is_point(value: boolean): void;
  is_gravity_a_point(): boolean;
  set_gravity_point_center(value: Vector2): void;
  get_gravity_point_center(): Vector2;
  set_gravity_point_unit_distance(value: float): void;
  get_gravity_point_unit_distance(): float;
  set_gravity_space_override_mode(value: int): void;
  get_gravity_space_override_mode(): int;
  set_linear_damp(value: float): void;
  get_linear_damp(): float;
  set_linear_damp_space_override_mode(value: int): void;
  get_linear_damp_space_override_mode(): int;
  set_monitorable(value: boolean): void;
  is_monitorable(): boolean;
  set_monitoring(value: boolean): void;
  is_monitoring(): boolean;
  set_priority(value: int): void;
  get_priority(): int;

  /**
   * Returns a list of intersecting {@link Area2D}s. The overlapping area's {@link CollisionObject2D.collision_layer} must be part of this area's {@link CollisionObject2D.collision_mask} in order to be detected.
   * For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead.
   */
  get_overlapping_areas(): Array<Area2D>;
  /**
   * Returns a list of intersecting {@link PhysicsBody2D}s and {@link TileMap}s. The overlapping body's {@link CollisionObject2D.collision_layer} must be part of this area's {@link CollisionObject2D.collision_mask} in order to be detected.
   * For performance reasons (collisions are all processed at the same time) this list is modified once during the physics step, not immediately after objects are moved. Consider using signals instead.
   */
  get_overlapping_bodies(): Array<Node2D>;
  /**
   * Returns `true` if intersecting any {@link Area2D}s, otherwise returns `false`. The overlapping area's {@link CollisionObject2D.collision_layer} must be part of this area's {@link CollisionObject2D.collision_mask} in order to be detected.
   * For performance reasons (collisions are all processed at the same time) the list of overlapping areas is modified once during the physics step, not immediately after objects are moved. Consider using signals instead.
   */
  has_overlapping_areas(): boolean;
  /**
   * Returns `true` if intersecting any {@link PhysicsBody2D}s or {@link TileMap}s, otherwise returns `false`. The overlapping body's {@link CollisionObject2D.collision_layer} must be part of this area's {@link CollisionObject2D.collision_mask} in order to be detected.
   * For performance reasons (collisions are all processed at the same time) the list of overlapping bodies is modified once during the physics step, not immediately after objects are moved. Consider using signals instead.
   */
  has_overlapping_bodies(): boolean;
  /**
   * Returns `true` if the given {@link Area2D} intersects or overlaps this {@link Area2D}, `false` otherwise.
   * **Note:** The result of this test is not immediate after moving objects. For performance, the list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
   */
  overlaps_area(area: Node): boolean;
  /**
   * Returns `true` if the given physics body intersects or overlaps this {@link Area2D}, `false` otherwise.
   * **Note:** The result of this test is not immediate after moving objects. For performance, list of overlaps is updated once per frame and before the physics step. Consider using signals instead.
   * The `body` argument can either be a {@link PhysicsBody2D} or a {@link TileMap} instance. While TileMaps are not physics bodies themselves, they register their tiles with collision shapes as a virtual physics body.
   */
  overlaps_body(body: Node): boolean;

  /** Emitted when the received `area` enters this area. Requires {@link monitoring} to be set to `true`. */
  area_entered: Signal<[Area2D]>;
  /** Emitted when the received `area` exits this area. Requires {@link monitoring} to be set to `true`. */
  area_exited: Signal<[Area2D]>;
  /**
   * Emitted when a {@link Shape2D} of the received `area` enters a shape of this area. Requires {@link monitoring} to be set to `true`.
   * `local_shape_index` and `area_shape_index` contain indices of the interacting shapes from this area and the other area, respectively. `area_rid` contains the {@link RID} of the other area. These values can be used with the {@link PhysicsServer2D}.
   * **Example:** Get the {@link CollisionShape2D} node from the shape index:
   */
  area_shape_entered: Signal<[RID, Area2D, int, int]>;
  /**
   * Emitted when a {@link Shape2D} of the received `area` exits a shape of this area. Requires {@link monitoring} to be set to `true`.
   * See also {@link area_shape_entered}.
   */
  area_shape_exited: Signal<[RID, Area2D, int, int]>;
  /**
   * Emitted when the received `body` enters this area. `body` can be a {@link PhysicsBody2D} or a {@link TileMap}. {@link TileMap}s are detected if their {@link TileSet} has collision shapes configured. Requires {@link monitoring} to be set to `true`.
   */
  body_entered: Signal<[Node2D]>;
  /**
   * Emitted when the received `body` exits this area. `body` can be a {@link PhysicsBody2D} or a {@link TileMap}. {@link TileMap}s are detected if their {@link TileSet} has collision shapes configured. Requires {@link monitoring} to be set to `true`.
   */
  body_exited: Signal<[Node2D]>;
  /**
   * Emitted when a {@link Shape2D} of the received `body` enters a shape of this area. `body` can be a {@link PhysicsBody2D} or a {@link TileMap}. {@link TileMap}s are detected if their {@link TileSet} has collision shapes configured. Requires {@link monitoring} to be set to `true`.
   * `local_shape_index` and `body_shape_index` contain indices of the interacting shapes from this area and the interacting body, respectively. `body_rid` contains the {@link RID} of the body. These values can be used with the {@link PhysicsServer2D}.
   * **Example:** Get the {@link CollisionShape2D} node from the shape index:
   */
  body_shape_entered: Signal<[RID, Node2D, int, int]>;
  /**
   * Emitted when a {@link Shape2D} of the received `body` exits a shape of this area. `body` can be a {@link PhysicsBody2D} or a {@link TileMap}. {@link TileMap}s are detected if their {@link TileSet} has collision shapes configured. Requires {@link monitoring} to be set to `true`.
   * See also {@link body_shape_entered}.
   */
  body_shape_exited: Signal<[RID, Node2D, int, int]>;

  // enum SpaceOverride
  /** This area does not affect gravity/damping. */
  static readonly SPACE_OVERRIDE_DISABLED: int;
  /**
   * This area adds its gravity/damping values to whatever has been calculated so far (in {@link priority} order).
   */
  static readonly SPACE_OVERRIDE_COMBINE: int;
  /**
   * This area adds its gravity/damping values to whatever has been calculated so far (in {@link priority} order), ignoring any lower priority areas.
   */
  static readonly SPACE_OVERRIDE_COMBINE_REPLACE: int;
  /** This area replaces any gravity/damping, even the defaults, ignoring any lower priority areas. */
  static readonly SPACE_OVERRIDE_REPLACE: int;
  /**
   * This area replaces any gravity/damping calculated so far (in {@link priority} order), but keeps calculating the rest of the areas.
   */
  static readonly SPACE_OVERRIDE_REPLACE_COMBINE: int;
}
