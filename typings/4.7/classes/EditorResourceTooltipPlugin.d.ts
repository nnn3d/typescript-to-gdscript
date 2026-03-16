// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A plugin that advanced tooltip for its handled resource type. */
declare class EditorResourceTooltipPlugin extends RefCounted {
  /** Return `true` if the plugin is going to handle the given {@link Resource} `type`. */
  _handles(type_: string): boolean;
  /**
   * Create and return a tooltip that will be displayed when the user hovers a resource under the given `path` in filesystem dock.
   * The `metadata` dictionary is provided by preview generator (see {@link EditorResourcePreviewGenerator._generate}).
   * `base` is the base default tooltip, which is a {@link VBoxContainer} with a file name, type and size labels. If another plugin handled the same file type, `base` will be output from the previous plugin. For best result, make sure the base tooltip is part of the returned {@link Control}.
   * **Note:** It's unadvised to use {@link ResourceLoader.load}, especially with heavy resources like models or textures, because it will make the editor unresponsive when creating the tooltip. You can use {@link request_thumbnail} if you want to display a preview in your tooltip.
   * **Note:** If you decide to discard the `base`, make sure to call {@link Node.queue_free}, because it's not freed automatically.
   */
  _make_tooltip_for_path(path: string, metadata: Dictionary, base: Control): Control;
  /**
   * Requests a thumbnail for the given {@link TextureRect}. The thumbnail is created asynchronously by {@link EditorResourcePreview} and automatically set when available.
   */
  request_thumbnail(path: string, control: TextureRect): void;
}
