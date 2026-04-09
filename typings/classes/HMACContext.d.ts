// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Used to create an HMAC for a message using a key. */
declare class HMACContext extends RefCounted {
  /** Returns the resulting HMAC. If the HMAC failed, an empty {@link PackedByteArray} is returned. */
  finish(): PackedByteArray;
  /**
   * Initializes the HMACContext. This method cannot be called again on the same HMACContext until {@link finish} has been called.
   */
  start(hash_type: int, key: PackedByteArray): int;
  /**
   * Updates the message to be HMACed. This can be called multiple times before {@link finish} is called to append `data` to the message, but cannot be called until {@link start} has been called.
   */
  update(data: PackedByteArray): int;
}
