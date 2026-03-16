// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides parameters for {@link PhysicsServer3D.body_test_motion}. */
declare class PhysicsTestMotionParameters3D extends RefCounted {
  /**
   * If set to `true`, shapes of type {@link PhysicsServer3D.SHAPE_SEPARATION_RAY} are used to detect collisions and can stop the motion. Can be useful when snapping to the ground.
   * If set to `false`, shapes of type {@link PhysicsServer3D.SHAPE_SEPARATION_RAY} are only used for separation when overlapping with other bodies. That's the main use for separation ray shapes.
   */
  collide_separation_ray: boolean;
  /**
   * Optional array of body {@link RID} to exclude from collision. Use {@link CollisionObject3D.get_rid} to get the {@link RID} associated with a {@link CollisionObject3D}-derived node.
   */
  exclude_bodies: unknown;
  /**
   * Optional array of object unique instance ID to exclude from collision. See {@link Object.get_instance_id}.
   */
  exclude_objects: unknown;
  /**
   * Transform in global space where the motion should start. Usually set to {@link Node3D.global_transform} for the current body's transform.
   */
  from: Transform3D;
  /** Increases the size of the shapes involved in the collision detection. */
  margin: float;
  /**
   * Maximum number of returned collisions, between `1` and `32`. Always returns the deepest detected collisions.
   */
  max_collisions: int;
  /** Motion vector to define the length and direction of the motion to test. */
  motion: Vector3;
  /**
   * If set to `true`, any depenetration from the recovery phase is reported as a collision; this is used e.g. by {@link CharacterBody3D} for improving floor detection during floor snapping.
   * If set to `false`, only collisions resulting from the motion are reported, which is generally the desired behavior.
   */
  recovery_as_collision: boolean;
}
