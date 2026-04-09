// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * RemoteTransform3D pushes its own {@link Transform3D} to another {@link Node3D} derived Node in the scene.
 */
declare class RemoteTransform3D extends Node3D {
  /** The {@link NodePath} to the remote node, relative to the RemoteTransform3D's position in the scene. */
  remote_path: string;
  /** If `true`, the remote node's position is updated. */
  update_position: boolean;
  /** If `true`, the remote node's rotation is updated. */
  update_rotation: boolean;
  /** If `true`, the remote node's scale is updated. */
  update_scale: boolean;
  /** If `true`, global coordinates are used. If `false`, local coordinates are used. */
  use_global_coordinates: boolean;
  set_remote_node(value: string): void;
  get_remote_node(): string;
  set_update_position(value: boolean): void;
  get_update_position(): boolean;
  set_update_rotation(value: boolean): void;
  get_update_rotation(): boolean;
  set_update_scale(value: boolean): void;
  get_update_scale(): boolean;
  set_use_global_coordinates(value: boolean): void;
  get_use_global_coordinates(): boolean;

  /**
   * {@link RemoteTransform3D} caches the remote node. It may not notice if the remote node disappears; {@link force_update_cache} forces it to update the cache again.
   */
  force_update_cache(): void;
}
