function spawn(spawn: StructureSpawn): void {

}

function isAvailable(spawn: StructureSpawn): boolean {
    if (spawn.spawning === null) {
        return true
    }
    else {
        return false
    }

}

export {
    spawn,
    isAvailable
};
