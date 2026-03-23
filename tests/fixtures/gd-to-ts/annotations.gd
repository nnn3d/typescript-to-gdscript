extends Node
class_name Annotations

@export var health: int = 100
@export_file var name: String
@export_file("*.txt") var info: String
@onready var label: Label = $Label
