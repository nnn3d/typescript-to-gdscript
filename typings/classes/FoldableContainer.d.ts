// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A container that can be expanded/collapsed. */
declare class FoldableContainer extends Container {
  /**
   * <member name="foldable_group" type="FoldableGroup" setter="set_foldable_group" getter="get_foldable_group">
   * The {@link FoldableGroup} associated with the container. When multiple {@link FoldableContainer} nodes share the same group, only one of them is allowed to be unfolded.
   */
  focus_mode: int;
  /** If `true`, the container will become folded and will hide all its children. */
  folded: boolean;
  /** Language code used for text shaping algorithms. If left empty, the current locale is used instead. */
  language: string;
  /**
   * <member name="title" type="String" setter="set_title" getter="get_title" default="&quot;&quot;">
   * The container's title text.
   */
  mouse_filter: int;
  /** Title's horizontal text alignment. */
  title_alignment: int;
  /** Title's position. */
  title_position: int;
  /** Title text writing direction. */
  title_text_direction: int;
  /** Defines the behavior of the title when the text is longer than the available space. */
  title_text_overrun_behavior: int;
  set_folded(value: boolean): void;
  is_folded(): boolean;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_title_alignment(value: int): void;
  get_title_alignment(): int;
  set_title_position(value: int): void;
  get_title_position(): int;
  set_title_text_direction(value: int): void;
  get_title_text_direction(): int;
  set_title_text_overrun_behavior(value: int): void;
  get_title_text_overrun_behavior(): int;

  /**
   * Adds a {@link Control} that will be placed next to the container's title, obscuring the clickable area. Prime usage is adding {@link Button} nodes, but it can be any {@link Control}.
   * The control will be added as a child of this container and removed from previous parent if necessary. The controls will be placed aligned to the right, with the first added control being the leftmost one.
   */
  add_title_bar_control(control: Control): void;
  /** Expands the container and emits {@link folding_changed}. */
  expand(): void;
  /** Folds the container and emits {@link folding_changed}. */
  fold(): void;
  /**
   * Removes a {@link Control} added with {@link add_title_bar_control}. The node is not freed automatically, you need to use {@link Node.queue_free}.
   */
  remove_title_bar_control(control: Control): void;

  /** Emitted when the container is folded/expanded. */
  folding_changed: Signal<[boolean]>;

  // enum TitlePosition
  /** Makes the title appear at the top of the container. */
  static readonly POSITION_TOP: int;
  /**
   * Makes the title appear at the bottom of the container. Also makes all StyleBoxes flipped vertically.
   */
  static readonly POSITION_BOTTOM: int;
}
