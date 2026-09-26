// AUTO-GENERATED — do not edit manually.
export declare class InferredUnions extends RefCounted {
    value_or_null(flag: boolean): 1 | null;
    int_or_float(flag: boolean): 1 | 1.5;
    ternary(flag: boolean): 1 | "a";
    recursive(n: int): any;
}
