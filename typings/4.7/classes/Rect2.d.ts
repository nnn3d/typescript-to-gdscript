// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D axis-aligned bounding box using floating-point coordinates. */
interface Rect2 {
  /**
   * The ending point. This is usually the bottom-right corner of the rectangle, and is equivalent to `position + size`. Setting this point affects the {@link size}.
   */
  end: Vector2;
  /** The origin point. This is usually the top-left corner of the rectangle. */
  position: Vector2;
  /**
   * The rectangle's width and height, starting from {@link position}. Setting this value also affects the {@link end} point.
   * **Note:** It's recommended setting the width and height to non-negative values, as most methods in Godot assume that the {@link position} is the top-left corner, and the {@link end} is the bottom-right corner. To get an equivalent rectangle with non-negative size, use {@link abs}.
   */
  size: Vector2;

  /**
   * Returns a {@link Rect2} equivalent to this rectangle, with its width and height modified to be non-negative values, and with its {@link position} being the top-left corner of the rectangle.
   * **Note:** It's recommended to use this method when {@link size} is negative, as most other methods in Godot assume that the {@link position} is the top-left corner, and the {@link end} is the bottom-right corner.
   */
  abs(): Rect2;
  /** Returns `true` if this rectangle *completely* encloses the `b` rectangle. */
  encloses(b: Rect2): boolean;
  /**
   * Returns a copy of this rectangle expanded to align the edges with the given `to` point, if necessary.
   */
  expand(to: Vector2): Rect2;
  /** Returns the rectangle's area. This is equivalent to `size.x * size.y`. See also {@link has_area}. */
  get_area(): float;
  /** Returns the center point of the rectangle. This is the same as `position + (size / 2.0)`. */
  get_center(): Vector2;
  /**
   * Returns the vertex's position of this rect that's the farthest in the given direction. This point is commonly known as the support point in collision detection algorithms.
   */
  get_support(direction: Vector2): Vector2;
  /**
   * Returns a copy of this rectangle extended on all sides by the given `amount`. A negative `amount` shrinks the rectangle instead. See also {@link grow_individual} and {@link grow_side}.
   */
  grow(amount: float): Rect2;
  /**
   * Returns a copy of this rectangle with its `left`, `top`, `right`, and `bottom` sides extended by the given amounts. Negative values shrink the sides, instead. See also {@link grow} and {@link grow_side}.
   */
  grow_individual(left: float, top: float, right: float, bottom: float): Rect2;
  /**
   * Returns a copy of this rectangle with its `side` extended by the given `amount` (see {@link Side} constants). A negative `amount` shrinks the rectangle, instead. See also {@link grow} and {@link grow_individual}.
   */
  grow_side(side: int, amount: float): Rect2;
  /** Returns `true` if this rectangle has positive width and height. See also {@link get_area}. */
  has_area(): boolean;
  /**
   * Returns `true` if the rectangle contains the given `point`. By convention, points on the right and bottom edges are **not** included.
   * **Note:** This method is not reliable for {@link Rect2} with a *negative* {@link size}. Use {@link abs} first to get a valid rectangle.
   */
  has_point(point: Vector2): boolean;
  /**
   * Returns the intersection between this rectangle and `b`. If the rectangles do not intersect, returns an empty {@link Rect2}.
   * **Note:** If you only need to know whether two rectangles are overlapping, use {@link intersects}, instead.
   */
  intersection(b: Rect2): Rect2;
  /**
   * Returns `true` if this rectangle overlaps with the `b` rectangle. The edges of both rectangles are excluded, unless `include_borders` is `true`.
   */
  intersects(b: Rect2, include_borders?: boolean): boolean;
  /**
   * Returns `true` if this rectangle and `rect` are approximately equal, by calling {@link Vector2.is_equal_approx} on the {@link position} and the {@link size}.
   */
  is_equal_approx(rect: Rect2): boolean;
  /**
   * Returns `true` if this rectangle's values are finite, by calling {@link Vector2.is_finite} on the {@link position} and the {@link size}.
   */
  is_finite(): boolean;
  /**
   * Returns a {@link Rect2} that encloses both this rectangle and `b` around the edges. See also {@link encloses}.
   */
  merge(b: Rect2): Rect2;

  // Operator overloads
  [__ne]: { right: Rect2; ret: boolean };
  [__mul]: { right: Transform2D; ret: Rect2 };
  [__eq]: { right: Rect2; ret: boolean };

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

interface Rect2Constructor {
  /** Constructs a {@link Rect2} with its {@link position} and {@link size} set to {@link Vector2.ZERO}. */
  (): Rect2;
  /** Constructs a {@link Rect2} as a copy of the given {@link Rect2}. */
  (from_: Rect2): Rect2;
  /** Constructs a {@link Rect2} from a {@link Rect2i}. */
  (from_: Rect2i): Rect2;
  /** Constructs a {@link Rect2} by `position` and `size`. */
  (position: Vector2, size: Vector2): Rect2;
  /**
   * Constructs a {@link Rect2} by setting its {@link position} to (`x`, `y`), and its {@link size} to (`width`, `height`).
   */
  (x: float, y: float, width: float, height: float): Rect2;
}
declare const Rect2: Rect2Constructor;
