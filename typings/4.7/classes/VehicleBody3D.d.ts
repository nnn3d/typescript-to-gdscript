// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D physics body that simulates the behavior of a car. */
declare class VehicleBody3D extends RigidBody3D {
  /**
   * Slows down the vehicle by applying a braking force. The vehicle is only slowed down if the wheels are in contact with a surface. The force you need to apply to adequately slow down your vehicle depends on the {@link RigidBody3D.mass} of the vehicle. For a vehicle with a mass set to 1000, try a value in the 25 - 30 range for hard braking.
   */
  brake: float;
  /**
   * Accelerates the vehicle by applying an engine force. The vehicle is only sped up if the wheels that have {@link VehicleWheel3D.use_as_traction} set to `true` and are in contact with a surface. The {@link RigidBody3D.mass} of the vehicle has an effect on the acceleration of the vehicle. For a vehicle with a mass set to 1000, try a value in the 25 - 50 range for acceleration.
   * **Note:** The simulation does not take the effect of gears into account, you will need to add logic for this if you wish to simulate gears.
   * A negative value will result in the vehicle reversing.
   */
  engine_force: float;
  /**
   * <member name="steering" type="float" setter="set_steering" getter="get_steering" default="0.0">
   * The steering angle for the vehicle. Setting this to a non-zero value will result in the vehicle turning when it's moving. Wheels that have {@link VehicleWheel3D.use_as_steering} set to `true` will automatically be rotated.
   * **Note:** This property is edited in the inspector in degrees. In code the property is set in radians.
   */
  mass: float;
  set_brake(value: float): void;
  get_brake(): float;
  set_engine_force(value: float): void;
  get_engine_force(): float;
}
