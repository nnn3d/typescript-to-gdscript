export default class Self extends ColorPicker {
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
      this.print_data();
    }
  }
}
