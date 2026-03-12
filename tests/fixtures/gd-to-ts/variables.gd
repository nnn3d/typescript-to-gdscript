extends Node
class_name Variables

var health: int = 100
var speed: float = 10.5
var name: String = "Player"
var alive: bool = true
var position_2d: Vector2 = Vector2(0, 0)
static var count: int = 0
var inferred := 42

func _ready():
	var x: int = 5
	var y: float = 3.14
	var greeting: String = "hello"
	var local_inferred := true
