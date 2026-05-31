// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

declare class ScriptExtension extends Script {
  _can_instantiate(): boolean;
  _editor_can_reload_from_file(): boolean;
  _get_base_script(): Script | null;
  _get_class_icon_path(): string;
  _get_constants(): Dictionary;
  _get_doc_class_name(): string;
  _get_documentation(): Array<Dictionary>;
  _get_global_name(): string;
  _get_instance_base_type(): string;
  _get_language(): ScriptLanguage | null;
  _get_member_line(member: string): int;
  _get_members(): Array<string>;
  _get_method_info(method: string): Dictionary;
  _get_property_default_value(property: string): unknown;
  _get_rpc_config(): unknown;
  /**
   * Return the expected argument count for the given `method`, or `null` if it can't be determined (which will then fall back to the default behavior).
   */
  _get_script_method_argument_count(method: string): unknown;
  _get_script_method_list(): Array<Dictionary>;
  _get_script_property_list(): Array<Dictionary>;
  _get_script_signal_list(): Array<Dictionary>;
  _get_source_code(): string;
  _has_method(method: string): boolean;
  _has_property_default_value(property: string): boolean;
  _has_script_signal(signal: string): boolean;
  _has_source_code(): boolean;
  _has_static_method(method: string): boolean;
  _inherits_script(script: Script): boolean;
  _instance_create(for_object: GodotObject): void;
  _instance_has(object: GodotObject): boolean;
  /**
   * Returns `true` if the script is an abstract script. Abstract scripts cannot be instantiated directly, instead other scripts should inherit them. Abstract scripts will be either unselectable or hidden in the Create New Node dialog (unselectable if there are non-abstract classes inheriting it, otherwise hidden).
   */
  _is_abstract(): boolean;
  _is_placeholder_fallback_enabled(): boolean;
  _is_tool(): boolean;
  _is_valid(): boolean;
  _placeholder_erased(placeholder: void): void;
  _placeholder_instance_create(for_object: GodotObject): void;
  _reload(keep_state: boolean): int;
  _set_source_code(code: string | NodePath): void;
  _update_exports(): void;
}
