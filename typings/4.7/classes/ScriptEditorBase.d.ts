// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base editor for editing scripts in the {@link ScriptEditor}. */
declare class ScriptEditorBase extends VBoxContainer {
  /** Adds an {@link EditorSyntaxHighlighter} to the open script. */
  add_syntax_highlighter(highlighter: EditorSyntaxHighlighter): void;
  /**
   * Returns the underlying {@link Control} used for editing scripts. For text scripts, this is a {@link CodeEdit}.
   */
  get_base_editor(): Control;

  /** Emitted after script validation. */
  edited_script_changed: Signal<[]>;
  /** Emitted when the user requests a specific documentation page. */
  go_to_help: Signal<[string]>;
  /**
   * Emitted when the user requests to view a specific method of a script, similar to {@link request_open_script_at_line}.
   */
  go_to_method: Signal<[GodotObject, string]>;
  /** Emitted after script validation or when the edited resource has changed. */
  name_changed: Signal<[]>;
  /** Emitted when the user request to find and replace text in the file system. */
  replace_in_files_requested: Signal<[string]>;
  /** Emitted when the user requests contextual help. */
  request_help: Signal<[string]>;
  /**
   * Emitted when the user requests to view a specific line of a script, similar to {@link go_to_method}.
   */
  request_open_script_at_line: Signal<[GodotObject, int]>;
  /** Emitted when the user contextual goto and the item is in the same script. */
  request_save_history: Signal<[]>;
  /**
   * Emitted when the user changes current script or moves caret by 10 or more columns within the same script.
   */
  request_save_previous_state: Signal<[Dictionary]>;
  /** Emitted when the user request to search text in the file system. */
  search_in_files_requested: Signal<[string]>;
}
