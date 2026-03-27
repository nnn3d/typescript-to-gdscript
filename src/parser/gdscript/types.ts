export declare class Parser {
  parse(input: string | Input, oldTree?: Tree, options?: Options): Tree;
  getIncludedRanges(): Range[];
  getTimeoutMicros(): number;
  setTimeoutMicros(timeout: number): void;
  reset(): void;
  getLanguage(): any;
  setLanguage(language?: any): void;
  getLogger(): Logger;
  setLogger(logFunc?: Logger | false | null): void;
  printDotGraphs(enabled?: boolean, fd?: number): void;
}

export type Options = {
  bufferSize?: number, includedRanges?: Range[];
};

export type Point = {
  row: number;
  column: number;
};

export type Range = {
  startIndex: number,
  endIndex: number,
  startPosition: Point,
  endPosition: Point
};

export type Edit = {
  startIndex: number;
  oldEndIndex: number;
  newEndIndex: number;
  startPosition: Point;
  oldEndPosition: Point;
  newEndPosition: Point;
};

export type Logger = (
  message: string,
  params: { [param: string]: string },
  type: "parse" | "lex"
) => void;

export interface Input {
  (index: number, position?: Point): string | null;
}

interface SyntaxNodeBase {
  tree: Tree;
  id: number;
  typeId: number;
  grammarId: number;
  type: string;
  grammarType: string;
  isNamed: boolean;
  isMissing: boolean;
  isExtra: boolean;
  hasChanges: boolean;
  hasError: boolean;
  isError: boolean;
  text: string;
  parseState: number;
  nextParseState: number;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  parent: SyntaxNode | null;
  children: Array<SyntaxNode>;
  namedChildren: Array<SyntaxNode>;
  childCount: number;
  namedChildCount: number;
  firstChild: SyntaxNode | null;
  firstNamedChild: SyntaxNode | null;
  lastChild: SyntaxNode | null;
  lastNamedChild: SyntaxNode | null;
  nextSibling: SyntaxNode | null;
  nextNamedSibling: SyntaxNode | null;
  previousSibling: SyntaxNode | null;
  previousNamedSibling: SyntaxNode | null;
  descendantCount: number;

  toString(): string;
  child(index: number): SyntaxNode | null;
  namedChild(index: number): SyntaxNode | null;
  childForFieldName(fieldName: string): SyntaxNode | null;
  childForFieldId(fieldId: number): SyntaxNode | null;
  fieldNameForChild(childIndex: number): string | null;
  childrenForFieldName(fieldName: string): Array<SyntaxNode>;
  childrenForFieldId(fieldId: number): Array<SyntaxNode>;
  firstChildForIndex(index: number): SyntaxNode | null;
  firstNamedChildForIndex(index: number): SyntaxNode | null;

  descendantForIndex(index: number): SyntaxNode;
  descendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  namedDescendantForIndex(index: number): SyntaxNode;
  namedDescendantForIndex(startIndex: number, endIndex: number): SyntaxNode;
  descendantForPosition(position: Point): SyntaxNode;
  descendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  namedDescendantForPosition(position: Point): SyntaxNode;
  namedDescendantForPosition(startPosition: Point, endPosition: Point): SyntaxNode;
  descendantsOfType<T extends TypeString>(types: T | readonly T[], startPosition?: Point, endPosition?: Point): NodeOfType<T>[];

  closest<T extends SyntaxType>(types: T | readonly T[]): NamedNode<T> | null;
  walk(): TreeCursor;
}

export interface TreeCursor {
  nodeType: string;
  nodeTypeId: number;
  nodeStateId: number;
  nodeText: string;
  nodeIsNamed: boolean;
  nodeIsMissing: boolean;
  startPosition: Point;
  endPosition: Point;
  startIndex: number;
  endIndex: number;
  readonly currentNode: SyntaxNode;
  readonly currentFieldName: string;
  readonly currentFieldId: number;
  readonly currentDepth: number;
  readonly currentDescendantIndex: number;

  reset(node: SyntaxNode): void;
  resetTo(cursor: TreeCursor): void;
  gotoParent(): boolean;
  gotoFirstChild(): boolean;
  gotoLastChild(): boolean;
  gotoFirstChildForIndex(goalIndex: number): boolean;
  gotoFirstChildForPosition(goalPosition: Point): boolean;
  gotoNextSibling(): boolean;
  gotoPreviousSibling(): boolean;
  gotoDescendant(goalDescendantIndex: number): void;
}

