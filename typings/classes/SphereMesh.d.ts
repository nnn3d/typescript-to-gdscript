// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Class representing a spherical {@link PrimitiveMesh}. */
declare class SphereMesh extends PrimitiveMesh {
  /** Full height of the sphere. */
  height: float;
  /**
   * If `true`, a hemisphere is created rather than a full sphere.
   * **Note:** To get a regular hemisphere, the height and radius of the sphere must be equal.
   */
  is_hemisphere: boolean;
  /** Number of radial segments on the sphere. */
  radial_segments: int;
  /** Radius of sphere. */
  radius: float;
  /** Number of segments along the height of the sphere. */
  rings: int;
  set_height(value: float): void;
  get_height(): float;
  set_is_hemisphere(value: boolean): void;
  get_is_hemisphere(): boolean;
  set_radial_segments(value: int): void;
  get_radial_segments(): int;
  set_radius(value: float): void;
  get_radius(): float;
  set_rings(value: int): void;
  get_rings(): int;
}
