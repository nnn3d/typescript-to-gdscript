// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides parameters for {@link PhysicsDirectSpaceState3D.intersect_point}. */
declare class PhysicsPointQueryParameters3D extends RefCounted {
  /** If `true`, the query will take {@link Area3D}s into account. */
  collide_with_areas: boolean;
  /** If `true`, the query will take {@link PhysicsBody3D}s into account. */
  collide_with_bodies: boolean;
  /**
   * The physics layers the query will detect (as a bitmask). By default, all collision layers are detected. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The list of object {@link RID}s that will be excluded from collisions. Use {@link CollisionObject3D.get_rid} to get the {@link RID} associated with a {@link CollisionObject3D}-derived node.
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then assign it to the property again.
   */
  exclude: unknown;
  /** The position being queried for, in global coordinates. */
  position: Vector3;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_exclude(value: unknown): void;
  get_exclude(): unknown;
  set_position(value: Vector3): void;
  get_position(): Vector3;
}
