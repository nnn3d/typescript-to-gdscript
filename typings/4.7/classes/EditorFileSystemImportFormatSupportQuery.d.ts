// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Used to query and configure import format support. */
declare class EditorFileSystemImportFormatSupportQuery extends RefCounted {
  /** Return the file extensions supported. */
  _get_file_extensions(): PackedStringArray;
  /** Return whether this importer is active. */
  _is_active(): boolean;
  /** Query support. Return `false` if import must not continue. */
  _query(): boolean;
}
