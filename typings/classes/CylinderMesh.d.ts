// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Class representing a cylindrical {@link PrimitiveMesh}. */
declare class CylinderMesh extends PrimitiveMesh {
  /**
   * Bottom radius of the cylinder. If set to `0.0`, the bottom faces will not be generated, resulting in a conic shape. See also {@link cap_bottom}.
   */
  bottom_radius: float;
  /**
   * If `true`, generates a cap at the bottom of the cylinder. This can be set to `false` to speed up generation and rendering when the cap is never seen by the camera. See also {@link bottom_radius}.
   * **Note:** If {@link bottom_radius} is `0.0`, cap generation is always skipped even if {@link cap_bottom} is `true`.
   */
  cap_bottom: boolean;
  /**
   * If `true`, generates a cap at the top of the cylinder. This can be set to `false` to speed up generation and rendering when the cap is never seen by the camera. See also {@link top_radius}.
   * **Note:** If {@link top_radius} is `0.0`, cap generation is always skipped even if {@link cap_top} is `true`.
   */
  cap_top: boolean;
  /** Full height of the cylinder. */
  height: float;
  /**
   * Number of radial segments on the cylinder. Higher values result in a more detailed cylinder/cone at the cost of performance.
   */
  radial_segments: int;
  /**
   * Number of edge rings along the height of the cylinder. Changing {@link rings} does not have any visual impact unless a shader or procedural mesh tool is used to alter the vertex data. Higher values result in more subdivisions, which can be used to create smoother-looking effects with shaders or procedural mesh tools (at the cost of performance). When not altering the vertex data using a shader or procedural mesh tool, {@link rings} should be kept to its default value.
   */
  rings: int;
  /**
   * Top radius of the cylinder. If set to `0.0`, the top faces will not be generated, resulting in a conic shape. See also {@link cap_top}.
   */
  top_radius: float;
  set_bottom_radius(value: float): void;
  get_bottom_radius(): float;
  set_cap_bottom(value: boolean): void;
  is_cap_bottom(): boolean;
  set_cap_top(value: boolean): void;
  is_cap_top(): boolean;
  set_height(value: float): void;
  get_height(): float;
  set_radial_segments(value: int): void;
  get_radial_segments(): int;
  set_rings(value: int): void;
  get_rings(): int;
  set_top_radius(value: float): void;
  get_top_radius(): float;
}
