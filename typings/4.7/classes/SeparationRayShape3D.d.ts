// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 3D ray shape used for physics collision that tries to separate itself from any collider. */
declare class SeparationRayShape3D extends Shape3D {
  /** The ray's length. */
  length: float;
  /**
   * If `false` (default), the shape always separates and returns a normal along its own direction.
   * If `true`, the shape can return the correct normal and separate in any direction, allowing sliding motion on slopes.
   */
  slide_on_slope: boolean;
  set_length(value: float): void;
  get_length(): float;
  set_slide_on_slope(value: boolean): void;
  get_slide_on_slope(): boolean;
}
