class InfraManager {
    constructor (public room_name: string) {
        if  (!(room_name in Game.rooms)) {
            throw new Error("Roomname does not exits")}
        }

    run(){
        //pass

    }

    roads(){
        //pass
    }

    road_spawn_energy(){
        // #TODO calculate ideal road from spawn to energy
    }
}

export {
    InfraManager as InfraManager2
}
