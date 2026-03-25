// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A node used to rotate all bones of a {@link Skeleton3D} bone chain a way that places the end bone at a desired 3D position.
 */
declare class SkeletonIK3D<Tree extends object = any> extends SkeletonModifier3D<Tree> {
  /**
   * Interpolation value for how much the IK results are applied to the current skeleton bone chain. A value of `1.0` will overwrite all skeleton bone transforms completely while a value of `0.0` will visually disable the SkeletonIK.
   */
  interpolation: float;
  /**
   * Secondary target position (first is {@link target} property or {@link target_node}) for the IK chain. Use magnet position (pole target) to control the bending of the IK chain. Only works if the bone chain has more than 2 bones. The middle chain bone position will be linearly interpolated with the magnet position.
   */
  magnet: Vector3;
  /**
   * Number of iteration loops used by the IK solver to produce more accurate (and elegant) bone chain results.
   */
  max_iterations: int;
  /**
   * The minimum distance between bone and goal target. If the distance is below this value, the IK solver stops further iterations.
   */
  min_distance: float;
  /**
   * If `true` overwrites the rotation of the tip bone with the rotation of the {@link target} (or {@link target_node} if defined).
   */
  override_tip_basis: boolean;
  /** The name of the current root bone, the first bone in the IK chain. */
  root_bone: string;
  /**
   * First target of the IK chain where the tip bone is placed and, if {@link override_tip_basis} is `true`, how the tip bone is rotated. If a {@link target_node} path is available the nodes transform is used instead and this property is ignored.
   */
  target: Transform3D;
  /**
   * Target node {@link NodePath} for the IK chain. If available, the node's current {@link Transform3D} is used instead of the {@link target} property.
   */
  target_node: string;
  /**
   * The name of the current tip bone, the last bone in the IK chain placed at the {@link target} transform (or {@link target_node} if defined).
   */
  tip_bone: string;
  /**
   * If `true`, instructs the IK solver to consider the secondary magnet target (pole target) when calculating the bone chain. Use the magnet position (pole target) to control the bending of the IK chain.
   */
  use_magnet: boolean;
  set_interpolation(value: float): void;
  get_interpolation(): float;
  set_magnet_position(value: Vector3): void;
  get_magnet_position(): Vector3;
  set_max_iterations(value: int): void;
  get_max_iterations(): int;
  set_min_distance(value: float): void;
  get_min_distance(): float;
  set_override_tip_basis(value: boolean): void;
  is_override_tip_basis(): boolean;
  set_root_bone(value: string): void;
  get_root_bone(): string;
  set_target_transform(value: Transform3D): void;
  get_target_transform(): Transform3D;
  set_target_node(value: string): void;
  get_target_node(): string;
  set_tip_bone(value: string): void;
  get_tip_bone(): string;
  set_use_magnet(value: boolean): void;
  is_using_magnet(): boolean;

  /**
   * Returns the parent {@link Skeleton3D} node that was present when SkeletonIK entered the scene tree. Returns `null` if the parent node was not a {@link Skeleton3D} node when SkeletonIK3D entered the scene tree.
   */
  get_parent_skeleton(): Skeleton3D;
  /**
   * Returns `true` if SkeletonIK is applying IK effects on continues frames to the {@link Skeleton3D} bones. Returns `false` if SkeletonIK is stopped or {@link start} was used with the `one_time` parameter set to `true`.
   */
  is_running(): boolean;
  /**
   * Starts applying IK effects on each frame to the {@link Skeleton3D} bones but will only take effect starting on the next frame. If `one_time` is `true`, this will take effect immediately but also reset on the next frame.
   */
  start(one_time?: boolean): void;
  /**
   * Stops applying IK effects on each frame to the {@link Skeleton3D} bones and also calls {@link Skeleton3D.clear_bones_global_pose_override} to remove existing overrides on all bones.
   */
  stop(): void;
}
