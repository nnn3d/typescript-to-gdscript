// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** The {@link LookAtModifier3D} rotates a bone to look at a target. */
declare class LookAtModifier3D extends SkeletonModifier3D {
  /** Index of the {@link bone_name} in the parent {@link Skeleton3D}. */
  bone: int;
  /** The bone name of the {@link Skeleton3D} that the modification will operate on. */
  bone_name: string;
  /**
   * The duration of the time-based interpolation. Interpolation is triggered at the following cases:
   * - When the target node is changed
   * - When an axis is flipped due to angle limitation
   * **Note:** The flipping occurs when the target is outside the angle limitation and the internally computed secondary rotation axis of the forward vector is flipped. Visually, it occurs when the target is outside the angle limitation and crosses the plane of the {@link forward_axis} and {@link primary_rotation_axis}.
   */
  duration: float;
  /** The ease type of the time-based interpolation. See also {@link Tween.EaseType}. */
  ease_type: int;
  /**
   * The forward axis of the bone. This {@link SkeletonModifier3D} modifies the bone so that this axis points toward the {@link target_node}.
   */
  forward_axis: int;
  /** Index of the {@link origin_bone_name} in the parent {@link Skeleton3D}. */
  origin_bone: int;
  /**
   * If {@link origin_from} is {@link ORIGIN_FROM_SPECIFIC_BONE}, the bone global pose position specified for this is used as origin.
   */
  origin_bone_name: string;
  /**
   * If {@link origin_from} is {@link ORIGIN_FROM_EXTERNAL_NODE}, the global position of the {@link Node3D} specified for this is used as origin.
   */
  origin_external_node: NodePath;
  /**
   * This value determines from what origin is retrieved for use in the calculation of the forward vector.
   */
  origin_from: int;
  /**
   * The offset of the bone pose origin. Matching the origins by offset is useful for cases where multiple bones must always face the same direction, such as the eyes.
   * **Note:** This value indicates the local position of the object set in {@link origin_from}.
   */
  origin_offset: Vector3;
  /**
   * If the target passes through too close to the origin than this value, time-based interpolation is used even if the target is within the angular limitations, to prevent the angular velocity from becoming too high.
   */
  origin_safe_margin: float;
  /**
   * The threshold to start damping for {@link primary_limit_angle}. It provides non-linear (b-spline) interpolation, let it feel more resistance the more it rotate to the edge limit. This is useful for simulating the limits of human motion.
   * If `1.0`, no damping is performed. If `0.0`, damping is always performed.
   */
  primary_damp_threshold: float;
  /** The limit angle of the primary rotation when {@link symmetry_limitation} is `true`, in radians. */
  primary_limit_angle: float;
  /** The threshold to start damping for {@link primary_negative_limit_angle}. */
  primary_negative_damp_threshold: float;
  /**
   * The limit angle of negative side of the primary rotation when {@link symmetry_limitation} is `false`, in radians.
   */
  primary_negative_limit_angle: float;
  /** The threshold to start damping for {@link primary_positive_limit_angle}. */
  primary_positive_damp_threshold: float;
  /**
   * The limit angle of positive side of the primary rotation when {@link symmetry_limitation} is `false`, in radians.
   */
  primary_positive_limit_angle: float;
  /**
   * The axis of the first rotation. This {@link SkeletonModifier3D} works by compositing the rotation by Euler angles to prevent to rotate the {@link forward_axis}.
   */
  primary_rotation_axis: int;
  /**
   * The relative option. If `true`, the rotation is applied relative to the pose. If `false`, the rotation is applied relative to the rest. It means to replace the current pose with the {@link LookAtModifier3D}'s result.
   */
  relative: boolean;
  /** The threshold to start damping for {@link secondary_limit_angle}. */
  secondary_damp_threshold: float;
  /** The limit angle of the secondary rotation when {@link symmetry_limitation} is `true`, in radians. */
  secondary_limit_angle: float;
  /** The threshold to start damping for {@link secondary_negative_limit_angle}. */
  secondary_negative_damp_threshold: float;
  /**
   * The limit angle of negative side of the secondary rotation when {@link symmetry_limitation} is `false`, in radians.
   */
  secondary_negative_limit_angle: float;
  /** The threshold to start damping for {@link secondary_positive_limit_angle}. */
  secondary_positive_damp_threshold: float;
  /**
   * The limit angle of positive side of the secondary rotation when {@link symmetry_limitation} is `false`, in radians.
   */
  secondary_positive_limit_angle: float;
  /**
   * If `true`, the limitations are spread from the bone symmetrically.
   * If `false`, the limitation can be specified separately for each side of the bone rest.
   */
  symmetry_limitation: boolean;
  /**
   * The {@link NodePath} to the node that is the target for the look at modification. This node is what the modification will rotate the bone to.
   */
  target_node: NodePath;
  /** The transition type of the time-based interpolation. See also {@link Tween.TransitionType}. */
  transition_type: int;
  /**
   * If `true`, limits the amount of rotation. For example, this helps to prevent a character's neck from rotating 360 degrees.
   * **Note:** As with {@link AnimationTree} blending, interpolation is provided that favors {@link Skeleton3D.get_bone_rest}. This means that interpolation does not select the shortest path in some cases.
   * **Note:** Some values for {@link transition_type} (such as {@link Tween.TRANS_BACK}, {@link Tween.TRANS_ELASTIC}, and {@link Tween.TRANS_SPRING}) may exceed the limitations. If interpolation occurs while overshooting the limitations, the result might not respect the bone rest.
   */
  use_angle_limitation: boolean;
  /** If `true`, provides rotation by two axes. */
  use_secondary_rotation: boolean;
  set_bone(value: int): void;
  get_bone(): int;
  set_bone_name(value: string | NodePath): void;
  get_bone_name(): string;
  set_duration(value: float): void;
  get_duration(): float;
  set_ease_type(value: int): void;
  get_ease_type(): int;
  set_forward_axis(value: int): void;
  get_forward_axis(): int;
  set_origin_bone(value: int): void;
  get_origin_bone(): int;
  set_origin_bone_name(value: string | NodePath): void;
  get_origin_bone_name(): string;
  set_origin_external_node(value: NodePath | string): void;
  get_origin_external_node(): NodePath;
  set_origin_from(value: int): void;
  get_origin_from(): int;
  set_origin_offset(value: Vector3 | Vector3i): void;
  get_origin_offset(): Vector3;
  set_origin_safe_margin(value: float): void;
  get_origin_safe_margin(): float;
  set_primary_damp_threshold(value: float): void;
  get_primary_damp_threshold(): float;
  set_primary_limit_angle(value: float): void;
  get_primary_limit_angle(): float;
  set_primary_negative_damp_threshold(value: float): void;
  get_primary_negative_damp_threshold(): float;
  set_primary_negative_limit_angle(value: float): void;
  get_primary_negative_limit_angle(): float;
  set_primary_positive_damp_threshold(value: float): void;
  get_primary_positive_damp_threshold(): float;
  set_primary_positive_limit_angle(value: float): void;
  get_primary_positive_limit_angle(): float;
  set_primary_rotation_axis(value: int): void;
  get_primary_rotation_axis(): int;
  set_relative(value: boolean): void;
  is_relative(): boolean;
  set_secondary_damp_threshold(value: float): void;
  get_secondary_damp_threshold(): float;
  set_secondary_limit_angle(value: float): void;
  get_secondary_limit_angle(): float;
  set_secondary_negative_damp_threshold(value: float): void;
  get_secondary_negative_damp_threshold(): float;
  set_secondary_negative_limit_angle(value: float): void;
  get_secondary_negative_limit_angle(): float;
  set_secondary_positive_damp_threshold(value: float): void;
  get_secondary_positive_damp_threshold(): float;
  set_secondary_positive_limit_angle(value: float): void;
  get_secondary_positive_limit_angle(): float;
  set_symmetry_limitation(value: boolean): void;
  is_limitation_symmetry(): boolean;
  set_target_node(value: NodePath | string): void;
  get_target_node(): NodePath;
  set_transition_type(value: int): void;
  get_transition_type(): int;
  set_use_angle_limitation(value: boolean): void;
  is_using_angle_limitation(): boolean;
  set_use_secondary_rotation(value: boolean): void;
  is_using_secondary_rotation(): boolean;

