// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A class information repository. */
declare interface ClassDB extends GodotObject {
  /**
   * Returns `true` if objects can be instantiated from the specified `class`, otherwise returns `false`.
   */
  can_instantiate(class_: string): boolean;
  /** Calls a static method on a class. */
  class_call_static<R = unknown>(
  class_: string,
  method: string,
  ...args: any[]
  ): R;
  /** Returns whether the specified `class` is available or not. */
  class_exists(class_: string): boolean;
  /** Returns the API type of the specified `class`. */
  class_get_api_type(class_: string): int;
  /** Returns an array with all the keys in `enum` of `class` or its ancestry. */
  class_get_enum_constants(class_: string, enum_: string, no_inheritance?: boolean): PackedStringArray;
  /** Returns an array with all the enums of `class` or its ancestry. */
  class_get_enum_list(class_: string, no_inheritance?: boolean): PackedStringArray;
  /**
   * Returns the value of the integer constant `name` of `class` or its ancestry. Always returns 0 when the constant could not be found.
   */
  class_get_integer_constant(class_: string, name: string): int;
  /** Returns which enum the integer constant `name` of `class` or its ancestry belongs to. */
  class_get_integer_constant_enum(class_: string, name: string, no_inheritance?: boolean): string;
  /** Returns an array with the names all the integer constants of `class` or its ancestry. */
  class_get_integer_constant_list(class_: string, no_inheritance?: boolean): PackedStringArray;
  /**
   * Returns the number of arguments of the method `method` of `class` or its ancestry if `no_inheritance` is `false`.
   */
  class_get_method_argument_count(class_: string, method: string, no_inheritance?: boolean): int;
  /**
   * Returns an array with all the methods of `class` or its ancestry if `no_inheritance` is `false`. Every element of the array is a {@link Dictionary} with the following keys: `args`, `default_args`, `flags`, `id`, `name`, `return: (class_name, hint, hint_string, name, type, usage)`.
   * **Note:** In exported release builds the debug info is not available, so the returned dictionaries will contain only method names.
   */
  class_get_method_list(class_: string, no_inheritance?: boolean): Dictionary;
  /** Returns the value of `property` of `object` or its ancestry. */
  class_get_property<V = unknown>(
  object: GodotObject,
  property: string,
  ): V;
  /** Returns the default value of `property` of `class` or its ancestor classes. */
  class_get_property_default_value<V = unknown>(
  class_: string,
  property: string,
  ): V;
  /** Returns the getter method name of `property` of `class`. */
  class_get_property_getter(class_: string, property: string): string;
  /** Returns an array with all the properties of `class` or its ancestry if `no_inheritance` is `false`. */
  class_get_property_list(class_: string, no_inheritance?: boolean): Dictionary;
  /** Returns the setter method name of `property` of `class`. */
  class_get_property_setter(class_: string, property: string): string;
  /**
   * Returns the `signal` data of `class` or its ancestry. The returned value is a {@link Dictionary} with the following keys: `args`, `default_args`, `flags`, `id`, `name`, `return: (class_name, hint, hint_string, name, type, usage)`.
   */
  class_get_signal(class_: string, signal: string): Dictionary;
  /**
   * Returns an array with all the signals of `class` or its ancestry if `no_inheritance` is `false`. Every element of the array is a {@link Dictionary} as described in {@link class_get_signal}.
   */
  class_get_signal_list(class_: string, no_inheritance?: boolean): Dictionary;
  /** Returns whether `class` or its ancestry has an enum called `name` or not. */
  class_has_enum(class_: string, name: string, no_inheritance?: boolean): boolean;
  /** Returns whether `class` or its ancestry has an integer constant called `name` or not. */
  class_has_integer_constant(class_: string, name: string): boolean;
  /**
   * Returns whether `class` (or its ancestry if `no_inheritance` is `false`) has a method called `method` or not.
   */
  class_has_method(class_: string, method: string, no_inheritance?: boolean): boolean;
  /** Returns whether `class` or its ancestry has a signal called `signal` or not. */
  class_has_signal(class_: string, signal: string): boolean;
  /** Sets `property` value of `object` to `value`. */
  class_set_property(object: GodotObject, property: string, value: unknown): int;
  /**
   * Returns the names of all engine classes available.
   * **Note:** Script-defined classes with `class_name` are not included in this list. Use {@link ProjectSettings.get_global_class_list} to get a list of script-defined classes instead.
   */
  get_class_list(): PackedStringArray;
  /** Returns the names of all engine classes that directly or indirectly inherit from `class`. */
  get_inheriters_from_class(class_: string): PackedStringArray;
  /** Returns the parent class of `class`. */
  get_parent_class(class_: string): string;
  /** Creates an instance of `class`. */
  instantiate<T extends GodotObject = GodotObject>(class_: string): T;
  /** Returns whether this `class` is enabled or not. */
  is_class_enabled(class_: string): boolean;
  /**
   * Returns whether `class` (or its ancestor classes if `no_inheritance` is `false`) has an enum called `enum` that is a bitfield.
   */
  is_class_enum_bitfield(class_: string, enum_: string, no_inheritance?: boolean): boolean;
  /** Returns whether `inherits` is an ancestor of `class` or not. */
  is_parent_class(class_: string, inherits: string): boolean;

  // enum APIType
  /** Native Core class type. */
  readonly API_CORE: int;
  /** Native Editor class type. */
  readonly API_EDITOR: int;
  /** GDExtension class type. */
  readonly API_EXTENSION: int;
  /** GDExtension Editor class type. */
  readonly API_EDITOR_EXTENSION: int;
  /** Unknown class type. */
  readonly API_NONE: int;
}
declare const ClassDB: ClassDB;

