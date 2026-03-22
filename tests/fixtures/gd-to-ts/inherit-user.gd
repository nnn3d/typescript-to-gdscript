extends EnemyBase

var velocity_target = -100
var toggle = true

func _physics_process(delta):
	if dead:
		return
	if is_on_wall():
		if direction == 1:
			direction = -1
		else:
			direction = 1
		basic_flip()
	velocity.y = move_toward(velocity.y, velocity_target, 100 * delta)
	manage_animation()
	if not dead:
		move_and_slide()

func manage_animation():
	sprite.play("flying")

func _ready():
	hp = 3
	direction = 1
	basic_on_ready()
