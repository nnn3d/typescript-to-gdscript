// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A spheroid-shaped attractor that influences particles from {@link GPUParticles3D} nodes. */
declare class GPUParticlesAttractorSphere3D<Tree extends object = any> extends GPUParticlesAttractor3D<Tree> {
  /**
   * The attractor sphere's radius in 3D units.
   * **Note:** Stretched ellipses can be obtained by using non-uniform scaling on the {@link GPUParticlesAttractorSphere3D} node.
   */
  radius: float;
  set_radius(value: float): void;
  get_radius(): float;
}
