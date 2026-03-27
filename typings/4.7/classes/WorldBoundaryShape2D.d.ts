// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 2D world boundary (half-plane) shape used for physics collision. */
declare class WorldBoundaryShape2D extends Shape2D {
  /**
   * The distance from the origin to the line, expressed in terms of {@link normal} (according to its direction and magnitude). Actual absolute distance from the origin to the line can be calculated as `abs(distance) / normal.length()`.
   * In the scalar equation of the line `ax + by = d`, this is `d`, while the `(a, b)` coordinates are represented by the {@link normal} property.
   */
  distance: float;
  /**
   * The line's normal, typically a unit vector. Its direction indicates the non-colliding half-plane. Can be of any length but zero. Defaults to {@link Vector2.UP}.
   */
  normal: Vector2;
  set_distance(value: float): void;
  get_distance(): float;
  set_normal(value: Vector2): void;
  get_normal(): Vector2;
}
