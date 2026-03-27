// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstraction for working with modern low-level graphics APIs. */
declare class RenderingDevice extends GodotObject {
  /** Builds the `acceleration_structure`. */
  acceleration_structure_build(acceleration_structure: RID): int;
  /** This method does nothing. */
  barrier(from_: int, to: int): void;
  /**
   * Creates a new Bottom Level Acceleration Structure. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * `position_attribute_location` selects which vertex attribute location supplies the position data (default is 0).
   */
  blas_create(vertex_array: RID, index_array: RID, geometry_bits: int, position_attribute_location?: int): RID;
  /**
   * Clears the contents of the `buffer`, clearing `size_bytes` bytes, starting at `offset`.
   * Prints an error if:
   * - the size isn't a multiple of four
   * - the region specified by `offset` + `size_bytes` exceeds the buffer
   * - a draw list is currently active (created by {@link draw_list_begin})
   * - a compute list is currently active (created by {@link compute_list_begin})
   */
  buffer_clear(buffer: RID, offset: int, size_bytes: int): int;
  /**
   * Copies `size` bytes from the `src_buffer` at `src_offset` into `dst_buffer` at `dst_offset`.
   * Prints an error if:
   * - `size` exceeds the size of either `src_buffer` or `dst_buffer` at their corresponding offsets
   * - a draw list is currently active (created by {@link draw_list_begin})
   * - a compute list is currently active (created by {@link compute_list_begin})
   */
  buffer_copy(src_buffer: RID, dst_buffer: RID, src_offset: int, dst_offset: int, size: int): int;
  /**
   * Returns a copy of the data of the specified `buffer`, optionally `offset_bytes` and `size_bytes` can be set to copy only a portion of the buffer.
   * **Note:** This method will block the GPU from working until the data is retrieved. Refer to {@link buffer_get_data_async} for an alternative that returns the data in more performant way.
   */
  buffer_get_data(buffer: RID, offset_bytes?: int, size_bytes?: int): PackedByteArray;
  /**
   * Asynchronous version of {@link buffer_get_data}. RenderingDevice will call `callback` in a certain amount of frames with the data the buffer had at the time of the request.
   * **Note:** At the moment, the delay corresponds to the amount of frames specified by {@link ProjectSettings.rendering/rendering_device/vsync/frame_queue_size}.
   * **Note:** Downloading large buffers can have a prohibitive cost for real-time even when using the asynchronous method due to hardware bandwidth limitations. When dealing with large resources, you can adjust settings such as {@link ProjectSettings.rendering/rendering_device/staging_buffer/block_size_kb} to improve the transfer speed at the cost of extra memory.
   */
  buffer_get_data_async(buffer: RID, callback: Callable, offset_bytes?: int, size_bytes?: int): int;
  /**
   * Returns the address of the given `buffer` which can be passed to shaders in any way to access underlying data. Buffer must have been created with this feature enabled.
   * **Note:** You must check that the GPU supports this functionality by calling {@link has_feature} with {@link SUPPORTS_BUFFER_DEVICE_ADDRESS} as a parameter.
   */
  buffer_get_device_address(buffer: RID): int;
  /**
   * Updates a region of `size_bytes` bytes, starting at `offset`, in the buffer, with the specified `data`.
   * Prints an error if:
   * - the region specified by `offset` + `size_bytes` exceeds the buffer
   * - a draw list is currently active (created by {@link draw_list_begin})
   * - a compute list is currently active (created by {@link compute_list_begin})
   */
  buffer_update(buffer: RID, offset: int, size_bytes: int, data: PackedByteArray): int;
  /**
   * Creates a timestamp marker with the specified `name`. This is used for performance reporting with the {@link get_captured_timestamp_cpu_time}, {@link get_captured_timestamp_gpu_time} and {@link get_captured_timestamp_name} methods.
   */
  capture_timestamp(name: string): void;
  /** Raises a Vulkan compute barrier in the specified `compute_list`. */
  compute_list_add_barrier(compute_list: int): void;
  /**
   * Starts a list of compute commands created with the `compute_*` methods. The returned value should be passed to other `compute_list_*` functions.
   * Multiple compute lists cannot be created at the same time; you must finish the previous compute list first using {@link compute_list_end}.
   * A simple compute operation might look like this (code is not a complete example):
   */
  compute_list_begin(): int;
  /**
   * Tells the GPU what compute pipeline to use when processing the compute list. If the shader has changed since the last time this function was called, Godot will unbind all descriptor sets and will re-bind them inside {@link compute_list_dispatch}.
   */
  compute_list_bind_compute_pipeline(compute_list: int, compute_pipeline: RID): void;
  /**
   * Binds the `uniform_set` to this `compute_list`. Godot ensures that all textures in the uniform set have the correct Vulkan access masks. If Godot had to change access masks of textures, it will raise a Vulkan image memory barrier.
   */
  compute_list_bind_uniform_set(compute_list: int, uniform_set: RID, set_index: int): void;
  /**
   * Submits the compute list for processing on the GPU. This is the compute equivalent to {@link draw_list_draw}.
   */
  compute_list_dispatch(compute_list: int, x_groups: int, y_groups: int, z_groups: int): void;
  /**
   * Submits the compute list for processing on the GPU with the given group counts stored in the `buffer` at `offset`. Buffer must have been created with {@link STORAGE_BUFFER_USAGE_DISPATCH_INDIRECT} flag.
   */
  compute_list_dispatch_indirect(compute_list: int, buffer: RID, offset: int): void;
  /** Finishes a list of compute commands created with the `compute_*` methods. */
  compute_list_end(): void;
  /**
   * Sets the push constant data to `buffer` for the specified `compute_list`. The shader determines how this binary data is used. The buffer's size in bytes must also be specified in `size_bytes` (this can be obtained by calling the {@link PackedByteArray.size} method on the passed `buffer`).
   */
  compute_list_set_push_constant(compute_list: int, buffer: PackedByteArray, size_bytes: int): void;
  /**
   * Creates a new compute pipeline. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when the `shader` is freed.
   */
  compute_pipeline_create(shader: RID, specialization_constants?: unknown): RID;
  /**
   * Returns `true` if the compute pipeline specified by the `compute_pipeline` RID is valid, `false` otherwise.
   */
  compute_pipeline_is_valid(compute_pipeline: RID): boolean;
  /**
   * Create a new local {@link RenderingDevice}. This is most useful for performing compute operations on the GPU independently from the rest of the engine.
   */
  create_local_device(): RenderingDevice;
  /**
   * Create a command buffer debug label region that can be displayed in third-party tools such as RenderDoc (https://renderdoc.org/). All regions must be ended with a {@link draw_command_end_label} call. When viewed from the linear series of submissions to a single queue, calls to {@link draw_command_begin_label} and {@link draw_command_end_label} must be matched and balanced.
   * The `VK_EXT_DEBUG_UTILS_EXTENSION_NAME` Vulkan extension must be available and enabled for command buffer debug label region to work. See also {@link draw_command_end_label}.
   */
  draw_command_begin_label(name: string, color: Color): void;
  /** Ends the command buffer debug label region started by a {@link draw_command_begin_label} call. */
  draw_command_end_label(): void;
  /** This method does nothing. */
  draw_command_insert_label(name: string, color: Color): void;
  /**
   * Starts a list of raster drawing commands created with the `draw_*` methods. The returned value should be passed to other `draw_list_*` functions.
   * Multiple draw lists cannot be created at the same time; you must finish the previous draw list first using {@link draw_list_end}.
   * A simple drawing operation might look like this (code is not a complete example):
   * The `draw_flags` indicates if the texture attachments of the framebuffer should be cleared or ignored. Only one of the two flags can be used for each individual attachment. Ignoring an attachment means that any contents that existed before the draw list will be completely discarded, reducing the memory bandwidth used by the render pass but producing garbage results if the pixels aren't replaced. The default behavior allows the engine to figure out the right operation to use if the texture is discardable, which can result in increased performance. See {@link RDTextureFormat} or {@link texture_set_discardable}.
   * The `breadcrumb` parameter can be an arbitrary 32-bit integer that is useful to diagnose GPU crashes. If Godot is built in dev or debug mode; when the GPU crashes Godot will dump all shaders that were being executed at the time of the crash and the breadcrumb is useful to diagnose what passes did those shaders belong to.
   * It does not affect rendering behavior and can be set to 0. It is recommended to use {@link BreadcrumbMarker} enumerations for consistency but it's not required. It is also possible to use bitwise operations to add extra data. e.g.
   */
  draw_list_begin(framebuffer: RID, draw_flags: int, clear_color_values?: PackedColorArray, clear_depth_value?: float, clear_stencil_value?: int, region?: Rect2, breadcrumb?: int): int;
  /**
   * High-level variant of {@link draw_list_begin}, with the parameters automatically being adjusted for drawing onto the window specified by the `screen` ID.
   * **Note:** Cannot be used with local RenderingDevices, as these don't have a screen. If called on a local RenderingDevice, {@link draw_list_begin_for_screen} returns {@link INVALID_ID}.
   */
  draw_list_begin_for_screen(screen?: int, clear_color?: Color): int;
  /** This method does nothing and always returns an empty {@link PackedInt64Array}. */
  draw_list_begin_split(framebuffer: RID, splits: int, initial_color_action: int, final_color_action: int, initial_depth_action: int, final_depth_action: int, clear_color_values?: PackedColorArray, clear_depth?: float, clear_stencil?: int, region?: Rect2, storage_textures?: unknown): PackedInt64Array;
  /** Binds `index_array` to the specified `draw_list`. */
  draw_list_bind_index_array(draw_list: int, index_array: RID): void;
  /** Binds `render_pipeline` to the specified `draw_list`. */
  draw_list_bind_render_pipeline(draw_list: int, render_pipeline: RID): void;
  /**
   * Binds `uniform_set` to the specified `draw_list`. A `set_index` must also be specified, which is an identifier starting from `0` that must match the one expected by the draw list.
   */
  draw_list_bind_uniform_set(draw_list: int, uniform_set: RID, set_index: int): void;
  /** Binds `vertex_array` to the specified `draw_list`. */
  draw_list_bind_vertex_array(draw_list: int, vertex_array: RID): void;
  /**
   * Binds a set of `vertex_buffers` directly to the specified `draw_list` using `vertex_format` without creating a vertex array RID. Provide the number of vertices in `vertex_count`; optional per-buffer byte `offsets` may also be supplied.
   */
  draw_list_bind_vertex_buffers_format(draw_list: int, vertex_format: int, vertex_count: int, vertex_buffers: unknown, offsets?: PackedInt64Array): void;
  /**
   * Removes and disables the scissor rectangle for the specified `draw_list`. See also {@link draw_list_enable_scissor}.
   */
  draw_list_disable_scissor(draw_list: int): void;
  /**
   * Submits `draw_list` for rendering on the GPU. This is the raster equivalent to {@link compute_list_dispatch}.
   */
  draw_list_draw(draw_list: int, use_indices: boolean, instances: int, procedural_vertex_count?: int): void;
  /**
   * Submits `draw_list` for rendering on the GPU with the given parameters stored in the `buffer` at `offset`. Parameters being integers: vertex count, instance count, first vertex, first instance. And when using indices: index count, instance count, first index, vertex offset, first instance. Buffer must have been created with {@link STORAGE_BUFFER_USAGE_DISPATCH_INDIRECT} flag.
   */
  draw_list_draw_indirect(draw_list: int, use_indices: boolean, buffer: RID, offset?: int, draw_count?: int, stride?: int): void;
  /**
   * Creates a scissor rectangle and enables it for the specified `draw_list`. Scissor rectangles are used for clipping by discarding fragments that fall outside a specified rectangular portion of the screen. See also {@link draw_list_disable_scissor}.
   * **Note:** The specified `rect` is automatically intersected with the screen's dimensions, which means it cannot exceed the screen's dimensions.
   */
  draw_list_enable_scissor(draw_list: int, rect?: Rect2): void;
  /** Finishes a list of raster drawing commands created with the `draw_*` methods. */
  draw_list_end(): void;
  /**
   * Sets blend constants for the specified `draw_list` to `color`. Blend constants are used only if the graphics pipeline is created with {@link DYNAMIC_STATE_BLEND_CONSTANTS} flag set.
   */
  draw_list_set_blend_constants(draw_list: int, color: Color): void;
  /**
   * Sets the push constant data to `buffer` for the specified `draw_list`. The shader determines how this binary data is used. The buffer's size in bytes must also be specified in `size_bytes` (this can be obtained by calling the {@link PackedByteArray.size} method on the passed `buffer`).
   */
  draw_list_set_push_constant(draw_list: int, buffer: PackedByteArray, size_bytes: int): void;
  /** Switches to the next draw pass. */
  draw_list_switch_to_next_pass(): int;
  /** This method does nothing and always returns an empty {@link PackedInt64Array}. */
  draw_list_switch_to_next_pass_split(splits: int): PackedInt64Array;
  /**
   * Creates a new framebuffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when any of the `textures` is freed.
   */
  framebuffer_create(textures: unknown, validate_with_format?: int, view_count?: int): RID;
  /**
   * Creates a new empty framebuffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  framebuffer_create_empty(size: Vector2i, samples: int, validate_with_format?: int): RID;
  /**
   * Creates a new multipass framebuffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when any of the `textures` is freed.
   */
  framebuffer_create_multipass(textures: unknown, passes: unknown, validate_with_format?: int, view_count?: int): RID;
  /**
   * Creates a new framebuffer format with the specified `attachments` and `view_count`. Returns the new framebuffer's unique framebuffer format ID.
   * If `view_count` is greater than or equal to `2`, enables multiview which is used for VR rendering. This requires support for the Vulkan multiview extension.
   */
  framebuffer_format_create(attachments: unknown, view_count?: int): int;
  /** Creates a new empty framebuffer format with the specified number of `samples` and returns its ID. */
  framebuffer_format_create_empty(samples: int): int;
  /**
   * Creates a multipass framebuffer format with the specified `attachments`, `passes` and `view_count` and returns its ID. If `view_count` is greater than or equal to `2`, enables multiview which is used for VR rendering. This requires support for the Vulkan multiview extension.
   */
  framebuffer_format_create_multipass(attachments: unknown, passes: unknown, view_count?: int): int;
  /**
   * Returns the number of texture samples used for the given framebuffer `format` ID (returned by {@link framebuffer_get_format}).
   */
  framebuffer_format_get_texture_samples(format: int, render_pass?: int): int;
  /**
   * Returns the format ID of the framebuffer specified by the `framebuffer` RID. This ID is guaranteed to be unique for the same formats and does not need to be freed.
   */
  framebuffer_get_format(framebuffer: RID): int;
  /** Returns `true` if the framebuffer specified by the `framebuffer` RID is valid, `false` otherwise. */
  framebuffer_is_valid(framebuffer: RID): boolean;
  /**
   * Tries to free an object in the RenderingDevice. To avoid memory leaks, this should be called after using an object as memory management does not occur automatically when using RenderingDevice directly.
   */
  free_rid(rid: RID): void;
  /** This method does nothing. */
  full_barrier(): void;
  /**
   * Returns the timestamp in CPU time for the rendering step specified by `index` (in microseconds since the engine started). See also {@link get_captured_timestamp_gpu_time} and {@link capture_timestamp}.
   */
  get_captured_timestamp_cpu_time(index: int): int;
  /**
   * Returns the timestamp in GPU time for the rendering step specified by `index` (in microseconds since the engine started). See also {@link get_captured_timestamp_cpu_time} and {@link capture_timestamp}.
   */
  get_captured_timestamp_gpu_time(index: int): int;
  /**
   * Returns the timestamp's name for the rendering step specified by `index`. See also {@link capture_timestamp}.
   */
  get_captured_timestamp_name(index: int): string;
  /** Returns the total number of timestamps (rendering steps) available for profiling. */
  get_captured_timestamps_count(): int;
  /** Returns the index of the last frame rendered that has rendering timestamps available for querying. */
  get_captured_timestamps_frame(): int;
  /**
   * Returns how many allocations the GPU has performed for internal driver structures.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_device_allocation_count(): int;
  /**
   * Same as {@link get_device_allocation_count} but filtered for a given object type.
   * The type argument must be in range `[0; get_tracked_object_type_count - 1]`. If {@link get_tracked_object_type_count} is 0, then type argument is ignored and always returns 0.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_device_allocs_by_object_type(type_: int): int;
  /**
   * Same as {@link get_device_total_memory} but filtered for a given object type.
   * The type argument must be in range `[0; get_tracked_object_type_count - 1]`. If {@link get_tracked_object_type_count} is 0, then type argument is ignored and always returns 0.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_device_memory_by_object_type(type_: int): int;
  /**
   * Returns the name of the video adapter (e.g. "GeForce GTX 1080/PCIe/SSE2"). Equivalent to {@link RenderingServer.get_video_adapter_name}. See also {@link get_device_vendor_name}.
   */
  get_device_name(): string;
  /**
   * Returns the universally unique identifier for the pipeline cache. This is used to cache shader files on disk, which avoids shader recompilations on subsequent engine runs. This UUID varies depending on the graphics card model, but also the driver version. Therefore, updating graphics drivers will invalidate the shader cache.
   */
  get_device_pipeline_cache_uuid(): string;
  /**
   * Returns how much bytes the GPU is using.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_device_total_memory(): int;
  /**
   * Returns the vendor of the video adapter (e.g. "NVIDIA Corporation"). Equivalent to {@link RenderingServer.get_video_adapter_vendor}. See also {@link get_device_name}.
   */
  get_device_vendor_name(): string;
  /**
   * Returns how many allocations the GPU driver has performed for internal driver structures.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_driver_allocation_count(): int;
  /**
   * Same as {@link get_driver_allocation_count} but filtered for a given object type.
   * The type argument must be in range `[0; get_tracked_object_type_count - 1]`. If {@link get_tracked_object_type_count} is 0, then type argument is ignored and always returns 0.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_driver_allocs_by_object_type(type_: int): int;
  /**
   * Returns string report in CSV format using the following methods:
   * - {@link get_tracked_object_name}
   * - {@link get_tracked_object_type_count}
   * - {@link get_driver_total_memory}
   * - {@link get_driver_allocation_count}
   * - {@link get_driver_memory_by_object_type}
   * - {@link get_driver_allocs_by_object_type}
   * - {@link get_device_total_memory}
   * - {@link get_device_allocation_count}
   * - {@link get_device_memory_by_object_type}
   * - {@link get_device_allocs_by_object_type}
   * This is only used by Vulkan in debug builds. Godot must also be started with the `--extra-gpu-memory-tracking` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  get_driver_and_device_memory_report(): string;
  /**
   * Same as {@link get_driver_total_memory} but filtered for a given object type.
   * The type argument must be in range `[0; get_tracked_object_type_count - 1]`. If {@link get_tracked_object_type_count} is 0, then type argument is ignored and always returns 0.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_driver_memory_by_object_type(type_: int): int;
  /**
   * Returns the unique identifier of the driver `resource` for the specified `rid`. Some driver resource types ignore the specified `rid`. `index` is always ignored but must be specified anyway.
   */
  get_driver_resource(resource: int, rid: RID, index: int): int;
  /**
   * Returns how much bytes the GPU driver is using for internal driver structures.
   * This is only used by Vulkan in debug builds and can return 0 when this information is not tracked or unknown.
   */
  get_driver_total_memory(): int;
  /**
   * Returns the frame count kept by the graphics API. Higher values result in higher input lag, but with more consistent throughput. For the main {@link RenderingDevice}, frames are cycled (usually 3 with triple-buffered V-Sync enabled). However, local {@link RenderingDevice}s only have 1 frame.
   */
  get_frame_delay(): int;
  /**
   * Returns the memory usage in bytes corresponding to the given `type`. When using Vulkan, these statistics are calculated by Vulkan Memory Allocator (https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator).
   */
  get_memory_usage(type_: int): int;
  /** Returns a string with a performance report from the past frame. Updates every frame. */
  get_perf_report(): string;
  /**
   * Returns the name of the type of object for the given `type_index`. This value must be in range `[0; get_tracked_object_type_count - 1]`. If {@link get_tracked_object_type_count} is 0, then type argument is ignored and always returns the same string.
   * The return value is important because it gives meaning to the types passed to {@link get_driver_memory_by_object_type}, {@link get_driver_allocs_by_object_type}, {@link get_device_memory_by_object_type}, and {@link get_device_allocs_by_object_type}. Examples of strings it can return (not exhaustive):
   * - DEVICE_MEMORY
   * - PIPELINE_CACHE
   * - SWAPCHAIN_KHR
   * - COMMAND_POOL
   * Thus if e.g. `get_tracked_object_name(5)` returns "COMMAND_POOL", then `get_device_memory_by_object_type(5)` returns the bytes used by the GPU for command pools.
   * This is only used by Vulkan in debug builds. Godot must also be started with the `--extra-gpu-memory-tracking` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  get_tracked_object_name(type_index: int): string;
  /**
   * Returns how many types of trackable objects there are.
   * This is only used by Vulkan in debug builds. Godot must also be started with the `--extra-gpu-memory-tracking` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  get_tracked_object_type_count(): int;
  /** Returns `true` if the `feature` is supported by the GPU. */
  has_feature(feature: int): boolean;
  /**
   * Creates a new index array. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when the `index_buffer` is freed.
   */
  index_array_create(index_buffer: RID, index_offset: int, index_count: int): RID;
  /**
   * Creates a new index buffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  index_buffer_create(size_indices: int, format: int, data?: PackedByteArray, use_restart_indices?: boolean, creation_bits?: int): RID;
  /**
   * Returns the value of the specified `limit`. This limit varies depending on the current graphics hardware (and sometimes the driver version). If the given limit is exceeded, rendering errors will occur.
   * Limits for various graphics hardware can be found in the Vulkan Hardware Database (https://vulkan.gpuinfo.org/).
   */
  limit_get(limit: int): int;
  /**
   * Starts a list of raytracing commands. The returned value should be passed to other `raytracing_list_*` functions.
   * Multiple raytracing lists cannot be created at the same time; you must finish the previous raytracing list first using {@link raytracing_list_end}.
   * A simple raytracing operation might look like this (code is not a complete example):
   */
  raytracing_list_begin(): int;
  /** Binds `raytracing_pipeline` to the specified `raytracing_list`. */
  raytracing_list_bind_raytracing_pipeline(raytracing_list: int, raytracing_pipeline: RID): void;
  /** Binds the `uniform_set` to this `raytracing_list`. */
  raytracing_list_bind_uniform_set(raytracing_list: int, uniform_set: RID, set_index: int): void;
  /** Finishes a list of raytracing commands created with the `raytracing_*` methods. */
  raytracing_list_end(): void;
  /**
   * Sets the push constant data to `buffer` for the specified `raytracing_list`. The shader determines how this binary data is used. The buffer's size in bytes must also be specified in `size_bytes` (this can be obtained by calling the {@link PackedByteArray.size} method on the passed `buffer`).
   */
  raytracing_list_set_push_constant(raytracing_list: int, buffer: PackedByteArray, size_bytes: int): void;
  /**
   * Initializes a ray tracing dispatch for the specified `raytracing_list` assembling a group of `width` x `height` rays.
   */
  raytracing_list_trace_rays(raytracing_list: int, width: int, height: int): void;
  /**
   * Creates a new raytracing pipeline. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * **Note:**: Recursive raytracing is not permitted.
   */
  raytracing_pipeline_create(shader: RID, specialization_constants?: unknown): RID;
  /**
   * Returns `true` if the raytracing pipeline specified by the `raytracing_pipeline` RID is valid, `false` otherwise.
   */
  raytracing_pipeline_is_valid(raytracing_pipeline: RID): boolean;
  /**
   * Creates a new render pipeline. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when the `shader` is freed.
   */
  render_pipeline_create(shader: RID, framebuffer_format: int, vertex_format: int, primitive: int, rasterization_state: RDPipelineRasterizationState, multisample_state: RDPipelineMultisampleState, stencil_state: RDPipelineDepthStencilState, color_blend_state: RDPipelineColorBlendState, dynamic_state_flags: int, for_render_pass?: int, specialization_constants?: unknown): RID;
  /**
   * Returns `true` if the render pipeline specified by the `render_pipeline` RID is valid, `false` otherwise.
   */
  render_pipeline_is_valid(render_pipeline: RID): boolean;
  /**
   * Creates a new sampler. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  sampler_create(state: RDSamplerState): RID;
  /**
   * Returns `true` if implementation supports using a texture of `format` with the given `sampler_filter`.
   */
  sampler_is_format_supported_for_filter(format: int, sampler_filter: int): boolean;
  /**
   * Returns the framebuffer format of the given screen.
   * **Note:** Only the main {@link RenderingDevice} returned by {@link RenderingServer.get_rendering_device} has a format. If called on a local {@link RenderingDevice}, this method prints an error and returns {@link INVALID_ID}.
   */
  screen_get_framebuffer_format(screen?: int): int;
  /**
   * Returns the window height matching the graphics API context for the given window ID (in pixels). Despite the parameter being named `screen`, this returns the *window* size. See also {@link screen_get_width}.
   * **Note:** Only the main {@link RenderingDevice} returned by {@link RenderingServer.get_rendering_device} has a height. If called on a local {@link RenderingDevice}, this method prints an error and returns {@link INVALID_ID}.
   */
  screen_get_height(screen?: int): int;
  /**
   * Returns the window width matching the graphics API context for the given window ID (in pixels). Despite the parameter being named `screen`, this returns the *window* size. See also {@link screen_get_height}.
   * **Note:** Only the main {@link RenderingDevice} returned by {@link RenderingServer.get_rendering_device} has a width. If called on a local {@link RenderingDevice}, this method prints an error and returns {@link INVALID_ID}.
   */
  screen_get_width(screen?: int): int;
  /**
   * Sets the resource name for `id` to `name`. This is used for debugging with third-party tools such as RenderDoc (https://renderdoc.org/).
   * The following types of resources can be named: texture, sampler, vertex buffer, index buffer, uniform buffer, texture buffer, storage buffer, uniform set buffer, shader, render pipeline and compute pipeline. Framebuffers cannot be named. Attempting to name an incompatible resource type will print an error.
   * **Note:** Resource names are only set when the engine runs in verbose mode ({@link OS.is_stdout_verbose} = `true`), or when using an engine build compiled with the `dev_mode=yes` SCons option. The graphics driver must also support the `VK_EXT_DEBUG_UTILS_EXTENSION_NAME` Vulkan extension for named resources to work.
   */
  set_resource_name(id: RID, name: string): void;
  /**
   * Compiles a binary shader from `spirv_data` and returns the compiled binary data as a {@link PackedByteArray}. This compiled shader is specific to the GPU model and driver version used; it will not work on different GPU models or even different driver versions. See also {@link shader_compile_spirv_from_source}.
   * `name` is an optional human-readable name that can be given to the compiled shader for organizational purposes.
   */
  shader_compile_binary_from_spirv(spirv_data: RDShaderSPIRV, name?: string): PackedByteArray;
  /**
   * Compiles a SPIR-V from the shader source code in `shader_source` and returns the SPIR-V as an {@link RDShaderSPIRV}. This intermediate language shader is portable across different GPU models and driver versions, but cannot be run directly by GPUs until compiled into a binary shader using {@link shader_compile_binary_from_spirv}.
   * If `allow_cache` is `true`, make use of the shader cache generated by Godot. This avoids a potentially lengthy shader compilation step if the shader is already in cache. If `allow_cache` is `false`, Godot's shader cache is ignored and the shader will always be recompiled.
   */
  shader_compile_spirv_from_source(shader_source: RDShaderSource, allow_cache?: boolean): RDShaderSPIRV;
  /**
   * Creates a new shader instance from a binary compiled shader. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method. See also {@link shader_compile_binary_from_spirv} and {@link shader_create_from_spirv}.
   */
  shader_create_from_bytecode(binary_data: PackedByteArray, placeholder_rid?: RID): RID;
  /**
   * Creates a new shader instance from SPIR-V intermediate code. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method. See also {@link shader_compile_spirv_from_source} and {@link shader_create_from_bytecode}.
   */
  shader_create_from_spirv(spirv_data: RDShaderSPIRV, name?: string): RID;
  /**
   * Create a placeholder RID by allocating an RID without initializing it for use in {@link shader_create_from_bytecode}. This allows you to create an RID for a shader and pass it around, but defer compiling the shader to a later time.
   */
  shader_create_placeholder(): RID;
  /**
   * Returns the internal vertex input mask. Internally, the vertex input mask is an unsigned integer consisting of the locations (specified in GLSL via. `layout(location = ...)`) of the input variables (specified in GLSL by the `in` keyword).
   */
  shader_get_vertex_input_attribute_mask(shader: RID): int;
  /**
   * Creates a storage buffer (https://vkguide.dev/docs/chapter-4/storage_buffers/) with the specified `data` and `usage`. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  storage_buffer_create(size_bytes: int, data?: PackedByteArray, usage?: int, creation_bits?: int): RID;
  /**
   * Pushes the frame setup and draw command buffers then marks the local device as currently processing (which allows calling {@link sync}).
   * **Note:** Only available in local RenderingDevices.
   */
  submit(): void;
  /**
   * Forces a synchronization between the CPU and GPU, which may be required in certain cases. Only call this when needed, as CPU-GPU synchronization has a performance cost.
   * **Note:** Only available in local RenderingDevices.
   * **Note:** {@link sync} can only be called after a {@link submit}.
   */
  sync(): void;
  /**
   * Creates a new texture buffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  texture_buffer_create(size_bytes: int, format: int, data?: PackedByteArray): RID;
  /**
   * Clears the specified `texture` by replacing all of its pixels with the specified `color`. `base_mipmap` and `mipmap_count` determine which mipmaps of the texture are affected by this clear operation, while `base_layer` and `layer_count` determine which layers of a 3D texture (or texture array) are affected by this clear operation. For 2D textures (which only have one layer by design), `base_layer` must be `0` and `layer_count` must be `1`.
   * **Note:** `texture` can't be cleared while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to clear this texture.
   */
  texture_clear(texture: RID, color: Color, base_mipmap: int, mipmap_count: int, base_layer: int, layer_count: int): int;
  /**
   * Copies the `from_texture` to `to_texture` with the specified `from_pos`, `to_pos` and `size` coordinates. The Z axis of the `from_pos`, `to_pos` and `size` must be `0` for 2-dimensional textures. Source and destination mipmaps/layers must also be specified, with these parameters being `0` for textures without mipmaps or single-layer textures. Returns {@link @GlobalScope.OK} if the texture copy was successful or {@link @GlobalScope.ERR_INVALID_PARAMETER} otherwise.
   * **Note:** `from_texture` texture can't be copied while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to copy this texture.
   * **Note:** `from_texture` texture requires the {@link TEXTURE_USAGE_CAN_COPY_FROM_BIT} to be retrieved.
   * **Note:** `to_texture` can't be copied while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to copy this texture.
   * **Note:** `to_texture` requires the {@link TEXTURE_USAGE_CAN_COPY_TO_BIT} to be retrieved.
   * **Note:** `from_texture` and `to_texture` must be of the same type (color or depth).
   */
  texture_copy(from_texture: RID, to_texture: RID, from_pos: Vector3, to_pos: Vector3, size: Vector3, src_mipmap: int, dst_mipmap: int, src_layer: int, dst_layer: int): int;
  /**
   * Creates a new texture. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * **Note:** `data` takes an {@link Array} of {@link PackedByteArray}s. For {@link TEXTURE_TYPE_1D}, {@link TEXTURE_TYPE_2D}, and {@link TEXTURE_TYPE_3D} types, this array should only have one element, a {@link PackedByteArray} containing all the data for the texture. For `_ARRAY` and `_CUBE` types, the length should be the same as the number of {@link RDTextureFormat.array_layers} in `format`.
   * **Note:** Not to be confused with {@link RenderingServer.texture_2d_create}, which creates the Godot-specific {@link Texture2D} resource as opposed to the graphics API's own texture type.
   */
  texture_create(format: RDTextureFormat, view: RDTextureView, data?: unknown): RID;
  /**
   * Returns an RID for an existing `image` (`VkImage`) with the given `type`, `format`, `samples`, `usage_flags`, `width`, `height`, `depth`, `layers`, and `mipmaps`. This can be used to allow Godot to render onto foreign images.
   */
  texture_create_from_extension(type_: int, format: int, samples: int, usage_flags: int, image: int, width: int, height: int, depth: int, layers: int, mipmaps?: int): RID;
  /**
   * Creates a shared texture using the specified `view` and the texture information from `with_texture`.
   * This will be freed automatically when the `with_texture` is freed.
   */
  texture_create_shared(view: RDTextureView, with_texture: RID): RID;
  /**
   * Creates a shared texture using the specified `view` and the texture information from `with_texture`'s `layer` and `mipmap`. The number of included mipmaps from the original texture can be controlled using the `mipmaps` parameter. Only relevant for textures with multiple layers, such as 3D textures, texture arrays and cubemaps. For single-layer textures, use {@link texture_create_shared}.
   * For 2D textures (which only have one layer), `layer` must be `0`.
   * **Note:** Layer slicing is only supported for 2D texture arrays, not 3D textures or cubemaps.
   * This will be freed automatically when the `with_texture` is freed.
   */
  texture_create_shared_from_slice(view: RDTextureView, with_texture: RID, layer: int, mipmap: int, mipmaps?: int, slice_type?: int): RID;
  /**
   * Returns the `texture` data for the specified `layer` as raw binary data. For 2D textures (which only have one layer), `layer` must be `0`.
   * **Note:** `texture` can't be retrieved while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to retrieve this texture. Otherwise, an error is printed and an empty {@link PackedByteArray} is returned.
   * **Note:** `texture` requires the {@link TEXTURE_USAGE_CAN_COPY_FROM_BIT} to be retrieved. Otherwise, an error is printed and an empty {@link PackedByteArray} is returned.
   * **Note:** This method will block the GPU from working until the data is retrieved. Refer to {@link texture_get_data_async} for an alternative that returns the data in more performant way.
   */
  texture_get_data(texture: RID, layer: int): PackedByteArray;
  /**
   * Asynchronous version of {@link texture_get_data}. RenderingDevice will call `callback` in a certain amount of frames with the data the texture had at the time of the request.
   * **Note:** At the moment, the delay corresponds to the amount of frames specified by {@link ProjectSettings.rendering/rendering_device/vsync/frame_queue_size}.
   * **Note:** Downloading large textures can have a prohibitive cost for real-time even when using the asynchronous method due to hardware bandwidth limitations. When dealing with large resources, you can adjust settings such as {@link ProjectSettings.rendering/rendering_device/staging_buffer/texture_download_region_size_px} and {@link ProjectSettings.rendering/rendering_device/staging_buffer/block_size_kb} to improve the transfer speed at the cost of extra memory.
   */
  texture_get_data_async(texture: RID, layer: int, callback: Callable): int;
  /** Returns the data format used to create this texture. */
  texture_get_format(texture: RID): RDTextureFormat;
  /**
   * Returns the internal graphics handle for this texture object. For use when communicating with third-party APIs mostly with GDExtension.
   * **Note:** This function returns a `uint64_t` which internally maps to a `GLuint` (OpenGL) or `VkImage` (Vulkan).
   */
  texture_get_native_handle(texture: RID): int;
  /**
   * Returns `true` if the `texture` is discardable, `false` otherwise. See {@link RDTextureFormat} or {@link texture_set_discardable}.
   */
  texture_is_discardable(texture: RID): boolean;
  /**
   * Returns `true` if the specified `format` is supported for the given `usage_flags`, `false` otherwise.
   */
  texture_is_format_supported_for_usage(format: int, usage_flags: int): boolean;
  /** Returns `true` if the `texture` is shared, `false` otherwise. See {@link RDTextureView}. */
  texture_is_shared(texture: RID): boolean;
  /** Returns `true` if the `texture` is valid, `false` otherwise. */
  texture_is_valid(texture: RID): boolean;
  /**
   * Resolves the `from_texture` texture onto `to_texture` with multisample antialiasing enabled. This must be used when rendering a framebuffer for MSAA to work. Returns {@link @GlobalScope.OK} if successful, {@link @GlobalScope.ERR_INVALID_PARAMETER} otherwise.
   * **Note:** `from_texture` and `to_texture` textures must have the same dimension, format and type (color or depth).
   * **Note:** `from_texture` can't be copied while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to resolve this texture.
   * **Note:** `from_texture` requires the {@link TEXTURE_USAGE_CAN_COPY_FROM_BIT} to be retrieved.
   * **Note:** `from_texture` must be multisampled and must also be 2D (or a slice of a 3D/cubemap texture).
   * **Note:** `to_texture` can't be copied while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to resolve this texture.
   * **Note:** `to_texture` texture requires the {@link TEXTURE_USAGE_CAN_COPY_TO_BIT} to be retrieved.
   * **Note:** `to_texture` texture must **not** be multisampled and must also be 2D (or a slice of a 3D/cubemap texture).
   */
  texture_resolve_multisample(from_texture: RID, to_texture: RID): int;
  /**
   * Updates the discardable property of `texture`.
   * If a texture is discardable, its contents do not need to be preserved between frames. This flag is only relevant when the texture is used as target in a draw list.
   * This information is used by {@link RenderingDevice} to figure out if a texture's contents can be discarded, eliminating unnecessary writes to memory and boosting performance.
   */
  texture_set_discardable(texture: RID, discardable: boolean): void;
  /**
   * Updates texture data with new data, replacing the previous data in place. The updated texture data must have the same dimensions and format. For 2D textures (which only have one layer), `layer` must be `0`. Returns {@link @GlobalScope.OK} if the update was successful, {@link @GlobalScope.ERR_INVALID_PARAMETER} otherwise.
   * **Note:** Updating textures is forbidden during creation of a draw or compute list.
   * **Note:** The existing `texture` can't be updated while a draw list that uses it as part of a framebuffer is being created. Ensure the draw list is finalized (and that the color/depth texture using it is not set to {@link FINAL_ACTION_CONTINUE}) to update this texture.
   * **Note:** The existing `texture` requires the {@link TEXTURE_USAGE_CAN_UPDATE_BIT} to be updatable.
   */
  texture_update(texture: RID, layer: int, data: PackedByteArray): int;
  /**
   * Creates a new Top Level Acceleration Structure. It can be accessed with the RID that is returned.
   * The instances buffer passed as input is expected to be filled before building the TLAS.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  tlas_create(instances_buffer: RID): RID;
  /**
   * Creates a new instances buffer which can be used to create a TLAS. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  tlas_instances_buffer_create(instance_count: int, creation_bits: int): RID;
  /**
   * Fills the content of an instances buffer. The number of BLASes and transforms passed as input should be the same and should equal the instance count used at instance buffer creation time.
   */
  tlas_instances_buffer_fill(instances_buffer: RID, blases: unknown, transforms: unknown): void;
  /**
   * Creates a new uniform buffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  uniform_buffer_create(size_bytes: int, data?: PackedByteArray, creation_bits?: int): RID;
  /**
   * Creates a new uniform set. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when the `shader` or any of the RIDs in the `uniforms` is freed.
   */
  uniform_set_create(uniforms: unknown, shader: RID, shader_set: int): RID;
  /** Checks if the `uniform_set` is valid, i.e. is owned. */
  uniform_set_is_valid(uniform_set: RID): boolean;
  /**
   * Creates a vertex array based on the specified buffers. Optionally, `offsets` (in bytes) may be defined for each buffer.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   * This will be freed automatically when any of the `src_buffers` is freed.
   */
  vertex_array_create(vertex_count: int, vertex_format: int, src_buffers: unknown, offsets?: PackedInt64Array): RID;
  /**
   * Creates a new vertex buffer. It can be accessed with the RID that is returned.
   * Once finished with your RID, you will want to free the RID using the RenderingDevice's {@link free_rid} method.
   */
  vertex_buffer_create(size_bytes: int, data?: PackedByteArray, creation_bits?: int): RID;
  /**
   * Creates a new vertex format with the specified `vertex_descriptions`. Returns a unique vertex format ID corresponding to the newly created vertex format.
   */
  vertex_format_create(vertex_descriptions: unknown): int;

