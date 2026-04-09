// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides parameters for {@link PhysicsDirectSpaceState2D.intersect_point}. */
declare class PhysicsPointQueryParameters2D extends RefCounted {
  /**
   * If different from `0`, restricts the query to a specific canvas layer specified by its instance ID. See {@link Object.get_instance_id}.
   * If `0`, restricts the query to the Viewport's default canvas layer.
   */
  canvas_instance_id: int;
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
  /** The position being queried for, in global coordinates. */
  position: Vector2;
  set_canvas_instance_id(value: int): void;
  get_canvas_instance_id(): int;
  set_collide_with_areas(value: boolean): void;
  is_collide_with_areas_enabled(): boolean;
  set_collide_with_bodies(value: boolean): void;
  is_collide_with_bodies_enabled(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_exclude(value: Array<RID>): void;
  get_exclude(): Array<RID>;
  set_position(value: Vector2): void;
  get_position(): Vector2;
}
