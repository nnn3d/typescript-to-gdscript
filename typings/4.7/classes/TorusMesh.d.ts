// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Class representing a torus {@link PrimitiveMesh}. */
declare class TorusMesh extends PrimitiveMesh {
  /** The inner radius of the torus. */
  inner_radius: float;
  /** The outer radius of the torus. */
  outer_radius: float;
  /** The number of edges each ring of the torus is constructed of. */
  ring_segments: int;
  /** The number of slices the torus is constructed of. */
  rings: int;
  set_inner_radius(value: float): void;
  get_inner_radius(): float;
  set_outer_radius(value: float): void;
  get_outer_radius(): float;
  set_ring_segments(value: int): void;
  get_ring_segments(): int;
  set_rings(value: int): void;
  get_rings(): int;
}
