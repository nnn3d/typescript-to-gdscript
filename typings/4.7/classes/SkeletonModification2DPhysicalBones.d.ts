// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A modification that applies the transforms of {@link PhysicalBone2D} nodes to {@link Bone2D} nodes. */
declare class SkeletonModification2DPhysicalBones extends SkeletonModification2D {
  /** The number of {@link PhysicalBone2D} nodes linked in this modification. */
  physical_bone_chain_length: int;
  set_physical_bone_chain_length(value: int): void;
  get_physical_bone_chain_length(): int;

  /**
   * Empties the list of {@link PhysicalBone2D} nodes and populates it with all {@link PhysicalBone2D} nodes that are children of the {@link Skeleton2D}.
   */
  fetch_physical_bones(): void;
  /** Returns the {@link PhysicalBone2D} node at `joint_idx`. */
  get_physical_bone_node(joint_idx: int): string;
  /**
   * Sets the {@link PhysicalBone2D} node at `joint_idx`.
   * **Note:** This is just the index used for this modification, not the bone index used in the {@link Skeleton2D}.
   */
  set_physical_bone_node(joint_idx: int, physicalbone2d_node: string): void;
  /**
   * Tell the {@link PhysicalBone2D} nodes to start simulating and interacting with the physics world.
   * Optionally, an array of bone names can be passed to this function, and that will cause only {@link PhysicalBone2D} nodes with those names to start simulating.
   */
  start_simulation(bones?: unknown): void;
  /**
   * Tell the {@link PhysicalBone2D} nodes to stop simulating and interacting with the physics world.
   * Optionally, an array of bone names can be passed to this function, and that will cause only {@link PhysicalBone2D} nodes with those names to stop simulating.
   */
  stop_simulation(bones?: unknown): void;
}
