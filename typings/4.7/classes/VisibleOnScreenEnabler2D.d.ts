// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A rectangular region of 2D space that, when visible on screen, enables a target node. */
declare class VisibleOnScreenEnabler2D extends VisibleOnScreenNotifier2D {
  /**
   * Determines how the target node is enabled. Corresponds to {@link Node.ProcessMode}. When the node is disabled, it always uses {@link Node.PROCESS_MODE_DISABLED}.
   */
  enable_mode: int;
  /**
   * The path to the target node, relative to the {@link VisibleOnScreenEnabler2D}. The target node is cached; it's only assigned when setting this property (if the {@link VisibleOnScreenEnabler2D} is inside the scene tree) and every time the {@link VisibleOnScreenEnabler2D} enters the scene tree. If the path is empty, no node will be affected. If the path is invalid, an error is also generated.
   */
  enable_node_path: string;

  // enum EnableMode
  /** Corresponds to {@link Node.PROCESS_MODE_INHERIT}. */
  static readonly ENABLE_MODE_INHERIT: int;
  /** Corresponds to {@link Node.PROCESS_MODE_ALWAYS}. */
  static readonly ENABLE_MODE_ALWAYS: int;
  /** Corresponds to {@link Node.PROCESS_MODE_WHEN_PAUSED}. */
  static readonly ENABLE_MODE_WHEN_PAUSED: int;
}
