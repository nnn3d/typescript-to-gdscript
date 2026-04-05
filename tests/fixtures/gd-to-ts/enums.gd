extends Node
class_name Enums

enum Direction { UP, DOWN, LEFT, RIGHT }
enum Status { IDLE, RUNNING, JUMPING = 10 }
enum { UNIT_NEUTRAL, UNIT_ENEMY, UNIT_ALLY }

func _ready():
    return Direction.UP or Status.IDLE or UNIT_NEUTRAL

class Weapon extends Node:
    enum Rarity { COMMON, RARE, LEGENDARY }
    var damage: int = 10

func test_typed_params(s: Status, w: Weapon):
    pass

func test_typed_vars():
    var state: Status = Status.IDLE
    var weapon: Weapon

func test_global_enums():
    var v1 = KEY_F21
    var v2 = OK
    var v3 = Error.OK
    var v4 = SIDE_LEFT
