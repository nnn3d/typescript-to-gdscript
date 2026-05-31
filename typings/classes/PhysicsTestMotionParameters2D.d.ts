// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Provides parameters for {@link PhysicsServer2D.body_test_motion}. */
declare class PhysicsTestMotionParameters2D extends RefCounted {
  /**
   * If set to `true`, shapes of type {@link PhysicsServer2D.SHAPE_SEPARATION_RAY} are used to detect collisions and can stop the motion. Can be useful when snapping to the ground.
   * If set to `false`, shapes of type {@link PhysicsServer2D.SHAPE_SEPARATION_RAY} are only used for separation when overlapping with other bodies. That's the main use for separation ray shapes.
   */
  collide_separation_ray: boolean;
  /**
   * Optional array of body {@link RID} to exclude from collision. Use {@link CollisionObject2D.get_rid} to get the {@link RID} associated with a {@link CollisionObject2D}-derived node.
   */
  exclude_bodies: Array<RID>;
  /**
   * Optional array of object unique instance ID to exclude from collision. See {@link Object.get_instance_id}.
   */
  exclude_objects: Array<int>;
  /**
   * Transform in global space where the motion should start. Usually set to {@link Node2D.global_transform} for the current body's transform.
   */
  from: Transform2D;
  /** Increases the size of the shapes involved in the collision detection. */
  margin: float;
  /** Motion vector to define the length and direction of the motion to test. */
  motion: Vector2;
  /**
   * If set to `true`, any depenetration from the recovery phase is reported as a collision; this is used e.g. by {@link CharacterBody2D} for improving floor detection during floor snapping.
   * If set to `false`, only collisions resulting from the motion are reported, which is generally the desired behavior.
   */
  recovery_as_collision: boolean;
  set_collide_separation_ray_enabled(value: boolean): void;
  is_collide_separation_ray_enabled(): boolean;
  set_exclude_bodies(value: Array<RID>): void;
  get_exclude_bodies(): Array<RID>;
  set_exclude_objects(value: Array<int>): void;
  get_exclude_objects(): Array<int>;
  set_from(value: Transform2D): void;
  get_from(): Transform2D;
  set_margin(value: float): void;
  get_margin(): float;
  set_motion(value: Vector2 | Vector2i): void;
  get_motion(): Vector2;
  set_recovery_as_collision_enabled(value: boolean): void;
  is_recovery_as_collision_enabled(): boolean;
}
