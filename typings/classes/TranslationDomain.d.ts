// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A self-contained collection of {@link Translation} resources. */
declare class TranslationDomain extends RefCounted {
  /**
   * If `true`, translation is enabled. Otherwise, {@link translate} and {@link translate_plural} will return the input message unchanged regardless of the current locale.
   */
  enabled: boolean;
  /**
   * Replace all characters with their accented variants during pseudolocalization.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_accents_enabled: boolean;
  /**
   * Double vowels in strings during pseudolocalization to simulate the lengthening of text due to localization.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_double_vowels_enabled: boolean;
  /**
   * If `true`, enables pseudolocalization for the project. This can be used to spot untranslatable strings or layout issues that may occur once the project is localized to languages that have longer strings than the source language.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_enabled: boolean;
  /**
   * The expansion ratio to use during pseudolocalization. A value of `0.3` is sufficient for most practical purposes, and will increase the length of each string by 30%.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_expansion_ratio: float;
  /**
   * If `true`, emulate bidirectional (right-to-left) text when pseudolocalization is enabled. This can be used to spot issues with RTL layout and UI mirroring that will crop up if the project is localized to RTL languages such as Arabic or Hebrew.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_fake_bidi_enabled: boolean;
  /**
   * Replace all characters in the string with `*`. Useful for finding non-localizable strings.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_override_enabled: boolean;
  /**
   * Prefix that will be prepended to the pseudolocalized string.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_prefix: string;
  /**
   * Skip placeholders for string formatting like `%s` or `%f` during pseudolocalization. Useful to identify strings which need additional control characters to display correctly.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_skip_placeholders_enabled: boolean;
  /**
   * Suffix that will be appended to the pseudolocalized string.
   * **Note:** Updating this property does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} notification manually after you have finished modifying pseudolocalization related options.
   */
  pseudolocalization_suffix: string;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_pseudolocalization_accents_enabled(value: boolean): void;
  is_pseudolocalization_accents_enabled(): boolean;
  set_pseudolocalization_double_vowels_enabled(value: boolean): void;
  is_pseudolocalization_double_vowels_enabled(): boolean;
  set_pseudolocalization_enabled(value: boolean): void;
  is_pseudolocalization_enabled(): boolean;
  set_pseudolocalization_expansion_ratio(value: float): void;
  get_pseudolocalization_expansion_ratio(): float;
  set_pseudolocalization_fake_bidi_enabled(value: boolean): void;
  is_pseudolocalization_fake_bidi_enabled(): boolean;
  set_pseudolocalization_override_enabled(value: boolean): void;
  is_pseudolocalization_override_enabled(): boolean;
  set_pseudolocalization_prefix(value: string): void;
  get_pseudolocalization_prefix(): string;
  set_pseudolocalization_skip_placeholders_enabled(value: boolean): void;
  is_pseudolocalization_skip_placeholders_enabled(): boolean;
  set_pseudolocalization_suffix(value: string): void;
  get_pseudolocalization_suffix(): string;

  /** Adds a translation. */
  add_translation(translation: Translation): void;
  /** Removes all translations. */
  clear(): void;
  /**
   * Returns the {@link Translation} instances that match `locale` (see {@link TranslationServer.compare_locales}). If `exact` is `true`, only instances whose locale exactly equals `locale` will be returned.
   */
  find_translations(locale: string, exact: boolean): Array<Translation>;
  /** Returns the locale override of the domain. Returns an empty string if locale override is disabled. */
  get_locale_override(): string;
  /**
   * Returns the {@link Translation} instance that best matches `locale`. Returns `null` if there are no matches.
   */
  get_translation_object(locale: string): Translation | null;
  /** Returns all available {@link Translation} instances as added by {@link add_translation}. */
  get_translations(): Array<Translation>;
  /** Returns `true` if this translation domain contains the given `translation`. */
  has_translation(translation: Translation): boolean;
  /**
   * Returns `true` if there are any {@link Translation} instances that match `locale` (see {@link TranslationServer.compare_locales}). If `exact` is `true`, only instances whose locale exactly equals `locale` are considered.
   */
  has_translation_for_locale(locale: string, exact: boolean): boolean;
  /** Returns the pseudolocalized string based on the `message` passed in. */
  pseudolocalize(message: string): string;
  /** Removes the given translation. */
  remove_translation(translation: Translation): void;
  /**
   * Sets the locale override of the domain.
   * If `locale` is an empty string, locale override is disabled. Otherwise, `locale` will be standardized to match known locales (e.g. `en-US` would be matched to `en_US`).
   * **Note:** Calling this method does not automatically update texts in the scene tree. Please propagate the {@link MainLoop.NOTIFICATION_TRANSLATION_CHANGED} signal manually.
   */
  set_locale_override(locale: string): void;
  /** Returns the current locale's translation for the given message and context. */
  translate(message: string, context?: string): string;
  /**
   * Returns the current locale's translation for the given message, plural message and context.
   * The number `n` is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   */
  translate_plural(message: string, message_plural: string, n: int, context?: string): string;
}
