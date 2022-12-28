class InfraManager {

    constructor (public room_name: string) {
        if  (!(room_name in Game.rooms)) {
            throw new Error("Roomname does not exits")}
        }
        room :Room = Game.rooms[this.room_name]

    run(){
        this.roads()

    }

    roads(){
        this.road_spawn_energy()
    }

    road_spawn_energy(){
        const spawn = this.room.find(FIND_MY_SPAWNS)
        const sources = this.room.find(FIND_SOURCES)
        if (spawn.length == 0 || sources.length == 0) {
            throw new Error("Room has no spawn or source to create road")
        }
        const close_source = spawn[0].pos.findClosestByPath(sources)
        if (close_source == null) {
            throw new Error("Can't create path to source")
        }
        const path = spawn[0].pos.findPathTo(close_source.pos, {ignoreCreeps: true} )
        for (const j in path) {
            this.create_construction_site(path[j])
        }
    }

    create_construction_site(path_pos: PathStep) {
        const ROOM_POS = new RoomPosition(path_pos.x, path_pos.y, this.room_name)
        ROOM_POS.createConstructionSite(STRUCTURE_ROAD)
    }
}

export {
    InfraManager as InfraManager2
}



