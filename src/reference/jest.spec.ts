import { first } from "lodash";
import { mockInstanceOf } from "screeps-jest";
import { MainClass } from "./jest_ref";

describe("Testing Jest reference functions", () => {
  it("check if second method is called ", () => {
    const secondMethodMock = jest.spyOn(MainClass.prototype, "second_method");

    const MC = new MainClass();
    MC.first_method();
    expect(secondMethodMock).toHaveBeenCalled();
  });
});
