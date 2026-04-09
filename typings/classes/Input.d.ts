// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for handling inputs. */
declare interface Input extends GodotObject {
  /**
   * If `true`, sends mouse input events when tapping or swiping on the touchscreen. See also {@link ProjectSettings.input_devices/pointing/emulate_mouse_from_touch}.
   */
  emulate_mouse_from_touch: boolean;
  /**
   * If `true`, sends touch input events when clicking or dragging the mouse. See also {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse}.
   */
  emulate_touch_from_mouse: boolean;
  /**
   * If `true`, joypad input (including motion sensors) and LED light changes will be ignored and joypad vibration will be stopped when the application is not focused.
   */
  ignore_joypad_on_unfocused_application: boolean;
  /** Controls the mouse mode. */
  mouse_mode: int;
  /**
   * If `true`, similar input events sent by the operating system are accumulated. When input accumulation is enabled, all input events generated during a frame will be merged and emitted when the frame is done rendering. Therefore, this limits the number of input method calls per second to the rendering FPS.
   * Input accumulation can be disabled to get slightly more precise/reactive input at the cost of increased CPU usage. In applications where drawing freehand lines is required, input accumulation should generally be disabled while the user is drawing the line to get results that closely follow the actual input.
   * **Note:** Input accumulation is *enabled* by default.
   */
  use_accumulated_input: boolean;
  set_emulate_mouse_from_touch(value: boolean): void;
  is_emulating_mouse_from_touch(): boolean;
  set_emulate_touch_from_mouse(value: boolean): void;
  is_emulating_touch_from_mouse(): boolean;
  set_ignore_joypad_on_unfocused_application(value: boolean): void;
  is_ignoring_joypad_on_unfocused_application(): boolean;
  set_mouse_mode(value: int): void;
  get_mouse_mode(): int;
  set_use_accumulated_input(value: boolean): void;
  is_using_accumulated_input(): boolean;

