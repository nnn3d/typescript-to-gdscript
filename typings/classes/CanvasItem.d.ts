// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for everything in 2D space. */
declare class CanvasItem extends Node {
  /**
   * The mode in which this node clips its children, acting as a mask.
   * **Note:** Clipping nodes cannot be nested or placed within a {@link CanvasGroup}. If an ancestor of this node clips its children or is a {@link CanvasGroup}, then this node's clip mode should be set to {@link CLIP_CHILDREN_DISABLED} to avoid unexpected behavior.
   */
  clip_children: int;
  /** The rendering layers in which this {@link CanvasItem} responds to {@link Light2D} nodes. */
  light_mask: int;
  /** The material applied to this {@link CanvasItem}. */
  material: Material | null;
  /**
   * The color applied to this {@link CanvasItem}. This property does affect child {@link CanvasItem}s, unlike {@link self_modulate} which only affects the node itself.
   */
  modulate: Color;
  /**
   * The color applied to this {@link CanvasItem}. This property does **not** affect child {@link CanvasItem}s, unlike {@link modulate} which affects both the node itself and its children.
   * **Note:** Internal children are also not affected by this property (see the `include_internal` parameter in {@link Node.add_child}). For built-in nodes this includes sliders in {@link ColorPicker}, and the tab bar in {@link TabContainer}.
   */
  self_modulate: Color;
  /** If `true`, this node draws behind its parent. */
  show_behind_parent: boolean;
  /** The filtering mode used to render this {@link CanvasItem}'s texture(s). */
  texture_filter: int;
  /**
   * The repeating mode used to render this {@link CanvasItem}'s texture(s). It affects what happens when the texture is sampled outside its extents, for example by setting a {@link Sprite2D.region_rect} that is larger than the texture or assigning {@link Polygon2D} UV points outside the texture.
   * **Note:** {@link TextureRect} is not affected by {@link texture_repeat}, as it uses its own texture repeating implementation.
   */
  texture_repeat: int;
  /**
   * If `true`, this {@link CanvasItem} will *not* inherit its transform from parent {@link CanvasItem}s. Its draw order will also be changed to make it draw on top of other {@link CanvasItem}s that do not have {@link top_level} set to `true`. The {@link CanvasItem} will effectively act as if it was placed as a child of a bare {@link Node}.
   */
  top_level: boolean;
  /** If `true`, the parent {@link CanvasItem}'s {@link material} is used as this node's material. */
  use_parent_material: boolean;
  /**
   * The rendering layer in which this {@link CanvasItem} is rendered by {@link Viewport} nodes. A {@link Viewport} will render a {@link CanvasItem} if it and all its parents share a layer with the {@link Viewport}'s canvas cull mask.
   * **Note:** A {@link CanvasItem} does not inherit its parents' visibility layers. This means that if a parent {@link CanvasItem} does not have all the same layers as its child, the child may not be visible even if both the parent and child have {@link visible} set to `true`. For example, if a parent has layer 1 and a child has layer 2, the child will not be visible in a {@link Viewport} with the canvas cull mask set to layer 1 or 2 (see {@link Viewport.canvas_cull_mask}). To ensure that both the parent and child are visible, the parent must have both layers 1 and 2, or the child must have {@link top_level} set to `true`.
   */
  visibility_layer: int;
  /**
   * If `true`, this {@link CanvasItem} may be drawn. Whether this {@link CanvasItem} is actually drawn depends on the visibility of all of its {@link CanvasItem} ancestors. In other words: this {@link CanvasItem} will be drawn when {@link is_visible_in_tree} returns `true` and all {@link CanvasItem} ancestors share at least one {@link visibility_layer} with this {@link CanvasItem}.
   * **Note:** For controls that inherit {@link Popup}, the correct way to make them visible is to call one of the multiple `popup*()` functions instead.
   */
  visible: boolean;
  /**
   * If `true`, this and child {@link CanvasItem} nodes with a higher Y position are rendered in front of nodes with a lower Y position. If `false`, this and child {@link CanvasItem} nodes are rendered normally in scene tree order.
   * With Y-sorting enabled on a parent node ('A') but disabled on a child node ('B'), the child node ('B') is sorted but its children ('C1', 'C2', etc.) render together on the same Y position as the child node ('B'). This allows you to organize the render order of a scene without changing the scene tree.
   * Nodes sort relative to each other only if they are on the same {@link z_index}.
   */
  y_sort_enabled: boolean;
  /**
   * If `true`, this node's final Z index is relative to its parent's Z index.
   * For example, if {@link z_index} is `2` and its parent's final Z index is `3`, then this node's final Z index will be `5` (`2 + 3`).
   */
  z_as_relative: boolean;
  /**
   * The order in which this node is drawn. A node with a higher Z index will display in front of others. Must be between {@link RenderingServer.CANVAS_ITEM_Z_MIN} and {@link RenderingServer.CANVAS_ITEM_Z_MAX} (inclusive).
   * **Note:** The Z index does **not** affect the order in which {@link CanvasItem} nodes are processed or the way input events are handled. This is especially important to keep in mind for {@link Control} nodes.
   */
  z_index: int;
  set_clip_children_mode(value: int): void;
  get_clip_children_mode(): int;
  set_light_mask(value: int): void;
  get_light_mask(): int;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_self_modulate(value: Color): void;
  get_self_modulate(): Color;
  set_draw_behind_parent(value: boolean): void;
  is_draw_behind_parent_enabled(): boolean;
  set_texture_filter(value: int): void;
  get_texture_filter(): int;
  set_texture_repeat(value: int): void;
  get_texture_repeat(): int;
  set_as_top_level(value: boolean): void;
  is_set_as_top_level(): boolean;
  set_use_parent_material(value: boolean): void;
  get_use_parent_material(): boolean;
  set_visibility_layer(value: int): void;
  get_visibility_layer(): int;
  set_visible(value: boolean): void;
  is_visible(): boolean;
  set_y_sort_enabled(value: boolean): void;
  is_y_sort_enabled(): boolean;
  set_z_as_relative(value: boolean): void;
  is_z_relative(): boolean;
  set_z_index(value: int): void;
  get_z_index(): int;

