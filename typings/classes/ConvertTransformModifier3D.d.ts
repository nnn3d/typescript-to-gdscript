// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link SkeletonModifier3D} that apply transform to the bone which converted from reference. */
declare class ConvertTransformModifier3D extends BoneConstraint3D {
  /** The number of settings in the modifier. */
  setting_count: int;

  /** Returns the axis of the remapping destination transform. */
  get_apply_axis(index: int): int;
  /** Returns the maximum value of the remapping destination range. */
  get_apply_range_max(index: int): float;
  /** Returns the minimum value of the remapping destination range. */
  get_apply_range_min(index: int): float;
  /** Returns the operation of the remapping destination transform. */
  get_apply_transform_mode(index: int): int;
  /** Returns the axis of the remapping source transform. */
  get_reference_axis(index: int): int;
  /** Returns the maximum value of the remapping source range. */
  get_reference_range_max(index: int): float;
  /** Returns the minimum value of the remapping source range. */
  get_reference_range_min(index: int): float;
  /** Returns the operation of the remapping source transform. */
  get_reference_transform_mode(index: int): int;
  /** Returns `true` if the additive option is enabled in the setting at `index`. */
  is_additive(index: int): boolean;
  /** Returns `true` if the relative option is enabled in the setting at `index`. */
  is_relative(index: int): boolean;
  /**
   * Sets additive option in the setting at `index` to `enabled`. This mainly affects the process of applying transform to the {@link BoneConstraint3D.set_apply_bone}.
   * If sets `enabled` to `true`, the processed transform is added to the pose of the current apply bone.
   * If sets `enabled` to `false`, the pose of the current apply bone is replaced with the processed transform. However, if set {@link set_relative} to `true`, the transform is relative to rest.
   */
  set_additive(index: int, enabled: boolean): void;
  /** Sets the axis of the remapping destination transform. */
  set_apply_axis(index: int, axis: int): void;
  /** Sets the maximum value of the remapping destination range. */
  set_apply_range_max(index: int, range_max: float): void;
  /** Sets the minimum value of the remapping destination range. */
  set_apply_range_min(index: int, range_min: float): void;
  /** Sets the operation of the remapping destination transform. */
  set_apply_transform_mode(index: int, transform_mode: int): void;
  /** Sets the axis of the remapping source transform. */
  set_reference_axis(index: int, axis: int): void;
  /** Sets the maximum value of the remapping source range. */
  set_reference_range_max(index: int, range_max: float): void;
  /** Sets the minimum value of the remapping source range. */
  set_reference_range_min(index: int, range_min: float): void;
  /** Sets the operation of the remapping source transform. */
  set_reference_transform_mode(index: int, transform_mode: int): void;
  /**
   * Sets relative option in the setting at `index` to `enabled`.
   * If sets `enabled` to `true`, the extracted and applying transform is relative to the rest.
   * If sets `enabled` to `false`, the extracted transform is absolute.
   */
  set_relative(index: int, enabled: boolean): void;

  // enum TransformMode
  /** Convert with position. Transfer the difference. */
  static readonly TRANSFORM_MODE_POSITION: int;
  /** Convert with rotation. The angle is the roll for the specified axis. */
  static readonly TRANSFORM_MODE_ROTATION: int;
  /** Convert with scale. Transfers the ratio, not the difference. */
  static readonly TRANSFORM_MODE_SCALE: int;
}
