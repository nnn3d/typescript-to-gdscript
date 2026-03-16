// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a class from the Java Native Interface. */
declare class JavaClass extends RefCounted {
  /** Returns the Java class name. */
  get_java_class_name(): string;
  /**
   * Returns the object's Java methods and their signatures as an {@link Array} of dictionaries, in the same format as {@link Object.get_method_list}.
   */
  get_java_method_list(): Dictionary;
  /** Returns a {@link JavaClass} representing the Java parent class of this class. */
  get_java_parent_class(): JavaClass;
  /** Returns `true` if the given `method` name exists in the object's Java methods. */
  has_java_method(method: string): boolean;
}
