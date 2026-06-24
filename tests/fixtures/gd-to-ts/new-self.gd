extends RefCounted
class_name NewSelf

var hp: int

func _init(hp: int = 0):
	self.hp = hp

func clone() -> NewSelf:
	var copy = new()
	copy.hp = self.hp
	return copy

func spawn_other() -> Node2D:
	return Node2D.new()
