
var infraManager = {

    run: function runManagerInfra(): void {
        for (const i in Game.spawns) {
            var spawns = Game.spawns[i]
            var path = road_from_control_to_energy(spawns)
            // Check for construction sites on every PathStep

        }

    }



}

function road_from_control_to_energy(spawns: StructureSpawn): PathStep[] {
    // find energy near spawn
    var energy_source = new RoomPosition(39, 44, spawns.room.name)
    return spawns.room.findPath(spawns.pos, energy_source)
};

function create_construction_site(path: PathStep): void {

}

export {
    infraManager
}
