// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Version Control System (VCS) interface, which reads and writes to the local VCS in use. */
declare class EditorVCSInterface extends GodotObject {
  /** Checks out a `branch_name` in the VCS. */
  _checkout_branch(branch_name: string): boolean;
  /** Commits the currently staged changes and applies the commit `msg` to the resulting commit. */
  _commit(msg: string): void;
  /** Creates a new branch named `branch_name` in the VCS. */
  _create_branch(branch_name: string): void;
  /**
   * Creates a new remote destination with name `remote_name` and points it to `remote_url`. This can be an HTTPS remote or an SSH remote.
   */
  _create_remote(remote_name: string, remote_url: string): void;
  /** Discards the changes made in a file present at `file_path`. */
  _discard_file(file_path: string): void;
  /**
   * Fetches new changes from the `remote`, but doesn't write changes to the current working directory. Equivalent to `git fetch`.
   */
  _fetch(remote: string): void;
  /**
   * Gets an instance of an {@link Array} of {@link String}s containing available branch names in the VCS.
   */
  _get_branch_list(): Array<string>;
  /** Gets the current branch name defined in the VCS. */
  _get_current_branch_name(): string;
  /**
   * Returns an array of {@link Dictionary} items (see {@link create_diff_file}, {@link create_diff_hunk}, {@link create_diff_line}, {@link add_line_diffs_into_diff_hunk} and {@link add_diff_hunks_into_diff_file}), each containing information about a diff. If `identifier` is a file path, returns a file diff, and if it is a commit identifier, then returns a commit diff.
   */
  _get_diff(identifier: string, area: int): Array<Dictionary>;
  /**
   * Returns an {@link Array} of {@link Dictionary} items (see {@link create_diff_hunk}), each containing a line diff between a file at `file_path` and the `text` which is passed in.
   */
  _get_line_diff(file_path: string, text: string): Array<Dictionary>;
  /**
   * Returns an {@link Array} of {@link Dictionary} items (see {@link create_status_file}), each containing the status data of every modified file in the project folder.
   */
  _get_modified_files_data(): Array<Dictionary>;
  /**
   * Returns an {@link Array} of {@link Dictionary} items (see {@link create_commit}), each containing the data for a past commit.
   */
  _get_previous_commits(max_commits: int): Array<Dictionary>;
  /**
   * Returns an {@link Array} of {@link String}s, each containing the name of a remote configured in the VCS.
   */
  _get_remotes(): Array<string>;
  /** Returns the name of the underlying VCS provider. */
  _get_vcs_name(): string;
  /**
   * Initializes the VCS plugin when called from the editor. Returns whether or not the plugin was successfully initialized. A VCS project is initialized at `project_path`.
   */
  _initialize(project_path: string): boolean;
  /** Pulls changes from the remote. This can give rise to merge conflicts. */
  _pull(remote: string): void;
  /**
   * Pushes changes to the `remote`. If `force` is `true`, a force push will override the change history already present on the remote.
   */
  _push(remote: string, force: boolean): void;
  /** Remove a branch from the local VCS. */
  _remove_branch(branch_name: string): void;
  /** Remove a remote from the local VCS. */
  _remove_remote(remote_name: string): void;
  /**
   * Set user credentials in the underlying VCS. `username` and `password` are used only during HTTPS authentication unless not already mentioned in the remote URL. `ssh_public_key_path`, `ssh_private_key_path`, and `ssh_passphrase` are only used during SSH authentication.
   */
  _set_credentials(username: string, password: string, ssh_public_key_path: string, ssh_private_key_path: string, ssh_passphrase: string): void;
  /**
   * Shuts down VCS plugin instance. Called when the user either closes the editor or shuts down the VCS plugin through the editor UI.
   */
  _shut_down(): boolean;
  /** Stages the file present at `file_path` to the staged area. */
  _stage_file(file_path: string): void;
  /** Unstages the file present at `file_path` from the staged area to the unstaged area. */
  _unstage_file(file_path: string): void;
  /** Helper function to add an array of `diff_hunks` into a `diff_file`. */
  add_diff_hunks_into_diff_file(diff_file: Dictionary, diff_hunks: Array<Dictionary>): Dictionary;
  /** Helper function to add an array of `line_diffs` into a `diff_hunk`. */
  add_line_diffs_into_diff_hunk(diff_hunk: Dictionary, line_diffs: Array<Dictionary>): Dictionary;
  /**
   * Helper function to create a commit {@link Dictionary} item. `msg` is the commit message of the commit. `author` is a single human-readable string containing all the author's details, e.g. the email and name configured in the VCS. `id` is the identifier of the commit, in whichever format your VCS may provide an identifier to commits. `unix_timestamp` is the UTC Unix timestamp of when the commit was created. `offset_minutes` is the timezone offset in minutes, recorded from the system timezone where the commit was created.
   */
  create_commit(msg: string, author: string, id: string, unix_timestamp: int, offset_minutes: int): Dictionary;
  /** Helper function to create a {@link Dictionary} for storing old and new diff file paths. */
  create_diff_file(new_file: string, old_file: string): Dictionary;
  /**
   * Helper function to create a {@link Dictionary} for storing diff hunk data. `old_start` is the starting line number in old file. `new_start` is the starting line number in new file. `old_lines` is the number of lines in the old file. `new_lines` is the number of lines in the new file.
   */
  create_diff_hunk(old_start: int, new_start: int, old_lines: int, new_lines: int): Dictionary;
  /**
   * Helper function to create a {@link Dictionary} for storing a line diff. `new_line_no` is the line number in the new file (can be `-1` if the line is deleted). `old_line_no` is the line number in the old file (can be `-1` if the line is added). `content` is the diff text. `status` is a single character string which stores the line origin.
   */
  create_diff_line(new_line_no: int, old_line_no: int, content: string, status: string): Dictionary;
  /** Helper function to create a {@link Dictionary} used by editor to read the status of a file. */
  create_status_file(file_path: string, change_type: int, area: int): Dictionary;
  /**
   * Pops up an error message in the editor which is shown as coming from the underlying VCS. Use this to show VCS specific error messages.
   */
  popup_error(msg: string): void;

  // enum ChangeType
  /** A new file has been added. */
  static readonly CHANGE_TYPE_NEW: int;
  /** An earlier added file has been modified. */
  static readonly CHANGE_TYPE_MODIFIED: int;
  /** An earlier added file has been renamed. */
  static readonly CHANGE_TYPE_RENAMED: int;
  /** An earlier added file has been deleted. */
  static readonly CHANGE_TYPE_DELETED: int;
  /** An earlier added file has been typechanged. */
  static readonly CHANGE_TYPE_TYPECHANGE: int;
  /** A file is left unmerged. */
  static readonly CHANGE_TYPE_UNMERGED: int;
  // enum TreeArea
  /** A commit is encountered from the commit area. */
  static readonly TREE_AREA_COMMIT: int;
  /** A file is encountered from the staged area. */
  static readonly TREE_AREA_STAGED: int;
  /** A file is encountered from the unstaged area. */
  static readonly TREE_AREA_UNSTAGED: int;
}
