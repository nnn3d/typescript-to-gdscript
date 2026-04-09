// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A language translation that maps a collection of strings to their individual translations. */
declare class Translation extends Resource {
  /** The locale of the translation. */
  locale: string;
  /**
   * The plural rules string to enforce. See GNU gettext (https://www.gnu.org/software/gettext/manual/html_node/Plural-forms.html) for examples and more info.
   * If empty or invalid, default plural rules from {@link TranslationServer.get_plural_rules} are used. The English plural rules are used as a fallback.
   */
  plural_rules_override: string;
  set_locale(value: string): void;
  get_locale(): string;
  set_plural_rules_override(value: string): void;
  get_plural_rules_override(): string;

  /** Virtual method to override {@link get_message}. */
  _get_message(src_message: string, context: string): string;
  /** Virtual method to override {@link get_plural_message}. */
  _get_plural_message(src_message: string, src_plural_message: string, n: int, context: string): string;
  /**
   * Adds a message if nonexistent, followed by its translation.
   * An additional context could be used to specify the translation context or differentiate polysemic words.
   */
  add_message(src_message: string, xlated_message: string, context?: string): void;
  /**
   * Adds a message involving plural translation if nonexistent, followed by its translation.
   * An additional context could be used to specify the translation context or differentiate polysemic words.
   */
  add_plural_message(src_message: string, xlated_messages: PackedStringArray, context?: string): void;
  /** Erases a message. */
  erase_message(src_message: string, context?: string): void;
  /** Returns a message's translation. */
  get_message(src_message: string, context?: string): string;
  /** Returns the number of existing messages. */
  get_message_count(): int;
  /**
   * Returns the keys of all messages, that is, the context and untranslated strings of each message.
   * **Note:** If a message does not use a context, the corresponding element is the untranslated string. Otherwise, the corresponding element is the context and untranslated string separated by the EOT character (`U+0004`). This is done for compatibility purposes.
   */
  get_message_list(): PackedStringArray;
  /**
   * Returns a message's translation involving plurals.
   * The number `n` is the number or quantity of the plural object. It will be used to guide the translation system to fetch the correct plural form for the selected language.
   * **Note:** Plurals are only supported in gettext-based translations (PO) ($DOCS_URL/tutorials/i18n/localization_using_gettext.html), not CSV.
   */
  get_plural_message(src_message: string, src_plural_message: string, n: int, context?: string): string;
  /** Returns all the translated strings. */
  get_translated_message_list(): PackedStringArray;
}
