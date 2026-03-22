// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides parameters for {@link PhysicsDirectSpaceState2D.intersect_ray}. */
declare class PhysicsRayQueryParameters2D extends RefCounted {
  /** If `true`, the query will take {@link Area2D}s into account. */
  collide_with_areas: boolean;
  /** If `true`, the query will take {@link PhysicsBody2D}s into account. */
  collide_with_bodies: boolean;
  /**
   * The physics layers the query will detect (as a bitmask). By default, all collision layers are detected. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The list of object {@link RID}s that will be excluded from collisions. Use {@link CollisionObject2D.get_rid} to get the {@link RID} associated with a {@link CollisionObject2D}-derived node.
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then assign it to the property again.
   */
  exclude: unknown;
  /** The starting point of the ray being queried for, in global coordinates. */
  from: Vector2;
  /**
   * If `true`, the query will detect a hit when starting inside shapes. In this case the collision normal will be `Vector2(0, 0)`. Does not affect concave polygon shapes.
   */
  hit_from_inside: boolean;
  /** The ending point of the ray being queried for, in global coordinates. */
  to: Vector2;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_exclude(value: unknown): void;
  get_exclude(): unknown;
  set_from(value: Vector2): void;
  get_from(): Vector2;
  set_hit_from_inside(value: boolean): void;
  is_hit_from_inside_enabled(): boolean;
  set_to(value: Vector2): void;
  get_to(): Vector2;

  /**
   * Returns a new, pre-configured {@link PhysicsRayQueryParameters2D} object. Use it to quickly create query parameters using the most common options.
   */
  static create(from_: Vector2, to: Vector2, collision_mask?: int, exclude?: unknown): PhysicsRayQueryParameters2D;
}
