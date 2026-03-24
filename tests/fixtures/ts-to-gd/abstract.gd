@abstract
extends Node
class_name AbstractBase

@abstract
func process_item(item: String) -> String:
	pass

func concrete_method():
	return 42

@abstract
class InnerAbstract:
	@abstract
	func do_something() -> void:
		pass
