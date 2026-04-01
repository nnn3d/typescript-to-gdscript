// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Manages the game loop via a hierarchy of nodes. */
declare class SceneTree extends MainLoop {
  /**
   * If `true`, the application automatically accepts quitting requests.
   * For mobile platforms, see {@link quit_on_go_back}.
   */
  auto_accept_quit: boolean;
  /**
   * The root node of the currently loaded main scene, usually as a direct child of {@link root}. See also {@link change_scene_to_file}, {@link change_scene_to_packed}, and {@link reload_current_scene}.
   * **Warning:** Setting this property directly may not work as expected, as it does *not* add or remove any nodes from this tree.
   */
  current_scene: Node;
  /**
   * If `true`, collision shapes will be visible when running the game from the editor for debugging purposes.
   * **Note:** This property is not designed to be changed at run-time. Changing the value of {@link debug_collisions_hint} while the project is running will not have the desired effect.
   */
  debug_collisions_hint: boolean;
  /**
   * If `true`, navigation polygons will be visible when running the game from the editor for debugging purposes.
   * **Note:** This property is not designed to be changed at run-time. Changing the value of {@link debug_navigation_hint} while the project is running will not have the desired effect.
   */
  debug_navigation_hint: boolean;
  /**
   * If `true`, curves from {@link Path2D} and {@link Path3D} nodes will be visible when running the game from the editor for debugging purposes.
   * **Note:** This property is not designed to be changed at run-time. Changing the value of {@link debug_paths_hint} while the project is running will not have the desired effect.
   */
  debug_paths_hint: boolean;
  /**
   * The root of the scene currently being edited in the editor. This is usually a direct child of {@link root}.
   * **Note:** This property does nothing in release builds.
   */
  edited_scene_root: Node;
  /**
   * If `true` (default value), enables automatic polling of the {@link MultiplayerAPI} for this SceneTree during {@link process_frame}.
   * If `false`, you need to manually call {@link MultiplayerAPI.poll} to process network packets and deliver RPCs. This allows running RPCs in a different loop (e.g. physics, thread, specific time step) and for manual {@link Mutex} protection when accessing the {@link MultiplayerAPI} from threads.
   */
  multiplayer_poll: boolean;
  /**
   * If `true`, the scene tree is considered paused. This causes the following behavior:
   * - 2D and 3D physics will be stopped, as well as collision detection and related signals.
   * - Depending on each node's {@link Node.process_mode}, their {@link Node._process}, {@link Node._physics_process} and {@link Node._input} callback methods may not called anymore.
   */
  paused: boolean;
  /**
   * If `true`, the renderer will interpolate the transforms of objects (both physics and non-physics) between the last two transforms, so that smooth motion is seen even when physics ticks do not coincide with rendered frames.
   * The default value of this property is controlled by {@link ProjectSettings.physics/common/physics_interpolation}.
   * **Note:** Although this is a global setting, finer control of individual branches of the {@link SceneTree} is possible using {@link Node.physics_interpolation_mode}.
   */
  physics_interpolation: boolean;
  /**
   * If `true`, the application quits automatically when navigating back (e.g. using the system "Back" button on Android).
   * To handle 'Go Back' button when this option is disabled, use {@link DisplayServer.WINDOW_EVENT_GO_BACK_REQUEST}.
   */
  quit_on_go_back: boolean;
  /**
   * The tree's root {@link Window}. This is top-most {@link Node} of the scene tree, and is always present. An absolute {@link NodePath} always starts from this node. Children of the root node may include the loaded {@link current_scene}, as well as any AutoLoad ($DOCS_URL/tutorials/scripting/singletons_autoload.html) configured in the Project Settings.
   * **Warning:** Do not delete this node. This will result in unstable behavior, followed by a crash.
   */
  root: Window;
  set_auto_accept_quit(value: boolean): void;
  is_auto_accept_quit(): boolean;
  set_current_scene(value: Node): void;
  get_current_scene(): Node;
  set_debug_collisions_hint(value: boolean): void;
  is_debugging_collisions_hint(): boolean;
  set_debug_navigation_hint(value: boolean): void;
  is_debugging_navigation_hint(): boolean;
  set_debug_paths_hint(value: boolean): void;
  is_debugging_paths_hint(): boolean;
  set_edited_scene_root(value: Node): void;
  get_edited_scene_root(): Node;
  set_multiplayer_poll_enabled(value: boolean): void;
  is_multiplayer_poll_enabled(): boolean;
  set_pause(value: boolean): void;
  is_paused(): boolean;
  set_physics_interpolation_enabled(value: boolean): void;
  is_physics_interpolation_enabled(): boolean;
  set_quit_on_go_back(value: boolean): void;
  is_quit_on_go_back(): boolean;
  get_root(): Window;

