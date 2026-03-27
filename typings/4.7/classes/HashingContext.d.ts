// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides functionality for computing cryptographic hashes chunk by chunk. */
declare class HashingContext extends RefCounted {
  /** Closes the current context, and return the computed hash. */
  finish(): PackedByteArray;
  /**
   * Starts a new hash computation of the given `type` (e.g. {@link HASH_SHA256} to start computation of an SHA-256).
   */
  start(type_: int): int;
  /** Updates the computation with the given `chunk` of data. */
  update(chunk: PackedByteArray): int;

  // enum HashType
  /** Hashing algorithm: MD5. */
  static readonly HASH_MD5: int;
  /** Hashing algorithm: SHA-1. */
  static readonly HASH_SHA1: int;
  /** Hashing algorithm: SHA-256. */
  static readonly HASH_SHA256: int;
}
