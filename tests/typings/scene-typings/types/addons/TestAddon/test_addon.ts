// @ts-nocheck — auto-generated from GDScript addon
export class TestAddon extends Node {
  static AddonState = gd.enum('IDLE', 'RUNNING', 'STOPPED');
  static readonly Helper = preload("res://addons/TestAddon/addon_helper.gd");
  state: TestAddon.AddonState;

  start() {
    this.state = this.AddonState.RUNNING;
  }

  stop() {
    this.state = this.AddonState.STOPPED;
  }
}
