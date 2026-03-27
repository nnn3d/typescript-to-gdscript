// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Helper class to implement a DTLS server. */
declare class DTLSServer extends RefCounted {
  /** Setup the DTLS server to use the given `server_options`. See {@link TLSOptions.server}. */
  setup(server_options: TLSOptions): int;
  /**
   * Try to initiate the DTLS handshake with the given `udp_peer` which must be already connected (see {@link PacketPeerUDP.connect_to_host}).
   * **Note:** You must check that the state of the return PacketPeerUDP is {@link PacketPeerDTLS.STATUS_HANDSHAKING}, as it is normal that 50% of the new connections will be invalid due to cookie exchange.
   */
  take_connection(udp_peer: PacketPeerUDP): PacketPeerDTLS;
}
