import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { InfraManager2 } from "./manager.infra2";

const SOURCE_1_POS = mockInstanceOf<RoomPosition>({
  x: 10,
  y: 10
});

const SOURCE_1 = mockInstanceOf<Source>({
  pos: SOURCE_1_POS
});

const SPAWN_POS = mockInstanceOf<RoomPosition>({
  x: 20,
  y: 10
});

const MY_SPAWN = mockStructure(STRUCTURE_SPAWN);

const MY_TWO_ENERGY_ROOM = mockInstanceOf<Room>({});

describe("Infrastructure manager", () => {
  it("Instancesiate manager with roomname which exist", () => {
    mockGlobal<Game>("Game", {
      rooms: {
        ["E3S34"]: Room
      }
    });
    const infraManager = new InfraManager2("E3S34");
  });
  it("tests the creation of one road to energy sources", () => {});
});
