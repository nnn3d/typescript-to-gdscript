// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Resource filesystem, as the editor sees it. */
declare class EditorFileSystem<Tree extends object = any> extends Node<Tree> {
  /**
   * Returns the resource type of the file, given the full path. This returns a string such as `"Resource"` or `"GDScript"`, *not* a file extension such as `".gd"`.
   */
  get_file_type(path: string): string;
  /** Gets the root directory object. */
  get_filesystem(): EditorFileSystemDirectory;
  /** Returns a view into the filesystem at `path`. */
  get_filesystem_path(path: string): EditorFileSystemDirectory;
  /** Returns the scan progress for 0 to 1 if the FS is being scanned. */
  get_scanning_progress(): float;
  /** Returns `true` if resources are currently being imported. */
  is_importing(): boolean;
  /** Returns `true` if the filesystem is being scanned. */
  is_scanning(): boolean;
  /**
   * Reimports a set of files. Call this if these files or their `.import` files were directly edited by script or an external program.
   * If the file type changed or the file was newly created, use {@link update_file} or {@link scan}.
   * **Note:** This function blocks until the import is finished. However, the main loop iteration, including timers and {@link Node._process}, will occur during the import process due to progress bar updates. Avoid calls to {@link reimport_files} or {@link scan} while an import is in progress.
   */
  reimport_files(files: PackedStringArray): void;
  /** Scan the filesystem for changes. */
  scan(): void;
  /** Check if the source of any imported resource changed. */
  scan_sources(): void;
  /**
   * Add a file in an existing directory, or schedule file information to be updated on editor restart. Can be used to update text files saved by an external program.
   * This will not import the file. To reimport, call {@link reimport_files} or {@link scan} methods.
   */
  update_file(path: string): void;

  /** Emitted if the filesystem changed. */
  filesystem_changed: Signal<[]>;
  /** Emitted if a resource is reimported. */
  resources_reimported: Signal<[PackedStringArray]>;
  /** Emitted before a resource is reimported. */
  resources_reimporting: Signal<[PackedStringArray]>;
  /** Emitted if at least one resource is reloaded when the filesystem is scanned. */
  resources_reload: Signal<[PackedStringArray]>;
  /** Emitted when the list of global script classes gets updated. */
  script_classes_updated: Signal<[]>;
  /** Emitted if the source of any imported file changed. */
  sources_changed: Signal<[boolean]>;
}
