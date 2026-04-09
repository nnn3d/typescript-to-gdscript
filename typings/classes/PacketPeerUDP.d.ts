// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** UDP packet peer. */
declare class PacketPeerUDP extends PacketPeer {
  /**
   * Binds this {@link PacketPeerUDP} to the specified `port` and `bind_address` with a buffer size `recv_buf_size`, allowing it to receive incoming packets.
   * If `bind_address` is set to `"*"` (default), the peer will be bound on all available addresses (both IPv4 and IPv6).
   * If `bind_address` is set to `"0.0.0.0"` (for IPv4) or `"::"` (for IPv6), the peer will be bound to all available addresses matching that IP type.
   * If `bind_address` is set to any valid address (e.g. `"192.168.1.101"`, `"::1"`, etc.), the peer will only be bound to the interface with that address (or fail if no interface with the given address exists).
   */
  bind(port: int, bind_address?: string, recv_buf_size?: int): int;
  /** Closes the {@link PacketPeerUDP}'s underlying UDP socket. */
  close(): void;
  /**
   * Calling this method connects this UDP peer to the given `host`/`port` pair. UDP is in reality connectionless, so this option only means that incoming packets from different addresses are automatically discarded, and that outgoing packets are always sent to the connected address (future calls to {@link set_dest_address} are not allowed). This method does not send any data to the remote peer, to do that, use {@link PacketPeer.put_var} or {@link PacketPeer.put_packet} as usual. See also {@link UDPServer}.
   * **Note:** Connecting to the remote peer does not help to protect from malicious attacks like IP spoofing, etc. Think about using an encryption technique like TLS or DTLS if you feel like your application is transferring sensitive information.
   */
  connect_to_host(host: string, port: int): int;
  /** Returns the local port to which this peer is bound. */
  get_local_port(): int;
  /**
   * Returns the IP of the remote peer that sent the last packet(that was received with {@link PacketPeer.get_packet} or {@link PacketPeer.get_var}).
   */
  get_packet_ip(): string;
  /**
   * Returns the port of the remote peer that sent the last packet(that was received with {@link PacketPeer.get_packet} or {@link PacketPeer.get_var}).
   */
  get_packet_port(): int;
  /** Returns whether this {@link PacketPeerUDP} is bound to an address and can receive packets. */
  is_bound(): boolean;
  /**
   * Returns `true` if the UDP socket is open and has been connected to a remote address. See {@link connect_to_host}.
   */
  is_socket_connected(): boolean;
  /**
   * Joins the multicast group specified by `multicast_address` using the interface identified by `interface_name`.
   * You can join the same multicast group with multiple interfaces. Use {@link IP.get_local_interfaces} to know which are available.
   * **Note:** Some Android devices might require the `CHANGE_WIFI_MULTICAST_STATE` permission for multicast to work.
   */
  join_multicast_group(multicast_address: string, interface_name: string): int;
  /**
   * Removes the interface identified by `interface_name` from the multicast group specified by `multicast_address`.
   */
  leave_multicast_group(multicast_address: string, interface_name: string): int;
  /**
   * Enable or disable sending of broadcast packets (e.g. `set_dest_address("255.255.255.255", 4343)`. This option is disabled by default.
   * **Note:** Some Android devices might require the `CHANGE_WIFI_MULTICAST_STATE` permission and this option to be enabled to receive broadcast packets too.
   */
  set_broadcast_enabled(enabled: boolean): void;
  /**
   * Sets the destination address and port for sending packets and variables. A hostname will be resolved using DNS if needed.
   * **Note:** {@link set_broadcast_enabled} must be enabled before sending packets to a broadcast address (e.g. `255.255.255.255`).
   */
  set_dest_address(host: string, port: int): int;
  /**
   * Waits for a packet to arrive on the bound address. See {@link bind}.
   * **Note:** {@link wait} can't be interrupted once it has been called. This can be worked around by allowing the other party to send a specific "death pill" packet like this:
   */
  wait(): int;
}
