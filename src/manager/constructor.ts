import { building_layout } from "./building_layout"
import { Comms } from "utils/global.comms"


// Depreceated module
const comms = new Comms()

// Responsible for structures
const constructionManager = {
    run: function (): void {

    },

    gcl_lv2: function (): void {
        const mySpawn = 'Spawn1'
        const mySpawnObj = Game.spawns[mySpawn]
        const roomName = mySpawnObj.room.name
        let location: RoomPosition = find_suitable_extension_site(mySpawnObj.pos, roomName)
        this.createExtenstions(location)
    },



    createExtenstions: function (location: RoomPosition): void {
        location.createConstructionSite(STRUCTURE_EXTENSION)
    },

    possible_to_build_tower: function (): boolean {
        // when asked if it's possible to build a tower. The request should be fufilled.
        if (Game.gcl.level < 3) {
            // if gcl is lower then 3 try to find out what the bottle neck is for this level.
            comms.wanted_resource_energy += 1

        }


        return false
    }
}

function find_suitable_extension_site(spawn_pos: RoomPosition, roomName: string): RoomPosition {
    const layout = building_layout(spawn_pos)
    // console.log(layout)
    const extension_site = new RoomPosition(layout[0], layout[1], roomName)
    return extension_site
}

export {
    constructionManager,
    find_suitable_extension_site
}
