// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3×4 matrix representing a 3D transformation. */
declare class Transform3D {
  /**
   * The {@link Basis} of this transform. It is composed by 3 axes ({@link Basis.x}, {@link Basis.y}, and {@link Basis.z}). Together, these represent the transform's rotation, scale, and shear.
   */
  basis: Basis;
  /** The translation offset of this transform. In 3D space, this can be seen as the position. */
  origin: Vector3;

  /**
   * Returns the inverted version of this transform. Unlike {@link inverse}, this method works with almost any {@link basis}, including non-uniform ones, but is slower. See also {@link Basis.inverse}.
   * **Note:** For this method to return correctly, the transform's {@link basis} needs to have a determinant that is not exactly `0.0` (see {@link Basis.determinant}).
   */
  affine_inverse(): Transform3D;
  /**
   * Returns the result of the linear interpolation between this transform and `xform` by the given `weight`.
   * The `weight` should be between `0.0` and `1.0` (inclusive). Values outside this range are allowed and can be used to perform *extrapolation* instead.
   */
  interpolate_with(xform: Transform3D, weight: float): Transform3D;
  /**
   * Returns the inverted version of this transform (https://en.wikipedia.org/wiki/Invertible_matrix). See also {@link Basis.inverse}.
   * **Note:** For this method to return correctly, the transform's {@link basis} needs to be *orthonormal* (see {@link orthonormalized}). That means the basis should only represent a rotation. If it does not, use {@link affine_inverse} instead.
   */
  inverse(): Transform3D;
  /**
   * Returns `true` if this transform and `xform` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(xform: Transform3D): boolean;
  /**
   * Returns `true` if this transform is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /**
   * Returns a copy of this transform rotated so that the forward axis (-Z) points towards the `target` position.
   * The up axis (+Y) points as close to the `up` vector as possible while staying perpendicular to the forward axis. The resulting transform is orthonormalized. The existing rotation, scale, and skew information from the original transform is discarded. The `target` and `up` vectors cannot be zero, cannot be parallel to each other, and are defined in global/parent space.
   * If `use_model_front` is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the `target` position. By default, the -Z axis (camera forward) is treated as forward (implies +X is right).
   */
  looking_at(target: Vector3, up?: Vector3, use_model_front?: boolean): Transform3D;
  /**
   * Returns a copy of this transform with its {@link basis} orthonormalized. An orthonormal basis is both *orthogonal* (the axes are perpendicular to each other) and *normalized* (the axes have a length of `1.0`), which also means it can only represent a rotation. See also {@link Basis.orthonormalized}.
   */
  orthonormalized(): Transform3D;
  /**
   * Returns a copy of this transform rotated around the given `axis` by the given `angle` (in radians).
   * The `axis` must be a normalized vector (see {@link Vector3.normalized}). If `angle` is positive, the basis is rotated counter-clockwise around the axis.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the left, i.e., `R * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  rotated(axis: Vector3, angle: float): Transform3D;
  /**
   * Returns a copy of this transform rotated around the given `axis` by the given `angle` (in radians).
   * The `axis` must be a normalized vector in the transform's local coordinate system. For example, to rotate around the local X-axis, use {@link Vector3.RIGHT}.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the right, i.e., `X * R`.
   * This can be seen as transforming with respect to the local frame.
   */
  rotated_local(axis: Vector3, angle: float): Transform3D;
  /**
   * Returns a copy of this transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the left, i.e., `S * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  scaled(scale: Vector3): Transform3D;
  /**
   * Returns a copy of this transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the right, i.e., `X * S`.
   * This can be seen as transforming with respect to the local frame.
   */
  scaled_local(scale: Vector3): Transform3D;
  /**
   * Returns a copy of this transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the left, i.e., `T * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  translated(offset: Vector3): Transform3D;
  /**
   * Returns a copy of this transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the right, i.e., `X * T`.
   * This can be seen as transforming with respect to the local frame.
   */
  translated_local(offset: Vector3): Transform3D;

  /**
   * The identity {@link Transform3D}. This is a transform with no translation, no rotation, and a scale of {@link Vector3.ONE}. Its {@link basis} is equal to {@link Basis.IDENTITY}. This also means that:
   * - Its {@link Basis.x} points right ({@link Vector3.RIGHT});
   * - Its {@link Basis.y} points up ({@link Vector3.UP});
   * - Its {@link Basis.z} points back ({@link Vector3.BACK}).
   * If a {@link Vector3}, an {@link AABB}, a {@link Plane}, a {@link PackedVector3Array}, or another {@link Transform3D} is transformed (multiplied) by this constant, no transformation occurs.
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Transform3D] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   */
  static readonly IDENTITY: int;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the YZ plane. Its {@link basis} is equal to {@link Basis.FLIP_X}.
   */
  static readonly FLIP_X: int;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the XZ plane. Its {@link basis} is equal to {@link Basis.FLIP_Y}.
   */
  static readonly FLIP_Y: int;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the XY plane. Its {@link basis} is equal to {@link Basis.FLIP_Z}.
   */
  static readonly FLIP_Z: int;

  // Operator overloads
  [__ne]: { right: Transform3D; ret: boolean };
  [__mul]: { right: AABB; ret: AABB } | { right: PackedVector3Array; ret: PackedVector3Array } | { right: Plane; ret: Plane } | { right: Transform3D; ret: Transform3D } | { right: Vector3; ret: Vector3 } | { right: float; ret: Transform3D } | { right: int; ret: Transform3D };
  [__div]: { right: float; ret: Transform3D } | { right: int; ret: Transform3D };
  [__eq]: { right: Transform3D; ret: boolean };
}
