// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A stream peer used to handle binary data streams. */
declare class StreamPeerBuffer extends StreamPeer {
  /** The underlying data buffer. Setting this value resets the cursor. */
  data_array: PackedByteArray;

  /** Clears the {@link data_array} and resets the cursor. */
  clear(): void;
  /** Returns a new {@link StreamPeerBuffer} with the same {@link data_array} content. */
  duplicate(): StreamPeerBuffer;
  /** Returns the current cursor position. */
  get_position(): int;
  /** Returns the size of {@link data_array}. */
  get_size(): int;
  /** Resizes the {@link data_array}. This *doesn't* update the cursor. */
  resize(size: int): void;
  /** Moves the cursor to the specified position. `position` must be a valid index of {@link data_array}. */
  seek(position: int): void;
}
