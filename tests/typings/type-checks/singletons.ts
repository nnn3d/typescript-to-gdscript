// Tests for Godot singleton instances (global class instances, not constructors)

// ─── Singletons are global instances ─────────────────────────

class SingletonTest extends Node {
  test_project_settings() {
    // ProjectSettings is a global singleton instance
    let val: unknown = ProjectSettings.get_setting('display/window/size/width');
    ProjectSettings.set_setting('display/window/size/width', 1920);
    let has: boolean = ProjectSettings.has_setting('display/window/size/width');

    // Should be assignable to its own type
    let ps: ProjectSettings = ProjectSettings;
  }

  test_engine() {
    // Engine is a global singleton instance
    let fps: int = Engine.get_frames_per_second();
    let scale: float = Engine.time_scale;
    Engine.time_scale = 2.0;

    let e: Engine = Engine;
  }

  test_input() {
    // Input is a global singleton instance
    let pressed: boolean = Input.is_action_pressed('ui_accept');
    let just: boolean = Input.is_action_just_pressed('ui_accept');
    Input.mouse_mode = 0;

    let i: Input = Input;
  }

  test_performance() {
    // Performance is a global singleton instance
    let monitor: float = Performance.get_monitor(0);

    let p: Performance = Performance;
  }

  test_not_constructable() {
    // Singletons should NOT be constructable (they are interfaces, not classes)
    // @ts-expect-error — cannot construct singleton
    let bad = new ProjectSettings();

    // @ts-expect-error — cannot construct singleton
    let bad2 = new Engine();

    // @ts-expect-error — cannot construct singleton
    let bad3 = new Input();
  }
}
