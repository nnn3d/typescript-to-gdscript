// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Button for touch screen devices for gameplay use. */
declare class TouchScreenButton extends Node2D {
  /** The button's action. Actions can be handled with {@link InputEventAction}. */
  action: string;
  /** The button's bitmask. */
  bitmask: BitMap | null;
  /**
   * If `true`, the {@link pressed} and {@link released} signals are emitted whenever a pressed finger goes in and out of the button, even if the pressure started outside the active area of the button.
   * **Note:** This is a "pass-by" (not "bypass") press mode.
   */
  passby_press: boolean;
  /** The button's shape. */
  shape: Shape2D | null;
  /**
   * If `true`, the button's shape is centered in the provided texture. If no texture is used, this property has no effect.
   */
  shape_centered: boolean;
  /** If `true`, the button's shape is visible in the editor. */
  shape_visible: boolean;
  /** The button's texture for the normal state. */
  texture_normal: Texture2D | null;
  /** The button's texture for the pressed state. */
  texture_pressed: Texture2D | null;
  /** The button's visibility mode. */
  visibility_mode: int;
  set_action(value: string): void;
  get_action(): string;
  set_bitmask(value: BitMap | null): void;
  get_bitmask(): BitMap | null;
  set_passby_press(value: boolean): void;
  is_passby_press_enabled(): boolean;
  set_shape(value: Shape2D | null): void;
  get_shape(): Shape2D | null;
  set_shape_centered(value: boolean): void;
  is_shape_centered(): boolean;
  set_shape_visible(value: boolean): void;
  is_shape_visible(): boolean;
  set_texture_normal(value: Texture2D | null): void;
  get_texture_normal(): Texture2D | null;
  set_texture_pressed(value: Texture2D | null): void;
  get_texture_pressed(): Texture2D | null;
  set_visibility_mode(value: int): void;
  get_visibility_mode(): int;

  /** Returns `true` if this button is currently pressed. */
  is_pressed(): boolean;

  /** Emitted when the button is pressed (down). */
  pressed: Signal<[]>;
  /** Emitted when the button is released (up). */
  released: Signal<[]>;

  // enum VisibilityMode
  /** Always visible. */
  static readonly VISIBILITY_ALWAYS: int;
  /** Visible on touch screens only. */
  static readonly VISIBILITY_TOUCHSCREEN_ONLY: int;
}
