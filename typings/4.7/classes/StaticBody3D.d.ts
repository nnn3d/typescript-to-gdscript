// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * A 3D physics body that can't be moved by external forces. When moved manually, it doesn't affect other bodies in its path.
 */
declare class StaticBody3D<Tree extends object = any> extends PhysicsBody3D<Tree> {
  /**
   * The body's constant angular velocity. This does not rotate the body, but affects touching bodies, as if it were rotating.
   */
  constant_angular_velocity: Vector3;
  /**
   * The body's constant linear velocity. This does not move the body, but affects touching bodies, as if it were moving.
   */
  constant_linear_velocity: Vector3;
  /**
   * The physics material override for the body.
   * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
   */
  physics_material_override: PhysicsMaterial;
  set_constant_angular_velocity(value: Vector3): void;
  get_constant_angular_velocity(): Vector3;
  set_constant_linear_velocity(value: Vector3): void;
  get_constant_linear_velocity(): Vector3;
  set_physics_material_override(value: PhysicsMaterial): void;
  get_physics_material_override(): PhysicsMaterial;
}
