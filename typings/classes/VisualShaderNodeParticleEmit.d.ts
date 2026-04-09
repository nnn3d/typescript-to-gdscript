// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A visual shader node that forces to emit a particle from a sub-emitter. */
declare class VisualShaderNodeParticleEmit extends VisualShaderNode {
  /** Flags used to override the properties defined in the sub-emitter's process material. */
  flags: int;
  set_flags(value: int): void;
  get_flags(): int;

  // enum EmitFlags
  /** If enabled, the particle starts with the position defined by this node. */
  static readonly EMIT_FLAG_POSITION: int;
  /** If enabled, the particle starts with the rotation and scale defined by this node. */
  static readonly EMIT_FLAG_ROT_SCALE: int;
  /** If enabled,the particle starts with the velocity defined by this node. */
  static readonly EMIT_FLAG_VELOCITY: int;
  /** If enabled, the particle starts with the color defined by this node. */
  static readonly EMIT_FLAG_COLOR: int;
  /** If enabled, the particle starts with the `CUSTOM` data defined by this node. */
  static readonly EMIT_FLAG_CUSTOM: int;
}
