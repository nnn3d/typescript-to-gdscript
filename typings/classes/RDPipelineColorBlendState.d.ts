// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Pipeline color blend state (used by {@link RenderingDevice}). */
declare class RDPipelineColorBlendState extends RefCounted {
  /** The attachments that are blended together. */
  attachments: Array<RDPipelineColorBlendStateAttachment>;
  /** The constant color to blend with. See also {@link RenderingDevice.draw_list_set_blend_constants}. */
  blend_constant: Color;
  /** If `true`, performs the logic operation defined in {@link logic_op}. */
  enable_logic_op: boolean;
  /** The logic operation to perform for blending. Only effective if {@link enable_logic_op} is `true`. */
  logic_op: int;
  set_attachments(value: Array<RDPipelineColorBlendStateAttachment>): void;
  get_attachments(): Array<RDPipelineColorBlendStateAttachment>;
  set_blend_constant(value: Color): void;
  get_blend_constant(): Color;
  set_enable_logic_op(value: boolean): void;
  get_enable_logic_op(): boolean;
  set_logic_op(value: int): void;
  get_logic_op(): int;
}
