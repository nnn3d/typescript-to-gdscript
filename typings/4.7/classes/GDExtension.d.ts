// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A native library for GDExtension. */
declare class GDExtension extends Resource {
  /**
   * Returns the lowest level required for this extension to be properly initialized (see the {@link InitializationLevel} enum).
   */
  get_minimum_library_initialization_level(): int;
  /** Returns `true` if this extension's library has been opened. */
  is_library_open(): boolean;

  // enum InitializationLevel
  /** The library is initialized at the same time as the core features of the engine. */
  static readonly INITIALIZATION_LEVEL_CORE: int;
  /**
   * The library is initialized at the same time as the engine's servers (such as {@link RenderingServer} or {@link PhysicsServer3D}).
   */
  static readonly INITIALIZATION_LEVEL_SERVERS: int;
  /** The library is initialized at the same time as the engine's scene-related classes. */
  static readonly INITIALIZATION_LEVEL_SCENE: int;
  /**
   * The library is initialized at the same time as the engine's editor classes. Only happens when loading the GDExtension in the editor.
   */
  static readonly INITIALIZATION_LEVEL_EDITOR: int;
}
