// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Editor-only singleton that returns paths to various OS-specific data folders and files. */
declare class EditorPaths extends GodotObject {
  /**
   * Returns the absolute path to the user's cache folder. This folder should be used for temporary data that can be removed safely whenever the editor is closed (such as generated resource thumbnails).
   * **Default paths per platform:**
   * [codeblock lang=text]
   * - Windows: %LOCALAPPDATA%\Godot\
   * - macOS: ~/Library/Caches/Godot/
   * - Linux: ~/.cache/godot/
   * [/codeblock]
   */
  get_cache_dir(): string;
  /**
   * Returns the absolute path to the user's configuration folder. This folder should be used for *persistent* user configuration files.
   * **Default paths per platform:**
   * [codeblock lang=text]
   * - Windows: %APPDATA%\Godot\                    (same as `get_data_dir()`)
   * - macOS: ~/Library/Application Support/Godot/  (same as `get_data_dir()`)
   * - Linux: ~/.config/godot/
   * [/codeblock]
   */
  get_config_dir(): string;
  /**
   * Returns the absolute path to the user's data folder. This folder should be used for *persistent* user data files such as installed export templates.
   * **Default paths per platform:**
   * [codeblock lang=text]
   * - Windows: %APPDATA%\Godot\                    (same as `get_config_dir()`)
   * - macOS: ~/Library/Application Support/Godot/  (same as `get_config_dir()`)
   * - Linux: ~/.local/share/godot/
   * [/codeblock]
   */
  get_data_dir(): string;
  /**
   * Returns the relative path to the editor settings for this project. This is usually `"res://.godot/editor"`. Projects all have a unique subdirectory inside the settings path where project-specific editor settings are saved.
   */
  get_project_settings_dir(): string;
  /**
   * Returns the absolute path to the self-contained file that makes the current Godot editor instance be considered as self-contained. Returns an empty string if the current Godot editor instance isn't self-contained. See also {@link is_self_contained}.
   */
  get_self_contained_file(): string;
  /**
   * Returns `true` if the editor is marked as self-contained, `false` otherwise. When self-contained mode is enabled, user configuration, data and cache files are saved in an `editor_data/` folder next to the editor binary. This makes portable usage easier and ensures the Godot editor minimizes file writes outside its own folder. Self-contained mode is not available for exported projects.
   * Self-contained mode can be enabled by creating a file named `._sc_` or `_sc_` in the same folder as the editor binary or macOS .app bundle while the editor is not running. See also {@link get_self_contained_file}.
   * **Note:** On macOS, quarantine flag should be manually removed before using self-contained mode, see Running on macOS (https://docs.godotengine.org/en/stable/tutorials/export/running_on_macos.html).
   * **Note:** On macOS, placing `_sc_` or any other file inside .app bundle will break digital signature and make it non-portable, consider placing it in the same folder as the .app bundle instead.
   * **Note:** The Steam release of Godot uses self-contained mode by default.
   */
  is_self_contained(): boolean;
}
