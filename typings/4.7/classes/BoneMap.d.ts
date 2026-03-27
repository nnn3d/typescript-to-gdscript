// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Describes a mapping of bone names for retargeting {@link Skeleton3D} into common names defined by a {@link SkeletonProfile}.
 */
declare class BoneMap extends Resource {
  /**
   * A {@link SkeletonProfile} of the mapping target. Key names in the {@link BoneMap} are synchronized with it.
   */
  profile: SkeletonProfile;
  set_profile(value: SkeletonProfile): void;
  get_profile(): SkeletonProfile;

  /**
   * Returns a profile bone name having `skeleton_bone_name`. If not found, an empty {@link StringName} will be returned.
   * In the retargeting process, the returned bone name is the bone name of the target skeleton.
   */
  find_profile_bone_name(skeleton_bone_name: string): string;
  /**
   * Returns a skeleton bone name is mapped to `profile_bone_name`.
   * In the retargeting process, the returned bone name is the bone name of the source skeleton.
   */
  get_skeleton_bone_name(profile_bone_name: string): string;
  /**
   * Maps a skeleton bone name to `profile_bone_name`.
   * In the retargeting process, the setting bone name is the bone name of the source skeleton.
   */
  set_skeleton_bone_name(profile_bone_name: string, skeleton_bone_name: string): void;

  /**
   * This signal is emitted when change the key value in the {@link BoneMap}. This is used to validate mapping and to update {@link BoneMap} editor.
   */
  bone_map_updated: Signal<[]>;
  /**
   * This signal is emitted when change the value in profile or change the reference of profile. This is used to update key names in the {@link BoneMap} and to redraw the {@link BoneMap} editor.
   */
  profile_updated: Signal<[]>;
}
