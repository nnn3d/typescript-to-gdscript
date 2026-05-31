// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Efficiently packs and serializes {@link Array} or {@link Dictionary}. */
declare class PackedDataContainer extends Resource {
  /**
   * Packs the given container into a binary representation. The `value` must be either {@link Array} or {@link Dictionary}, any other type will result in invalid data error.
   * **Note:** Subsequent calls to this method will overwrite the existing data.
   */
  pack(value: unknown): int;
  /** Returns the size of the packed container (see {@link Array.size} and {@link Dictionary.size}). */
  size(): int;
}
