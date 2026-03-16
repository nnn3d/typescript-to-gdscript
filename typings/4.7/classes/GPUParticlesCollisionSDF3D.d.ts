// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A baked signed distance field 3D particle collision shape affecting {@link GPUParticles3D} nodes. */
declare class GPUParticlesCollisionSDF3D extends GPUParticlesCollision3D {
  /**
   * The visual layers to account for when baking the particle collision SDF. Only {@link MeshInstance3D}s whose {@link VisualInstance3D.layers} match with this {@link bake_mask} will be included in the generated particle collision SDF. By default, all objects are taken into account for the particle collision SDF baking.
   */
  bake_mask: int;
  /**
   * The bake resolution to use for the signed distance field {@link texture}. The texture must be baked again for changes to the {@link resolution} property to be effective. Higher resolutions have a greater performance cost and take more time to bake. Higher resolutions also result in larger baked textures, leading to increased VRAM and storage space requirements. To improve performance and reduce bake times, use the lowest resolution possible for the object you're representing the collision of.
   */
  resolution: int;
  /**
   * The collision SDF's size in 3D units. To improve SDF quality, the {@link size} should be set as small as possible while covering the parts of the scene you need.
   */
  size: Vector3;
  /** The 3D texture representing the signed distance field. */
  texture: Texture3D;
  /**
   * The collision shape's thickness. Unlike other particle colliders, {@link GPUParticlesCollisionSDF3D} is actually hollow on the inside. {@link thickness} can be increased to prevent particles from tunneling through the collision shape at high speeds, or when the {@link GPUParticlesCollisionSDF3D} is moved.
   */
  thickness: float;

  /**
   * Returns whether or not the specified layer of the {@link bake_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_bake_mask_value(layer_number: int): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link bake_mask}, given a `layer_number` between 1 and 32.
   */
  set_bake_mask_value(layer_number: int, value: boolean): void;

  // enum Resolution
  /** Bake a 16×16×16 signed distance field. This is the fastest option, but also the least precise. */
  static readonly RESOLUTION_16: int;
  /** Bake a 32×32×32 signed distance field. */
  static readonly RESOLUTION_32: int;
  /** Bake a 64×64×64 signed distance field. */
  static readonly RESOLUTION_64: int;
  /** Bake a 128×128×128 signed distance field. */
  static readonly RESOLUTION_128: int;
  /** Bake a 256×256×256 signed distance field. */
  static readonly RESOLUTION_256: int;
  /** Bake a 512×512×512 signed distance field. This is the slowest option, but also the most precise. */
  static readonly RESOLUTION_512: int;
  /** Represents the size of the {@link Resolution} enum. */
  static readonly RESOLUTION_MAX: int;
}
