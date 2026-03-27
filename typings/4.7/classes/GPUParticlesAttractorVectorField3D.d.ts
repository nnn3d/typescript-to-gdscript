// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * A box-shaped attractor with varying directions and strengths defined in it that influences particles from {@link GPUParticles3D} nodes.
 */
declare class GPUParticlesAttractorVectorField3D<Tree extends object = any> extends GPUParticlesAttractor3D<Tree> {
  /** The size of the vector field box in 3D units. */
  size: Vector3;
  /**
   * The 3D texture to be used. Values are linearly interpolated between the texture's pixels.
   * **Note:** To get better performance, the 3D texture's resolution should reflect the {@link size} of the attractor. Since particle attraction is usually low-frequency data, the texture can be kept at a low resolution such as 64×64×64.
   */
  texture: Texture3D;
  set_size(value: Vector3): void;
  get_size(): Vector3;
  set_texture(value: Texture3D): void;
  get_texture(): Texture3D;
}
