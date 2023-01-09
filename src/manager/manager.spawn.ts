import { isAvailable } from "spawn";
import { countRole } from "utils/memory.role";
import { Comms } from "utils/global.comms";

const spawnManager = {
  /** @param {Creep} creep **/
  run: function (): void {
    this.read_comms();
    this.spawn();
  },

  read_comms: function (): void {
    const comms = new Comms();
    if (comms.wanted_resource_energy > 0) {
      spawn_amount.upgrader = 2;
    }
  },

  spawn: function (): void {
    let screepAmount = spawn_amount;

    const mySpawn = "Spawn1";
    const structure_spawn = Game.spawns[mySpawn];
    const ROOM = structure_spawn.room;
    const BodyPart = new BodyParts();

    if (isAvailable(Game.spawns[mySpawn])) {
      const harvesters = countRole("harvester");
      const builders = countRole("builder");
      const upgrader = countRole("upgrader");
      const koerier = countRole("koerier");

      if (harvesters < screepAmount.harvester) {
        const creepBody: BodyPartConstant[] = [WORK, CARRY, MOVE, WORK];
        if (sufficientCapacity(Game.spawns[mySpawn], creepBody) === true) {
          const newName: string = "Harvester" + String(Game.time);
          console.log("Spawning new harvester: " + newName);
          Game.spawns[mySpawn].spawnCreep(creepBody, newName, { memory: { role: "harvester" } });
        }
      } else if (builders < screepAmount.builder) {
        const newName: string = "Builder" + String(Game.time);
        const builderBody = BodyPart.builder();
        if (sufficientCapacity(Game.spawns[mySpawn], builderBody) === true) {
          console.log("Spawning new builders: " + newName);
          Game.spawns[mySpawn].spawnCreep(builderBody, newName, { memory: { role: "builder" } });
        }
      } else if (upgrader < screepAmount.upgrader) {
        const creepBody: BodyPartConstant[] = [WORK, CARRY, CARRY, MOVE];
        if (sufficientCapacity(Game.spawns[mySpawn], creepBody) === true) {
          const newName: string = "Upgrader" + String(Game.time);
          console.log("Spawning new upgrader: " + newName);
          Game.spawns[mySpawn].spawnCreep(creepBody, newName, { memory: { role: "upgrader" } });
        }
      } else if (koerier < screepAmount.koerier) {
        const creepBody: BodyPartConstant[] = [CARRY, CARRY, CARRY, CARRY, MOVE];
        if (sufficientCapacity(Game.spawns[mySpawn], creepBody) === true) {
          const newName: string = "Koerier" + String(Game.time);
          console.log("Spawning new koerier: " + newName);
          Game.spawns[mySpawn].spawnCreep(creepBody, newName, { memory: { role: "koerier" } });
        }
      }
    }
  },

  increase_creep: function (): void {
    // TODO when a role is passed, increase the role count for this creep
  }
};

class spawnAmount {
  harvester: number = 1;
  koerier: number = 1;
  builder: number = 2;
  upgrader: number = 1;
}

class BodyParts {
  builder() {
    const builderBody: BodyPartConstant[] = [WORK, CARRY, CARRY, MOVE, MOVE];
    return builderBody;
  }

  /**
   *
   * @param energy_available
   * @returns Maximum possible BodyParts or Null if there is not a sufficient energy
   */
  harvester(energy_available: number): BodyPartConstant[] | null {
    const HARVESTER_BODIES: BodyPartConstant[][] = [
      [WORK, CARRY, MOVE, WORK],
      [MOVE, WORK, WORK, WORK, CARRY, CARRY]
    ];

    var MAX_BODY: BodyPartConstant[] = [];
    for (var bodies of HARVESTER_BODIES) {
      if (this.body_parts_cost(bodies) <= energy_available) {
        MAX_BODY = bodies;
      }
    }

    if (MAX_BODY.length == 0) {
      return null;
    }
    return MAX_BODY;
  }
  /**Retrun the cost of the body */
  body_parts_cost(BODY_PARTS: BodyPartConstant[]): number {
    return _.sum(BODY_PARTS, part => BODYPART_COST[part]);
  }
}

const spawn_amount = new spawnAmount();

function sufficientCapacity(creepSpawn: StructureSpawn, creepBody: BodyPartConstant[]): Boolean {
  if (_.sum(creepBody, part => BODYPART_COST[part]) > creepSpawn.room.energyAvailable) {
    return false;
  } else {
    return true;
  }
}

export { spawnManager, sufficientCapacity, BodyParts };
