/**
 * Global type definitions for TypeScript with noLib: true.
 * Replaces standard TS built-ins with GDScript-compatible types.
 *
 * Usage: consumer projects set `"noLib": true` in tsconfig.json
 * and include this file via `"types": ["typescript-to-gdscript/typings"]`.
 */

// ─── Primitive wrapper interfaces (required by TS compiler) ─

interface Boolean {}
interface Number {}

interface RegExp {
  test(string: string): boolean;
  exec(string: string): RegExpExecArray | null;
  readonly source: string;
  readonly flags: string;
  readonly global: boolean;
  readonly ignoreCase: boolean;
  readonly multiline: boolean;
  lastIndex: int;
}

interface RegExpExecArray extends Array<string> {
  index: int;
  input: string;
}

interface IArguments {
  [index: number]: unknown;
  readonly length: int;
}

// ─── Utility types ──────────────────────────────────────────

type PropertyKey = string | number | symbol;
type Record<K extends PropertyKey, T> = { [P in K]: T };
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type Omit<T, K extends PropertyKey> = Pick<T, Exclude<keyof T, K>>;
type NonNullable<T> = T & {};
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer R) => any ? R : any;
type NoInfer<T> = intrinsic;
type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;

// ─── Template literal support ───────────────────────────────

interface TemplateStringsArray extends Array<string> {
  readonly raw: readonly string[];
}

// ─── Symbol (minimal) ───────────────────────────────────────

interface Symbol {
  readonly description: string | undefined;
  toString(): string;
  valueOf(): symbol;
}

interface SymbolConstructor {
  readonly iterator: unique symbol;
  readonly hasInstance: unique symbol;
  readonly toPrimitive: unique symbol;
}
declare var Symbol: SymbolConstructor;

// ─── Iterator (for for-of loops) ─────────────────────────────

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}

interface IteratorReturnResult<TReturn> {
  done: true;
  value: TReturn;
}

type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = any> {
  next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T, TReturn = any, TNext = any> {
  [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

interface IterableIterator<T, TReturn = any, TNext = any>
  extends Iterator<T, TReturn, TNext> {
  [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;
}

// ─── Promise (for async/await) ──────────────────────────────

interface PromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2>;
}

interface Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2>;
  catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult>;
}

interface PromiseConstructor {
  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ): Promise<T>;
}
declare var Promise: PromiseConstructor;

// ─── Decorator context types (required for TS decorators) ───

interface ClassDecoratorContext {
  readonly kind: 'class';
  readonly name: string | undefined;
}

interface ClassMethodDecoratorContext {
  readonly kind: 'method';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
}

interface ClassGetterDecoratorContext {
  readonly kind: 'getter';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
}

interface ClassSetterDecoratorContext {
  readonly kind: 'setter';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
}

interface ClassFieldDecoratorContext {
  readonly kind: 'field';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
}

interface ClassAccessorDecoratorContext {
  readonly kind: 'accessor';
  readonly name: string | symbol;
  readonly static: boolean;
  readonly private: boolean;
}

// ─── Tree Helpers ───

type _GDScriptTree<Tree extends object = object> = {
  [__script_tree]: Tree
}

type _GDBaseTree = Partial<Record<string, Node | _GDScriptTree>> & {
  [__parent]?: Node;
};

type _GDGetItemTree<Item> =
  Item extends _GDScriptTree<infer ChildTree>
    ? ChildTree
    : Item extends Node<infer ChildTree>
      ? ChildTree
      : never;

type _GDGetTreePaths<Tree extends object, Prefix extends string = ``> = {
  [K in keyof Tree]: K extends string
    ? string extends K
      ? never
      :
          | `${Prefix}${K}`
          | (_GDGetItemTree<Tree[K]> extends never
              ? never
              : _GDGetTreePaths<_GDGetItemTree<Tree[K]>, `${Prefix}${K}/`>)
    : never;
}[keyof Tree];

type _GDGetNodeByPath<
  Tree extends object,
  Path,
> = Path extends keyof Tree
  ? Tree[Path]
  : Path extends `${infer Start}/${infer Rest}`
    ? Start extends keyof Tree
      ? _GDGetItemTree<Tree[Start]> extends infer SubTree extends object
        ? _GDGetNodeByPath<SubTree, Rest>
        : never
      : never
    : never;

/** Extract the [__children] tuple from a tree type. Returns never if absent or Tree is any. */
type _GDGetChildren<Tree> =
  IsAny<Tree> extends true ? never
    : Tree extends { [__children]: infer C extends readonly any[] } ? C : never;

/** Extract valid numeric tuple indices (0, 1, 2, ...) from a tuple type.
 *  Excludes non-numeric keys and the generic `number` index. */
type _GDChildIndices<T extends readonly any[]> =
  Extract<keyof T, `${number}`> extends infer K
    ? K extends `${infer N extends number}` ? N : never
    : never;

/** Resolve get_child return type by numeric index into [__children] tuple.
 *  Known indices → exact type, unknown → Node. */
type _GDGetChild<Tree extends object, Idx extends number> =
  _GDGetChildren<Tree> extends never
    ? Node
    : `${Idx}` extends keyof _GDGetChildren<Tree>
      ? _GDGetChildren<Tree>[Idx]
      : Node;

/** Resolve get_parent return type from declaration-merged _XParents interface.
 *  Empty interface (no parents) → Node; otherwise union of all parent types. */
type _GDParentType<T> = [keyof T] extends [never] ? Node : T[keyof T];

/** Resolve get_node return type: known paths → exact type, unknown → Node.
 *  Uses _GDGetNodeByPath directly (not _GDGetTreePaths) to avoid circular mapped types.
 *  Nullable tree entries (node not in all scenes) → NonNullable<T> | Node (uncertain). */
type _GDGetNode<
  Tree extends object,
  Path extends string,
> = IsAny<Tree> extends true
  ? Node
  : _GDGetNodeByPath<Tree, Path> extends never
    ? Node
    : null extends _GDGetNodeByPath<Tree, Path>
      ? NonNullable<_GDGetNodeByPath<Tree, Path>> | Node
      : _GDGetNodeByPath<Tree, Path>;

/** Resolve get_node_or_null return type: known paths → exact type | null, unknown → Node | null.
 *  Unlike _GDGetNode, nullable tree entries (node not in all scenes) → NonNullable<T> | null
 *  (no Node fallback — the node is either the expected type or absent). */
type _GDGetNodeOrNull<
  Tree extends object,
  Path extends string,
> = IsAny<Tree> extends true
  ? Node | null
  : _GDGetNodeByPath<Tree, Path> extends never
    ? Node | null
    : null extends _GDGetNodeByPath<Tree, Path>
      ? NonNullable<_GDGetNodeByPath<Tree, Path>> | null
      : _GDGetNodeByPath<Tree, Path> | null;
