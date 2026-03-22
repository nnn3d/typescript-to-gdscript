// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Godot editor's popup dialog for creating new {@link Script} files. */
declare class ScriptCreateDialog extends ConfirmationDialog {
  dialog_hide_on_ok: boolean;
  ok_button_text: string;
  title: string;
  set_ok_button_text(value: string): void;
  get_ok_button_text(): string;

  /** Prefills required fields to configure the ScriptCreateDialog for use. */
  config(inherits: string, path: string, built_in_enabled?: boolean, load_enabled?: boolean): void;

  /** Emitted when the user clicks the OK button. */
  script_created: Signal<[Script]>;
}