  // enum DeviceType
  /** Rendering device type does not match any of the other enum values or is unknown. */
  static readonly DEVICE_TYPE_OTHER: int;
  /**
   * Rendering device is an integrated GPU, which is typically *(but not always)* slower than dedicated GPUs ({@link DEVICE_TYPE_DISCRETE_GPU}). On Android and iOS, the rendering device type is always considered to be {@link DEVICE_TYPE_INTEGRATED_GPU}.
   */
  static readonly DEVICE_TYPE_INTEGRATED_GPU: int;
  /**
   * Rendering device is a dedicated GPU, which is typically *(but not always)* faster than integrated GPUs ({@link DEVICE_TYPE_INTEGRATED_GPU}).
   */
  static readonly DEVICE_TYPE_DISCRETE_GPU: int;
  /**
   * Rendering device is an emulated GPU in a virtual environment. This is typically much slower than the host GPU, which means the expected performance level on a dedicated GPU will be roughly equivalent to {@link DEVICE_TYPE_INTEGRATED_GPU}. Virtual machine GPU passthrough (such as VFIO) will not report the device type as {@link DEVICE_TYPE_VIRTUAL_GPU}. Instead, the host GPU's device type will be reported as if the GPU was not emulated.
   */
  static readonly DEVICE_TYPE_VIRTUAL_GPU: int;
  /**
   * Rendering device is provided by software emulation (such as Lavapipe or SwiftShader (https://github.com/google/swiftshader)). This is the slowest kind of rendering device available; it's typically much slower than {@link DEVICE_TYPE_INTEGRATED_GPU}.
   */
  static readonly DEVICE_TYPE_CPU: int;
  /** Represents the size of the {@link DeviceType} enum. */
  static readonly DEVICE_TYPE_MAX: int;
  // enum DriverResource
  /**
   * Specific device object based on a physical device (`rid` parameter is ignored).
   * - Vulkan: Vulkan device driver resource (`VkDevice`).
   * - D3D12: D3D12 device driver resource (`ID3D12Device`).
   * - Metal: Metal device driver resource (`MTLDevice`).
   */
  static readonly DRIVER_RESOURCE_LOGICAL_DEVICE: int;
  /**
   * Physical device the specific logical device is based on (`rid` parameter is ignored).
   * - Vulkan: `VkPhysicalDevice`.
   * - D3D12: `IDXGIAdapter`.
   */
  static readonly DRIVER_RESOURCE_PHYSICAL_DEVICE: int;
  /**
   * Top-most graphics API entry object (`rid` parameter is ignored).
   * - Vulkan: `VkInstance`.
   */
  static readonly DRIVER_RESOURCE_TOPMOST_OBJECT: int;
  /**
   * The main graphics-compute command queue (`rid` parameter is ignored).
   * - Vulkan: `VkQueue`.
   * - D3D12: `ID3D12CommandQueue`.
   * - Metal: `MTLCommandQueue`.
   */
  static readonly DRIVER_RESOURCE_COMMAND_QUEUE: int;
  /**
   * The specific family the main queue belongs to (`rid` parameter is ignored).
   * - Vulkan: The queue family index, a `uint32_t`.
   */
  static readonly DRIVER_RESOURCE_QUEUE_FAMILY: int;
  /**
   * - Vulkan: `VkImage`.
   * - D3D12: `ID3D12Resource`.
   */
  static readonly DRIVER_RESOURCE_TEXTURE: int;
  /**
   * The view of an owned or shared texture.
   * - Vulkan: `VkImageView`.
   * - D3D12: `ID3D12Resource`.
   */
  static readonly DRIVER_RESOURCE_TEXTURE_VIEW: int;
  /**
   * The native id of the data format of the texture.
   * - Vulkan: `VkFormat`.
   * - D3D12: `DXGI_FORMAT`.
   */
  static readonly DRIVER_RESOURCE_TEXTURE_DATA_FORMAT: int;
  /** - Vulkan: `VkSampler`. */
  static readonly DRIVER_RESOURCE_SAMPLER: int;
  /** - Vulkan: `VkDescriptorSet`. */
  static readonly DRIVER_RESOURCE_UNIFORM_SET: int;
  /**
   * Buffer of any kind of (storage, vertex, etc.).
   * - Vulkan: `VkBuffer`.
   * - D3D12: `ID3D12Resource`.
   */
  static readonly DRIVER_RESOURCE_BUFFER: int;
  /**
   * - Vulkan: `VkPipeline`.
   * - Metal: `MTLComputePipelineState`.
   */
  static readonly DRIVER_RESOURCE_COMPUTE_PIPELINE: int;
  /**
   * - Vulkan: `VkPipeline`.
   * - Metal: `MTLRenderPipelineState`.
   */
  static readonly DRIVER_RESOURCE_RENDER_PIPELINE: int;
  static readonly DRIVER_RESOURCE_VULKAN_DEVICE: int;
  static readonly DRIVER_RESOURCE_VULKAN_PHYSICAL_DEVICE: int;
  static readonly DRIVER_RESOURCE_VULKAN_INSTANCE: int;
  static readonly DRIVER_RESOURCE_VULKAN_QUEUE: int;
  static readonly DRIVER_RESOURCE_VULKAN_QUEUE_FAMILY_INDEX: int;
  static readonly DRIVER_RESOURCE_VULKAN_IMAGE: int;
  static readonly DRIVER_RESOURCE_VULKAN_IMAGE_VIEW: int;
  static readonly DRIVER_RESOURCE_VULKAN_IMAGE_NATIVE_TEXTURE_FORMAT: int;
  static readonly DRIVER_RESOURCE_VULKAN_SAMPLER: int;
  static readonly DRIVER_RESOURCE_VULKAN_DESCRIPTOR_SET: int;
  static readonly DRIVER_RESOURCE_VULKAN_BUFFER: int;
  static readonly DRIVER_RESOURCE_VULKAN_COMPUTE_PIPELINE: int;
  static readonly DRIVER_RESOURCE_VULKAN_RENDER_PIPELINE: int;
  // enum DataFormat
  /**
   * 4-bit-per-channel red/green channel data format, packed into 8 bits. Values are in the `[0.0, 1.0]` range.
   * **Note:** More information on all data formats can be found on the Identification of formats (https://registry.khronos.org/vulkan/specs/1.1/html/vkspec.html#_identification_of_formats) section of the Vulkan specification, as well as the VkFormat (https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkFormat.html) enum.
   */
  static readonly DATA_FORMAT_R4G4_UNORM_PACK8: int;
  /**
   * 4-bit-per-channel red/green/blue/alpha channel data format, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R4G4B4A4_UNORM_PACK16: int;
  /**
   * 4-bit-per-channel blue/green/red/alpha channel data format, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B4G4R4A4_UNORM_PACK16: int;
  /**
   * Red/green/blue channel data format with 5 bits of red, 6 bits of green and 5 bits of blue, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R5G6B5_UNORM_PACK16: int;
  /**
   * Blue/green/red channel data format with 5 bits of blue, 6 bits of green and 5 bits of red, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B5G6R5_UNORM_PACK16: int;
  /**
   * Red/green/blue/alpha channel data format with 5 bits of red, 6 bits of green, 5 bits of blue and 1 bit of alpha, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R5G5B5A1_UNORM_PACK16: int;
  /**
   * Blue/green/red/alpha channel data format with 5 bits of blue, 6 bits of green, 5 bits of red and 1 bit of alpha, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B5G5R5A1_UNORM_PACK16: int;
  /**
   * Alpha/red/green/blue channel data format with 1 bit of alpha, 5 bits of red, 6 bits of green and 5 bits of blue, packed into 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A1R5G5B5_UNORM_PACK16: int;
  /**
   * 8-bit-per-channel unsigned floating-point red channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point red channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point red channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_R8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point red channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_R8_SSCALED: int;
  /** 8-bit-per-channel unsigned integer red channel data format. Values are in the `[0, 255]` range. */
  static readonly DATA_FORMAT_R8_UINT: int;
  /** 8-bit-per-channel signed integer red channel data format. Values are in the `[-127, 127]` range. */
  static readonly DATA_FORMAT_R8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point red channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point red/green channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_R8G8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point red/green channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_R8G8_SSCALED: int;
  /**
   * 8-bit-per-channel unsigned integer red/green channel data format. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_R8G8_UINT: int;
  /**
   * 8-bit-per-channel signed integer red/green channel data format. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_R8G8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point red/green/blue channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point red/green/blue channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_SSCALED: int;
  /**
   * 8-bit-per-channel unsigned integer red/green/blue channel data format. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_UINT: int;
  /**
   * 8-bit-per-channel signed integer red/green/blue channel data format. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point blue/green/red channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point blue/green/red channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_SSCALED: int;
  /**
   * 8-bit-per-channel unsigned integer blue/green/red channel data format. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_UINT: int;
  /**
   * 8-bit-per-channel signed integer blue/green/red channel data format. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point red/green/blue/alpha channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point red/green/blue/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_SSCALED: int;
  /**
   * 8-bit-per-channel unsigned integer red/green/blue/alpha channel data format. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_UINT: int;
  /**
   * 8-bit-per-channel signed integer red/green/blue/alpha channel data format. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R8G8B8A8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_UNORM: int;
  /**
   * 8-bit-per-channel signed floating-point blue/green/red/alpha channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_SNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_USCALED: int;
  /**
   * 8-bit-per-channel signed floating-point blue/green/red/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_SSCALED: int;
  /**
   * 8-bit-per-channel unsigned integer blue/green/red/alpha channel data format. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_UINT: int;
  /**
   * 8-bit-per-channel signed integer blue/green/red/alpha channel data format. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_SINT: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_B8G8R8A8_SRGB: int;
  /**
   * 8-bit-per-channel unsigned floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_UNORM_PACK32: int;
  /**
   * 8-bit-per-channel signed floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_SNORM_PACK32: int;
  /**
   * 8-bit-per-channel unsigned floating-point alpha/red/green/blue channel data format with scaled value (value is converted from integer to float), packed in 32 bits. Values are in the `[0.0, 255.0]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_USCALED_PACK32: int;
  /**
   * 8-bit-per-channel signed floating-point alpha/red/green/blue channel data format with scaled value (value is converted from integer to float), packed in 32 bits. Values are in the `[-127.0, 127.0]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_SSCALED_PACK32: int;
  /**
   * 8-bit-per-channel unsigned integer alpha/red/green/blue channel data format, packed in 32 bits. Values are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_UINT_PACK32: int;
  /**
   * 8-bit-per-channel signed integer alpha/red/green/blue channel data format, packed in 32 bits. Values are in the `[-127, 127]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_SINT_PACK32: int;
  /**
   * 8-bit-per-channel unsigned floating-point alpha/red/green/blue channel data format with normalized value and nonlinear sRGB encoding, packed in 32 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A8B8G8R8_SRGB_PACK32: int;
  /**
   * Unsigned floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A2R10G10B10_UNORM_PACK32: int;
  /**
   * Signed floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A2R10G10B10_SNORM_PACK32: int;
  /**
   * Unsigned floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[0.0, 1023.0]` range for red/green/blue and `[0.0, 3.0]` for alpha.
   */
  static readonly DATA_FORMAT_A2R10G10B10_USCALED_PACK32: int;
  /**
   * Signed floating-point alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[-511.0, 511.0]` range for red/green/blue and `[-1.0, 1.0]` for alpha.
   */
  static readonly DATA_FORMAT_A2R10G10B10_SSCALED_PACK32: int;
  /**
   * Unsigned integer alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[0, 1023]` range for red/green/blue and `[0, 3]` for alpha.
   */
  static readonly DATA_FORMAT_A2R10G10B10_UINT_PACK32: int;
  /**
   * Signed integer alpha/red/green/blue channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of red, 10 bits of green and 10 bits of blue. Values are in the `[-511, 511]` range for red/green/blue and `[-1, 1]` for alpha.
   */
  static readonly DATA_FORMAT_A2R10G10B10_SINT_PACK32: int;
  /**
   * Unsigned floating-point alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A2B10G10R10_UNORM_PACK32: int;
  /**
   * Signed floating-point alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_A2B10G10R10_SNORM_PACK32: int;
  /**
   * Unsigned floating-point alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[0.0, 1023.0]` range for blue/green/red and `[0.0, 3.0]` for alpha.
   */
  static readonly DATA_FORMAT_A2B10G10R10_USCALED_PACK32: int;
  /**
   * Signed floating-point alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[-511.0, 511.0]` range for blue/green/red and `[-1.0, 1.0]` for alpha.
   */
  static readonly DATA_FORMAT_A2B10G10R10_SSCALED_PACK32: int;
  /**
   * Unsigned integer alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[0, 1023]` range for blue/green/red and `[0, 3]` for alpha.
   */
  static readonly DATA_FORMAT_A2B10G10R10_UINT_PACK32: int;
  /**
   * Signed integer alpha/blue/green/red channel data format with normalized value, packed in 32 bits. Format contains 2 bits of alpha, 10 bits of blue, 10 bits of green and 10 bits of red. Values are in the `[-511, 511]` range for blue/green/red and `[-1, 1]` for alpha.
   */
  static readonly DATA_FORMAT_A2B10G10R10_SINT_PACK32: int;
  /**
   * 16-bit-per-channel unsigned floating-point red channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16_UNORM: int;
  /**
   * 16-bit-per-channel signed floating-point red channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16_SNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point red channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 65535.0]` range.
   */
  static readonly DATA_FORMAT_R16_USCALED: int;
  /**
   * 16-bit-per-channel signed floating-point red channel data format with scaled value (value is converted from integer to float). Values are in the `[-32767.0, 32767.0]` range.
   */
  static readonly DATA_FORMAT_R16_SSCALED: int;
  /**
   * 16-bit-per-channel unsigned integer red channel data format. Values are in the `[0.0, 65535]` range.
   */
  static readonly DATA_FORMAT_R16_UINT: int;
  /**
   * 16-bit-per-channel signed integer red channel data format. Values are in the `[-32767, 32767]` range.
   */
  static readonly DATA_FORMAT_R16_SINT: int;
  /** 16-bit-per-channel signed floating-point red channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R16_SFLOAT: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16_UNORM: int;
  /**
   * 16-bit-per-channel signed floating-point red/green channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16_SNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 65535.0]` range.
   */
  static readonly DATA_FORMAT_R16G16_USCALED: int;
  /**
   * 16-bit-per-channel signed floating-point red/green channel data format with scaled value (value is converted from integer to float). Values are in the `[-32767.0, 32767.0]` range.
   */
  static readonly DATA_FORMAT_R16G16_SSCALED: int;
  /**
   * 16-bit-per-channel unsigned integer red/green channel data format. Values are in the `[0.0, 65535]` range.
   */
  static readonly DATA_FORMAT_R16G16_UINT: int;
  /**
   * 16-bit-per-channel signed integer red/green channel data format. Values are in the `[-32767, 32767]` range.
   */
  static readonly DATA_FORMAT_R16G16_SINT: int;
  /** 16-bit-per-channel signed floating-point red/green channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R16G16_SFLOAT: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green/blue channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_UNORM: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_SNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green/blue channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 65535.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_USCALED: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue channel data format with scaled value (value is converted from integer to float). Values are in the `[-32767.0, 32767.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_SSCALED: int;
  /**
   * 16-bit-per-channel unsigned integer red/green/blue channel data format. Values are in the `[0.0, 65535]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_UINT: int;
  /**
   * 16-bit-per-channel signed integer red/green/blue channel data format. Values are in the `[-32767, 32767]` range.
   */
  static readonly DATA_FORMAT_R16G16B16_SINT: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R16G16B16_SFLOAT: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_UNORM: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue/alpha channel data format with normalized value. Values are in the `[-1.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_SNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point red/green/blue/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[0.0, 65535.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_USCALED: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue/alpha channel data format with scaled value (value is converted from integer to float). Values are in the `[-32767.0, 32767.0]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_SSCALED: int;
  /**
   * 16-bit-per-channel unsigned integer red/green/blue/alpha channel data format. Values are in the `[0.0, 65535]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_UINT: int;
  /**
   * 16-bit-per-channel signed integer red/green/blue/alpha channel data format. Values are in the `[-32767, 32767]` range.
   */
  static readonly DATA_FORMAT_R16G16B16A16_SINT: int;
  /**
   * 16-bit-per-channel signed floating-point red/green/blue/alpha channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R16G16B16A16_SFLOAT: int;
  /**
   * 32-bit-per-channel unsigned integer red channel data format. Values are in the `[0, 2^32 - 1]` range.
   */
  static readonly DATA_FORMAT_R32_UINT: int;
  /**
   * 32-bit-per-channel signed integer red channel data format. Values are in the `[2^31 + 1, 2^31 - 1]` range.
   */
  static readonly DATA_FORMAT_R32_SINT: int;
  /** 32-bit-per-channel signed floating-point red channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R32_SFLOAT: int;
  /**
   * 32-bit-per-channel unsigned integer red/green channel data format. Values are in the `[0, 2^32 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32_UINT: int;
  /**
   * 32-bit-per-channel signed integer red/green channel data format. Values are in the `[2^31 + 1, 2^31 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32_SINT: int;
  /** 32-bit-per-channel signed floating-point red/green channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R32G32_SFLOAT: int;
  /**
   * 32-bit-per-channel unsigned integer red/green/blue channel data format. Values are in the `[0, 2^32 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32B32_UINT: int;
  /**
   * 32-bit-per-channel signed integer red/green/blue channel data format. Values are in the `[2^31 + 1, 2^31 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32B32_SINT: int;
  /**
   * 32-bit-per-channel signed floating-point red/green/blue channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R32G32B32_SFLOAT: int;
  /**
   * 32-bit-per-channel unsigned integer red/green/blue/alpha channel data format. Values are in the `[0, 2^32 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32B32A32_UINT: int;
  /**
   * 32-bit-per-channel signed integer red/green/blue/alpha channel data format. Values are in the `[2^31 + 1, 2^31 - 1]` range.
   */
  static readonly DATA_FORMAT_R32G32B32A32_SINT: int;
  /**
   * 32-bit-per-channel signed floating-point red/green/blue/alpha channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R32G32B32A32_SFLOAT: int;
  /**
   * 64-bit-per-channel unsigned integer red channel data format. Values are in the `[0, 2^64 - 1]` range.
   */
  static readonly DATA_FORMAT_R64_UINT: int;
  /**
   * 64-bit-per-channel signed integer red channel data format. Values are in the `[2^63 + 1, 2^63 - 1]` range.
   */
  static readonly DATA_FORMAT_R64_SINT: int;
  /** 64-bit-per-channel signed floating-point red channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R64_SFLOAT: int;
  /**
   * 64-bit-per-channel unsigned integer red/green channel data format. Values are in the `[0, 2^64 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64_UINT: int;
  /**
   * 64-bit-per-channel signed integer red/green channel data format. Values are in the `[2^63 + 1, 2^63 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64_SINT: int;
  /** 64-bit-per-channel signed floating-point red/green channel data format with the value stored as-is. */
  static readonly DATA_FORMAT_R64G64_SFLOAT: int;
  /**
   * 64-bit-per-channel unsigned integer red/green/blue channel data format. Values are in the `[0, 2^64 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64B64_UINT: int;
  /**
   * 64-bit-per-channel signed integer red/green/blue channel data format. Values are in the `[2^63 + 1, 2^63 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64B64_SINT: int;
  /**
   * 64-bit-per-channel signed floating-point red/green/blue channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R64G64B64_SFLOAT: int;
  /**
   * 64-bit-per-channel unsigned integer red/green/blue/alpha channel data format. Values are in the `[0, 2^64 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64B64A64_UINT: int;
  /**
   * 64-bit-per-channel signed integer red/green/blue/alpha channel data format. Values are in the `[2^63 + 1, 2^63 - 1]` range.
   */
  static readonly DATA_FORMAT_R64G64B64A64_SINT: int;
  /**
   * 64-bit-per-channel signed floating-point red/green/blue/alpha channel data format with the value stored as-is.
   */
  static readonly DATA_FORMAT_R64G64B64A64_SFLOAT: int;
  /**
   * Unsigned floating-point blue/green/red data format with the value stored as-is, packed in 32 bits. The format's precision is 10 bits of blue channel, 11 bits of green channel and 11 bits of red channel.
   */
  static readonly DATA_FORMAT_B10G11R11_UFLOAT_PACK32: int;
  /**
   * Unsigned floating-point exposure/blue/green/red data format with the value stored as-is, packed in 32 bits. The format's precision is 5 bits of exposure, 9 bits of blue channel, 9 bits of green channel and 9 bits of red channel.
   */
  static readonly DATA_FORMAT_E5B9G9R9_UFLOAT_PACK32: int;
  /**
   * 16-bit unsigned floating-point depth data format with normalized value. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_D16_UNORM: int;
  /**
   * 24-bit unsigned floating-point depth data format with normalized value, plus 8 unused bits, packed in 32 bits. Values for depth are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_X8_D24_UNORM_PACK32: int;
  /** 32-bit signed floating-point depth data format with the value stored as-is. */
  static readonly DATA_FORMAT_D32_SFLOAT: int;
  /** 8-bit unsigned integer stencil data format. */
  static readonly DATA_FORMAT_S8_UINT: int;
  /**
   * 16-bit unsigned floating-point depth data format with normalized value, plus 8 bits of stencil in unsigned integer format. Values for depth are in the `[0.0, 1.0]` range. Values for stencil are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_D16_UNORM_S8_UINT: int;
  /**
   * 24-bit unsigned floating-point depth data format with normalized value, plus 8 bits of stencil in unsigned integer format. Values for depth are in the `[0.0, 1.0]` range. Values for stencil are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_D24_UNORM_S8_UINT: int;
  /**
   * 32-bit signed floating-point depth data format with the value stored as-is, plus 8 bits of stencil in unsigned integer format. Values for stencil are in the `[0, 255]` range.
   */
  static readonly DATA_FORMAT_D32_SFLOAT_S8_UINT: int;
  /**
   * VRAM-compressed unsigned red/green/blue channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel and 5 bits of blue channel. Using BC1 texture compression (also known as S3TC DXT1).
   */
  static readonly DATA_FORMAT_BC1_RGB_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, and 5 bits of blue channel. Using BC1 texture compression (also known as S3TC DXT1).
   */
  static readonly DATA_FORMAT_BC1_RGB_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel and 1 bit of alpha channel. Using BC1 texture compression (also known as S3TC DXT1).
   */
  static readonly DATA_FORMAT_BC1_RGBA_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel, and 1 bit of alpha channel. Using BC1 texture compression (also known as S3TC DXT1).
   */
  static readonly DATA_FORMAT_BC1_RGBA_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel and 4 bits of alpha channel. Using BC2 texture compression (also known as S3TC DXT3).
   */
  static readonly DATA_FORMAT_BC2_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel, and 4 bits of alpha channel. Using BC2 texture compression (also known as S3TC DXT3).
   */
  static readonly DATA_FORMAT_BC2_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel and 8 bits of alpha channel. Using BC3 texture compression (also known as S3TC DXT5).
   */
  static readonly DATA_FORMAT_BC3_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. The format's precision is 5 bits of red channel, 6 bits of green channel, 5 bits of blue channel, and 8 bits of alpha channel. Using BC3 texture compression (also known as S3TC DXT5).
   */
  static readonly DATA_FORMAT_BC3_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 8 bits of red channel. Using BC4 texture compression.
   */
  static readonly DATA_FORMAT_BC4_UNORM_BLOCK: int;
  /**
   * VRAM-compressed signed red channel data format with normalized value. Values are in the `[-1.0, 1.0]` range. The format's precision is 8 bits of red channel. Using BC4 texture compression.
   */
  static readonly DATA_FORMAT_BC4_SNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is 8 bits of red channel and 8 bits of green channel. Using BC5 texture compression (also known as S3TC RGTC).
   */
  static readonly DATA_FORMAT_BC5_UNORM_BLOCK: int;
  /**
   * VRAM-compressed signed red/green channel data format with normalized value. Values are in the `[-1.0, 1.0]` range. The format's precision is 8 bits of red channel and 8 bits of green channel. Using BC5 texture compression (also known as S3TC RGTC).
   */
  static readonly DATA_FORMAT_BC5_SNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue channel data format with the floating-point value stored as-is. The format's precision is between 10 and 13 bits for the red/green/blue channels. Using BC6H texture compression (also known as BPTC HDR).
   */
  static readonly DATA_FORMAT_BC6H_UFLOAT_BLOCK: int;
  /**
   * VRAM-compressed signed red/green/blue channel data format with the floating-point value stored as-is. The format's precision is between 10 and 13 bits for the red/green/blue channels. Using BC6H texture compression (also known as BPTC HDR).
   */
  static readonly DATA_FORMAT_BC6H_SFLOAT_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. The format's precision is between 4 and 7 bits for the red/green/blue channels and between 0 and 8 bits for the alpha channel. Also known as BPTC LDR.
   */
  static readonly DATA_FORMAT_BC7_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. The format's precision is between 4 and 7 bits for the red/green/blue channels and between 0 and 8 bits for the alpha channel. Also known as BPTC LDR.
   */
  static readonly DATA_FORMAT_BC7_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Red/green/blue use 8 bit of precision each, with alpha using 1 bit of precision. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. Red/green/blue use 8 bit of precision each, with alpha using 1 bit of precision. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Red/green/blue use 8 bits of precision each, with alpha using 8 bits of precision. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned red/green/blue/alpha channel data format with normalized value and nonlinear sRGB encoding. Values are in the `[0.0, 1.0]` range. Red/green/blue use 8 bits of precision each, with alpha using 8 bits of precision. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK: int;
  /**
   * 11-bit VRAM-compressed unsigned red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_EAC_R11_UNORM_BLOCK: int;
  /**
   * 11-bit VRAM-compressed signed red channel data format with normalized value. Values are in the `[-1.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_EAC_R11_SNORM_BLOCK: int;
  /**
   * 11-bit VRAM-compressed unsigned red/green channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_EAC_R11G11_UNORM_BLOCK: int;
  /**
   * 11-bit VRAM-compressed signed red/green channel data format with normalized value. Values are in the `[-1.0, 1.0]` range. Using ETC2 texture compression.
   */
  static readonly DATA_FORMAT_EAC_R11G11_SNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 4×4 blocks (highest quality). Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_4x4_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 4×4 blocks (highest quality). Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_4x4_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 5×4 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_5x4_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 5×4 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_5x4_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 5×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_5x5_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 5×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_5x5_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 6×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_6x5_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 6×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_6x5_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 6×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_6x6_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 6×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_6x6_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 8×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x5_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 8×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x5_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 8×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x6_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 8×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x6_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 8×8 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x8_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 8×8 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_8x8_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 10×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x5_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 10×5 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x5_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 10×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x6_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 10×6 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x6_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 10×8 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x8_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 10×8 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x8_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 10×10 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x10_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 10×10 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_10x10_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 12×10 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_12x10_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 12×10 blocks. Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_12x10_SRGB_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value, packed in 12 blocks (lowest quality). Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_12x12_UNORM_BLOCK: int;
  /**
   * VRAM-compressed unsigned floating-point data format with normalized value and nonlinear sRGB encoding, packed in 12 blocks (lowest quality). Values are in the `[0.0, 1.0]` range. Using ASTC compression.
   */
  static readonly DATA_FORMAT_ASTC_12x12_SRGB_BLOCK: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G8B8G8R8_422_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point blue/green/red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_B8G8R8G8_422_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G8_B8_R8_3PLANE_420_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, stored across 2 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G8_B8R8_2PLANE_420_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, stored across 2 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G8_B8_R8_3PLANE_422_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, stored across 2 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G8_B8R8_2PLANE_422_UNORM: int;
  /**
   * 8-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, stored across 3 separate planes. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_G8_B8_R8_3PLANE_444_UNORM: int;
  /**
   * 10-bit-per-channel unsigned floating-point red channel data with normalized value, plus 6 unused bits, packed in 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R10X6_UNORM_PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point red/green channel data with normalized value, plus 6 unused bits after each channel, packed in 2×16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R10X6G10X6_UNORM_2PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point red/green/blue/alpha channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/green/red channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel). The green channel is listed twice, but contains different values to allow it to be represented at full resolution.
   */
  static readonly DATA_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point blue/green/red/green channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel). The green channel is listed twice, but contains different values to allow it to be represented at full resolution.
   */
  static readonly DATA_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 2 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 2 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16: int;
  /**
   * 10-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point red channel data with normalized value, plus 6 unused bits, packed in 16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R12X4_UNORM_PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point red/green channel data with normalized value, plus 6 unused bits after each channel, packed in 2×16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R12X4G12X4_UNORM_2PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point red/green/blue/alpha channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/green/red channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel). The green channel is listed twice, but contains different values to allow it to be represented at full resolution.
   */
  static readonly DATA_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point blue/green/red/green channel data with normalized value, plus 6 unused bits after each channel, packed in 4×16 bits. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel). The green channel is listed twice, but contains different values to allow it to be represented at full resolution.
   */
  static readonly DATA_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 2 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 2 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16: int;
  /**
   * 12-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Packed in 3×16 bits and stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G16B16G16R16_422_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point blue/green/red channel data format with normalized value. Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_B16G16R16G16_422_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Stored across 2 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G16_B16_R16_3PLANE_420_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Stored across 2 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal and vertical resolution (i.e. 2×2 adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G16_B16R16_2PLANE_420_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G16_B16_R16_3PLANE_422_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Stored across 3 separate planes (green + blue/red). Values are in the `[0.0, 1.0]` range. Blue and red channel data is stored at halved horizontal resolution (i.e. 2 horizontally adjacent pixels will share the same value for the blue/red channel).
   */
  static readonly DATA_FORMAT_G16_B16R16_2PLANE_422_UNORM: int;
  /**
   * 16-bit-per-channel unsigned floating-point green/blue/red channel data with normalized value, plus 6 unused bits after each channel. Stored across 3 separate planes (green + blue + red). Values are in the `[0.0, 1.0]` range.
   */
  static readonly DATA_FORMAT_G16_B16_R16_3PLANE_444_UNORM: int;
  static readonly DATA_FORMAT_ASTC_4x4_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_5x4_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_5x5_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_6x5_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_6x6_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_8x5_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_8x6_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_8x8_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_10x5_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_10x6_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_10x8_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_10x10_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_12x10_SFLOAT_BLOCK: int;
  static readonly DATA_FORMAT_ASTC_12x12_SFLOAT_BLOCK: int;
  /** Represents the size of the {@link DataFormat} enum. */
  static readonly DATA_FORMAT_MAX: int;
  // enum BarrierMask
  /** Vertex shader barrier mask. */
  static readonly BARRIER_MASK_VERTEX: int;
  /** Fragment shader barrier mask. */
  static readonly BARRIER_MASK_FRAGMENT: int;
  /** Compute barrier mask. */
  static readonly BARRIER_MASK_COMPUTE: int;
  /** Transfer barrier mask. */
  static readonly BARRIER_MASK_TRANSFER: int;
  /**
   * Raster barrier mask (vertex and fragment). Equivalent to `BARRIER_MASK_VERTEX | BARRIER_MASK_FRAGMENT`.
   */
  static readonly BARRIER_MASK_RASTER: int;
  /** Barrier mask for all types (vertex, fragment, compute, transfer). */
  static readonly BARRIER_MASK_ALL_BARRIERS: int;
  /** No barrier for any type. */
  static readonly BARRIER_MASK_NO_BARRIER: int;
  // enum TextureType
  /** 1-dimensional texture. */
  static readonly TEXTURE_TYPE_1D: int;
  /** 2-dimensional texture. */
  static readonly TEXTURE_TYPE_2D: int;
  /** 3-dimensional texture. */
  static readonly TEXTURE_TYPE_3D: int;
  /** {@link Cubemap} texture. */
  static readonly TEXTURE_TYPE_CUBE: int;
  /** Array of 1-dimensional textures. */
  static readonly TEXTURE_TYPE_1D_ARRAY: int;
  /** Array of 2-dimensional textures. */
  static readonly TEXTURE_TYPE_2D_ARRAY: int;
  /** Array of {@link Cubemap} textures. */
  static readonly TEXTURE_TYPE_CUBE_ARRAY: int;
  /** Represents the size of the {@link TextureType} enum. */
  static readonly TEXTURE_TYPE_MAX: int;
  // enum TextureSamples
  /** Perform 1 texture sample (this is the fastest but lowest-quality for antialiasing). */
  static readonly TEXTURE_SAMPLES_1: int;
  /** Perform 2 texture samples. */
  static readonly TEXTURE_SAMPLES_2: int;
  /** Perform 4 texture samples. */
  static readonly TEXTURE_SAMPLES_4: int;
  /** Perform 8 texture samples. Not supported on mobile GPUs (including Apple Silicon). */
  static readonly TEXTURE_SAMPLES_8: int;
  /** Perform 16 texture samples. Not supported on mobile GPUs and many desktop GPUs. */
  static readonly TEXTURE_SAMPLES_16: int;
  /** Perform 32 texture samples. Not supported on most GPUs. */
  static readonly TEXTURE_SAMPLES_32: int;
  /**
   * Perform 64 texture samples (this is the slowest but highest-quality for antialiasing). Not supported on most GPUs.
   */
  static readonly TEXTURE_SAMPLES_64: int;
  /** Represents the size of the {@link TextureSamples} enum. */
  static readonly TEXTURE_SAMPLES_MAX: int;
  // enum TextureUsageBits
  /** Texture can be sampled. */
  static readonly TEXTURE_USAGE_SAMPLING_BIT: int;
  /** Texture can be used as a color attachment in a framebuffer. */
  static readonly TEXTURE_USAGE_COLOR_ATTACHMENT_BIT: int;
  /** Texture can be used as a depth/stencil attachment in a framebuffer. */
  static readonly TEXTURE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT: int;
  /** Texture can be used as a depth/stencil resolve attachment in a framebuffer. */
  static readonly TEXTURE_USAGE_DEPTH_RESOLVE_ATTACHMENT_BIT: int;
  /**
   * Texture can be used as a storage image (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#descriptorsets-storageimage).
   */
  static readonly TEXTURE_USAGE_STORAGE_BIT: int;
  /**
   * Texture can be used as a storage image (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#descriptorsets-storageimage) with support for atomic operations.
   */
  static readonly TEXTURE_USAGE_STORAGE_ATOMIC_BIT: int;
  /**
   * Texture can be read back on the CPU using {@link texture_get_data} faster than without this bit, since it is always kept in the system memory.
   */
  static readonly TEXTURE_USAGE_CPU_READ_BIT: int;
  /** Texture can be updated using {@link texture_update}. */
  static readonly TEXTURE_USAGE_CAN_UPDATE_BIT: int;
  /** Texture can be a source for {@link texture_copy}. */
  static readonly TEXTURE_USAGE_CAN_COPY_FROM_BIT: int;
  /** Texture can be a destination for {@link texture_copy}. */
  static readonly TEXTURE_USAGE_CAN_COPY_TO_BIT: int;
  /**
   * Texture can be used as a input attachment (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#descriptorsets-inputattachment) in a framebuffer.
   */
  static readonly TEXTURE_USAGE_INPUT_ATTACHMENT_BIT: int;
  // enum TextureSwizzle
  /** Return the sampled value as-is. */
  static readonly TEXTURE_SWIZZLE_IDENTITY: int;
  /** Always return `0.0` when sampling. */
  static readonly TEXTURE_SWIZZLE_ZERO: int;
  /** Always return `1.0` when sampling. */
  static readonly TEXTURE_SWIZZLE_ONE: int;
  /** Sample the red color channel. */
  static readonly TEXTURE_SWIZZLE_R: int;
  /** Sample the green color channel. */
  static readonly TEXTURE_SWIZZLE_G: int;
  /** Sample the blue color channel. */
  static readonly TEXTURE_SWIZZLE_B: int;
  /** Sample the alpha channel. */
  static readonly TEXTURE_SWIZZLE_A: int;
  /** Represents the size of the {@link TextureSwizzle} enum. */
  static readonly TEXTURE_SWIZZLE_MAX: int;
  // enum TextureSliceType
  /** 2-dimensional texture slice. */
  static readonly TEXTURE_SLICE_2D: int;
  /** Cubemap texture slice. */
  static readonly TEXTURE_SLICE_CUBEMAP: int;
  /** 3-dimensional texture slice. */
  static readonly TEXTURE_SLICE_3D: int;
  // enum SamplerFilter
  /**
   * Nearest-neighbor sampler filtering. Sampling at higher resolutions than the source will result in a pixelated look.
   */
  static readonly SAMPLER_FILTER_NEAREST: int;
  /**
   * Bilinear sampler filtering. Sampling at higher resolutions than the source will result in a blurry look.
   */
  static readonly SAMPLER_FILTER_LINEAR: int;
  // enum SamplerRepeatMode
  /** Sample with repeating enabled. */
  static readonly SAMPLER_REPEAT_MODE_REPEAT: int;
  /**
   * Sample with mirrored repeating enabled. When sampling outside the `[0.0, 1.0]` range, return a mirrored version of the sampler. This mirrored version is mirrored again if sampling further away, with the pattern repeating indefinitely.
   */
  static readonly SAMPLER_REPEAT_MODE_MIRRORED_REPEAT: int;
  /**
   * Sample with repeating disabled. When sampling outside the `[0.0, 1.0]` range, return the color of the last pixel on the edge.
   */
  static readonly SAMPLER_REPEAT_MODE_CLAMP_TO_EDGE: int;
  /**
   * Sample with repeating disabled. When sampling outside the `[0.0, 1.0]` range, return the specified {@link RDSamplerState.border_color}.
   */
  static readonly SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER: int;
  /**
   * Sample with mirrored repeating enabled, but only once. When sampling in the `[-1.0, 0.0]` range, return a mirrored version of the sampler. When sampling outside the `[-1.0, 1.0]` range, return the color of the last pixel on the edge.
   */
  static readonly SAMPLER_REPEAT_MODE_MIRROR_CLAMP_TO_EDGE: int;
  /** Represents the size of the {@link SamplerRepeatMode} enum. */
  static readonly SAMPLER_REPEAT_MODE_MAX: int;
  // enum SamplerBorderColor
  /**
   * Return a floating-point transparent black color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK: int;
  /**
   * Return an integer transparent black color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_INT_TRANSPARENT_BLACK: int;
  /**
   * Return a floating-point opaque black color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_FLOAT_OPAQUE_BLACK: int;
  /**
   * Return an integer opaque black color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_INT_OPAQUE_BLACK: int;
  /**
   * Return a floating-point opaque white color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_FLOAT_OPAQUE_WHITE: int;
  /**
   * Return an integer opaque white color when sampling outside the `[0.0, 1.0]` range. Only effective if the sampler repeat mode is {@link SAMPLER_REPEAT_MODE_CLAMP_TO_BORDER}.
   */
  static readonly SAMPLER_BORDER_COLOR_INT_OPAQUE_WHITE: int;
  /** Represents the size of the {@link SamplerBorderColor} enum. */
  static readonly SAMPLER_BORDER_COLOR_MAX: int;
  // enum VertexFrequency
  /**
   * Vertex attribute addressing is a function of the vertex. This is used to specify the rate at which vertex attributes are pulled from buffers.
   */
  static readonly VERTEX_FREQUENCY_VERTEX: int;
  /**
   * Vertex attribute addressing is a function of the instance index. This is used to specify the rate at which vertex attributes are pulled from buffers.
   */
  static readonly VERTEX_FREQUENCY_INSTANCE: int;
  // enum IndexBufferFormat
  /**
   * Index buffer in 16-bit unsigned integer format. This limits the maximum index that can be specified to `65535`.
   */
  static readonly INDEX_BUFFER_FORMAT_UINT16: int;
  /**
   * Index buffer in 32-bit unsigned integer format. This limits the maximum index that can be specified to `4294967295`.
   */
  static readonly INDEX_BUFFER_FORMAT_UINT32: int;
  // enum StorageBufferUsage
  static readonly STORAGE_BUFFER_USAGE_DISPATCH_INDIRECT: int;
  // enum BufferCreationBits
  /**
   * Optionally, set this flag if you wish to use {@link buffer_get_device_address} functionality. You must first check the GPU supports it:
   */
  static readonly BUFFER_CREATION_DEVICE_ADDRESS_BIT: int;
  /**
   * Set this flag so that it is created as storage. This is useful if Compute Shaders need access (for reading or writing) to the buffer, e.g. skeletal animations are processed in Compute Shaders which need access to vertex buffers, to be later consumed by vertex shaders as part of the regular rasterization pipeline.
   */
  static readonly BUFFER_CREATION_AS_STORAGE_BIT: int;
  /**
   * Allows usage of this buffer as input data for an acceleration structure build operation. You must first check that the GPU supports it:
   */
  static readonly BUFFER_CREATION_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT: int;
  // enum AccelerationStructureGeometryBits
  /** An opaque geometry does not invoke the any hit shaders. */
  static readonly ACCELERATION_STRUCTURE_GEOMETRY_OPAQUE: int;
  /** This geometry only calls the any hit shader a single time for each primitive. */
  static readonly ACCELERATION_STRUCTURE_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION: int;
  // enum UniformType
  /** Sampler uniform. */
  static readonly UNIFORM_TYPE_SAMPLER: int;
  /** Sampler uniform with a texture. */
  static readonly UNIFORM_TYPE_SAMPLER_WITH_TEXTURE: int;
  /** Texture uniform. */
  static readonly UNIFORM_TYPE_TEXTURE: int;
  /** Image uniform. */
  static readonly UNIFORM_TYPE_IMAGE: int;
  /** Texture buffer uniform. */
  static readonly UNIFORM_TYPE_TEXTURE_BUFFER: int;
  /** Sampler uniform with a texture buffer. */
  static readonly UNIFORM_TYPE_SAMPLER_WITH_TEXTURE_BUFFER: int;
  /** Image buffer uniform. */
  static readonly UNIFORM_TYPE_IMAGE_BUFFER: int;
  /** Uniform buffer uniform. */
  static readonly UNIFORM_TYPE_UNIFORM_BUFFER: int;
  /** Storage buffer (https://vkguide.dev/docs/chapter-4/storage_buffers/) uniform. */
  static readonly UNIFORM_TYPE_STORAGE_BUFFER: int;
  /** Input attachment uniform. */
  static readonly UNIFORM_TYPE_INPUT_ATTACHMENT: int;
  /**
   * Same as UNIFORM_TYPE_UNIFORM_BUFFER but for buffers created with BUFFER_CREATION_DYNAMIC_PERSISTENT_BIT.
   * **Note:** This flag is not available to GD users due to being too dangerous (i.e. wrong usage can result in visual glitches).
   * It's exposed in case GD users receive a buffer created with such flag from Godot.
   */
  static readonly UNIFORM_TYPE_UNIFORM_BUFFER_DYNAMIC: int;
  /**
   * Same as UNIFORM_TYPE_STORAGE_BUFFER but for buffers created with BUFFER_CREATION_DYNAMIC_PERSISTENT_BIT.
   * **Note:** This flag is not available to GD users due to being too dangerous (i.e. wrong usage can result in visual glitches).
   * It's exposed in case GD users receive a buffer created with such flag from Godot.
   */
  static readonly UNIFORM_TYPE_STORAGE_BUFFER_DYNAMIC: int;
  /** Acceleration structure uniform. */
  static readonly UNIFORM_TYPE_ACCELERATION_STRUCTURE: int;
  /** Represents the size of the {@link UniformType} enum. */
  static readonly UNIFORM_TYPE_MAX: int;
  // enum RenderPrimitive
  /** Point rendering primitive (with constant size, regardless of distance from camera). */
  static readonly RENDER_PRIMITIVE_POINTS: int;
  /** Line list rendering primitive. Lines are drawn separated from each other. */
  static readonly RENDER_PRIMITIVE_LINES: int;
  /**
   * Line list rendering primitive with adjacency. (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#drawing-line-lists-with-adjacency)
   * **Note:** Adjacency is only useful with geometry shaders, which Godot does not expose.
   */
  static readonly RENDER_PRIMITIVE_LINES_WITH_ADJACENCY: int;
  /** Line strip rendering primitive. Lines drawn are connected to the previous vertex. */
  static readonly RENDER_PRIMITIVE_LINESTRIPS: int;
  /**
   * Line strip rendering primitive with adjacency. (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#drawing-line-strips-with-adjacency)
   * **Note:** Adjacency is only useful with geometry shaders, which Godot does not expose.
   */
  static readonly RENDER_PRIMITIVE_LINESTRIPS_WITH_ADJACENCY: int;
  /** Triangle list rendering primitive. Triangles are drawn separated from each other. */
  static readonly RENDER_PRIMITIVE_TRIANGLES: int;
  /**
   * Triangle list rendering primitive with adjacency. (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#drawing-triangle-lists-with-adjacency)
   * **Note:** Adjacency is only useful with geometry shaders, which Godot does not expose.
   */
  static readonly RENDER_PRIMITIVE_TRIANGLES_WITH_ADJACENCY: int;
  /** Triangle strip rendering primitive. Triangles drawn are connected to the previous triangle. */
  static readonly RENDER_PRIMITIVE_TRIANGLE_STRIPS: int;
  /**
   * Triangle strip rendering primitive with adjacency. (https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#drawing-triangle-strips-with-adjacency)
   * **Note:** Adjacency is only useful with geometry shaders, which Godot does not expose.
   */
  static readonly RENDER_PRIMITIVE_TRIANGLE_STRIPS_WITH_AJACENCY: int;
  /**
   * Triangle strip rendering primitive with *primitive restart* enabled. Triangles drawn are connected to the previous triangle, but a primitive restart index can be specified before drawing to create a second triangle strip after the specified index.
   * **Note:** Only compatible with indexed draws.
   */
  static readonly RENDER_PRIMITIVE_TRIANGLE_STRIPS_WITH_RESTART_INDEX: int;
  /**
   * Tessellation patch rendering primitive. Only useful with tessellation shaders, which can be used to deform these patches.
   */
  static readonly RENDER_PRIMITIVE_TESSELATION_PATCH: int;
  /** Represents the size of the {@link RenderPrimitive} enum. */
  static readonly RENDER_PRIMITIVE_MAX: int;
  // enum PolygonCullMode
  /** Do not use polygon front face or backface culling. */
  static readonly POLYGON_CULL_DISABLED: int;
  /** Use polygon frontface culling (faces pointing towards the camera are hidden). */
  static readonly POLYGON_CULL_FRONT: int;
  /** Use polygon backface culling (faces pointing away from the camera are hidden). */
  static readonly POLYGON_CULL_BACK: int;
  // enum PolygonFrontFace
  /** Clockwise winding order to determine which face of a polygon is its front face. */
  static readonly POLYGON_FRONT_FACE_CLOCKWISE: int;
  /** Counter-clockwise winding order to determine which face of a polygon is its front face. */
  static readonly POLYGON_FRONT_FACE_COUNTER_CLOCKWISE: int;
  // enum StencilOperation
  /** Keep the current stencil value. */
  static readonly STENCIL_OP_KEEP: int;
  /** Set the stencil value to `0`. */
  static readonly STENCIL_OP_ZERO: int;
  /** Replace the existing stencil value with the new one. */
  static readonly STENCIL_OP_REPLACE: int;
  /**
   * Increment the existing stencil value and clamp to the maximum representable unsigned value if reached. Stencil bits are considered as an unsigned integer.
   */
  static readonly STENCIL_OP_INCREMENT_AND_CLAMP: int;
  /**
   * Decrement the existing stencil value and clamp to the minimum value if reached. Stencil bits are considered as an unsigned integer.
   */
  static readonly STENCIL_OP_DECREMENT_AND_CLAMP: int;
  /** Bitwise-invert the existing stencil value. */
  static readonly STENCIL_OP_INVERT: int;
  /**
   * Increment the stencil value and wrap around to `0` if reaching the maximum representable unsigned. Stencil bits are considered as an unsigned integer.
   */
  static readonly STENCIL_OP_INCREMENT_AND_WRAP: int;
  /**
   * Decrement the stencil value and wrap around to the maximum representable unsigned if reaching the minimum. Stencil bits are considered as an unsigned integer.
   */
  static readonly STENCIL_OP_DECREMENT_AND_WRAP: int;
  /** Represents the size of the {@link StencilOperation} enum. */
  static readonly STENCIL_OP_MAX: int;
  // enum CompareOperator
  /** "Never" comparison (opposite of {@link COMPARE_OP_ALWAYS}). */
  static readonly COMPARE_OP_NEVER: int;
  /** "Less than" comparison. */
  static readonly COMPARE_OP_LESS: int;
  /** "Equal" comparison. */
  static readonly COMPARE_OP_EQUAL: int;
  /** "Less than or equal" comparison. */
  static readonly COMPARE_OP_LESS_OR_EQUAL: int;
  /** "Greater than" comparison. */
  static readonly COMPARE_OP_GREATER: int;
  /** "Not equal" comparison. */
  static readonly COMPARE_OP_NOT_EQUAL: int;
  /** "Greater than or equal" comparison. */
  static readonly COMPARE_OP_GREATER_OR_EQUAL: int;
  /** "Always" comparison (opposite of {@link COMPARE_OP_NEVER}). */
  static readonly COMPARE_OP_ALWAYS: int;
  /** Represents the size of the {@link CompareOperator} enum. */
  static readonly COMPARE_OP_MAX: int;
  // enum LogicOperation
  /** Clear logic operation (result is always `0`). See also {@link LOGIC_OP_SET}. */
  static readonly LOGIC_OP_CLEAR: int;
  /** AND logic operation. */
  static readonly LOGIC_OP_AND: int;
  /**
   * AND logic operation with the *destination* operand being inverted. See also {@link LOGIC_OP_AND_INVERTED}.
   */
  static readonly LOGIC_OP_AND_REVERSE: int;
  /**
   * Copy logic operation (keeps the *source* value as-is). See also {@link LOGIC_OP_COPY_INVERTED} and {@link LOGIC_OP_NO_OP}.
   */
  static readonly LOGIC_OP_COPY: int;
  /**
   * AND logic operation with the *source* operand being inverted. See also {@link LOGIC_OP_AND_REVERSE}.
   */
  static readonly LOGIC_OP_AND_INVERTED: int;
  /** No-op logic operation (keeps the *destination* value as-is). See also {@link LOGIC_OP_COPY}. */
  static readonly LOGIC_OP_NO_OP: int;
  /** Exclusive or (XOR) logic operation. */
  static readonly LOGIC_OP_XOR: int;
  /** OR logic operation. */
  static readonly LOGIC_OP_OR: int;
  /** Not-OR (NOR) logic operation. */
  static readonly LOGIC_OP_NOR: int;
  /** Not-XOR (XNOR) logic operation. */
  static readonly LOGIC_OP_EQUIVALENT: int;
  /** Invert logic operation. */
  static readonly LOGIC_OP_INVERT: int;
  /**
   * OR logic operation with the *destination* operand being inverted. See also {@link LOGIC_OP_OR_REVERSE}.
   */
  static readonly LOGIC_OP_OR_REVERSE: int;
  /** NOT logic operation (inverts the value). See also {@link LOGIC_OP_COPY}. */
  static readonly LOGIC_OP_COPY_INVERTED: int;
  /** OR logic operation with the *source* operand being inverted. See also {@link LOGIC_OP_OR_REVERSE}. */
  static readonly LOGIC_OP_OR_INVERTED: int;
  /** Not-AND (NAND) logic operation. */
  static readonly LOGIC_OP_NAND: int;
  /** SET logic operation (result is always `1`). See also {@link LOGIC_OP_CLEAR}. */
  static readonly LOGIC_OP_SET: int;
  /** Represents the size of the {@link LogicOperation} enum. */
  static readonly LOGIC_OP_MAX: int;
  // enum BlendFactor
  /** Constant `0.0` blend factor. */
  static readonly BLEND_FACTOR_ZERO: int;
  /** Constant `1.0` blend factor. */
  static readonly BLEND_FACTOR_ONE: int;
  /** Color blend factor is `source color`. Alpha blend factor is `source alpha`. */
  static readonly BLEND_FACTOR_SRC_COLOR: int;
  /** Color blend factor is `1.0 - source color`. Alpha blend factor is `1.0 - source alpha`. */
  static readonly BLEND_FACTOR_ONE_MINUS_SRC_COLOR: int;
  /** Color blend factor is `destination color`. Alpha blend factor is `destination alpha`. */
  static readonly BLEND_FACTOR_DST_COLOR: int;
  /** Color blend factor is `1.0 - destination color`. Alpha blend factor is `1.0 - destination alpha`. */
  static readonly BLEND_FACTOR_ONE_MINUS_DST_COLOR: int;
  /** Color and alpha blend factor is `source alpha`. */
  static readonly BLEND_FACTOR_SRC_ALPHA: int;
  /** Color and alpha blend factor is `1.0 - source alpha`. */
  static readonly BLEND_FACTOR_ONE_MINUS_SRC_ALPHA: int;
  /** Color and alpha blend factor is `destination alpha`. */
  static readonly BLEND_FACTOR_DST_ALPHA: int;
  /** Color and alpha blend factor is `1.0 - destination alpha`. */
  static readonly BLEND_FACTOR_ONE_MINUS_DST_ALPHA: int;
  /**
   * Color blend factor is `blend constant color`. Alpha blend factor is `blend constant alpha` (see {@link draw_list_set_blend_constants}).
   */
  static readonly BLEND_FACTOR_CONSTANT_COLOR: int;
  /**
   * Color blend factor is `1.0 - blend constant color`. Alpha blend factor is `1.0 - blend constant alpha` (see {@link draw_list_set_blend_constants}).
   */
  static readonly BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR: int;
  /** Color and alpha blend factor is `blend constant alpha` (see {@link draw_list_set_blend_constants}). */
  static readonly BLEND_FACTOR_CONSTANT_ALPHA: int;
  /**
   * Color and alpha blend factor is `1.0 - blend constant alpha` (see {@link draw_list_set_blend_constants}).
   */
  static readonly BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA: int;
  /** Color blend factor is `min(source alpha, 1.0 - destination alpha)`. Alpha blend factor is `1.0`. */
  static readonly BLEND_FACTOR_SRC_ALPHA_SATURATE: int;
  /**
   * Color blend factor is `second source color`. Alpha blend factor is `second source alpha`. Only relevant for dual-source blending.
   */
  static readonly BLEND_FACTOR_SRC1_COLOR: int;
  /**
   * Color blend factor is `1.0 - second source color`. Alpha blend factor is `1.0 - second source alpha`. Only relevant for dual-source blending.
   */
  static readonly BLEND_FACTOR_ONE_MINUS_SRC1_COLOR: int;
  /** Color and alpha blend factor is `second source alpha`. Only relevant for dual-source blending. */
  static readonly BLEND_FACTOR_SRC1_ALPHA: int;
  /**
   * Color and alpha blend factor is `1.0 - second source alpha`. Only relevant for dual-source blending.
   */
  static readonly BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA: int;
  /** Represents the size of the {@link BlendFactor} enum. */
  static readonly BLEND_FACTOR_MAX: int;
  // enum BlendOperation
  /** Additive blending operation (`source + destination`). */
  static readonly BLEND_OP_ADD: int;
  /** Subtractive blending operation (`source - destination`). */
  static readonly BLEND_OP_SUBTRACT: int;
  /** Reverse subtractive blending operation (`destination - source`). */
  static readonly BLEND_OP_REVERSE_SUBTRACT: int;
  /** Minimum blending operation (keep the lowest value of the two). */
  static readonly BLEND_OP_MINIMUM: int;
  /** Maximum blending operation (keep the highest value of the two). */
  static readonly BLEND_OP_MAXIMUM: int;
  /** Represents the size of the {@link BlendOperation} enum. */
  static readonly BLEND_OP_MAX: int;
  // enum PipelineDynamicStateFlags
  /** Allows dynamically changing the width of rendering lines. */
  static readonly DYNAMIC_STATE_LINE_WIDTH: int;
  /** Allows dynamically changing the depth bias. */
  static readonly DYNAMIC_STATE_DEPTH_BIAS: int;
  static readonly DYNAMIC_STATE_BLEND_CONSTANTS: int;
  static readonly DYNAMIC_STATE_DEPTH_BOUNDS: int;
  static readonly DYNAMIC_STATE_STENCIL_COMPARE_MASK: int;
  static readonly DYNAMIC_STATE_STENCIL_WRITE_MASK: int;
  static readonly DYNAMIC_STATE_STENCIL_REFERENCE: int;
  // enum InitialAction
  /** Load the previous contents of the framebuffer. */
  static readonly INITIAL_ACTION_LOAD: int;
  /** Clear the whole framebuffer or its specified region. */
  static readonly INITIAL_ACTION_CLEAR: int;
  /**
   * Ignore the previous contents of the framebuffer. This is the fastest option if you'll overwrite all of the pixels and don't need to read any of them.
   */
  static readonly INITIAL_ACTION_DISCARD: int;
  /** Represents the size of the {@link InitialAction} enum. */
  static readonly INITIAL_ACTION_MAX: int;
  static readonly INITIAL_ACTION_CLEAR_REGION: int;
  static readonly INITIAL_ACTION_CLEAR_REGION_CONTINUE: int;
  static readonly INITIAL_ACTION_KEEP: int;
  static readonly INITIAL_ACTION_DROP: int;
  static readonly INITIAL_ACTION_CONTINUE: int;
  // enum FinalAction
  /** Store the result of the draw list in the framebuffer. This is generally what you want to do. */
  static readonly FINAL_ACTION_STORE: int;
  /**
   * Discard the contents of the framebuffer. This is the fastest option if you don't need to use the results of the draw list.
   */
  static readonly FINAL_ACTION_DISCARD: int;
  /** Represents the size of the {@link FinalAction} enum. */
  static readonly FINAL_ACTION_MAX: int;
  static readonly FINAL_ACTION_READ: int;
  static readonly FINAL_ACTION_CONTINUE: int;
  // enum ShaderStage
  /**
   * Vertex shader stage. This can be used to manipulate vertices from a shader (but not create new vertices).
   */
  static readonly SHADER_STAGE_VERTEX: int;
  /**
   * Fragment shader stage (called "pixel shader" in Direct3D). This can be used to manipulate pixels from a shader.
   */
  static readonly SHADER_STAGE_FRAGMENT: int;
  /** Tessellation control shader stage. This can be used to create additional geometry from a shader. */
  static readonly SHADER_STAGE_TESSELATION_CONTROL: int;
  /** Tessellation evaluation shader stage. This can be used to create additional geometry from a shader. */
  static readonly SHADER_STAGE_TESSELATION_EVALUATION: int;
  /**
   * Compute shader stage. This can be used to run arbitrary computing tasks in a shader, performing them on the GPU instead of the CPU.
   */
  static readonly SHADER_STAGE_COMPUTE: int;
  /** Ray generation shader stage. This can be used to generate primary rays. */
  static readonly SHADER_STAGE_RAYGEN: int;
  /**
   * Any hit shader stage. Invoked when ray intersections are not opaque. This can be used to specify what happens when a ray hits any of the geometry in the scene.
   */
  static readonly SHADER_STAGE_ANY_HIT: int;
  /**
   * Closest hit shader stage. This can be used to specify what happens when a ray hits the closest geometry in the scene.
   */
  static readonly SHADER_STAGE_CLOSEST_HIT: int;
  /**
   * Miss shader stage. This can be used to specify what happens if a ray does not hit anything in the scene.
   */
  static readonly SHADER_STAGE_MISS: int;
  /**
   * Intersection shader stage. The intersection shader for triangles is built-in. This can be used to compute ray intersections with primitives that are not triangles.
   */
  static readonly SHADER_STAGE_INTERSECTION: int;
  /** Represents the size of the {@link ShaderStage} enum. */
  static readonly SHADER_STAGE_MAX: int;
  /** Vertex shader stage bit (see also {@link SHADER_STAGE_VERTEX}). */
  static readonly SHADER_STAGE_VERTEX_BIT: int;
  /** Fragment shader stage bit (see also {@link SHADER_STAGE_FRAGMENT}). */
  static readonly SHADER_STAGE_FRAGMENT_BIT: int;
  /** Tessellation control shader stage bit (see also {@link SHADER_STAGE_TESSELATION_CONTROL}). */
  static readonly SHADER_STAGE_TESSELATION_CONTROL_BIT: int;
  /** Tessellation evaluation shader stage bit (see also {@link SHADER_STAGE_TESSELATION_EVALUATION}). */
  static readonly SHADER_STAGE_TESSELATION_EVALUATION_BIT: int;
  /** Compute shader stage bit (see also {@link SHADER_STAGE_COMPUTE}). */
  static readonly SHADER_STAGE_COMPUTE_BIT: int;
  /** Ray generation shader stage bit (see also {@link SHADER_STAGE_RAYGEN}). */
  static readonly SHADER_STAGE_RAYGEN_BIT: int;
  /** Any hit shader stage bit (see also {@link SHADER_STAGE_ANY_HIT}). */
  static readonly SHADER_STAGE_ANY_HIT_BIT: int;
  /** Closest hit shader stage bit (see also {@link SHADER_STAGE_CLOSEST_HIT}). */
  static readonly SHADER_STAGE_CLOSEST_HIT_BIT: int;
  /** Miss shader stage bit (see also {@link SHADER_STAGE_MISS}). */
  static readonly SHADER_STAGE_MISS_BIT: int;
  /** Intersection shader stage bit (see also {@link SHADER_STAGE_INTERSECTION}). */
  static readonly SHADER_STAGE_INTERSECTION_BIT: int;
  // enum ShaderLanguage
  /**
   * Khronos' GLSL shading language (used natively by OpenGL and Vulkan). This is the language used for core Godot shaders.
   */
  static readonly SHADER_LANGUAGE_GLSL: int;
  /**
   * Microsoft's High-Level Shading Language (used natively by Direct3D, but can also be used in Vulkan).
   */
  static readonly SHADER_LANGUAGE_HLSL: int;
  // enum PipelineSpecializationConstantType
  /** Boolean specialization constant. */
  static readonly PIPELINE_SPECIALIZATION_CONSTANT_TYPE_BOOL: int;
  /** Integer specialization constant. */
  static readonly PIPELINE_SPECIALIZATION_CONSTANT_TYPE_INT: int;
  /** Floating-point specialization constant. */
  static readonly PIPELINE_SPECIALIZATION_CONSTANT_TYPE_FLOAT: int;
  // enum Features
  /** Support for MetalFX spatial upscaling. */
  static readonly SUPPORTS_METALFX_SPATIAL: int;
  /** Support for MetalFX temporal upscaling. */
  static readonly SUPPORTS_METALFX_TEMPORAL: int;
  /** Features support for buffer device address extension. */
  static readonly SUPPORTS_BUFFER_DEVICE_ADDRESS: int;
  /** Support for 32-bit image atomic operations. */
  static readonly SUPPORTS_IMAGE_ATOMIC_32_BIT: int;
  /**
   * Support for ray query extension.
   * **Note:** This is currently only supported when using Vulkan. This is not supported on macOS and iOS (even on hardware supporting raytracing) due to MoltenVK limitations.
   */
  static readonly SUPPORTS_RAY_QUERY: int;
  /**
   * Support for raytracing pipeline extension.
   * **Note:** This is currently only supported when using Vulkan. This is not supported on macOS and iOS (even on hardware supporting raytracing) due to MoltenVK limitations.
   */
  static readonly SUPPORTS_RAYTRACING_PIPELINE: int;
  /** Support for high dynamic range (HDR) output. */
  static readonly SUPPORTS_HDR_OUTPUT: int;
  // enum Limit
  /** Maximum number of uniform sets that can be bound at a given time. */
  static readonly LIMIT_MAX_BOUND_UNIFORM_SETS: int;
  /** Maximum number of color framebuffer attachments that can be used at a given time. */
  static readonly LIMIT_MAX_FRAMEBUFFER_COLOR_ATTACHMENTS: int;
  /** Maximum number of textures that can be used per uniform set. */
  static readonly LIMIT_MAX_TEXTURES_PER_UNIFORM_SET: int;
  /** Maximum number of samplers that can be used per uniform set. */
  static readonly LIMIT_MAX_SAMPLERS_PER_UNIFORM_SET: int;
  /**
   * Maximum number of storage buffers (https://vkguide.dev/docs/chapter-4/storage_buffers/) per uniform set.
   */
  static readonly LIMIT_MAX_STORAGE_BUFFERS_PER_UNIFORM_SET: int;
  /** Maximum number of storage images per uniform set. */
  static readonly LIMIT_MAX_STORAGE_IMAGES_PER_UNIFORM_SET: int;
  /** Maximum number of uniform buffers per uniform set. */
  static readonly LIMIT_MAX_UNIFORM_BUFFERS_PER_UNIFORM_SET: int;
  /** Maximum index for an indexed draw command. */
  static readonly LIMIT_MAX_DRAW_INDEXED_INDEX: int;
  /** Maximum height of a framebuffer (in pixels). */
  static readonly LIMIT_MAX_FRAMEBUFFER_HEIGHT: int;
  /** Maximum width of a framebuffer (in pixels). */
  static readonly LIMIT_MAX_FRAMEBUFFER_WIDTH: int;
  /** Maximum number of texture array layers. */
  static readonly LIMIT_MAX_TEXTURE_ARRAY_LAYERS: int;
  /** Maximum supported 1-dimensional texture size (in pixels on a single axis). */
  static readonly LIMIT_MAX_TEXTURE_SIZE_1D: int;
  /** Maximum supported 2-dimensional texture size (in pixels on a single axis). */
  static readonly LIMIT_MAX_TEXTURE_SIZE_2D: int;
  /** Maximum supported 3-dimensional texture size (in pixels on a single axis). */
  static readonly LIMIT_MAX_TEXTURE_SIZE_3D: int;
  /** Maximum supported cubemap texture size (in pixels on a single axis of a single face). */
  static readonly LIMIT_MAX_TEXTURE_SIZE_CUBE: int;
  /** Maximum number of textures per shader stage. */
  static readonly LIMIT_MAX_TEXTURES_PER_SHADER_STAGE: int;
  /** Maximum number of samplers per shader stage. */
  static readonly LIMIT_MAX_SAMPLERS_PER_SHADER_STAGE: int;
  /**
   * Maximum number of storage buffers (https://vkguide.dev/docs/chapter-4/storage_buffers/) per shader stage.
   */
  static readonly LIMIT_MAX_STORAGE_BUFFERS_PER_SHADER_STAGE: int;
  /** Maximum number of storage images per shader stage. */
  static readonly LIMIT_MAX_STORAGE_IMAGES_PER_SHADER_STAGE: int;
  /** Maximum number of uniform buffers per uniform set. */
  static readonly LIMIT_MAX_UNIFORM_BUFFERS_PER_SHADER_STAGE: int;
  /**
   * Maximum size of a push constant. A lot of devices are limited to 128 bytes, so try to avoid exceeding 128 bytes in push constants to ensure compatibility even if your GPU is reporting a higher value.
   */
  static readonly LIMIT_MAX_PUSH_CONSTANT_SIZE: int;
  /** Maximum size of a uniform buffer. */
  static readonly LIMIT_MAX_UNIFORM_BUFFER_SIZE: int;
  /** Maximum vertex input attribute offset. */
  static readonly LIMIT_MAX_VERTEX_INPUT_ATTRIBUTE_OFFSET: int;
  /** Maximum number of vertex input attributes. */
  static readonly LIMIT_MAX_VERTEX_INPUT_ATTRIBUTES: int;
  /** Maximum number of vertex input bindings. */
  static readonly LIMIT_MAX_VERTEX_INPUT_BINDINGS: int;
  /** Maximum vertex input binding stride. */
  static readonly LIMIT_MAX_VERTEX_INPUT_BINDING_STRIDE: int;
  /** Minimum uniform buffer offset alignment. */
  static readonly LIMIT_MIN_UNIFORM_BUFFER_OFFSET_ALIGNMENT: int;
  /** Maximum shared memory size for compute shaders. */
  static readonly LIMIT_MAX_COMPUTE_SHARED_MEMORY_SIZE: int;
  /** Maximum number of workgroups for compute shaders on the X axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_X: int;
  /** Maximum number of workgroups for compute shaders on the Y axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_Y: int;
  /** Maximum number of workgroups for compute shaders on the Z axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_COUNT_Z: int;
  /** Maximum number of workgroup invocations for compute shaders. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_INVOCATIONS: int;
  /** Maximum workgroup size for compute shaders on the X axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_X: int;
  /** Maximum workgroup size for compute shaders on the Y axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_Y: int;
  /** Maximum workgroup size for compute shaders on the Z axis. */
  static readonly LIMIT_MAX_COMPUTE_WORKGROUP_SIZE_Z: int;
  /** Maximum viewport width (in pixels). */
  static readonly LIMIT_MAX_VIEWPORT_DIMENSIONS_X: int;
  /** Maximum viewport height (in pixels). */
  static readonly LIMIT_MAX_VIEWPORT_DIMENSIONS_Y: int;
  /**
   * Returns the smallest value for {@link ProjectSettings.rendering/scaling_3d/scale} when using the MetalFX temporal upscaler.
   * **Note:** The returned value is multiplied by a factor of `1000000` to preserve 6 digits of precision. It must be divided by `1000000.0` to convert the value to a floating point number.
   */
  static readonly LIMIT_METALFX_TEMPORAL_SCALER_MIN_SCALE: int;
  /**
   * Returns the largest value for {@link ProjectSettings.rendering/scaling_3d/scale} when using the MetalFX temporal upscaler.
   * **Note:** The returned value is multiplied by a factor of `1000000` to preserve 6 digits of precision. It must be divided by `1000000.0` to convert the value to a floating point number.
   */
  static readonly LIMIT_METALFX_TEMPORAL_SCALER_MAX_SCALE: int;
  // enum MemoryType
  /** Memory taken by textures. */
  static readonly MEMORY_TEXTURES: int;
  /** Memory taken by buffers. */
  static readonly MEMORY_BUFFERS: int;
  /**
   * Total memory taken. This is greater than the sum of {@link MEMORY_TEXTURES} and {@link MEMORY_BUFFERS}, as it also includes miscellaneous memory usage.
   */
  static readonly MEMORY_TOTAL: int;
  // enum BreadcrumbMarker
  /** No breadcrumb marker will be added. */
  static readonly NONE: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"REFLECTION_PROBES"` for added context as to when the crash occurred.
   */
  static readonly REFLECTION_PROBES: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"SKY_PASS"` for added context as to when the crash occurred.
   */
  static readonly SKY_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"LIGHTMAPPER_PASS"` for added context as to when the crash occurred.
   */
  static readonly LIGHTMAPPER_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"SHADOW_PASS_DIRECTIONAL"` for added context as to when the crash occurred.
   */
  static readonly SHADOW_PASS_DIRECTIONAL: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"SHADOW_PASS_CUBE"` for added context as to when the crash occurred.
   */
  static readonly SHADOW_PASS_CUBE: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"OPAQUE_PASS"` for added context as to when the crash occurred.
   */
  static readonly OPAQUE_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"ALPHA_PASS"` for added context as to when the crash occurred.
   */
  static readonly ALPHA_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"TRANSPARENT_PASS"` for added context as to when the crash occurred.
   */
  static readonly TRANSPARENT_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"POST_PROCESSING_PASS"` for added context as to when the crash occurred.
   */
  static readonly POST_PROCESSING_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"BLIT_PASS"` for added context as to when the crash occurred.
   */
  static readonly BLIT_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"UI_PASS"` for added context as to when the crash occurred.
   */
  static readonly UI_PASS: int;
  /**
   * During a GPU crash in dev or debug mode, Godot's error message will include `"DEBUG_PASS"` for added context as to when the crash occurred.
   */
  static readonly DEBUG_PASS: int;
  // enum DrawFlags
  /** Do not clear or ignore any attachments. */
  static readonly DRAW_DEFAULT_ALL: int;
  /** Clear the first color attachment. */
  static readonly DRAW_CLEAR_COLOR_0: int;
  /** Clear the second color attachment. */
  static readonly DRAW_CLEAR_COLOR_1: int;
  /** Clear the third color attachment. */
  static readonly DRAW_CLEAR_COLOR_2: int;
  /** Clear the fourth color attachment. */
  static readonly DRAW_CLEAR_COLOR_3: int;
  /** Clear the fifth color attachment. */
  static readonly DRAW_CLEAR_COLOR_4: int;
  /** Clear the sixth color attachment. */
  static readonly DRAW_CLEAR_COLOR_5: int;
  /** Clear the seventh color attachment. */
  static readonly DRAW_CLEAR_COLOR_6: int;
  /** Clear the eighth color attachment. */
  static readonly DRAW_CLEAR_COLOR_7: int;
  /** Mask for clearing all color attachments. */
  static readonly DRAW_CLEAR_COLOR_MASK: int;
  /** Clear all color attachments. */
  static readonly DRAW_CLEAR_COLOR_ALL: int;
  /** Ignore the previous contents of the first color attachment. */
  static readonly DRAW_IGNORE_COLOR_0: int;
  /** Ignore the previous contents of the second color attachment. */
  static readonly DRAW_IGNORE_COLOR_1: int;
  /** Ignore the previous contents of the third color attachment. */
  static readonly DRAW_IGNORE_COLOR_2: int;
  /** Ignore the previous contents of the fourth color attachment. */
  static readonly DRAW_IGNORE_COLOR_3: int;
  /** Ignore the previous contents of the fifth color attachment. */
  static readonly DRAW_IGNORE_COLOR_4: int;
  /** Ignore the previous contents of the sixth color attachment. */
  static readonly DRAW_IGNORE_COLOR_5: int;
  /** Ignore the previous contents of the seventh color attachment. */
  static readonly DRAW_IGNORE_COLOR_6: int;
  /** Ignore the previous contents of the eighth color attachment. */
  static readonly DRAW_IGNORE_COLOR_7: int;
  /** Mask for ignoring all the previous contents of the color attachments. */
  static readonly DRAW_IGNORE_COLOR_MASK: int;
  /** Ignore the previous contents of all color attachments. */
  static readonly DRAW_IGNORE_COLOR_ALL: int;
  /** Clear the depth attachment. */
  static readonly DRAW_CLEAR_DEPTH: int;
  /** Ignore the previous contents of the depth attachment. */
  static readonly DRAW_IGNORE_DEPTH: int;
  /** Clear the stencil attachment. */
  static readonly DRAW_CLEAR_STENCIL: int;
  /** Ignore the previous contents of the stencil attachment. */
  static readonly DRAW_IGNORE_STENCIL: int;
  /** Clear all attachments. */
  static readonly DRAW_CLEAR_ALL: int;
  /** Ignore the previous contents of all attachments. */
  static readonly DRAW_IGNORE_ALL: int;

  /** Returned by functions that return an ID if a value is invalid. */
  static readonly INVALID_ID: int;
  /** Returned by functions that return a format ID if a value is invalid. */
  static readonly INVALID_FORMAT_ID: int;
}
