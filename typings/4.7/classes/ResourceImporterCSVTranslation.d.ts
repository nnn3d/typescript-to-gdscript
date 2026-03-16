// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Imports comma-separated values as {@link Translation}s. */
declare class ResourceImporterCSVTranslation extends ResourceImporter {
  /**
   * - **Disabled**: Creates a {@link Translation}.
   * - **Auto**: Creates an {@link OptimizedTranslation} when possible. This makes the resulting file smaller at the cost of a small CPU overhead. Falls back to {@link Translation} for translations with context or plural forms.
   */
  compress: int;
  /**
   * The delimiter to use in the CSV file. The default value matches the common CSV convention. Tab-separated values are sometimes called TSV files.
   */
  delimiter: int;
  /**
   * If `true`, message keys in the CSV file are unescaped using {@link String.c_unescape} during the import process.
   */
  unescape_keys: boolean;
  /**
   * If `true`, message translations in the CSV file are unescaped using {@link String.c_unescape} during the import process.
   */
  unescape_translations: boolean;
}
