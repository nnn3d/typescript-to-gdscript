// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** The server responsible for language translations. */
declare class TranslationServer extends GodotObject {
  /**
   * If `true`, enables the use of pseudolocalization on the main translation domain. See {@link ProjectSettings.internationalization/pseudolocalization/use_pseudolocalization} for details.
   */
  pseudolocalization_enabled: boolean;

  /** Adds a translation to the main translation domain. */
  add_translation(translation: Translation): void;
  /** Removes all translations from the main translation domain. */
  clear(): void;
  /** Compares two locales and returns a similarity score between `0` (no match) and `10` (full match). */
  compare_locales(locale_a: string, locale_b: string): int;
  /**
   * Returns the {@link Translation} instances in the main translation domain that match `locale` (see {@link compare_locales}). If `exact` is `true`, only instances whose locale exactly equals `locale` will be returned.
   */
  find_translations(locale: string, exact: boolean): unknown;
  /** Converts a number from Western Arabic (0..9) to the numeral system used in the given `locale`. */
  format_number(number: string, locale: string): string;
  /** Returns an array of known country codes. */
  get_all_countries(): PackedStringArray;
  /** Returns array of known language codes. */
  get_all_languages(): PackedStringArray;
  /** Returns an array of known script codes. */
  get_all_scripts(): PackedStringArray;
  /** Returns a readable country name for the `country` code. */
  get_country_name(country: string): string;
  /** Returns a readable language name for the `language` code. */
  get_language_name(language: string): string;
  /** Returns an array of all loaded locales of the project. */
  get_loaded_locales(): PackedStringArray;
  /**
   * Returns the current locale of the project.
   * See also {@link OS.get_locale} and {@link OS.get_locale_language} to query the locale of the user system.
   */
  get_locale(): string;
  /**
   * Returns a locale's language and its variant (e.g. `"en_US"` would return `"English (United States)"`).
   */
  get_locale_name(locale: string): string;
  /**
   * Returns the translation domain with the specified name. An empty translation domain will be created and added if it does not exist.
   */
  get_or_add_domain(domain: string): TranslationDomain;
  /** Returns the percent sign used in the given `locale`. */
  get_percent_sign(locale: string): string;
  /** Returns the default plural rules for the `locale`. */
  get_plural_rules(locale: string): string;
  /** Returns a readable script name for the `script` code. */
  get_script_name(script: string): string;
  /**
   * Returns the current locale of the editor.
   * **Note:** When called from an exported project returns the same value as {@link get_locale}.
   */
  get_tool_locale(): string;
  /**
   * Returns the {@link Translation} instance that best matches `locale` in the main translation domain. Returns `null` if there are no matches.
   */
  get_translation_object(locale: string): Translation;
  /**
   * Returns all available {@link Translation} instances in the main translation domain as added by {@link add_translation}.
   */
  get_translations(): unknown;
  /** Returns `true` if a translation domain with the specified name exists. */
  has_domain(domain: string): boolean;
  /** Returns `true` if the main translation domain contains the given `translation`. */
  has_translation(translation: Translation): boolean;
  /**
   * Returns `true` if there are any {@link Translation} instances in the main translation domain that match `locale` (see {@link compare_locales}). If `exact` is `true`, only instances whose locale exactly equals `locale` are considered.
   */
  has_translation_for_locale(locale: string, exact: boolean): boolean;
  /** Converts `number` from the numeral system used in the given `locale` to Western Arabic (0..9). */
  parse_number(number: string, locale: string): string;
  /**
   * Returns the pseudolocalized string based on the `message` passed in.
   * **Note:** This method always uses the main translation domain.
   */
  pseudolocalize(message: string): string;
  /**
   * Reparses the pseudolocalization options and reloads the translation for the main translation domain.
   */
  reload_pseudolocalization(): void;
  /**
   * Removes the translation domain with the specified name.
   * **Note:** Trying to remove the main translation domain is an error.
   */
  remove_domain(domain: string): void;
  /** Removes the given translation from the main translation domain. */
  remove_translation(translation: Translation): void;
  /**
   * Sets the locale of the project. The `locale` string will be standardized to match known locales (e.g. `en-US` would be matched to `en_US`).
   * If translations have been loaded beforehand for the new locale, they will be applied.
   */
  set_locale(locale: string): void;
  /**
   * Returns a `locale` string standardized to match known locales (e.g. `en-US` would be matched to `en_US`). If `add_defaults` is `true`, the locale may have a default script or country added.
   */
  standardize_locale(locale: string, add_defaults?: boolean): string;
  /**
   * Returns the current locale's translation for the given message and context.
   * **Note:** This method always uses the main translation domain.
   */
  translate(message: string, context?: string): string;
  /**
   * Returns the current locale's translation for the given message, plural message and context.
   * The number `n` is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   * **Note:** This method always uses the main translation domain.
   */
  translate_plural(message: string, plural_message: string, n: int, context?: string): string;
}
