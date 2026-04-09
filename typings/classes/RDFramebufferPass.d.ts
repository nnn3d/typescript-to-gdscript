// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Framebuffer pass attachment description (used by {@link RenderingDevice}). */
declare class RDFramebufferPass extends RefCounted {
  /**
   * Color attachments in order starting from 0. If this attachment is not used by the shader, pass ATTACHMENT_UNUSED to skip.
   */
  color_attachments: PackedInt32Array;
  /** Depth attachment. ATTACHMENT_UNUSED should be used if no depth buffer is required for this pass. */
  depth_attachment: int;
  /**
   * Used for multipass framebuffers (more than one render pass). Converts an attachment to an input. Make sure to also supply it properly in the {@link RDUniform} for the uniform set.
   */
  input_attachments: PackedInt32Array;
  /** Attachments to preserve in this pass (otherwise they are erased). */
  preserve_attachments: PackedInt32Array;
  /** If the color attachments are multisampled, non-multisampled resolve attachments can be provided. */
  resolve_attachments: PackedInt32Array;
  set_color_attachments(value: PackedInt32Array | Array<unknown>): void;
  get_color_attachments(): PackedInt32Array;
  set_depth_attachment(value: int): void;
  get_depth_attachment(): int;
  set_input_attachments(value: PackedInt32Array | Array<unknown>): void;
  get_input_attachments(): PackedInt32Array;
  set_preserve_attachments(value: PackedInt32Array | Array<unknown>): void;
  get_preserve_attachments(): PackedInt32Array;
  set_resolve_attachments(value: PackedInt32Array | Array<unknown>): void;
  get_resolve_attachments(): PackedInt32Array;

  /** Attachment is unused. */
  static readonly ATTACHMENT_UNUSED: int;
}
