// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A base class to implement debugger plugins. */
declare class EditorDebuggerPlugin extends RefCounted {
  /** Override this method to be notified when a breakpoint is set in the editor. */
  _breakpoint_set_in_tree(script: Script, line: int, enabled: boolean): void;
  /** Override this method to be notified when all breakpoints are cleared in the editor. */
  _breakpoints_cleared_in_tree(): void;
  /**
   * Override this method to process incoming messages. The `session_id` is the ID of the {@link EditorDebuggerSession} that received the `message`. Use {@link get_session} to retrieve the session. This method should return `true` if the message is recognized.
   */
  _capture(message: string, data: Array<unknown>, session_id: int): boolean;
  /**
   * Override this method to be notified when a breakpoint line has been clicked in the debugger breakpoint panel.
   */
  _goto_script_line(script: Script, line: int): void;
  /**
   * Override this method to enable receiving messages from the debugger. If `capture` is "my_message" then messages starting with "my_message:" will be passed to the {@link _capture} method.
   */
  _has_capture(capture: string): boolean;
  /**
   * Override this method to be notified whenever a new {@link EditorDebuggerSession} is created. Note that the session may be inactive during this stage.
   */
  _setup_session(session_id: int): void;
  /** Returns the {@link EditorDebuggerSession} with the given `id`. */
  get_session(id: int): EditorDebuggerSession;
  /**
   * Returns an array of {@link EditorDebuggerSession} currently available to this debugger plugin.
   * **Note:** Sessions in the array may be inactive, check their state via {@link EditorDebuggerSession.is_active}.
   */
  get_sessions(): Array<unknown>;
}
