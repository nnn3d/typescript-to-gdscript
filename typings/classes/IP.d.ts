// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Internet protocol (IP) support functions such as DNS resolution. */
declare interface IP extends GodotObject {
  /**
   * Removes all of a `hostname`'s cached references. If no `hostname` is given, all cached IP addresses are removed.
   */
  clear_cache(hostname?: string | NodePath): void;
  /**
   * Removes a given item `id` from the queue. This should be used to free a queue after it has completed to enable more queries to happen.
   */
  erase_resolve_item(id: int): void;
  /** Returns all the user's current IPv4 and IPv6 addresses as an array. */
  get_local_addresses(): PackedStringArray;
  /**
   * Returns all network adapters as an array.
   * Each adapter is a dictionary of the form:
   */
  get_local_interfaces(): Array<Dictionary>;
  /**
   * Returns a queued hostname's IP address, given its queue `id`. Returns an empty string on error or if resolution hasn't happened yet (see {@link get_resolve_item_status}).
   */
  get_resolve_item_address(id: int): string;
  /**
   * Returns resolved addresses, or an empty array if an error happened or resolution didn't happen yet (see {@link get_resolve_item_status}).
   */
  get_resolve_item_addresses(id: int): Array<unknown>;
  /** Returns a queued hostname's status as a {@link ResolverStatus} constant, given its queue `id`. */
  get_resolve_item_status(id: int): int;
  /**
   * Returns a given hostname's IPv4 or IPv6 address when resolved (blocking-type method). The address type returned depends on the {@link Type} constant given as `ip_type`.
   */
  resolve_hostname(host: string | NodePath, ip_type: int): string;
  /**
   * Resolves a given hostname in a blocking way. Addresses are returned as an {@link Array} of IPv4 or IPv6 addresses depending on `ip_type`.
   */
  resolve_hostname_addresses(host: string | NodePath, ip_type: int): PackedStringArray;
  /**
   * Creates a queue item to resolve a hostname to an IPv4 or IPv6 address depending on the {@link Type} constant given as `ip_type`. Returns the queue ID if successful, or {@link RESOLVER_INVALID_ID} on error.
   */
  resolve_hostname_queue_item(host: string | NodePath, ip_type: int): int;

  // enum ResolverStatus
  /** DNS hostname resolver status: No status. */
  readonly RESOLVER_STATUS_NONE: int;
  /** DNS hostname resolver status: Waiting. */
  readonly RESOLVER_STATUS_WAITING: int;
  /** DNS hostname resolver status: Done. */
  readonly RESOLVER_STATUS_DONE: int;
  /** DNS hostname resolver status: Error. */
  readonly RESOLVER_STATUS_ERROR: int;
  // enum Type
  /** Address type: None. */
  readonly TYPE_NONE: int;
  /** Address type: Internet protocol version 4 (IPv4). */
  readonly TYPE_IPV4: int;
  /** Address type: Internet protocol version 6 (IPv6). */
  readonly TYPE_IPV6: int;
  /** Address type: Any. */
  readonly TYPE_ANY: int;

  /**
   * Maximum number of concurrent DNS resolver queries allowed, {@link RESOLVER_INVALID_ID} is returned if exceeded.
   */
  readonly RESOLVER_MAX_QUERIES: int;
  /** Invalid ID constant. Returned if {@link RESOLVER_MAX_QUERIES} is exceeded. */
  readonly RESOLVER_INVALID_ID: int;
}
declare const IP: IP;