export interface Tree {
  readonly rootNode: SyntaxNode;

  rootNodeWithOffset(offsetBytes: number, offsetExtent: Point): SyntaxNode;
  edit(edit: Edit): Tree;
  walk(): TreeCursor;
  getChangedRanges(other: Tree): Range[];
  getIncludedRanges(): Range[];
  getEditedRange(other: Tree): Range;
  printDotGraph(fd?: number): void;
}

export interface QueryCapture {
  name: string;
  text?: string;
  node: SyntaxNode;
  setProperties?: { [prop: string]: string | null };
  assertedProperties?: { [prop: string]: string | null };
  refutedProperties?: { [prop: string]: string | null };
}

export interface QueryMatch {
  pattern: number;
  captures: QueryCapture[];
}

export type QueryOptions = {
  startPosition?: Point;
  endPosition?: Point;
  startIndex?: number;
  endIndex?: number;
  matchLimit?: number;
  maxStartDepth?: number;
};

export interface PredicateResult {
  operator: string;
  operands: { name: string; type: string }[];
}

export declare class Query {
  readonly predicates: { [name: string]: Function }[];
  readonly setProperties: any[];
  readonly assertedProperties: any[];
  readonly refutedProperties: any[];
  readonly matchLimit: number;

  constructor(language: any, source: string | Buffer);

  captures(node: SyntaxNode, options?: QueryOptions): QueryCapture[];
  matches(node: SyntaxNode, options?: QueryOptions): QueryMatch[];
  disableCapture(captureName: string): void;
  disablePattern(patternIndex: number): void;
  isPatternGuaranteedAtStep(byteOffset: number): boolean;
  isPatternRooted(patternIndex: number): boolean;
  isPatternNonLocal(patternIndex: number): boolean;
  startIndexForPattern(patternIndex: number): number;
  didExceedMatchLimit(): boolean;
}

export declare class LookaheadIterable {
  readonly currentTypeId: number;
  readonly currentType: string;

  reset(language: any, stateId: number): boolean;
  resetState(stateId: number): boolean;
  [Symbol.iterator](): Iterator<string>;
}

interface NamedNodeBase extends SyntaxNodeBase {
    isNamed: true;
}

/** An unnamed node with the given type string. */
export interface UnnamedNode<T extends string = string> extends SyntaxNodeBase {
  type: T;
  isNamed: false;
}

type PickNamedType<Node, T extends string> = Node extends { type: T; isNamed: true } ? Node : never;

type PickType<Node, T extends string> = Node extends { type: T } ? Node : never;

/** A named node with the given `type` string. */
export type NamedNode<T extends SyntaxType = SyntaxType> = PickNamedType<SyntaxNode, T>;

/**
 * A node with the given `type` string.
 *
 * Note that this matches both named and unnamed nodes. Use `NamedNode<T>` to pick only named nodes.
 */
export type NodeOfType<T extends string> = PickType<SyntaxNode, T>;

interface TreeCursorOfType<S extends string, T extends SyntaxNodeBase> {
  nodeType: S;
  currentNode: T;
}

type TreeCursorRecord = { [K in TypeString]: TreeCursorOfType<K, NodeOfType<K>> };

/**
 * A tree cursor whose `nodeType` correlates with `currentNode`.
 *
 * The typing becomes invalid once the underlying cursor is mutated.
 *
 * The intention is to cast a `TreeCursor` to `TypedTreeCursor` before
 * switching on `nodeType`.
 *
 * For example:
 * ```ts
 * let cursor = root.walk();
 * while (cursor.gotoNextSibling()) {
 *   const c = cursor as TypedTreeCursor;
 *   switch (c.nodeType) {
 *     case SyntaxType.Foo: {
 *       let node = c.currentNode; // Typed as FooNode.
 *       break;
 *     }
 *   }
 * }
 * ```
 */
export type TypedTreeCursor = TreeCursorRecord[keyof TreeCursorRecord];

export interface ErrorNode extends NamedNodeBase {
    type: typeof SyntaxType.ERROR;
    hasError: true;
}

