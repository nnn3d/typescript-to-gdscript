// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Point sampler for a {@link Path2D}. */
declare class PathFollow2D extends Node2D {
  /**
   * If `true`, the position between two cached points is interpolated cubically, and linearly otherwise.
   * The points along the {@link Curve2D} of the {@link Path2D} are precomputed before use, for faster calculations. The point at the requested offset is then calculated interpolating between two adjacent cached points. This may present a problem if the curve makes sharp turns, as the cached points may not follow the curve closely enough.
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
   * The distance along the path, in pixels. Changing this value sets this node's position to a point within the path.
   */
  progress: float;
  /**
   * The distance along the path as a number in the range 0.0 (for the first vertex) to 1.0 (for the last). This is just another way of expressing the progress within the path, as the offset supplied is multiplied internally by the path's length.
   * It can be set or get only if the {@link PathFollow2D} is the child of a {@link Path2D} which is part of the scene tree, and that this {@link Path2D} has a {@link Curve2D} with a non-zero length. Otherwise, trying to set this field will print an error, and getting this field will return `0.0`.
   */
  progress_ratio: float;
  /** If `true`, this node rotates to follow the path, with the +X direction facing forward on the path. */
  rotates: boolean;
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
  set_rotates(value: boolean): void;
  is_rotating(): boolean;
  set_v_offset(value: float): void;
  get_v_offset(): float;
}
