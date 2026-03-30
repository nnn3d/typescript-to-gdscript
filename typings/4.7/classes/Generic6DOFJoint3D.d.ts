// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A physics joint that allows for complex movement and rotation between two 3D physics bodies. */
declare class Generic6DOFJoint3D extends Joint3D {
  /**
   * The amount of rotational damping across the X axis.
   * The lower, the longer an impulse from one side takes to travel to the other side.
   */
  'angular_limit_x/damping': float;
  /** If `true`, rotation across the X axis is limited. */
  'angular_limit_x/enabled': boolean;
  /**
   * When rotating across the X axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
   */
  'angular_limit_x/erp': float;
  /** The maximum amount of force that can occur, when rotating around the X axis. */
  'angular_limit_x/force_limit': float;
  /** The minimum rotation in negative direction to break loose and rotate around the X axis. */
  'angular_limit_x/lower_angle': float;
  /** The amount of rotational restitution across the X axis. The lower, the more restitution occurs. */
  'angular_limit_x/restitution': float;
  /** The speed of all rotations across the X axis. */
  'angular_limit_x/softness': float;
  /** The minimum rotation in positive direction to break loose and rotate around the X axis. */
  'angular_limit_x/upper_angle': float;
  /** The amount of rotational damping across the Y axis. The lower, the more damping occurs. */
  'angular_limit_y/damping': float;
  /** If `true`, rotation across the Y axis is limited. */
  'angular_limit_y/enabled': boolean;
  /**
   * When rotating across the Y axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
   */
  'angular_limit_y/erp': float;
  /** The maximum amount of force that can occur, when rotating around the Y axis. */
  'angular_limit_y/force_limit': float;
  /** The minimum rotation in negative direction to break loose and rotate around the Y axis. */
  'angular_limit_y/lower_angle': float;
  /** The amount of rotational restitution across the Y axis. The lower, the more restitution occurs. */
  'angular_limit_y/restitution': float;
  /** The speed of all rotations across the Y axis. */
  'angular_limit_y/softness': float;
  /** The minimum rotation in positive direction to break loose and rotate around the Y axis. */
  'angular_limit_y/upper_angle': float;
  /** The amount of rotational damping across the Z axis. The lower, the more damping occurs. */
  'angular_limit_z/damping': float;
  /** If `true`, rotation across the Z axis is limited. */
  'angular_limit_z/enabled': boolean;
  /**
   * When rotating across the Z axis, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
   */
  'angular_limit_z/erp': float;
  /** The maximum amount of force that can occur, when rotating around the Z axis. */
  'angular_limit_z/force_limit': float;
  /** The minimum rotation in negative direction to break loose and rotate around the Z axis. */
  'angular_limit_z/lower_angle': float;
  /** The amount of rotational restitution across the Z axis. The lower, the more restitution occurs. */
  'angular_limit_z/restitution': float;
  /** The speed of all rotations across the Z axis. */
  'angular_limit_z/softness': float;
  /** The minimum rotation in positive direction to break loose and rotate around the Z axis. */
  'angular_limit_z/upper_angle': float;
  /** If `true`, a rotating motor at the X axis is enabled. */
  'angular_motor_x/enabled': boolean;
  /** Maximum acceleration for the motor at the X axis. */
  'angular_motor_x/force_limit': float;
  /** Target speed for the motor at the X axis. */
  'angular_motor_x/target_velocity': float;
  /** If `true`, a rotating motor at the Y axis is enabled. */
  'angular_motor_y/enabled': boolean;
  /** Maximum acceleration for the motor at the Y axis. */
  'angular_motor_y/force_limit': float;
  /** Target speed for the motor at the Y axis. */
  'angular_motor_y/target_velocity': float;
  /** If `true`, a rotating motor at the Z axis is enabled. */
  'angular_motor_z/enabled': boolean;
  /** Maximum acceleration for the motor at the Z axis. */
  'angular_motor_z/force_limit': float;
  /** Target speed for the motor at the Z axis. */
  'angular_motor_z/target_velocity': float;
  'angular_spring_x/damping': float;
  'angular_spring_x/enabled': boolean;
  'angular_spring_x/equilibrium_point': float;
  'angular_spring_x/stiffness': float;
  'angular_spring_y/damping': float;
  'angular_spring_y/enabled': boolean;
  'angular_spring_y/equilibrium_point': float;
  'angular_spring_y/stiffness': float;
  'angular_spring_z/damping': float;
  'angular_spring_z/enabled': boolean;
  'angular_spring_z/equilibrium_point': float;
  'angular_spring_z/stiffness': float;
  /** The amount of damping that happens at the X motion. */
  'linear_limit_x/damping': float;
  /** If `true`, the linear motion across the X axis is limited. */
  'linear_limit_x/enabled': boolean;
  /** The minimum difference between the pivot points' X axis. */
  'linear_limit_x/lower_distance': float;
  /** The amount of restitution on the X axis movement. The lower, the more momentum gets lost. */
  'linear_limit_x/restitution': float;
  /** A factor applied to the movement across the X axis. The lower, the slower the movement. */
  'linear_limit_x/softness': float;
  /** The maximum difference between the pivot points' X axis. */
  'linear_limit_x/upper_distance': float;
  /** The amount of damping that happens at the Y motion. */
  'linear_limit_y/damping': float;
  /** If `true`, the linear motion across the Y axis is limited. */
  'linear_limit_y/enabled': boolean;
  /** The minimum difference between the pivot points' Y axis. */
  'linear_limit_y/lower_distance': float;
  /** The amount of restitution on the Y axis movement. The lower, the more momentum gets lost. */
  'linear_limit_y/restitution': float;
  /** A factor applied to the movement across the Y axis. The lower, the slower the movement. */
  'linear_limit_y/softness': float;
  /** The maximum difference between the pivot points' Y axis. */
  'linear_limit_y/upper_distance': float;
  /** The amount of damping that happens at the Z motion. */
  'linear_limit_z/damping': float;
  /** If `true`, the linear motion across the Z axis is limited. */
  'linear_limit_z/enabled': boolean;
  /** The minimum difference between the pivot points' Z axis. */
  'linear_limit_z/lower_distance': float;
  /** The amount of restitution on the Z axis movement. The lower, the more momentum gets lost. */
  'linear_limit_z/restitution': float;
  /** A factor applied to the movement across the Z axis. The lower, the slower the movement. */
  'linear_limit_z/softness': float;
  /** The maximum difference between the pivot points' Z axis. */
  'linear_limit_z/upper_distance': float;
  /**
   * If `true`, then there is a linear motor on the X axis. It will attempt to reach the target velocity while staying within the force limits.
   */
  'linear_motor_x/enabled': boolean;
  /**
   * The maximum force the linear motor can apply on the X axis while trying to reach the target velocity.
   */
  'linear_motor_x/force_limit': float;
  /** The speed that the linear motor will attempt to reach on the X axis. */
  'linear_motor_x/target_velocity': float;
  /**
   * If `true`, then there is a linear motor on the Y axis. It will attempt to reach the target velocity while staying within the force limits.
   */
  'linear_motor_y/enabled': boolean;
  /**
   * The maximum force the linear motor can apply on the Y axis while trying to reach the target velocity.
   */
  'linear_motor_y/force_limit': float;
  /** The speed that the linear motor will attempt to reach on the Y axis. */
  'linear_motor_y/target_velocity': float;
  /**
   * If `true`, then there is a linear motor on the Z axis. It will attempt to reach the target velocity while staying within the force limits.
   */
  'linear_motor_z/enabled': boolean;
  /**
   * The maximum force the linear motor can apply on the Z axis while trying to reach the target velocity.
   */
  'linear_motor_z/force_limit': float;
  /** The speed that the linear motor will attempt to reach on the Z axis. */
  'linear_motor_z/target_velocity': float;
  'linear_spring_x/damping': float;
  'linear_spring_x/enabled': boolean;
  'linear_spring_x/equilibrium_point': float;
  'linear_spring_x/stiffness': float;
  'linear_spring_y/damping': float;
  'linear_spring_y/enabled': boolean;
  'linear_spring_y/equilibrium_point': float;
  'linear_spring_y/stiffness': float;
  'linear_spring_z/damping': float;
  'linear_spring_z/enabled': boolean;
  'linear_spring_z/equilibrium_point': float;
  'linear_spring_z/stiffness': float;

