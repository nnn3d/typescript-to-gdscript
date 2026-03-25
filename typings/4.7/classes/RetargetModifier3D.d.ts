// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A modifier to transfer parent skeleton poses (or global poses) to child skeletons in model space with different rests.
 */
declare class RetargetModifier3D<Tree extends object = any> extends SkeletonModifier3D<Tree> {
  /**
   * Flags to control the process of the transform elements individually when {@link use_global_pose} is disabled.
   */
  enable: int;
  /** {@link SkeletonProfile} for retargeting bones with names matching the bone list. */
  profile: SkeletonProfile;
  /**
   * If `false`, in case the target skeleton has fewer bones than the source skeleton, the source bone parent's transform will be ignored.
   * Instead, it is possible to retarget between models with different body shapes, and position, rotation, and scale can be retargeted separately.
   * If `true`, retargeting is performed taking into account global pose.
   * In case the target skeleton has fewer bones than the source skeleton, the source bone parent's transform is taken into account. However, bone length between skeletons must match exactly, if not, the bones will be forced to expand or shrink.
   * This is useful for using dummy bone with length `0` to match postures when retargeting between models with different number of bones.
   */
  use_global_pose: boolean;
  set_enable_flags(value: int): void;
  get_enable_flags(): int;
  set_profile(value: SkeletonProfile): void;
  get_profile(): SkeletonProfile;
  set_use_global_pose(value: boolean): void;
  is_using_global_pose(): boolean;

  /** Returns `true` if {@link enable} has {@link TRANSFORM_FLAG_POSITION}. */
  is_position_enabled(): boolean;
  /** Returns `true` if {@link enable} has {@link TRANSFORM_FLAG_ROTATION}. */
  is_rotation_enabled(): boolean;
  /** Returns `true` if {@link enable} has {@link TRANSFORM_FLAG_SCALE}. */
  is_scale_enabled(): boolean;
  /** Sets {@link TRANSFORM_FLAG_POSITION} into {@link enable}. */
  set_position_enabled(enabled: boolean): void;
  /** Sets {@link TRANSFORM_FLAG_ROTATION} into {@link enable}. */
  set_rotation_enabled(enabled: boolean): void;
  /** Sets {@link TRANSFORM_FLAG_SCALE} into {@link enable}. */
  set_scale_enabled(enabled: boolean): void;

  // enum TransformFlag
  /** If set, allows to retarget the position. */
  static readonly TRANSFORM_FLAG_POSITION: int;
  /** If set, allows to retarget the rotation. */
  static readonly TRANSFORM_FLAG_ROTATION: int;
  /** If set, allows to retarget the scale. */
  static readonly TRANSFORM_FLAG_SCALE: int;
  /** If set, allows to retarget the position/rotation/scale. */
  static readonly TRANSFORM_FLAG_ALL: int;
}
