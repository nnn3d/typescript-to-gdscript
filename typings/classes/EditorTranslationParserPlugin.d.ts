// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Plugin for adding custom parsers to extract strings that are to be translated from custom files (.csv, .json etc.).
 */
declare class EditorTranslationParserPlugin extends RefCounted {
  /**
   * Called after parsing all files. You can modify the `strings` array to add or remove entries from the final list of strings, then return it after modifications. Each entry is a {@link PackedStringArray} like explained in the {@link EditorTranslationParserPlugin}'s description.
   */
  _customize_strings(strings: Array<PackedStringArray>): Array<PackedStringArray>;
  /** Gets the list of file extensions to associate with this parser, e.g. `["csv"]`. */
  _get_recognized_extensions(): PackedStringArray;
  /** Override this method to define a custom parsing logic to extract the translatable strings. */
  _parse_file(path: string | NodePath): Array<PackedStringArray>;
}
