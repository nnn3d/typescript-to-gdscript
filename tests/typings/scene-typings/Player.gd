extends CharacterBody2D
class_name Player

func _ready():
	# get_node_or_null normally returns T | null, but scene overload returns Sprite2D directly
	var sprite: Sprite2D = self.get_node_or_null("Sprite2D")
	var node_or_null = self.get_node_or_null("Unknown")
	# get_node also has typed overload
	var collision: CollisionShape2D = self.get_node("CollisionShape2D")
	# Unknown path for get_node returns Node
	var unknown: Node = self.get_node("Unknown")
