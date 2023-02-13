import { isToBeFilled } from "../utils/isToBeFilled";
import { RoomService } from "utils/room.service";

interface HarvesterRole extends Creep {
  memory: HarvesterMemory;
}
interface HarvesterMemory extends CreepMemory {
  harvesting: boolean;
  source: RoomPosition;
}

const roleHarvester = {
  run(creep: HarvesterRole): void {
    if (creep.store.getFreeCapacity() > 0) {
      const sources = creep.pos.findClosestByPath(FIND_SOURCES);
      if (sources != null && creep.harvest(sources) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else if (koerierNear(creep)) {
    } else {
      this.transferEnergy(creep);
    }
  },
  transferEnergy(creep: Creep): void {
    const targets = creep.room.find(FIND_MY_STRUCTURES, { filter: isToBeFilled });

    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },
  /*
   *Harvester Search for energy and sticks to that source
   */
  assign_source(creep: HarvesterRole): Boolean {
    const sources: Source[] = creep.room.find(FIND_SOURCES);
    if (sources.length == 0) {
      return false;
    }
    const source = sources.pop();
    if (source == undefined) {
      return false;
    }
    creep.memory.source = source.pos;
    return true;
  }
};

function koerierNear(creep: Creep): boolean {
  const nearbyKoerier = creep.pos.findInRange(FIND_MY_CREEPS, 1, { filter: { memory: { role: "koerier" } } });
  if (nearbyKoerier.length > 0) {
    creep.transfer(nearbyKoerier[0], RESOURCE_ENERGY);
  }

  return false;
}

class Harvester {
  creep!: HarvesterRole;
  source!: Source;
  room_service!: RoomService;

  run(creep: HarvesterRole) {
    this.creep = creep;
    this.room_service = new RoomService(creep.room);
  }

  assign_source() {
    this.source = this.room_service.sources()[0];
  }
}

export { roleHarvester, HarvesterRole as Harvester, isToBeFilled };
