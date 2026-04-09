// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides access to GDExtension functionality. */
declare interface GDExtensionManager extends GodotObject {
  /**
   * Returns the {@link GDExtension} at the given file `path`, or `null` if it has not been loaded or does not exist.
   */
  get_extension(path: string): GDExtension | null;
  /** Returns the file paths of all currently loaded extensions. */
  get_loaded_extensions(): PackedStringArray;
  /**
   * Returns `true` if the extension at the given file `path` has already been loaded successfully. See also {@link get_loaded_extensions}.
   */
  is_extension_loaded(path: string): boolean;
  /**
   * Loads an extension by absolute file path. The `path` needs to point to a valid {@link GDExtension}. Returns {@link LOAD_STATUS_OK} if successful.
   */
  load_extension(path: string): int;
  /**
   * Loads the extension already in address space via the given path and initialization function. The `path` needs to be unique and start with `"libgodot://"`. Returns {@link LOAD_STATUS_OK} if successful.
   */
  load_extension_from_function(path: string, init_func: unknown): int;
  /**
   * Reloads the extension at the given file path. The `path` needs to point to a valid {@link GDExtension}, otherwise this method may return either {@link LOAD_STATUS_NOT_LOADED} or {@link LOAD_STATUS_FAILED}.
   * **Note:** You can only reload extensions in the editor. In release builds, this method always fails and returns {@link LOAD_STATUS_FAILED}.
   */
  reload_extension(path: string): int;
  /**
   * Unloads an extension by file path. The `path` needs to point to an already loaded {@link GDExtension}, otherwise this method returns {@link LOAD_STATUS_NOT_LOADED}.
   */
  unload_extension(path: string): int;

  /**
   * Emitted after the editor has finished loading a new extension.
   * **Note:** This signal is only emitted in editor builds.
   */
  extension_loaded: Signal<[GDExtension]>;
  /**
   * Emitted before the editor starts unloading an extension.
   * **Note:** This signal is only emitted in editor builds.
   */
  extension_unloading: Signal<[GDExtension]>;
  /** Emitted after the editor has finished reloading one or more extensions. */
  extensions_reloaded: Signal<[]>;

  // enum LoadStatus
  /** The extension has loaded successfully. */
  readonly LOAD_STATUS_OK: int;
  /** The extension has failed to load, possibly because it does not exist or has missing dependencies. */
  readonly LOAD_STATUS_FAILED: int;
  /** The extension has already been loaded. */
  readonly LOAD_STATUS_ALREADY_LOADED: int;
  /** The extension has not been loaded. */
  readonly LOAD_STATUS_NOT_LOADED: int;
  /** The extension requires the application to restart to fully load. */
  readonly LOAD_STATUS_NEEDS_RESTART: int;
}
declare const GDExtensionManager: GDExtensionManager;

