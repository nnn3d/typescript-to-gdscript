// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for managing {@link NavigationServer3D} implementations. */
declare interface NavigationServer3DManager extends GodotObject {
  /**
   * Registers a {@link NavigationServer3D} implementation by passing a `name` and a {@link Callable} that returns a {@link NavigationServer3D} object.
   */
  register_server(name: string | NodePath, create_callback: Callable): void;
  /**
   * Sets the default {@link NavigationServer3D} implementation to the one identified by `name`, if `priority` is greater than the priority of the current default implementation.
   */
  set_default_server(name: string | NodePath, priority: int): void;
}
declare const NavigationServer3DManager: NavigationServer3DManager;

