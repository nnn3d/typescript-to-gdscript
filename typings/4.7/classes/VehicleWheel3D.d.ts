// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D physics body for a {@link VehicleBody3D} that simulates the behavior of a wheel. */
declare class VehicleWheel3D extends Node3D {
  /**
   * Slows down the wheel by applying a braking force. The wheel is only slowed down if it is in contact with a surface. The force you need to apply to adequately slow down your vehicle depends on the {@link RigidBody3D.mass} of the vehicle. For a vehicle with a mass set to 1000, try a value in the 25 - 30 range for hard braking.
   */
  brake: float;
  /**
   * The damping applied to the suspension spring when being compressed, meaning when the wheel is moving up relative to the vehicle. It is measured in Newton-seconds per millimeter (N⋅s/mm), or megagrams per second (Mg/s). This value should be between 0.0 (no damping) and 1.0, but may be more. A value of 0.0 means the car will keep bouncing as the spring keeps its energy. A good value for this is around 0.3 for a normal car, 0.5 for a race car.
   */
  damping_compression: float;
  /**
   * The damping applied to the suspension spring when rebounding or extending, meaning when the wheel is moving down relative to the vehicle. It is measured in Newton-seconds per millimeter (N⋅s/mm), or megagrams per second (Mg/s). This value should be between 0.0 (no damping) and 1.0, but may be more. This value should always be slightly higher than the {@link damping_compression} property. For a {@link damping_compression} value of 0.3, try a relaxation value of 0.5.
   */
  damping_relaxation: float;
  /**
   * Accelerates the wheel by applying an engine force. The wheel is only sped up if it is in contact with a surface. The {@link RigidBody3D.mass} of the vehicle has an effect on the acceleration of the vehicle. For a vehicle with a mass set to 1000, try a value in the 25 - 50 range for acceleration.
   * **Note:** The simulation does not take the effect of gears into account, you will need to add logic for this if you wish to simulate gears.
   * A negative value will result in the wheel reversing.
   */
  engine_force: float;
  /**
   * <member name="steering" type="float" setter="set_steering" getter="get_steering" default="0.0">
   * The steering angle for the wheel, in radians. Setting this to a non-zero value will result in the vehicle turning when it's moving.
   */
  physics_interpolation_mode: int;
  /**
   * The maximum force the spring can resist. This value should be higher than a quarter of the {@link RigidBody3D.mass} of the {@link VehicleBody3D} or the spring will not carry the weight of the vehicle. Good results are often obtained by a value that is about 3× to 4× this number.
   */
  suspension_max_force: float;
  /**
   * The stiffness of the suspension, measured in Newtons per millimeter (N/mm), or megagrams per second squared (Mg/s²). Use a value lower than 50 for an off-road car, a value between 50 and 100 for a race car and try something around 200 for something like a Formula 1 car.
   */
  suspension_stiffness: float;
  /**
   * This is the distance the suspension can travel. As Godot units are equivalent to meters, keep this setting relatively low. Try a value between 0.1 and 0.3 depending on the type of car.
   */
  suspension_travel: float;
  /**
   * If `true`, this wheel will be turned when the car steers. This value is used in conjunction with {@link VehicleBody3D.steering} and ignored if you are using the per-wheel {@link steering} value instead.
   */
  use_as_steering: boolean;
  /**
   * If `true`, this wheel transfers engine force to the ground to propel the vehicle forward. This value is used in conjunction with {@link VehicleBody3D.engine_force} and ignored if you are using the per-wheel {@link engine_force} value instead.
   */
  use_as_traction: boolean;
  /**
   * This determines how much grip this wheel has. It is combined with the friction setting of the surface the wheel is in contact with. 0.0 means no grip, 1.0 is normal grip. For a drift car setup, try setting the grip of the rear wheels slightly lower than the front wheels, or use a lower value to simulate tire wear.
   * It's best to set this to 1.0 when starting out.
   */
  wheel_friction_slip: float;
  /** The radius of the wheel in meters. */
  wheel_radius: float;
  /**
   * This is the distance in meters the wheel is lowered from its origin point. Don't set this to 0.0 and move the wheel into position, instead move the origin point of your wheel (the gizmo in Godot) to the position the wheel will take when bottoming out, then use the rest length to move the wheel down to the position it should be in when the car is in rest.
   */
  wheel_rest_length: float;
  /**
   * This value affects the roll of your vehicle. If set to 1.0 for all wheels, your vehicle will resist body roll, while a value of 0.0 will be prone to rolling over.
   */
  wheel_roll_influence: float;
  set_brake(value: float): void;
  get_brake(): float;
  set_damping_compression(value: float): void;
  get_damping_compression(): float;
  set_damping_relaxation(value: float): void;
  get_damping_relaxation(): float;
  set_engine_force(value: float): void;
  get_engine_force(): float;
  set_suspension_max_force(value: float): void;
  get_suspension_max_force(): float;
  set_suspension_stiffness(value: float): void;
  get_suspension_stiffness(): float;
  set_suspension_travel(value: float): void;
  get_suspension_travel(): float;
  set_use_as_steering(value: boolean): void;
  is_used_as_steering(): boolean;
  set_use_as_traction(value: boolean): void;
  is_used_as_traction(): boolean;
  set_friction_slip(value: float): void;
  get_friction_slip(): float;
  set_radius(value: float): void;
  get_radius(): float;
  set_suspension_rest_length(value: float): void;
  get_suspension_rest_length(): float;
  set_roll_influence(value: float): void;
  get_roll_influence(): float;

  /**
   * Returns the contacting body node if valid in the tree, as {@link Node3D}. At the moment, {@link GridMap} is not supported so the node will be always of type {@link PhysicsBody3D}.
   * Returns `null` if the wheel is not in contact with a surface, or the contact body is not a {@link PhysicsBody3D}.
   */
  get_contact_body(): Node3D;
  /**
   * Returns the normal of the suspension's collision in world space if the wheel is in contact. If the wheel isn't in contact with anything, returns a vector pointing directly along the suspension axis toward the vehicle in world space.
   */
  get_contact_normal(): Vector3;
  /**
   * Returns the point of the suspension's collision in world space if the wheel is in contact. If the wheel isn't in contact with anything, returns the maximum point of the wheel's ray cast in world space, which is defined by `wheel_rest_length + wheel_radius`.
   */
  get_contact_point(): Vector3;
  /** Returns the rotational speed of the wheel in revolutions per minute. */
  get_rpm(): float;
  /**
   * Returns a value between 0.0 and 1.0 that indicates whether this wheel is skidding. 0.0 is skidding (the wheel has lost grip, e.g. icy terrain), 1.0 means not skidding (the wheel has full grip, e.g. dry asphalt road).
   */
  get_skidinfo(): float;
  /** Returns `true` if this wheel is in contact with a surface. */
  is_in_contact(): boolean;
}
