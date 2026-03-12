class MyClass extends Node {
  // This is a single line comment
  speed: float = 10.0;

  /** This is a documentation comment */
  health: int = 100;

  // Method with comments
  update_speed(new_speed: float) {
    // Update the speed value
    this.speed = new_speed;
  }

  /** Calculate the total damage */
  calculate_damage(base: float, multiplier: float): float {
    return base * multiplier;
  }
}
