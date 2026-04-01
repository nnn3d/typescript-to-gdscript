// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for all scene objects. */
declare class Node extends GodotObject {
  /**
   * Defines if any text should automatically change to its translated version depending on the current locale (for nodes such as {@link Label}, {@link RichTextLabel}, {@link Window}, etc.). Also decides if the node's strings should be parsed for translation template generation.
   * **Note:** For the root node, auto translate mode can also be set via {@link ProjectSettings.internationalization/rendering/root_node_auto_translate}.
   */
  auto_translate_mode: int;
  /**
   * An optional description to the node. It will be displayed as a tooltip when hovering over the node in the editor's Scene dock.
   */
  editor_description: string;
  /**
   * The {@link MultiplayerAPI} instance associated with this node. See {@link SceneTree.get_multiplayer}.
   * **Note:** Renaming the node, or moving it in the tree, will not move the {@link MultiplayerAPI} to the new path, you will have to update this manually.
   */
  multiplayer: MultiplayerAPI;
  /**
   * The name of the node. This name must be unique among the siblings (other child nodes from the same parent). When set to an existing sibling's name, the node is automatically renamed.
   * **Note:** When changing the name, the following characters will be replaced with an underscore: (`.` `:` `@` `/` `"` `%`). In particular, the `@` character is reserved for auto-generated names. See also {@link String.validate_node_name}.
   */
  name: string;
  /**
   * The owner of this node. The owner must be an ancestor of this node. When packing the owner node in a {@link PackedScene}, all the nodes it owns are also saved with it. See also {@link unique_name_in_owner}.
   * **Note:** In the editor, nodes not owned by the scene root are usually not displayed in the Scene dock, and will **not** be saved. To prevent this, remember to set the owner after calling {@link add_child}.
   * **Note:** The owner needs to be the current scene root. See Instancing scenes ($DOCS_URL/tutorials/plugins/running_code_in_the_editor.html#instancing-scenes) in the documentation for more information.
   */
  owner: Node;
  /**
   * The physics interpolation mode to use for this node. Only effective if {@link ProjectSettings.physics/common/physics_interpolation} or {@link SceneTree.physics_interpolation} is `true`.
   * By default, nodes inherit the physics interpolation mode from their parent. This property can enable or disable physics interpolation individually for each node, regardless of their parents' physics interpolation mode.
   * **Note:** Some node types like {@link VehicleWheel3D} have physics interpolation disabled by default, as they rely on their own custom solution.
   * **Note:** When teleporting a node to a distant position, it's recommended to temporarily disable interpolation with {@link Node.reset_physics_interpolation} *after* moving the node. This avoids creating a visual streak between the old and new positions.
   */
  physics_interpolation_mode: int;
  /**
   * The node's processing behavior. To check if the node can process in its current mode, use {@link can_process}.
   */
  process_mode: int;
  /**
   * Similar to {@link process_priority} but for {@link NOTIFICATION_PHYSICS_PROCESS}, {@link _physics_process}, or {@link NOTIFICATION_INTERNAL_PHYSICS_PROCESS}.
   */
  process_physics_priority: int;
  /**
   * The node's execution order of the process callbacks ({@link _process}, {@link NOTIFICATION_PROCESS}, and {@link NOTIFICATION_INTERNAL_PROCESS}). Nodes whose priority value is *lower* call their process callbacks first, regardless of tree order.
   */
  process_priority: int;
  /**
   * Set the process thread group for this node (basically, whether it receives {@link NOTIFICATION_PROCESS}, {@link NOTIFICATION_PHYSICS_PROCESS}, {@link _process} or {@link _physics_process} (and the internal versions) on the main thread or in a sub-thread.
   * By default, the thread group is {@link PROCESS_THREAD_GROUP_INHERIT}, which means that this node belongs to the same thread group as the parent node. The thread groups means that nodes in a specific thread group will process together, separate to other thread groups (depending on {@link process_thread_group_order}). If the value is set is {@link PROCESS_THREAD_GROUP_SUB_THREAD}, this thread group will occur on a sub thread (not the main thread), otherwise if set to {@link PROCESS_THREAD_GROUP_MAIN_THREAD} it will process on the main thread. If there is not a parent or grandparent node set to something other than inherit, the node will belong to the *default thread group*. This default group will process on the main thread and its group order is 0.
   * During processing in a sub-thread, accessing most functions in nodes outside the thread group is forbidden (and it will result in an error in debug mode). Use {@link Object.call_deferred}, {@link call_thread_safe}, {@link call_deferred_thread_group} and the likes in order to communicate from the thread groups to the main thread (or to other thread groups).
   * To better understand process thread groups, the idea is that any node set to any other value than {@link PROCESS_THREAD_GROUP_INHERIT} will include any child (and grandchild) nodes set to inherit into its process thread group. This means that the processing of all the nodes in the group will happen together, at the same time as the node including them.
   */
  process_thread_group: int;
  /**
   * Change the process thread group order. Groups with a lesser order will process before groups with a greater order. This is useful when a large amount of nodes process in sub thread and, afterwards, another group wants to collect their result in the main thread, as an example.
   */
  process_thread_group_order: int;
  /**
   * Set whether the current thread group will process messages (calls to {@link call_deferred_thread_group} on threads), and whether it wants to receive them during regular process or physics process callbacks.
   */
  process_thread_messages: int;
  /**
   * The original scene's file path, if the node has been instantiated from a {@link PackedScene} file. Only scene root nodes contains this.
   */
  scene_file_path: string;
  /**
   * If `true`, the node can be accessed from any node sharing the same {@link owner} or from the {@link owner} itself, with special `%Name` syntax in {@link get_node}.
   * **Note:** If another node with the same {@link owner} shares the same {@link name} as this node, the other node will no longer be accessible as unique.
   */
  unique_name_in_owner: boolean;
  set_auto_translate_mode(value: int): void;
  get_auto_translate_mode(): int;
  set_editor_description(value: string): void;
  get_editor_description(): string;
  get_multiplayer(): MultiplayerAPI;
  set_name(value: string): void;
  get_name(): string;
  set_owner(value: Node): void;
  get_owner(): Node;
  set_physics_interpolation_mode(value: int): void;
  get_physics_interpolation_mode(): int;
  set_process_mode(value: int): void;
  get_process_mode(): int;
  set_physics_process_priority(value: int): void;
  get_physics_process_priority(): int;
  set_process_priority(value: int): void;
  get_process_priority(): int;
  set_process_thread_group(value: int): void;
  get_process_thread_group(): int;
  set_process_thread_group_order(value: int): void;
  get_process_thread_group_order(): int;
  set_process_thread_messages(value: int): void;
  get_process_thread_messages(): int;
  set_scene_file_path(value: string): void;
  get_scene_file_path(): string;
  set_unique_name_in_owner(value: boolean): void;
  is_unique_name_in_owner(): boolean;

