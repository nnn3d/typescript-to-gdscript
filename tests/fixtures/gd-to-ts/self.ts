class Self extends Node {
  print_data() {
    print('data');
  }

  run() {
    this.print_data();
    this.get_node('TestNode');
    floori(1.1);
  }

  Test = class extends Self {
    run() {
      print('test');
      print_data();
    }
  }
}