  /**
   * Called when {@link CanvasItem} has been requested to redraw (after {@link queue_redraw} is called, either manually or by the engine).
   * Corresponds to the {@link NOTIFICATION_DRAW} notification in {@link Object._notification}.
   */
  _draw(): void;
  /**
   * Subsequent drawing commands will be ignored unless they fall within the specified animation slice. This is a faster way to implement animations that loop on background rather than redrawing constantly.
   */
  draw_animation_slice(animation_length: float, slice_begin: float, slice_end: float, offset?: float): void;
  /**
   * Draws an unfilled arc between the given angles with a uniform `color` and `width` and optional antialiasing (supported only for positive `width`). The larger the value of `point_count`, the smoother the curve. `center` is defined in local space. For elliptical arcs, see {@link draw_ellipse_arc}. See also {@link draw_circle}.
   * If `width` is negative, it will be ignored and the arc will be drawn using {@link RenderingServer.PRIMITIVE_LINE_STRIP}. This means that when the CanvasItem is scaled, the arc will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * The arc is drawn from `start_angle` towards the value of `end_angle` so in clockwise direction if `start_angle < end_angle` and counter-clockwise otherwise. Passing the same angles but in reversed order will produce the same arc. If absolute difference of `start_angle` and `end_angle` is greater than {@link @GDScript.TAU} radians, then a full circle arc is drawn (i.e. arc will not overlap itself).
   */
  draw_arc(center: Vector2, radius: float, start_angle: float, end_angle: float, point_count: int, color: Color, width?: float, antialiased?: boolean): void;
  /**
   * Draws a string first character using a custom font. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. `pos` is defined in local space.
   */
  draw_char(font: Font, pos: Vector2, char: string, font_size?: int, modulate?: Color, oversampling?: float): void;
  /**
   * Draws a string first character outline using a custom font. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used. `pos` is defined in local space.
   */
  draw_char_outline(font: Font, pos: Vector2, char: string, font_size?: int, size?: int, modulate?: Color, oversampling?: float): void;
  /**
   * Draws a circle, with `position` defined in local space. See also {@link draw_ellipse}, {@link draw_arc}, {@link draw_polyline}, and {@link draw_polygon}.
   * If `filled` is `true`, the circle will be filled with the `color` specified. If `filled` is `false`, the circle will be drawn as a stroke with the `color` and `width` specified.
   * If `width` is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * If `antialiased` is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   * **Note:** `width` is only effective if `filled` is `false`.
   */
  draw_circle(position: Vector2, radius: float, color: Color, filled?: boolean, width?: float, antialiased?: boolean): void;
  /**
   * Draws a colored polygon of any number of points, convex or concave. The points in the `points` array are defined in local space. Unlike {@link draw_polygon}, a single color must be specified for the whole polygon.
   * **Note:** If you frequently redraw the same polygon with a large number of vertices, consider pre-calculating the triangulation with {@link Geometry2D.triangulate_polygon} and using {@link draw_mesh}, {@link draw_multimesh}, or {@link RenderingServer.canvas_item_add_triangle_array}.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_colored_polygon(points: PackedVector2Array, color: Color, uvs?: PackedVector2Array, texture?: Texture2D): void;
  /**
   * Draws a dashed line from a 2D point to another, with a given color and width. The `from` and `to` positions are defined in local space. See also {@link draw_line}, {@link draw_multiline}, and {@link draw_polyline}.
   * If `width` is negative, then a two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the line parts will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * `dash` is the length of each dash in pixels, with the gap between each dash being the same length. If `aligned` is `true`, the length of the first and last dashes may be shortened or lengthened to allow the line to begin and end at the precise points defined by `from` and `to`. Both ends are always symmetrical when `aligned` is `true`. If `aligned` is `false`, all dashes will have the same length, but the line may appear incomplete at the end due to the dash length not dividing evenly into the line length. Only full dashes are drawn when `aligned` is `false`.
   * If `antialiased` is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   * **Note:** `antialiased` is only effective if `width` is greater than `0.0`.
   */
  draw_dashed_line(from_: Vector2, to: Vector2, color: Color, width?: float, dash?: float, aligned?: boolean, antialiased?: boolean): void;
  /**
   * Draws an ellipse with semi-major axis `major` and semi-minor axis `minor`. See also {@link draw_circle}, {@link draw_ellipse_arc}, {@link draw_polyline}, and {@link draw_polygon}.
   * If `filled` is `true`, the ellipse will be filled with the `color` specified. If `filled` is `false`, the ellipse will be drawn as a stroke with the `color` and `width` specified.
   * If `width` is negative, then two-point primitives will be drawn instead of four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * If `antialiased` is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   * **Note:** `width` is only effective if `filled` is `false`.
   */
  draw_ellipse(position: Vector2, major: float, minor: float, color: Color, filled?: boolean, width?: float, antialiased?: boolean): void;
  /**
   * Draws an unfilled elliptical arc between the given angles with a uniform `color` and `width` and optional antialiasing (supported only for positive `width`). The larger the value of `point_count`, the smoother the curve. For circular arcs, see {@link draw_arc}. See also {@link draw_ellipse}.
   * If `width` is negative, it will be ignored and the arc will be drawn using {@link RenderingServer.PRIMITIVE_LINE_STRIP}. This means that when the CanvasItem is scaled, the arc will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * The arc is drawn from `start_angle` towards the value of `end_angle` so in clockwise direction if `start_angle < end_angle` and counter-clockwise otherwise. Passing the same angles but in reversed order will produce the same arc. If absolute difference of `start_angle` and `end_angle` is greater than {@link @GDScript.TAU} radians, then a full ellipse is drawn (i.e. arc will not overlap itself).
   */
  draw_ellipse_arc(center: Vector2, major: float, minor: float, start_angle: float, end_angle: float, point_count: int, color: Color, width?: float, antialiased?: boolean): void;
  /**
   * After submitting all animations slices via {@link draw_animation_slice}, this function can be used to revert drawing to its default state (all subsequent drawing commands will be visible). If you don't care about this particular use case, usage of this function after submitting the slices is not required.
   */
  draw_end_animation(): void;
  /**
   * Draws a textured rectangle region of the font texture with LCD subpixel anti-aliasing at a given position, optionally modulated by a color. The `rect` is defined in local space.
   * Texture is drawn using the following blend operation, blend mode of the {@link CanvasItemMaterial} is ignored:
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_lcd_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate?: Color): void;
  /**
   * Draws a line from a 2D point to another, with a given color and width. It can be optionally antialiased. The `from` and `to` positions are defined in local space. See also {@link draw_dashed_line}, {@link draw_multiline}, and {@link draw_polyline}.
   * If `width` is negative, then a two-point primitive will be drawn instead of a four-point one. This means that when the CanvasItem is scaled, the line will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   */
  draw_line(from_: Vector2, to: Vector2, color: Color, width?: float, antialiased?: boolean): void;
  /**
   * Draws a {@link Mesh} in 2D, using the provided texture. See {@link MeshInstance2D} for related documentation. The `transform` is defined in local space.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_mesh(mesh: Mesh, texture: Texture2D, transform?: Transform2D, modulate?: Color): void;
  /**
   * Draws a textured rectangle region of the multichannel signed distance field texture at a given position, optionally modulated by a color. The `rect` is defined in local space. See {@link FontFile.multichannel_signed_distance_field} for more information and caveats about MSDF font rendering.
   * If `outline` is positive, each alpha channel value of pixel in region is set to maximum value of true distance in the `outline` radius.
   * Value of the `pixel_range` should the same that was used during distance field texture generation.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_msdf_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate?: Color, outline?: float, pixel_range?: float, scale?: float): void;
  /**
   * Draws multiple disconnected lines with a uniform `width` and `color`. Each line is defined by two consecutive points from `points` array in local space, i.e. i-th segment consists of `points[2 * i]`, `points[2 * i + 1]` endpoints. When drawing large amounts of lines, this is faster than using individual {@link draw_line} calls. To draw interconnected lines, use {@link draw_polyline} instead.
   * If `width` is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * **Note:** `antialiased` is only effective if `width` is greater than `0.0`.
   */
  draw_multiline(points: PackedVector2Array, color: Color, width?: float, antialiased?: boolean): void;
  /**
   * Draws multiple disconnected lines with a uniform `width` and segment-by-segment coloring. Each segment is defined by two consecutive points from `points` array in local space and a corresponding color from `colors` array, i.e. i-th segment consists of `points[2 * i]`, `points[2 * i + 1]` endpoints and has `colors[i]` color. When drawing large amounts of lines, this is faster than using individual {@link draw_line} calls. To draw interconnected lines, use {@link draw_polyline_colors} instead.
   * If `width` is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * **Note:** `antialiased` is only effective if `width` is greater than `0.0`.
   */
  draw_multiline_colors(points: PackedVector2Array, colors: PackedColorArray, width?: float, antialiased?: boolean): void;
  /**
   * Breaks `text` into lines and draws it using the specified `font` at the `pos` in local space (top-left corner). The text will have its color multiplied by `modulate`. If `width` is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  draw_multiline_string(font: Font, pos: Vector2, text: string, alignment: int, width?: float, font_size?: int, max_lines?: int, modulate?: Color, brk_flags?: int, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Breaks `text` to the lines and draws text outline using the specified `font` at the `pos` in local space (top-left corner). The text will have its color multiplied by `modulate`. If `width` is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  draw_multiline_string_outline(font: Font, pos: Vector2, text: string, alignment: int, width?: float, font_size?: int, max_lines?: int, size?: int, modulate?: Color, brk_flags?: int, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Draws a {@link MultiMesh} in 2D with the provided texture. See {@link MultiMeshInstance2D} for related documentation.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_multimesh(multimesh: MultiMesh, texture: Texture2D): void;
  /**
   * Draws a solid polygon of any number of points, convex or concave. Unlike {@link draw_colored_polygon}, each point's color can be changed individually. The `points` array is defined in local space. See also {@link draw_polyline} and {@link draw_polyline_colors}. If you need more flexibility (such as being able to use bones), use {@link RenderingServer.canvas_item_add_triangle_array} instead.
   * **Note:** If you frequently redraw the same polygon with a large number of vertices, consider pre-calculating the triangulation with {@link Geometry2D.triangulate_polygon} and using {@link draw_mesh}, {@link draw_multimesh}, or {@link RenderingServer.canvas_item_add_triangle_array}.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_polygon(points: PackedVector2Array, colors: PackedColorArray, uvs?: PackedVector2Array, texture?: Texture2D): void;
  /**
   * Draws interconnected line segments with a uniform `color` and `width` and optional antialiasing (supported only for positive `width`). The `points` array is defined in local space. When drawing large amounts of lines, this is faster than using individual {@link draw_line} calls. To draw disconnected lines, use {@link draw_multiline} instead. See also {@link draw_polygon}.
   * If `width` is negative, it will be ignored and the polyline will be drawn using {@link RenderingServer.PRIMITIVE_LINE_STRIP}. This means that when the CanvasItem is scaled, the polyline will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   */
  draw_polyline(points: PackedVector2Array, color: Color, width?: float, antialiased?: boolean): void;
  /**
   * Draws interconnected line segments with a uniform `width`, point-by-point coloring, and optional antialiasing (supported only for positive `width`). Colors assigned to line points match by index between `points` and `colors`, i.e. each line segment is filled with a gradient between the colors of the endpoints. The `points` array is defined in local space. When drawing large amounts of lines, this is faster than using individual {@link draw_line} calls. To draw disconnected lines, use {@link draw_multiline_colors} instead. See also {@link draw_polygon}.
   * If `width` is negative, it will be ignored and the polyline will be drawn using {@link RenderingServer.PRIMITIVE_LINE_STRIP}. This means that when the CanvasItem is scaled, the polyline will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   */
  draw_polyline_colors(points: PackedVector2Array, colors: PackedColorArray, width?: float, antialiased?: boolean): void;
  /**
   * Draws a custom primitive. 1 point for a point, 2 points for a line, 3 points for a triangle, and 4 points for a quad. If 0 points or more than 4 points are specified, nothing will be drawn and an error message will be printed. The `points` array is defined in local space. See also {@link draw_line}, {@link draw_polyline}, {@link draw_polygon}, and {@link draw_rect}.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_primitive(points: PackedVector2Array, colors: PackedColorArray, uvs: PackedVector2Array, texture?: Texture2D): void;
  /**
   * Draws a rectangle. If `filled` is `true`, the rectangle will be filled with the `color` specified. If `filled` is `false`, the rectangle will be drawn as a stroke with the `color` and `width` specified. The `rect` is specified in local space. See also {@link draw_texture_rect}.
   * If `width` is negative, then two-point primitives will be drawn instead of a four-point ones. This means that when the CanvasItem is scaled, the lines will remain thin. If this behavior is not desired, then pass a positive `width` like `1.0`.
   * If `antialiased` is `true`, half transparent "feathers" will be attached to the boundary, making outlines smooth.
   * **Note:** `width` is only effective if `filled` is `false`.
   * **Note:** Unfilled rectangles drawn with a negative `width` may not display perfectly. For example, corners may be missing or brighter due to overlapping lines (for a translucent `color`).
   */
  draw_rect(rect: Rect2, color: Color, filled?: boolean, width?: float, antialiased?: boolean): void;
  /**
   * Sets a custom local transform for drawing via components. Anything drawn afterwards will be transformed by this.
   * **Note:** {@link FontFile.oversampling} does *not* take `scale` into account. This means that scaling up/down will cause bitmap fonts and rasterized (non-MSDF) dynamic fonts to appear blurry or pixelated. To ensure text remains crisp regardless of scale, you can enable MSDF font rendering by enabling {@link ProjectSettings.gui/theme/default_font_multichannel_signed_distance_field} (applies to the default project font only), or enabling **Multichannel Signed Distance Field** in the import options of a DynamicFont for custom fonts. On system fonts, {@link SystemFont.multichannel_signed_distance_field} can be enabled in the inspector.
   */
  draw_set_transform(position: Vector2, rotation?: float, scale?: Vector2): void;
  /**
   * Sets a custom local transform for drawing via matrix. Anything drawn afterwards will be transformed by this.
   */
  draw_set_transform_matrix(xform: Transform2D): void;
  /**
   * Draws `text` using the specified `font` at the `pos` in local space (bottom-left corner using the baseline of the font). The text will have its color multiplied by `modulate`. If `width` is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * **Example:** Draw "Hello world", using the project's default font:
   * See also {@link Font.draw_string}.
   */
  draw_string(font: Font, pos: Vector2, text: string, alignment: int, width?: float, font_size?: int, modulate?: Color, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Draws `text` outline using the specified `font` at the `pos` in local space (bottom-left corner using the baseline of the font). The text will have its color multiplied by `modulate`. If `width` is greater than or equal to 0, the text will be clipped if it exceeds the specified width. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  draw_string_outline(font: Font, pos: Vector2, text: string, alignment: int, width?: float, font_size?: int, size?: int, modulate?: Color, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Draws a styled rectangle. The `rect` is defined in local space.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_style_box(style_box: StyleBox, rect: Rect2): void;
  /**
   * Draws a texture at a given position. The `position` is defined in local space.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_texture(texture: Texture2D, position: Vector2, modulate?: Color): void;
  /**
   * Draws a textured rectangle at a given position, optionally modulated by a color. The `rect` is defined in local space. If `transpose` is `true`, the texture will have its X and Y coordinates swapped. See also {@link draw_rect} and {@link draw_texture_rect_region}.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_texture_rect(texture: Texture2D, rect: Rect2, tile: boolean, modulate?: Color, transpose?: boolean): void;
  /**
   * Draws a textured rectangle from a texture's region (specified by `src_rect`) at a given position in local space, optionally modulated by a color. If `transpose` is `true`, the texture will have its X and Y coordinates swapped. See also {@link draw_texture_rect}.
   * **Note:** Styleboxes, textures, and meshes stored only inside local variables should **not** be used with this method in GDScript, because the drawing operation doesn't begin immediately once this method is called. In GDScript, when the function with the local variables ends, the local variables get destroyed before the rendering takes place.
   */
  draw_texture_rect_region(texture: Texture2D, rect: Rect2, src_rect: Rect2, modulate?: Color, transpose?: boolean, clip_uv?: boolean): void;
  /**
   * Forces the node's transform to update. Fails if the node is not inside the tree. See also {@link get_transform}.
   * **Note:** For performance reasons, transform changes are usually accumulated and applied *once* at the end of the frame. The update propagates through {@link CanvasItem} children, as well. Therefore, use this method only when you need an up-to-date transform (such as during physics operations).
   */
  force_update_transform(): void;
  /**
   * Returns the {@link RID} of the {@link World2D} canvas where this node is registered to, used by the {@link RenderingServer}.
   */
  get_canvas(): RID;
  /** Returns the internal canvas item {@link RID} used by the {@link RenderingServer} for this node. */
  get_canvas_item(): RID;
  /**
   * Returns the {@link CanvasLayer} that contains this node, or `null` if the node is not in any {@link CanvasLayer}.
   */
  get_canvas_layer_node(): CanvasLayer | null;
  /**
   * Returns the transform of this node, converted from its registered canvas's coordinate system to its viewport's coordinate system. See also {@link Node.get_viewport}.
   */
  get_canvas_transform(): Transform2D;
  /**
   * Returns mouse cursor's global position relative to the {@link CanvasLayer} that contains this node.
   * **Note:** For screen-space coordinates (e.g. when using a non-embedded {@link Popup}), you can use {@link DisplayServer.mouse_get_position}.
   */
  get_global_mouse_position(): Vector2;
  /**
   * Returns the global transform matrix of this item, i.e. the combined transform up to the topmost {@link CanvasItem} node. The topmost item is a {@link CanvasItem} that either has no parent, has non-{@link CanvasItem} parent or it has {@link top_level} enabled.
   */
  get_global_transform(): Transform2D;
  /**
   * Returns the transform from the local coordinate system of this {@link CanvasItem} to the {@link Viewport}s coordinate system.
   */
  get_global_transform_with_canvas(): Transform2D;
  /** Get the value of a shader parameter as set on this instance. */
  get_instance_shader_parameter(name: string): unknown;
  /**
   * Returns the mouse's position in this {@link CanvasItem} using the local coordinate system of this {@link CanvasItem}.
   */
  get_local_mouse_position(): Vector2;
  /**
   * Returns the transform of this {@link CanvasItem} in global screen coordinates (i.e. taking window position into account). Mostly useful for editor plugins.
   * Equivalent to {@link get_global_transform_with_canvas} if the window is embedded (see {@link Viewport.gui_embed_subwindows}).
   */
  get_screen_transform(): Transform2D;
  /** Returns the transform matrix of this {@link CanvasItem}. */
  get_transform(): Transform2D;
  /** Returns this node's viewport boundaries as a {@link Rect2}. See also {@link Node.get_viewport}. */
  get_viewport_rect(): Rect2;
  /**
   * Returns the transform of this node, converted from its registered canvas's coordinate system to its viewport embedder's coordinate system. See also {@link Viewport.get_final_transform} and {@link Node.get_viewport}.
   */
  get_viewport_transform(): Transform2D;
  /** Returns `true` if the layer at the given index is set in {@link visibility_layer}. */
  get_visibility_layer_bit(layer: int): boolean;
  /**
   * Returns the {@link World2D} this node is registered to.
   * Usually, this is the same as this node's viewport (see {@link Node.get_viewport} and {@link Viewport.find_world_2d}).
   */
  get_world_2d(): World2D | null;
  /**
   * Hide the {@link CanvasItem} if it's currently visible. This is equivalent to setting {@link visible} to `false`.
   */
  hide(): void;
  /**
   * Returns `true` if the node receives {@link NOTIFICATION_LOCAL_TRANSFORM_CHANGED} whenever its local transform changes. This is enabled with {@link set_notify_local_transform}.
   */
  is_local_transform_notification_enabled(): boolean;
  /**
   * Returns `true` if the node receives {@link NOTIFICATION_TRANSFORM_CHANGED} whenever its global transform changes. This is enabled with {@link set_notify_transform}.
   */
  is_transform_notification_enabled(): boolean;
  /**
   * Returns `true` if the node is present in the {@link SceneTree}, its {@link visible} property is `true` and all its ancestors are also visible. If any ancestor is hidden, this node will not be visible in the scene tree, and is therefore not drawn (see {@link _draw}).
   * Visibility is checked only in parent nodes that inherit from {@link CanvasItem}, {@link CanvasLayer}, and {@link Window}. If the parent is of any other type (such as {@link Node}, {@link AnimationPlayer}, or {@link Node3D}), it is assumed to be visible.
   * **Note:** This method does not take {@link visibility_layer} into account, so even if this method returns `true`, the node might end up not being rendered.
   */
  is_visible_in_tree(): boolean;
  /**
   * Transforms `viewport_point` from the viewport's coordinates to this node's local coordinates.
   * For the opposite operation, use {@link get_global_transform_with_canvas}.
   */
  make_canvas_position_local(viewport_point: Vector2): Vector2;
  /**
   * Returns a copy of the given `event` with its coordinates converted from global space to this {@link CanvasItem}'s local space. If not possible, returns the same {@link InputEvent} unchanged.
   */
  make_input_local(event: InputEvent): InputEvent | null;
  /**
   * Moves this node below its siblings, usually causing the node to draw on top of its siblings. Does nothing if this node does not have a parent. See also {@link Node.move_child}.
   */
  move_to_front(): void;
  /**
   * Queues the {@link CanvasItem} to redraw. During idle time, if {@link CanvasItem} is visible, {@link NOTIFICATION_DRAW} is sent and {@link _draw} is called. This only occurs **once** per frame, even if this method has been called multiple times.
   */
  queue_redraw(): void;
  /**
   * Set the value of a shader uniform for this instance only (per-instance uniform ($DOCS_URL/tutorials/shaders/shader_reference/shading_language.html#per-instance-uniforms)). See also {@link ShaderMaterial.set_shader_parameter} to assign a uniform on all instances using the same {@link ShaderMaterial}.
   * **Note:** For a shader uniform to be assignable on a per-instance basis, it *must* be defined with `instance uniform ...` rather than `uniform ...` in the shader code.
   * **Note:** `name` is case-sensitive and must match the name of the uniform in the code exactly (not the capitalized name in the inspector).
   */
  set_instance_shader_parameter(name: string, value: unknown): void;
  /**
   * If `true`, the node will receive {@link NOTIFICATION_LOCAL_TRANSFORM_CHANGED} whenever its local transform changes.
   * **Note:** Many canvas items such as {@link Bone2D} or {@link CollisionShape2D} automatically enable this in order to function correctly.
   */
  set_notify_local_transform(enable: boolean): void;
  /**
   * If `true`, the node will receive {@link NOTIFICATION_TRANSFORM_CHANGED} whenever its global transform changes.
   * **Note:** Many canvas items such as {@link Camera2D} or {@link Light2D} automatically enable this in order to function correctly.
   */
  set_notify_transform(enable: boolean): void;
  /**
   * Set/clear individual bits on the rendering visibility layer. This simplifies editing this {@link CanvasItem}'s visibility layer.
   */
  set_visibility_layer_bit(layer: int, enabled: boolean): void;
  /**
   * Show the {@link CanvasItem} if it's currently hidden. This is equivalent to setting {@link visible} to `true`.
   * **Note:** For controls that inherit {@link Popup}, the correct way to make them visible is to call one of the multiple `popup*()` functions instead.
   */
  show(): void;

  /**
   * Emitted when the {@link CanvasItem} must redraw, *after* the related {@link NOTIFICATION_DRAW} notification, and *before* {@link _draw} is called.
   * **Note:** Deferred connections do not allow drawing through the `draw_*` methods.
   */
  draw: Signal<[]>;
  /**
   * Emitted when this node becomes hidden, i.e. it's no longer visible in the tree (see {@link is_visible_in_tree}).
   */
  hidden: Signal<[]>;
  /**
   * Emitted when the {@link CanvasItem}'s boundaries (position or size) change, or when an action took place that may have affected these boundaries (e.g. changing {@link Sprite2D.texture}).
   */
  item_rect_changed: Signal<[]>;
  /**
   * Emitted when the {@link CanvasItem}'s visibility changes, either because its own {@link visible} property changed or because its visibility in the tree changed (see {@link is_visible_in_tree}).
   * This signal is emitted *after* the related {@link NOTIFICATION_VISIBILITY_CHANGED} notification.
   */
  visibility_changed: Signal<[]>;

  // enum TextureFilter
  /** The {@link CanvasItem} will inherit the filter from its parent. */
  static readonly TEXTURE_FILTER_PARENT_NODE: int;
  /**
   * The texture filter reads from the nearest pixel only. This makes the texture look pixelated from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly TEXTURE_FILTER_NEAREST: int;
  /**
   * The texture filter blends between the nearest 4 pixels. This makes the texture look smooth from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly TEXTURE_FILTER_LINEAR: int;
  /**
   * The texture filter reads from the nearest pixel and blends between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look pixelated from up close, and smooth from a distance.
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to {@link Camera2D} zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   */
  static readonly TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: int;
  /**
   * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look smooth from up close, and smooth from a distance.
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to {@link Camera2D} zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   */
  static readonly TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: int;
  /**
   * The texture filter reads from the nearest pixel and blends between 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`) based on the angle between the surface and the camera view. This makes the texture look pixelated from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting {@link ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level}.
   * **Note:** This texture filter is rarely useful in 2D projects. {@link TEXTURE_FILTER_NEAREST_WITH_MIPMAPS} is usually more appropriate in this case.
   */
  static readonly TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC: int;
  /**
   * The texture filter blends between the nearest 4 pixels and blends between 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`) based on the angle between the surface and the camera view. This makes the texture look smooth from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting {@link ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level}.
   * **Note:** This texture filter is rarely useful in 2D projects. {@link TEXTURE_FILTER_LINEAR_WITH_MIPMAPS} is usually more appropriate in this case.
   */
  static readonly TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC: int;
  /** Represents the size of the {@link TextureFilter} enum. */
  static readonly TEXTURE_FILTER_MAX: int;
  // enum TextureRepeat
  /** The {@link CanvasItem} will inherit the repeat mode from its parent. */
  static readonly TEXTURE_REPEAT_PARENT_NODE: int;
  /**
   * The texture does not repeat. Sampling the texture outside its extents will result in "stretching" of the edge pixels. You can avoid this by ensuring a 1-pixel fully transparent border on each side of the texture.
   */
  static readonly TEXTURE_REPEAT_DISABLED: int;
  /** The texture repeats when exceeding the texture's size. */
  static readonly TEXTURE_REPEAT_ENABLED: int;
  /**
   * The texture repeats when the exceeding the texture's size in a "2×2 tiled mode". Repeated textures at even positions are mirrored.
   */
  static readonly TEXTURE_REPEAT_MIRROR: int;
  /** Represents the size of the {@link TextureRepeat} enum. */
  static readonly TEXTURE_REPEAT_MAX: int;
  // enum ClipChildrenMode
  /** Children are drawn over this node and are not clipped. */
  static readonly CLIP_CHILDREN_DISABLED: int;
  /**
   * This node is used as a mask and is **not** drawn. The mask is based on this node's alpha channel: Opaque pixels are kept, transparent pixels are discarded, and semi-transparent pixels are blended in according to their opacity. Children are clipped to this node's drawn area.
   */
  static readonly CLIP_CHILDREN_ONLY: int;
  /**
   * This node is used as a mask and is also drawn. The mask is based on this node's alpha channel: Opaque pixels are kept, transparent pixels are discarded, and semi-transparent pixels are blended in according to their opacity. Children are clipped to the parent's drawn area.
   */
  static readonly CLIP_CHILDREN_AND_DRAW: int;
  /** Represents the size of the {@link ClipChildrenMode} enum. */
  static readonly CLIP_CHILDREN_MAX: int;

  /**
   * Notification received when this node's global transform changes, if {@link is_transform_notification_enabled} is `true`. See also {@link set_notify_transform} and {@link get_transform}.
   * **Note:** Many canvas items such as {@link Camera2D} or {@link CollisionObject2D} automatically enable this in order to function correctly.
   */
  static readonly NOTIFICATION_TRANSFORM_CHANGED: int;
  /**
   * Notification received when this node's transform changes, if {@link is_local_transform_notification_enabled} is `true`. This is not received when a parent {@link Node2D}'s transform changes. See also {@link set_notify_local_transform}.
   * **Note:** Many canvas items such as {@link Camera2D} or {@link CollisionShape2D} automatically enable this in order to function correctly.
   */
  static readonly NOTIFICATION_LOCAL_TRANSFORM_CHANGED: int;
  /** The {@link CanvasItem} is requested to draw (see {@link _draw}). */
  static readonly NOTIFICATION_DRAW: int;
  /**
   * Notification received when this node's visibility changes (see {@link visible} and {@link is_visible_in_tree}).
   * This notification is received *before* the related {@link visibility_changed} signal.
   */
  static readonly NOTIFICATION_VISIBILITY_CHANGED: int;
  /** The {@link CanvasItem} has entered the canvas. */
  static readonly NOTIFICATION_ENTER_CANVAS: int;
  /**
   * The {@link CanvasItem} has exited the canvas.
   * This notification is sent in reversed order.
   */
  static readonly NOTIFICATION_EXIT_CANVAS: int;
  /**
   * Notification received when this {@link CanvasItem} is registered to a new {@link World2D} (see {@link get_world_2d}).
   */
  static readonly NOTIFICATION_WORLD_2D_CHANGED: int;
}
