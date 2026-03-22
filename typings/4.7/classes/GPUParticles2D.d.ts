// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D particle emitter. */
declare class GPUParticles2D extends Node2D {
  /**
   * The number of particles to emit in one emission cycle. The effective emission rate is `(amount * amount_ratio) / lifetime` particles per second. Higher values will increase GPU requirements, even if not all particles are visible at a given time or if {@link amount_ratio} is decreased.
   * **Note:** Changing this value will cause the particle system to restart. To avoid this, change {@link amount_ratio} instead.
   */
  amount: int;
  /**
   * The ratio of particles that should actually be emitted. If set to a value lower than `1.0`, this will set the amount of emitted particles throughout the lifetime to `amount * amount_ratio`. Unlike changing {@link amount}, changing {@link amount_ratio} while emitting does not affect already-emitted particles and doesn't cause the particle system to restart. {@link amount_ratio} can be used to create effects that make the number of emitted particles vary over time.
   * **Note:** Reducing the {@link amount_ratio} has no performance benefit, since resources need to be allocated and processed for the total {@link amount} of particles regardless of the {@link amount_ratio}. If you don't intend to change the number of particles emitted while the particles are emitting, make sure {@link amount_ratio} is set to `1` and change {@link amount} to your liking instead.
   */
  amount_ratio: float;
  /**
   * Multiplier for particle's collision radius. `1.0` corresponds to the size of the sprite. If particles appear to sink into the ground when colliding, increase this value. If particles appear to float when colliding, decrease this value. Only effective if {@link ParticleProcessMaterial.collision_mode} is {@link ParticleProcessMaterial.COLLISION_RIGID} or {@link ParticleProcessMaterial.COLLISION_HIDE_ON_CONTACT}.
   * **Note:** Particles always have a spherical collision shape.
   */
  collision_base_size: float;
  /** Particle draw order. */
  draw_order: int;
  /**
   * If `true`, particles are being emitted. {@link emitting} can be used to start and stop particles from emitting. However, if {@link one_shot} is `true` setting {@link emitting} to `true` will not restart the emission cycle unless all active particles have finished processing. Use the {@link finished} signal to be notified once all active particles finish processing.
   * **Note:** For {@link one_shot} emitters, due to the particles being computed on the GPU, there may be a short period after receiving the {@link finished} signal during which setting this to `true` will not restart the emission cycle.
   * **Tip:** If your {@link one_shot} emitter needs to immediately restart emitting particles once {@link finished} signal is received, consider calling {@link restart} instead of setting {@link emitting}.
   */
  emitting: boolean;
  /**
   * How rapidly particles in an emission cycle are emitted. If greater than `0`, there will be a gap in emissions before the next cycle begins.
   */
  explosiveness: float;
  /**
   * The particle system's frame rate is fixed to a value. For example, changing the value to 2 will make the particles render at 2 frames per second. Note this does not slow down the simulation of the particle system itself.
   */
  fixed_fps: int;
  /** If `true`, results in fractional delta calculation which has a smoother particles display effect. */
  fract_delta: boolean;
  /**
   * Causes all the particles in this node to interpolate towards the end of their lifetime.
   * **Note:** This only works when used with a {@link ParticleProcessMaterial}. It needs to be manually implemented for custom process shaders.
   */
  interp_to_end: float;
  /**
   * Enables particle interpolation, which makes the particle movement smoother when their {@link fixed_fps} is lower than the screen refresh rate.
   */
  interpolate: boolean;
  /**
   * The amount of time each particle will exist (in seconds). The effective emission rate is `(amount * amount_ratio) / lifetime` particles per second.
   */
  lifetime: float;
  /**
   * If `true`, particles use the parent node's coordinate space (known as local coordinates). This will cause particles to move and rotate along the {@link GPUParticles2D} node (and its parents) when it is moved or rotated. If `false`, particles use global coordinates; they will not move or rotate along the {@link GPUParticles2D} node (and its parents) when it is moved or rotated.
   */
  local_coords: boolean;
  /**
   * If `true`, only one emission cycle occurs. If set `true` during a cycle, emission will stop at the cycle's end.
   */
  one_shot: boolean;
  /**
   * Particle system starts as if it had already run for this many seconds.
   * **Note:** This can be very expensive if set to a high number as it requires running the particle shader a number of times equal to the {@link fixed_fps} (or 30, if {@link fixed_fps} is 0) for every second. In extreme cases it can even lead to a GPU crash due to the volume of work done in a single frame.
   */
  preprocess: float;
  /**
   * {@link Material} for processing particles. Can be a {@link ParticleProcessMaterial} or a {@link ShaderMaterial}.
   */
  process_material: Material;
  /** Emission lifetime randomness ratio. */
  randomness: float;
  /**
   * Sets the random seed used by the particle system. Only effective if {@link use_fixed_seed} is `true`.
   */
  seed: int;
  /** Particle system's running speed scaling ratio. A value of `0` can be used to pause the particles. */
  speed_scale: float;
  /**
   * Path to another {@link GPUParticles2D} node that will be used as a subemitter (see {@link ParticleProcessMaterial.sub_emitter_mode}). Subemitters can be used to achieve effects such as fireworks, sparks on collision, bubbles popping into water drops, and more.
   * **Note:** When {@link sub_emitter} is set, the target {@link GPUParticles2D} node will no longer emit particles on its own.
   */
  sub_emitter: string;
  /**
   * Particle texture. If `null`, particles will be squares with a size of 1×1 pixels.
   * **Note:** To use a flipbook texture, assign a new {@link CanvasItemMaterial} to the {@link GPUParticles2D}'s {@link CanvasItem.material} property, then enable {@link CanvasItemMaterial.particles_animation} and set {@link CanvasItemMaterial.particles_anim_h_frames}, {@link CanvasItemMaterial.particles_anim_v_frames}, and {@link CanvasItemMaterial.particles_anim_loop} to match the flipbook texture.
   */
  texture: Texture2D;
  /**
   * If `true`, enables particle trails using a mesh skinning system.
   * **Note:** Unlike {@link GPUParticles3D}, the number of trail sections and subdivisions is set with the {@link trail_sections} and {@link trail_section_subdivisions} properties.
   */
  trail_enabled: boolean;
  /**
   * The amount of time the particle's trail should represent (in seconds). Only effective if {@link trail_enabled} is `true`.
   */
  trail_lifetime: float;
  /**
   * The number of subdivisions to use for the particle trail rendering. Higher values can result in smoother trail curves, at the cost of performance due to increased mesh complexity. See also {@link trail_sections}. Only effective if {@link trail_enabled} is `true`.
   */
  trail_section_subdivisions: int;
  /**
   * The number of sections to use for the particle trail rendering. Higher values can result in smoother trail curves, at the cost of performance due to increased mesh complexity. See also {@link trail_section_subdivisions}. Only effective if {@link trail_enabled} is `true`.
   */
  trail_sections: int;
  /**
   * If `true`, particles will use the same seed for every simulation using the seed defined in {@link seed}. This is useful for situations where the visual outcome should be consistent across replays, for example when using Movie Maker mode.
   */
  use_fixed_seed: boolean;
  /**
   * The {@link Rect2} that determines the node's region which needs to be visible on screen for the particle system to be active.
   * Grow the rect if particles suddenly appear/disappear when the node enters/exits the screen. The {@link Rect2} can be grown via code or with the **Particles → Generate Visibility Rect** editor tool.
   */
  visibility_rect: Rect2;
  set_amount(value: int): void;
  get_amount(): int;
  set_amount_ratio(value: float): void;
  get_amount_ratio(): float;
  set_collision_base_size(value: float): void;
  get_collision_base_size(): float;
  set_draw_order(value: int): void;
  get_draw_order(): int;
  set_emitting(value: boolean): void;
  is_emitting(): boolean;
  set_explosiveness_ratio(value: float): void;
  get_explosiveness_ratio(): float;
  set_fixed_fps(value: int): void;
  get_fixed_fps(): int;
  set_fractional_delta(value: boolean): void;
  get_fractional_delta(): boolean;
  set_interp_to_end(value: float): void;
  get_interp_to_end(): float;
  set_interpolate(value: boolean): void;
  get_interpolate(): boolean;
  set_lifetime(value: float): void;
  get_lifetime(): float;
  set_use_local_coordinates(value: boolean): void;
  get_use_local_coordinates(): boolean;
  set_one_shot(value: boolean): void;
  get_one_shot(): boolean;
  set_pre_process_time(value: float): void;
  get_pre_process_time(): float;
  set_process_material(value: Material): void;
  get_process_material(): Material;
  set_randomness_ratio(value: float): void;
  get_randomness_ratio(): float;
  set_seed(value: int): void;
  get_seed(): int;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;
  set_sub_emitter(value: string): void;
  get_sub_emitter(): string;
  set_texture(value: Texture2D): void;
  get_texture(): Texture2D;
  set_trail_enabled(value: boolean): void;
  is_trail_enabled(): boolean;
  set_trail_lifetime(value: float): void;
  get_trail_lifetime(): float;
  set_trail_section_subdivisions(value: int): void;
  get_trail_section_subdivisions(): int;
  set_trail_sections(value: int): void;
  get_trail_sections(): int;
  set_use_fixed_seed(value: boolean): void;
  get_use_fixed_seed(): boolean;
  set_visibility_rect(value: Rect2): void;
  get_visibility_rect(): Rect2;

