// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** An internal editor class intended for keeping the data of unrecognized nodes. */
declare class MissingNode<Tree extends object = any> extends Node<Tree> {
  /** The name of the class this node was supposed to be (see {@link Object.get_class}). */
  original_class: string;
  /** Returns the path of the scene this node was instance of originally. */
  original_scene: string;
  /**
   * If `true`, allows new properties to be set along with existing ones. If `false`, only existing properties' values can be set, and new properties cannot be added.
   */
  recording_properties: boolean;
  /**
   * If `true`, allows new signals to be connected to along with existing ones. If `false`, only existing signals can be connected to, and new signals cannot be added.
   */
  recording_signals: boolean;
  set_original_class(value: string): void;
  get_original_class(): string;
  set_original_scene(value: string): void;
  get_original_scene(): string;
  set_recording_properties(value: boolean): void;
  is_recording_properties(): boolean;
  set_recording_signals(value: boolean): void;
  is_recording_signals(): boolean;
}
