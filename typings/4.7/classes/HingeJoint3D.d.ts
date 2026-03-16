// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A physics joint that restricts the rotation of a 3D physics body around an axis relative to another physics body.
 */
declare class HingeJoint3D extends Joint3D {
  /** The speed with which the rotation across the axis perpendicular to the hinge gets corrected. */
  'angular_limit/bias': float;
  /**
   * If `true`, the hinges maximum and minimum rotation, defined by {@link angular_limit/lower} and {@link angular_limit/upper} has effects.
   */
  'angular_limit/enable': boolean;
  /** The minimum rotation. Only active if {@link angular_limit/enable} is `true`. */
  'angular_limit/lower': float;
  /** The lower this value, the more the rotation gets slowed down. */
  'angular_limit/relaxation': float;
  'angular_limit/softness': float;
  /** The maximum rotation. Only active if {@link angular_limit/enable} is `true`. */
  'angular_limit/upper': float;
  /** When activated, a motor turns the hinge. */
  'motor/enable': boolean;
  /** Maximum acceleration for the motor. */
  'motor/max_impulse': float;
  /** Target speed for the motor. */
  'motor/target_velocity': float;
  /** The speed with which the two bodies get pulled together when they move in different directions. */
  'params/bias': float;

  /** Returns the value of the specified flag. */
  get_flag(flag: int): boolean;
  /** Returns the value of the specified parameter. */
  get_param(param: int): float;
  /** If `true`, enables the specified flag. */
  set_flag(flag: int, enabled: boolean): void;
  /** Sets the value of the specified parameter. */
  set_param(param: int, value: float): void;

  // enum Param
  /** The speed with which the two bodies get pulled together when they move in different directions. */
  static readonly PARAM_BIAS: int;
  /** The maximum rotation. Only active if {@link angular_limit/enable} is `true`. */
  static readonly PARAM_LIMIT_UPPER: int;
  /** The minimum rotation. Only active if {@link angular_limit/enable} is `true`. */
  static readonly PARAM_LIMIT_LOWER: int;
  /** The speed with which the rotation across the axis perpendicular to the hinge gets corrected. */
  static readonly PARAM_LIMIT_BIAS: int;
  static readonly PARAM_LIMIT_SOFTNESS: int;
  /** The lower this value, the more the rotation gets slowed down. */
  static readonly PARAM_LIMIT_RELAXATION: int;
  /** Target speed for the motor. */
  static readonly PARAM_MOTOR_TARGET_VELOCITY: int;
  /** Maximum acceleration for the motor. */
  static readonly PARAM_MOTOR_MAX_IMPULSE: int;
  /** Represents the size of the {@link Param} enum. */
  static readonly PARAM_MAX: int;
  // enum Flag
  /**
   * If `true`, the hinges maximum and minimum rotation, defined by {@link angular_limit/lower} and {@link angular_limit/upper} has effects.
   */
  static readonly FLAG_USE_LIMIT: int;
  /** When activated, a motor turns the hinge. */
  static readonly FLAG_ENABLE_MOTOR: int;
  /** Represents the size of the {@link Flag} enum. */
  static readonly FLAG_MAX: int;
}
