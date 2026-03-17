// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D axis-aligned bounding box. */
interface AABB {
  /**
   * The ending point. This is usually the corner on the top-right and back of the bounding box, and is equivalent to `position + size`. Setting this point affects the {@link size}.
   */
  end: Vector3;
  /** The origin point. This is usually the corner on the bottom-left and forward of the bounding box. */
  position: Vector3;
  /**
   * The bounding box's width, height, and depth starting from {@link position}. Setting this value also affects the {@link end} point.
   * **Note:** It's recommended setting the width, height, and depth to non-negative values. This is because most methods in Godot assume that the {@link position} is the bottom-left-forward corner, and the {@link end} is the top-right-back corner. To get an equivalent bounding box with non-negative size, use {@link abs}.
   */
  size: Vector3;

  /**
   * Returns an {@link AABB} equivalent to this bounding box, with its width, height, and depth modified to be non-negative values.
   * **Note:** It's recommended to use this method when {@link size} is negative, as most other methods in Godot assume that the {@link size}'s components are greater than `0`.
   */
  abs(): AABB;
  /**
   * Returns `true` if this bounding box *completely* encloses the `with` box. The edges of both boxes are included.
   */
  encloses(with_: AABB): boolean;
  /**
   * Returns a copy of this bounding box expanded to align the edges with the given `to_point`, if necessary.
   */
  expand(to_point: Vector3): AABB;
  /** Returns the center point of the bounding box. This is the same as `position + (size / 2.0)`. */
  get_center(): Vector3;
  /**
   * Returns the position of one of the 8 vertices that compose this bounding box. With an `idx` of `0` this is the same as {@link position}, and an `idx` of `7` is the same as {@link end}.
   */
  get_endpoint(idx: int): Vector3;
  /**
   * Returns the longest normalized axis of this bounding box's {@link size}, as a {@link Vector3} ({@link Vector3.RIGHT}, {@link Vector3.UP}, or {@link Vector3.BACK}).
   * See also {@link get_longest_axis_index} and {@link get_longest_axis_size}.
   */
  get_longest_axis(): Vector3;
  /**
   * Returns the index to the longest axis of this bounding box's {@link size} (see {@link Vector3.AXIS_X}, {@link Vector3.AXIS_Y}, and {@link Vector3.AXIS_Z}).
   * For an example, see {@link get_longest_axis}.
   */
  get_longest_axis_index(): int;
  /**
   * Returns the longest dimension of this bounding box's {@link size}.
   * For an example, see {@link get_longest_axis}.
   */
  get_longest_axis_size(): float;
  /**
   * Returns the shortest normalized axis of this bounding box's {@link size}, as a {@link Vector3} ({@link Vector3.RIGHT}, {@link Vector3.UP}, or {@link Vector3.BACK}).
   * See also {@link get_shortest_axis_index} and {@link get_shortest_axis_size}.
   */
  get_shortest_axis(): Vector3;
  /**
   * Returns the index to the shortest axis of this bounding box's {@link size} (see {@link Vector3.AXIS_X}, {@link Vector3.AXIS_Y}, and {@link Vector3.AXIS_Z}).
   * For an example, see {@link get_shortest_axis}.
   */
  get_shortest_axis_index(): int;
  /**
   * Returns the shortest dimension of this bounding box's {@link size}.
   * For an example, see {@link get_shortest_axis}.
   */
  get_shortest_axis_size(): float;
  /**
   * Returns the vertex's position of this bounding box that's the farthest in the given direction. This point is commonly known as the support point in collision detection algorithms.
   */
  get_support(direction: Vector3): Vector3;
  /**
   * Returns the bounding box's volume. This is equivalent to `size.x * size.y * size.z`. See also {@link has_volume}.
   */
  get_volume(): float;
  /**
   * Returns a copy of this bounding box extended on all sides by the given amount `by`. A negative amount shrinks the box instead.
   */
  grow(by: float): AABB;
  /**
   * Returns `true` if the bounding box contains the given `point`. By convention, points exactly on the right, top, and front sides are **not** included.
   * **Note:** This method is not reliable for {@link AABB} with a *negative* {@link size}. Use {@link abs} first to get a valid bounding box.
   */
  has_point(point: Vector3): boolean;
  /**
   * Returns `true` if this bounding box has a surface or a length, that is, at least one component of {@link size} is greater than `0`. Otherwise, returns `false`.
   */
  has_surface(): boolean;
  /**
   * Returns `true` if this bounding box's width, height, and depth are all positive. See also {@link get_volume}.
   */
  has_volume(): boolean;
  /**
   * Returns the intersection between this bounding box and `with`. If the boxes do not intersect, returns an empty {@link AABB}. If the boxes intersect at the edge, returns a flat {@link AABB} with no volume (see {@link has_surface} and {@link has_volume}).
   * **Note:** If you only need to know whether two bounding boxes are intersecting, use {@link intersects}, instead.
   */
  intersection(with_: AABB): AABB;
  /**
   * Returns `true` if this bounding box overlaps with the box `with`. The edges of both boxes are *always* excluded.
   */
  intersects(with_: AABB): boolean;
  /** Returns `true` if this bounding box is on both sides of the given `plane`. */
  intersects_plane(plane: Plane): boolean;
  /**
   * Returns the first point where this bounding box and the given ray intersect, as a {@link Vector3}. If no intersection occurs, returns `null`.
   * The ray begin at `from`, faces `dir` and extends towards infinity.
   */
  intersects_ray(from_: Vector3, dir: Vector3): unknown;
  /**
   * Returns the first point where this bounding box and the given segment intersect, as a {@link Vector3}. If no intersection occurs, returns `null`.
   * The segment begins at `from` and ends at `to`.
   */
  intersects_segment(from_: Vector3, to: Vector3): unknown;
  /**
   * Returns `true` if this bounding box and `aabb` are approximately equal, by calling {@link Vector3.is_equal_approx} on the {@link position} and the {@link size}.
   */
  is_equal_approx(aabb: AABB): boolean;
  /**
   * Returns `true` if this bounding box's values are finite, by calling {@link Vector3.is_finite} on the {@link position} and the {@link size}.
   */
  is_finite(): boolean;
  /**
   * Returns an {@link AABB} that encloses both this bounding box and `with` around the edges. See also {@link encloses}.
   */
  merge(with_: AABB): AABB;

  // Operator overloads
  [__ne]: { right: AABB; ret: boolean };
  [__mul]: { right: Transform3D; ret: AABB };
  [__eq]: { right: AABB; ret: boolean };

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  clear: never;
  duplicate: never;
  duplicate_deep: never;
  erase: never;
  find_key: never;
  get: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has: never;
  has_all: never;
  hash: never;
  is_empty: never;
  is_read_only: never;
  is_same_typed: never;
  is_same_typed_key: never;
  is_same_typed_value: never;
  is_typed: never;
  is_typed_key: never;
  is_typed_value: never;
  keys: never;
  make_read_only: never;
  merged: never;
  recursive_equal: never;
  set: never;
  sort: never;
  values: never;
}

interface AABBConstructor {
  /** Constructs an {@link AABB} with its {@link position} and {@link size} set to {@link Vector3.ZERO}. */
  (): AABB;
  /** Constructs an {@link AABB} as a copy of the given {@link AABB}. */
  (from_: AABB): AABB;
  /** Constructs an {@link AABB} by `position` and `size`. */
  (position: Vector3, size: Vector3): AABB;
}
declare const AABB: AABBConstructor;
