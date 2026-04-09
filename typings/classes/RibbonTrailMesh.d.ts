// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Represents a straight ribbon-shaped {@link PrimitiveMesh} with variable width. */
declare class RibbonTrailMesh extends PrimitiveMesh {
  /**
   * Determines the size of the ribbon along its length. The size of a particular section segment is obtained by multiplying the baseline {@link size} by the value of this curve at the given distance. For values smaller than `0`, the faces will be inverted. Should be a unit {@link Curve}.
   */
  curve: Curve | null;
  /** The length of a section of the ribbon. */
  section_length: float;
  /**
   * The number of segments in a section. The {@link curve} is sampled on each segment to determine its size. Higher values result in a more detailed ribbon at the cost of performance.
   */
  section_segments: int;
  /** The total number of sections on the ribbon. */
  sections: int;
  /** Determines the shape of the ribbon. */
  shape: int;
  /**
   * The baseline size of the ribbon. The size of a particular section segment is obtained by multiplying this size by the value of the {@link curve} at the given distance.
   */
  size: float;
  set_curve(value: Curve | null): void;
  get_curve(): Curve | null;
  set_section_length(value: float): void;
  get_section_length(): float;
  set_section_segments(value: int): void;
  get_section_segments(): int;
  set_sections(value: int): void;
  get_sections(): int;
  set_shape(value: int): void;
  get_shape(): int;
  set_size(value: float): void;
  get_size(): float;

  // enum Shape
  /** Gives the mesh a single flat face. */
  static readonly SHAPE_FLAT: int;
  /** Gives the mesh two perpendicular flat faces, making a cross shape. */
  static readonly SHAPE_CROSS: int;
}
