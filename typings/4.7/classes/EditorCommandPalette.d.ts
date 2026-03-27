// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Godot editor's command palette. */
declare class EditorCommandPalette<Tree extends object = any> extends ConfirmationDialog<Tree> {
  dialog_hide_on_ok: boolean;

  /**
   * Adds a custom command to EditorCommandPalette.
   * - `command_name`: {@link String} (Name of the **Command**. This is displayed to the user.)
   * - `key_name`: {@link String} (Name of the key for a particular **Command**. This is used to uniquely identify the **Command**.)
   * - `binded_callable`: {@link Callable} (Callable of the **Command**. This will be executed when the **Command** is selected.)
   * - `shortcut_text`: {@link String} (Shortcut text of the **Command** if available.)
   */
  add_command(command_name: string, key_name: string, binded_callable: Callable, shortcut_text?: string): void;
  /**
   * Removes the custom command from EditorCommandPalette.
   * - `key_name`: {@link String} (Name of the key for a particular **Command**.)
   */
  remove_command(key_name: string): void;
}
