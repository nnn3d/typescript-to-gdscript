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


type _GDBaseTree = {[K in string]?: _GDBaseTree} & {
  [__node_type]: Node
  [__node_parent]: _GDBaseTree | null;
  [__node_children]: _GDBaseTree[];
};

type _GDCheckTree<Tree extends _GDBaseTree> = Tree;

type _GDTree<
  Type extends Node,
  Parent extends _GDBaseTree | null,
  Children extends _GDBaseTree[],
  PathDecl extends { [K in string]?: _GDBaseTree },
> = PathDecl & {
  [__node_type]: Type;
  [__node_parent]: Parent;
  [__node_children]: Children;
};

type _GDTreeHandlers<Tree extends _GDBaseTree> = {
  /** Get a child node by path. Known paths (from scene tree) return exact types with autocomplete. */
  get_node<P extends string & _GDGetTreePaths<Tree>>(
    path: P,
  ): _GDGetNode<Tree, P>;
  /** Get a child node by path. Unknown paths return Node. */
  get_node(path: string): Node;
  /** Get a child node or null by path. Known paths return exact type | null. */
  get_node_or_null<P extends string & _GDGetTreePaths<Tree>>(
    path: P,
  ): _GDGetNodeOrNull<Tree, P>;
  /** Get a child node or null by path. Unknown paths return Node | null. */
  get_node_or_null(path: string): Node | null;
  /** Get the parent node. Returns typed parent from scene tree if known. */
  get_parent(): _GDParentType<Tree>;
  /** Check if a node exists at path. Known paths (from scene tree) provide autocomplete and return `true`. */
  has_node<P extends string & _GDGetTreePaths<Tree>>(path: P): true;
  /** Check if a node exists at path. Unknown paths return boolean. */
  has_node(path: string): boolean;
  /** Get a child node by index. Known indices (from scene tree) return exact types. */
  get_child<Idx extends number & _GDChildIndices<Tree>>(
    idx: Idx,
    include_internal?: boolean,
  ): _GDGetChild<Tree, Idx>;
  /** Get a child node by index. Unknown indices return Node. */
  get_child(idx: int, include_internal?: boolean): Node;
}

type _GDTreeNode<Tree extends _GDBaseTree> = Omit<
  Tree[typeof __node_type],
  keyof _GDTreeHandlers<_GDBaseTree>
> &
  _GDTreeHandlers<Tree>;

type _GDTreeNodeOrNull<Tree extends _GDBaseTree | null | undefined> =
  Tree extends null
    ? null
    : Tree extends undefined
      ? never
      : _GDTreeNode<NonNullable<Tree>>;

type _GDGetTreePaths<Tree extends _GDBaseTree, Prefix extends string = ``> = {
  [K in keyof Tree]: K extends string
    ? string extends K
      ? never
      :
          | `${Prefix}${K}`
          | _GDGetTreePaths<NonNullable<Tree[K]>, `${Prefix}${K}/`>
    : never;
}[keyof Tree];

type _GDGetNodeByPath<
  Tree extends _GDBaseTree,
  Path extends string,
  HasNull extends boolean = false,
> = Path extends keyof Tree
  ? _GDTreeNodeOrNull<HasNull extends true ? Tree[Path] | null : Tree[Path]>
  : Path extends `${infer Start}/${infer Rest}`
    ? Start extends keyof Tree
      ? _GDGetNodeByPath<
          NonNullable<Tree[Start]>,
          Rest,
          Tree[Start] extends null ? true : HasNull
        >
      : never
    : never;

/** Extract the [__children] tuple from a tree type. Returns never if absent or Tree is any. */
type _GDGetChildren<Tree extends _GDBaseTree> = Tree[typeof __node_children];

/** Extract valid numeric tuple indices (0, 1, 2, ...) from a tuple type.
 *  Excludes non-numeric keys and the generic `number` index. */
type _GDChildIndices<Tree extends _GDBaseTree> =
  Extract<keyof _GDGetChildren<Tree>, `${number}`> extends infer K
    ? K extends `${infer N extends number}`
      ? N
      : never
    : never;

