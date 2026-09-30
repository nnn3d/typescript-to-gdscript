class_name MyClass
extends Node

signal damaged(amount: int)

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

func void_task():
	await self.get_tree().create_timer(1.0).timeout

# Awaiting a one-argument signal yields that argument.
func wait_for_damage() -> int:
	var amount = await self.damaged
	return amount

# Calls coroutines whose return type TS has to infer.
func run_all():
	self.do_something()
	await self.complex_async()
