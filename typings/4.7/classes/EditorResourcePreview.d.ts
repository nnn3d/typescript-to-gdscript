// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A node used to generate previews of resources or files. */
declare class EditorResourcePreview<Tree extends object = any> extends Node<Tree> {
  /** Create an own, custom preview generator. */
  add_preview_generator(generator: EditorResourcePreviewGenerator): void;
  /** Check if the resource changed, if so, it will be invalidated and the corresponding signal emitted. */
  check_for_invalidation(path: string): void;
  /**
   * Queue the `resource` being edited for preview. Once the preview is ready, the `receiver`'s `receiver_func` will be called. The `receiver_func` must take the following four arguments: {@link String} path, {@link Texture2D} preview, {@link Texture2D} thumbnail_preview, {@link Variant} userdata. `userdata` can be anything, and will be returned when `receiver_func` is called.
   * **Note:** If it was not possible to create the preview the `receiver_func` will still be called, but the preview will be `null`.
   */
  queue_edited_resource_preview(resource: Resource, receiver: GodotObject, receiver_func: string, userdata: unknown): void;
  /**
   * Queue a resource file located at `path` for preview. Once the preview is ready, the `receiver`'s `receiver_func` will be called. The `receiver_func` must take the following four arguments: {@link String} path, {@link Texture2D} preview, {@link Texture2D} thumbnail_preview, {@link Variant} userdata. `userdata` can be anything, and will be returned when `receiver_func` is called.
   * **Note:** If it was not possible to create the preview the `receiver_func` will still be called, but the preview will be `null`.
   */
  queue_resource_preview(path: string, receiver: GodotObject, receiver_func: string, userdata: unknown): void;
  /** Removes a custom preview generator. */
  remove_preview_generator(generator: EditorResourcePreviewGenerator): void;

  /** Emitted if a preview was invalidated (changed). `path` corresponds to the path of the preview. */
  preview_invalidated: Signal<[string]>;
}
