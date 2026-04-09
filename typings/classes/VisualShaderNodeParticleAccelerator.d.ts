// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A visual shader node that accelerates particles. */
declare class VisualShaderNodeParticleAccelerator extends VisualShaderNode {
  /** Defines in what manner the particles will be accelerated. */
  mode: int;
  set_mode(value: int): void;
  get_mode(): int;

  // enum Mode
  /** The particles will be accelerated based on their velocity. */
  static readonly MODE_LINEAR: int;
  /** The particles will be accelerated towards or away from the center. */
  static readonly MODE_RADIAL: int;
  /** The particles will be accelerated tangentially to the radius vector from center to their position. */
  static readonly MODE_TANGENTIAL: int;
  /** Represents the size of the {@link Mode} enum. */
  static readonly MODE_MAX: int;
}
