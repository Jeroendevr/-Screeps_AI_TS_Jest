import { is_true } from "./jest_ref_supp";

class MainClass {
  first_method() {
    this.second_method();
  }

  second_method() {
    return true;
  }
}

class mySpawnClass {
  status() {
    return false;
  }
}

class CallFunction {
  say_yes() {
    if (is_true()) {
      return "yes";
    }
    return "no";
  }
}

export { MainClass, CallFunction };
