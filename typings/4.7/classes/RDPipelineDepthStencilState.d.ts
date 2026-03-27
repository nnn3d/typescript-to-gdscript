// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Pipeline depth/stencil state (used by {@link RenderingDevice}). */
declare class RDPipelineDepthStencilState extends RefCounted {
  /** The method used for comparing the previous back stencil value and {@link back_op_reference}. */
  back_op_compare: int;
  /** Selects which bits from the back stencil value will be compared. */
  back_op_compare_mask: int;
  /**
   * The operation to perform on the stencil buffer for back pixels that pass the stencil test but fail the depth test.
   */
  back_op_depth_fail: int;
  /** The operation to perform on the stencil buffer for back pixels that fail the stencil test. */
  back_op_fail: int;
  /** The operation to perform on the stencil buffer for back pixels that pass the stencil test. */
  back_op_pass: int;
  /** The value the previous back stencil value will be compared to. */
  back_op_reference: int;
  /** Selects which bits from the back stencil value will be changed. */
  back_op_write_mask: int;
  /** The method used for comparing the previous and current depth values. */
  depth_compare_operator: int;
  /** The maximum depth that returns `true` for {@link enable_depth_range}. */
  depth_range_max: float;
  /** The minimum depth that returns `true` for {@link enable_depth_range}. */
  depth_range_min: float;
  /**
   * If `true`, each depth value will be tested to see if it is between {@link depth_range_min} and {@link depth_range_max}. If it is outside of these values, it is discarded.
   */
  enable_depth_range: boolean;
  /**
   * If `true`, enables depth testing which allows objects to be automatically occluded by other objects based on their depth. This also allows objects to be partially occluded by other objects. If `false`, objects will appear in the order they were drawn (like in Godot's 2D renderer).
   */
  enable_depth_test: boolean;
  /**
   * If `true`, writes to the depth buffer whenever the depth test returns `true`. Only works when enable_depth_test is also `true`.
   */
  enable_depth_write: boolean;
  /**
   * If `true`, enables stencil testing. There are separate stencil buffers for front-facing triangles and back-facing triangles. See properties that begin with "front_op" and properties with "back_op" for each.
   */
  enable_stencil: boolean;
  /** The method used for comparing the previous front stencil value and {@link front_op_reference}. */
  front_op_compare: int;
  /** Selects which bits from the front stencil value will be compared. */
  front_op_compare_mask: int;
  /**
   * The operation to perform on the stencil buffer for front pixels that pass the stencil test but fail the depth test.
   */
  front_op_depth_fail: int;
  /** The operation to perform on the stencil buffer for front pixels that fail the stencil test. */
  front_op_fail: int;
  /** The operation to perform on the stencil buffer for front pixels that pass the stencil test. */
  front_op_pass: int;
  /** The value the previous front stencil value will be compared to. */
  front_op_reference: int;
  /** Selects which bits from the front stencil value will be changed. */
  front_op_write_mask: int;
  set_back_op_compare(value: int): void;
  get_back_op_compare(): int;
  set_back_op_compare_mask(value: int): void;
  get_back_op_compare_mask(): int;
  set_back_op_depth_fail(value: int): void;
  get_back_op_depth_fail(): int;
  set_back_op_fail(value: int): void;
  get_back_op_fail(): int;
  set_back_op_pass(value: int): void;
  get_back_op_pass(): int;
  set_back_op_reference(value: int): void;
  get_back_op_reference(): int;
  set_back_op_write_mask(value: int): void;
  get_back_op_write_mask(): int;
  set_depth_compare_operator(value: int): void;
  get_depth_compare_operator(): int;
  set_depth_range_max(value: float): void;
  get_depth_range_max(): float;
  set_depth_range_min(value: float): void;
  get_depth_range_min(): float;
  set_enable_depth_range(value: boolean): void;
  get_enable_depth_range(): boolean;
  set_enable_depth_test(value: boolean): void;
  get_enable_depth_test(): boolean;
  set_enable_depth_write(value: boolean): void;
  get_enable_depth_write(): boolean;
  set_enable_stencil(value: boolean): void;
  get_enable_stencil(): boolean;
  set_front_op_compare(value: int): void;
  get_front_op_compare(): int;
  set_front_op_compare_mask(value: int): void;
  get_front_op_compare_mask(): int;
  set_front_op_depth_fail(value: int): void;
  get_front_op_depth_fail(): int;
  set_front_op_fail(value: int): void;
  get_front_op_fail(): int;
  set_front_op_pass(value: int): void;
  get_front_op_pass(): int;
  set_front_op_reference(value: int): void;
  get_front_op_reference(): int;
  set_front_op_write_mask(value: int): void;
  get_front_op_write_mask(): int;
}
