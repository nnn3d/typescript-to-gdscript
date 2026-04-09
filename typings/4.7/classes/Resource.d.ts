// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for serializable objects. */
declare class Resource extends RefCounted {
  /**
   * If `true`, the resource is duplicated for each instance of all scenes using it. At run-time, the resource can be modified in one scene without affecting other instances (see {@link PackedScene.instantiate}).
   * **Note:** Changing this property at run-time has no effect on already created duplicate resources.
   */
  resource_local_to_scene: boolean;
  /**
   * An optional name for this resource. When defined, its value is displayed to represent the resource in the Inspector dock. For built-in scripts, the name is displayed as part of the tab name in the script editor.
   * **Note:** Some resource formats do not support resource names. You can still set the name in the editor or via code, but it will be lost when the resource is reloaded. For example, only built-in scripts can have a resource name, while scripts stored in separate files cannot.
   */
  resource_name: string;
  /**
   * The unique path to this resource. If it has been saved to disk, the value will be its filepath. If the resource is exclusively contained within a scene, the value will be the {@link PackedScene}'s filepath, followed by a unique identifier.
   * **Note:** Setting this property manually may fail if a resource with the same path has already been previously loaded. If necessary, use {@link take_over_path}.
   */
  resource_path: string;
  /**
   * A unique identifier relative to this resource's scene. If left empty, the ID is automatically generated when this resource is saved inside a {@link PackedScene}. If the resource is not inside a scene, this property is empty by default.
   * **Note:** When the {@link PackedScene} is saved, if multiple resources in the same scene use the same ID, only the earliest resource in the scene hierarchy keeps the original ID. The other resources are assigned new IDs from {@link generate_scene_unique_id}.
   * **Note:** Setting this property does not emit the {@link changed} signal.
   * **Warning:** When setting, the ID must only consist of letters, numbers, and underscores. Otherwise, it will fail and default to a randomly generated ID.
   */
  resource_scene_unique_id: string;
  set_local_to_scene(value: boolean): void;
  is_local_to_scene(): boolean;
  set_name(value: string): void;
  get_name(): string;
  set_path(value: string): void;
  get_path(): string;
  set_scene_unique_id(value: string): void;
  get_scene_unique_id(): string;