export const SyntaxType = {
  ERROR: "ERROR",
  Annotation: "annotation",
  Annotations: "annotations",
  Arguments: "arguments",
  Array: "array",
  Assignment: "assignment",
  Attribute: "attribute",
  AttributeCall: "attribute_call",
  AttributeSubscript: "attribute_subscript",
  AugmentedAssignment: "augmented_assignment",
  AwaitExpression: "await_expression",
  BaseCall: "base_call",
  BinaryOperator: "binary_operator",
  Body: "body",
  BreakStatement: "break_statement",
  Call: "call",
  ClassBody: "class_body",
  ClassDefinition: "class_definition",
  ClassNameStatement: "class_name_statement",
  ConditionalExpression: "conditional_expression",
  ConstStatement: "const_statement",
  ConstructorDefinition: "constructor_definition",
  ContinueStatement: "continue_statement",
  DefaultParameter: "default_parameter",
  Dictionary: "dictionary",
  ElifClause: "elif_clause",
  ElseClause: "else_clause",
  EnumDefinition: "enum_definition",
  Enumerator: "enumerator",
  EnumeratorList: "enumerator_list",
  ExportVariableStatement: "export_variable_statement",
  ExpressionStatement: "expression_statement",
  ExtendsStatement: "extends_statement",
  ForStatement: "for_statement",
  FunctionDefinition: "function_definition",
  GetBody: "get_body",
  GetNode: "get_node",
  Getter: "getter",
  Identifier: "identifier",
  IfStatement: "if_statement",
  InferredType: "inferred_type",
  Lambda: "lambda",
  MatchBody: "match_body",
  MatchStatement: "match_statement",
  Name: "name",
  NodePath: "node_path",
  OnreadyVariableStatement: "onready_variable_statement",
  Pair: "pair",
  Parameters: "parameters",
  ParenthesizedExpression: "parenthesized_expression",
  PassStatement: "pass_statement",
  PatternBinding: "pattern_binding",
  PatternGuard: "pattern_guard",
  PatternSection: "pattern_section",
  RegionStart: "region_start",
  RemoteKeyword: "remote_keyword",
  ReturnStatement: "return_statement",
  SetBody: "set_body",
  Setget: "setget",
  Setter: "setter",
  SignalStatement: "signal_statement",
  Source: "source",
  String: "string",
  StringName: "string_name",
  Subscript: "subscript",
  SubscriptArguments: "subscript_arguments",
  Type: "type",
  TypedDefaultParameter: "typed_default_parameter",
  TypedParameter: "typed_parameter",
  UnaryOperator: "unary_operator",
  VariableStatement: "variable_statement",
  VariadicParameter: "variadic_parameter",
  WhileStatement: "while_statement",
  BreakpointStatement: "breakpoint_statement",
  Comment: "comment",
  EscapeSequence: "escape_sequence",
  False: "false",
  Float: "float",
  Integer: "integer",
  LineContinuation: "line_continuation",
  Null: "null",
  PatternOpenEnding: "pattern_open_ending",
  RegionEnd: "region_end",
  RegionLabel: "region_label",
  StaticKeyword: "static_keyword",
  True: "true",
} as const;
export type SyntaxType = typeof SyntaxType[keyof typeof SyntaxType];

export type UnnamedType =
  | "()"
  | "value"
  | "!"
  | "!="
  | "\""
  | "#region"
  | "$"
  | "%"
  | "%="
  | "&"
  | "&\""
  | "&&"
  | "&="
  | "("
  | ")"
  | "*"
  | "**"
  | "**="
  | "*="
  | "+"
  | "+="
  | ","
  | "-"
  | "-="
  | "->"
  | "."
  | "..."
  | "/"
  | "/="
  | ":"
  | ":="
  | ";"
  | "<"
  | "<<"
  | "<<="
  | "<="
  | "="
  | "=="
  | ">"
  | ">="
  | ">>"
  | ">>="
  | "@"
  | "["
  | "]"
  | "^"
  | "^\""
  | "^="
  | "_init"
  | "and"
  | "as"
  | "await"
  | "break"
  | "class"
  | "class_name"
  | "const"
  | "continue"
  | "elif"
  | "else"
  | "enum"
  | "export"
  | "extends"
  | "for"
  | "func"
  | "get"
  | "if"
  | "in"
  | "is"
  | "master"
  | "mastersync"
  | "match"
  | "not"
  | "onready"
  | "or"
  | "pass"
  | "puppet"
  | "puppetsync"
  | "remote"
  | "remotesync"
  | "return"
  | "set"
  | typeof SyntaxType.Setget // both named and unnamed
  | "signal"
  | "var"
  | "when"
  | "while"
  | "{"
  | "|"
  | "|="
  | "||"
  | "}"
  | "~"
  ;

