import { all, filter, find, inRange } from "lodash"
import { Position } from "source-map"

var infraManager = {
    cur_room: Room.name,

    run: function runManagerInfra(): void {
        // Loop through all spawns and find current room
        for (const i in Game.spawns) {
            var spawns: StructureSpawn = Game.spawns[i]
            infraManager.cur_room = spawns.room.name
            // Create Roads
            var room_has_source: boolean = contains_source(Game.rooms[infraManager.cur_room])
            if (room_has_source === true) {
                const all_e_source: Source[] =
                    Game.rooms[infraManager.cur_room].find(FIND_SOURCES)

                var path = road_from_spawn_to_energy(spawns, all_e_source)!
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

function road_from_spawn_to_energy(spawns: StructureSpawn, all_e_source: Array<Source>): PathStep[] | undefined {
    // find energy near spawn
    const e_source = all_e_source[0]
    const energy_source = Game.getObjectById(e_source.id)

    if (energy_source == null) {
        console.log(energy_source + 'has a value of null')
        return undefined
    }
    const energy_source_pos: RoomPosition = energy_source.pos
    return spawns.room.findPath(spawns.pos, energy_source_pos, { ignoreCreeps: true })
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



function contains_source(room: Room): boolean {
    if (Game.rooms[infraManager.cur_room].find(FIND_SOURCES).length > 0) {
        return true
    }
    return false
}


export {
    infraManager
}
