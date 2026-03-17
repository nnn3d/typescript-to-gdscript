// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2×3 matrix representing a 2D transformation. */
interface Transform2D {
  /**
   * The translation offset of this transform, and the column `2` of the matrix. In 2D space, this can be seen as the position.
   */
  origin: Vector2;
  /**
   * The transform basis's X axis, and the column `0` of the matrix. Combined with {@link y}, this represents the transform's rotation, scale, and skew.
   * On the identity transform, this vector points right ({@link Vector2.RIGHT}).
   */
  x: Vector2;
  /**
   * The transform basis's Y axis, and the column `1` of the matrix. Combined with {@link x}, this represents the transform's rotation, scale, and skew.
   * On the identity transform, this vector points down ({@link Vector2.DOWN}).
   */
  y: Vector2;

  /**
   * Returns the inverted version of this transform. Unlike {@link inverse}, this method works with almost any basis, including non-uniform ones, but is slower.
   * **Note:** For this method to return correctly, the transform's basis needs to have a determinant that is not exactly `0.0` (see {@link determinant}).
   */
  affine_inverse(): Transform2D;
  /**
   * Returns a copy of the `v` vector, transformed (multiplied) by the transform basis's matrix. Unlike the multiplication operator (`*`), this method ignores the {@link origin}.
   */
  basis_xform(v: Vector2): Vector2;
  /**
   * Returns a copy of the `v` vector, transformed (multiplied) by the inverse transform basis's matrix (see {@link inverse}). This method ignores the {@link origin}.
   * **Note:** This method assumes that this transform's basis is *orthonormal* (see {@link orthonormalized}). If the basis is not orthonormal, `transform.affine_inverse().basis_xform(vector)` should be used instead (see {@link affine_inverse}).
   */
  basis_xform_inv(v: Vector2): Vector2;
  /**
   * Returns the determinant (https://en.wikipedia.org/wiki/Determinant) of this transform basis's matrix. For advanced math, this number can be used to determine a few attributes:
   * - If the determinant is exactly `0.0`, the basis is not invertible (see {@link inverse}).
   * - If the determinant is a negative number, the basis represents a negative scale.
   * **Note:** If the basis's scale is the same for every axis, its determinant is always that scale by the power of 2.
   */
  determinant(): float;
  /** Returns this transform's translation. Equivalent to {@link origin}. */
  get_origin(): Vector2;
  /**
   * Returns this transform's rotation (in radians). This is equivalent to {@link x}'s angle (see {@link Vector2.angle}).
   */
  get_rotation(): float;
  /**
   * Returns the length of both {@link x} and {@link y}, as a {@link Vector2}. If this transform's basis is not skewed, this value is the scaling factor. It is not affected by rotation.
   * **Note:** If the value returned by {@link determinant} is negative, the scale is also negative.
   */
  get_scale(): Vector2;
  /** Returns this transform's skew (in radians). */
  get_skew(): float;
  /**
   * Returns the result of the linear interpolation between this transform and `xform` by the given `weight`.
   * The `weight` should be between `0.0` and `1.0` (inclusive). Values outside this range are allowed and can be used to perform *extrapolation* instead.
   */
  interpolate_with(xform: Transform2D, weight: float): Transform2D;
  /**
   * Returns the inverted version of this transform (https://en.wikipedia.org/wiki/Invertible_matrix).
   * **Note:** For this method to return correctly, the transform's basis needs to be *orthonormal* (see {@link orthonormalized}). That means the basis should only represent a rotation. If it does not, use {@link affine_inverse} instead.
   */
  inverse(): Transform2D;
  /**
   * Returns `true` if this transform's basis is conformal. A conformal basis is both *orthogonal* (the axes are perpendicular to each other) and *uniform* (the axes share the same length). This method can be especially useful during physics calculations.
   */
  is_conformal(): boolean;
  /**
   * Returns `true` if this transform and `xform` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(xform: Transform2D): boolean;
  /**
   * Returns `true` if this transform is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /**
   * Returns a copy of the transform rotated such that the rotated X-axis points towards the `target` position, in global space.
   */
  looking_at(target?: Vector2): Transform2D;
  /**
   * Returns a copy of this transform with its basis orthonormalized. An orthonormal basis is both *orthogonal* (the axes are perpendicular to each other) and *normalized* (the axes have a length of `1.0`), which also means it can only represent a rotation.
   */
  orthonormalized(): Transform2D;
  /**
   * Returns a copy of this transform rotated by the given `angle` (in radians).
   * If `angle` is positive, the transform is rotated clockwise.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the left, i.e., `R * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  rotated(angle: float): Transform2D;
  /**
   * Returns a copy of the transform rotated by the given `angle` (in radians).
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the right, i.e., `X * R`.
   * This can be seen as transforming with respect to the local frame.
   */
  rotated_local(angle: float): Transform2D;
  /**
   * Returns a copy of the transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the left, i.e., `S * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  scaled(scale: Vector2): Transform2D;
  /**
   * Returns a copy of the transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the right, i.e., `X * S`.
   * This can be seen as transforming with respect to the local frame.
   */
  scaled_local(scale: Vector2): Transform2D;
  /**
   * Returns a copy of the transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the left, i.e., `T * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  translated(offset: Vector2): Transform2D;
  /**
   * Returns a copy of the transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the right, i.e., `X * T`.
   * This can be seen as transforming with respect to the local frame.
   */
  translated_local(offset: Vector2): Transform2D;

