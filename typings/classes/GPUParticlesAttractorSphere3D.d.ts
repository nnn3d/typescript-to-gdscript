// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A spheroid-shaped attractor that influences particles from {@link GPUParticles3D} nodes. */
declare class GPUParticlesAttractorSphere3D extends GPUParticlesAttractor3D {
  /**
   * The attractor sphere's radius in 3D units.
   * **Note:** Stretched ellipses can be obtained by using non-uniform scaling on the {@link GPUParticlesAttractorSphere3D} node.
   */
  radius: float;
  set_radius(value: float): void;
  get_radius(): float;
}
