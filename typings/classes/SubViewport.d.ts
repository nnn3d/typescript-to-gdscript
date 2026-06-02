// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An interface to a game world that doesn't create a window or draw to the screen directly. */
declare class SubViewport extends Viewport {
  /**
   * The clear mode when the sub-viewport is used as a render target.
   * **Note:** This property is intended for 2D usage.
   */
  render_target_clear_mode: int;
  /** The update mode when the sub-viewport is used as a render target. */
  render_target_update_mode: int;
  /**
   * The width and height of the sub-viewport. Must be set to a value greater than or equal to 2 pixels on both dimensions. Otherwise, nothing will be displayed.
   * **Note:** If the parent node is a {@link SubViewportContainer} and its {@link SubViewportContainer.stretch} is `true`, the viewport size cannot be changed manually.
   */
  size: Vector2i;
  /**
   * The 2D size override of the sub-viewport. If either the width or height is `0`, the override is disabled.
   */
  size_2d_override: Vector2i;
  /** If `true`, the 2D size override affects stretch as well. */
  size_2d_override_stretch: boolean;
  set_clear_mode(value: int): void;
  get_clear_mode(): int;
  set_update_mode(value: int): void;
  get_update_mode(): int;
  set_size(value: Vector2i | Vector2): void;
  get_size(): Vector2i;
  set_size_2d_override(value: Vector2i | Vector2): void;
  get_size_2d_override(): Vector2i;
  set_size_2d_override_stretch(value: boolean): void;
  is_size_2d_override_stretch_enabled(): boolean;

  // enum ClearMode
  /** Always clear the render target before drawing. */
  static readonly CLEAR_MODE_ALWAYS: int;
  /** Never clear the render target. */
  static readonly CLEAR_MODE_NEVER: int;
  /** Clear the render target on the next frame, then switch to {@link CLEAR_MODE_NEVER}. */
  static readonly CLEAR_MODE_ONCE: int;
  // enum UpdateMode
  /** Do not update the render target. */
  static readonly UPDATE_DISABLED: int;
  /** Update the render target once, then switch to {@link UPDATE_DISABLED}. */
  static readonly UPDATE_ONCE: int;
  /** Update the render target only when it is visible. This is the default value. */
  static readonly UPDATE_WHEN_VISIBLE: int;
  /** Update the render target only when its parent is visible. */
  static readonly UPDATE_WHEN_PARENT_VISIBLE: int;
  /** Always update the render target. */
  static readonly UPDATE_ALWAYS: int;
}
