// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3×3 matrix for representing 3D rotation and scale. */
declare class Basis {
  /**
   * The basis's X axis, and the column `0` of the matrix.
   * On the identity basis, this vector points right ({@link Vector3.RIGHT}).
   */
  x: Vector3;
  /**
   * The basis's Y axis, and the column `1` of the matrix.
   * On the identity basis, this vector points up ({@link Vector3.UP}).
   */
  y: Vector3;
  /**
   * The basis's Z axis, and the column `2` of the matrix.
   * On the identity basis, this vector points back ({@link Vector3.BACK}).
   */
  z: Vector3;

  /**
   * Returns the determinant (https://en.wikipedia.org/wiki/Determinant) of this basis's matrix. For advanced math, this number can be used to determine a few attributes:
   * - If the determinant is exactly `0.0`, the basis is not invertible (see {@link inverse}).
   * - If the determinant is a negative number, the basis represents a negative scale.
   * **Note:** If the basis's scale is the same for every axis, its determinant is always that scale by the power of 3.
   */
  determinant(): float;
  /**
   * Constructs a new {@link Basis} that only represents rotation from the given {@link Vector3} of Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians.
   * - The {@link Vector3.x} should contain the angle around the {@link x} axis (pitch);
   * - The {@link Vector3.y} should contain the angle around the {@link y} axis (yaw);
   * - The {@link Vector3.z} should contain the angle around the {@link z} axis (roll).
   * The order of each consecutive rotation can be changed with `order` (see {@link EulerOrder} constants). By default, the YXZ convention is used ({@link EULER_ORDER_YXZ}): the basis rotates first around the Y axis (yaw), then X (pitch), and lastly Z (roll). When using the opposite method {@link get_euler}, this order is reversed.
   */
  static from_euler(euler: Vector3, order?: int): Basis;
  /**
   * Constructs a new {@link Basis} that only represents scale, with no rotation or shear, from the given `scale` vector.
   * **Note:** In linear algebra, the matrix of this basis is also known as a diagonal matrix (https://en.wikipedia.org/wiki/Diagonal_matrix).
   */
  static from_scale(scale: Vector3): Basis;
  /**
   * Returns this basis's rotation as a {@link Vector3} of Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians. For the returned value:
   * - The {@link Vector3.x} contains the angle around the {@link x} axis (pitch);
   * - The {@link Vector3.y} contains the angle around the {@link y} axis (yaw);
   * - The {@link Vector3.z} contains the angle around the {@link z} axis (roll).
   * The order of each consecutive rotation can be changed with `order` (see {@link EulerOrder} constants). By default, the YXZ convention is used ({@link EULER_ORDER_YXZ}): Z (roll) is calculated first, then X (pitch), and lastly Y (yaw). When using the opposite method {@link from_euler}, this order is reversed.
   * **Note:** For this method to return correctly, the basis needs to be *orthonormal* (see {@link orthonormalized}).
   * **Note:** Euler angles are much more intuitive but are not suitable for 3D math. Because of this, consider using the {@link get_rotation_quaternion} method instead, which returns a {@link Quaternion}.
   * **Note:** In the Inspector dock, a basis's rotation is often displayed in Euler angles (in degrees), as is the case with the {@link Node3D.rotation} property.
   */
  get_euler(order?: int): Vector3;
  /**
   * Returns this basis's rotation as a {@link Quaternion}.
   * **Note:** Quaternions are much more suitable for 3D math but are less intuitive. For user interfaces, consider using the {@link get_euler} method, which returns Euler angles.
   */
  get_rotation_quaternion(): Quaternion;
  /**
   * Returns the length of each axis of this basis, as a {@link Vector3}. If the basis is not sheared, this value is the scaling factor. It is not affected by rotation.
   * **Note:** If the value returned by {@link determinant} is negative, the scale is also negative.
   */
  get_scale(): Vector3;
  /** Returns the inverse of this basis's matrix (https://en.wikipedia.org/wiki/Invertible_matrix). */
  inverse(): Basis;
  /**
   * Returns `true` if this basis is conformal. A conformal basis is both *orthogonal* (the axes are perpendicular to each other) and *uniform* (the axes share the same length). This method can be especially useful during physics calculations.
   */
  is_conformal(): boolean;
  /**
   * Returns `true` if this basis and `b` are approximately equal, by calling {@link @GlobalScope.is_equal_approx} on all vector components.
   */
  is_equal_approx(b: Basis): boolean;
  /**
   * Returns `true` if this basis is finite, by calling {@link @GlobalScope.is_finite} on all vector components.
   */
  is_finite(): boolean;
  /**
   * Returns `true` if this basis is orthonormal. An orthonormal basis is both *orthogonal* (the axes are perpendicular to each other) and *normalized* (the length of every axis is `1.0`). This method can be especially useful during physics calculations.
   */
  is_orthonormal(): boolean;
  /**
   * Creates a new {@link Basis} with a rotation such that the forward axis (-Z) points towards the `target` position.
   * By default, the -Z axis (camera forward) is treated as forward (implies +X is right). If `use_model_front` is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the `target` position.
   * The up axis (+Y) points as close to the `up` vector as possible while staying perpendicular to the forward axis. The returned basis is orthonormalized (see {@link orthonormalized}).
   * The `target` and the `up` cannot be {@link Vector3.ZERO}, and shouldn't be colinear to avoid unintended rotation around local Z axis.
   */
  static looking_at(target: Vector3, up?: Vector3, use_model_front?: boolean): Basis;
  /**
   * Returns the orthonormalized version of this basis. An orthonormal basis is both *orthogonal* (the axes are perpendicular to each other) and *normalized* (the axes have a length of `1.0`), which also means it can only represent a rotation.
   * It is often useful to call this method to avoid rounding errors on a rotating basis:
   */
  orthonormalized(): Basis;
  /**
   * Returns a copy of this basis rotated around the given `axis` by the given `angle` (in radians).
   * The `axis` must be a normalized vector (see {@link Vector3.normalized}). If `angle` is positive, the basis is rotated counter-clockwise around the axis.
   */
  rotated(axis: Vector3, angle: float): Basis;
  /**
   * Returns this basis with each axis's components scaled by the given `scale`'s components.
   * The basis matrix's rows are multiplied by `scale`'s components. This operation is a global scale (relative to the parent).
   */
  scaled(scale: Vector3): Basis;
  /**
   * Returns this basis with each axis scaled by the corresponding component in the given `scale`.
   * The basis matrix's columns are multiplied by `scale`'s components. This operation is a local scale (relative to self).
   */
  scaled_local(scale: Vector3): Basis;
  /**
   * Performs a spherical-linear interpolation with the `to` basis, given a `weight`. Both this basis and `to` should represent a rotation.
   * **Example:** Smoothly rotate a {@link Node3D} to the target basis over time, with a {@link Tween}:
   */
  slerp(to: Basis, weight: float): Basis;
  /**
   * Returns the transposed dot product between `with` and the {@link x} axis (see {@link transposed}).
   * This is equivalent to `basis.x.dot(vector)`.
   */
  tdotx(with_: Vector3): float;
  /**
   * Returns the transposed dot product between `with` and the {@link y} axis (see {@link transposed}).
   * This is equivalent to `basis.y.dot(vector)`.
   */
  tdoty(with_: Vector3): float;
  /**
   * Returns the transposed dot product between `with` and the {@link z} axis (see {@link transposed}).
   * This is equivalent to `basis.z.dot(vector)`.
   */
  tdotz(with_: Vector3): float;
  /**
   * Returns the transposed version of this basis. This turns the basis matrix's columns into rows, and its rows into columns.
   */
  transposed(): Basis;

