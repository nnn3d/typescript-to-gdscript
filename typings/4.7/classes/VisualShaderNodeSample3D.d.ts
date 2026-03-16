// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A base node for nodes which samples 3D textures in the visual shader graph. */
declare class VisualShaderNodeSample3D extends VisualShaderNode {
  /** An input source type. */
  source: int;

  // enum Source
  /** Creates internal uniform and provides a way to assign it within node. */
  static readonly SOURCE_TEXTURE: int;
  /** Use the uniform texture from sampler port. */
  static readonly SOURCE_PORT: int;
  /** Represents the size of the {@link Source} enum. */
  static readonly SOURCE_MAX: int;
}
