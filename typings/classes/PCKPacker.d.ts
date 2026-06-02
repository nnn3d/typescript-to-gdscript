// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Creates packages that can be loaded into a running project. */
declare class PCKPacker extends RefCounted {
  /**
   * Adds the `source_path` file to the current PCK package at the `target_path` internal path. The `res://` prefix for `target_path` is optional and stripped internally. File content is immediately written to the PCK.
   */
  add_file(target_path: string | NodePath, source_path: string | NodePath, encrypt?: boolean): int;
  /**
   * Registers a file removal of the `target_path` internal path to the PCK. This is mainly used for patches. If the file at this path has been loaded from a previous PCK, it will be removed. The `res://` prefix for `target_path` is optional and stripped internally.
   */
  add_file_removal(target_path: string | NodePath): int;
  /**
   * Writes the file directory and closes the PCK. If `verbose` is `true`, a list of files added will be printed to the console for easier debugging.
   * **Note:** {@link PCKPacker} will automatically flush when it's freed, which happens when it goes out of scope or when it gets assigned with `null`. In C# the reference must be disposed after use, either with the `using` statement or by calling the `Dispose` method directly.
   */
  flush(verbose?: boolean): int;
  /**
   * Creates a new PCK file at the file path `pck_path`. The `.pck` file extension isn't added automatically, so it should be part of `pck_path` (even though it's not required).
   */
  pck_start(pck_path: string | NodePath, alignment?: int, key?: string | NodePath, encrypt_directory?: boolean): int;
}
