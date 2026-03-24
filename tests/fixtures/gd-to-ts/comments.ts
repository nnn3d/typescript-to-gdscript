export class Comments extends Node {
  /** Doc comment for health */
  health: int = 100;
  // Regular comment
  speed: float = 5.0;

  _ready() {
    // Initialize
    this.health = 50;
    /** Important value */
    this.speed = 10.0;
    if (this.health > 0) {
      // Comment with bad align
      print("done");
    }
  }
}
