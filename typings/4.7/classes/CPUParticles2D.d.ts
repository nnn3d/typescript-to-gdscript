// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A CPU-based 2D particle emitter. */
declare class CPUParticles2D<Tree extends object = any> extends Node2D<Tree> {
  /** Number of particles emitted in one emission cycle. */
  amount: int;
  /** Each particle's rotation will be animated along this {@link Curve}. Should be a unit {@link Curve}. */
  angle_curve: Curve;
  /** Maximum initial rotation applied to each particle, in degrees. */
  angle_max: float;
  /** Minimum equivalent of {@link angle_max}. */
  angle_min: float;
  /**
   * Each particle's angular velocity will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  angular_velocity_curve: Curve;
  /** Maximum initial angular velocity (rotation speed) applied to each particle in *degrees* per second. */
  angular_velocity_max: float;
  /** Minimum equivalent of {@link angular_velocity_max}. */
  angular_velocity_min: float;
  /**
   * Each particle's animation offset will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  anim_offset_curve: Curve;
  /**
   * Maximum animation offset that corresponds to frame index in the texture. `0` is the first frame, `1` is the last one. See {@link CanvasItemMaterial.particles_animation}.
   */
  anim_offset_max: float;
  /** Minimum equivalent of {@link anim_offset_max}. */
  anim_offset_min: float;
  /** Each particle's animation speed will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  anim_speed_curve: Curve;
  /**
   * Maximum particle animation speed. Animation speed of `1` means that the particles will make full `0` to `1` offset cycle during lifetime, `2` means `2` cycles etc.
   * With animation speed greater than `1`, remember to enable {@link CanvasItemMaterial.particles_anim_loop} property if you want the animation to repeat.
   */
  anim_speed_max: float;
  /** Minimum equivalent of {@link anim_speed_max}. */
  anim_speed_min: float;
  /** Each particle's initial color. If {@link texture} is defined, it will be multiplied by this color. */
  color: Color;
  /**
   * Each particle's initial color will vary along this {@link Gradient} (multiplied with {@link color}).
   */
  color_initial_ramp: Gradient;
  /**
   * Each particle's color will vary along this {@link Gradient} over its lifetime (multiplied with {@link color}).
   */
  color_ramp: Gradient;
  /** Damping will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  damping_curve: Curve;
  /**
   * The maximum rate at which particles lose velocity. For example value of `100` means that the particle will go from `100` velocity to `0` in `1` second.
   */
  damping_max: float;
  /** Minimum equivalent of {@link damping_max}. */
  damping_min: float;
  /** Unit vector specifying the particles' emission direction. */
  direction: Vector2;
  /** Particle draw order. */
  draw_order: int;
  /**
   * Sets the {@link Color}s to modulate particles by when using {@link EMISSION_SHAPE_POINTS} or {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_colors: PackedColorArray;
  /**
   * Sets the direction the particles will be emitted in when using {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_normals: PackedVector2Array;
  /**
   * Sets the initial positions to spawn particles when using {@link EMISSION_SHAPE_POINTS} or {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_points: PackedVector2Array;
  /** The rectangle's extents if {@link emission_shape} is set to {@link EMISSION_SHAPE_RECTANGLE}. */
  emission_rect_extents: Vector2;
  /** The ring's inner radius if {@link emission_shape} is set to {@link EMISSION_SHAPE_RING}. */
  emission_ring_inner_radius: float;
  /** The ring's outer radius if {@link emission_shape} is set to {@link EMISSION_SHAPE_RING}. */
  emission_ring_radius: float;
  /** Particles will be emitted inside this region. */
  emission_shape: int;
  /** The sphere's radius if {@link emission_shape} is set to {@link EMISSION_SHAPE_SPHERE}. */
  emission_sphere_radius: float;
  /**
   * If `true`, particles are being emitted. {@link emitting} can be used to start and stop particles from emitting. However, if {@link one_shot} is `true` setting {@link emitting} to `true` will not restart the emission cycle until after all active particles finish processing. You can use the {@link finished} signal to be notified once all active particles finish processing.
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
  /** Gravity applied to every particle. */
  gravity: Vector2;
  /** Each particle's hue will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  hue_variation_curve: Curve;
  /** Maximum initial hue variation applied to each particle. It will shift the particle color's hue. */
  hue_variation_max: float;
  /** Minimum equivalent of {@link hue_variation_max}. */
  hue_variation_min: float;
  /**
   * Maximum initial velocity magnitude for each particle. Direction comes from {@link direction} and {@link spread}.
   */
  initial_velocity_max: float;
  /** Minimum equivalent of {@link initial_velocity_max}. */
  initial_velocity_min: float;
  /** Amount of time each particle will exist. */
  lifetime: float;
  /** Particle lifetime randomness ratio. */
  lifetime_randomness: float;
  /**
   * Each particle's linear acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  linear_accel_curve: Curve;
  /** Maximum linear acceleration applied to each particle in the direction of motion. */
  linear_accel_max: float;
  /** Minimum equivalent of {@link linear_accel_max}. */
  linear_accel_min: float;
  /**
   * If `true`, particles use the parent node's coordinate space (known as local coordinates). This will cause particles to move and rotate along the {@link CPUParticles2D} node (and its parents) when it is moved or rotated. If `false`, particles use global coordinates; they will not move or rotate along the {@link CPUParticles2D} node (and its parents) when it is moved or rotated.
   */
  local_coords: boolean;
  /**
   * If `true`, only one emission cycle occurs. If set `true` during a cycle, emission will stop at the cycle's end.
   */
  one_shot: boolean;
  /**
   * Each particle's orbital velocity will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  orbit_velocity_curve: Curve;
  /**
   * Maximum orbital velocity applied to each particle. Makes the particles circle around origin. Specified in number of full rotations around origin per second.
   */
  orbit_velocity_max: float;
  /** Minimum equivalent of {@link orbit_velocity_max}. */
  orbit_velocity_min: float;
  /** Align Y axis of particle with the direction of its velocity. */
  particle_flag_align_y: boolean;
  /**
   * <member name="preprocess" type="float" setter="set_pre_process_time" getter="get_pre_process_time" default="0.0">
   * Particle system starts as if it had already run for this many seconds.
   */
  physics_interpolation_mode: int;
  /**
   * Each particle's radial acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  radial_accel_curve: Curve;
  /**
   * Maximum radial acceleration applied to each particle. Makes particle accelerate away from the origin or towards it if negative.
   */
  radial_accel_max: float;
  /** Minimum equivalent of {@link radial_accel_max}. */
  radial_accel_min: float;
  /** Emission lifetime randomness ratio. */
  randomness: float;
  /** Each particle's scale will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  scale_amount_curve: Curve;
  /** Maximum initial scale applied to each particle. */
  scale_amount_max: float;
  /** Minimum equivalent of {@link scale_amount_max}. */
  scale_amount_min: float;
  /**
   * Each particle's horizontal scale will vary along this {@link Curve}. Should be a unit {@link Curve}.
   * {@link split_scale} must be enabled.
   */
  scale_curve_x: Curve;
  /**
   * Each particle's vertical scale will vary along this {@link Curve}. Should be a unit {@link Curve}.
   * {@link split_scale} must be enabled.
   */
  scale_curve_y: Curve;
  /**
   * Sets the random seed used by the particle system. Only effective if {@link use_fixed_seed} is `true`.
   */
  seed: int;
  /** Particle system's running speed scaling ratio. A value of `0` can be used to pause the particles. */
  speed_scale: float;
  /**
   * If `true`, the scale curve will be split into x and y components. See {@link scale_curve_x} and {@link scale_curve_y}.
   */
  split_scale: boolean;
  /** Each particle's initial direction range from `+spread` to `-spread` degrees. */
  spread: float;
  /**
   * Each particle's tangential acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  tangential_accel_curve: Curve;
  /**
   * Maximum tangential acceleration applied to each particle. Tangential acceleration is perpendicular to the particle's velocity giving the particles a swirling motion.
   */
  tangential_accel_max: float;
  /** Minimum equivalent of {@link tangential_accel_max}. */
  tangential_accel_min: float;
  /** Particle texture. If `null`, particles will be squares. */
  texture: Texture2D;
  /**
   * If `true`, particles will use the same seed for every simulation using the seed defined in {@link seed}. This is useful for situations where the visual outcome should be consistent across replays, for example when using Movie Maker mode.
   */
  use_fixed_seed: boolean;
  set_amount(value: int): void;
  get_amount(): int;
  set_color(value: Color): void;
  get_color(): Color;
  set_color_initial_ramp(value: Gradient): void;
  get_color_initial_ramp(): Gradient;
  set_color_ramp(value: Gradient): void;
  get_color_ramp(): Gradient;
  set_direction(value: Vector2): void;
  get_direction(): Vector2;
  set_draw_order(value: int): void;
  get_draw_order(): int;
  set_emission_colors(value: PackedColorArray): void;
  get_emission_colors(): PackedColorArray;
  set_emission_normals(value: PackedVector2Array): void;
  get_emission_normals(): PackedVector2Array;
  set_emission_points(value: PackedVector2Array): void;
  get_emission_points(): PackedVector2Array;
  set_emission_rect_extents(value: Vector2): void;
  get_emission_rect_extents(): Vector2;
  set_emission_ring_inner_radius(value: float): void;
  get_emission_ring_inner_radius(): float;
  set_emission_ring_radius(value: float): void;
  get_emission_ring_radius(): float;
  set_emission_shape(value: int): void;
  get_emission_shape(): int;
  set_emission_sphere_radius(value: float): void;
  get_emission_sphere_radius(): float;
  set_emitting(value: boolean): void;
  is_emitting(): boolean;
  set_explosiveness_ratio(value: float): void;
  get_explosiveness_ratio(): float;
  set_fixed_fps(value: int): void;
  get_fixed_fps(): int;
  set_fractional_delta(value: boolean): void;
  get_fractional_delta(): boolean;
  set_gravity(value: Vector2): void;
  get_gravity(): Vector2;
  set_lifetime(value: float): void;
  get_lifetime(): float;
  set_lifetime_randomness(value: float): void;
  get_lifetime_randomness(): float;
  set_use_local_coordinates(value: boolean): void;
  get_use_local_coordinates(): boolean;
  set_one_shot(value: boolean): void;
  get_one_shot(): boolean;
  set_randomness_ratio(value: float): void;
  get_randomness_ratio(): float;
  set_scale_curve_x(value: Curve): void;
  get_scale_curve_x(): Curve;
  set_scale_curve_y(value: Curve): void;
  get_scale_curve_y(): Curve;
  set_seed(value: int): void;
  get_seed(): int;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;
  set_split_scale(value: boolean): void;
  get_split_scale(): boolean;
  set_spread(value: float): void;
  get_spread(): float;
  set_texture(value: Texture2D): void;
  get_texture(): Texture2D;
  set_use_fixed_seed(value: boolean): void;
  get_use_fixed_seed(): boolean;

