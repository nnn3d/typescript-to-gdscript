// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 3×4 matrix representing a 3D transformation. */
declare interface Transform3D {
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
  interpolate_with(xform: Transform3D | Projection, weight: float): Transform3D;
  /**
   * Returns the inverted version of this transform (https://en.wikipedia.org/wiki/Invertible_matrix). See also {@link Basis.inverse}.
   * **Note:** For this method to return correctly, the transform's {@link basis} needs to be *orthonormal* (see {@link orthonormalized}). That means the basis should only represent a rotation. If it does not, use {@link affine_inverse} instead.
   */
  inverse(): Transform3D;
  /**
   * Returns `true` if this transform and `xform` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(xform: Transform3D | Projection): boolean;
  /**
   * Returns `true` if this transform is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /**
   * Returns a copy of this transform rotated so that the forward axis (-Z) points towards the `target` position.
   * The up axis (+Y) points as close to the `up` vector as possible while staying perpendicular to the forward axis. The resulting transform is orthonormalized. The existing rotation, scale, and skew information from the original transform is discarded. The `target` and `up` vectors cannot be zero, cannot be parallel to each other, and are defined in global/parent space.
   * If `use_model_front` is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the `target` position. By default, the -Z axis (camera forward) is treated as forward (implies +X is right).
   */
  looking_at(target: Vector3 | Vector3i, up?: Vector3 | Vector3i, use_model_front?: boolean): Transform3D;
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
  rotated(axis: Vector3 | Vector3i, angle: float): Transform3D;
  /**
   * Returns a copy of this transform rotated around the given `axis` by the given `angle` (in radians).
   * The `axis` must be a normalized vector in the transform's local coordinate system. For example, to rotate around the local X-axis, use {@link Vector3.RIGHT}.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding rotation transform `R` from the right, i.e., `X * R`.
   * This can be seen as transforming with respect to the local frame.
   */
  rotated_local(axis: Vector3 | Vector3i, angle: float): Transform3D;
  /**
   * Returns a copy of this transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the left, i.e., `S * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  scaled(scale: Vector3 | Vector3i): Transform3D;
  /**
   * Returns a copy of this transform scaled by the given `scale` factor.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding scaling transform `S` from the right, i.e., `X * S`.
   * This can be seen as transforming with respect to the local frame.
   */
  scaled_local(scale: Vector3 | Vector3i): Transform3D;
  /**
   * Returns a copy of this transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the left, i.e., `T * X`.
   * This can be seen as transforming with respect to the global/parent frame.
   */
  translated(offset: Vector3 | Vector3i): Transform3D;
  /**
   * Returns a copy of this transform translated by the given `offset`.
   * This method is an optimized version of multiplying the given transform `X` with a corresponding translation transform `T` from the right, i.e., `X * T`.
   * This can be seen as transforming with respect to the local frame.
   */
  translated_local(offset: Vector3 | Vector3i): Transform3D;

  // Operator overloads
  [__ops_ne]: { right: Transform3D; ret: boolean };
  [__ops_mul]: { right: AABB; ret: AABB } | { right: PackedVector3Array; ret: PackedVector3Array } | { right: Plane; ret: Plane } | { right: Transform3D; ret: Transform3D } | { right: Vector3; ret: Vector3 } | { right: float; ret: Transform3D } | { right: int; ret: Transform3D };
  [__ops_div]: { right: float; ret: Transform3D } | { right: int; ret: Transform3D };
  [__ops_eq]: { right: Transform3D; ret: boolean };

  [__variant_converts]: Transform3D | Projection;

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

declare interface Transform3DConstructor {
  readonly prototype: Transform3D;
  /**
   * Constructs a {@link Transform3D} identical to {@link IDENTITY}.
   * **Note:** In C#, this constructs a {@link Transform3D} with its {@link origin} and the components of its {@link basis} set to {@link Vector3.ZERO}.
   */
  (): Transform3D;
  /** Constructs a {@link Transform3D} as a copy of the given {@link Transform3D}. */
  (from_: Transform3D): Transform3D;
  /** Constructs a {@link Transform3D} from a {@link Basis} and {@link Vector3}. */
  (basis: Basis, origin: Vector3): Transform3D;
  /**
   * Constructs a {@link Transform3D} from a {@link Projection}. Because {@link Transform3D} is a 3×4 matrix and {@link Projection} is a 4×4 matrix, this operation trims the last row of the projection matrix (`from.x.w`, `from.y.w`, `from.z.w`, and `from.w.w` are not included in the new transform).
   */
  (from_: Projection): Transform3D;
  /**
   * Constructs a {@link Transform3D} from four {@link Vector3} values (also called matrix columns).
   * The first three arguments are the {@link basis}'s axes ({@link Basis.x}, {@link Basis.y}, and {@link Basis.z}).
   */
  (x_axis: Vector3, y_axis: Vector3, z_axis: Vector3, origin: Vector3): Transform3D;

  /**
   * The identity {@link Transform3D}. This is a transform with no translation, no rotation, and a scale of {@link Vector3.ONE}. Its {@link basis} is equal to {@link Basis.IDENTITY}. This also means that:
   * - Its {@link Basis.x} points right ({@link Vector3.RIGHT});
   * - Its {@link Basis.y} points up ({@link Vector3.UP});
   * - Its {@link Basis.z} points back ({@link Vector3.BACK}).
   * If a {@link Vector3}, an {@link AABB}, a {@link Plane}, a {@link PackedVector3Array}, or another {@link Transform3D} is transformed (multiplied) by this constant, no transformation occurs.
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Transform3D] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   */
  readonly IDENTITY: Transform3D;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the YZ plane. Its {@link basis} is equal to {@link Basis.FLIP_X}.
   */
  readonly FLIP_X: Transform3D;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the XZ plane. Its {@link basis} is equal to {@link Basis.FLIP_Y}.
   */
  readonly FLIP_Y: Transform3D;
  /**
   * {@link Transform3D} with mirroring applied perpendicular to the XY plane. Its {@link basis} is equal to {@link Basis.FLIP_Z}.
   */
  readonly FLIP_Z: Transform3D;
}
declare const Transform3D: Transform3DConstructor;
