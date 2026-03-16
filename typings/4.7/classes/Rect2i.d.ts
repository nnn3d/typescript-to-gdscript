// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D axis-aligned bounding box using integer coordinates. */
declare class Rect2i {
  /**
   * The ending point. This is usually the bottom-right corner of the rectangle, and is equivalent to `position + size`. Setting this point affects the {@link size}.
   */
  end: Vector2i;
  /** The origin point. This is usually the top-left corner of the rectangle. */
  position: Vector2i;
  /**
   * The rectangle's width and height, starting from {@link position}. Setting this value also affects the {@link end} point.
   * **Note:** It's recommended setting the width and height to non-negative values, as most methods in Godot assume that the {@link position} is the top-left corner, and the {@link end} is the bottom-right corner. To get an equivalent rectangle with non-negative size, use {@link abs}.
   */
  size: Vector2i;

  /**
   * Returns a {@link Rect2i} equivalent to this rectangle, with its width and height modified to be non-negative values, and with its {@link position} being the top-left corner of the rectangle.
   * **Note:** It's recommended to use this method when {@link size} is negative, as most other methods in Godot assume that the {@link position} is the top-left corner, and the {@link end} is the bottom-right corner.
   */
  abs(): Rect2i;
  /** Returns `true` if this {@link Rect2i} completely encloses another one. */
  encloses(b: Rect2i): boolean;
  /**
   * Returns a copy of this rectangle expanded to align the edges with the given `to` point, if necessary.
   */
  expand(to: Vector2i): Rect2i;
  /** Returns the rectangle's area. This is equivalent to `size.x * size.y`. See also {@link has_area}. */
  get_area(): int;
  /**
   * Returns the center point of the rectangle. This is the same as `position + (size / 2)`.
   * **Note:** If the {@link size} is odd, the result will be rounded towards {@link position}.
   */
  get_center(): Vector2i;
  /**
   * Returns a copy of this rectangle extended on all sides by the given `amount`. A negative `amount` shrinks the rectangle instead. See also {@link grow_individual} and {@link grow_side}.
   */
  grow(amount: int): Rect2i;
  /**
   * Returns a copy of this rectangle with its `left`, `top`, `right`, and `bottom` sides extended by the given amounts. Negative values shrink the sides, instead. See also {@link grow} and {@link grow_side}.
   */
  grow_individual(left: int, top: int, right: int, bottom: int): Rect2i;
  /**
   * Returns a copy of this rectangle with its `side` extended by the given `amount` (see {@link Side} constants). A negative `amount` shrinks the rectangle, instead. See also {@link grow} and {@link grow_individual}.
   */
  grow_side(side: int, amount: int): Rect2i;
  /** Returns `true` if this rectangle has positive width and height. See also {@link get_area}. */
  has_area(): boolean;
  /**
   * Returns `true` if the rectangle contains the given `point`. By convention, points on the right and bottom edges are **not** included.
   * **Note:** This method is not reliable for {@link Rect2i} with a *negative* {@link size}. Use {@link abs} first to get a valid rectangle.
   */
  has_point(point: Vector2i): boolean;
  /**
   * Returns the intersection between this rectangle and `b`. If the rectangles do not intersect, returns an empty {@link Rect2i}.
   * **Note:** If you only need to know whether two rectangles are overlapping, use {@link intersects}, instead.
   */
  intersection(b: Rect2i): Rect2i;
  /**
   * Returns `true` if this rectangle overlaps with the `b` rectangle. The edges of both rectangles are excluded.
   */
  intersects(b: Rect2i): boolean;
  /**
   * Returns a {@link Rect2i} that encloses both this rectangle and `b` around the edges. See also {@link encloses}.
   */
  merge(b: Rect2i): Rect2i;

  // Operator overloads
  [__ne]: { right: Rect2i; ret: boolean };
  [__eq]: { right: Rect2i; ret: boolean };
}
