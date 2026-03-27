// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * A 3D physics body that can't be moved by external forces. When moved manually, it affects other bodies in its path.
 */
declare class AnimatableBody3D<Tree extends object = any> extends StaticBody3D<Tree> {
  /**
   * If `true`, the body's movement will be synchronized to the physics frame. This is useful when animating movement via {@link AnimationPlayer}, for example on moving platforms. Do **not** use together with {@link PhysicsBody3D.move_and_collide}.
   */
  sync_to_physics: boolean;
  set_sync_to_physics(value: boolean): void;
  is_sync_to_physics_enabled(): boolean;
}
