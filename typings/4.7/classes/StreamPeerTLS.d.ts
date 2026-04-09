// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A stream peer that handles TLS connections. */
declare class StreamPeerTLS extends StreamPeer {
  /**
   * Accepts a peer connection as a server using the given `server_options`. See {@link TLSOptions.server}.
   */
  accept_stream(stream: StreamPeer, server_options: TLSOptions): int;
  /**
   * Connects to a peer using an underlying {@link StreamPeer} `stream` and verifying the remote certificate is correctly signed for the given `common_name`. You can pass the optional `client_options` parameter to customize the trusted certification authorities, or disable the common name verification. See {@link TLSOptions.client} and {@link TLSOptions.client_unsafe}.
   */
  connect_to_stream(stream: StreamPeer, common_name: string, client_options?: TLSOptions): int;
  /** Disconnects from host. */
  disconnect_from_stream(): void;
  /** Returns the status of the connection. */
  get_status(): int;
  /**
   * Returns the underlying {@link StreamPeer} connection, used in {@link accept_stream} or {@link connect_to_stream}.
   */
  get_stream(): StreamPeer | null;
  /**
   * Poll the connection to check for incoming bytes. Call this right before {@link StreamPeer.get_available_bytes} for it to work properly.
   */
  poll(): void;

  // enum Status
  /** A status representing a {@link StreamPeerTLS} that is disconnected. */
  static readonly STATUS_DISCONNECTED: int;
  /** A status representing a {@link StreamPeerTLS} during handshaking. */
  static readonly STATUS_HANDSHAKING: int;
  /** A status representing a {@link StreamPeerTLS} that is connected to a host. */
  static readonly STATUS_CONNECTED: int;
  /** A status representing a {@link StreamPeerTLS} in error state. */
  static readonly STATUS_ERROR: int;
  /**
   * An error status that shows a mismatch in the TLS certificate domain presented by the host and the domain requested for validation.
   */
  static readonly STATUS_ERROR_HOSTNAME_MISMATCH: int;
}
