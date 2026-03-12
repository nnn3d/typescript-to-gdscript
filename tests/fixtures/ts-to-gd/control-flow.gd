extends Node
class_name MyClass

func test_if():
	var x: int = 5
	if x > 10:
		print("big")
	elif x > 0:
		print("positive")
	else:
		print("non-positive")

func test_while():
	var i: int = 0
	while i < 10:
		print(i)
		i += 1

func test_for():
	var items = [1, 2, 3, 4, 5]
	for item in items:
		print(item)

func test_match():
	var value: int = 2
	match value:
		1:
			print("one")
		2:
			print("two")
		3:
			print("three")
		_:
			print("other")

func test_break_continue():
	var i: int = 0
	while i < 20:
		i += 1
		if i == 5:
			continue
		if i == 15:
			break
		print(i)
