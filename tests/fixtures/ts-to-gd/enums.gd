extends Node
class_name MyClass

enum Direction {UP, DOWN, LEFT, RIGHT}
enum State {IDLE, WALKING, RUNNING = 5}

class Weapon extends Node:
	var damage: int = 10

var current_direction: int = 0
var current_state: int = 0

func set_direction(dir: int):
	self.current_direction = dir
	return self.Direction.LEFT or self.State.IDLE

func test_typed(s: State, w: Weapon):
	var state: State = self.State.IDLE
