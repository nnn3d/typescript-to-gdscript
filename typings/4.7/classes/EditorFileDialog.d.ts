// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A modified version of {@link FileDialog} used by the editor. */
declare class EditorFileDialog extends FileDialog {
  /** If `true`, the {@link EditorFileDialog} will not warn the user before overwriting files. */
  disable_overwrite_warning: boolean;
  set_disable_overwrite_warning(value: boolean): void;
  is_overwrite_warning_disabled(): boolean;

  /**
   * This method is kept for compatibility and does nothing. As an alternative, you can display another dialog after showing the file dialog.
   */
  add_side_menu(menu: Control, title?: string): void;
}
