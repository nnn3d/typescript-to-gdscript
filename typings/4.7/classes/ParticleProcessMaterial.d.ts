// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Holds a particle configuration for {@link GPUParticles2D} or {@link GPUParticles3D} nodes. */
declare class ParticleProcessMaterial extends Material {
  /**
   * The alpha value of each particle's color will be multiplied by this {@link CurveTexture} over its lifetime.
   * **Note:** {@link alpha_curve} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALPHA *= COLOR.a;` must be inserted in the shader's `fragment()` function. Otherwise, {@link alpha_curve} will have no visible effect.
   */
  alpha_curve: Texture2D | null;
  /** Each particle's rotation will be animated along this {@link CurveTexture}. */
  angle_curve: Texture2D | null;
  /**
   * Maximum initial rotation applied to each particle, in degrees.
   * Only applied when {@link particle_flag_disable_z} or {@link particle_flag_rotate_y} are `true` or the {@link BaseMaterial3D} being used to draw the particle is using {@link BaseMaterial3D.BILLBOARD_PARTICLES}.
   */
  angle_max: float;
  /** Minimum equivalent of {@link angle_max}. */
  angle_min: float;
  /**
   * Each particle's angular velocity (rotation speed) will vary along this {@link CurveTexture} over its lifetime.
   */
  angular_velocity_curve: Texture2D | null;
  /**
   * Maximum initial angular velocity (rotation speed) applied to each particle in *degrees* per second.
   * Only applied when {@link particle_flag_disable_z} or {@link particle_flag_rotate_y} are `true` or the {@link BaseMaterial3D} being used to draw the particle is using {@link BaseMaterial3D.BILLBOARD_PARTICLES}.
   */
  angular_velocity_max: float;
  /** Minimum equivalent of {@link angular_velocity_max}. */
  angular_velocity_min: float;
  /** Each particle's animation offset will vary along this {@link CurveTexture}. */
  anim_offset_curve: Texture2D | null;
  /**
   * Maximum animation offset that corresponds to frame index in the texture. `0` is the first frame, `1` is the last one. See {@link CanvasItemMaterial.particles_animation}.
   */
  anim_offset_max: float;
  /** Minimum equivalent of {@link anim_offset_max}. */
  anim_offset_min: float;
  /** Each particle's animation speed will vary along this {@link CurveTexture}. */
  anim_speed_curve: Texture2D | null;
  /**
   * Maximum particle animation speed. Animation speed of `1` means that the particles will make full `0` to `1` offset cycle during lifetime, `2` means `2` cycles etc.
   * With animation speed greater than `1`, remember to enable {@link CanvasItemMaterial.particles_anim_loop} property if you want the animation to repeat.
   */
  anim_speed_max: float;
  /** Minimum equivalent of {@link anim_speed_max}. */
  anim_speed_min: float;
  /**
   * If `true`, interaction with particle attractors is enabled. In 3D, attraction only occurs within the area defined by the {@link GPUParticles3D} node's {@link GPUParticles3D.visibility_aabb}.
   */
  attractor_interaction_enabled: boolean;
  /**
   * The particles' bounciness. Values range from `0` (no bounce) to `1` (full bounciness). Only effective if {@link collision_mode} is {@link COLLISION_RIGID}.
   */
  collision_bounce: float;
  /**
   * The particles' friction. Values range from `0` (frictionless) to `1` (maximum friction). Only effective if {@link collision_mode} is {@link COLLISION_RIGID}.
   */
  collision_friction: float;
  /**
   * The particles' collision mode.
   * **Note:** 3D Particles can only collide with {@link GPUParticlesCollision3D} nodes, not {@link PhysicsBody3D} nodes. To make particles collide with various objects, you can add {@link GPUParticlesCollision3D} nodes as children of {@link PhysicsBody3D} nodes. In 3D, collisions only occur within the area defined by the {@link GPUParticles3D} node's {@link GPUParticles3D.visibility_aabb}.
   * **Note:** 2D Particles can only collide with {@link LightOccluder2D} nodes, not {@link PhysicsBody2D} nodes.
   */
  collision_mode: int;
  /**
   * If `true`, {@link GPUParticles3D.collision_base_size} is multiplied by the particle's effective scale (see {@link scale_min}, {@link scale_max}, {@link scale_curve}, and {@link scale_over_velocity_curve}).
   */
  collision_use_scale: boolean;
  /**
   * Each particle's initial color. If the {@link GPUParticles2D}'s `texture` is defined, it will be multiplied by this color.
   * **Note:** {@link color} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color} will have no visible effect.
   */
  color: Color;
  /**
   * Each particle's initial color will vary along this {@link GradientTexture1D} (multiplied with {@link color}).
   * **Note:** {@link color_initial_ramp} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color_initial_ramp} will have no visible effect.
   */
  color_initial_ramp: Texture2D | null;
  /**
   * Each particle's color will vary along this {@link GradientTexture1D} over its lifetime (multiplied with {@link color}).
   * **Note:** {@link color_ramp} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link color_ramp} will have no visible effect.
   */
  color_ramp: Texture2D | null;
  /** Damping will vary along this {@link CurveTexture}. */
  damping_curve: Texture2D | null;
  /**
   * The maximum rate at which particles lose velocity. For example value of `100` means that the particle will go from `100` velocity to `0` in `1` second.
   */
  damping_max: float;
  /** Minimum equivalent of {@link damping_max}. */
  damping_min: float;
  /** Unit vector specifying the particles' emission direction. */
  direction: Vector3;
  /**
   * A curve that specifies the velocity along each of the axes of the particle system along its lifetime.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  directional_velocity_curve: Texture2D | null;
  /**
   * Maximum directional velocity value, which is multiplied by {@link directional_velocity_curve}.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  directional_velocity_max: float;
  /**
   * Minimum directional velocity value, which is multiplied by {@link directional_velocity_curve}.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  directional_velocity_min: float;
  /**
   * The box's extents if {@link emission_shape} is set to {@link EMISSION_SHAPE_BOX}.
   * **Note:** {@link emission_box_extents} starts from the center point and applies the X, Y, and Z values in both directions. The size is twice the area of the extents.
   */
  emission_box_extents: Vector3;
  /**
   * Particle color will be modulated by color determined by sampling this texture at the same point as the {@link emission_point_texture}.
   * **Note:** {@link emission_color_texture} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link emission_color_texture} will have no visible effect.
   */
  emission_color_texture: Texture2D | null;
  /**
   * Each particle's color will be multiplied by this {@link CurveTexture} over its lifetime.
   * **Note:** {@link emission_curve} multiplies the particle mesh's vertex colors. To have a visible effect on a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} *must* be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function. Otherwise, {@link emission_curve} will have no visible effect.
   */
  emission_curve: Texture2D | null;
  /**
   * Particle velocity and rotation will be set by sampling this texture at the same point as the {@link emission_point_texture}. Used only in {@link EMISSION_SHAPE_DIRECTED_POINTS}. Can be created automatically from mesh or node by selecting "Create Emission Points from Mesh/Node" under the "Particles" tool in the toolbar.
   */
  emission_normal_texture: Texture2D | null;
  /**
   * The number of emission points if {@link emission_shape} is set to {@link EMISSION_SHAPE_POINTS} or {@link EMISSION_SHAPE_DIRECTED_POINTS}.
   */
  emission_point_count: int;
  /**
   * Particles will be emitted at positions determined by sampling this texture at a random position. Used with {@link EMISSION_SHAPE_POINTS} and {@link EMISSION_SHAPE_DIRECTED_POINTS}. Can be created automatically from mesh or node by selecting "Create Emission Points from Mesh/Node" under the "Particles" tool in the toolbar.
   */
  emission_point_texture: Texture2D | null;
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
  /** The offset for the {@link emission_shape}, in local space. */
  emission_shape_offset: Vector3;
  /** The scale of the {@link emission_shape}, in local space. */
  emission_shape_scale: Vector3;
  /** The sphere's radius if {@link emission_shape} is set to {@link EMISSION_SHAPE_SPHERE}. */
  emission_sphere_radius: float;
  /** Amount of {@link spread} along the Y axis. */
  flatness: float;
  /** Gravity applied to every particle. */
  gravity: Vector3;
  /** Each particle's hue will vary along this {@link CurveTexture}. */
  hue_variation_curve: Texture2D | null;
  /** Maximum initial hue variation applied to each particle. It will shift the particle color's hue. */
  hue_variation_max: float;
  /** Minimum equivalent of {@link hue_variation_max}. */
  hue_variation_min: float;
  /**
   * Percentage of the velocity of the respective {@link GPUParticles2D} or {@link GPUParticles3D} inherited by each particle when spawning.
   */
  inherit_velocity_ratio: float;
  /**
   * Maximum initial velocity magnitude for each particle. Direction comes from {@link direction} and {@link spread}.
   */
  initial_velocity_max: float;
  /** Minimum equivalent of {@link initial_velocity_max}. */
  initial_velocity_min: float;
  /**
   * Particle lifetime randomness ratio. The equation for the lifetime of a particle is `lifetime * (1.0 - randf() * lifetime_randomness)`. For example, a {@link lifetime_randomness} of `0.4` scales the lifetime between `0.6` to `1.0` of its original value.
   */
  lifetime_randomness: float;
  /** Each particle's linear acceleration will vary along this {@link CurveTexture}. */
  linear_accel_curve: Texture2D | null;
  /** Maximum linear acceleration applied to each particle in the direction of motion. */
  linear_accel_max: float;
  /** Minimum equivalent of {@link linear_accel_max}. */
  linear_accel_min: float;
  /**
   * Each particle's orbital velocity will vary along this {@link CurveTexture}.
   * **Note:** For 3D orbital velocity, use a {@link CurveXYZTexture}.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  orbit_velocity_curve: Texture2D | null;
  /**
   * Maximum orbital velocity applied to each particle. Makes the particles circle around origin. Specified in number of full rotations around origin per second.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  orbit_velocity_max: float;
  /**
   * Minimum equivalent of {@link orbit_velocity_max}.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  orbit_velocity_min: float;
  /** Align Y axis of particle with the direction of its velocity. */
  particle_flag_align_y: boolean;
  /**
   * Changes the behavior of the damping properties from a linear deceleration to a deceleration based on speed percentage.
   */
  particle_flag_damping_as_friction: boolean;
  /** If `true`, particles will not move on the z axis. */
  particle_flag_disable_z: boolean;
  /** If `true`, particles rotate around Y axis by {@link angle_min}. */
  particle_flag_rotate_y: boolean;
  /** Each particle's radial acceleration will vary along this {@link CurveTexture}. */
  radial_accel_curve: Texture2D | null;
  /**
   * Maximum radial acceleration applied to each particle. Makes particle accelerate away from the origin or towards it if negative.
   */
  radial_accel_max: float;
  /** Minimum equivalent of {@link radial_accel_max}. */
  radial_accel_min: float;
  /**
   * A {@link CurveTexture} that defines the velocity over the particle's lifetime away (or toward) the {@link velocity_pivot}.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  radial_velocity_curve: Texture2D | null;
  /**
   * Maximum radial velocity applied to each particle. Makes particles move away from the {@link velocity_pivot}, or toward it if negative.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  radial_velocity_max: float;
  /**
   * Minimum radial velocity applied to each particle. Makes particles move away from the {@link velocity_pivot}, or toward it if negative.
   * **Note:** Animated velocities will not be affected by damping, use {@link velocity_limit_curve} instead.
   */
  radial_velocity_min: float;
  /**
   * Each particle's scale will vary along this {@link CurveTexture} over its lifetime. If a {@link CurveXYZTexture} is supplied instead, the scale will be separated per-axis.
   */
  scale_curve: Texture2D | null;
  /** Maximum initial scale applied to each particle. */
  scale_max: float;
  /** Minimum equivalent of {@link scale_max}. */
  scale_min: float;
  /**
   * Either a {@link CurveTexture} or a {@link CurveXYZTexture} that scales each particle based on its velocity.
   */
  scale_over_velocity_curve: Texture2D | null;
  /**
   * Maximum velocity value reference for {@link scale_over_velocity_curve}.
   * {@link scale_over_velocity_curve} will be interpolated between {@link scale_over_velocity_min} and {@link scale_over_velocity_max}.
   */
  scale_over_velocity_max: float;
  /**
   * Minimum velocity value reference for {@link scale_over_velocity_curve}.
   * {@link scale_over_velocity_curve} will be interpolated between {@link scale_over_velocity_min} and {@link scale_over_velocity_max}.
   */
  scale_over_velocity_min: float;
  /** Each particle's initial direction range from `+spread` to `-spread` degrees. */
  spread: float;
  /**
   * The amount of particles to spawn from the subemitter node when a collision occurs. When combined with {@link COLLISION_HIDE_ON_CONTACT} on the main particles material, this can be used to achieve effects such as raindrops hitting the ground.
   * **Note:** This value shouldn't exceed {@link GPUParticles2D.amount} or {@link GPUParticles3D.amount} defined on the *subemitter node* (not the main node), relative to the subemitter's particle lifetime. If the number of particles is exceeded, no new particles will spawn from the subemitter until enough particles have expired.
   */
  sub_emitter_amount_at_collision: int;
  /**
   * The amount of particles to spawn from the subemitter node when the particle expires.
   * **Note:** This value shouldn't exceed {@link GPUParticles2D.amount} or {@link GPUParticles3D.amount} defined on the *subemitter node* (not the main node), relative to the subemitter's particle lifetime. If the number of particles is exceeded, no new particles will spawn from the subemitter until enough particles have expired.
   */
  sub_emitter_amount_at_end: int;
  /**
   * The amount of particles to spawn from the subemitter node when the particle spawns.
   * **Note:** This value shouldn't exceed {@link GPUParticles2D.amount} or {@link GPUParticles3D.amount} defined on the *subemitter node* (not the main node), relative to the subemitter's particle lifetime. If the number of particles is exceeded, no new particles will spawn from the subemitter until enough particles have expired.
   */
  sub_emitter_amount_at_start: int;
  /**
   * The frequency at which particles should be emitted from the subemitter node. One particle will be spawned every {@link sub_emitter_frequency} seconds.
   * **Note:** This value shouldn't exceed {@link GPUParticles2D.amount} or {@link GPUParticles3D.amount} defined on the *subemitter node* (not the main node), relative to the subemitter's particle lifetime. If the number of particles is exceeded, no new particles will spawn from the subemitter until enough particles have expired.
   */
  sub_emitter_frequency: float;
  /** If `true`, the subemitter inherits the parent particle's velocity when it spawns. */
  sub_emitter_keep_velocity: boolean;
  /**
   * The particle subemitter mode (see {@link GPUParticles2D.sub_emitter} and {@link GPUParticles3D.sub_emitter}).
   */
  sub_emitter_mode: int;
  /** Each particle's tangential acceleration will vary along this {@link CurveTexture}. */
  tangential_accel_curve: Texture2D | null;
  /**
   * Maximum tangential acceleration applied to each particle. Tangential acceleration is perpendicular to the particle's velocity giving the particles a swirling motion.
   */
  tangential_accel_max: float;
  /** Minimum equivalent of {@link tangential_accel_max}. */
  tangential_accel_min: float;
  /**
   * If `true`, enables turbulence for the particle system. Turbulence can be used to vary particle movement according to its position (based on a 3D noise pattern). In 3D, {@link GPUParticlesAttractorVectorField3D} with {@link NoiseTexture3D} can be used as an alternative to turbulence that works in world space and with multiple particle systems reacting in the same way.
   * **Note:** Enabling turbulence has a high performance cost on the GPU. Only enable turbulence on a few particle systems at once at most, and consider disabling it when targeting mobile/web platforms.
   */
  turbulence_enabled: boolean;
  /**
   * Maximum turbulence influence on each particle.
   * The actual amount of turbulence influence on each particle is calculated as a random value between {@link turbulence_influence_min} and {@link turbulence_influence_max} and multiplied by the amount of turbulence influence from {@link turbulence_influence_over_life}.
   */
  turbulence_influence_max: float;
  /**
   * Minimum turbulence influence on each particle.
   * The actual amount of turbulence influence on each particle is calculated as a random value between {@link turbulence_influence_min} and {@link turbulence_influence_max} and multiplied by the amount of turbulence influence from {@link turbulence_influence_over_life}.
   */
  turbulence_influence_min: float;
  /**
   * Each particle's amount of turbulence will be influenced along this {@link CurveTexture} over its life time.
   */
  turbulence_influence_over_life: Texture2D | null;
  /**
   * Maximum displacement of each particle's spawn position by the turbulence.
   * The actual amount of displacement will be a factor of the underlying turbulence multiplied by a random value between {@link turbulence_initial_displacement_min} and {@link turbulence_initial_displacement_max}.
   */
  turbulence_initial_displacement_max: float;
  /**
   * Minimum displacement of each particle's spawn position by the turbulence.
   * The actual amount of displacement will be a factor of the underlying turbulence multiplied by a random value between {@link turbulence_initial_displacement_min} and {@link turbulence_initial_displacement_max}.
   */
  turbulence_initial_displacement_min: float;
  /**
   * This value controls the overall scale/frequency of the turbulence noise pattern.
   * A small scale will result in smaller features with more detail while a high scale will result in smoother noise with larger features.
   */
  turbulence_noise_scale: float;
  /**
   * A scrolling velocity for the turbulence field. This sets a directional trend for the pattern to move in over time.
   * The default value of `Vector3(0, 0, 0)` turns off the scrolling.
   */
  turbulence_noise_speed: Vector3;
  /**
   * The in-place rate of change of the turbulence field. This defines how quickly the noise pattern varies over time.
   * A value of 0.0 will result in a fixed pattern.
   */
  turbulence_noise_speed_random: float;
  /**
   * The turbulence noise strength. Increasing this will result in a stronger, more contrasting, flow pattern.
   */
  turbulence_noise_strength: float;
  /** A {@link CurveTexture} that defines the maximum velocity of a particle during its lifetime. */
  velocity_limit_curve: Texture2D | null;
  /** A pivot point used to calculate radial and orbital velocity of particles. */
  velocity_pivot: Vector3;
  set_alpha_curve(value: Texture2D | null): void;
  get_alpha_curve(): Texture2D | null;
  set_attractor_interaction_enabled(value: boolean): void;
  is_attractor_interaction_enabled(): boolean;
  set_collision_bounce(value: float): void;
  get_collision_bounce(): float;
  set_collision_friction(value: float): void;
  get_collision_friction(): float;
  set_collision_mode(value: int): void;
  get_collision_mode(): int;
  set_collision_use_scale(value: boolean): void;
  is_collision_using_scale(): boolean;
  set_color(value: Color): void;
  get_color(): Color;
  set_color_initial_ramp(value: Texture2D | null): void;
  get_color_initial_ramp(): Texture2D | null;
  set_color_ramp(value: Texture2D | null): void;
  get_color_ramp(): Texture2D | null;
  set_direction(value: Vector3): void;
  get_direction(): Vector3;
  set_emission_box_extents(value: Vector3): void;
  get_emission_box_extents(): Vector3;
  set_emission_color_texture(value: Texture2D | null): void;
  get_emission_color_texture(): Texture2D | null;
  set_emission_curve(value: Texture2D | null): void;
  get_emission_curve(): Texture2D | null;
  set_emission_normal_texture(value: Texture2D | null): void;
  get_emission_normal_texture(): Texture2D | null;
  set_emission_point_count(value: int): void;
  get_emission_point_count(): int;
  set_emission_point_texture(value: Texture2D | null): void;
  get_emission_point_texture(): Texture2D | null;
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
  set_emission_shape_offset(value: Vector3): void;
  get_emission_shape_offset(): Vector3;
  set_emission_shape_scale(value: Vector3): void;
  get_emission_shape_scale(): Vector3;
  set_emission_sphere_radius(value: float): void;
  get_emission_sphere_radius(): float;
  set_flatness(value: float): void;
  get_flatness(): float;
  set_gravity(value: Vector3): void;
  get_gravity(): Vector3;
  set_inherit_velocity_ratio(value: float): void;
  get_inherit_velocity_ratio(): float;
  set_lifetime_randomness(value: float): void;
  get_lifetime_randomness(): float;
  set_spread(value: float): void;
  get_spread(): float;
  set_sub_emitter_amount_at_collision(value: int): void;
  get_sub_emitter_amount_at_collision(): int;
  set_sub_emitter_amount_at_end(value: int): void;
  get_sub_emitter_amount_at_end(): int;
  set_sub_emitter_amount_at_start(value: int): void;
  get_sub_emitter_amount_at_start(): int;
  set_sub_emitter_frequency(value: float): void;
  get_sub_emitter_frequency(): float;
  set_sub_emitter_keep_velocity(value: boolean): void;
  get_sub_emitter_keep_velocity(): boolean;
  set_sub_emitter_mode(value: int): void;
  get_sub_emitter_mode(): int;
  set_turbulence_enabled(value: boolean): void;
  get_turbulence_enabled(): boolean;
  set_turbulence_noise_scale(value: float): void;
  get_turbulence_noise_scale(): float;
  set_turbulence_noise_speed(value: Vector3): void;
  get_turbulence_noise_speed(): Vector3;
  set_turbulence_noise_speed_random(value: float): void;
  get_turbulence_noise_speed_random(): float;
  set_turbulence_noise_strength(value: float): void;
  get_turbulence_noise_strength(): float;
  set_velocity_limit_curve(value: Texture2D | null): void;
  get_velocity_limit_curve(): Texture2D | null;
  set_velocity_pivot(value: Vector3): void;
  get_velocity_pivot(): Vector3;

