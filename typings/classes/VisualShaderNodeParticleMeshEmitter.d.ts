// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A visual shader node that makes particles emitted in a shape defined by a {@link Mesh}. */
declare class VisualShaderNodeParticleMeshEmitter extends VisualShaderNodeParticleEmitter {
  /** The {@link Mesh} that defines emission shape. */
  mesh: Mesh | null;
  /**
   * Index of the surface that emits particles. {@link use_all_surfaces} must be `false` for this to take effect.
   */
  surface_index: int;
  /** If `true`, the particles will emit from all surfaces of the mesh. */
  use_all_surfaces: boolean;
  set_mesh(value: Mesh | null): void;
  get_mesh(): Mesh | null;
  set_surface_index(value: int): void;
  get_surface_index(): int;
  set_use_all_surfaces(value: boolean): void;
  is_use_all_surfaces(): boolean;
}
