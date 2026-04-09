// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A class to interact with the editor debugger. */
declare class EditorDebuggerSession extends RefCounted {
  /**
   * Adds the given `control` to the debug session UI in the debugger bottom panel. The `control`'s node name will be used as the tab title.
   */
  add_session_tab(control: Control): void;
  /** Returns `true` if the debug session is currently attached to a remote instance. */
  is_active(): boolean;
  /** Returns `true` if the attached remote instance is currently in the debug loop. */
  is_breaked(): boolean;
  /** Returns `true` if the attached remote instance can be debugged. */
  is_debuggable(): boolean;
  /** Removes the given `control` from the debug session UI in the debugger bottom panel. */
  remove_session_tab(control: Control): void;
  /**
   * Sends the given `message` to the attached remote instance, optionally passing additionally `data`. See {@link EngineDebugger} for how to retrieve those messages.
   */
  send_message(message: string | NodePath, data?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /**
   * Enables or disables a specific breakpoint based on `enabled`, updating the Editor Breakpoint Panel accordingly.
   */
  set_breakpoint(path: string | NodePath, line: int, enabled: boolean): void;
  /**
   * Toggle the given `profiler` on the attached remote instance, optionally passing additionally `data`. See {@link EngineProfiler} for more details.
   */
  toggle_profiler(profiler: string | NodePath, enable: boolean, data?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;

  /**
   * Emitted when the attached remote instance enters a break state. If `can_debug` is `true`, the remote instance will enter the debug loop.
   */
  breaked: Signal<[boolean]>;
  /** Emitted when the attached remote instance exits a break state. */
  continued: Signal<[]>;
  /** Emitted when a remote instance is attached to this session (i.e. the session becomes active). */
  started: Signal<[]>;
  /** Emitted when a remote instance is detached from this session (i.e. the session becomes inactive). */
  stopped: Signal<[]>;
}
