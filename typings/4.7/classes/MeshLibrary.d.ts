// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Library of meshes. */
declare class MeshLibrary extends Resource {
  /** Clears the library. */
  clear(): void;
  /**
   * Creates a new item in the library with the given ID.
   * You can get an unused ID from {@link get_last_unused_item_id}.
   */
  create_item(id: int): void;
  /** Returns the first item with the given name, or `-1` if no item is found. */
  find_item_by_name(name: string): int;
  /** Returns the list of item IDs in use. */
  get_item_list(): PackedInt32Array;
  /** Returns the item's mesh. */
  get_item_mesh(id: int): Mesh | null;
  /** Returns the item's shadow casting mode. */
  get_item_mesh_cast_shadow(id: int): int;
  /** Returns the transform applied to the item's mesh. */
  get_item_mesh_transform(id: int): Transform3D;
  /** Returns the item's name. */
  get_item_name(id: int): string;
  /** Returns the item's navigation layers bitmask. */
  get_item_navigation_layers(id: int): int;
  /** Returns the item's navigation mesh. */
  get_item_navigation_mesh(id: int): NavigationMesh | null;
  /** Returns the transform applied to the item's navigation mesh. */
  get_item_navigation_mesh_transform(id: int): Transform3D;
  /**
   * When running in the editor, returns a generated item preview (a 3D rendering in isometric perspective). When used in a running project, returns the manually-defined item preview which can be set using {@link set_item_preview}. Returns an empty {@link Texture2D} if no preview was manually set in a running project.
   */
  get_item_preview(id: int): Texture2D | null;
  /**
   * Returns an item's collision shapes.
   * The array consists of each {@link Shape3D} followed by its {@link Transform3D}.
   */
  get_item_shapes(id: int): Array<unknown>;
  /** Gets an unused ID for a new item. */
  get_last_unused_item_id(): int;
  /** Removes the item. */
  remove_item(id: int): void;
  /** Sets the item's mesh. */
  set_item_mesh(id: int, mesh: Mesh): void;
  /** Sets the item's shadow casting mode to `shadow_casting_setting`. */
  set_item_mesh_cast_shadow(id: int, shadow_casting_setting: int): void;
  /** Sets the transform to apply to the item's mesh. */
  set_item_mesh_transform(id: int, mesh_transform: Transform3D): void;
  /**
   * Sets the item's name.
   * This name is shown in the editor. It can also be used to look up the item later using {@link find_item_by_name}.
   */
  set_item_name(id: int, name: string): void;
  /** Sets the item's navigation layers bitmask. */
  set_item_navigation_layers(id: int, navigation_layers: int): void;
  /** Sets the item's navigation mesh. */
  set_item_navigation_mesh(id: int, navigation_mesh: NavigationMesh): void;
  /** Sets the transform to apply to the item's navigation mesh. */
  set_item_navigation_mesh_transform(id: int, navigation_mesh: Transform3D): void;
  /** Sets a texture to use as the item's preview icon in the editor. */
  set_item_preview(id: int, texture: Texture2D): void;
  /**
   * Sets an item's collision shapes.
   * The array should consist of {@link Shape3D} objects, each followed by a {@link Transform3D} that will be applied to it. For shapes that should not have a transform, use {@link Transform3D.IDENTITY}.
   */
  set_item_shapes(id: int, shapes: Array<unknown>): void;
}
