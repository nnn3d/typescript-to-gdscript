extends Node
class_name Signals

signal health_changed(old_value: int, new_value: int)
signal died
signal score_updated(score: float)

func take_damage(amount: int):
	var old_hp: int = health
	health -= amount
	health_changed.emit(old_hp, health)
	if health <= 0:
		died.emit()
