// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides methods for managing directories and their content. */
declare class DirAccess extends RefCounted {
  /**
   * If `true`, hidden files are included when navigating the directory.
   * Affects {@link list_dir_begin}, {@link get_directories} and {@link get_files}.
   */
  include_hidden: boolean;
  /**
   * If `true`, `.` and `..` are included when navigating the directory.
   * Affects {@link list_dir_begin} and {@link get_directories}.
   */
  include_navigational: boolean;
  set_include_hidden(value: boolean): void;
  get_include_hidden(): boolean;
  set_include_navigational(value: boolean): void;
  get_include_navigational(): boolean;

  /**
   * Changes the currently opened directory to the one passed as an argument. The argument can be relative to the current directory (e.g. `newdir` or `../newdir`), or an absolute path (e.g. `/tmp/newdir` or `res://somedir/newdir`).
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   * **Note:** The new directory must be within the same scope, e.g. when you had opened a directory inside `res://`, you can't change it to `user://` directory. If you need to open a directory in another access scope, use {@link open} to create a new instance instead.
   */
  change_dir(to_dir: string): int;
  /**
   * Copies the `from` file to the `to` destination. Both arguments should be paths to files, either relative or absolute. If the destination file exists and is not access-protected, it will be overwritten.
   * If `chmod_flags` is different than `-1`, the Unix permissions for the destination path will be set to the provided value, if available on the current operating system.
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   */
  copy(from_: string, to: string, chmod_flags?: int): int;
  /** Static version of {@link copy}. Supports only absolute paths. */
  static copy_absolute(from_: string, to: string, chmod_flags?: int): int;
  /**
   * Creates symbolic link between files or folders.
   * **Note:** On Windows, this method works only if the application is running with elevated privileges or Developer Mode is enabled.
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   */
  create_link(source: string, target: string): int;
  /**
   * Creates a temporary directory. This directory will be freed when the returned {@link DirAccess} is freed.
   * If `prefix` is not empty, it will be prefixed to the directory name, separated by a `-`.
   * If `keep` is `true`, the directory is not deleted when the returned {@link DirAccess} is freed.
   * Returns `null` if opening the directory failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static create_temp(prefix?: string, keep?: boolean): DirAccess | null;
  /**
   * Returns whether the current item processed with the last {@link get_next} call is a directory (`.` and `..` are considered directories).
   */
  current_is_dir(): boolean;
  /**
   * Returns whether the target directory exists. The argument can be relative to the current directory, or an absolute path.
   * **Note:** The returned [bool] in the editor and after exporting when used on a path in the `res://` directory may be different. Some files are converted to engine-specific formats when exported, potentially changing the directory structure.
   */
  dir_exists(path: string): boolean;
  /**
   * Static version of {@link dir_exists}. Supports only absolute paths.
   * **Note:** The returned [bool] in the editor and after exporting when used on a path in the `res://` directory may be different. Some files are converted to engine-specific formats when exported, potentially changing the directory structure.
   */
  static dir_exists_absolute(path: string): boolean;
  /**
   * Returns whether the target file exists. The argument can be relative to the current directory, or an absolute path.
   * For a static equivalent, use {@link FileAccess.file_exists}.
   * **Note:** Many resources types are imported (e.g. textures or sound files), and their source asset will not be included in the exported game, as only the imported version is used. See {@link ResourceLoader.exists} for an alternative approach that takes resource remapping into account.
   */
  file_exists(path: string): boolean;
  /**
   * Returns the absolute path to the currently opened directory (e.g. `res://folder` or `C:\tmp\folder`).
   */
  get_current_dir(include_drive?: boolean): string;
  /**
   * Returns the currently opened directory's drive index. See {@link get_drive_name} to convert returned index to the name of the drive.
   */
  get_current_drive(): int;
  /**
   * Returns a {@link PackedStringArray} containing filenames of the directory contents, excluding files. The array is sorted alphabetically.
   * Affected by {@link include_hidden} and {@link include_navigational}.
   * **Note:** The returned directories in the editor and after exporting in the `res://` directory may differ as some files are converted to engine-specific formats when exported.
   */
  get_directories(): PackedStringArray;
  /**
   * Returns a {@link PackedStringArray} containing filenames of the directory contents, excluding files, at the given `path`. The array is sorted alphabetically.
   * Use {@link get_directories} if you want more control of what gets included.
   * **Note:** The returned directories in the editor and after exporting in the `res://` directory may differ as some files are converted to engine-specific formats when exported.
   */
  static get_directories_at(path: string): PackedStringArray;
  /**
   * On Windows, returns the number of drives (partitions) mounted on the current filesystem.
   * On macOS and Android, returns the number of mounted volumes.
   * On Linux, returns the number of mounted volumes and GTK 3 bookmarks.
   * On other platforms, the method returns 0.
   */
  static get_drive_count(): int;
  /**
   * On Windows, returns the name of the drive (partition) passed as an argument (e.g. `C:`).
   * On macOS, returns the path to the mounted volume passed as an argument.
   * On Linux, returns the path to the mounted volume or GTK 3 bookmark passed as an argument.
   * On Android (API level 30+), returns the path to the mounted volume as an argument.
   * On other platforms, or if the requested drive does not exist, the method returns an empty String.
   */
  static get_drive_name(idx: int): string;
  /**
   * Returns a {@link PackedStringArray} containing filenames of the directory contents, excluding directories. The array is sorted alphabetically.
   * Affected by {@link include_hidden}.
   * **Note:** When used on a `res://` path in an exported project, only the files actually included in the PCK at the given folder level are returned. In practice, this means that since imported resources are stored in a top-level `.godot/` folder, only paths to `*.gd` and `*.import` files are returned (plus a few files such as `project.godot` or `project.binary` and the project icon). In an exported project, the list of returned files will also vary depending on whether {@link ProjectSettings.editor/export/convert_text_resources_to_binary} is `true`.
   */
  get_files(): PackedStringArray;
  /**
   * Returns a {@link PackedStringArray} containing filenames of the directory contents, excluding directories, at the given `path`. The array is sorted alphabetically.
   * Use {@link get_files} if you want more control of what gets included.
   * **Note:** When used on a `res://` path in an exported project, only the files included in the PCK at the given folder level are returned. In practice, this means that since imported resources are stored in a top-level `.godot/` folder, only paths to `.gd` and `.import` files are returned (plus a few other files, such as `project.godot` or `project.binary` and the project icon). In an exported project, the list of returned files will also vary depending on {@link ProjectSettings.editor/export/convert_text_resources_to_binary}.
   */
  static get_files_at(path: string): PackedStringArray;
  /**
   * Returns file system type name of the current directory's disk. Returned values are uppercase strings like `NTFS`, `FAT32`, `EXFAT`, `APFS`, `EXT4`, `BTRFS`, and so on.
   * **Note:** This method is implemented on macOS, Linux, Windows and for PCK virtual file system.
   */
  get_filesystem_type(): string;
  /**
   * Returns the next element (file or directory) in the current directory.
   * The name of the file or directory is returned (and not its full path). Once the stream has been fully processed, the method returns an empty {@link String} and closes the stream automatically (i.e. {@link list_dir_end} would not be mandatory in such a case).
   */
  get_next(): string;
  /** Returns the result of the last {@link open} call in the current thread. */
  static get_open_error(): int;
  /**
   * Returns the available space on the current directory's disk, in bytes. Returns `0` if the platform-specific method to query the available space fails.
   */
  get_space_left(): int;
  /**
   * Returns `true` if the directory is a macOS bundle.
   * **Note:** This method is implemented on macOS.
   */
  is_bundle(path: string): boolean;
  /**
   * Returns `true` if the file system or directory use case sensitive file names.
   * **Note:** This method is implemented on macOS, Linux (for EXT4 and F2FS filesystems only) and Windows. On other platforms, it always returns `true`.
   */
  is_case_sensitive(path: string): boolean;
  /**
   * Returns `true` if paths `path_a` and `path_b` resolve to the same file system object. Returns `false` otherwise, even if the files are bit-for-bit identical (e.g., identical copies of the file that are not symbolic links).
   */
  is_equivalent(path_a: string, path_b: string): boolean;
  /**
   * Returns `true` if the file or directory is a symbolic link, directory junction, or other reparse point.
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   */
  is_link(path: string): boolean;
  /**
   * Initializes the stream used to list all files and directories using the {@link get_next} function, closing the currently opened stream if needed. Once the stream has been processed, it should typically be closed with {@link list_dir_end}.
   * Affected by {@link include_hidden} and {@link include_navigational}.
   * **Note:** The order of files and directories returned by this method is not deterministic, and can vary between operating systems. If you want a list of all files or folders sorted alphabetically, use {@link get_files} or {@link get_directories}.
   */
  list_dir_begin(): int;
  /**
   * Closes the current stream opened with {@link list_dir_begin} (whether it has been fully processed with {@link get_next} does not matter).
   */
  list_dir_end(): void;
  /**
   * Creates a directory. The argument can be relative to the current directory, or an absolute path. The target directory should be placed in an already existing directory (to create the full path recursively, see {@link make_dir_recursive}).
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   */
  make_dir(path: string): int;
  /** Static version of {@link make_dir}. Supports only absolute paths. */
  static make_dir_absolute(path: string): int;
  /**
   * Creates a target directory and all necessary intermediate directories in its path, by calling {@link make_dir} recursively. The argument can be relative to the current directory, or an absolute path.
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   */
  make_dir_recursive(path: string): int;
  /** Static version of {@link make_dir_recursive}. Supports only absolute paths. */
  static make_dir_recursive_absolute(path: string): int;
  /**
   * Creates a new {@link DirAccess} object and opens an existing directory of the filesystem. The `path` argument can be within the project tree (`res://folder`), the user directory (`user://folder`) or an absolute path of the user filesystem (e.g. `/tmp/folder` or `C:\tmp\folder`).
   * Returns `null` if opening the directory failed. You can use {@link get_open_error} to check the error that occurred.
   */
  static open(path: string): DirAccess | null;
  /**
   * Returns target of the symbolic link.
   * **Note:** This method is implemented on macOS, Linux, and Windows.
   */
  read_link(path: string): string;
  /**
   * Permanently deletes the target file or an empty directory. The argument can be relative to the current directory, or an absolute path. If the target directory is not empty, the operation will fail.
   * If you don't want to delete the file/directory permanently, use {@link OS.move_to_trash} instead.
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   */
  remove(path: string): int;
  /** Static version of {@link remove}. Supports only absolute paths. */
  static remove_absolute(path: string): int;
  /**
   * Renames (move) the `from` file or directory to the `to` destination. Both arguments should be paths to files or directories, either relative or absolute. If the destination file or directory exists and is not access-protected, it will be overwritten.
   * Returns one of the {@link Error} code constants ({@link OK} on success).
   */
  rename(from_: string, to: string): int;
  /** Static version of {@link rename}. Supports only absolute paths. */
  static rename_absolute(from_: string, to: string): int;
}
