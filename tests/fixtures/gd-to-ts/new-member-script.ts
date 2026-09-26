export namespace NewMemberScript {
  export const Helper = preload("res://helper.gd");
}

export class NewMemberScript extends RefCounted {
  make_helper() {
    return new NewMemberScript.Helper();
  }

  make_helper_via_self() {
    return new NewMemberScript.Helper();
  }

  make_local(Helper) {
    return new Helper();
  }
}
