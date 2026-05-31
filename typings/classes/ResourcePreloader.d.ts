// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A node used to preload sub-resources inside a scene. */
declare class ResourcePreloader extends Node {
  /**
   * Adds a resource to the preloader with the given `name`. If a resource with the given `name` already exists, the new resource will be renamed to "`name` N" where N is an incrementing number starting from 2.
   */
  add_resource(name: string, resource: Resource): void;
  /** Returns the resource associated to `name`. */
  get_resource(name: string): Resource | null;
  /** Returns the list of resources inside the preloader. */
  get_resource_list(): PackedStringArray;
  /** Returns `true` if the preloader contains a resource associated to `name`. */
  has_resource(name: string): boolean;
  /** Removes the resource associated to `name` from the preloader. */
  remove_resource(name: string): void;
  /** Renames a resource inside the preloader from `name` to `newname`. */
  rename_resource(name: string, newname: string): void;
}
