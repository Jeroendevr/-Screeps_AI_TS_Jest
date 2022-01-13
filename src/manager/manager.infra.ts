import { inRange } from "lodash"

var infraManager = {
    cur_room: "",

    run: function runManagerInfra(): void {
        for (const i in Game.spawns) {
            var spawns: StructureSpawn = Game.spawns[i]
            var path: PathStep[] = road_from_control_to_energy(spawns)
            // Check for construction sites on every PathStep
            for (const j in path) {
                create_construction_site(path[j])
                var step = JSON.stringify(path[j])
                // console.log(step)
            }
        }

    }

}

function road_from_control_to_energy(spawns: StructureSpawn): PathStep[] {
    // find energy near spawn
    infraManager.cur_room = spawns.room.name
    var energy_source = new RoomPosition(35, 20, infraManager.cur_room)
    return spawns.room.findPath(spawns.pos, energy_source, { ignoreCreeps: true })
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

export {
    infraManager
}
