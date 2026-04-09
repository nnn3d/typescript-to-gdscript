extends Node
class_name ControlFlow

func test_if():
	if health > 50:
		print("healthy")
	elif health > 20:
		print("wounded")
	else:
		print("critical")

func test_for():
	for i in range(10):
		print(i)

func test_while():
	var count: int = 0
	while count < 10:
		count += 1

func test_match():
	var value: int = 42
	match value:
		1:
			print("one")
		2:
			print("two")
		_:
			print("other")

func test_break_continue():
	for i in range(10):
		if i == 5:
			break
		if i == 3:
			continue
		print(i)

func test_is(x):
	if x is Node2D:
		print(x, "is Node2D")
	if x is not Node2D:
		print(x, "is not Node2D")
	if not x is Node2D:
		print(x, "not is Node2D")
	if x is int:
		print(x, "is int")
	if x is not float:
		print(x, "is not float")
	if not x is String:
		print(x, "not is String")
