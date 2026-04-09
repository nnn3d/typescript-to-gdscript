// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for interacting with socket streams. */
declare class StreamPeerSocket extends StreamPeer {
  /** Disconnects from host. */
  disconnect_from_host(): void;
  /** Returns the status of the connection. */
  get_status(): int;
  /** Polls the socket, updating its state. See {@link get_status}. */
  poll(): int;

  // enum Status
  /** The initial status of the {@link StreamPeerSocket}. This is also the status after disconnecting. */
  static readonly STATUS_NONE: int;
  /** A status representing a {@link StreamPeerSocket} that is connecting to a host. */
  static readonly STATUS_CONNECTING: int;
  /** A status representing a {@link StreamPeerSocket} that is connected to a host. */
  static readonly STATUS_CONNECTED: int;
  /** A status representing a {@link StreamPeerSocket} in error state. */
  static readonly STATUS_ERROR: int;
}
