// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A singleton that provides access to static information about {@link Theme} resources used by the engine and by your project.
 */
declare interface ThemeDB extends GodotObject {
  /**
   * The fallback base scale factor of every {@link Control} node and {@link Theme} resource. Used when no other value is available to the control.
   * See also {@link Theme.default_base_scale}.
   */
  fallback_base_scale: float;
  /**
   * The fallback font of every {@link Control} node and {@link Theme} resource. Used when no other value is available to the control.
   * See also {@link Theme.default_font}.
   */
  fallback_font: Font | null;
  /**
   * The fallback font size of every {@link Control} node and {@link Theme} resource. Used when no other value is available to the control.
   * See also {@link Theme.default_font_size}.
   */
  fallback_font_size: int;
  /**
   * The fallback icon of every {@link Control} node and {@link Theme} resource. Used when no other value is available to the control.
   */
  fallback_icon: Texture2D | null;
  /**
   * The fallback stylebox of every {@link Control} node and {@link Theme} resource. Used when no other value is available to the control.
   */
  fallback_stylebox: StyleBox | null;
  set_fallback_base_scale(value: float): void;
  get_fallback_base_scale(): float;
  set_fallback_font(value: Font | null): void;
  get_fallback_font(): Font | null;
  set_fallback_font_size(value: int): void;
  get_fallback_font_size(): int;
  set_fallback_icon(value: Texture2D | null): void;
  get_fallback_icon(): Texture2D | null;
  set_fallback_stylebox(value: StyleBox | null): void;
  get_fallback_stylebox(): StyleBox | null;

  /**
   * Returns a reference to the default engine {@link Theme}. This theme resource is responsible for the out-of-the-box look of {@link Control} nodes and cannot be overridden.
   */
  get_default_theme(): Theme;
  /**
   * Returns a reference to the custom project {@link Theme}. This theme resources allows to override the default engine theme for every control node in the project.
   * To set the project theme, see {@link ProjectSettings.gui/theme/custom}.
   */
  get_project_theme(): Theme | null;

  /**
   * Emitted when one of the fallback values had been changed. Use it to refresh the look of controls that may rely on the fallback theme items.
   */
  fallback_changed: Signal<[]>;
}
declare const ThemeDB: ThemeDB;

