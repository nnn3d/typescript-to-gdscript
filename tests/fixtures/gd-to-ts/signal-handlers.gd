extends Area2D

func _on_area_entered(area):
	print(area)

func _on_body_shape_entered(body_rid, body, body_shape_index, local_shape_index):
	print(body)

func _on_timer_timeout():
	print("timeout")

func already_typed(area: Node2D):
	print(area)
