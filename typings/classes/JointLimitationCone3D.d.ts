// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A cone shape limitation that interacts with {@link ChainIK3D}. */
declare class JointLimitationCone3D extends JointLimitation3D {
  /**
   * The radius range of the hole made by the cone.
   * `0` degrees makes a sphere without hole, `180` degrees makes a hemisphere, and `360` degrees become empty (no limitation).
   */
  angle: float;
  set_angle(value: float): void;
  get_angle(): float;
}