export type TypeString = SyntaxType | UnnamedType;

export type SyntaxNode =
  | AttributeExpressionNode
  | CompoundStatementNode
  | ExpressionNode
  | ParametersNode
  | PatternNode
  | PrimaryExpressionNode
  | UnnamedNode<"()">
  | AnnotationNode
  | AnnotationsNode
  | ArgumentsNode
  | ArrayNode
  | AssignmentNode
  | AttributeNode
  | AttributeCallNode
  | AttributeSubscriptNode
  | AugmentedAssignmentNode
  | AwaitExpressionNode
  | BaseCallNode
  | BinaryOperatorNode
  | BodyNode
  | BreakStatementNode
  | CallNode
  | ClassBodyNode
  | ClassDefinitionNode
  | ClassNameStatementNode
  | ConditionalExpressionNode
  | ConstStatementNode
  | ConstructorDefinitionNode
  | ContinueStatementNode
  | DefaultParameterNode
  | DictionaryNode
  | ElifClauseNode
  | ElseClauseNode
  | EnumDefinitionNode
  | EnumeratorNode
  | EnumeratorListNode
  | ExportVariableStatementNode
  | ExpressionStatementNode
  | ExtendsStatementNode
  | ForStatementNode
  | FunctionDefinitionNode
  | GetBodyNode
  | GetNodeNode
  | GetterNode
  | IdentifierNode
  | IfStatementNode
  | InferredTypeNode
  | LambdaNode
  | MatchBodyNode
  | MatchStatementNode
  | NameNode
  | NodePathNode
  | OnreadyVariableStatementNode
  | PairNode
  | ParametersNode
  | ParenthesizedExpressionNode
  | PassStatementNode
  | PatternBindingNode
  | PatternGuardNode
  | PatternSectionNode
  | RegionStartNode
  | RemoteKeywordNode
  | ReturnStatementNode
  | SetBodyNode
  | SetgetNode
  | SetterNode
  | SignalStatementNode
  | SourceNode
  | StringNode
  | StringNameNode
  | SubscriptNode
  | SubscriptArgumentsNode
  | TypeNode
  | TypedDefaultParameterNode
  | TypedParameterNode
  | UnaryOperatorNode
  | UnnamedNode<"value">
  | VariableStatementNode
  | VariadicParameterNode
  | WhileStatementNode
  | UnnamedNode<"!">
  | UnnamedNode<"!=">
  | UnnamedNode<"\"">
  | UnnamedNode<"#region">
  | UnnamedNode<"$">
  | UnnamedNode<"%">
  | UnnamedNode<"%=">
  | UnnamedNode<"&">
  | UnnamedNode<"&\"">
  | UnnamedNode<"&&">
  | UnnamedNode<"&=">
  | UnnamedNode<"(">
  | UnnamedNode<")">
  | UnnamedNode<"*">
  | UnnamedNode<"**">
  | UnnamedNode<"**=">
  | UnnamedNode<"*=">
  | UnnamedNode<"+">
  | UnnamedNode<"+=">
  | UnnamedNode<",">
  | UnnamedNode<"-">
  | UnnamedNode<"-=">
  | UnnamedNode<"->">
  | UnnamedNode<".">
  | UnnamedNode<"...">
  | UnnamedNode<"/">
  | UnnamedNode<"/=">
  | UnnamedNode<":">
  | UnnamedNode<":=">
  | UnnamedNode<";">
  | UnnamedNode<"<">
  | UnnamedNode<"<<">
  | UnnamedNode<"<<=">
  | UnnamedNode<"<=">
  | UnnamedNode<"=">
  | UnnamedNode<"==">
  | UnnamedNode<">">
  | UnnamedNode<">=">
  | UnnamedNode<">>">
  | UnnamedNode<">>=">
  | UnnamedNode<"@">
  | UnnamedNode<"[">
  | UnnamedNode<"]">
  | UnnamedNode<"^">
  | UnnamedNode<"^\"">
  | UnnamedNode<"^=">
  | UnnamedNode<"_init">
  | UnnamedNode<"and">
  | UnnamedNode<"as">
  | UnnamedNode<"await">
  | UnnamedNode<"break">
  | BreakpointStatementNode
  | UnnamedNode<"class">
  | UnnamedNode<"class_name">
  | CommentNode
  | UnnamedNode<"const">
  | UnnamedNode<"continue">
  | UnnamedNode<"elif">
  | UnnamedNode<"else">
  | UnnamedNode<"enum">
  | EscapeSequenceNode
  | UnnamedNode<"export">
  | UnnamedNode<"extends">
  | FalseNode
  | FloatNode
  | UnnamedNode<"for">
  | UnnamedNode<"func">
  | UnnamedNode<"get">
  | UnnamedNode<"if">
  | UnnamedNode<"in">
  | IntegerNode
  | UnnamedNode<"is">
  | LineContinuationNode
  | UnnamedNode<"master">
  | UnnamedNode<"mastersync">
  | UnnamedNode<"match">
  | UnnamedNode<"not">
  | NullNode
  | UnnamedNode<"onready">
  | UnnamedNode<"or">
  | UnnamedNode<"pass">
  | PatternOpenEndingNode
  | UnnamedNode<"puppet">
  | UnnamedNode<"puppetsync">
  | RegionEndNode
  | RegionLabelNode
  | UnnamedNode<"remote">
  | UnnamedNode<"remotesync">
  | UnnamedNode<"return">
  | UnnamedNode<"set">
  | UnnamedNode<typeof SyntaxType.Setget>
  | UnnamedNode<"signal">
  | StaticKeywordNode
  | TrueNode
  | UnnamedNode<"var">
  | UnnamedNode<"when">
  | UnnamedNode<"while">
  | UnnamedNode<"{">
  | UnnamedNode<"|">
  | UnnamedNode<"|=">
  | UnnamedNode<"||">
  | UnnamedNode<"}">
  | UnnamedNode<"~">
  | ErrorNode
  ;

