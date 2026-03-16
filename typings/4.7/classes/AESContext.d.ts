// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides access to AES encryption/decryption of raw data. */
declare class AESContext extends RefCounted {
  /** Close this AES context so it can be started again. See {@link start}. */
  finish(): void;
  /**
   * Get the current IV state for this context (IV gets updated when calling {@link update}). You normally don't need this function.
   * **Note:** This function only makes sense when the context is started with {@link MODE_CBC_ENCRYPT} or {@link MODE_CBC_DECRYPT}.
   */
  get_iv_state(): PackedByteArray;
  /**
   * Start the AES context in the given `mode`. A `key` of either 16 or 32 bytes must always be provided, while an `iv` (initialization vector) of exactly 16 bytes, is only needed when `mode` is either {@link MODE_CBC_ENCRYPT} or {@link MODE_CBC_DECRYPT}.
   */
  start(mode: int, key: PackedByteArray, iv?: PackedByteArray): int;
  /**
   * Run the desired operation for this AES context. Will return a {@link PackedByteArray} containing the result of encrypting (or decrypting) the given `src`. See {@link start} for mode of operation.
   * **Note:** The size of `src` must be a multiple of 16. Apply some padding if needed.
   */
  update(src: PackedByteArray): PackedByteArray;

  // enum Mode
  /** AES electronic codebook encryption mode. */
  static readonly MODE_ECB_ENCRYPT: int;
  /** AES electronic codebook decryption mode. */
  static readonly MODE_ECB_DECRYPT: int;
  /** AES cipher block chaining encryption mode. */
  static readonly MODE_CBC_ENCRYPT: int;
  /** AES cipher block chaining decryption mode. */
  static readonly MODE_CBC_DECRYPT: int;
  /** Maximum value for the mode enum. */
  static readonly MODE_MAX: int;
}
