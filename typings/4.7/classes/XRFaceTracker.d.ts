// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A tracked face. */
declare class XRFaceTracker extends XRTracker {
  /**
   * The array of face blend shape weights with indices corresponding to the {@link BlendShapeEntry} enum.
   */
  blend_shapes: PackedFloat32Array;
  type: int;
  set_blend_shapes(value: PackedFloat32Array): void;
  get_blend_shapes(): PackedFloat32Array;

  /** Returns the requested face blend shape weight. */
  get_blend_shape(blend_shape: int): float;
  /** Sets a face blend shape weight. */
  set_blend_shape(blend_shape: int, weight: float): void;

  // enum BlendShapeEntry
  /** Right eye looks outwards. */
  static readonly FT_EYE_LOOK_OUT_RIGHT: int;
  /** Right eye looks inwards. */
  static readonly FT_EYE_LOOK_IN_RIGHT: int;
  /** Right eye looks upwards. */
  static readonly FT_EYE_LOOK_UP_RIGHT: int;
  /** Right eye looks downwards. */
  static readonly FT_EYE_LOOK_DOWN_RIGHT: int;
  /** Left eye looks outwards. */
  static readonly FT_EYE_LOOK_OUT_LEFT: int;
  /** Left eye looks inwards. */
  static readonly FT_EYE_LOOK_IN_LEFT: int;
  /** Left eye looks upwards. */
  static readonly FT_EYE_LOOK_UP_LEFT: int;
  /** Left eye looks downwards. */
  static readonly FT_EYE_LOOK_DOWN_LEFT: int;
  /** Closes the right eyelid. */
  static readonly FT_EYE_CLOSED_RIGHT: int;
  /** Closes the left eyelid. */
  static readonly FT_EYE_CLOSED_LEFT: int;
  /** Squeezes the right eye socket muscles. */
  static readonly FT_EYE_SQUINT_RIGHT: int;
  /** Squeezes the left eye socket muscles. */
  static readonly FT_EYE_SQUINT_LEFT: int;
  /** Right eyelid widens beyond relaxed. */
  static readonly FT_EYE_WIDE_RIGHT: int;
  /** Left eyelid widens beyond relaxed. */
  static readonly FT_EYE_WIDE_LEFT: int;
  /** Dilates the right eye pupil. */
  static readonly FT_EYE_DILATION_RIGHT: int;
  /** Dilates the left eye pupil. */
  static readonly FT_EYE_DILATION_LEFT: int;
  /** Constricts the right eye pupil. */
  static readonly FT_EYE_CONSTRICT_RIGHT: int;
  /** Constricts the left eye pupil. */
  static readonly FT_EYE_CONSTRICT_LEFT: int;
  /** Right eyebrow pinches in. */
  static readonly FT_BROW_PINCH_RIGHT: int;
  /** Left eyebrow pinches in. */
  static readonly FT_BROW_PINCH_LEFT: int;
  /** Outer right eyebrow pulls down. */
  static readonly FT_BROW_LOWERER_RIGHT: int;
  /** Outer left eyebrow pulls down. */
  static readonly FT_BROW_LOWERER_LEFT: int;
  /** Inner right eyebrow pulls up. */
  static readonly FT_BROW_INNER_UP_RIGHT: int;
  /** Inner left eyebrow pulls up. */
  static readonly FT_BROW_INNER_UP_LEFT: int;
  /** Outer right eyebrow pulls up. */
  static readonly FT_BROW_OUTER_UP_RIGHT: int;
  /** Outer left eyebrow pulls up. */
  static readonly FT_BROW_OUTER_UP_LEFT: int;
  /** Right side face sneers. */
  static readonly FT_NOSE_SNEER_RIGHT: int;
  /** Left side face sneers. */
  static readonly FT_NOSE_SNEER_LEFT: int;
  /** Right side nose canal dilates. */
  static readonly FT_NASAL_DILATION_RIGHT: int;
  /** Left side nose canal dilates. */
  static readonly FT_NASAL_DILATION_LEFT: int;
  /** Right side nose canal constricts. */
  static readonly FT_NASAL_CONSTRICT_RIGHT: int;
  /** Left side nose canal constricts. */
  static readonly FT_NASAL_CONSTRICT_LEFT: int;
  /** Raises the right side cheek. */
  static readonly FT_CHEEK_SQUINT_RIGHT: int;
  /** Raises the left side cheek. */
  static readonly FT_CHEEK_SQUINT_LEFT: int;
  /** Puffs the right side cheek. */
  static readonly FT_CHEEK_PUFF_RIGHT: int;
  /** Puffs the left side cheek. */
  static readonly FT_CHEEK_PUFF_LEFT: int;
  /** Sucks in the right side cheek. */
  static readonly FT_CHEEK_SUCK_RIGHT: int;
  /** Sucks in the left side cheek. */
  static readonly FT_CHEEK_SUCK_LEFT: int;
  /** Opens jawbone. */
  static readonly FT_JAW_OPEN: int;
  /** Closes the mouth. */
  static readonly FT_MOUTH_CLOSED: int;
  /** Pushes jawbone right. */
  static readonly FT_JAW_RIGHT: int;
  /** Pushes jawbone left. */
  static readonly FT_JAW_LEFT: int;
  /** Pushes jawbone forward. */
  static readonly FT_JAW_FORWARD: int;
  /** Pushes jawbone backward. */
  static readonly FT_JAW_BACKWARD: int;
  /** Flexes jaw muscles. */
  static readonly FT_JAW_CLENCH: int;
  /** Raises the jawbone. */
  static readonly FT_JAW_MANDIBLE_RAISE: int;
  /** Upper right lip part tucks in the mouth. */
  static readonly FT_LIP_SUCK_UPPER_RIGHT: int;
  /** Upper left lip part tucks in the mouth. */
  static readonly FT_LIP_SUCK_UPPER_LEFT: int;
  /** Lower right lip part tucks in the mouth. */
  static readonly FT_LIP_SUCK_LOWER_RIGHT: int;
  /** Lower left lip part tucks in the mouth. */
  static readonly FT_LIP_SUCK_LOWER_LEFT: int;
  /** Right lip corner folds into the mouth. */
  static readonly FT_LIP_SUCK_CORNER_RIGHT: int;
  /** Left lip corner folds into the mouth. */
  static readonly FT_LIP_SUCK_CORNER_LEFT: int;
  /** Upper right lip part pushes into a funnel. */
  static readonly FT_LIP_FUNNEL_UPPER_RIGHT: int;
  /** Upper left lip part pushes into a funnel. */
  static readonly FT_LIP_FUNNEL_UPPER_LEFT: int;
  /** Lower right lip part pushes into a funnel. */
  static readonly FT_LIP_FUNNEL_LOWER_RIGHT: int;
  /** Lower left lip part pushes into a funnel. */
  static readonly FT_LIP_FUNNEL_LOWER_LEFT: int;
  /** Upper right lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_UPPER_RIGHT: int;
  /** Upper left lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_UPPER_LEFT: int;
  /** Lower right lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_LOWER_RIGHT: int;
  /** Lower left lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_LOWER_LEFT: int;
  /** Upper right part of the lip pulls up. */
  static readonly FT_MOUTH_UPPER_UP_RIGHT: int;
  /** Upper left part of the lip pulls up. */
  static readonly FT_MOUTH_UPPER_UP_LEFT: int;
  /** Lower right part of the lip pulls up. */
  static readonly FT_MOUTH_LOWER_DOWN_RIGHT: int;
  /** Lower left part of the lip pulls up. */
  static readonly FT_MOUTH_LOWER_DOWN_LEFT: int;
  /** Upper right lip part pushes in the cheek. */
  static readonly FT_MOUTH_UPPER_DEEPEN_RIGHT: int;
  /** Upper left lip part pushes in the cheek. */
  static readonly FT_MOUTH_UPPER_DEEPEN_LEFT: int;
  /** Moves upper lip right. */
  static readonly FT_MOUTH_UPPER_RIGHT: int;
  /** Moves upper lip left. */
  static readonly FT_MOUTH_UPPER_LEFT: int;
  /** Moves lower lip right. */
  static readonly FT_MOUTH_LOWER_RIGHT: int;
  /** Moves lower lip left. */
  static readonly FT_MOUTH_LOWER_LEFT: int;
  /** Right lip corner pulls diagonally up and out. */
  static readonly FT_MOUTH_CORNER_PULL_RIGHT: int;
  /** Left lip corner pulls diagonally up and out. */
  static readonly FT_MOUTH_CORNER_PULL_LEFT: int;
  /** Right corner lip slants up. */
  static readonly FT_MOUTH_CORNER_SLANT_RIGHT: int;
  /** Left corner lip slants up. */
  static readonly FT_MOUTH_CORNER_SLANT_LEFT: int;
  /** Right corner lip pulls down. */
  static readonly FT_MOUTH_FROWN_RIGHT: int;
  /** Left corner lip pulls down. */
  static readonly FT_MOUTH_FROWN_LEFT: int;
  /** Mouth corner lip pulls out and down. */
  static readonly FT_MOUTH_STRETCH_RIGHT: int;
  /** Mouth corner lip pulls out and down. */
  static readonly FT_MOUTH_STRETCH_LEFT: int;
  /** Right lip corner is pushed backwards. */
  static readonly FT_MOUTH_DIMPLE_RIGHT: int;
  /** Left lip corner is pushed backwards. */
  static readonly FT_MOUTH_DIMPLE_LEFT: int;
  /** Raises and slightly pushes out the upper mouth. */
  static readonly FT_MOUTH_RAISER_UPPER: int;
  /** Raises and slightly pushes out the lower mouth. */
  static readonly FT_MOUTH_RAISER_LOWER: int;
  /** Right side lips press and flatten together vertically. */
  static readonly FT_MOUTH_PRESS_RIGHT: int;
  /** Left side lips press and flatten together vertically. */
  static readonly FT_MOUTH_PRESS_LEFT: int;
  /** Right side lips squeeze together horizontally. */
  static readonly FT_MOUTH_TIGHTENER_RIGHT: int;
  /** Left side lips squeeze together horizontally. */
  static readonly FT_MOUTH_TIGHTENER_LEFT: int;
  /** Tongue visibly sticks out of the mouth. */
  static readonly FT_TONGUE_OUT: int;
  /** Tongue points upwards. */
  static readonly FT_TONGUE_UP: int;
  /** Tongue points downwards. */
  static readonly FT_TONGUE_DOWN: int;
  /** Tongue points right. */
  static readonly FT_TONGUE_RIGHT: int;
  /** Tongue points left. */
  static readonly FT_TONGUE_LEFT: int;
  /** Sides of the tongue funnel, creating a roll. */
  static readonly FT_TONGUE_ROLL: int;
  /** Tongue arches up then down inside the mouth. */
  static readonly FT_TONGUE_BLEND_DOWN: int;
  /** Tongue arches down then up inside the mouth. */
  static readonly FT_TONGUE_CURL_UP: int;
  /** Tongue squishes together and thickens. */
  static readonly FT_TONGUE_SQUISH: int;
  /** Tongue flattens and thins out. */
  static readonly FT_TONGUE_FLAT: int;
  /** Tongue tip rotates clockwise, with the rest following gradually. */
  static readonly FT_TONGUE_TWIST_RIGHT: int;
  /** Tongue tip rotates counter-clockwise, with the rest following gradually. */
  static readonly FT_TONGUE_TWIST_LEFT: int;
  /** Inner mouth throat closes. */
  static readonly FT_SOFT_PALATE_CLOSE: int;
  /** The Adam's apple visibly swallows. */
  static readonly FT_THROAT_SWALLOW: int;
  /** Right side neck visibly flexes. */
  static readonly FT_NECK_FLEX_RIGHT: int;
  /** Left side neck visibly flexes. */
  static readonly FT_NECK_FLEX_LEFT: int;
  /** Closes both eye lids. */
  static readonly FT_EYE_CLOSED: int;
  /** Widens both eye lids. */
  static readonly FT_EYE_WIDE: int;
  /** Squints both eye lids. */
  static readonly FT_EYE_SQUINT: int;
  /** Dilates both pupils. */
  static readonly FT_EYE_DILATION: int;
  /** Constricts both pupils. */
  static readonly FT_EYE_CONSTRICT: int;
  /** Pulls the right eyebrow down and in. */
  static readonly FT_BROW_DOWN_RIGHT: int;
  /** Pulls the left eyebrow down and in. */
  static readonly FT_BROW_DOWN_LEFT: int;
  /** Pulls both eyebrows down and in. */
  static readonly FT_BROW_DOWN: int;
  /** Right brow appears worried. */
  static readonly FT_BROW_UP_RIGHT: int;
  /** Left brow appears worried. */
  static readonly FT_BROW_UP_LEFT: int;
  /** Both brows appear worried. */
  static readonly FT_BROW_UP: int;
  /** Entire face sneers. */
  static readonly FT_NOSE_SNEER: int;
  /** Both nose canals dilate. */
  static readonly FT_NASAL_DILATION: int;
  /** Both nose canals constrict. */
  static readonly FT_NASAL_CONSTRICT: int;
  /** Puffs both cheeks. */
  static readonly FT_CHEEK_PUFF: int;
  /** Sucks in both cheeks. */
  static readonly FT_CHEEK_SUCK: int;
  /** Raises both cheeks. */
  static readonly FT_CHEEK_SQUINT: int;
  /** Tucks in the upper lips. */
  static readonly FT_LIP_SUCK_UPPER: int;
  /** Tucks in the lower lips. */
  static readonly FT_LIP_SUCK_LOWER: int;
  /** Tucks in both lips. */
  static readonly FT_LIP_SUCK: int;
  /** Funnels in the upper lips. */
  static readonly FT_LIP_FUNNEL_UPPER: int;
  /** Funnels in the lower lips. */
  static readonly FT_LIP_FUNNEL_LOWER: int;
  /** Funnels in both lips. */
  static readonly FT_LIP_FUNNEL: int;
  /** Upper lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_UPPER: int;
  /** Lower lip part pushes outwards. */
  static readonly FT_LIP_PUCKER_LOWER: int;
  /** Lips push outwards. */
  static readonly FT_LIP_PUCKER: int;
  /** Raises the upper lips. */
  static readonly FT_MOUTH_UPPER_UP: int;
  /** Lowers the lower lips. */
  static readonly FT_MOUTH_LOWER_DOWN: int;
  /** Mouth opens, revealing teeth. */
  static readonly FT_MOUTH_OPEN: int;
  /** Moves mouth right. */
  static readonly FT_MOUTH_RIGHT: int;
  /** Moves mouth left. */
  static readonly FT_MOUTH_LEFT: int;
  /** Right side of the mouth smiles. */
  static readonly FT_MOUTH_SMILE_RIGHT: int;
  /** Left side of the mouth smiles. */
  static readonly FT_MOUTH_SMILE_LEFT: int;
  /** Mouth expresses a smile. */
  static readonly FT_MOUTH_SMILE: int;
  /** Right side of the mouth expresses sadness. */
  static readonly FT_MOUTH_SAD_RIGHT: int;
  /** Left side of the mouth expresses sadness. */
  static readonly FT_MOUTH_SAD_LEFT: int;
  /** Mouth expresses sadness. */
  static readonly FT_MOUTH_SAD: int;
  /** Mouth stretches. */
  static readonly FT_MOUTH_STRETCH: int;
  /** Lip corners dimple. */
  static readonly FT_MOUTH_DIMPLE: int;
  /** Mouth tightens. */
  static readonly FT_MOUTH_TIGHTENER: int;
  /** Mouth presses together. */
  static readonly FT_MOUTH_PRESS: int;
  /** Represents the size of the {@link BlendShapeEntry} enum. */
  static readonly FT_MAX: int;
}
