extends Node2D
class_name MyClass

@export_group("group")
@export
var speed: float = 100.0
@export
var jump_height: float = 200.0
@onready
var sprite: Sprite2D = null

func _ready():
	print("Speed: " + str(self.speed))
