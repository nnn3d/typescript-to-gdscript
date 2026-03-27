// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Exposes performance-related data. */
declare interface Performance extends GodotObject {
  /**
   * Adds a custom monitor with the name `id`. You can specify the category of the monitor using slash delimiters in `id` (for example: `"Game/NumberOfNPCs"`). If there is more than one slash delimiter, then the default category is used. The default category is `"Custom"`. Prints an error if given `id` is already present.
   * The debugger calls the callable to get the value of custom monitor. The callable must return a zero or positive integer or floating-point number.
   * Callables are called with arguments supplied in argument array.
   */
  add_custom_monitor(id: string, callable: Callable, arguments?: Array<unknown>, type_?: int): void;
  /**
   * Returns the value of custom monitor with given `id`. The callable is called to get the value of custom monitor. See also {@link has_custom_monitor}. Prints an error if the given `id` is absent.
   */
  get_custom_monitor(id: string): unknown;
  /** Returns the names of active custom monitors in an {@link Array}. */
  get_custom_monitor_names(): unknown;
  /** Returns the {@link MonitorType} values of active custom monitors in an {@link Array}. */
  get_custom_monitor_types(): PackedInt32Array;
  /**
   * Returns the value of one of the available built-in monitors. You should provide one of the {@link Monitor} constants as the argument, like this:
   * See {@link get_custom_monitor} to query custom performance monitors' values.
   */
  get_monitor(monitor: int): float;
  /**
   * Returns the last tick in which custom monitor was added/removed (in microseconds since the engine started). This is set to {@link Time.get_ticks_usec} when the monitor is updated.
   */
  get_monitor_modification_time(): int;
  /** Returns `true` if custom monitor with the given `id` is present, `false` otherwise. */
  has_custom_monitor(id: string): boolean;
  /** Removes the custom monitor with given `id`. Prints an error if the given `id` is already absent. */
  remove_custom_monitor(id: string): void;

