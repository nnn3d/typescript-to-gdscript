// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Server for AR and VR features. */
declare interface XRServer extends GodotObject {
  /**
   * If set to `true`, the scene will be rendered as if the camera is locked to the {@link XROrigin3D}.
   * **Note:** This doesn't provide a very comfortable experience for users. This setting exists for doing benchmarking or automated testing, where you want to control what is rendered via code.
   */
  camera_locked_to_origin: boolean;
  /** The primary {@link XRInterface} currently bound to the {@link XRServer}. */
  primary_interface: XRInterface | null;
  /**
   * The current origin of our tracking space in the virtual world. This is used by the renderer to properly position the camera with new tracking data.
   * **Note:** This property is managed by the current {@link XROrigin3D} node. It is exposed for access from GDExtensions.
   */
  world_origin: Transform3D;
  /**
   * The scale of the game world compared to the real world. By default, most AR/VR platforms assume that 1 game unit corresponds to 1 real world meter.
   */
  world_scale: float;
  set_camera_locked_to_origin(value: boolean): void;
  is_camera_locked_to_origin(): boolean;
  set_primary_interface(value: XRInterface | null): void;
  get_primary_interface(): XRInterface | null;
  set_world_origin(value: Transform3D): void;
  get_world_origin(): Transform3D;
  set_world_scale(value: float): void;
  get_world_scale(): float;

  /** Registers an {@link XRInterface} object. */
  add_interface(interface_: XRInterface): void;
  /** Registers a new {@link XRTracker} that tracks a physical object. */
  add_tracker(tracker: XRTracker): void;
  /**
   * This is an important function to understand correctly. AR and VR platforms all handle positioning slightly differently.
   * For platforms that do not offer spatial tracking, our origin point `(0, 0, 0)` is the location of our HMD, but you have little control over the direction the player is facing in the real world.
   * For platforms that do offer spatial tracking, our origin point depends very much on the system. For OpenVR, our origin point is usually the center of the tracking space, on the ground. For other platforms, it's often the location of the tracking camera.
   * This method allows you to center your tracker on the location of the HMD. It will take the current location of the HMD and use that to adjust all your tracking data; in essence, realigning the real world to your player's current position in the game world.
   * For this method to produce usable results, tracking information must be available. This often takes a few frames after starting your game.
   * You should call this method after a few seconds have passed. For example, when the user requests a realignment of the display holding a designated button on a controller for a short period of time, or when implementing a teleport mechanism.
   */
  center_on_hmd(rotation_mode: int, keep_height: boolean): void;
  /** Clears the reference frame that was set by previous calls to {@link center_on_hmd}. */
  clear_reference_frame(): void;
  /**
   * Finds an interface by its `name`. For example, if your project uses capabilities of an AR/VR platform, you can find the interface for that platform by name and initialize it.
   */
  find_interface(name: string): XRInterface | null;
  /** Returns the primary interface's transformation. */
  get_hmd_transform(): Transform3D;
  /** Returns the interface registered at the given `idx` index in the list of interfaces. */
  get_interface(idx: int): XRInterface | null;
  /**
   * Returns the number of interfaces currently registered with the AR/VR server. If your project supports multiple AR/VR platforms, you can look through the available interface, and either present the user with a selection or simply try to initialize each interface and use the first one that returns `true`.
   */
  get_interface_count(): int;
  /** Returns a list of available interfaces the ID and name of each interface. */
  get_interfaces(): Array<Dictionary>;
  /**
   * Returns the reference frame transform. Mostly used internally and exposed for GDExtension build interfaces.
   */
  get_reference_frame(): Transform3D;
  /** Returns the positional tracker with the given `tracker_name`. */
  get_tracker(tracker_name: string): XRTracker | null;
  /** Returns a dictionary of trackers for `tracker_types`. */
  get_trackers(tracker_types: int): Dictionary;
  /** Removes this `interface`. */
  remove_interface(interface_: XRInterface): void;
  /** Removes this `tracker`. */
  remove_tracker(tracker: XRTracker): void;

  /** Emitted when a new interface has been added. */
  interface_added: Signal<[string]>;
  /** Emitted when an interface is removed. */
  interface_removed: Signal<[string]>;
  /** Emitted when the reference frame transform changes. */
  reference_frame_changed: Signal<[]>;
  /**
   * Emitted when a new tracker has been added. If you don't use a fixed number of controllers or if you're using {@link XRAnchor3D}s for an AR solution, it is important to react to this signal to add the appropriate {@link XRController3D} or {@link XRAnchor3D} nodes related to this new tracker.
   */
  tracker_added: Signal<[string, int]>;
  /**
   * Emitted when a tracker is removed. You should remove any {@link XRController3D} or {@link XRAnchor3D} points if applicable. This is not mandatory, the nodes simply become inactive and will be made active again when a new tracker becomes available (i.e. a new controller is switched on that takes the place of the previous one).
   */
  tracker_removed: Signal<[string, int]>;
  /**
   * Emitted when an existing tracker has been updated. This can happen if the user switches controllers.
   */
  tracker_updated: Signal<[string, int]>;
  /** Emitted when the world origin transform changes. */
  world_origin_changed: Signal<[]>;

  // enum TrackerType
  /**
   * The tracker tracks the location of the player's head. This is usually a location centered between the player's eyes. Note that for handheld AR devices this can be the current location of the device.
   */
  readonly TRACKER_HEAD: int;
  /** The tracker tracks the location of a controller. */
  readonly TRACKER_CONTROLLER: int;
  /** The tracker tracks the location of a base station. */
  readonly TRACKER_BASESTATION: int;
  /** The tracker tracks the location and size of an AR anchor. */
  readonly TRACKER_ANCHOR: int;
  /** The tracker tracks the location and joints of a hand. */
  readonly TRACKER_HAND: int;
  /** The tracker tracks the location and joints of a body. */
  readonly TRACKER_BODY: int;
  /** The tracker tracks the expressions of a face. */
  readonly TRACKER_FACE: int;
  /** Used internally to filter trackers of any known type. */
  readonly TRACKER_ANY_KNOWN: int;
  /** Used internally if we haven't set the tracker type yet. */
  readonly TRACKER_UNKNOWN: int;
  /** Used internally to select all trackers. */
  readonly TRACKER_ANY: int;
  // enum RotationMode
  /**
   * Fully reset the orientation of the HMD. Regardless of what direction the user is looking to in the real world. The user will look dead ahead in the virtual world.
   */
  readonly RESET_FULL_ROTATION: int;
  /**
   * Resets the orientation but keeps the tilt of the device. So if we're looking down, we keep looking down but heading will be reset.
   */
  readonly RESET_BUT_KEEP_TILT: int;
  /** Does not reset the orientation of the HMD, only the position of the player gets centered. */
  readonly DONT_RESET_ROTATION: int;
}
declare const XRServer: XRServer;

