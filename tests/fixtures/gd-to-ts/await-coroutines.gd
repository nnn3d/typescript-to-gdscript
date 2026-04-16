extends Node
class_name AwaitCoroutines

func no_return():
	print("Start")
	await self.get_tree().create_timer(1.0).timeout
	print("After 1 second")

func with_return() -> int:
	await self.get_tree().create_timer(2.0).timeout
	return 42

func nested_await() -> String:
	var result: int = await self.with_return()
	return str(result)

func sync_fn() -> int:
	return 7

func sync_fn_no_type():
	return

func use_lambda():
	var f = func(x: int) -> int:
		await self.get_tree().create_timer(0.1).timeout
		return x + 1
	var g = func(x: int) -> int:
		return x * 2