  /**
   * Returns the minimum and maximum values of the given `param` as a vector.
   * The `x` component of the returned vector corresponds to minimum and the `y` component corresponds to maximum.
   */
  get_param(param: int): Vector2;
  /** Returns the maximum value range for the given parameter. */
  get_param_max(param: int): float;
  /** Returns the minimum value range for the given parameter. */
  get_param_min(param: int): float;
  /** Returns the {@link Texture2D} used by the specified parameter. */
  get_param_texture(param: int): Texture2D | null;
  /** Returns `true` if the specified particle flag is enabled. */
  get_particle_flag(particle_flag: int): boolean;
  /**
   * Sets the minimum and maximum values of the given `param`.
   * The `x` component of the argument vector corresponds to minimum and the `y` component corresponds to maximum.
   */
  set_param(param: int, value: Vector2): void;
  /** Sets the maximum value range for the given parameter. */
  set_param_max(param: int, value: float): void;
  /** Sets the minimum value range for the given parameter. */
  set_param_min(param: int, value: float): void;
  /** Sets the {@link Texture2D} for the specified {@link Parameter}. */
  set_param_texture(param: int, texture: Texture2D): void;
  /** Sets the `particle_flag` to `enable`. */
  set_particle_flag(particle_flag: int, enable: boolean): void;

