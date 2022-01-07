import { count } from "console"
import { mockInstanceOf } from "screeps-jest"
import { isAvailable } from "spawn"
import { countRole } from "utils/memory.role"

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
            upgrader: 1,
        };

        if (isAvailable(Game.spawns['Spawn1'])) {

            const harvesters = countRole('harvester')
            const builders = countRole('builder')
            const upgrader = countRole('upgrader')

            if (harvesters < screepAmount.harvester) {
                var newName: string = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'harvester', } });
            }
            else if (builders < screepAmount.builder) {
                var newName: string = 'Builders' + Game.time;
                console.log('Spwaning new builders: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'builder', } })

            } else if (upgrader < screepAmount.upgrader) {
                var newName: string = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } })
            }
        }
    }
}
