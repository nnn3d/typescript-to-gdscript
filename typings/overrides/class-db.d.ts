/**
 * Override: ClassDB — typed instantiate and class_call_static.
 */
declare class ClassDB {
  static instantiate<T extends GodotObject = GodotObject>(class_: string): T;
  static class_call_static<R = unknown>(
    class_: string,
    method: string,
    ...args: any[]
  ): R;
  static class_get_property<V = unknown>(
    object: GodotObject,
    property: string,
  ): V;
  static class_get_property_default_value<V = unknown>(
    class_: string,
    property: string,
  ): V;
}
