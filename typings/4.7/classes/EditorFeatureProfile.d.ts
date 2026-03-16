// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An editor feature profile which can be used to disable specific features. */
declare class EditorFeatureProfile extends RefCounted {
  /** Returns the specified `feature`'s human-readable name. */
  get_feature_name(feature: int): string;
  /**
   * Returns `true` if the class specified by `class_name` is disabled. When disabled, the class won't appear in the Create New Node dialog.
   */
  is_class_disabled(class_name: string): boolean;
  /**
   * Returns `true` if editing for the class specified by `class_name` is disabled. When disabled, the class will still appear in the Create New Node dialog but the Inspector will be read-only when selecting a node that extends the class.
   */
  is_class_editor_disabled(class_name: string): boolean;
  /**
   * Returns `true` if `property` is disabled in the class specified by `class_name`. When a property is disabled, it won't appear in the Inspector when selecting a node that extends the class specified by `class_name`.
   */
  is_class_property_disabled(class_name: string, property: string): boolean;
  /**
   * Returns `true` if the `feature` is disabled. When a feature is disabled, it will disappear from the editor entirely.
   */
  is_feature_disabled(feature: int): boolean;
  /**
   * Loads an editor feature profile from a file. The file must follow the JSON format obtained by using the feature profile manager's **Export** button or the {@link save_to_file} method.
   * **Note:** Feature profiles created via the user interface are loaded from the `feature_profiles` directory, as a file with the `.profile` extension. The editor configuration folder can be found by using {@link EditorPaths.get_config_dir}.
   */
  load_from_file(path: string): int;
  /**
   * Saves the editor feature profile to a file in JSON format. It can then be imported using the feature profile manager's **Import** button or the {@link load_from_file} method.
   * **Note:** Feature profiles created via the user interface are saved in the `feature_profiles` directory, as a file with the `.profile` extension. The editor configuration folder can be found by using {@link EditorPaths.get_config_dir}.
   */
  save_to_file(path: string): int;
  /**
   * If `disable` is `true`, disables the class specified by `class_name`. When disabled, the class won't appear in the Create New Node dialog.
   */
  set_disable_class(class_name: string, disable: boolean): void;
  /**
   * If `disable` is `true`, disables editing for the class specified by `class_name`. When disabled, the class will still appear in the Create New Node dialog but the Inspector will be read-only when selecting a node that extends the class.
   */
  set_disable_class_editor(class_name: string, disable: boolean): void;
  /**
   * If `disable` is `true`, disables editing for `property` in the class specified by `class_name`. When a property is disabled, it won't appear in the Inspector when selecting a node that extends the class specified by `class_name`.
   */
  set_disable_class_property(class_name: string, property: string, disable: boolean): void;
  /**
   * If `disable` is `true`, disables the editor feature specified in `feature`. When a feature is disabled, it will disappear from the editor entirely.
   */
  set_disable_feature(feature: int, disable: boolean): void;

  // enum Feature
  /**
   * The 3D editor. If this feature is disabled, the 3D editor won't display but 3D nodes will still display in the Create New Node dialog.
   */
  static readonly FEATURE_3D: int;
  /**
   * The Script tab, which contains the script editor and class reference browser. If this feature is disabled, the Script tab won't display.
   */
  static readonly FEATURE_SCRIPT: int;
  /** The AssetLib tab. If this feature is disabled, the AssetLib tab won't display. */
  static readonly FEATURE_ASSET_LIB: int;
  /**
   * Scene tree editing. If this feature is disabled, the Scene tree dock will still be visible but will be read-only.
   */
  static readonly FEATURE_SCENE_TREE: int;
  /**
   * The Node dock. If this feature is disabled, signals and groups won't be visible and modifiable from the editor.
   */
  static readonly FEATURE_NODE_DOCK: int;
  /** The FileSystem dock. If this feature is disabled, the FileSystem dock won't be visible. */
  static readonly FEATURE_FILESYSTEM_DOCK: int;
  /** The Import dock. If this feature is disabled, the Import dock won't be visible. */
  static readonly FEATURE_IMPORT_DOCK: int;
  /** The History dock. If this feature is disabled, the History dock won't be visible. */
  static readonly FEATURE_HISTORY_DOCK: int;
  /**
   * The Game tab, which allows embedding the game window and selecting nodes by clicking inside of it. If this feature is disabled, the Game tab won't display.
   */
  static readonly FEATURE_GAME: int;
  /**
   * The Signals dock. If this feature is disabled, signals won't be visible and modifiable from the editor.
   */
  static readonly FEATURE_SIGNALS_DOCK: int;
  /**
   * The Groups dock. If this feature is disabled, groups won't be visible and modifiable from the editor.
   */
  static readonly FEATURE_GROUPS_DOCK: int;
  /** Represents the size of the {@link Feature} enum. */
  static readonly FEATURE_MAX: int;
}