  /**
   * Returns a rectangle containing the positions of all existing particles.
   * **Note:** When using threaded rendering this method synchronizes the rendering thread. Calling it often may have a negative impact on performance.
   */
  capture_rect(): Rect2;
  /** Sets this node's properties to match a given {@link CPUParticles2D} node. */
  convert_from_particles(particles: Node): void;
  /**
   * Emits a single particle. Whether `xform`, `velocity`, `color` and `custom` are applied depends on the value of `flags`. See {@link EmitFlags}.
   * The default ParticleProcessMaterial will overwrite `color` and use the contents of `custom` as `(rotation, age, animation, lifetime)`.
   * **Note:** {@link emit_particle} is only supported on the Forward+ and Mobile rendering methods, not Compatibility.
   */
  emit_particle(xform: Transform2D, velocity: Vector2, color: Color, custom: Color, flags: int): void;
  /**
   * Requests the particles to process for extra process time during a single frame.
   * Useful for particle playback, if used in combination with {@link use_fixed_seed} or by calling {@link restart} with parameter `keep_seed` set to `true`.
   */
  request_particles_process(process_time: float): void;
  /**
   * Restarts the particle emission cycle, clearing existing particles. To avoid particles vanishing from the viewport, wait for the {@link finished} signal before calling.
   * **Note:** The {@link finished} signal is only emitted by {@link one_shot} emitters.
   * If `keep_seed` is `true`, the current random seed will be preserved. Useful for seeking and playback.
   */
  restart(keep_seed?: boolean): void;

