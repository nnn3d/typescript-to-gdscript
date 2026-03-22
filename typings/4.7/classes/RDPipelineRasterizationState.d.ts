// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Pipeline rasterization state (used by {@link RenderingDevice}). */
declare class RDPipelineRasterizationState extends RefCounted {
  /**
   * The cull mode to use when drawing polygons, which determines whether front faces or backfaces are hidden.
   */
  cull_mode: int;
  /**
   * A limit for how much each depth value can be offset. If negative, it serves as a minimum value, but if positive, it serves as a maximum value.
   */
  depth_bias_clamp: float;
  /** A constant offset added to each depth value. Applied after {@link depth_bias_slope_factor}. */
  depth_bias_constant_factor: float;
  /**
   * If `true`, each generated depth value will by offset by some amount. The specific amount is generated per polygon based on the values of {@link depth_bias_slope_factor} and {@link depth_bias_constant_factor}.
   */
  depth_bias_enabled: boolean;
  /**
   * A constant scale applied to the slope of each polygons' depth. Applied before {@link depth_bias_constant_factor}.
   */
  depth_bias_slope_factor: float;
  /** If `true`, primitives are discarded immediately before the rasterization stage. */
  discard_primitives: boolean;
  /**
   * If `true`, clamps depth values according to the minimum and maximum depth of the associated viewport.
   */
  enable_depth_clamp: boolean;
  /** The winding order to use to determine which face of a triangle is considered its front face. */
  front_face: int;
  /**
   * The line width to use when drawing lines (in pixels). Thick lines may not be supported on all hardware.
   */
  line_width: float;
  /**
   * The number of control points to use when drawing a patch with tessellation enabled. Higher values result in higher quality at the cost of performance.
   */
  patch_control_points: int;
  /** If `true`, performs wireframe rendering for triangles instead of flat or textured rendering. */
  wireframe: boolean;
  set_cull_mode(value: int): void;
  get_cull_mode(): int;
  set_depth_bias_clamp(value: float): void;
  get_depth_bias_clamp(): float;
  set_depth_bias_constant_factor(value: float): void;
  get_depth_bias_constant_factor(): float;
  set_depth_bias_enabled(value: boolean): void;
  get_depth_bias_enabled(): boolean;
  set_depth_bias_slope_factor(value: float): void;
  get_depth_bias_slope_factor(): float;
  set_discard_primitives(value: boolean): void;
  get_discard_primitives(): boolean;
  set_enable_depth_clamp(value: boolean): void;
  get_enable_depth_clamp(): boolean;
  set_front_face(value: int): void;
  get_front_face(): int;
  set_line_width(value: float): void;
  get_line_width(): float;
  set_patch_control_points(value: int): void;
  get_patch_control_points(): int;
  set_wireframe(value: boolean): void;
  get_wireframe(): boolean;
}
