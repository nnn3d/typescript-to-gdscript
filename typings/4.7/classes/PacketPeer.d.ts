// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstraction and base class for packet-based protocols. */
declare class PacketPeer extends RefCounted {
  /**
   * Maximum buffer size allowed when encoding {@link Variant}s. Raise this value to support heavier memory allocations.
   * The {@link put_var} method allocates memory on the stack, and the buffer used will grow automatically to the closest power of two to match the size of the {@link Variant}. If the {@link Variant} is bigger than {@link encode_buffer_max_size}, the method will error out with {@link ERR_OUT_OF_MEMORY}.
   */
  encode_buffer_max_size: int;
  set_encode_buffer_max_size(value: int): void;
  get_encode_buffer_max_size(): int;

  /** Returns the number of packets currently available in the ring-buffer. */
  get_available_packet_count(): int;
  /** Gets a raw packet. */
  get_packet(): PackedByteArray;
  /** Returns the error state of the last packet received (via {@link get_packet} and {@link get_var}). */
  get_packet_error(): int;
  /**
   * Gets a Variant. If `allow_objects` is `true`, decoding objects is allowed.
   * Internally, this uses the same decoding mechanism as the {@link @GlobalScope.bytes_to_var} method.
   * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
   */
  get_var(allow_objects?: boolean): unknown;
  /** Sends a raw packet. */
  put_packet(buffer: PackedByteArray): int;
  /**
   * Sends a {@link Variant} as a packet. If `full_objects` is `true`, encoding objects is allowed (and can potentially include code).
   * Internally, this uses the same encoding mechanism as the {@link @GlobalScope.var_to_bytes} method.
   */
  put_var(var_: unknown, full_objects?: boolean): int;
}
