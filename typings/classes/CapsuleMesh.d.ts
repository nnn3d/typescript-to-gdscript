// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Class representing a capsule-shaped {@link PrimitiveMesh}. */
declare class CapsuleMesh extends PrimitiveMesh {
  /**
   * Total height of the capsule mesh (including the hemispherical ends).
   * **Note:** The {@link height} of a capsule must be at least twice its {@link radius}. Otherwise, the capsule becomes a circle. If the {@link height} is less than twice the {@link radius}, the properties adjust to a valid value.
   */
  height: float;
  /** Number of radial segments on the capsule mesh. */
  radial_segments: int;
  /**
   * Radius of the capsule mesh.
   * **Note:** The {@link radius} of a capsule cannot be greater than half of its {@link height}. Otherwise, the capsule becomes a circle. If the {@link radius} is greater than half of the {@link height}, the properties adjust to a valid value.
   */
  radius: float;
  /** Number of rings along the height of the capsule. */
  rings: int;
  set_height(value: float): void;
  get_height(): float;
  set_radial_segments(value: int): void;
  get_radial_segments(): int;
  set_radius(value: float): void;
  get_radius(): float;
  set_rings(value: int): void;
  get_rings(): int;
}
