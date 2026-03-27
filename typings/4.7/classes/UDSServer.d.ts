// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A Unix Domain Socket (UDS) server. */
declare class UDSServer extends SocketServer {
  /**
   * Listens on the socket at `path`. The socket file will be created at the specified path.
   * **Note:** The socket file must not already exist at the specified path. You may need to remove any existing socket file before calling this method.
   */
  listen(path: string): int;
  /** If a connection is available, returns a StreamPeerUDS with the connection. */
  take_connection(): StreamPeerUDS;
}