  /**
   * Called when the node enters the {@link SceneTree} (e.g. upon instantiating, scene changing, or after calling {@link add_child} in a script). If the node has children, its {@link _enter_tree} callback will be called first, and then that of the children.
   * Corresponds to the {@link NOTIFICATION_ENTER_TREE} notification in {@link Object._notification}.
   */
  _enter_tree(): void;
  /**
   * Called when the node is about to leave the {@link SceneTree} (e.g. upon freeing, scene changing, or after calling {@link remove_child} in a script). If the node has children, its {@link _exit_tree} callback will be called last, after all its children have left the tree.
   * Corresponds to the {@link NOTIFICATION_EXIT_TREE} notification in {@link Object._notification} and signal {@link tree_exiting}. To get notified when the node has already left the active tree, connect to the {@link tree_exited}.
   */
  _exit_tree(): void;
  /**
   * The elements in the array returned from this method are displayed as warnings in the Scene dock if the script that overrides it is a `tool` script, and accessibility warnings are enabled in the editor settings.
   * Returning an empty array produces no warnings.
   */
  _get_accessibility_configuration_warnings(): PackedStringArray;
  /**
   * The elements in the array returned from this method are displayed as warnings in the Scene dock if the script that overrides it is a `tool` script.
   * Returning an empty array produces no warnings.
   * Call {@link update_configuration_warnings} when the warnings need to be updated for this node.
   */
  _get_configuration_warnings(): PackedStringArray;
  /**
   * Called during accessibility information updates to determine the currently focused sub-element, should return a sub-element RID or the value returned by {@link get_accessibility_element}.
   */
  _get_focused_accessibility_element(): RID;
  /**
   * Called when there is an input event. The input event propagates up through the node tree until a node consumes it.
   * It is only called if input processing is enabled, which is done automatically if this method is overridden, and can be toggled with {@link set_process_input}.
   * To consume the input event and stop it propagating further to other nodes, {@link Viewport.set_input_as_handled} can be called.
   * For gameplay input, {@link _unhandled_input} and {@link _unhandled_key_input} are usually a better fit as they allow the GUI to intercept the events first.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   */
  _input(event: InputEvent): void;
  /**
   * Called once on each physics tick, and allows Nodes to synchronize their logic with physics ticks. `delta` is the logical time between physics ticks in seconds and is equal to {@link Engine.time_scale} / {@link Engine.physics_ticks_per_second}.
   * It is only called if physics processing is enabled for this Node, which is done automatically if this method is overridden, and can be toggled with {@link set_physics_process}.
   * Processing happens in order of {@link process_physics_priority}, lower priority values are called first. Nodes with the same priority are processed in tree order, or top to bottom as seen in the editor (also known as pre-order traversal).
   * Corresponds to the {@link NOTIFICATION_PHYSICS_PROCESS} notification in {@link Object._notification}.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   * **Note:** Accumulated `delta` may diverge from real world seconds.
   */
  _physics_process(delta: float): void;
  /**
   * Called on each idle frame, prior to rendering, and after physics ticks have been processed. `delta` is the time between frames in seconds.
   * It is only called if processing is enabled for this Node, which is done automatically if this method is overridden, and can be toggled with {@link set_process}.
   * Processing happens in order of {@link process_priority}, lower priority values are called first. Nodes with the same priority are processed in tree order, or top to bottom as seen in the editor (also known as pre-order traversal).
   * Corresponds to the {@link NOTIFICATION_PROCESS} notification in {@link Object._notification}.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   * **Note:** When the engine is struggling and the frame rate is lowered, `delta` will increase. When `delta` is increased, it's capped at a maximum of {@link Engine.time_scale} * {@link Engine.max_physics_steps_per_frame} / {@link Engine.physics_ticks_per_second}. As a result, accumulated `delta` may not represent real world time.
   * **Note:** When `--fixed-fps` is enabled or the engine is running in Movie Maker mode (see {@link MovieWriter}), process `delta` will always be the same for every frame, regardless of how much time the frame took to render.
   * **Note:** Frame delta may be post-processed by {@link OS.delta_smoothing} if this is enabled for the project.
   */
  _process(delta: float): void;
  /**
   * Called when the node is "ready", i.e. when both the node and its children have entered the scene tree. If the node has children, their {@link _ready} callbacks get triggered first, and the parent node will receive the ready notification afterwards.
   * Corresponds to the {@link NOTIFICATION_READY} notification in {@link Object._notification}. See also the `@onready` annotation for variables.
   * Usually used for initialization. For even earlier initialization, {@link Object._init} may be used. See also {@link _enter_tree}.
   * **Note:** This method may be called only once for each node. After removing a node from the scene tree and adding it again, {@link _ready} will **not** be called a second time. This can be bypassed by requesting another call with {@link request_ready}, which may be called anywhere before adding the node again.
   */
  _ready(): void;
  /**
   * Called when an {@link InputEventKey}, {@link InputEventShortcut}, or {@link InputEventJoypadButton} hasn't been consumed by {@link _input} or any GUI {@link Control} item. It is called before {@link _unhandled_key_input} and {@link _unhandled_input}. The input event propagates up through the node tree until a node consumes it.
   * It is only called if shortcut processing is enabled, which is done automatically if this method is overridden, and can be toggled with {@link set_process_shortcut_input}.
   * To consume the input event and stop it propagating further to other nodes, {@link Viewport.set_input_as_handled} can be called.
   * This method can be used to handle shortcuts. For generic GUI events, use {@link _input} instead. Gameplay events should usually be handled with either {@link _unhandled_input} or {@link _unhandled_key_input}.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not orphan).
   */
  _shortcut_input(event: InputEvent): void;
  /**
   * Called when an {@link InputEvent} hasn't been consumed by {@link _input} or any GUI {@link Control} item. It is called after {@link _shortcut_input} and after {@link _unhandled_key_input}. The input event propagates up through the node tree until a node consumes it.
   * It is only called if unhandled input processing is enabled, which is done automatically if this method is overridden, and can be toggled with {@link set_process_unhandled_input}.
   * To consume the input event and stop it propagating further to other nodes, {@link Viewport.set_input_as_handled} can be called.
   * For gameplay input, this method is usually a better fit than {@link _input}, as GUI events need a higher priority. For keyboard shortcuts, consider using {@link _shortcut_input} instead, as it is called before this method. Finally, to handle keyboard events, consider using {@link _unhandled_key_input} for performance reasons.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   */
  _unhandled_input(event: InputEvent): void;
  /**
   * Called when an {@link InputEventKey} hasn't been consumed by {@link _input} or any GUI {@link Control} item. It is called after {@link _shortcut_input} but before {@link _unhandled_input}. The input event propagates up through the node tree until a node consumes it.
   * It is only called if unhandled key input processing is enabled, which is done automatically if this method is overridden, and can be toggled with {@link set_process_unhandled_key_input}.
   * To consume the input event and stop it propagating further to other nodes, {@link Viewport.set_input_as_handled} can be called.
   * This method can be used to handle Unicode character input with `Alt`, `Alt + Ctrl`, and `Alt + Shift` modifiers, after shortcuts were handled.
   * For gameplay input, this and {@link _unhandled_input} are usually a better fit than {@link _input}, as GUI events should be handled first. This method also performs better than {@link _unhandled_input}, since unrelated events such as {@link InputEventMouseMotion} are automatically filtered. For shortcuts, consider using {@link _shortcut_input} instead.
   * **Note:** This method is only called if the node is present in the scene tree (i.e. if it's not an orphan).
   */
  _unhandled_key_input(event: InputEvent): void;
  /**
   * Adds a child `node`. Nodes can have any number of children, but every child must have a unique name. Child nodes are automatically deleted when the parent node is deleted, so an entire scene can be removed by deleting its topmost node.
   * If `force_readable_name` is `true`, improves the readability of the added `node`. If not named, the `node` is renamed to its type, and if it shares {@link name} with a sibling, a number is suffixed more appropriately. This operation is very slow. As such, it is recommended leaving this to `false`, which assigns a dummy name featuring `@` in both situations.
   * If `internal` is different than {@link INTERNAL_MODE_DISABLED}, the child will be added as internal node. These nodes are ignored by methods like {@link get_children}, unless their parameter `include_internal` is `true`. It also prevents these nodes being duplicated with their parent. The intended usage is to hide the internal nodes from the user, so the user won't accidentally delete or modify them. Used by some GUI nodes, e.g. {@link ColorPicker}.
   * **Note:** If `node` already has a parent, this method will fail. Use {@link remove_child} first to remove `node` from its current parent. For example:
   * If you need the child node to be added below a specific node in the list of children, use {@link add_sibling} instead of this method.
   * **Note:** If you want a child to be persisted to a {@link PackedScene}, you must set {@link owner} in addition to calling {@link add_child}. This is typically relevant for tool scripts ($DOCS_URL/tutorials/plugins/running_code_in_the_editor.html) and editor plugins ($DOCS_URL/tutorials/plugins/editor/index.html). If {@link add_child} is called without setting {@link owner}, the newly added {@link Node} will not be visible in the scene tree, though it will be visible in the 2D/3D view.
   */
  add_child(node: Node, force_readable_name?: boolean, internal?: int): void;
  /**
   * Adds a `sibling` node to this node's parent, and moves the added sibling right below this node.
   * If `force_readable_name` is `true`, improves the readability of the added `sibling`. If not named, the `sibling` is renamed to its type, and if it shares {@link name} with a sibling, a number is suffixed more appropriately. This operation is very slow. As such, it is recommended leaving this to `false`, which assigns a dummy name featuring `@` in both situations.
   * Use {@link add_child} instead of this method if you don't need the child node to be added below a specific node in the list of children.
   * **Note:** If this node is internal, the added sibling will be internal too (see {@link add_child}'s `internal` parameter).
   */
  add_sibling(sibling: Node, force_readable_name?: boolean): void;
  /**
   * Adds the node to the `group`. Groups can be helpful to organize a subset of nodes, for example `"enemies"` or `"collectables"`. See notes in the description, and the group methods in {@link SceneTree}.
   * If `persistent` is `true`, the group will be stored when saved inside a {@link PackedScene}. All groups created and displayed in the Groups dock are persistent.
   * **Note:** To improve performance, the order of group names is *not* guaranteed and may vary between project runs. Therefore, do not rely on the group order.
   * **Note:** {@link SceneTree}'s group methods will *not* work on this node if not inside the tree (see {@link is_inside_tree}).
   */
  add_to_group(group: GodotGroupNames, persistent?: boolean): void;
  add_to_group(group: string, persistent?: boolean): void;
  /**
   * Translates a `message`, using the translation catalogs configured in the Project Settings. Further `context` can be specified to help with the translation. Note that most {@link Control} nodes automatically translate their strings, so this method is mostly useful for formatted strings or custom drawn text.
   * This method works the same as {@link Object.tr}, with the addition of respecting the {@link auto_translate_mode} state.
   * If {@link Object.can_translate_messages} is `false`, or no translation is available, this method returns the `message` without changes. See {@link Object.set_message_translation}.
   * For detailed examples, see Internationalizing games ($DOCS_URL/tutorials/i18n/internationalizing_games.html).
   */
  atr(message: string, context?: string): string;
  /**
   * Translates a `message` or `plural_message`, using the translation catalogs configured in the Project Settings. Further `context` can be specified to help with the translation.
   * This method works the same as {@link Object.tr_n}, with the addition of respecting the {@link auto_translate_mode} state.
   * If {@link Object.can_translate_messages} is `false`, or no translation is available, this method returns `message` or `plural_message`, without changes. See {@link Object.set_message_translation}.
   * The `n` is the number, or amount, of the message's subject. It is used by the translation system to fetch the correct plural form for the current language.
   * For detailed examples, see Localization using gettext ($DOCS_URL/tutorials/i18n/localization_using_gettext.html).
   * **Note:** Negative and [float] numbers may not properly apply to some countable subjects. It's recommended to handle these cases with {@link atr}.
   */
  atr_n(message: string, plural_message: string, n: int, context?: string): string;
  /**
   * This function is similar to {@link Object.call_deferred} except that the call will take place when the node thread group is processed. If the node thread group processes in sub-threads, then the call will be done on that thread, right before {@link NOTIFICATION_PROCESS} or {@link NOTIFICATION_PHYSICS_PROCESS}, the {@link _process} or {@link _physics_process} or their internal versions are called.
   */
  call_deferred_thread_group(method: string, ...args: any[]): unknown;
  /**
   * This function ensures that the calling of this function will succeed, no matter whether it's being done from a thread or not. If called from a thread that is not allowed to call the function, the call will become deferred. Otherwise, the call will go through directly.
   */
  call_thread_safe(method: string, ...args: any[]): unknown;
  /**
   * Returns `true` if this node can automatically translate messages depending on the current locale. See {@link auto_translate_mode}, {@link atr}, and {@link atr_n}.
   */
  can_auto_translate(): boolean;
  /**
   * Returns `true` if the node can receive processing notifications and input callbacks ({@link NOTIFICATION_PROCESS}, {@link _input}, etc.) from the {@link SceneTree} and {@link Viewport}. The returned value depends on {@link process_mode}:
   * - If set to {@link PROCESS_MODE_PAUSABLE}, returns `true` when the game is processing, i.e. {@link SceneTree.paused} is `false`;
   * - If set to {@link PROCESS_MODE_WHEN_PAUSED}, returns `true` when the game is paused, i.e. {@link SceneTree.paused} is `true`;
   * - If set to {@link PROCESS_MODE_ALWAYS}, always returns `true`;
   * - If set to {@link PROCESS_MODE_DISABLED}, always returns `false`;
   * - If set to {@link PROCESS_MODE_INHERIT}, use the parent node's {@link process_mode} to determine the result.
   * If the node is not inside the tree, returns `false` no matter the value of {@link process_mode}.
   */
  can_process(): boolean;
  /**
   * Creates a new {@link Tween} and binds it to this node.
   * This is the equivalent of doing:
   * The Tween will start automatically on the next process frame or physics frame (depending on {@link Tween.TweenProcessMode}). See {@link Tween.bind_node} for more info on Tweens bound to nodes.
   * **Note:** The method can still be used when the node is not inside {@link SceneTree}. It can fail in an unlikely case of using a custom {@link MainLoop}.
   */
  create_tween(): Tween;
  /**
   * Duplicates the node, returning a new node with all of its properties, signals, groups, and children copied from the original, recursively. The behavior can be tweaked through the `flags` (see {@link DuplicateFlags}). Internal nodes are not duplicated.
   * **Note:** For nodes with a {@link Script} attached, if {@link Object._init} has been defined with required parameters, the duplicated node will not have a {@link Script}.
   * **Note:** By default, this method will duplicate only properties marked for serialization (i.e. using {@link @GlobalScope.PROPERTY_USAGE_STORAGE}, or in GDScript, ). If you want to duplicate all properties, use {@link DUPLICATE_INTERNAL_STATE}.
   */
  duplicate(flags?: int): Node;
  /**
   * Finds the first descendant of this node whose {@link name} matches `pattern`, returning `null` if no match is found. The matching is done against node names, *not* their paths, through {@link String.match}. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character.
   * If `recursive` is `false`, only this node's direct children are checked. Nodes are checked in tree order, so this node's first direct child is checked first, then its own direct children, etc., before moving to the second direct child, and so on. Internal children are also included in the search (see `internal` parameter in {@link add_child}).
   * If `owned` is `true`, only descendants with a valid {@link owner} node are checked.
   * **Note:** This method can be very slow. Consider storing a reference to the found node in a variable. Alternatively, use {@link get_node} with unique names (see {@link unique_name_in_owner}).
   * **Note:** To find all descendant nodes matching a pattern or a class type, see {@link find_children}.
   */
  find_child(pattern: string, recursive?: boolean, owned?: boolean): Node;
  /**
   * Finds all descendants of this node whose names match `pattern`, returning an empty {@link Array} if no match is found. The matching is done against node names, *not* their paths, through {@link String.match}. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character.
   * If `type` is not empty, only descendants inheriting from `type` are included (see {@link Object.is_class}).
   * If `recursive` is `false`, only this node's direct children are checked. Nodes are checked in tree order, so this node's first direct child is checked first, then its own direct children, etc., before moving to the second direct child, and so on. Internal children are also included in the search (see `internal` parameter in {@link add_child}).
   * If `owned` is `true`, only descendants with a valid {@link owner} node are checked.
   * **Note:** This method can be very slow. Consider storing references to the found nodes in a variable.
   * **Note:** To find a single descendant node matching a pattern, see {@link find_child}.
   */
  find_children(pattern: string, type_?: string, recursive?: boolean, owned?: boolean): Array<Node>;
  /**
   * Finds the first ancestor of this node whose {@link name} matches `pattern`, returning `null` if no match is found. The matching is done through {@link String.match}. As such, it is case-sensitive, `"*"` matches zero or more characters, and `"?"` matches any single character. See also {@link find_child} and {@link find_children}.
   * **Note:** As this method walks upwards in the scene tree, it can be slow in large, deeply nested nodes. Consider storing a reference to the found node in a variable. Alternatively, use {@link get_node} with unique names (see {@link unique_name_in_owner}).
   */
  find_parent(pattern: string): Node;
  /**
   * Returns main accessibility element RID.
   * **Note:** This method should be called only during accessibility information updates ({@link NOTIFICATION_ACCESSIBILITY_UPDATE}).
   */
  get_accessibility_element(): RID;
  /**
   * Fetches a child node by its index. Each child node has an index relative to its siblings (see {@link get_index}). The first child is at index 0. Negative values can also be used to start from the end of the list. This method can be used in combination with {@link get_child_count} to iterate over this node's children. If no child exists at the given index, this method returns `null` and an error is generated.
   * If `include_internal` is `false`, internal children are ignored (see {@link add_child}'s `internal` parameter).
   * **Note:** To fetch a node by {@link NodePath}, use {@link get_node}.
   */
  get_child(idx: int, include_internal?: boolean): Node;
  /**
   * Returns the number of children of this node.
   * If `include_internal` is `false`, internal children are not counted (see {@link add_child}'s `internal` parameter).
   */
  get_child_count(include_internal?: boolean): int;
  /**
   * Returns all children of this node inside an {@link Array}.
   * If `include_internal` is `false`, excludes internal children from the returned array (see {@link add_child}'s `internal` parameter).
   */
  get_children(include_internal?: boolean): Array<Node>;
  /**
   * Returns an {@link Array} of group names that the node has been added to.
   * **Note:** To improve performance, the order of group names is *not* guaranteed and may vary between project runs. Therefore, do not rely on the group order.
   * **Note:** This method may also return some group names starting with an underscore (`_`). These are internally used by the engine. To avoid conflicts, do not use custom groups starting with underscores. To exclude internal groups, see the following code snippet:
   */
  get_groups(): Array<string>;
  /**
   * Returns this node's order among its siblings. The first node's index is `0`. See also {@link get_child}.
   * If `include_internal` is `false`, returns the index ignoring internal children. The first, non-internal child will have an index of `0` (see {@link add_child}'s `internal` parameter).
   */
  get_index(include_internal?: boolean): int;
  /**
   * Returns the {@link Window} that contains this node, or the last exclusive child in a chain of windows starting with the one that contains this node.
   */
  get_last_exclusive_window(): Window;
  /**
   * Returns the peer ID of the multiplayer authority for this node. See {@link set_multiplayer_authority}.
   */
  get_multiplayer_authority(): int;
  /**
   * Fetches a node. The {@link NodePath} can either be a relative path (from this node), or an absolute path (from the {@link SceneTree.root}) to a node. If `path` does not point to a valid node, generates an error and returns `null`. Attempts to access methods on the return value will result in an *"Attempt to call <method> on a null instance."* error.
   * **Note:** Fetching by absolute path only works when the node is inside the scene tree (see {@link is_inside_tree}).
   * **Example:** Assume this method is called from the Character node, inside the following tree:
   * [codeblock lang=text]
   * ┖╴root
   * ┠╴Character (you are here!)
   * ┃  ┠╴Sword
   * ┃  ┖╴Backpack
   * ┃     ┖╴Dagger
   * ┠╴MyGame
   * ┖╴Swamp
   * ┠╴Alligator
   * ┠╴Mosquito
   * ┖╴Goblin
   * [/codeblock]
   * The following calls will return a valid node:
   */
  get_node(path: string): Node | null;
  /**
   * Fetches a node and its most nested resource as specified by the {@link NodePath}'s subname. Returns an {@link Array} of size `3` where:
   * - Element `0` is the {@link Node}, or `null` if not found;
   * - Element `1` is the subname's last nested {@link Resource}, or `null` if not found;
   * - Element `2` is the remaining {@link NodePath}, referring to an existing, non-{@link Resource} property (see {@link Object.get_indexed}).
   * **Example:** Assume that the child's {@link Sprite2D.texture} has been assigned an {@link AtlasTexture}:
   */
  get_node_and_resource(path: string): Array<unknown>;
  /**
   * Fetches a node by {@link NodePath}. Similar to {@link get_node}, but does not generate an error if `path` does not point to a valid node.
   */
  get_node_or_null(path: string): Node | null;
  /**
   * Returns a {@link Dictionary} mapping method names to their RPC configuration defined for this node using {@link rpc_config}.
   * **Note:** This method only returns the RPC configuration assigned via {@link rpc_config}. See {@link Script.get_rpc_config} to retrieve the RPCs defined by the {@link Script}.
   */
  get_node_rpc_config(): unknown;
  /**
   * Returns object IDs of all orphan nodes (nodes outside the {@link SceneTree}). Used for debugging.
   * **Note:** {@link get_orphan_node_ids} only works in debug builds. When called in a project exported in release mode, {@link get_orphan_node_ids} will return an empty array.
   */
  static get_orphan_node_ids(): Array<int>;
  /** Returns this node's parent node, or `null` if the node doesn't have a parent. */
  get_parent(): Node;
  /**
   * Returns the node's absolute path, relative to the {@link SceneTree.root}. If the node is not inside the scene tree, this method fails and returns an empty {@link NodePath}.
   */
  get_path(): string;
  /**
   * Returns the relative {@link NodePath} from this node to the specified `node`. Both nodes must be in the same {@link SceneTree} or scene hierarchy, otherwise this method fails and returns an empty {@link NodePath}.
   * If `use_unique_path` is `true`, returns the shortest path accounting for this node's unique name (see {@link unique_name_in_owner}).
   * **Note:** If you get a relative path which starts from a unique node, the path may be longer than a normal relative path, due to the addition of the unique node's name.
   */
  get_path_to(node: Node, use_unique_path?: boolean): string;
  /**
   * Returns the time elapsed (in seconds) since the last physics callback. This value is identical to {@link _physics_process}'s `delta` parameter, and is often consistent at run-time, unless {@link Engine.physics_ticks_per_second} is changed. See also {@link NOTIFICATION_PHYSICS_PROCESS}.
   * **Note:** The returned value will be larger than expected if running at a framerate lower than {@link Engine.physics_ticks_per_second} / {@link Engine.max_physics_steps_per_frame} FPS. This is done to avoid "spiral of death" scenarios where performance would plummet due to an ever-increasing number of physics steps per frame. This behavior affects both {@link _process} and {@link _physics_process}. As a result, avoid using `delta` for time measurements in real-world seconds. Use the {@link Time} singleton's methods for this purpose instead, such as {@link Time.get_ticks_usec}.
   */
  get_physics_process_delta_time(): float;
  /**
   * Returns the time elapsed (in seconds) since the last process callback. This value is identical to {@link _process}'s `delta` parameter, and may vary from frame to frame. See also {@link NOTIFICATION_PROCESS}.
   * **Note:** The returned value will be larger than expected if running at a framerate lower than {@link Engine.physics_ticks_per_second} / {@link Engine.max_physics_steps_per_frame} FPS. This is done to avoid "spiral of death" scenarios where performance would plummet due to an ever-increasing number of physics steps per frame. This behavior affects both {@link _process} and {@link _physics_process}. As a result, avoid using `delta` for time measurements in real-world seconds. Use the {@link Time} singleton's methods for this purpose instead, such as {@link Time.get_ticks_usec}.
   */
  get_process_delta_time(): float;
  /**
   * Returns `true` if this node is an instance load placeholder. See {@link InstancePlaceholder} and {@link set_scene_instance_load_placeholder}.
   */
  get_scene_instance_load_placeholder(): boolean;
  /**
   * Returns the {@link SceneTree} that contains this node. If this node is not inside the tree, generates an error and returns `null`. See also {@link is_inside_tree}.
   */
  get_tree(): SceneTree;
  /**
   * Returns the tree as a {@link String}. Used mainly for debugging purposes. This version displays the path relative to the current node, and is good for copy/pasting into the {@link get_node} function. It also can be used in game UI/UX.
   * May print, for example:
   * [codeblock lang=text]
   * TheGame
   * TheGame/Menu
   * TheGame/Menu/Label
   * TheGame/Menu/Camera2D
   * TheGame/SplashScreen
   * TheGame/SplashScreen/Camera2D
   * [/codeblock]
   */
  get_tree_string(): string;
  /**
   * Similar to {@link get_tree_string}, this returns the tree as a {@link String}. This version displays a more graphical representation similar to what is displayed in the Scene Dock. It is useful for inspecting larger trees.
   * May print, for example:
   * [codeblock lang=text]
   * ┖╴TheGame
   * ┠╴Menu
   * ┃  ┠╴Label
   * ┃  ┖╴Camera2D
   * ┖╴SplashScreen
   * ┖╴Camera2D
   * [/codeblock]
   */
  get_tree_string_pretty(): string;
  /**
   * Returns the node's closest {@link Viewport} ancestor, if the node is inside the tree. Otherwise, returns `null`.
   */
  get_viewport(): Viewport;
  /**
   * Returns the {@link Window} that contains this node. If the node is in the main window, this is equivalent to getting the root node (`get_tree().get_root()`).
   */
  get_window(): Window;
  /** Returns `true` if the `path` points to a valid node. See also {@link get_node}. */
  has_node(path: string): boolean;
  /**
   * Returns `true` if `path` points to a valid node and its subnames point to a valid {@link Resource}, e.g. `Area2D/CollisionShape2D:shape`. Properties that are not {@link Resource} types (such as nodes or other {@link Variant} types) are not considered. See also {@link get_node_and_resource}.
   */
  has_node_and_resource(path: string): boolean;
  /** Returns `true` if the given `node` is a direct or indirect child of this node. */
  is_ancestor_of(node: Node): boolean;
  /**
   * Returns `true` if the node is folded (collapsed) in the Scene dock. This method is intended to be used in editor plugins and tools. See also {@link set_display_folded}.
   */
  is_displayed_folded(): boolean;
  /**
   * Returns `true` if `node` has editable children enabled relative to this node. This method is intended to be used in editor plugins and tools. See also {@link set_editable_instance}.
   */
  is_editable_instance(node: Node): boolean;
  /**
   * Returns `true` if the given `node` occurs later in the scene hierarchy than this node. A node occurring later is usually processed last.
   */
  is_greater_than(node: Node): boolean;
  /**
   * Returns `true` if this node has been added to the given `group`. See {@link add_to_group} and {@link remove_from_group}. See also notes in the description, and the {@link SceneTree}'s group methods.
   */
  is_in_group(group: GodotGroupNames): boolean;
  is_in_group(group: string): boolean;
  /** Returns `true` if this node is currently inside a {@link SceneTree}. See also {@link get_tree}. */
  is_inside_tree(): boolean;
  /** Returns `true` if the local system is the multiplayer authority of this node. */
  is_multiplayer_authority(): boolean;
  /**
   * Returns `true` if the node is ready, i.e. it's inside scene tree and all its children are initialized.
   * {@link request_ready} resets it back to `false`.
   */
  is_node_ready(): boolean;
  /** Returns `true` if the node is part of the scene currently opened in the editor. */
  is_part_of_edited_scene(): boolean;
  /**
   * Returns `true` if physics interpolation is enabled for this node (see {@link physics_interpolation_mode}).
   * **Note:** Interpolation will only be active if both the flag is set **and** physics interpolation is enabled within the {@link SceneTree}. This can be tested using {@link is_physics_interpolated_and_enabled}.
   */
  is_physics_interpolated(): boolean;
  /**
   * Returns `true` if physics interpolation is enabled (see {@link physics_interpolation_mode}) **and** enabled in the {@link SceneTree}.
   * This is a convenience version of {@link is_physics_interpolated} that also checks whether physics interpolation is enabled globally.
   * See {@link SceneTree.physics_interpolation} and {@link ProjectSettings.physics/common/physics_interpolation}.
   */
  is_physics_interpolated_and_enabled(): boolean;
  /** Returns `true` if physics processing is enabled (see {@link set_physics_process}). */
  is_physics_processing(): boolean;
  /**
   * Returns `true` if internal physics processing is enabled (see {@link set_physics_process_internal}).
   */
  is_physics_processing_internal(): boolean;
  /** Returns `true` if processing is enabled (see {@link set_process}). */
  is_processing(): boolean;
  /** Returns `true` if the node is processing input (see {@link set_process_input}). */
  is_processing_input(): boolean;
  /** Returns `true` if internal processing is enabled (see {@link set_process_internal}). */
  is_processing_internal(): boolean;
  /** Returns `true` if the node is processing shortcuts (see {@link set_process_shortcut_input}). */
  is_processing_shortcut_input(): boolean;
  /** Returns `true` if the node is processing unhandled input (see {@link set_process_unhandled_input}). */
  is_processing_unhandled_input(): boolean;
  /**
   * Returns `true` if the node is processing unhandled key input (see {@link set_process_unhandled_key_input}).
   */
  is_processing_unhandled_key_input(): boolean;
  /**
   * Moves `child_node` to the given index. A node's index is the order among its siblings. If `to_index` is negative, the index is counted from the end of the list. See also {@link get_child} and {@link get_index}.
   * **Note:** The processing order of several engine callbacks ({@link _ready}, {@link _process}, etc.) and notifications sent through {@link propagate_notification} is affected by tree order. {@link CanvasItem} nodes are also rendered in tree order. See also {@link process_priority}.
   */
  move_child(child_node: Node, to_index: int): void;
  /** Similar to {@link call_deferred_thread_group}, but for notifications. */
  notify_deferred_thread_group(what: int): void;
  /** Similar to {@link call_thread_safe}, but for notifications. */
  notify_thread_safe(what: int): void;
  /**
   * Prints all orphan nodes (nodes outside the {@link SceneTree}). Useful for debugging.
   * **Note:** This method only works in debug builds. It does nothing in a project exported in release mode.
   */
  static print_orphan_nodes(): void;
  /**
   * Prints the node and its children to the console, recursively. The node does not have to be inside the tree. This method outputs {@link NodePath}s relative to this node, and is good for copy/pasting into {@link get_node}. See also {@link print_tree_pretty}.
   * May print, for example:
   * [codeblock lang=text]
   * .
   * Menu
   * Menu/Label
   * Menu/Camera2D
   * SplashScreen
   * SplashScreen/Camera2D
   * [/codeblock]
   */
  print_tree(): void;
  /**
   * Prints the node and its children to the console, recursively. The node does not have to be inside the tree. Similar to {@link print_tree}, but the graphical representation looks like what is displayed in the editor's Scene dock. It is useful for inspecting larger trees.
   * May print, for example:
   * [codeblock lang=text]
   * ┖╴TheGame
   * ┠╴Menu
   * ┃  ┠╴Label
   * ┃  ┖╴Camera2D
   * ┖╴SplashScreen
   * ┖╴Camera2D
   * [/codeblock]
   */
  print_tree_pretty(): void;
  /**
   * Calls the given `method` name, passing `args` as arguments, on this node and all of its children, recursively.
   * If `parent_first` is `true`, the method is called on this node first, then on all of its children. If `false`, the children's methods are called first.
   */
  propagate_call(method: string, args?: Array<unknown>, parent_first?: boolean): void;
  /** Calls {@link Object.notification} with `what` on this node and all of its children, recursively. */
  propagate_notification(what: int): void;
  /** Queues an accessibility information update for this node. */
  queue_accessibility_update(): void;
  /**
   * Queues this node to be deleted at the end of the current frame. When deleted, all of its children are deleted as well, and all references to the node and its children become invalid.
   * Unlike with {@link Object.free}, the node is not deleted instantly, and it can still be accessed before deletion. It is also safe to call {@link queue_free} multiple times. Use {@link Object.is_queued_for_deletion} to check if the node will be deleted at the end of the frame.
   * **Note:** The node will only be freed after all other deferred calls are finished. Using this method is not always the same as calling {@link Object.free} through {@link Object.call_deferred}.
   */
  queue_free(): void;
  /**
   * Removes a child `node`. The `node`, along with its children, are **not** deleted. To delete a node, see {@link queue_free}.
   * **Note:** When this node is inside the tree, this method sets the {@link owner} of the removed `node` (or its descendants) to `null`, if their {@link owner} is no longer an ancestor (see {@link is_ancestor_of}).
   */
  remove_child(node: Node): void;
  /**
   * Removes the node from the given `group`. Does nothing if the node is not in the `group`. See also notes in the description, and the {@link SceneTree}'s group methods.
   */
  remove_from_group(group: GodotGroupNames): void;
  remove_from_group(group: string): void;
  /**
   * Changes the parent of this {@link Node} to the `new_parent`. The node needs to already have a parent. The node's {@link owner} is preserved if its owner is still reachable from the new location (i.e., the node is still a descendant of the new parent after the operation).
   * If `keep_global_transform` is `true`, the node's global transform will be preserved if supported. {@link Node2D}, {@link Node3D} and {@link Control} support this argument (but {@link Control} keeps only position).
   */
  reparent(new_parent: Node, keep_global_transform?: boolean): void;
  /**
   * Replaces this node by the given `node`. All children of this node are moved to `node`.
   * If `keep_groups` is `true`, the `node` is added to the same groups that the replaced node is in (see {@link add_to_group}).
   * **Warning:** The replaced node is removed from the tree, but it is **not** deleted. To prevent memory leaks, store a reference to the node in a variable, or use {@link Object.free}.
   */
  replace_by(node: Node, keep_groups?: boolean): void;
  /**
   * Requests {@link _ready} to be called again the next time the node enters the tree. Does **not** immediately call {@link _ready}.
   * **Note:** This method only affects the current node. If the node's children also need to request ready, this method needs to be called for each one of them. When the node and its children enter the tree again, the order of {@link _ready} callbacks will be the same as normal.
   */
  request_ready(): void;
  /**
   * When physics interpolation is active, moving a node to a radically different transform (such as placement within a level) can result in a visible glitch as the object is rendered moving from the old to new position over the physics tick.
   * That glitch can be prevented by calling this method, which temporarily disables interpolation until the physics tick is complete.
   * The notification {@link NOTIFICATION_RESET_PHYSICS_INTERPOLATION} will be received by the node and all children recursively.
   * **Note:** This function should be called **after** moving the node, rather than before.
   */
  reset_physics_interpolation(): void;
  /**
   * Sends a remote procedure call request for the given `method` to peers on the network (and locally), sending additional arguments to the method called by the RPC. The call request will only be received by nodes with the same {@link NodePath}, including the exact same {@link name}. Behavior depends on the RPC configuration for the given `method` (see {@link rpc_config} and ). By default, methods are not exposed to RPCs.
   * May return {@link OK} if the call is successful, {@link ERR_INVALID_PARAMETER} if the arguments passed in the `method` do not match, {@link ERR_UNCONFIGURED} if the node's {@link multiplayer} cannot be fetched (such as when the node is not inside the tree), {@link ERR_CONNECTION_ERROR} if {@link multiplayer}'s connection is not available.
   * **Note:** You can only safely use RPCs on clients after you received the {@link MultiplayerAPI.connected_to_server} signal from the {@link MultiplayerAPI}. You also need to keep track of the connection state, either by the {@link MultiplayerAPI} signals like {@link MultiplayerAPI.server_disconnected} or by checking (`get_multiplayer().peer.get_connection_status() == CONNECTION_CONNECTED`).
   */
  rpc(method: string, ...args: any[]): int;
  /**
   * Changes the RPC configuration for the given `method`. `config` should either be `null` to disable the feature (as by default), or a {@link Dictionary} containing the following entries:
   * - `rpc_mode`: see {@link MultiplayerAPI.RPCMode};
   * - `transfer_mode`: see {@link MultiplayerPeer.TransferMode};
   * - `call_local`: if `true`, the method will also be called locally;
   * - `channel`: an [int] representing the channel to send the RPC on.
   * **Note:** In GDScript, this method corresponds to the  annotation, with various parameters passed (`@rpc(any)`, `@rpc(authority)`...). See also the high-level multiplayer ($DOCS_URL/tutorials/networking/high_level_multiplayer.html) tutorial.
   */
  rpc_config(method: string, config: unknown): void;
  /**
   * Sends a {@link rpc} to a specific peer identified by `peer_id` (see {@link MultiplayerPeer.set_target_peer}).
   * May return {@link OK} if the call is successful, {@link ERR_INVALID_PARAMETER} if the arguments passed in the `method` do not match, {@link ERR_UNCONFIGURED} if the node's {@link multiplayer} cannot be fetched (such as when the node is not inside the tree), {@link ERR_CONNECTION_ERROR} if {@link multiplayer}'s connection is not available.
   */
  rpc_id(peer_id: int, method: string, ...args: any[]): int;
  /** Similar to {@link call_deferred_thread_group}, but for setting properties. */
  set_deferred_thread_group(property: string, value: unknown): void;
  /**
   * If set to `true`, the node appears folded in the Scene dock. As a result, all of its children are hidden. This method is intended to be used in editor plugins and tools, but it also works in release builds. See also {@link is_displayed_folded}.
   */
  set_display_folded(fold: boolean): void;
  /**
   * Set to `true` to allow all nodes owned by `node` to be available, and editable, in the Scene dock, even if their {@link owner} is not the scene root. This method is intended to be used in editor plugins and tools, but it also works in release builds. See also {@link is_editable_instance}.
   */
  set_editable_instance(node: Node, is_editable: boolean): void;
  /**
   * Sets the node's multiplayer authority to the peer with the given peer `id`. The multiplayer authority is the peer that has authority over the node on the network. Defaults to peer ID 1 (the server). Useful in conjunction with {@link rpc_config} and the {@link MultiplayerAPI}.
   * If `recursive` is `true`, the given peer is recursively set as the authority for all children of this node.
   * **Warning:** This does **not** automatically replicate the new authority to other peers. It is the developer's responsibility to do so. You may replicate the new authority's information using {@link MultiplayerSpawner.spawn_function}, an RPC, or a {@link MultiplayerSynchronizer}. Furthermore, the parent's authority does **not** propagate to newly added children.
   */
  set_multiplayer_authority(id: int, recursive?: boolean): void;
  /**
   * If set to `true`, enables physics (fixed framerate) processing. When a node is being processed, it will receive a {@link NOTIFICATION_PHYSICS_PROCESS} at a fixed (usually 60 FPS, see {@link Engine.physics_ticks_per_second} to change) interval (and the {@link _physics_process} callback will be called if it exists).
   * **Note:** If {@link _physics_process} is overridden, this will be automatically enabled before {@link _ready} is called.
   */
  set_physics_process(enable: boolean): void;
  /**
   * If set to `true`, enables internal physics for this node. Internal physics processing happens in isolation from the normal {@link _physics_process} calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or physics processing is disabled for scripting ({@link set_physics_process}).
   * **Warning:** Built-in nodes rely on internal processing for their internal logic. Disabling it is unsafe and may lead to unexpected behavior. Use this method if you know what you are doing.
   */
  set_physics_process_internal(enable: boolean): void;
  /**
   * If set to `true`, enables processing. When a node is being processed, it will receive a {@link NOTIFICATION_PROCESS} on every drawn frame (and the {@link _process} callback will be called if it exists).
   * **Note:** If {@link _process} is overridden, this will be automatically enabled before {@link _ready} is called.
   * **Note:** This method only affects the {@link _process} callback, i.e. it has no effect on other callbacks like {@link _physics_process}. If you want to disable all processing for the node, set {@link process_mode} to {@link PROCESS_MODE_DISABLED}.
   */
  set_process(enable: boolean): void;
  /**
   * If set to `true`, enables input processing.
   * **Note:** If {@link _input} is overridden, this will be automatically enabled before {@link _ready} is called. Input processing is also already enabled for GUI controls, such as {@link Button} and {@link TextEdit}.
   */
  set_process_input(enable: boolean): void;
  /**
   * If set to `true`, enables internal processing for this node. Internal processing happens in isolation from the normal {@link _process} calls and is used by some nodes internally to guarantee proper functioning even if the node is paused or processing is disabled for scripting ({@link set_process}).
   * **Warning:** Built-in nodes rely on internal processing for their internal logic. Disabling it is unsafe and may lead to unexpected behavior. Use this method if you know what you are doing.
   */
  set_process_internal(enable: boolean): void;
  /**
   * If set to `true`, enables shortcut processing for this node.
   * **Note:** If {@link _shortcut_input} is overridden, this will be automatically enabled before {@link _ready} is called.
   */
  set_process_shortcut_input(enable: boolean): void;
  /**
   * If set to `true`, enables unhandled input processing. It enables the node to receive all input that was not previously handled (usually by a {@link Control}).
   * **Note:** If {@link _unhandled_input} is overridden, this will be automatically enabled before {@link _ready} is called. Unhandled input processing is also already enabled for GUI controls, such as {@link Button} and {@link TextEdit}.
   */
  set_process_unhandled_input(enable: boolean): void;
  /**
   * If set to `true`, enables unhandled key input processing.
   * **Note:** If {@link _unhandled_key_input} is overridden, this will be automatically enabled before {@link _ready} is called.
   */
  set_process_unhandled_key_input(enable: boolean): void;
  /**
   * If set to `true`, the node becomes an {@link InstancePlaceholder} when packed and instantiated from a {@link PackedScene}. See also {@link get_scene_instance_load_placeholder}.
   */
  set_scene_instance_load_placeholder(load_placeholder: boolean): void;
  /** Similar to {@link call_thread_safe}, but for setting properties. */
  set_thread_safe(property: string, value: unknown): void;
  /**
   * Makes this node inherit the translation domain from its parent node. If this node has no parent, the main translation domain will be used.
   * This is the default behavior for all nodes. Calling {@link Object.set_translation_domain} disables this behavior.
   */
  set_translation_domain_inherited(): void;
  /**
   * Refreshes the warnings displayed for this node in the Scene dock. Use {@link _get_configuration_warnings} to customize the warning messages to display.
   */
  update_configuration_warnings(): void;