  /**
   * Sets this node's properties to match a given {@link GPUParticles2D} node with an assigned {@link ParticleProcessMaterial}.
   */
  convert_from_particles(particles: Node): void;
  /** Returns the {@link Curve} of the parameter specified by {@link Parameter}. */
  get_param_curve(param: int): Curve;
  /** Returns the maximum value range for the given parameter. */
  get_param_max(param: int): float;
  /** Returns the minimum value range for the given parameter. */
  get_param_min(param: int): float;
  /** Returns the enabled state of the given particle flag. */
  get_particle_flag(particle_flag: int): boolean;
  /**
   * Requests the particles to process for extra process time during a single frame.
   * Useful for particle playback, if used in combination with {@link use_fixed_seed} or by calling {@link restart} with parameter `keep_seed` set to `true`.
   */
  request_particles_process(process_time: float): void;
  /**
   * Restarts the particle emitter.
   * If `keep_seed` is `true`, the current random seed will be preserved. Useful for seeking and playback.
   */
  restart(keep_seed?: boolean): void;
  /**
   * Sets the {@link Curve} of the parameter specified by {@link Parameter}. Should be a unit {@link Curve}.
   */
  set_param_curve(param: int, curve: Curve): void;
  /** Sets the maximum value for the given parameter. */
  set_param_max(param: int, value: float): void;
  /** Sets the minimum value for the given parameter. */
  set_param_min(param: int, value: float): void;
  /** Enables or disables the given particle flag. */
  set_particle_flag(particle_flag: int, enable: boolean): void;

