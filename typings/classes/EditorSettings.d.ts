// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Object that holds the project-independent editor settings. */
declare class EditorSettings extends Resource {
  /**
   * If `true`, the Asset Library uses multiple threads for its HTTP requests. This prevents the Asset Library from blocking the main thread for every loaded asset.
   */
  'asset_library/use_threads': boolean;
  /**
   * If `true`, automatically switches to the **Remote** scene tree when running the project from the editor. If `false`, stays on the **Local** scene tree when running the project from the editor.
   * **Warning:** Enabling this setting can cause stuttering when running a project with a large amount of nodes (typically a few thousands of nodes or more), even if the editor window isn't focused. This is due to the remote scene tree being updated every second regardless of whether the editor is focused.
   */
  'debugger/auto_switch_to_remote_scene_tree': boolean;
  /**
   * If `true`, automatically switches to the **Stack Trace** panel when the debugger hits a breakpoint or steps.
   */
  'debugger/auto_switch_to_stack_trace': boolean;
  /**
   * The limit of how many remote nodes can be selected at once.
   * **Warning:** Increasing this value is not recommended, as selecting too many can make the editing and inspection of remote properties unreliable.
   */
  'debugger/max_node_selection': int;
  /**
   * If `true`, enables collection of profiling data from non-GDScript Godot functions, such as engine class methods. Enabling this slows execution while profiling further.
   */
  'debugger/profile_native_calls': boolean;
  /**
   * The size of the profiler's frame history. The default value (3600) allows seeing up to 60 seconds of profiling if the project renders at a constant 60 FPS. Higher values allow viewing longer periods of profiling in the graphs, especially when the project is running at high framerates.
   */
  'debugger/profiler_frame_history_size': int;
  /**
   * The maximum number of script functions that can be displayed per frame in the profiler. If there are more script functions called in a given profiler frame, these functions will be discarded from the profiling results entirely.
   * **Note:** This setting is only read when the profiler is first started, so changing it during profiling will have no effect.
   */
  'debugger/profiler_frame_max_functions': int;
  /** The target frame rate shown in the visual profiler graph, in frames per second. */
  'debugger/profiler_target_fps': int;
  /**
   * The refresh interval for the remote inspector's properties (in seconds). Lower values are more reactive, but may cause stuttering while the project is running from the editor and the **Remote** scene tree is selected in the Scene tree dock.
   */
  'debugger/remote_inspect_refresh_interval': float;
  /**
   * The refresh interval for the remote scene tree (in seconds). Lower values are more reactive, but may cause stuttering while the project is running from the editor and the **Remote** scene tree is selected in the Scene tree dock.
   */
  'debugger/remote_scene_tree_refresh_interval': float;
  /**
   * If `true`, displays folders in the FileSystem dock's bottom pane when split mode is enabled. If `false`, only files will be displayed in the bottom pane. Split mode can be toggled by pressing the icon next to the `res://` folder path.
   * **Note:** This setting has no effect when split mode is disabled (which is the default).
   */
  'docks/filesystem/always_show_folders': boolean;
  /** If `true`, scripts created in FileSystem dock will be automatically edited. */
  'docks/filesystem/automatically_open_created_scripts': boolean;
  /**
   * A comma separated list of unsupported file extensions to show in the FileSystem dock, e.g. `"ico,icns"`.
   */
  'docks/filesystem/other_file_extensions': string;
  /**
   * A comma separated list of file extensions to consider as editable text files in the FileSystem dock (by double-clicking on the files), e.g. `"txt,md,cfg,ini,log,json,yml,yaml,toml,xml"`.
   */
  'docks/filesystem/textfile_extensions': string;
  /**
   * The thumbnail size to use in the FileSystem dock (in pixels). See also {@link filesystem/file_dialog/thumbnail_size}.
   */
  'docks/filesystem/thumbnail_size': int;
  /**
   * The refresh interval to use for the Inspector dock's properties. The effect of this setting is mainly noticeable when adjusting gizmos in the 2D/3D editor and looking at the inspector at the same time. Lower values make the inspector refresh more often, but take up more CPU time.
   */
  'docks/property_editor/auto_refresh_interval': float;
  /**
   * The tint intensity to use for the subresources background in the Inspector dock. The tint is used to distinguish between different subresources in the inspector. Higher values result in a more noticeable background color difference.
   */
  'docks/property_editor/subresource_hue_tint': float;
  /** If `true`, accessibility related warnings are displayed alongside other configuration warnings. */
  'docks/scene_tree/accessibility_warnings': boolean;
  /**
   * If `true`, when a node is deleted with animation tracks referencing it, a confirmation dialog appears before the tracks are deleted. The dialog will appear even when using the "Delete (No Confirm)" shortcut.
   */
  'docks/scene_tree/ask_before_deleting_related_animation_tracks': boolean;
  /**
   * If `true`, displays a confirmation dialog after left-clicking the "percent" icon next to a node name in the Scene tree dock. When clicked, this icon revokes the node's scene-unique name, which can impact the behavior of scripts that rely on this scene-unique name due to identifiers not being found anymore.
   */
  'docks/scene_tree/ask_before_revoking_unique_name': boolean;
  /**
   * If `true`, the scene tree dock will automatically unfold nodes when a node that has folded parents is selected.
   */
  'docks/scene_tree/auto_expand_to_selected': boolean;
  /**
   * If `true`, new node created when reparenting node(s) will be positioned at the average position of the selected node(s).
   */
  'docks/scene_tree/center_node_on_reparent': boolean;
  /**
   * If `true`, the scene tree dock will only show nodes that match the filter, without showing parents that don't. This settings can also be changed in the Scene dock's top menu.
   */
  'docks/scene_tree/hide_filtered_out_parents': boolean;
  /**
   * If `true`, the Create dialog (Create New Node/Create New Resource) will start with all its sections expanded. Otherwise, sections will be collapsed until the user starts searching (which will automatically expand sections as needed).
   */
  'docks/scene_tree/start_create_dialog_fully_expanded': boolean;
  /** Delay time for automatic resampling in the 2D editor (in seconds). */
  'editors/2d/auto_resample_delay': float;
  /** The "start" stop of the color gradient to use for bones in the 2D skeleton editor. */
  'editors/2d/bone_color1': Color;
  /** The "end" stop of the color gradient to use for bones in the 2D skeleton editor. */
  'editors/2d/bone_color2': Color;
  /** The color to use for inverse kinematics-enabled bones in the 2D skeleton editor. */
  'editors/2d/bone_ik_color': Color;
  /**
   * The outline color to use for non-selected bones in the 2D skeleton editor. See also {@link editors/2d/bone_selected_color}.
   */
  'editors/2d/bone_outline_color': Color;
  /**
   * The outline size in the 2D skeleton editor (in pixels). See also {@link editors/2d/bone_width}.
   * **Note:** Changes to this value only apply after modifying a {@link Bone2D} node in any way, or closing and reopening the scene.
   */
  'editors/2d/bone_outline_size': float;
  /**
   * The color to use for selected bones in the 2D skeleton editor. See also {@link editors/2d/bone_outline_color}.
   */
  'editors/2d/bone_selected_color': Color;
  /**
   * The bone width in the 2D skeleton editor (in pixels). See also {@link editors/2d/bone_outline_size}.
   * **Note:** Changes to this value only apply after modifying a {@link Bone2D} node in any way, or closing and reopening the scene.
   */
  'editors/2d/bone_width': float;
  /** The grid color to use in the 2D editor. */
  'editors/2d/grid_color': Color;
  /**
   * The guides color to use in the 2D editor. Guides can be created by dragging the mouse cursor from the rulers.
   */
  'editors/2d/guides_color': Color;
  /**
   * The color to use for the selection rectangle that surrounds selected locked nodes in the 2D editor viewport.
   */
  'editors/2d/locked_selection_rectangle_color': Color;
  /**
   * The thickness of the coordinate ruler in the 2D editor. Increasing this will also increase the size of the ruler font, improving readability when using a lower editor scale. The editor may force a minimum size to keep the ruler numbers legible.
   */
  'editors/2d/ruler_width': float;
  /**
   * The color to use for the selection rectangle outlines that surrounds selected nodes in the 2D editor viewport.
   */
  'editors/2d/selection_rectangle_color': Color;
  /**
   * The color to use when drawing smart snapping lines in the 2D editor. The smart snapping lines will automatically display when moving 2D nodes if smart snapping is enabled in the Snapping Options menu at the top of the 2D editor viewport.
   */
  'editors/2d/smart_snapping_line_color': Color;
  /**
   * If `true`, the 2D editor will snap to integer zoom values when not holding the `Alt` key. If `false`, this behavior is swapped.
   */
  'editors/2d/use_integer_zoom_by_default': boolean;
  /**
   * The color of the viewport border in the 2D editor. This border represents the viewport's size at the base resolution defined in the Project Settings. Objects placed outside this border will not be visible unless a {@link Camera2D} node is used, or unless the window is resized and the stretch mode is set to `disabled`.
   */
  'editors/2d/viewport_border_color': Color;
  /**
   * The factor to use when zooming in or out in the 2D editor. For example, `1.1` will zoom in by 10% with every step. If set to `2.0`, zooming will only cycle through powers of two.
   */
  'editors/2d/zoom_speed_factor': float;
  /**
   * The color to use for the active selection box that surrounds selected nodes in the 3D editor viewport.
   * **Note:** The term "active" indicates that this object is the primary selection used as the basis for certain operations. This is the last selected {@link Node3D}, which can be reordered with `Shift + Left mouse button`.
   */
  'editors/3d/active_selection_box_color': Color;
  /**
   * The default camera vertical field of view to use in the 3D editor (in degrees). The camera field of view can be adjusted on a per-scene basis using the **View** menu at the top of the 3D editor. If a scene had its camera field of view adjusted using the **View** menu, this setting is ignored in the scene in question. This setting is also ignored while a {@link Camera3D} node is being previewed in the editor.
   * **Note:** The editor camera always uses the **Keep Height** aspect mode.
   */
  'editors/3d/default_fov': float;
  /**
   * The default camera far clip distance to use in the 3D editor (in degrees). Higher values make it possible to view objects placed further away from the camera, at the cost of lower precision in the depth buffer (which can result in visible Z-fighting in the distance). The camera far clip distance can be adjusted on a per-scene basis using the **View** menu at the top of the 3D editor. If a scene had its camera far clip distance adjusted using the **View** menu, this setting is ignored in the scene in question. This setting is also ignored while a {@link Camera3D} node is being previewed in the editor.
   */
  'editors/3d/default_z_far': float;
  /**
   * The default camera near clip distance to use in the 3D editor (in degrees). Lower values make it possible to view objects placed closer to the camera, at the cost of lower precision in the depth buffer (which can result in visible Z-fighting in the distance). The camera near clip distance can be adjusted on a per-scene basis using the **View** menu at the top of the 3D editor. If a scene had its camera near clip distance adjusted using the **View** menu, this setting is ignored in the scene in question. This setting is also ignored while a {@link Camera3D} node is being previewed in the editor.
   */
  'editors/3d/default_z_near': float;
  /**
   * The modifier key to use to enable freelook in the 3D editor (on top of pressing the right mouse button).
   * **Note:** Regardless of this setting, the freelook toggle keyboard shortcut (`Shift + F` by default) is always available.
   * **Note:** On certain window managers on Linux, the `Alt` key will be intercepted by the window manager when clicking a mouse button at the same time. This means Godot will not see the modifier key as being pressed.
   */
  'editors/3d/freelook/freelook_activation_modifier': int;
  /**
   * The base 3D freelook speed in units per second. This can be adjusted by using the mouse wheel while in freelook mode, or by holding down the "fast" or "slow" modifier keys (`Shift` and `Alt` by default, respectively).
   */
  'editors/3d/freelook/freelook_base_speed': float;
  /**
   * The inertia of the 3D freelook camera. Higher values make the camera start and stop slower, which looks smoother but adds latency.
   */
  'editors/3d/freelook/freelook_inertia': float;
  /** If `true`, invert the vertical mouse axis when using freelook mode in the 3D editor. */
  'editors/3d/freelook/freelook_invert_y_axis': boolean;
  /**
   * The navigation scheme to use when freelook is enabled in the 3D editor. Some of the navigation schemes below may be more convenient when designing specific levels in the 3D editor.
   * - **Default:** The "Freelook Forward", "Freelook Backward", "Freelook Up" and "Freelook Down" keys will move relative to the camera, taking its pitch angle into account for the movement.
   * - **Partially Axis-Locked:** The "Freelook Forward" and "Freelook Backward" keys will move relative to the camera, taking its pitch angle into account for the movement. The "Freelook Up" and "Freelook Down" keys will move in an "absolute" manner, *not* taking the camera's pitch angle into account for the movement.
   * - **Fully Axis-Locked:** The "Freelook Forward", "Freelook Backward", "Freelook Up" and "Freelook Down" keys will move in an "absolute" manner, *not* taking the camera's pitch angle into account for the movement.
   * See also {@link editors/3d/navigation/navigation_scheme}.
   */
  'editors/3d/freelook/freelook_navigation_scheme': int;
  /**
   * The mouse sensitivity to use while freelook mode is active in the 3D editor. See also {@link editors/3d/navigation_feel/orbit_sensitivity}.
   */
  'editors/3d/freelook/freelook_sensitivity': float;
  /**
   * If `true`, freelook speed is linked to the zoom value used in the camera orbit mode in the 3D editor.
   */
  'editors/3d/freelook/freelook_speed_zoom_link': boolean;
  /**
   * The grid division bias to use in the 3D editor. Negative values will cause small grid divisions to appear earlier, whereas positive values will cause small grid divisions to appear later.
   */
  'editors/3d/grid_division_level_bias': float;
  /**
   * The largest grid division to use in the 3D editor. Together with {@link editors/3d/primary_grid_steps}, this determines how large the grid divisions can be. The grid divisions will not be able to get larger than `primary_grid_steps ^ grid_division_level_max` units. By default, when {@link editors/3d/primary_grid_steps} is `8`, this means grid divisions cannot get larger than `64` units each (so primary grid lines are `512` units apart), no matter how far away the camera is from the grid.
   */
  'editors/3d/grid_division_level_max': int;
  /**
   * The smallest grid division to use in the 3D editor. Together with {@link editors/3d/primary_grid_steps}, this determines how small the grid divisions can be. The grid divisions will not be able to get smaller than `primary_grid_steps ^ grid_division_level_min` units. By default, this means grid divisions cannot get smaller than 1 unit each, no matter how close the camera is from the grid.
   */
  'editors/3d/grid_division_level_min': int;
  /**
   * The grid size in units. Higher values prevent the grid from appearing "cut off" at certain angles, but make the grid more demanding to render. Depending on the camera's position, the grid may not be fully visible since a shader is used to fade it progressively.
   */
  'editors/3d/grid_size': int;
  /**
   * If `true`, renders the grid on the XY plane in perspective view. This can be useful for 3D side-scrolling games.
   */
  'editors/3d/grid_xy_plane': boolean;
  /** If `true`, renders the grid on the XZ plane in perspective view. */
  'editors/3d/grid_xz_plane': boolean;
  /**
   * If `true`, renders the grid on the YZ plane in perspective view. This can be useful for 3D side-scrolling games.
   */
  'editors/3d/grid_yz_plane': boolean;
  /** Opacity of the default gizmo for moving, rotating, and scaling 3D nodes. */
  'editors/3d/manipulator_gizmo_opacity': float;
  /** Size of the default gizmo for moving, rotating, and scaling 3D nodes. */
  'editors/3d/manipulator_gizmo_size': int;
  /**
   * If `true`, enables 3-button mouse emulation mode. This is useful on laptops when using a trackpad.
   * When 3-button mouse emulation mode is enabled, the pan, zoom and orbit modifiers can always be used in the 3D editor viewport, even when not holding down any mouse button.
   */
  'editors/3d/navigation/emulate_3_button_mouse': boolean;
  /**
   * If `true`, allows using the top row `0`-`9` keys to function as their equivalent numpad keys for 3D editor navigation. This should be enabled on keyboards that have no numeric keypad available.
   */
  'editors/3d/navigation/emulate_numpad': boolean;
  /**
   * If `true`, invert the horizontal mouse axis when panning or orbiting in the 3D editor. This setting does *not* apply to freelook mode.
   */
  'editors/3d/navigation/invert_x_axis': boolean;
  /** If `true`, invert the vertical mouse axis when panning or orbiting in the 3D editor. */
  'editors/3d/navigation/invert_y_axis': boolean;
  /**
   * The navigation scheme preset to use in the 3D editor. Changing this setting will affect the mouse button and modifier keys used to navigate the 3D editor viewport.
   * All schemes can use `Mouse wheel` to zoom.
   * - **Godot:** `Middle mouse button` to orbit. `Shift + Middle mouse button` to pan. `Ctrl + Middle mouse button` to zoom.
   * - **Maya:** `Alt + Left mouse button` to orbit. `Middle mouse button` to pan, `Shift + Middle mouse button` to pan 10 times faster. `Alt + Right mouse button` to zoom.
   * - **Modo:** `Alt + Left mouse button` to orbit. `Alt + Shift + Left mouse button` to pan. `Ctrl + Alt + Left mouse button` to zoom.
   * - **Tablet/Trackpad:** `Alt` to orbit. `Shift` to pan. `Ctrl` to zoom. Enables 3-button mouse emulation mode.
   * See also {@link editors/3d/navigation/orbit_mouse_button}, {@link editors/3d/navigation/pan_mouse_button}, {@link editors/3d/navigation/zoom_mouse_button}, {@link editors/3d/freelook/freelook_navigation_scheme}, and {@link editors/3d/navigation/emulate_3_button_mouse}.
   * **Note:** On certain window managers on Linux, the `Alt` key will be intercepted by the window manager when clicking a mouse button at the same time. This means Godot will not see the modifier key as being pressed.
   */
  'editors/3d/navigation/navigation_scheme': int;
  /** The mouse button that needs to be held down to orbit in the 3D editor viewport. */
  'editors/3d/navigation/orbit_mouse_button': int;
  /** The mouse button that needs to be held down to pan in the 3D editor viewport. */
  'editors/3d/navigation/pan_mouse_button': int;
  /**
   * If `true`, shows gizmos for moving and rotating the camera in the bottom corners of the 3D editor's viewport. Useful for devices that use touch screen.
   */
  'editors/3d/navigation/show_viewport_navigation_gizmo': boolean;
  /** If `true`, shows a small orientation gizmo in the top-right corner of the 3D editor's viewports. */
  'editors/3d/navigation/show_viewport_rotation_gizmo': boolean;
  /**
   * If `true`, warps the mouse around the 3D viewport while panning in the 3D editor. This makes it possible to pan over a large area without having to exit panning and adjust the mouse cursor.
   */
  'editors/3d/navigation/warped_mouse_panning': boolean;
  /** The mouse button that needs to be held down to zoom in the 3D editor viewport. */
  'editors/3d/navigation/zoom_mouse_button': int;
  /**
   * The mouse cursor movement direction to use when zooming by moving the mouse. This does not affect zooming with the mouse wheel.
   */
  'editors/3d/navigation/zoom_style': int;
  /**
   * The angle threshold for snapping camera rotation to 45-degree angles while orbiting with `Alt` held.
   */
  'editors/3d/navigation_feel/angle_snap_threshold': float;
  /**
   * The inertia to use when orbiting in the 3D editor. Higher values make the camera start and stop slower, which looks smoother but adds latency.
   */
  'editors/3d/navigation_feel/orbit_inertia': float;
  /**
   * The mouse sensitivity to use when orbiting in the 3D editor. See also {@link editors/3d/freelook/freelook_sensitivity}.
   */
  'editors/3d/navigation_feel/orbit_sensitivity': float;
  /**
   * The inertia to use when panning in the 3D editor. Higher values make the camera start and stop slower, which looks smoother but adds latency.
   */
  'editors/3d/navigation_feel/translation_inertia': float;
  /** The mouse sensitivity to use when panning in the 3D editor. */
  'editors/3d/navigation_feel/translation_sensitivity': float;
  /**
   * The inertia to use when zooming in the 3D editor. Higher values make the camera start and stop slower, which looks smoother but adds latency.
   */
  'editors/3d/navigation_feel/zoom_inertia': float;
  /** The color to use for the primary 3D grid. The color's alpha channel affects the grid's opacity. */
  'editors/3d/primary_grid_color': Color;
  /**
   * If set above 0, where a primary grid line should be drawn. By default, primary lines are configured to be more visible than secondary lines. This helps with measurements in the 3D editor. See also {@link editors/3d/primary_grid_color} and {@link editors/3d/secondary_grid_color}.
   */
  'editors/3d/primary_grid_steps': int;
  /**
   * The color to use for the secondary 3D grid. This is generally a less visible color than {@link editors/3d/primary_grid_color}. The color's alpha channel affects the grid's opacity.
   */
  'editors/3d/secondary_grid_color': Color;
  /** The color to use for the selection box that surrounds selected nodes in the 3D editor viewport. */
  'editors/3d/selection_box_color': Color;
  /** If checked, the transform gizmo remains visible during rotation in that transform mode. */
  'editors/3d/show_gizmo_during_rotation': int;
  /**
   * The scale of the outer circle of the rotation gizmo as view plane rotation in the 3D editor. If set to `2.0`, the outer circle has twice the radius of the XYZ rotation gizmo sphere.
   */
  'editors/3d/view_plane_rotation_gizmo_scale': float;
  /**
   * The color to use for the AABB gizmo that displays the {@link GeometryInstance3D}'s custom {@link AABB}.
   */
  'editors/3d_gizmos/gizmo_colors/aabb': Color;
  /** The 3D editor gizmo color for {@link Camera3D}s. */
  'editors/3d_gizmos/gizmo_colors/camera': Color;
  /** The 3D editor gizmo color for CSG nodes (such as {@link CSGShape3D} or {@link CSGBox3D}). */
  'editors/3d_gizmos/gizmo_colors/csg': Color;
  /** The 3D editor gizmo color for {@link Decal} nodes. */
  'editors/3d_gizmos/gizmo_colors/decal': Color;
  /** The 3D editor gizmo color for {@link FogVolume} nodes. */
  'editors/3d_gizmos/gizmo_colors/fog_volume': Color;
  /** The 3D editor gizmo color for the {@link GridMap} grid. */
  'editors/3d_gizmos/gizmo_colors/gridmap_grid': Color;
  /** The 3D editor gizmo color for the {@link IKModifier3D} guides. */
  'editors/3d_gizmos/gizmo_colors/ik_chain': Color;
  /**
   * The color override to use for 3D editor gizmos if the {@link Node3D} in question is part of an instantiated scene file (from the perspective of the current scene).
   */
  'editors/3d_gizmos/gizmo_colors/instantiated': Color;
  /** The 3D editor gizmo color for {@link Joint3D}s and {@link PhysicalBone3D}s. */
  'editors/3d_gizmos/gizmo_colors/joint': Color;
  /** Color for representing {@link Joint3D.node_a} for some {@link Joint3D} types. */
  'editors/3d_gizmos/gizmo_colors/joint_body_a': Color;
  /** Color for representing {@link Joint3D.node_b} for some {@link Joint3D} types. */
  'editors/3d_gizmos/gizmo_colors/joint_body_b': Color;
  /** Color of lines displayed in baked {@link LightmapGI} node's grid. */
  'editors/3d_gizmos/gizmo_colors/lightmap_lines': Color;
  /** The 3D editor gizmo color used for {@link LightmapProbe} nodes. */
  'editors/3d_gizmos/gizmo_colors/lightprobe_lines': Color;
  /** The 3D editor gizmo color used for {@link OccluderInstance3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/occluder': Color;
  /** The 3D editor gizmo color used for {@link GPUParticlesAttractor3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/particle_attractor': Color;
  /** The 3D editor gizmo color used for {@link GPUParticlesCollision3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/particle_collision': Color;
  /** The 3D editor gizmo color used for {@link CPUParticles3D} and {@link GPUParticles3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/particles': Color;
  /**
   * The 3D editor gizmo color used for {@link Path3D} tilt circles, which indicate the direction the {@link Curve3D} is tilted towards.
   */
  'editors/3d_gizmos/gizmo_colors/path_tilt': Color;
  /** The 3D editor gizmo color used for {@link ReflectionProbe} nodes. */
  'editors/3d_gizmos/gizmo_colors/reflection_probe': Color;
  /** The 3D editor gizmo color used for the currently selected {@link Skeleton3D} bone. */
  'editors/3d_gizmos/gizmo_colors/selected_bone': Color;
  /** The 3D editor gizmo color used for {@link Skeleton3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/skeleton': Color;
  /** The 3D editor gizmo color used for {@link SpringBoneCollision3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/spring_bone_collision': Color;
  /** The 3D editor gizmo color used for {@link SpringBoneCollision3D} nodes with inside mode. */
  'editors/3d_gizmos/gizmo_colors/spring_bone_inside_collision': Color;
  /** The 3D editor gizmo color used for {@link SpringBoneSimulator3D} nodes. */
  'editors/3d_gizmos/gizmo_colors/spring_bone_joint': Color;
  /** The 3D editor gizmo color used for {@link AudioStreamPlayer3D}'s emission angle. */
  'editors/3d_gizmos/gizmo_colors/stream_player_3d': Color;
  /**
   * The 3D editor gizmo color used for {@link VisibleOnScreenNotifier3D} and {@link VisibleOnScreenEnabler3D} nodes.
   */
  'editors/3d_gizmos/gizmo_colors/visibility_notifier': Color;
  /** The 3D editor gizmo color used for {@link VoxelGI} nodes. */
  'editors/3d_gizmos/gizmo_colors/voxel_gi': Color;
  /** The length of {@link Skeleton3D} bone gizmos in the 3D editor. */
  'editors/3d_gizmos/gizmo_settings/bone_axis_length': float;
  /**
   * The shape of {@link Skeleton3D} bone gizmos in the 3D editor. **Wire** is a thin line, while **Octahedron** is a set of lines that represent a thicker hollow line pointing in a specific direction (similar to most 3D animation software).
   */
  'editors/3d_gizmos/gizmo_settings/bone_shape': int;
  /**
   * Size of probe gizmos displayed when editing {@link LightmapGI} and {@link LightmapProbe} nodes. Setting this to `0.0` will hide the probe spheres of {@link LightmapGI} and wireframes of {@link LightmapProbe} nodes, but will keep the wireframes linking probes from {@link LightmapGI} and billboard icons from {@link LightmapProbe} intact.
   */
  'editors/3d_gizmos/gizmo_settings/lightmap_gi_probe_size': float;
  /** Size of the disk gizmo displayed when editing {@link Path3D}'s tilt handles. */
  'editors/3d_gizmos/gizmo_settings/path3d_tilt_disk_size': float;
  /**
   * If `true`, collision shapes in the 3D editor are visible only when selected. If `false`, collision shapes are always visible.
   */
  'editors/3d_gizmos/gizmo_settings/show_collision_shapes_only_when_selected': boolean;
  /**
   * If `true`, automatically updates animation tracks' target paths when renaming or reparenting nodes in the Scene tree dock.
   */
  'editors/animation/autorename_animation_tracks': boolean;
  /**
   * If `true`, display a confirmation dialog when adding a new track to an animation by pressing the "key" icon next to a property. Holding Shift will bypass the dialog.
   * If `false`, the behavior is reversed, i.e. the dialog only appears when Shift is held.
   */
  'editors/animation/confirm_insert_track': boolean;
  /**
   * Default step used when creating a new {@link Animation} in the Animation bottom panel. Only affects the first animation created in the {@link AnimationPlayer}. By default, other newly created animations will use the step from the previous ones.
   * This value is always expressed in seconds. If you want e.g. `10` FPS to be the default, you need to set the default step to `0.1`.
   */
  'editors/animation/default_animation_step': float;
  /**
   * If `true`, create a Bezier track instead of a standard track when pressing the "key" icon next to a property. Bezier tracks provide more control over animation curves, but are more difficult to adjust quickly.
   */
  'editors/animation/default_create_bezier_tracks': boolean;
  /**
   * If `true`, create a `RESET` track when creating a new animation track. This track can be used to restore the animation to a "default" state.
   */
  'editors/animation/default_create_reset_tracks': boolean;
  /**
   * Controls whether {@link AnimationPlayer} will apply snapping to nearest integer FPS when snapping is in Seconds mode. The option is remembered locally for a scene and this option only determines the default value when scene doesn't have local state yet.
   */
  'editors/animation/default_fps_compatibility': boolean;
  /**
   * Default step mode for {@link AnimationPlayer} (seconds or FPS). The option is remembered locally for a scene and this option only determines the default value when scene doesn't have local state yet.
   */
  'editors/animation/default_fps_mode': int;
  /**
   * If `true`, animation keys and markers are inserted at the current time in the animation.
   * If `false`, they are inserted at the mouse cursor's position.
   */
  'editors/animation/insert_at_current_time': boolean;
  /**
   * The modulate color to use for "future" frames displayed in the animation editor's onion skinning feature.
   */
  'editors/animation/onion_layers_future_color': Color;
  /**
   * The modulate color to use for "past" frames displayed in the animation editor's onion skinning feature.
   */
  'editors/animation/onion_layers_past_color': Color;
  'editors/bone_mapper/handle_colors/error': Color;
  'editors/bone_mapper/handle_colors/missing': Color;
  'editors/bone_mapper/handle_colors/set': Color;
  'editors/bone_mapper/handle_colors/unset': Color;
  /**
   * The maximum distance at which tiles can be placed on a GridMap, relative to the camera position (in 3D units).
   */
  'editors/grid_map/pick_distance': float;
  /** Texture size of mesh previews generated for GridMap's MeshLibrary. */
  'editors/grid_map/preview_size': int;
  /**
   * The panning speed when using the mouse wheel or touchscreen events in the 2D editor. This setting does not apply to panning by holding down the middle or right mouse buttons.
   */
  'editors/panning/2d_editor_pan_speed': int;
  /**
   * Controls whether the mouse wheel scroll zooms or pans in the 2D editor. See also {@link editors/panning/sub_editors_panning_scheme} and {@link editors/panning/animation_editors_panning_scheme}.
   */
  'editors/panning/2d_editor_panning_scheme': int;
  /**
   * Controls whether the mouse wheel scroll zooms or pans in the animation track and Bezier editors. See also {@link editors/panning/2d_editor_panning_scheme} and {@link editors/panning/sub_editors_panning_scheme} (which controls the animation blend tree editor's pan behavior).
   */
  'editors/panning/animation_editors_panning_scheme': int;
  /**
   * If `true`, allows panning by holding down `Space` in the 2D editor viewport (in addition to panning with the middle or right mouse buttons). If `false`, the left mouse button must be held down while holding down `Space` to pan in the 2D editor viewport.
   */
  'editors/panning/simple_panning': boolean;
  /**
   * Controls whether the mouse wheel scroll zooms or pans in subeditors. The list of affected subeditors is: animation blend tree editor, {@link Polygon2D} editor, tileset editor, texture region editor and visual shader editor. See also {@link editors/panning/2d_editor_panning_scheme} and {@link editors/panning/animation_editors_panning_scheme}.
   */
  'editors/panning/sub_editors_panning_scheme': int;
  /**
   * If `true`, warps the mouse around the 2D viewport while panning in the 2D editor. This makes it possible to pan over a large area without having to exit panning and adjust the mouse cursor.
   */
  'editors/panning/warped_mouse_panning': boolean;
  /**
   * The mouse cursor movement direction to use when drag-zooming in any editor (except 3D scene editor) by moving the mouse. This does not affect zooming with the mouse wheel.
   */
  'editors/panning/zoom_style': int;
  /**
   * The delay in seconds until more complex and performance costly polygon editors commit their outlines, e.g. the 2D navigation polygon editor rebakes the navigation mesh polygons. A negative value stops the auto bake.
   */
  'editors/polygon_editor/auto_bake_delay': float;
  /**
   * The radius in which points can be selected in the {@link Polygon2D} and {@link CollisionPolygon2D} editors (in pixels). Higher values make it easier to select points quickly, but can make it more difficult to select the expected point when several points are located close to each other.
   */
  'editors/polygon_editor/point_grab_radius': int;
  /**
   * If `true`, displays the polygon's previous shape in the 2D polygon editors with an opaque gray outline. This outline is displayed while dragging a point until the left mouse button is released.
   */
  'editors/polygon_editor/show_previous_outline': boolean;
  /**
   * If `true`, reopens shader files that were open in the shader editor when the project was last closed.
   */
  'editors/shader_editor/behavior/files/restore_shaders_on_load': boolean;
  /**
   * If `true`, displays a grid while the TileMap editor is active. See also {@link editors/tiles_editor/grid_color}.
   */
  'editors/tiles_editor/display_grid': boolean;
  /**
   * The color to use for the TileMap editor's grid.
   * **Note:** Only effective if {@link editors/tiles_editor/display_grid} is `true`.
   */
  'editors/tiles_editor/grid_color': Color;
  /** Highlight the currently selected TileMapLayer by dimming the other ones in the scene. */
  'editors/tiles_editor/highlight_selected_layer': boolean;
  /** The color of a graph node's header when it belongs to the "Color" category. */
  'editors/visual_editors/category_colors/color_color': Color;
  /** The color of a graph node's header when it belongs to the "Conditional" category. */
  'editors/visual_editors/category_colors/conditional_color': Color;
  /** The color of a graph node's header when it belongs to the "Input" category. */
  'editors/visual_editors/category_colors/input_color': Color;
  /** The color of a graph node's header when it belongs to the "Output" category. */
  'editors/visual_editors/category_colors/output_color': Color;
  /** The color of a graph node's header when it belongs to the "Particle" category. */
  'editors/visual_editors/category_colors/particle_color': Color;
  /** The color of a graph node's header when it belongs to the "Scalar" category. */
  'editors/visual_editors/category_colors/scalar_color': Color;
  /** The color of a graph node's header when it belongs to the "Special" category. */
  'editors/visual_editors/category_colors/special_color': Color;
  /** The color of a graph node's header when it belongs to the "Textures" category. */
  'editors/visual_editors/category_colors/textures_color': Color;
  /** The color of a graph node's header when it belongs to the "Transform" category. */
  'editors/visual_editors/category_colors/transform_color': Color;
  /** The color of a graph node's header when it belongs to the "Utility" category. */
  'editors/visual_editors/category_colors/utility_color': Color;
  /** The color of a graph node's header when it belongs to the "Vector" category. */
  'editors/visual_editors/category_colors/vector_color': Color;
  /** The color theme to use in the visual shader editor. */
  'editors/visual_editors/color_theme': string;
  /** The color of a port/connection of boolean type. */
  'editors/visual_editors/connection_colors/boolean_color': Color;
  /** The color of a port/connection of sampler type. */
  'editors/visual_editors/connection_colors/sampler_color': Color;
  /** The color of a port/connection of scalar type (float, int, unsigned int). */
  'editors/visual_editors/connection_colors/scalar_color': Color;
  /** The color of a port/connection of transform type. */
  'editors/visual_editors/connection_colors/transform_color': Color;
  /** The color of a port/connection of Vector2 type. */
  'editors/visual_editors/connection_colors/vector2_color': Color;
  /** The color of a port/connection of Vector3 type. */
  'editors/visual_editors/connection_colors/vector3_color': Color;
  /** The color of a port/connection of Vector4 type. */
  'editors/visual_editors/connection_colors/vector4_color': Color;
  /** The pattern used for the background grid. */
  'editors/visual_editors/grid_pattern': int;
  /**
   * The curvature to use for connection lines in the visual shader editor. Higher values will make connection lines appear more curved, with values above `0.5` resulting in more "angular" turns in the middle of connection lines.
   */
  'editors/visual_editors/lines_curvature': float;
  /** The opacity of the minimap displayed in the bottom-right corner of the visual shader editor. */
  'editors/visual_editors/minimap_opacity': float;
  /**
   * The size to use for port previews in the visual shader uniforms (toggled by clicking the "eye" icon next to an output). The value is defined in pixels at 100% zoom, and will scale with zoom automatically.
   */
  'editors/visual_editors/visual_shader/port_preview_size': int;
  /**
   * Path to the SCP (secure copy) executable (used for remote deploy to desktop platforms). If left empty, the editor will attempt to run `scp` from `PATH`.
   * **Note:** SCP is not the same as SFTP. Specifying the SFTP executable here will not work.
   */
  'export/ssh/scp': string;
  /**
   * Path to the SSH executable (used for remote deploy to desktop platforms). If left empty, the editor will attempt to run `ssh` from `PATH`.
   */
  'export/ssh/ssh': string;
  /**
   * The folder where projects should be scanned for (recursively), in a way similar to the project manager's **Scan** button. This can be set to the same value as {@link filesystem/directories/default_project_path} for convenience.
   * **Note:** Setting this path to a folder with very large amounts of files/folders can slow down the project manager startup significantly. To keep the project manager quick to start up, it is recommended to set this value to a folder as "specific" as possible.
   */
  'filesystem/directories/autoscan_project_path': string;
  /**
   * The folder where new projects should be created by default when clicking the project manager's **New Project** button. This can be set to the same value as {@link filesystem/directories/autoscan_project_path} for convenience.
   */
  'filesystem/directories/default_project_path': string;
  /**
   * The program that opens 3D model scene files when clicking "Open in External Program" option in Filesystem Dock. If not specified, the file will be opened in the system's default program.
   */
  'filesystem/external_programs/3d_model_editor': string;
  /**
   * The program that opens audio files when clicking "Open in External Program" option in Filesystem Dock. If not specified, the file will be opened in the system's default program.
   */
  'filesystem/external_programs/audio_editor': string;
  /**
   * The program that opens raster image files when clicking "Open in External Program" option in Filesystem Dock. If not specified, the file will be opened in the system's default program.
   */
  'filesystem/external_programs/raster_image_editor': string;
  /**
   * The terminal emulator program to use when using **Open in Terminal** context menu action in the FileSystem dock. You can enter an absolute path to a program binary, or a path to a program that is present in the `PATH` environment variable.
   * If left empty, Godot will use the default terminal emulator for the system:
   * - **Windows:** PowerShell
   * - **macOS:** Terminal.app
   * - **Linux:** The first terminal found on the system in this order: gnome-terminal, konsole, xfce4-terminal, lxterminal, kitty, alacritty, urxvt, xterm.
   * To use Command Prompt (cmd) instead of PowerShell on Windows, enter `cmd` in this field and the correct flags will automatically be used.
   * On macOS, make sure to point to the actual program binary located within the `Programs/MacOS` folder of the .app bundle, rather than the .app bundle directory.
   * If specifying a custom terminal emulator, you may need to override {@link filesystem/external_programs/terminal_emulator_flags} so it opens in the correct folder.
   */
  'filesystem/external_programs/terminal_emulator': string;
  /**
   * The command-line arguments to pass to the terminal emulator that is run when using **Open in Terminal** context menu action in the FileSystem dock. See also {@link filesystem/external_programs/terminal_emulator}.
   * If left empty, the default flags are `{directory}`, which is replaced by the absolute path to the directory that is being opened in the terminal.
   * **Note:** If the terminal emulator is set to PowerShell, cmd, or Konsole, Godot will automatically prepend arguments to this list, as these terminals require nonstandard arguments to open in the correct folder.
   */
  'filesystem/external_programs/terminal_emulator_flags': string;
  /**
   * The program that opens vector image files when clicking "Open in External Program" option in Filesystem Dock. If not specified, the file will be opened in the system's default program.
   */
  'filesystem/external_programs/vector_image_editor': string;
  /**
   * The display mode to use in the editor's file dialogs.
   * - **Thumbnails** takes more space, but displays dynamic resource thumbnails, making resources easier to preview without having to open them.
   * - **List** is more compact but doesn't display dynamic resource thumbnails. Instead, it displays static icons based on the file extension.
   */
  'filesystem/file_dialog/display_mode': int;
  /**
   * If `true`, display hidden files in the editor's file dialogs. Files that have names starting with `.` are considered hidden (e.g. `.hidden_file`).
   */
  'filesystem/file_dialog/show_hidden_files': boolean;
  /**
   * The thumbnail size to use in the editor's file dialogs (in pixels). See also {@link docks/filesystem/thumbnail_size}.
   */
  'filesystem/file_dialog/thumbnail_size': int;
  /** Password used for file server when exporting project with remote file system. */
  'filesystem/file_server/password': string;
  /** Port used for file server when exporting project with remote file system. */
  'filesystem/file_server/port': int;
  /**
   * The path to the Blender executable used for converting the Blender 3D scene files `.blend` to glTF 2.0 format during import. Blender 3.0 or later is required.
   * To enable this feature for your specific project, use {@link ProjectSettings.filesystem/import/blender/enabled}.
   * If this setting is empty, Blender's default paths will be detected and used automatically if present in this order:
   * **Windows:**
   * [codeblock lang=text]
   * - C:\Program Files\Blender Foundation\blender.exe
   * - C:\Program Files (x86)\Blender Foundation\blender.exe
   * [/codeblock]
   * **macOS:**
   * [codeblock lang=text]
   * - /opt/homebrew/bin/blender
   * - /opt/local/bin/blender
   * - /usr/local/bin/blender
   * - /usr/local/opt/blender
   * - /Applications/Blender.app/Contents/MacOS/Blender
   * [/codeblock]
   * **Linux/*BSD:**
   * [codeblock lang=text]
   * - /usr/bin/blender
   * - /usr/local/bin/blender
   * - /opt/blender/bin/blender
   * [/codeblock]
   */
  'filesystem/import/blender/blender_path': string;
  /**
   * The port number used for Remote Procedure Call (RPC) communication with Godot's created process of the blender executable.
   * Setting this to 0 effectively disables communication with Godot and the blender process, making performance slower.
   */
  'filesystem/import/blender/rpc_port': int;
  /**
   * The maximum idle uptime (in seconds) of the Blender process.
   * This prevents Godot from having to create a new process for each import within the given seconds.
   */
  'filesystem/import/blender/rpc_server_uptime': float;
  /**
   * The path to the FBX2glTF executable used for converting Autodesk FBX 3D scene files `.fbx` to glTF 2.0 format during import.
   * To enable this feature for your specific project, use {@link ProjectSettings.filesystem/import/fbx2gltf/enabled}.
   */
  'filesystem/import/fbx/fbx2gltf_path': string;
  /** If `true`, uses lossless compression for binary resources. */
  'filesystem/on_save/compress_binary_resources': boolean;
  /**
   * If `true`, when saving a file, the editor will rename the old file to a different name, save a new file, then only remove the old file once the new file has been saved. This makes loss of data less likely to happen if the editor or operating system exits unexpectedly while saving (e.g. due to a crash or power outage).
   * **Note:** On Windows, this feature can interact negatively with certain antivirus programs. In this case, you may have to set this to `false` to prevent file locking issues.
   */
  'filesystem/on_save/safe_save_on_backup_then_rename': boolean;
  /**
   * If `true`, displays a warning toast message when saving a text-based scene or resource that is larger than 500 KiB on disk. This is typically caused by binary subresources being embedded as text, which results in slow and inefficient conversion to text. This in turn impacts scene saving and loading times.
   * This should usually be resolved by moving the embedded binary subresource to its own binary resource file (`.res` extension instead of `.tres`). This is the preferred approach. Alternatively, the entire scene can be saved with the binary `.scn` format as opposed to `.tscn`, but this will make it less friendly to version control systems.
   */
  'filesystem/on_save/warn_on_saving_large_text_resources': boolean;
  /**
   * If set to `Adaptive`, the dialog opens in list view or grid view depending on the requested type. If set to `Last Used`, the display mode will always open the way you last used it.
   */
  'filesystem/quick_open_dialog/default_display_mode': int;
  /**
   * If `true`, together with exact matches of a filename, the dialog includes approximate matches.
   * This is useful for finding the correct files even when there are typos in the search query; for example, searching "nprmal" will find "normal". Additionally, it allows you to write shorter search queries; for example, searching "nml" will also find "normal".
   * See also {@link filesystem/quick_open_dialog/max_fuzzy_misses}.
   */
  'filesystem/quick_open_dialog/enable_fuzzy_matching': boolean;
  /** If `true`, results will include files located in the `addons` folder. */
  'filesystem/quick_open_dialog/include_addons': boolean;
  /**
   * If `true`, highlighting a resource will preview it quickly without confirming the selection or closing the dialog.
   */
  'filesystem/quick_open_dialog/instant_preview': boolean;
  /**
   * The number of missed query characters allowed in a match when fuzzy matching is enabled. For example, with the default value of `2`, `"normal"` would match `"narmal"` and `"norma"` but not `"nor"`.
   */
  'filesystem/quick_open_dialog/max_fuzzy_misses': int;
  /** Maximum number of matches to show in dialog. */
  'filesystem/quick_open_dialog/max_results': int;
  /** If `true`, results will be highlighted with their search matches. */
  'filesystem/quick_open_dialog/show_search_highlight': boolean;
  /**
   * The path to the directory containing the Open Image Denoise (OIDN) executable, used optionally for denoising lightmaps. It can be downloaded from openimagedenoise.org (https://www.openimagedenoise.org/downloads.html).
   * To enable this feature for your specific project, use {@link ProjectSettings.rendering/lightmapping/denoising/denoiser}.
   */
  'filesystem/tools/oidn/oidn_denoise_path': string;
  /**
   * If `true`, input events will be flushed just before every idle and physics frame.
   * If `false`, these events will be flushed only once per process frame, between iterations of the engine.
   * Enabling this setting can greatly improve input responsiveness, especially in devices that struggle to run at the project's intended frame rate.
   */
  'input/buffering/agile_event_flushing': boolean;
  /**
   * If `true`, similar input events sent by the operating system are accumulated. When input accumulation is enabled, all input events generated during a frame will be merged and emitted when the frame is done rendering. Therefore, this limits the number of input method calls per second to the rendering FPS.
   * Input accumulation can be disabled to get slightly more precise/reactive input at the cost of increased CPU usage.
   * **Note:** Input accumulation is *enabled* by default.
   */
  'input/buffering/use_accumulated_input': boolean;
  /**
   * Editor accessibility support mode:
   * - **Auto** (`0`): Accessibility support is enabled, but updates to the accessibility information are processed only if an assistive app (such as a screen reader or a Braille display) is active (default).
   * - **Always Active** (`1`): Accessibility support is enabled, and updates to the accessibility information are always processed, regardless of the status of assistive apps.
   * - **Disabled** (`2`): Accessibility support is fully disabled.
   * **Note:** Accessibility debugging tools, such as Accessibility Insights for Windows, Accessibility Inspector (macOS), or AT-SPI Browser (Linux/BSD), do not count as assistive apps. To test the editor with these tools, use **Always Active**.
   */
  'interface/accessibility/accessibility_support': int;
  /**
   * How to position the Cancel and OK buttons in the editor's {@link AcceptDialog} windows. Different platforms have different conventions for this, which can be overridden through this setting to avoid accidental clicks when using Godot on multiple platforms.
   * - **Auto** follows the platform convention: OK first on Windows, KDE, and LXQt; Cancel first on macOS and other Linux desktop environments.
   * - **Cancel First** forces the Cancel/OK ordering.
   * - **OK First** forces the OK/Cancel ordering.
   * To check if these buttons are swapped at runtime, use {@link DisplayServer.get_swap_cancel_ok}.
   */
  'interface/editor/appearance/accept_dialog_cancel_ok_buttons': int;
  /**
   * If `true`, the main menu collapses into a {@link MenuButton}.
   * **Note:** This setting is only applicable on macOS when {@link interface/editor/appearance/use_embedded_menu} is `true`.
   * **Note:** Defaults to `true` on the Android editor.
   */
  'interface/editor/appearance/collapse_main_menu': boolean;
  /**
   * The custom editor scale factor to use. This can be used for displays with very high DPI where a scale factor of 200% is not sufficient.
   * **Note:** Only effective if {@link interface/editor/appearance/display_scale} is set to **Custom**.
   */
  'interface/editor/appearance/custom_display_scale': float;
  /**
   * The display scale factor to use for the editor interface. Higher values are more suited to hiDPI/Retina displays.
   * If set to **Auto**, the editor scale is automatically determined based on the screen resolution and reported display DPI. This heuristic is not always ideal, which means you can get better results by setting the editor scale manually.
   * If set to **Custom**, the scaling value in {@link interface/editor/appearance/custom_display_scale} will be used.
   */
  'interface/editor/appearance/display_scale': int;
  /**
   * The preferred monitor to display the editor. If **Auto**, the editor will remember the last screen it was displayed on across multiple sessions.
   */
  'interface/editor/appearance/editor_screen': int;
  /**
   * Expanding main editor window content to the title, if supported by {@link DisplayServer}. See {@link DisplayServer.WINDOW_FLAG_EXTEND_TO_TITLE}.
   * Specific to the macOS platform.
   */
  'interface/editor/appearance/expand_to_title': boolean;
  /** The preferred monitor to display the project manager. */
  'interface/editor/appearance/project_manager_screen': int;
  /**
   * If enabled, displays an icon in the top-right corner of the editor that spins when the editor redraws a frame. This can be used to diagnose situations where the engine is constantly redrawing, which should be avoided as this increases CPU and GPU utilization for no good reason. To further troubleshoot these situations, start the editor with the `--debug-canvas-item-redraw` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   * Consider enabling this if you are developing editor plugins to ensure they only make the editor redraw when required.
   * The default **Auto** value will only enable this if the editor was compiled with the `dev_build=yes` SCons option (the default is `dev_build=no`).
   * **Note:** If {@link interface/editor/display/update_continuously} is `true`, the spinner icon displays in red.
   * **Note:** If the editor was started with the `--debug-canvas-item-redraw` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html), the update spinner will *never* display regardless of this setting's value. This is to avoid confusion with what would cause redrawing in real world scenarios.
   */
  'interface/editor/appearance/show_update_spinner': int;
  /**
   * If `true`, editor main menu is using embedded {@link MenuBar} instead of system global menu.
   * Specific to the macOS platform.
   */
  'interface/editor/appearance/use_embedded_menu': boolean;
  /** If `true`, editor UI uses OS native file/directory selection dialogs. */
  'interface/editor/appearance/use_native_file_dialogs': boolean;
  /**
   * If `true`, automatically opens screenshots with the default program associated to `.png` files after a screenshot is taken using the **Editor > Take Screenshot** action.
   */
  'interface/editor/behavior/automatically_open_screenshots': boolean;
  /**
   * If `true`, (re)imports resources even if the editor window is unfocused or minimized. If `false`, resources are only (re)imported when the editor window is focused. This can be set to `true` to speed up iteration by starting the import process earlier when saving files in the project folder. This also allows getting visual feedback on changes without having to click the editor window, which is useful with multi-monitor setups. The downside of setting this to `true` is that it increases idle CPU usage and may steal CPU time from other applications when importing resources.
   */
  'interface/editor/behavior/import_resources_when_unfocused': boolean;
  /**
   * If `false`, the editor will save all scenes when confirming the **Save** action when quitting the editor or quitting to the project list. If `true`, the editor will ask to save each scene individually.
   */
  'interface/editor/behavior/save_each_scene_on_quit': boolean;
  /**
   * If `true`, scenes and scripts are saved when the editor loses focus. Depending on the work flow, this behavior can be less intrusive than {@link text_editor/behavior/files/autosave_interval_secs} or remembering to save manually.
   */
  'interface/editor/behavior/save_on_focus_loss': boolean;
  /**
   * If `true`, the editor's Script tab will have a separate distraction mode setting from the 2D/3D/Game/AssetLib tabs. If `false`, the distraction-free mode toggle is shared between all tabs.
   */
  'interface/editor/behavior/separate_distraction_mode': boolean;
  /**
   * If enabled, displays internal engine errors in toast notifications (toggleable by clicking the "bell" icon at the bottom of the editor). No matter the value of this setting, non-internal engine errors will always be visible in toast notifications.
   * The default **Auto** value will only enable this if the editor was compiled with the `dev_build=yes` SCons option (the default is `dev_build=no`).
   */
  'interface/editor/behavior/show_internal_errors_in_toast_notifications': int;
  /**
   * If `true`, keeps the screen on (even in case of inactivity), so the screensaver does not take over. Works on desktop and mobile platforms.
   */
  'interface/editor/display/keep_screen_on': boolean;
  /**
   * If `true`, embed modal windows such as docks inside the main editor window. When single-window mode is enabled, tooltips will also be embedded inside the main editor window, which means they can't be displayed outside of the editor window. Single-window mode can be faster as it does not need to create a separate window for every popup and tooltip, which can be a slow operation depending on the operating system and rendering method in use.
   * This is equivalent to {@link ProjectSettings.display/window/subwindows/embed_subwindows} in the running project, except the setting's value is inverted.
   * **Note:** To query whether the editor can use multiple windows in an editor plugin, use {@link EditorInterface.is_multi_window_enabled} instead of querying the value of this editor setting.
   * **Note:** If `true`, game embedding is disabled.
   */
  'interface/editor/display/single_window_mode': boolean;
  /**
   * If `true`, redraws the editor every frame even if nothing has changed on screen. When this setting is enabled, the update spinner displays in red (see {@link interface/editor/appearance/show_update_spinner}).
   * **Warning:** This greatly increases CPU and GPU utilization, leading to increased power usage. This should only be enabled for troubleshooting purposes.
   */
  'interface/editor/display/update_continuously': boolean;
  /**
   * Sets the V-Sync mode for the editor. Does not affect the project when run from the editor (this is controlled by {@link ProjectSettings.display/window/vsync/vsync_mode}).
   * Depending on the platform and used renderer, the engine will fall back to **Enabled** if the desired mode is not supported.
   * **Note:** V-Sync modes other than **Enabled** are only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   */
  'interface/editor/display/vsync_mode': int;
  /** Tab style of editor docks located at the bottom. */
  'interface/editor/docks/bottom_dock_tab_style': int;
  /** Tab style of editor docks, except bottom docks. */
  'interface/editor/docks/dock_tab_style': int;
  /**
   * The font to use for the script editor. Must be a resource of a {@link Font} type such as a `.ttf` or `.otf` font file.
   */
  'interface/editor/fonts/code_font': string;
  /**
   * The font ligatures to enable for the currently configured code font. Not all fonts include support for ligatures.
   * **Note:** The default editor code font (JetBrains Mono (https://www.jetbrains.com/lp/mono/)) has contextual ligatures in its font file.
   */
  'interface/editor/fonts/code_font_contextual_ligatures': int;
  /**
   * List of custom OpenType features to use, if supported by the currently configured code font. Not all fonts include support for custom OpenType features. The string should follow the OpenType specification.
   * **Note:** The default editor code font (JetBrains Mono (https://www.jetbrains.com/lp/mono/)) has custom OpenType features in its font file, but there is no documented list yet.
   */
  'interface/editor/fonts/code_font_custom_opentype_features': string;
  /**
   * List of alternative characters to use, if supported by the currently configured code font. Not all fonts include support for custom variations. The string should follow the OpenType specification.
   * **Note:** The default editor code font (JetBrains Mono (https://www.jetbrains.com/lp/mono/)) has alternate characters in its font file, but there is no documented list yet.
   */
  'interface/editor/fonts/code_font_custom_variations': string;
  /**
   * The size of the font in the script editor. This setting does not impact the font size of the Output panel (see {@link run/output/font_size}).
   */
  'interface/editor/fonts/code_font_size': int;
  /**
   * If set to `true`, MSDF font rendering will be used for the visual shader graph editor. You may need to set this to `false` when using a custom main font, as some fonts will look broken due to the use of self-intersecting outlines in their font data. Downloading the font from the font maker's official website as opposed to a service like Google Fonts can help resolve this issue.
   */
  'interface/editor/fonts/font_allow_msdf': boolean;
  /**
   * FreeType's font anti-aliasing mode used to render the editor fonts. Most fonts are not designed to look good with anti-aliasing disabled, so it's recommended to leave this enabled unless you're using a pixel art font.
   */
  'interface/editor/fonts/font_antialiasing': int;
  /**
   * If set to `true`, embedded font bitmap loading is disabled (bitmap-only and color fonts ignore this property).
   */
  'interface/editor/fonts/font_disable_embedded_bitmaps': boolean;
  /**
   * The font hinting mode to use for the editor fonts. FreeType supports the following font hinting modes:
   * - **None:** Don't use font hinting when rasterizing the font. This results in a smooth font, but it can look blurry.
   * - **Light:** Use hinting on the X axis only. This is a compromise between font sharpness and smoothness.
   * - **Normal:** Use hinting on both X and Y axes. This results in a sharp font, but it doesn't look very smooth.
   * If set to **Auto**, the font hinting mode will be set to match the current operating system in use. This means the **Light** hinting mode will be used on Windows and Linux, and the **None** hinting mode will be used on macOS.
   */
  'interface/editor/fonts/font_hinting': int;
  /**
   * The subpixel positioning mode to use when rendering editor font glyphs. This affects both the main and code fonts. **Disabled** is the fastest to render and uses the least memory. **Auto** only uses subpixel positioning for small font sizes (where the benefit is the most noticeable). **One Half of a Pixel** and **One Quarter of a Pixel** force the same subpixel positioning mode for all editor fonts, regardless of their size (with **One Quarter of a Pixel** being the highest-quality option).
   */
  'interface/editor/fonts/font_subpixel_positioning': int;
  /**
   * The font to use for the editor interface. Must be a resource of a {@link Font} type such as a `.ttf` or `.otf` font file.
   * **Note:** If the provided font is variable, a weight of 400 (normal) will be used.
   */
  'interface/editor/fonts/main_font': string;
  /**
   * The font to use for bold text in the editor interface. Must be a resource of a {@link Font} type such as a `.ttf` or `.otf` font file.
   * **Note:** If the provided font is variable, a weight of 700 (bold) will be used.
   */
  'interface/editor/fonts/main_font_bold': string;
  /**
   * List of custom OpenType features to use, if supported by the currently configured main font. Check what OpenType features are supported by your font first.
   * The string should follow the OpenType specification, e.g. `ss01,tnum,calt=false`. Microsoft's documentation contains a list of all registered features (https://learn.microsoft.com/en-us/typography/opentype/spec/featurelist).
   * **Note:** The default editor main font (Inter (https://rsms.me/inter)) has custom OpenType features in its font file, with `ss04` and `tnum` enabled and `calt` disabled by default. Supported features can be found at its website.
   */
  'interface/editor/fonts/main_font_custom_opentype_features': string;
  /** The size of the font in the editor interface. */
  'interface/editor/fonts/main_font_size': int;
  /**
   * If `true`, the mouse's additional side buttons will be usable to navigate in the script editor's file history. Set this to `false` if you're using the side buttons for other purposes (such as a push-to-talk button in a VoIP program).
   */
  'interface/editor/input/mouse_extra_buttons_navigate_history': boolean;
  /** Overrides the tablet driver used by the editor. */
  'interface/editor/input/tablet_driver': int;
  /**
   * The language to use for the editor interface. If set to **Auto**, the language is automatically determined based on the system locale. See also {@link EditorInterface.get_editor_language}.
   * Translations are provided by the community. If you spot a mistake, contribute to editor translations on Weblate! (https://contributing.godotengine.org/en/latest/documentation/translation/index.html)
   */
  'interface/editor/localization/editor_language': string;
  /**
   * If `true`, setting names in the editor are localized when possible.
   * **Note:** This setting affects most {@link EditorInspector}s in the editor UI, primarily Project Settings and Editor Settings. To control names displayed in the Inspector dock, use {@link interface/inspector/default_property_name_style} instead.
   */
  'interface/editor/localization/localize_settings': boolean;
  /** Editor UI default layout direction. */
  'interface/editor/localization/ui_layout_direction': int;
  /**
   * During a drag-and-drop, this is how long to wait over a UI element before it triggers a reaction (e.g. a section unfolds to show nested items).
   */
  'interface/editor/timers/dragging_hover_wait_seconds': float;
  /**
   * The amount of sleeping between frames in the editor (in microseconds). Higher values will result in lower CPU/GPU usage, which can improve battery life on laptops. However, higher values will result in a less responsive editor. The default value is set to allow for maximum smoothness on monitors up to 144 Hz. See also {@link interface/editor/timers/unfocused_low_processor_mode_sleep_usec}.
   * **Note:** This setting is ignored if {@link interface/editor/display/update_continuously} is `true`, as enabling that setting disables low-processor mode.
   */
  'interface/editor/timers/low_processor_mode_sleep_usec': int;
  /**
   * When the editor window is unfocused, the amount of sleeping between frames when the low-processor usage mode is enabled (in microseconds). Higher values will result in lower CPU/GPU usage, which can improve battery life on laptops (in addition to improving the running project's performance if the editor has to redraw continuously). However, higher values will result in a less responsive editor. The default value is set to limit the editor to 10 FPS when the editor window is unfocused. See also {@link interface/editor/timers/low_processor_mode_sleep_usec}.
   * **Note:** This setting is ignored if {@link interface/editor/display/update_continuously} is `true`, as enabling that setting disables low-processor mode.
   */
  'interface/editor/timers/unfocused_low_processor_mode_sleep_usec': int;
  /**
   * If `true`, when extending a script, the global class name of the script is inserted in the script creation dialog, if it exists. If `false`, the script's file path is always inserted.
   */
  'interface/editors/derive_script_globals_by_name': boolean;
  /**
   * If `true`, automatically unfolds Inspector property groups containing modified values when opening a scene for the first time. Only affects scenes without saved folding preferences and only unfolds groups with properties that have been changed from their default values.
   * **Note:** This setting only works in specific scenarios: when opening a scene brought in from another project, or when opening a new scene that already has modified properties (e.g., from version control). Duplicated scenes are not considered foreign, so this setting will not affect them.
   */
  'interface/inspector/auto_unfold_foreign_scenes': boolean;
  /** If `true`, show the intensity slider in the {@link ColorPicker}s opened in the editor. */
  'interface/inspector/color_picker_show_intensity': boolean;
  /**
   * The default color picker mode to use when opening {@link ColorPicker}s in the editor. This mode can be temporarily adjusted on the color picker itself.
   */
  'interface/inspector/default_color_picker_mode': int;
  /**
   * The default color picker shape to use when opening {@link ColorPicker}s in the editor. This shape can be temporarily adjusted on the color picker itself.
   */
  'interface/inspector/default_color_picker_shape': int;
  /**
   * The floating-point precision to use for properties that don't define an explicit precision step. Lower values allow entering more precise values.
   */
  'interface/inspector/default_float_step': float;
  /**
   * The default property name style to display in the Inspector dock. This style can be temporarily adjusted in the Inspector dock's menu.
   * - **Raw:** Displays properties in `snake_case`.
   * - **Capitalized:** Displays properties capitalized.
   * - **Localized:** Displays the localized string for the current editor language if a translation is available for the given property. If no translation is available, falls back to **Capitalized**.
   * **Note:** To display translated setting names in Project Settings and Editor Settings, use {@link interface/editor/localization/localize_settings} instead.
   */
  'interface/inspector/default_property_name_style': int;
  /**
   * If `true`, add a margin around Array, Dictionary, and Resource Editors that are not already colored.
   * **Note:** If {@link interface/inspector/nested_color_mode} is set to **Containers & Resources** this parameter will have no effect since those editors will already be colored.
   */
  'interface/inspector/delimitate_all_container_and_resources': boolean;
  /**
   * If `true`, forces all property groups to be expanded in the Inspector dock and prevents collapsing them.
   */
  'interface/inspector/disable_folding': boolean;
  /** Base speed for increasing/decreasing float values by dragging them in the inspector. */
  'interface/inspector/float_drag_speed': float;
  /**
   * If `true`, {@link Vector2} and {@link Vector2i} properties are shown on a single line in the inspector instead of two lines. This is overall more compact, but it can be harder to view and edit large values without expanding the inspector horizontally.
   */
  'interface/inspector/horizontal_vector2_editing': boolean;
  /**
   * If `true`, {@link Vector3}, {@link Vector3i}, {@link Vector4}, {@link Vector4i}, {@link Rect2}, {@link Rect2i}, {@link Plane}, and {@link Quaternion} properties are shown on a single line in the inspector instead of multiple lines. This is overall more compact, but it can be harder to view and edit large values without expanding the inspector horizontally.
   */
  'interface/inspector/horizontal_vector_types_editing': boolean;
  /** Base speed for increasing/decreasing integer values by dragging them in the inspector. */
  'interface/inspector/integer_drag_speed': float;
  /**
   * The number of {@link Array} or {@link Dictionary} items to display on each "page" in the inspector. Higher values allow viewing more values per page, but take more time to load. This increased load time is noticeable when selecting nodes that have array or dictionary properties in the editor.
   */
  'interface/inspector/max_array_dictionary_items_per_page': int;
  /**
   * Control which property editors are colored when they are opened.
   * - **Containers & Resources:** Color all Array, Dictionary, and Resource Editors.
   * - **Resources:** Color all Resource Editors.
   * - **External Resources:** Color Resource Editors that edits an external resource.
   */
  'interface/inspector/nested_color_mode': int;
  /**
   * If `true`, subresources can be edited in the current inspector view. If the resource type is defined in {@link interface/inspector/resources_to_open_in_new_inspector} or if this setting is `false`, attempting to edit a subresource always opens a new inspector view.
   */
  'interface/inspector/open_resources_in_current_inspector': boolean;
  /**
   * List of resources that should always be opened in a new inspector view, even if {@link interface/inspector/open_resources_in_current_inspector} is `true`.
   */
  'interface/inspector/resources_to_open_in_new_inspector': PackedStringArray;
  /**
   * If `true`, display OpenType features marked as `hidden` by the font file in the {@link Font} editor.
   */
  'interface/inspector/show_low_level_opentype_features': boolean;
  /**
   * If `true`, multiple window support in editor is enabled. The following panels can become dedicated windows (i.e. made floating): Docks, Script editor, Shader editor, and Game Workspace.
   * **Note:** When {@link interface/editor/display/single_window_mode} is `true`, the multi window support is always disabled.
   * **Note:** To query whether the editor can use multiple windows in an editor plugin, use {@link EditorInterface.is_multi_window_enabled} instead of querying the value of this editor setting.
   */
  'interface/multi_window/enable': boolean;
  /**
   * If `true`, when panels are made floating they will be maximized.
   * If `false`, when panels are made floating their position and size will match the ones when they are attached (excluding window border) to the editor window.
   */
  'interface/multi_window/maximize_window': boolean;
  /**
   * If `true`, the floating panel position, size, and screen will be saved on editor exit. On next launch the panels that were floating will be made floating in the saved positions, sizes and screens, if possible.
   */
  'interface/multi_window/restore_windows_on_load': boolean;
  /** If `true`, the FileSystem dock will automatically navigate to the currently selected scene tab. */
  'interface/scene_tabs/auto_select_current_scene_file': boolean;
  /** Controls when the Close (X) button is displayed on scene tabs at the top of the editor. */
  'interface/scene_tabs/display_close_button': int;
  /** The maximum width of each scene tab at the top editor (in pixels). */
  'interface/scene_tabs/maximum_width': int;
  /**
   * If `true`, when a project is loaded, restores scenes that were opened on the last editor session.
   * **Note:** With many opened scenes, the editor may take longer to become usable. If starting the editor quickly is necessary, consider setting this to `false`.
   */
  'interface/scene_tabs/restore_scenes_on_load': boolean;
  /**
   * If `true`, show a button next to each scene tab that opens the scene's "dominant" script when clicked. The "dominant" script is the one that is at the highest level in the scene's hierarchy.
   */
  'interface/scene_tabs/show_script_button': boolean;
  /**
   * If `true`, display an automatically-generated thumbnail when hovering scene tabs with the mouse. Scene thumbnails are generated when saving the scene.
   */
  'interface/scene_tabs/show_thumbnail_on_hover': boolean;
  /**
   * The color to use for "highlighted" user interface elements in the editor (pressed and hovered items).
   */
  'interface/theme/accent_color': Color;
  /**
   * The extra spacing to add to various GUI elements in the editor (in pixels). Increasing this value is useful to improve usability on touch screens, at the cost of reducing the amount of usable screen real estate.
   * See also {@link interface/theme/spacing_preset}.
   */
  'interface/theme/additional_spacing': int;
  /**
   * The base color to use for user interface elements in the editor. Secondary colors (such as darker/lighter variants) are derived from this color.
   */
  'interface/theme/base_color': Color;
  /**
   * The base spacing used by various GUI elements in the editor (in pixels). See also {@link interface/theme/spacing_preset}.
   */
  'interface/theme/base_spacing': int;
  /** The border size to use for interface elements (in pixels). */
  'interface/theme/border_size': int;
  /** The editor color preset to use. */
  'interface/theme/color_preset': string;
  /**
   * The contrast factor to use when deriving the editor theme's base color (see {@link interface/theme/base_color}). When using a positive values, the derived colors will be *darker* than the base color. This contrast factor can be set to a negative value, which will make the derived colors *brighter* than the base color. Negative contrast rates often look better for light themes.
   */
  'interface/theme/contrast': float;
  /** The corner radius to use for interface elements (in pixels). `0` is square. */
  'interface/theme/corner_radius': int;
  /**
   * The custom theme resource to use for the editor. Must be a Godot theme resource in `.tres` or `.res` format.
   */
  'interface/theme/custom_theme': string;
  /**
   * If `true`, draws additional borders around interactive UI elements in the editor. This is automatically enabled when using the **Black (OLED)** theme preset, as this theme preset uses a fully black background.
   */
  'interface/theme/draw_extra_borders': boolean;
  /**
   * What relationship lines to draw in the editor's {@link Tree}-based GUIs (such as the Scene tree dock).
   * - **None** will make it so that no relationship lines are drawn.
   * - **Selected Only** will only draw them for selected items.
   * - **All** will always draw them for all items.
   */
  'interface/theme/draw_relationship_lines': int;
  /** If `true`, the editor theme preset will attempt to automatically match the system theme. */
  'interface/theme/follow_system_theme': boolean;
  /**
   * The icon and font color scheme to use in the editor.
   * - **Auto** determines the color scheme to use automatically based on {@link interface/theme/base_color}.
   * - **Dark** makes fonts and icons dark (suitable for light themes). Icon colors are automatically converted by the editor following the set of rules defined in this file (https://github.com/godotengine/godot/blob/master/editor/themes/editor_theme_manager.cpp).
   * - **Light** makes fonts and icons light (suitable for dark themes).
   */
  'interface/theme/icon_and_font_color': int;
  /**
   * The saturation to use for editor icons. Higher values result in more vibrant colors.
   * **Note:** The default editor icon saturation was increased by 30% in Godot 4.0 and later. To get Godot 3.x's icon saturation back, set {@link interface/theme/icon_saturation} to `0.77`.
   */
  'interface/theme/icon_saturation': float;
  /**
   * The opacity to use when drawing relationship lines in the editor's {@link Tree}-based GUIs (such as the Scene tree dock).
   */
  'interface/theme/relationship_line_opacity': float;
  /**
   * The editor theme spacing preset to use. See also {@link interface/theme/base_spacing} and {@link interface/theme/additional_spacing}.
   */
  'interface/theme/spacing_preset': string;
  /** The editor theme style to use. */
  'interface/theme/style': string;
  /**
   * If `true`, use the monospace font for some labels in the editor that display code symbols, such as signals, properties, and methods.
   */
  'interface/theme/use_monospace_font_for_editor_symbols': boolean;
  /**
   * If `true`, set accent color based on system settings.
   * **Note:** This setting is effective on Windows, macOS, Linux, and Android.
   */
  'interface/theme/use_system_accent_color': boolean;
  /**
   * If `true`, long press on touchscreen is treated as right click.
   * **Note:** Defaults to `true` on touchscreen devices.
   */
  'interface/touchscreen/enable_long_press_as_right_click': boolean;
  /**
   * If `true`, enable two finger pan and scale gestures on touchscreen devices.
   * **Note:** Defaults to `true` on touchscreen devices.
   */
  'interface/touchscreen/enable_pan_and_scale_gestures': boolean;
  /**
   * If `true`, increases the scrollbar touch area, enables a larger dragger for split containers, and increases PopupMenu vertical separation to improve usability on touchscreen devices.
   * **Note:** Defaults to `true` on touchscreen devices.
   */
  'interface/touchscreen/enable_touch_optimizations': boolean;
  /**
   * Specify the multiplier to apply to the scale for the editor gizmo handles to improve usability on touchscreen devices.
   * **Note:** Defaults to `1` on non-touchscreen devices.
   */
  'interface/touchscreen/scale_gizmo_handles': float;
  /**
   * A touch-friendly panel that provides easy access to common actions such as save, delete, undo, and redo without requiring a keyboard.
   * **Note:** Only available in the Android and XR editor.
   */
  'interface/touchscreen/touch_actions_panel': int;
  /**
   * Specifies how the engine should check for updates.
   * - **Disable Update Checks** will block the engine from checking updates (see also {@link network/connection/network_mode}).
   * - **Auto** (default) will check for newest stable or unstable version, depending on which version are you currently using. Switch to another option if you want to lock in.
   * - **Check Newest Preview** will check for the newest available development snapshot.
   * - **Check Newest Stable** will check for the newest available stable version.
   * - **Check Newest Patch** will check for the latest available stable version, but only within the same minor version. E.g. if your version is `4.3.stable`, you will be notified about `4.3.1.stable`, but not `4.4.stable`.
   * All update modes will ignore builds with different major versions (e.g. Godot 4 -> Godot 5).
   */
  'network/connection/check_for_updates': int;
  /**
   * Determines whether online features, such as the Asset Library or update checks, are enabled in the editor. If this is a privacy concern, disabling these online features prevents the editor from making HTTP requests to the Godot website or third-party platforms hosting assets from the Asset Library.
   * Editor plugins and tool scripts are recommended to follow this setting. However, Godot can't prevent them from violating this rule.
   */
  'network/connection/network_mode': int;
  /**
   * The address to listen to when starting the remote debugger. This can be set to this device's local IP address to allow external clients to connect to the remote debugger (instead of restricting the remote debugger to connections from `localhost`).
   */
  'network/debug/remote_host': string;
  /**
   * The port to listen to when starting the remote debugger. Godot will try to use port numbers above the configured number if the configured number is already taken by another application.
   */
  'network/debug/remote_port': int;
  /**
   * The host to use to contact the HTTP and HTTPS proxy in the editor (for the asset library and export template downloads). See also {@link network/http_proxy/port}.
   * **Note:** Godot currently doesn't automatically use system proxy settings, so you have to enter them manually here if needed.
   */
  'network/http_proxy/host': string;
  /**
   * The port number to use to contact the HTTP and HTTPS proxy in the editor (for the asset library and export template downloads). See also {@link network/http_proxy/host}.
   * **Note:** Godot currently doesn't automatically use system proxy settings, so you have to enter them manually here if needed.
   */
  'network/http_proxy/port': int;
  /**
   * If `true` the language server will try to provide additional results when resolving symbols at the cost of showing wrong results. All symbols in the project are checked and resolved just based on their name, without taking context into account.
   * When using static typing it is recommended to disable this setting, since it will mostly add false positives for typed code.
   * **Note:** This setting also influences how symbols are resolved when using renaming capabilities.
   * **Note:** The default value of this setting might change in future versions.
   */
  'network/language_server/enable_smart_resolve': boolean;
  /** The upper limit of time, that the language server spends for IO each poll. */
  'network/language_server/poll_limit_usec': int;
  /** The host used to listen for language server clients. */
  'network/language_server/remote_host': string;
  /**
   * The port used to listen for language server clients.
   * **Note:** A port configured with command-line options will take priority over this setting: `--lsp-port <port>`.
   */
  'network/language_server/remote_port': int;
  /**
   * The declaration of native symbols can't be resolved to a position in the file system. If `true` the language server will instead open the documentation for native symbols in the editor.
   * **Note:** The VSCode plugin adds additional functionality which allows viewing Godot documentation directly in VSCode, so this option is usually not needed in VSCode.
   */
  'network/language_server/show_native_symbols_in_editor': boolean;
  /**
   * If `true` the language server will run in a separate thread, if `false` it will run on the main thread.
   */
  'network/language_server/use_thread': boolean;
  /**
   * The TLS certificate bundle to use for HTTP requests made within the editor (e.g. from the AssetLib tab). If left empty, the included Mozilla certificate bundle (https://github.com/godotengine/godot/blob/master/thirdparty/certs/ca-bundle.crt) will be used.
   */
  'network/tls/editor_tls_certificates': string;
  /**
   * If `true`, enable TLSv1.3 negotiation.
   * **Note:** Only supported when using Mbed TLS 3.0 or later (Linux distribution packages may be compiled against older system Mbed TLS packages), otherwise the maximum supported TLS version is always TLSv1.2.
   */
  'network/tls/enable_tls_v1.3': boolean;
  /**
   * The renderer type that will be checked off by default when creating a new project. Accepted strings are "forward_plus", "mobile" or "gl_compatibility".
   */
  'project_manager/default_renderer': string;
  /**
   * Directory naming convention for the project manager. Options are "No Convention" (project name is directory name), "kebab-case" (default), "snake_case", "camelCase", "PascalCase", or "Title Case".
   */
  'project_manager/directory_naming_convention': int;
  /**
   * The sorting order to use in the project manager. When changing the sorting order in the project manager, this setting is set permanently in the editor settings.
   */
  'project_manager/sorting_order': int;
  /**
   * If `true`, saves all scenes and scripts automatically before running the project. Setting this to `false` prevents the editor from saving if there are no changes which can speed up the project startup slightly, but it makes it possible to run a project that has unsaved changes. (Unsaved changes will not be visible in the running project.)
   */
  'run/auto_save/save_before_running': boolean;
  /**
   * The action to execute on the bottom panel when running the project.
   * **Note:** This option won't do anything if the bottom panel switching is locked using the pin button in the corner of the bottom panel.
   */
  'run/bottom_panel/action_on_play': int;
  /**
   * The action to execute on the bottom panel when stopping the project.
   * **Note:** This option won't do anything if the bottom panel switching is locked using the pin button in the corner of the bottom panel.
   */
  'run/bottom_panel/action_on_stop': int;
  /** If `true`, the editor will clear the Output panel when running the project. */
  'run/output/always_clear_output_on_play': boolean;
  /**
   * The size of the font in the **Output** panel at the bottom of the editor. This setting does not impact the font size of the script editor (see {@link interface/editor/fonts/code_font_size}).
   */
  'run/output/font_size': int;
  /** Maximum number of lines to show at any one time in the Output panel. */
  'run/output/max_lines': int;
  /** If `true`, on Linux/BSD, the editor will check for Wayland first instead of X11 (if available). */
  'run/platforms/linuxbsd/prefer_wayland': boolean;
  /**
   * Specifies how the Play window is launched relative to the Android editor.
   * - **Auto (based on screen size)** (default) will automatically choose how to launch the Play window based on the device and screen metrics. Defaults to **Same as Editor** on phones and **Side-by-side with Editor** on tablets.
   * - **Same as Editor** will launch the Play window in the same window as the Editor.
   * - **Side-by-side with Editor** will launch the Play window side-by-side with the Editor window.
   * **Note:** Only available in the Android editor.
   */
  'run/window_placement/android_window': int;
  /**
   * Overrides game embedding setting for all newly opened projects. If enabled, game embedding settings are not saved.
   */
  'run/window_placement/game_embed_mode': int;
  /**
   * The window mode to use to display the project when starting the project from the editor.
   * **Note:** Game embedding is not available for **"Force Maximized"** or **"Force Fullscreen"**.
   */
  'run/window_placement/rect': int;
  /**
   * The custom position to use when starting the project from the editor (in pixels from the top-left corner). Only effective if {@link run/window_placement/rect} is set to **Custom Position**.
   */
  'run/window_placement/rect_custom_position': Vector2;
  /** The monitor to display the project on when starting the project from the editor. */
  'run/window_placement/screen': int;
  /**
   * If `true`, makes the caret blink according to {@link text_editor/appearance/caret/caret_blink_interval}. Disabling this setting can improve battery life on laptops if you spend long amounts of time in the script editor, since it will reduce the frequency at which the editor needs to be redrawn.
   */
  'text_editor/appearance/caret/caret_blink': boolean;
  /**
   * The interval at which the caret will blink (in seconds). See also {@link text_editor/appearance/caret/caret_blink}.
   */
  'text_editor/appearance/caret/caret_blink_interval': float;
  /**
   * If `true`, highlights all occurrences of the currently selected text in the script editor. See also {@link text_editor/theme/highlighting/word_highlighted_color}.
   */
  'text_editor/appearance/caret/highlight_all_occurrences': boolean;
  /**
   * If `true`, colors the background of the line the caret is currently on with {@link text_editor/theme/highlighting/current_line_color}.
   */
  'text_editor/appearance/caret/highlight_current_line': boolean;
  /**
   * The shape of the caret to use in the script editor. **Line** displays a vertical line to the left of the current character, whereas **Block** displays an outline over the current character.
   */
  'text_editor/appearance/caret/type': int;
  /**
   * If `true`, shows an info label listing available drop options when dragging an object into the script text editor.
   */
  'text_editor/appearance/drag_and_drop_info/show_drag_and_drop_info': boolean;
  /**
   * If `true`, displays a colored button before any {@link Color} constructor in the script editor. Clicking on them allows the color to be modified through a color picker.
   */
  'text_editor/appearance/enable_inline_color_picker': boolean;
  /**
   * The column at which to display a subtle line as a line length guideline for scripts. This should generally be greater than {@link text_editor/appearance/guidelines/line_length_guideline_soft_column}.
   */
  'text_editor/appearance/guidelines/line_length_guideline_hard_column': int;
  /**
   * The column at which to display a *very* subtle line as a line length guideline for scripts. This should generally be lower than {@link text_editor/appearance/guidelines/line_length_guideline_hard_column}.
   */
  'text_editor/appearance/guidelines/line_length_guideline_soft_column': int;
  /**
   * If `true`, displays line length guidelines to help you keep line lengths in check. See also {@link text_editor/appearance/guidelines/line_length_guideline_soft_column} and {@link text_editor/appearance/guidelines/line_length_guideline_hard_column}.
   */
  'text_editor/appearance/guidelines/show_line_length_guidelines': boolean;
  /**
   * If `true`, highlights type-safe lines by displaying their line number color with {@link text_editor/theme/highlighting/safe_line_number_color} instead of {@link text_editor/theme/highlighting/line_number_color}. Type-safe lines are lines of code where the type of all variables is known at compile-time. These type-safe lines may run faster thanks to typed instructions.
   */
  'text_editor/appearance/gutters/highlight_type_safe_lines': boolean;
  /** If `true`, displays line numbers with zero padding (e.g. `007` instead of `7`). */
  'text_editor/appearance/gutters/line_numbers_zero_padded': boolean;
  /**
   * If `true`, displays a gutter at the left containing icons for methods with signal connections and for overridden methods.
   */
  'text_editor/appearance/gutters/show_info_gutter': boolean;
  /** If `true`, displays line numbers in a gutter at the left. */
  'text_editor/appearance/gutters/show_line_numbers': boolean;
  /**
   * If {@link text_editor/appearance/lines/word_wrap} is set to `1`, sets text wrapping mode. To see how each mode behaves, see {@link TextServer.AutowrapMode}.
   */
  'text_editor/appearance/lines/autowrap_mode': int;
  /**
   * If `true`, displays the folding arrows next to indented code sections and allows code folding. If `false`, hides the folding arrows next to indented code sections and disallows code folding.
   */
  'text_editor/appearance/lines/code_folding': boolean;
  /**
   * If `true`, wraps long lines over multiple lines to avoid horizontal scrolling. This is a display-only feature; it does not actually insert line breaks in your scripts.
   */
  'text_editor/appearance/lines/word_wrap': int;
  /** The width of the minimap in the script editor (in pixels). */
  'text_editor/appearance/minimap/minimap_width': int;
  /**
   * If `true`, draws an overview of the script near the scroll bar. The minimap can be left-clicked to scroll directly to a location in an "absolute" manner.
   */
  'text_editor/appearance/minimap/show_minimap': boolean;
  /** If `true`, draws space characters as centered points. */
  'text_editor/appearance/whitespace/draw_spaces': boolean;
  /** If `true`, draws tab characters as chevrons. */
  'text_editor/appearance/whitespace/draw_tabs': boolean;
  /**
   * The space to add between lines (in pixels). Greater line spacing can help improve readability at the cost of displaying fewer lines on screen. Negative values allow for even more compact text, but may look broken with certain fonts.
   */
  'text_editor/appearance/whitespace/line_spacing': int;
  /** If `true`, documentation tooltips will appear when hovering over a symbol. */
  'text_editor/behavior/documentation/enable_tooltips': boolean;
  /** If `true`, tool scripts will be automatically soft-reloaded after they are saved. */
  'text_editor/behavior/files/auto_reload_and_parse_scripts_on_save': boolean;
  /**
   * If `true`, automatically reloads scripts and text-based shaders in the editor when they have been modified and saved by external editors or tools and the editor regains focus. External changes can be discarded by using the Undo function after they've been loaded in the editor.
   * If `false`, a file conflict dialog will always be displayed when the editor regains focus. This dialog allows you to choose whether to keep local changes or discard them.
   * **Note:** Even when this setting is `true`, a file conflict dialog is still displayed in certain situations. For instance, it will display when the script editor has unsaved changes that the external editor did not account for.
   */
  'text_editor/behavior/files/auto_reload_scripts_on_external_change': boolean;
  /**
   * If set to a value greater than `0`, automatically saves the current script following the specified interval (in seconds). This can be used to prevent data loss if the editor crashes.
   */
  'text_editor/behavior/files/autosave_interval_secs': int;
  /**
   * If `true`, converts indentation to match the script editor's indentation settings when saving a script. See also {@link text_editor/behavior/indent/type}.
   */
  'text_editor/behavior/files/convert_indent_on_save': boolean;
  /**
   * If `true`, when dropping a {@link Resource} file to script editor while `Ctrl` is held, the resource will be preloaded with a UID. If `false`, the resource will be preloaded with a path.
   * When you hold `Ctrl+Shift`, the behavior is reversed.
   */
  'text_editor/behavior/files/drop_preload_resources_as_uid': boolean;
  /**
   * If `true`, opening a scene automatically opens the script attached to the root node, or the topmost node if the root has no script.
   */
  'text_editor/behavior/files/open_dominant_script_on_scene_change': boolean;
  /**
   * If `true`, reopens scripts that were opened in the last session when the editor is reopened on a given project.
   */
  'text_editor/behavior/files/restore_scripts_on_load': boolean;
  /**
   * If `true`, trims all empty newlines after the final newline when saving a script. Final newlines refer to the empty newlines found at the end of files. Since these serve no practical purpose, they can and should be removed to make version control diffs less noisy.
   */
  'text_editor/behavior/files/trim_final_newlines_on_save': boolean;
  /**
   * If `true`, trims trailing whitespace when saving a script. Trailing whitespace refers to tab and space characters placed at the end of lines. Since these serve no practical purpose, they can and should be removed to make version control diffs less noisy.
   */
  'text_editor/behavior/files/trim_trailing_whitespace_on_save': boolean;
  /**
   * If `true`, copying or cutting without a selection is performed on all lines with a caret. Otherwise, copy and cut require a selection.
   */
  'text_editor/behavior/general/empty_selection_clipboard': boolean;
  /**
   * If `true`, automatically indents code when pressing the `Enter` key based on blocks above the new line.
   */
  'text_editor/behavior/indent/auto_indent': boolean;
  /** If `true`, all wrapped lines are indented to the same amount as the unwrapped line. */
  'text_editor/behavior/indent/indent_wrapped_lines': boolean;
  /**
   * When using tab indentation, determines the length of each tab. When using space indentation, determines how many spaces are inserted when pressing `Tab` and when automatic indentation is performed.
   */
  'text_editor/behavior/indent/size': int;
  /**
   * The indentation style to use (tabs or spaces).
   * **Note:** The GDScript style guide ($DOCS_URL/tutorials/scripting/gdscript/gdscript_styleguide.html) recommends using tabs for indentation. It is advised to change this setting only if you need to work on a project that currently uses spaces for indentation.
   */
  'text_editor/behavior/indent/type': int;
  /**
   * The characters to consider as word delimiters if {@link text_editor/behavior/navigation/use_custom_word_separators} is `true`. This is in addition to default characters if {@link text_editor/behavior/navigation/use_default_word_separators} is `true`. The characters should be defined without separation, for example `_♥=`.
   */
  'text_editor/behavior/navigation/custom_word_separators': string;
  /**
   * If `true`, allows drag-and-dropping text in the script editor to move text. Disable this if you find yourself accidentally drag-and-dropping text in the script editor.
   */
  'text_editor/behavior/navigation/drag_and_drop_selection': boolean;
  /**
   * If `true`, the caret will be moved when right-clicking somewhere in the script editor (like when left-clicking or middle-clicking). If `false`, the caret will only be moved when left-clicking or middle-clicking somewhere.
   */
  'text_editor/behavior/navigation/move_caret_on_right_click': boolean;
  /**
   * If `true`, opens the script editor when connecting a signal to an existing script method from the Signals dock.
   */
  'text_editor/behavior/navigation/open_script_when_connecting_signal_to_existing_method': boolean;
  /** If `true`, allows scrolling past the end of the file. */
  'text_editor/behavior/navigation/scroll_past_end_of_file': boolean;
  /**
   * If `true`, enables a smooth scrolling animation when using the mouse wheel to scroll. See {@link text_editor/behavior/navigation/v_scroll_speed} for the speed of this animation.
   * **Note:** {@link text_editor/behavior/navigation/smooth_scrolling} currently behaves poorly in projects where {@link ProjectSettings.physics/common/physics_ticks_per_second} has been increased significantly from its default value (`60`). In this case, it is recommended to disable this setting.
   */
  'text_editor/behavior/navigation/smooth_scrolling': boolean;
  /**
   * If `true`, prevents automatically switching between the Script and 2D/3D screens when selecting a node in the Scene tree dock.
   */
  'text_editor/behavior/navigation/stay_in_script_editor_on_node_selected': boolean;
  /**
   * If `true`, uses the characters in {@link text_editor/behavior/navigation/custom_word_separators} as word separators for word navigation and operations. This is in addition to the default characters if {@link text_editor/behavior/navigation/use_default_word_separators} is also enabled. Word navigation and operations include double-clicking on a word or holding `Ctrl` (`Cmd` on macOS) while pressing `left`, `right`, `backspace`, or `delete`.
   */
  'text_editor/behavior/navigation/use_custom_word_separators': boolean;
  /**
   * If `true`, uses the characters in ``!"#$%&'()*+,-./:;<=>?@[\]^`{|}~`, the Unicode General Punctuation table, and the Unicode CJK Punctuation table as word separators for word navigation and operations. If `false`, a subset of these characters are used and does not include the characters `<>$~^=+|`. This is in addition to custom characters if {@link text_editor/behavior/navigation/use_custom_word_separators} is also enabled. These characters are used to determine where a word stops. Word navigation and operations include double-clicking on a word or holding `Ctrl` (`Cmd` on macOS) while pressing `left`, `right`, `backspace`, or `delete`.
   */
  'text_editor/behavior/navigation/use_default_word_separators': boolean;
  /**
   * The speed of scrolling in lines per second when {@link text_editor/behavior/navigation/smooth_scrolling} is `true`. Higher values make the script scroll by faster when using the mouse wheel.
   * **Note:** You can hold down `Alt` while using the mouse wheel to temporarily scroll 5 times faster.
   */
  'text_editor/behavior/navigation/v_scroll_speed': int;
  /**
   * If `true`, uses {@link NodePath} instead of {@link String} when appropriate for code autocompletion or for drag and dropping object properties into the script editor.
   */
  'text_editor/completion/add_node_path_literals': boolean;
  /**
   * If `true`, uses {@link StringName} instead of {@link String} when appropriate for code autocompletion.
   */
  'text_editor/completion/add_string_name_literals': boolean;
  /**
   * If `true`, automatically adds GDScript static typing ($DOCS_URL/tutorials/scripting/gdscript/static_typing.html) (such as `-> void` and `: int`) in many situations where it's possible to, including when:
   * - Accepting a suggestion from code autocompletion;
   * - Creating a new script from a template;
   * - Connecting signals from the Signals dock;
   * - Creating variables prefixed with , by dropping nodes from the Scene dock into the script editor while holding `Ctrl`.
   */
  'text_editor/completion/add_type_hints': boolean;
  /**
   * If `true`, automatically inserts the matching closing brace when the opening brace is inserted by typing or autocompletion. Also automatically removes the closing brace when pressing `Backspace` on the opening brace. This includes brackets (`()`, `[]`, `{}`), string quotation marks (`''`, `""`), and comments (`/**\/`) if the language supports it.
   */
  'text_editor/completion/auto_brace_complete': boolean;
  /**
   * The delay in seconds after which autocompletion suggestions should be displayed when the user stops typing.
   */
  'text_editor/completion/code_complete_delay': float;
  /**
   * If `true`, code completion will be triggered automatically after {@link text_editor/completion/code_complete_delay}. Even if `false`, code completion can be triggered manually with the `ui_text_completion_query` action (by default `Ctrl + Space` or `Cmd + Space` on macOS).
   */
  'text_editor/completion/code_complete_enabled': boolean;
  /**
   * If `true` enables the coloring for some items in the autocompletion suggestions, like vector components.
   */
  'text_editor/completion/colorize_suggestions': boolean;
  /**
   * If `true`, provides autocompletion suggestions for file paths in methods such as `load()` and `preload()`.
   */
  'text_editor/completion/complete_file_paths': boolean;
  /**
   * The delay in seconds after which the script editor should check for errors when the user stops typing.
   */
  'text_editor/completion/idle_parse_delay': float;
  /**
   * The delay used instead of {@link text_editor/completion/idle_parse_delay}, when the parser has found errors. A lower value should feel more responsive while fixing code, but may cause notable stuttering and increase CPU usage.
   */
  'text_editor/completion/idle_parse_delay_with_errors_found': float;
  /**
   * If `true`, the code completion tooltip will appear below the current line unless there is no space on screen below the current line. If `false`, the code completion tooltip will appear above the current line.
   */
  'text_editor/completion/put_callhint_tooltip_below_current_line': boolean;
  /**
   * If `true`, performs string autocompletion with single quotes. If `false`, performs string autocompletion with double quotes (which matches the GDScript style guide ($DOCS_URL/tutorials/scripting/gdscript/gdscript_styleguide.html)).
   */
  'text_editor/completion/use_single_quotes': boolean;
  /**
   * The command-line arguments to pass to the external text editor that is run when {@link text_editor/external/use_external_editor} is `true`. See also {@link text_editor/external/exec_path}.
   */
  'text_editor/external/exec_flags': string;
  /**
   * The path to the text editor executable used to edit text files if {@link text_editor/external/use_external_editor} is `true`.
   */
  'text_editor/external/exec_path': string;
  /**
   * If `true`, uses an external editor instead of the built-in Script Editor. See also {@link text_editor/external/exec_path} and {@link text_editor/external/exec_flags}.
   */
  'text_editor/external/use_external_editor': boolean;
  /**
   * Controls which multi-line code blocks should be displayed in the editor help. This setting does not affect single-line code literals in the editor help.
   */
  'text_editor/help/class_reference_examples': int;
  /** The font size to use for the editor help (built-in class reference). */
  'text_editor/help/help_font_size': int;
  /** The font size to use for code samples in the editor help (built-in class reference). */
  'text_editor/help/help_source_font_size': int;
  /** The font size to use for headings in the editor help (built-in class reference). */
  'text_editor/help/help_title_font_size': int;
  /**
   * If `true`, displays a table of contents at the left of the editor help (at the location where the members overview would appear when editing a script).
   */
  'text_editor/help/show_help_index': boolean;
  /** If `true`, the script's method list in the Script Editor is sorted alphabetically. */
  'text_editor/help/sort_functions_alphabetically': boolean;
  /**
   * If `true`, class reference pages are grouped together at the bottom of the Script Editor's script list.
   */
  'text_editor/script_list/group_help_pages': boolean;
  /**
   * If `true`, the scripts that are used by the current scene are highlighted in the Script Editor's script list.
   */
  'text_editor/script_list/highlight_scene_scripts': boolean;
  /**
   * Specifies how script paths should be displayed in Script Editor's script list. If using the "Name" option and some scripts share the same file name, more parts of their paths are revealed to avoid conflicts.
   */
  'text_editor/script_list/list_script_names_as': int;
  /**
   * If `true`, the names of recently opened scripts in the Script Editor are highlighted with the accent color, with its intensity based on how recently they were opened.
   */
  'text_editor/script_list/script_temperature_enabled': boolean;
  /**
   * How many script names can be highlighted at most, if {@link text_editor/script_list/script_temperature_enabled} is `true`. Scripts older than this value use the default font color.
   */
  'text_editor/script_list/script_temperature_history_size': int;
  /**
   * If `true`, displays an overview of the current script's member functions at the left of the script editor. See also {@link text_editor/script_list/sort_members_outline_alphabetically}.
   */
  'text_editor/script_list/show_members_overview': boolean;
  /**
   * If `true`, sorts the members outline (located at the left of the script editor) using alphabetical order. If `false`, sorts the members outline depending on the order in which members are found in the script.
   * **Note:** Only effective if {@link text_editor/script_list/show_members_overview} is `true`.
   */
  'text_editor/script_list/sort_members_outline_alphabetically': boolean;
  /** Specifies sorting used for Script Editor's open script list. */
  'text_editor/script_list/sort_scripts_by': int;
  /**
   * The syntax theme to use in the script editor.
   * You can save your own syntax theme from your current settings by using **File > Theme > Save As...** at the top of the script editor. The syntax theme will then be available locally in the list of color themes.
   * You can find additional syntax themes to install in the godot-syntax-themes (https://github.com/godotengine/godot-syntax-themes) repository.
   */
  'text_editor/theme/color_theme': string;
  /**
   * The script editor's background color. If set to a translucent color, the editor theme's base color will be visible behind.
   */
  'text_editor/theme/highlighting/background_color': Color;
  /**
   * The script editor's base type color (used for types like {@link Vector2}, {@link Vector3}, {@link Color}, ...).
   */
  'text_editor/theme/highlighting/base_type_color': Color;
  /** The script editor's bookmark icon color (displayed in the gutter). */
  'text_editor/theme/highlighting/bookmark_color': Color;
  /**
   * The script editor's brace mismatch color. Used when the caret is currently on a mismatched brace, parenthesis or bracket character.
   */
  'text_editor/theme/highlighting/brace_mismatch_color': Color;
  /** The script editor's breakpoint icon color (displayed in the gutter). */
  'text_editor/theme/highlighting/breakpoint_color': Color;
  /**
   * The script editor's caret background color.
   * **Note:** This setting has no effect as it's currently unused.
   */
  'text_editor/theme/highlighting/caret_background_color': Color;
  /** The script editor's caret color. */
  'text_editor/theme/highlighting/caret_color': Color;
  /** The script editor's color for the code folding icon (displayed in the gutter). */
  'text_editor/theme/highlighting/code_folding_color': Color;
  /**
   * The script editor's comment color.
   * **Note:** In GDScript, unlike Python, multiline strings are not considered to be comments, and will use the string highlighting color instead.
   */
  'text_editor/theme/highlighting/comment_color': Color;
  /**
   * The script editor's critical comment marker text color. These markers are determined by {@link text_editor/theme/highlighting/comment_markers/critical_list}.
   */
  'text_editor/theme/highlighting/comment_markers/critical_color': Color;
  /**
   * A comma-separated list of case-sensitive words to highlight in comments. The text will be highlighted in the script editor with the {@link text_editor/theme/highlighting/comment_markers/critical_color} color. These must not include spaces or symbols or they will not be highlighted.
   * **Note:** This is only implemented in the GDScript syntax highlighter.
   */
  'text_editor/theme/highlighting/comment_markers/critical_list': string;
  /**
   * The script editor's notice comment marker text color. These markers are determined by {@link text_editor/theme/highlighting/comment_markers/notice_list}.
   */
  'text_editor/theme/highlighting/comment_markers/notice_color': Color;
  /**
   * A comma-separated list of case-sensitive words to highlight in comments. The text will be highlighted in the script editor with the {@link text_editor/theme/highlighting/comment_markers/notice_color} color. These must not include spaces or symbols or they will not be highlighted.
   * **Note:** This is only implemented in the GDScript syntax highlighter.
   */
  'text_editor/theme/highlighting/comment_markers/notice_list': string;
  /**
   * The script editor's warning comment marker text color. These markers are determined by {@link text_editor/theme/highlighting/comment_markers/warning_list}.
   */
  'text_editor/theme/highlighting/comment_markers/warning_color': Color;
  /**
   * A comma-separated list of case-sensitive words to highlight in comments. The text will be highlighted in the script editor with the {@link text_editor/theme/highlighting/comment_markers/warning_color} color. These must not include spaces or symbols or they will not be highlighted.
   * **Note:** This is only implemented in the GDScript syntax highlighter.
   */
  'text_editor/theme/highlighting/comment_markers/warning_list': string;
  /** The script editor's autocompletion box background color. */
  'text_editor/theme/highlighting/completion_background_color': Color;
  /**
   * The script editor's autocompletion box background color to highlight existing characters in the completion results. This should be a translucent color so that {@link text_editor/theme/highlighting/completion_selected_color} can be seen behind.
   */
  'text_editor/theme/highlighting/completion_existing_color': Color;
  /** The script editor's autocompletion box text color. */
  'text_editor/theme/highlighting/completion_font_color': Color;
  /** The script editor's autocompletion box scroll bar color. */
  'text_editor/theme/highlighting/completion_scroll_color': Color;
  /** The script editor's autocompletion box scroll bar color when hovered or pressed with the mouse. */
  'text_editor/theme/highlighting/completion_scroll_hovered_color': Color;
  /** The script editor's autocompletion box background color for the currently selected line. */
  'text_editor/theme/highlighting/completion_selected_color': Color;
  /** The script editor's control flow keyword color (used for keywords like `if`, `for`, `return`, ...). */
  'text_editor/theme/highlighting/control_flow_keyword_color': Color;
  /**
   * The script editor's background color for the line the caret is currently on. This should be set to a translucent color so that it can display on top of other line color modifiers such as {@link text_editor/theme/highlighting/mark_color}.
   */
  'text_editor/theme/highlighting/current_line_color': Color;
  /**
   * The script editor's documentation comment color. In GDScript, this is used for comments starting with `##`. In C#, this is used for comments starting with `///` or `/**`.
   */
  'text_editor/theme/highlighting/doc_comment_color': Color;
  /** The script editor's engine type color ({@link Object}, {@link Mesh}, {@link Node}, ...). */
  'text_editor/theme/highlighting/engine_type_color': Color;
  /** The script editor's color for the debugger's executing line icon (displayed in the gutter). */
  'text_editor/theme/highlighting/executing_line_color': Color;
  /** The script editor's background line highlighting color for folded code region. */
  'text_editor/theme/highlighting/folded_code_region_color': Color;
  /**
   * The script editor's function call color.
   * **Note:** When using the GDScript syntax highlighter, this is only used when calling some functions since function definitions and global functions have their own colors {@link text_editor/theme/highlighting/gdscript/function_definition_color} and {@link text_editor/theme/highlighting/gdscript/global_function_color}.
   */
  'text_editor/theme/highlighting/function_color': Color;
  /** The GDScript syntax highlighter text color for annotations (e.g. `@export`). */
  'text_editor/theme/highlighting/gdscript/annotation_color': Color;
  /**
   * The GDScript syntax highlighter text color for function definitions (e.g. the `_ready` in `func _ready():`).
   */
  'text_editor/theme/highlighting/gdscript/function_definition_color': Color;
  /**
   * The GDScript syntax highlighter text color for global functions, such as the ones in [@GlobalScope] (e.g. `preload()`).
   */
  'text_editor/theme/highlighting/gdscript/global_function_color': Color;
  /** The GDScript syntax highlighter text color for {@link NodePath} literals (e.g. `^"position:x"`). */
  'text_editor/theme/highlighting/gdscript/node_path_color': Color;
  /**
   * The GDScript syntax highlighter text color for node reference literals (e.g. `$"Sprite"` and `%"Sprite"`]).
   */
  'text_editor/theme/highlighting/gdscript/node_reference_color': Color;
  /** The GDScript syntax highlighter text color for {@link StringName} literals (e.g. `&"example"`). */
  'text_editor/theme/highlighting/gdscript/string_name_color': Color;
  /**
   * The script editor's non-control flow keyword color (used for keywords like `var`, `func`, `extends`, ...).
   */
  'text_editor/theme/highlighting/keyword_color': Color;
  /**
   * The script editor's color for the line length guideline. The "hard" line length guideline will be drawn with this color, whereas the "soft" line length guideline will be drawn with half of its opacity.
   */
  'text_editor/theme/highlighting/line_length_guideline_color': Color;
  /**
   * The script editor's color for line numbers. See also {@link text_editor/theme/highlighting/safe_line_number_color}.
   */
  'text_editor/theme/highlighting/line_number_color': Color;
  /**
   * The script editor's background color for lines with errors. This should be set to a translucent color so that it can display on top of other line color modifiers such as {@link text_editor/theme/highlighting/current_line_color}.
   */
  'text_editor/theme/highlighting/mark_color': Color;
  /**
   * The script editor's color for member variables on objects (e.g. `self.some_property`).
   * **Note:** This color is not used for local variable declaration and access.
   */
  'text_editor/theme/highlighting/member_variable_color': Color;
  /** The script editor's color for numbers (integer and floating-point). */
  'text_editor/theme/highlighting/number_color': Color;
  /**
   * The script editor's color for type-safe line numbers. See also {@link text_editor/theme/highlighting/line_number_color}.
   * **Note:** Only displayed if {@link text_editor/appearance/gutters/highlight_type_safe_lines} is `true`.
   */
  'text_editor/theme/highlighting/safe_line_number_color': Color;
  /**
   * The script editor's color for the border of search results. This border helps bring further attention to the search result. Set this color's opacity to 0 to disable the border.
   */
  'text_editor/theme/highlighting/search_result_border_color': Color;
  /** The script editor's background color for search results. */
  'text_editor/theme/highlighting/search_result_color': Color;
  /** The script editor's background color for the currently selected text. */
  'text_editor/theme/highlighting/selection_color': Color;
  /** The script editor's color for strings (single-line and multi-line). */
  'text_editor/theme/highlighting/string_color': Color;
  /**
   * The script editor's color for string placeholders, such as `%s` and `{_}`. Refer to the GDScript format strings documentation ($DOCS_URL/tutorials/scripting/gdscript/gdscript_format_string.html) for more details.
   * **Note:** Only the default `{_}` placeholder patterns are highlighted for the {@link String.format} method. Custom patterns still appear as plain strings.
   */
  'text_editor/theme/highlighting/string_placeholder_color': Color;
  /** The script editor's color for operators (`( ) [ ] { } + - * /`, ...). */
  'text_editor/theme/highlighting/symbol_color': Color;
  /** The script editor's color for text not highlighted by any syntax highlighting rule. */
  'text_editor/theme/highlighting/text_color': Color;
  /**
   * The script editor's background color for text. This should be set to a translucent color so that it can display on top of other line color modifiers such as {@link text_editor/theme/highlighting/current_line_color}.
   */
  'text_editor/theme/highlighting/text_selected_color': Color;
  /** The script editor's color for user-defined types (using `class_name`). */
  'text_editor/theme/highlighting/user_type_color': Color;
  /**
   * The script editor's background color for lines with warnings. This should be set to a translucent color so that it can display on top of other line color modifiers such as {@link text_editor/theme/highlighting/current_line_color}.
   */
  'text_editor/theme/highlighting/warning_color': Color;
  /**
   * The script editor's color for words highlighted by selecting them. Only visible if {@link text_editor/appearance/caret/highlight_all_occurrences} is `true`.
   */
  'text_editor/theme/highlighting/word_highlighted_color': Color;
  /** Path to private SSH key file for the editor's Version Control integration credentials. */
  'version_control/ssh_private_key_path': string;
  /** Path to public SSH key file for the editor's Version Control integration credentials. */
  'version_control/ssh_public_key_path': string;
  /** Default username for editor's Version Control integration. */
  'version_control/username': string;

