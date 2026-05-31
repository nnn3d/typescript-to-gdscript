// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Attachment format (used by {@link RenderingDevice}). */
declare class RDAttachmentFormat extends RefCounted {
  /** The attachment's data format. */
  format: int;
  /** The number of samples used when sampling the attachment. */
  samples: int;
  /** The attachment's usage flags, which determine what can be done with it. */
  usage_flags: int;
  set_format(value: int): void;
  get_format(): int;
  set_samples(value: int): void;
  get_samples(): int;
  set_usage_flags(value: int): void;
  get_usage_flags(): int;
}
