export namespace Self {
  export class Test extends Self {
    run() {
      print('test');
      this.print_data();
    }
  }
}

export class Self extends ColorPicker {
  print_data() {
    print('data');
  }

  run() {
    this.print_data();
    this.get_node('TestNode');
    floori(1.1);
  }
}
