// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Holds collision data from the movement of a {@link PhysicsBody3D}. */
declare class KinematicCollision3D extends RefCounted {
  /**
   * Returns the collision angle according to `up_direction`, which is {@link Vector3.UP} by default. This value is always positive.
   */
  get_angle(collision_index?: int, up_direction?: Vector3): float;
  /**
   * Returns the colliding body's attached {@link Object} given a collision index (the deepest collision by default).
   */
  get_collider(collision_index?: int): GodotObject | null;
  /**
   * Returns the unique instance ID of the colliding body's attached {@link Object} given a collision index (the deepest collision by default). See {@link Object.get_instance_id}.
   */
  get_collider_id(collision_index?: int): int;
  /**
   * Returns the colliding body's {@link RID} used by the {@link PhysicsServer3D} given a collision index (the deepest collision by default).
   */
  get_collider_rid(collision_index?: int): RID;
  /** Returns the colliding body's shape given a collision index (the deepest collision by default). */
  get_collider_shape(collision_index?: int): GodotObject | null;
  /**
   * Returns the colliding body's shape index given a collision index (the deepest collision by default). See {@link CollisionObject3D}.
   */
  get_collider_shape_index(collision_index?: int): int;
  /** Returns the colliding body's velocity given a collision index (the deepest collision by default). */
  get_collider_velocity(collision_index?: int): Vector3;
  /** Returns the number of detected collisions. */
  get_collision_count(): int;
  /** Returns the colliding body's length of overlap along the collision normal. */
  get_depth(): float;
  /**
   * Returns the moving object's colliding shape given a collision index (the deepest collision by default).
   */
  get_local_shape(collision_index?: int): GodotObject | null;
  /**
   * Returns the colliding body's shape's normal at the point of collision given a collision index (the deepest collision by default).
   */
  get_normal(collision_index?: int): Vector3;
  /**
   * Returns the point of collision in global coordinates given a collision index (the deepest collision by default).
   */
  get_position(collision_index?: int): Vector3;
  /** Returns the moving object's remaining movement vector. */
  get_remainder(): Vector3;
  /** Returns the moving object's travel before collision. */
  get_travel(): Vector3;
}