  // Operator overloads
  [__ne]: { right: Transform2D; ret: boolean };
  [__mul]: { right: PackedVector2Array; ret: PackedVector2Array } | { right: Rect2; ret: Rect2 } | { right: Transform2D; ret: Transform2D } | { right: Vector2; ret: Vector2 } | { right: float; ret: Transform2D } | { right: int; ret: Transform2D };
  [__div]: { right: float; ret: Transform2D } | { right: int; ret: Transform2D };
  [__eq]: { right: Transform2D; ret: boolean };

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
  merge: never;
  merged: never;
  recursive_equal: never;
  set: never;
  size: never;
  sort: never;
  values: never;
}

interface Transform2DConstructor {
  /**
   * Constructs a {@link Transform2D} identical to {@link IDENTITY}.
   * **Note:** In C#, this constructs a {@link Transform2D} with all of its components set to {@link Vector2.ZERO}.
   */
  (): Transform2D;
  /** Constructs a {@link Transform2D} as a copy of the given {@link Transform2D}. */
  (from_: Transform2D): Transform2D;
  /** Constructs a {@link Transform2D} from a given angle (in radians) and position. */
  (rotation: float, position: Vector2): Transform2D;
  /**
   * Constructs a {@link Transform2D} from a given angle (in radians), scale, skew (in radians), and position.
   */
  (rotation: float, scale: Vector2, skew: float, position: Vector2): Transform2D;
  /**
   * Constructs a {@link Transform2D} from 3 {@link Vector2} values representing {@link x}, {@link y}, and the {@link origin} (the three matrix columns).
   */
  (x_axis: Vector2, y_axis: Vector2, origin: Vector2): Transform2D;

  /**
   * The identity {@link Transform2D}. This is a transform with no translation, no rotation, and a scale of {@link Vector2.ONE}. This also means that:
   * - The {@link x} points right ({@link Vector2.RIGHT});
   * - The {@link y} points down ({@link Vector2.DOWN}).
   * If a {@link Vector2}, a {@link Rect2}, a {@link PackedVector2Array}, or another {@link Transform2D} is transformed (multiplied) by this constant, no transformation occurs.
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Transform2D] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   */
  readonly IDENTITY: Transform2D;
  /**
   * When any transform is multiplied by {@link FLIP_X}, it negates all components of the {@link x} axis (the X column).
   * When {@link FLIP_X} is multiplied by any transform, it negates the {@link Vector2.x} component of all axes (the X row).
   */
  readonly FLIP_X: Transform2D;
  /**
   * When any transform is multiplied by {@link FLIP_Y}, it negates all components of the {@link y} axis (the Y column).
   * When {@link FLIP_Y} is multiplied by any transform, it negates the {@link Vector2.y} component of all axes (the Y row).
   */
  readonly FLIP_Y: Transform2D;
}
declare const Transform2D: Transform2DConstructor;
