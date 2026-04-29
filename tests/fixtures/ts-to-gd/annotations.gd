@tool
extends Node2D
class_name MyClass

const v = 0

@export_group("group")
@export
var speed: float = 100.0
@export
var jump_height: float = 200.0
@onready
var sprite: Sprite2D = null

func _ready():
	print("Speed: " + str(self.speed))

func test():
	@warning_ignore("integer_division")
	var a = 11 / 2
