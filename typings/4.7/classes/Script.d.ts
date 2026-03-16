// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A class stored as a resource. */
declare class Script extends Resource {
  /**
   * The script source code or an empty string if source code is not available. When set, does not reload the class implementation automatically.
   */
  source_code: string;

  /** Returns `true` if the script can be instantiated. */
  can_instantiate(): boolean;
  /** Returns the script directly inherited by this script. */
  get_base_script(): Script;
  /**
   * Returns the class name associated with the script, if there is one. Returns an empty string otherwise.
   * To give the script a global name, you can use the `class_name` keyword in GDScript and the `{@link GlobalClass}` attribute in C#.
   */
  get_global_name(): string;
  /** Returns the script's base type. */
  get_instance_base_type(): string;
  /** Returns the default value of the specified property. */
  get_property_default_value(property: string): unknown;
  /**
   * Returns a {@link Dictionary} mapping method names to their RPC configuration defined by this script.
   */
  get_rpc_config(): unknown;
  /** Returns a dictionary containing constant names and their values. */
  get_script_constant_map(): Dictionary;
  /**
   * Returns the list of methods in this {@link Script}.
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by {@link Object.get_method_list}.
   */
  get_script_method_list(): Dictionary;
  /**
   * Returns the list of properties in this {@link Script}.
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by {@link Object.get_property_list}.
   */
  get_script_property_list(): Dictionary;
  /**
   * Returns the list of signals defined in this {@link Script}.
   * **Note:** The dictionaries returned by this method are formatted identically to those returned by {@link Object.get_signal_list}.
   */
  get_script_signal_list(): Dictionary;
  /** Returns `true` if the script, or a base class, defines a signal with the given name. */
  has_script_signal(signal_name: string): boolean;
  /**
   * Returns `true` if the script contains non-empty source code.
   * **Note:** If a script does not have source code, this does not mean that it is invalid or unusable. For example, a {@link GDScript} that was exported with binary tokenization has no source code, but still behaves as expected and could be instantiated. This can be checked with {@link can_instantiate}.
   */
  has_source_code(): boolean;
  /** Returns `true` if `base_object` is an instance of this script. */
  instance_has(base_object: GodotObject): boolean;
  /**
   * Returns `true` if the script is an abstract script. An abstract script does not have a constructor and cannot be instantiated.
   */
  is_abstract(): boolean;
  /** Returns `true` if the script is a tool script. A tool script can run in the editor. */
  is_tool(): boolean;
  /** Reloads the script's class implementation. Returns an error code. */
  reload(keep_state?: boolean): int;
}
