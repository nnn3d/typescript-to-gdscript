// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A 2D capsule shape used for physics collision. */
declare class CapsuleShape2D extends Shape2D {
  /**
   * The capsule's full height, including the semicircles.
   * **Note:** The {@link height} of a capsule must be at least twice its {@link radius}. Otherwise, the capsule becomes a circle. If the {@link height} is less than twice the {@link radius}, the properties adjust to a valid value.
   */
  height: float;
  /**
   * The capsule's height, excluding the semicircles. This is the height of the central rectangular part in the middle of the capsule, and is the distance between the centers of the two semicircles. This is a wrapper for {@link height}.
   */
  mid_height: float;
  /**
   * The capsule's radius.
   * **Note:** The {@link radius} of a capsule cannot be greater than half of its {@link height}. Otherwise, the capsule becomes a circle. If the {@link radius} is greater than half of the {@link height}, the properties adjust to a valid value.
   */
  radius: float;
  set_height(value: float): void;
  get_height(): float;
  set_mid_height(value: float): void;
  get_mid_height(): float;
  set_radius(value: float): void;
  get_radius(): float;
}
