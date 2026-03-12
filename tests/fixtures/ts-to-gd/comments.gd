extends Node
class_name MyClass

# This is a single line comment
var speed: float = 10.0
## This is a documentation comment
var health: int = 100

# Method with comments
func update_speed(new_speed: float):
	# Update the speed value
	self.speed = new_speed

## Calculate the total damage
func calculate_damage(base: float, multiplier: float) -> float:
	return base * multiplier
