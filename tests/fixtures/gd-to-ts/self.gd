extends Node
class_name Self

func print_data():
    print('data')

func run():
    print_data()
    get_node('TestNode')
    floori(1.1)

class Test extends Self:
    func run():
        print('test')
        print_data()