  /**
   * Emitted when the child `node` enters the {@link SceneTree}, usually because this node entered the tree (see {@link tree_entered}), or {@link add_child} has been called.
   * This signal is emitted *after* the child node's own {@link NOTIFICATION_ENTER_TREE} and {@link tree_entered}.
   */
  child_entered_tree: Signal<[Node]>;
  /**
   * Emitted when the child `node` is about to exit the {@link SceneTree}, usually because this node is exiting the tree (see {@link tree_exiting}), or because the child `node` is being removed or freed.
   * When this signal is received, the child `node` is still accessible inside the tree. This signal is emitted *after* the child node's own {@link tree_exiting} and {@link NOTIFICATION_EXIT_TREE}.
   */
  child_exiting_tree: Signal<[Node]>;
  /**
   * Emitted when the list of children is changed. This happens when child nodes are added, moved or removed.
   */
  child_order_changed: Signal<[]>;
  /** Emitted when the node's editor description field changed. */
  editor_description_changed: Signal<[Node]>;
  /**
   * Emitted when an attribute of the node that is relevant to the editor is changed. Only emitted in the editor.
   */
  editor_state_changed: Signal<[]>;
  /** Emitted when the node is considered ready, after {@link _ready} is called. */
  ready: Signal<[]>;
  /** Emitted when the node's {@link name} is changed, if the node is inside the tree. */
  renamed: Signal<[]>;
  /**
   * Emitted when this node is being replaced by the `node`, see {@link replace_by}.
   * This signal is emitted *after* `node` has been added as a child of the original parent node, but *before* all original child nodes have been reparented to `node`.
   */
  replacing_by: Signal<[Node]>;
  /**
   * Emitted when the node enters the tree.
   * This signal is emitted *after* the related {@link NOTIFICATION_ENTER_TREE} notification.
   */
  tree_entered: Signal<[]>;
  /**
   * Emitted after the node exits the tree and is no longer active.
   * This signal is emitted *after* the related {@link NOTIFICATION_EXIT_TREE} notification.
   */
  tree_exited: Signal<[]>;
  /**
   * Emitted when the node is just about to exit the tree. The node is still valid. As such, this is the right place for de-initialization (or a "destructor", if you will).
   * This signal is emitted *after* the node's {@link _exit_tree}, and *before* the related {@link NOTIFICATION_EXIT_TREE}.
   */
  tree_exiting: Signal<[]>;

