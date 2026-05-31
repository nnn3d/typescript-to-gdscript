// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Describes the motion and collision result from {@link PhysicsServer2D.body_test_motion}. */
declare class PhysicsTestMotionResult2D extends RefCounted {
  /** Returns the colliding body's attached {@link Object}, if a collision occurred. */
  get_collider(): GodotObject | null;
  /**
   * Returns the unique instance ID of the colliding body's attached {@link Object}, if a collision occurred. See {@link Object.get_instance_id}.
   */
  get_collider_id(): int;
  /**
   * Returns the colliding body's {@link RID} used by the {@link PhysicsServer2D}, if a collision occurred.
   */
  get_collider_rid(): RID;
  /** Returns the colliding body's shape index, if a collision occurred. See {@link CollisionObject2D}. */
  get_collider_shape(): int;
  /** Returns the colliding body's velocity, if a collision occurred. */
  get_collider_velocity(): Vector2;
  /** Returns the length of overlap along the collision normal, if a collision occurred. */
  get_collision_depth(): float;
  /** Returns the moving object's colliding shape, if a collision occurred. */
  get_collision_local_shape(): int;
  /** Returns the colliding body's shape's normal at the point of collision, if a collision occurred. */
  get_collision_normal(): Vector2;
  /** Returns the point of collision in global coordinates, if a collision occurred. */
  get_collision_point(): Vector2;
  /** Returns the maximum fraction of the motion that can occur without a collision, between `0` and `1`. */
  get_collision_safe_fraction(): float;
  /**
   * Returns the minimum fraction of the motion needed to collide, if a collision occurred, between `0` and `1`.
   */
  get_collision_unsafe_fraction(): float;
  /** Returns the moving object's remaining movement vector. */
  get_remainder(): Vector2;
  /** Returns the moving object's travel before collision. */
  get_travel(): Vector2;
}
