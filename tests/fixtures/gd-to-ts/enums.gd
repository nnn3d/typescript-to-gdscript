extends Node
class_name Enums

enum Direction { UP, DOWN, LEFT, RIGHT }
enum Status { IDLE, RUNNING, JUMPING = 10 }
enum { UNIT_NEUTRAL, UNIT_ENEMY, UNIT_ALLY }

func _ready():
    return Direction.UP or Status.IDLE or UNIT_NEUTRAL

func test_global_enums():
    var v1 = KEY_F21
    var v2 = OK
    var v3 = Error.OK
    var v4 = SIDE_LEFT