export type AttributeExpressionNode =
  | ArrayNode
  | BaseCallNode
  | BinaryOperatorNode
  | CallNode
  | DictionaryNode
  | FalseNode
  | FloatNode
  | GetNodeNode
  | IdentifierNode
  | IntegerNode
  | NodePathNode
  | NullNode
  | ParenthesizedExpressionNode
  | StringNode
  | SubscriptNode
  | TrueNode
  | UnaryOperatorNode
  ;

export type CompoundStatementNode =
  | ClassDefinitionNode
  | ConstructorDefinitionNode
  | EnumDefinitionNode
  | ForStatementNode
  | FunctionDefinitionNode
  | IfStatementNode
  | MatchStatementNode
  | WhileStatementNode
  ;

export type ExpressionNode =
  | PrimaryExpressionNode
  | ConditionalExpressionNode
  ;

export type ParameterChildNode =
  | DefaultParameterNode
  | IdentifierNode
  | TypedDefaultParameterNode
  | TypedParameterNode
  | VariadicParameterNode
  ;

export type PatternNode =
  | PrimaryExpressionNode
  | ConditionalExpressionNode
  | PatternBindingNode
  ;

export type PrimaryExpressionNode =
  | ArrayNode
  | AttributeNode
  | AwaitExpressionNode
  | BaseCallNode
  | BinaryOperatorNode
  | CallNode
  | DictionaryNode
  | FalseNode
  | FloatNode
  | GetNodeNode
  | IdentifierNode
  | IntegerNode
  | NodePathNode
  | NullNode
  | ParenthesizedExpressionNode
  | StringNode
  | StringNameNode
  | SubscriptNode
  | TrueNode
  | UnaryOperatorNode
  ;

export interface AnnotationNode extends NamedNodeBase {
  type: typeof SyntaxType.Annotation;
  argumentsNode?: ArgumentsNode;
}

export interface AnnotationsNode extends NamedNodeBase {
  type: typeof SyntaxType.Annotations;
}

export interface ArgumentsNode extends NamedNodeBase {
  type: typeof SyntaxType.Arguments;
}

export interface ArrayNode extends NamedNodeBase {
  type: typeof SyntaxType.Array;
}

export interface AssignmentNode extends NamedNodeBase {
  type: typeof SyntaxType.Assignment;
  leftNode: ExpressionNode;
  rightNode: ExpressionNode | LambdaNode;
}

