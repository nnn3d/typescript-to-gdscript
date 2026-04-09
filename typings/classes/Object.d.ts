// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for all other classes in the engine. */
declare class GodotObject {
  /**
   * Override this method to customize the behavior of {@link get}. Should return the given `property`'s value, or `null` if the `property` should be handled normally.
   * Combined with {@link _set} and {@link _get_property_list}, this method allows defining custom properties, which is particularly useful for editor plugins.
   * **Note:** This method is not called when getting built-in properties of an object, including properties defined with .
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. The bottom-most sub-class will be called first, with subsequent calls ascending the class hierarchy. The call chain will stop on the first class that returns a non-`null` value.
   */
  _get(property: string): unknown;
  /**
   * Override this method to provide a custom list of additional properties to handle by the engine.
   * Should return a property list, as an {@link Array} of dictionaries. The result is added to the array of {@link get_property_list}, and should be formatted in the same way. Each {@link Dictionary} must at least contain the `name` and `type` entries.
   * You can use {@link _property_can_revert} and {@link _property_get_revert} to customize the default values of the properties added by this method.
   * The example below displays a list of numbers shown as words going from `ZERO` to `FIVE`, with `number_count` controlling the size of the list:
   * **Note:** This method is intended for advanced purposes. For most common use cases, the scripting languages offer easier ways to handle properties. See , , , etc. If you want to customize exported properties, use {@link _validate_property}.
   * **Note:** If the object's script is not , this method will not be called in the editor.
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. The bottom-most sub-class will be called first, with subsequent calls ascending the class hierarchy.
   */
  _get_property_list(): Array<Dictionary>;
  /**
   * Called when the object's script is instantiated, oftentimes after the object is initialized in memory (through `Object.new()` in GDScript, or `new GodotObject` in C#). It can be also defined to take in parameters. This method is similar to a constructor in most programming languages.
   * **Note:** If {@link _init} is defined with *required* parameters, the Object with script may only be created directly. If any other means (such as {@link PackedScene.instantiate} or {@link Node.duplicate}) are used, the script's initialization will fail.
   */
  _init(): void;
  /**
   * Returns the current iterable value. `iter` stores the iteration state, but unlike {@link _iter_init} and {@link _iter_next} the state is supposed to be read-only, so there is no {@link Array} wrapper.
   * **Tip:** In GDScript, you can use a subtype of {@link Variant} as the return type for {@link _iter_get}. The specified type will be used to set the type of the iterator variable in `for` loops, enhancing type safety.
   */
  _iter_get(iter: unknown): unknown;
  /**
   * Initializes the iterator. `iter` stores the iteration state. Since GDScript does not support passing arguments by reference, a single-element array is used as a wrapper. Returns `true` so long as the iterator has not reached the end.
   * **Note:** Alternatively, you can ignore `iter` and use the object's state instead, see online docs ($DOCS_URL/tutorials/scripting/gdscript/gdscript_advanced.html#custom-iterators) for an example. Note that in this case you will not be able to reuse the same iterator instance in nested loops. Also, make sure you reset the iterator state in this method if you want to reuse the same instance multiple times.
   */
  _iter_init(iter: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): boolean;
  /**
   * Moves the iterator to the next iteration. `iter` stores the iteration state. Since GDScript does not support passing arguments by reference, a single-element array is used as a wrapper. Returns `true` so long as the iterator has not reached the end.
   */
  _iter_next(iter: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): boolean;
  /**
   * Called when the object receives a notification, which can be identified in `what` by comparing it with a constant. See also {@link notification}.
   * **Note:** The base {@link Object} defines a few notifications ({@link NOTIFICATION_POSTINITIALIZE} and {@link NOTIFICATION_PREDELETE}). Inheriting classes such as {@link Node} define a lot more notifications, which are also received by this method.
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. Call order depends on the `reversed` argument of {@link notification} and varies between different notifications. Most notifications are sent in the forward order (i.e. Object class first, most derived class last).
   */
  _notification(what: int): void;
  /**
   * Override this method to customize the given `property`'s revert behavior. Should return `true` if the `property` has a custom default value and is revertible in the Inspector dock. Use {@link _property_get_revert} to specify the `property`'s default value.
   * **Note:** This method must return consistently, regardless of the current value of the `property`.
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. The bottom-most sub-class will be called first, with subsequent calls ascending the class hierarchy. The call chain will stop on the first class that returns `true`.
   */
  _property_can_revert(property: string): boolean;
  /**
   * Override this method to customize the given `property`'s revert behavior. Should return the default value for the `property`. If the default value differs from the `property`'s current value, a revert icon is displayed in the Inspector dock.
   * **Note:** {@link _property_can_revert} must also be overridden for this method to be called.
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. The bottom-most sub-class will be called first, with subsequent calls ascending the class hierarchy. The call chain will stop on the first class that returns a non-`null` value.
   */
  _property_get_revert(property: string): unknown;
  /**
   * Override this method to customize the behavior of {@link set}. Should set the `property` to `value` and return `true`, or `false` if the `property` should be handled normally. The *exact* way to set the `property` is up to this method's implementation.
   * Combined with {@link _get} and {@link _get_property_list}, this method allows defining custom properties, which is particularly useful for editor plugins.
   * **Note:** This method is not called when setting built-in properties of an object, including properties defined with .
   * **Note:** Unlike other virtual methods, this method is called automatically for every script that overrides it. This means that the base implementation should not be called via `super` in GDScript or its equivalents in other languages. The bottom-most sub-class will be called first, with subsequent calls ascending the class hierarchy. The call chain will stop on the first class that returns `true`.
   */
  _set(property: string, value: unknown): boolean;
  /**
   * Override this method to customize the return value of {@link to_string}, and therefore the object's representation as a {@link String}.
   */
  _to_string(): string;
  /**
   * Override this method to customize existing properties. Every property info goes through this method, except properties added with {@link _get_property_list}. The dictionary contents is the same as in {@link _get_property_list}.
   */
  _validate_property(property: Dictionary): void;
  /**
   * Adds a user-defined signal named `signal`. Optional arguments for the signal can be added as an {@link Array} of dictionaries, each defining a `name` {@link String} and a `type` [int] (see {@link Variant.Type}). See also {@link has_user_signal} and {@link remove_user_signal}.
   */
  add_user_signal(signal: string, arguments?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /**
   * Calls the `method` on the object and returns the result. This method supports a variable number of arguments, so parameters can be passed as a comma separated list.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  call<N extends string, A extends any[], R>(
  this: Record<N, (...args: A) => R>,
  method: N,
  ...args: A
  ): R;
  call(method: string, ...args: any[]): unknown;
  /**
   * Calls the `method` on the object during idle time. Always returns `null`, **not** the method's result.
   * Idle time happens mainly at the end of process and physics frames. In it, deferred calls will be run until there are none left, which means you can defer calls from other deferred calls and they'll still be run in the current idle time cycle. This means you should not call a method deferred from itself (or from a method called by it), as this causes infinite recursion the same way as if you had called the method directly.
   * This method supports a variable number of arguments, so parameters can be passed as a comma separated list.
   * For methods that are deferred from the same thread, the order of execution at idle time is identical to the order in which [code skip-lint]call_deferred[/code] was called.
   * See also {@link Callable.call_deferred}.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   * **Note:** If you're looking to delay the function call by a frame, refer to the {@link SceneTree.process_frame} and {@link SceneTree.physics_frame} signals.
   */
  call_deferred<N extends string, A extends any[], R>(
  this: Record<N, (...args: A) => R>,
  method: N,
  ...args: A
  ): R;
  call_deferred(method: string, ...args: any[]): unknown;
  /**
   * Calls the `method` on the object and returns the result. Unlike {@link call}, this method expects all parameters to be contained inside `arg_array`.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  callv<N extends string, A extends any[], R>(
  this: Record<N, (...args: A) => R>,
  method: N,
  args: A
  ): R;
  callv(method: string, args: any[]): unknown;
  /**
   * Returns `true` if the object is allowed to translate messages with {@link tr} and {@link tr_n}. See also {@link set_message_translation}.
   */
  can_translate_messages(): boolean;
  /**
   * If this method is called during {@link NOTIFICATION_PREDELETE}, this object will reject being freed and will remain allocated. This is mostly an internal function used for error handling to avoid the user from freeing objects when they are not intended to.
   */
  cancel_free(): void;
  /**
   * Connects a `signal` by name to a `callable`. Optional `flags` can be also added to configure the connection's behavior (see {@link ConnectFlags} constants).
   * A signal can only be connected once to the same {@link Callable}. If the signal is already connected, this method returns {@link ERR_INVALID_PARAMETER} and generates an error, unless the signal is connected with {@link CONNECT_REFERENCE_COUNTED}. To prevent this, use {@link is_connected} first to check for existing connections.
   * **Note:** If the `callable`'s object is freed, the connection will be lost.
   * **Note:** In GDScript, it is generally recommended to connect signals with {@link Signal.connect} instead.
   * **Note:** This method, and all other signal-related methods, are thread-safe.
   */
  connect(signal: string, callable: Callable, flags?: int): int;
  /**
   * Disconnects a `signal` by name from a given `callable`. If the connection does not exist, generates an error. Use {@link is_connected} to make sure that the connection exists.
   */
  disconnect(signal: string, callable: Callable): void;
  /**
   * Emits the given `signal` by name. The signal must exist, so it should be a built-in signal of this class or one of its inherited classes, or a user-defined signal (see {@link add_user_signal}). This method supports a variable number of arguments, so parameters can be passed as a comma separated list.
   * Returns {@link ERR_UNAVAILABLE} if `signal` does not exist or the parameters are invalid.
   * **Note:** In C#, `signal` must be in snake_case when referring to built-in Godot signals. Prefer using the names exposed in the `SignalName` class to avoid allocating a new {@link StringName} on each call.
   */
  emit_signal<const N extends string, A extends any[]>(
  this: Record<N, Signal<A>>,
  signal: N,
  ...args: A
  ): Error.OK | Error.ERR_UNAVAILABLE;
  emit_signal(
  signal: string,
  ...args: any[]
  ): Error.OK | Error.ERR_UNAVAILABLE;
  /**
   * Deletes the object from memory. Pre-existing references to the object become invalid, and any attempt to access them will result in a runtime error. Checking the references with {@link @GlobalScope.is_instance_valid} will return `false`. This is equivalent to the `memdelete` function in GDExtension C++.
   */
  free(): void;
  /**
   * Returns the {@link Variant} value of the given `property`. If the `property` does not exist, this method returns `null`.
   * **Note:** In C#, `property` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  get<P extends keyof this>(property: P): this[P];
  get(property: string): unknown;
  /**
   * Returns the object's built-in class name, as a {@link String}. See also {@link is_class}.
   * **Note:** This method ignores `class_name` declarations. If this object's script has defined a `class_name`, the base, built-in class name is returned instead.
   */
  get_class(): string;
  /**
   * Returns an {@link Array} of signal connections received by this object. Each connection is represented as a {@link Dictionary} that contains three entries:
   * - `signal` is a reference to the {@link Signal};
   * - `callable` is a reference to the {@link Callable};
   * - `flags` is a combination of {@link ConnectFlags}.
   */
  get_incoming_connections(): Array<Dictionary>;
  /**
   * Gets the object's property indexed by the given `property_path`. The path should be a {@link NodePath} relative to the current object and can use the colon character (`:`) to access nested properties.
   * **Examples:** `"position:x"` or `"material:next_pass:blend_mode"`.
   * **Note:** In C#, `property_path` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   * **Note:** This method does not support actual paths to nodes in the {@link SceneTree}, only sub-property paths. In the context of nodes, use {@link Node.get_node_and_resource} instead.
   */
  get_indexed(property_path: string): unknown;
  /**
   * Returns the object's unique instance ID. This ID can be saved in {@link EncodedObjectAsID}, and can be used to retrieve this object instance with {@link @GlobalScope.instance_from_id}.
   * **Note:** This ID is only useful during the current session. It won't correspond to a similar object if the ID is sent over a network, or loaded from a file at a later time.
   */
  get_instance_id(): int;
  /**
   * Returns the object's metadata value for the given entry `name`. If the entry does not exist, returns `default`. If `default` is `null`, an error is also generated.
   * **Note:** A metadata's name must be a valid identifier as per {@link StringName.is_valid_identifier} method.
   * **Note:** Metadata that has a name starting with an underscore (`_`) is considered editor-only. Editor-only metadata is not displayed in the Inspector and should not be edited, although it can still be found by this method.
   */
  get_meta<T = unknown>(name: string, default_?: T): T;
  /** Returns the object's metadata entry names as an {@link Array} of {@link StringName}s. */
  get_meta_list(): Array<string>;
  /**
   * Returns the number of arguments of the given `method` by name.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  get_method_argument_count(method: string): int;
  /**
   * Returns this object's methods and their signatures as an {@link Array} of dictionaries. Each {@link Dictionary} contains the following entries:
   * - `name` is the name of the method, as a {@link String};
   * - `args` is an {@link Array} of dictionaries representing the arguments;
   * - `default_args` is the default arguments as an {@link Array} of variants;
   * - `flags` is a combination of {@link MethodFlags};
   * - `id` is the method's internal identifier [int];
   * - `return` is the returned value, as a {@link Dictionary};
   * **Note:** The dictionaries of `args` and `return` are formatted identically to the results of {@link get_property_list}, although not all entries are used.
   */
  get_method_list(): Array<Dictionary>;
  /**
   * Returns the object's property list as an {@link Array} of dictionaries. Each {@link Dictionary} contains the following entries:
   * - `name` is the property's name, as a {@link String};
   * - `class_name` is an empty {@link StringName}, unless the property is {@link TYPE_OBJECT} and it inherits from a class;
   * - `type` is the property's type, as an [int] (see {@link Variant.Type});
   * - `hint` is *how* the property is meant to be edited (see {@link PropertyHint});
   * - `hint_string` depends on the hint (see {@link PropertyHint});
   * - `usage` is a combination of {@link PropertyUsageFlags}.
   * **Note:** In GDScript, all class members are treated as properties. In C# and GDExtension, it may be necessary to explicitly mark class members as Godot properties using decorators or attributes.
   */
  get_property_list(): Array<Dictionary>;
  /** Returns the object's {@link Script} instance, or `null` if no script is attached. */
  get_script(): unknown;
  /**
   * Returns an {@link Array} of connections for the given `signal` name. Each connection is represented as a {@link Dictionary} that contains three entries:
   * - [code skip-lint]signal[/code] is a reference to the {@link Signal};
   * - `callable` is a reference to the connected {@link Callable};
   * - `flags` is a combination of {@link ConnectFlags}.
   */
  get_signal_connection_list(signal: string): Array<Dictionary>;
  /**
   * Returns the list of existing signals as an {@link Array} of dictionaries.
   * **Note:** Due to the implementation, each {@link Dictionary} is formatted very similarly to the returned values of {@link get_method_list}.
   */
  get_signal_list(): Array<Dictionary>;
  /**
   * Returns the name of the translation domain used by {@link tr} and {@link tr_n}. See also {@link TranslationServer}.
   */
  get_translation_domain(): string;
  /**
   * Returns `true` if any connection exists on the given `signal` name.
   * **Note:** In C#, `signal` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `SignalName` class to avoid allocating a new {@link StringName} on each call.
   */
  has_connections(signal: string): boolean;
  /**
   * Returns `true` if a metadata entry is found with the given `name`. See also {@link get_meta}, {@link set_meta} and {@link remove_meta}.
   * **Note:** A metadata's name must be a valid identifier as per {@link StringName.is_valid_identifier} method.
   * **Note:** Metadata that has a name starting with an underscore (`_`) is considered editor-only. Editor-only metadata is not displayed in the Inspector and should not be edited, although it can still be found by this method.
   */
  has_meta(name: string): boolean;
  /**
   * Returns `true` if the given `method` name exists in the object.
   * **Note:** In C#, `method` must be in snake_case when referring to built-in Godot methods. Prefer using the names exposed in the `MethodName` class to avoid allocating a new {@link StringName} on each call.
   */
  has_method(method: string): boolean;
  /**
   * Returns `true` if the given `signal` name exists in the object.
   * **Note:** In C#, `signal` must be in snake_case when referring to built-in Godot signals. Prefer using the names exposed in the `SignalName` class to avoid allocating a new {@link StringName} on each call.
   */
  has_signal(signal: string): boolean;
  /**
   * Returns `true` if the given user-defined `signal` name exists. Only signals added with {@link add_user_signal} are included. See also {@link remove_user_signal}.
   */
  has_user_signal(signal: string): boolean;
  /**
   * Returns `true` if the object is blocking its signals from being emitted. See {@link set_block_signals}.
   */
  is_blocking_signals(): boolean;
  /**
   * Returns `true` if the object inherits from the given `class`. See also {@link get_class}.
   * **Note:** This method ignores `class_name` declarations in the object's script.
   */
  is_class(class_: string): boolean;
  /**
   * Returns `true` if a connection exists between the given `signal` name and `callable`.
   * **Note:** In C#, `signal` must be in snake_case when referring to built-in Godot signals. Prefer using the names exposed in the `SignalName` class to avoid allocating a new {@link StringName} on each call.
   */
  is_connected(signal: string, callable: Callable): boolean;
  /** Returns `true` if the {@link Node.queue_free} method was called for the object. */
  is_queued_for_deletion(): boolean;
  /**
   * Sends the given `what` notification to all classes inherited by the object, triggering calls to {@link _notification}, starting from the highest ancestor (the {@link Object} class) and going down to the object's script.
   * If `reversed` is `true`, the call order is reversed.
   */
  notification(what: int, reversed?: boolean): void;
  /**
   * Emits the {@link property_list_changed} signal. This is mainly used to refresh the editor, so that the Inspector and editor plugins are properly updated.
   */
  notify_property_list_changed(): void;
  /**
   * Returns `true` if the given `property` has a custom default value. Use {@link property_get_revert} to get the `property`'s default value.
   * **Note:** This method is used by the Inspector dock to display a revert icon. The object must implement {@link _property_can_revert} to customize the default value. If {@link _property_can_revert} is not implemented, this method returns `false`.
   */
  property_can_revert(property: string): boolean;
  /**
   * Returns the custom default value of the given `property`. Use {@link property_can_revert} to check if the `property` has a custom default value.
   * **Note:** This method is used by the Inspector dock to display a revert icon. The object must implement {@link _property_get_revert} to customize the default value. If {@link _property_get_revert} is not implemented, this method returns `null`.
   */
  property_get_revert(property: string): unknown;
  /**
   * Removes the given entry `name` from the object's metadata. See also {@link has_meta}, {@link get_meta} and {@link set_meta}.
   * **Note:** A metadata's name must be a valid identifier as per {@link StringName.is_valid_identifier} method.
   * **Note:** Metadata that has a name starting with an underscore (`_`) is considered editor-only. Editor-only metadata is not displayed in the Inspector and should not be edited, although it can still be found by this method.
   */
  remove_meta(name: string): void;
  /**
   * Removes the given user signal `signal` from the object. See also {@link add_user_signal} and {@link has_user_signal}.
   */
  remove_user_signal(signal: string): void;
  /**
   * Assigns `value` to the given `property`. If the property does not exist or the given `value`'s type doesn't match, nothing happens.
   * **Note:** In C#, `property` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  set(property: string, value: unknown): void;
  /**
   * If set to `true`, the object becomes unable to emit signals. As such, {@link emit_signal} and signal connections will not work, until it is set to `false`.
   */
  set_block_signals(enable: boolean): void;
  /**
   * Assigns `value` to the given `property`, at the end of the current frame. This is equivalent to calling {@link set} through {@link call_deferred}.
   * **Note:** In C#, `property` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  set_deferred(property: string, value: unknown): void;
  /**
   * Assigns a new `value` to the property identified by the `property_path`. The path should be a {@link NodePath} relative to this object, and can use the colon character (`:`) to access nested properties.
   * **Note:** In C#, `property_path` must be in snake_case when referring to built-in Godot properties. Prefer using the names exposed in the `PropertyName` class to avoid allocating a new {@link StringName} on each call.
   */
  set_indexed(property_path: string, value: unknown): void;
  /**
   * If set to `true`, allows the object to translate messages with {@link tr} and {@link tr_n}. Enabled by default. See also {@link can_translate_messages}.
   */
  set_message_translation(enable: boolean): void;
  /**
   * Adds or changes the entry `name` inside the object's metadata. The metadata `value` can be any {@link Variant}, although some types cannot be serialized correctly.
   * If `value` is `null`, the entry is removed. This is the equivalent of using {@link remove_meta}. See also {@link has_meta} and {@link get_meta}.
   * **Note:** A metadata's name must be a valid identifier as per {@link StringName.is_valid_identifier} method.
   * **Note:** Metadata that has a name starting with an underscore (`_`) is considered editor-only. Editor-only metadata is not displayed in the Inspector and should not be edited, although it can still be found by this method.
   */
  set_meta(name: string, value: unknown): void;
  /**
   * Attaches `script` to the object, and instantiates it. As a result, the script's {@link _init} is called. A {@link Script} is used to extend the object's functionality.
   * If a script already exists, its instance is detached, and its property values and state are lost. Built-in property values are still kept.
   */
  set_script(script: unknown): void;
  /**
   * Sets the name of the translation domain used by {@link tr} and {@link tr_n}. See also {@link TranslationServer}.
   */
  set_translation_domain(domain: string): void;
  /**
   * Returns a {@link String} representing the object. Defaults to `"<ClassName#RID>"`. Override {@link _to_string} to customize the string representation of the object.
   */
  to_string(): string;
  /**
   * Translates a `message`, using the translation catalogs configured in the Project Settings. Further `context` can be specified to help with the translation. Note that most {@link Control} nodes automatically translate their strings, so this method is mostly useful for formatted strings or custom drawn text.
   * If {@link can_translate_messages} is `false`, or no translation is available, this method returns the `message` without changes. See {@link set_message_translation}.
   * For detailed examples, see Internationalizing games ($DOCS_URL/tutorials/i18n/internationalizing_games.html).
   * **Note:** This method can't be used without an {@link Object} instance, as it requires the {@link can_translate_messages} method. To translate strings in a static context, use {@link TranslationServer.translate}.
   */
  tr(message: string, context?: string): string;
  /**
   * Translates a `message` or `plural_message`, using the translation catalogs configured in the Project Settings. Further `context` can be specified to help with the translation.
   * If {@link can_translate_messages} is `false`, or no translation is available, this method returns `message` or `plural_message`, without changes. See {@link set_message_translation}.
   * The `n` is the number, or amount, of the message's subject. It is used by the translation system to fetch the correct plural form for the current language.
   * For detailed examples, see Localization using gettext ($DOCS_URL/tutorials/i18n/localization_using_gettext.html).
   * **Note:** Negative and [float] numbers may not properly apply to some countable subjects. It's recommended to handle these cases with {@link tr}.
   * **Note:** This method can't be used without an {@link Object} instance, as it requires the {@link can_translate_messages} method. To translate strings in a static context, use {@link TranslationServer.translate_plural}.
   */
  tr_n(message: string, plural_message: string, n: int, context?: string): string;

  /** Emitted when {@link notify_property_list_changed} is called. */
  property_list_changed: Signal<[]>;
  /**
   * Emitted when the object's script is changed.
   * **Note:** When this signal is emitted, the new script is not initialized yet. If you need to access the new script, defer connections to this signal with {@link CONNECT_DEFERRED}.
   */
  script_changed: Signal<[]>;

  // enum ConnectFlags
  /**
   * Deferred connections trigger their {@link Callable}s on idle time (at the end of the frame), rather than instantly.
   */
  static readonly CONNECT_DEFERRED: int;
  /**
   * Persisting connections are stored when the object is serialized (such as when using {@link PackedScene.pack}). In the editor, connections created through the Signals dock are always persisting.
   * **Note:** Connections to lambda functions (that is, when the function code is embedded in the {@link connect} call) cannot be made persistent.
   */
  static readonly CONNECT_PERSIST: int;
  /** One-shot connections disconnect themselves after emission. */
  static readonly CONNECT_ONE_SHOT: int;
  /**
   * Reference-counted connections can be assigned to the same {@link Callable} multiple times. Each disconnection decreases the internal counter. The signal fully disconnects only when the counter reaches 0.
   */
  static readonly CONNECT_REFERENCE_COUNTED: int;
  /**
   * On signal emission, the source object is automatically appended after the original arguments of the signal, regardless of the connected {@link Callable}'s unbinds which affect only the original arguments of the signal (see {@link Callable.unbind}, {@link Callable.get_unbound_arguments_count}).
   */
  static readonly CONNECT_APPEND_SOURCE_OBJECT: int;

  /**
   * Notification received when the object is initialized, before its script is attached. Used internally.
   */
  static readonly NOTIFICATION_POSTINITIALIZE: int;
  /**
   * Notification received when the object is about to be deleted. Can be used like destructors in object-oriented programming languages.
   * This notification is sent in reversed order.
   */
  static readonly NOTIFICATION_PREDELETE: int;
  /**
   * Notification received when the object finishes hot reloading. This notification is only sent for extensions classes and derived.
   */
  static readonly NOTIFICATION_EXTENSION_RELOADED: int;

  // Override Dictionary-only methods from Object interface with never.
  // Only methods that no Godot subclass uses are overridden here.
  /** @deprecated GodotObject is not a Dictionary */ assign: never;
  /** @deprecated GodotObject is not a Dictionary */ find_key: never;
  /** @deprecated GodotObject is not a Dictionary */ get_or_add: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_key_builtin: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_key_class_name: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_key_script: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_value_builtin: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_value_class_name: never;
  /** @deprecated GodotObject is not a Dictionary */ get_typed_value_script: never;
  /** @deprecated GodotObject is not a Dictionary */ has_all: never;
  /** @deprecated GodotObject is not a Dictionary */ hash: never;
  /** @deprecated GodotObject is not a Dictionary */ is_read_only: never;
  /** @deprecated GodotObject is not a Dictionary */ is_same_typed: never;
  /** @deprecated GodotObject is not a Dictionary */ is_same_typed_key: never;
  /** @deprecated GodotObject is not a Dictionary */ is_same_typed_value: never;
  /** @deprecated GodotObject is not a Dictionary */ is_typed: never;
  /** @deprecated GodotObject is not a Dictionary */ is_typed_key: never;
  /** @deprecated GodotObject is not a Dictionary */ is_typed_value: never;
  /** @deprecated GodotObject is not a Dictionary */ keys: never;
  /** @deprecated GodotObject is not a Dictionary */ make_read_only: never;
  /** @deprecated GodotObject is not a Dictionary */ merged: never;
  /** @deprecated GodotObject is not a Dictionary */ recursive_equal: never;
  /** @deprecated GodotObject is not a Dictionary */ sort: never;
  /** @deprecated GodotObject is not a Dictionary */ values: never;
}
