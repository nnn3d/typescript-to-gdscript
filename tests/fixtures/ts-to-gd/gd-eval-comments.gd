@tool
extends Node

@icon("res://icon.svg")
var speed: float = 10.0
signal custom_signal(value: int)
var health: int = 100

func _ready():
	var special := preload("res://special.tscn")
	var x: int = 1
		indented_with_tab()
