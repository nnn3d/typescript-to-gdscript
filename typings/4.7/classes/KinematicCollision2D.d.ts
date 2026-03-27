// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Holds collision data from the movement of a {@link PhysicsBody2D}. */
declare class KinematicCollision2D extends RefCounted {
  /**
   * Returns the collision angle according to `up_direction`, which is {@link Vector2.UP} by default. This value is always positive.
   */
  get_angle(up_direction?: Vector2): float;
  /** Returns the colliding body's attached {@link Object}. */
  get_collider(): GodotObject;
  /**
   * Returns the unique instance ID of the colliding body's attached {@link Object}. See {@link Object.get_instance_id}.
   */
  get_collider_id(): int;
  /** Returns the colliding body's {@link RID} used by the {@link PhysicsServer2D}. */
  get_collider_rid(): RID;
  /** Returns the colliding body's shape. */
  get_collider_shape(): GodotObject;
  /** Returns the colliding body's shape index. See {@link CollisionObject2D}. */
  get_collider_shape_index(): int;
  /** Returns the colliding body's velocity. */
  get_collider_velocity(): Vector2;
  /** Returns the colliding body's length of overlap along the collision normal. */
  get_depth(): float;
  /** Returns the moving object's colliding shape. */
  get_local_shape(): GodotObject;
  /** Returns the colliding body's shape's normal at the point of collision. */
  get_normal(): Vector2;
  /** Returns the point of collision in global coordinates. */
  get_position(): Vector2;
  /** Returns the moving object's remaining movement vector. */
  get_remainder(): Vector2;
  /** Returns the moving object's travel before collision. */
  get_travel(): Vector2;
}
