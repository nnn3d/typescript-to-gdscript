extends Node
class_name MyClass

static var MAX_SPEED: float = 200.0
static var instance_count: int = 0

static func get_max_speed() -> float:
	return MyClass.MAX_SPEED

static func increment_count():
	MyClass.instance_count += 1
