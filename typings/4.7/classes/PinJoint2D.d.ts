// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A physics joint that attaches two 2D physics bodies at a single point, allowing them to freely rotate.
 */
declare class PinJoint2D extends Joint2D {
  /**
   * If `true`, the pin maximum and minimum rotation, defined by {@link angular_limit_lower} and {@link angular_limit_upper} are applied.
   */
  angular_limit_enabled: boolean;
  /** The minimum rotation. Only active if {@link angular_limit_enabled} is `true`. */
  angular_limit_lower: float;
  /** The maximum rotation. Only active if {@link angular_limit_enabled} is `true`. */
  angular_limit_upper: float;
  /** When activated, a motor turns the pin. */
  motor_enabled: boolean;
  /** Target speed for the motor. In radians per second. */
  motor_target_velocity: float;
  /** The higher this value, the more the bond to the pinned partner can flex. */
  softness: float;
}
