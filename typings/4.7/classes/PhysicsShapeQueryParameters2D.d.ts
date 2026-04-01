// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides parameters for {@link PhysicsDirectSpaceState2D}'s methods. */
declare class PhysicsShapeQueryParameters2D extends RefCounted {
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
  exclude: Array<RID>;
  /** The collision margin for the shape. */
  margin: float;
  /** The motion of the shape being queried for. */
  motion: Vector2;
  /**
   * The {@link Shape2D} that will be used for collision/intersection queries. This stores the actual reference which avoids the shape to be released while being used for queries, so always prefer using this over {@link shape_rid}.
   */
  shape: Resource;
  /**
   * The queried shape's {@link RID} that will be used for collision/intersection queries. Use this over {@link shape} if you want to optimize for performance using the Servers API:
   */
  shape_rid: RID;
  /** The queried shape's transform matrix. */
  transform: Transform2D;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_exclude(value: Array<RID>): void;
  get_exclude(): Array<RID>;
  set_margin(value: float): void;
  get_margin(): float;
  set_motion(value: Vector2): void;
  get_motion(): Vector2;
  set_shape(value: Resource): void;
  get_shape(): Resource;
  set_shape_rid(value: RID): void;
  get_shape_rid(): RID;
  set_transform(value: Transform2D): void;
  get_transform(): Transform2D;
}
