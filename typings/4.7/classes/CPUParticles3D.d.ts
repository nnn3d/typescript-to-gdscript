// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A CPU-based 3D particle emitter. */
declare class CPUParticles3D<Tree extends object = any> extends GeometryInstance3D<Tree> {
  /** Number of particles emitted in one emission cycle. */
  amount: int;
  /** Each particle's rotation will be animated along this {@link Curve}. Should be a unit {@link Curve}. */
  angle_curve: Curve;
  /** Maximum angle. */
  angle_max: float;
  /** Minimum angle. */
  angle_min: float;
  /**
   * Each particle's angular velocity (rotation speed) will vary along this {@link Curve} over its lifetime. Should be a unit {@link Curve}.
   */
  angular_velocity_curve: Curve;
  /** Maximum initial angular velocity (rotation speed) applied to each particle in *degrees* per second. */
  angular_velocity_max: float;
  /** Minimum initial angular velocity (rotation speed) applied to each particle in *degrees* per second. */
  angular_velocity_min: float;
  /**
   * Each particle's animation offset will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  anim_offset_curve: Curve;
  /** Maximum animation offset. */
  anim_offset_max: float;
  /** Minimum animation offset. */
  anim_offset_min: float;
  /** Each particle's animation speed will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  anim_speed_curve: Curve;
  /** Maximum particle animation speed. */
  anim_speed_max: float;
  /** Minimum particle animation speed. */
  anim_speed_min: float;
  /**
   * Each particle's initial color.
   * **Note:** {@link color} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color} will have no visible effect.
   */
  color: Color;
  /**
   * Each particle's initial color will vary along this {@link Gradient} (multiplied with {@link color}).
   * **Note:** {@link color_initial_ramp} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color_initial_ramp} will have no visible effect.
   */
  color_initial_ramp: Gradient;
  /**
   * Each particle's color will vary along this {@link Gradient} over its lifetime (multiplied with {@link color}).
   * **Note:** {@link color_ramp} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color_ramp} will have no visible effect.
   */
  color_ramp: Gradient;
  /** Damping will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  damping_curve: Curve;
  /** Maximum damping. */
  damping_max: float;
  /** Minimum damping. */
  damping_min: float;
  /** Unit vector specifying the particles' emission direction. */
  direction: Vector3;
  /** Particle draw order. */
  draw_order: int;
  /** The rectangle's extents if {@link emission_shape} is set to {@link EMISSION_SHAPE_BOX}. */
  emission_box_extents: Vector3;
  /**
   * Sets the {@link Color}s to modulate particles by when using {@link EMISSION_SHAPE_POINTS} or {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   * **Note:** {@link emission_colors} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link emission_colors} will have no visible effect.
   */
  emission_colors: PackedColorArray;
  /**
   * Sets the direction the particles will be emitted in when using {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_normals: PackedVector3Array;
  /**
   * Sets the initial positions to spawn particles when using {@link EMISSION_SHAPE_POINTS} or {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_points: PackedVector3Array;
  /** The axis of the ring when using the emitter {@link EMISSION_SHAPE_RING}. */
  emission_ring_axis: Vector3;
  /**
   * The angle of the cone when using the emitter {@link EMISSION_SHAPE_RING}. The default angle of 90 degrees results in a ring, while an angle of 0 degrees results in a cone. Intermediate values will result in a ring where one end is larger than the other.
   * **Note:** Depending on {@link emission_ring_height}, the angle may be clamped if the ring's end is reached to form a perfect cone.
   */
  emission_ring_cone_angle: float;
  /** The height of the ring when using the emitter {@link EMISSION_SHAPE_RING}. */
  emission_ring_height: float;
  /** The inner radius of the ring when using the emitter {@link EMISSION_SHAPE_RING}. */
  emission_ring_inner_radius: float;
  /** The radius of the ring when using the emitter {@link EMISSION_SHAPE_RING}. */
  emission_ring_radius: float;
  /** Particles will be emitted inside this region. */
  emission_shape: int;
  /** The sphere's radius if {@link EmissionShape} is set to {@link EMISSION_SHAPE_SPHERE}. */
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
   * The particle system's frame rate is fixed to a value. For example, changing the value to 2 will make the particles render at 2 frames per second. Note this does not slow down the particle system itself.
   */
  fixed_fps: int;
  /** Amount of {@link spread} in Y/Z plane. A value of `1` restricts particles to X/Z plane. */
  flatness: float;
  /** If `true`, results in fractional delta calculation which has a smoother particles display effect. */
  fract_delta: boolean;
  /** Gravity applied to every particle. */
  gravity: Vector3;
  /** Each particle's hue will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  hue_variation_curve: Curve;
  /** Maximum hue variation. */
  hue_variation_max: float;
  /** Minimum hue variation. */
  hue_variation_min: float;
  /** Maximum value of the initial velocity. */
  initial_velocity_max: float;
  /** Minimum value of the initial velocity. */
  initial_velocity_min: float;
  /** Amount of time each particle will exist. */
  lifetime: float;
  /** Particle lifetime randomness ratio. */
  lifetime_randomness: float;
  /**
   * Each particle's linear acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  linear_accel_curve: Curve;
  /** Maximum linear acceleration. */
  linear_accel_max: float;
  /** Minimum linear acceleration. */
  linear_accel_min: float;
  /**
   * If `true`, particles use the parent node's coordinate space (known as local coordinates). This will cause particles to move and rotate along the {@link CPUParticles3D} node (and its parents) when it is moved or rotated. If `false`, particles use global coordinates; they will not move or rotate along the {@link CPUParticles3D} node (and its parents) when it is moved or rotated.
   */
  local_coords: boolean;
  /** The {@link Mesh} used for each particle. If `null`, particles will be spheres. */
  mesh: Mesh;
  /**
   * If `true`, only one emission cycle occurs. If set `true` during a cycle, emission will stop at the cycle's end.
   */
  one_shot: boolean;
  /**
   * Each particle's orbital velocity will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  orbit_velocity_curve: Curve;
  /** Maximum orbit velocity. */
  orbit_velocity_max: float;
  /** Minimum orbit velocity. */
  orbit_velocity_min: float;
  /** Align Y axis of particle with the direction of its velocity. */
  particle_flag_align_y: boolean;
  /** If `true`, particles will not move on the Z axis. */
  particle_flag_disable_z: boolean;
  /** If `true`, particles rotate around Y axis by {@link angle_min}. */
  particle_flag_rotate_y: boolean;
  /** Particle system starts as if it had already run for this many seconds. */
  preprocess: float;
  /**
   * Each particle's radial acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  radial_accel_curve: Curve;
  /** Maximum radial acceleration. */
  radial_accel_max: float;
  /** Minimum radial acceleration. */
  radial_accel_min: float;
  /** Emission lifetime randomness ratio. */
  randomness: float;
  /** Each particle's scale will vary along this {@link Curve}. Should be a unit {@link Curve}. */
  scale_amount_curve: Curve;
  /** Maximum scale. */
  scale_amount_max: float;
  /** Minimum scale. */
  scale_amount_min: float;
  /** Curve for the scale over life, along the x axis. */
  scale_curve_x: Curve;
  /** Curve for the scale over life, along the y axis. */
  scale_curve_y: Curve;
  /** Curve for the scale over life, along the z axis. */
  scale_curve_z: Curve;
  /**
   * Sets the random seed used by the particle system. Only effective if {@link use_fixed_seed} is `true`.
   */
  seed: int;
  /** Particle system's running speed scaling ratio. A value of `0` can be used to pause the particles. */
  speed_scale: float;
  /** If set to `true`, three different scale curves can be specified, one per scale axis. */
  split_scale: boolean;
  /**
   * Each particle's initial direction range from `+spread` to `-spread` degrees. Applied to X/Z plane and Y/Z planes.
   */
  spread: float;
  /**
   * Each particle's tangential acceleration will vary along this {@link Curve}. Should be a unit {@link Curve}.
   */
  tangential_accel_curve: Curve;
  /** Maximum tangent acceleration. */
  tangential_accel_max: float;
  /** Minimum tangent acceleration. */
  tangential_accel_min: float;
  /**
   * If `true`, particles will use the same seed for every simulation using the seed defined in {@link seed}. This is useful for situations where the visual outcome should be consistent across replays, for example when using Movie Maker mode.
   */
  use_fixed_seed: boolean;
  /**
   * The {@link AABB} that determines the node's region which needs to be visible on screen for the particle system to be active.
   * Grow the box if particles suddenly appear/disappear when the node enters/exits the screen. The {@link AABB} can be grown via code or with the **Particles → Generate AABB** editor tool.
   */
  visibility_aabb: AABB;
  set_amount(value: int): void;
  get_amount(): int;
  set_color(value: Color): void;
  get_color(): Color;
  set_color_initial_ramp(value: Gradient): void;
  get_color_initial_ramp(): Gradient;
  set_color_ramp(value: Gradient): void;
  get_color_ramp(): Gradient;
  set_direction(value: Vector3): void;
  get_direction(): Vector3;
  set_draw_order(value: int): void;
  get_draw_order(): int;
  set_emission_box_extents(value: Vector3): void;
  get_emission_box_extents(): Vector3;
  set_emission_colors(value: PackedColorArray): void;
  get_emission_colors(): PackedColorArray;
  set_emission_normals(value: PackedVector3Array): void;
  get_emission_normals(): PackedVector3Array;
  set_emission_points(value: PackedVector3Array): void;
  get_emission_points(): PackedVector3Array;
  set_emission_ring_axis(value: Vector3): void;
  get_emission_ring_axis(): Vector3;
  set_emission_ring_cone_angle(value: float): void;
  get_emission_ring_cone_angle(): float;
  set_emission_ring_height(value: float): void;
  get_emission_ring_height(): float;
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
  set_flatness(value: float): void;
  get_flatness(): float;
  set_fractional_delta(value: boolean): void;
  get_fractional_delta(): boolean;
  set_gravity(value: Vector3): void;
  get_gravity(): Vector3;
  set_lifetime(value: float): void;
  get_lifetime(): float;
  set_lifetime_randomness(value: float): void;
  get_lifetime_randomness(): float;
  set_use_local_coordinates(value: boolean): void;
  get_use_local_coordinates(): boolean;
  set_mesh(value: Mesh): void;
  get_mesh(): Mesh;
  set_one_shot(value: boolean): void;
  get_one_shot(): boolean;
  set_pre_process_time(value: float): void;
  get_pre_process_time(): float;
  set_randomness_ratio(value: float): void;
  get_randomness_ratio(): float;
  set_scale_curve_x(value: Curve): void;
  get_scale_curve_x(): Curve;
  set_scale_curve_y(value: Curve): void;
  get_scale_curve_y(): Curve;
  set_scale_curve_z(value: Curve): void;
  get_scale_curve_z(): Curve;
  set_seed(value: int): void;
  get_seed(): int;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;
  set_split_scale(value: boolean): void;
  get_split_scale(): boolean;
  set_spread(value: float): void;
  get_spread(): float;
  set_use_fixed_seed(value: boolean): void;
  get_use_fixed_seed(): boolean;
  set_visibility_aabb(value: AABB): void;
  get_visibility_aabb(): AABB;

