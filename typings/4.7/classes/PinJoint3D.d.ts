// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A physics joint that attaches two 3D physics bodies at a single point, allowing them to freely rotate.
 */
declare class PinJoint3D extends Joint3D {
  /**
   * The force with which the pinned objects stay in positional relation to each other. The higher, the stronger.
   */
  'params/bias': float;
  /**
   * The force with which the pinned objects stay in velocity relation to each other. The higher, the stronger.
   */
  'params/damping': float;
  /** If above 0, this value is the maximum value for an impulse that this Joint3D produces. */
  'params/impulse_clamp': float;

  /** Returns the value of the specified parameter. */
  get_param(param: int): float;
  /** Sets the value of the specified parameter. */
  set_param(param: int, value: float): void;

  // enum Param
  /**
   * The force with which the pinned objects stay in positional relation to each other. The higher, the stronger.
   */
  static readonly PARAM_BIAS: int;
  /**
   * The force with which the pinned objects stay in velocity relation to each other. The higher, the stronger.
   */
  static readonly PARAM_DAMPING: int;
  /** If above 0, this value is the maximum value for an impulse that this Joint3D produces. */
  static readonly PARAM_IMPULSE_CLAMP: int;
}
