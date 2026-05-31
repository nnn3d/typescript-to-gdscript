// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A script that is executed when exporting the project. */
declare class EditorExportPlugin extends RefCounted {
  /**
   * Return `true` if this plugin will customize resources based on the platform and features used.
   * When enabled, {@link _get_customization_configuration_hash} and {@link _customize_resource} will be called and must be implemented.
   */
  _begin_customize_resources(platform: EditorExportPlatform, features: PackedStringArray | Array<unknown>): boolean;
  /**
   * Return `true` if this plugin will customize scenes based on the platform and features used.
   * When enabled, {@link _get_customization_configuration_hash} and {@link _customize_scene} will be called and must be implemented.
   * **Note:** {@link _customize_scene} will only be called for scenes that have been modified since the last export.
   */
  _begin_customize_scenes(platform: EditorExportPlatform, features: PackedStringArray | Array<unknown>): boolean;
  /**
   * Customize a resource. If changes are made to it, return the same or a new resource. Otherwise, return `null`. When a new resource is returned, `resource` will be replaced by a copy of the new resource.
   * The `path` argument is only used when customizing an actual file, otherwise this means that this resource is part of another one and it will be empty.
   * Implementing this method is required if {@link _begin_customize_resources} returns `true`.
   * **Note:** When customizing any of the following types and returning another resource, the other resource should not be skipped using {@link skip} in {@link _export_file}:
   * - {@link AtlasTexture}
   * - {@link CompressedCubemap}
   * - {@link CompressedCubemapArray}
   * - {@link CompressedTexture2D}
   * - {@link CompressedTexture2DArray}
   * - {@link CompressedTexture3D}
   */
  _customize_resource(resource: Resource, path: string | NodePath): Resource | null;
  /**
   * Customize a scene. If changes are made to it, return the same or a new scene. Otherwise, return `null`. If a new scene is returned, it is up to you to dispose of the old one.
   * Implementing this method is required if {@link _begin_customize_scenes} returns `true`.
   */
  _customize_scene(scene: Node, path: string | NodePath): Node | null;
  /** This is called when the customization process for resources ends. */
  _end_customize_resources(): void;
  /** This is called when the customization process for scenes ends. */
  _end_customize_scenes(): void;
  /**
   * This is called after Xcode project generation, but before it is built.
   * **Note:** Only supported on iOS and visionOS.
   */
  _end_generate_apple_embedded_project(path: string | NodePath, will_build_archive: boolean): void;
  /**
   * Virtual method to be overridden by the user. It is called when the export starts and provides all information about the export. `features` is the list of features for the export, `is_debug` is `true` for debug builds, `path` is the target path for the exported project. `flags` is only used when running a runnable profile, e.g. when using native run on Android.
   */
  _export_begin(features: PackedStringArray | Array<unknown>, is_debug: boolean, path: string | NodePath, flags: int): void;
  /** Virtual method to be overridden by the user. Called when the export is finished. */
  _export_end(): void;
  /**
   * Virtual method to be overridden by the user. Called for each exported file before {@link _customize_resource} and {@link _customize_scene}. The arguments can be used to identify the file. `path` is the path of the file, `type` is the {@link Resource} represented by the file (e.g. {@link PackedScene}), and `features` is the list of features for the export.
   * Calling {@link skip} inside this callback will make the file not included in the export.
   */
  _export_file(path: string | NodePath, type_: string | NodePath, features: PackedStringArray | Array<unknown>): void;
  /**
   * Virtual method to be overridden by the user. This is called to retrieve the set of Android dependencies provided by this plugin. Each returned Android dependency should have the format of an Android remote binary dependency: `org.godot.example:my-plugin:0.0.0`
   * For more information see Android documentation on dependencies (https://developer.android.com/build/dependencies?agpversion=4.1#dependency-types).
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_dependencies(platform: EditorExportPlatform, debug: boolean): PackedStringArray;
  /**
   * Virtual method to be overridden by the user. This is called to retrieve the URLs of Maven repositories for the set of Android dependencies provided by this plugin.
   * For more information see Gradle documentation on dependency management (https://docs.gradle.org/current/userguide/dependency_management.html#sec:maven_repo).
   * **Note:** Google's Maven repo and the Maven Central repo are already included by default.
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_dependencies_maven_repos(platform: EditorExportPlatform, debug: boolean): PackedStringArray;
  /**
   * Virtual method to be overridden by the user. This is called to retrieve the local paths of the Android libraries archive (AAR) files provided by this plugin.
   * **Note:** Relative paths **must** be relative to Godot's `res://addons/` directory. For example, an AAR file located under `res://addons/hello_world_plugin/HelloWorld.release.aar` can be returned as an absolute path using `res://addons/hello_world_plugin/HelloWorld.release.aar` or a relative path using `hello_world_plugin/HelloWorld.release.aar`.
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_libraries(platform: EditorExportPlatform, debug: boolean): PackedStringArray;
  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `activity` element in the generated Android manifest.
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_manifest_activity_element_contents(platform: EditorExportPlatform, debug: boolean): string;
  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `application` element in the generated Android manifest.
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_manifest_application_element_contents(platform: EditorExportPlatform, debug: boolean): string;
  /**
   * Virtual method to be overridden by the user. This is used at export time to update the contents of the `manifest` element in the generated Android manifest.
   * **Note:** Only supported on Android and requires {@link EditorExportPlatformAndroid.gradle_build/use_gradle_build} to be enabled.
   */
  _get_android_manifest_element_contents(platform: EditorExportPlatform, debug: boolean): string;
  /**
   * Return a hash based on the configuration passed (for both scenes and resources). This helps keep separate caches for separate export configurations.
   * Implementing this method is required if {@link _begin_customize_resources} returns `true`.
   */
  _get_customization_configuration_hash(): int;
  /**
   * Return a {@link PackedStringArray} of additional features this preset, for the given `platform`, should have.
   */
  _get_export_features(platform: EditorExportPlatform, debug: boolean): PackedStringArray;
  /**
   * Validates `option` and returns the visibility for the specified `platform`. The default implementation returns `true` for all options.
   */
  _get_export_option_visibility(platform: EditorExportPlatform, option: string | NodePath): boolean;
  /**
   * Check the requirements for the given `option` and return a non-empty warning string if they are not met.
   * **Note:** Use {@link get_option} to check the value of the export options.
   */
  _get_export_option_warning(platform: EditorExportPlatform, option: string | NodePath): string;
  /**
   * Return a list of export options that can be configured for this export plugin.
   * Each element in the return value is a {@link Dictionary} with the following keys:
   * - `option`: A dictionary with the structure documented by {@link Object.get_property_list}, but all keys are optional.
   * - `default_value`: The default value for this option.
   * - `update_visibility`: An optional boolean value. If set to `true`, the preset will emit {@link Object.property_list_changed} when the option is changed.
   */
  _get_export_options(platform: EditorExportPlatform): Array<Dictionary>;
  /**
   * Return a {@link Dictionary} of override values for export options, that will be used instead of user-provided values. Overridden options will be hidden from the user interface.
   */
  _get_export_options_overrides(platform: EditorExportPlatform): Dictionary;
  /**
   * Return the name identifier of this plugin (for future identification by the exporter). The plugins are sorted by name before exporting.
   * Implementing this method is required.
   */
  _get_name(): string;
  /**
   * Return `true` if the result of {@link _get_export_options} has changed and the export options of the preset corresponding to `platform` should be updated.
   */
  _should_update_export_options(platform: EditorExportPlatform): boolean;
  /** Return `true` if the plugin supports the given `platform`. */
  _supports_platform(platform: EditorExportPlatform): boolean;
  /**
   * Provide access to the Android prebuilt manifest and allows the plugin to modify it if needed.
   * Implementers of this virtual method should take the binary manifest data from `manifest_data`, copy it, modify it, and then return it with the modifications.
   * If no modifications are needed, then an empty {@link PackedByteArray} should be returned.
   */
  _update_android_prebuilt_manifest(platform: EditorExportPlatform, manifest_data: PackedByteArray | Array<unknown>): PackedByteArray;
  /** Adds an Apple embedded platform bundle file from the given `path` to the exported project. */
  add_apple_embedded_platform_bundle_file(path: string | NodePath): void;
  /**
   * Adds C++ code to the Apple embedded platform export. The final code is created from the code appended by each active export plugin.
   */
  add_apple_embedded_platform_cpp_code(code: string | NodePath): void;
  /**
   * Adds a dynamic library (*.dylib, *.framework) to the Linking Phase in the Apple embedded platform's Xcode project and embeds it into the resulting binary.
   * **Note:** For static libraries (*.a), this works in the same way as {@link add_apple_embedded_platform_framework}.
   * **Note:** This method should not be used for System libraries as they are already present on the device.
   */
  add_apple_embedded_platform_embedded_framework(path: string | NodePath): void;
  /**
   * Adds a static library (*.a) or a dynamic library (*.dylib, *.framework) to the Linking Phase to the Apple embedded platform's Xcode project.
   */
  add_apple_embedded_platform_framework(path: string | NodePath): void;
  /** Adds linker flags for the Apple embedded platform export. */
  add_apple_embedded_platform_linker_flags(flags: string | NodePath): void;
  /** Adds additional fields to the Apple embedded platform's project Info.plist file. */
  add_apple_embedded_platform_plist_content(plist_content: string | NodePath): void;
  /** Adds a static library from the given `path` to the Apple embedded platform project. */
  add_apple_embedded_platform_project_static_lib(path: string | NodePath): void;
  /**
   * Adds a custom file to be exported. `path` is the virtual path that can be used to load the file, `file` is the binary data of the file.
   * When called inside {@link _export_file} and `remap` is `true`, the current file will not be exported, but instead remapped to this custom file. `remap` is ignored when called in other places.
   * `file` will not be imported, so consider using {@link _customize_resource} to remap imported resources.
   */
  add_file(path: string | NodePath, file: PackedByteArray | Array<unknown>, remap: boolean): void;
  /** Adds an iOS bundle file from the given `path` to the exported project. */
  add_ios_bundle_file(path: string | NodePath): void;
  /**
   * Adds C++ code to the iOS export. The final code is created from the code appended by each active export plugin.
   */
  add_ios_cpp_code(code: string | NodePath): void;
  /**
   * Adds a dynamic library (*.dylib, *.framework) to Linking Phase in iOS's Xcode project and embeds it into resulting binary.
   * **Note:** For static libraries (*.a), this works the in same way as {@link add_apple_embedded_platform_framework}.
   * **Note:** This method should not be used for System libraries as they are already present on the device.
   */
  add_ios_embedded_framework(path: string | NodePath): void;
  /**
   * Adds a static library (*.a) or a dynamic library (*.dylib, *.framework) to the Linking Phase to the iOS Xcode project.
   */
  add_ios_framework(path: string | NodePath): void;
  /** Adds linker flags for the iOS export. */
  add_ios_linker_flags(flags: string | NodePath): void;
  /** Adds additional fields to the iOS project Info.plist file. */
  add_ios_plist_content(plist_content: string | NodePath): void;
  /** Adds a static library from the given `path` to the iOS project. */
  add_ios_project_static_lib(path: string | NodePath): void;
  /**
   * Adds file or directory matching `path` to `PlugIns` directory of macOS app bundle.
   * **Note:** This is useful only for macOS exports.
   */
  add_macos_plugin_file(path: string | NodePath): void;
  /**
   * Adds a shared object or a directory containing only shared objects with the given `tags` and destination `path`.
   * **Note:** In case of macOS exports, those shared objects will be added to `Frameworks` directory of app bundle.
   * In case of a directory code-sign will error if you place non code object in directory.
   */
  add_shared_object(path: string | NodePath, tags: PackedStringArray | Array<unknown>, target: string | NodePath): void;
  /** Returns currently used export platform. */
  get_export_platform(): EditorExportPlatform | null;
  /** Returns currently used export preset. */
  get_export_preset(): EditorExportPreset | null;
  /** Returns the current value of an export option supplied by {@link _get_export_options}. */
  get_option(name: string): unknown;
  /**
   * To be called inside {@link _export_file}. Skips the current file, so it's not included in the export.
   */
  skip(): void;
}
