// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A stream peer that handles UNIX Domain Socket (UDS) connections. */
declare class StreamPeerUDS extends StreamPeerSocket {
  /**
   * Opens the UDS socket, and binds it to the specified socket path.
   * This method is generally not needed, and only used to force the subsequent call to {@link connect_to_host} to use the specified `path` as the source address.
   */
  bind(path: string): int;
  /** Connects to the specified UNIX Domain Socket path. Returns {@link OK} on success. */
  connect_to_host(path: string): int;
  /** Returns the socket path of this peer. */
  get_connected_path(): string;
}
