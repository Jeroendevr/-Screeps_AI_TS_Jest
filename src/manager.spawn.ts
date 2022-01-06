import { collect } from "lodash";

export var spawnManager = {

    /** @param {Creep} creep **/
    spawn: function () {
        type roles = [
            'harvester',
            'builder'
        ]
        const screepAmount = {
            harvester: 3,
            builder: 2,
        }

        var harvesters = Object.values(Game.creeps).filter(creep => creep.memory.role === 'harvester').length

        if (harvesters < screepAmount.harvester) {
            var newName: string = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'harvester', } });
        }

        var builders = Object.values(Game.creeps).filter(creep => creep.memory.role === 'builder').length

        if (builders < screepAmount.builder) {
            var newName: string = 'Builders' + Game.time;
            console.log('Spwaning new builders: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                { memory: { role: 'builder', } })

        }
    }
}
