// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base class for {@link SyntaxHighlighter} used by the {@link ScriptEditor}. */
declare class EditorSyntaxHighlighter extends SyntaxHighlighter {
  /** Virtual method which creates a new instance of the syntax highlighter. */
  _create(): EditorSyntaxHighlighter | null;
  /** Virtual method which can be overridden to return the syntax highlighter name. */
  _get_name(): string;
  /** Virtual method which can be overridden to return the supported language names. */
  _get_supported_languages(): PackedStringArray;
}
