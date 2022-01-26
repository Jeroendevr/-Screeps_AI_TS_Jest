import { all, filter, find, inRange } from "lodash"
import { Position } from "source-map"

var infraManager = {
    cur_room: "",

    run: function runManagerInfra(): void {
        for (const i in Game.spawns) {
            var spawns: StructureSpawn = Game.spawns[i]
            // Create Roads
            var room_has_source = contains_source(Game.rooms[infraManager.cur_room])
            if (room_has_source = true) {
                const all_e_source: Source[] = Game.rooms[infraManager.cur_room].find(
                    FIND_SOURCES)

                var path: PathStep[] = road_from_spawn_to_energy(spawns, all_e_source)
                // Check for construction sites on every PathStep
                for (const j in path) {
                    create_construction_site(path[j])
                    var step = JSON.stringify(path[j])
                    // console.log(step)
                    // find_closest_energy_source(spawns)
                }
            }
        }
    }
}

function road_from_spawn_to_energy(spawns: StructureSpawn, all_e_source: Array<Source>): PathStep[] {
    // find energy near spawn
    const e_source = all_e_source[0]
    if (Game.getObjectById(e_source.id) !== null) {
        var energy_source = Game.getObjectById(e_source.id)
        var energy_source_pos: RoomPosition
        if (energy_source !== null) {
            energy_source_pos = energy_source.pos
            return spawns.room.findPath(spawns.pos, energy_source_pos, { ignoreCreeps: true })
        }
    }
};

function create_construction_site(path: PathStep,): void {
    //check if its already a construction site
    let pos = path
    const ROOM_POS = new RoomPosition(pos.x, pos.y, infraManager.cur_room)
    // console.log(ROOM_POS)
    const found = ROOM_POS.lookFor(LOOK_CONSTRUCTION_SITES)
    if (found[0] == undefined) {
        ROOM_POS.createConstructionSite(STRUCTURE_ROAD)
    }
    // console.log(infraManager.cur_room, ROOM_POS, pos.x, pos.y)
}

// function find_closest_energy_source(spawns: StructureSpawn): RoomPosition {
//     infraManager.cur_room = spawns.room.name
//     const energy_sources = Game.rooms[infraManager.cur_room].find(FIND_SOURCES)
//     const energy_source = energy_sources[0].id
//     var energyObj = Game.getObjectById(energy_source)
//     return energyObj.pos
// }

function contains_source(room: Room): boolean {
    if (Game.rooms[infraManager.cur_room].find(FIND_SOURCES).length > 0) {
        return true
    }
    return false
}


export {
    infraManager
}