  /**
   * Adds a custom property info to a property. The dictionary must contain:
   * - `name`: {@link String} (the name of the property)
   * - `type`: [int] (see {@link Variant.Type})
   * - optionally `hint`: [int] (see {@link PropertyHint}) and `hint_string`: {@link String}
   */
  add_property_info(info: Dictionary): void;
  /**
   * Adds a `shortcut` whose path is specified by `path`.
   * The `path` determines how the shortcut is organized and displayed in the editor's shortcut settings. The path format affects the display as follows:
   * - `"name"` (no slash): Creates a category named `name` with the shortcut displayed as `name`.
   * - `"category/name"` (single slash): Displays as `name` in the `category` section.
   * - `"category/name/extra"` (multiple slashes): Extra path components are ignored, so this behaves the same as `"category/name"`.
   * **Note:** Shortcuts are only saved to the editor settings if they differ from their original/default state. This means empty shortcuts that were originally empty will not persist between editor sessions and must be re-added. If a shortcut with the same `path` already exists, this method will update it with the new `shortcut` instead of creating a duplicate.
   */
  add_shortcut(path: string, shortcut: Shortcut): void;
  /**
   * Checks if any settings with the prefix `setting_prefix` exist in the set of changed settings. See also {@link get_changed_settings}.
   */
  check_changed_settings_in_group(setting_prefix: string): boolean;
  /** Erases the setting whose name is specified by `property`. */
  erase(property: string): void;
  /**
   * Gets an array of the settings which have been changed since the last save. Note that internally `changed_settings` is cleared after a successful save, so generally the most appropriate place to use this method is when processing {@link NOTIFICATION_EDITOR_SETTINGS_CHANGED}.
   */
  get_changed_settings(): PackedStringArray;
  /** Returns the list of favorite files and directories for this project. */
  get_favorites(): PackedStringArray;
  /**
   * Returns project-specific metadata for the `section` and `key` specified. If the metadata doesn't exist, `default` will be returned instead. See also {@link set_project_metadata}.
   */
  get_project_metadata(section: string, key: string, default_?: unknown): unknown;
  /** Returns the list of recently visited folders in the file dialog for this project. */
  get_recent_dirs(): PackedStringArray;
  /**
   * Returns the value of the setting specified by `name`. This is equivalent to using {@link Object.get} on the EditorSettings instance.
   */
  get_setting(name: string): unknown;
  /**
   * Returns the shortcut specified by `path`. Tries to find a built-in action if no shortcut with the provided path is found in the shortcut list. If found, adds it to the list and returns it, otherwise returns `null`.
   */
  get_shortcut(path: string): Shortcut | null;
  /** Returns the list of stored shortcut paths. */
  get_shortcut_list(): PackedStringArray;
  /** Returns `true` if the setting specified by `name` exists, `false` otherwise. */
  has_setting(name: string): boolean;
  /** Returns `true` if the shortcut specified by `path` exists, `false` otherwise. */
  has_shortcut(path: string): boolean;
  /**
   * Returns `true` if the shortcut specified by `path` matches the event specified by `event`, `false` otherwise.
   */
  is_shortcut(path: string, event: InputEvent): boolean;
  /**
   * Marks the passed editor setting as being changed, see {@link get_changed_settings}. Only settings which exist (see {@link has_setting}) will be accepted.
   */
  mark_setting_changed(setting: string): void;
  /** Removes the shortcut specified by `path`. */
  remove_shortcut(path: string): void;
  /** Overrides the built-in editor action `name` with the input actions defined in `actions_list`. */
  set_builtin_action_override(name: string, actions_list: Array<InputEvent>): void;
  /** Sets the list of favorite files and directories for this project. */
  set_favorites(dirs: PackedStringArray | Array<unknown>): void;
  /**
   * Sets the initial value of the setting specified by `name` to `value`. This is used to provide a value for the Revert button in the Editor Settings. If `update_current` is `true`, the setting is reset to `value` as well.
   */
  set_initial_value(name: string, value: unknown, update_current: boolean): void;
  /**
   * Sets project-specific metadata with the `section`, `key` and `data` specified. This metadata is stored outside the project folder and therefore won't be checked into version control. See also {@link get_project_metadata}.
   */
  set_project_metadata(section: string, key: string, data: unknown): void;
  /** Sets the list of recently visited folders in the file dialog for this project. */
  set_recent_dirs(dirs: PackedStringArray | Array<unknown>): void;
  /**
   * Sets the `value` of the setting specified by `name`. This is equivalent to using {@link Object.set} on the EditorSettings instance.
   */
  set_setting(name: string, value: unknown): void;

  /** Emitted after any editor setting has changed. */
  settings_changed: Signal<[]>;

  /**
   * Emitted after any editor setting has changed. It's used by various editor plugins to update their visuals on theme changes or logic on configuration changes.
   */
  static readonly NOTIFICATION_EDITOR_SETTINGS_CHANGED: int;
}
