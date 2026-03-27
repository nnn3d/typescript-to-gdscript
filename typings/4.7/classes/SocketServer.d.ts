// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** An abstract class for servers based on sockets. */
declare class SocketServer extends RefCounted {
  /** Returns `true` if a connection is available for taking. */
  is_connection_available(): boolean;
  /** Returns `true` if the server is currently listening for connections. */
  is_listening(): boolean;
  /** Stops listening. */
  stop(): void;
  /** If a connection is available, returns a StreamPeerSocket with the connection. */
  take_socket_connection(): StreamPeerSocket;
}