  /**
   * This will simulate pressing the specified action.
   * The strength can be used for non-boolean actions, it's ranged between 0 and 1 representing the intensity of the given action.
   * **Note:** This method will not cause any {@link Node._input} calls. It is intended to be used with {@link is_action_pressed} and {@link is_action_just_pressed}. If you want to simulate `_input`, use {@link parse_input_event} instead.
   */
  action_press(action: string, strength?: float): void;
  /** If the specified action is already pressed, this will release it. */
  action_release(action: string): void;
  /**
   * Adds a new mapping entry (in SDL2 format) to the mapping database. Optionally update already connected devices.
   */
  add_joy_mapping(mapping: string, update_existing?: boolean): void;
  /**
   * Clears the calibration information for the specified joypad's motion sensors, if it has any and if they were calibrated.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  clear_joy_motion_sensors_calibration(device: int): void;
  /**
   * Sends all input events which are in the current buffer to the game loop. These events may have been buffered as a result of accumulated input ({@link use_accumulated_input}) or agile input flushing ({@link ProjectSettings.input_devices/buffering/agile_event_flushing}).
   * The engine will already do this itself at key execution points (at least once per frame). However, this can be useful in advanced cases where you want precise control over the timing of event handling.
   */
  flush_buffered_events(): void;
  /**
   * Returns the acceleration in m/s² of the device's accelerometer sensor, if the device has one. Otherwise, the method returns {@link Vector3.ZERO}.
   * Note this method returns an empty {@link Vector3} when running from the editor even when your device has an accelerometer. You must export your project to a supported device to read values from the accelerometer.
   * **Note:** This method only works on Android and iOS. On other platforms, it always returns {@link Vector3.ZERO}.
   * **Note:** For Android, {@link ProjectSettings.input_devices/sensors/enable_accelerometer} must be enabled.
   */
  get_accelerometer(): Vector3;
  /**
   * Returns a value between 0 and 1 representing the raw intensity of the given action, ignoring the action's deadzone. In most cases, you should use {@link get_action_strength} instead.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  get_action_raw_strength(action: string, exact_match?: boolean): float;
  /**
   * Returns a value between 0 and 1 representing the intensity of the given action. In a joypad, for example, the further away the axis (analog sticks or L2, R2 triggers) is from the dead zone, the closer the value will be to 1. If the action is mapped to a control that has no axis such as the keyboard, the value returned will be 0 or 1.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  get_action_strength(action: string, exact_match?: boolean): float;
  /**
   * Get axis input by specifying two actions, one negative and one positive.
   * This is a shorthand for writing `Input.get_action_strength("positive_action") - Input.get_action_strength("negative_action")`.
   */
  get_axis(negative_action: string, positive_action: string): float;
  /**
   * Returns an {@link Array} containing the device IDs of all currently connected joypads.
   * **Note:** The order of connected joypads can not be guaranteed to be the same after a project and/or the editor is restarted, because Godot doesn't save the order of joypad connections. Joypads are registered in the order they are discovered by Godot.
   */
  get_connected_joypads(): Array<int>;
  /** Returns the currently assigned cursor shape. */
  get_current_cursor_shape(): int;
  /**
   * Returns the gravity in m/s² of the device's accelerometer sensor, if the device has one. Otherwise, the method returns {@link Vector3.ZERO}.
   * **Note:** This method only works on Android and iOS. On other platforms, it always returns {@link Vector3.ZERO}.
   * **Note:** For Android, {@link ProjectSettings.input_devices/sensors/enable_gravity} must be enabled.
   */
  get_gravity(): Vector3;
  /**
   * Returns the rotation rate in rad/s around a device's X, Y, and Z axes of the gyroscope sensor, if the device has one. Otherwise, the method returns {@link Vector3.ZERO}.
   * **Note:** This method only works on Android and iOS. On other platforms, it always returns {@link Vector3.ZERO}.
   * **Note:** For Android, {@link ProjectSettings.input_devices/sensors/enable_gyroscope} must be enabled.
   */
  get_gyroscope(): Vector3;
  /**
   * Returns the acceleration, including the force of gravity, in m/s² of the joypad's accelerometer sensor, if the joypad has one and it's currently enabled. Otherwise, the method returns {@link Vector3.ZERO}. See also {@link get_joy_gravity} and {@link set_joy_motion_sensors_enabled}.
   * For a joypad held in front of you, the returned axes are defined as follows:
   * +X ... -X: left ... right;
   * +Y ... -Y: bottom ... top;
   * +Z ... -Z: farther ... closer.
   * The gravity part value is measured as a vector with length of `9.8` away from the center of the Earth, which is a negative Y value.
   * **Note:** This feature is only supported on Windows, Linux, and macOS. On iOS, joypad accelerometer sensor reading is not supported due to OS limitations.
   */
  get_joy_accelerometer(device: int): Vector3;
  /** Returns the current value of the joypad axis at index `axis`. */
  get_joy_axis(device: int, axis: int): float;
  /**
   * Returns the gravity in m/s² of the joypad's accelerometer sensor, if the joypad has one and it's currently enabled. Otherwise, the method returns {@link Vector3.ZERO}. See also {@link get_joy_accelerometer} and {@link set_joy_motion_sensors_enabled}.
   * For a joypad held in front of you, the returned axes are defined as follows:
   * +X ... -X: left ... right;
   * +Y ... -Y: bottom ... top;
   * +Z ... -Z: farther ... closer.
   * The gravity part value is measured as a vector with length of `9.8` away from the center of the Earth, which is a negative Y value.
   * **Note:** This feature is only supported on Windows, Linux, and macOS. On iOS, joypad accelerometer sensor reading is not supported due to OS limitations.
   */
  get_joy_gravity(device: int): Vector3;
  /**
   * Returns an SDL-compatible device GUID on platforms that use gamepad remapping, e.g. `030000004c050000c405000000010000`. Returns an empty string if it cannot be found. Godot uses SDL's internal mappings, supplemented by community-contributed mappings, to determine gamepad names and mappings based on this GUID.
   * On Windows, all XInput joypad GUIDs will be overridden by Godot to `__XINPUT_DEVICE__`, because their mappings are the same.
   */
  get_joy_guid(device: int): string;
  /**
   * Returns the rotation rate in rad/s around a joypad's X, Y, and Z axes of the gyroscope sensor, if the joypad has one and it's currently enabled. Otherwise, the method returns {@link Vector3.ZERO}. See also {@link set_joy_motion_sensors_enabled}.
   * The rotation is positive in the counter-clockwise direction.
   * For a joypad held in front of you, the returned axes are defined as follows:
   * X: Angular speed around the X axis (pitch);
   * Y: Angular speed around the Y axis (yaw);
   * Z: Angular speed around the Z axis (roll).
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad gyroscope and gyroscope calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  get_joy_gyroscope(device: int): Vector3;
  /**
   * Returns a dictionary with extra platform-specific information about the device, e.g. the raw gamepad name from the OS or the Steam Input index.
   * On Windows, Linux, macOS, and iOS, the dictionary contains the following fields:
   * `raw_name`: The name of the controller as it came from the OS, before getting renamed by the controller database.
   * `vendor_id`: The USB vendor ID of the device.
   * `product_id`: The USB product ID of the device.
   * `serial_number`: The serial number of the device. This key won't be present if the serial number is unavailable.
   * The dictionary can also include the following fields under selected platforms:
   * `steam_input_index`: The Steam Input gamepad index (Windows, Linux, and macOS only). If the device is not a Steam Input device this key won't be present.
   * `xinput_index`: The index of the controller in the XInput system (Windows only). This key won't be present for devices not handled by XInput.
   * **Note:** The returned dictionary is always empty on Android and Web.
   */
  get_joy_info(device: int): Dictionary;
  /**
   * Returns the calibration information about the specified joypad's motion sensors in the form of a {@link Dictionary}, if it has any and if they have been calibrated, otherwise returns an empty {@link Dictionary}.
   * The dictionary contains the following fields:
   * `gyroscope_offset`: average offset in gyroscope values from {@link Vector2.ZERO} in rad/s.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  get_joy_motion_sensors_calibration(device: int): Dictionary;
  /**
   * Returns the joypad's motion sensor rate in Hz, if the joypad has motion sensors and they're currently enabled. See also {@link set_joy_motion_sensors_enabled}.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  get_joy_motion_sensors_rate(device: int): float;
  /**
   * Returns the name of the joypad at the specified device index, e.g. `PS4 Controller`. Godot uses the SDL2 game controller database (https://github.com/gabomdq/SDL_GameControllerDB) to determine gamepad names.
   */
  get_joy_name(device: int): string;
  /**
   * Returns the duration of the current vibration effect in seconds.
   * **Note:** This method returns the same value that was passed to {@link start_joy_vibration}, and this value does **not** change when the joypad's vibration runs out, it only gets reset after a call to {@link stop_joy_vibration}.
   * If you want to check if a joypad is still vibrating, use {@link is_joy_vibrating} instead.
   */
  get_joy_vibration_duration(device: int): float;
  /** Returns the remaining duration of the current vibration effect in seconds. */
  get_joy_vibration_remaining_duration(device: int): float;
  /**
   * Returns the strength of the joypad vibration: x is the strength of the weak motor, and y is the strength of the strong motor.
   * **Note:** This method returns the same values that were passed to {@link start_joy_vibration}, and these values do **not** change when the joypad's vibration runs out, they only get reset after a call to {@link stop_joy_vibration}.
   * If you want to check if a joypad is still vibrating, use {@link is_joy_vibrating} instead.
   */
  get_joy_vibration_strength(device: int): Vector2;
  /**
   * Returns the last mouse velocity in screen coordinates. To provide a precise and jitter-free velocity, mouse velocity is only calculated every 0.1s. Therefore, mouse velocity will lag mouse movements.
   */
  get_last_mouse_screen_velocity(): Vector2;
  /**
   * Returns the last mouse velocity. To provide a precise and jitter-free velocity, mouse velocity is only calculated every 0.1s. Therefore, mouse velocity will lag mouse movements.
   */
  get_last_mouse_velocity(): Vector2;
  /**
   * Returns the magnetic field strength in micro-Tesla for all axes of the device's magnetometer sensor, if the device has one. Otherwise, the method returns {@link Vector3.ZERO}.
   * **Note:** This method only works on Android and iOS. On other platforms, it always returns {@link Vector3.ZERO}.
   * **Note:** For Android, {@link ProjectSettings.input_devices/sensors/enable_magnetometer} must be enabled.
   */
  get_magnetometer(): Vector3;
  /**
   * Returns mouse buttons as a bitmask. If multiple mouse buttons are pressed at the same time, the bits are added together. Equivalent to {@link DisplayServer.mouse_get_button_state}.
   */
  get_mouse_button_mask(): int;
  /**
   * Gets an input vector by specifying four actions for the positive and negative X and Y axes.
   * This method is useful when getting vector input, such as from a joystick, directional pad, arrows, or WASD. The vector has its length limited to 1 and has a circular deadzone, which is useful for using vector input as movement.
   * By default, the deadzone is automatically calculated from the average of the action deadzones. However, you can override the deadzone to be whatever you want (on the range of 0 to 1).
   */
  get_vector(negative_x: string, positive_x: string, negative_y: string, positive_y: string, deadzone?: float): Vector2;
  /**
   * Returns `true` if the joypad has an LED light that can change colors and/or brightness. See also {@link set_joy_light}.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  has_joy_light(device: int): boolean;
  /**
   * Returns `true` if the joypad has motion sensors (accelerometer and gyroscope).
   * **Note:** On iOS, joypad accelerometer sensor reading is not supported due to OS limitations.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  has_joy_motion_sensors(device: int): boolean;
  /**
   * Returns `true` if the joypad supports vibration. See also {@link start_joy_vibration}.
   * **Note:** For macOS, vibration is only supported in macOS 11 and later. When connected via USB, vibration is only supported for major brand controllers (except Xbox One and Xbox Series X/S controllers) due to macOS limitations.
   */
  has_joy_vibration(device: int): boolean;
  /**
   * Returns `true` when the user has *started* pressing the action event in the current frame or physics tick. It will only return `true` on the frame or tick that the user pressed down the button.
   * This is useful for code that needs to run only once when an action is pressed, instead of every frame while it's pressed.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** Returning `true` does not imply that the action is *still* pressed. An action can be pressed and released again rapidly, and `true` will still be returned so as not to miss input.
   * **Note:** Due to keyboard ghosting, {@link is_action_just_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   * **Note:** During input handling (e.g. {@link Node._input}), use {@link InputEvent.is_action_pressed} instead to query the action state of the current event. See also {@link is_action_just_pressed_by_event}.
   */
  is_action_just_pressed(action: string, exact_match?: boolean): boolean;
  /**
   * Returns `true` when the user has *started* pressing the action event in the current frame or physics tick, and the first event that triggered action press in the current frame/physics tick was `event`. It will only return `true` on the frame or tick that the user pressed down the button.
   * This is useful for code that needs to run only once when an action is pressed, and the action is processed during input handling (e.g. {@link Node._input}).
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** Returning `true` does not imply that the action is *still* pressed. An action can be pressed and released again rapidly, and `true` will still be returned so as not to miss input.
   * **Note:** Due to keyboard ghosting, {@link is_action_just_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_action_just_pressed_by_event(action: string, event: InputEvent, exact_match?: boolean): boolean;
  /**
   * Returns `true` when the user *stops* pressing the action event in the current frame or physics tick. It will only return `true` on the frame or tick that the user releases the button.
   * **Note:** Returning `true` does not imply that the action is *still* not pressed. An action can be released and pressed again rapidly, and `true` will still be returned so as not to miss input.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** During input handling (e.g. {@link Node._input}), use {@link InputEvent.is_action_released} instead to query the action state of the current event. See also {@link is_action_just_released_by_event}.
   */
  is_action_just_released(action: string, exact_match?: boolean): boolean;
  /**
   * Returns `true` when the user *stops* pressing the action event in the current frame or physics tick, and the first event that triggered action release in the current frame/physics tick was `event`. It will only return `true` on the frame or tick that the user releases the button.
   * This is useful when an action is processed during input handling (e.g. {@link Node._input}).
   * **Note:** Returning `true` does not imply that the action is *still* not pressed. An action can be released and pressed again rapidly, and `true` will still be returned so as not to miss input.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  is_action_just_released_by_event(action: string, event: InputEvent, exact_match?: boolean): boolean;
  /**
   * Returns `true` if you are pressing the action event.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** Due to keyboard ghosting, {@link is_action_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_action_pressed(action: string, exact_match?: boolean): boolean;
  /**
   * Returns `true` if any action, key, joypad button, or mouse button is being pressed. This will also return `true` if any action is simulated via code by calling {@link action_press}.
   */
  is_anything_pressed(): boolean;
  /** Returns `true` if you are pressing the joypad button at index `button`. */
  is_joy_button_pressed(device: int, button: int): boolean;
  /**
   * Returns `true` if the system knows the specified device. This means that it sets all button and axis indices. Unknown joypads are not expected to match these constants, but you can still retrieve events from them.
   */
  is_joy_known(device: int): boolean;
  /**
   * Returns `true` if the joypad's motion sensors have been calibrated.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  is_joy_motion_sensors_calibrated(device: int): boolean;
  /**
   * Returns `true` if the joypad's motion sensors are currently being calibrated.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  is_joy_motion_sensors_calibrating(device: int): boolean;
  /**
   * Returns `true` if the requested joypad has motion sensors (accelerometer and gyroscope) and they are currently enabled. See also {@link set_joy_motion_sensors_enabled} and {@link has_joy_motion_sensors}.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  is_joy_motion_sensors_enabled(device: int): boolean;
  /**
   * Returns `true` if the joypad is still vibrating after a call to {@link start_joy_vibration}.
   * Unlike {@link get_joy_vibration_strength} and {@link get_joy_vibration_duration}, this method returns `false` after the joypad's vibration runs out.
   */
  is_joy_vibrating(device: int): boolean;
  /**
   * Returns `true` if you are pressing the key with the `keycode` printed on it. You can pass a {@link Key} constant or any Unicode character code.
   */
  is_key_label_pressed(keycode: int): boolean;
  /**
   * Returns `true` if you are pressing the Latin key in the current keyboard layout. You can pass a {@link Key} constant.
   * {@link is_key_pressed} is only recommended over {@link is_physical_key_pressed} in non-game applications. This ensures that shortcut keys behave as expected depending on the user's keyboard layout, as keyboard shortcuts are generally dependent on the keyboard layout in non-game applications. If in doubt, use {@link is_physical_key_pressed}.
   * **Note:** Due to keyboard ghosting, {@link is_key_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_key_pressed(keycode: int): boolean;
  /** Returns `true` if you are pressing the mouse button specified with {@link MouseButton}. */
  is_mouse_button_pressed(button: int): boolean;
  /**
   * Returns `true` if you are pressing the key in the physical location on the 101/102-key US QWERTY keyboard. You can pass a {@link Key} constant.
   * {@link is_physical_key_pressed} is recommended over {@link is_key_pressed} for in-game actions, as it will make `W`/`A`/`S`/`D` layouts work regardless of the user's keyboard layout. {@link is_physical_key_pressed} will also ensure that the top row number keys work on any keyboard layout. If in doubt, use {@link is_physical_key_pressed}.
   * **Note:** Due to keyboard ghosting, {@link is_physical_key_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_physical_key_pressed(keycode: int): boolean;
  /**
   * Feeds an {@link InputEvent} to the game. Can be used to artificially trigger input events from code. Also generates {@link Node._input} calls.
   * **Note:** Calling this function has no influence on the operating system. So for example sending an {@link InputEventMouseMotion} will not move the OS mouse cursor to the specified position (use {@link warp_mouse} instead) and sending `Alt/Cmd + Tab` as {@link InputEventKey} won't toggle between active windows.
   */
  parse_input_event(event: InputEvent): void;
  /**
   * Removes all mappings from the internal database that match the given GUID. All currently connected joypads that use this GUID will become unmapped.
   * On Android, Godot will map to an internal fallback mapping.
   */
  remove_joy_mapping(guid: string): void;
  /**
   * Sets the acceleration value of the accelerometer sensor. Can be used for debugging on devices without a hardware sensor, for example in an editor on a PC.
   * **Note:** This value can be immediately overwritten by the hardware sensor value on Android and iOS.
   */
  set_accelerometer(value: Vector3 | Vector3i): void;
  /**
   * Sets a custom mouse cursor image, which is only visible inside the game window, for the given mouse `shape`. The hotspot can also be specified. Passing `null` to the image parameter resets to the system cursor.
   * `image` can be either {@link Texture2D} or {@link Image} and its size must be lower than or equal to 256×256. To avoid rendering issues, sizes lower than or equal to 128×128 are recommended.
   * `hotspot` must be within `image`'s size.
   * **Note:** {@link AnimatedTexture}s aren't supported as custom mouse cursors. If using an {@link AnimatedTexture}, only the first frame will be displayed.
   * **Note:** The **Lossless**, **Lossy** or **Uncompressed** compression modes are recommended. The **Video RAM** compression mode can be used, but it will be decompressed on the CPU, which means loading times are slowed down and no memory is saved compared to lossless modes.
   * **Note:** On the web platform, the maximum allowed cursor image size is 128×128. Cursor images larger than 32×32 will also only be displayed if the mouse cursor image is entirely located within the page for security reasons (https://chromestatus.com/feature/5825971391299584).
   */
  set_custom_mouse_cursor(image: Resource, shape: int, hotspot?: Vector2 | Vector2i): void;
  /**
   * Sets the default cursor shape to be used in the viewport instead of {@link CURSOR_ARROW}.
   * **Note:** If you want to change the default cursor shape for {@link Control}'s nodes, use {@link Control.mouse_default_cursor_shape} instead.
   * **Note:** This method generates an {@link InputEventMouseMotion} to update cursor immediately.
   */
  set_default_cursor_shape(shape: int): void;
  /**
   * Sets the gravity value of the accelerometer sensor. Can be used for debugging on devices without a hardware sensor, for example in an editor on a PC.
   * **Note:** This value can be immediately overwritten by the hardware sensor value on Android and iOS.
   */
  set_gravity(value: Vector3 | Vector3i): void;
  /**
   * Sets the value of the rotation rate of the gyroscope sensor. Can be used for debugging on devices without a hardware sensor, for example in an editor on a PC.
   * **Note:** This value can be immediately overwritten by the hardware sensor value on Android and iOS.
   */
  set_gyroscope(value: Vector3 | Vector3i): void;
  /**
   * Sets the joypad's LED light, if available, to the specified color. See also {@link has_joy_light}.
   * **Note:** There is no way to get the color of the light from a joypad. If you need to know the assigned color, store it separately.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  set_joy_light(device: int, color: Color): void;
  /**
   * Sets the specified joypad's calibration information. See also {@link get_joy_motion_sensors_calibration}.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  set_joy_motion_sensors_calibration(device: int, calibration_info: Dictionary): void;
  /**
   * Enables or disables the motion sensors (accelerometer and gyroscope), if available, on the specified joypad.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * It's recommended to disable the motion sensors when they're no longer being used, because otherwise it might drain the controller battery faster.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  set_joy_motion_sensors_enabled(device: int, enable: boolean): void;
  /**
   * Sets the value of the magnetic field of the magnetometer sensor. Can be used for debugging on devices without a hardware sensor, for example in an editor on a PC.
   * **Note:** This value can be immediately overwritten by the hardware sensor value on Android and iOS.
   */
  set_magnetometer(value: Vector3 | Vector3i): void;
  /**
   * Queries whether an input device should be ignored or not. Devices can be ignored by setting the environment variable `SDL_GAMECONTROLLER_IGNORE_DEVICES`. Read the SDL documentation (https://wiki.libsdl.org/SDL2) for more information.
   * **Note:** Some 3rd party tools can contribute to the list of ignored devices. For example, *SteamInput* creates virtual devices from physical devices for remapping purposes. To avoid handling the same input device twice, the original device is added to the ignore list.
   */
  should_ignore_device(vendor_id: int, product_id: int): boolean;
  /**
   * Starts the process of calibrating the specified joypad's gyroscope, if it has one.
   * Once a joypad's gyroscope has been calibrated correctly (e.g. laying still on a table without being rotated), {@link get_joy_gyroscope} will return values close or equal to {@link Vector3.ZERO} when the joypad is not being rotated.
   * Here's an example of how to use joypad gyroscope and gyroscope calibration in your games:
   * **Note:** Accelerometer sensor doesn't usually require calibration.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  start_joy_motion_sensors_calibration(device: int): void;
  /**
   * Starts to vibrate the joypad. See also {@link has_joy_vibration} and {@link is_joy_vibrating}.
   * Joypads usually come with two rumble motors, a strong and a weak one.
   * `weak_magnitude` is the strength of the weak motor (between `0.0` and `1.0`).
   * `strong_magnitude` is the strength of the strong motor (between `0.0` and `1.0`).
   * `duration` is the duration of the effect in seconds (a duration of `0.0` will try to play the vibration as long as possible, which is about 65 seconds).
   * The vibration can be stopped early by calling {@link stop_joy_vibration}.
   * See also {@link get_joy_vibration_strength} and {@link get_joy_vibration_duration}.
   * **Note:** For macOS, vibration is only supported in macOS 11 and later. When connected via USB, vibration is only supported for major brand controllers (except Xbox One and Xbox Series X/S controllers) due to macOS limitations.
   */
  start_joy_vibration(device: int, weak_magnitude: float, strong_magnitude: float, duration?: float): void;
  /**
   * Stops the calibration process of the specified joypad's motion sensors.
   * See {@link start_joy_motion_sensors_calibration} for an example on how to use joypad motion sensors and calibration in your games.
   * **Note:** This feature is only supported on Windows, Linux, macOS, and iOS.
   */
  stop_joy_motion_sensors_calibration(device: int): void;
  /** Stops the vibration of the joypad started with {@link start_joy_vibration}. */
  stop_joy_vibration(device: int): void;
  /**
   * Vibrate the handheld device for the specified duration in milliseconds.
   * `amplitude` is the strength of the vibration, as a value between `0.0` and `1.0`. If set to `-1.0`, the default vibration strength of the device is used.
   * **Note:** This method is implemented on Android, iOS, and Web. It has no effect on other platforms.
   * **Note:** For Android, {@link vibrate_handheld} requires enabling the `VIBRATE` permission in the export preset. Otherwise, {@link vibrate_handheld} will have no effect.
   * **Note:** For iOS, specifying the duration is only supported in iOS 13 and later.
   * **Note:** For Web, the amplitude cannot be changed.
   * **Note:** Some web browsers such as Safari and Firefox for Android do not support {@link vibrate_handheld}.
   * **Note:** Device settings such as vibration on/off, "do not disturb" mode or specific haptic feedback on/off may prevent {@link vibrate_handheld} effects.
   */
  vibrate_handheld(duration_ms?: int, amplitude?: float): void;
  /**
   * Sets the mouse position to the specified vector, provided in pixels and relative to an origin at the upper left corner of the currently focused Window Manager game window.
   * Mouse position is clipped to the limits of the screen resolution, or to the limits of the game window if {@link MouseMode} is set to {@link MOUSE_MODE_CONFINED} or {@link MOUSE_MODE_CONFINED_HIDDEN}.
   * **Note:** {@link warp_mouse} is only supported on Windows, macOS and Linux. It has no effect on Android, iOS and Web.
   */
  warp_mouse(position: Vector2 | Vector2i): void;