  // enum Monitor
  /**
   * The number of frames rendered in the last second. This metric is only updated once per second, even if queried more often. *Higher is better.*
   */
  readonly TIME_FPS: int;
  /** Time it took to complete one frame, in seconds. *Lower is better.* */
  readonly TIME_PROCESS: int;
  /** Time it took to complete one physics frame, in seconds. *Lower is better.* */
  readonly TIME_PHYSICS_PROCESS: int;
  /**
   * Time it took to complete one navigation step, in seconds. This includes navigation map updates as well as agent avoidance calculations. *Lower is better.*
   */
  readonly TIME_NAVIGATION_PROCESS: int;
  /** Static memory currently used, in bytes. Not available in release builds. *Lower is better.* */
  readonly MEMORY_STATIC: int;
  /** Available static memory. Not available in release builds. *Lower is better.* */
  readonly MEMORY_STATIC_MAX: int;
  /**
   * Largest amount of memory the message queue buffer has used, in bytes. The message queue is used for deferred functions calls and notifications. *Lower is better.*
   */
  readonly MEMORY_MESSAGE_BUFFER_MAX: int;
  /** Number of objects currently instantiated (including nodes). *Lower is better.* */
  readonly OBJECT_COUNT: int;
  /** Number of resources currently used. *Lower is better.* */
  readonly OBJECT_RESOURCE_COUNT: int;
  /**
   * Number of nodes currently instantiated in the scene tree. This also includes the root node. *Lower is better.*
   */
  readonly OBJECT_NODE_COUNT: int;
  /**
   * Number of orphan nodes, i.e. nodes which are not parented to a node of the scene tree. *Lower is better.*
   * **Note:** This is only available in debug mode and will always return `0` when used in a project exported in release mode.
   */
  readonly OBJECT_ORPHAN_NODE_COUNT: int;
  /**
   * The total number of objects in the last rendered frame. This metric doesn't include culled objects (either via hiding nodes, frustum culling or occlusion culling). *Lower is better.*
   */
  readonly RENDER_TOTAL_OBJECTS_IN_FRAME: int;
  /**
   * The total number of vertices or indices rendered in the last rendered frame. This metric doesn't include primitives from culled objects (either via hiding nodes, frustum culling or occlusion culling). Due to the depth prepass and shadow passes, the number of primitives is always higher than the actual number of vertices in the scene (typically double or triple the original vertex count). *Lower is better.*
   */
  readonly RENDER_TOTAL_PRIMITIVES_IN_FRAME: int;
  /**
   * The total number of draw calls performed in the last rendered frame. This metric doesn't include culled objects (either via hiding nodes, frustum culling or occlusion culling), since they do not result in draw calls. *Lower is better.*
   */
  readonly RENDER_TOTAL_DRAW_CALLS_IN_FRAME: int;
  /**
   * The amount of video memory used (texture and vertex memory combined, in bytes). Since this metric also includes miscellaneous allocations, this value is always greater than the sum of {@link RENDER_TEXTURE_MEM_USED} and {@link RENDER_BUFFER_MEM_USED}. *Lower is better.*
   */
  readonly RENDER_VIDEO_MEM_USED: int;
  /** The amount of texture memory used (in bytes). *Lower is better.* */
  readonly RENDER_TEXTURE_MEM_USED: int;
  /** The amount of render buffer memory used (in bytes). *Lower is better.* */
  readonly RENDER_BUFFER_MEM_USED: int;
  /** Number of active {@link RigidBody2D} nodes in the game. *Lower is better.* */
  readonly PHYSICS_2D_ACTIVE_OBJECTS: int;
  /** Number of collision pairs in the 2D physics engine. *Lower is better.* */
  readonly PHYSICS_2D_COLLISION_PAIRS: int;
  /** Number of islands in the 2D physics engine. *Lower is better.* */
  readonly PHYSICS_2D_ISLAND_COUNT: int;
  /**
   * Number of active {@link RigidBody3D} and {@link VehicleBody3D} nodes in the game. *Lower is better.*
   */
  readonly PHYSICS_3D_ACTIVE_OBJECTS: int;
  /** Number of collision pairs in the 3D physics engine. *Lower is better.* */
  readonly PHYSICS_3D_COLLISION_PAIRS: int;
  /** Number of islands in the 3D physics engine. *Lower is better.* */
  readonly PHYSICS_3D_ISLAND_COUNT: int;
  /**
   * Output latency of the {@link AudioServer}. Equivalent to calling {@link AudioServer.get_output_latency}, it is not recommended to call this every frame.
   */
  readonly AUDIO_OUTPUT_LATENCY: int;
  /**
   * Number of active navigation maps in {@link NavigationServer2D} and {@link NavigationServer3D}. This also includes the empty default navigation maps created by {@link World2D} and {@link World3D} instances.
   */
  readonly NAVIGATION_ACTIVE_MAPS: int;
  /** Number of active navigation regions in {@link NavigationServer2D} and {@link NavigationServer3D}. */
  readonly NAVIGATION_REGION_COUNT: int;
  /**
   * Number of active navigation agents processing avoidance in {@link NavigationServer2D} and {@link NavigationServer3D}.
   */
  readonly NAVIGATION_AGENT_COUNT: int;
  /** Number of active navigation links in {@link NavigationServer2D} and {@link NavigationServer3D}. */
  readonly NAVIGATION_LINK_COUNT: int;
  /** Number of navigation mesh polygons in {@link NavigationServer2D} and {@link NavigationServer3D}. */
  readonly NAVIGATION_POLYGON_COUNT: int;
  /**
   * Number of navigation mesh polygon edges in {@link NavigationServer2D} and {@link NavigationServer3D}.
   */
  readonly NAVIGATION_EDGE_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in {@link NavigationServer2D} and {@link NavigationServer3D}.
   */
  readonly NAVIGATION_EDGE_MERGE_COUNT: int;
  /**
   * Number of polygon edges that are considered connected by edge proximity {@link NavigationServer2D} and {@link NavigationServer3D}.
   */
  readonly NAVIGATION_EDGE_CONNECTION_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that could not be merged in {@link NavigationServer2D} and {@link NavigationServer3D}. The edges still may be connected by edge proximity or with links.
   */
  readonly NAVIGATION_EDGE_FREE_COUNT: int;
  /**
   * Number of active navigation obstacles in the {@link NavigationServer2D} and {@link NavigationServer3D}.
   */
  readonly NAVIGATION_OBSTACLE_COUNT: int;
  /** Number of pipeline compilations that were triggered by the 2D canvas renderer. */
  readonly PIPELINE_COMPILATIONS_CANVAS: int;
  /**
   * Number of pipeline compilations that were triggered by loading meshes. These compilations will show up as longer loading times the first time a user runs the game and the pipeline is required.
   */
  readonly PIPELINE_COMPILATIONS_MESH: int;
  /**
   * Number of pipeline compilations that were triggered by building the surface cache before rendering the scene. These compilations will show up as a stutter when loading a scene the first time a user runs the game and the pipeline is required.
   */
  readonly PIPELINE_COMPILATIONS_SURFACE: int;
  /**
   * Number of pipeline compilations that were triggered while drawing the scene. These compilations will show up as stutters during gameplay the first time a user runs the game and the pipeline is required.
   */
  readonly PIPELINE_COMPILATIONS_DRAW: int;
  /**
   * Number of pipeline compilations that were triggered to optimize the current scene. These compilations are done in the background and should not cause any stutters whatsoever.
   */
  readonly PIPELINE_COMPILATIONS_SPECIALIZATION: int;
  /**
   * Number of active navigation maps in the {@link NavigationServer2D}. This also includes the empty default navigation maps created by {@link World2D} instances.
   */
  readonly NAVIGATION_2D_ACTIVE_MAPS: int;
  /** Number of active navigation regions in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_REGION_COUNT: int;
  /** Number of active navigation agents processing avoidance in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_AGENT_COUNT: int;
  /** Number of active navigation links in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_LINK_COUNT: int;
  /** Number of navigation mesh polygons in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_POLYGON_COUNT: int;
  /** Number of navigation mesh polygon edges in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_EDGE_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in the {@link NavigationServer2D}.
   */
  readonly NAVIGATION_2D_EDGE_MERGE_COUNT: int;
  /** Number of polygon edges that are considered connected by edge proximity {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_EDGE_CONNECTION_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that could not be merged in the {@link NavigationServer2D}. The edges still may be connected by edge proximity or with links.
   */
  readonly NAVIGATION_2D_EDGE_FREE_COUNT: int;
  /** Number of active navigation obstacles in the {@link NavigationServer2D}. */
  readonly NAVIGATION_2D_OBSTACLE_COUNT: int;
  /**
   * Number of active navigation maps in the {@link NavigationServer3D}. This also includes the empty default navigation maps created by {@link World3D} instances.
   */
  readonly NAVIGATION_3D_ACTIVE_MAPS: int;
  /** Number of active navigation regions in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_REGION_COUNT: int;
  /** Number of active navigation agents processing avoidance in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_AGENT_COUNT: int;
  /** Number of active navigation links in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_LINK_COUNT: int;
  /** Number of navigation mesh polygons in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_POLYGON_COUNT: int;
  /** Number of navigation mesh polygon edges in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_EDGE_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that were merged due to edge key overlap in the {@link NavigationServer3D}.
   */
  readonly NAVIGATION_3D_EDGE_MERGE_COUNT: int;
  /** Number of polygon edges that are considered connected by edge proximity {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_EDGE_CONNECTION_COUNT: int;
  /**
   * Number of navigation mesh polygon edges that could not be merged in the {@link NavigationServer3D}. The edges still may be connected by edge proximity or with links.
   */
  readonly NAVIGATION_3D_EDGE_FREE_COUNT: int;
  /** Number of active navigation obstacles in the {@link NavigationServer3D}. */
  readonly NAVIGATION_3D_OBSTACLE_COUNT: int;
  /** Represents the size of the {@link Monitor} enum. */
  readonly MONITOR_MAX: int;
  // enum MonitorType
  /** Monitor output is formatted as an integer value. */
  readonly MONITOR_TYPE_QUANTITY: int;
  /**
   * Monitor output is formatted as computer memory. Submitted values should represent a number of bytes.
   */
  readonly MONITOR_TYPE_MEMORY: int;
  /**
   * Monitor output is formatted as time in milliseconds. Submitted values should represent a time in seconds (not milliseconds).
   */
  readonly MONITOR_TYPE_TIME: int;
  /**
   * Monitor output is formatted as a percentage. Submitted values should represent a fractional value rather than the percentage directly, e.g. `0.5` for `50.00%`.
   */
  readonly MONITOR_TYPE_PERCENTAGE: int;
}
declare const Performance: Performance;

