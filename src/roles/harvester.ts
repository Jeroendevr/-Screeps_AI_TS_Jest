import { isToBeFilled } from "../utils/isToBeFilled";

interface Harvester extends Creep {
  memory: HarvesterMemory;
}
interface HarvesterMemory extends CreepMemory {
  harvesting: boolean;
  source: RoomPosition;
}

const roleHarvester = {
  run(creep: Creep): void {
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
      if (creep.transferEnergy(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
      }
    }
  },
  find_energy(creep: Creep): void {}
};

function koerierNear(creep: Creep): boolean {
  const nearbyKoerier = creep.pos.findInRange(FIND_MY_CREEPS, 1, { filter: { memory: { role: "koerier" } } });
  if (nearbyKoerier.length > 0) {
    creep.transferEnergy(nearbyKoerier[0], RESOURCE_ENERGY);
  }

  return false;
}

export { roleHarvester, Harvester, isToBeFilled };
