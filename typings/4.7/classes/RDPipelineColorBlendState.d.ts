// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Pipeline color blend state (used by {@link RenderingDevice}). */
declare class RDPipelineColorBlendState extends RefCounted {
  /** The attachments that are blended together. */
  attachments: unknown;
  /** The constant color to blend with. See also {@link RenderingDevice.draw_list_set_blend_constants}. */
  blend_constant: Color;
  /** If `true`, performs the logic operation defined in {@link logic_op}. */
  enable_logic_op: boolean;
  /** The logic operation to perform for blending. Only effective if {@link enable_logic_op} is `true`. */
  logic_op: int;
}
