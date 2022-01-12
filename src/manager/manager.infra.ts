
var infraManager = {

    run: function runManagerInfra(): void {
        road_from_control_to_energy()
    }



}

function road_from_control_to_energy(): void {
    for (const i in Game.spawns) {
        var spawns = Game.spawns[i]
        // find energy near spawn
        var energy_source = RoomPosition(39, 44, spawns.room.name)
        spawns.room.findPath(spawns.pos, energy_source)
    }
};

export {
    infraManager
}
