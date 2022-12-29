import { mockGlobal, mockInstanceOf } from "screeps-jest";
import { ConstructionManager } from "./manager.construction";


const roomWithoutController = mockInstanceOf<Room>({
    controller:undefined,
    name:'A1A1',

})
describe('run', () => {
    it ('Does not have a controller', () => {
        mockGlobal<Game> ('Game', {
            rooms: {
                'A1A1': roomWithoutController
            }
        })
        expect(() => {
            new ConstructionManager('A1A1').run()
        }).toThrow()
    }
    )
})
