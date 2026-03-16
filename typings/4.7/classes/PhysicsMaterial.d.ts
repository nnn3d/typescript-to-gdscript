// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Holds physics-related properties of a surface, namely its roughness and bounciness. */
declare class PhysicsMaterial extends Resource {
  /** If `true`, subtracts the bounciness from the colliding object's bounciness instead of adding it. */
  absorbent: boolean;
  /**
   * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
   * **Note:** Even with {@link bounce} set to `1.0`, some energy will be lost over time due to linear and angular damping. To have a physics body that preserves all its energy over time, set {@link bounce} to `1.0`, the body's linear damp mode to **Replace** (if applicable), its linear damp to `0.0`, its angular damp mode to **Replace** (if applicable), and its angular damp to `0.0`.
   */
  bounce: float;
  /** The body's friction. Values range from `0` (frictionless) to `1` (maximum friction). */
  friction: float;
  /**
   * If `true`, the physics engine will use the friction of the object marked as "rough" when two objects collide. If `false`, the physics engine will use the lowest friction of all colliding objects instead. If `true` for both colliding objects, the physics engine will use the highest friction.
   */
  rough: boolean;
}
