import { return_string, yield_two_strings, yield_two_array, yield_three_strings_return } from "generators";

describe("generators", () => {
  it("Two strings", () => {
    const RT = return_string();

    const FIRST_NEXT_CALL = RT.next();
    expect(FIRST_NEXT_CALL.value).toEqual("hello");
    expect(FIRST_NEXT_CALL.done).toBeFalsy();

    const SECOND_NEXT_CALL = RT.next();
    expect(SECOND_NEXT_CALL.value).toEqual("no result");
    expect(SECOND_NEXT_CALL.done).toBeTruthy();
  });
  it("Yields two strings", () => {
    const YTT = yield_two_strings();

    const FIRST_NEXT_CALL = YTT.next();
    expect(FIRST_NEXT_CALL.value).toEqual("hello");
    expect(FIRST_NEXT_CALL.done).toBeFalsy();

    const SECOND_NEXT_CALL = YTT.next();
    expect(SECOND_NEXT_CALL.value).toEqual("no result");
    expect(SECOND_NEXT_CALL.done).toBeFalsy();

    const THIRD_NEXT_CALL = YTT.next();
    expect(THIRD_NEXT_CALL.done).toBeTruthy();
  });
  it("Return strings with Typing", () => {
    const RT = return_string();

    const FIRST_NEXT_CALL = RT.next();
    const FIRST_NEXT_CALL_VALUE: string = FIRST_NEXT_CALL.value;
    expect(FIRST_NEXT_CALL_VALUE).toEqual("hello");
  });

  /**
   *
   */
  it("Loops until done", () => {
    const YTT = yield_two_strings();
    var i: number = 0;
    var result = YTT.next();
    i += 1;
    while (!result.done) {
      result = YTT.next();
      i += 1;
    }

    expect(i).toEqual(3);
    // After the third call the generator yield Done because it could not find another yield statement
    expect(result.value).toEqual(undefined);
  });
  it("Loops until done because of a return statement", () => {
    const YTS = yield_three_strings_return();
    var i: number = 0;
    var result = YTS.next();
    i += 1;
    while (!result.done) {
      result = YTS.next();
      i += 1;
    }

    expect(i).toEqual(4);
  });
  it("Yields two arrays", () => {
    const YTA = yield_two_array();

    const FIRST_NEXT_CALL = YTA.next();
    const FIRST_NEXT_CALL_VALUE: [number, number] = FIRST_NEXT_CALL.value;

    expect(FIRST_NEXT_CALL_VALUE).toEqual([1, 1]);
  });
});
