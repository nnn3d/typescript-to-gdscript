extends Node
class_name MyClass

func do_something():
	print("Start")
	await self.get_tree().create_timer(1.0).timeout
	print("After 1 second")

func complex_async():
	var result = await self.long_task()
	print(result)

func long_task() -> int:
	await self.get_tree().create_timer(2.0).timeout
	return 42
