extends Node
class_name Signals

var health: int = 100

signal health_changed(old_value: int, new_value: int)
signal died
signal score_updated(score: float)
# An untyped parameter keeps its name too; a TS-reserved one gets a `_`.
signal picked(item, default: int)

func take_damage(amount: int):
	var old_hp: int = health
	health -= amount
	health_changed.emit(old_hp, health)
	if health <= 0:
		died.emit()
