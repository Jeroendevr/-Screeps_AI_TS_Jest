import { building_layout } from "./building_layout";
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

    const location: RoomPosition = this.find_suitable_extension_site(
      this.room.find(FIND_MY_SPAWNS)[0].pos,
      this.room_name
    );
    this.createExtenstions(location);
    RC.add_constrution_site(location, STRUCTURE_EXTENSION);
  }

  /**
   * Return a RoomPosition suitable for a extension site
   */
  find_suitable_extension_site(spawn_pos: RoomPosition, roomName: string): RoomPosition {
    const layout = building_layout(spawn_pos);
    const extension_site = new RoomPosition(layout[0], layout[1], roomName);
    if (this.pos_available_construction(extension_site)) {
      return extension_site;
    }
    // Return suitable extension site if cant be found
    throw new Error("Cannot find a suitable extension site");
  }
  /**
   *
   * @param con_pos
   * @returns true if position available for construction
   */
  pos_available_construction(con_pos: RoomPosition): boolean {
    if (!con_pos.lookFor(LOOK_CONSTRUCTION_SITES || LOOK_STRUCTURES)) {
      return true;
    }

    return false;
  }

  createExtenstions(location: RoomPosition): void {
    location.createConstructionSite(STRUCTURE_EXTENSION);
  }
}

export { ConstructionManager };
