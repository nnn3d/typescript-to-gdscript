extends Node
class_name Operators

var v1 = Vector2(1, 2)

var v2 = Vector2(3, 4)

var i1 = 1

var i2 = 2

func test_operators():
	var a: int = 10
	var b: int = 3
	var c: bool = a > b and a != 0
	var d: bool = a < b or b == 0
	var e: bool = not c
	var f: int = a + b
	var g: float = a / b
	var h: int = a % b
	var i: bool = a > b and not a == 0


func test_vector_math():
    var v3 = v1 + v2
    var v4 = v1 * v2
    var v5 = v1 - v2
    var i3 = i1 + i2

func test_multiple_vector_math():
    var v3 = v1 + v2 + v1
    var v4 = v1 * v2 - v1
    var v5 = v1 - v2 * v2 + v1 / v2
    var v6 = v1 - 2 * 1 + v1 / v2

func test_not_precedence():
    var a: int = 10
    var b: int = 3
    var c: bool = not a == 0
    var d: bool = not a != 0
    var e: bool = not a > b
    var f: bool = not a >= b
    var g: bool = not a < b
    var h: bool = not a <= b

func test_ops_helpers():
    var v3 = v1 > v2
    var v4 = v1 >= v2
    var v5 = v1 < v2
    var v6 = v1 <= v2
