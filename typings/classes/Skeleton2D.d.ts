// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The parent of a hierarchy of {@link Bone2D}s, used to create a 2D skeletal animation. */
declare class Skeleton2D extends Node2D {
  /**
   * Executes all the modifications on the {@link SkeletonModificationStack2D}, if the Skeleton2D has one assigned.
   */
  execute_modifications(delta: float, execution_mode: int): void;
  /**
   * Returns a {@link Bone2D} from the node hierarchy parented by Skeleton2D. The object to return is identified by the parameter `idx`. Bones are indexed by descending the node hierarchy from top to bottom, adding the children of each branch before moving to the next sibling.
   */
  get_bone(idx: int): Bone2D | null;
  /** Returns the number of {@link Bone2D} nodes in the node hierarchy parented by Skeleton2D. */
  get_bone_count(): int;
  /** Returns the local pose override transform for `bone_idx`. */
  get_bone_local_pose_override(bone_idx: int): Transform2D;
  /** Returns the {@link SkeletonModificationStack2D} attached to this skeleton, if one exists. */
  get_modification_stack(): SkeletonModificationStack2D | null;
  /** Returns the {@link RID} of a Skeleton2D instance. */
  get_skeleton(): RID;
  /**
   * Sets the local pose transform, `override_pose`, for the bone at `bone_idx`.
   * `strength` is the interpolation strength that will be used when applying the pose, and `persistent` determines if the applied pose will remain.
   * **Note:** The pose transform needs to be a local transform relative to the {@link Bone2D} node at `bone_idx`!
   */
  set_bone_local_pose_override(bone_idx: int, override_pose: Transform2D, strength: float, persistent: boolean): void;
  /** Sets the {@link SkeletonModificationStack2D} attached to this skeleton. */
  set_modification_stack(modification_stack: SkeletonModificationStack2D): void;

  /**
   * Emitted when the {@link Bone2D} setup attached to this skeletons changes. This is primarily used internally within the skeleton.
   */
  bone_setup_changed: Signal<[]>;
}
