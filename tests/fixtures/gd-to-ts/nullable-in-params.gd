extends Node
class_name NullableInParams

func take_node(node: Node) -> void:
	pass

func take_value(v: Vector2) -> void:
	pass

func take_primitive(x: int) -> void:
	pass

func take_string(s: String) -> void:
	pass

func mixed(a: int, b: Node, c: Color, d: Resource) -> void:
	pass

func take_packed(arr: PackedStringArray) -> void:
	pass

func take_signal(s: Signal) -> void:
	pass

func take_callable(cb: Callable) -> void:
	pass

func default_non_null(node: Node = self) -> void:
	pass

func lambda_user() -> void:
	var cb = func(n: Node2D): print(n)

func _ready() -> void:
	pass
