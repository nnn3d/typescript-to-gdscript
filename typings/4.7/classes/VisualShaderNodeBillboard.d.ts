// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node that controls how the object faces the camera to be used within the visual shader graph. */
declare class VisualShaderNodeBillboard extends VisualShaderNode {
  /** Controls how the object faces the camera. */
  billboard_type: int;
  /**
   * If `true`, the shader will keep the scale set for the mesh. Otherwise, the scale is lost when billboarding.
   */
  keep_scale: boolean;

  // enum BillboardType
  /** Billboarding is disabled and the node does nothing. */
  static readonly BILLBOARD_TYPE_DISABLED: int;
  /** A standard billboarding algorithm is enabled. */
  static readonly BILLBOARD_TYPE_ENABLED: int;
  /** A billboarding algorithm to rotate around Y-axis is enabled. */
  static readonly BILLBOARD_TYPE_FIXED_Y: int;
  /** A billboarding algorithm designed to use on particles is enabled. */
  static readonly BILLBOARD_TYPE_PARTICLES: int;
  /** Represents the size of the {@link BillboardType} enum. */
  static readonly BILLBOARD_TYPE_MAX: int;
}
