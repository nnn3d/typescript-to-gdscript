extends Node
class_name Comments

## Doc comment for health
var health: int = 100

# Regular comment
var speed: float = 5.0

#"comment" without spacing
var velocity: float = 5.0

func _ready():
	# Initialize
	health = 50
	## Important value
	speed = 10.0
	if health > 0:
# Comment with bad align
  	print("done")