  /**
   * Emitted when all active particles have finished processing. When {@link one_shot} is disabled, particles will process continuously, so this is never emitted.
   */
  finished: Signal<[]>;

  // enum DrawOrder
  /** Particles are drawn in the order emitted. */
  static readonly DRAW_ORDER_INDEX: int;
  /**
   * Particles are drawn in order of remaining lifetime. In other words, the particle with the highest lifetime is drawn at the front.
   */
  static readonly DRAW_ORDER_LIFETIME: int;
  // enum Parameter
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set initial velocity properties.
   */
  static readonly PARAM_INITIAL_LINEAR_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set angular velocity properties.
   */
  static readonly PARAM_ANGULAR_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set orbital velocity properties.
   */
  static readonly PARAM_ORBIT_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set linear acceleration properties.
   */
  static readonly PARAM_LINEAR_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set radial acceleration properties.
   */
  static readonly PARAM_RADIAL_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set tangential acceleration properties.
   */
  static readonly PARAM_TANGENTIAL_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set damping properties.
   */
  static readonly PARAM_DAMPING: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set angle properties.
   */
  static readonly PARAM_ANGLE: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set scale properties.
   */
  static readonly PARAM_SCALE: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set hue variation properties.
   */
  static readonly PARAM_HUE_VARIATION: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set animation speed properties.
   */
  static readonly PARAM_ANIM_SPEED: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_curve} to set animation offset properties.
   */
  static readonly PARAM_ANIM_OFFSET: int;
  /** Represents the size of the {@link Parameter} enum. */
  static readonly PARAM_MAX: int;
  // enum ParticleFlags
  /** Use with {@link set_particle_flag} to set {@link particle_flag_align_y}. */
  static readonly PARTICLE_FLAG_ALIGN_Y_TO_VELOCITY: int;
  /** Present for consistency with 3D particle nodes, not used in 2D. */
  static readonly PARTICLE_FLAG_ROTATE_Y: int;
  /** Present for consistency with 3D particle nodes, not used in 2D. */
  static readonly PARTICLE_FLAG_DISABLE_Z: int;
  /** Represents the size of the {@link ParticleFlags} enum. */
  static readonly PARTICLE_FLAG_MAX: int;
  // enum EmissionShape
  /** All particles will be emitted from a single point. */
  static readonly EMISSION_SHAPE_POINT: int;
  /** Particles will be emitted in the volume of a sphere flattened to two dimensions. */
  static readonly EMISSION_SHAPE_SPHERE: int;
  /** Particles will be emitted on the surface of a sphere flattened to two dimensions. */
  static readonly EMISSION_SHAPE_SPHERE_SURFACE: int;
  /** Particles will be emitted in the area of a rectangle. */
  static readonly EMISSION_SHAPE_RECTANGLE: int;
  /**
   * Particles will be emitted at a position chosen randomly among {@link emission_points}. Particle color will be modulated by {@link emission_colors}.
   */
  static readonly EMISSION_SHAPE_POINTS: int;
  /**
   * Particles will be emitted at a position chosen randomly among {@link emission_points}. Particle velocity and rotation will be set based on {@link emission_normals}. Particle color will be modulated by {@link emission_colors}.
   */
  static readonly EMISSION_SHAPE_DIRECTED_POINTS: int;
  /** Particles will be emitted in the area of a ring parameterized by its outer and inner radius. */
  static readonly EMISSION_SHAPE_RING: int;
  /** Represents the size of the {@link EmissionShape} enum. */
  static readonly EMISSION_SHAPE_MAX: int;
}
