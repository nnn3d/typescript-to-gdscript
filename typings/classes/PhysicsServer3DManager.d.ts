// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for managing {@link PhysicsServer3D} implementations. */
declare interface PhysicsServer3DManager extends GodotObject {
  /**
   * Register a {@link PhysicsServer3D} implementation by passing a `name` and a {@link Callable} that returns a {@link PhysicsServer3D} object.
   */
  register_server(name: string | NodePath, create_callback: Callable): void;
  /**
   * Set the default {@link PhysicsServer3D} implementation to the one identified by `name`, if `priority` is greater than the priority of the current default implementation.
   */
  set_default_server(name: string | NodePath, priority: int): void;
}
declare const PhysicsServer3DManager: PhysicsServer3DManager;

