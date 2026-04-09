// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Point sampler for a {@link Path3D}. */
declare class PathFollow3D extends Node3D {
  /**
   * If `true`, the position between two cached points is interpolated cubically, and linearly otherwise.
   * The points along the {@link Curve3D} of the {@link Path3D} are precomputed before use, for faster calculations. The point at the requested offset is then calculated interpolating between two adjacent cached points. This may present a problem if the curve makes sharp turns, as the cached points may not follow the curve closely enough.
   * There are two answers to this problem: either increase the number of cached points and increase memory consumption, or make a cubic interpolation between two points at the cost of (slightly) slower calculations.
   */
  cubic_interp: boolean;
  /** The node's offset along the curve. */
  h_offset: float;
  /**
   * If `true`, any offset outside the path's length will wrap around, instead of stopping at the ends. Use it for cyclic paths.
   */
  loop: boolean;
  /**
   * The distance from the first vertex, measured in 3D units along the path. Changing this value sets this node's position to a point within the path.
   */
  progress: float;
  /**
   * The distance from the first vertex, considering 0.0 as the first vertex and 1.0 as the last. This is just another way of expressing the progress within the path, as the progress supplied is multiplied internally by the path's length.
   * It can be set or get only if the {@link PathFollow3D} is the child of a {@link Path3D} which is part of the scene tree, and that this {@link Path3D} has a {@link Curve3D} with a non-zero length. Otherwise, trying to set this field will print an error, and getting this field will return `0.0`.
   */
  progress_ratio: float;
  /**
   * Allows or forbids rotation on one or more axes, depending on the {@link RotationMode} constants being used.
   */
  rotation_mode: int;
  /** If `true`, the tilt property of {@link Curve3D} takes effect. */
  tilt_enabled: boolean;
  /**
   * If `true`, the node moves on the travel path with orienting the +Z axis as forward. See also {@link Vector3.FORWARD} and {@link Vector3.MODEL_FRONT}.
   */
  use_model_front: boolean;
  /** The node's offset perpendicular to the curve. */
  v_offset: float;
  set_cubic_interpolation(value: boolean): void;
  get_cubic_interpolation(): boolean;
  set_h_offset(value: float): void;
  get_h_offset(): float;
  set_loop(value: boolean): void;
  has_loop(): boolean;
  set_progress(value: float): void;
  get_progress(): float;
  set_progress_ratio(value: float): void;
  get_progress_ratio(): float;
  set_rotation_mode(value: int): void;
  get_rotation_mode(): int;
  set_tilt_enabled(value: boolean): void;
  is_tilt_enabled(): boolean;
  set_use_model_front(value: boolean): void;
  is_using_model_front(): boolean;
  set_v_offset(value: float): void;
  get_v_offset(): float;

  /**
   * Correct the `transform`. `rotation_mode` implicitly specifies how posture (forward, up and sideway direction) is calculated.
   */
  static correct_posture(transform: Transform3D | Projection, rotation_mode: int): Transform3D;

  // enum RotationMode
  /** Forbids the PathFollow3D to rotate. */
  static readonly ROTATION_NONE: int;
  /** Allows the PathFollow3D to rotate in the Y axis only. */
  static readonly ROTATION_Y: int;
  /** Allows the PathFollow3D to rotate in both the X, and Y axes. */
  static readonly ROTATION_XY: int;
  /** Allows the PathFollow3D to rotate in any axis. */
  static readonly ROTATION_XYZ: int;
  /**
   * Uses the up vector information in a {@link Curve3D} to enforce orientation. This rotation mode requires the {@link Path3D}'s {@link Curve3D.up_vector_enabled} property to be set to `true`.
   */
  static readonly ROTATION_ORIENTED: int;
}
