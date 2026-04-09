// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Class that can be inherited to implement custom multiplayer API networking layers via GDExtension. */
declare class MultiplayerPeerExtension extends MultiplayerPeer {
  /** Called when the multiplayer peer should be immediately closed (see {@link MultiplayerPeer.close}). */
  _close(): void;
  /**
   * Called when the connected `p_peer` should be forcibly disconnected (see {@link MultiplayerPeer.disconnect_peer}).
   */
  _disconnect_peer(p_peer: int, p_force: boolean): void;
  /** Called when the available packet count is internally requested by the {@link MultiplayerAPI}. */
  _get_available_packet_count(): int;
  /**
   * Called when the connection status is requested on the {@link MultiplayerPeer} (see {@link MultiplayerPeer.get_connection_status}).
   */
  _get_connection_status(): int;
  /** Called when the maximum allowed packet size (in bytes) is requested by the {@link MultiplayerAPI}. */
  _get_max_packet_size(): int;
  /**
   * Called when a packet needs to be received by the {@link MultiplayerAPI}, with `r_buffer_size` being the size of the binary `r_buffer` in bytes.
   */
  _get_packet(r_buffer: int, r_buffer_size: int): int;
  /**
   * Called to get the channel over which the next available packet was received. See {@link MultiplayerPeer.get_packet_channel}.
   */
  _get_packet_channel(): int;
  /**
   * Called to get the transfer mode the remote peer used to send the next available packet. See {@link MultiplayerPeer.get_packet_mode}.
   */
  _get_packet_mode(): int;
  /**
   * Called when the ID of the {@link MultiplayerPeer} who sent the most recent packet is requested (see {@link MultiplayerPeer.get_packet_peer}).
   */
  _get_packet_peer(): int;
  /**
   * Called when a packet needs to be received by the {@link MultiplayerAPI}, if {@link _get_packet} isn't implemented. Use this when extending this class via GDScript.
   */
  _get_packet_script(): PackedByteArray;
  /**
   * Called when the transfer channel to use is read on this {@link MultiplayerPeer} (see {@link MultiplayerPeer.transfer_channel}).
   */
  _get_transfer_channel(): int;
  /**
   * Called when the transfer mode to use is read on this {@link MultiplayerPeer} (see {@link MultiplayerPeer.transfer_mode}).
   */
  _get_transfer_mode(): int;
  /**
   * Called when the unique ID of this {@link MultiplayerPeer} is requested (see {@link MultiplayerPeer.get_unique_id}). The value must be between `1` and `2147483647`.
   */
  _get_unique_id(): int;
  /**
   * Called when the "refuse new connections" status is requested on this {@link MultiplayerPeer} (see {@link MultiplayerPeer.refuse_new_connections}).
   */
  _is_refusing_new_connections(): boolean;
  /**
   * Called when the "is server" status is requested on the {@link MultiplayerAPI}. See {@link MultiplayerAPI.is_server}.
   */
  _is_server(): boolean;
  /**
   * Called to check if the server can act as a relay in the current configuration. See {@link MultiplayerPeer.is_server_relay_supported}.
   */
  _is_server_relay_supported(): boolean;
  /** Called when the {@link MultiplayerAPI} is polled. See {@link MultiplayerAPI.poll}. */
  _poll(): void;
  /**
   * Called when a packet needs to be sent by the {@link MultiplayerAPI}, with `p_buffer_size` being the size of the binary `p_buffer` in bytes.
   */
  _put_packet(p_buffer: int, p_buffer_size: int): int;
  /**
   * Called when a packet needs to be sent by the {@link MultiplayerAPI}, if {@link _put_packet} isn't implemented. Use this when extending this class via GDScript.
   */
  _put_packet_script(p_buffer: PackedByteArray): int;
  /**
   * Called when the "refuse new connections" status is set on this {@link MultiplayerPeer} (see {@link MultiplayerPeer.refuse_new_connections}).
   */
  _set_refuse_new_connections(p_enable: boolean): void;
  /**
   * Called when the target peer to use is set for this {@link MultiplayerPeer} (see {@link MultiplayerPeer.set_target_peer}).
   */
  _set_target_peer(p_peer: int): void;
  /**
   * Called when the channel to use is set for this {@link MultiplayerPeer} (see {@link MultiplayerPeer.transfer_channel}).
   */
  _set_transfer_channel(p_channel: int): void;
  /**
   * Called when the transfer mode is set on this {@link MultiplayerPeer} (see {@link MultiplayerPeer.transfer_mode}).
   */
  _set_transfer_mode(p_mode: int): void;
}