  get_flag_x(flag: int): boolean;
  get_flag_y(flag: int): boolean;
  get_flag_z(flag: int): boolean;
  get_param_x(param: int): float;
  get_param_y(param: int): float;
  get_param_z(param: int): float;
  set_flag_x(flag: int, value: boolean): void;
  set_flag_y(flag: int, value: boolean): void;
  set_flag_z(flag: int, value: boolean): void;
  set_param_x(param: int, value: float): void;
  set_param_y(param: int, value: float): void;
  set_param_z(param: int, value: float): void;

  // enum Param
  /** The minimum difference between the pivot points' axes. */
  static readonly PARAM_LINEAR_LOWER_LIMIT: int;
  /** The maximum difference between the pivot points' axes. */
  static readonly PARAM_LINEAR_UPPER_LIMIT: int;
  /** A factor applied to the movement across the axes. The lower, the slower the movement. */
  static readonly PARAM_LINEAR_LIMIT_SOFTNESS: int;
  /** The amount of restitution on the axes' movement. The lower, the more momentum gets lost. */
  static readonly PARAM_LINEAR_RESTITUTION: int;
  /** The amount of damping that happens at the linear motion across the axes. */
  static readonly PARAM_LINEAR_DAMPING: int;
  /** The velocity the linear motor will try to reach. */
  static readonly PARAM_LINEAR_MOTOR_TARGET_VELOCITY: int;
  /** The maximum force the linear motor will apply while trying to reach the velocity target. */
  static readonly PARAM_LINEAR_MOTOR_FORCE_LIMIT: int;
  static readonly PARAM_LINEAR_SPRING_STIFFNESS: int;
  static readonly PARAM_LINEAR_SPRING_DAMPING: int;
  static readonly PARAM_LINEAR_SPRING_EQUILIBRIUM_POINT: int;
  /** The minimum rotation in negative direction to break loose and rotate around the axes. */
  static readonly PARAM_ANGULAR_LOWER_LIMIT: int;
  /** The minimum rotation in positive direction to break loose and rotate around the axes. */
  static readonly PARAM_ANGULAR_UPPER_LIMIT: int;
  /** The speed of all rotations across the axes. */
  static readonly PARAM_ANGULAR_LIMIT_SOFTNESS: int;
  /** The amount of rotational damping across the axes. The lower, the more damping occurs. */
  static readonly PARAM_ANGULAR_DAMPING: int;
  /** The amount of rotational restitution across the axes. The lower, the more restitution occurs. */
  static readonly PARAM_ANGULAR_RESTITUTION: int;
  /** The maximum amount of force that can occur, when rotating around the axes. */
  static readonly PARAM_ANGULAR_FORCE_LIMIT: int;
  /**
   * When rotating across the axes, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
   */
  static readonly PARAM_ANGULAR_ERP: int;
  /** Target speed for the motor at the axes. */
  static readonly PARAM_ANGULAR_MOTOR_TARGET_VELOCITY: int;
  /** Maximum acceleration for the motor at the axes. */
  static readonly PARAM_ANGULAR_MOTOR_FORCE_LIMIT: int;
  static readonly PARAM_ANGULAR_SPRING_STIFFNESS: int;
  static readonly PARAM_ANGULAR_SPRING_DAMPING: int;
  static readonly PARAM_ANGULAR_SPRING_EQUILIBRIUM_POINT: int;
  /** Represents the size of the {@link Param} enum. */
  static readonly PARAM_MAX: int;
  // enum Flag
  /** If enabled, linear motion is possible within the given limits. */
  static readonly FLAG_ENABLE_LINEAR_LIMIT: int;
  /** If enabled, rotational motion is possible within the given limits. */
  static readonly FLAG_ENABLE_ANGULAR_LIMIT: int;
  static readonly FLAG_ENABLE_LINEAR_SPRING: int;
  static readonly FLAG_ENABLE_ANGULAR_SPRING: int;
  /** If enabled, there is a rotational motor across these axes. */
  static readonly FLAG_ENABLE_MOTOR: int;
  /** If enabled, there is a linear motor across these axes. */
  static readonly FLAG_ENABLE_LINEAR_MOTOR: int;
  /** Represents the size of the {@link Flag} enum. */
  static readonly FLAG_MAX: int;
}
