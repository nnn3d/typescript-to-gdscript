// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * A {@link RigidBody2D}-derived node used to make {@link Bone2D}s in a {@link Skeleton2D} react to physics.
 */
declare class PhysicalBone2D extends RigidBody2D {
  /**
   * If `true`, the {@link PhysicalBone2D} will automatically configure the first {@link Joint2D} child node. The automatic configuration is limited to setting up the node properties and positioning the {@link Joint2D}.
   */
  auto_configure_joint: boolean;
  /** The index of the {@link Bone2D} that this {@link PhysicalBone2D} should simulate. */
  bone2d_index: int;
  /** The {@link NodePath} to the {@link Bone2D} that this {@link PhysicalBone2D} should simulate. */
  bone2d_nodepath: NodePath;
  /**
   * If `true`, the {@link PhysicalBone2D} will keep the transform of the bone it is bound to when simulating physics.
   */
  follow_bone_when_simulating: boolean;
  /**
   * If `true`, the {@link PhysicalBone2D} will start simulating using physics. If `false`, the {@link PhysicalBone2D} will follow the transform of the {@link Bone2D} node.
   * **Note:** To have the {@link Bone2D}s visually follow the {@link PhysicalBone2D}, use a {@link SkeletonModification2DPhysicalBones} modification on the {@link Skeleton2D} node with the {@link Bone2D} nodes.
   */
  simulate_physics: boolean;
  set_auto_configure_joint(value: boolean): void;
  get_auto_configure_joint(): boolean;
  set_bone2d_index(value: int): void;
  get_bone2d_index(): int;
  set_bone2d_nodepath(value: NodePath | string): void;
  get_bone2d_nodepath(): NodePath;
  set_follow_bone_when_simulating(value: boolean): void;
  get_follow_bone_when_simulating(): boolean;
  set_simulate_physics(value: boolean): void;
  get_simulate_physics(): boolean;

  /**
   * Returns the first {@link Joint2D} child node, if one exists. This is mainly a helper function to make it easier to get the {@link Joint2D} that the {@link PhysicalBone2D} is autoconfiguring.
   */
  get_joint(): Joint2D | null;
  /**
   * Returns a boolean that indicates whether the {@link PhysicalBone2D} is running and simulating using the Godot 2D physics engine. When `true`, the PhysicalBone2D node is using physics.
   */
  is_simulating_physics(): boolean;
}
