// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An internal editor class intended for keeping the data of unrecognized resources. */
declare class MissingResource extends Resource {
  /** The name of the class this resource was supposed to be (see {@link Object.get_class}). */
  original_class: string;
  /**
   * If set to `true`, allows new properties to be added on top of the existing ones with {@link Object.set}.
   */
  recording_properties: boolean;
  set_original_class(value: string): void;
  get_original_class(): string;
  set_recording_properties(value: boolean): void;
  is_recording_properties(): boolean;
}
