// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for reference-counted objects. */
declare class RefCounted extends GodotObject {
  /** Returns the current reference count. */
  get_reference_count(): int;
  /**
   * Initializes the internal reference counter. Use this only if you really know what you are doing.
   * Returns whether the initialization was successful.
   */
  init_ref(): boolean;
  /**
   * Increments the internal reference counter. Use this only if you really know what you are doing.
   * Returns `true` if the increment was successful, `false` otherwise.
   */
  reference(): boolean;
  /**
   * Decrements the internal reference counter. Use this only if you really know what you are doing.
   * Returns `true` if the object should be freed after the decrement, `false` otherwise.
   */
  unreference(): boolean;
}
