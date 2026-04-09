// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A modification that uses FABRIK to manipulate a series of {@link Bone2D} nodes to reach a target. */
declare class SkeletonModification2DFABRIK extends SkeletonModification2D {
  /** The number of FABRIK joints in the FABRIK modification. */
  fabrik_data_chain_length: int;
  /**
   * The NodePath to the node that is the target for the FABRIK modification. This node is what the FABRIK chain will attempt to rotate the bone chain to.
   */
  target_nodepath: string;
  set_fabrik_data_chain_length(value: int): void;
  get_fabrik_data_chain_length(): int;
  set_target_node(value: string): void;
  get_target_node(): string;

  /** Returns the {@link Bone2D} node assigned to the FABRIK joint at `joint_idx`. */
  get_fabrik_joint_bone2d_node(joint_idx: int): string;
  /** Returns the index of the {@link Bone2D} node assigned to the FABRIK joint at `joint_idx`. */
  get_fabrik_joint_bone_index(joint_idx: int): int;
  /** Returns the magnet position vector for the joint at `joint_idx`. */
  get_fabrik_joint_magnet_position(joint_idx: int): Vector2;
  /**
   * Returns whether the joint is using the target's rotation rather than allowing FABRIK to rotate the joint. This option only applies to the tip/final joint in the chain.
   */
  get_fabrik_joint_use_target_rotation(joint_idx: int): boolean;
  /** Sets the {@link Bone2D} node assigned to the FABRIK joint at `joint_idx`. */
  set_fabrik_joint_bone2d_node(joint_idx: int, bone2d_nodepath: string): void;
  /**
   * Sets the bone index, `bone_idx`, of the FABRIK joint at `joint_idx`. When possible, this will also update the `bone2d_node` of the FABRIK joint based on data provided by the linked skeleton.
   */
  set_fabrik_joint_bone_index(joint_idx: int, bone_idx: int): void;
  /** Sets the magnet position vector for the joint at `joint_idx`. */
  set_fabrik_joint_magnet_position(joint_idx: int, magnet_position: Vector2 | Vector2i): void;
  /**
   * Sets whether the joint at `joint_idx` will use the target node's rotation rather than letting FABRIK rotate the node.
   * **Note:** This option only works for the tip/final joint in the chain. For all other nodes, this option will be ignored.
   */
  set_fabrik_joint_use_target_rotation(joint_idx: int, use_target_rotation: boolean): void;
}
