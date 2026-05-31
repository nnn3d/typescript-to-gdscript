// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A modification that jiggles {@link Bone2D} nodes as they move towards a target. */
declare class SkeletonModification2DJiggle extends SkeletonModification2D {
  /**
   * The default amount of damping applied to the Jiggle joints, if they are not overridden. Higher values lead to more of the calculated velocity being applied.
   */
  damping: float;
  /** The default amount of gravity applied to the Jiggle joints, if they are not overridden. */
  gravity: Vector2;
  /** The amount of Jiggle joints in the Jiggle modification. */
  jiggle_data_chain_length: int;
  /**
   * The default amount of mass assigned to the Jiggle joints, if they are not overridden. Higher values lead to faster movements and more overshooting.
   */
  mass: float;
  /**
   * The default amount of stiffness assigned to the Jiggle joints, if they are not overridden. Higher values act more like springs, quickly moving into the correct position.
   */
  stiffness: float;
  /**
   * The NodePath to the node that is the target for the Jiggle modification. This node is what the Jiggle chain will attempt to rotate the bone chain to.
   */
  target_nodepath: NodePath;
  /**
   * Whether the gravity vector, {@link gravity}, should be applied to the Jiggle joints, assuming they are not overriding the default settings.
   */
  use_gravity: boolean;
  set_damping(value: float): void;
  get_damping(): float;
  set_gravity(value: Vector2 | Vector2i): void;
  get_gravity(): Vector2;
  set_jiggle_data_chain_length(value: int): void;
  get_jiggle_data_chain_length(): int;
  set_mass(value: float): void;
  get_mass(): float;
  set_stiffness(value: float): void;
  get_stiffness(): float;
  set_target_node(value: NodePath | string): void;
  get_target_node(): NodePath;
  set_use_gravity(value: boolean): void;
  get_use_gravity(): boolean;

  /** Returns the collision mask used by the Jiggle modifier when collisions are enabled. */
  get_collision_mask(): int;
  /** Returns the {@link Bone2D} node assigned to the Jiggle joint at `joint_idx`. */
  get_jiggle_joint_bone2d_node(joint_idx: int): NodePath;
  /** Returns the index of the {@link Bone2D} node assigned to the Jiggle joint at `joint_idx`. */
  get_jiggle_joint_bone_index(joint_idx: int): int;
  /** Returns the amount of damping of the Jiggle joint at `joint_idx`. */
  get_jiggle_joint_damping(joint_idx: int): float;
  /**
   * Returns a {@link Vector2} representing the amount of gravity the Jiggle joint at `joint_idx` is influenced by.
   */
  get_jiggle_joint_gravity(joint_idx: int): Vector2;
  /** Returns the amount of mass of the jiggle joint at `joint_idx`. */
  get_jiggle_joint_mass(joint_idx: int): float;
  /**
   * Returns a boolean that indicates whether the joint at `joint_idx` is overriding the default Jiggle joint data defined in the modification.
   */
  get_jiggle_joint_override(joint_idx: int): boolean;
  /** Returns the stiffness of the Jiggle joint at `joint_idx`. */
  get_jiggle_joint_stiffness(joint_idx: int): float;
  /** Returns a boolean that indicates whether the joint at `joint_idx` is using gravity or not. */
  get_jiggle_joint_use_gravity(joint_idx: int): boolean;
  /** Returns whether the jiggle modifier is taking physics colliders into account when solving. */
  get_use_colliders(): boolean;
  /**
   * Sets the collision mask that the Jiggle modifier will use when reacting to colliders, if the Jiggle modifier is set to take colliders into account.
   */
  set_collision_mask(collision_mask: int): void;
  /** Sets the {@link Bone2D} node assigned to the Jiggle joint at `joint_idx`. */
  set_jiggle_joint_bone2d_node(joint_idx: int, bone2d_node: NodePath | string): void;
  /**
   * Sets the bone index, `bone_idx`, of the Jiggle joint at `joint_idx`. When possible, this will also update the `bone2d_node` of the Jiggle joint based on data provided by the linked skeleton.
   */
  set_jiggle_joint_bone_index(joint_idx: int, bone_idx: int): void;
  /** Sets the amount of damping of the Jiggle joint at `joint_idx`. */
  set_jiggle_joint_damping(joint_idx: int, damping: float): void;
  /** Sets the gravity vector of the Jiggle joint at `joint_idx`. */
  set_jiggle_joint_gravity(joint_idx: int, gravity: Vector2 | Vector2i): void;
  /** Sets the of mass of the Jiggle joint at `joint_idx`. */
  set_jiggle_joint_mass(joint_idx: int, mass: float): void;
  /**
   * Sets whether the Jiggle joint at `joint_idx` should override the default Jiggle joint settings. Setting this to `true` will make the joint use its own settings rather than the default ones attached to the modification.
   */
  set_jiggle_joint_override(joint_idx: int, override: boolean): void;
  /** Sets the of stiffness of the Jiggle joint at `joint_idx`. */
  set_jiggle_joint_stiffness(joint_idx: int, stiffness: float): void;
  /** Sets whether the Jiggle joint at `joint_idx` should use gravity. */
  set_jiggle_joint_use_gravity(joint_idx: int, use_gravity: boolean): void;
  /**
   * If `true`, the Jiggle modifier will take colliders into account, keeping them from entering into these collision objects.
   */
  set_use_colliders(use_colliders: boolean): void;
}