  // enum ProcessMode
  /**
   * Inherits {@link process_mode} from the node's parent. This is the default for any newly created node.
   */
  static readonly PROCESS_MODE_INHERIT: int;
  /**
   * Processes when {@link SceneTree.paused} is `false`. This is the inverse of {@link PROCESS_MODE_WHEN_PAUSED}, and the default for the root node.
   */
  static readonly PROCESS_MODE_PAUSABLE: int;
  /**
   * Processes **only** when {@link SceneTree.paused} is `true`. This is the inverse of {@link PROCESS_MODE_PAUSABLE}.
   */
  static readonly PROCESS_MODE_WHEN_PAUSED: int;
  /**
   * Always processes. Keeps processing, ignoring {@link SceneTree.paused}. This is the inverse of {@link PROCESS_MODE_DISABLED}.
   */
  static readonly PROCESS_MODE_ALWAYS: int;
  /**
   * Never processes. Completely disables processing, ignoring {@link SceneTree.paused}. This is the inverse of {@link PROCESS_MODE_ALWAYS}.
   */
  static readonly PROCESS_MODE_DISABLED: int;
  // enum ProcessThreadGroup
  /**
   * Process this node based on the thread group mode of the first parent (or grandparent) node that has a thread group mode that is not inherit. See {@link process_thread_group} for more information.
   */
  static readonly PROCESS_THREAD_GROUP_INHERIT: int;
  /**
   * Process this node (and child nodes set to inherit) on the main thread. See {@link process_thread_group} for more information.
   */
  static readonly PROCESS_THREAD_GROUP_MAIN_THREAD: int;
  /**
   * Process this node (and child nodes set to inherit) on a sub-thread. See {@link process_thread_group} for more information.
   */
  static readonly PROCESS_THREAD_GROUP_SUB_THREAD: int;
  // enum ProcessThreadMessages
  /**
   * Allows this node to process threaded messages created with {@link call_deferred_thread_group} right before {@link _process} is called.
   */
  static readonly FLAG_PROCESS_THREAD_MESSAGES: int;
  /**
   * Allows this node to process threaded messages created with {@link call_deferred_thread_group} right before {@link _physics_process} is called.
   */
  static readonly FLAG_PROCESS_THREAD_MESSAGES_PHYSICS: int;
  /**
   * Allows this node to process threaded messages created with {@link call_deferred_thread_group} right before either {@link _process} or {@link _physics_process} are called.
   */
  static readonly FLAG_PROCESS_THREAD_MESSAGES_ALL: int;
  // enum PhysicsInterpolationMode
  /**
   * Inherits {@link physics_interpolation_mode} from the node's parent. This is the default for any newly created node.
   */
  static readonly PHYSICS_INTERPOLATION_MODE_INHERIT: int;
  /**
   * Enables physics interpolation for this node and for children set to {@link PHYSICS_INTERPOLATION_MODE_INHERIT}. This is the default for the root node.
   */
  static readonly PHYSICS_INTERPOLATION_MODE_ON: int;
  /**
   * Disables physics interpolation for this node and for children set to {@link PHYSICS_INTERPOLATION_MODE_INHERIT}.
   */
  static readonly PHYSICS_INTERPOLATION_MODE_OFF: int;
  // enum DuplicateFlags
  /**
   * Duplicate the node's signal connections that are connected with the {@link Object.CONNECT_PERSIST} flag.
   */
  static readonly DUPLICATE_SIGNALS: int;
  /** Duplicate the node's groups. */
  static readonly DUPLICATE_GROUPS: int;
  /**
   * Duplicate the node's script (also overriding the duplicated children's scripts, if combined with {@link DUPLICATE_USE_INSTANTIATION}).
   */
  static readonly DUPLICATE_SCRIPTS: int;
  /**
   * Duplicate using {@link PackedScene.instantiate}. If the node comes from a scene saved on disk, reuses {@link PackedScene.instantiate} as the base for the duplicated node and its children.
   */
  static readonly DUPLICATE_USE_INSTANTIATION: int;
  /**
   * Duplicate also non-serializable variables (i.e. without {@link @GlobalScope.PROPERTY_USAGE_STORAGE}).
   */
  static readonly DUPLICATE_INTERNAL_STATE: int;
  /** Duplicate using default flags. This constant is useful to add or remove a single flag. */
  static readonly DUPLICATE_DEFAULT: int;
  // enum InternalMode
  /** The node will not be internal. */
  static readonly INTERNAL_MODE_DISABLED: int;
  /** The node will be placed at the beginning of the parent's children, before any non-internal sibling. */
  static readonly INTERNAL_MODE_FRONT: int;
  /** The node will be placed at the end of the parent's children, after any non-internal sibling. */
  static readonly INTERNAL_MODE_BACK: int;
  // enum AutoTranslateMode
  /**
   * Inherits {@link auto_translate_mode} from the node's parent. This is the default for any newly created node.
   */
  static readonly AUTO_TRANSLATE_MODE_INHERIT: int;
  /**
   * Always automatically translate. This is the inverse of {@link AUTO_TRANSLATE_MODE_DISABLED}, and the default for the root node.
   */
  static readonly AUTO_TRANSLATE_MODE_ALWAYS: int;
  /**
   * Never automatically translate. This is the inverse of {@link AUTO_TRANSLATE_MODE_ALWAYS}.
   * String parsing for translation template generation will be skipped for this node and children that are set to {@link AUTO_TRANSLATE_MODE_INHERIT}.
   */
  static readonly AUTO_TRANSLATE_MODE_DISABLED: int;

