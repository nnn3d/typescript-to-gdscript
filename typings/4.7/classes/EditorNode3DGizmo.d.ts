// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Gizmo for editing {@link Node3D} objects. */
declare class EditorNode3DGizmo extends Node3DGizmo {
  _begin_handle_action(id: int, secondary: boolean): void;
  /**
   * Override this method to commit a handle being edited (handles must have been previously added by {@link add_handles}). This usually means creating an {@link UndoRedo} action for the change, using the current handle value as "do" and the `restore` argument as "undo".
   * If the `cancel` argument is `true`, the `restore` value should be directly set, without any {@link UndoRedo} action.
   * The `secondary` argument is `true` when the committed handle is secondary (see {@link add_handles} for more information).
   */
  _commit_handle(id: int, secondary: boolean, restore: unknown, cancel: boolean): void;
  /**
   * Override this method to commit a group of subgizmos being edited (see {@link _subgizmos_intersect_ray} and {@link _subgizmos_intersect_frustum}). This usually means creating an {@link UndoRedo} action for the change, using the current transforms as "do" and the `restores` transforms as "undo".
   * If the `cancel` argument is `true`, the `restores` transforms should be directly set, without any {@link UndoRedo} action.
   */
  _commit_subgizmos(ids: PackedInt32Array, restores: unknown, cancel: boolean): void;
  /**
   * Override this method to return the name of an edited handle (handles must have been previously added by {@link add_handles}). Handles can be named for reference to the user when editing.
   * The `secondary` argument is `true` when the requested handle is secondary (see {@link add_handles} for more information).
   */
  _get_handle_name(id: int, secondary: boolean): string;
  /**
   * Override this method to return the current value of a handle. This value will be requested at the start of an edit and used as the `restore` argument in {@link _commit_handle}.
   * The `secondary` argument is `true` when the requested handle is secondary (see {@link add_handles} for more information).
   */
  _get_handle_value(id: int, secondary: boolean): unknown;
  /**
   * Override this method to return the current transform of a subgizmo. This transform will be requested at the start of an edit and used as the `restore` argument in {@link _commit_subgizmos}.
   */
  _get_subgizmo_transform(id: int): Transform3D;
  /**
   * Override this method to return `true` whenever the given handle should be highlighted in the editor.
   * The `secondary` argument is `true` when the requested handle is secondary (see {@link add_handles} for more information).
   */
  _is_handle_highlighted(id: int, secondary: boolean): boolean;
  /**
   * Override this method to add all the gizmo elements whenever a gizmo update is requested. It's common to call {@link clear} at the beginning of this method and then add visual elements depending on the node's properties.
   */
  _redraw(): void;
  /**
   * Override this method to update the node properties when the user drags a gizmo handle (previously added with {@link add_handles}). The provided `point` is the mouse position in screen coordinates and the `camera` can be used to convert it to raycasts.
   * The `secondary` argument is `true` when the edited handle is secondary (see {@link add_handles} for more information).
   */
  _set_handle(id: int, secondary: boolean, camera: Camera3D, point: Vector2): void;
  /**
   * Override this method to update the node properties during subgizmo editing (see {@link _subgizmos_intersect_ray} and {@link _subgizmos_intersect_frustum}). The `transform` is given in the {@link Node3D}'s local coordinate system.
   */
  _set_subgizmo_transform(id: int, transform: Transform3D): void;
  /**
   * Override this method to allow selecting subgizmos using mouse drag box selection. Given a `camera` and a `frustum`, this method should return which subgizmos are contained within the frustum. The `frustum` argument consists of an array with all the {@link Plane}s that make up the selection frustum. The returned value should contain a list of unique subgizmo identifiers, which can have any non-negative value and will be used in other virtual methods like {@link _get_subgizmo_transform} or {@link _commit_subgizmos}.
   */
  _subgizmos_intersect_frustum(camera: Camera3D, frustum: unknown): PackedInt32Array;
  /**
   * Override this method to allow selecting subgizmos using mouse clicks. Given a `camera` and a `point` in screen coordinates, this method should return which subgizmo should be selected. The returned value should be a unique subgizmo identifier, which can have any non-negative value and will be used in other virtual methods like {@link _get_subgizmo_transform} or {@link _commit_subgizmos}.
   */
  _subgizmos_intersect_ray(camera: Camera3D, point: Vector2): int;
  /**
   * Adds the specified `segments` to the gizmo's collision shape for picking. Call this method during {@link _redraw}.
   */
  add_collision_segments(segments: PackedVector3Array): void;
  /**
   * Adds collision triangles to the gizmo for picking. A {@link TriangleMesh} can be generated from a regular {@link Mesh} too. Call this method during {@link _redraw}.
   */
  add_collision_triangles(triangles: TriangleMesh): void;
  /**
   * Adds a list of handles (points) which can be used to edit the properties of the gizmo's {@link Node3D}. The `ids` argument can be used to specify a custom identifier for each handle, if an empty array is passed, the ids will be assigned automatically from the `handles` argument order.
   * The `secondary` argument marks the added handles as secondary, meaning they will normally have lower selection priority than regular handles. When the user is holding the shift key secondary handles will switch to have higher priority than regular handles. This change in priority can be used to place multiple handles at the same point while still giving the user control on their selection.
   * There are virtual methods which will be called upon editing of these handles. Call this method during {@link _redraw}.
   */
  add_handles(handles: PackedVector3Array, material: Material, ids: PackedInt32Array, billboard?: boolean, secondary?: boolean): void;
  /**
   * Adds lines to the gizmo (as sets of 2 points), with a given material. The lines are used for visualizing the gizmo. Call this method during {@link _redraw}.
   */
  add_lines(lines: PackedVector3Array, material: Material, billboard?: boolean, modulate?: Color): void;
  /**
   * Adds a mesh to the gizmo with the specified `material`, local `transform` and `skeleton`. Call this method during {@link _redraw}.
   */
  add_mesh(mesh: Mesh, material?: Material, transform?: Transform3D, skeleton?: SkinReference): void;
  /**
   * Adds an unscaled billboard for visualization and selection. Call this method during {@link _redraw}.
   */
  add_unscaled_billboard(material: Material, default_scale?: float, modulate?: Color): void;
  /** Removes everything in the gizmo including meshes, collisions and handles. */
  clear(): void;
  /** Returns the {@link Node3D} node associated with this gizmo. */
  get_node_3d(): Node3D;
  /**
   * Returns the {@link EditorNode3DGizmoPlugin} that owns this gizmo. It's useful to retrieve materials using {@link EditorNode3DGizmoPlugin.get_material}.
   */
  get_plugin(): EditorNode3DGizmoPlugin;
  /**
   * Returns a list of the currently selected subgizmos. Can be used to highlight selected elements during {@link _redraw}.
   */
  get_subgizmo_selection(): PackedInt32Array;
  /**
   * Returns `true` if the given subgizmo is currently selected. Can be used to highlight selected elements during {@link _redraw}.
   */
  is_subgizmo_selected(id: int): boolean;
  /** Sets the gizmo's hidden state. If `true`, the gizmo will be hidden. If `false`, it will be shown. */
  set_hidden(hidden: boolean): void;
  /** Sets the reference {@link Node3D} node for the gizmo. `node` must inherit from {@link Node3D}. */
  set_node_3d(node: Node): void;
}
