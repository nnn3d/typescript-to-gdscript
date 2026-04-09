declare interface ProjectSettings {
  check_changed_settings_in_group(setting_prefix: string): boolean;

  clear<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): void;
  clear(name: string): void;
  get_order<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): int;
  get_order(name: string): int;
  get_setting<const T extends keyof ProjectSettings & `${string}/${string}`, D>(name: T, default_value?: ProjectSettings[T]): ProjectSettings[T];
  get_setting(name: string, default_value?: unknown): unknown;
  get_setting_with_override<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): ProjectSettings[T];
  get_setting_with_override(name: string): unknown;
  get_setting_with_override_and_custom_features<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, features: PackedStringArray): ProjectSettings[T];
  get_setting_with_override_and_custom_features(name: string, features: PackedStringArray): unknown;
  has_setting<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): boolean;
  has_setting(name: string): boolean;
  set_as_basic<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, basic: boolean): void;
  set_as_basic(name: string, basic: boolean): void;
  set_as_internal<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, internal: boolean): void;
  set_as_internal(name: string, internal: boolean): void;
  set_initial_value<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, value: unknown): void;
  set_initial_value(name: string, value: unknown): void;
  set_order<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, position: int): void;
  set_order(name: string, position: int): void;
  set_restart_if_changed<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, restart: boolean): void;
  set_restart_if_changed(name: string, restart: boolean): void;
  set_setting<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, value: unknown): void;
  set_setting(name: string, value: unknown): void;
}
