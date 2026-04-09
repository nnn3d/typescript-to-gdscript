// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D physics body specialized for characters moved by script. */
declare class CharacterBody2D extends PhysicsBody2D {
  /**
   * If `true`, the body will be able to move on the floor only. This option avoids to be able to walk on walls, it will however allow to slide down along them.
   */
  floor_block_on_wall: boolean;
  /**
   * If `false` (by default), the body will move faster on downward slopes and slower on upward slopes.
   * If `true`, the body will always move at the same speed on the ground no matter the slope. Note that you need to use {@link floor_snap_length} to stick along a downward slope at constant speed.
   */
  floor_constant_speed: boolean;
  /**
   * Maximum angle (in radians) where a slope is still considered a floor (or a ceiling), rather than a wall, when calling {@link move_and_slide}. The default value equals 45 degrees.
   */
  floor_max_angle: float;
  /**
   * Sets a snapping distance. When set to a value different from `0.0`, the body is kept attached to slopes when calling {@link move_and_slide}. The snapping vector is determined by the given distance along the opposite direction of the {@link up_direction}.
   * As long as the snapping vector is in contact with the ground and the body moves against {@link up_direction}, the body will remain attached to the surface. Snapping is not applied if the body moves along {@link up_direction}, meaning it contains vertical rising velocity, so it will be able to detach from the ground when jumping or when the body is pushed up by something. If you want to apply a snap without taking into account the velocity, use {@link apply_floor_snap}.
   */
  floor_snap_length: float;
  /**
   * If `true`, the body will not slide on slopes when calling {@link move_and_slide} when the body is standing still.
   * If `false`, the body will slide on floor's slopes when {@link velocity} applies a downward force.
   */
  floor_stop_on_slope: boolean;
  /**
   * Maximum number of times the body can change direction before it stops when calling {@link move_and_slide}. Must be greater than zero.
   */
  max_slides: int;
  /** Sets the motion mode which defines the behavior of {@link move_and_slide}. */
  motion_mode: int;
  /**
   * Collision layers that will be included for detecting floor bodies that will act as moving platforms to be followed by the {@link CharacterBody2D}. By default, all floor bodies are detected and propagate their velocity.
   */
  platform_floor_layers: int;
  /**
   * Sets the behavior to apply when you leave a moving platform. By default, to be physically accurate, when you leave the last platform velocity is applied.
   */
  platform_on_leave: int;
  /**
   * Collision layers that will be included for detecting wall bodies that will act as moving platforms to be followed by the {@link CharacterBody2D}. By default, all wall bodies are ignored.
   */
  platform_wall_layers: int;
  /**
   * Extra margin used for collision recovery when calling {@link move_and_slide}.
   * If the body is at least this close to another body, it will consider them to be colliding and will be pushed away before performing the actual motion.
   * A higher value means it's more flexible for detecting collision, which helps with consistently detecting walls and floors.
   * A lower value forces the collision algorithm to use more exact detection, so it can be used in cases that specifically require precision, e.g at very low scale to avoid visible jittering, or for stability with a stack of character bodies.
   */
  safe_margin: float;
  /**
   * If `true`, during a jump against the ceiling, the body will slide, if `false` it will be stopped and will fall vertically.
   */
  slide_on_ceiling: boolean;
  /**
   * Vector pointing upwards, used to determine what is a wall and what is a floor (or a ceiling) when calling {@link move_and_slide}. Defaults to {@link Vector2.UP}. As the vector will be normalized it can't be equal to {@link Vector2.ZERO}, if you want all collisions to be reported as walls, consider using {@link MOTION_MODE_FLOATING} as {@link motion_mode}.
   */
  up_direction: Vector2;
  /**
   * Current velocity vector in pixels per second, used and modified during calls to {@link move_and_slide}.
   * **Note:** A common mistake is setting this property to the desired velocity multiplied by `delta`, which produces a motion vector in pixels.
   */
  velocity: Vector2;
  /**
   * Minimum angle (in radians) where the body is allowed to slide when it encounters a wall. The default value equals 15 degrees. This property only affects movement when {@link motion_mode} is {@link MOTION_MODE_FLOATING}.
   */
  wall_min_slide_angle: float;
  set_floor_block_on_wall_enabled(value: boolean): void;
  is_floor_block_on_wall_enabled(): boolean;
  set_floor_constant_speed_enabled(value: boolean): void;
  is_floor_constant_speed_enabled(): boolean;
  set_floor_max_angle(value: float): void;
  get_floor_max_angle(): float;
  set_floor_snap_length(value: float): void;
  get_floor_snap_length(): float;
  set_floor_stop_on_slope_enabled(value: boolean): void;
  is_floor_stop_on_slope_enabled(): boolean;
  set_max_slides(value: int): void;
  get_max_slides(): int;
  set_motion_mode(value: int): void;
  get_motion_mode(): int;
  set_platform_floor_layers(value: int): void;
  get_platform_floor_layers(): int;
  set_platform_on_leave(value: int): void;
  get_platform_on_leave(): int;
  set_platform_wall_layers(value: int): void;
  get_platform_wall_layers(): int;
  set_safe_margin(value: float): void;
  get_safe_margin(): float;
  set_slide_on_ceiling_enabled(value: boolean): void;
  is_slide_on_ceiling_enabled(): boolean;
  set_up_direction(value: Vector2 | Vector2i): void;
  get_up_direction(): Vector2;
  set_velocity(value: Vector2 | Vector2i): void;
  get_velocity(): Vector2;
  set_wall_min_slide_angle(value: float): void;
  get_wall_min_slide_angle(): float;

