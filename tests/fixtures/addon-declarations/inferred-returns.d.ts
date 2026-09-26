// AUTO-GENERATED — do not edit manually.
export declare namespace InferredReturns {
    enum Mode {
        A = 0,
        B = 1
    }
}
export declare class InferredReturns extends Node {
    typed_hp: int;
    untyped_hp: number;
    target: Node | null;
    int_literal(): number;
    float_literal(): number;
    string_literal(): string;
    bool_literal(): boolean;
    null_literal(): null;
    constructed_value(): Vector2;
    typed_member(): number;
    untyped_member(): number;
    reference_member(): Node | null;
    self_reference(): this;
    new_instance(): InferredReturns;
    enum_value(): InferredReturns.Mode;
    array_literal(): number[];
    dictionary_literal(): {
        a: number;
    };
    global_function(): number;
    inherited_method(): number;
    unknown_node(): Node | null;
    chained_inference(): number;
    lambda(): (x: any) => number;
    typed_lambda(): (x: int) => int;
    no_return(): void;
    static static_function(): number;
    coroutine(): Promise<number>;
    untyped_passthrough(value: any): any;
    typed_passthrough(value: string): string;
}
