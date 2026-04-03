extends Node
class_name Comments

## Doc comment for health
var health: int = 100

# Regular comment
var speed: float = 5.0

#"comment" without spacing
var velocity: float = 5.0

"""Block comment at class level"""

"""
Multiline block
comment at class level
"""

func _ready():
	# Initialize
	health = 50
	## Important value
	speed = 10.0
	"""Block comment inside function"""
	"""
  Multiline block
  comment inside function
  """
	if health > 0:
# Comment with bad align
  	print("done")
	if health == 0:
		"""
		Multiline block
		comment inside function
		"""
		print("dead")
