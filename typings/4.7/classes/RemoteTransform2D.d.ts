// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * RemoteTransform2D pushes its own {@link Transform2D} to another {@link Node2D} derived node in the scene.
 */
declare class RemoteTransform2D extends Node2D {
  /** The {@link NodePath} to the remote node, relative to the RemoteTransform2D's position in the scene. */
  remote_path: string;
  /** If `true`, the remote node's position is updated. */
  update_position: boolean;
  /** If `true`, the remote node's rotation is updated. */
  update_rotation: boolean;
  /** If `true`, the remote node's scale is updated. */
  update_scale: boolean;
  /** If `true`, global coordinates are used. If `false`, local coordinates are used. */
  use_global_coordinates: boolean;

  /**
   * {@link RemoteTransform2D} caches the remote node. It may not notice if the remote node disappears; {@link force_update_cache} forces it to update the cache again.
   */
  force_update_cache(): void;
}
