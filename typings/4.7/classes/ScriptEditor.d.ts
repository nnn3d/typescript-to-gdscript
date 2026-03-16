// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Godot editor's script editor. */
declare class ScriptEditor extends PanelContainer {
  /**
   * Removes the documentation for the given `script`.
   * **Note:** This should be called whenever the script is changed to keep the open documentation state up to date.
   */
  clear_docs_from_script(script: Script): void;
  /** Returns array of breakpoints. */
  get_breakpoints(): PackedStringArray;
  /** Returns the {@link ScriptEditorBase} object that the user is currently editing. */
  get_current_editor(): ScriptEditorBase;
  /** Returns a {@link Script} that is currently active in editor. */
  get_current_script(): Script;
  /** Returns an array with all {@link ScriptEditorBase} objects which are currently open in editor. */
  get_open_script_editors(): unknown;
  /** Returns an array with all {@link Script} objects which are currently open in editor. */
  get_open_scripts(): unknown;
  /**
   * Opens help for the given topic. The `topic` is an encoded string that controls which class, method, constant, signal, annotation, property, or theme item should be focused.
   * The supported `topic` formats include `class_name:class`, `class_method:class:method`, `class_constant:class:constant`, `class_signal:class:signal`, `class_annotation:class:@annotation`, `class_property:class:property`, and `class_theme_item:class:item`, where `class` is the class name, `method` is the method name, `constant` is the constant name, `signal` is the signal name, `annotation` is the annotation name, `property` is the property name, and `item` is the theme item.
   */
  goto_help(topic: string): void;
  /** Goes to the specified line in the current script. */
  goto_line(line_number: int): void;
  /**
   * Opens the script create dialog. The script will extend `base_name`. The file extension can be omitted from `base_path`. It will be added based on the selected scripting language.
   */
  open_script_create_dialog(base_name: string, base_path: string): void;
  /**
   * Registers the {@link EditorSyntaxHighlighter} to the editor, the {@link EditorSyntaxHighlighter} will be available on all open scripts.
   * **Note:** Does not apply to scripts that are already opened.
   */
  register_syntax_highlighter(syntax_highlighter: EditorSyntaxHighlighter): void;
  /**
   * Reloads all currently opened files. This should be used when opened files are changed outside of the script editor. The user may be prompted to resolve file conflicts, see {@link EditorSettings.text_editor/behavior/files/auto_reload_scripts_on_external_change}.
   */
  reload_open_files(): void;
  /** Saves all open scripts. */
  save_all_scripts(): void;
  /**
   * Unregisters the {@link EditorSyntaxHighlighter} from the editor.
   * **Note:** The {@link EditorSyntaxHighlighter} will still be applied to scripts that are already opened.
   */
  unregister_syntax_highlighter(syntax_highlighter: EditorSyntaxHighlighter): void;
  /**
   * Updates the documentation for the given `script`.
   * **Note:** This should be called whenever the script is changed to keep the open documentation state up to date.
   */
  update_docs_from_script(script: Script): void;

  /** Emitted when user changed active script. Argument is a freshly activated {@link Script}. */
  editor_script_changed: Signal<[Script]>;
  /**
   * Emitted when editor is about to close the active script. Argument is a {@link Script} that is going to be closed.
   */
  script_close: Signal<[Script]>;
}
