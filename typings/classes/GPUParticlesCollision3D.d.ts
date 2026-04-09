// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for 3D particle collision shapes affecting {@link GPUParticles3D} nodes. */
declare class GPUParticlesCollision3D extends VisualInstance3D {
  /**
   * The particle rendering layers ({@link VisualInstance3D.layers}) that will be affected by the collision shape. By default, all particles that have {@link ParticleProcessMaterial.collision_mode} set to {@link ParticleProcessMaterial.COLLISION_RIGID} or {@link ParticleProcessMaterial.COLLISION_HIDE_ON_CONTACT} will be affected by a collision shape.
   * After configuring particle nodes accordingly, specific layers can be unchecked to prevent certain particles from being affected by colliders. For example, this can be used if you're using a collider as part of a spell effect but don't want the collider to affect unrelated weather particles at the same position.
   * Particle collision can also be disabled on a per-process material basis by setting {@link ParticleProcessMaterial.collision_mode} on the {@link GPUParticles3D} node.
   */
  cull_mask: int;
  set_cull_mask(value: int): void;
  get_cull_mask(): int;
}
