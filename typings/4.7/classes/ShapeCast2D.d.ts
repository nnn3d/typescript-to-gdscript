// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D shape that sweeps a region of space to detect {@link CollisionObject2D}s. */
declare class ShapeCast2D extends Node2D {
  /** If `true`, collisions with {@link Area2D}s will be reported. */
  collide_with_areas: boolean;
  /** If `true`, collisions with {@link PhysicsBody2D}s will be reported. */
  collide_with_bodies: boolean;
  /**
   * The shape's collision mask. Only objects in at least one collision layer enabled in the mask will be detected. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * Returns the complete collision information from the collision sweep. The data returned is the same as in the {@link PhysicsDirectSpaceState2D.get_rest_info} method.
   */
  collision_result: Array<unknown>;
  /** If `true`, collisions will be reported. */
  enabled: boolean;
  /** If `true`, the parent node will be excluded from collision detection. */
  exclude_parent: boolean;
  /**
   * The collision margin for the shape. A larger margin helps detecting collisions more consistently, at the cost of precision.
   */
  margin: float;
  /** The number of intersections can be limited with this parameter, to reduce the processing time. */
  max_results: int;
  /** The shape to be used for collision queries. */
  shape: Shape2D;
  /** The shape's destination point, relative to this node's {@link Node2D.position}. */
  target_position: Vector2;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  get_collision_result(): Array<unknown>;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_exclude_parent_body(value: boolean): void;
  get_exclude_parent_body(): boolean;
  set_margin(value: float): void;
  get_margin(): float;
  set_max_results(value: int): void;
  get_max_results(): int;
  set_shape(value: Shape2D): void;
  get_shape(): Shape2D;
  set_target_position(value: Vector2): void;
  get_target_position(): Vector2;

  /** Adds a collision exception so the shape does not report collisions with the specified node. */
  add_exception(node: CollisionObject2D): void;
  /** Adds a collision exception so the shape does not report collisions with the specified {@link RID}. */
  add_exception_rid(rid: RID): void;
  /** Removes all collision exceptions for this shape. */
  clear_exceptions(): void;
  /**
   * Updates the collision information for the shape immediately, without waiting for the next `_physics_process` call. Use this method, for example, when the shape or its parent has changed state.
   * **Note:** Setting {@link enabled} to `true` is not required for this to work.
   */
  force_shapecast_update(): void;
  /**
   * Returns the fraction from this cast's origin to its {@link target_position} of how far the shape can move without triggering a collision, as a value between `0.0` and `1.0`.
   */
  get_closest_collision_safe_fraction(): float;
  /**
   * Returns the fraction from this cast's origin to its {@link target_position} of how far the shape must move to trigger a collision, as a value between `0.0` and `1.0`.
   * In ideal conditions this would be the same as {@link get_closest_collision_safe_fraction}, however shape casting is calculated in discrete steps, so the precise point of collision can occur between two calculated positions.
   */
  get_closest_collision_unsafe_fraction(): float;
  /**
   * Returns the collided {@link Object} of one of the multiple collisions at `index`, or `null` if no object is intersecting the shape (i.e. {@link is_colliding} returns `false`).
   */
  get_collider(index: int): GodotObject;
  /** Returns the {@link RID} of the collided object of one of the multiple collisions at `index`. */
  get_collider_rid(index: int): RID;
  /**
   * Returns the shape ID of the colliding shape of one of the multiple collisions at `index`, or `0` if no object is intersecting the shape (i.e. {@link is_colliding} returns `false`).
   */
  get_collider_shape(index: int): int;
  /**
   * The number of collisions detected at the point of impact. Use this to iterate over multiple collisions as provided by {@link get_collider}, {@link get_collider_shape}, {@link get_collision_point}, and {@link get_collision_normal} methods.
   */
  get_collision_count(): int;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /** Returns the normal of one of the multiple collisions at `index` of the intersecting object. */
  get_collision_normal(index: int): Vector2;
  /**
   * Returns the collision point of one of the multiple collisions at `index` where the shape intersects the colliding object.
   * **Note:** This point is in the **global** coordinate system.
   */
  get_collision_point(index: int): Vector2;
  /** Returns whether any object is intersecting with the shape's vector (considering the vector length). */
  is_colliding(): boolean;
  /** Removes a collision exception so the shape does report collisions with the specified node. */
  remove_exception(node: CollisionObject2D): void;
  /** Removes a collision exception so the shape does report collisions with the specified {@link RID}. */
  remove_exception_rid(rid: RID): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
}
