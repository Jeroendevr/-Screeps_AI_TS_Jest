import { building_layout, gcl_lvl2_extensions } from "./building_layout";
import { RoomComms } from "utils/global.comms";

class ConstructionManager {
  constructor(public room_name: string) {
    if (!(room_name in Game.rooms)) {
      throw new Error("Roomname does not exits");
    }
  }
  room: Room = Game.rooms[this.room_name];
  RCL = this.room.controller?.level;

  run() {
    if (this.RCL == undefined) {
      throw new Error("Room does not have a controller");
    }
    if (this.RCL < 5) {
      this.extensions();
    }
  }

  extensions() {
    const RC = new RoomComms(this.room_name);
    if (RC.constriction_sites_wanted == false) {
      return;
    }

    const location = this.find_suitable_extension_site(this.room.find(FIND_MY_SPAWNS)[0].pos, this.room_name);
    // console.log("The following location has been found " + location);
    if (location != null) {
      // console.log(location + " Is suitable for an extension");
      this.createExtenstions(location);
      RC.add_constrution_site(location, STRUCTURE_EXTENSION);
    }
  }

  /**
   * Return a RoomPosition suitable for a extension site
   */
  find_suitable_extension_site(spawn_pos: RoomPosition, roomName: string): RoomPosition | null {
    try {
      var extension_gen: [number, number, string];
      const CLE = gcl_lvl2_extensions();
      var result = CLE.next();
      while (!result.done) {
        extension_gen = result.value;

        extension_gen[0] = extension_gen[0] + spawn_pos.x;
        extension_gen[1] = extension_gen[1] + spawn_pos.y;
        const extension_site = new RoomPosition(extension_gen[0], extension_gen[1], roomName);
        // console.log("look if the following extension site is available" + extension_site);
        if (this.pos_available_construction(extension_site)) {
          // console.log("available for construction " + extension_site);
          return extension_site;
        }

        result = CLE.next();
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  /**
   *
   * @param con_pos
   * @returns true if position available for construction
   */
  pos_available_construction(con_pos: RoomPosition): boolean {
    const LOOK_RESULT = con_pos.lookFor(LOOK_STRUCTURES || LOOK_CONSTRUCTION_SITES);
    if (LOOK_RESULT.length > 0) {
      // console.log(con_pos);
      return false;
    }

    return true;
  }

  createExtenstions(location: RoomPosition): void {
    location.createConstructionSite(STRUCTURE_EXTENSION);
  }
}

export { ConstructionManager };
