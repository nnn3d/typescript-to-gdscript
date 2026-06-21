// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Workspace related language server functionality. */
declare class GDScriptWorkspace extends RefCounted {
  apply_new_signal(obj: GodotObject, function_: string | NodePath, args: PackedStringArray | Array<unknown>): void;
  didDeleteFiles(params: Dictionary): void;
  /** Returns the interface of the script in a machine-readable format. */
  generate_script_api(path: string | NodePath): Dictionary;
  /** Converts a URI to a file path. */
  get_file_path(uri: string | NodePath): string;
  /** Converts a file path to a URI. */
  get_file_uri(path: string | NodePath): string;
  parse_local_script(path: string | NodePath): int;
  parse_script(path: string | NodePath, content: string | NodePath): int;
  publish_diagnostics(path: string | NodePath): void;
}
