// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Manages toast notifications within the editor. */
declare class EditorToaster<Tree extends object = any> extends HBoxContainer<Tree> {
  /** Pushes a toast notification to the editor for display. */
  push_toast(message: string, severity: int, tooltip?: string): void;

  // enum Severity
  /** Toast will display with an INFO severity. */
  static readonly SEVERITY_INFO: int;
  /** Toast will display with a WARNING severity and have a corresponding color. */
  static readonly SEVERITY_WARNING: int;
  /** Toast will display with an ERROR severity and have a corresponding color. */
  static readonly SEVERITY_ERROR: int;
}