  /**
   * Returns the axis-aligned bounding box that contains all the particles that are active in the current frame.
   */
  capture_aabb(): AABB;
  /**
   * Sets this node's properties to match a given {@link GPUParticles3D} node with an assigned {@link ParticleProcessMaterial}.
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
  /** Particles are drawn in order of depth. */
  static readonly DRAW_ORDER_VIEW_DEPTH: int;
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
  /** Use with {@link set_particle_flag} to set {@link particle_flag_rotate_y}. */
  static readonly PARTICLE_FLAG_ROTATE_Y: int;
  /** Use with {@link set_particle_flag} to set {@link particle_flag_disable_z}. */
  static readonly PARTICLE_FLAG_DISABLE_Z: int;
  /** Represents the size of the {@link ParticleFlags} enum. */
  static readonly PARTICLE_FLAG_MAX: int;
  // enum EmissionShape
  /** All particles will be emitted from a single point. */
  static readonly EMISSION_SHAPE_POINT: int;
  /** Particles will be emitted in the volume of a sphere. */
  static readonly EMISSION_SHAPE_SPHERE: int;
  /** Particles will be emitted on the surface of a sphere. */
  static readonly EMISSION_SHAPE_SPHERE_SURFACE: int;
  /** Particles will be emitted in the volume of a box. */
  static readonly EMISSION_SHAPE_BOX: int;
  /**
   * Particles will be emitted at a position chosen randomly among {@link emission_points}. Particle color will be modulated by {@link emission_colors}.
   */
  static readonly EMISSION_SHAPE_POINTS: int;
  /**
   * Particles will be emitted at a position chosen randomly among {@link emission_points}. Particle velocity and rotation will be set based on {@link emission_normals}. Particle color will be modulated by {@link emission_colors}.
   */
  static readonly EMISSION_SHAPE_DIRECTED_POINTS: int;
  /** Particles will be emitted in a ring or cylinder. */
  static readonly EMISSION_SHAPE_RING: int;
  /** Represents the size of the {@link EmissionShape} enum. */
  static readonly EMISSION_SHAPE_MAX: int;
}
