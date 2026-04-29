// @ts-nocheck — auto-generated from GDScript addon
export namespace TestAddon {
  export enum AddonState { IDLE, RUNNING, STOPPED }
  export const Helper = preload("res://addons/TestAddon/addon_helper.gd");
}

export class TestAddon extends Node {
  state!: TestAddon.AddonState;

  start() {
    this.state = TestAddon.AddonState.RUNNING;
  }

  stop() {
    this.state = TestAddon.AddonState.STOPPED;
  }
}
