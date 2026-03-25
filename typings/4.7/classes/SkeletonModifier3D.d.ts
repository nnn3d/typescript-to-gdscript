// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node that may modify a Skeleton3D's bones. */
declare class SkeletonModifier3D<Tree extends object = any> extends Node3D<Tree> {
  /** If `true`, the {@link SkeletonModifier3D} will be processing. */
  active: boolean;
  /**
   * Sets the influence of the modification.
   * **Note:** This value is used by {@link Skeleton3D} to blend, so the {@link SkeletonModifier3D} should always apply only 100% of the result without interpolation.
   */
  influence: float;
  set_active(value: boolean): void;
  is_active(): boolean;
  set_influence(value: float): void;
  get_influence(): float;

  /**
   * Override this virtual method to implement a custom skeleton modifier. You should do things like get the {@link Skeleton3D}'s current pose and apply the pose here.
   * {@link _process_modification} must not apply {@link influence} to bone poses because the {@link Skeleton3D} automatically applies influence to all bone poses set by the modifier.
   */
  _process_modification(): void;
  /**
   * Override this virtual method to implement a custom skeleton modifier. You should do things like get the {@link Skeleton3D}'s current pose and apply the pose here.
   * {@link _process_modification_with_delta} must not apply {@link influence} to bone poses because the {@link Skeleton3D} automatically applies influence to all bone poses set by the modifier.
   * `delta` is passed from parent {@link Skeleton3D}. See also {@link Skeleton3D.advance}.
   * **Note:** This method may be called outside {@link Node._process} and {@link Node._physics_process} with `delta` is `0.0`, since the modification should be processed immediately after initialization of the {@link Skeleton3D}.
   */
  _process_modification_with_delta(delta: float): void;
  /** Called when the skeleton is changed. */
  _skeleton_changed(old_skeleton: Skeleton3D, new_skeleton: Skeleton3D): void;
  /**
   * Called when bone names and indices need to be validated, such as when entering the scene tree or changing skeleton.
   */
  _validate_bone_names(): void;
  /** Returns the parent {@link Skeleton3D} node if it exists. Otherwise, returns `null`. */
  get_skeleton(): Skeleton3D;

  /**
   * Notifies when the modification have been finished.
   * **Note:** If you want to get the modified bone pose by the modifier, you must use {@link Skeleton3D.get_bone_pose} or {@link Skeleton3D.get_bone_global_pose} at the moment this signal is fired.
   */
  modification_processed: Signal<[]>;

  // enum BoneAxis
  /** Enumerated value for the +X axis. */
  static readonly BONE_AXIS_PLUS_X: int;
  /** Enumerated value for the -X axis. */
  static readonly BONE_AXIS_MINUS_X: int;
  /** Enumerated value for the +Y axis. */
  static readonly BONE_AXIS_PLUS_Y: int;
  /** Enumerated value for the -Y axis. */
  static readonly BONE_AXIS_MINUS_Y: int;
  /** Enumerated value for the +Z axis. */
  static readonly BONE_AXIS_PLUS_Z: int;
  /** Enumerated value for the -Z axis. */
  static readonly BONE_AXIS_MINUS_Z: int;
  // enum BoneDirection
  /** Enumerated value for the +X axis. */
  static readonly BONE_DIRECTION_PLUS_X: int;
  /** Enumerated value for the -X axis. */
  static readonly BONE_DIRECTION_MINUS_X: int;
  /** Enumerated value for the +Y axis. */
  static readonly BONE_DIRECTION_PLUS_Y: int;
  /** Enumerated value for the -Y axis. */
  static readonly BONE_DIRECTION_MINUS_Y: int;
  /** Enumerated value for the +Z axis. */
  static readonly BONE_DIRECTION_PLUS_Z: int;
  /** Enumerated value for the -Z axis. */
  static readonly BONE_DIRECTION_MINUS_Z: int;
  /** Enumerated value for the axis from a parent bone to the child bone. */
  static readonly BONE_DIRECTION_FROM_PARENT: int;
  // enum SecondaryDirection
  /** Enumerated value for the case when the axis is undefined. */
  static readonly SECONDARY_DIRECTION_NONE: int;
  /** Enumerated value for the +X axis. */
  static readonly SECONDARY_DIRECTION_PLUS_X: int;
  /** Enumerated value for the -X axis. */
  static readonly SECONDARY_DIRECTION_MINUS_X: int;
  /** Enumerated value for the +Y axis. */
  static readonly SECONDARY_DIRECTION_PLUS_Y: int;
  /** Enumerated value for the -Y axis. */
  static readonly SECONDARY_DIRECTION_MINUS_Y: int;
  /** Enumerated value for the +Z axis. */
  static readonly SECONDARY_DIRECTION_PLUS_Z: int;
  /** Enumerated value for the -Z axis. */
  static readonly SECONDARY_DIRECTION_MINUS_Z: int;
  /** Enumerated value for an optional axis. */
  static readonly SECONDARY_DIRECTION_CUSTOM: int;
  // enum RotationAxis
  /** Enumerated value for the rotation of the X axis. */
  static readonly ROTATION_AXIS_X: int;
  /** Enumerated value for the rotation of the Y axis. */
  static readonly ROTATION_AXIS_Y: int;
  /** Enumerated value for the rotation of the Z axis. */
  static readonly ROTATION_AXIS_Z: int;
  /** Enumerated value for the unconstrained rotation. */
  static readonly ROTATION_AXIS_ALL: int;
  /** Enumerated value for an optional rotation axis. */
  static readonly ROTATION_AXIS_CUSTOM: int;
}
