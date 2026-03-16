extends Node
class_name MyClass

# Var as function
var var_func = func(value: String) -> MyClass:
	# Anonymous function
	var inner_func = func(another_value: String):
		var result = another_value + "."
		return result
	# Anonymous empty function
	var inner_func_empty = func(another_value: String):
		pass
	return self

# Method with no return
func say_hello():
	print("Hello!")

# Method with parameters and return type
func add(a: int, b: int) -> int:
	return a + b

# Method with default parameters
func greet(name: String = "World"):
	print("Hello " + name)

# Static method
static func create_instance() -> MyClass:
	return MyClass.new()

# Void return
func do_nothing() -> void:
	pass

func call(fn: Callable):
	fn.call()
	fn.call_deferred()
	fn.callv()
	self.var_func.call("")
	self.var_func.call("")
	self.say_hello()
	var var_say_hello = self.say_hello
	var_say_hello.call()
