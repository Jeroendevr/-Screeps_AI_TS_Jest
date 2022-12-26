import { mockGlobal } from "screeps-jest"
import { InfraManager2 } from "./manager.infra2"



describe('Infrastructure manager', () =>{
    it('Instancesiate manager with roomname which exist', () => {
        mockGlobal<Game>('Game', {
            rooms:{
                ['E3S34']: Room,
            }
        })
        const infraManager = new InfraManager2('E3S34')
    })
})
