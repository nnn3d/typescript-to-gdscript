// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Helper class to handle INI-style files. */
declare class ConfigFile extends RefCounted {
  /** Removes the entire contents of the config. */
  clear(): void;
  /** Obtain the text version of this config file (the same text that would be written to a file). */
  encode_to_text(): string;
  /**
   * Deletes the specified section along with all the key-value pairs inside. Raises an error if the section does not exist.
   */
  erase_section(section: string): void;
  /**
   * Deletes the specified key in a section. Raises an error if either the section or the key do not exist.
   */
  erase_section_key(section: string, key: string): void;
  /**
   * Returns an array of all defined key identifiers in the specified section. Raises an error and returns an empty array if the section does not exist.
   */
  get_section_keys(section: string): PackedStringArray;
  /** Returns an array of all defined section identifiers. */
  get_sections(): PackedStringArray;
  /**
   * Returns the current value for the specified section and key. If either the section or the key do not exist, the method returns the fallback `default` value. If `default` is not specified or set to `null`, an error is also raised.
   */
  get_value(section: string, key: string, default_?: unknown): unknown;
  /** Returns `true` if the specified section exists. */
  has_section(section: string): boolean;
  /** Returns `true` if the specified section-key pair exists. */
  has_section_key(section: string, key: string): boolean;
  /**
   * Loads the config file specified as a parameter. The file's contents are parsed and loaded in the {@link ConfigFile} object which the method was called on.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  load(path: string): int;
  /**
   * Loads the encrypted config file specified as a parameter, using the provided `key` to decrypt it. The file's contents are parsed and loaded in the {@link ConfigFile} object which the method was called on.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  load_encrypted(path: string, key: PackedByteArray): int;
  /**
   * Loads the encrypted config file specified as a parameter, using the provided `password` to decrypt it. The file's contents are parsed and loaded in the {@link ConfigFile} object which the method was called on.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  load_encrypted_pass(path: string, password: string): int;
  /**
   * Parses the passed string as the contents of a config file. The string is parsed and loaded in the ConfigFile object which the method was called on.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  parse(data: string): int;
  /**
   * Saves the contents of the {@link ConfigFile} object to the file specified as a parameter. The output file uses an INI-style structure.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  save(path: string): int;
  /**
   * Saves the contents of the {@link ConfigFile} object to the AES-256 encrypted file specified as a parameter, using the provided `key` to encrypt it. The output file uses an INI-style structure.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  save_encrypted(path: string, key: PackedByteArray): int;
  /**
   * Saves the contents of the {@link ConfigFile} object to the AES-256 encrypted file specified as a parameter, using the provided `password` to encrypt it. The output file uses an INI-style structure.
   * Returns {@link OK} on success, or one of the other {@link Error} values if the operation failed.
   */
  save_encrypted_pass(path: string, password: string): int;
  /**
   * Assigns a value to the specified key of the specified section. If either the section or the key do not exist, they are created. Passing a `null` value deletes the specified key if it exists, and deletes the section if it ends up empty once the key has been removed.
   */
  set_value(section: string, key: string, value: unknown): void;
}