/** Resolve get_child return type by numeric index into [__children] tuple.
 *  Known indices → exact type, unknown → Node. */
type _GDGetChild<Tree extends _GDBaseTree, Idx extends number> =
  _GDGetChildren<Tree> extends never
    ? Node
    : `${Idx}` extends keyof _GDGetChildren<Tree>
      ? _GDGetChildren<Tree>[Idx]
      : Node;

/** Resolve get_parent return type from declaration-merged _XParents interface.
 *  Empty interface (no parents) → Node; otherwise union of all parent types. */
type _GDParentType<Tree extends _GDBaseTree> = [
  Tree[typeof __node_parent],
] extends [null]
  ? Node
  : NonNullable<Tree[typeof __node_parent]>;

/** Resolve get_node return type: known paths → exact type, unknown → Node.
 *  Uses _GDGetNodeByPath directly (not _GDGetTreePaths) to avoid circular mapped types.
 *  Nullable tree entries (node not in all scenes) → NonNullable<T> | Node (uncertain). */
type _GDGetNode<
  Tree extends _GDBaseTree,
  Path extends string,
> = _GDGetNodeByPath<Tree, Path> extends never
  ? Node | null
  : null extends _GDGetNodeByPath<Tree, Path>
    ? NonNullable<_GDGetNodeByPath<Tree, Path>> | null
    : _GDGetNodeByPath<Tree, Path> | null;
// // old version
// type _GDGetNode<
//   Tree extends _GDBaseTree,
//   Path extends string,
// > = _GDGetNodeByPath<Tree, Path> extends never
//     ? Node
//     : null extends _GDGetNodeByPath<Tree, Path>
//       ? NonNullable<_GDGetNodeByPath<Tree, Path>> | Node
//       : _GDGetNodeByPath<Tree, Path>;

/** Resolve get_node_or_null return type: known paths → exact type | null, unknown → Node | null.
 *  Unlike _GDGetNode, nullable tree entries (node not in all scenes) → NonNullable<T> | null
 *  (no Node fallback — the node is either the expected type or absent). */
type _GDGetNodeOrNull<
  Tree extends _GDBaseTree,
  Path extends string,
> = _GDGetNodeByPath<Tree, Path> extends never
    ? Node | null
    : null extends _GDGetNodeByPath<Tree, Path>
      ? NonNullable<_GDGetNodeByPath<Tree, Path>> | null
      : _GDGetNodeByPath<Tree, Path> | null;

type __GDGetInterfaceNodeInternal<
  Interface,
  Key extends string,
> = Key extends keyof Interface
  ? Interface[Key] extends Node
    ? Interface[Key]
    : never
  : never;

type _GDGetInterfaceNode<
  Interface,
  Key extends string,
> = __GDGetInterfaceNodeInternal<Interface, Key> extends never ? Node : __GDGetInterfaceNodeInternal<Interface, Key>

type __GDGetInterfaceParentInternal<
  Interface,
  Key extends keyof Interface,
> = Key extends string
  ? Interface[Key] extends _GDBaseTree
    ? Interface[Key]
    : never
  : never;

type _GDGetInterfaceParent<
  Interface,
> = __GDGetInterfaceParentInternal<Interface, keyof Interface> extends never ? null : __GDGetInterfaceParentInternal<Interface, keyof Interface>

type __GDGetInterfaceTreeInternal<
  Interface,
  Key extends keyof Interface,
> = Key extends string
  ? Interface[Key] extends _GDBaseTree
    ? Interface[Key]
    : never
  : never;

type _GDGetInterfaceTree<
  Interface
> = __GDGetInterfaceParentInternal<Interface, keyof Interface> extends never ? _GDBaseTree : __GDGetInterfaceParentInternal<Interface, keyof Interface>

declare function GetExternalScriptClass<TArgs extends any[], TBase extends abstract new (...args: TArgs) => any>(Base: TBase): TBase & {
  new (...args: any[]): Omit<
    TBase,
    keyof _GDTreeHandlers<_GDBaseTree>
  > &
    Pick<Node, keyof _GDTreeHandlers<_GDBaseTree>>;
}