  /**
   * The identity {@link Basis}. This is an orthonormal basis with no rotation, no shear, and a scale of {@link Vector3.ONE}. This also means that:
   * - The {@link x} points right ({@link Vector3.RIGHT});
   * - The {@link y} points up ({@link Vector3.UP});
   * - The {@link z} points back ({@link Vector3.BACK}).
   * If a {@link Vector3} or another {@link Basis} is transformed (multiplied) by this constant, no transformation occurs.
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Basis] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   */
  static readonly IDENTITY: int;
  /**
   * When any basis is multiplied by {@link FLIP_X}, it negates all components of the {@link x} axis (the X column).
   * When {@link FLIP_X} is multiplied by any basis, it negates the {@link Vector3.x} component of all axes (the X row).
   */
  static readonly FLIP_X: int;
  /**
   * When any basis is multiplied by {@link FLIP_Y}, it negates all components of the {@link y} axis (the Y column).
   * When {@link FLIP_Y} is multiplied by any basis, it negates the {@link Vector3.y} component of all axes (the Y row).
   */
  static readonly FLIP_Y: int;
  /**
   * When any basis is multiplied by {@link FLIP_Z}, it negates all components of the {@link z} axis (the Z column).
   * When {@link FLIP_Z} is multiplied by any basis, it negates the {@link Vector3.z} component of all axes (the Z row).
   */
  static readonly FLIP_Z: int;

  // Operator overloads
  [__ne]: { right: Basis; ret: boolean };
  [__mul]: { right: Basis; ret: Basis } | { right: Vector3; ret: Vector3 } | { right: float; ret: Basis } | { right: int; ret: Basis };
  [__div]: { right: float; ret: Basis } | { right: int; ret: Basis };
  [__eq]: { right: Basis; ret: boolean };
}
