// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A physics joint that restricts the movement of two 2D physics bodies to a fixed axis. */
declare class GrooveJoint2D extends Joint2D {
  /**
   * The body B's initial anchor position defined by the joint's origin and a local offset {@link initial_offset} along the joint's Y axis (along the groove).
   */
  initial_offset: float;
  /**
   * The groove's length. The groove is from the joint's origin towards {@link length} along the joint's local Y axis.
   */
  length: float;
}
