// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link SkeletonModifier3D} for aligning bones along a {@link Path3D}. */
declare class SplineIK3D extends ChainIK3D {
  /** The number of settings. */
  setting_count: int;

  /** Returns the node path of the {@link Path3D} which is describing the path. */
  get_path_3d(index: int): NodePath;
  /**
   * Returns the tilt interpolation method used between the root bone and the start point of the {@link Curve3D} when they are apart. See also {@link set_tilt_fade_in}.
   */
  get_tilt_fade_in(index: int): int;
  /**
   * Returns the tilt interpolation method used between the end bone and the end point of the {@link Curve3D} when they are apart. See also {@link set_tilt_fade_out}.
   */
  get_tilt_fade_out(index: int): int;
  /** Returns if the tilt property of the {@link Curve3D} affects the bone twist. */
  is_tilt_enabled(index: int): boolean;
  /** Sets the node path of the {@link Path3D} which is describing the path. */
  set_path_3d(index: int, path_3d: NodePath | string): void;
  /** Sets if the tilt property of the {@link Curve3D} should affect the bone twist. */
  set_tilt_enabled(index: int, enabled: boolean): void;
  /**
   * If `size` is greater than `0`, the tilt is interpolated between `size` start bones from the start point of the {@link Curve3D} when they are apart.
   * If `size` is equal `0`, the tilts between the root bone head and the start point of the {@link Curve3D} are unified with a tilt of the start point of the {@link Curve3D}.
   * If `size` is less than `0`, the tilts between the root bone and the start point of the {@link Curve3D} are `0.0`.
   */
  set_tilt_fade_in(index: int, size: int): void;
  /**
   * If `size` is greater than `0`, the tilt is interpolated between `size` end bones from the end point of the {@link Curve3D} when they are apart.
   * If `size` is equal `0`, the tilts between the end bone tail and the end point of the {@link Curve3D} are unified with a tilt of the end point of the {@link Curve3D}.
   * If `size` is less than `0`, the tilts between the end bone and the end point of the {@link Curve3D} are `0.0`.
   */
  set_tilt_fade_out(index: int, size: int): void;
}
