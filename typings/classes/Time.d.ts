// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A singleton for working with time data. */
declare interface Time extends GodotObject {
  /**
   * Returns the current date as a dictionary of keys: `year`, `month`, `day`, and `weekday`.
   * The returned values are in the system's local time when `utc` is `false`, otherwise they are in UTC.
   */
  get_date_dict_from_system(utc?: boolean): Dictionary;
  /** Converts the given Unix timestamp to a dictionary of keys: `year`, `month`, `day`, and `weekday`. */
  get_date_dict_from_unix_time(unix_time_val: int): Dictionary;
  /**
   * Returns the current date as an ISO 8601 date string (YYYY-MM-DD).
   * The returned values are in the system's local time when `utc` is `false`, otherwise they are in UTC.
   */
  get_date_string_from_system(utc?: boolean): string;
  /** Converts the given Unix timestamp to an ISO 8601 date string (YYYY-MM-DD). */
  get_date_string_from_unix_time(unix_time_val: int): string;
  /**
   * Converts the given ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS) to a dictionary of keys: `year`, `month`, `day`, [code skip-lint]weekday[/code], `hour`, `minute`, and `second`.
   * If `weekday` is `false`, then the [code skip-lint]weekday[/code] entry is excluded (the calculation is relatively expensive).
   * **Note:** Any decimal fraction in the time string will be ignored silently.
   */
  get_datetime_dict_from_datetime_string(datetime: string | NodePath, weekday: boolean): Dictionary;
  /**
   * Returns the current date as a dictionary of keys: `year`, `month`, `day`, `weekday`, `hour`, `minute`, `second`, and `dst` (Daylight Savings Time).
   */
  get_datetime_dict_from_system(utc?: boolean): Dictionary;
  /**
   * Converts the given Unix timestamp to a dictionary of keys: `year`, `month`, `day`, `weekday`, `hour`, `minute`, and `second`.
   * The returned Dictionary's values will be the same as the {@link get_datetime_dict_from_system} if the Unix timestamp is the current time, with the exception of Daylight Savings Time as it cannot be determined from the epoch.
   */
  get_datetime_dict_from_unix_time(unix_time_val: int): Dictionary;
  /**
   * Converts the given dictionary of keys to an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
   * The given dictionary can be populated with the following keys: `year`, `month`, `day`, `hour`, `minute`, and `second`. Any other entries (including `dst`) are ignored.
   * If the dictionary is empty, `0` is returned. If some keys are omitted, they default to the equivalent values for the Unix epoch timestamp 0 (1970-01-01 at 00:00:00).
   * If `use_space` is `true`, the date and time bits are separated by an empty space character instead of the letter T.
   */
  get_datetime_string_from_datetime_dict(datetime: Dictionary, use_space: boolean): string;
  /**
   * Returns the current date and time as an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
   * The returned values are in the system's local time when `utc` is `false`, otherwise they are in UTC.
   * If `use_space` is `true`, the date and time bits are separated by an empty space character instead of the letter T.
   */
  get_datetime_string_from_system(utc?: boolean, use_space?: boolean): string;
  /**
   * Converts the given Unix timestamp to an ISO 8601 date and time string (YYYY-MM-DDTHH:MM:SS).
   * If `use_space` is `true`, the date and time bits are separated by an empty space character instead of the letter T.
   */
  get_datetime_string_from_unix_time(unix_time_val: int, use_space?: boolean): string;
  /**
   * Converts the given timezone offset in minutes to a timezone offset string. For example, -480 returns "-08:00", 345 returns "+05:45", and 0 returns "+00:00".
   */
  get_offset_string_from_offset_minutes(offset_minutes: int): string;
  /**
   * Returns the amount of time passed in milliseconds since the engine started.
   * Will always be positive or 0 and uses a 64-bit value (it will wrap after roughly 500 million years).
   */
  get_ticks_msec(): int;
  /**
   * Returns the amount of time passed in microseconds since the engine started.
   * Will always be positive or 0 and uses a 64-bit value (it will wrap after roughly half a million years).
   */
  get_ticks_usec(): int;
  /**
   * Returns the current time as a dictionary of keys: `hour`, `minute`, and `second`.
   * The returned values are in the system's local time when `utc` is `false`, otherwise they are in UTC.
   */
  get_time_dict_from_system(utc?: boolean): Dictionary;
  /** Converts the given time to a dictionary of keys: `hour`, `minute`, and `second`. */
  get_time_dict_from_unix_time(unix_time_val: int): Dictionary;
  /**
   * Returns the current time as an ISO 8601 time string (HH:MM:SS).
   * The returned values are in the system's local time when `utc` is `false`, otherwise they are in UTC.
   */
  get_time_string_from_system(utc?: boolean): string;
  /** Converts the given Unix timestamp to an ISO 8601 time string (HH:MM:SS). */
  get_time_string_from_unix_time(unix_time_val: int): string;
  /**
   * Returns the current time zone as a dictionary of keys: `bias` and `name`.
   * - `bias` is the offset from UTC in minutes, since not all time zones are multiples of an hour from UTC.
   * - `name` is the localized name of the time zone, according to the OS locale settings of the current user.
   */
  get_time_zone_from_system(): Dictionary;
  /**
   * Converts a dictionary of time values to a Unix timestamp.
   * The given dictionary can be populated with the following keys: `year`, `month`, `day`, `hour`, `minute`, and `second`. Any other entries (including `dst`) are ignored.
   * If the dictionary is empty, `0` is returned. If some keys are omitted, they default to the equivalent values for the Unix epoch timestamp 0 (1970-01-01 at 00:00:00).
   * You can pass the output from {@link get_datetime_dict_from_unix_time} directly into this function and get the same as what was put in.
   * **Note:** Unix timestamps are often in UTC. This method does not do any timezone conversion, so the timestamp will be in the same timezone as the given datetime dictionary.
   */
  get_unix_time_from_datetime_dict(datetime: Dictionary): int;
  /**
   * Converts the given ISO 8601 date and/or time string to a Unix timestamp. The string can contain a date only, a time only, or both.
   * **Note:** Unix timestamps are often in UTC. This method does not do any timezone conversion, so the timestamp will be in the same timezone as the given datetime string.
   * **Note:** Any decimal fraction in the time string will be ignored silently.
   */
  get_unix_time_from_datetime_string(datetime: string | NodePath): int;
  /**
   * Returns the current Unix timestamp in seconds based on the system time in UTC. This method is implemented by the operating system and always returns the time in UTC. The Unix timestamp is the number of seconds passed since 1970-01-01 at 00:00:00, the Unix epoch (https://en.wikipedia.org/wiki/Unix_time).
   * **Note:** Unlike other methods that use integer timestamps, this method returns the timestamp as a [float] for sub-second precision.
   */
  get_unix_time_from_system(): float;

