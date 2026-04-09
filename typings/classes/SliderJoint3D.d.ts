// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * A physics joint that restricts the movement of a 3D physics body along an axis relative to another physics body.
 */
declare class SliderJoint3D extends Joint3D {
  /**
   * The amount of damping of the rotation when the limit is surpassed.
   * A lower damping value allows a rotation initiated by body A to travel to body B slower.
   */
  'angular_limit/damping': float;
  /** The lower limit of rotation in the slider. */
  'angular_limit/lower_angle': float;
  /**
   * The amount of restitution of the rotation when the limit is surpassed.
   * Does not affect damping.
   */
  'angular_limit/restitution': float;
  /**
   * A factor applied to the all rotation once the limit is surpassed.
   * Makes all rotation slower when between 0 and 1.
   */
  'angular_limit/softness': float;
  /** The upper limit of rotation in the slider. */
  'angular_limit/upper_angle': float;
  /** The amount of damping of the rotation in the limits. */
  'angular_motion/damping': float;
  /** The amount of restitution of the rotation in the limits. */
  'angular_motion/restitution': float;
  /** A factor applied to the all rotation in the limits. */
  'angular_motion/softness': float;
  /** The amount of damping of the rotation across axes orthogonal to the slider. */
  'angular_ortho/damping': float;
  /** The amount of restitution of the rotation across axes orthogonal to the slider. */
  'angular_ortho/restitution': float;
  /** A factor applied to the all rotation across axes orthogonal to the slider. */
  'angular_ortho/softness': float;
  /**
   * The amount of damping that happens once the limit defined by {@link linear_limit/lower_distance} and {@link linear_limit/upper_distance} is surpassed.
   */
  'linear_limit/damping': float;
  /** The minimum difference between the pivot points on their X axis before damping happens. */
  'linear_limit/lower_distance': float;
  /**
   * The amount of restitution once the limits are surpassed. The lower, the more velocity-energy gets lost.
   */
  'linear_limit/restitution': float;
  /**
   * A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement.
   */
  'linear_limit/softness': float;
  /** The maximum difference between the pivot points on their X axis before damping happens. */
  'linear_limit/upper_distance': float;
  /** The amount of damping inside the slider limits. */
  'linear_motion/damping': float;
  /** The amount of restitution inside the slider limits. */
  'linear_motion/restitution': float;
  /**
   * A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement.
   */
  'linear_motion/softness': float;
  /** The amount of damping when movement is across axes orthogonal to the slider. */
  'linear_ortho/damping': float;
  /** The amount of restitution when movement is across axes orthogonal to the slider. */
  'linear_ortho/restitution': float;
  /** A factor applied to the movement across axes orthogonal to the slider. */
  'linear_ortho/softness': float;

  /** Returns the value of the given parameter. */
  get_param(param: int): float;
  /** Assigns `value` to the given parameter. */
  set_param(param: int, value: float): void;

  // enum Param
  /**
   * Constant for accessing {@link linear_limit/upper_distance}. The maximum difference between the pivot points on their X axis before damping happens.
   */
  static readonly PARAM_LINEAR_LIMIT_UPPER: int;
  /**
   * Constant for accessing {@link linear_limit/lower_distance}. The minimum difference between the pivot points on their X axis before damping happens.
   */
  static readonly PARAM_LINEAR_LIMIT_LOWER: int;
  /**
   * Constant for accessing {@link linear_limit/softness}. A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement.
   */
  static readonly PARAM_LINEAR_LIMIT_SOFTNESS: int;
  /**
   * Constant for accessing {@link linear_limit/restitution}. The amount of restitution once the limits are surpassed. The lower, the more velocity-energy gets lost.
   */
  static readonly PARAM_LINEAR_LIMIT_RESTITUTION: int;
  /**
   * Constant for accessing {@link linear_limit/damping}. The amount of damping once the slider limits are surpassed.
   */
  static readonly PARAM_LINEAR_LIMIT_DAMPING: int;
  /**
   * Constant for accessing {@link linear_motion/softness}. A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement.
   */
  static readonly PARAM_LINEAR_MOTION_SOFTNESS: int;
  /**
   * Constant for accessing {@link linear_motion/restitution}. The amount of restitution inside the slider limits.
   */
  static readonly PARAM_LINEAR_MOTION_RESTITUTION: int;
  /**
   * Constant for accessing {@link linear_motion/damping}. The amount of damping inside the slider limits.
   */
  static readonly PARAM_LINEAR_MOTION_DAMPING: int;
  /**
   * Constant for accessing {@link linear_ortho/softness}. A factor applied to the movement across axes orthogonal to the slider.
   */
  static readonly PARAM_LINEAR_ORTHOGONAL_SOFTNESS: int;
  /**
   * Constant for accessing {@link linear_motion/restitution}. The amount of restitution when movement is across axes orthogonal to the slider.
   */
  static readonly PARAM_LINEAR_ORTHOGONAL_RESTITUTION: int;
  /**
   * Constant for accessing {@link linear_motion/damping}. The amount of damping when movement is across axes orthogonal to the slider.
   */
  static readonly PARAM_LINEAR_ORTHOGONAL_DAMPING: int;
  /**
   * Constant for accessing {@link angular_limit/upper_angle}. The upper limit of rotation in the slider.
   */
  static readonly PARAM_ANGULAR_LIMIT_UPPER: int;
  /**
   * Constant for accessing {@link angular_limit/lower_angle}. The lower limit of rotation in the slider.
   */
  static readonly PARAM_ANGULAR_LIMIT_LOWER: int;
  /**
   * Constant for accessing {@link angular_limit/softness}. A factor applied to the all rotation once the limit is surpassed.
   */
  static readonly PARAM_ANGULAR_LIMIT_SOFTNESS: int;
  /**
   * Constant for accessing {@link angular_limit/restitution}. The amount of restitution of the rotation when the limit is surpassed.
   */
  static readonly PARAM_ANGULAR_LIMIT_RESTITUTION: int;
  /**
   * Constant for accessing {@link angular_limit/damping}. The amount of damping of the rotation when the limit is surpassed.
   */
  static readonly PARAM_ANGULAR_LIMIT_DAMPING: int;
  /**
   * Constant for accessing {@link angular_motion/softness}. A factor applied to the all rotation in the limits.
   */
  static readonly PARAM_ANGULAR_MOTION_SOFTNESS: int;
  /**
   * Constant for accessing {@link angular_motion/restitution}. The amount of restitution of the rotation in the limits.
   */
  static readonly PARAM_ANGULAR_MOTION_RESTITUTION: int;
  /**
   * Constant for accessing {@link angular_motion/damping}. The amount of damping of the rotation in the limits.
   */
  static readonly PARAM_ANGULAR_MOTION_DAMPING: int;
  /**
   * Constant for accessing {@link angular_ortho/softness}. A factor applied to the all rotation across axes orthogonal to the slider.
   */
  static readonly PARAM_ANGULAR_ORTHOGONAL_SOFTNESS: int;
  /**
   * Constant for accessing {@link angular_ortho/restitution}. The amount of restitution of the rotation across axes orthogonal to the slider.
   */
  static readonly PARAM_ANGULAR_ORTHOGONAL_RESTITUTION: int;
  /**
   * Constant for accessing {@link angular_ortho/damping}. The amount of damping of the rotation across axes orthogonal to the slider.
   */
  static readonly PARAM_ANGULAR_ORTHOGONAL_DAMPING: int;
  /** Represents the size of the {@link Param} enum. */
  static readonly PARAM_MAX: int;
}
