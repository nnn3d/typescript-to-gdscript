// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides a low-level interface for creating parsers for XML files. */
declare class XMLParser extends RefCounted {
  /**
   * Returns the number of attributes in the currently parsed element.
   * **Note:** If this method is used while the currently parsed node is not {@link NODE_ELEMENT} or {@link NODE_ELEMENT_END}, this count will not be updated and will still reflect the last element.
   */
  get_attribute_count(): int;
  /** Returns the name of an attribute of the currently parsed element, specified by the `idx` index. */
  get_attribute_name(idx: int): string;
  /** Returns the value of an attribute of the currently parsed element, specified by the `idx` index. */
  get_attribute_value(idx: int): string;
  /** Returns the current line in the parsed file, counting from 0. */
  get_current_line(): int;
  /**
   * Returns the value of an attribute of the currently parsed element, specified by its `name`. This method will raise an error if the element has no such attribute.
   */
  get_named_attribute_value(name: string | NodePath): string;
  /**
   * Returns the value of an attribute of the currently parsed element, specified by its `name`. This method will return an empty string if the element has no such attribute.
   */
  get_named_attribute_value_safe(name: string | NodePath): string;
  /**
   * Returns the contents of a text node. This method will raise an error if the current parsed node is of any other type.
   */
  get_node_data(): string;
  /**
   * Returns the name of a node. This method will raise an error if the currently parsed node is a text node.
   * **Note:** The content of a {@link NODE_CDATA} node and the comment string of a {@link NODE_COMMENT} node are also considered names.
   */
  get_node_name(): string;
  /**
   * Returns the byte offset of the currently parsed node since the beginning of the file or buffer. This is usually equivalent to the number of characters before the read position.
   */
  get_node_offset(): int;
  /** Returns the type of the current node. Compare with {@link NodeType} constants. */
  get_node_type(): int;
  /** Returns `true` if the currently parsed element has an attribute with the `name`. */
  has_attribute(name: string | NodePath): boolean;
  /** Returns `true` if the currently parsed element is empty, e.g. `<element />`. */
  is_empty(): boolean;
  /** Opens an XML `file` for parsing. This method returns an error code. */
  open(file: string | NodePath): int;
  /** Opens an XML raw `buffer` for parsing. This method returns an error code. */
  open_buffer(buffer: PackedByteArray | Array<unknown>): int;
  /** Parses the next node in the file. This method returns an error code. */
  read(): int;
  /**
   * Moves the buffer cursor to a certain offset (since the beginning) and reads the next node there. This method returns an error code.
   */
  seek(position: int): int;
  /**
   * Skips the current section. If the currently parsed node contains more inner nodes, they will be ignored and the cursor will go to the closing of the current element.
   */
  skip_section(): void;

  // enum NodeType
  /** There's no node (no file or buffer opened). */
  static readonly NODE_NONE: int;
  /** An element node type, also known as a tag, e.g. `<title>`. */
  static readonly NODE_ELEMENT: int;
  /** An end of element node type, e.g. `</title>`. */
  static readonly NODE_ELEMENT_END: int;
  /** A text node type, i.e. text that is not inside an element. This includes whitespace. */
  static readonly NODE_TEXT: int;
  /** A comment node type, e.g. `<!--A comment-->`. */
  static readonly NODE_COMMENT: int;
  /** A node type for CDATA (Character Data) sections, e.g. `<![CDATA[CDATA section]]>`. */
  static readonly NODE_CDATA: int;
  /** An unknown node type. */
  static readonly NODE_UNKNOWN: int;
}
