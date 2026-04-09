// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A modification that uses CCDIK to manipulate a series of bones to reach a target in 2D. */
declare class SkeletonModification2DCCDIK extends SkeletonModification2D {
  /** The number of CCDIK joints in the CCDIK modification. */
  ccdik_data_chain_length: int;
  /**
   * The NodePath to the node that is the target for the CCDIK modification. This node is what the CCDIK chain will attempt to rotate the bone chain to.
   */
  target_nodepath: NodePath;
  /**
   * The end position of the CCDIK chain. Typically, this should be a child of a {@link Bone2D} node attached to the final {@link Bone2D} in the CCDIK chain.
   */
  tip_nodepath: NodePath;
  set_ccdik_data_chain_length(value: int): void;
  get_ccdik_data_chain_length(): int;
  set_target_node(value: NodePath | string): void;
  get_target_node(): NodePath;
  set_tip_node(value: NodePath | string): void;
  get_tip_node(): NodePath;

  /** Returns the {@link Bone2D} node assigned to the CCDIK joint at `joint_idx`. */
  get_ccdik_joint_bone2d_node(joint_idx: int): NodePath;
  /** Returns the index of the {@link Bone2D} node assigned to the CCDIK joint at `joint_idx`. */
  get_ccdik_joint_bone_index(joint_idx: int): int;
  /**
   * Returns whether the CCDIK joint at `joint_idx` uses an inverted joint constraint. See {@link set_ccdik_joint_constraint_angle_invert} for details.
   */
  get_ccdik_joint_constraint_angle_invert(joint_idx: int): boolean;
  /** Returns the maximum angle constraint for the joint at `joint_idx`. */
  get_ccdik_joint_constraint_angle_max(joint_idx: int): float;
  /** Returns the minimum angle constraint for the joint at `joint_idx`. */
  get_ccdik_joint_constraint_angle_min(joint_idx: int): float;
  /** Returns whether angle constraints on the CCDIK joint at `joint_idx` are enabled. */
  get_ccdik_joint_enable_constraint(joint_idx: int): boolean;
  /**
   * Returns whether the joint at `joint_idx` is set to rotate from the joint, `true`, or to rotate from the tip, `false`. The default is to rotate from the tip.
   */
  get_ccdik_joint_rotate_from_joint(joint_idx: int): boolean;
  /** Sets the {@link Bone2D} node assigned to the CCDIK joint at `joint_idx`. */
  set_ccdik_joint_bone2d_node(joint_idx: int, bone2d_nodepath: NodePath | string): void;
  /**
   * Sets the bone index, `bone_idx`, of the CCDIK joint at `joint_idx`. When possible, this will also update the `bone2d_node` of the CCDIK joint based on data provided by the linked skeleton.
   */
  set_ccdik_joint_bone_index(joint_idx: int, bone_idx: int): void;
  /**
   * Sets whether the CCDIK joint at `joint_idx` uses an inverted joint constraint.
   * An inverted joint constraint only constraints the CCDIK joint to the angles *outside of* the inputted minimum and maximum angles. For this reason, it is referred to as an inverted joint constraint, as it constraints the joint to the outside of the inputted values.
   */
  set_ccdik_joint_constraint_angle_invert(joint_idx: int, invert: boolean): void;
  /** Sets the maximum angle constraint for the joint at `joint_idx`. */
  set_ccdik_joint_constraint_angle_max(joint_idx: int, angle_max: float): void;
  /** Sets the minimum angle constraint for the joint at `joint_idx`. */
  set_ccdik_joint_constraint_angle_min(joint_idx: int, angle_min: float): void;
  /**
   * Determines whether angle constraints on the CCDIK joint at `joint_idx` are enabled. When `true`, constraints will be enabled and taken into account when solving.
   */
  set_ccdik_joint_enable_constraint(joint_idx: int, enable_constraint: boolean): void;
  /**
   * Sets whether the joint at `joint_idx` is set to rotate from the joint, `true`, or to rotate from the tip, `false`.
   */
  set_ccdik_joint_rotate_from_joint(joint_idx: int, rotate_from_joint: boolean): void;
}
