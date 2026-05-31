// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Provides parameters for {@link PhysicsDirectSpaceState3D.intersect_ray}. */
declare class PhysicsRayQueryParameters3D extends RefCounted {
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
  exclude: Array<RID>;
  /** The starting point of the ray being queried for, in global coordinates. */
  from: Vector3;
  /**
   * If `true`, the query will hit back faces with concave polygon shapes with back face enabled or heightmap shapes.
   */
  hit_back_faces: boolean;
  /**
   * If `true`, the query will detect a hit when starting inside shapes. In this case the collision normal will be `Vector3(0, 0, 0)`. Does not affect concave polygon shapes or heightmap shapes.
   */
  hit_from_inside: boolean;
  /** The ending point of the ray being queried for, in global coordinates. */
  to: Vector3;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_exclude(value: Array<RID>): void;
  get_exclude(): Array<RID>;
  set_from(value: Vector3 | Vector3i): void;
  get_from(): Vector3;
  set_hit_back_faces(value: boolean): void;
  is_hit_back_faces_enabled(): boolean;
  set_hit_from_inside(value: boolean): void;
  is_hit_from_inside_enabled(): boolean;
  set_to(value: Vector3 | Vector3i): void;
  get_to(): Vector3;

  /**
   * Returns a new, pre-configured {@link PhysicsRayQueryParameters3D} object. Use it to quickly create query parameters using the most common options.
   */
  static create(from_: Vector3 | Vector3i, to: Vector3 | Vector3i, collision_mask?: int, exclude?: Array<RID>): PhysicsRayQueryParameters3D;
}
