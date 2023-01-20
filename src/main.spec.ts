import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest";
import { mockRoomPositionConstructor } from "screeps-jest/dist/src/mocking";
import { TowerVisual } from "visuals/tower_vis";
import { cleanMemory, runAllTowers, runCreep } from "./main";
import { roleBuilder } from "./roles/builder";
import { roleHarvester } from "./roles/harvester";
import roleUpgrader from "./roles/upgrader";
import { runTower } from "./tower";

jest.mock("roles/builder");
jest.mock("roles/harvester");
jest.mock("roles/upgrader");
jest.mock("tower");

const builder = mockInstanceOf<Creep>({ memory: { role: "builder" } });
const harvester = mockInstanceOf<Creep>({ memory: { role: "harvester" } });
const upgrader = mockInstanceOf<Creep>({ memory: { role: "upgrader" } });

const myController = mockInstanceOf<StructureController>({ my: true });
const someoneElsesController = mockInstanceOf<StructureController>({ my: false });
const tower1 = mockStructure(STRUCTURE_TOWER, { pos: undefined, room: undefined, allowUndefinedAcces: true });
const tower2 = mockStructure(STRUCTURE_TOWER, { allowUndefinedAcces: true });
const myRoomWithTowers = mockInstanceOf<Room>({
  controller: myController,
  find: () => [tower1, tower2],
  allowUndefinedAcces: true
});
const myRoomWithoutTowers = mockInstanceOf<Room>({
  controller: myController,
  find: () => [],
  allowUndefinedAcces: true
});
const someoneElsesRoom = mockInstanceOf<Room>({ controller: someoneElsesController });
const noOnesRoom = mockInstanceOf<Room>({ controller: undefined });

mockRoomPositionConstructor(global);
const ROOM_POS = mockInstanceOf<RoomPosition>({
  x: 1,
  y: 1,
  lookFor: () => []
});

describe("main loop", () => {
  it("runs every creep", () => {
    mockGlobal<Game>("Game", {
      creeps: {
        builder,
        harvester,
        upgrader
      },
      rooms: {},
      time: 1,
      RoomPosition: ROOM_POS
    });
    mockGlobal<Memory>("Memory", { creeps: {} });
    runCreep();
    expect(roleBuilder.run).toHaveBeenCalledWith(builder);
    expect(roleHarvester.run).toHaveBeenCalledWith(harvester);
    expect(roleUpgrader.run).toHaveBeenCalledWith(upgrader);
  });

  it("cleans up the memory from deceased creeps", () => {
    mockGlobal<Game>("Game", {
      creeps: { stillKicking: harvester },
      rooms: {},
      time: 1,
      spawns: {}
    });
    mockGlobal<Memory>("Memory", {
      creeps: {
        dead: { role: "garbage" },
        goner: { role: "waste" },
        stillKicking: harvester.memory
      }
    });
    cleanMemory();
    expect(Memory.creeps).toEqual({ stillKicking: harvester.memory });
  });
});
