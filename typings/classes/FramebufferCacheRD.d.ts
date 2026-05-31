// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Framebuffer cache manager for Rendering Device based renderers. */
declare class FramebufferCacheRD extends GodotObject {
  /**
   * Creates, or obtains a cached, framebuffer. `textures` lists textures accessed. `passes` defines the subpasses and texture allocation, if left empty a single pass is created and textures are allocated depending on their usage flags. `views` defines the number of views used when rendering.
   */
  static get_cache_multipass(textures: Array<RID>, passes: Array<RDFramebufferPass>, views: int): RID;
}