export interface AttributeNode extends NamedNodeBase {
  type: typeof SyntaxType.Attribute;
}

export interface AttributeCallNode extends NamedNodeBase {
  type: typeof SyntaxType.AttributeCall;
  argumentsNode: ArgumentsNode;
}

export interface AttributeSubscriptNode extends NamedNodeBase {
  type: typeof SyntaxType.AttributeSubscript;
  argumentsNode: SubscriptArgumentsNode;
}

export interface AugmentedAssignmentNode extends NamedNodeBase {
  type: typeof SyntaxType.AugmentedAssignment;
  leftNode: ExpressionNode;
  opNode: UnnamedNode<"%="> | UnnamedNode<"&="> | UnnamedNode<"**="> | UnnamedNode<"*="> | UnnamedNode<"+="> | UnnamedNode<"-="> | UnnamedNode<"/="> | UnnamedNode<"<<="> | UnnamedNode<">>="> | UnnamedNode<"^="> | UnnamedNode<"|=">;
  rightNode: ExpressionNode | LambdaNode;
}

export interface AwaitExpressionNode extends NamedNodeBase {
  type: typeof SyntaxType.AwaitExpression;
}

export interface BaseCallNode extends NamedNodeBase {
  type: typeof SyntaxType.BaseCall;
  argumentsNode: ArgumentsNode;
}

export interface BinaryOperatorNode extends NamedNodeBase {
  type: typeof SyntaxType.BinaryOperator;
  leftNode: PrimaryExpressionNode;
  opNodes: (UnnamedNode<"!="> | UnnamedNode<"%"> | UnnamedNode<"&"> | UnnamedNode<"&&"> | UnnamedNode<"*"> | UnnamedNode<"**"> | UnnamedNode<"+"> | UnnamedNode<"-"> | UnnamedNode<"/"> | UnnamedNode<"<"> | UnnamedNode<"<<"> | UnnamedNode<"<="> | UnnamedNode<"=="> | UnnamedNode<">"> | UnnamedNode<">="> | UnnamedNode<">>"> | UnnamedNode<"^"> | UnnamedNode<"and"> | UnnamedNode<"as"> | UnnamedNode<"in"> | UnnamedNode<"is"> | UnnamedNode<"not"> | UnnamedNode<"or"> | UnnamedNode<"|"> | UnnamedNode<"||">)[];
  rightNode: PrimaryExpressionNode;
}

export interface BodyNode extends NamedNodeBase {
  type: typeof SyntaxType.Body;
}

export interface BreakStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.BreakStatement;
}

export interface CallNode extends NamedNodeBase {
  type: typeof SyntaxType.Call;
  argumentsNode: ArgumentsNode;
}

export interface ClassBodyNode extends NamedNodeBase {
  type: typeof SyntaxType.ClassBody;
}

export interface ClassDefinitionNode extends NamedNodeBase {
  type: typeof SyntaxType.ClassDefinition;
  bodyNode: ClassBodyNode;
  extendsNode?: ExtendsStatementNode;
  nameNode: NameNode;
}

export interface ClassNameStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ClassNameStatement;
  extendsNode?: ExtendsStatementNode;
  icon_pathNode?: StringNode;
  nameNode: NameNode;
}

export interface ConditionalExpressionNode extends NamedNodeBase {
  type: typeof SyntaxType.ConditionalExpression;
  conditionNode: ExpressionNode;
  leftNode: ExpressionNode;
  rightNode: ExpressionNode;
}

export interface ConstStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ConstStatement;
  nameNode: NameNode;
  typeNode?: InferredTypeNode | TypeNode;
  valueNode: ExpressionNode | LambdaNode;
}

export interface ConstructorDefinitionNode extends NamedNodeBase {
  type: typeof SyntaxType.ConstructorDefinition;
  argumentsNode?: ArgumentsNode;
  bodyNode: BodyNode;
  parametersNode: ParametersNode;
  return_typeNode?: TypeNode;
}

export interface ContinueStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ContinueStatement;
}

export interface DefaultParameterNode extends NamedNodeBase {
  type: typeof SyntaxType.DefaultParameter;
  valueNode: ExpressionNode | LambdaNode;
}

export interface DictionaryNode extends NamedNodeBase {
  type: typeof SyntaxType.Dictionary;
}

