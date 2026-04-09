// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class used for extending the {@link MultiplayerAPI}. */
declare class MultiplayerAPIExtension extends MultiplayerAPI {
  /** Called when the {@link MultiplayerAPI.multiplayer_peer} is retrieved. */
  _get_multiplayer_peer(): MultiplayerPeer | null;
  /** Callback for {@link MultiplayerAPI.get_peers}. */
  _get_peer_ids(): PackedInt32Array;
  /** Callback for {@link MultiplayerAPI.get_remote_sender_id}. */
  _get_remote_sender_id(): int;
  /** Callback for {@link MultiplayerAPI.get_unique_id}. */
  _get_unique_id(): int;
  /** Callback for {@link MultiplayerAPI.object_configuration_add}. */
  _object_configuration_add(object: GodotObject, configuration: unknown): int;
  /** Callback for {@link MultiplayerAPI.object_configuration_remove}. */
  _object_configuration_remove(object: GodotObject, configuration: unknown): int;
  /** Callback for {@link MultiplayerAPI.poll}. */
  _poll(): int;
  /** Callback for {@link MultiplayerAPI.rpc}. */
  _rpc(peer: int, object: GodotObject, method: string, args: Array<unknown>): int;
  /** Called when the {@link MultiplayerAPI.multiplayer_peer} is set. */
  _set_multiplayer_peer(multiplayer_peer: MultiplayerPeer): void;
}
