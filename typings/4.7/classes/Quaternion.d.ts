// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A unit quaternion used for representing 3D rotations. */
declare class Quaternion {
  /**
   * W component of the quaternion. This is the "real" part.
   * **Note:** Quaternion components should usually not be manipulated directly.
   */
  w: float;
  /**
   * X component of the quaternion. This is the value along the "imaginary" `i` axis.
   * **Note:** Quaternion components should usually not be manipulated directly.
   */
  x: float;
  /**
   * Y component of the quaternion. This is the value along the "imaginary" `j` axis.
   * **Note:** Quaternion components should usually not be manipulated directly.
   */
  y: float;
  /**
   * Z component of the quaternion. This is the value along the "imaginary" `k` axis.
   * **Note:** Quaternion components should usually not be manipulated directly.
   */
  z: float;

  /**
   * Returns the angle between this quaternion and `to`. This is the magnitude of the angle you would need to rotate by to get from one to the other.
   * **Note:** The magnitude of the floating-point error for this method is abnormally high, so methods such as `is_zero_approx` will not work reliably.
   */
  angle_to(to: Quaternion): float;
  /**
   * Returns the dot product between this quaternion and `with`.
   * This is equivalent to `(quat.x * with.x) + (quat.y * with.y) + (quat.z * with.z) + (quat.w * with.w)`.
   */
  dot(with_: Quaternion): float;
  /**
   * Returns the exponential of this quaternion. The rotation axis of the result is the normalized rotation axis of this quaternion, the angle of the result is the length of the vector part of this quaternion.
   */
  exp(): Quaternion;
  /**
   * Constructs a new {@link Quaternion} from the given {@link Vector3} of Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians. This method always uses the YXZ convention ({@link EULER_ORDER_YXZ}).
   */
  static from_euler(euler: Vector3): Quaternion;
  /**
   * Returns the angle of the rotation represented by this quaternion.
   * **Note:** The quaternion must be normalized.
   */
  get_angle(): float;
  /** Returns the rotation axis of the rotation represented by this quaternion. */
  get_axis(): Vector3;
  /**
   * Returns this quaternion's rotation as a {@link Vector3} of Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians.
   * The order of each consecutive rotation can be changed with `order` (see {@link EulerOrder} constants). By default, the YXZ convention is used ({@link EULER_ORDER_YXZ}): Z (roll) is calculated first, then X (pitch), and lastly Y (yaw). When using the opposite method {@link from_euler}, this order is reversed.
   */
  get_euler(order?: int): Vector3;
  /**
   * Returns the inverse version of this quaternion, inverting the sign of every component except {@link w}.
   */
  inverse(): Quaternion;
  /**
   * Returns `true` if this quaternion and `to` are approximately equal, by calling {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(to: Quaternion): boolean;
  /**
   * Returns `true` if this quaternion is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /** Returns `true` if this quaternion is normalized. See also {@link normalized}. */
  is_normalized(): boolean;
  /** Returns this quaternion's length, also called magnitude. */
  length(): float;
  /**
   * Returns this quaternion's length, squared.
   * **Note:** This method is faster than {@link length}, so prefer it if you only need to compare quaternion lengths.
   */
  length_squared(): float;
  /**
   * Returns the logarithm of this quaternion. Multiplies this quaternion's rotation axis by its rotation angle, and stores the result in the returned quaternion's vector part ({@link x}, {@link y}, and {@link z}). The returned quaternion's real part ({@link w}) is always `0.0`.
   */
  log(): Quaternion;
  /**
   * Returns a copy of this quaternion, normalized so that its length is `1.0`. See also {@link is_normalized}.
   */
  normalized(): Quaternion;
  /**
   * Performs a spherical-linear interpolation with the `to` quaternion, given a `weight` and returns the result. Both this quaternion and `to` must be normalized.
   */
  slerp(to: Quaternion, weight: float): Quaternion;
  /**
   * Performs a spherical-linear interpolation with the `to` quaternion, given a `weight` and returns the result. Unlike {@link slerp}, this method does not check if the rotation path is smaller than 90 degrees. Both this quaternion and `to` must be normalized.
   */
  slerpni(to: Quaternion, weight: float): Quaternion;
  /**
   * Performs a spherical cubic interpolation between quaternions `pre_a`, this vector, `b`, and `post_b`, by the given amount `weight`.
   */
  spherical_cubic_interpolate(b: Quaternion, pre_a: Quaternion, post_b: Quaternion, weight: float): Quaternion;
  /**
   * Performs a spherical cubic interpolation between quaternions `pre_a`, this vector, `b`, and `post_b`, by the given amount `weight`.
   * It can perform smoother interpolation than {@link spherical_cubic_interpolate} by the time values.
   */
  spherical_cubic_interpolate_in_time(b: Quaternion, pre_a: Quaternion, post_b: Quaternion, weight: float, b_t: float, pre_a_t: float, post_b_t: float): Quaternion;

  /**
   * The identity quaternion, representing no rotation. This has the same rotation as {@link Basis.IDENTITY}.
   * If a {@link Vector3} is rotated (multiplied) by this quaternion, it does not change.
   * **Note:** In GDScript, this constant is equivalent to creating a [constructor Quaternion] without any arguments. It can be used to make your code clearer, and for consistency with C#.
   */
  static readonly IDENTITY: int;

  // Operator overloads
  [__ne]: { right: Quaternion; ret: boolean };
  [__mul]: { right: Quaternion; ret: Quaternion } | { right: Vector3; ret: Vector3 } | { right: float; ret: Quaternion } | { right: int; ret: Quaternion };
  [__add]: { right: Quaternion; ret: Quaternion };
  [__sub]: { right: Quaternion; ret: Quaternion };
  [__div]: { right: float; ret: Quaternion } | { right: int; ret: Quaternion };
  [__eq]: { right: Quaternion; ret: boolean };
  [__plus]: { ret: Quaternion };
  [__minus]: { ret: Quaternion };
}
