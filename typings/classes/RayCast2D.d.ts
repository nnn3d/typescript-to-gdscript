// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A ray in 2D space, used to find the first collision object it intersects. */
declare class RayCast2D extends Node2D {
  /** If `true`, collisions with {@link Area2D}s will be reported. */
  collide_with_areas: boolean;
  /** If `true`, collisions with {@link PhysicsBody2D}s will be reported. */
  collide_with_bodies: boolean;
  /**
   * The ray's collision mask. Only objects in at least one collision layer enabled in the mask will be detected. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /** If `true`, collisions will be reported. */
  enabled: boolean;
  /**
   * If `true`, this raycast will not report collisions with its parent node. This property only has an effect if the parent node is a {@link CollisionObject2D}. See also {@link Node.get_parent} and {@link add_exception}.
   */
  exclude_parent: boolean;
  /**
   * If `true`, the ray will detect a hit when starting inside shapes. In this case the collision normal will be `Vector2(0, 0)`. Does not affect concave polygon shapes.
   */
  hit_from_inside: boolean;
  /** The ray's destination point, relative to this raycast's {@link Node2D.position}. */
  target_position: Vector2;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_exclude_parent_body(value: boolean): void;
  get_exclude_parent_body(): boolean;
  set_hit_from_inside(value: boolean): void;
  is_hit_from_inside_enabled(): boolean;
  set_target_position(value: Vector2 | Vector2i): void;
  get_target_position(): Vector2;

  /** Adds a collision exception so the ray does not report collisions with the specified `node`. */
  add_exception(node: CollisionObject2D): void;
  /** Adds a collision exception so the ray does not report collisions with the specified {@link RID}. */
  add_exception_rid(rid: RID): void;
  /** Removes all collision exceptions for this ray. */
  clear_exceptions(): void;
  /**
   * Updates the collision information for the ray immediately, without waiting for the next `_physics_process` call. Use this method, for example, when the ray or its parent has changed state.
   * **Note:** {@link enabled} does not need to be `true` for this to work.
   */
  force_raycast_update(): void;
  /**
   * Returns the first object that the ray intersects, or `null` if no object is intersecting the ray (i.e. {@link is_colliding} returns `false`).
   * **Note:** This object is not guaranteed to be a {@link CollisionObject2D}. For example, if the ray intersects a {@link TileMapLayer}, the method will return a {@link TileMapLayer} instance.
   */
  get_collider(): GodotObject | null;
  /**
   * Returns the {@link RID} of the first object that the ray intersects, or an empty {@link RID} if no object is intersecting the ray (i.e. {@link is_colliding} returns `false`).
   */
  get_collider_rid(): RID;
  /**
   * Returns the shape ID of the first object that the ray intersects, or `0` if no object is intersecting the ray (i.e. {@link is_colliding} returns `false`).
   * To get the intersected shape node, for a {@link CollisionObject2D} target, use:
   */
  get_collider_shape(): int;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /**
   * Returns the normal of the intersecting object's shape at the collision point, or `Vector2(0, 0)` if the ray starts inside the shape and {@link hit_from_inside} is `true`.
   * **Note:** Check that {@link is_colliding} returns `true` before calling this method to ensure the returned normal is valid and up-to-date.
   */
  get_collision_normal(): Vector2;
  /**
   * Returns the collision point at which the ray intersects the closest object, in the global coordinate system. If {@link hit_from_inside} is `true` and the ray starts inside of a collision shape, this function will return the origin point of the ray.
   * **Note:** Check that {@link is_colliding} returns `true` before calling this method to ensure the returned point is valid and up-to-date.
   */
  get_collision_point(): Vector2;
  /** Returns whether any object is intersecting with the ray's vector (considering the vector length). */
  is_colliding(): boolean;
  /** Removes a collision exception so the ray can report collisions with the specified `node`. */
  remove_exception(node: CollisionObject2D): void;
  /** Removes a collision exception so the ray can report collisions with the specified {@link RID}. */
  remove_exception_rid(rid: RID): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
}