  /** Override this method to return a custom {@link RID} when {@link get_rid} is called. */
  _get_rid(): RID;
  /**
   * For resources that store state in non-exported properties, such as via {@link Object._validate_property} or {@link Object._get_property_list}, this method must be implemented to clear them.
   */
  _reset_state(): void;
  /**
   * Override this method to execute additional logic after {@link set_path_cache} is called on this object.
   */
  _set_path_cache(path: string): void;
  /**
   * Override this method to customize the newly duplicated resource created from {@link PackedScene.instantiate}, if the original's {@link resource_local_to_scene} is set to `true`.
   * **Example:** Set a random `damage` value to every local resource from an instantiated scene:
   */
  _setup_local_to_scene(): void;
  /**
   * Duplicates this resource, returning a new resource with its `export`ed or {@link PROPERTY_USAGE_STORAGE} properties copied from the original.
   * If `deep` is `false`, a **shallow** copy is returned: nested {@link Array}, {@link Dictionary}, and {@link Resource} properties are not duplicated and are shared with the original resource.
   * If `deep` is `true`, a **deep** copy is returned: all nested arrays, dictionaries, and packed arrays are also duplicated (recursively). Any {@link Resource} found inside will only be duplicated if it's local, like {@link DEEP_DUPLICATE_INTERNAL} used with {@link duplicate_deep}.
   * The following exceptions apply:
   * - Subresource properties with the {@link PROPERTY_USAGE_ALWAYS_DUPLICATE} flag are always duplicated (recursively or not, depending on `deep`).
   * - Subresource properties with the {@link PROPERTY_USAGE_NEVER_DUPLICATE} flag are never duplicated.
   * **Note:** For custom resources, this method will fail if {@link Object._init} has been defined with required parameters.
   * **Note:** When duplicating with `deep` set to `true`, each resource found, including the one on which this method is called, will be only duplicated once and referenced as many times as needed in the duplicate. For instance, if you are duplicating resource A that happens to have resource B referenced twice, you'll get a new resource A' referencing a new resource B' twice.
   */
  duplicate(deep?: boolean): this;
  /**
   * Duplicates this resource, deeply, like {@link duplicate} when passing `true`, with extra control over how subresources are handled.
   */
  duplicate_deep(deep_subresources_mode: int): Resource;
  /**
   * Emits the {@link changed} signal. This method is called automatically for some built-in resources.
   * **Note:** For custom resources, it's recommended to call this method whenever a meaningful change occurs, such as a modified property. This ensures that custom {@link Object}s depending on the resource are properly updated.
   */
  emit_changed(): void;
  /**
   * Generates a unique identifier for a resource to be contained inside a {@link PackedScene}, based on the current date, time, and a random value. The returned string is only composed of letters (`a` to `y`) and numbers (`0` to `8`). See also {@link resource_scene_unique_id}.
   */
  static generate_scene_unique_id(): string;
  /**
   * From the internal cache for scene-unique IDs, returns the ID of this resource for the scene at `path`. If there is no entry, an empty string is returned. Useful to keep scene-unique IDs the same when implementing a VCS-friendly custom resource format by extending {@link ResourceFormatLoader} and {@link ResourceFormatSaver}.
   * **Note:** This method is only implemented when running in an editor context. At runtime, it returns an empty string.
   */
  get_id_for_path(path: string): string;
  /**
   * If {@link resource_local_to_scene} is set to `true` and the resource has been loaded from a {@link PackedScene} instantiation, returns the root {@link Node} of the scene where this resource is used. Otherwise, returns `null`.
   */
  get_local_scene(): Node;
  /**
   * Returns the {@link RID} of this resource (or an empty RID). Many resources (such as {@link Texture2D}, {@link Mesh}, and so on) are high-level abstractions of resources stored in a specialized server ({@link DisplayServer}, {@link RenderingServer}, etc.), so this function will return the original {@link RID}.
   */
  get_rid(): RID;
  /** Returns `true` if the resource is saved on disk as a part of another resource's file. */
  is_built_in(): boolean;
  /**
   * Makes the resource clear its non-exported properties. See also {@link _reset_state}. Useful when implementing a custom resource format by extending {@link ResourceFormatLoader} and {@link ResourceFormatSaver}.
   */
  reset_state(): void;
  /**
   * In the internal cache for scene-unique IDs, sets the ID of this resource to `id` for the scene at `path`. If `id` is empty, the cache entry for `path` is cleared. Useful to keep scene-unique IDs the same when implementing a VCS-friendly custom resource format by extending {@link ResourceFormatLoader} and {@link ResourceFormatSaver}.
   * **Note:** This method is only implemented when running in an editor context.
   */
  set_id_for_path(path: string, id: string): void;
  /**
   * Sets the resource's path to `path` without involving the resource cache. Useful for handling {@link ResourceFormatLoader.CacheMode} values when implementing a custom resource format by extending {@link ResourceFormatLoader} and {@link ResourceFormatSaver}.
   */
  set_path_cache(path: string): void;
  /**
   * Calls {@link _setup_local_to_scene}. If {@link resource_local_to_scene} is set to `true`, this method is automatically called from {@link PackedScene.instantiate} by the newly duplicated resource within the scene instance.
   */
  setup_local_to_scene(): void;
  /**
   * Sets the {@link resource_path} to `path`, potentially overriding an existing cache entry for this path. Further attempts to load an overridden resource by path will instead return this resource.
   */
  take_over_path(path: string): void;

  /**
   * Emitted when the resource changes, usually when one of its properties is modified. See also {@link emit_changed}.
   * **Note:** This signal is not emitted automatically for properties of custom resources. If necessary, a setter needs to be created to emit the signal.
   */
  changed: Signal<[]>;

  // enum DeepDuplicateMode
  /**
   * No subresources at all are duplicated. This is useful even in a deep duplication to have all the arrays and dictionaries duplicated but still pointing to the original resources.
   */
  static readonly DEEP_DUPLICATE_NONE: int;
  /** Only subresources without a path or with a scene-local path will be duplicated. */
  static readonly DEEP_DUPLICATE_INTERNAL: int;
  /**
   * Every subresource found will be duplicated, even if it has a non-local path. In other words, even potentially big resources stored separately will be duplicated.
   */
  static readonly DEEP_DUPLICATE_ALL: int;
}