  /**
   * Allows to manually apply a snap to the floor regardless of the body's velocity. This function does nothing when {@link is_on_floor} returns `true`.
   */
  apply_floor_snap(): void;
  /**
   * Returns the floor's collision angle at the last collision point according to `up_direction`, which is {@link Vector2.UP} by default. This value is always positive and only valid after calling {@link move_and_slide} and when {@link is_on_floor} returns `true`.
   */
  get_floor_angle(up_direction?: Vector2 | Vector2i): float;
  /**
   * Returns the collision normal of the floor at the last collision point. Only valid after calling {@link move_and_slide} and when {@link is_on_floor} returns `true`.
   * **Warning:** The collision normal is not always the same as the surface normal.
   */
  get_floor_normal(): Vector2;
  /**
   * Returns the last motion applied to the {@link CharacterBody2D} during the last call to {@link move_and_slide}. The movement can be split into multiple motions when sliding occurs, and this method return the last one, which is useful to retrieve the current direction of the movement.
   */
  get_last_motion(): Vector2;
  /**
   * Returns a {@link KinematicCollision2D} if a collision occurred. The returned value contains information about the latest collision that occurred during the last call to {@link move_and_slide}. Returns `null` if no collision occurred. See also {@link get_slide_collision}.
   */
  get_last_slide_collision(): KinematicCollision2D | null;
  /**
   * Returns the linear velocity of the platform at the last collision point. Only valid after calling {@link move_and_slide}.
   */
  get_platform_velocity(): Vector2;
  /** Returns the travel (position delta) that occurred during the last call to {@link move_and_slide}. */
  get_position_delta(): Vector2;
  /**
   * Returns the current real velocity since the last call to {@link move_and_slide}. For example, when you climb a slope, you will move diagonally even though the velocity is horizontal. This method returns the diagonal movement, as opposed to {@link velocity} which returns the requested velocity.
   */
  get_real_velocity(): Vector2;
  /**
   * Returns a {@link KinematicCollision2D}, which contains information about a collision that occurred during the last call to {@link move_and_slide}. Since the body can collide several times in a single call to {@link move_and_slide}, you must specify the index of the collision in the range 0 to ({@link get_slide_collision_count} - 1). See also {@link get_last_slide_collision}.
   * **Example:** Iterate through the collisions with a `for` loop:
   */
  get_slide_collision(slide_idx: int): KinematicCollision2D | null;
  /**
   * Returns the number of times the body collided and changed direction during the last call to {@link move_and_slide}.
   */
  get_slide_collision_count(): int;
  /**
   * Returns the collision normal of the wall at the last collision point. Only valid after calling {@link move_and_slide} and when {@link is_on_wall} returns `true`.
   * **Warning:** The collision normal is not always the same as the surface normal.
   */
  get_wall_normal(): Vector2;
  /**
   * Returns `true` if the body collided with the ceiling on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "ceiling" or not.
   */
  is_on_ceiling(): boolean;
  /**
   * Returns `true` if the body collided only with the ceiling on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "ceiling" or not.
   */
  is_on_ceiling_only(): boolean;
  /**
   * Returns `true` if the body collided with the floor on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "floor" or not.
   */
  is_on_floor(): boolean;
  /**
   * Returns `true` if the body collided only with the floor on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "floor" or not.
   */
  is_on_floor_only(): boolean;
  /**
   * Returns `true` if the body collided with a wall on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "wall" or not.
   */
  is_on_wall(): boolean;
  /**
   * Returns `true` if the body collided only with a wall on the last call of {@link move_and_slide}. Otherwise, returns `false`. The {@link up_direction} and {@link floor_max_angle} are used to determine whether a surface is "wall" or not.
   */
  is_on_wall_only(): boolean;
  /**
   * Moves the body based on {@link velocity}. If the body collides with another, it will slide along the other body (by default only on floor) rather than stop immediately. If the other body is a {@link CharacterBody2D} or {@link RigidBody2D}, it will also be affected by the motion of the other body. You can use this to make moving and rotating platforms, or to make nodes push other nodes.
   * This method should be used in {@link Node._physics_process} (or in a method called by {@link Node._physics_process}), as it uses the physics step's `delta` value automatically in calculations. Otherwise, the simulation will run at an incorrect speed.
   * Modifies {@link velocity} if a slide collision occurred. To get the latest collision call {@link get_last_slide_collision}, for detailed information about collisions that occurred, use {@link get_slide_collision}.
   * When the body touches a moving platform, the platform's velocity is automatically added to the body motion. If a collision occurs due to the platform's motion, it will always be first in the slide collisions.
   * The general behavior and available properties change according to the {@link motion_mode}.
   * Returns `true` if the body collided, otherwise, returns `false`.
   */
  move_and_slide(): boolean;

  // enum MotionMode
  /**
   * Apply when notions of walls, ceiling and floor are relevant. In this mode the body motion will react to slopes (acceleration/slowdown). This mode is suitable for sided games like platformers.
   */
  static readonly MOTION_MODE_GROUNDED: int;
  /**
   * Apply when there is no notion of floor or ceiling. All collisions will be reported as `on_wall`. In this mode, when you slide, the speed will always be constant. This mode is suitable for top-down games.
   */
  static readonly MOTION_MODE_FLOATING: int;
  // enum PlatformOnLeave
  /** Add the last platform velocity to the {@link velocity} when you leave a moving platform. */
  static readonly PLATFORM_ON_LEAVE_ADD_VELOCITY: int;
  /**
   * Add the last platform velocity to the {@link velocity} when you leave a moving platform, but any downward motion is ignored. It's useful to keep full jump height even when the platform is moving down.
   */
  static readonly PLATFORM_ON_LEAVE_ADD_UPWARD_VELOCITY: int;
  /** Do nothing when leaving a platform. */
  static readonly PLATFORM_ON_LEAVE_DO_NOTHING: int;
}
