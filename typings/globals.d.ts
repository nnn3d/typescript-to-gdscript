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
  T extends abstract new (...args: any) => infer R ? R : any;
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


/**
 * Maps `res://` resource paths to their loaded types.
 * Populated by the scene typings generator (`ts2gd generate-typings`).
 * Consumer projects extend this via generated `scene-typings.d.ts`.
 * @example
 * // After generation, contains entries like:
 * // "res://scenes/Player.tscn": PackedScene<Player>
 * // "res://assets/music.ogg": AudioStreamWAV
 */
interface GodotResources {}

/**
 * Union of all scene file paths (keys in GodotResources whose value is a PackedScene).
 * Used to type-check `SceneTree.change_scene_to_file()`.
 */
type GodotScenePaths = {
  [K in keyof GodotResources]: GodotResources[K] extends PackedScene<any> ? K : never;
}[keyof GodotResources];

/**
 * Maps group names to scene→tree-type mappings.
 * Populated by the scene typings generator via declaration merging.
 * Top-level keys are group names, values map scene paths to tree types.
 * @example
 * // "enemies": { "res://Level.tscn": _PlayerTscn_Tree | _EnemyTscn_Tree }
 */
interface GodotGroups {}

/** Union of all group names across all scenes. */
type GodotGroupNames = keyof GodotGroups & string;

/** Resolve the union of tree types belonging to a group, then wrap in _GDTreeNode.
 *  Unknown groups (not in any scene) return Node. */
type _GDGroupTrees<G extends string> = G extends keyof GodotGroups ? GodotGroups[G][keyof GodotGroups[G]] : never;
type GodotGroupNodes<G extends string> = [_GDGroupTrees<G>] extends [never] ? Node : _GDTreeNode<_GDGroupTrees<G>>;

/** Extract root node name (string) or false if not a root tree. */
type _GDTreeGetRoot<T> = T extends {[__node_root]: infer R extends string} ? R : never;

type _GDTreeGetType<T> = T extends {[__node_type]: infer R extends Node} ? R : Node;

type _GDTreeGetParent<T> = T extends {[__node_parent]: infer R} ? R : null;

type _GDTreeGetChildren<T> = T extends {[__node_children]: infer R extends any[]} ? R : [];

/** Extract unique name nodes object from a tree, or `never` if none. */
type _GDTreeGetUnique<T> = T extends {[__node_unique]: infer U extends object} ? U : never;

/** Extract the base tree from an extended scene tree, or `never` if not extended. */
type _GDTreeGetExtends<T> = T extends {[__node_extends]: infer E extends object} ? E : never;

/** Get merged children: own + base tree (if extended). */
type _GDTreeGetAllChildren<T> =
  _GDTreeGetExtends<T> extends never
    ? _GDTreeGetChildren<T>
    : [..._GDTreeGetChildren<_GDTreeGetExtends<T>>, ..._GDTreeGetChildren<T>];

