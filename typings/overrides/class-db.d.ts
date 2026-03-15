/**
 * Override: ClassDB — typed instantiate and class_call_static.
 */
declare class ClassDB {
  /** Creates an instance of `class_`. */
  static instantiate<T extends GodotObject = GodotObject>(class_: string): T;
  /** Calls a static method on a class. */
  static class_call_static<R = unknown>(class_: string, method: string, ...args: any[]): R;
  /** Returns the value of `property` of `object` or its ancestry. */
  static class_get_property<V = unknown>(object: GodotObject, property: string): V;
  /** Returns the default value of `property` of `class_` or its ancestor classes. */
  static class_get_property_default_value<V = unknown>(class_: string, property: string): V;
}