  /** Returns the remaining seconds of the time-based interpolation. */
  get_interpolation_remaining(): float;
  /**
   * Returns `true` if time-based interpolation is running. If `true`, it is equivalent to {@link get_interpolation_remaining} returning `0.0`.
   * This is useful to determine whether a {@link LookAtModifier3D} can be removed safely.
   */
  is_interpolating(): boolean;
  /**
   * Returns whether the target is within the angle limitations. It is useful for unsetting the {@link target_node} when the target is outside of the angle limitations.
   * **Note:** The value is updated after {@link SkeletonModifier3D._process_modification}. To retrieve this value correctly, we recommend using the signal {@link SkeletonModifier3D.modification_processed}.
   */
  is_target_within_limitation(): boolean;

  // enum OriginFrom
  /** The bone rest position of the bone specified in {@link bone} is used as origin. */
  static readonly ORIGIN_FROM_SELF: int;
  /**
   * The bone global pose position of the bone specified in {@link origin_bone} is used as origin.
   * **Note:** It is recommended that you select only the parent bone unless you are familiar with the bone processing process. The specified bone pose at the time the {@link LookAtModifier3D} is processed is used as a reference. In other words, if you specify a child bone and the {@link LookAtModifier3D} causes the child bone to move, the rendered result and direction will not match.
   */
  static readonly ORIGIN_FROM_SPECIFIC_BONE: int;
  /**
   * The global position of the {@link Node3D} specified in {@link origin_external_node} is used as origin.
   * **Note:** Same as {@link ORIGIN_FROM_SPECIFIC_BONE}, when specifying a {@link BoneAttachment3D} with a child bone assigned, the rendered result and direction will not match.
   */
  static readonly ORIGIN_FROM_EXTERNAL_NODE: int;
}
