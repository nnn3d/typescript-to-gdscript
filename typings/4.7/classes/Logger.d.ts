// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Custom logger to receive messages from the internal error/warning stream. */
declare class Logger extends RefCounted {
  /**
   * Called when an error is logged. The error provides the `function`, `file`, and `line` that it originated from, as well as either the `code` that generated the error or a `rationale`.
   * The type of error provided by `error_type` is described in the {@link ErrorType} enumeration.
   * Additionally, `script_backtraces` provides backtraces for each of the script languages. These will only contain stack frames in editor builds and debug builds by default. To enable them for release builds as well, you need to enable {@link ProjectSettings.debug/settings/gdscript/always_track_call_stacks}.
   * **Warning:** This method will be called from threads other than the main thread, possibly at the same time, so you will need to have some kind of thread-safety in your implementation of it, like a {@link Mutex}.
   * **Note:** `script_backtraces` will not contain any captured variables, due to its prohibitively high cost. To get those you will need to capture the backtraces yourself, from within the {@link Logger} virtual methods, using {@link Engine.capture_script_backtraces}.
   * **Note:** Logging errors from this method using functions like {@link @GlobalScope.push_error} or {@link @GlobalScope.push_warning} is not supported, as it could cause infinite recursion. These errors will only show up in the console output.
   */
  _log_error(function_: string, file: string, line: int, code: string, rationale: string, editor_notify: boolean, error_type: int, script_backtraces: Array<ScriptBacktrace>): void;
  /**
   * Called when a message is logged. If `error` is `true`, then this message was meant to be sent to `stderr`.
   * **Warning:** This method will be called from threads other than the main thread, possibly at the same time, so you will need to have some kind of thread-safety in your implementation of it, like a {@link Mutex}.
   * **Note:** Logging another message from this method using functions like {@link @GlobalScope.print} is not supported, as it could cause infinite recursion. These messages will only show up in the console output.
   */
  _log_message(message: string, error: boolean): void;

  // enum ErrorType
  /** The message received is an error. */
  static readonly ERROR_TYPE_ERROR: int;
  /** The message received is a warning. */
  static readonly ERROR_TYPE_WARNING: int;
  /** The message received is a script error. */
  static readonly ERROR_TYPE_SCRIPT: int;
  /** The message received is a shader error. */
  static readonly ERROR_TYPE_SHADER: int;
}
