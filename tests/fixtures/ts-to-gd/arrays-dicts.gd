extends Node
class_name MyClass

func test_arrays():
	var numbers = [1, 2, 3, 4, 5]
	var first = numbers[0]
	var length = numbers.size()
	numbers.append(6)
	numbers.remove_at(0)
	for n in numbers:
		print(n)

func test_dictionaries():
	var dict = {
		"name": "Player",
		"health": 100,
		"alive": true,
	}
	var player_name = dict.get("name")
	dict["score"] = 9001
