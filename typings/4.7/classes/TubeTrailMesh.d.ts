// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a straight tube-shaped {@link PrimitiveMesh} with variable width. */
declare class TubeTrailMesh extends PrimitiveMesh {
  /**
   * If `true`, generates a cap at the bottom of the tube. This can be set to `false` to speed up generation and rendering when the cap is never seen by the camera.
   */
  cap_bottom: boolean;
  /**
   * If `true`, generates a cap at the top of the tube. This can be set to `false` to speed up generation and rendering when the cap is never seen by the camera.
   */
  cap_top: boolean;
  /**
   * Determines the radius of the tube along its length. The radius of a particular section ring is obtained by multiplying the baseline {@link radius} by the value of this curve at the given distance. For values smaller than `0`, the faces will be inverted. Should be a unit {@link Curve}.
   */
  curve: Curve;
  /**
   * The number of sides on the tube. For example, a value of `5` means the tube will be pentagonal. Higher values result in a more detailed tube at the cost of performance.
   */
  radial_steps: int;
  /**
   * The baseline radius of the tube. The radius of a particular section ring is obtained by multiplying this radius by the value of the {@link curve} at the given distance.
   */
  radius: float;
  /** The length of a section of the tube. */
  section_length: float;
  /**
   * The number of rings in a section. The {@link curve} is sampled on each ring to determine its radius. Higher values result in a more detailed tube at the cost of performance.
   */
  section_rings: int;
  /** The total number of sections on the tube. */
  sections: int;
}