export interface ElifClauseNode extends NamedNodeBase {
  type: typeof SyntaxType.ElifClause;
  bodyNode: BodyNode;
  conditionNode: ExpressionNode;
}

export interface ElseClauseNode extends NamedNodeBase {
  type: typeof SyntaxType.ElseClause;
  bodyNode: BodyNode;
}

export interface EnumDefinitionNode extends NamedNodeBase {
  type: typeof SyntaxType.EnumDefinition;
  bodyNode: EnumeratorListNode;
  nameNode?: NameNode;
}

export interface EnumeratorNode extends NamedNodeBase {
  type: typeof SyntaxType.Enumerator;
  leftNode: IdentifierNode;
  rightNode?: AttributeNode | BinaryOperatorNode | CallNode | IdentifierNode | IntegerNode | ParenthesizedExpressionNode | SubscriptNode | UnaryOperatorNode;
}

export interface EnumeratorListNode extends NamedNodeBase {
  type: typeof SyntaxType.EnumeratorList;
}

export interface ExportVariableStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ExportVariableStatement;
  argumentsNode?: ArgumentsNode;
  nameNode: NameNode;
  setgetNode?: SetgetNode;
  staticNode?: StaticKeywordNode;
  typeNode?: InferredTypeNode | TypeNode;
  valueNode?: ExpressionNode | LambdaNode;
}

export interface ExpressionStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ExpressionStatement;
}

export interface ExtendsStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ExtendsStatement;
}

export interface ForStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ForStatement;
  bodyNode: BodyNode;
  leftNode: IdentifierNode;
  rightNode: ExpressionNode;
  typeNode?: TypeNode;
}

export interface FunctionDefinitionNode extends NamedNodeBase {
  type: typeof SyntaxType.FunctionDefinition;
  bodyNode?: BodyNode;
  nameNode?: NameNode;
  parametersNode: ParametersNode;
  return_typeNode?: TypeNode;
}

export interface GetBodyNode extends NamedNodeBase {
  type: typeof SyntaxType.GetBody;
  bodyNode: BodyNode;
}

export interface GetNodeNode extends NamedNodeBase {
  type: typeof SyntaxType.GetNode;
}

export interface GetterNode extends NamedNodeBase {
  type: typeof SyntaxType.Getter;
}

export interface IdentifierNode extends NamedNodeBase {
  type: typeof SyntaxType.Identifier;
}

export interface IfStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.IfStatement;
  alternativeNodes: (ElifClauseNode | ElseClauseNode)[];
  bodyNode: BodyNode;
  conditionNode: ExpressionNode;
}

export interface InferredTypeNode extends NamedNodeBase {
  type: typeof SyntaxType.InferredType;
}

export interface LambdaNode extends NamedNodeBase {
  type: typeof SyntaxType.Lambda;
  bodyNode: BodyNode;
  nameNode?: NameNode;
  parametersNode: ParametersNode;
  return_typeNode?: TypeNode;
}

export interface MatchBodyNode extends NamedNodeBase {
  type: typeof SyntaxType.MatchBody;
}

export interface MatchStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.MatchStatement;
  bodyNode: MatchBodyNode;
  valueNode: ExpressionNode;
}

export interface NameNode extends NamedNodeBase {
  type: typeof SyntaxType.Name;
}

export interface NodePathNode extends NamedNodeBase {
  type: typeof SyntaxType.NodePath;
}

export interface OnreadyVariableStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.OnreadyVariableStatement;
  nameNode: NameNode;
  setgetNode?: SetgetNode;
  staticNode?: StaticKeywordNode;
  typeNode?: InferredTypeNode | TypeNode;
  valueNode?: ExpressionNode | LambdaNode;
}

export interface PairNode extends NamedNodeBase {
  type: typeof SyntaxType.Pair;
  leftNode: ExpressionNode | IdentifierNode | LambdaNode;
  valueNode: ExpressionNode | LambdaNode | PatternBindingNode;
}

export interface ParametersNode extends NamedNodeBase {
  type: typeof SyntaxType.Parameters;
}

export interface ParenthesizedExpressionNode extends NamedNodeBase {
  type: typeof SyntaxType.ParenthesizedExpression;
}

export interface PassStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.PassStatement;
}

export interface PatternBindingNode extends NamedNodeBase {
  type: typeof SyntaxType.PatternBinding;
}

