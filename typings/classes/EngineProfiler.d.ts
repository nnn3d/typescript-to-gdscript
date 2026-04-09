// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for creating custom profilers. */
declare class EngineProfiler extends RefCounted {
  /** Called when data is added to profiler using {@link EngineDebugger.profiler_add_frame_data}. */
  _add_frame(data: Array<unknown>): void;
  /**
   * Called once every engine iteration when the profiler is active with information about the current frame. All time values are in seconds. Lower values represent faster processing times and are therefore considered better.
   */
  _tick(frame_time: float, process_time: float, physics_time: float, physics_frame_time: float): void;
  /** Called when the profiler is enabled/disabled, along with a set of `options`. */
  _toggle(enable: boolean, options: Array<unknown>): void;
}
