class InfraManager {
  constructor(public room_name: string) {
    if (!(room_name in Game.rooms)) {
      throw new Error("Roomname does not exits");
    }
  }
  room: Room = Game.rooms[this.room_name];

  run() {
    this.roads();
  }

  roads() {
    this.road_spawn_energy();
  }
  /**
   * Create roads to every energy source
   */
  road_spawn_energy() {
    const spawn = this.room.find(FIND_MY_SPAWNS);
    const sources = this.room.find(FIND_SOURCES);
    if (spawn.length == 0 || sources.length == 0) {
      throw new Error("Room has no spawn or source to create road");
    }
    const close_source = spawn[0].pos.findClosestByPath(sources, { ignoreCreeps: true });
    if (close_source == null) {
      throw new Error("Can't create path to source");
    }
    const spawn_pos = spawn[0].pos;
    var path = road_path(spawn_pos, close_source.pos);

    for (const j in path) {
      this.create_construction_site(path[j]);
    }
  }

  create_construction_site(path_pos: PathStep) {
    const ROOM_POS = new RoomPosition(path_pos.x, path_pos.y, this.room_name);
    const terrain = ROOM_POS.lookFor("terrain");
    if (terrain.includes("wall")) {
      // Dont build roards on walls
      return;
    }
    ROOM_POS.createConstructionSite(STRUCTURE_ROAD);
  }
}

/**
 * Return the path between two objects suitable for building roads
 * difference with findpathto is is one off from start and destination.
 * To prevent tunnels being built to sources
 */
function road_path(start: RoomPosition, end: RoomPosition) {
  var path = start.findPathTo(end, { ignoreCreeps: true });
  path = path.slice(1, -1);
  return path;
}

export { InfraManager as InfraManager2, road_path };