export interface PatternGuardNode extends NamedNodeBase {
  type: typeof SyntaxType.PatternGuard;
}

export interface PatternSectionNode extends NamedNodeBase {
  type: typeof SyntaxType.PatternSection;
  bodyNode: BodyNode;
}

export interface RegionStartNode extends NamedNodeBase {
  type: typeof SyntaxType.RegionStart;
}

export interface RemoteKeywordNode extends NamedNodeBase {
  type: typeof SyntaxType.RemoteKeyword;
}

export interface ReturnStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.ReturnStatement;
}

export interface SetBodyNode extends NamedNodeBase {
  type: typeof SyntaxType.SetBody;
  bodyNode: BodyNode;
}

export interface SetgetNode extends NamedNodeBase {
  type: typeof SyntaxType.Setget;
  getNode?: GetBodyNode | GetterNode;
  setNode?: SetBodyNode | SetterNode;
}

export interface SetterNode extends NamedNodeBase {
  type: typeof SyntaxType.Setter;
}

export interface SignalStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.SignalStatement;
  nameNode: NameNode;
  parametersNode?: ParametersNode;
}

export interface SourceNode extends NamedNodeBase {
  type: typeof SyntaxType.Source;
}

export interface StringNode extends NamedNodeBase {
  type: typeof SyntaxType.String;
}

export interface StringNameNode extends NamedNodeBase {
  type: typeof SyntaxType.StringName;
}

export interface SubscriptNode extends NamedNodeBase {
  type: typeof SyntaxType.Subscript;
  argumentsNode: SubscriptArgumentsNode;
}

export interface SubscriptArgumentsNode extends NamedNodeBase {
  type: typeof SyntaxType.SubscriptArguments;
}

export interface TypeNode extends NamedNodeBase {
  type: typeof SyntaxType.Type;
}

export interface TypedDefaultParameterNode extends NamedNodeBase {
  type: typeof SyntaxType.TypedDefaultParameter;
  typeNode: InferredTypeNode | TypeNode;
  valueNode: ExpressionNode | LambdaNode;
}

export interface TypedParameterNode extends NamedNodeBase {
  type: typeof SyntaxType.TypedParameter;
  typeNode: TypeNode;
}

export interface UnaryOperatorNode extends NamedNodeBase {
  type: typeof SyntaxType.UnaryOperator;
}

export interface VariableStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.VariableStatement;
  nameNode: NameNode;
  setgetNode?: SetgetNode;
  staticNode?: StaticKeywordNode;
  typeNode?: InferredTypeNode | TypeNode;
  valueNode?: ExpressionNode | LambdaNode;
}

export interface VariadicParameterNode extends NamedNodeBase {
  type: typeof SyntaxType.VariadicParameter;
}

export interface WhileStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.WhileStatement;
  bodyNode: BodyNode;
  conditionNode: ExpressionNode;
}

export interface BreakpointStatementNode extends NamedNodeBase {
  type: typeof SyntaxType.BreakpointStatement;
}

export interface CommentNode extends NamedNodeBase {
  type: typeof SyntaxType.Comment;
}

export interface EscapeSequenceNode extends NamedNodeBase {
  type: typeof SyntaxType.EscapeSequence;
}

export interface FalseNode extends NamedNodeBase {
  type: typeof SyntaxType.False;
}

export interface FloatNode extends NamedNodeBase {
  type: typeof SyntaxType.Float;
}

export interface IntegerNode extends NamedNodeBase {
  type: typeof SyntaxType.Integer;
}

export interface LineContinuationNode extends NamedNodeBase {
  type: typeof SyntaxType.LineContinuation;
}

export interface NullNode extends NamedNodeBase {
  type: typeof SyntaxType.Null;
}

export interface PatternOpenEndingNode extends NamedNodeBase {
  type: typeof SyntaxType.PatternOpenEnding;
}

export interface RegionEndNode extends NamedNodeBase {
  type: typeof SyntaxType.RegionEnd;
}

export interface RegionLabelNode extends NamedNodeBase {
  type: typeof SyntaxType.RegionLabel;
}

export interface StaticKeywordNode extends NamedNodeBase {
  type: typeof SyntaxType.StaticKeyword;
}

export interface TrueNode extends NamedNodeBase {
  type: typeof SyntaxType.True;
}