  /**
   * Notification received when the node enters a {@link SceneTree}. See {@link _enter_tree}.
   * This notification is received *before* the related {@link tree_entered} signal.
   */
  static readonly NOTIFICATION_ENTER_TREE: int;
  /**
   * Notification received when the node is about to exit a {@link SceneTree}. See {@link _exit_tree}.
   * This notification is received *after* the related {@link tree_exiting} signal.
   * This notification is sent in reversed order.
   */
  static readonly NOTIFICATION_EXIT_TREE: int;
  static readonly NOTIFICATION_MOVED_IN_PARENT: int;
  /** Notification received when the node is ready. See {@link _ready}. */
  static readonly NOTIFICATION_READY: int;
  /** Notification received when the node is paused. See {@link process_mode}. */
  static readonly NOTIFICATION_PAUSED: int;
  /** Notification received when the node is unpaused. See {@link process_mode}. */
  static readonly NOTIFICATION_UNPAUSED: int;
  /**
   * Notification received from the tree every physics frame when {@link is_physics_processing} returns `true`. See {@link _physics_process}.
   */
  static readonly NOTIFICATION_PHYSICS_PROCESS: int;
  /**
   * Notification received from the tree every rendered frame when {@link is_processing} returns `true`. See {@link _process}.
   */
  static readonly NOTIFICATION_PROCESS: int;
  /**
   * Notification received when the node is set as a child of another node (see {@link add_child} and {@link add_sibling}).
   * **Note:** This does *not* mean that the node entered the {@link SceneTree}.
   */
  static readonly NOTIFICATION_PARENTED: int;
  /**
   * Notification received when the parent node calls {@link remove_child} on this node.
   * **Note:** This does *not* mean that the node exited the {@link SceneTree}.
   */
  static readonly NOTIFICATION_UNPARENTED: int;
  /**
   * Notification received *only* by the newly instantiated scene root node, when {@link PackedScene.instantiate} is completed.
   */
  static readonly NOTIFICATION_SCENE_INSTANTIATED: int;
  /**
   * Notification received when a drag operation begins. All nodes receive this notification, not only the dragged one.
   * Can be triggered either by dragging a {@link Control} that provides drag data (see {@link Control._get_drag_data}) or using {@link Control.force_drag}.
   * Use {@link Viewport.gui_get_drag_data} to get the dragged data.
   */
  static readonly NOTIFICATION_DRAG_BEGIN: int;
  /**
   * Notification received when a drag operation ends.
   * Use {@link Viewport.gui_is_drag_successful} to check if the drag succeeded.
   */
  static readonly NOTIFICATION_DRAG_END: int;
  /**
   * Notification received when the node's {@link name} or one of its ancestors' {@link name} is changed. This notification is *not* received when the node is removed from the {@link SceneTree}.
   */
  static readonly NOTIFICATION_PATH_RENAMED: int;
  /**
   * Notification received when the list of children is changed. This happens when child nodes are added, moved or removed.
   */
  static readonly NOTIFICATION_CHILD_ORDER_CHANGED: int;
  /**
   * Notification received from the tree every rendered frame when {@link is_processing_internal} returns `true`.
   */
  static readonly NOTIFICATION_INTERNAL_PROCESS: int;
  /**
   * Notification received from the tree every physics frame when {@link is_physics_processing_internal} returns `true`.
   */
  static readonly NOTIFICATION_INTERNAL_PHYSICS_PROCESS: int;
  /**
   * Notification received when the node enters the tree, just before {@link NOTIFICATION_READY} may be received. Unlike the latter, it is sent every time the node enters tree, not just once.
   */
  static readonly NOTIFICATION_POST_ENTER_TREE: int;
  /** Notification received when the node is disabled. See {@link PROCESS_MODE_DISABLED}. */
  static readonly NOTIFICATION_DISABLED: int;
  /**
   * Notification received when the node is enabled again after being disabled. See {@link PROCESS_MODE_DISABLED}.
   */
  static readonly NOTIFICATION_ENABLED: int;
  /**
   * Notification received when {@link reset_physics_interpolation} is called on the node or its ancestors.
   */
  static readonly NOTIFICATION_RESET_PHYSICS_INTERPOLATION: int;
  /**
   * Notification received right before the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
   */
  static readonly NOTIFICATION_EDITOR_PRE_SAVE: int;
  /**
   * Notification received right after the scene with the node is saved in the editor. This notification is only sent in the Godot editor and will not occur in exported projects.
   */
  static readonly NOTIFICATION_EDITOR_POST_SAVE: int;
  /**
   * Notification received when the mouse enters the window.
   * Implemented for embedded windows and on desktop and web platforms.
   */
  static readonly NOTIFICATION_WM_MOUSE_ENTER: int;
  /**
   * Notification received when the mouse leaves the window.
   * Implemented for embedded windows and on desktop and web platforms.
   */
  static readonly NOTIFICATION_WM_MOUSE_EXIT: int;
  /**
   * Notification received from the OS when the node's {@link Window} ancestor is focused. This may be a change of focus between two windows of the same engine instance, or from the OS desktop or a third-party application to a window of the game (in which case {@link NOTIFICATION_APPLICATION_FOCUS_IN} is also received).
   * A {@link Window} node receives this notification when it is focused.
   */
  static readonly NOTIFICATION_WM_WINDOW_FOCUS_IN: int;
  /**
   * Notification received from the OS when the node's {@link Window} ancestor is defocused. This may be a change of focus between two windows of the same engine instance, or from a window of the game to the OS desktop or a third-party application (in which case {@link NOTIFICATION_APPLICATION_FOCUS_OUT} is also received).
   * A {@link Window} node receives this notification when it is defocused.
   */
  static readonly NOTIFICATION_WM_WINDOW_FOCUS_OUT: int;
  /**
   * Notification received from the OS when a close request is sent (e.g. closing the window with a "Close" button or `Alt + F4`).
   * Implemented on desktop platforms.
   */
  static readonly NOTIFICATION_WM_CLOSE_REQUEST: int;
  /**
   * Notification received from the OS when a go back request is sent (e.g. pressing the "Back" button on Android).
   * Implemented only on Android.
   */
  static readonly NOTIFICATION_WM_GO_BACK_REQUEST: int;
  /**
   * Notification received when the window is resized.
   * **Note:** Only the resized {@link Window} node receives this notification, and it's not propagated to the child nodes.
   */
  static readonly NOTIFICATION_WM_SIZE_CHANGED: int;
  /**
   * Notification received from the OS when the screen's dots per inch (DPI) scale is changed. Only implemented on macOS.
   */
  static readonly NOTIFICATION_WM_DPI_CHANGE: int;
  /**
   * Notification received when the mouse cursor enters the {@link Viewport}'s visible area, that is not occluded behind other {@link Control}s or {@link Window}s, provided its {@link Viewport.gui_disable_input} is `false` and regardless if it's currently focused or not.
   */
  static readonly NOTIFICATION_VP_MOUSE_ENTER: int;
  /**
   * Notification received when the mouse cursor leaves the {@link Viewport}'s visible area, that is not occluded behind other {@link Control}s or {@link Window}s, provided its {@link Viewport.gui_disable_input} is `false` and regardless if it's currently focused or not.
   */
  static readonly NOTIFICATION_VP_MOUSE_EXIT: int;
  /** Notification received when the window is moved. */
  static readonly NOTIFICATION_WM_POSITION_CHANGED: int;
  /**
   * Notification received from the OS when the application is exceeding its allocated memory.
   * Implemented only on iOS.
   */
  static readonly NOTIFICATION_OS_MEMORY_WARNING: int;
  /**
   * Notification received when translations may have changed. Can be triggered by the user changing the locale, changing {@link auto_translate_mode} or when the node enters the scene tree. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like {@link Object.tr}.
   * **Note:** This notification is received alongside {@link NOTIFICATION_ENTER_TREE}, so if you are instantiating a scene, the child nodes will not be initialized yet. You can use it to setup translations for this node, child nodes created from script, or if you want to access child nodes added in the editor, make sure the node is ready using {@link is_node_ready}.
   */
  static readonly NOTIFICATION_TRANSLATION_CHANGED: int;
  /**
   * Notification received from the OS when a request for "About" information is sent.
   * Implemented only on macOS.
   */
  static readonly NOTIFICATION_WM_ABOUT: int;
  /**
   * Notification received from Godot's crash handler when the engine is about to crash.
   * Implemented on desktop platforms, if the crash handler is enabled.
   */
  static readonly NOTIFICATION_CRASH: int;
  /**
   * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
   * Implemented on desktop and web platforms.
   */
  static readonly NOTIFICATION_OS_IME_UPDATE: int;
  /**
   * Notification received from the OS when the application is resumed.
   * Specific to the Android and iOS platforms.
   */
  static readonly NOTIFICATION_APPLICATION_RESUMED: int;
  /**
   * Notification received from the OS when the application is paused.
   * Specific to the Android and iOS platforms.
   * **Note:** On iOS, you only have approximately 5 seconds to finish a task started by this signal. If you go over this allotment, iOS will kill the app instead of pausing it.
   */
  static readonly NOTIFICATION_APPLICATION_PAUSED: int;
  /**
   * Notification received from the OS when the application is focused, i.e. when changing the focus from the OS desktop or a thirdparty application to any open window of the Godot instance.
   * Implemented on desktop and mobile platforms.
   */
  static readonly NOTIFICATION_APPLICATION_FOCUS_IN: int;
  /**
   * Notification received from the OS when the application is defocused, i.e. when changing the focus from any open window of the Godot instance to the OS desktop or a thirdparty application.
   * Implemented on desktop and mobile platforms.
   */
  static readonly NOTIFICATION_APPLICATION_FOCUS_OUT: int;
  /** Notification received when the {@link TextServer} is changed. */
  static readonly NOTIFICATION_TEXT_SERVER_CHANGED: int;
  /** Notification received when the application enters picture-in-picture mode. */
  static readonly NOTIFICATION_APPLICATION_PIP_MODE_ENTERED: int;
  /** Notification received when the application exits picture-in-picture mode. */
  static readonly NOTIFICATION_APPLICATION_PIP_MODE_EXITED: int;
  /** Notification received when an accessibility information update is required. */
  static readonly NOTIFICATION_ACCESSIBILITY_UPDATE: int;
  /**
   * Notification received when accessibility elements are invalidated. All node accessibility elements are automatically deleted after receiving this message, therefore all existing references to such elements should be discarded.
   */
  static readonly NOTIFICATION_ACCESSIBILITY_INVALIDATE: int;
}
