// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Application status indicator (aka notification area icon).
 * **Note:** Status indicator is implemented on macOS and Windows.
 */
declare class StatusIndicator<Tree extends object = any> extends Node<Tree> {
  /** Status indicator icon. */
  icon: Texture2D;
  /**
   * Status indicator native popup menu. If this is set, the {@link pressed} signal is not emitted.
   * **Note:** Native popup is only supported if {@link NativeMenu} supports {@link NativeMenu.FEATURE_POPUP_MENU} feature.
   */
  menu: string;
  /** Status indicator tooltip. */
  tooltip: string;
  /** If `true`, the status indicator is visible. */
  visible: boolean;
  set_icon(value: Texture2D): void;
  get_icon(): Texture2D;
  set_menu(value: string): void;
  get_menu(): string;
  set_tooltip(value: string): void;
  get_tooltip(): string;
  set_visible(value: boolean): void;
  is_visible(): boolean;

  /**
   * Returns the status indicator rectangle in screen coordinates. If this status indicator is not visible, returns an empty {@link Rect2}.
   */
  get_rect(): Rect2;

  /** Emitted when the status indicator is pressed. */
  pressed: Signal<[int, Vector2i]>;
}
