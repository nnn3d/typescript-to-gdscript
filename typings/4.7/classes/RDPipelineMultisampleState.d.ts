// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Pipeline multisample state (used by {@link RenderingDevice}). */
declare class RDPipelineMultisampleState extends RefCounted {
  /**
   * If `true`, alpha to coverage is enabled. This generates a temporary coverage value based on the alpha component of the fragment's first color output. This allows alpha transparency to make use of multisample antialiasing.
   */
  enable_alpha_to_coverage: boolean;
  /**
   * If `true`, alpha is forced to either `0.0` or `1.0`. This allows hardening the edges of antialiased alpha transparencies. Only relevant if {@link enable_alpha_to_coverage} is `true`.
   */
  enable_alpha_to_one: boolean;
  /**
   * If `true`, enables per-sample shading which replaces MSAA by SSAA. This provides higher quality antialiasing that works with transparent (alpha scissor) edges. This has a very high performance cost. See also {@link min_sample_shading}. See the per-sample shading Vulkan documentation (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#primsrast-sampleshading) for more details.
   */
  enable_sample_shading: boolean;
  /**
   * The multiplier of {@link sample_count} that determines how many samples are performed for each fragment. Must be between `0.0` and `1.0` (inclusive). Only effective if {@link enable_sample_shading} is `true`. If {@link min_sample_shading} is `1.0`, fragment invocation must only read from the coverage index sample. Tile image access must not be used if {@link enable_sample_shading} is *not* `1.0`.
   */
  min_sample_shading: float;
  /**
   * The number of MSAA samples (or SSAA samples if {@link enable_sample_shading} is `true`) to perform. Higher values result in better antialiasing, at the cost of performance.
   */
  sample_count: int;
  /**
   * The sample mask array. See the sample mask Vulkan documentation (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#fragops-samplemask) for more details.
   */
  sample_masks: unknown;
  set_enable_alpha_to_coverage(value: boolean): void;
  get_enable_alpha_to_coverage(): boolean;
  set_enable_alpha_to_one(value: boolean): void;
  get_enable_alpha_to_one(): boolean;
  set_enable_sample_shading(value: boolean): void;
  get_enable_sample_shading(): boolean;
  set_min_sample_shading(value: float): void;
  get_min_sample_shading(): float;
  set_sample_count(value: int): void;
  get_sample_count(): int;
  set_sample_masks(value: unknown): void;
  get_sample_masks(): unknown;
}
