// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for managing {@link TextServer} implementations. */
declare interface TextServerManager extends GodotObject {
  /** Registers a {@link TextServer} interface. */
  add_interface(interface_: TextServer): void;
  /** Finds an interface by its `name`. */
  find_interface(name: string): TextServer | null;
  /** Returns the interface registered at a given index. */
  get_interface(idx: int): TextServer | null;
  /** Returns the number of interfaces currently registered. */
  get_interface_count(): int;
  /** Returns a list of available interfaces, with the index and name of each interface. */
  get_interfaces(): Array<Dictionary>;
  /** Returns the primary {@link TextServer} interface currently in use. */
  get_primary_interface(): TextServer;
  /**
   * Removes an interface. All fonts and shaped text caches should be freed before removing an interface.
   */
  remove_interface(interface_: TextServer): void;
  /** Sets the primary {@link TextServer} interface. */
  set_primary_interface(index: TextServer): void;

  /** Emitted when a new interface has been added. */
  interface_added: Signal<[string]>;
  /** Emitted when an interface is removed. */
  interface_removed: Signal<[string]>;
}
declare const TextServerManager: TextServerManager;

