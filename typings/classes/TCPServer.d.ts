// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A TCP server. */
declare class TCPServer extends SocketServer {
  /** Returns the local port this server is listening to. */
  get_local_port(): int;
  /**
   * Listen on the `port` binding to `bind_address`.
   * If `bind_address` is set as `"*"` (default), the server will listen on all available addresses (both IPv4 and IPv6).
   * If `bind_address` is set as `"0.0.0.0"` (for IPv4) or `"::"` (for IPv6), the server will listen on all available addresses matching that IP type.
   * If `bind_address` is set to any valid address (e.g. `"192.168.1.101"`, `"::1"`, etc.), the server will only listen on the interface with that address (or fail if no interface with the given address exists).
   */
  listen(port: int, bind_address?: string): int;
  /** If a connection is available, returns a StreamPeerTCP with the connection. */
  take_connection(): StreamPeerTCP | null;
}