  /**
   * Emitted when this material's emission shape is changed in any way. This includes changes to {@link emission_shape}, {@link emission_shape_scale}, or {@link emission_sphere_radius}, and any other property that affects the emission shape's offset, size, scale, or orientation.
   * **Note:** This signal is only emitted inside the editor for performance reasons.
   */
  emission_shape_changed: Signal<[]>;

  // enum Parameter
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set initial velocity properties.
   */
  static readonly PARAM_INITIAL_LINEAR_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set angular velocity properties.
   */
  static readonly PARAM_ANGULAR_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set orbital velocity properties.
   */
  static readonly PARAM_ORBIT_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set linear acceleration properties.
   */
  static readonly PARAM_LINEAR_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set radial acceleration properties.
   */
  static readonly PARAM_RADIAL_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set tangential acceleration properties.
   */
  static readonly PARAM_TANGENTIAL_ACCEL: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set damping properties.
   */
  static readonly PARAM_DAMPING: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set angle properties.
   */
  static readonly PARAM_ANGLE: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set scale properties.
   */
  static readonly PARAM_SCALE: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set hue variation properties.
   */
  static readonly PARAM_HUE_VARIATION: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set animation speed properties.
   */
  static readonly PARAM_ANIM_SPEED: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set animation offset properties.
   */
  static readonly PARAM_ANIM_OFFSET: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set radial velocity properties.
   */
  static readonly PARAM_RADIAL_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set directional velocity properties.
   */
  static readonly PARAM_DIRECTIONAL_VELOCITY: int;
  /**
   * Use with {@link set_param_min}, {@link set_param_max}, and {@link set_param_texture} to set scale over velocity properties.
   */
  static readonly PARAM_SCALE_OVER_VELOCITY: int;
  /** Represents the size of the {@link Parameter} enum. */
  static readonly PARAM_MAX: int;
  /**
   * Use with {@link set_param_min} and {@link set_param_max} to set the turbulence minimum und maximum influence on each particles velocity.
   */
  static readonly PARAM_TURB_VEL_INFLUENCE: int;
  /**
   * Use with {@link set_param_min} and {@link set_param_max} to set the turbulence minimum and maximum displacement of the particles spawn position.
   */
  static readonly PARAM_TURB_INIT_DISPLACEMENT: int;
  /** Use with {@link set_param_texture} to set the turbulence influence over the particles life time. */
  static readonly PARAM_TURB_INFLUENCE_OVER_LIFE: int;
  // enum ParticleFlags
  /** Use with {@link set_particle_flag} to set {@link particle_flag_align_y}. */
  static readonly PARTICLE_FLAG_ALIGN_Y_TO_VELOCITY: int;
  /** Use with {@link set_particle_flag} to set {@link particle_flag_rotate_y}. */
  static readonly PARTICLE_FLAG_ROTATE_Y: int;
  /** Use with {@link set_particle_flag} to set {@link particle_flag_disable_z}. */
  static readonly PARTICLE_FLAG_DISABLE_Z: int;
  static readonly PARTICLE_FLAG_DAMPING_AS_FRICTION: int;
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
   * Particles will be emitted at a position determined by sampling a random point on the {@link emission_point_texture}. Particle color will be modulated by {@link emission_color_texture}.
   */
  static readonly EMISSION_SHAPE_POINTS: int;
  /**
   * Particles will be emitted at a position determined by sampling a random point on the {@link emission_point_texture}. Particle velocity and rotation will be set based on {@link emission_normal_texture}. Particle color will be modulated by {@link emission_color_texture}.
   */
  static readonly EMISSION_SHAPE_DIRECTED_POINTS: int;
  /** Particles will be emitted in a ring or cylinder. */
  static readonly EMISSION_SHAPE_RING: int;
  /** Represents the size of the {@link EmissionShape} enum. */
  static readonly EMISSION_SHAPE_MAX: int;
  // enum SubEmitterMode
  /** The subemitter is disabled. */
  static readonly SUB_EMITTER_DISABLED: int;
  /** The submitter is emitted on the constant interval defined by {@link sub_emitter_frequency}. */
  static readonly SUB_EMITTER_CONSTANT: int;
  /** The subemitter is emitted at the end of the particle's lifetime. */
  static readonly SUB_EMITTER_AT_END: int;
  /** The subemitter is emitted when the particle collides. */
  static readonly SUB_EMITTER_AT_COLLISION: int;
  /** The subemitter is emitted when the particle spawns. */
  static readonly SUB_EMITTER_AT_START: int;
  /** Represents the size of the {@link SubEmitterMode} enum. */
  static readonly SUB_EMITTER_MAX: int;
  // enum CollisionMode
  /** No collision for particles. Particles will go through {@link GPUParticlesCollision3D} nodes. */
  static readonly COLLISION_DISABLED: int;
  /** {@link RigidBody3D}-style collision for particles using {@link GPUParticlesCollision3D} nodes. */
  static readonly COLLISION_RIGID: int;
  /**
   * Hide particles instantly when colliding with a {@link GPUParticlesCollision3D} node. This can be combined with a subemitter that uses the {@link COLLISION_RIGID} collision mode to "replace" the parent particle with the subemitter on impact.
   */
  static readonly COLLISION_HIDE_ON_CONTACT: int;
  /** Represents the size of the {@link CollisionMode} enum. */
  static readonly COLLISION_MAX: int;
}