  /**
   * Calls `method` on each node inside this tree added to the given `group`. You can pass arguments to `method` by specifying them at the end of this method call. Nodes that cannot call `method` (either because the method doesn't exist or the arguments do not match) are ignored. See also {@link set_group} and {@link notify_group}.
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  call_group(group: string, method: string, ...args: any[]): void;
  /**
   * Calls the given `method` on each node inside this tree added to the given `group`. Use `flags` to customize this method's behavior (see {@link GroupCallFlags}). Additional arguments for `method` can be passed at the end of this method. Nodes that cannot call `method` (either because the method doesn't exist or the arguments do not match) are ignored.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  call_group_flags(
  flags: int,
  group: string,
  method: string,
  ...args: any[]
  ): void;
  /**
   * Changes the running scene to the one at the given `path`, after loading it into a {@link PackedScene} and creating a new instance.
   * Returns {@link OK} on success, {@link ERR_CANT_OPEN} if the `path` cannot be loaded into a {@link PackedScene}, or {@link ERR_CANT_CREATE} if that scene cannot be instantiated.
   * **Note:** See {@link change_scene_to_node} for details on the order of operations.
   */
  change_scene_to_file(path: GodotScenePaths): int;
  change_scene_to_file(path: string): int;
  /**
   * Changes the running scene to the provided {@link Node}. Useful when you want to set up the new scene before changing.
   * Returns {@link OK} on success, {@link ERR_INVALID_PARAMETER} if the `node` is `null`, or {@link ERR_UNCONFIGURED} if the `node` is already inside the scene tree.
   * **Note:** Operations happen in the following order when {@link change_scene_to_node} is called:
   * 1. The current scene node is immediately removed from the tree. From that point, {@link Node.get_tree} called on the current (outgoing) scene will return `null`. {@link current_scene} will be `null` too, because the new scene is not available yet.
   * 2. At the end of the frame, the formerly current scene, already removed from the tree, will be deleted (freed from memory) and then the new scene node will be added to the tree. {@link Node.get_tree} and {@link current_scene} will be back to working as usual.
   * This ensures that both scenes aren't running at the same time, while still freeing the previous scene in a safe way similar to {@link Node.queue_free}.
   * If you want to reliably access the new scene, await the {@link scene_changed} signal.
   * **Warning:** After using this method, the {@link SceneTree} will take ownership of the node and will free it automatically when changing scene again. Any references you had to that node will become invalid.
   */
  change_scene_to_node(node: Node): int;
  /**
   * Changes the running scene to a new instance of the given {@link PackedScene} (which must be valid).
   * Returns {@link OK} on success, {@link ERR_CANT_CREATE} if the scene cannot be instantiated, or {@link ERR_INVALID_PARAMETER} if the scene is invalid.
   * **Note:** See {@link change_scene_to_node} for details on the order of operations.
   */
  change_scene_to_packed(packed_scene: PackedScene): int;
  /**
   * Returns a new {@link SceneTreeTimer}. After `time_sec` in seconds have passed, the timer will emit {@link SceneTreeTimer.timeout} and will be automatically freed.
   * If `process_always` is `false`, the timer will be paused when setting {@link SceneTree.paused} to `true`.
   * If `process_in_physics` is `true`, the timer will update at the end of the physics frame, instead of the process frame.
   * If `ignore_time_scale` is `true`, the timer will ignore {@link Engine.time_scale} and update with the real, elapsed time.
   * This method is commonly used to create a one-shot delay timer, as in the following example:
   * **Note:** The timer is always updated *after* all of the nodes in the tree. A node's {@link Node._process} method would be called before the timer updates (or {@link Node._physics_process} if `process_in_physics` is set to `true`).
   */
  create_timer(time_sec: float, process_always?: boolean, process_in_physics?: boolean, ignore_time_scale?: boolean): SceneTreeTimer;
  /**
   * Creates and returns a new {@link Tween} processed in this tree. The Tween will start automatically on the next process frame or physics frame (depending on its {@link Tween.TweenProcessMode}).
   * **Note:** A {@link Tween} created using this method is not bound to any {@link Node}. It may keep working until there is nothing left to animate. If you want the {@link Tween} to be automatically killed when the {@link Node} is freed, use {@link Node.create_tween} or {@link Tween.bind_node}.
   */
  create_tween(): Tween;
  /**
   * Returns the first {@link Node} found inside the tree, that has been added to the given `group`, in scene hierarchy order. Returns `null` if no match is found. See also {@link get_nodes_in_group}.
   */
  get_first_node_in_group(group: string): Node;
  /**
   * Returns how many physics process steps have been processed, since the application started. This is *not* a measurement of elapsed time. See also {@link physics_frame}. For the number of frames rendered, see {@link Engine.get_process_frames}.
   */
  get_frame(): int;
  /**
   * Searches for the {@link MultiplayerAPI} configured for the given path, if one does not exist it searches the parent paths until one is found. If the path is empty, or none is found, the default one is returned. See {@link set_multiplayer}.
   */
  get_multiplayer(for_path?: string): MultiplayerAPI;
  /** Returns the number of nodes inside this tree. */
  get_node_count(): int;
  /** Returns the number of nodes assigned to the given group. */
  get_node_count_in_group(group: string): int;
  /**
   * Returns an {@link Array} containing all nodes inside this tree, that have been added to the given `group`, in scene hierarchy order.
   */
  get_nodes_in_group(group: string): Array<Node>;
  /** Returns an {@link Array} of currently existing {@link Tween}s in the tree, including paused tweens. */
  get_processed_tweens(): Array<Tween>;
  /** Returns `true` if a node added to the given group `name` exists in the tree. */
  has_group(name: string): boolean;
  /**
   * Returns `true` if accessibility features are enabled, and accessibility information updates are actively processed.
   */
  is_accessibility_enabled(): boolean;
  /** Returns `true` if accessibility features are supported by the OS and enabled in project settings. */
  is_accessibility_supported(): boolean;
  /**
   * Calls {@link Object.notification} with the given `notification` to all nodes inside this tree added to the `group`. See also Godot notifications ($DOCS_URL/tutorials/best_practices/godot_notifications.html) and {@link call_group} and {@link set_group}.
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   */
  notify_group(group: string, notification: int): void;
  /**
   * Calls {@link Object.notification} with the given `notification` to all nodes inside this tree added to the `group`. Use `call_flags` to customize this method's behavior (see {@link GroupCallFlags}).
   */
  notify_group_flags(call_flags: int, group: string, notification: int): void;
  /**
   * Queues the given `obj` to be deleted, calling its {@link Object.free} at the end of the current frame. This method is similar to {@link Node.queue_free}.
   */
  queue_delete(obj: GodotObject): void;
  /**
   * Quits the application at the end of the current iteration, with the given `exit_code`.
   * By convention, an exit code of `0` indicates success, whereas any other exit code indicates an error. For portability reasons, it should be between `0` and `125` (inclusive).
   * **Note:** On iOS this method doesn't work. Instead, as recommended by the iOS Human Interface Guidelines (https://developer.apple.com/library/archive/qa/qa1561/_index.html), the user is expected to close apps via the Home button.
   */
  quit(exit_code?: int): void;
  /**
   * Reloads the currently active scene, replacing {@link current_scene} with a new instance of its original {@link PackedScene}.
   * Returns {@link OK} on success, {@link ERR_UNCONFIGURED} if no {@link current_scene} is defined, {@link ERR_CANT_OPEN} if {@link current_scene} cannot be loaded into a {@link PackedScene}, or {@link ERR_CANT_CREATE} if the scene cannot be instantiated.
   */
  reload_current_scene(): int;
  /**
   * Sets the given `property` to `value` on all nodes inside this tree added to the given `group`. Nodes that do not have the `property` are ignored. See also {@link call_group} and {@link notify_group}.
   * **Note:** This method acts immediately on all selected nodes at once, which may cause stuttering in some performance-intensive situations.
   * **Note:** In C#, `property` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  set_group(group: string, property: string, value: unknown): void;
  /**
   * Sets the given `property` to `value` on all nodes inside this tree added to the given `group`. Nodes that do not have the `property` are ignored. Use `call_flags` to customize this method's behavior (see {@link GroupCallFlags}).
   * **Note:** In C#, `property` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  set_group_flags(call_flags: int, group: string, property: string, value: unknown): void;
  /**
   * Sets a custom {@link MultiplayerAPI} with the given `root_path` (controlling also the relative subpaths), or override the default one if `root_path` is empty.
   * **Note:** No {@link MultiplayerAPI} must be configured for the subpath containing `root_path`, nested custom multiplayers are not allowed. I.e. if one is configured for `"/root/Foo"` setting one for `"/root/Foo/Bar"` will cause an error.
   * **Note:** {@link set_multiplayer} should be called *before* the child nodes are ready at the given `root_path`. If multiplayer nodes like {@link MultiplayerSpawner} or {@link MultiplayerSynchronizer} are added to the tree before the custom multiplayer API is set, they will not work.
   */
  set_multiplayer(multiplayer: MultiplayerAPI, root_path?: string): void;
  /** If a current scene is loaded, calling this method will unload it. */
  unload_current_scene(): void;

