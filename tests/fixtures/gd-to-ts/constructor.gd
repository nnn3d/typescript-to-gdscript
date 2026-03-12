extends RefCounted
class_name Constructor

var name: String
var hp: int

func _init(name: String, hp: int = 100):
	self.name = name
	self.hp = hp
	print("created: ", name)