type _GDTreeHandlers<Tree> = {
  /** Get a child node by path. Known paths (from scene tree) return exact types with autocomplete. */
  get_node<P extends string & _GDGetTreePaths<Tree>>(
    path: P,
  ): _GDGetNode<Tree, P>;
  /** Get a child node by absolute `/root/...` path. Type-inferred from root scene tree. */
  get_node<P extends '/root' | `/root/${string}`>(path: P): _GDGetRootNode<Tree, P>;
  /** Get a child node by path. Unknown paths return Node | null. */
  get_node(path: string): Node | null;
  /** Get a child node or null by path. Known paths return exact type | null. */
  get_node_or_null<P extends string & _GDGetTreePaths<Tree>>(
    path: P,
  ): _GDGetNodeOrNull<Tree, P>;
  /** Get a child node or null by absolute `/root/...` path. */
  get_node_or_null<P extends string>(path: `/root/${P}`): _GDGetRootNode<Tree, P> | null;
  /** Get a child node or null by path. Unknown paths return Node | null. */
  get_node_or_null(path: string): Node | null;
  /** Get the parent node. Returns typed parent from scene tree if known. */
  get_parent(): _GDParentType<Tree>;
  get_parent<N extends Node = Node>(): N;
  /** Check if a node exists at path. Known paths (from scene tree) provide autocomplete and return `true`. */
  has_node<P extends string & _GDGetTreePaths<Tree>>(path: P): boolean;
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

type _GDTreeNode<Tree> = _GDTreeHandlers<Tree> & _GDTreeGetType<Tree>

type _GDTreeNodeOrNull<Tree> =
  Tree extends null
    ? null
    : Tree extends undefined
      ? never
      : _GDTreeNode<NonNullable<Tree>>;

type _GDGetTreePaths<Tree, Prefix extends string = ``> = Tree extends any // distributive over union trees
  ? IsAny<Tree> extends true
    ? string
    :
        | {
            [K in keyof Tree]: K extends string
              ? string extends K
                ? never
                :
                    | `${Prefix}${K}`
                    | (_GDTreeGetRoot<Tree[K]> extends string
                        ? _GDGetTreePaths<
                            NonNullable<Tree[K]>,
                            `${Prefix}${K}/`
                          >
                        : never)
              : never;
          }[keyof Tree]
        // Include paths from base tree if extended
        | (_GDTreeGetExtends<Tree> extends never
            ? never
            : _GDGetTreePaths<_GDTreeGetExtends<Tree>, Prefix>)
        // Include unique node paths (e.g. "%HealthBar") and their descendants (e.g. "%HealthBar/HealthLabel")
        | (Prefix extends ''
            ? _GDTreeGetUnique<Tree> extends never
              ? never
              : {
                  [K in keyof _GDTreeGetUnique<Tree> & string]:
                    | K
                    | _GDGetTreePaths<_GDTreeGetUnique<Tree>[K], `${K}/`>;
                }[keyof _GDTreeGetUnique<Tree> & string]
            : never)
  : never;

type _GDGetNullByPath<
  Tree,
  Path extends string,
  HasNull extends boolean = false,
> =
  Tree extends any // distributive over union trees
    ? IsAny<Tree> extends true
      ? null
      : Path extends keyof Tree
        ? HasNull extends true ? null : never
        : Path extends `${infer Start extends keyof Tree & string}/${infer Rest}`
          ? _GDTreeGetRoot<Tree[Start]> extends string
            ? _GDGetNullByPath<
                Tree[Start],
                Rest,
                Tree[Start] extends null ? true : HasNull
              >
            : null // path segment not traversable in this tree
          // Check unique nodes (%Name and %Name/rest)
          : _GDTreeGetUnique<Tree> extends never
            ? _GDTreeGetExtends<Tree> extends never
              ? null
              : _GDGetNullByPath<_GDTreeGetExtends<Tree>, Path, HasNull>
            : Path extends keyof _GDTreeGetUnique<Tree>
              ? HasNull extends true ? null : never
              : Path extends `${infer UName extends keyof _GDTreeGetUnique<Tree> & string}/${infer URest}`
                ? _GDGetNullByPath<_GDTreeGetUnique<Tree>[UName], URest, HasNull>
                : _GDTreeGetExtends<Tree> extends never
                  ? null
                  : _GDGetNullByPath<_GDTreeGetExtends<Tree>, Path, HasNull>
    : never;

type _GDGetTreeByPath<
  Tree,
  Path extends string,
> =
  Tree extends any // distributive over union trees
    ? IsAny<Tree> extends true
      ? never
      : Path extends keyof Tree
        ? Tree[Path]
        : Path extends `${infer Start extends keyof Tree & string}/${infer Rest}`
          ? _GDTreeGetRoot<Tree[Start]> extends string
            ? _GDGetTreeByPath<
                Tree[Start],
                Rest
              >
            : never // path segment not traversable in this tree
          // Check unique nodes (%Name and %Name/rest)
          : _GDTreeGetUnique<Tree> extends never
            ? _GDTreeGetExtends<Tree> extends never
              ? never
              : _GDGetTreeByPath<_GDTreeGetExtends<Tree>, Path>
            : Path extends keyof _GDTreeGetUnique<Tree>
              ? _GDTreeGetUnique<Tree>[Path]
              : Path extends `${infer UName extends keyof _GDTreeGetUnique<Tree> & string}/${infer URest}`
                ? _GDGetTreeByPath<_GDTreeGetUnique<Tree>[UName], URest>
                // Fall back to base tree if extended
                : _GDTreeGetExtends<Tree> extends never
                  ? never
                  : _GDGetTreeByPath<_GDTreeGetExtends<Tree>, Path>
    : never;

type _GDGetNodeByPath<Tree, Path extends string> =
  | (_GDGetTreeByPath<Tree, Path> extends never
      ? Node | null
      : _GDTreeNode<_GDGetTreeByPath<Tree, Path>>)
  | _GDGetNullByPath<Tree, Path>;

/** Walk up __node_parent chain to find the root scene tree (where parent is null). */
type _GDFindRootTree<Tree> =
  [_GDTreeGetParent<Tree>] extends [null]
    ? Tree
    : _GDTreeGetParent<Tree> extends object
      ? _GDFindRootTree<_GDTreeGetParent<Tree>>
      : never;

type _GDCreateRootTree<Tree> = {
  root: {
    [__node_root]: 'root',
    [__node_type]: Window,
    [__node_parent]: null,
  } & {
    [T in Tree as _GDTreeGetRoot<T>]: T
  }
};

/** Resolve `/root/RootName/rest` paths by finding the root tree and traversing from there.
 *  Strips leading `/` from path before resolving through the virtual root tree. */
type _GDGetRootNode<Tree, Path extends string> =
  Path extends `/${infer Rest}`
    ? _GDGetNodeByPath<_GDCreateRootTree<_GDFindRootTree<Tree>>, Rest>
    : _GDGetNodeByPath<_GDCreateRootTree<_GDFindRootTree<Tree>>, Path>;

/** Extract valid numeric tuple indices (0, 1, 2, ...) from a tuple type.
 *  Excludes non-numeric keys and the generic `number` index.
 *  Uses _GDTreeGetAllChildren to include base tree children for extended scenes. */
type _GDChildIndices<Tree> =
  Tree extends any // distributive over union trees
    ? Extract<keyof _GDTreeGetAllChildren<Tree>, `${number}`> extends infer K
      ? K extends `${infer N extends number}`
        ? N
        : never
      : never
    : never;

/** Resolve get_child return type by numeric index into [__children] tuple.
 *  Known indices → _GDTreeNode of child subtree, unknown → Node.
 *  Uses _GDTreeGetAllChildren to include base tree children for extended scenes. */
type _GDGetChild<Tree, Idx extends number> =
  Tree extends any // distributive over union trees
    ? _GDTreeGetAllChildren<Tree> extends never
      ? Node
      : `${Idx}` extends keyof _GDTreeGetAllChildren<Tree>
        ? _GDTreeNode<_GDTreeGetAllChildren<Tree>[Idx]>
        : Node
    : never;

/** Resolve get_parent return type from declaration-merged _XParents interface.
 *  Empty interface (no parents) → Node; otherwise union of all parent types. */
type _GDParentType<Tree> =
  Tree extends any // distributive over union trees
    ? IsAny<Tree> extends true
      ? Node
      : [_GDTreeGetParent<Tree>] extends [null]
        ? Node
        : _GDTreeNode<NonNullable<_GDTreeGetParent<Tree>>>
    : never;

/** Resolve get_node return type: known paths → exact type, unknown → Node | null.
 *  Uses _GDGetNodeByPath directly (not _GDGetTreePaths) to avoid circular mapped types.
 *  For distributive trees: paths missing in some trees contribute null to union. */
type _GDGetNode<
  Tree,
  Path extends string,
> = [_GDGetNodeByPath<Tree, Path>] extends [null]
  ? Node | null
  : null extends _GDGetNodeByPath<Tree, Path>
    ? NonNullable<_GDGetNodeByPath<Tree, Path>> | null
    : _GDGetNodeByPath<Tree, Path>;

/** Resolve get_node_or_null return type: known paths → exact type | null, unknown → Node | null.
 *  Unlike _GDGetNode, always includes | null for known paths. */
type _GDGetNodeOrNull<
  Tree,
  Path extends string,
> = [_GDGetNodeByPath<Tree, Path>] extends [null]
    ? Node | null
    : NonNullable<_GDGetNodeByPath<Tree, Path>> | null;

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
  ? Interface[Key] extends object
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
  ? Interface[Key] extends object
    ? Interface[Key]
    : never
  : never;

type _GDGetInterfaceTree<
  Interface
> = __GDGetInterfaceParentInternal<Interface, keyof Interface> extends never ? object : __GDGetInterfaceParentInternal<Interface, keyof Interface>

/**
 * Validates that a signal handler's parameters are compatible with the signal's type.
 * Produces a type error if the handler doesn't accept the signal's arguments.
 */
type _GDSignalConnection<
  TSignal extends Signal<any[]>,
  THandler extends (...args: TSignal extends Signal<infer P> ? P : never) => void,
> = { signal: TSignal; handler: THandler }