  /**
   * Emitted when all active particles have finished processing. To immediately restart the emission cycle, call {@link restart}.
   * This signal is never emitted when {@link one_shot} is disabled, as particles will be emitted and processed continuously.
   * **Note:** For {@link one_shot} emitters, due to the particles being computed on the GPU, there may be a short period after receiving the signal during which setting {@link emitting} to `true` will not restart the emission cycle. This delay is avoided by instead calling {@link restart}.
   */
  finished: Signal<[]>;

  // enum DrawOrder
  /** Particles are drawn in the order emitted. */
  static readonly DRAW_ORDER_INDEX: int;
  /**
   * Particles are drawn in order of remaining lifetime. In other words, the particle with the highest lifetime is drawn at the front.
   */
  static readonly DRAW_ORDER_LIFETIME: int;
  /**
   * Particles are drawn in reverse order of remaining lifetime. In other words, the particle with the lowest lifetime is drawn at the front.
   */
  static readonly DRAW_ORDER_REVERSE_LIFETIME: int;
  // enum EmitFlags
  /** Particle starts at the specified position. */
  static readonly EMIT_FLAG_POSITION: int;
  /** Particle starts with specified rotation and scale. */
  static readonly EMIT_FLAG_ROTATION_SCALE: int;
  /** Particle starts with the specified velocity vector, which defines the emission direction and speed. */
  static readonly EMIT_FLAG_VELOCITY: int;
  /** Particle starts with specified color. */
  static readonly EMIT_FLAG_COLOR: int;
  /** Particle starts with specified `CUSTOM` data. */
  static readonly EMIT_FLAG_CUSTOM: int;
}
