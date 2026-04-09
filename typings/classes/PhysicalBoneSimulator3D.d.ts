// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Node that can be the parent of {@link PhysicalBone3D} and can apply the simulation results to {@link Skeleton3D}.
 */
declare class PhysicalBoneSimulator3D extends SkeletonModifier3D {
  /**
   * Returns a boolean that indicates whether the {@link PhysicalBoneSimulator3D} is running and simulating.
   */
  is_simulating_physics(): boolean;
  /**
   * Adds a collision exception to the physical bone.
   * Works just like the {@link RigidBody3D} node.
   */
  physical_bones_add_collision_exception(exception: RID): void;
  /**
   * Removes a collision exception to the physical bone.
   * Works just like the {@link RigidBody3D} node.
   */
  physical_bones_remove_collision_exception(exception: RID): void;
  /**
   * Tells the {@link PhysicalBone3D} nodes in the Skeleton to start simulating and reacting to the physics world.
   * Optionally, a list of bone names can be passed-in, allowing only the passed-in bones to be simulated.
   */
  physical_bones_start_simulation(bones?: Array<string>): void;
  /** Tells the {@link PhysicalBone3D} nodes in the Skeleton to stop simulating. */
  physical_bones_stop_simulation(): void;
}
