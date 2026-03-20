// AUTO-GENERATED — do not edit. Run `yarn generate:ast-types` to regenerate.
// Generated from tree-sitter-gdscript node-types.json

import type Parser from 'tree-sitter';

/** Base interface for all GDScript AST nodes */
export interface GDNodeBase {
  type: string;
  text: string;
  isNamed: boolean;
  startPosition: Parser.Point;
  endPosition: Parser.Point;
  startIndex: number;
  endIndex: number;
  parent: GDNode | null;
  children: GDNode[];
  namedChildren: GDNode[];
  childCount: number;
  namedChildCount: number;
  firstChild: GDNode | null;
  lastChild: GDNode | null;
  firstNamedChild: GDNode | null;
  lastNamedChild: GDNode | null;
  nextSibling: GDNode | null;
  previousSibling: GDNode | null;
  nextNamedSibling: GDNode | null;
  previousNamedSibling: GDNode | null;
  childForFieldName(fieldName: string): GDNode | null;
  childrenForFieldName(fieldName: string): GDNode[];
  descendantsOfType(type: string | string[]): GDNode[];
  closest(type: string | string[]): GDNode | null;
  toString(): string;
}

export interface GDAnnotationNode extends GDNodeBase {
  type: 'annotation';
  childForFieldName(name: 'arguments'): GDArgumentsNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDAnnotationsNode extends GDNodeBase {
  type: 'annotations';
}

export interface GDArgumentsNode extends GDNodeBase {
  type: 'arguments';
}

export interface GDArrayNode extends GDNodeBase {
  type: 'array';
}

export interface GDAssignmentNode extends GDNodeBase {
  type: 'assignment';
  childForFieldName(name: 'left'): GDExpressionUnion;
  childForFieldName(name: 'right'): GDExpressionUnion | GDLambdaNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDAttributeNode extends GDNodeBase {
  type: 'attribute';
}

export interface GDAttributeCallNode extends GDNodeBase {
  type: 'attribute_call';
  childForFieldName(name: 'arguments'): GDArgumentsNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDAttributeSubscriptNode extends GDNodeBase {
  type: 'attribute_subscript';
  childForFieldName(name: 'arguments'): GDSubscriptArgumentsNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDAugmentedAssignmentNode extends GDNodeBase {
  type: 'augmented_assignment';
  childForFieldName(name: 'left'): GDExpressionUnion;
  childForFieldName(name: 'op'): GDNode;
  childForFieldName(name: 'right'): GDExpressionUnion | GDLambdaNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDAwaitExpressionNode extends GDNodeBase {
  type: 'await_expression';
}

export interface GDBaseCallNode extends GDNodeBase {
  type: 'base_call';
  childForFieldName(name: 'arguments'): GDArgumentsNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDBinaryOperatorNode extends GDNodeBase {
  type: 'binary_operator';
  childForFieldName(name: 'left'): GDPrimaryExpressionUnion;
  childForFieldName(name: 'op'): GDNode;
  childForFieldName(name: 'right'): GDPrimaryExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDBodyNode extends GDNodeBase {
  type: 'body';
}

export interface GDBreakStatementNode extends GDNodeBase {
  type: 'break_statement';
}

export interface GDCallNode extends GDNodeBase {
  type: 'call';
  childForFieldName(name: 'arguments'): GDArgumentsNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDClassBodyNode extends GDNodeBase {
  type: 'class_body';
}

export interface GDClassDefinitionNode extends GDNodeBase {
  type: 'class_definition';
  childForFieldName(name: 'body'): GDClassBodyNode;
  childForFieldName(name: 'extends'): GDExtendsStatementNode | null;
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDClassNameStatementNode extends GDNodeBase {
  type: 'class_name_statement';
  childForFieldName(name: 'extends'): GDExtendsStatementNode | null;
  childForFieldName(name: 'icon_path'): GDStringNode | null;
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDConditionalExpressionNode extends GDNodeBase {
  type: 'conditional_expression';
  childForFieldName(name: 'condition'): GDExpressionUnion;
  childForFieldName(name: 'left'): GDExpressionUnion;
  childForFieldName(name: 'right'): GDExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDConstStatementNode extends GDNodeBase {
  type: 'const_statement';
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: 'type'): (GDInferredTypeNode | GDTypeNode) | null;
  childForFieldName(name: 'value'): GDExpressionUnion | GDLambdaNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDConstructorDefinitionNode extends GDNodeBase {
  type: 'constructor_definition';
  childForFieldName(name: 'arguments'): GDArgumentsNode | null;
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'parameters'): GDParametersNode;
  childForFieldName(name: 'return_type'): GDTypeNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDContinueStatementNode extends GDNodeBase {
  type: 'continue_statement';
}

export interface GDDefaultParameterNode extends GDNodeBase {
  type: 'default_parameter';
  childForFieldName(name: 'value'): GDExpressionUnion | GDLambdaNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDDictionaryNode extends GDNodeBase {
  type: 'dictionary';
}

export interface GDElifClauseNode extends GDNodeBase {
  type: 'elif_clause';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'condition'): GDExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDElseClauseNode extends GDNodeBase {
  type: 'else_clause';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDEnumDefinitionNode extends GDNodeBase {
  type: 'enum_definition';
  childForFieldName(name: 'body'): GDEnumeratorListNode;
  childForFieldName(name: 'name'): GDNameNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDEnumeratorNode extends GDNodeBase {
  type: 'enumerator';
  childForFieldName(name: 'left'): GDIdentifierNode;
  childForFieldName(
    name: 'right',
  ):
    | (
        | GDAttributeNode
        | GDBinaryOperatorNode
        | GDCallNode
        | GDIdentifierNode
        | GDIntegerNode
        | GDParenthesizedExpressionNode
        | GDSubscriptNode
        | GDUnaryOperatorNode
      )
    | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDEnumeratorListNode extends GDNodeBase {
  type: 'enumerator_list';
}

export interface GDExportVariableStatementNode extends GDNodeBase {
  type: 'export_variable_statement';
  childForFieldName(name: 'arguments'): GDArgumentsNode | null;
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: 'setget'): GDSetgetNode | null;
  childForFieldName(name: 'static'): GDStaticKeywordNode | null;
  childForFieldName(name: 'type'): (GDInferredTypeNode | GDTypeNode) | null;
  childForFieldName(name: 'value'): (GDExpressionUnion | GDLambdaNode) | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDExpressionStatementNode extends GDNodeBase {
  type: 'expression_statement';
}

export interface GDExtendsStatementNode extends GDNodeBase {
  type: 'extends_statement';
}

export interface GDForStatementNode extends GDNodeBase {
  type: 'for_statement';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'left'): GDIdentifierNode;
  childForFieldName(name: 'right'): GDExpressionUnion;
  childForFieldName(name: 'type'): GDTypeNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDFunctionDefinitionNode extends GDNodeBase {
  type: 'function_definition';
  childForFieldName(name: 'body'): GDBodyNode | null;
  childForFieldName(name: 'name'): GDNameNode | null;
  childForFieldName(name: 'parameters'): GDParametersNode;
  childForFieldName(name: 'return_type'): GDTypeNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDGetBodyNode extends GDNodeBase {
  type: 'get_body';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDGetNodeNode extends GDNodeBase {
  type: 'get_node';
}

export interface GDGetterNode extends GDNodeBase {
  type: 'getter';
}

export interface GDIdentifierNode extends GDNodeBase {
  type: 'identifier';
}

export interface GDIfStatementNode extends GDNodeBase {
  type: 'if_statement';
  childForFieldName(
    name: 'alternative',
  ): (GDElifClauseNode | GDElseClauseNode)[];
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'condition'): GDExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDInferredTypeNode extends GDNodeBase {
  type: 'inferred_type';
}

export interface GDLambdaNode extends GDNodeBase {
  type: 'lambda';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'name'): GDNameNode | null;
  childForFieldName(name: 'parameters'): GDParametersNode;
  childForFieldName(name: 'return_type'): GDTypeNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDMatchBodyNode extends GDNodeBase {
  type: 'match_body';
}

export interface GDMatchStatementNode extends GDNodeBase {
  type: 'match_statement';
  childForFieldName(name: 'body'): GDMatchBodyNode;
  childForFieldName(name: 'value'): GDExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDNameNode extends GDNodeBase {
  type: 'name';
}

export interface GDNodePathNode extends GDNodeBase {
  type: 'node_path';
}

export interface GDOnreadyVariableStatementNode extends GDNodeBase {
  type: 'onready_variable_statement';
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: 'setget'): GDSetgetNode | null;
  childForFieldName(name: 'static'): GDStaticKeywordNode | null;
  childForFieldName(name: 'type'): (GDInferredTypeNode | GDTypeNode) | null;
  childForFieldName(name: 'value'): (GDExpressionUnion | GDLambdaNode) | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDPairNode extends GDNodeBase {
  type: 'pair';
  childForFieldName(
    name: 'left',
  ): GDExpressionUnion | GDIdentifierNode | GDLambdaNode;
  childForFieldName(
    name: 'value',
  ): GDExpressionUnion | GDLambdaNode | GDPatternBindingNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDParametersNode extends GDNodeBase {
  type: 'parameters';
}

export interface GDParenthesizedExpressionNode extends GDNodeBase {
  type: 'parenthesized_expression';
}

export interface GDPassStatementNode extends GDNodeBase {
  type: 'pass_statement';
}

export interface GDPatternBindingNode extends GDNodeBase {
  type: 'pattern_binding';
}

export interface GDPatternGuardNode extends GDNodeBase {
  type: 'pattern_guard';
}

export interface GDPatternSectionNode extends GDNodeBase {
  type: 'pattern_section';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDRegionStartNode extends GDNodeBase {
  type: 'region_start';
}

export interface GDRemoteKeywordNode extends GDNodeBase {
  type: 'remote_keyword';
}

export interface GDReturnStatementNode extends GDNodeBase {
  type: 'return_statement';
}

export interface GDSetBodyNode extends GDNodeBase {
  type: 'set_body';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDSetgetNode extends GDNodeBase {
  type: 'setget';
  childForFieldName(name: 'get'): (GDGetBodyNode | GDGetterNode) | null;
  childForFieldName(name: 'set'): (GDSetBodyNode | GDSetterNode) | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDSetterNode extends GDNodeBase {
  type: 'setter';
}

export interface GDSignalStatementNode extends GDNodeBase {
  type: 'signal_statement';
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: 'parameters'): GDParametersNode | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDSourceNode extends GDNodeBase {
  type: 'source';
}

export interface GDStringNode extends GDNodeBase {
  type: 'string';
}

export interface GDStringNameNode extends GDNodeBase {
  type: 'string_name';
}

export interface GDSubscriptNode extends GDNodeBase {
  type: 'subscript';
  childForFieldName(name: 'arguments'): GDSubscriptArgumentsNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDSubscriptArgumentsNode extends GDNodeBase {
  type: 'subscript_arguments';
}

export interface GDTypeNode extends GDNodeBase {
  type: 'type';
}

export interface GDTypedDefaultParameterNode extends GDNodeBase {
  type: 'typed_default_parameter';
  childForFieldName(name: 'type'): GDInferredTypeNode | GDTypeNode;
  childForFieldName(name: 'value'): GDExpressionUnion | GDLambdaNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDTypedParameterNode extends GDNodeBase {
  type: 'typed_parameter';
  childForFieldName(name: 'type'): GDTypeNode;
  childForFieldName(name: string): GDNode | null;
}

export interface GDUnaryOperatorNode extends GDNodeBase {
  type: 'unary_operator';
}

export interface GDVariableStatementNode extends GDNodeBase {
  type: 'variable_statement';
  childForFieldName(name: 'name'): GDNameNode;
  childForFieldName(name: 'setget'): GDSetgetNode | null;
  childForFieldName(name: 'static'): GDStaticKeywordNode | null;
  childForFieldName(name: 'type'): (GDInferredTypeNode | GDTypeNode) | null;
  childForFieldName(name: 'value'): (GDExpressionUnion | GDLambdaNode) | null;
  childForFieldName(name: string): GDNode | null;
}

export interface GDVariadicParameterNode extends GDNodeBase {
  type: 'variadic_parameter';
}

export interface GDWhileStatementNode extends GDNodeBase {
  type: 'while_statement';
  childForFieldName(name: 'body'): GDBodyNode;
  childForFieldName(name: 'condition'): GDExpressionUnion;
  childForFieldName(name: string): GDNode | null;
}

export interface GDBreakpointStatementNode extends GDNodeBase {
  type: 'breakpoint_statement';
}

export interface GDCommentNode extends GDNodeBase {
  type: 'comment';
}

export interface GDEscapeSequenceNode extends GDNodeBase {
  type: 'escape_sequence';
}

export interface GDFalseNode extends GDNodeBase {
  type: 'false';
}

export interface GDFloatNode extends GDNodeBase {
  type: 'float';
}

export interface GDIntegerNode extends GDNodeBase {
  type: 'integer';
}

export interface GDLineContinuationNode extends GDNodeBase {
  type: 'line_continuation';
}

export interface GDNullNode extends GDNodeBase {
  type: 'null';
}

export interface GDPatternOpenEndingNode extends GDNodeBase {
  type: 'pattern_open_ending';
}

export interface GDRegionEndNode extends GDNodeBase {
  type: 'region_end';
}

export interface GDRegionLabelNode extends GDNodeBase {
  type: 'region_label';
}

export interface GDStaticKeywordNode extends GDNodeBase {
  type: 'static_keyword';
}

export interface GDTrueNode extends GDNodeBase {
  type: 'true';
}

export type GDAttributeExpressionUnion =
  | GDArrayNode
  | GDBaseCallNode
  | GDBinaryOperatorNode
  | GDCallNode
  | GDDictionaryNode
  | GDFalseNode
  | GDFloatNode
  | GDGetNodeNode
  | GDIdentifierNode
  | GDIntegerNode
  | GDNodePathNode
  | GDNullNode
  | GDParenthesizedExpressionNode
  | GDStringNode
  | GDSubscriptNode
  | GDTrueNode
  | GDUnaryOperatorNode;

export type GDCompoundStatementUnion =
  | GDClassDefinitionNode
  | GDConstructorDefinitionNode
  | GDEnumDefinitionNode
  | GDForStatementNode
  | GDFunctionDefinitionNode
  | GDIfStatementNode
  | GDMatchStatementNode
  | GDWhileStatementNode;

export type GDExpressionUnion =
  | GDPrimaryExpressionUnion
  | GDConditionalExpressionNode;

export type GDParametersUnion =
  | GDDefaultParameterNode
  | GDIdentifierNode
  | GDTypedDefaultParameterNode
  | GDTypedParameterNode
  | GDVariadicParameterNode;

export type GDPatternUnion =
  | GDPrimaryExpressionUnion
  | GDConditionalExpressionNode
  | GDPatternBindingNode;

export type GDPrimaryExpressionUnion =
  | GDArrayNode
  | GDAttributeNode
  | GDAwaitExpressionNode
  | GDBaseCallNode
  | GDBinaryOperatorNode
  | GDCallNode
  | GDDictionaryNode
  | GDFalseNode
  | GDFloatNode
  | GDGetNodeNode
  | GDIdentifierNode
  | GDIntegerNode
  | GDNodePathNode
  | GDNullNode
  | GDParenthesizedExpressionNode
  | GDStringNode
  | GDStringNameNode
  | GDSubscriptNode
  | GDTrueNode
  | GDUnaryOperatorNode;

/** Union of all GDScript AST node types */
export type GDNode =
  | GDAnnotationNode
  | GDAnnotationsNode
  | GDArgumentsNode
  | GDArrayNode
  | GDAssignmentNode
  | GDAttributeNode
  | GDAttributeCallNode
  | GDAttributeSubscriptNode
  | GDAugmentedAssignmentNode
  | GDAwaitExpressionNode
  | GDBaseCallNode
  | GDBinaryOperatorNode
  | GDBodyNode
  | GDBreakStatementNode
  | GDCallNode
  | GDClassBodyNode
  | GDClassDefinitionNode
  | GDClassNameStatementNode
  | GDConditionalExpressionNode
  | GDConstStatementNode
  | GDConstructorDefinitionNode
  | GDContinueStatementNode
  | GDDefaultParameterNode
  | GDDictionaryNode
  | GDElifClauseNode
  | GDElseClauseNode
  | GDEnumDefinitionNode
  | GDEnumeratorNode
  | GDEnumeratorListNode
  | GDExportVariableStatementNode
  | GDExpressionStatementNode
  | GDExtendsStatementNode
  | GDForStatementNode
  | GDFunctionDefinitionNode
  | GDGetBodyNode
  | GDGetNodeNode
  | GDGetterNode
  | GDIdentifierNode
  | GDIfStatementNode
  | GDInferredTypeNode
  | GDLambdaNode
  | GDMatchBodyNode
  | GDMatchStatementNode
  | GDNameNode
  | GDNodePathNode
  | GDOnreadyVariableStatementNode
  | GDPairNode
  | GDParametersNode
  | GDParenthesizedExpressionNode
  | GDPassStatementNode
  | GDPatternBindingNode
  | GDPatternGuardNode
  | GDPatternSectionNode
  | GDRegionStartNode
  | GDRemoteKeywordNode
  | GDReturnStatementNode
  | GDSetBodyNode
  | GDSetgetNode
  | GDSetterNode
  | GDSignalStatementNode
  | GDSourceNode
  | GDStringNode
  | GDStringNameNode
  | GDSubscriptNode
  | GDSubscriptArgumentsNode
  | GDTypeNode
  | GDTypedDefaultParameterNode
  | GDTypedParameterNode
  | GDUnaryOperatorNode
  | GDVariableStatementNode
  | GDVariadicParameterNode
  | GDWhileStatementNode
  | GDBreakpointStatementNode
  | GDCommentNode
  | GDEscapeSequenceNode
  | GDFalseNode
  | GDFloatNode
  | GDIntegerNode
  | GDLineContinuationNode
  | GDNullNode
  | GDPatternOpenEndingNode
  | GDRegionEndNode
  | GDRegionLabelNode
  | GDStaticKeywordNode
  | GDTrueNode;

/** Map from node type string to its TypeScript interface */
export interface GDNodeTypeMap {
  annotation: GDAnnotationNode;
  annotations: GDAnnotationsNode;
  arguments: GDArgumentsNode;
  array: GDArrayNode;
  assignment: GDAssignmentNode;
  attribute: GDAttributeNode;
  attribute_call: GDAttributeCallNode;
  attribute_subscript: GDAttributeSubscriptNode;
  augmented_assignment: GDAugmentedAssignmentNode;
  await_expression: GDAwaitExpressionNode;
  base_call: GDBaseCallNode;
  binary_operator: GDBinaryOperatorNode;
  body: GDBodyNode;
  break_statement: GDBreakStatementNode;
  call: GDCallNode;
  class_body: GDClassBodyNode;
  class_definition: GDClassDefinitionNode;
  class_name_statement: GDClassNameStatementNode;
  conditional_expression: GDConditionalExpressionNode;
  const_statement: GDConstStatementNode;
  constructor_definition: GDConstructorDefinitionNode;
  continue_statement: GDContinueStatementNode;
  default_parameter: GDDefaultParameterNode;
  dictionary: GDDictionaryNode;
  elif_clause: GDElifClauseNode;
  else_clause: GDElseClauseNode;
  enum_definition: GDEnumDefinitionNode;
  enumerator: GDEnumeratorNode;
  enumerator_list: GDEnumeratorListNode;
  export_variable_statement: GDExportVariableStatementNode;
  expression_statement: GDExpressionStatementNode;
  extends_statement: GDExtendsStatementNode;
  for_statement: GDForStatementNode;
  function_definition: GDFunctionDefinitionNode;
  get_body: GDGetBodyNode;
  get_node: GDGetNodeNode;
  getter: GDGetterNode;
  identifier: GDIdentifierNode;
  if_statement: GDIfStatementNode;
  inferred_type: GDInferredTypeNode;
  lambda: GDLambdaNode;
  match_body: GDMatchBodyNode;
  match_statement: GDMatchStatementNode;
  name: GDNameNode;
  node_path: GDNodePathNode;
  onready_variable_statement: GDOnreadyVariableStatementNode;
  pair: GDPairNode;
  parameters: GDParametersNode;
  parenthesized_expression: GDParenthesizedExpressionNode;
  pass_statement: GDPassStatementNode;
  pattern_binding: GDPatternBindingNode;
  pattern_guard: GDPatternGuardNode;
  pattern_section: GDPatternSectionNode;
  region_start: GDRegionStartNode;
  remote_keyword: GDRemoteKeywordNode;
  return_statement: GDReturnStatementNode;
  set_body: GDSetBodyNode;
  setget: GDSetgetNode;
  setter: GDSetterNode;
  signal_statement: GDSignalStatementNode;
  source: GDSourceNode;
  string: GDStringNode;
  string_name: GDStringNameNode;
  subscript: GDSubscriptNode;
  subscript_arguments: GDSubscriptArgumentsNode;
  type: GDTypeNode;
  typed_default_parameter: GDTypedDefaultParameterNode;
  typed_parameter: GDTypedParameterNode;
  unary_operator: GDUnaryOperatorNode;
  variable_statement: GDVariableStatementNode;
  variadic_parameter: GDVariadicParameterNode;
  while_statement: GDWhileStatementNode;
  breakpoint_statement: GDBreakpointStatementNode;
  comment: GDCommentNode;
  escape_sequence: GDEscapeSequenceNode;
  false: GDFalseNode;
  float: GDFloatNode;
  integer: GDIntegerNode;
  line_continuation: GDLineContinuationNode;
  null: GDNullNode;
  pattern_open_ending: GDPatternOpenEndingNode;
  region_end: GDRegionEndNode;
  region_label: GDRegionLabelNode;
  static_keyword: GDStaticKeywordNode;
  true: GDTrueNode;
}

/** Type guard for narrowing GDNode to a specific type */
export function isGDNodeType<T extends keyof GDNodeTypeMap>(
  node: GDNodeBase,
  type: T,
): node is GDNodeTypeMap[T] {
  return node.type === type;
}
