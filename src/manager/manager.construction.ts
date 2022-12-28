import { building_layout } from "./building_layout";

class ConstructionManager {


    constructor (public room_name: string) {
        if  (!(room_name in Game.rooms)) {
            throw new Error("Roomname does not exits")}
        }
        room :Room = Game.rooms[this.room_name];
        RCL = this.room.controller?.level

        run() {
            if (this.RCL == undefined) {
                throw new Error("Room does not have a controller")
            }
            if (this.RCL < 5 ) {
                this.extensions()

            }

        }

        extensions(){
            const location : RoomPosition = this.find_suitable_extension_site(this.room.find(FIND_MY_SPAWNS)[0].pos, this.room_name)
            this.createExtenstions(location)
        }

        find_suitable_extension_site(spawn_pos: RoomPosition, roomName: string): RoomPosition {
            const layout = building_layout(spawn_pos)
            // console.log(layout)
            const extension_site = new RoomPosition(layout[0], layout[1], roomName)
            return extension_site
        }

        createExtenstions(location: RoomPosition): void {
            location.createConstructionSite(STRUCTURE_EXTENSION)
        }
}

export {
    ConstructionManager
}
