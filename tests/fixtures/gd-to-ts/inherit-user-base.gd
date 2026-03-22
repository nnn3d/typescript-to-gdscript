extends CharacterBody2D
class_name EnemyBase

var dead = false
var hp = 7
var direction = -1
@onready var sprite = $AnimatedSprite2D

func basic_flip():
	if direction == 1:
		sprite.flip_h = false
	else:
		sprite.flip_h = true

func basic_on_ready():
	add_to_group("enemies")
