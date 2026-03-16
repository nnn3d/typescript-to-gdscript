// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** High-level multiplayer API interface. */
declare class MultiplayerAPI extends RefCounted {
  /**
   * The peer object to handle the RPC system (effectively enabling networking when set). Depending on the peer itself, the MultiplayerAPI will become a network server (check with {@link is_server}) and will set root node's network mode to authority, or it will become a regular client peer. All child nodes are set to inherit the network mode by default. Handling of networking-related events (connection, disconnection, new clients) is done by connecting to MultiplayerAPI's signals.
   */
  multiplayer_peer: MultiplayerPeer;

  /** Returns a new instance of the default MultiplayerAPI. */
  static create_default_interface(): MultiplayerAPI;
  /**
   * Returns the default MultiplayerAPI implementation class name. This is usually `"SceneMultiplayer"` when {@link SceneMultiplayer} is available. See {@link set_default_interface}.
   */
  static get_default_interface(): string;
  /** Returns the peer IDs of all connected peers of this MultiplayerAPI's {@link multiplayer_peer}. */
  get_peers(): PackedInt32Array;
  /**
   * Returns the sender's peer ID for the RPC currently being executed.
   * **Note:** This method returns `0` when called outside of an RPC. As such, the original peer ID may be lost when code execution is delayed (such as with GDScript's `await` keyword).
   */
  get_remote_sender_id(): int;
  /** Returns the unique peer ID of this MultiplayerAPI's {@link multiplayer_peer}. */
  get_unique_id(): int;
  /** Returns `true` if there is a {@link multiplayer_peer} set. */
  has_multiplayer_peer(): boolean;
  /**
   * Returns `true` if this MultiplayerAPI's {@link multiplayer_peer} is valid and in server mode (listening for connections).
   */
  is_server(): boolean;
  /**
   * Notifies the MultiplayerAPI of a new `configuration` for the given `object`. This method is used internally by {@link SceneTree} to configure the root path for this MultiplayerAPI (passing `null` and a valid {@link NodePath} as `configuration`). This method can be further used by MultiplayerAPI implementations to provide additional features, refer to specific implementation (e.g. {@link SceneMultiplayer}) for details on how they use it.
   * **Note:** This method is mostly relevant when extending or overriding the MultiplayerAPI behavior via {@link MultiplayerAPIExtension}.
   */
  object_configuration_add(object: GodotObject, configuration: unknown): int;
  /**
   * Notifies the MultiplayerAPI to remove a `configuration` for the given `object`. This method is used internally by {@link SceneTree} to configure the root path for this MultiplayerAPI (passing `null` and an empty {@link NodePath} as `configuration`). This method can be further used by MultiplayerAPI implementations to provide additional features, refer to specific implementation (e.g. {@link SceneMultiplayer}) for details on how they use it.
   * **Note:** This method is mostly relevant when extending or overriding the MultiplayerAPI behavior via {@link MultiplayerAPIExtension}.
   */
  object_configuration_remove(object: GodotObject, configuration: unknown): int;
  /**
   * Method used for polling the MultiplayerAPI. You only need to worry about this if you set {@link SceneTree.multiplayer_poll} to `false`. By default, {@link SceneTree} will poll its MultiplayerAPI(s) for you.
   * **Note:** This method results in RPCs being called, so they will be executed in the same context of this function (e.g. `_process`, `physics`, {@link Thread}).
   */
  poll(): int;
  /**
   * Sends an RPC to the target `peer`. The given `method` will be called on the remote `object` with the provided `arguments`. The RPC may also be called locally depending on the implementation and RPC configuration. See {@link Node.rpc} and {@link Node.rpc_config}.
   * **Note:** Prefer using {@link Node.rpc}, {@link Node.rpc_id}, or `my_method.rpc(peer, arg1, arg2, ...)` (in GDScript), since they are faster. This method is mostly useful in conjunction with {@link MultiplayerAPIExtension} when extending or replacing the multiplayer capabilities.
   */
  rpc(peer: int, object: GodotObject, method: string, arguments?: Array<unknown>): int;
  /**
   * Sets the default MultiplayerAPI implementation class. This method can be used by modules and extensions to configure which implementation will be used by {@link SceneTree} when the engine starts.
   */
  static set_default_interface(interface_name: string): void;

  /**
   * Emitted when this MultiplayerAPI's {@link multiplayer_peer} successfully connected to a server. Only emitted on clients.
   */
  connected_to_server: Signal<[]>;
  /**
   * Emitted when this MultiplayerAPI's {@link multiplayer_peer} fails to establish a connection to a server. Only emitted on clients.
   */
  connection_failed: Signal<[]>;
  /**
   * Emitted when this MultiplayerAPI's {@link multiplayer_peer} connects with a new peer. ID is the peer ID of the new peer. Clients get notified when other clients connect to the same server. Upon connecting to a server, a client also receives this signal for the server (with ID being 1).
   */
  peer_connected: Signal<[int]>;
  /**
   * Emitted when this MultiplayerAPI's {@link multiplayer_peer} disconnects from a peer. Clients get notified when other clients disconnect from the same server.
   */
  peer_disconnected: Signal<[int]>;
  /**
   * Emitted when this MultiplayerAPI's {@link multiplayer_peer} disconnects from server. Only emitted on clients.
   */
  server_disconnected: Signal<[]>;

  // enum RPCMode
  /**
   * Used with {@link Node.rpc_config} to disable a method or property for all RPC calls, making it unavailable. Default for all methods.
   */
  static readonly RPC_MODE_DISABLED: int;
  /**
   * Used with {@link Node.rpc_config} to set a method to be callable remotely by any peer. Analogous to the `@rpc("any_peer")` annotation. Calls are accepted from all remote peers, no matter if they are node's authority or not.
   */
  static readonly RPC_MODE_ANY_PEER: int;
  /**
   * Used with {@link Node.rpc_config} to set a method to be callable remotely only by the current multiplayer authority (which is the server by default). Analogous to the `@rpc("authority")` annotation. See {@link Node.set_multiplayer_authority}.
   */
  static readonly RPC_MODE_AUTHORITY: int;
}
