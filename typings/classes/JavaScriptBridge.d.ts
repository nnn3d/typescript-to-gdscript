// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Singleton that connects the engine with the browser's JavaScript context in Web export. */
declare interface JavaScriptBridge extends GodotObject {
  /**
   * Creates a reference to a {@link Callable} that can be used as a callback by JavaScript. The reference must be kept until the callback happens, or it won't be called at all. See {@link JavaScriptObject} for usage.
   * **Note:** The callback function must take exactly one {@link Array} argument, which is going to be the JavaScript arguments object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) converted to an array.
   */
  create_callback(callable: Callable): JavaScriptObject | null;
  /**
   * Creates a new JavaScript object using the `new` constructor. The `object` must a valid property of the JavaScript `window`. See {@link JavaScriptObject} for usage.
   */
  create_object(object: string | NodePath, ...args: any[]): unknown;
  /**
   * Prompts the user to download a file containing the specified `buffer`. The file will have the given `name` and `mime` type.
   * **Note:** The browser may override the MIME type (https://en.wikipedia.org/wiki/Media_type) provided based on the file `name`'s extension.
   * **Note:** Browsers might block the download if {@link download_buffer} is not being called from a user interaction (e.g. button click).
   * **Note:** Browsers might ask the user for permission or block the download if multiple download requests are made in a quick succession.
   */
  download_buffer(buffer: PackedByteArray | Array<unknown>, name: string | NodePath, mime?: string | NodePath): void;
  /**
   * Execute the string `code` as JavaScript code within the browser window. This is a call to the actual global JavaScript function [code skip-lint]eval()[/code].
   * If `use_global_execution_context` is `true`, the code will be evaluated in the global execution context. Otherwise, it is evaluated in the execution context of a function within the engine's runtime environment.
   */
  eval(code: string | NodePath, use_global_execution_context?: boolean): unknown;
  /**
   * Force synchronization of the persistent file system (when enabled).
   * **Note:** This is only useful for modules or extensions that can't use {@link FileAccess} to write files.
   */
  force_fs_sync(): void;
  /**
   * Returns an interface to a JavaScript object that can be used by scripts. The `interface` must be a valid property of the JavaScript `window`. The callback must accept a single {@link Array} argument, which will contain the JavaScript `arguments`. See {@link JavaScriptObject} for usage.
   */
  get_interface(interface_: string | NodePath): JavaScriptObject | null;
  /**
   * Returns `true` if the given `javascript_object` is of type `ArrayBuffer` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer), `DataView` (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView), or one of the many typed array objects (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).
   */
  is_js_buffer(javascript_object: JavaScriptObject): boolean;
  /**
   * Returns a copy of `javascript_buffer`'s contents as a {@link PackedByteArray}. See also {@link is_js_buffer}.
   */
  js_buffer_to_packed_byte_array(javascript_buffer: JavaScriptObject): PackedByteArray;
  /**
   * Returns `true` if a new version of the progressive web app is waiting to be activated.
   * **Note:** Only relevant when exported as a Progressive Web App.
   */
  pwa_needs_update(): boolean;
  /**
   * Performs the live update of the progressive web app. Forcing the new version to be installed and the page to be reloaded.
   * **Note:** Your application will be **reloaded in all browser tabs**.
   * **Note:** Only relevant when exported as a Progressive Web App and {@link pwa_needs_update} returns `true`.
   */
  pwa_update(): int;

  /**
   * Emitted when an update for this progressive web app has been detected but is waiting to be activated because a previous version is active. See {@link pwa_update} to force the update to take place immediately.
   */
  pwa_update_available: Signal<[]>;
}
declare const JavaScriptBridge: JavaScriptBridge;

