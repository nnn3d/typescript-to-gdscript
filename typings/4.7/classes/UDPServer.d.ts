// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Helper class to implement a UDP server. */
declare class UDPServer extends RefCounted {
  /**
   * Define the maximum number of pending connections, during {@link poll}, any new pending connection exceeding that value will be automatically dropped. Setting this value to `0` effectively prevents any new pending connection to be accepted (e.g. when all your players have connected).
   */
  max_pending_connections: int;
  set_max_pending_connections(value: int): void;
  get_max_pending_connections(): int;

  /** Returns the local port this server is listening to. */
  get_local_port(): int;
  /** Returns `true` if a packet with a new address/port combination was received on the socket. */
  is_connection_available(): boolean;
  /** Returns `true` if the socket is open and listening on a port. */
  is_listening(): boolean;
  /**
   * Starts the server by opening a UDP socket listening on the given `port`. You can optionally specify a `bind_address` to only listen for packets sent to that address. See also {@link PacketPeerUDP.bind}.
   */
  listen(port: int, bind_address?: string): int;
  /**
   * Call this method at regular intervals (e.g. inside {@link Node._process}) to process new packets. Any packet from a known address/port pair will be delivered to the appropriate {@link PacketPeerUDP}, while any packet received from an unknown address/port pair will be added as a pending connection (see {@link is_connection_available} and {@link take_connection}). The maximum number of pending connections is defined via {@link max_pending_connections}.
   */
  poll(): int;
  /**
   * Stops the server, closing the UDP socket if open. Will close all connected {@link PacketPeerUDP} accepted via {@link take_connection} (remote peers will not be notified).
   */
  stop(): void;
  /**
   * Returns the first pending connection (connected to the appropriate address/port). Will return `null` if no new connection is available. See also {@link is_connection_available}, {@link PacketPeerUDP.connect_to_host}.
   */
  take_connection(): PacketPeerUDP;
}
