// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A stream peer that handles GZIP and deflate compression/decompression. */
declare class StreamPeerGZIP extends StreamPeer {
  /** Clears this stream, resetting the internal state. */
  clear(): void;
  /**
   * Finalizes the stream, compressing any buffered chunk left.
   * You must call it only when you are compressing.
   */
  finish(): int;
  /**
   * Start the stream in compression mode with the given `buffer_size`, if `use_deflate` is `true` uses deflate instead of GZIP.
   */
  start_compression(use_deflate?: boolean, buffer_size?: int): int;
  /**
   * Start the stream in decompression mode with the given `buffer_size`, if `use_deflate` is `true` uses deflate instead of GZIP.
   */
  start_decompression(use_deflate?: boolean, buffer_size?: int): int;
}
