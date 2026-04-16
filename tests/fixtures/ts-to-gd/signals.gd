extends Node
class_name MyClass

signal health_changed(from: int, to: int)
signal mana_changed(arg1: int, arg2: int)
signal stamina_changed(arg1: float, arg2, arg3)
signal game_over
var health: int = 100

func take_damage(amount: int):
	var old_health: int = self.health
	self.health -= amount
	self.health_changed.emit(old_health, self.health)
	if self.health <= 0:
		self.game_over.emit()

func _ready():
	self.health_changed.connect(self._on_health_changed)

func _on_health_changed(old_value: int, new_value: int):
	print("Health changed from " + str(old_value) + " to " + str(new_value))
