extends Node
class_name Match

var x: Variant

var TYPE_FLOAT = "float"

var TYPE_STRING = "string"

var TYPE_ARRAY = "array"

func test_expression_pattern():
    match typeof(x):
        TYPE_FLOAT:
            print("float")
        TYPE_STRING:
            print("text")
        TYPE_ARRAY:
            print("array")
        var new_var:
            print("it's ", new_var)

func test_wildcard():
    match x:
        1:
            print("It's one!")
        2:
            print("It's one times two!")
        _:
            print("It's not 1 or 2. I don't care to be honest.")

func test_match_pattern():
    match x:
        []:
            print("Empty array")
        [1, 3, "test", null]:
            print("Very specific array")
        [var start, _, "test"]:
            print("First element is ", start, ", and the last is \"test\"")
        [42, ..]:
            print("Open ended array")
        [var x, var y] when y == x:
            print("Point on line y = x")
        [var x, var y] when y == -x:
            print("Point on line y = -x")
        {"name": "Dennis", "age": var age}:
            print("Dennis is ", age, " years old.")
        {"name", "age"}:
            print("Has a name and an age, but it's not Dennis :(")
        {"key": "godotisawesome", ..}:
            print("I only checked for one entry and ignored the rest")
        1, 2, 3:
            print("It's 1 - 3")
        "Sword", "Splash potion", "Fist":
            print("Yep, you've taken damage")
