class_name MyClass
extends Node

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

# The `while` a C-style `for` becomes has its step at the end of the body,
# so a `continue` runs the step itself before it jumps past it.
func test_for_step():
	var i: int = 0
	while i < 10:
		if i == 5:
			i += 1
			continue
		match i:
			1:
				i += 1
				continue
			_:
				print(i)
		i += 1

# Each `continue` takes the step of its own loop, and only that.
func test_for_step_nested(items: Array[int]):
	var j: int = 0
	while j < 3:
		for item in items:
			if item == j:
				continue
			print(item)
		var k: int = 3
		while k > 0:
			if k == j:
				k -= 1
				continue
			print(k)
			k -= 1
		var n: int = 0
		while n < 3:
			n += 1
			if n == j:
				continue
			print(n)
		if j == 1:
			j += 1
			continue
		print(j)
		j += 1
	var m: int = 0
	while m < 3:
		m += 1
		if m == 1:
			continue
		print(m)

func test_is(x):
	if x is Node2D:
		print(x, "is Node2D")
	if not (x is Node2D):
		print(x, "is not Node2D")
	if x is int:
		print(x, "is int")
	if not x is float:
		print(x, "is not float")
