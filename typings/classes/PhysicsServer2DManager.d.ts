// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for managing {@link PhysicsServer2D} implementations. */
declare interface PhysicsServer2DManager extends GodotObject {
  /**
   * Register a {@link PhysicsServer2D} implementation by passing a `name` and a {@link Callable} that returns a {@link PhysicsServer2D} object.
   */
  register_server(name: string, create_callback: Callable): void;
  /**
   * Set the default {@link PhysicsServer2D} implementation to the one identified by `name`, if `priority` is greater than the priority of the current default implementation.
   */
  set_default_server(name: string, priority: int): void;
}
declare const PhysicsServer2DManager: PhysicsServer2DManager;

