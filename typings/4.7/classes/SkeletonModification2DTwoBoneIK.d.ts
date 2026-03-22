// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A modification that rotates two bones using the law of cosines to reach the target. */
declare class SkeletonModification2DTwoBoneIK extends SkeletonModification2D {
  /**
   * If `true`, the bones in the modification will bend outward as opposed to inwards when contracting. If `false`, the bones will bend inwards when contracting.
   */
  flip_bend_direction: boolean;
  /**
   * The maximum distance the target can be at. If the target is farther than this distance, the modification will solve as if it's at this maximum distance. When set to `0`, the modification will solve without distance constraints.
   */
  target_maximum_distance: float;
  /**
   * The minimum distance the target can be at. If the target is closer than this distance, the modification will solve as if it's at this minimum distance. When set to `0`, the modification will solve without distance constraints.
   */
  target_minimum_distance: float;
  /**
   * The NodePath to the node that is the target for the TwoBoneIK modification. This node is what the modification will use when bending the {@link Bone2D} nodes.
   */
  target_nodepath: string;
  set_flip_bend_direction(value: boolean): void;
  get_flip_bend_direction(): boolean;
  set_target_maximum_distance(value: float): void;
  get_target_maximum_distance(): float;
  set_target_minimum_distance(value: float): void;
  get_target_minimum_distance(): float;
  set_target_node(value: string): void;
  get_target_node(): string;

  /** Returns the {@link Bone2D} node that is being used as the first bone in the TwoBoneIK modification. */
  get_joint_one_bone2d_node(): string;
  /**
   * Returns the index of the {@link Bone2D} node that is being used as the first bone in the TwoBoneIK modification.
   */
  get_joint_one_bone_idx(): int;
  /**
   * Returns the {@link Bone2D} node that is being used as the second bone in the TwoBoneIK modification.
   */
  get_joint_two_bone2d_node(): string;
  /**
   * Returns the index of the {@link Bone2D} node that is being used as the second bone in the TwoBoneIK modification.
   */
  get_joint_two_bone_idx(): int;
  /** Sets the {@link Bone2D} node that is being used as the first bone in the TwoBoneIK modification. */
  set_joint_one_bone2d_node(bone2d_node: string): void;
  /**
   * Sets the index of the {@link Bone2D} node that is being used as the first bone in the TwoBoneIK modification.
   */
  set_joint_one_bone_idx(bone_idx: int): void;
  /** Sets the {@link Bone2D} node that is being used as the second bone in the TwoBoneIK modification. */
  set_joint_two_bone2d_node(bone2d_node: string): void;
  /**
   * Sets the index of the {@link Bone2D} node that is being used as the second bone in the TwoBoneIK modification.
   */
  set_joint_two_bone_idx(bone_idx: int): void;
}
