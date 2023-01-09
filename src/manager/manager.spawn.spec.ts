import { mockGlobal, mockInstanceOf } from "screeps-jest";
import { BodyParts, spawnManager, sufficientCapacity } from "./manager.spawn";
import { countRole } from "utils/memory.role";

const mySpawn = mockInstanceOf<StructureSpawn>({
  room: { energyAvailable: 400 },
  name: "Spawn1",
  isAvailable: () => true,
  spawning: () => false,
  spawnCreep: jest.fn()
});

describe("spawn manager", () => {
  it("calcs body parts", () => {
    const spawn = mockInstanceOf<StructureSpawn>({
      room: {
        energyAvailable: 200
      }
    });
    const creepBody: BodyPartConstant[] = [WORK, CARRY, MOVE];
    const creepBigBody: BodyPartConstant[] = [WORK, WORK, CARRY, MOVE];

    expect(sufficientCapacity(spawn, creepBody)).toEqual(true);
    expect(sufficientCapacity(spawn, creepBigBody)).toEqual(false);
  });
  it("Calc energy available", () => {
    expect(mySpawn.room.energyAvailable).toEqual(400);
  });
  it("Spawns a harvester and expect a certain bodypart", () => {
    mockGlobal<Game>("Game", {
      spawns: {
        Spawn1: mySpawn
      },
      time: 1
    });

    spawnManager.spawn();
    // console.log(countRole("harvester"));
  });
});
const room = mockInstanceOf<Room>({});

const extension = mockInstanceOf<StructureExtension>({
  store: {
    getUsedCapacity: () => 100
  }
});

const BP_WORK: BodyPartConstant[] = [WORK];

describe("spawn related functions", () => {
  it("returns body part costs", () => {
    const BP = new BodyParts();

    expect(BP.body_parts_cost(BP_WORK)).toEqual(100);
  });
  it("Calculate the biggest harvester body based on energy available", () => {
    const BP = new BodyParts();
    var HARVESTER_BODY = BP.harvester(300);
    expect(HARVESTER_BODY).toEqual([WORK, CARRY, MOVE, WORK]);
    HARVESTER_BODY = BP.harvester(450);
    expect(HARVESTER_BODY).toEqual([MOVE, WORK, WORK, WORK, CARRY, CARRY]);
  });
  it("Has too little energy to spawn a harvester", () => {
    const BP = new BodyParts();
    const HARVESTER_BODY = BP.harvester(100);
    expect(HARVESTER_BODY).toEqual(null);
  });
});