  /** Emitted when the `node` enters this tree. */
  node_added: Signal<[Node]>;
  /**
   * Emitted when the `node`'s {@link Node.update_configuration_warnings} is called. Only emitted in the editor.
   */
  node_configuration_warning_changed: Signal<[Node]>;
  /** Emitted when the `node` exits this tree. */
  node_removed: Signal<[Node]>;
  /** Emitted when the `node`'s {@link Node.name} is changed. */
  node_renamed: Signal<[Node]>;
  /** Emitted immediately before {@link Node._physics_process} is called on every node in this tree. */
  physics_frame: Signal<[]>;
  /** Emitted immediately before {@link Node._process} is called on every node in this tree. */
  process_frame: Signal<[]>;
  /**
   * Emitted after the new scene is added to scene tree and initialized. Can be used to reliably access {@link current_scene} when changing scenes.
   */
  scene_changed: Signal<[]>;
  /** Emitted any time the tree's hierarchy changes (nodes being moved, renamed, etc.). */
  tree_changed: Signal<[]>;
  /**
   * Emitted when the {@link Node.process_mode} of any node inside the tree is changed. Only emitted in the editor, to update the visibility of disabled nodes.
   */
  tree_process_mode_changed: Signal<[]>;

  // enum GroupCallFlags
  /** Call nodes within a group with no special behavior (default). */
  static readonly GROUP_CALL_DEFAULT: int;
  /**
   * Call nodes within a group in reverse tree hierarchy order (all nested children are called before their respective parent nodes).
   */
  static readonly GROUP_CALL_REVERSE: int;
  /**
   * Call nodes within a group at the end of the current frame (can be either process or physics frame), similar to {@link Object.call_deferred}.
   */
  static readonly GROUP_CALL_DEFERRED: int;
  /**
   * Call nodes within a group only once, even if the call is executed many times in the same frame. Must be combined with {@link GROUP_CALL_DEFERRED} to work.
   * **Note:** Different arguments are not taken into account. Therefore, when the same call is executed with different arguments, only the first call will be performed.
   */
  static readonly GROUP_CALL_UNIQUE: int;
}
