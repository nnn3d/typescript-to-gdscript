// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for 3D particle attractors. */
declare class GPUParticlesAttractor3D<Tree extends object = any> extends VisualInstance3D<Tree> {
  /**
   * The particle attractor's attenuation. Higher values result in more gradual pushing of particles as they come closer to the attractor's origin. Zero or negative values will cause particles to be pushed very fast as soon as the touch the attractor's edges.
   */
  attenuation: float;
  /**
   * The particle rendering layers ({@link VisualInstance3D.layers}) that will be affected by the attractor. By default, all particles are affected by an attractor.
   * After configuring particle nodes accordingly, specific layers can be unchecked to prevent certain particles from being affected by attractors. For example, this can be used if you're using an attractor as part of a spell effect but don't want the attractor to affect unrelated weather particles at the same position.
   * Particle attraction can also be disabled on a per-process material basis by setting {@link ParticleProcessMaterial.attractor_interaction_enabled} on the {@link GPUParticles3D} node.
   */
  cull_mask: int;
  /**
   * Adjusts how directional the attractor is. At `0.0`, the attractor is not directional at all: it will attract particles towards its center. At `1.0`, the attractor is fully directional: particles will always be pushed towards local -Z (or +Z if {@link strength} is negative).
   * **Note:** If {@link directionality} is greater than `0.0`, the direction in which particles are pushed can be changed by rotating the {@link GPUParticlesAttractor3D} node.
   */
  directionality: float;
  /**
   * Adjusts the strength of the attractor. If {@link strength} is negative, particles will be pushed in the opposite direction. Particles will be pushed *away* from the attractor's origin if {@link directionality} is `0.0`, or towards local +Z if {@link directionality} is greater than `0.0`.
   */
  strength: float;
  set_attenuation(value: float): void;
  get_attenuation(): float;
  set_cull_mask(value: int): void;
  get_cull_mask(): int;
  set_directionality(value: float): void;
  get_directionality(): float;
  set_strength(value: float): void;
  get_strength(): float;
}
