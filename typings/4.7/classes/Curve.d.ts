// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A mathematical curve. */
declare class Curve extends Resource {
  /** The number of points to include in the baked (i.e. cached) curve data. */
  bake_resolution: int;
  /** The maximum domain (x-coordinate) that points can have. */
  max_domain: float;
  /**
   * The maximum value (y-coordinate) that points can have. Tangents can cause higher values between points.
   */
  max_value: float;
  /** The minimum domain (x-coordinate) that points can have. */
  min_domain: float;
  /**
   * The minimum value (y-coordinate) that points can have. Tangents can cause lower values between points.
   */
  min_value: float;
  /** The number of points describing the curve. */
  point_count: int;

  /**
   * Adds a point to the curve. For each side, if the `*_mode` is {@link TANGENT_LINEAR}, the `*_tangent` angle (in degrees) uses the slope of the curve halfway to the adjacent point. Allows custom assignments to the `*_tangent` angle if `*_mode` is set to {@link TANGENT_FREE}.
   */
  add_point(position: Vector2, left_tangent?: float, right_tangent?: float, left_mode?: int, right_mode?: int): int;
  /** Recomputes the baked cache of points for the curve. */
  bake(): void;
  /**
   * Removes duplicate points, i.e. points that are less than 0.00001 units (engine epsilon value) away from their neighbor on the curve.
   */
  clean_dupes(): void;
  /** Removes all points from the curve. */
  clear_points(): void;
  /** Returns the difference between {@link min_domain} and {@link max_domain}. */
  get_domain_range(): float;
  /** Returns the left {@link TangentMode} for the point at `index`. */
  get_point_left_mode(index: int): int;
  /** Returns the left tangent angle (in degrees) for the point at `index`. */
  get_point_left_tangent(index: int): float;
  /** Returns the curve coordinates for the point at `index`. */
  get_point_position(index: int): Vector2;
  /** Returns the right {@link TangentMode} for the point at `index`. */
  get_point_right_mode(index: int): int;
  /** Returns the right tangent angle (in degrees) for the point at `index`. */
  get_point_right_tangent(index: int): float;
  /** Returns the difference between {@link min_value} and {@link max_value}. */
  get_value_range(): float;
  /** Removes the point at `index` from the curve. */
  remove_point(index: int): void;
  /** Returns the Y value for the point that would exist at the X position `offset` along the curve. */
  sample(offset: float): float;
  /**
   * Returns the Y value for the point that would exist at the X position `offset` along the curve using the baked cache. Bakes the curve's points if not already baked.
   */
  sample_baked(offset: float): float;
  /** Sets the left {@link TangentMode} for the point at `index` to `mode`. */
  set_point_left_mode(index: int, mode: int): void;
  /** Sets the left tangent angle for the point at `index` to `tangent`. */
  set_point_left_tangent(index: int, tangent: float): void;
  /** Sets the offset from `0.5`. */
  set_point_offset(index: int, offset: float): int;
  /** Sets the right {@link TangentMode} for the point at `index` to `mode`. */
  set_point_right_mode(index: int, mode: int): void;
  /** Sets the right tangent angle for the point at `index` to `tangent`. */
  set_point_right_tangent(index: int, tangent: float): void;
  /** Assigns the vertical position `y` to the point at `index`. */
  set_point_value(index: int, y: float): void;

  /** Emitted when {@link max_domain} or {@link min_domain} is changed. */
  domain_changed: Signal<[]>;
  /** Emitted when {@link max_value} or {@link min_value} is changed. */
  range_changed: Signal<[]>;

  // enum TangentMode
  /** The tangent on this side of the point is user-defined. */
  static readonly TANGENT_FREE: int;
  /**
   * The curve calculates the tangent on this side of the point as the slope halfway towards the adjacent point.
   */
  static readonly TANGENT_LINEAR: int;
  /** The total number of available tangent modes. */
  static readonly TANGENT_MODE_COUNT: int;
}
