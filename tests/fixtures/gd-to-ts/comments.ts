export class Comments extends Node {
  /** Doc comment for health */
  health: int = 100;
  // Regular comment
  speed: float = 5.0;
  // "comment" without spacing
  velocity: float = 5.0;
  /* Block comment at class level */
  /*
  Multiline block
  comment at class level
  */

  _ready() {
    // Initialize
    this.health = 50;
    /** Important value */
    this.speed = 10.0;
    /* Block comment inside function */
    /*
    Multiline block
    comment inside function
    */
    if (this.health > 0) {
      // Comment with bad align
      print("done");
    }
    if (this.health === 0) {
      /*
      Multiline block
      comment inside function
      */
      print("dead");
    }
  }
}
