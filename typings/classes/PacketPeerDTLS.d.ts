// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** DTLS packet peer. */
declare class PacketPeerDTLS extends PacketPeer {
  /**
   * Connects a `packet_peer` beginning the DTLS handshake using the underlying {@link PacketPeerUDP} which must be connected (see {@link PacketPeerUDP.connect_to_host}). You can optionally specify the `client_options` to be used while verifying the TLS connections. See {@link TLSOptions.client} and {@link TLSOptions.client_unsafe}.
   */
  connect_to_peer(packet_peer: PacketPeerUDP, hostname: string | NodePath, client_options?: TLSOptions): int;
  /** Disconnects this peer, terminating the DTLS session. */
  disconnect_from_peer(): void;
  /** Returns the status of the connection. */
  get_status(): int;
  /**
   * Poll the connection to check for incoming packets. Call this frequently to update the status and keep the connection working.
   */
  poll(): void;

  // enum Status
  /** A status representing a {@link PacketPeerDTLS} that is disconnected. */
  static readonly STATUS_DISCONNECTED: int;
  /**
   * A status representing a {@link PacketPeerDTLS} that is currently performing the handshake with a remote peer.
   */
  static readonly STATUS_HANDSHAKING: int;
  /** A status representing a {@link PacketPeerDTLS} that is connected to a remote peer. */
  static readonly STATUS_CONNECTED: int;
  /** A status representing a {@link PacketPeerDTLS} in a generic error state. */
  static readonly STATUS_ERROR: int;
  /**
   * An error status that shows a mismatch in the DTLS certificate domain presented by the host and the domain requested for validation.
   */
  static readonly STATUS_ERROR_HOSTNAME_MISMATCH: int;
}
