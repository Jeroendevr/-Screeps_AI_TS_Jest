/**
 * New builder module, to replace the older one, this one is class based.
 *
 */

import { RoomComms } from "utils/global.comms";

interface BuilderRole extends Creep {
  memory: BuilderMemory;
}

interface BuilderMemory extends CreepMemory {
  building: boolean;
  role: "builder";
}

class BuilderClass {
  creep!: BuilderRole;

  run(creep: BuilderRole) {
    // Look for available construction sites, if not request one from the construction manager
    this.creep = creep;

    if (this.construction_site_available()) {
      this.creep.say("🔨can work");
    } else {
      const RC = new RoomComms(creep.room.name);
      RC.constriction_sites_wanted = true;
    }
  }

  construction_site_available(): boolean {
    const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets.length > 0) {
      return true;
    }
    return false;
  }
}

export { BuilderRole, BuilderClass };
