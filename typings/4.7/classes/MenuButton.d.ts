// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A button that brings up a {@link PopupMenu} when clicked. */
declare class MenuButton<Tree extends object = any> extends Button<Tree> {
  /**
   * <member name="flat" type="bool" setter="set_flat" getter="is_flat" overrides="Button" default="true" />
   * <member name="focus_mode" type="int" setter="set_focus_mode" getter="get_focus_mode" overrides="Control" enum="Control.FocusMode" default="3" />
   * <member name="item_count" type="int" setter="set_item_count" getter="get_item_count" default="0">
   * The number of items currently in the list.
   */
  action_mode: int;
  /**
   * If `true`, when the cursor hovers above another {@link MenuButton} within the same parent which also has {@link switch_on_hover} enabled, it will close the current {@link MenuButton} and open the other one.
   */
  switch_on_hover: boolean;
  toggle_mode: boolean;
  set_switch_on_hover(value: boolean): void;
  is_switch_on_hover(): boolean;

  /**
   * Returns the {@link PopupMenu} contained in this button.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_popup(): PopupMenu;
  /** If `true`, shortcuts are disabled and cannot be used to trigger the button. */
  set_disable_shortcuts(disabled: boolean): void;
  /**
   * Adjusts popup position and sizing for the {@link MenuButton}, then shows the {@link PopupMenu}. Prefer this over using `get_popup().popup()`.
   */
  show_popup(): void;

  /** Emitted when the {@link PopupMenu} of this MenuButton is about to show. */
  about_to_popup: Signal<[]>;
}
