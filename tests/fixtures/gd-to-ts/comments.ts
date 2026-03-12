class Comments extends Node {
  /** Doc comment for health */
  health: int = 100;
  // Regular comment
  speed: float = 5.0;

  _ready() {
    // Initialize
    this.health = 50;
    /** Important value */
    this.speed = 10.0;
  }
}
