// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A 2D physics body that can't be moved by external forces. When moved manually, it affects other bodies in its path.
 */
declare class AnimatableBody2D extends StaticBody2D {
  /**
   * If `true`, the body's movement will be synchronized to the physics frame. This is useful when animating movement via {@link AnimationPlayer}, for example on moving platforms. Do **not** use together with {@link PhysicsBody2D.move_and_collide}.
   */
  sync_to_physics: boolean;
  set_sync_to_physics(value: boolean): void;
  is_sync_to_physics_enabled(): boolean;
}
