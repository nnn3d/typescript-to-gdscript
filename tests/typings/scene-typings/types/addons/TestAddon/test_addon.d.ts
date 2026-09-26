// AUTO-GENERATED — do not edit manually.
export declare namespace TestAddon {
    enum AddonState {
        IDLE = 0,
        RUNNING = 1,
        STOPPED = 2
    }
    const Helper: typeof import("./addon_helper")._$CLASS$_;
}
export declare class TestAddon extends Node {
    state: TestAddon.AddonState;
    start(): void;
    stop(): void;
}
