// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract base class for interacting with streams. */
declare class StreamPeer extends RefCounted {
  /** If `true`, this {@link StreamPeer} will using big-endian format for encoding and decoding. */
  big_endian: boolean;
  set_big_endian(value: boolean): void;
  is_big_endian_enabled(): boolean;

  /** Gets a signed byte from the stream. */
  get_8(): int;
  /** Gets a signed 16-bit value from the stream. */
  get_16(): int;
  /** Gets a signed 32-bit value from the stream. */
  get_32(): int;
  /** Gets a signed 64-bit value from the stream. */
  get_64(): int;
  /** Returns the number of bytes this {@link StreamPeer} has available. */
  get_available_bytes(): int;
  /**
   * Returns a chunk data with the received bytes, as an {@link Array} containing two elements: an {@link Error} constant and a {@link PackedByteArray}. `bytes` is the number of bytes to be received. If not enough bytes are available, the function will block until the desired amount is received.
   */
  get_data(bytes: int): Array<unknown>;
  /** Gets a double-precision float from the stream. */
  get_double(): float;
  /** Gets a single-precision float from the stream. */
  get_float(): float;
  /** Gets a half-precision float from the stream. */
  get_half(): float;
  /**
   * Returns a chunk data with the received bytes, as an {@link Array} containing two elements: an {@link Error} constant and a {@link PackedByteArray}. `bytes` is the number of bytes to be received. If not enough bytes are available, the function will return how many were actually received.
   */
  get_partial_data(bytes: int): Array<unknown>;
  /**
   * Gets an ASCII string with byte-length `bytes` from the stream. If `bytes` is negative (default) the length will be read from the stream using the reverse process of {@link put_string}.
   */
  get_string(bytes?: int): string;
  /** Gets an unsigned byte from the stream. */
  get_u8(): int;
  /** Gets an unsigned 16-bit value from the stream. */
  get_u16(): int;
  /** Gets an unsigned 32-bit value from the stream. */
  get_u32(): int;
  /** Gets an unsigned 64-bit value from the stream. */
  get_u64(): int;
  /**
   * Gets a UTF-8 string with byte-length `bytes` from the stream (this decodes the string sent as UTF-8). If `bytes` is negative (default) the length will be read from the stream using the reverse process of {@link put_utf8_string}.
   */
  get_utf8_string(bytes?: int): string;
  /**
   * Gets a Variant from the stream. If `allow_objects` is `true`, decoding objects is allowed.
   * Internally, this uses the same decoding mechanism as the {@link @GlobalScope.bytes_to_var} method.
   * **Warning:** Deserialized objects can contain code which gets executed. Do not use this option if the serialized object comes from untrusted sources to avoid potential security threats such as remote code execution.
   */
  get_var(allow_objects?: boolean): unknown;
  /** Puts a signed byte into the stream. */
  put_8(value: int): void;
  /** Puts a signed 16-bit value into the stream. */
  put_16(value: int): void;
  /** Puts a signed 32-bit value into the stream. */
  put_32(value: int): void;
  /** Puts a signed 64-bit value into the stream. */
  put_64(value: int): void;
  /**
   * Sends a chunk of data through the connection, blocking if necessary until the data is done sending. This function returns an {@link Error} code.
   */
  put_data(data: PackedByteArray): int;
  /** Puts a double-precision float into the stream. */
  put_double(value: float): void;
  /** Puts a single-precision float into the stream. */
  put_float(value: float): void;
  /** Puts a half-precision float into the stream. */
  put_half(value: float): void;
  /**
   * Sends a chunk of data through the connection. If all the data could not be sent at once, only part of it will. This function returns two values, an {@link Error} code and an integer, describing how much data was actually sent.
   */
  put_partial_data(data: PackedByteArray): Array<unknown>;
  /**
   * Puts a zero-terminated ASCII string into the stream prepended by a 32-bit unsigned integer representing its size.
   * **Note:** To put an ASCII string without prepending its size, you can use {@link put_data}:
   */
  put_string(value: string): void;
  /** Puts an unsigned byte into the stream. */
  put_u8(value: int): void;
  /** Puts an unsigned 16-bit value into the stream. */
  put_u16(value: int): void;
  /** Puts an unsigned 32-bit value into the stream. */
  put_u32(value: int): void;
  /** Puts an unsigned 64-bit value into the stream. */
  put_u64(value: int): void;
  /**
   * Puts a zero-terminated UTF-8 string into the stream prepended by a 32 bits unsigned integer representing its size.
   * **Note:** To put a UTF-8 string without prepending its size, you can use {@link put_data}:
   */
  put_utf8_string(value: string): void;
  /**
   * Puts a Variant into the stream. If `full_objects` is `true` encoding objects is allowed (and can potentially include code).
   * Internally, this uses the same encoding mechanism as the {@link @GlobalScope.var_to_bytes} method.
   */
  put_var(value: unknown, full_objects?: boolean): void;
}
