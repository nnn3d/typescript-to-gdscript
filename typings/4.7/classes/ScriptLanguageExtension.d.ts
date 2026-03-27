// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

declare class ScriptLanguageExtension extends ScriptLanguage {
  _add_global_constant(name: string, value: unknown): void;
  _add_named_global_constant(name: string, value: unknown): void;
  _auto_indent_code(code: string, from_line: int, to_line: int): string;
  _can_inherit_from_file(): boolean;
  _can_make_function(): boolean;
  _complete_code(code: string, path: string, owner: GodotObject): Dictionary;
  _create_script(): GodotObject;
  _debug_get_current_stack_info(): Dictionary;
  _debug_get_error(): string;
  _debug_get_globals(max_subitems: int, max_depth: int): Dictionary;
  _debug_get_stack_level_count(): int;
  _debug_get_stack_level_function(level: int): string;
  _debug_get_stack_level_instance(level: int): void;
  _debug_get_stack_level_line(level: int): int;
  _debug_get_stack_level_locals(level: int, max_subitems: int, max_depth: int): Dictionary;
  _debug_get_stack_level_members(level: int, max_subitems: int, max_depth: int): Dictionary;
  /** Returns the source associated with a given debug stack position. */
  _debug_get_stack_level_source(level: int): string;
  _debug_parse_stack_level_expression(level: int, expression: string, max_subitems: int, max_depth: int): string;
  /** Returns the line where the function is defined in the code, or `-1` if the function is not present. */
  _find_function(function_: string, code: string): int;
  _finish(): void;
  _frame(): void;
  _get_built_in_templates(object: string): Dictionary;
  _get_comment_delimiters(): PackedStringArray;
  _get_doc_comment_delimiters(): PackedStringArray;
  _get_extension(): string;
  _get_global_class_name(path: string): Dictionary;
  _get_name(): string;
  _get_public_annotations(): Dictionary;
  _get_public_constants(): Dictionary;
  _get_public_functions(): Dictionary;
  _get_recognized_extensions(): PackedStringArray;
  _get_reserved_words(): PackedStringArray;
  _get_string_delimiters(): PackedStringArray;
  _get_type(): string;
  _handles_global_class_type(type_: string): boolean;
  _has_named_classes(): boolean;
  _init(): void;
  _is_control_flow_keyword(keyword: string): boolean;
  _is_using_templates(): boolean;
  _lookup_code(code: string, symbol: string, path: string, owner: GodotObject): Dictionary;
  _make_function(class_name: string, function_name: string, function_args: PackedStringArray): string;
  _make_template(template: string, class_name: string, base_class_name: string): Script;
  _open_in_external_editor(script: Script, line: int, column: int): int;
  _overrides_external_editor(): boolean;
  _preferred_file_name_casing(): int;
  _profiling_get_accumulated_data(info_array: unknown, info_max: int): int;
  _profiling_get_frame_data(info_array: unknown, info_max: int): int;
  _profiling_set_save_native_calls(enable: boolean): void;
  _profiling_start(): void;
  _profiling_stop(): void;
  _reload_all_scripts(): void;
  _reload_scripts(scripts: Array<unknown>, soft_reload: boolean): void;
  _reload_tool_script(script: Script, soft_reload: boolean): void;
  _remove_named_global_constant(name: string): void;
  _supports_builtin_mode(): boolean;
  _supports_documentation(): boolean;
  _thread_enter(): void;
  _thread_exit(): void;
  _validate(script: string, path: string, validate_functions: boolean, validate_errors: boolean, validate_warnings: boolean, validate_safe_lines: boolean): Dictionary;
  _validate_path(path: string): string;

  // enum LookupResultType
  static readonly LOOKUP_RESULT_SCRIPT_LOCATION: int;
  static readonly LOOKUP_RESULT_CLASS: int;
  static readonly LOOKUP_RESULT_CLASS_CONSTANT: int;
  static readonly LOOKUP_RESULT_CLASS_PROPERTY: int;
  static readonly LOOKUP_RESULT_CLASS_METHOD: int;
  static readonly LOOKUP_RESULT_CLASS_SIGNAL: int;
  static readonly LOOKUP_RESULT_CLASS_ENUM: int;
  static readonly LOOKUP_RESULT_CLASS_TBD_GLOBALSCOPE: int;
  static readonly LOOKUP_RESULT_CLASS_ANNOTATION: int;
  static readonly LOOKUP_RESULT_LOCAL_CONSTANT: int;
  static readonly LOOKUP_RESULT_LOCAL_VARIABLE: int;
  static readonly LOOKUP_RESULT_MAX: int;
  // enum CodeCompletionLocation
  /**
   * The option is local to the location of the code completion query - e.g. a local variable. Subsequent value of location represent options from the outer class, the exact value represent how far they are (in terms of inner classes).
   */
  static readonly LOCATION_LOCAL: int;
  /**
   * The option is from the containing class or a parent class, relative to the location of the code completion query. Perform a bitwise OR with the class depth (e.g. `0` for the local class, `1` for the parent, `2` for the grandparent, etc.) to store the depth of an option in the class or a parent class.
   */
  static readonly LOCATION_PARENT_MASK: int;
  /**
   * The option is from user code which is not local and not in a derived class (e.g. Autoload Singletons).
   */
  static readonly LOCATION_OTHER_USER_CODE: int;
  /**
   * The option is from other engine code, not covered by the other enum constants - e.g. built-in classes.
   */
  static readonly LOCATION_OTHER: int;
  // enum CodeCompletionKind
  static readonly CODE_COMPLETION_KIND_CLASS: int;
  static readonly CODE_COMPLETION_KIND_FUNCTION: int;
  static readonly CODE_COMPLETION_KIND_SIGNAL: int;
  static readonly CODE_COMPLETION_KIND_VARIABLE: int;
  static readonly CODE_COMPLETION_KIND_MEMBER: int;
  static readonly CODE_COMPLETION_KIND_ENUM: int;
  static readonly CODE_COMPLETION_KIND_CONSTANT: int;
  static readonly CODE_COMPLETION_KIND_NODE_PATH: int;
  static readonly CODE_COMPLETION_KIND_FILE_PATH: int;
  static readonly CODE_COMPLETION_KIND_PLAIN_TEXT: int;
  static readonly CODE_COMPLETION_KIND_MAX: int;
}
