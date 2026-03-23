extends Node
class_name Enums

enum Direction { UP, DOWN, LEFT, RIGHT }
enum Status { IDLE, RUNNING, JUMPING = 10 }
enum { UNIT_NEUTRAL, UNIT_ENEMY, UNIT_ALLY }

func _ready():
    return Direction.UP or Status.IDLE or UNIT_NEUTRAL
