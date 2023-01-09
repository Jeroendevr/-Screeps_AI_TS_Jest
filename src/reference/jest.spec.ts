import { any } from "lodash";
import { mockGlobal, mockInstanceOf } from "screeps-jest";
import { MainClass, CallFunction } from "./jest_ref";
import { spawnManager } from "manager/manager.spawn";

describe("Testing Jest reference functions", () => {
  it("check if second method is called ", () => {
    const secondMethodMock = jest.spyOn(MainClass.prototype, "second_method");
    const MC = new MainClass();
    MC.first_method();
    expect(secondMethodMock).toHaveBeenCalled();
  });
  it("Mocks a function that has been called within a method", () => {
    const CF = new CallFunction();
    expect(CF.say_yes()).toEqual("yes");
  });
});

const mySpawn = mockInstanceOf<StructureSpawn>({
  room: { energyAvailable: 400 },
  name: "Spawn1",
  isAvailable: () => true,
  spawning: () => null,
  spawnCreep: jest.fn()
});

describe("Testing Jest reference functions on Sceeps", () => {
  it("mock spawnCreep method on Game.spawns object", () => {
    mockGlobal<Game>("Game", {
      spawns: {
        Spawn1: mySpawn
      }
    });
    mySpawn.spawnCreep([WORK], "harvester1", { memory: { role: "harvester" } });
    expect(mySpawn.spawnCreep).toHaveBeenCalled();
  });
});

const myGame = mockGlobal<Game>("Game", {
  spawns: {
    Spawn1: mySpawn
  }
});

describe("Testing spawnCreep through the spawn manager", () => {
  it("Spawn harvesters using the spawn manager", () => {
    myGame;
    spawnManager.spawn();
    expect(mySpawn.spawnCreep).toHaveBeenCalled();
  });
});
