// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract class for specialized {@link PacketPeer}s used by the {@link MultiplayerAPI}. */
declare class MultiplayerPeer extends PacketPeer {
  /** If `true`, this {@link MultiplayerPeer} refuses new connections. */
  refuse_new_connections: boolean;
  /**
   * The channel to use to send packets. Many network APIs such as ENet and WebRTC allow the creation of multiple independent channels which behaves, in a way, like separate connections. This means that reliable data will only block delivery of other packets on that channel, and ordering will only be in respect to the channel the packet is being sent on. Using different channels to send **different and independent** state updates is a common way to optimize network usage and decrease latency in fast-paced games.
   * **Note:** The default channel (`0`) actually works as 3 separate channels (one for each {@link TransferMode}) so that {@link TRANSFER_MODE_RELIABLE} and {@link TRANSFER_MODE_UNRELIABLE_ORDERED} does not interact with each other by default. Refer to the specific network API documentation (e.g. ENet or WebRTC) to learn how to set up channels correctly.
   */
  transfer_channel: int;
  /** The manner in which to send packets to the target peer. See the {@link set_target_peer} method. */
  transfer_mode: int;
  set_refuse_new_connections(value: boolean): void;
  is_refusing_new_connections(): boolean;
  set_transfer_channel(value: int): void;
  get_transfer_channel(): int;
  set_transfer_mode(value: int): void;
  get_transfer_mode(): int;

  /**
   * Immediately close the multiplayer peer returning to the state {@link CONNECTION_DISCONNECTED}. Connected peers will be dropped without emitting {@link peer_disconnected}.
   */
  close(): void;
  /**
   * Disconnects the given `peer` from this host. If `force` is `true` the {@link peer_disconnected} signal will not be emitted for this peer.
   */
  disconnect_peer(peer: int, force?: boolean): void;
  /** Returns a randomly generated integer that can be used as a network unique ID. */
  generate_unique_id(): int;
  /** Returns the current state of the connection. */
  get_connection_status(): int;
  /**
   * Returns the channel over which the next available packet was received. See {@link PacketPeer.get_available_packet_count}.
   */
  get_packet_channel(): int;
  /**
   * Returns the transfer mode the remote peer used to send the next available packet. See {@link PacketPeer.get_available_packet_count}.
   */
  get_packet_mode(): int;
  /**
   * Returns the ID of the {@link MultiplayerPeer} who sent the next available packet. See {@link PacketPeer.get_available_packet_count}.
   */
  get_packet_peer(): int;
  /** Returns the ID of this {@link MultiplayerPeer}. */
  get_unique_id(): int;
  /**
   * Returns `true` if the server can act as a relay in the current configuration. That is, if the higher level {@link MultiplayerAPI} should notify connected clients of other peers, and implement a relay protocol to allow communication between them.
   */
  is_server_relay_supported(): boolean;
  /** Waits up to 1 second to receive a new network event. */
  poll(): void;
  /**
   * Sets the peer to which packets will be sent.
   * The `id` can be one of: {@link TARGET_PEER_BROADCAST} to send to all connected peers, {@link TARGET_PEER_SERVER} to send to the peer acting as server, a valid peer ID to send to that specific peer, a negative peer ID to send to all peers except that one. By default, the target peer is {@link TARGET_PEER_BROADCAST}.
   */
  set_target_peer(id: int): void;

  /** Emitted when a remote peer connects. */
  peer_connected: Signal<[int]>;
  /** Emitted when a remote peer has disconnected. */
  peer_disconnected: Signal<[int]>;

  // enum ConnectionStatus
  /** The MultiplayerPeer is disconnected. */
  static readonly CONNECTION_DISCONNECTED: int;
  /** The MultiplayerPeer is currently connecting to a server. */
  static readonly CONNECTION_CONNECTING: int;
  /** This MultiplayerPeer is connected. */
  static readonly CONNECTION_CONNECTED: int;
  // enum TransferMode
  /**
   * Packets are not acknowledged, no resend attempts are made for lost packets. Packets may arrive in any order. Potentially faster than {@link TRANSFER_MODE_UNRELIABLE_ORDERED}. Use for non-critical data, and always consider whether the order matters.
   */
  static readonly TRANSFER_MODE_UNRELIABLE: int;
  /**
   * Packets are not acknowledged, no resend attempts are made for lost packets. Packets are received in the order they were sent in. Potentially faster than {@link TRANSFER_MODE_RELIABLE}. Use for non-critical data or data that would be outdated if received late due to resend attempt(s) anyway, for example movement and positional data.
   */
  static readonly TRANSFER_MODE_UNRELIABLE_ORDERED: int;
  /**
   * Packets must be received and resend attempts should be made until the packets are acknowledged. Packets must be received in the order they were sent in. Most reliable transfer mode, but potentially the slowest due to the overhead. Use for critical data that must be transmitted and arrive in order, for example an ability being triggered or a chat message. Consider carefully if the information really is critical, and use sparingly.
   */
  static readonly TRANSFER_MODE_RELIABLE: int;

  /** Packets are sent to all connected peers. */
  static readonly TARGET_PEER_BROADCAST: int;
  /** Packets are sent to the remote peer acting as server. */
  static readonly TARGET_PEER_SERVER: int;
}
