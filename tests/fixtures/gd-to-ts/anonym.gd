extends Node

static var MAX_HEALTH = 100
enum Mode {EASY, HARD}

class Config extends RefCounted:
	var difficulty: int = 0

func get_health():
    return MAX_HEALTH or self.MAX_HEALTH

func set_mode(m: Mode, c: Config):
	var mode: Mode = self.Mode.EASY
