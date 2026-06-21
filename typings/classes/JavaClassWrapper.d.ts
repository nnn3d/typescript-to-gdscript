// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Provides access to the Java Native Interface. */
declare interface JavaClassWrapper extends GodotObject {
  /**
   * Creates a {@link JavaObject} implementing the given Java interfaces using the given {@link Object} as the implementation.
   * The `object` must contain methods signatures matching the methods signatures from the passed Java `interfaces`. Invoking methods from the Java `interfaces` will route to the matching `object` method.
   * **Note:** This method only works on Android. On every other platform, this method will always return `null`.
   */
  create_proxy(object: GodotObject, interfaces: PackedStringArray | Array<unknown>): JavaObject | null;
  /**
   * Creates a {@link JavaObject} implementing the Java Single Abstract Method (SAM) interface using the Godot {@link Callable} as the implementation.
   * The `sam_interface` **must be** a Java SAM interface, meaning it must only have a single abstract method to implement.
   * The `callable` must be able to handle the same parameter types as the SAM interface method, and must provide the same return type. The `callable` will be invoked as a callback, passing the arguments from the Java SAM interface method.
   * **Note:** This method only works on Android. On every other platform, this method will always return `null`.
   */
  create_sam_callback(sam_interface: string | NodePath, callable: Callable): JavaObject | null;
  /**
   * Returns the Java exception from the last call into a Java class. If there was no exception, it will return `null`.
   * **Note:** This method only works on Android. On every other platform, this method will always return `null`.
   */
  get_exception(): JavaObject | null;
  /**
   * Wraps a class defined in Java, and returns it as a {@link JavaClass} {@link Object} type that Godot can interact with.
   * When wrapping inner (nested) classes, use `$` instead of `.` to separate them. For example, `JavaClassWrapper.wrap("android.view.WindowManager$LayoutParams")` wraps the **WindowManager.LayoutParams** class.
   * **Note:** To invoke a constructor, call a method with the same name as the class. For example:
   * **Note:** This method only works on Android. On every other platform, this method does nothing and returns an empty {@link JavaClass}.
   */
  wrap(name: string | NodePath): JavaClass | null;
}
declare const JavaClassWrapper: JavaClassWrapper;

