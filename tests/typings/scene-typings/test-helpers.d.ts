/** Compile-time exact type equality check. Resolves to `true` only when T and U are identical. */
type IsExact<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false;
