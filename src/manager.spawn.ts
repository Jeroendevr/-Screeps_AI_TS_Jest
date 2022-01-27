import { spawn } from "child_process"
import { count } from "console"
import { each } from "lodash"
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

        const mySpawn = 'Spawn1'

        if (isAvailable(Game.spawns[mySpawn])) {

            const harvesters = countRole('harvester')
            const builders = countRole('builder')
            const upgrader = countRole('upgrader')

            if (harvesters < screepAmount.harvester) {
                var newName: string = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns[mySpawn].spawnCreep([WORK, CARRY, MOVE], newName,
                    { memory: { role: 'harvester', } });
            }
            else if (builders < screepAmount.builder) {
                var newName: string = 'Builders' + Game.time;
                const builderBody: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE]
                if (_.sum(builderBody, part => BODYPART_COST[part]) > Game.spawns[mySpawn].store.getFreeCapacity(RESOURCE_ENERGY)) {
                    console.log('Spwaning new builders: ' + newName);
                    Game.spawns[mySpawn].spawnCreep(builderBody, newName,
                        { memory: { role: 'builder', } })
                }

            } else if (upgrader < screepAmount.upgrader) {
                var newName: string = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns[mySpawn].spawnCreep([WORK, CARRY, CARRY, MOVE], newName,
                    { memory: { role: 'upgrader' } })
            }
        }
    }
}


