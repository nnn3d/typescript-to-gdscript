// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A stream peer that handles TCP connections. */
declare class StreamPeerTCP extends StreamPeerSocket {
  /**
   * Opens the TCP socket, and binds it to the specified local address.
   * This method is generally not needed, and only used to force the subsequent call to {@link connect_to_host} to use the specified `host` and `port` as source address. This can be desired in some NAT punchthrough techniques, or when forcing the source network interface.
   */
  bind(port: int, host?: string | NodePath): int;
  /**
   * Connects to the specified `host:port` pair. A hostname will be resolved if valid. Returns {@link OK} on success.
   */
  connect_to_host(host: string | NodePath, port: int): int;
  /** Returns the IP of this peer. */
  get_connected_host(): string;
  /** Returns the port of this peer. */
  get_connected_port(): int;
  /** Returns the local port to which this peer is bound. */
  get_local_port(): int;
  /**
   * If `enabled` is `true`, packets will be sent immediately. If `enabled` is `false` (the default), packet transfers will be delayed and combined using Nagle's algorithm (https://en.wikipedia.org/wiki/Nagle%27s_algorithm).
   * **Note:** It's recommended to leave this disabled for applications that send large packets or need to transfer a lot of data, as enabling this can decrease the total available bandwidth.
   */
  set_no_delay(enabled: boolean): void;
}
