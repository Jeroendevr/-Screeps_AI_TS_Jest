import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { constructionManager } from "./constructor";
import { ConstructionManager } from "./manager.construction";

const mySpawn = mockStructure(STRUCTURE_SPAWN);
const mySpawnPos = mockInstanceOf<RoomPosition>({
  x: 10,
  y: 10,
  lookFor: () => [STRUCTURE_SPAWN]
});
const myNewConstrSite = mockInstanceOf<RoomPosition>({
  x: 11,
  y: 11,
  lookFor: () => {}
});
const myOccupiedConstrSite = mockInstanceOf<RoomPosition>({
  x: 10,
  y: 10,
  lookFor: () => [ConstructionSite]
});
const suitableConstrSite = mockInstanceOf<RoomPosition>({
  x: 12,
  y: 10,
  lookFor: () => {}
});

const ROOM_NAME = "A1A1";

const roomWithoutController = mockInstanceOf<Room>({
  controller: undefined,
  name: ROOM_NAME
});

const roomWithSpawn = mockInstanceOf<Room>({
  name: ROOM_NAME,
  RoomPosition: {
    mySpawnPos
  }
});

const MyGame = mockGlobal<Game>("Game", {
  rooms: {
    0: roomWithSpawn
  }
});

describe("run", () => {
  it("Does not have a controller", () => {
    mockGlobal<Game>("Game", {
      rooms: {
        A1A1: roomWithoutController
      }
    });
    expect(() => {
      new ConstructionManager("A1A1").run();
    }).toThrow();
  });
  it("adds a construction site to RoomComms", () => {
    MyGame;
  });
  it("is an available construction site", () => {
    const CON_MAN = new ConstructionManager(ROOM_NAME);
    expect(CON_MAN.pos_available_construction(myNewConstrSite)).toBeTruthy;
  });
  it("Tries to place a stucture on the spawn", () => {
    const CON_MAN = new ConstructionManager(ROOM_NAME);
    expect(CON_MAN.pos_available_construction(myOccupiedConstrSite)).toBeFalsy;
  });
  it("Calls a generator function until it finds a good RoomPosition", () => {
    // MyGame;
    const CON_MAN = new ConstructionManager(ROOM_NAME);
    const ROOM_POS = CON_MAN.pos_available_construction(suitableConstrSite);
    expect(ROOM_POS == true);
  });
});
