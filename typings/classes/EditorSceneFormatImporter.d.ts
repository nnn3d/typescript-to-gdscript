// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports scenes from third-parties' 3D files. */
declare class EditorSceneFormatImporter extends RefCounted {
  /** Return supported file extensions for this scene importer. */
  _get_extensions(): PackedStringArray;
  /**
   * Override to add general import options. These will appear in the main import dock on the editor. Add options via {@link add_import_option} and {@link add_import_option_advanced}.
   * **Note:** All {@link EditorSceneFormatImporter} and {@link EditorScenePostImportPlugin} instances will add options for all files. It is good practice to check the file extension when `path` is non-empty.
   * When the user is editing project settings, `path` will be empty. It is recommended to add all options when `path` is empty to allow the user to customize Import Defaults.
   */
  _get_import_options(path: string | NodePath): void;
  /**
   * Should return `true` to show the given option, `false` to hide the given option, or `null` to ignore.
   */
  _get_option_visibility(path: string | NodePath, for_animation: boolean, option: string | NodePath): unknown;
  /**
   * Perform the bulk of the scene import logic here, for example using {@link GLTFDocument} or {@link FBXDocument}.
   */
  _import_scene(path: string | NodePath, flags: int, options: Dictionary): GodotObject | null;
  /**
   * Add a specific import option (name and default value only). This function can only be called from {@link _get_import_options}.
   */
  add_import_option(name: string | NodePath, value: unknown): void;
  /** Add a specific import option. This function can only be called from {@link _get_import_options}. */
  add_import_option_advanced(type_: int, name: string | NodePath, default_value: unknown, hint: int, hint_string?: string | NodePath, usage_flags?: int): void;

  // enum ImportFlags
  /** Unused flag (this has no effect when enabled). */
  static readonly IMPORT_SCENE: int;
  /**
   * Import animations from the 3D scene. When importing a scene as an {@link AnimationLibrary}, this flag is always enabled.
   */
  static readonly IMPORT_ANIMATION: int;
  /** Unused flag (this has no effect when enabled). */
  static readonly IMPORT_FAIL_ON_MISSING_DEPENDENCIES: int;
  /**
   * If `true`, generate vertex tangents using Mikktspace (http://www.mikktspace.com/) if the input meshes don't have tangent data. When possible, it's recommended to let the 3D modeling software generate tangents on export instead of relying on this option. Tangents are required for correct display of normal and height maps, along with any material/shader features that require tangents.
   * If you don't need material features that require tangents, disabling this can reduce output file size and speed up importing if the source 3D file doesn't contain tangents.
   */
  static readonly IMPORT_GENERATE_TANGENT_ARRAYS: int;
  /**
   * If checked, use named {@link Skin}s for animation. The {@link MeshInstance3D} node contains 3 properties of relevance here: a skeleton {@link NodePath} pointing to the {@link Skeleton3D} node (usually `..`), a mesh, and a skin:
   * - The {@link Skeleton3D} node contains a list of bones with names, their pose and rest, a name, and a parent bone.
   * - The mesh is all of the raw vertex data needed to display a mesh. In terms of the mesh, it knows how vertices are weight-painted and uses some internal numbering often imported from 3D modeling software.
   * - The skin contains the information necessary to bind this mesh onto this Skeleton3D. For each of the internal bone IDs chosen by the 3D modeling software, it contains two things. Firstly, a matrix known as the Bind Pose Matrix, Inverse Bind Matrix, or IBM for short. Secondly, the {@link Skin} contains each bone's name (if this flag is enabled), or the bone's index within the {@link Skeleton3D} list (if this flag is disabled).
   * Together, this information is enough to tell Godot how to use the bone poses in the {@link Skeleton3D} node to render the mesh from each {@link MeshInstance3D}. Note that each {@link MeshInstance3D} may share binds, as is common in models exported from Blender, or each {@link MeshInstance3D} may use a separate {@link Skin} object, as is common in models exported from other tools such as Maya.
   */
  static readonly IMPORT_USE_NAMED_SKIN_BINDS: int;
  /**
   * Ignore meshes and materials on import. When importing a scene as an {@link AnimationLibrary}, this flag is always enabled.
   */
  static readonly IMPORT_DISCARD_MESHES_AND_MATERIALS: int;
  /**
   * If `true`, mesh compression will not be used. Consider enabling if you notice blocky artifacts in your mesh normals or UVs, or if you have meshes that are larger than a few thousand meters in each direction.
   */
  static readonly IMPORT_FORCE_DISABLE_MESH_COMPRESSION: int;
}
