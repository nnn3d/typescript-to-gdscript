// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * A 2D physics body that can't be moved by external forces. When moved manually, it doesn't affect other bodies in its path.
 */
declare class StaticBody2D extends PhysicsBody2D {
  /**
   * The body's constant angular velocity. This does not rotate the body, but affects touching bodies, as if it were rotating.
   */
  constant_angular_velocity: float;
  /**
   * The body's constant linear velocity. This does not move the body, but affects touching bodies, as if it were moving.
   */
  constant_linear_velocity: Vector2;
  /**
   * The physics material override for the body.
   * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
   */
  physics_material_override: PhysicsMaterial | null;
  set_constant_angular_velocity(value: float): void;
  get_constant_angular_velocity(): float;
  set_constant_linear_velocity(value: Vector2 | Vector2i): void;
  get_constant_linear_velocity(): Vector2;
  set_physics_material_override(value: PhysicsMaterial | null): void;
  get_physics_material_override(): PhysicsMaterial | null;
}
