// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A frame other visual shader nodes can be attached to for better organization. */
declare class VisualShaderNodeFrame extends VisualShaderNodeResizableBase {
  /** The list of nodes attached to the frame. */
  attached_nodes: PackedInt32Array;
  /** If `true`, the frame will automatically resize to enclose all attached nodes. */
  autoshrink: boolean;
  /** The color of the frame when {@link tint_color_enabled} is `true`. */
  tint_color: Color;
  /** If `true`, the frame will be tinted with the color specified in {@link tint_color}. */
  tint_color_enabled: boolean;
  /** The title of the node. */
  title: string;

  /**
   * Adds a node to the list of nodes attached to the frame. Should not be called directly, use the {@link VisualShader.attach_node_to_frame} method instead.
   */
  add_attached_node(node: int): void;
  /**
   * Removes a node from the list of nodes attached to the frame. Should not be called directly, use the {@link VisualShader.detach_node_from_frame} method instead.
   */
  remove_attached_node(node: int): void;
}