  // enum Month
  /** The month of January, represented numerically as `01`. */
  readonly MONTH_JANUARY: int;
  /** The month of February, represented numerically as `02`. */
  readonly MONTH_FEBRUARY: int;
  /** The month of March, represented numerically as `03`. */
  readonly MONTH_MARCH: int;
  /** The month of April, represented numerically as `04`. */
  readonly MONTH_APRIL: int;
  /** The month of May, represented numerically as `05`. */
  readonly MONTH_MAY: int;
  /** The month of June, represented numerically as `06`. */
  readonly MONTH_JUNE: int;
  /** The month of July, represented numerically as `07`. */
  readonly MONTH_JULY: int;
  /** The month of August, represented numerically as `08`. */
  readonly MONTH_AUGUST: int;
  /** The month of September, represented numerically as `09`. */
  readonly MONTH_SEPTEMBER: int;
  /** The month of October, represented numerically as `10`. */
  readonly MONTH_OCTOBER: int;
  /** The month of November, represented numerically as `11`. */
  readonly MONTH_NOVEMBER: int;
  /** The month of December, represented numerically as `12`. */
  readonly MONTH_DECEMBER: int;
  // enum Weekday
  /** The day of the week Sunday, represented numerically as `0`. */
  readonly WEEKDAY_SUNDAY: int;
  /** The day of the week Monday, represented numerically as `1`. */
  readonly WEEKDAY_MONDAY: int;
  /** The day of the week Tuesday, represented numerically as `2`. */
  readonly WEEKDAY_TUESDAY: int;
  /** The day of the week Wednesday, represented numerically as `3`. */
  readonly WEEKDAY_WEDNESDAY: int;
  /** The day of the week Thursday, represented numerically as `4`. */
  readonly WEEKDAY_THURSDAY: int;
  /** The day of the week Friday, represented numerically as `5`. */
  readonly WEEKDAY_FRIDAY: int;
  /** The day of the week Saturday, represented numerically as `6`. */
  readonly WEEKDAY_SATURDAY: int;
}
declare const Time: Time;

