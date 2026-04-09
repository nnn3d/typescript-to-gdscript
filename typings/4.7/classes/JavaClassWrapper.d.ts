// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides access to the Java Native Interface. */
declare interface JavaClassWrapper extends GodotObject {
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
  wrap(name: string): JavaClass | null;
}
declare const JavaClassWrapper: JavaClassWrapper;

