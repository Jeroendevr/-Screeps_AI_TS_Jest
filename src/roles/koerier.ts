import { filter } from "lodash";
import { isToBeFilled } from "../utils/isToBeFilled";
import { move_opposite_direction } from "../utils/pathfinding";

interface Koerier extends Creep {
  memory: KoerierMemory;
}

interface KoerierMemory extends CreepMemory {
  hauling: boolean;
  role: "koerier";
  target: AnyStructure;
}

const roleKoerier = {
  run(creep: Koerier): void {
    if (creep.memory.hauling && creep.store.getFreeCapacity() === 0) {
      creep.memory.hauling = false;
    }
    // Als leeg haal energie bij harvester
    if (!creep.memory.hauling && creep.store.getFreeCapacity() > 0) {
      creep.memory.hauling = true;
      creep.say("💼 Hauling");
    }
    if (creep.memory.hauling) {
      haul_energy(creep);
    } else {
      this.transferEnergy(creep);
    }
    this.keepDistanceToSource(creep);
  },
  transferEnergy(creep: Koerier): void {
    // When not hauling
    const targets = koerier_targets(creep);
    if (targets.length > 0) {
      if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.memory.target = targets[0];
        creep.moveTo(targets[0], {
          visualizePathStyle: {
            stroke: "#41B0F6",
            opacity: 0.2
          }
        });
      }
    }
  },
  keepDistanceToSource(creep: Koerier): void {
    //Move atleast 2 pos from source if hauling
    const source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (source) {
      const range = creep.pos.getRangeTo(source);
      if (range < 3) {
        const direction = creep.pos.getDirectionTo(source);
        // console.log(direction)
        move_opposite_direction(direction, creep);
      }
    }
  }
};

function haul_energy(creep: Koerier): void {
  //find harvester with energy and haul withdraw from it
  const harvesters = creep.room.find(FIND_MY_CREEPS, { filter: { memory: { role: "harvester" } } });
  creep.moveTo(harvesters[0], { visualizePathStyle: { stroke: "#95e0e8" } });
}

function koerier_targets(creep: Koerier): Array<AnyOwnedStructure> {
  const targets = creep.room.find(FIND_MY_STRUCTURES, {
    filter: isToBeFilled
  });
  return targets;
}

export { roleKoerier, Koerier };
