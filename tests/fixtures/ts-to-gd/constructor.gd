extends RefCounted
class_name MyClass

var value: int = 0
var label: String = ""

func _init(value: int, label: String = "default"):
	self.value = value
	self.label = label

func get_info() -> String:
	return self.label + ": " + str(self.value)
