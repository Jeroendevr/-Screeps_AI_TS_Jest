import { mockInstanceOf, mockStructure } from "screeps-jest";
import { Harvester, roleHarvester } from "./harvester";
import { isToBeFilled } from "../utils/isToBeFilled";

const source1 = mockInstanceOf<Source>({ id: "source1" as Id<Source> });
const source2 = mockInstanceOf<Source>({ id: "source2" as Id<Source> });
const source3 = mockInstanceOf<Source>({
  id: "source3" as Id<Source>,
  pos: { x: 5, y: 5 }
});
const source4 = mockInstanceOf<Source>({
  id: "source4" as Id<Source>,
  pos: { x: 10, y: 10 }
});
const extension = mockStructure(STRUCTURE_EXTENSION);

describe("Harvester role", () => {
  describe("run", () => {
    it("harvests, when it's not full and is near a source", () => {
      const creep = mockInstanceOf<Harvester>({
        store: { getFreeCapacity: () => 50 },
        pos: {
          findClosestByPath: () => source1
        },
        room: { find: () => [source1, source2] },
        harvest: () => OK
      });

      roleHarvester.run(creep);
      expect(creep.harvest).toHaveBeenCalledWith(source1);
    });

    it("moves to a source, when it's not full and not near a source", () => {
      const creep = mockInstanceOf<Harvester>({
        store: { getFreeCapacity: () => 50 },
        pos: {
          findClosestByPath: () => source1
        },
        room: { find: () => [source1, source2] },
        harvest: () => ERR_NOT_IN_RANGE,
        moveTo: () => OK
      });

      roleHarvester.run(creep);
      expect(creep.moveTo).toHaveBeenCalledWith(source1, expect.anything());
    });

    it("fills structures, when it's full and near a non-full structure", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 0 },
        room: { find: () => [extension] },
        transfer: () => OK
      });

      roleHarvester.transferEnergy(creep);
      expect(creep.room.find).toHaveBeenCalledWith(FIND_MY_STRUCTURES, { filter: isToBeFilled });
      expect(creep.transfer).toHaveBeenCalledWith(extension, RESOURCE_ENERGY);
    });

    it("moves towards a non-full structure, when it's full and out of range to transfer", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 0 },
        room: { find: () => [extension] },
        transfer: () => ERR_NOT_IN_RANGE,
        moveTo: () => OK
      });

      roleHarvester.transferEnergy(creep);
      expect(creep.room.find).toHaveBeenCalledWith(FIND_MY_STRUCTURES, { filter: isToBeFilled });
      expect(creep.moveTo).toHaveBeenCalledWith(extension, expect.anything());
    });

    it("idles, when it's full and there are no structures in need of refilling", () => {
      const creep = mockInstanceOf<Creep>({
        store: { getFreeCapacity: () => 0 },
        room: {
          find: () => [],
          lookForAtArea: () => undefined
        }, // no structures to fill
        moveTo: () => OK,
        transfer: () => OK,
        pos: {
          y: undefined,
          x: undefined,
          findInRange: () => undefined
        }
      });

      roleHarvester.transferEnergy(creep);
      expect(creep.room.find).toHaveBeenCalledWith(FIND_MY_STRUCTURES, { filter: isToBeFilled });
      expect(creep.moveTo).not.toHaveBeenCalled();
      expect(creep.transfer).not.toHaveBeenCalled();
    });

    it("No sources found", () => {
      const creep_h = mockInstanceOf<Harvester>({
        room: {
          find: () => []
        }
      });

      expect(roleHarvester.assign_source(creep_h)).toBeFalsy();
    });
    /*
     * Adolfo : Creep is in dit geval de out of process dependency.
     * Zou het toevoegen van een application service laag (controller) helpen om de buisiness logic in de klasse te houden en dus makkelijker testbaar.
     * Bijv. Creep service?
     */
    it("assings itself one of two sources", () => {
      const harvester = mockInstanceOf<Harvester>({
        room: {
          find: () => [source3, source4]
        }
      });
      expect(roleHarvester.assign_source(harvester)).toBeTruthy();
    });
  });

  describe("isToBeFilled", () => {
    it("accepts extension, spawns and towers that are not full", () => {
      [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER].forEach(structureType => {
        const structure = mockStructure(structureType, {
          energy: 0,
          energyCapacity: 100
        });
        expect(isToBeFilled(structure)).toBeTruthy();
      });
    });

    it("rejects extension, spawns and towers that are already full", () => {
      [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER].forEach(structureType => {
        const structure = mockStructure(structureType, {
          energy: 100,
          energyCapacity: 100
        });
        expect(isToBeFilled(structure)).toBeFalsy();
      });
    });

    it("rejects any other structure type", () => {
      [
        STRUCTURE_CONTAINER,
        STRUCTURE_CONTROLLER,
        STRUCTURE_EXTRACTOR,
        STRUCTURE_KEEPER_LAIR,
        STRUCTURE_LAB,
        STRUCTURE_LINK,
        STRUCTURE_NUKER,
        STRUCTURE_OBSERVER,
        STRUCTURE_PORTAL,
        STRUCTURE_POWER_BANK,
        STRUCTURE_POWER_SPAWN,
        STRUCTURE_RAMPART,
        STRUCTURE_ROAD,
        STRUCTURE_STORAGE,
        STRUCTURE_TERMINAL,
        STRUCTURE_WALL
      ].forEach(structureType => {
        const structure = mockStructure(structureType);
        expect(isToBeFilled(structure)).toBeFalsy();
      });
    });
  });
});
