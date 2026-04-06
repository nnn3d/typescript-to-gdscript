extends Node
class_name Annotations

@export_group("group")
@export var health: int = 100
@export_file var name: String
@export_file("*.txt") var info: String
@onready var label: Label = $Label

func test():
	@warning_ignore("integer_division")
	var a = 11 / 2
