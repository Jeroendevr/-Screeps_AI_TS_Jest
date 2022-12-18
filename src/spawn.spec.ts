import { isAvailable, spawn } from "spawn";
import { mockStructure } from 'screeps-jest'

describe('spawn module', () => {
    it('is not spawning', () => {
        const spawn = mockStructure(STRUCTURE_SPAWN, {
            spawning: () => null,
        })
        // isAvailable(spawn);
        expect(isAvailable(spawn)).toEqual(false);

    }
    )
    //TODO create a mock when there is actual something being spawned
})
