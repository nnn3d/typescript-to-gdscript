// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Exposes the internal debugger. */
declare interface EngineDebugger extends GodotObject {
  /** Clears all breakpoints. */
  clear_breakpoints(): void;
  /**
   * Starts a debug break in script execution, optionally specifying whether the program can continue based on `can_continue` and whether the break was due to a breakpoint.
   */
  debug(can_continue?: boolean, is_error_breakpoint?: boolean): void;
  /** Returns the current debug depth. */
  get_depth(): int;
  /** Returns the number of lines that remain. */
  get_lines_left(): int;
  /** Returns `true` if a capture with the given name is present otherwise `false`. */
  has_capture(name: string): boolean;
  /** Returns `true` if a profiler with the given name is present otherwise `false`. */
  has_profiler(name: string): boolean;
  /** Inserts a new breakpoint with the given `source` and `line`. */
  insert_breakpoint(line: int, source: string): void;
  /** Returns `true` if the debugger is active otherwise `false`. */
  is_active(): boolean;
  /** Returns `true` if the given `source` and `line` represent an existing breakpoint. */
  is_breakpoint(line: int, source: string): boolean;
  /** Returns `true` if a profiler with the given name is present and active otherwise `false`. */
  is_profiling(name: string): boolean;
  /** Returns `true` if the debugger is skipping breakpoints otherwise `false`. */
  is_skipping_breakpoints(): boolean;
  /**
   * Forces a processing loop of debugger events. The purpose of this method is just processing events every now and then when the script might get too busy, so that bugs like infinite loops can be caught.
   */
  line_poll(): void;
  /** Calls the `add` callable of the profiler with given `name` and `data`. */
  profiler_add_frame_data(name: string, data: Array<unknown>): void;
  /**
   * Calls the `toggle` callable of the profiler with given `name` and `arguments`. Enables/Disables the same profiler depending on `enable` argument.
   */
  profiler_enable(name: string, enable: boolean, arguments?: Array<unknown>): void;
  /**
   * Registers a message capture with given `name`. If `name` is "my_message" then messages starting with "my_message:" will be called with the given callable.
   * The callable must accept a message string and a data array as argument. The callable should return `true` if the message is recognized.
   * **Note:** The callable will receive the message with the prefix stripped, unlike {@link EditorDebuggerPlugin._capture}. See the {@link EditorDebuggerPlugin} description for an example.
   */
  register_message_capture(name: string, callable: Callable): void;
  /** Registers a profiler with the given `name`. See {@link EngineProfiler} for more information. */
  register_profiler(name: string, profiler: EngineProfiler): void;
  /** Removes a breakpoint with the given `source` and `line`. */
  remove_breakpoint(line: int, source: string): void;
  /**
   * Starts a debug break in script execution, optionally specifying whether the program can continue based on `can_continue` and whether the break was due to a breakpoint.
   */
  script_debug(language: ScriptLanguage, can_continue?: boolean, is_error_breakpoint?: boolean): void;
  /** Sends a message with given `message` and `data` array. */
  send_message(message: string, data: Array<unknown>): void;
  /** Sets the current debugging depth. */
  set_depth(depth: int): void;
  /** Sets the current debugging lines that remain. */
  set_lines_left(lines: int): void;
  /** Unregisters the message capture with given `name`. */
  unregister_message_capture(name: string): void;
  /** Unregisters a profiler with given `name`. */
  unregister_profiler(name: string): void;
}
declare const EngineDebugger: EngineDebugger;

