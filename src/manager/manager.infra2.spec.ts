import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { mockRoomPositionConstructor } from "screeps-jest/dist/src/mocking";
import { InfraManager2, road_path } from "./manager.infra2";

const SOURCE_1_POS = mockInstanceOf<RoomPosition>({
  x: 10,
  y: 10,
  findPathTo: () => [{ x: 0 }, { x: 1 }, { x: 2 }, { x: 3 }]
});

const SOURCE_1 = mockInstanceOf<Source>({
  pos: SOURCE_1_POS,
  room: {}
});

const SPAWN_POS = mockInstanceOf<RoomPosition>({
  x: 20,
  y: 10
});

const MY_SPAWN = mockStructure(STRUCTURE_SPAWN);

const MY_TWO_ENERGY_ROOM = mockInstanceOf<Room>({
  name: "E3S34"
});

describe("Infrastructure manager", () => {
  it("Instancesiate manager with roomname which exist", () => {
    mockGlobal<Game>("Game", {
      rooms: {
        ["E3S34"]: Room
      }
    });
    const infraManager = new InfraManager2("E3S34");
  });
  it("tests the creation of one road to energy sources", () => {
    mockRoomPositionConstructor(SOURCE_1_POS);
    const path = road_path(SOURCE_1_POS, SPAWN_POS);
    expect(path).toEqual([{ x: 1 }, { x: 2 }]);
  });
});
