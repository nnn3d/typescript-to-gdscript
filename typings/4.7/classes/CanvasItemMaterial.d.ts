// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A material for {@link CanvasItem}s. */
declare class CanvasItemMaterial extends Material {
  /** The manner in which a material's rendering is applied to underlying textures. */
  blend_mode: int;
  /** The manner in which material reacts to lighting. */
  light_mode: int;
  /**
   * The number of columns in the spritesheet assigned as {@link Texture2D} for a {@link GPUParticles2D} or {@link CPUParticles2D}.
   * **Note:** This property is only used and visible in the editor if {@link particles_animation} is `true`.
   */
  particles_anim_h_frames: int;
  /**
   * If `true`, the particles animation will loop.
   * **Note:** This property is only used and visible in the editor if {@link particles_animation} is `true`.
   */
  particles_anim_loop: boolean;
  /**
   * The number of rows in the spritesheet assigned as {@link Texture2D} for a {@link GPUParticles2D} or {@link CPUParticles2D}.
   * **Note:** This property is only used and visible in the editor if {@link particles_animation} is `true`.
   */
  particles_anim_v_frames: int;
  /**
   * If `true`, enable spritesheet-based animation features when assigned to {@link GPUParticles2D} and {@link CPUParticles2D} nodes. The {@link ParticleProcessMaterial.anim_speed_max} or {@link CPUParticles2D.anim_speed_max} should also be set to a positive value for the animation to play.
   * This property (and other `particles_anim_*` properties that depend on it) has no effect on other types of nodes.
   */
  particles_animation: boolean;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;
  set_light_mode(value: int): void;
  get_light_mode(): int;
  set_particles_anim_h_frames(value: int): void;
  get_particles_anim_h_frames(): int;
  set_particles_anim_loop(value: boolean): void;
  get_particles_anim_loop(): boolean;
  set_particles_anim_v_frames(value: int): void;
  get_particles_anim_v_frames(): int;
  set_particles_animation(value: boolean): void;
  get_particles_animation(): boolean;

  // enum BlendMode
  /** Mix blending mode. Colors are assumed to be independent of the alpha (opacity) value. */
  static readonly BLEND_MODE_MIX: int;
  /** Additive blending mode. */
  static readonly BLEND_MODE_ADD: int;
  /** Subtractive blending mode. */
  static readonly BLEND_MODE_SUB: int;
  /** Multiplicative blending mode. */
  static readonly BLEND_MODE_MUL: int;
  /** Mix blending mode. Colors are assumed to be premultiplied by the alpha (opacity) value. */
  static readonly BLEND_MODE_PREMULT_ALPHA: int;
  // enum LightMode
  /** Render the material using both light and non-light sensitive material properties. */
  static readonly LIGHT_MODE_NORMAL: int;
  /** Render the material as if there were no light. */
  static readonly LIGHT_MODE_UNSHADED: int;
  /** Render the material as if there were only light. */
  static readonly LIGHT_MODE_LIGHT_ONLY: int;
}
