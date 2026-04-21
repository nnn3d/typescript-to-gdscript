extends Node

enum Mode { EASY, HARD }

class Config extends RefCounted:
	enum HARD { A, B }
	class Inner:
		const TYPE = "inner"
		static var VAL = 10
	var difficulty: int = 0

static var MAX_HEALTH = 100

func get_health():
	return self.MAX_HEALTH

func set_mode(m: Mode, c: Config):
	var mode: Mode = self.Mode.EASY