  /** Emitted when a joypad device has been connected or disconnected. */
  joy_connection_changed: Signal<[int, boolean]>;

  // enum MouseMode
  /** Makes the mouse cursor visible if it is hidden. */
  readonly MOUSE_MODE_VISIBLE: int;
  /** Makes the mouse cursor hidden if it is visible. */
  readonly MOUSE_MODE_HIDDEN: int;
  /**
   * Captures the mouse. The mouse will be hidden and its position locked at the center of the window manager's window.
   * **Note:** If you want to process the mouse's movement in this mode, you need to use {@link InputEventMouseMotion.relative}.
   */
  readonly MOUSE_MODE_CAPTURED: int;
  /** Confines the mouse cursor to the game window, and make it visible. */
  readonly MOUSE_MODE_CONFINED: int;
  /** Confines the mouse cursor to the game window, and make it hidden. */
  readonly MOUSE_MODE_CONFINED_HIDDEN: int;
  /** Max value of the {@link MouseMode}. */
  readonly MOUSE_MODE_MAX: int;
  // enum CursorShape
  /** Arrow cursor. Standard, default pointing cursor. */
  readonly CURSOR_ARROW: int;
  /** I-beam cursor. Usually used to show where the text cursor will appear when the mouse is clicked. */
  readonly CURSOR_IBEAM: int;
  /**
   * Pointing hand cursor. Usually used to indicate the pointer is over a link or other interactable item.
   */
  readonly CURSOR_POINTING_HAND: int;
  /**
   * Cross cursor. Typically appears over regions in which a drawing operation can be performed or for selections.
   */
  readonly CURSOR_CROSS: int;
  /**
   * Wait cursor. Indicates that the application is busy performing an operation, and that it cannot be used during the operation (e.g. something is blocking its main thread).
   */
  readonly CURSOR_WAIT: int;
  /**
   * Busy cursor. Indicates that the application is busy performing an operation, and that it is still usable during the operation.
   */
  readonly CURSOR_BUSY: int;
  /**
   * Drag cursor. Usually displayed when dragging something.
   * **Note:** Windows lacks a dragging cursor, so {@link CURSOR_DRAG} is the same as {@link CURSOR_MOVE} for this platform.
   */
  readonly CURSOR_DRAG: int;
  /**
   * Can drop cursor. Usually displayed when dragging something to indicate that it can be dropped at the current position.
   */
  readonly CURSOR_CAN_DROP: int;
  /**
   * Forbidden cursor. Indicates that the current action is forbidden (for example, when dragging something) or that the control at a position is disabled.
   */
  readonly CURSOR_FORBIDDEN: int;
  /**
   * Vertical resize mouse cursor. A double-headed vertical arrow. It tells the user they can resize the window or the panel vertically.
   */
  readonly CURSOR_VSIZE: int;
  /**
   * Horizontal resize mouse cursor. A double-headed horizontal arrow. It tells the user they can resize the window or the panel horizontally.
   */
  readonly CURSOR_HSIZE: int;
  /**
   * Window resize mouse cursor. The cursor is a double-headed arrow that goes from the bottom left to the top right. It tells the user they can resize the window or the panel both horizontally and vertically.
   */
  readonly CURSOR_BDIAGSIZE: int;
  /**
   * Window resize mouse cursor. The cursor is a double-headed arrow that goes from the top left to the bottom right, the opposite of {@link CURSOR_BDIAGSIZE}. It tells the user they can resize the window or the panel both horizontally and vertically.
   */
  readonly CURSOR_FDIAGSIZE: int;
  /** Move cursor. Indicates that something can be moved. */
  readonly CURSOR_MOVE: int;
  /** Vertical split mouse cursor. On Windows, it's the same as {@link CURSOR_VSIZE}. */
  readonly CURSOR_VSPLIT: int;
  /** Horizontal split mouse cursor. On Windows, it's the same as {@link CURSOR_HSIZE}. */
  readonly CURSOR_HSPLIT: int;
  /** Help cursor. Usually a question mark. */
  readonly CURSOR_HELP: int;
}
declare const Input: Input;

