// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A {@link SkeletonModifier3D} that apply transform to the bone which copied from reference. */
declare class CopyTransformModifier3D<Tree extends object = any> extends BoneConstraint3D<Tree> {
  /** The number of settings in the modifier. */
  setting_count: int;

  /** Returns the axis flags of the setting at `index`. */
  get_axis_flags(index: int): int;
  /** Returns the copy flags of the setting at `index`. */
  get_copy_flags(index: int): int;
  /** Returns the invert flags of the setting at `index`. */
  get_invert_flags(index: int): int;
  /** Returns `true` if the additive option is enabled in the setting at `index`. */
  is_additive(index: int): boolean;
  /**
   * Returns `true` if the enable flags has the flag for the X-axis in the setting at `index`. See also {@link set_axis_flags}.
   */
  is_axis_x_enabled(index: int): boolean;
  /**
   * Returns `true` if the invert flags has the flag for the X-axis in the setting at `index`. See also {@link set_invert_flags}.
   */
  is_axis_x_inverted(index: int): boolean;
  /**
   * Returns `true` if the enable flags has the flag for the Y-axis in the setting at `index`. See also {@link set_axis_flags}.
   */
  is_axis_y_enabled(index: int): boolean;
  /**
   * Returns `true` if the invert flags has the flag for the Y-axis in the setting at `index`. See also {@link set_invert_flags}.
   */
  is_axis_y_inverted(index: int): boolean;
  /**
   * Returns `true` if the enable flags has the flag for the Z-axis in the setting at `index`. See also {@link set_axis_flags}.
   */
  is_axis_z_enabled(index: int): boolean;
  /**
   * Returns `true` if the invert flags has the flag for the Z-axis in the setting at `index`. See also {@link set_invert_flags}.
   */
  is_axis_z_inverted(index: int): boolean;
  /**
   * Returns `true` if the copy flags has the flag for the position in the setting at `index`. See also {@link set_copy_flags}.
   */
  is_position_copying(index: int): boolean;
  /** Returns `true` if the relative option is enabled in the setting at `index`. */
  is_relative(index: int): boolean;
  /**
   * Returns `true` if the copy flags has the flag for the rotation in the setting at `index`. See also {@link set_copy_flags}.
   */
  is_rotation_copying(index: int): boolean;
  /**
   * Returns `true` if the copy flags has the flag for the scale in the setting at `index`. See also {@link set_copy_flags}.
   */
  is_scale_copying(index: int): boolean;
  /**
   * Sets additive option in the setting at `index` to `enabled`. This mainly affects the process of applying transform to the {@link BoneConstraint3D.set_apply_bone}.
   * If sets `enabled` to `true`, the processed transform is added to the pose of the current apply bone.
   * If sets `enabled` to `false`, the pose of the current apply bone is replaced with the processed transform. However, if set {@link set_relative} to `true`, the transform is relative to rest.
   */
  set_additive(index: int, enabled: boolean): void;
  /** Sets the flags to copy axes. If the flag is valid, the axis is copied. */
  set_axis_flags(index: int, axis_flags: int): void;
  /** If sets `enabled` to `true`, the X-axis will be copied. */
  set_axis_x_enabled(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the X-axis will be inverted. */
  set_axis_x_inverted(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the Y-axis will be copied. */
  set_axis_y_enabled(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the Y-axis will be inverted. */
  set_axis_y_inverted(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the Z-axis will be copied. */
  set_axis_z_enabled(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the Z-axis will be inverted. */
  set_axis_z_inverted(index: int, enabled: boolean): void;
  /**
   * Sets the flags to process the transform operations. If the flag is valid, the transform operation is processed.
   * **Note:** If the rotation is valid for only one axis, it respects the roll of the valid axis. If the rotation is valid for two axes, it discards the roll of the invalid axis.
   */
  set_copy_flags(index: int, copy_flags: int): void;
  /** If sets `enabled` to `true`, the position will be copied. */
  set_copy_position(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the rotation will be copied. */
  set_copy_rotation(index: int, enabled: boolean): void;
  /** If sets `enabled` to `true`, the scale will be copied. */
  set_copy_scale(index: int, enabled: boolean): void;
  /**
   * Sets the flags to inverte axes. If the flag is valid, the axis is copied.
   * **Note:** An inverted scale means an inverse number, not a negative scale. For example, inverting `2.0` means `0.5`.
   * **Note:** An inverted rotation flips the elements of the quaternion. For example, a two-axis inversion will flip the roll of each axis, and a three-axis inversion will flip the final orientation. However, be aware that flipping only one axis may cause unintended rotation by the unflipped axes, due to the characteristics of the quaternion.
   */
  set_invert_flags(index: int, axis_flags: int): void;
  /**
   * Sets relative option in the setting at `index` to `enabled`.
   * If sets `enabled` to `true`, the extracted and applying transform is relative to the rest.
   * If sets `enabled` to `false`, the extracted transform is absolute.
   */
  set_relative(index: int, enabled: boolean): void;

  // enum TransformFlag
  /** If set, allows to copy the position. */
  static readonly TRANSFORM_FLAG_POSITION: int;
  /** If set, allows to copy the rotation. */
  static readonly TRANSFORM_FLAG_ROTATION: int;
  /** If set, allows to copy the scale. */
  static readonly TRANSFORM_FLAG_SCALE: int;
  /** If set, allows to copy the position/rotation/scale. */
  static readonly TRANSFORM_FLAG_ALL: int;
  // enum AxisFlag
  /** If set, allows to process the X-axis. */
  static readonly AXIS_FLAG_X: int;
  /** If set, allows to process the Y-axis. */
  static readonly AXIS_FLAG_Y: int;
  /** If set, allows to process the Z-axis. */
  static readonly AXIS_FLAG_Z: int;
  /** If set, allows to process the all axes. */
  static readonly AXIS_FLAG_ALL: int;
}
